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
    <section ref={sectionRef} id="pricing" className="relative bg-[#0A0A0A] py-20 md:py-28 px-6 scroll-mt-20 overflow-hidden">
      {/* 背景ドット */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        aria-hidden="true"
        style={{ backgroundImage: "radial-gradient(circle, #FFFFFF 1px, transparent 1px)", backgroundSize: "32px 32px" }}
      />
      {/* グロー */}
      <div
        className="absolute top-1/3 -left-20 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
        style={{ background: "rgba(255,46,136,0.15)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
        style={{ background: "rgba(255,229,0,0.12)" }}
      />

      <div className="relative max-w-4xl mx-auto">
        {/* 見出し */}
        <div
          className="mb-12 md:mb-14 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <div className="inline-flex items-center gap-2 mb-5 bg-[#FFE500] text-black text-[10px] font-black tracking-[0.25em] px-3 py-1.5 rounded-sm rotate-[-2deg] shadow-[0_0_24px_rgba(255,229,0,0.4)]">
            <span>¥</span>
            <span>PRICING / SIMPLE</span>
          </div>
          <h2 className="text-white text-3xl md:text-5xl font-black mb-3 leading-tight tracking-tight">
            ちょうどいいプランを、
            <br className="md:hidden" />
            <span className="relative inline-block">
              <span className="relative z-10 text-black">選ぶだけ。</span>
              <span className="absolute inset-x-0 bottom-1 h-full bg-[#00FF85] -z-0 rotate-[-1deg]" style={{ boxShadow: "0 0 32px rgba(0,255,133,0.6)" }} />
            </span>
          </h2>
          <p className="text-white/60 text-sm">
            写真・ロゴ等の素材はお客様にご用意いただきます
          </p>
        </div>

        {/* プランカード */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 items-start">
          {/* ライトプラン */}
          <div
            className="relative bg-[#141414] border border-white/15 rounded-2xl overflow-hidden transition-all duration-700 hover:-translate-y-1 hover:border-white/40"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transitionDelay: "100ms",
            }}
          >
            <div className="p-6 md:p-7">
              <span className="inline-block text-[10px] font-black text-white/80 border border-white/25 rounded-full px-3 py-1 mb-4 tracking-[0.2em]">
                お店の名刺代わりに
              </span>
              <h3 className="text-white text-2xl font-black mb-1">ライトプラン</h3>
              <p className="text-white/60 text-sm mb-5">
                LP 1ページで、まず一歩。手軽に始めたい方へ。
              </p>

              <div className="mb-6">
                <div className="flex items-baseline gap-0.5">
                  <span className="text-xs text-white/60">¥</span>
                  <span className="text-5xl font-black text-white tabular-nums leading-none font-display">70,000</span>
                  <span className="text-sm text-white/60 ml-1">〜</span>
                </div>
                <p className="text-xs text-white/40 mt-2">上限目安 ¥120,000 / 納期 3日〜1週間</p>
              </div>

              <ul className="space-y-2.5 mb-7">
                {[
                  "LP 1ページを丁寧に制作します",
                  "スマートフォンに完全対応",
                  "SEO初期設定を標準で含みます",
                  "お問い合わせフォーム付き",
                  "Googleマップ埋め込み対応",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-[7px] flex-shrink-0 w-[6px] h-[6px] rotate-45 bg-[#FFE500]" />
                    <span className="text-sm text-white/85">{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="block w-full text-center text-sm font-black text-white border-2 border-white rounded-xl py-3.5 hover:bg-white hover:text-black transition-colors duration-200"
              >
                このプランで相談する →
              </a>
            </div>
          </div>

          {/* スタンダードプラン */}
          <div
            className="relative bg-[#141414] border-2 border-[#FF2E88] rounded-2xl overflow-hidden transition-all duration-700 hover:-translate-y-1"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transitionDelay: "220ms",
              boxShadow: "0 0 40px rgba(255,46,136,0.25)",
            }}
          >
            {/* おすすめバッジ */}
            <div className="absolute -top-3 -right-3 z-10">
              <div className="relative bg-[#FFE500] text-black text-[10px] font-black px-3 py-1.5 rotate-[6deg] shadow-[0_0_20px_rgba(255,229,0,0.5)]">
                ★ OSUSUME
              </div>
            </div>

            {/* アクセントバー */}
            <div className="h-[4px] bg-gradient-to-r from-[#FF2E88] via-[#FFE500] to-[#00FF85]" />

            <div className="p-6 md:p-7">
              <span className="inline-block text-[10px] font-black text-[#FF2E88] border border-[#FF2E88]/60 bg-[#FF2E88]/15 rounded-full px-3 py-1 mb-4 tracking-[0.2em]">
                本格的なホームページに
              </span>
              <h3 className="text-white text-2xl font-black mb-1">スタンダードプラン</h3>
              <p className="text-white/60 text-sm mb-5">
                複数ページで、お店の魅力をすべて伝える。
              </p>

              <div className="mb-6">
                <div className="flex items-baseline gap-0.5">
                  <span className="text-xs text-white/60">¥</span>
                  <span className="text-5xl font-black text-white tabular-nums leading-none font-display" style={{ textShadow: "0 0 24px rgba(255,46,136,0.5)" }}>250,000</span>
                  <span className="text-sm text-white/60 ml-1">〜</span>
                </div>
                <p className="text-xs text-white/40 mt-2">上限目安 ¥400,000 / 納期 2週間〜4週間</p>
              </div>

              <ul className="space-y-2.5 mb-7">
                {[
                  "複数ページ構成（5ページ目安）で制作",
                  "スマートフォンに完全対応",
                  "SEO初期設定を標準で含みます",
                  "お問い合わせフォーム付き",
                  "ブログ・お知らせ機能を実装",
                  "Google マップ・SNS 連携に対応",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-[7px] flex-shrink-0 w-[6px] h-[6px] rotate-45 bg-[#FF2E88]" style={{ boxShadow: "0 0 8px #FF2E88" }} />
                    <span className="text-sm text-white/90">{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="block w-full text-center text-sm font-black text-white bg-[#FF2E88] rounded-xl py-3.5 hover:bg-white hover:text-[#FF2E88] transition-colors duration-200 shadow-[0_0_30px_rgba(255,46,136,0.5)]"
              >
                このプランで相談する →
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
          <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 md:p-7">
            <div className="flex items-center gap-2.5 mb-5">
              <svg className="flex-shrink-0 w-6 h-6 text-[#00FF85]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              <h3 className="text-white text-lg md:text-xl font-black">保守サポート</h3>
              <span className="text-[9px] font-black text-black bg-[#00FF85] px-2 py-0.5 rounded-sm">OPTION</span>
            </div>

            <div className="space-y-2.5 mb-5">
              {[
                { label: "LP", sub: "ランディングページ", price: "¥5,000〜", color: "#FFE500" },
                { label: "ホームページ", sub: "複数ページのHP", price: "¥10,000〜", color: "#00FF85" },
                { label: "システム", sub: "業務システム", price: "¥20,000〜", color: "#FF2E88" },
              ].map((plan) => (
                <div
                  key={plan.label}
                  className="flex items-center justify-between bg-black/40 border border-white/10 rounded-xl px-5 py-4 hover:border-white/30 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-1.5 h-10 rounded-full flex-shrink-0" style={{ background: plan.color, boxShadow: `0 0 8px ${plan.color}` }} />
                    <div className="min-w-0">
                      <p className="text-sm font-black text-white">{plan.label}</p>
                      <p className="text-[11px] text-white/50 mt-0.5">{plan.sub}</p>
                    </div>
                  </div>
                  <p className="text-lg font-black text-white tabular-nums whitespace-nowrap">
                    {plan.price}
                    <span className="text-xs font-normal text-white/50 ml-0.5">/月</span>
                  </p>
                </div>
              ))}
            </div>

            <p className="text-xs text-white/60 leading-relaxed mb-2">
              サーバー・ドメイン管理込み。テキスト・画像の変更は随時対応、基本当日対応。システムの場合はデータベース・API管理なども含みます。
            </p>
            <p className="text-xs text-white/40 leading-relaxed">
              ※ サーバー・ドメイン（システムの場合はデータベース・APIも含む）をすべてご自身で管理される場合は、保守なしの買い切りでも対応可能です。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
