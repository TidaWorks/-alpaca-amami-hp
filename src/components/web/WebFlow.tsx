"use client";

import { useReveal } from "@/hooks/useReveal";

const steps = [
  {
    number: "01",
    title: "相談・ヒアリング",
    badge: "無料",
    color: "#1D3A8A",
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
    color: "#15296B",
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
    color: "#FF6B35",
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
      className="relative bg-[#FAFAF7] py-24 md:py-32 px-6 scroll-mt-20 overflow-hidden"
    >
      {/* 控えめな背景ペイントアクセント */}
      <svg
        className="absolute -top-12 -right-24 w-[520px] h-[520px] pointer-events-none opacity-[0.06]"
        viewBox="0 0 600 600"
        aria-hidden="true"
      >
        <path
          d="M 80 200 Q 280 80 460 240 T 560 420"
          stroke="#1D3A8A"
          strokeWidth="80"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="120" cy="460" r="14" fill="#FF6B35" />
        <circle cx="160" cy="490" r="6" fill="#FF6B35" />
      </svg>

      <div className="relative max-w-5xl mx-auto">
        {/* 章扉 */}
        <div
          className="mb-14 md:mb-16 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <p className="text-[11px] font-bold tracking-[0.4em] text-[#1D3A8A] mb-3">
            CHAPTER 04
          </p>
          <p className="text-[11px] font-bold tracking-[0.4em] text-[#0A1228]/70 mb-5">
            FLOW / 3 STEPS
          </p>
          <h2 className="font-memphis-mincho text-[#0A1228] text-3xl md:text-5xl font-extrabold leading-[1.3] tracking-tight">
            ホームページが
            <br className="md:hidden" />
            <span className="relative inline-block">
              <span className="relative z-10">できるまで</span>
              <span
                className="absolute inset-x-0 bottom-1 h-[40%] bg-[#FF6B35]/30 -z-0"
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
                <div className="hidden md:flex absolute top-1/2 -right-6 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center bg-white shadow-md rounded-full border border-[#0A1228]/8">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              )}

              <div
                className="group relative bg-white border border-[#0A1228]/8 rounded-xl p-6 md:p-7 transition-all duration-700 shadow-[0_8px_30px_-10px_rgba(10,18,40,0.15)] hover:-translate-y-1 hover:shadow-[0_14px_40px_-12px_rgba(10,18,40,0.22)]"
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
                  <span className="font-memphis-mincho text-6xl md:text-7xl font-extrabold leading-none text-[#0A1228]">
                    {step.number}
                  </span>
                </div>

                {/* タイトル + バッジ */}
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <h3 className="font-memphis-mincho text-[#0A1228] text-xl font-extrabold">
                    {step.title}
                  </h3>
                  <span
                    className="text-[10px] font-black tracking-widest rounded-full px-2.5 py-0.5 whitespace-nowrap"
                    style={{
                      background: `${step.color}1A`,
                      color: step.color,
                    }}
                  >
                    {step.badge}
                  </span>
                </div>

                <p className="text-[#0A1228]/75 text-sm leading-relaxed">
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
