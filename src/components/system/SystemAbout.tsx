"use client";

import { useEffect, useRef, useState } from "react";
import { Database, BarChart3, Workflow, Receipt } from "lucide-react";

const PILLARS = [
  { Icon: Database, label: "予約管理", desc: "客×日時×担当を一元化" },
  { Icon: Database, label: "顧客台帳", desc: "履歴・属性・連絡先を統合" },
  { Icon: BarChart3, label: "売上集計", desc: "リアルタイムダッシュボード" },
  { Icon: Receipt, label: "帳票出力", desc: "請求書・領収書を自動生成" },
];

export default function SystemAbout() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setRevealed(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95) {
      setRevealed(true);
      io.disconnect();
    }
    const failsafeId = window.setTimeout(() => setRevealed(true), 800);
    return () => {
      io.disconnect();
      window.clearTimeout(failsafeId);
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="text-center mb-14 md:mb-16">
          <p className={`inline-block text-[10px] tracking-[0.4em] text-[#2860E1] font-bold mb-6 ${revealed ? "fade-in" : "pre"}`} style={{ animationDelay: "0.05s" }}>
            ABOUT — 業務システムとは
          </p>
          <h2 className={`text-[#1D2A6E] text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.2] mb-7 ${revealed ? "fade-in" : "pre"}`} style={{ animationDelay: "0.15s" }}>
            <span className="text-[#2860E1]">紙とExcel</span>から、
            <br className="hidden md:block" />
            ひとつの仕組みへ。
          </h2>
          <p className={`text-[#5A6280] text-base md:text-lg leading-loose max-w-2xl mx-auto ${revealed ? "fade-in" : "pre"}`} style={{ animationDelay: "0.3s" }}>
            「予約管理」「顧客台帳」「売上集計」「帳票出力」を1つに統合した、
            <br className="hidden md:block" />
            奄美の小規模事業者向けカスタム業務システム。
          </p>
        </div>

        <div className={`mb-12 md:mb-16 bg-[#FAFAFA] border border-[#E5E9F5] rounded-3xl overflow-hidden ${revealed ? "fade-in" : "pre"}`} style={{ animationDelay: "0.35s" }}>
          <picture>
            <source media="(max-width: 767px)" srcSet="/images/system-v3/06-about-sp.png" />
            <img src="/images/system-v3/02-about-pc.png" alt="紙とExcelから業務システムへの移行図" className="w-full h-auto" width={1920} height={1080} />
          </picture>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 max-w-4xl mx-auto">
          {PILLARS.map(({ Icon, label, desc }, i) => (
            <div key={label} className={`group bg-white border border-[#E5E9F5] rounded-2xl p-6 md:p-7 text-center hover:border-[#2860E1]/50 hover:-translate-y-1 transition-all duration-300 ${revealed ? "fade-in" : "pre"}`} style={{ animationDelay: `${0.5 + i * 0.08}s` }}>
              <span className="inline-flex w-12 h-12 rounded-xl bg-[#EEF1FF] items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-[#2860E1]" strokeWidth={2} aria-hidden="true" />
              </span>
              <p className="font-bold text-[#1D2A6E] text-base md:text-lg mb-1">{label}</p>
              <p className="text-[#5A6280] text-[12px] font-bold leading-snug">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .pre { opacity: 0; transform: translateY(28px); }
        @keyframes show-up { 0% { opacity: 0; transform: translateY(28px); } 100% { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: show-up 0.7s cubic-bezier(0.165, 0.84, 0.44, 1) both; }
        @media (prefers-reduced-motion: reduce) { .fade-in { animation: none !important; } .pre { opacity: 1; transform: none; } }
      `}</style>
    </section>
  );
}
