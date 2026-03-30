import Link from "next/link";
import PhoneInquiryButton from "@/components/common/PhoneInquiryButton";

const LOCATION_ROWS = [
  {
    label: "교통",
    value: (
      <div className="space-y-1">
        <p>경의중앙선 금촌역 2번출구 5분거리</p>
        <p>2,5호선 충정로역 하차 8번출구</p>
        <p>버스노선 : 금촌역 정류장</p>
        <p>일반 10,150,333,600,90,900,92,92-1,100,11-2,17,3,38,567,77-1,77-2,77-4,77-5,799,9</p>
        <p>시외 3000,5000 광역 9709 공항 5600</p>
      </div>
    ),
  },
  {
    label: "입실문의",
    value: <span>031-948-2133</span>,
  },
  {
    label: "주 소",
    value: <span>파주시 정담길 17 (아동동 297) 보광빌딩 2,3층</span>,
  },
];

export default function LocationPage() {
  return (
    <main className="bg-[#f4f4f4] px-4 pb-20 pt-[96px] text-[#20282d]">
      <div className="mx-auto max-w-[1120px] ">
        <section className="relative mb-10 overflow-hidden border border-black/10 bg-white">
          <a
            href="https://naver.me/xJihMEVL"
            target="_blank"
            rel="noreferrer"
            className="absolute left-2 top-3 z-10 flex flex-col justify-center  w-full rounded-lg max-w-[320px] bg-white px-4 py-10 text-center text-sm leading-6 text-[#20282d] shadow-md "
          >
            <p className="font-bold">썬원룸텔</p>
            <p>
              아동동 297번지 3층 301호
              <br /> 보광빌딩 파주시 경기도 KR
            </p>
          </a>
          <iframe
            title="썬원룸텔 금촌역점 위치 지도"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8984233720475!2d126.77448477588325!3d37.768979871986865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c8d8605a7b233%3A0xe7e288e1392214a6!2z7I2s7JuQ66O47YWU!5e0!3m2!1sko!2skr!4v1770202204229!5m2!1sko!2skr"
            className="h-[420px] w-full md:h-[520px]"
            loading="lazy"
          />
        </section>

        <section className="bg-white p-6 md:p-10">
          <p className="text-sm font-medium text-[#6b6b6b]">SUN원룸텔</p>
          <h1 className="mt-2 text-2xl font-extrabold text-[#376a88] md:text-4xl">파주시 정담길 17 (아동동 297) 보광빌딩 2,3층</h1>

          <div className="mt-8 border-t border-black/10">
            {LOCATION_ROWS.map((row) => (
              <div key={row.label} className="grid border-b border-black/10 py-4 md:grid-cols-[180px_1fr] md:gap-4">
                <h2 className="mb-2 text-sm font-extrabold md:mb-0 md:text-base">{row.label}</h2>
                <div className="text-sm leading-7 text-[#333]">{row.value}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="https://naver.me/xJihMEVL" target="_blank" className="rounded-full bg-[#20282d] px-5 py-2 text-xs font-semibold text-white">
              네이버 지도 열기
            </Link>
            <PhoneInquiryButton phone="031-948-2133" className="rounded-full border border-[#20282d] px-5 py-2 text-xs font-semibold" />
          </div>
        </section>
      </div>
    </main>
  );
}
