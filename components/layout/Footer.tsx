import Image from "next/image";
import Link from "next/link";

interface FooterProps {
  showFloating?: boolean;
}

export default function Footer({ showFloating = true }: FooterProps) {
  return (
    <>
      <footer className="bg-[#817f7c] py-10 ">
        <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-8 px-4 text-sm text-white lg:flex-row lg:justify-between lg:px-0">
          <div>
            <Link href="/" className="flex items-center">
              <Image src="/images/logo.png" alt="스테이원 독산역점 로고" width={220} height={60} className="h-9 w-auto lg:h-16 " priority />
            </Link>
            <p className="mt-4">대표자명: 김양임 | 사업자등록번호: 806-15-00232</p>
            <p>소재지: 파주시 정담길 17 (아동동 297) 보광빌딩 2,3층 SUN원룸텔</p>
            <p>이메일: sun101259@hanmail.net</p>
            <p className="mt-4 text-xl font-extrabold">TEL.031-948-2133</p>
          </div>

          {/* <div className="flex items-start gap-3">
            <button type="button" className="rounded-full border border-[#20282d] px-4 py-2 text-xs">
              CALL
            </button>
            <button type="button" className="rounded-full border border-[#20282d] px-4 py-2 text-xs">
              SMS
            </button>
            <button type="button" className="rounded-full border border-[#20282d] px-4 py-2 text-xs">
              NAVER
            </button>
          </div> */}
        </div>
      </footer>
      {/* 
      {showFloating && (
        <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-2">
          <button type="button" className="h-11 w-11 rounded-full bg-[#3d444a] text-xs font-semibold text-white shadow-lg">
            TEL
          </button>
          <button type="button" className="h-11 w-11 rounded-full bg-[#3d444a] text-xs font-semibold text-white shadow-lg">
            SMS
          </button>
          <button type="button" className="h-11 w-11 rounded-full bg-[#3d444a] text-xs font-semibold text-white shadow-lg">
            TOP
          </button>
        </div>
      )} */}
    </>
  );
}
