"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "相談・ヒアリング",
    badge: "無料",
    color: "#FF2E88",
    description: "お店のこだわりや想いを聞かせてください。島内なら直接お伺いします。",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "制作・確認",
    badge: "約2〜4週間",
    color: "#FFE500",
    description: "デザイン提案→制作→実機確認。気になる点はすべて修正します。",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "公開・サポート",
    badge: "ずっと安心",
    color: "#00FF85",
    description: "いよいよ公開。使い方もしっかりお教えします。保守サポートもスタート。",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

export default function WebFlow() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="flow" className="relative bg-[#0A0A0A] py-20 md:py-28 px-6 scroll-mt-20 overflow-hidden">
      {/* 背景ドット */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        aria-hidden="true"
        style={{ backgroundImage: "radial-gradient(circle, #FFFFFF 1px, transparent 1px)", backgroundSize: "32px 32px" }}
      />

      <div className="relative max-w-4xl mx-auto">
        {/* 見出し */}
        <div
          className="mb-12 md:mb-16 flex items-center gap-4 md:gap-8 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <div className="flex-1 min-w-0">
            <div className="inline-flex items-center gap-2 mb-5 bg-[#FF2E88] text-white text-[10px] font-black tracking-[0.25em] px-3 py-1.5 rounded-sm rotate-[-2deg] shadow-[0_0_24px_rgba(255,46,136,0.4)]">
              <span>→</span>
              <span>FLOW / 3 STEPS</span>
            </div>
            <h2 className="text-white text-3xl md:text-5xl font-black leading-tight tracking-tight">
              ホームページが
              <br className="md:hidden" />
              <span className="relative inline-block">
                <span className="relative z-10 text-black">できるまで</span>
                <span className="absolute inset-x-0 bottom-1 h-full bg-[#FFE500] -z-0 rotate-[-1deg]" style={{ boxShadow: "0 0 32px rgba(255,229,0,0.6)" }} />
              </span>
            </h2>
          </div>
          <img
            src="/images/alpaca/alpaca-check.png"
            alt="チェックマークを書いているアルパカ"
            aria-hidden="true"
            className="w-36 md:w-52 h-auto flex-shrink-0 pointer-events-none select-none drop-shadow-[0_0_20px_rgba(255,46,136,0.3)]"
          />
        </div>

        {/* 3ステップ */}
        <div className="space-y-5 md:space-y-0 md:grid md:grid-cols-3 md:gap-6 relative">
          {/* デスクトップ: ステップ間の矢印 */}
          <div className="hidden md:block absolute top-[52px] left-[calc(33.333%-14px)] w-7 text-[#FF2E88] z-10" style={{ filter: "drop-shadow(0 0 6px #FF2E88)" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
          <div className="hidden md:block absolute top-[52px] left-[calc(66.666%-14px)] w-7 text-[#FFE500] z-10" style={{ filter: "drop-shadow(0 0 6px #FFE500)" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>

          {steps.map((step, i) => (
            <div
              key={step.number}
              className="group relative bg-[#141414] border border-white/10 rounded-2xl p-6 transition-all duration-700 hover:-translate-y-1 overflow-hidden"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transitionDelay: `${150 + i * 120}ms`,
              }}
            >
              {/* ホバー時のネオン枠 */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ boxShadow: `inset 0 0 0 2px ${step.color}, 0 0 28px ${step.color}55` }}
              />

              {/* 番号 + アイコン */}
              <div className="flex items-center gap-3 mb-4 relative">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: `${step.color}22`,
                    color: step.color,
                    boxShadow: `inset 0 0 0 1px ${step.color}55`,
                  }}
                >
                  {step.icon}
                </div>
                <span className="text-4xl font-black font-display leading-none" style={{ color: step.color, textShadow: `0 0 18px ${step.color}66` }}>
                  {step.number}
                </span>
              </div>

              {/* タイトル + バッジ */}
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <h3 className="text-white text-lg font-black">{step.title}</h3>
                <span
                  className="text-[10px] font-black rounded-sm px-2 py-0.5 whitespace-nowrap rotate-[-2deg]"
                  style={{ background: step.color, color: "#0A0A0A" }}
                >
                  {step.badge}
                </span>
              </div>

              <p className="text-white/65 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
