"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  MemphisBlob,
  MemphisSquiggle,
} from "./MemphisDecorations";

const demos = [
  { name: "Hair Salon kukuru", category: "美容室", url: "/demo/salon", image: "/images/demo-screenshots/salon.png" },
  { name: "Bistro ADAN", category: "ビストロ", url: "/demo/restaurant", image: "/images/demo-screenshots/restaurant.png" },
  { name: "珊瑚の宿 いそかぜ", category: "民泊", url: "/demo/guesthouse", image: "/images/demo-screenshots/guesthouse.png" },
  { name: "南風建設", category: "建設業", url: "/demo/construction", image: "/images/demo-screenshots/construction.png" },
  { name: "BLUE AMAMI", category: "ダイビング", url: "/demo/diving", image: "/images/demo-screenshots/diving.png" },
  { name: "Pâtisserie Soleil", category: "パティスリー", url: "/demo/patisserie", image: "/images/demo-screenshots/patisserie.png" },
  { name: "AMAMI FOREST CAMP", category: "キャンプ場", url: "/demo/camp", image: "/images/demo-screenshots/camp.png" },
  { name: "島つむぎ整骨院", category: "整骨院", url: "/demo/osteopathic", image: "/images/demo-screenshots/osteopathic.png" },
  { name: "あまみ果樹園 太陽のしずく", category: "農園・直売", url: "/demo/farm", image: "/images/demo-screenshots/farm.png?v=2" },
];

