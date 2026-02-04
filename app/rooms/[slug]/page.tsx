import Link from "next/link";
import { notFound } from "next/navigation";
import RoomGallery from "@/components/rooms/RoomGallery";
import RoomHeroSlider from "@/components/rooms/RoomHeroSlider";
import { ROOM_TYPES } from "@/lib/rooms";

interface RoomDetailPageProps {
  params: Promise<{ slug: string }>;
}

const BASIC_INFO_ITEMS = [
  { label: "거주 기간", value: "1개월 단위 계약 가능" },
  { label: "입실 인원", value: "최대 2인 (룸 타입별 상이)" },
  { label: "주차장", value: "전용주차장 사용 가능" },
  // { label: "체크인", value: "오후 1시" },
  // { label: "체크아웃", value: "오전 11시" },
];

const GUIDE_ITEMS = [
  {
    title: "계약 안내",
    description: "보증금 및 관리비는 상담 시 룸 타입에 따라 상세 안내됩니다.",
  },
  {
    title: "공용 공간 이용",
    description: "세탁실, 공용 주방 등 공용 시설을 규정에 맞춰 자유롭게 이용할 수 있습니다.",
  },
  {
    title: "입실 절차",
    description: "입실 전 룸 컨디션 확인 후 계약서 작성 및 이용 수칙 안내가 진행됩니다.",
  },
  {
    title: "생활 지원",
    description: "택배 수령, 분리수거, 비상 연락 등 기본 생활 안내를 제공합니다.",
  },
];

const PROVIDED_ITEMS = [
  { title: "가구", items: ["침대", "책상", "의자", "수납장", "행거"] },
  { title: "가전", items: ["냉장고", "전자레인지", "개별 에어컨"] },
  { title: "네트워크", items: ["초고속 인터넷", "Wi-Fi"] },
];

function FacilityIcon({ name }: { name: string }) {
  const commonProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-8 w-8",
    "aria-hidden": true,
  };

  switch (name) {
    case "침대":
      return (
        <svg {...commonProps}>
          <path d="M3 12h18v6H3z" />
          <path d="M5 12V8h6v4" />
          <path d="M21 18v3M3 18v3" />
        </svg>
      );
    case "책상":
      return (
        <svg {...commonProps}>
          <path d="M3 8h18v3H3z" />
          <path d="M6 11v9M18 11v9" />
          <path d="M9 15h6" />
        </svg>
      );
    case "의자":
      return (
        <svg {...commonProps}>
          <path d="M7 5h10v6H7z" />
          <path d="M6 13h12v4H6z" />
          <path d="M8 17v3M16 17v3" />
        </svg>
      );
    case "수납장":
      return (
        <svg {...commonProps}>
          <rect x="5" y="4" width="14" height="16" rx="1.5" />
          <path d="M5 10h14M12 4v16" />
        </svg>
      );
    case "행거":
      return (
        <svg {...commonProps}>
          <path d="M3 6h18" />
          <path d="M6 6v14M18 6v14" />
          <path d="M8 20h8" />
          <path d="M12 9l3 2-3 2-3-2z" />
        </svg>
      );
    case "냉장고":
      return (
        <svg {...commonProps}>
          <rect x="7" y="3.5" width="10" height="17" rx="2" />
          <path d="M7 12h10M14.5 8h.01M14.5 15h.01" />
        </svg>
      );
    case "전자레인지":
      return (
        <svg {...commonProps}>
          <rect x="4" y="6" width="16" height="12" rx="2" />
          <path d="M8 10h6v4H8zM17 10v4M17 8v.01M17 16v.01" />
        </svg>
      );
    case "개별 에어컨":
      return (
        <svg {...commonProps}>
          <rect x="4" y="6" width="16" height="5" rx="1.5" />
          <path d="M7 14c0 1.5-1 2-1 3M12 14c0 1.5-1 2-1 3M17 14c0 1.5-1 2-1 3" />
        </svg>
      );
    case "초고속 인터넷":
      return (
        <svg {...commonProps}>
          <path d="M4 16h16M6 16v3M18 16v3" />
          <path d="M8 12h8v4H8z" />
          <path d="M10 9c1-1 3-1 4 0" />
        </svg>
      );
    case "Wi-Fi":
      return (
        <svg {...commonProps}>
          <path d="M4.5 10a11 11 0 0 1 15 0" />
          <path d="M7.5 13a7 7 0 0 1 9 0" />
          <path d="M10.5 16a3 3 0 0 1 3 0" />
          <circle cx="12" cy="19" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    default:
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="7" />
        </svg>
      );
  }
}

