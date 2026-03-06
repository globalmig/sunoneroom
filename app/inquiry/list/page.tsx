"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Header from "@/components/layout/Header";

type InquiryListItem = {
  id: number;
  name: string;
  title: string;
  created_at: string;
};

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString("ko-KR");
}

export default function InquiryListPage() {
  const [items, setItems] = useState<InquiryListItem[]>([]);
  const [loadingList, setLoadingList] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const loadList = useCallback(async () => {
    setLoadingList(true);
    setMessage(null);
    try {
      const response = await fetch("/api/inquiry");
      const result = (await response.json()) as { items?: InquiryListItem[]; message?: string };
      if (!response.ok) {
        setMessage(result.message ?? "문의 목록을 불러오지 못했습니다.");
        return;
      }
      setItems(result.items ?? []);
    } catch {
      setMessage("문의 목록을 불러오지 못했습니다.");
    } finally {
      setLoadingList(false);
    }
  }, []);

  useEffect(() => {
    void loadList();
  }, [loadList]);

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-[#20282d]">
      <Header />
      <main className="mx-auto w-full max-w-[1120px] px-4 pb-20 pt-[120px] lg:px-0">
        <section className="rounded-2xl border border-black/10 bg-white p-6 lg:p-10">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-xs text-[#6a6a6a]">INQUIRY LIST</p>
              <h1 className="mt-2 text-3xl font-extrabold">문의 목록</h1>
            </div>
            <div className="flex gap-3 text-sm">
              <Link href="/inquiry/write" className="underline underline-offset-4">
                문의 작성
              </Link>
              <button type="button" onClick={() => void loadList()} disabled={loadingList} className="underline underline-offset-4 disabled:text-[#9ca3af]">
                새로고침
              </button>
            </div>
          </div>
          <p className="mt-3 text-sm text-[#4b5563]">게시글을 클릭하면 상세 페이지에서 비밀번호를 입력한 뒤 내용을 볼 수 있습니다.</p>

          <div className="mt-6 space-y-2">
            {loadingList && <p className="text-sm text-[#6b7280]">불러오는 중...</p>}
            {!loadingList && items.length === 0 && <p className="text-sm text-[#6b7280]">등록된 문의가 없습니다.</p>}

            {items.map((item) => (
              <Link key={item.id} href={`/inquiry/${item.id}`} className="block rounded-lg border border-black/10 px-3 py-3 hover:bg-[#f7f8fa]">
                <p className="truncate text-sm font-semibold">{item.title}</p>
                <div className="mt-1 flex items-center justify-between text-xs text-[#6b7280]">
                  <span>{item.name}</span>
                  <span>No. {item.id}</span>
                </div>
                <p className="mt-1 text-xs text-[#9ca3af]">{formatDate(item.created_at)}</p>
              </Link>
            ))}
          </div>

          {message && <p className="mt-4 rounded-md bg-[#eef2f7] px-3 py-2 text-sm text-[#374151]">{message}</p>}
        </section>
      </main>
    </div>
  );
}
