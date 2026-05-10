"use client";

import Image from "next/image";
import { useReveal } from "@/hooks/useReveal";

export default function WebManifesto() {
  const [ref, visible] = useReveal<HTMLElement>({ threshold: 0.2 });

  const items = [
    { num: "9", unit: "業種", label: "デモサイトを公開中" },
    { num: "2", unit: "週間〜", label: "最短ランディングページ納品" },
    { num: "対面", unit: "OK", label: "奄美島内で打合せ可能" },
  ];

  return (
    <section
      id="works"
      ref={ref}
      className="relative overflow-hidden bg-[#0A1228]"
    >
      {/* 背景画像（あれば） */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/images/web-kairos/manifesto.webp"
          alt=""
          fill
          priority={false}
          sizes="100vw"
          className="object-cover opacity-50"
          aria-hidden="true"
        />
      </div>

      {/* SVGフォールバックペイント（画像未配置時の保険） */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-60 mix-blend-screen"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <path
          d="M 100 200 Q 400 100 700 300 T 1300 250"
          stroke="#1D3A8A"
          strokeWidth="160"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
        />
        <path
          d="M 200 700 Q 500 580 900 720 T 1500 680"
          stroke="#15296B"
          strokeWidth="120"
          fill="none"
          strokeLinecap="round"
          opacity="0.55"
        />
        <path
          d="M 800 600 Q 1000 480 1280 700"
          stroke="#FF6B35"
          strokeWidth="70"
          fill="none"
          strokeLinecap="round"
          opacity="0.85"
        />
        <circle cx="220" cy="780" r="22" fill="#FF6B35" opacity="0.75" />
        <circle cx="180" cy="820" r="9" fill="#FF6B35" opacity="0.55" />
        <circle cx="280" cy="760" r="13" fill="#1D3A8A" opacity="0.6" />
        <circle cx="1380" cy="180" r="18" fill="#FF6B35" opacity="0.65" />
      </svg>

      {/* 暗オーバーレイ */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#0A1228]/85 via-[#0A1228]/75 to-[#0A1228]/90 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-5xl mx-auto px-6 py-24 md:py-32">
        <div className="grid md:grid-cols-[1.3fr_1fr] gap-10 md:gap-14 items-center">
          {/* 左: メッセージ */}
          <div>
            <div
              className="mb-8 transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(12px)",
              }}
            >
              <p className="text-[11px] font-bold tracking-[0.4em] text-[#FF6B35] mb-3">
                CHAPTER 05
              </p>
              <p className="text-[11px] font-bold tracking-[0.4em] text-white/70">
                ABOUT / ALPACA
              </p>
            </div>

            <h2
              className="font-memphis-mincho text-white text-[2.2rem] md:text-[3rem] lg:text-[3.4rem] leading-[1.3] font-extrabold mb-8 tracking-tight transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transitionDelay: "80ms",
              }}
            >
              奄美大島を拠点に、
              <br />
              <span className="relative inline-block">
                <span className="relative z-10 text-white">ホームページ</span>
                <span
                  className="absolute inset-x-0 bottom-1 h-[80%] bg-[#FF6B35]/60 -z-0 rounded-sm"
                  aria-hidden="true"
                />
              </span>
              <br />
              を作っています。
            </h2>

            <p
              className="font-sans text-white/85 text-base leading-[2] max-w-xl transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transitionDelay: "200ms",
              }}
            >
              業種やお店の規模に合わせて、
              <span className="text-[#FF6B35] font-bold">必要な機能だけ</span>
              を揃えたサイトを作ります。
              <br />
              島内なら直接伺えるので、イメージを詰めるところから一緒に動けます。
            </p>
          </div>

          {/* 右: 実績数字（グラスカード） */}
          <div
            className="grid grid-cols-2 md:grid-cols-1 gap-5 transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transitionDelay: "350ms",
            }}
          >
            {items.map((item) => (
              <div
                key={item.label}
                className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-[3px] hover:bg-white/15 hover:border-white/30"
              >
                <p className="flex items-baseline gap-1.5">
                  <span className="font-memphis-mincho text-5xl md:text-6xl font-extrabold text-white tabular-nums leading-none">
                    {item.num}
                  </span>
                  <span className="font-hand text-lg text-[#FF6B35] ml-1">
                    {item.unit}
                  </span>
                </p>
                <p className="text-white/70 text-xs md:text-sm mt-2">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
