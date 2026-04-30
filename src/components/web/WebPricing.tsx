"use client";

import { useReveal } from "@/hooks/useReveal";

export default function WebPricing() {
  const [sectionRef, visible] = useReveal<HTMLDivElement>({ threshold: 0.12 });

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative bg-gradient-to-br from-[#F5F3FF] via-white to-[#EFF6FF] py-20 md:py-28 px-6 scroll-mt-20 overflow-hidden"
    >
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
            <span className="bg-[#635BFF] text-white font-black text-[11px] tracking-widest px-2.5 py-1 rounded-md">
              03
            </span>
            <span className="text-[11px] font-bold tracking-[0.3em] text-[#1A202C]">PRICING</span>
          </div>
          <h2 className="font-memphis-mincho text-[#1A202C] text-3xl md:text-5xl font-extrabold mb-3 leading-[1.3] tracking-tight">
            ちょうどいいプランを、
            <br className="md:hidden" />
            <span className="relative inline-block">
              <span className="relative z-10">選ぶだけ</span>
              <span
                className="absolute inset-x-0 bottom-1 h-[35%] bg-[#12C998]/45 -z-0"
                aria-hidden="true"
              />
            </span>
            。
          </h2>
          <p className="font-memphis-mincho text-[#1A202C]/75 text-sm">
            写真・ロゴ等の素材はお客様にご用意いただきます。
          </p>
        </div>

        {/* プランカード */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
          {/* ライトプラン */}
          <div
            className="relative bg-white border border-[#1A202C]/10 rounded-2xl shadow-lg transition-all duration-700 hover:-translate-y-1 hover:shadow-xl"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transitionDelay: "100ms",
            }}
          >
            <div className="p-7 md:p-8">
              <span className="inline-block text-[10px] font-black text-white bg-[#12C998] rounded-full px-3 py-1 mb-5 tracking-[0.2em]">
                お店の名刺代わりに
              </span>
              <h3 className="font-memphis-mincho text-[#1A202C] text-2xl md:text-3xl font-extrabold mb-2">
                ライトプラン
              </h3>
              <p className="text-[#1A202C]/70 text-sm mb-3">
                ランディングページ 1ページで、まず一歩。手軽に始めたい方へ。
              </p>
              <div className="bg-[#F5F3FF]/60 border border-[#635BFF]/15 rounded-lg px-3 py-2.5 mb-6">
                <p className="text-[11px] font-bold text-[#635BFF] tracking-widest mb-1">
                  ランディングページとは？
                </p>
                <p className="text-xs text-[#1A202C]/75 leading-relaxed">
                  1枚で完結する縦長の紹介ページ。サービス・店舗の魅力からお問い合わせまで、訪れた人を1画面で行動につなげる形式です。
                </p>
              </div>

              <div className="mb-7 pb-6 border-b border-dashed border-[#1A202C]/20">
                <div className="flex items-baseline gap-1">
                  <span className="text-base text-[#1A202C]/70 font-bold">¥</span>
                  <span className="font-memphis-mincho text-5xl md:text-6xl font-extrabold text-[#1A202C] tabular-nums leading-none">
                    70,000
                  </span>
                  <span className="text-base text-[#1A202C]/70 ml-1 font-bold">〜</span>
                </div>
                <div className="text-xs text-[#1A202C]/60 mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span>上限目安 ¥120,000</span>
                  <span className="text-[#1A202C]/30">|</span>
                  <span>納期 3日〜1週間</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  "ランディングページ 1ページを丁寧に制作します",
                  "スマートフォンに完全対応",
                  "SEO初期設定を標準で含みます",
                  "お問い合わせフォーム付き",
                  "Googleマップ埋め込み対応",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-[7px] flex-shrink-0 w-3 h-3 rotate-45 bg-[#12C998]" />
                    <span className="text-sm text-[#1A202C] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="block w-full text-center text-sm font-black text-[#1A202C] bg-white border border-[#1A202C]/15 hover:border-[#635BFF] rounded-full py-3.5 shadow-md hover:shadow-lg transition-all"
              >
                このプランで相談する →
              </a>
            </div>
          </div>

          {/* スタンダードプラン */}
          <div
            className="relative bg-white border border-[#1A202C]/10 rounded-2xl shadow-[0_8px_24px_rgba(99,91,255,0.18)] transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(99,91,255,0.25)]"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transitionDelay: "220ms",
            }}
          >
            <div className="p-7 md:p-8">
              <span className="inline-block text-[10px] font-black text-white bg-[#635BFF] rounded-full px-3 py-1 mb-5 tracking-[0.2em]">
                本格的なホームページに
              </span>
              <h3 className="font-memphis-mincho text-[#1A202C] text-2xl md:text-3xl font-extrabold mb-2">
                スタンダードプラン
              </h3>
              <p className="text-[#1A202C]/70 text-sm mb-6">
                複数ページで、お店の魅力をすべて伝える。
              </p>

              <div className="mb-7 pb-6 border-b border-dashed border-[#1A202C]/20">
                <div className="flex items-baseline gap-1">
                  <span className="text-base text-[#1A202C]/70 font-bold">¥</span>
                  <span className="font-memphis-mincho text-5xl md:text-6xl font-extrabold text-[#1A202C] tabular-nums leading-none">
                    250,000
                  </span>
                  <span className="text-base text-[#1A202C]/70 ml-1 font-bold">〜</span>
                </div>
                <div className="text-xs text-[#1A202C]/60 mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span>上限目安 ¥400,000</span>
                  <span className="text-[#1A202C]/30">|</span>
                  <span>納期 2週間〜4週間</span>
                </div>
              </div>

              <p className="text-[11px] font-black tracking-widest text-[#1A202C]/55 mb-3">
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
                    <span className="mt-[7px] flex-shrink-0 w-3 h-3 rotate-45 bg-[#635BFF]" />
                    <span className="text-sm text-[#1A202C] leading-relaxed flex-1">
                      {item.text}
                      {item.plus && (
                        <span className="ml-2 inline-block text-[9px] font-black bg-[#12C998] text-white px-1.5 py-[1px] align-middle tracking-widest rounded-sm">
                          PLUS
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="block w-full text-center text-sm font-black text-white bg-[#FF3D7F] rounded-full py-3.5 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
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
          <div className="bg-white border border-[#1A202C]/10 rounded-2xl shadow-lg p-7 md:p-8">
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <h3 className="font-memphis-mincho text-[#1A202C] text-xl md:text-2xl font-extrabold">
                保守サポート
              </h3>
              <span className="text-[10px] font-black text-white bg-[#8B86FF] rounded-md px-2 py-1 tracking-widest">
                OPTION
              </span>
            </div>

            <div className="space-y-3 mb-6">
              {[
                { label: "ランディングページ", sub: "1ページ完結型", price: "¥5,000〜", color: "#8B86FF" },
                { label: "ホームページ", sub: "複数ページのHP", price: "¥10,000〜", color: "#12C998" },
                { label: "システム", sub: "業務システム", price: "¥20,000〜", color: "#635BFF" },
              ].map((plan) => (
                <div
                  key={plan.label}
                  className="flex items-center justify-between bg-[#F5F3FF]/40 border border-[#1A202C]/10 rounded-xl px-5 py-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className="w-2 h-10 flex-shrink-0 rounded-full"
                      style={{ background: plan.color }}
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-black text-[#1A202C]">{plan.label}</p>
                      <p className="text-[11px] text-[#1A202C]/65 mt-0.5">{plan.sub}</p>
                    </div>
                  </div>
                  <p className="font-memphis-mincho text-xl font-extrabold text-[#1A202C] tabular-nums whitespace-nowrap">
                    {plan.price}
                    <span className="text-xs font-normal text-[#1A202C]/60 ml-0.5">/月</span>
                  </p>
                </div>
              ))}
            </div>

            <p className="text-xs text-[#1A202C]/70 leading-relaxed mb-2">
              サーバー・ドメイン管理込み。テキスト・画像の変更は随時対応、基本当日対応。システムの場合はデータベース・API管理なども含みます。
            </p>
            <p className="text-xs text-[#1A202C]/50 leading-relaxed">
              ※ サーバー・ドメイン（システムの場合はデータベース・APIも含む）をすべてご自身で管理される場合は、保守なしの買い切りでも対応可能です。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
