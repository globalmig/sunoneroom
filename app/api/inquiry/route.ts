import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

function isAdmin(req: Request) {
  const adminPassword = req.headers.get("x-admin-password") ?? "";
  return !!process.env.ADMIN_PASSWORD && adminPassword === process.env.ADMIN_PASSWORD;
}

async function getBoardId() {
  const boardName = process.env.INQUIRY_BOARD_NAME ?? "inquiry";

  const { data: board, error } = await supabaseAdmin.from("board_settings").select("id").eq("board_name", boardName).single();

  if (error || !board) return { boardId: null as number | null, error: error?.message ?? "BOARD_NOT_FOUND" };
  return { boardId: board.id as number, error: null as string | null };
}

// GET /api/inquiry  (공개: 목록)
// 관리자든 아니든 동일하게 최소 필드만 내려줌 (현재 UI가 필요로 하는 필드만)
export async function GET(req: Request) {
  try {
    const { boardId, error: boardError } = await getBoardId();
    if (!boardId) return NextResponse.json({ message: boardError }, { status: 400 });

    const { data, error } = await supabaseAdmin.from("inquiry_posts").select("id,name,title,created_at").eq("board_id", boardId).order("created_at", { ascending: false });

    if (error) return NextResponse.json({ message: error.message }, { status: 500 });

    return NextResponse.json({ items: data ?? [] }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "문의 목록을 불러오지 못했습니다." }, { status: 500 });
  }
}

// POST /api/inquiry (공개: 작성)
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      name: string;
      phone?: string;
      email?: string;
      title: string;
      content: string;
      postPassword: string;
    };

    if (!body?.name || !body?.title || !body?.content || !body?.postPassword) {
      return NextResponse.json({ message: "필수 항목이 누락되었습니다." }, { status: 400 });
    }
    if (body.postPassword.trim().length < 4) {
      return NextResponse.json({ message: "게시글 비밀번호는 4자 이상이어야 합니다." }, { status: 400 });
    }

    const { boardId, error: boardError } = await getBoardId();
    if (!boardId) return NextResponse.json({ message: boardError }, { status: 400 });

    const passwordHash = await bcrypt.hash(body.postPassword.trim(), 10);

    const { error } = await supabaseAdmin.from("inquiry_posts").insert({
      board_id: boardId,
      name: body.name.trim(),
      phone: body.phone?.trim() || null,
      email: body.email?.trim() || null,
      title: body.title.trim(),
      content: body.content,
      user_password: passwordHash,
    });

    if (error) return NextResponse.json({ message: error.message }, { status: 500 });

    return NextResponse.json({ message: "문의가 등록되었습니다." }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "문의 등록에 실패했습니다." }, { status: 500 });
  }
}
