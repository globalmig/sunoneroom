import Image from "next/image";

interface FooterProps {
  showFloating?: boolean;
}

export default function Footer({ showFloating = true }: FooterProps) {
  return (
    <>
      <footer className="bg-[#f1f1f1] py-10">
        <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-8 px-4 text-sm text-[#333] lg:flex-row lg:justify-between lg:px-0">
          <div>
            <Image
              src="https://cdn.qshop.ai/33186/gallery/17f298e018fe11f0aa711bbbcf70e0ff.png"
              alt="스테이원 독산역점 로고"
              width={200}
              height={56}
              className="h-9 w-auto"
            />
            <p className="mt-4">대표자명: 정현남 | 사업자등록번호: 579-02-03486</p>
            <p>소재지: 서울특별시 금천구 독산로 300-5 (2~3F)</p>
            <p>이메일: jhn3005@naver.com</p>
            <p className="mt-4 text-xl font-extrabold">02.802.3013</p>
            <p className="text-xl font-extrabold">010.8870.1703</p>
          </div>

          <div className="flex items-start gap-3">
            <button type="button" className="rounded-full border border-[#20282d] px-4 py-2 text-xs">
              CALL
            </button>
            <button type="button" className="rounded-full border border-[#20282d] px-4 py-2 text-xs">
              SMS
            </button>
            <button type="button" className="rounded-full border border-[#20282d] px-4 py-2 text-xs">
              NAVER
            </button>
          </div>
        </div>
      </footer>

      {showFloating && (
        <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-2">
          <button
            type="button"
            className="h-11 w-11 rounded-full bg-[#3d444a] text-xs font-semibold text-white shadow-lg"
          >
            TEL
          </button>
          <button
            type="button"
            className="h-11 w-11 rounded-full bg-[#3d444a] text-xs font-semibold text-white shadow-lg"
          >
            SMS
          </button>
          <button
            type="button"
            className="h-11 w-11 rounded-full bg-[#3d444a] text-xs font-semibold text-white shadow-lg"
          >
            TOP
          </button>
        </div>
      )}
    </>
  );
}

