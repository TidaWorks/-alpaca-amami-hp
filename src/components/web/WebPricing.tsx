"use client";

import { useEffect, useRef, useState } from "react";
import { MemphisBlob, MemphisDots, MemphisRing, MemphisWave } from "./MemphisDecorations";

export default function WebPricing() {
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
      { threshold: 0.12 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative bg-[#FFD600] py-20 md:py-28 px-6 scroll-mt-20 overflow-hidden border-t-2 border-[#111111]"
    >
      {/* 黄色背景上の斑点 */}
      <div className="absolute inset-0 bg-memphis-speckle opacity-[0.18] pointer-events-none" aria-hidden="true" />

      {/* Memphis装飾 */}
      <MemphisBlob color="#FF2DA0" className="absolute -top-10 right-[-3rem] w-44 md:w-56 rotate-12 pointer-events-none" />
      <MemphisRing color="#00E0D1" className="absolute bottom-12 left-8 w-20 md:w-28 pointer-events-none" />
      <MemphisWave color="#111111" className="absolute top-24 right-1/4 w-32 md:w-44 pointer-events-none hidden md:block" />
      <MemphisDots color="#111111" className="absolute bottom-20 right-12 w-20 md:w-28 opacity-50 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        {/* 見出し */}
        <div
          className="mb-12 md:mb-14 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="bg-[#FF2DA0] text-white font-black text-[11px] tracking-widest px-2.5 py-1 border-2 border-[#111111]">
              03
            </span>
            <span className="text-[11px] font-bold tracking-[0.3em] text-[#111111]">PRICING</span>
          </div>
          <h2 className="font-memphis-mincho text-[#111111] text-3xl md:text-5xl font-extrabold mb-3 leading-[1.3] tracking-tight">
            ちょうどいいプランを、
            <br className="md:hidden" />
            <span className="relative inline-block">
              <span className="relative z-10">選ぶだけ</span>
              <span
                className="absolute inset-x-0 bottom-1 h-[35%] bg-white -z-0"
                aria-hidden="true"
              />
            </span>
            。
          </h2>
          <p className="font-memphis-mincho text-[#111111]/75 text-sm">
            写真・ロゴ等の素材はお客様にご用意いただきます。
          </p>
        </div>

        {/* プランカード */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
          {/* ライトプラン */}
          <div
            className="relative bg-white border-2 border-[#111111] shadow-[6px_6px_0_0_#111111] transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transitionDelay: "100ms",
            }}
          >
            <div className="p-7 md:p-8">
              <span className="inline-block text-[10px] font-black text-[#111111] bg-[#00E0D1] border-2 border-[#111111] rounded-full px-3 py-1 mb-5 tracking-[0.2em]">
                お店の名刺代わりに
              </span>
              <h3 className="font-memphis-mincho text-[#111111] text-2xl md:text-3xl font-extrabold mb-2">
                ライトプラン
              </h3>
              <p className="text-[#111111]/70 text-sm mb-6">
                LP 1ページで、まず一歩。手軽に始めたい方へ。
              </p>

              <div className="mb-7 pb-6 border-b-2 border-dashed border-[#111111]/40">
                <div className="flex items-baseline gap-1">
                  <span className="text-base text-[#111111]/70 font-bold">¥</span>
                  <span className="font-memphis-mincho text-5xl md:text-6xl font-extrabold text-[#111111] tabular-nums leading-none">
                    70,000
                  </span>
                  <span className="text-base text-[#111111]/70 ml-1 font-bold">〜</span>
                </div>
                <p className="text-xs text-[#111111]/60 mt-3">
                  上限目安 ¥120,000 / 納期 3日〜1週間
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  "LP 1ページを丁寧に制作します",
                  "スマートフォンに完全対応",
                  "SEO初期設定を標準で含みます",
                  "お問い合わせフォーム付き",
                  "Googleマップ埋め込み対応",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-[7px] flex-shrink-0 w-3 h-3 rotate-45 bg-[#FFD600] border-2 border-[#111111]" />
                    <span className="text-sm text-[#111111] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="block w-full text-center text-sm font-black text-[#111111] bg-[#FFD600] border-2 border-[#111111] rounded-full py-3.5 shadow-[3px_3px_0_0_#111111] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_0_#111111] transition-all"
              >
                このプランで相談する →
              </a>
            </div>
          </div>

          {/* スタンダードプラン */}
          <div
            className="relative bg-white border-2 border-[#111111] shadow-[6px_6px_0_0_#FF2DA0] transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transitionDelay: "220ms",
            }}
          >
            {/* おすすめバッジ */}
            <div className="absolute -top-4 -right-3 z-10">
              <div className="relative bg-[#FF2DA0] text-white text-[10px] font-black tracking-widest px-3 py-1.5 border-2 border-[#111111] rotate-[6deg] shadow-[3px_3px_0_0_#111111]">
                ★ OSUSUME
              </div>
            </div>

            <div className="p-7 md:p-8">
              <span className="inline-block text-[10px] font-black text-white bg-[#FF2DA0] border-2 border-[#111111] rounded-full px-3 py-1 mb-5 tracking-[0.2em]">
                本格的なホームページに
              </span>
              <h3 className="font-memphis-mincho text-[#111111] text-2xl md:text-3xl font-extrabold mb-2">
                スタンダードプラン
              </h3>
              <p className="text-[#111111]/70 text-sm mb-6">
                複数ページで、お店の魅力をすべて伝える。
              </p>

              <div className="mb-7 pb-6 border-b-2 border-dashed border-[#111111]/40">
                <div className="flex items-baseline gap-1">
                  <span className="text-base text-[#111111]/70 font-bold">¥</span>
                  <span className="font-memphis-mincho text-5xl md:text-6xl font-extrabold text-[#111111] tabular-nums leading-none">
                    250,000
                  </span>
                  <span className="text-base text-[#111111]/70 ml-1 font-bold">〜</span>
                </div>
                <p className="text-xs text-[#111111]/60 mt-3">
                  上限目安 ¥400,000 / 納期 2週間〜4週間
                </p>
              </div>

              <p className="text-[11px] font-black tracking-widest text-[#111111]/55 mb-3">
                ライトプランの全機能 ＋
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  { text: "複数ページ構成（5ページ目安）で制作", plus: true },
                  { text: "スマートフォンに完全対応", plus: false },
                  { text: "SEO初期設定を標準で含みます", plus: false },
                  { text: "お問い合わせフォーム付き", plus: false },
                  { text: "ブログ・お知らせ機能を実装", plus: true },
                  { text: "Google マップ・SNS 連携に対応", plus: true },
                ].map((item) => (
                  <li key={item.text} className="flex items-start gap-3">
                    <span className="mt-[7px] flex-shrink-0 w-3 h-3 rotate-45 bg-[#FF2DA0] border-2 border-[#111111]" />
                    <span className="text-sm text-[#111111] leading-relaxed flex-1">
                      {item.text}
                      {item.plus && (
                        <span className="ml-2 inline-block text-[9px] font-black bg-[#00E0D1] text-[#111111] border-2 border-[#111111] px-1.5 py-[1px] align-middle tracking-widest rounded-sm">
                          PLUS
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="block w-full text-center text-sm font-black text-white bg-[#FF2DA0] border-2 border-[#111111] rounded-full py-3.5 shadow-[3px_3px_0_0_#111111] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_0_#111111] transition-all"
              >
                このプランで相談する →
              </a>
            </div>
          </div>
        </div>

        {/* 保守サポート */}
        <div
          className="mt-10 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transitionDelay: "350ms",
          }}
        >
          <div className="bg-white border-2 border-[#111111] shadow-[6px_6px_0_0_#00E0D1] p-7 md:p-8">
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <h3 className="font-memphis-mincho text-[#111111] text-xl md:text-2xl font-extrabold">
                保守サポート
              </h3>
              <span className="text-[10px] font-black text-[#111111] bg-[#FFD600] border-2 border-[#111111] px-2 py-1 tracking-widest">
                OPTION
              </span>
            </div>

            <div className="space-y-3 mb-6">
              {[
                { label: "LP", sub: "ランディングページ", price: "¥5,000〜", color: "#FFD600" },
                { label: "ホームページ", sub: "複数ページのHP", price: "¥10,000〜", color: "#00E0D1" },
                { label: "システム", sub: "業務システム", price: "¥20,000〜", color: "#FF2DA0" },
              ].map((plan) => (
                <div
                  key={plan.label}
                  className="flex items-center justify-between bg-[#F7F7F7] border-2 border-[#111111] px-5 py-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className="w-2 h-10 flex-shrink-0 border-2 border-[#111111]"
                      style={{ background: plan.color }}
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-black text-[#111111]">{plan.label}</p>
                      <p className="text-[11px] text-[#111111]/65 mt-0.5">{plan.sub}</p>
                    </div>
                  </div>
                  <p className="font-memphis-mincho text-xl font-extrabold text-[#111111] tabular-nums whitespace-nowrap">
                    {plan.price}
                    <span className="text-xs font-normal text-[#111111]/60 ml-0.5">/月</span>
                  </p>
                </div>
              ))}
            </div>

            <p className="text-xs text-[#111111]/70 leading-relaxed mb-2">
              サーバー・ドメイン管理込み。テキスト・画像の変更は随時対応、基本当日対応。システムの場合はデータベース・API管理なども含みます。
            </p>
            <p className="text-xs text-[#111111]/50 leading-relaxed">
              ※ サーバー・ドメイン（システムの場合はデータベース・APIも含む）をすべてご自身で管理される場合は、保守なしの買い切りでも対応可能です。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
