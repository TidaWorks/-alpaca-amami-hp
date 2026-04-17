"use client";

import { useEffect, useRef, useState } from "react";

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
    <section ref={sectionRef} className="bg-[#FFFBF5] py-20 md:py-28 px-6">
      <div className="max-w-4xl mx-auto">
        {/* 見出し */}
        <div
          className="mb-12 md:mb-14 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <p className="text-[#F5A623] text-[11px] font-semibold tracking-[0.3em] uppercase mb-4 font-display">
            PRICING
          </p>
          <h2 className="text-[#2D2418] text-2xl md:text-3xl font-bold mb-2">
            ちょうどいいプランを、選ぶだけ。
          </h2>
          <p className="text-[#8A7D6B] text-sm">
            写真・ロゴ等の素材はお客様にご用意いただきます
          </p>
        </div>

        {/* プランカード */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 items-start">
          {/* ライトプラン */}
          <div
            className="bg-white border border-[#EDE8E0] rounded-2xl overflow-hidden transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transitionDelay: "100ms",
            }}
          >
            <div className="p-6 md:p-7">
              <span className="inline-block text-[11px] text-[#8A7D6B] border border-[#E0DAD2] rounded-full px-3 py-0.5 mb-4 tracking-wide">
                お店の名刺代わりに
              </span>
              <h3 className="text-[#2D2418] text-xl font-bold mb-1">ライトプラン</h3>
              <p className="text-[#8A7D6B] text-sm mb-5">
                LP 1ページで、まず一歩。手軽に始めたい方へ。
              </p>

              <div className="mb-6">
                <div className="flex items-baseline gap-0.5">
                  <span className="text-xs text-[#8A7D6B]">¥</span>
                  <span className="text-4xl font-black text-[#2D2418] tabular-nums leading-none">50,000</span>
                  <span className="text-sm text-[#8A7D6B] ml-1">〜</span>
                </div>
                <p className="text-xs text-[#B0A898] mt-1.5">上限目安 ¥80,000 / 納期 約2週間</p>
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
                className="block w-full text-center text-sm font-semibold text-[#2D2418] border border-[#2D2418] rounded-xl py-3 hover:bg-[#2D2418] hover:text-white transition-colors duration-200"
              >
                このプランで相談する
              </a>
            </div>
          </div>

          {/* スタンダードプラン */}
          <div
            className="bg-white border-2 border-[#F5A623]/40 rounded-2xl overflow-hidden transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(245,166,35,0.1)]"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transitionDelay: "220ms",
            }}
          >
            {/* アクセントバー */}
            <div className="h-[3px] bg-[#F5A623]" />

            <div className="p-6 md:p-7">
              <span className="inline-block text-[11px] text-[#F5A623] border border-[#F5A623]/40 bg-[#FFF9F0] rounded-full px-3 py-0.5 mb-4 tracking-wide">
                本格的なホームページに
              </span>
              <h3 className="text-[#2D2418] text-xl font-bold mb-1">スタンダードプラン</h3>
              <p className="text-[#8A7D6B] text-sm mb-5">
                複数ページで、お店の魅力をすべて伝える。
              </p>

              <div className="mb-6">
                <div className="flex items-baseline gap-0.5">
                  <span className="text-xs text-[#8A7D6B]">¥</span>
                  <span className="text-4xl font-black text-[#2D2418] tabular-nums leading-none">150,000</span>
                  <span className="text-sm text-[#8A7D6B] ml-1">〜</span>
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

        {/* 保守サポート */}
        <div
          className="mt-8 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transitionDelay: "350ms",
          }}
        >
          <div className="bg-white border border-[#EDE8E0] rounded-2xl p-6 md:p-7">
            <div className="flex items-center gap-2.5 mb-5">
              <svg className="flex-shrink-0 w-6 h-6 text-[#F5A623]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              <h3 className="text-[#2D2418] text-lg font-bold">保守サポート</h3>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: "LP", price: "¥7,000" },
                { label: "HP", price: "¥10,000" },
                { label: "システム", price: "¥20,000" },
              ].map((plan) => (
                <div key={plan.label} className="text-center bg-[#FFFBF5] border border-[#EDE8E0] rounded-xl py-3.5 px-2">
                  <p className="text-[10px] text-[#8A7D6B] tracking-wider mb-1">{plan.label}</p>
                  <p className="text-sm font-bold text-[#2D2418]">
                    {plan.price}
                    <span className="text-xs font-normal text-[#8A7D6B]">/月</span>
                  </p>
                </div>
              ))}
            </div>

            <p className="text-xs text-[#8A7D6B] leading-relaxed">
              サーバー・ドメイン管理込み。テキスト・画像の変更は随時対応。基本当日対応。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
