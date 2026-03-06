"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";

export default function InquiryHomePage() {
  return (
    <div className="min-h-screen bg-[#f4f6f8] text-[#20282d]">
      <Header />
      <main className="mx-auto w-full max-w-[1120px] px-4 pb-20 pt-[120px] lg:px-0">
        <section className="rounded-2xl border border-black/10 bg-white p-6 lg:p-10">
          <p className="text-sm text-[#6a6a6a]">INQUIRY BOARD</p>
          <h1 className="mt-2 text-4xl font-extrabold">입실 문의 게시판</h1>
          <p className="mt-4 text-sm leading-7 text-[#4d4d4d]">
            문의 작성, 문의 목록, 게시글 상세를 각각 분리된 페이지로 제공합니다.
          </p>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-2">
          <Link href="/inquiry/write" className="rounded-2xl border border-black/10 bg-white p-6 hover:bg-[#f8fafb]">
            <p className="text-xs text-[#6b7280]">WRITE</p>
            <p className="mt-2 text-2xl font-extrabold">문의 작성</p>
            <p className="mt-2 text-sm text-[#4b5563]">새 문의를 등록합니다.</p>
          </Link>
          <Link href="/inquiry/list" className="rounded-2xl border border-black/10 bg-white p-6 hover:bg-[#f8fafb]">
            <p className="text-xs text-[#6b7280]">LIST</p>
            <p className="mt-2 text-2xl font-extrabold">문의 목록</p>
            <p className="mt-2 text-sm text-[#4b5563]">등록된 문의를 확인하고 상세 페이지로 이동합니다.</p>
          </Link>
        </section>
      </main>
    </div>
  );
}
