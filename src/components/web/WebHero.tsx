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
      className="relative overflow-hidden pt-28 md:pt-36 pb-24 md:pb-32 bg-[#FAFAF7]"
    >
      {/* KAIROS風 ペイント背景（PC/モバイル切替） */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* PC版 */}
        <div className="hidden md:block absolute inset-0">
          <Image
            src="/images/web-kairos/hero.webp"
            alt=""
            fill
            priority
            className="object-cover opacity-90"
            sizes="100vw"
          />
        </div>
        {/* モバイル版 */}
        <div className="md:hidden absolute inset-0">
          <Image
            src="/images/web-kairos/hero-mobile.webp"
            alt=""
            fill
            priority
            className="object-cover opacity-90"
            sizes="100vw"
          />
        </div>
        {/* 画像欠損時のフォールバック用 SVG暫定ペイントブロブ */}
        <svg
          className="absolute inset-0 w-full h-full opacity-40"
          viewBox="0 0 1600 900"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M 100 200 Q 400 100 700 300 T 1300 250"
            stroke="#1D3A8A"
            strokeWidth="120"
            fill="none"
            strokeLinecap="round"
            opacity="0.55"
          />
          <path
            d="M 800 600 Q 1000 500 1200 700"
            stroke="#FF6B35"
            strokeWidth="60"
            fill="none"
            strokeLinecap="round"
            opacity="0.6"
          />
          <circle cx="200" cy="700" r="20" fill="#FF6B35" opacity="0.5" />
          <circle cx="180" cy="730" r="8" fill="#FF6B35" opacity="0.35" />
          <circle cx="240" cy="680" r="12" fill="#1D3A8A" opacity="0.45" />
        </svg>
        {/* 下端フェード（次セクションへの繋ぎ） */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#FAFAF7] to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-[1.05fr_1fr] gap-12 md:gap-14 items-center">
        {/* ── 左カラム ── */}
        <div className="relative">
          {/* 章扉番号 */}
          <div className="mb-6">
            <p className="text-[11px] font-bold tracking-[0.4em] text-[#1D3A8A]">
              CHAPTER 00 / BRAND CONCEPT
            </p>
          </div>

          {/* 書道風サイン（小さいアクセント） */}
          <p
            className="font-brush text-3xl md:text-4xl text-[#1D3A8A] mb-3 animate-reveal-up"
            style={{ animationDelay: "30ms" }}
          >
            島の魅力を、世界へ。
          </p>

          {/* メインヘッドライン（明朝） */}
          <h1
            className="font-memphis-mincho text-[#0A1228] text-[2.6rem] md:text-[3.6rem] lg:text-[4.2rem] leading-[1.25] font-extrabold mb-7 tracking-tight animate-reveal-up"
            style={{ animationDelay: "60ms" }}
          >
            伝わるデザインで
            <br />
            <span className="relative inline-block">
              <span className="relative z-10">島の魅力</span>
              <span
                className="absolute inset-x-0 bottom-1 h-[35%] bg-[#FF6B35]/30 -z-0"
                aria-hidden="true"
              />
            </span>
            を、
            <br />
            世界へ。
          </h1>

          {/* サブコピー（手書き風） */}
          <p
            className="font-hand text-[#0A1228]/75 text-base md:text-lg leading-[2] mb-9 max-w-md animate-reveal-up"
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
            className="flex flex-wrap items-center gap-5 mb-10 animate-reveal-up"
            style={{ animationDelay: "440ms" }}
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-[#FF6B35] hover:bg-[#15296B] text-white font-black text-sm px-7 py-3.5 rounded-full shadow-lg hover:shadow-xl active:scale-[0.97] transition-all"
            >
              無料で相談する
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#works"
              className="inline-flex items-center text-sm font-black text-[#0A1228] underline decoration-[#FF6B35] decoration-[3px] underline-offset-[6px] hover:decoration-[#1D3A8A] transition-colors"
            >
              プロジェクトを見る →
            </a>
          </div>

        </div>

        {/* ── 右カラム: モックアップカルーセル ── */}
        <div className="relative flex flex-col items-center">
          {/* 装飾バッジ */}
          <span className="absolute -top-2 right-0 md:right-4 z-30 bg-[#0A1228] text-white font-bold text-[10px] tracking-[0.18em] px-3 py-1.5 rounded-full shadow-sm">
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
                    <div className="relative w-[200px] h-[400px] md:w-[230px] md:h-[460px] bg-[#0A1228] rounded-[36px] md:rounded-[44px] p-[6px] shadow-[0_24px_60px_-12px_rgba(10,18,40,0.35)] group-hover:shadow-[0_28px_70px_-12px_rgba(10,18,40,0.45)] group-hover:-translate-y-1 transition-all duration-500">
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
                      <p className="font-memphis-mincho text-base font-bold text-[#0A1228]">{demo.name}</p>
                      <p className="font-hand text-[12px] mt-1 tracking-widest text-[#1D3A8A]">{demo.category}</p>
                    </div>
                  </button>
                </div>
              );
            })}

            {/* 矢印（スマホ・PC両対応） */}
            <button
              onClick={() => goTo(current - 1)}
              className="flex absolute left-1 md:left-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-10 md:h-10 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-[#0A1228]/10 hover:bg-white hover:shadow-lg active:scale-[0.92] transition-all cursor-pointer"
              aria-label="前のデモ"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0A1228" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={() => goTo(current + 1)}
              className="flex absolute right-1 md:right-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-10 md:h-10 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-[#0A1228]/10 hover:bg-white hover:shadow-lg active:scale-[0.92] transition-all cursor-pointer"
              aria-label="次のデモ"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0A1228" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
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
                  i === current ? "bg-[#FF6B35] w-7" : "bg-[#0A1228]/15 w-1.5 hover:bg-[#0A1228]/30"
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
