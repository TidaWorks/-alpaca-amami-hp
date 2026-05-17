"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";

const INCLUDED = [
  "LINE公式アカウントで相談無制限（営業日24時間以内返信）",
  "月5時間以内の軽実装(簡易LINE bot・Notion・Zapier・ChatGPT活用等)",
  "月1テキストレポート（AI最新情報＋御社向けご提案）",
  "大型案件のスマート特典価格",
];

const SPOT = [
  { label: "定例MTG", price: "¥10,000", unit: "/30分" },
  { label: "月5時間超過分", price: "¥5,000", unit: "/時間" },
];

const DISCOUNT = [
  {
    label: "LINEボット本構築",
    normal: "通常 ¥80,000〜",
    discount: "スマート特典価格でお見積もり",
  },
  {
    label: "ホームページ制作",
    normal: "通常 ¥250,000〜",
    discount: "スマート特典価格でお見積もり",
  },
  {
    label: "業務システム開発",
    normal: "通常 ¥300,000〜",
    discount: "スマート特典価格でお見積もり",
  },
];

export default function AgentPricing() {
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
    <section
      id="pricing"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-24 md:py-32"
    >
      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10">
        {/* セクション見出し */}
        <div className="text-center mb-14 md:mb-20">
          <p
            className={`inline-block text-[10px] tracking-[0.4em] text-[#12C998] font-bold mb-6 ${revealed ? "fade-in" : "pre"}`}
            style={{ animationDelay: "0.05s" }}
          >
            PRICING — 月額一本
          </p>
          <h2
            className={`text-[#1D2A6E] text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.2] mb-7 ${revealed ? "fade-in" : "pre"}`}
            style={{ animationDelay: "0.15s" }}
          >
            料金は、
            <br className="md:hidden" />
            <span className="text-[#12C998]">月¥50,000の一本</span>
            。
          </h2>
          <p
            className={`text-[#5A6280] text-base md:text-lg leading-loose ${revealed ? "fade-in" : "pre"}`}
            style={{ animationDelay: "0.3s" }}
          >
            入会金なし、最低契約期間3ヶ月、4ヶ月目以降は月単位で解約可能です。
          </p>
        </div>

        {/* メインプラン */}
        <div className={`relative border border-[#E5E9F5] rounded-3xl overflow-hidden mb-12 ${revealed ? "fade-in" : "pre"}`} style={{ animationDelay: "0.4s" }}>
          <div className="grid md:grid-cols-[1.1fr_1fr] gap-0">
            {/* 左：商品名＋含まれるもの */}
            <div className="p-10 md:p-14 bg-white md:border-r border-[#E5E9F5]">
              <span className="inline-block text-[10px] font-bold tracking-[0.4em] text-[#5A6280] mb-6">
                月額サブスクリプション
              </span>
              <h3 className="text-[#1D2A6E] text-3xl md:text-5xl font-bold leading-tight mb-6">
                アルパカスマート
              </h3>
              <p className="text-[#5A6280] text-base leading-loose mb-10">
                奄美のあなたの会社のAI担当者として、
                <br className="hidden md:block" />
                日々の相談から軽実装まで、まるっとお引き受けします。
              </p>

              <p className="text-[10px] font-bold tracking-[0.4em] text-[#12C998] mb-5">
                含まれるもの
              </p>
              <ul className="space-y-4">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex items-start gap-4 text-[#1A1A1A] text-sm md:text-[15px]">
                    <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[#12C998] text-white flex items-center justify-center">
                      <Check className="w-3 h-3" strokeWidth={3.5} aria-hidden="true" />
                    </span>
                    <span className="font-bold leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 右：価格＋CTA — ミントベタ塗り */}
            <div className="relative p-10 md:p-14 flex flex-col justify-center bg-[#12C998] overflow-hidden">
              <div className="absolute inset-0 pointer-events-none opacity-[0.12]" aria-hidden="true" style={{
                backgroundImage: "radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }} />
              <div className="relative">
                <p className="text-[10px] font-bold tracking-[0.4em] text-white/80 mb-3">
                  月額
                </p>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="font-bold text-white text-6xl md:text-7xl lg:text-8xl tracking-tight leading-none tabular-nums">
                    ¥50,000
                  </span>
                </div>
                <p className="text-white/85 text-xs font-bold mb-10">
                  入会金なし／最低契約期間3ヶ月
                </p>

                <a
                  href="#contact"
                  className="group inline-flex items-center justify-between gap-2 w-full bg-white text-[#1D2A6E] font-bold text-sm md:text-base rounded-full pl-7 pr-2 py-2 hover:bg-[#1D2A6E] hover:text-white transition-colors duration-300"
                >
                  無料で相談する
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#1D2A6E] text-white group-hover:bg-white group-hover:text-[#1D2A6E] transition-all duration-300 group-hover:rotate-[-45deg]">
                    <ArrowRight className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
                  </span>
                </a>
                <p className="text-white/85 text-[11px] font-bold text-center mt-4">
                  30分のオンラインヒアリングから
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* スポット追加 + スマート特典価格 */}
        <div className="grid md:grid-cols-2 gap-5 mb-14">
          <div className={`bg-[#FAFAFA] border border-[#E5E9F5] rounded-2xl p-8 md:p-10 ${revealed ? "fade-in" : "pre"}`} style={{ animationDelay: "0.6s" }}>
            <p className="text-[10px] font-bold tracking-[0.4em] text-[#5A6280] mb-6">
              スポット追加
            </p>
            <ul className="space-y-5">
              {SPOT.map(({ label, price, unit }) => (
                <li key={label} className="flex items-baseline justify-between gap-3 pb-5 border-b border-[#E5E9F5] last:border-0 last:pb-0">
                  <span className="text-[#1D2A6E] text-sm md:text-base font-bold leading-snug">
                    {label}
                  </span>
                  <span className="flex items-baseline gap-1 flex-shrink-0">
                    <span className="font-bold text-[#1D2A6E] text-2xl tabular-nums">
                      {price}
                    </span>
                    <span className="text-[#5A6280] text-xs font-bold">
                      {unit}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-[#5A6280] text-xs font-bold leading-relaxed mt-5">
              ※ 超過分は翌月への繰越なし
            </p>
          </div>

          <div className={`bg-white border-2 border-[#12C998]/40 rounded-2xl p-8 md:p-10 ${revealed ? "fade-in" : "pre"}`} style={{ animationDelay: "0.7s" }}>
            <p className="text-[10px] font-bold tracking-[0.4em] text-[#12C998] mb-6">
              スマート特典価格
            </p>
            <ul className="space-y-5">
              {DISCOUNT.map(({ label, normal, discount }) => (
                <li key={label} className="pb-5 border-b border-[#E5E9F5] last:border-0 last:pb-0">
                  <p className="text-[#1D2A6E] text-sm md:text-base font-bold leading-snug">
                    {label}
                  </p>
                  <p className="text-[#5A6280] text-xs font-bold mt-1 line-through">
                    {normal}
                  </p>
                  <p className="text-[#12C998] text-xs font-bold mt-1">
                    → {discount}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 最後のCTAボタン */}
        <div className="text-center">
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 bg-[#12C998] text-white font-bold text-base md:text-lg pl-9 pr-2 py-2 rounded-full hover:bg-[#0DA67D] transition-colors duration-200"
          >
            無料で相談する
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white text-[#12C998] transition-transform duration-300 group-hover:rotate-[-45deg]">
              <ArrowRight className="w-5 h-5" strokeWidth={2.5} aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>

      <style>{`
        .pre { opacity: 0; transform: translateY(32px); }
        @keyframes show-up { 0% { opacity: 0; transform: translateY(32px); } 100% { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: show-up 0.85s cubic-bezier(0.165, 0.84, 0.44, 1) both; }

        @media (prefers-reduced-motion: reduce) {
          .fade-in { animation: none !important; }
          .pre { opacity: 1; transform: none; }
        }
      `}</style>
    </section>
  );
}
