"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  {
    tag: "INTEGRATE",
    title: "データ一元管理",
    description: "予約・顧客・売上を1つのデータベースに。バラバラだった情報がつながり、判断が早くなる。",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14a9 3 0 0 0 18 0V5" />
        <path d="M3 12a9 3 0 0 0 18 0" />
      </svg>
    ),
    accent: "#635BFF",
    bg: "from-[#635BFF]/10 to-[#635BFF]/0",
  },
  {
    tag: "VISUALIZE",
    title: "リアルタイム可視化",
    description: "今日の売上、人気メニュー、来店傾向。経営状態がダッシュボードに常に映し出される。",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    accent: "#FFC400",
    bg: "from-[#FFC400]/15 to-[#FFC400]/0",
  },
  {
    tag: "AUTOMATE",
    title: "自動化で時間を取り戻す",
    description: "LINE Botでの自動応答、リマインダー、在庫アラート。手作業は機械に任せて、人は接客に集中。",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
        <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
        <path d="M21 3v5h-5" />
      </svg>
    ),
    accent: "#0EA5E9",
    bg: "from-[#0EA5E9]/10 to-[#0EA5E9]/0",
  },
];

export default function SystemFeatures() {
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
    <section
      ref={sectionRef}
      id="features"
      className="relative bg-[#F8FAFC] py-20 md:py-28 px-6 scroll-mt-20 overflow-hidden border-t border-[#E5E7EB]"
    >
      {/* PainPoints → Features を繋ぐ大矢印 */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 -top-7 md:-top-9 -translate-x-1/2 z-10 transition-all duration-700"
        style={{
          opacity: visible ? 1 : 0,
          transform: `translateX(-50%) translateY(${visible ? 0 : -8}px)`,
        }}
      >
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white border border-[#E5E7EB] shadow-md flex items-center justify-center">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#635BFF" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 4v16M5 14l7 7 7-7" />
          </svg>
        </div>
      </div>

      <div className="relative max-w-5xl mx-auto">
        <div
          className="mb-14 md:mb-16 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="bg-[#635BFF] text-white font-black text-[11px] tracking-widest px-2.5 py-1 rounded">
              03
            </span>
            <span className="text-[11px] font-bold tracking-[0.3em] text-[#1A202C]">FEATURES</span>
          </div>
          <h2 className="text-[#1A202C] text-3xl md:text-5xl font-extrabold leading-tight mb-4">
            ALPACAシステムの
            <br className="md:hidden" />
            <span className="text-[#635BFF]">3つの強み</span>
            。
          </h2>
          <p className="text-[#1A202C]/70 text-sm md:text-base">
            業務の煩雑さを、データとデザインで「なめらか」に。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`group relative bg-white border border-[#E5E7EB] rounded-2xl p-6 md:p-7 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 hover:border-transparent overflow-hidden bg-gradient-to-br ${feature.bg}`}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.7s ease ${150 + i * 100}ms, transform 0.5s ease ${150 + i * 100}ms, box-shadow 0.4s ease, border-color 0.3s ease, translate 0.3s ease`,
              }}
            >
              {/* ホバー時に滲むblob */}
              <span
                aria-hidden="true"
                className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-30 blur-3xl transition-opacity duration-500"
                style={{ background: feature.accent }}
              />

              <span
                className="relative inline-block text-[10px] font-black tracking-[0.2em] px-2 py-1 rounded mb-4 group-hover:tracking-[0.25em] transition-all duration-300"
                style={{ background: feature.accent, color: feature.accent === "#FFC400" ? "#1A202C" : "#FFFFFF" }}
              >
                {feature.tag}
              </span>

              <div
                className="relative text-[64px] font-extrabold leading-none mb-3 tabular-nums group-hover:scale-105 transition-transform duration-500 origin-left"
                style={{ color: feature.accent }}
              >
                0{i + 1}
              </div>

              <div
                className="relative w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-[-6deg] transition-transform duration-300"
                style={{ background: `${feature.accent}1A`, color: feature.accent }}
              >
                {feature.icon}
              </div>

              <h3 className="relative text-[#1A202C] text-xl md:text-[1.4rem] font-extrabold mb-3">
                {feature.title}
              </h3>
              <p className="relative text-[#1A202C]/70 text-sm leading-relaxed">
                {feature.description}
              </p>

              <div
                className="relative h-[3px] w-12 rounded-full mt-6 group-hover:w-20 transition-all duration-500"
                style={{ background: feature.accent }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
