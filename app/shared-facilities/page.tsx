import Link from "next/link";

type TabKey = "facilities" | "services";

interface SectionData {
  title: string;
  subtitle: string;
  items: string[];
}

const FACILITY_SECTIONS: SectionData[] = [
  {
    title: "Full-option",
    subtitle: "풀옵션 원룸텔",
    items: [
      "LCD TV모니터, 냉장고, 수납장, 옷장, 책상과 의자",
      "각방 화장실/샤워기, 개별 난방/환기닥트 시설",
      "각방 개별 에어컨(3층)",
      "각방 스프링클러, 화재감지기, 휴대용조명등, 소화기",
      "엘리베이터 운행",
    ],
  },
  {
    title: "Internet",
    subtitle: "인터넷 환경",
    items: ["초고속 인터넷 및 무선 WiFi", "언제든지 개인PC, 노트북, 스마트폰 이용이 편리합니다"],
  },
  {
    title: "Washing/Cooking",
    subtitle: "세탁 및 주방시설(각 층별)",
    items: ["전기압력밥솥, 대형냉장고, 정수기, 전자렌지, 인덕션, 토스터기 등 주방비품", "밥, 김치, 라면, 계란, 커피 무료제공", "세탁기, 다리미, 세제 무료제공"],
  },
  {
    title: "Rooftop",
    subtitle: "옥상 휴게공간",
    items: ["옥상에 넓은 테라스", "빨래건조대"],
  },
  {
    title: "Parking",
    subtitle: "주차공간",
    items: ["넓은 주차공간 확보"],
  },
];

const SERVICE_SECTIONS: SectionData[] = [
  {
    title: "Security",
    subtitle: "보안시설",
    items: ["출입구 디지털 도어록", "사각지대 없는 CCTV 녹화"],
  },
  {
    title: "Fire Protection",
    subtitle: "소방시설",
    items: ["스프링클러, 소화기, 자동 화재감지시스템, 휴대용 조명등", "불연소재 및 화재보험가입", "입실자 여러분의 안전에 만전을 기하였습니다"],
  },
];

