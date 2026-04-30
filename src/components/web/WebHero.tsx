"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const demos = [
  { name: "Hair Salon kukuru", category: "美容室", url: "/demo/salon", image: "/images/demo-screenshots/salon.png" },
  { name: "Bistro ADAN", category: "ビストロ", url: "/demo/restaurant", image: "/images/demo-screenshots/restaurant.png" },
  { name: "珊瑚の宿 いそかぜ", category: "民泊", url: "/demo/guesthouse", image: "/images/demo-screenshots/guesthouse.png" },
  { name: "南風建設", category: "建設業", url: "/demo/construction", image: "/images/demo-screenshots/construction.png" },
  { name: "BLUE AMAMI", category: "ダイビング", url: "/demo/diving", image: "/images/demo-screenshots/diving.png" },
  { name: "Pâtisserie Soleil", category: "パティスリー", url: "/demo/patisserie", image: "/images/demo-screenshots/patisserie.png" },
  { name: "AMAMI FOREST CAMP", category: "キャンプ場", url: "/demo/camp", image: "/images/demo-screenshots/camp.png" },
  { name: "島つむぎ整骨院", category: "整骨院", url: "/demo/osteopathic", image: "/images/demo-screenshots/osteopathic.png" },
  { name: "あまみ果樹園 太陽のしずく", category: "農園・直売", url: "/demo/farm", image: "/images/demo-screenshots/farm.png" },
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
      className="relative overflow-hidden pt-28 md:pt-36 pb-24 md:pb-32"
    >
      {/* Magic Hour 背景写真（PC/モバイル切替） */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* PC版 */}
        <div className="hidden md:block absolute inset-0">
          <Image
            src="/images/web-magic-hour.png"
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        {/* モバイル版 */}
        <div className="md:hidden absolute inset-0">
          <Image
            src="/images/web-magic-hour-mobile.png"
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        {/* 紫グラデーションオーバーレイ（可読性確保） */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1B3F]/70 via-[#2B2854]/55 to-[#635BFF]/55" />
        {/* 下端フェード（次セクションへの繋ぎ） */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#F5F3FF] to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-[1.05fr_1fr] gap-12 md:gap-14 items-center">
        {/* ── 左カラム ── */}
        <div className="relative">
          {/* セクション番号タグ */}
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="bg-white/15 backdrop-blur-sm text-white font-black text-[11px] tracking-widest px-2.5 py-1 rounded-full">
              01
            </span>
            <span className="text-[11px] font-bold tracking-[0.3em] text-white/80">BRAND CONCEPT</span>
          </div>

          {/* メインヘッドライン（明朝） */}
          <h1
            className="font-memphis-mincho text-white text-[2.4rem] md:text-[3.4rem] lg:text-[4rem] leading-[1.25] font-extrabold mb-7 tracking-tight animate-reveal-up drop-shadow-[0_2px_12px_rgba(0,0,0,0.25)]"
            style={{ animationDelay: "60ms" }}
          >
            伝わるデザインで
            <br />
            <span className="relative inline-block">
              <span className="relative z-10">島の魅力</span>
              <span
                className="absolute inset-x-0 bottom-1 h-[35%] bg-[#12C998]/60 -z-0"
                aria-hidden="true"
              />
            </span>
            を、
            <br />
            世界へ。
          </h1>

          {/* サブコピー */}
          <p
            className="font-memphis-mincho text-white/85 text-[0.95rem] md:text-base leading-[2] mb-9 max-w-md animate-reveal-up"
            style={{ animationDelay: "260ms" }}
          >
            ALPACAは、鹿児島県・奄美大島を拠点にする
            <br className="hidden md:block" />
            Webデザインスタジオです。
            <br />
            美しい自然、独自の文化、ゆったりとした島時間。
            <br className="hidden md:block" />
            その魅力をデザインで表現し、伝えていきます。
          </p>

          {/* CTAボタン群 */}
          <div
            className="flex flex-wrap items-center gap-4 mb-10 animate-reveal-up"
            style={{ animationDelay: "440ms" }}
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-[#FF3D7F] text-white font-black text-sm px-6 py-3.5 rounded-full shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.97] transition-all"
            >
              無料で相談する
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#works"
              className="inline-flex items-center text-sm font-black text-white underline decoration-[#12C998] decoration-[3px] underline-offset-[6px] hover:decoration-white transition-colors"
            >
              プロジェクトを見る →
            </a>
          </div>

        </div>

        {/* ── 右カラム: モックアップカルーセル ── */}
        <div className="relative flex flex-col items-center">
          {/* 装飾バッジ */}
          <span className="absolute -top-2 right-0 md:right-4 z-30 bg-white/85 backdrop-blur text-[#1A202C] font-bold text-[10px] tracking-[0.18em] px-3 py-1.5 rounded-full ring-1 ring-white/40 shadow-sm">
            DEMO × 9 業種
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
                    {/* Phone frame（柔らかドロップシャドウ） */}
                    <div className="relative w-[200px] h-[400px] md:w-[230px] md:h-[460px] bg-[#1A202C] rounded-[36px] md:rounded-[44px] p-[6px] shadow-[0_24px_60px_-12px_rgba(0,0,0,0.45)] group-hover:shadow-[0_28px_70px_-12px_rgba(0,0,0,0.55)] group-hover:-translate-y-1 transition-all duration-500">
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
                      <p className="font-memphis-mincho text-base font-bold text-white">{demo.name}</p>
                      <p className="text-[11px] mt-1 font-bold tracking-widest text-[#12C998]">{demo.category}</p>
                    </div>
                  </button>
                </div>
              );
            })}

            {/* 矢印（スマホ・PC両対応） */}
            <button
              onClick={() => goTo(current - 1)}
              className="flex absolute left-1 md:left-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-10 md:h-10 items-center justify-center rounded-full bg-white/80 backdrop-blur ring-1 ring-white/30 shadow-md hover:bg-white hover:shadow-lg active:scale-[0.92] transition-all cursor-pointer"
              aria-label="前のデモ"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1A202C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={() => goTo(current + 1)}
              className="flex absolute right-1 md:right-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-10 md:h-10 items-center justify-center rounded-full bg-white/80 backdrop-blur ring-1 ring-white/30 shadow-md hover:bg-white hover:shadow-lg active:scale-[0.92] transition-all cursor-pointer"
              aria-label="次のデモ"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1A202C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
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
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer active:scale-[0.85] ${
                  i === current ? "bg-[#FF3D7F] w-7" : "bg-white/30 w-1.5 hover:bg-white/50"
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
