"use client";

import { useFadeIn } from "@/hooks/useFadeIn";
import { useParallax } from "@/hooks/useParallax";

function ParallaxLogo() {
  const ref = useParallax(0.2);
  return (
    <div ref={ref} className="absolute top-[10%] left-1/2 -translate-x-1/2 select-none pointer-events-none parallax-text">
      <img
        src="/images/alpaca-logo.svg"
        alt=""
        className="w-[65vw] max-w-[800px] h-auto opacity-[0.05]"
      />
    </div>
  );
}

export default function Services() {
  const fade1 = useFadeIn();
  const fade2 = useFadeIn();
  const fade4 = useFadeIn();
  const fade5 = useFadeIn();

  return (
    <section id="services" className="relative py-20 md:py-36 bg-[#111] text-white overflow-hidden noise-overlay">
      <ParallaxLogo />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="mb-20">
          <p className="font-display text-[#F5A623] font-semibold tracking-[0.4em] text-xs mb-4">PRICING</p>
          <h2 className="text-4xl md:text-6xl font-black leading-tight">
            料金
          </h2>
          <p className="text-white/50 text-base mt-4 max-w-xl leading-relaxed">
            業務の「困った」を仕組みで解決。システム構築からWeb制作まで対応します。
          </p>
        </div>

        {/* 業務改善システム構築（主役） */}
        <div ref={fade1.ref} className={`border border-[#F5A623]/30 rounded-2xl p-8 md:p-12 mb-8 transition-all duration-700 relative overflow-hidden bg-gradient-to-br from-[#F5A623]/[0.03] to-transparent hover:border-[#F5A623]/50 hover:shadow-[0_0_60px_rgba(245,166,35,0.08)] ${fade1.className}`}>
          <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-16">
            <div className="md:w-1/2">
              <p className="text-[#F5A623] text-xs tracking-[0.3em] font-medium mb-3">BUSINESS SYSTEM</p>
              <h3 className="text-3xl md:text-5xl font-black mb-4">業務改善<br />システム構築</h3>
              <p className="text-[#F5A623] text-2xl md:text-3xl font-black">
                ¥300,000<span className="text-lg font-medium text-white/40">〜（要見積）</span>
              </p>
              <p className="text-white/30 text-xs mt-3">納期目安：規模に応じてご相談</p>
            </div>
            <div className="md:w-1/2">
              <p className="text-white/60 text-base leading-relaxed mb-6">
                予約管理、スケジュール自動連携、顧客管理など、業務フローをまるごとシステム化。手作業・紙・Excel管理から脱却し、業務効率を劇的に改善します。納品後もお客様と一緒に、満足のいく形になるまで作り上げていきます。
              </p>
              <div className="space-y-3">
                {[
                  "業務フローに合わせたオーダーメイド設計",
                  "予約管理・スケジュール自動連携・顧客管理など",
                  "スマホ対応・管理画面・印刷機能など柔軟に対応",
                  "納品後も継続的にサポート・改善",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="text-[#F5A623] mt-1 text-sm">&#10003;</span>
                    <span className="text-white/70 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Web制作（サブ：LP + HP をコンパクトにまとめる） */}
        <div ref={fade2.ref} className={`border border-white/10 rounded-2xl p-8 md:p-12 mb-8 transition-all duration-700 hover:border-white/20 hover:bg-white/[0.01] ${fade2.className}`}>
          <p className="text-[#4A90D9] text-xs tracking-[0.3em] font-medium mb-3">WEB DESIGN</p>
          <h3 className="text-2xl md:text-3xl font-black mb-2">Web制作</h3>
          <p className="text-white/50 text-sm mb-8">ホームページ・ランディングページの制作も承ります。</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LP */}
            <div className="border border-white/10 rounded-xl p-6 hover:border-[#4A90D9]/20 transition-colors">
              <p className="text-white/40 text-xs tracking-wider mb-2">LP（1ページ）</p>
              <p className="text-[#4A90D9] text-xl font-black mb-1">
                ¥50,000<span className="text-sm font-medium text-white/40">〜80,000</span>
              </p>
              <p className="text-white/30 text-xs mb-4">納期 約2週間</p>
              <ul className="space-y-1.5">
                {["スマホ完全対応", "お問い合わせフォーム", "SEO初期設定込み"].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-[#4A90D9] mt-0.5 text-xs">&#10003;</span>
                    <span className="text-white/60 text-xs">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* HP */}
            <div className="border border-white/10 rounded-xl p-6 hover:border-[#4A90D9]/20 transition-colors">
              <p className="text-white/40 text-xs tracking-wider mb-2">ホームページ（複数ページ）</p>
              <p className="text-[#4A90D9] text-xl font-black mb-1">
                ¥150,000<span className="text-sm font-medium text-white/40">〜300,000</span>
              </p>
              <p className="text-white/30 text-xs mb-4">納期 約1ヶ月</p>
              <ul className="space-y-1.5">
                {["5ページ構成目安", "Googleマップ設置", "SEO初期設定込み"].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-[#4A90D9] mt-0.5 text-xs">&#10003;</span>
                    <span className="text-white/60 text-xs">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <a href="/web" className="text-[#4A90D9] text-sm hover:underline underline-offset-4 transition-colors">
              Web制作の詳細・デモサイトを見る &rarr;
            </a>
          </div>
        </div>

        {/* 保守サポート */}
        <div ref={fade4.ref} className={`border border-white/10 rounded-2xl p-8 md:p-12 mb-8 transition-all duration-700 hover:border-[#2ECC71]/20 hover:bg-[#2ECC71]/[0.01] ${fade4.className}`}>
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-[#2ECC71] text-xs tracking-[0.3em] font-medium mb-3">MAINTENANCE & SUPPORT</p>
              <h3 className="text-3xl md:text-4xl font-black mb-4">保守サポート</h3>
              <p className="text-white/60 text-base leading-relaxed">
                納品後も安心。サーバー・ドメイン管理から日々の修正まで、まるごとお任せください。基本当日対応いたします。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: "LP", price: "¥7,000", sub: "/月" },
                { label: "ホームページ", price: "¥10,000", sub: "/月" },
                { label: "システム", price: "¥20,000", sub: "/月" },
              ].map((plan) => (
                <div key={plan.label} className="border border-white/10 rounded-xl p-5 text-center hover:border-[#2ECC71]/30 transition-colors">
                  <p className="text-white/50 text-xs tracking-wider mb-2">{plan.label}</p>
                  <p className="text-[#2ECC71] text-2xl font-black">{plan.price}<span className="text-sm font-medium text-white/40">{plan.sub}</span></p>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              {[
                "サーバー・ドメイン管理込み",
                "テキスト・画像の変更対応",
                "不具合修正",
                "電話/メール/LINEサポート",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="text-[#2ECC71] mt-1 text-sm">&#10003;</span>
                  <span className="text-white/70 text-sm">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-white/30 text-xs leading-relaxed">
              ※ 新ページ追加・大幅デザイン変更・新機能開発は別途お見積りとなります。
            </p>
          </div>
        </div>

        {/* 注釈 */}
        <div ref={fade5.ref} className={`text-white/30 text-xs leading-relaxed mt-6 space-y-1 transition-all duration-700 ${fade5.className}`}>
          <p>※ 料金は案件の規模・機能数によって変動します。お見積りは無料です。</p>
          <p>※ 写真・ロゴ等の素材はお客様にご用意いただきます。</p>
          <p>※ 保守サポートは任意です。自社で運用される場合は不要です。</p>
          <p>※ 初回相談無料。まずはお気軽にお問い合わせください。</p>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-white/40 text-sm mb-5">まずはお気軽にご相談ください。お見積りは無料です。</p>
          <a
            href="#contact"
            className="inline-block bg-[#F5A623] text-black font-bold px-9 py-4 rounded-full text-base hover:bg-[#FFD700] transition-all hover:scale-105 shadow-lg shadow-[#F5A623]/25"
          >
            無料で相談する
          </a>
        </div>
      </div>
    </section>
  );
}
