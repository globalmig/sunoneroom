import Image from "next/image";
import Link from "next/link";

const HEADER_MENU_ITEMS = [
  { label: "소개", href: "/about" },
  { label: "개인시설", href: "/rooms/standard-room" },
  { label: "공동시설", href: "/shared-facilities" },
  // { label: "입실문의", href: "/inquiry" },
  { label: "오시는 길", href: "/location" },
];

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-black/10 bg-white/90 backdrop-blur-sm lg:py-2">
      <div className="mx-auto flex h-16 w-full max-w-[1120px] items-center px-4 sm:px-6 lg:h-[74px] lg:px-0">
        <Link href="/" className="flex items-center">
          <Image src="/images/logo.png" alt="SUN원룸텔 금촌역점 로고" width={220} height={60} className="h-9 w-auto lg:h-16 " priority />
        </Link>

        <nav className="ml-10 hidden items-center gap-6 text-sm lg:flex">
          {HEADER_MENU_ITEMS.map((item) => (
            <Link key={item.label} href={item.href} className="hover:opacity-70">
              {item.label}
            </Link>
          ))}
        </nav>

        {/* <Link href="/inquiry" className="ml-auto hidden rounded-full bg-[#20282d] px-6 py-2.5 text-xs text-white lg:block">
          입실문의
        </Link> */}

        <button type="button" className="ml-auto flex h-10 w-10 items-center justify-center text-2xl lg:hidden" aria-label="메뉴 열기">
          <span className="flex flex-col gap-1">
            <span className="block h-0.5 w-5 bg-[#20282d]" />
            <span className="block h-0.5 w-5 bg-[#20282d]" />
            <span className="block h-0.5 w-5 bg-[#20282d]" />
          </span>
        </button>
      </div>
    </header>
  );
}
