import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

type InquiryPostRow = {
  id: number;
  board_id: number | null;
  name: string;
  phone: string | null;
  email: string | null;
  title: string;
  content: string;
  user_password: string | null;
  created_at: string;
};

function isAdmin(req: Request) {
  const adminPassword = req.headers.get("x-admin-password") ?? "";
  return !!process.env.ADMIN_PASSWORD && adminPassword === process.env.ADMIN_PASSWORD;
}

async function getBoardCommonPasswordHash() {
  const boardName = process.env.INQUIRY_BOARD_NAME ?? "inquiry";

  const { data, error } = await supabaseAdmin.from("board_settings").select("id, common_password").eq("board_name", boardName).single();

  if (error || !data) return { boardId: null as number | null, commonHash: null as string | null, error: error?.message ?? "BOARD_NOT_FOUND" };
  return { boardId: data.id as number, commonHash: (data.common_password as string) ?? null, error: null as string | null };
}

function toDetailShape(row: InquiryPostRow) {
  return {
    id: row.id,
    boardId: row.board_id ?? null,
    name: row.name,
    phone: row.phone,
    email: row.email,
    title: row.title,
    content: row.content,
    createdAt: row.created_at,
  };
}

async function readJsonBody<T>(req: Request): Promise<T | null> {
  try {
    return (await req.json()) as T;
  } catch {
    return null;
  }
}

// GET /api/inquiry/[id]?password=...
// - 관리자: 비밀번호 없이 열람
// - 비관리자: password가 공통비번 or 게시글비번이면 열람
export async function GET(req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await ctx.params;
    const postId = Number(id);
    if (!Number.isInteger(postId) || postId <= 0) return NextResponse.json({ message: "잘못된 게시글 번호입니다." }, { status: 400 });

    const admin = isAdmin(req);

    const { data: post, error: postErr } = await supabaseAdmin
      .from("inquiry_posts")
      .select("id, board_id, name, phone, email, title, content, user_password, created_at")
      .eq("id", postId)
      .single();

    if (postErr || !post) return NextResponse.json({ message: "게시글을 찾을 수 없습니다." }, { status: 404 });

    const { boardId, commonHash, error: boardErr } = await getBoardCommonPasswordHash();
    if (!boardId) return NextResponse.json({ message: boardErr }, { status: 400 });

    // 같은 보드 글만 허용
    if (post.board_id !== boardId) return NextResponse.json({ message: "게시글을 찾을 수 없습니다." }, { status: 404 });

    if (admin) return NextResponse.json({ item: toDetailShape(post) }, { status: 200 });

    const url = new URL(req.url);
    const password = (url.searchParams.get("password") ?? "").trim();
    if (!password) return NextResponse.json({ message: "비밀번호가 필요합니다." }, { status: 401 });

    const okCommon = commonHash ? await bcrypt.compare(password, commonHash) : false;
    const okPost = post.user_password ? await bcrypt.compare(password, post.user_password) : false;

    if (!okCommon && !okPost) return NextResponse.json({ message: "비밀번호가 올바르지 않습니다." }, { status: 401 });

    return NextResponse.json({ item: toDetailShape(post) }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "게시글을 열람할 수 없습니다." }, { status: 500 });
  }
}

// PATCH /api/inquiry/[id]  (관리자만)
export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    if (!isAdmin(req)) return NextResponse.json({ message: "관리자 인증이 필요합니다." }, { status: 401 });

    const { id } = await ctx.params;
    const postId = Number(id);
    if (!Number.isInteger(postId) || postId <= 0) return NextResponse.json({ message: "잘못된 게시글 번호입니다." }, { status: 400 });

    const body = await readJsonBody<{
      name?: string;
      phone?: string;
      email?: string;
      title?: string;
      content?: string;
    }>(req);
    if (!body) return NextResponse.json({ message: "요청 본문이 올바르지 않습니다." }, { status: 400 });

    const payload: Partial<Pick<InquiryPostRow, "name" | "phone" | "email" | "title" | "content">> = {};
    if (typeof body.name === "string") {
      const name = body.name.trim();
      if (!name) return NextResponse.json({ message: "이름은 비워둘 수 없습니다." }, { status: 400 });
      payload.name = name;
    }
    if (typeof body.phone === "string") payload.phone = body.phone.trim() || null;
    if (typeof body.email === "string") payload.email = body.email.trim() || null;
    if (typeof body.title === "string") {
      const title = body.title.trim();
      if (!title) return NextResponse.json({ message: "제목은 비워둘 수 없습니다." }, { status: 400 });
      payload.title = title;
    }
    if (typeof body.content === "string") {
      if (!body.content.trim()) return NextResponse.json({ message: "내용은 비워둘 수 없습니다." }, { status: 400 });
      payload.content = body.content;
    }

    if (Object.keys(payload).length === 0) {
      return NextResponse.json({ message: "수정할 항목이 없습니다." }, { status: 400 });
    }

    const { boardId, error: boardErr } = await getBoardCommonPasswordHash();
    if (!boardId) return NextResponse.json({ message: boardErr }, { status: 400 });

    const { data, error } = await supabaseAdmin
      .from("inquiry_posts")
      .update(payload)
      .eq("id", postId)
      .eq("board_id", boardId)
      .select("id")
      .maybeSingle();

    if (error) return NextResponse.json({ message: error.message }, { status: 500 });
    if (!data) return NextResponse.json({ message: "게시글을 찾을 수 없습니다." }, { status: 404 });

    return NextResponse.json({ message: "게시글이 수정되었습니다." }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "게시글 수정에 실패했습니다." }, { status: 500 });
  }
}

// DELETE /api/inquiry/[id]  (관리자만)
export async function DELETE(req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    if (!isAdmin(req)) return NextResponse.json({ message: "관리자 인증이 필요합니다." }, { status: 401 });

    const { id } = await ctx.params;
    const postId = Number(id);
    if (!Number.isInteger(postId) || postId <= 0) return NextResponse.json({ message: "잘못된 게시글 번호입니다." }, { status: 400 });

    const { boardId, error: boardErr } = await getBoardCommonPasswordHash();
    if (!boardId) return NextResponse.json({ message: boardErr }, { status: 400 });

    const { data, error } = await supabaseAdmin
      .from("inquiry_posts")
      .delete()
      .eq("id", postId)
      .eq("board_id", boardId)
      .select("id")
      .maybeSingle();

    if (error) return NextResponse.json({ message: error.message }, { status: 500 });
    if (!data) return NextResponse.json({ message: "게시글을 찾을 수 없습니다." }, { status: 404 });

    return NextResponse.json({ message: "게시글이 삭제되었습니다." }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "게시글 삭제에 실패했습니다." }, { status: 500 });
  }
}