function SharedLineIcon({ label }: { label: string }) {
  const commonProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.1,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-[2.6rem] w-[2.6rem]",
    "aria-hidden": true,
  };

  if (label.includes("CCTV"))
    return (
      <svg {...commonProps}>
        <rect x="4" y="8" width="12" height="7" rx="1.5" />
        <circle cx="9.5" cy="11.5" r="1.5" />
        <path d="M16 10l4-2v7l-4-2M9 15v3M6.5 18h5" />
      </svg>
    );
  if (label.includes("도어록"))
    return (
      <svg {...commonProps}>
        <rect x="7" y="4" width="10" height="16" rx="2" />
        <circle cx="12" cy="11" r="1.2" />
        <path d="M12 14v2" />
      </svg>
    );
  if (label.includes("에어컨"))
    return (
      <svg {...commonProps}>
        <rect x="4" y="6" width="16" height="5" rx="1.5" />
        <path d="M7 14c0 1.5-1 2-1 3M12 14c0 1.5-1 2-1 3M17 14c0 1.5-1 2-1 3" />
      </svg>
    );
  if (label.includes("냉장고"))
    return (
      <svg {...commonProps}>
        <rect x="7" y="3.5" width="10" height="17" rx="2" />
        <path d="M7 12h10M14.5 8h.01M14.5 15h.01" />
      </svg>
    );
  if (label.includes("전자렌지") || label.includes("전자레인지"))
    return (
      <svg {...commonProps}>
        <rect x="4" y="6" width="16" height="12" rx="2" />
        <path d="M8 10h6v4H8zM17 10v4M17 8v.01M17 16v.01" />
      </svg>
    );
  if (label.includes("침대"))
    return (
      <svg {...commonProps}>
        <path d="M3 12h18v6H3z" />
        <path d="M5 12V8h6v4" />
        <path d="M21 18v3M3 18v3" />
      </svg>
    );
  if (label.includes("책상") || label.includes("의자"))
    return (
      <svg {...commonProps}>
        <path d="M3 8h13v3H3zM5 11v8M14 11v8" />
        <path d="M17 12h4v3h-4zM17 15v4M21 15v4M17 19h4" />
        <path d="M8 15h3" />
      </svg>
    );
  if (label.includes("인터넷") || label.includes("WiFi") || label.includes("WiFI") || label.includes("노트북") || label.includes("스마트폰")) {
    return (
      <svg {...commonProps}>
        <path d="M4.5 10a11 11 0 0 1 15 0" />
        <path d="M7.5 13a7 7 0 0 1 9 0" />
        <path d="M10.5 16a3 3 0 0 1 3 0" />
        <circle cx="12" cy="19" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (label.includes("세탁기") || label.includes("세제") || label.includes("다리미"))
    return (
      <svg {...commonProps}>
        <rect x="5" y="4" width="14" height="16" rx="2" />
        <circle cx="12" cy="12" r="3.5" />
        <path d="M8 7h8" />
      </svg>
    );
  if (label.includes("주방") || label.includes("밥솥") || label.includes("인덕션") || label.includes("토스터기"))
    return (
      <svg {...commonProps}>
        <path d="M4 7h16M7 7v12M17 7v12M9 19h6" />
        <path d="M10 11h4M12 11v5" />
      </svg>
    );
  if (label.includes("테라스") || label.includes("옥상"))
    return (
      <svg {...commonProps}>
        <path d="M4 16h16M6 16V9h12v7M9 9V6h6v3" />
      </svg>
    );
  if (label.includes("주차"))
    return (
      <svg {...commonProps}>
        <path d="M6 7h8a3 3 0 0 1 0 6H6z" />
        <path d="M6 7v10M6 17h8" />
        <circle cx="7.5" cy="19" r="1.5" />
        <circle cx="16.5" cy="19" r="1.5" />
      </svg>
    );
  if (label.includes("화재") || label.includes("소방") || label.includes("소화기") || label.includes("스프링클러"))
    return (
      <svg {...commonProps}>
        <path d="M12 5v4M7 10h10" />
        <path d="M8 14c1 0 1.5.8 1.5 1.6S9 17.2 8 17.2M12 14c1 0 1.5.8 1.5 1.6S13 17.2 12 17.2M16 14c1 0 1.5.8 1.5 1.6S17 17.2 16 17.2" />
      </svg>
    );
  if (label.includes("엘리베이터"))
    return (
      <svg {...commonProps}>
        <rect x="6" y="4" width="12" height="16" rx="1.5" />
        <path d="M9 8l1.5-2L12 8M15 16l-1.5 2L12 16" />
      </svg>
    );

  return (
    <svg {...commonProps}>
      <circle cx="12" cy="12" r="7" />
    </svg>
  );
}

function InfoGroup({ data }: { data: SectionData }) {
  return (
    <section>
      <h3 className="border-b border-[#20282d] pb-3 text-2xl font-extrabold sm:text-3xl">
        {data.title}
        <span className="mt-1 block text-base font-semibold text-[#5f6b73] sm:ml-3 sm:mt-0 sm:inline sm:text-lg">{data.subtitle}</span>
      </h3>

      <ul className="mt-6 space-y-4">
        {data.items.map((item) => (
          <li key={`${data.title}-${item}`} className="grid gap-3 rounded-2xl border border-black/10 bg-white px-4 py-4 sm:grid-cols-[7.5rem_1fr] sm:items-center sm:px-5 sm:py-5">
            <div className="inline-flex h-[6.5rem] w-[6.5rem] items-center justify-center text-[#2f5fb8] sm:h-[7.5rem] sm:w-[7.5rem]">
              <SharedLineIcon label={item} />
            </div>
            <p className="text-[15px] font-medium leading-7 text-[#2e3b44]">{item}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

interface SharedFacilitiesPageProps {
  searchParams: Promise<{ tab?: string }>;
}

export default async function SharedFacilitiesPage({ searchParams }: SharedFacilitiesPageProps) {
  const { tab } = await searchParams;
  const activeTab: TabKey = tab === "services" ? "services" : "facilities";

  return (
    <main className="bg-[#f4f4f4] px-4 pb-20 pt-[110px] text-[#20282d] sm:pt-[120px]">
      <div className="mx-auto max-w-[1120px]">
        <div className="mb-8 flex justify-center gap-8 border-b border-black/10 pb-4 text-sm sm:text-base">
          <Link href="/shared-facilities?tab=facilities" className={activeTab === "facilities" ? "border-b-2 border-[#20282d] pb-1 font-bold" : "pb-1 text-[#8a8a8a]"}>
            공용시설
          </Link>
          <Link href="/shared-facilities?tab=services" className={activeTab === "services" ? "border-b-2 border-[#20282d] pb-1 font-bold" : "pb-1 text-[#8a8a8a]"}>
            서비스 안내
          </Link>
        </div>

        <div className="mb-12 text-center sm:mb-16">
          <h1 className="text-4xl font-extrabold sm:text-5xl">{activeTab === "facilities" ? "공용시설" : "서비스 안내"}</h1>
          <p className="mt-3 text-sm leading-6 text-[#7a7a7a]">SUN원룸텔 금촌역점 공용시설 안내</p>
        </div>

        {activeTab === "facilities" ? (
          <div className="space-y-14">
            {FACILITY_SECTIONS.map((section) => (
              <InfoGroup key={section.title} data={section} />
            ))}
          </div>
        ) : (
          <div className="space-y-14">
            {SERVICE_SECTIONS.map((section) => (
              <InfoGroup key={section.title} data={section} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
