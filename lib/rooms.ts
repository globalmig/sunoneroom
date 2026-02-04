export type RoomTypeKey = "A" | "B" | "C";

export interface RoomInfo {
  key: RoomTypeKey;
  slug: string;
  tabLabel: string;
  title: string;
  price: string;
  mainImage: string;
  images: string[];
}

export const ROOM_TYPES: RoomInfo[] = [
  {
    key: "A",
    slug: "standard-room",
    tabLabel: "개인시설 2층",
    title: "개인시설 2층",
    price: "문의부탁드립니다",
    mainImage: "https://cdn.qshop.ai/33186/gallery/f94056201db311f08944f3402d5968cc.JPG",
    images: [
      "https://cdn.qshop.ai/33186/gallery/f94056201db311f08944f3402d5968cc.JPG",
      "https://cdn.qshop.ai/33186/gallery/114e21d01db311f0a1e1a11e95291af9.JPG",
      "https://cdn.qshop.ai/33186/gallery/60c4bbb01db411f0a5004326f29317ec.JPG",
      "https://cdn.qshop.ai/33186/gallery/5a1bb7501db411f0ad4add32ecf75fd2.JPG",
      "https://cdn.qshop.ai/33186/gallery/52dd29b01db411f0b1f8f5a2e54379f6.JPG",
      "https://cdn.qshop.ai/33186/gallery/7b551e201db411f0a2600b149f261221.JPG",
    ],
  },
  {
    key: "B",
    slug: "deluxe-room",
    tabLabel: "개인시설 3층",
    title: "개인시설 3층",
    price: "문의부탁드립니다",
    mainImage: "https://cdn.qshop.ai/33186/gallery/52dd29b01db411f0b1f8f5a2e54379f6.JPG",
    images: [
      "https://cdn.qshop.ai/33186/gallery/52dd29b01db411f0b1f8f5a2e54379f6.JPG",
      "https://cdn.qshop.ai/33186/gallery/5a1bb7501db411f0ad4add32ecf75fd2.JPG",
      "https://cdn.qshop.ai/33186/gallery/60c4bbb01db411f0a5004326f29317ec.JPG",
      "https://cdn.qshop.ai/33186/gallery/114e21d01db311f0a1e1a11e95291af9.JPG",
      "https://cdn.qshop.ai/33186/gallery/998e16301db411f0a8845130e185e3fc.JPG",
      "https://cdn.qshop.ai/33186/gallery/a506f2201db411f0a8845130e185e3fc.JPG",
    ],
  },
  // {
  //   key: "C",
  //   slug: "suite-room",
  //   tabLabel: "스위트 룸",
  //   title: "스위트 룸",
  //   price: "800,000원 / 월",
  //   mainImage: "https://cdn.qshop.ai/33186/gallery/7b551e201db411f0a2600b149f261221.JPG",
  //   images: [
  //     "https://cdn.qshop.ai/33186/gallery/7b551e201db411f0a2600b149f261221.JPG",
  //     "https://cdn.qshop.ai/33186/gallery/8a1758b01db411f0ad4add32ecf75fd2.JPG",
  //     "https://cdn.qshop.ai/33186/gallery/998e16301db411f0a8845130e185e3fc.JPG",
  //     "https://cdn.qshop.ai/33186/gallery/a506f2201db411f0a8845130e185e3fc.JPG",
  //     "https://cdn.qshop.ai/33186/gallery/114e21d01db311f0a1e1a11e95291af9.JPG",
  //     "https://cdn.qshop.ai/33186/gallery/60c4bbb01db411f0a5004326f29317ec.JPG",
  //   ],
  // },
];
