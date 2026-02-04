import Image from "next/image";

const SERVICE_ITEMS = [
  {
    en: "Monthly Rent",
    title: "합리적인 가격",
    points: ["1개월 단위 거주 가능", "2인 거주 가능(협의)", "최소 보증금으로 초기 부담 완화", "월 65~80만원 객실 운영"],
    icon: "https://cdn.qshop.ai/22039/gallery/ee67c9a0e45f11efbd5d5db052f3b3f0.png",
  },
  {
    en: "Room Option",
    title: "룸 옵션",
    points: ["침대·책상·행거 등 기본 가구 제공", "전 객실 WIFI 사용 가능"],
    icon: "https://cdn.qshop.ai/22039/gallery/d510aa80e45f11efbd5d5db052f3b3f0.png",
  },
  {
    en: "Food Service",
    title: "푸드 서비스",
    points: ["원두커피 / 얼음 제공", "커피머신 / 전자레인지 / 토스트기 비치", "컵·접시·쟁반·도마 등 구비"],
    icon: "https://cdn.qshop.ai/22039/gallery/dd7e6950e45f11efbd5d5db052f3b3f0.png",
  },
  {
    en: "Laundry Service",
    title: "세탁·건조",
    points: ["세탁기 사용 가능", "건조기 사용 가능"],
    icon: "https://cdn.qshop.ai/22039/gallery/1a230230e46011ef9da2952c4dee4c89.png",
  },
  {
    en: "Security",
    title: "보안 시스템",
    points: ["24시간 CCTV 촬영", "24시간 모니터링", "개별 도어락"],
    icon: "https://cdn.qshop.ai/22039/gallery/3a86f090e46011ef9da2952c4dee4c89.png",
  },
  {
    en: "Other",
    title: "기타 서비스",
    points: ["주 단위 정기 소독", "주차 가능(협의)"],
    icon: "https://cdn.qshop.ai/22039/gallery/47ee5610e46011efbd5d5db052f3b3f0.png",
  },
];

const KEY_FACTS = [
  { label: "역세권 접근", value: "독산역 도보 5분" },
  { label: "운영 방식", value: "월 단위 단기 거주" },
  { label: "생활 편의", value: "24시간 출입 가능" },
];

export default function AboutPage() {
  return (
    <div className="bg-[#f6f8f9] text-[#20282d]">
      <section className="px-4 pt-[118px]">
        <div className="mx-auto max-w-[1200px]">
          <p className="anim-fade-up text-xs tracking-[0.22em] text-[#6f7780]">ABOUT STAY ONE</p>
          <div className="mt-4 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <h1 className="anim-fade-up text-5xl font-extrabold leading-[1.05] lg:text-7xl">
              Why
              <br />
              STAY ONE?
            </h1>
            <p className="anim-fade-up text-base leading-8 text-[#4f5661] lg:text-right" style={{ animationDelay: "120ms" }}>
              공간은 더 쾌적하게, 생활은 더 편안하게.
              <br />
              썬원룸텔이 합리적인 단기 주거 공간을 제안합니다.
            </p>
          </div>

          <div className="anim-fade-up mt-10 grid gap-6 border-y border-black/15 py-6 lg:grid-cols-3" style={{ animationDelay: "180ms" }}>
            {KEY_FACTS.map((fact) => (
              <div key={fact.label} className="flex items-baseline justify-between gap-4 lg:block text-center">
                <p className="text-sm text-[#6f7780]">{fact.label}</p>
                <p className="text-lg font-bold text-[#1a2330]">{fact.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="mx-auto grid max-w-[1200px] gap-4 lg:grid-cols-[1fr_1fr_0.9fr]">
          <div className="anim-fade-up relative min-h-[380px] overflow-hidden rounded-3xl lg:min-h-[520px]">
            {/* <Image src="https://cdn.qshop.ai/22039/gallery/b2628890e46011ef9da2952c4dee4c89.jpeg" alt="스테이원 공간 이미지" fill className="object-cover" priority /> */}
            <Image src="/images/station.png" alt="금촌역" fill className="object-cover" priority />
          </div>
          <div className="anim-fade-up relative min-h-[300px] overflow-hidden rounded-3xl lg:min-h-[520px]" style={{ animationDelay: "120ms" }}>
            {/* <Image src="https://cdn.qshop.ai/22039/gallery/8aa744a0fb2e11ef9964fd11d987c868.jpeg" alt="스테이원 객실 이미지" fill className="object-cover" /> */}

            <Image src="/images/private_2f_3.png" alt="스테이원 객실 이미지" fill className="object-cover" />
          </div>
          <div className="anim-fade-up flex min-h-[220px] items-end rounded-3xl bg-[#111823] p-6 text-white lg:min-h-[520px]" style={{ animationDelay: "200ms" }}>
            <div>
              <p className="text-xs tracking-[0.18em] text-white/70">PREMIUM RESIDENCE</p>
              <p className="mt-3 text-3xl font-extrabold leading-tight">STAY ONE DOKSAN</p>
              <p className="mt-4 text-sm leading-7 text-white/85">
                쾌적한 공간과 명확한 운영 기준으로
                <br />
                머무는 시간을 안정감 있게 설계합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="h-[320px] bg-cover bg-center bg-no-repeat lg:h-[420px] lg:bg-fixed"
        style={{
          backgroundImage: "linear-gradient(rgba(17,24,35,.34), rgba(17,24,35,.34)), url('/images/about_bg.png')",
        }}
      />

      <section className="px-4 pb-24 pt-18">
        <div className="mx-auto max-w-[1200px]">
          <div className="anim-fade-up mb-12 flex flex-col items-start justify-between gap-4 border-b border-black/10 pb-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm tracking-[0.14em] text-[#7a7a7a]">SERVICE</p>
              <h2 className="mt-2 text-5xl font-extrabold">스테이원 서비스 안내</h2>
            </div>
            <p className="text-sm text-[#646b76]">카드형은 서비스 리스트에만 적용하고, 나머지는 레이아웃 중심으로 구성했습니다.</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {SERVICE_ITEMS.map((item, idx) => (
              <article
                key={item.title}
                className="anim-fade-up rounded-2xl border border-black/5 bg-white p-7 shadow-[0_10px_30px_rgba(16,24,40,0.05)]"
                style={{ animationDelay: `${140 + idx * 70}ms` }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium tracking-[0.12em] text-[#8b8b8b]">{item.en}</p>
                    <h3 className="mt-1 text-3xl font-extrabold">{item.title}</h3>
                  </div>
                  <div className="relative h-14 w-14 shrink-0">
                    <Image src={item.icon} alt={item.title} fill className="object-contain" />
                  </div>
                </div>
                <ul className="mt-5 space-y-1.5 text-sm leading-7 text-[#4f4f4f]">
                  {item.points.map((point) => (
                    <li key={point}>- {point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
