import Link from "next/link";

const LOCATION_ROWS = [
  {
    label: "오시는 길",
    value: (
      <ol className="list-decimal space-y-1 pl-4">
        <li>1호선 독산역 1번 출구에서 버스역 방향으로 한 블럭 이동</li>
        <li>우측 방향으로 직진 후 롯데메가마트 전 우측 골목 건물 2~3층</li>
      </ol>
    ),
  },
  {
    label: "이용시간",
    value: <span>매일 00:00 ~ 24:00</span>,
  },
  {
    label: "전화번호",
    value: (
      <div>
        <p>02-802-3013</p>
        <p>010-8870-1703</p>
      </div>
    ),
  },
  {
    label: "입실/퇴실",
    value: (
      <div className="grid gap-1 md:grid-cols-2">
        <span>입실(체크인) 1:00 PM</span>
        <span>퇴실(체크아웃) 11:00 AM</span>
      </div>
    ),
  },
  {
    label: "이용안내",
    value: (
      <div className="grid gap-1 md:grid-cols-3">
        <span>WIFI(와이파이)</span>
        <span>공유 주방</span>
        <span>원두 커피</span>
      </div>
    ),
  },
];

export default function LocationPage() {
  return (
    <main className="bg-[#f4f4f4] px-4 pb-20 pt-[96px] text-[#20282d]">
      <div className="mx-auto max-w-[1120px]">
        <section className="mb-10 overflow-hidden border border-black/10 bg-white">
          <iframe
            title="스테이원 독산역점 위치 지도"
            src="https://maps.google.com/maps?q=37.4698175,126.8938661&z=16&output=embed"
            className="h-[420px] w-full md:h-[520px]"
            loading="lazy"
          />
        </section>

        <section className="bg-white p-6 md:p-10">
          <p className="text-sm font-medium text-[#6b6b6b]">스테이원 독산역점</p>
          <h1 className="mt-2 text-2xl font-extrabold text-[#376a88] md:text-4xl">
            서울특별시 금천구 독산동 300-5 (2~3층)
          </h1>

          <div className="mt-8 border-t border-black/10">
            {LOCATION_ROWS.map((row) => (
              <div
                key={row.label}
                className="grid border-b border-black/10 py-4 md:grid-cols-[180px_1fr] md:gap-4"
              >
                <h2 className="mb-2 text-sm font-extrabold md:mb-0 md:text-base">{row.label}</h2>
                <div className="text-sm leading-7 text-[#333]">{row.value}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="https://map.naver.com/p/search/스테이원%20독산역점"
              target="_blank"
              className="rounded-full bg-[#20282d] px-5 py-2 text-xs font-semibold text-white"
            >
              네이버 지도 열기
            </Link>
            <Link
              href="tel:028023013"
              className="rounded-full border border-[#20282d] px-5 py-2 text-xs font-semibold"
            >
              전화 문의
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

