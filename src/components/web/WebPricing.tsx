"use client";

import { useReveal } from "@/hooks/useReveal";

export default function WebPricing() {
  const [sectionRef, visible] = useReveal<HTMLDivElement>({ threshold: 0.12 });

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative bg-[#FFE900] py-32 md:py-40 px-6 md:px-10 scroll-mt-20 overflow-hidden"
    >
      {/* 黄色帯セクション — clip-pathで掃き込み */}
      <style>{`
        @keyframes sweep-in {
          from { clip-path: inset(0 100% 0 0); }
          to { clip-path: inset(0 0 0 0); }
        }
        .sweep-target { clip-path: inset(0 100% 0 0); }
        .sweep-on { animation: sweep-in 1.4s cubic-bezier(0.65, 0, 0.35, 1) forwards; }
        @media (prefers-reduced-motion: reduce) {
          .sweep-target { clip-path: inset(0 0 0 0); }
          .sweep-on { animation: none !important; clip-path: inset(0 0 0 0) !important; }
        }
      `}</style>

      {/* 背景装飾 */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg
          className="absolute -top-20 -right-32 w-[480px] h-[480px] hidden md:block"
          viewBox="0 0 400 400"
        >
          <circle cx="200" cy="200" r="180" fill="#EC6C00" opacity="0.18" />
        </svg>
        <svg
          className="absolute bottom-10 -left-20 w-[280px] h-[280px] hidden md:block"
          viewBox="0 0 200 200"
        >
          <polygon points="100,20 180,180 20,180" fill="#004097" opacity="0.12" />
        </svg>
      </div>

      <div className="relative max-w-[1400px] mx-auto">
        {/* 章扉 */}
        <div
          className={`grid md:grid-cols-[1fr_1.4fr] gap-12 md:gap-16 mb-16 md:mb-20 items-end ${visible ? "sweep-on" : "sweep-target"}`}
        >
          <div>
            <h2
              className="text-black text-[4rem] md:text-[8rem] lg:text-[10rem] leading-[0.95] tracking-[-0.02em]"
              style={{ fontWeight: 400 }}
            >
              Pricing
            </h2>
            <p className="text-sm tracking-[0.3em] text-black/70 mt-4">料金</p>
          </div>
          <div>
            <h3 className="text-black text-2xl md:text-4xl leading-[1.3] tracking-[-0.01em]" style={{ fontWeight: 500 }}>
              ちょうどいいプランを、選ぶだけ。
            </h3>
            <p className="text-black/75 text-sm md:text-base leading-loose mt-5">
              写真・ロゴ等の素材はお客様にご用意いただきます。
            </p>
          </div>
        </div>

        {/* プランカード（白） */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start mb-10">
          {/* ライトプラン */}
          <div
            className="relative bg-white rounded-3xl transition-all duration-700 hover:-translate-y-1"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(28px)",
              transitionDelay: "300ms",
            }}
          >
            <div className="p-8 md:p-10">
              <span className="inline-block text-[10px] text-black bg-[#FFE900] rounded-full px-3.5 py-1.5 mb-6 tracking-[0.2em]" style={{ fontWeight: 500 }}>
                お店の名刺代わりに
              </span>
              <h3 className="text-black text-2xl md:text-3xl mb-3" style={{ fontWeight: 500 }}>
                ライトプラン
              </h3>
              <p className="text-black/70 text-sm leading-loose mb-8">
                ランディングページ 1ページで、まず一歩。手軽に始めたい方へ。
              </p>

              <div className="mb-8 pb-6 border-b border-black/15">
                <div className="flex items-baseline gap-1">
                  <span className="text-base text-black/60">¥</span>
                  <span className="text-black text-5xl md:text-7xl tabular-nums leading-none" style={{ fontWeight: 500 }}>
                    70,000
                  </span>
                  <span className="text-base text-black/60 ml-1">〜</span>
                </div>
                <p className="text-xs text-black/60 mt-4 tracking-wide">納期 3日〜1週間</p>
              </div>

              <ul className="space-y-3 mb-10">
                {[
                  "ランディングページ 1ページを丁寧に制作します",
                  "スマートフォンに完全対応",
                  "SEO初期設定を標準で含みます",
                  "お問い合わせフォーム付き",
                  "Googleマップ埋め込み対応",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 flex-shrink-0 w-2 h-2 rounded-full bg-[#EC6C00]" />
                    <span className="text-sm text-black leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              {/* 黒丸pill CTA */}
              <a href="#contact" className="group inline-flex items-center gap-3">
                <span className="inline-block bg-black text-white text-sm rounded-full px-6 py-3 group-hover:bg-[#EC6C00] transition-colors" style={{ fontWeight: 500 }}>
                  このプランで相談する
                </span>
                <span className="w-10 h-10 border border-black rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
            </div>
          </div>

          {/* スタンダードプラン */}
          <div
            className="relative bg-white rounded-3xl transition-all duration-700 hover:-translate-y-1"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(28px)",
              transitionDelay: "440ms",
            }}
          >
            <div className="p-8 md:p-10">
              <span className="inline-block text-[10px] text-white bg-[#EC6C00] rounded-full px-3.5 py-1.5 mb-6 tracking-[0.2em]" style={{ fontWeight: 500 }}>
                本格的なホームページに
              </span>
              <h3 className="text-black text-2xl md:text-3xl mb-3" style={{ fontWeight: 500 }}>
                スタンダードプラン
              </h3>
              <p className="text-black/70 text-sm leading-loose mb-8">
                複数ページで、お店の魅力をすべて伝える。
              </p>

              <div className="mb-8 pb-6 border-b border-black/15">
                <div className="flex items-baseline gap-1">
                  <span className="text-base text-black/60">¥</span>
                  <span className="text-black text-5xl md:text-7xl tabular-nums leading-none" style={{ fontWeight: 500 }}>
                    250,000
                  </span>
                  <span className="text-base text-black/60 ml-1">〜</span>
                </div>
                <p className="text-xs text-black/60 mt-4 tracking-wide">納期 2週間〜4週間</p>
              </div>

              <p className="text-[11px] tracking-[0.2em] text-black/55 mb-4" style={{ fontWeight: 500 }}>
                ライトプランの全機能 ＋
              </p>
              <ul className="space-y-3 mb-10">
                {[
                  "複数ページ構成（5ページ目安）で制作",
                  "スマートフォンに完全対応",
                  "SEO初期設定を標準で含みます",
                  "お問い合わせフォーム付き",
                  "ブログ・お知らせ機能を実装",
                  "Google マップ・SNS 連携に対応",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 flex-shrink-0 w-2 h-2 rounded-full bg-[#004097]" />
                    <span className="text-sm text-black leading-relaxed flex-1">{item}</span>
                  </li>
                ))}
              </ul>

              <a href="#contact" className="group inline-flex items-center gap-3">
                <span className="inline-block bg-[#EC6C00] text-white text-sm rounded-full px-6 py-3 group-hover:bg-black transition-colors" style={{ fontWeight: 500 }}>
                  このプランで相談する
                </span>
                <span className="w-10 h-10 border border-black rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* 保守サポート */}
        <div
          className="bg-white rounded-3xl transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "600ms",
          }}
        >
          <div className="p-8 md:p-10">
            <div className="flex items-center gap-3 mb-8 flex-wrap">
              <h3 className="text-black text-xl md:text-2xl" style={{ fontWeight: 500 }}>
                保守サポート
              </h3>
              <span className="text-[10px] text-white bg-black rounded-md px-2.5 py-1 tracking-[0.2em]" style={{ fontWeight: 500 }}>
                オプション
              </span>
            </div>

            <div className="space-y-3 mb-7">
              {[
                { label: "ランディングページ", sub: "1ページ完結型", price: "¥5,000〜", color: "#FFE900" },
                { label: "ホームページ", sub: "複数ページのHP", price: "¥10,000〜", color: "#EC6C00" },
                { label: "システム", sub: "業務システム", price: "¥20,000〜", color: "#004097" },
              ].map((plan) => (
                <div
                  key={plan.label}
                  className="flex items-center justify-between bg-[#F8F8F8] rounded-2xl px-5 py-4"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <span
                      className="w-1.5 h-12 flex-shrink-0 rounded-full"
                      style={{ background: plan.color }}
                    />
                    <div className="min-w-0">
                      <p className="text-sm text-black" style={{ fontWeight: 500 }}>{plan.label}</p>
                      <p className="text-[11px] text-black/65 mt-1 tracking-wide">{plan.sub}</p>
                    </div>
                  </div>
                  <p className="text-black text-2xl md:text-3xl tabular-nums whitespace-nowrap" style={{ fontWeight: 500 }}>
                    {plan.price}
                    <span className="text-xs text-black/60 ml-0.5" style={{ fontWeight: 400 }}>/月</span>
                  </p>
                </div>
              ))}
            </div>

            <p className="text-xs text-black/70 leading-loose mb-2 tracking-wide">
              サーバー・ドメイン管理込み。テキスト・画像の変更は随時対応、基本当日対応。システムの場合はデータベース・API管理なども含みます。
            </p>
            <p className="text-xs text-black/50 leading-loose tracking-wide">
              ※ サーバー・ドメイン（システムの場合はデータベース・APIも含む）をすべてご自身で管理される場合は、保守なしの買い切りでも対応可能です。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
