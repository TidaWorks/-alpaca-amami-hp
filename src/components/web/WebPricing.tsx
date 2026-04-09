"use client";

import { useEffect, useRef, useState } from "react";

function SinglePageWireframe({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 200 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full wireframe-svg${active ? " is-visible" : ""}`}
      aria-hidden="true"
    >
      <rect x="10" y="10" width="180" height="120" rx="4" stroke="#C8C4BC" strokeWidth="1.2" className="wire-draw" style={{ animationDelay: "0ms" }} />
      <line x1="10" y1="24" x2="190" y2="24" stroke="#C8C4BC" strokeWidth="1" className="wire-draw" style={{ animationDelay: "80ms" }} />
      <circle cx="20" cy="17" r="3" stroke="#C8C4BC" strokeWidth="1" className="wire-draw" style={{ animationDelay: "140ms" }} />
      <circle cx="30" cy="17" r="3" stroke="#C8C4BC" strokeWidth="1" className="wire-draw" style={{ animationDelay: "180ms" }} />
      <rect x="20" y="32" width="160" height="38" rx="2" stroke="#C8C4BC" strokeWidth="1" className="wire-draw" style={{ animationDelay: "250ms" }} />
      <line x1="60" y1="46" x2="140" y2="46" stroke="#D4B896" strokeWidth="2" strokeLinecap="round" className="wire-draw" style={{ animationDelay: "360ms" }} />
      <line x1="75" y1="54" x2="125" y2="54" stroke="#C8C4BC" strokeWidth="1" strokeLinecap="round" className="wire-draw" style={{ animationDelay: "440ms" }} />
      <rect x="20" y="78" width="70" height="8" rx="1" stroke="#C8C4BC" strokeWidth="1" className="wire-draw" style={{ animationDelay: "520ms" }} />
      <rect x="20" y="90" width="70" height="5" rx="1" stroke="#C8C4BC" strokeWidth="1" className="wire-draw" style={{ animationDelay: "580ms" }} />
      <rect x="20" y="98" width="55" height="5" rx="1" stroke="#C8C4BC" strokeWidth="1" className="wire-draw" style={{ animationDelay: "620ms" }} />
      <rect x="110" y="85" width="60" height="20" rx="10" stroke="#D4B896" strokeWidth="1.5" className="wire-draw" style={{ animationDelay: "700ms" }} />
      <line x1="126" y1="95" x2="154" y2="95" stroke="#D4B896" strokeWidth="1" strokeLinecap="round" className="wire-draw" style={{ animationDelay: "780ms" }} />
    </svg>
  );
}

function MultiPageWireframe({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 200 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full wireframe-svg${active ? " is-visible" : ""}`}
      aria-hidden="true"
    >
      <rect x="10" y="10" width="180" height="120" rx="4" stroke="#B8A898" strokeWidth="1.2" className="wire-draw" style={{ animationDelay: "0ms" }} />
      <line x1="10" y1="24" x2="190" y2="24" stroke="#B8A898" strokeWidth="1" className="wire-draw" style={{ animationDelay: "60ms" }} />
      <circle cx="20" cy="17" r="3" stroke="#B8A898" strokeWidth="1" className="wire-draw" style={{ animationDelay: "120ms" }} />
      <circle cx="30" cy="17" r="3" stroke="#B8A898" strokeWidth="1" className="wire-draw" style={{ animationDelay: "160ms" }} />
      <line x1="50" y1="17" x2="70" y2="17" stroke="#B8A898" strokeWidth="1" strokeLinecap="round" className="wire-draw" style={{ animationDelay: "200ms" }} />
      <line x1="80" y1="17" x2="100" y2="17" stroke="#B8A898" strokeWidth="1" strokeLinecap="round" className="wire-draw" style={{ animationDelay: "230ms" }} />
      <line x1="110" y1="17" x2="130" y2="17" stroke="#B8A898" strokeWidth="1" strokeLinecap="round" className="wire-draw" style={{ animationDelay: "260ms" }} />
      <rect x="20" y="32" width="160" height="32" rx="2" stroke="#B8A898" strokeWidth="1" className="wire-draw" style={{ animationDelay: "320ms" }} />
      <line x1="55" y1="43" x2="145" y2="43" stroke="#F5A623" strokeWidth="2" strokeLinecap="round" className="wire-draw" style={{ animationDelay: "420ms" }} />
      <line x1="70" y1="51" x2="130" y2="51" stroke="#B8A898" strokeWidth="1" strokeLinecap="round" className="wire-draw" style={{ animationDelay: "490ms" }} />
      <rect x="20" y="72" width="45" height="30" rx="2" stroke="#B8A898" strokeWidth="1" className="wire-draw" style={{ animationDelay: "560ms" }} />
      <rect x="78" y="72" width="45" height="30" rx="2" stroke="#B8A898" strokeWidth="1" className="wire-draw" style={{ animationDelay: "600ms" }} />
      <rect x="136" y="72" width="45" height="30" rx="2" stroke="#B8A898" strokeWidth="1" className="wire-draw" style={{ animationDelay: "640ms" }} />
      <line x1="28" y1="82" x2="57" y2="82" stroke="#B8A898" strokeWidth="1" strokeLinecap="round" className="wire-draw" style={{ animationDelay: "700ms" }} />
      <line x1="28" y1="88" x2="52" y2="88" stroke="#B8A898" strokeWidth="1" strokeLinecap="round" className="wire-draw" style={{ animationDelay: "720ms" }} />
      <line x1="86" y1="82" x2="115" y2="82" stroke="#B8A898" strokeWidth="1" strokeLinecap="round" className="wire-draw" style={{ animationDelay: "740ms" }} />
      <line x1="86" y1="88" x2="110" y2="88" stroke="#B8A898" strokeWidth="1" strokeLinecap="round" className="wire-draw" style={{ animationDelay: "760ms" }} />
      <line x1="144" y1="82" x2="173" y2="82" stroke="#B8A898" strokeWidth="1" strokeLinecap="round" className="wire-draw" style={{ animationDelay: "780ms" }} />
      <line x1="144" y1="88" x2="168" y2="88" stroke="#B8A898" strokeWidth="1" strokeLinecap="round" className="wire-draw" style={{ animationDelay: "800ms" }} />
      <rect x="20" y="110" width="160" height="8" rx="1" stroke="#B8A898" strokeWidth="1" className="wire-draw" style={{ animationDelay: "860ms" }} />
    </svg>
  );
}

