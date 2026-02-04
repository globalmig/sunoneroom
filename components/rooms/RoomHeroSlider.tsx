"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface RoomHeroSliderProps {
  images: string[];
  title: string;
}

export default function RoomHeroSlider({ images, title }: RoomHeroSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = images.length;

  const goPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (total <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(timer);
  }, [total]);

  if (total === 0) {
    return null;
  }

  return (
    <div className="relative aspect-[16/10]">
      <Image src={images[activeIndex]} alt={`${title} 대표 이미지 ${activeIndex + 1}`} fill className="object-cover" priority />

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            aria-label="이전 이미지"
            className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="다음 이미지"
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white"
          >
            ›
          </button>

          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((src, idx) => (
              <button
                key={`${src}-${idx}`}
                type="button"
                aria-label={`${idx + 1}번 이미지 보기`}
                onClick={() => setActiveIndex(idx)}
                className={idx === activeIndex ? "h-2.5 w-6 rounded-full bg-white" : "h-2.5 w-2.5 rounded-full bg-white/55"}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
