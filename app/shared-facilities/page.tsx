"use client";

import { useState } from "react";
import Image from "next/image";

type TabKey = "facilities" | "services";

const PRIVATE_ROOM_OPTIONS = [
  { label: "에어컨", icon: "https://cdn.qshop.ai/22039/gallery/e9b127f0e47611ef9da2952c4dee4c89.png" },
  { label: "드럼세탁기", icon: "https://cdn.qshop.ai/22039/gallery/1a230230e46011ef9da2952c4dee4c89.png" },
  { label: "건조기", icon: "https://cdn.qshop.ai/22039/gallery/b3e249c0e46b11efbd5d5db052f3b3f0.png" },
  { label: "투도어 냉장고", icon: "https://cdn.qshop.ai/22039/gallery/9f0b81a0e47611ef8e38afad366fe9ec.png" },
  { label: "전자레인지", icon: "https://cdn.qshop.ai/22039/gallery/d21f5f80e47611ef8e38afad366fe9ec.png" },
  { label: "침대", icon: "https://cdn.qshop.ai/22039/gallery/46c3efc0e47411ef8e38afad366fe9ec.png" },
  { label: "책상&의자", icon: "https://cdn.qshop.ai/22039/gallery/4c4360e0e47711ef8e38afad366fe9ec.png" },
];

const COMMUNITY_SPACE = [
  { label: "공유 주방", icon: "https://cdn.qshop.ai/22039/gallery/5e798c80e47711ef8e38afad366fe9ec.png" },
  { label: "초고속 인터넷\n& WIFI", icon: "https://cdn.qshop.ai/22039/gallery/6e295b60e47711efbd5d5db052f3b3f0.png" },
];

const SOUNDPROOFING = [
  { label: "2중 방음벽돌 시공", icon: "https://cdn.qshop.ai/22039/gallery/46c3efc0e47411ef8e38afad366fe9ec.png" },
  { label: "2중 샷시", icon: "https://cdn.qshop.ai/22039/gallery/5326fe40e46c11ef8e38afad366fe9ec.png" },
];

const SECURITY = [
  { label: "디지털 도어락", icon: "https://cdn.qshop.ai/22039/gallery/3b7fb200e46c11ef9da2952c4dee4c89.png" },
  { label: "CCTV", icon: "https://cdn.qshop.ai/22039/gallery/3a86f090e46011ef9da2952c4dee4c89.png" },
];

const FIRE_SAFETY = [
  { label: "스프링쿨러", icon: "https://cdn.qshop.ai/22039/gallery/6ffaee70e47411ef9da2952c4dee4c89.png" },
  { label: "화재경보기", icon: "https://cdn.qshop.ai/22039/gallery/d5fdc7a0e47511efbd5d5db052f3b3f0.png" },
  { label: "소화기", icon: "https://cdn.qshop.ai/22039/gallery/d84ce7c0e47511ef965a414dec6991be.png" },
];

const KITCHEN_AND_FOOD_IMAGES = [
  "https://cdn.qshop.ai/33186/gallery/e3085f101db811f0a2600b149f261221.JPG",
  "https://cdn.qshop.ai/33186/gallery/e85e2f801db811f08944f3402d5968cc.JPG",
  "https://cdn.qshop.ai/33186/gallery/eb97fdc01db811f0b1f8f5a2e54379f6.JPG",
  "https://cdn.qshop.ai/33186/gallery/f236f0001db811f09fb8df5120759ecb.JPG",
  "https://cdn.qshop.ai/33186/gallery/fc96bad01db811f08944f3402d5968cc.JPG",
  "https://cdn.qshop.ai/22039/gallery/16d61ad0f98d11ef9ae0cb8a434c34a5.JPG",
];

const HALLWAY_CARE_IMAGES = [
  "https://cdn.qshop.ai/33186/gallery/0d15c0901db911f0ad4add32ecf75fd2.JPG",
  "https://cdn.qshop.ai/33186/gallery/1355c9f01db911f08944f3402d5968cc.JPG",
  "https://cdn.qshop.ai/33186/gallery/23cd07801db911f0b1f8f5a2e54379f6.JPG",
  "https://cdn.qshop.ai/33186/gallery/2ba368501db911f09fb8df5120759ecb.JPG",
  "https://cdn.qshop.ai/33186/gallery/317bd6401db911f0a1e1a11e95291af9.JPG",
  "https://cdn.qshop.ai/33186/gallery/3649b2001db911f09fb8df5120759ecb.JPG",
];

function IconGroup({ title, items, columns = 2 }: { title: string; items: { label: string; icon: string }[]; columns?: 2 | 3 }) {
  return (
    <section>
      <h3 className="border-b border-[#20282d] pb-3 text-3xl font-extrabold">{title}</h3>
      <div className={`mt-8 grid ${columns === 3 ? "grid-cols-2 md:grid-cols-3" : "grid-cols-2"} gap-8`}>
        {items.map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-3 text-center">
            <div className="relative h-16 w-16">
              <Image src={item.icon} alt={item.label} fill className="object-contain" />
            </div>
            <p className="whitespace-pre-line text-sm font-medium">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function GallerySection({ title, images }: { title: string; images: string[] }) {
  return (
    <section>
      <h3 className="border-b border-[#20282d] pb-3 text-3xl font-extrabold">{title}</h3>
      <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3">
        {images.map((src) => (
          <div key={src} className="relative aspect-square overflow-hidden bg-white">
            <Image src={src} alt={title} fill className="object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default function SharedFacilitiesPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("facilities");

  return (
    <main className="bg-[#f4f4f4] px-4 pb-20 pt-[120px] text-[#20282d]">
      <div className="mx-auto max-w-[1120px]">
        <div className="mb-8 flex justify-center gap-8 border-b border-black/10 pb-4">
          <button
            type="button"
            onClick={() => setActiveTab("facilities")}
            className={activeTab === "facilities" ? "border-b-2 border-[#20282d] pb-1 font-bold" : "pb-1 text-[#8a8a8a]"}
          >
            공용시설
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("services")}
            className={activeTab === "services" ? "border-b-2 border-[#20282d] pb-1 font-bold" : "pb-1 text-[#8a8a8a]"}
          >
            서비스 안내
          </button>
        </div>

        <div className="mb-16 text-center">
          <h1 className="text-5xl font-extrabold">{activeTab === "facilities" ? "공용시설" : "서비스 안내"}</h1>
          <p className="mt-3 text-sm text-[#7a7a7a]">스테이원 독산역점 공용시설 안내</p>
        </div>

        {activeTab === "facilities" ? (
          <div className="space-y-14">
            <IconGroup title="개인룸 풀옵션" items={PRIVATE_ROOM_OPTIONS} columns={3} />
            <div className="grid gap-14 lg:grid-cols-2">
              <IconGroup title="커뮤니티 공간" items={COMMUNITY_SPACE} />
              <IconGroup title="방음설계" items={SOUNDPROOFING} />
            </div>
            <div className="grid gap-14 lg:grid-cols-2">
              <IconGroup title="보안 시스템" items={SECURITY} />
              <IconGroup title="화재예방" items={FIRE_SAFETY} columns={3} />
            </div>
          </div>
        ) : (
          <div className="space-y-14">
            <GallerySection title="Kitchen & Food Services" images={KITCHEN_AND_FOOD_IMAGES} />
            <GallerySection title="Mail Box & Hallway Care" images={HALLWAY_CARE_IMAGES} />
          </div>
        )}
      </div>
    </main>
  );
}