function facilityTone() {
  return "bg-[#eef4ff] border-[#c7d9ff] text-[#2f5fb8]";
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
    <div className="min-h-screen bg-[#f7f7f4] text-[#1f2529]">
      <main className="mx-auto w-full max-w-[1120px] px-4 pb-20 pt-[96px] lg:px-0">
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-black/10 bg-white p-2 text-sm">
          {ROOM_TYPES.map((item) => {
            const isActive = item.slug === room.slug;
            return (
              <Link key={item.slug} href={`/rooms/${item.slug}`} className={`rounded-full px-4 py-2 transition ${isActive ? "bg-[#20282d] text-white" : "text-[#667076] hover:bg-black/5"}`}>
                {item.tabLabel}
              </Link>
            );
          })}
        </div>

        <section className="grid gap-7 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-10">
            <article className="overflow-hidden rounded-3xl border border-black/10 bg-white">
              <RoomHeroSlider images={room.images.length ? room.images : [room.mainImage]} title={room.title} />
            </article>

            <div className="space-y-4">
              <article className="rounded-2xl border border-black/10 bg-white p-6 lg:p-7">
                <h2 className="text-lg font-bold">이용 안내</h2>
                <div className="mt-5 divide-y divide-black/10">
                  {GUIDE_ITEMS.map((item, index) => (
                    <div key={item.title} className="grid gap-3 py-4 sm:grid-cols-[auto_1fr] sm:items-start">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#eef1f3] text-xs font-semibold text-[#44515a]">{index + 1}</span>
                      <div>
                        <p className="text-sm font-semibold text-[#243038]">{item.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-[#5a666f]">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-2xl border border-black/10 bg-white p-6 lg:p-7">
                <h2 className="text-lg font-bold">제공 품목</h2>
                <div className="mt-5 divide-y divide-black/10">
                  {PROVIDED_ITEMS.map((item) => (
                    <div key={item.title} className="py-4 first:pt-0 last:pb-0">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7a848c]">{item.title}</p>
                      <ul className="mt-3 grid grid-cols-3 gap-x-3 gap-y-4 sm:grid-cols-4 lg:grid-cols-5">
                        {item.items.map((name) => (
                          <li key={`${item.title}-${name}`} className="text-[#3b464e]">
                            <div title={name} className="flex flex-col items-center justify-center gap-1">
                              <span className={`inline-flex h-16 w-16 items-center justify-center rounded-full border ${facilityTone()}`}>
                                <FacilityIcon name={name} />
                              </span>
                              <span className="text-[11px] font-medium leading-none text-[#5a666f]">{name}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>

          <aside className="rounded-3xl border border-black/10 bg-white p-6 lg:sticky lg:top-28 lg:h-fit">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7f8a91]">Room Detail</p>
            <h1 className="mt-2 text-3xl font-bold lg:text-4xl">{room.title}</h1>
            <p className="mt-4 text-sm leading-relaxed text-[#586269]">
              채광, 수납, 동선을 균형 있게 구성한 개인 공간입니다.
              <br /> 장기 거주에 맞춰 필요한 핵심 요소를 간결하게 담았습니다.
            </p>

            <div className="mt-6 space-y-3 border-y border-black/10 py-5 text-sm text-[#4a545b]">
              {BASIC_INFO_ITEMS.map((item) => (
                <div key={item.label} className="flex items-start justify-between gap-4">
                  <span className="text-[#8a949b]">{item.label}</span>
                  <span className="text-right font-medium">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <a href="tel:028023013" className="block rounded-xl bg-[#20282d] px-4 py-3 text-center text-sm font-medium text-white">
                전화 문의
              </a>
            </div>
          </aside>
        </section>

        <RoomGallery images={room.images.length ? room.images : [room.mainImage]} title={room.title} />
      </main>
    </div>
  );
}
