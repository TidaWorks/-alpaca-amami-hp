"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  {
    accent: "#FFE900",
    textColor: "#000000",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "島内で対面打ち合わせ",
    description: "奄美に住んでいるから、直接会って話せます。ニュアンスもその場で共有。",
  },
  {
    accent: "#EC6C00",
    textColor: "#FFFFFF",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: "納品後も安心サポート",
    description: "公開してからが本番。テキスト・画像の修正、サーバー管理まで月額で対応。",
  },
  {
    accent: "#004097",
    textColor: "#FFFFFF",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    title: "スマホでも美しく",
    description: "奄美の人がサイトを見るのは、ほぼスマホ。最初からスマホ主軸で設計します。",
  },
];

export default function WebFeatures() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const circlesRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = circlesRef.current;
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

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative bg-[#F8F8F8] py-32 md:py-40 px-6 md:px-10 scroll-mt-20 overflow-hidden"
    >
      {/* 背景ゴースト英字 */}
      <p
        className="absolute top-20 right-6 md:right-16 text-black/[0.04] text-[6rem] md:text-[14rem] leading-none pointer-events-none select-none"
        style={{ fontWeight: 400 }}
        aria-hidden="true"
      >
        Services
      </p>

      <div className="relative max-w-[1400px] mx-auto">
        {/* 章扉：givee Services 構造 */}
        <div
          className="grid md:grid-cols-[1fr_1.5fr] gap-12 md:gap-16 mb-20 md:mb-28 items-end transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <div>
            <h2
              className="text-black text-[4rem] md:text-[8rem] lg:text-[10rem] leading-[0.95] tracking-[-0.02em]"
              style={{ fontWeight: 400 }}
            >
              Service
            </h2>
            <p className="text-sm tracking-[0.3em] text-black/70 mt-4">
              サービス
            </p>
          </div>
          <div>
            <h3 className="text-black text-2xl md:text-4xl leading-[1.3] tracking-[-0.01em]" style={{ fontWeight: 500 }}>
              ALPACAの3つの強み。
            </h3>
            <p className="text-black/75 text-sm md:text-base leading-loose mt-6 max-w-md">
              島内に拠点を持つからこそ実現できる、顔の見えるWeb制作。
            </p>
          </div>
        </div>

        {/* 3つの円形サービスカード */}
        <div ref={circlesRef} className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="group relative flex flex-col items-center text-center transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(28px)",
                transitionDelay: `${200 + i * 150}ms`,
              }}
            >
              {/* 円形ビジュアル：中心から膨らんで出現 */}
              <div className="relative w-[260px] h-[260px] md:w-[300px] md:h-[300px] mb-8">
                {/* 外側の黒い細い枠：中心から拡大 */}
                <div
                  className="absolute inset-0 rounded-full border-[1.5px] border-black"
                  style={{
                    transformOrigin: "center",
                    transform: visible ? "scale(1)" : "scale(0)",
                    opacity: visible ? 1 : 0,
                    transition: `transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${300 + i * 180}ms, opacity 0.4s ease ${300 + i * 180}ms`,
                  }}
                />

                {/* 内側の色付き円：少し遅れて中心から膨らむ */}
                <div
                  className="absolute inset-6 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105"
                  style={{
                    background: feature.accent,
                    color: feature.textColor,
                    transformOrigin: "center",
                    transform: visible ? "scale(1)" : "scale(0)",
                    opacity: visible ? 1 : 0,
                    transition: `transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${500 + i * 180}ms, opacity 0.4s ease ${500 + i * 180}ms`,
                  }}
                >
                  <div
                    style={{
                      transformOrigin: "center",
                      transform: visible ? "scale(1)" : "scale(0)",
                      opacity: visible ? 1 : 0,
                      transition: `transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${750 + i * 180}ms, opacity 0.3s ease ${750 + i * 180}ms`,
                    }}
                  >
                    {feature.icon}
                  </div>
                </div>

                {/* 番号 — 円の右上 */}
                <span
                  className="absolute top-2 right-2 text-xs tracking-[0.3em] text-black/60"
                  style={{ fontWeight: 500 }}
                >
                  0{i + 1}
                </span>
              </div>

              <h4 className="text-black text-xl md:text-2xl mb-4" style={{ fontWeight: 500 }}>
                {feature.title}
              </h4>
              <p className="text-black/75 text-sm md:text-base leading-loose tracking-wide max-w-xs">
                {feature.description}
              </p>

              {/* アクセント線 */}
              <div className="mt-6 h-[2px] w-12" style={{ background: feature.accent }} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [style*="transform"] { transition: none !important; }
        }
      `}</style>
    </section>
  );
}
