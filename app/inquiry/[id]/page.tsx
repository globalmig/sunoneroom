"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/layout/Header";

type InquiryDetail = {
  id: number;
  boardId: number | null;
  name: string;
  phone: string | null;
  email: string | null;
  title: string;
  content: string;
  createdAt: string;
};

type ApiMessage = {
  message?: string;
};

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString("ko-KR");
}

async function readJson<T>(response: Response): Promise<T | null> {
  try {
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export default function InquiryDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const postId = Number(params.id);

  const [selected, setSelected] = useState<InquiryDetail | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    phone: "",
    email: "",
    title: "",
    content: "",
  });
  const [postPasswordInput, setPostPasswordInput] = useState("");
  const [adminPasswordInput, setAdminPasswordInput] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const adminHeaders = useMemo<HeadersInit>(() => {
    const headers: Record<string, string> = {};
    if (adminPassword) headers["x-admin-password"] = adminPassword;
    return headers;
  }, [adminPassword]);

  async function fetchPost(options: { password?: string; adminPass?: string }) {
    if (!Number.isInteger(postId) || postId <= 0) {
      setMessage("잘못된 게시글 번호입니다.");
      return false;
    }

    const query = new URLSearchParams();
    if (!options.adminPass && options.password) query.set("password", options.password.trim());
    const queryString = query.toString();
    const url = queryString ? `/api/inquiry/${postId}?${queryString}` : `/api/inquiry/${postId}`;

    const headers: Record<string, string> = {};
    if (options.adminPass) headers["x-admin-password"] = options.adminPass;

    setLoading(true);
    setMessage(null);
    try {
      const response = await fetch(url, { headers });
      const result = await readJson<{ item?: InquiryDetail; message?: string }>(response);
      if (!response.ok) {
        setSelected(null);
        setMessage(result?.message ?? "게시글을 열람할 수 없습니다.");
        return false;
      }

      const item = result?.item ?? null;
      setSelected(item);
      if (item) {
        setEditForm({
          name: item.name,
          phone: item.phone ?? "",
          email: item.email ?? "",
          title: item.title,
          content: item.content,
        });
      }
      return true;
    } catch {
      setSelected(null);
      setMessage("게시글을 열람할 수 없습니다.");
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function handlePasswordView(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    const password = postPasswordInput.trim();
    if (!password) {
      setMessage("비밀번호를 입력해 주세요.");
      return;
    }

    await fetchPost({ password });
  }

  async function handleAdminAuth(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    const password = adminPasswordInput.trim();
    if (!password) {
      setMessage("관리자 비밀번호를 입력해 주세요.");
      return;
    }

    const ok = await fetchPost({ adminPass: password });
    if (ok) setAdminPassword(password);
  }

  async function updatePost() {
    if (!selected || !adminPassword || updating) return;

    const name = editForm.name.trim();
    const title = editForm.title.trim();
    if (!name || !title || !editForm.content.trim()) {
      setMessage("이름, 제목, 내용은 비워둘 수 없습니다.");
      return;
    }

    setUpdating(true);
    try {
      const response = await fetch(`/api/inquiry/${selected.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...adminHeaders },
        body: JSON.stringify({
          name,
          phone: editForm.phone.trim(),
          email: editForm.email.trim(),
          title,
          content: editForm.content,
        }),
      });
      const result = await readJson<ApiMessage>(response);
      if (!response.ok) {
        setMessage(result?.message ?? "게시글 수정에 실패했습니다.");
        return;
      }

      setMessage(result?.message ?? "게시글이 수정되었습니다.");
      await fetchPost({ adminPass: adminPassword });
    } catch {
      setMessage("게시글 수정에 실패했습니다.");
    } finally {
      setUpdating(false);
    }
  }

  async function deletePost() {
    if (!selected || !adminPassword || deleting) return;
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    setDeleting(true);
    try {
      const response = await fetch(`/api/inquiry/${selected.id}`, {
        method: "DELETE",
        headers: adminHeaders,
      });
      const result = await readJson<ApiMessage>(response);
      if (!response.ok) {
        setMessage(result?.message ?? "게시글 삭제에 실패했습니다.");
        return;
      }

      setMessage(result?.message ?? "게시글이 삭제되었습니다.");
      router.push("/inquiry/list");
    } catch {
      setMessage("게시글 삭제에 실패했습니다.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-[#20282d]">
      <Header />
      <main className="mx-auto w-full max-w-[1120px] px-4 pb-20 pt-[120px] lg:px-0">
        <section className="rounded-2xl border border-black/10 bg-white p-6 lg:p-10">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-3xl font-extrabold">게시글 상세</h1>
            <div className="flex gap-3 text-sm">
              <Link href="/inquiry/list" className="underline underline-offset-4">
                목록으로
              </Link>
              <Link href="/inquiry/write" className="underline underline-offset-4">
                문의 작성
              </Link>
            </div>
          </div>

          {!selected && (
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <form onSubmit={handlePasswordView} className="rounded-xl border border-black/10 bg-[#f8fafb] p-4">
                <p className="text-sm font-semibold">일반 열람</p>
                <p className="mt-1 text-xs text-[#6b7280]">공통 비밀번호 또는 게시글 비밀번호를 입력하세요.</p>
                <input
                  value={postPasswordInput}
                  onChange={(e) => setPostPasswordInput(e.target.value)}
                  type="password"
                  className="mt-3 w-full rounded-md border border-black/20 px-3 py-2 text-sm"
                  placeholder="비밀번호"
                />
                <button type="submit" disabled={loading} className="mt-3 w-full rounded-md bg-[#20282d] px-3 py-2 text-sm font-semibold text-white disabled:opacity-70">
                  {loading ? "확인 중..." : "내용 확인"}
                </button>
              </form>

              <form onSubmit={handleAdminAuth} className="rounded-xl border border-black/10 bg-[#f8fafb] p-4">
                <p className="text-sm font-semibold">관리자 열람/수정</p>
                <p className="mt-1 text-xs text-[#6b7280]">관리자 비밀번호 인증 후 수정/삭제가 가능합니다.</p>
                <input
                  value={adminPasswordInput}
                  onChange={(e) => setAdminPasswordInput(e.target.value)}
                  type="password"
                  className="mt-3 w-full rounded-md border border-black/20 px-3 py-2 text-sm"
                  placeholder="관리자 비밀번호"
                />
                <button type="submit" disabled={loading} className="mt-3 w-full rounded-md border border-black/20 bg-white px-3 py-2 text-sm font-semibold disabled:opacity-70">
                  {loading ? "인증 중..." : "관리자 인증"}
                </button>
              </form>
            </div>
          )}

          {selected && (
            <div className="mt-6 space-y-4">
              <div className="rounded-lg border border-black/10 bg-[#fafafa] p-4">
                <p className="text-xl font-bold">{selected.title}</p>
                <p className="mt-2 text-sm text-[#4b5563]">작성자: {selected.name}</p>
                <p className="mt-1 text-sm text-[#4b5563]">연락처: {selected.phone || "-"}</p>
                <p className="mt-1 text-sm text-[#4b5563]">이메일: {selected.email || "-"}</p>
                <p className="mt-1 text-sm text-[#4b5563]">작성일: {formatDate(selected.createdAt)}</p>
              </div>

              {!adminPassword && <pre className="whitespace-pre-wrap rounded-lg border border-black/10 bg-white p-4 text-sm leading-7">{selected.content}</pre>}

              {adminPassword && (
                <div className="rounded-lg border border-black/10 bg-[#f8fafb] p-4">
                  <p className="text-sm font-semibold">관리자 수정</p>
                  <div className="mt-2 grid gap-2">
                    <input
                      value={editForm.name}
                      onChange={(e) => setEditForm((prev) => ({ ...prev, name: e.target.value }))}
                      className="w-full rounded-md border border-black/20 px-3 py-2 text-sm"
                      placeholder="이름"
                    />
                    <input
                      value={editForm.phone}
                      onChange={(e) => setEditForm((prev) => ({ ...prev, phone: e.target.value }))}
                      className="w-full rounded-md border border-black/20 px-3 py-2 text-sm"
                      placeholder="연락처"
                    />
                    <input
                      value={editForm.email}
                      onChange={(e) => setEditForm((prev) => ({ ...prev, email: e.target.value }))}
                      className="w-full rounded-md border border-black/20 px-3 py-2 text-sm"
                      placeholder="이메일"
                    />
                    <input
                      value={editForm.title}
                      onChange={(e) => setEditForm((prev) => ({ ...prev, title: e.target.value }))}
                      className="w-full rounded-md border border-black/20 px-3 py-2 text-sm"
                      placeholder="제목"
                    />
                    <textarea
                      value={editForm.content}
                      onChange={(e) => setEditForm((prev) => ({ ...prev, content: e.target.value }))}
                      className="h-36 w-full rounded-md border border-black/20 px-3 py-2 text-sm"
                      placeholder="문의 내용"
                    />
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button type="button" onClick={() => void updatePost()} disabled={updating || deleting} className="rounded-md border border-black/20 px-3 py-2 text-sm disabled:opacity-70">
                      {updating ? "저장 중..." : "수정 저장"}
                    </button>
                    <button type="button" onClick={() => void deletePost()} disabled={updating || deleting} className="rounded-md bg-[#991b1b] px-3 py-2 text-sm text-white disabled:opacity-70">
                      {deleting ? "삭제 중..." : "삭제"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {message && <p className="mt-4 rounded-md bg-[#eef2f7] px-3 py-2 text-sm text-[#374151]">{message}</p>}
        </section>
      </main>
    </div>
  );
}
