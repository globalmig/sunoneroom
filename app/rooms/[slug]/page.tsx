import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";
import { ROOM_TYPES } from "@/lib/rooms";

interface RoomDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return ROOM_TYPES.map((room) => ({ slug: room.slug }));
}

export default async function RoomDetailPage({ params }: RoomDetailPageProps) {
  const { slug } = await params;
  const room = ROOM_TYPES.find((item) => item.slug === slug);

  if (!room) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#f4f4f4] text-[#20282d]">
      <main className="mx-auto w-full max-w-[1120px] px-4 pb-20 pt-[96px] lg:px-0">
        <div className="mb-8 flex items-center justify-center gap-8 text-sm">
          {ROOM_TYPES.map((item) => {
            const isActive = item.slug === room.slug;
            return (
              <Link
                key={item.slug}
                href={`/rooms/${item.slug}`}
                className={isActive ? "font-semibold text-[#20282d]" : "text-[#8a8a8a]"}
              >
                {item.tabLabel}
              </Link>
            );
          })}
        </div>

        <section className="mx-auto max-w-[780px]">
          <div className="relative mb-6 aspect-[16/9] overflow-hidden bg-white">
            <Image src={room.mainImage} alt={room.title} fill className="object-cover" />
          </div>

          <div className="text-center">
            <h1 className="text-4xl font-extrabold">{room.title}</h1>
            <p className="mt-2 text-sm tracking-[0.12em] text-[#737373]">ROOM TYPE</p>
            <div className="mt-6 flex justify-center gap-3">
              <Link href="/inquiry" className="rounded-full bg-[#20282d] px-6 py-2 text-xs text-white">
                입실 문의
              </Link>
              <button type="button" className="rounded-full border border-[#20282d] px-6 py-2 text-xs">
                전화 문의
              </button>
            </div>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="border-b border-black/40 pb-3 text-xl font-bold">기본 정보</h2>
              <ul className="mt-3 space-y-2 text-sm">
                <li>- 거주 기간: 1개월 단위로 거주 가능</li>
                <li>- 입실: 최대 2인까지 가능 (일부 룸 제외)</li>
                <li>- 입실(체크인): 1:00 PM</li>
                <li>- 퇴실(체크아웃): 11:00 AM</li>
              </ul>
            </div>
            <div>
              <h2 className="border-b border-black/40 pb-3 text-xl font-bold">가격</h2>
              <p className="mt-3 text-sm">- 월 비용: {room.price}</p>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="border-b border-black/40 pb-3 text-xl font-bold">제공</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>- 가구: 침대 / 책상 / 행거 / 수납장 / 의자</li>
              <li>- 가전: 냉장고 / 전자레인지 / 개별에어컨</li>
              <li>- 기타: 인터넷 / WIFI</li>
            </ul>
          </div>

          <div className="mt-10">
            <h2 className="border-b border-black/40 pb-3 text-xl font-bold">갤러리</h2>
            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
              {room.images.map((src) => (
                <div key={src} className="relative aspect-square overflow-hidden bg-white">
                  <Image src={src} alt={`${room.title} 갤러리`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

