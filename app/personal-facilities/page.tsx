import type { Metadata } from "next";
import MenuPage from "@/components/layout/MenuPage";

export const metadata: Metadata = {
  title: "개인시설",
  description: "썬원룸텔 개인시설 안내. 침대·책상·냉장고·개별 에어컨·샤워부스 완비, 풀옵션 독립 각방. 금촌역 도보 5분.",
  alternates: { canonical: "https://sunoneroom.com/personal-facilities" },
  openGraph: {
    title: "개인시설 | 썬원룸텔",
    description: "침대·책상·냉장고·개별 에어컨·샤워부스 완비, 풀옵션 독립 각방.",
    url: "https://sunoneroom.com/personal-facilities",
    images: [{ url: "/images/room/floor_02_01.png", width: 1200, height: 630, alt: "썬원룸텔 개인시설" }],
  },
};

export default function PersonalFacilitiesPage() {
  return (
    <MenuPage
      subtitle="PERSONAL FACILITIES"
      title="개인시설"
      description="룸 타입별로 침대, 책상, 수납장, 냉장고, 개별 에어컨 등 생활에 필요한 가구와 가전을 갖추고 있습니다. 상세 구성은 룸 상세 페이지에서 확인하실 수 있습니다."
    />
  );
}

