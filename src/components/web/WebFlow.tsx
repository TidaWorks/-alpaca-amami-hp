"use client";

import { useReveal } from "@/hooks/useReveal";

const steps = [
  {
    number: "01",
    title: "相談・ヒアリング",
    badge: "無料",
    color: "#635BFF",
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
    color: "#8B86FF",
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
    color: "#12C998",
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
      className="relative bg-gradient-to-br from-[#F5F3FF] via-white to-[#EFF6FF] py-20 md:py-28 px-6 scroll-mt-20 overflow-hidden"
    >
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
            <span className="bg-[#635BFF] text-white font-black text-[11px] tracking-widest px-2.5 py-1 rounded-md">
              04
            </span>
            <span className="text-[11px] font-bold tracking-[0.3em] text-[#1A202C]">FLOW / 3 STEPS</span>
          </div>
          <h2 className="font-memphis-mincho text-[#1A202C] text-3xl md:text-5xl font-extrabold leading-[1.3] tracking-tight">
            ホームページが
            <br className="md:hidden" />
            <span className="relative inline-block">
              <span className="relative z-10">できるまで</span>
              <span
                className="absolute inset-x-0 bottom-1 h-[40%] bg-[#12C998]/45 -z-0"
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
                <div className="hidden md:flex absolute top-1/2 -right-6 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center bg-white shadow-md rounded-full">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#635BFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              )}

              <div
                className="group relative bg-white border border-[#1A202C]/10 rounded-2xl p-6 md:p-7 transition-all duration-700 shadow-lg hover:-translate-y-1 hover:shadow-xl"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(24px)",
                  transitionDelay: `${150 + i * 120}ms`,
                }}
              >
                {/* 番号 + アイコン */}
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-md transition-transform duration-300 group-hover:rotate-[-6deg] group-hover:scale-110"
                    style={{ background: step.color }}
                  >
                    {step.icon}
                  </div>
                  <span className="font-memphis-mincho text-5xl md:text-6xl font-extrabold leading-none text-[#1A202C]">
                    {step.number}
                  </span>
                </div>

                {/* タイトル + バッジ */}
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <h3 className="font-memphis-mincho text-[#1A202C] text-xl font-extrabold">
                    {step.title}
                  </h3>
                  <span
                    className="text-[10px] font-black tracking-widest rounded-full px-2.5 py-0.5 whitespace-nowrap"
                    style={{
                      background: `${step.color}1F`,
                      color: step.color,
                    }}
                  >
                    {step.badge}
                  </span>
                </div>

                <p className="text-[#1A202C]/75 text-sm leading-relaxed">
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
