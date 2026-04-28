import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://sunoneroom.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "썬원룸텔 | 금촌역 고시원·원룸텔",
    template: "%s | 썬원룸텔",
  },
  description: "금촌역 도보 5분 · 파주 풀옵션 원룸텔. 독립 각방, 보증금 0원·월 36만원~. 주차·CCTV 완비.",
  keywords: ["금촌역 고시원", "금촌역 원룸텔", "파주 고시원", "파주 원룸텔", "금촌 원룸텔", "썬원룸텔", "SUN원룸텔", "파주 단기임대", "금촌 풀옵션"],
  authors: [{ name: "썬원룸텔" }],
  creator: "썬원룸텔",
  publisher: "썬원룸텔",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: BASE_URL,
    siteName: "썬원룸텔",
    title: "썬원룸텔 | 금촌역 고시원·원룸텔",
    description: "금촌역 도보 5분 · 파주 풀옵션 원룸텔. 독립 각방, 보증금 0원·월 36만원~. 주차·CCTV 완비.",
    images: [{ url: "/images/room/main.png", width: 1200, height: 630, alt: "썬원룸텔 금촌역점" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "썬원룸텔 | 금촌역 고시원·원룸텔",
    description: "금촌역 도보 5분 · 파주 풀옵션 원룸텔. 독립 각방, 보증금 0원·월 36만원~. 주차·CCTV 완비.",
    images: ["/images/room/main.png"],
  },
  alternates: { canonical: BASE_URL },
  // 네이버 서치어드바이저: https://searchadvisor.naver.com 에서 발급받은 코드를 아래에 입력
  verification: {
    other: {
      "naver-site-verification": ["79c024fc519e2305cfe4e2e05c0a80caf775a511"],
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: "썬원룸텔",
  alternateName: "SUN원룸텔",
  url: BASE_URL,
  telephone: "031-948-2133",
  address: {
    "@type": "PostalAddress",
    streetAddress: "정담길 17",
    addressLocality: "파주시",
    addressRegion: "경기도",
    postalCode: "10813",
    addressCountry: "KR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 37.76898,
    longitude: 126.77448,
  },
  description: "금촌역 2번출구 도보 5분 거리의 풀옵션 원룸텔. 24시간 CCTV 보안, 전용 주차장, 옥상 테라스.",
  priceRange: "₩₩",
  image: `${BASE_URL}/SEO.jpg`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
