"use client";

import { useEffect, useRef, useState } from "react";

const industries = [
  {
    label: "飲食店",
    sub: "居酒屋・カフェ・寿司・ラーメン",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M3 11l18-5v12L3 14v-3z" />
        <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
      </svg>
    ),
  },
  {
    label: "宿泊業",
    sub: "民宿・ペンション・ホテル",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M3 21v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8" />
        <path d="M9 11V7a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4" />
        <line x1="3" y1="17" x2="21" y2="17" />
      </svg>
    ),
  },
  {
    label: "建設・建築業",
    sub: "工務店・設計士・職人",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M2 22h20" />
        <path d="M12 2L4 9h4v13h8V9h4z" />
      </svg>
    ),
  },
  {
    label: "小売・商店",
    sub: "商店・八百屋・お土産店",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M3 7l1.5-3h15L21 7v3a3 3 0 0 1-6 0M9 10a3 3 0 0 1-6 0V7M15 10a3 3 0 0 1-6 0V7M5 13v8h14v-8" />
      </svg>
    ),
  },
  {
    label: "観光・体験業",
    sub: "ガイド・体験講師・農業",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
];

export default function SystemIndustries() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-32 md:py-40 bg-white overflow-hidden border-t border-[#E5E7EB]"
    >
      <style>{`
        @keyframes indCardIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-6">
        <div
          className="mb-16 md:mb-20 max-w-3xl transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-[2px] bg-[#FF6B35] inline-block" />
            <p className="text-[11px] md:text-xs font-bold tracking-[0.3em] text-[#0A2540]">
              対応業種
            </p>
          </div>
          <h2
            className="text-[#0A2540] font-black leading-[1.05] mb-5"
            style={{ fontSize: "clamp(2rem, 7vw, 4.5rem)" }}
          >
            あなたの業界にも、
            <br />
            <span className="text-[#FF6B35]">合います</span>
            。
          </h2>
          <p className="text-[#0A2540]/70 text-sm md:text-base leading-[1.95] font-medium">
            奄美の島では、業種によって業務の中身が大きく違います。
            ALPACAは「業界専用パッケージ」を売らず、現場ごとに設計します。
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-5">
          {industries.map((ind, i) => (
            <div
              key={ind.label}
              className="group relative bg-[#FAFAF7] border border-[#E5E7EB] rounded-2xl p-5 md:p-7 hover:bg-[#0A2540] hover:border-[#0A2540] hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300"
              style={{
                opacity: 0,
                animation: visible ? `indCardIn 0.6s cubic-bezier(0.34, 1.2, 0.64, 1) ${i * 0.1}s forwards` : undefined,
              }}
            >
              <span className="absolute top-3 right-4 text-[#FF6B35]/50 group-hover:text-[#FF6B35] text-xs font-black tabular-nums transition-colors">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="text-[#0A2540] group-hover:text-[#FF6B35] mb-4 transition-colors duration-300">
                {ind.icon}
              </div>
              <h3 className="text-[#0A2540] group-hover:text-white text-base md:text-lg font-bold mb-1.5 transition-colors">
                {ind.label}
              </h3>
              <p className="text-[#0A2540]/55 group-hover:text-white/55 text-xs leading-relaxed transition-colors">
                {ind.sub}
              </p>
            </div>
          ))}
        </div>

        <div
          className="mt-14 text-center transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "600ms",
          }}
        >
          <p className="text-[#0A2540] text-base md:text-lg font-bold leading-[1.95]">
            掲載業種以外でも、まずはご相談ください。
            <br className="hidden md:inline" />
            現場を見れば、必ず仕組み化できる箇所が見つかります。
          </p>
        </div>
      </div>
    </section>
  );
}