function useCountUp(target: number, active: boolean, duration = 900) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return value;
}

export default function WebPricing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const lightPrice = useCountUp(50000, visible, 800);
  const standardPrice = useCountUp(150000, visible, 1000);

  const fmt = (n: number) => n.toLocaleString("ja-JP");

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#FAFAF8] overflow-hidden"
    >
      {/* faint dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #7A6A56 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6">

        {/* heading */}
        <div
          className="mb-14 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <p className="text-[#F5A623] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            PRICING
          </p>
          <h2 className="text-[#1A1A1A] text-3xl md:text-4xl font-bold leading-snug">
            ちょうどいいプランを、選ぶだけ。
          </h2>
          <p className="mt-3 text-sm text-[#8A8070]">
            写真・ロゴ等の素材はお客様にご用意いただきます
          </p>
        </div>

        {/* catalog cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">

          {/* ---- ライトプラン ---- */}
          <div
            className="transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(32px)",
              transitionDelay: "100ms",
            }}
          >
            <div className="bg-white border border-[#E8E2DA] rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_28px_rgba(0,0,0,0.09)] transition-shadow duration-300">

              {/* wireframe area */}
              <div className="bg-[#F4F1EC] px-10 pt-7 pb-4 h-[148px] flex items-end">
                <SinglePageWireframe active={visible} />
              </div>

              <div className="px-7 pt-6 pb-7">
                <span className="inline-block text-[11px] text-[#8A8070] border border-[#D4CEC5] rounded-full px-3 py-0.5 mb-4 tracking-wide">
                  お店の名刺代わりに
                </span>

                <h3 className="text-[#1A1A1A] text-xl font-bold mb-1">ライトプラン</h3>
                <p className="text-[#8A8070] text-sm mb-5">
                  LP 1ページで、まず一歩。手軽に始めたい方へ。
                </p>

                <div className="mb-6">
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-xs text-[#8A8070]">¥</span>
                    <span className="text-4xl font-black text-[#1A1A1A] tabular-nums leading-none">
                      {fmt(lightPrice)}
                    </span>
                    <span className="text-sm text-[#8A8070] ml-1">〜</span>
                  </div>
                  <p className="text-xs text-[#B0A898] mt-1.5">上限目安 ¥120,000 / 納期 約2週間</p>
                </div>

                <ul className="space-y-2.5 mb-7">
                  {[
                    "LP 1ページを丁寧に制作します",
                    "スマートフォンに完全対応",
                    "SEO初期設定を標準で含みます",
                    "お問い合わせフォーム付き",
                    "Googleマップ埋め込み対応",
                    "公開後1回の修正に対応します",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-[6px] flex-shrink-0 w-[5px] h-[5px] rounded-full bg-[#D4B896]" />
                      <span className="text-sm text-[#5A5248]">{item}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="block w-full text-center text-sm font-semibold text-[#1A1A1A] border border-[#1A1A1A] rounded-xl py-3 hover:bg-[#1A1A1A] hover:text-white transition-colors duration-200"
                >
                  このプランで相談する
                </a>
              </div>
            </div>
          </div>

          {/* ---- スタンダードプラン ---- */}
          <div
            className="transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(32px)",
              transitionDelay: "230ms",
            }}
          >
            <div className="relative bg-white border border-[#E8E2DA] rounded-2xl overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.07)] hover:shadow-[0_6px_32px_rgba(0,0,0,0.11)] transition-shadow duration-300 md:scale-[1.06]">

              {/* left accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#F5A623] z-10" />

              {/* wireframe area */}
              <div className="bg-[#FDF8F2] px-10 pt-7 pb-4 h-[148px] flex items-end">
                <MultiPageWireframe active={visible} />
              </div>

              <div className="pl-8 pr-7 pt-6 pb-7">
                <span className="inline-block text-[11px] text-[#F5A623] border border-[#F5A623]/50 bg-[#FFF9F0] rounded-full px-3 py-0.5 mb-4 tracking-wide">
                  本格的なホームページに
                </span>

                <h3 className="text-[#1A1A1A] text-xl font-bold mb-1">スタンダードプラン</h3>
                <p className="text-[#8A8070] text-sm mb-5">
                  複数ページで、お店の魅力をすべて伝える。
                </p>

                <div className="mb-6">
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-xs text-[#8A8070]">¥</span>
                    <span className="text-4xl font-black text-[#1A1A1A] tabular-nums leading-none">
                      {fmt(standardPrice)}
                    </span>
                    <span className="text-sm text-[#8A8070] ml-1">〜</span>
                  </div>
                  <p className="text-xs text-[#B0A898] mt-1.5">上限目安 ¥300,000 / 納期 約1ヶ月</p>
                </div>

                <ul className="space-y-2.5 mb-7">
                  {[
                    "複数ページ構成（5ページ目安）で制作",
                    "スマートフォンに完全対応",
                    "SEO初期設定を標準で含みます",
                    "お問い合わせフォーム付き",
                    "ブログ・お知らせ機能を実装",
                    "Google マップ・SNS 連携に対応",
                    "公開後3回の修正に対応します",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-[6px] flex-shrink-0 w-[5px] h-[5px] rounded-full bg-[#F5A623]" />
                      <span className="text-sm text-[#5A5248]">{item}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="block w-full text-center text-sm font-semibold text-white bg-[#F5A623] rounded-xl py-3 hover:bg-[#E09318] transition-colors duration-200"
                >
                  このプランで相談する
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* maintenance strip */}
        <div
          className="mt-10 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "400ms",
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 border-t border-[#E8E2DA] pt-6">
            <svg
              className="flex-shrink-0 w-7 h-7 text-[#B0A898]"
              viewBox="0 0 28 28"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="14" cy="14" r="11.5" stroke="currentColor" strokeWidth="1.4" />
              <path d="M14 9v5l3.5 1.75" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#1A1A1A]">
                保守サポート
                <span className="mx-2 text-xl font-black tabular-nums">¥12,000</span>
                <span className="text-sm font-normal text-[#8A8070]">/月〜</span>
              </p>
              <p className="text-xs text-[#8A8070] mt-0.5 leading-relaxed">
                サーバー・ドメイン管理込み。テキスト・画像の変更は随時対応。大規模改修は別途お見積もり。
              </p>
            </div>

            <a
              href="#contact"
              className="self-start sm:self-auto flex-shrink-0 text-xs text-[#8A8070] border border-[#D4CEC5] rounded-lg px-4 py-2 hover:border-[#8A8070] hover:text-[#5A5248] transition-colors duration-200 whitespace-nowrap"
            >
              保守について相談する
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .wireframe-svg .wire-draw {
          stroke-dasharray: 500;
          stroke-dashoffset: 500;
        }
        .wireframe-svg.is-visible .wire-draw {
          animation: wireDraw 0.7s ease forwards;
        }
        @keyframes wireDraw {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </section>
  );
}
