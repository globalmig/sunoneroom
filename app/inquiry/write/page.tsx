"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import Header from "@/components/layout/Header";

type ApiMessage = {
  message?: string;
};

const initialForm = {
  name: "",
  phone: "",
  email: "",
  title: "",
  content: "",
  postPassword: "",
};

async function readJson<T>(response: Response): Promise<T | null> {
  try {
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export default function InquiryWritePage() {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleCreate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setMessage(null);

    const name = form.name.trim();
    const title = form.title.trim();
    const postPassword = form.postPassword.trim();
    if (!name || !title || !form.content || !postPassword) {
      setMessage("필수 항목을 입력해 주세요.");
      return;
    }
    if (postPassword.length < 4) {
      setMessage("게시글 비밀번호는 4자 이상이어야 합니다.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone: form.phone.trim(),
          email: form.email.trim(),
          title,
          content: form.content,
          postPassword,
        }),
      });
      const result = await readJson<ApiMessage>(response);

      if (!response.ok) {
        setMessage(result?.message ?? "문의 등록에 실패했습니다.");
        return;
      }

      setMessage(result?.message ?? "문의가 등록되었습니다.");
      setForm(initialForm);
    } catch {
      setMessage("문의 등록에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-[#20282d]">
      <Header />
      <main className="mx-auto w-full max-w-[1120px] px-4 pb-20 pt-[120px] lg:px-0">
        <section className="rounded-2xl border border-black/10 bg-white p-6 lg:p-10">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-3xl font-extrabold">문의 작성</h1>
            <Link href="/inquiry/list" className="text-sm text-[#4b5563] underline underline-offset-4">
              문의 목록으로
            </Link>
          </div>

          <form onSubmit={handleCreate} className="mt-6 space-y-3">
            <input
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              className="w-full rounded-md border border-black/20 px-3 py-2 text-sm"
              placeholder="이름"
              required
            />
            <input
              value={form.phone}
              onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
              className="w-full rounded-md border border-black/20 px-3 py-2 text-sm"
              placeholder="연락처 (선택)"
            />
            <input
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              type="email"
              className="w-full rounded-md border border-black/20 px-3 py-2 text-sm"
              placeholder="이메일 (선택)"
            />
            <input
              value={form.title}
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
              className="w-full rounded-md border border-black/20 px-3 py-2 text-sm"
              placeholder="제목"
              required
            />
            <textarea
              value={form.content}
              onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
              className="h-44 w-full rounded-md border border-black/20 px-3 py-2 text-sm"
              placeholder="문의 내용"
              required
            />
            <input
              value={form.postPassword}
              onChange={(e) => setForm((prev) => ({ ...prev, postPassword: e.target.value }))}
              type="password"
              className="w-full rounded-md border border-black/20 px-3 py-2 text-sm"
              placeholder="게시글 비밀번호 (4자 이상)"
              required
            />
            <button type="submit" disabled={submitting} className="w-full rounded-md bg-[#20282d] py-2.5 text-sm font-semibold text-white disabled:opacity-70">
              {submitting ? "등록 중..." : "문의 등록"}
            </button>
          </form>

          {message && <p className="mt-4 rounded-md bg-[#eef2f7] px-3 py-2 text-sm text-[#374151]">{message}</p>}
        </section>
      </main>
    </div>
  );
}
