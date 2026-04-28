"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "業務分析・要件定義",
    badge: "無料",
    color: "#635BFF",
    description: "現場で何にどれだけ時間がかかっているか、丁寧にヒアリング。島内なら直接お伺いします。",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "プロトタイプ制作",
    badge: "約2〜4週間",
    color: "#FFC400",
    description: "本格実装の前に、画面イメージで動きを確認。ズレがあればこの段階で修正できます。",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "本番実装＆運用開始",
    badge: "ずっと伴走",
    color: "#0EA5E9",
    description: "実際のデータで運用スタート。使いながら気付いた改善要望にも、保守でずっと対応します。",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

export default function SystemFlow() {
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
      id="flow"
      className="relative bg-[#F8FAFC] py-20 md:py-28 px-6 scroll-mt-20 overflow-hidden border-t border-[#E5E7EB]"
    >
      <style>{`
        @keyframes sysFlowConnectorPulse {
          0%, 100% { transform: translateY(-50%) translateX(0); box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
          50% { transform: translateY(-50%) translateX(3px); box-shadow: 0 4px 12px rgba(99,91,255,0.18); }
        }
      `}</style>
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
              05
            </span>
            <span className="text-[11px] font-bold tracking-[0.3em] text-[#1A202C]">FLOW / 3 STEPS</span>
          </div>
          <h2 className="text-[#1A202C] text-3xl md:text-5xl font-extrabold leading-tight">
            導入の
            <br className="md:hidden" />
            <span className="text-[#635BFF]">流れ</span>
            。
          </h2>
        </div>

        <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-3 md:gap-8 relative">
          {steps.map((step, i) => (
            <div key={step.number} className="relative">
              {i < steps.length - 1 && (
                <div
                  className="hidden md:flex absolute top-1/2 -right-6 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center bg-white border border-[#E5E7EB] rounded-full shadow-sm"
                  style={{ animation: `sysFlowConnectorPulse 2.4s ease-in-out ${i * 0.4}s infinite` }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="#635BFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              )}

              <div
                className="group relative bg-white border border-[#E5E7EB] rounded-2xl p-6 md:p-7 shadow-sm hover:shadow-2xl hover:-translate-y-1 hover:border-transparent overflow-hidden"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(24px)",
                  transition: `opacity 0.7s ease ${150 + i * 120}ms, transform 0.5s ease ${150 + i * 120}ms, box-shadow 0.4s ease, border-color 0.3s ease, translate 0.3s ease`,
                }}
              >
                {/* ホバー時の薄いグロウ */}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-25 blur-3xl transition-opacity duration-500"
                  style={{ background: step.color }}
                />

                <div className="relative flex items-center gap-4 mb-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 group-hover:rotate-[-6deg] transition-transform duration-300"
                    style={{ background: step.color }}
                  >
                    {step.icon}
                  </div>
                  <span
                    className="text-5xl md:text-6xl font-extrabold leading-none tabular-nums group-hover:scale-105 transition-transform duration-300 origin-left"
                    style={{ color: step.color }}
                  >
                    {step.number}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <h3 className="text-[#1A202C] text-xl font-extrabold">
                    {step.title}
                  </h3>
                  <span
                    className="text-[10px] font-black tracking-widest rounded-full px-2 py-0.5 whitespace-nowrap"
                    style={{ background: `${step.color}1A`, color: step.color }}
                  >
                    {step.badge}
                  </span>
                </div>

                <p className="text-[#1A202C]/70 text-sm leading-relaxed">
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
