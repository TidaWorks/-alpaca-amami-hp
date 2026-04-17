"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "相談・ヒアリング",
    badge: "無料",
    description: "お店のこだわりや想いを聞かせてください。島内なら直接お伺いします。",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "制作・確認",
    badge: "約2〜4週間",
    description: "デザイン提案→制作→実機確認。気になる点はすべて修正します。",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "公開・サポート開始",
    badge: "ずっと安心",
    description: "いよいよ公開。使い方もしっかりお教えします。保守サポートもスタート。",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
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
    <section ref={sectionRef} className="bg-white py-20 md:py-28 px-6">
      <div className="max-w-4xl mx-auto">
        {/* 見出し */}
        <div
          className="mb-12 md:mb-16 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <p className="text-[#F5A623] text-[11px] font-semibold tracking-[0.3em] uppercase mb-4 font-display">
            FLOW
          </p>
          <h2 className="text-[#2D2418] text-2xl md:text-3xl font-bold">
            ホームページができるまで
          </h2>
        </div>

        {/* 3ステップ */}
        <div className="space-y-5 md:space-y-0 md:grid md:grid-cols-3 md:gap-6 relative">
          {/* デスクトップ: ステップ間の矢印 */}
          <div className="hidden md:block absolute top-[52px] left-[calc(33.333%-12px)] w-6 text-[#D4CEC5] z-10">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
          <div className="hidden md:block absolute top-[52px] left-[calc(66.666%-12px)] w-6 text-[#D4CEC5] z-10">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>

          {steps.map((step, i) => (
            <div
              key={step.number}
              className="bg-[#FFFBF5] border border-[#EDE8E0] rounded-2xl p-6 transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(245,166,35,0.08)] hover:border-[#F5A623]/25"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transitionDelay: `${150 + i * 120}ms`,
              }}
            >
              {/* 番号 + アイコン */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-[#FFF3E0] flex items-center justify-center text-[#F5A623]">
                  {step.icon}
                </div>
                <span className="text-[#F5A623] text-2xl font-black font-display">{step.number}</span>
              </div>

              {/* タイトル + バッジ */}
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-[#2D2418] text-lg font-bold">{step.title}</h3>
                <span className="text-[10px] text-[#F5A623] bg-[#FFF3E0] rounded-full px-2 py-0.5 font-semibold whitespace-nowrap">
                  {step.badge}
                </span>
              </div>

              <p className="text-[#8A7D6B] text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
