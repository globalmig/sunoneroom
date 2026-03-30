"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface PhotoGalleryProps {
  images: string[];
  alt: string;
}

export default function PhotoGallery({ images, alt }: PhotoGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const total = images.length;

  const goPrev = () =>
    setActiveIndex((prev) => (prev === null ? 0 : prev === 0 ? total - 1 : prev - 1));
  const goNext = () =>
    setActiveIndex((prev) => (prev === null ? 0 : prev === total - 1 ? 0 : prev + 1));

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, total]);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((src, idx) => (
          <button
            key={src}
            type="button"
            onClick={() => setActiveIndex(idx)}
            className="relative aspect-4/3 overflow-hidden rounded-2xl bg-white"
          >
            <Image src={src} alt={`${alt} ${idx + 1}`} fill className="object-cover transition-transform duration-300 hover:scale-105" />
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setActiveIndex(null)}
        >
          <div className="relative h-[80vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image src={images[activeIndex]} alt={`${alt} ${activeIndex + 1}`} fill className="object-contain" />

            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="이전 이미지"
                  className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-2xl text-white"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="다음 이미지"
                  className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-2xl text-white"
                >
                  ›
                </button>
              </>
            )}

            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              className="absolute right-0 top-0 rounded-full bg-black/60 px-4 py-2 text-xl text-white"
            >
              ✕
            </button>

            <p className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs text-white">
              {activeIndex + 1} / {total}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
