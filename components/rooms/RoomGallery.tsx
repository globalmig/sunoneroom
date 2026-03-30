"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface RoomGalleryProps {
  images: string[];
  title: string;
}

export default function RoomGallery({ images, title }: RoomGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const total = images.length;

  const goPrev = () => {
    setActiveIndex((prev) => {
      if (prev === null) return 0;
      return prev === 0 ? total - 1 : prev - 1;
    });
  };

  const goNext = () => {
    setActiveIndex((prev) => {
      if (prev === null) return 0;
      return prev === total - 1 ? 0 : prev + 1;
    });
  };

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      } else if (event.key === "ArrowLeft") {
        setActiveIndex((prev) => {
          if (prev === null) return 0;
          return prev === 0 ? total - 1 : prev - 1;
        });
      } else if (event.key === "ArrowRight") {
        setActiveIndex((prev) => {
          if (prev === null) return 0;
          return prev === total - 1 ? 0 : prev + 1;
        });
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, total]);

  if (total === 0) {
    return null;
  }

  const [coverImage, ...galleryImages] = images;
  const modalImage = activeIndex !== null ? images[activeIndex] : null;

  return (
    <>
      <section className="mt-10 rounded-3xl border border-black/10 bg-white p-5 lg:p-7">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold">갤러리</h2>
          <p className="text-xs uppercase tracking-[0.16em] text-[#7f8a91]">{images.length} Photos</p>
        </div>

        <div className="grid gap-3 md:grid-cols-3 md:grid-rows-2">
          <button type="button" onClick={() => setActiveIndex(0)} className="relative aspect-[4/3] overflow-hidden rounded-2xl text-left md:col-span-2 md:row-span-2 md:aspect-auto md:min-h-[420px]">
            <Image src={coverImage} alt={`${title} 대표 이미지`} fill className="object-cover" />
          </button>

          {galleryImages.slice(0, 4).map((src, index) => (
            <button key={src} type="button" onClick={() => setActiveIndex(index + 1)} className="relative aspect-[4/3] overflow-hidden rounded-2xl text-left">
              <Image src={src} alt={`${title} 상세 이미지 ${index + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>

        {galleryImages.length > 4 && (
          <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
            {galleryImages.slice(4).map((src, index) => (
              <button key={src} type="button" onClick={() => setActiveIndex(index + 5)} className="relative aspect-4/3 overflow-hidden rounded-2xl text-left">
                <Image src={src} alt={`${title} 상세 이미지 ${index + 5}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </section>

      {modalImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setActiveIndex(null)}>
          <div className="relative h-[78vh] w-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
            <Image src={modalImage} alt={`${title} 확대 이미지`} fill className="object-contain" />
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
            <button type="button" onClick={() => setActiveIndex(null)} className="absolute right-0 top-0 rounded-full bg-black/60 px-6 py-1 text-2xl text-white py-4">
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
}
