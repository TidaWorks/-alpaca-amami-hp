"use client";

import { useEffect, useRef, useState } from "react";

const STEPS = [
  { no: "01", title: "ヒアリング（無料）", body: "現場業務・既存ツール・担当者の動きを直接お聞きし、必要な機能を切り分けます。", duration: "無料" },
  { no: "02", title: "設計・お見積もり", body: "業務フロー図・画面イメージ・データベース設計をご提示。範囲と費用を合意します。", duration: "1〜2週間" },
  { no: "03", title: "構築（実装）", body: "Next.js + Supabase ベースで安全に構築。途中段階で動くものを見てもらいながら進めます。", duration: "1〜3ヶ月" },
  { no: "04", title: "納品・操作レクチャー", body: "本番環境へリリース、現場スタッフ向けの操作レクチャー実施。マニュアル動画も用意。", duration: "1日〜" },
  { no: "05", title: "保守・改善", body: "月額保守でサーバー管理・障害対応・機能追加要望に都度対応。継続アップデート可。", duration: "運用中" },
];

export default function SystemFlow() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current;
    const io = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { setRevealed(true); io.disconnect(); } }); },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95) { setRevealed(true); io.disconnect(); }
    const failsafeId = window.setTimeout(() => setRevealed(true), 800);
    return () => { io.disconnect(); window.clearTimeout(failsafeId); };
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#FAFAFA] py-24 md:py-32">
      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-10 md:gap-16 items-end mb-14 md:mb-16">
          <div>
            <p className={`inline-block text-[10px] tracking-[0.4em] text-[#2860E1] font-bold mb-6 ${revealed ? "fade-in-x" : "pre-x"}`} style={{ animationDelay: "0.05s" }}>
              FLOW — ヒアリングから保守まで
            </p>
            <h2 className={`text-[#1D2A6E] text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.2] ${revealed ? "fade-in-x" : "pre-x"}`} style={{ animationDelay: "0.15s" }}>
              業務システム構築の
              <br />
              <span className="text-[#2860E1]">5ステップ</span>
            </h2>
          </div>
          <p className={`text-[#5A6280] text-base md:text-lg leading-loose ${revealed ? "fade-in-x" : "pre-x"}`} style={{ animationDelay: "0.3s" }}>
            ヒアリングは無料、納品後の保守まで一気通貫。<span className="text-[#1D2A6E] font-bold">最短2ヶ月</span>で本番運用までいけます。
          </p>
        </div>

        <div className={`mb-12 md:mb-16 bg-white border border-[#E5E9F5] rounded-3xl overflow-hidden ${revealed ? "fade-in" : "pre"}`} style={{ animationDelay: "0.3s" }}>
          <picture>
            <source media="(max-width: 767px)" srcSet="/images/system-v3/08-flow-sp.png" />
            <img src="/images/system-v3/04-flow-pc.png" alt="ヒアリングから保守までの5ステップ" className="w-full h-auto" width={1920} height={1080} />
          </picture>
        </div>

        <div className="relative max-w-4xl mx-auto bg-white border border-[#E5E9F5] rounded-2xl overflow-hidden">
          {STEPS.map((step, i) => (
            <div key={step.no} className={`group relative grid md:grid-cols-[auto_1fr_auto] gap-6 md:gap-10 items-start py-8 md:py-10 px-6 md:px-10 border-b border-[#E5E9F5] last:border-0 hover:bg-[#FAFAFA] transition-colors duration-200 ${revealed ? "fade-in" : "pre"}`} style={{ animationDelay: `${0.5 + i * 0.08}s` }}>
              <span className="relative font-bold text-[#1D2A6E] text-4xl md:text-5xl tracking-tight leading-none tabular-nums z-10 inline-flex items-center justify-center w-14 h-14 rounded-full bg-white ring-2 ring-[#2860E1]/40">
                <span className="text-[#2860E1] text-base">{step.no}</span>
              </span>
              <div>
                <h3 className="font-bold text-[#1D2A6E] text-xl md:text-2xl mb-3 leading-snug">{step.title}</h3>
                <p className="text-[#5A6280] text-sm md:text-[15px] leading-loose">{step.body}</p>
              </div>
              <span className="self-start md:self-center inline-flex items-center text-xs font-bold tracking-widest text-[#2860E1] bg-[#EEF1FF] ring-1 ring-[#2860E1]/30 px-4 py-2 rounded-full whitespace-nowrap">{step.duration}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .pre { opacity: 0; transform: translateY(28px); }
        @keyframes show-up { 0% { opacity: 0; transform: translateY(28px); } 100% { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: show-up 0.7s cubic-bezier(0.165, 0.84, 0.44, 1) both; }
        .pre-x { opacity: 0; transform: translate(0, 24px); }
        @keyframes show-x { 0% { opacity: 0; transform: translate(0, 24px); } 100% { opacity: 1; transform: translate(0, 0); } }
        .fade-in-x { animation: show-x 0.85s cubic-bezier(0.165, 0.84, 0.44, 1) both; }
        @media (prefers-reduced-motion: reduce) { .fade-in, .fade-in-x { animation: none !important; } .pre, .pre-x { opacity: 1; transform: none; } }
      `}</style>
    </section>
  );
}
