"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import { ROOM_TYPES, type RoomTypeKey } from "@/lib/rooms";

const HERO_TEXT = {
  title: "SUN원룸텔",
  desc1: "금촌역 2번 출구 도보 5분, 전용 주차장 보유",
  desc2: "안전한 보안·소방 설비와 쾌적한 관리의 편안한 원룸텔",
};

const INTRO_IMAGES = ["/images/room/1.png", "/images/room/2.png"];

// const BLOG_CARDS = [
//   {
//     title: "신규 공용공간 리뉴얼 안내",
//     body: "공용 주방과 세탁 공간을 새롭게 정비했습니다. 더 넓어진 조리 공간과 건조 존으로 생활 편의성을 높였습니다.",
//     meta: "stayone | 2026-02-01 09:30",
//   },
//   {
//     title: "2월 입실 가능 객실 공지",
//     body: "2월 중순 기준 일부 객실이 비어 있습니다. 단기/장기 거주 모두 상담 가능하며, 방문 예약 후 투어가 가능합니다.",
//     meta: "stayone | 2026-01-28 14:05",
//   },
//   {
//     title: "생활 수칙 및 야간 보안 안내",
//     body: "입주민의 편안한 생활을 위해 공용공간 이용 시간과 야간 출입 수칙을 안내드립니다. 보안 점검도 정기적으로 진행 중입니다.",
//     meta: "stayone | 2026-01-22 18:40",
//   },
// ];

