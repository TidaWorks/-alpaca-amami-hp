"use client";

import { useEffect, useRef, useState } from "react";

export default function WebManifesto() {
  const ref = useRef<HTMLElement | null>(null);
  const ovalAnchorRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ovalAnchorRef.current;
    if (!node) return;

    if (typeof window !== "undefined" && window.matchMedia) {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) {
        setVisible(true);
        return;
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const items = [
    { num: "3", unit: "日〜", label: "最短ランディングページ納品" },
    { num: "対面", unit: "OK", label: "奄美島内で打合せ可能" },
  ];

  return (
    <section
      id="works"
      ref={ref}
      className="relative overflow-hidden bg-[#F8F8F8] py-32 md:py-40 px-6"
    >
      {/* 装飾シェイプ */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg
          className="absolute -top-20 -left-10 w-[420px] h-[420px] hidden md:block"
          viewBox="0 0 400 400"
        >
          <path
            d="M80,180 C50,80 200,40 280,80 C360,120 370,260 320,320 C270,380 120,360 80,260 Z"
            fill="#FFE900"
            opacity="0.55"
          />
        </svg>
        <svg
          className="absolute bottom-10 right-0 w-[180px] h-[180px] hidden md:block"
          viewBox="0 0 200 200"
        >
          <circle cx="100" cy="100" r="80" fill="#004097" opacity="0.08" />
        </svg>
      </div>

      <div className="relative max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-[1.1fr_1.4fr] gap-16 lg:gap-24 items-start">
          {/* 左：巨大英文タイトル＋黄色楕円ストロークアニメ */}
          <div ref={ovalAnchorRef} className="relative">
            {/* 手描き風黄色楕円（筆触感あり） */}
            <svg
              className="absolute -top-6 -left-4 w-[360px] md:w-[480px] h-auto pointer-events-none overflow-visible"
              viewBox="0 0 500 200"
              aria-hidden="true"
            >
              {/* 筆触テクスチャ用フィルタ */}
              <defs>
                <filter id="brush-rough" x="-10%" y="-10%" width="120%" height="120%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.018 0.025" numOctaves="2" seed="3" />
                  <feDisplacementMap in="SourceGraphic" scale="3" />
                </filter>
              </defs>

              {/* 手書きストロークパス（始点と終点が微妙にズレる） */}
              <path
                d="M 80,38 C 145,18 285,18 365,38 C 445,58 480,95 470,125 C 460,160 355,182 240,180 C 130,178 38,160 28,118 C 24,82 55,52 90,42"
                stroke="#FFE900"
                strokeWidth="22"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#brush-rough)"
                style={{
                  strokeDasharray: 1200,
                  strokeDashoffset: visible ? 0 : 1200,
                  transition: "stroke-dashoffset 1.5s cubic-bezier(0.45, 0.05, 0.55, 0.95) 0.2s",
                  animation: visible ? "brush-pressure 1.5s cubic-bezier(0.45, 0.05, 0.55, 0.95) 0.2s both" : "none",
                }}
              />
            </svg>

            <div className="relative pt-4">
              <p
                className="text-sm tracking-[0.3em] text-black/70 mb-6 transition-all duration-700"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(16px)",
                }}
              >
                Our state ment
              </p>
              <h2
                className="text-black text-[3.5rem] md:text-[6rem] lg:text-[7rem] leading-[0.95] tracking-[-0.02em] transition-all duration-700"
                style={{
                  fontWeight: 400,
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(24px)",
                  transitionDelay: "200ms",
                }}
              >
                <span className="block">Our</span>
                <span className="block">state</span>
                <span className="block">ment</span>
              </h2>
              <p
                className="text-sm tracking-[0.2em] text-black/70 mt-6 transition-all duration-700"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(16px)",
                  transitionDelay: "400ms",
                }}
              >
                私たちについて
              </p>
            </div>
          </div>

          {/* 右：見出し＋本文＋実績数字 */}
          <div className="space-y-12">
            <h3
              className="text-black text-[2.2rem] md:text-[3.2rem] leading-[1.3] tracking-[-0.01em] transition-all duration-700"
              style={{
                fontWeight: 500,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transitionDelay: "300ms",
              }}
            >
              奄美大島を拠点に、
              <br />
              ホームページ
              <br />
              を作っています。
            </h3>

            <p
              className="text-black/80 text-base md:text-lg leading-loose tracking-wide max-w-xl transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transitionDelay: "500ms",
              }}
            >
              業種やお店の規模に合わせて、必要な機能だけを揃えたサイトを作ります。
              島内なら直接伺えるので、イメージを詰めるところから一緒に動けます。
            </p>

            {/* 数字カード */}
            <div
              className="grid grid-cols-2 gap-6 max-w-xl transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transitionDelay: "700ms",
              }}
            >
              {items.map((item, i) => (
                <div
                  key={item.label}
                  className="border-t border-black pt-5"
                  style={{ transitionDelay: `${800 + i * 120}ms` }}
                >
                  <p className="flex items-baseline gap-2">
                    <span className="text-black text-5xl md:text-6xl tabular-nums leading-none" style={{ fontWeight: 500 }}>
                      {item.num}
                    </span>
                    <span className="text-[#EC6C00] text-lg">{item.unit}</span>
                  </p>
                  <p className="text-black/70 text-xs md:text-sm mt-3 tracking-wide">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            {/* 黒丸pill button */}
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transitionDelay: "900ms",
              }}
            >
              <span className="inline-block bg-black text-white text-sm font-medium rounded-full px-7 py-3.5 group-hover:bg-[#EC6C00] transition-colors">
                ALPACAに相談する
              </span>
              <span className="w-11 h-11 border border-black rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes brush-pressure {
          0%   { stroke-width: 6;  opacity: 0.6; }
          15%  { stroke-width: 18; opacity: 0.95; }
          40%  { stroke-width: 26; opacity: 1; }
          60%  { stroke-width: 22; opacity: 1; }
          85%  { stroke-width: 28; opacity: 1; }
          100% { stroke-width: 18; opacity: 0.92; }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="brush-pressure"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
