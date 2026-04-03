"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const HEADER_MENU_ITEMS = [
  { label: "\uC18C\uAC1C", href: "/about" },
  { label: "\uAC1C\uC778\uC2DC\uC124", href: "/rooms/standard-room" },
  { label: "\uACF5\uB3D9\uC2DC\uC124", href: "/shared-facilities" },
  // { label: "\uC785\uC2E4\uBB38\uC758", href: "/inquiry" },
  { label: "\uC624\uC2DC\uB294 \uAE38", href: "/location" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-black/10 bg-white/90 backdrop-blur-sm lg:py-2">
        <div className="mx-auto flex h-16 w-full max-w-[1120px] items-center px-4 sm:px-6 lg:h-[74px] lg:px-0">
          <Link href="/" className="flex items-center">
            <Image src="/images/logo.png" alt="SUN\uC6D0\uB8F8\uD154 \uAE08\uCD0C\uC5ED\uC810 \uB85C\uACE0" width={220} height={60} className="h-9 w-auto lg:h-16 " priority />
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

          <button
            type="button"
            className="ml-auto flex h-10 w-10 items-center justify-center text-2xl lg:hidden"
            aria-label={isMenuOpen ? "\uBA54\uB274 \uB2EB\uAE30" : "\uBA54\uB274 \uC5F4\uAE30"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <span className="flex flex-col gap-1">
              <span className={`block h-0.5 w-5 bg-[#20282d] transition-transform duration-200 ${isMenuOpen ? "translate-y-[6px] rotate-45" : ""}`} />
              <span className={`block h-0.5 w-5 bg-[#20282d] transition-opacity duration-200 ${isMenuOpen ? "opacity-0" : "opacity-100"}`} />
              <span className={`block h-0.5 w-5 bg-[#20282d] transition-transform duration-200 ${isMenuOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </header>

      {isMenuOpen && <button type="button" className="fixed inset-0 z-30 bg-black/30 lg:hidden" aria-label="\uBA54\uB274 \uB2EB\uAE30" onClick={() => setIsMenuOpen(false)} />}

      <div
        id="mobile-navigation"
        className={`fixed inset-x-0 top-16 z-40 border-b border-black/10 bg-white/95 px-4 py-4 shadow-[0_18px_40px_rgba(15,23,42,0.12)] backdrop-blur-sm transition-all duration-200 lg:hidden ${
          isMenuOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <nav className="mx-auto flex w-full max-w-[1120px] flex-col gap-2">
          {HEADER_MENU_ITEMS.map((item) => (
            <Link key={item.label} href={item.href} className="rounded-2xl px-4 py-3 text-sm font-medium text-[#20282d] transition-colors hover:bg-[#f4f4f5]">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