export default function Home() {
  const [activeRoom, setActiveRoom] = useState<RoomTypeKey>("A");

  const selectedRoom = useMemo(() => ROOM_TYPES.find((room) => room.key === activeRoom) ?? ROOM_TYPES[0], [activeRoom]);

  return (
    <div className="min-h-screen bg-[#f3f5f6] text-[#20282d]">
      <Header />

      <main className="pb-16">
        <section className="relative flex min-h-[88vh] items-center justify-end px-4 pt-16 sm:px-6 lg:px-0 lg:pt-[74px]">
          <div
            className="anim-fade-in absolute inset-0"
            style={{
              backgroundImage: "linear-gradient(115deg, rgba(255, 255, 255, 0.267) , rgba(53, 53, 53, 0.12) , rgba(17,23,31,.42) ), url('/images/room/main.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              animationDelay: "120ms",
            }}
          />
          <div className="relative z-10 mx-auto w-full max-w-[1120px]">
            <div
              className="anim-fade-up ml-auto max-w-[560px] rounded-2xl border border-white/25 bg-white/10 p-6 text-right text-white backdrop-blur-sm sm:p-8 lg:p-10"
              style={{ animationDelay: "220ms" }}
            >
              <p className="text-xs tracking-[0.24em] text-white/75">PREMIUM RESIDENCE</p>
              <h1 className="mt-3 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">{HERO_TEXT.title}</h1>
              <p className="mt-5 text-sm font-normal sm:text-base lg:text-lg">{HERO_TEXT.desc1}</p>
              <p className="mt-2 text-sm font-normal sm:text-base lg:text-lg">{HERO_TEXT.desc2}</p>
              <div className="mt-7 flex justify-end gap-3">
                <Link href="/inquiry" className="rounded-full bg-white px-5 py-2 text-xs font-bold text-[#111823]">
                  입실 문의
                </Link>
                <Link href="/about" className="rounded-full border border-white/60 px-5 py-2 text-xs font-bold text-white">
                  자세히 보기
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div
            className="anim-fade-up mx-auto grid w-full max-w-[1120px] gap-8 rounded-3xl border border-black/5 bg-white p-6 shadow-[0_20px_60px_rgba(16,24,40,0.08)] lg:grid-cols-[1fr_auto] lg:items-center lg:p-10"
            style={{ animationDelay: "180ms" }}
          >
            <div className="grid grid-cols-2 gap-3">
              {INTRO_IMAGES.map((src) => (
                <div key={src} className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-white">
                  <Image src={src} alt="" fill className="object-cover" />
                </div>
              ))}
            </div>

            <div className="text-right lg:max-w-[430px]">
              <p className="text-sm font-medium text-[#6a6a6a]">Welcome to</p>
              <h2 className="mt-1 text-5xl font-extrabold tracking-tight">SUN원룸텔</h2>
              <p className="mt-4 text-sm leading-7 text-[#525252]">
                넓은 옥상테라스, 휴식공간, 전용주차장, 무료 인터넷
                <br />
                Full Option 원룸텔
              </p>
              {/* <button type="button" className="mt-6 rounded-full border border-[#20282d] px-6 py-2 text-xs font-semibold">
                풀옵션 썬원룸텔
              </button> */}
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="mx-auto w-full max-w-[1120px] px-4 lg:px-0">
            <div className="anim-fade-up pb-10 text-center" style={{ animationDelay: "220ms" }}>
              <p className="text-sm text-[#666]">Premium Residence</p>
              <h3 className="mt-2 text-5xl font-extrabold">개인시설</h3>
              <p className="mt-4 text-sm leading-6 text-[#707070]">
                깔끔한 인테리어와 효율적인 동선으로
                <br />
                생활과 휴식을 모두 만족하는 개인 공간
              </p>
              <div className="mt-8 inline-flex rounded-full border border-black/10 bg-white p-1 text-sm shadow-sm">
                {ROOM_TYPES.map((room) => {
                  const isActive = room.key === activeRoom;
                  return (
                    <button
                      key={room.key}
                      type="button"
                      onClick={() => setActiveRoom(room.key)}
                      aria-pressed={isActive}
                      className={isActive ? "rounded-full bg-[#20282d] px-5 py-2 font-semibold text-white" : "px-5 py-2 text-[#7d7d7d]"}
                    >
                      {room.key === "A" ? "개인시설 2층" : room.key === "B" ? "개인시설 3층" : "룸 타입C"}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {selectedRoom.images.slice(0, 4).map((src, idx) => (
                <div key={src} className="anim-fade-up relative aspect-[3/4] overflow-hidden rounded-2xl bg-white" style={{ animationDelay: `${240 + idx * 80}ms` }}>
                  <Image src={src} alt="" fill className="object-cover" />
                </div>
              ))}
            </div>

            <div className="anim-fade-up mt-8 rounded-2xl border border-black/10 bg-white p-8 text-center shadow-sm" style={{ animationDelay: "340ms" }}>
              <h4 className="text-2xl font-extrabold">{selectedRoom.title}</h4>
              <p className="mt-2 text-sm text-[#555]">{selectedRoom.price}</p>
              <div className="mt-5 flex items-center justify-center gap-3">
                <Link href="/inquiry" className="rounded-full bg-[#20282d] px-6 py-2 text-xs font-semibold text-white">
                  입실 문의
                </Link>
                <Link href={`/rooms/${selectedRoom.slug}`} className="rounded-full border border-[#20282d] px-6 py-2 text-xs font-semibold">
                  상세 보기
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* <section className="pt-14">
          <div className="mx-auto w-full max-w-[1120px] px-4 lg:px-0">
            <p className="anim-fade-up text-xs tracking-[0.18em] text-[#666]" style={{ animationDelay: "180ms" }}>
              BLOG
            </p>
            <h3 className="anim-fade-up mt-3 text-5xl font-extrabold" style={{ animationDelay: "240ms" }}>
              블로그 피드
            </h3>

            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {BLOG_CARDS.map((post, idx) => (
                <article key={post.title} className="anim-fade-up rounded-2xl border border-black/10 bg-white p-6 shadow-sm" style={{ animationDelay: `${300 + idx * 90}ms` }}>
                  <h4 className="line-clamp-2 text-xl font-bold">{post.title}</h4>
                  <p className="mt-4 line-clamp-6 text-sm leading-7 text-[#555]">{post.body}</p>
                  <p className="mt-5 text-xs text-[#888]">{post.meta}</p>
                </article>
              ))}
            </div>
          </div>
        </section> */}
      </main>
    </div>
  );
}
