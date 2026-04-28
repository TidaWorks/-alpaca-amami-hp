"use client";

import { MemphisDots, MemphisRing, MemphisSquiggle, MemphisTriangle, MemphisWave } from "./MemphisDecorations";
import { useReveal } from "@/hooks/useReveal";

const features = [
  {
    tag: "MEETING",
    accent: "#FF2DA0",
    bg: "memphis-card-pink",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
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
    tag: "SUPPORT",
    accent: "#00E0D1",
    bg: "memphis-card-mint",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: "納品後も安心サポート",
    description: "公開してからが本番。テキスト・画像の修正、サーバー管理まで月額で対応。",
  },
  {
    tag: "MOBILE",
    accent: "#FFD600",
    bg: "memphis-card-yellow",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    title: "スマホでも美しく",
    description: "奄美の人がサイトを見るのは、ほぼスマホ。最初からスマホ主軸で設計します。",
  },
];

export default function WebFeatures() {
  const [sectionRef, visible] = useReveal<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative bg-[#F7F7F7] py-20 md:py-28 px-6 scroll-mt-20 overflow-hidden border-t-2 border-[#111111]"
    >
      {/* Memphis装飾 */}
      <MemphisDots color="#111111" className="absolute top-12 right-12 w-24 md:w-32 opacity-50 pointer-events-none animate-wiggle" />
      <MemphisRing color="#FF2DA0" className="absolute bottom-20 left-8 w-20 md:w-28 pointer-events-none hidden md:block animate-wiggle" />
      <MemphisSquiggle color="#00E0D1" className="absolute top-24 left-1/3 w-32 md:w-40 pointer-events-none hidden md:block animate-pulse-soft" />
      <MemphisTriangle color="#FFD600" className="absolute bottom-16 right-1/4 w-12 md:w-14 -rotate-12 pointer-events-none animate-wiggle" />
      <MemphisWave color="#FF2DA0" className="absolute bottom-10 left-1/2 -translate-x-1/2 w-40 md:w-56 opacity-70 pointer-events-none animate-pulse-soft" />

      <div className="relative max-w-5xl mx-auto">
        {/* 見出し */}
        <div
          className="mb-14 md:mb-16 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="bg-[#00E0D1] text-[#111111] font-black text-[11px] tracking-widest px-2.5 py-1 border-2 border-[#111111]">
              02
            </span>
            <span className="text-[11px] font-bold tracking-[0.3em] text-[#111111]">FEATURES</span>
          </div>
          <h2 className="font-memphis-mincho text-[#111111] text-3xl md:text-5xl font-extrabold mb-5 leading-[1.3] tracking-tight">
            ALPACAの
            <br className="md:hidden" />
            <span className="relative inline-block">
              <span className="relative z-10">3つの強み</span>
              <span
                className="absolute inset-x-0 bottom-1 h-[40%] bg-[#FF2DA0] -z-0"
                aria-hidden="true"
              />
            </span>
            。
          </h2>
          <p className="font-memphis-mincho text-[#111111]/75 text-sm md:text-base">
            島内に拠点を持つからこそ実現できる、顔の見えるWeb制作。
          </p>
        </div>

        {/* 3カード */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 md:gap-8">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`group relative bg-white border-2 border-[#111111] p-6 md:p-7 transition-all duration-500 memphis-lift ${feature.bg}`}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transitionDelay: `${150 + i * 100}ms`,
              }}
            >
              {/* タグ */}
              <span
                className="absolute -top-3 -right-2 text-[10px] font-black tracking-[0.2em] px-2.5 py-1 border-2 border-[#111111] rotate-[3deg] text-[#111111]"
                style={{ background: feature.accent }}
              >
                {feature.tag}
              </span>

              {/* 番号 */}
              <div
                className="font-memphis-mincho text-[64px] font-extrabold leading-none mb-3 text-[#111111]"
              >
                0{i + 1}
              </div>

              {/* アイコン */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-5 border-2 border-[#111111] text-[#111111] transition-transform duration-300 group-hover:rotate-[-6deg] group-hover:scale-110"
                style={{ background: feature.accent }}
              >
                {feature.icon}
              </div>

              <h3 className="font-memphis-mincho text-[#111111] text-xl md:text-[1.4rem] font-extrabold mb-3">
                {feature.title}
              </h3>
              <p className="text-[#111111]/75 text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* アクセントバー */}
              <div
                className="h-[4px] w-12 rounded-full mt-6"
                style={{ background: feature.accent }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
