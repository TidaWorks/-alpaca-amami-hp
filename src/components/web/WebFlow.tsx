"use client";

import { MemphisDots, MemphisRing, MemphisSquiggle, MemphisTriangle } from "./MemphisDecorations";
import { useReveal } from "@/hooks/useReveal";

const steps = [
  {
    number: "01",
    title: "相談・ヒアリング",
    badge: "無料",
    color: "#FF2DA0",
    bg: "memphis-card-pink",
    description: "お店のこだわりや想いを聞かせてください。島内なら直接お伺いします。",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "制作・確認",
    badge: "約2〜4週間",
    color: "#FFD600",
    bg: "memphis-card-yellow",
    description: "デザイン提案→制作→実機確認。気になる点はすべて修正します。",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "公開・サポート",
    badge: "ずっと安心",
    color: "#00E0D1",
    bg: "memphis-card-mint",
    description: "いよいよ公開。使い方もしっかりお教えします。保守サポートもスタート。",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

export default function WebFlow() {
  const [sectionRef, visible] = useReveal<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section
      ref={sectionRef}
      id="flow"
      className="relative bg-[#F7F7F7] py-20 md:py-28 px-6 scroll-mt-20 overflow-hidden border-t-2 border-[#111111]"
    >
      <div className="absolute inset-0 bg-memphis-speckle opacity-[0.06] pointer-events-none" aria-hidden="true" />

      {/* Memphis装飾 */}
      <MemphisRing color="#FF2DA0" className="absolute top-16 right-12 w-24 md:w-32 pointer-events-none animate-wiggle" />
      <MemphisDots color="#111111" className="absolute bottom-16 left-12 w-20 md:w-28 opacity-50 pointer-events-none animate-wiggle" />
      <MemphisSquiggle color="#FFD600" className="absolute top-40 left-1/4 w-32 md:w-40 pointer-events-none hidden md:block animate-pulse-soft" />
      <MemphisTriangle color="#00E0D1" className="absolute bottom-20 right-1/4 w-12 md:w-14 rotate-12 pointer-events-none animate-wiggle" />

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
            <span className="bg-[#FFD600] text-[#111111] font-black text-[11px] tracking-widest px-2.5 py-1 border-2 border-[#111111]">
              04
            </span>
            <span className="text-[11px] font-bold tracking-[0.3em] text-[#111111]">FLOW / 3 STEPS</span>
          </div>
          <h2 className="font-memphis-mincho text-[#111111] text-3xl md:text-5xl font-extrabold leading-[1.3] tracking-tight">
            ホームページが
            <br className="md:hidden" />
            <span className="relative inline-block">
              <span className="relative z-10">できるまで</span>
              <span
                className="absolute inset-x-0 bottom-1 h-[40%] bg-[#00E0D1] -z-0"
                aria-hidden="true"
              />
            </span>
            。
          </h2>
        </div>

        {/* 3ステップ */}
        <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-3 md:gap-8 relative">
          {steps.map((step, i) => (
            <div key={step.number} className="relative">
              {/* デスクトップ: 矢印（次への線） */}
              {i < steps.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-6 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center bg-white border-2 border-[#111111] rounded-full">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              )}

              <div
                className={`group relative bg-white border-2 border-[#111111] p-6 md:p-7 transition-all duration-700 memphis-lift ${step.bg}`}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(24px)",
                  transitionDelay: `${150 + i * 120}ms`,
                }}
              >
                {/* 番号 + アイコン */}
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center border-2 border-[#111111] text-[#111111] transition-transform duration-300 group-hover:rotate-[-6deg] group-hover:scale-110"
                    style={{ background: step.color }}
                  >
                    {step.icon}
                  </div>
                  <span className="font-memphis-mincho text-5xl md:text-6xl font-extrabold leading-none text-[#111111]">
                    {step.number}
                  </span>
                </div>

                {/* タイトル + バッジ */}
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <h3 className="font-memphis-mincho text-[#111111] text-xl font-extrabold">
                    {step.title}
                  </h3>
                  <span
                    className="text-[10px] font-black tracking-widest border-2 border-[#111111] px-2 py-0.5 whitespace-nowrap rotate-[-2deg] text-[#111111]"
                    style={{ background: step.color }}
                  >
                    {step.badge}
                  </span>
                </div>

                <p className="text-[#111111]/75 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