export default function WebHero() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [isAuto, setIsAuto] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const total = demos.length;

  useEffect(() => {
    if (!isAuto) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAuto, total]);

  const goTo = useCallback(
    (index: number) => {
      setCurrent(((index % total) + total) % total);
      setIsAuto(false);
      const t = setTimeout(() => setIsAuto(true), 12000);
      return () => clearTimeout(t);
    },
    [total]
  );

  const goToDemo = (url: string) => {
    setIsAuto(false);
    router.push(url);
  };

  return (
    <section
      id="concept"
      className="relative bg-[#F7F7F7] overflow-hidden pt-28 md:pt-36 pb-20 md:pb-28"
    >
      {/* 斑点ドットパターン背景 */}
      <div className="absolute inset-0 bg-memphis-speckle opacity-[0.06] pointer-events-none" aria-hidden="true" />

      {/* Memphis装飾（3要素：Blob×2 + Squiggle、主役のコピー＋Phoneを立てる） */}
      <MemphisBlob color="#FF2DA0" className="absolute -top-10 -left-12 w-44 md:w-56 -rotate-12 pointer-events-none" />
      <MemphisBlob color="#FFD600" className="absolute top-32 right-[-3rem] w-32 md:w-40 rotate-[18deg] pointer-events-none" />
      <MemphisSquiggle color="#FF2DA0" className="absolute top-24 right-1/3 w-32 md:w-40 pointer-events-none hidden md:block" />

      <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-[1.05fr_1fr] gap-12 md:gap-14 items-center">
        {/* ── 左カラム ── */}
        <div className="relative z-10">
          {/* セクション番号タグ */}
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="bg-[#FF2DA0] text-white font-black text-[11px] tracking-widest px-2.5 py-1 border-2 border-[#111111]">
              01
            </span>
            <span className="text-[11px] font-bold tracking-[0.3em] text-[#111111]">BRAND CONCEPT</span>
          </div>

          {/* メインヘッドライン（明朝） */}
          <h1 className="font-memphis-mincho text-[#111111] text-[2.4rem] md:text-[3.4rem] lg:text-[4rem] leading-[1.25] font-extrabold mb-7 tracking-tight">
            伝わるデザインで
            <br />
            <span className="relative inline-block">
              <span className="relative z-10">島の魅力</span>
              <span
                className="absolute inset-x-0 bottom-1 h-[40%] bg-[#FFD600] -z-0"
                aria-hidden="true"
              />
            </span>
            を、
            <br />
            世界へ。
          </h1>

          {/* サブコピー */}
          <p className="font-memphis-mincho text-[#111111]/80 text-[0.95rem] md:text-base leading-[2] mb-9 max-w-md">
            ALPACAは、鹿児島県・奄美大島を拠点にする
            <br className="hidden md:block" />
            Webデザインスタジオです。
            <br />
            美しい自然、独自の文化、ゆったりとした島時間。
            <br className="hidden md:block" />
            その魅力をデザインで表現し、伝えていきます。
          </p>

          {/* CTAボタン群（主1+副1に絞り、主役を立てる） */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-[#FF2DA0] text-white font-black text-sm px-6 py-3.5 border-2 border-[#111111] rounded-full shadow-[4px_4px_0_0_#111111] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#111111] active:shadow-[0_0_0_0_#111111] active:translate-x-[4px] active:translate-y-[4px] transition-all"
            >
              無料で相談する
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#works"
              className="inline-flex items-center text-sm font-black text-[#111111] underline decoration-[#00E0D1] decoration-[3px] underline-offset-[6px] hover:decoration-[#FFD600] transition-colors"
            >
              プロジェクトを見る →
            </a>
          </div>

        </div>

        {/* ── 右カラム: モックアップカルーセル ── */}
        <div className="relative flex flex-col items-center">
          {/* 装飾バッジ */}
          <span className="absolute -top-2 right-0 md:right-4 z-30 bg-[#FFD600] text-[#111111] font-black text-[11px] tracking-widest px-3 py-1.5 border-2 border-[#111111] rotate-[-6deg] shadow-[3px_3px_0_0_#111111]">
            DEMO ×9業種
          </span>

          {/* Phoneカルーセル */}
          <div
            className="relative w-full h-[440px] md:h-[480px] flex items-center justify-center"
            ref={carouselRef}
          >
            {demos.map((demo, i) => {
              let diff = i - current;
              if (diff > total / 2) diff -= total;
              if (diff < -total / 2) diff += total;
              const abs = Math.abs(diff);
              const isActive = abs === 0;

              return (
                <div
                  key={demo.url}
                  className="absolute transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    transform: `translateX(${diff * 95}%) scale(${isActive ? 1 : 0.85})`,
                    opacity: abs <= 1 ? (isActive ? 1 : 0.3) : 0,
                    zIndex: isActive ? 10 : 5 - abs,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => goToDemo(demo.url)}
                    className="block group cursor-pointer text-left"
                  >
                    {/* Phone frame Memphis */}
                    <div className="relative w-[200px] h-[400px] md:w-[230px] md:h-[460px] bg-[#111111] rounded-[36px] md:rounded-[44px] p-[6px] border-2 border-[#111111] shadow-[6px_6px_0_0_#FF2DA0] group-hover:shadow-[8px_8px_0_0_#00E0D1] transition-all">
                      {/* notch */}
                      <div className="absolute top-[12px] md:top-[14px] left-1/2 -translate-x-1/2 w-[60px] md:w-[72px] h-[18px] md:h-[22px] bg-black rounded-full z-20" />
                      {/* screen */}
                      <div className="relative w-full h-full rounded-[31px] md:rounded-[37px] overflow-hidden bg-white">
                        <Image
                          src={demo.image}
                          alt={demo.name}
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 768px) 200px, 230px"
                          priority={isActive}
                        />
                      </div>
                    </div>
                    {/* labels */}
                    <div className="text-center mt-4">
                      <p className="font-memphis-mincho text-base font-bold text-[#111111]">{demo.name}</p>
                      <p className="text-[11px] mt-1 font-bold tracking-widest text-[#FF2DA0]">{demo.category}</p>
                    </div>
                  </button>
                </div>
              );
            })}

            {/* 矢印（スマホ・PC両対応） */}
            <button
              onClick={() => goTo(current - 1)}
              className="flex absolute left-1 md:left-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-10 md:h-10 items-center justify-center rounded-full bg-[#FFD600] border-2 border-[#111111] shadow-[3px_3px_0_0_#111111] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_0_#111111] transition-all"
              aria-label="前のデモ"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={() => goTo(current + 1)}
              className="flex absolute right-1 md:right-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-10 md:h-10 items-center justify-center rounded-full bg-[#FFD600] border-2 border-[#111111] shadow-[3px_3px_0_0_#111111] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_0_#111111] transition-all"
              aria-label="次のデモ"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* ドットナビ */}
          <div className="flex justify-center gap-1.5 mt-6">
            {demos.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-2.5 rounded-full transition-all duration-300 border border-[#111111] ${
                  i === current ? "bg-[#FF2DA0] w-7" : "bg-[#F7F7F7] w-2.5 hover:bg-[#FFD600]"
                }`}
                aria-label={`${demos[i].category}のデモに移動`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
