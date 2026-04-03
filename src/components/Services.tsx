"use client";

import { useFadeIn } from "@/hooks/useFadeIn";
import { useParallax } from "@/hooks/useParallax";

function ParallaxText({ children }: { children: React.ReactNode }) {
  const ref = useParallax(0.15);
  return (
    <div ref={ref} className="absolute top-[10%] left-[-3%] text-[15vw] font-black text-white/[0.015] leading-none select-none tracking-tighter parallax-text">
      {children}
    </div>
  );
}

export default function Services() {
  const fade1 = useFadeIn();
  const fade2 = useFadeIn();
  const fade3 = useFadeIn();
  const fade4 = useFadeIn();

  return (
    <section id="services" className="relative py-20 md:py-36 bg-[#111] text-white overflow-hidden noise-overlay">
      <ParallaxText>
        PRI
        <br />
        CE
      </ParallaxText>

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="mb-20">
          <p className="font-display text-[#F5A623] font-semibold tracking-[0.4em] text-xs mb-4">PRICING</p>
          <h2 className="text-4xl md:text-6xl font-black leading-tight">
            料金
          </h2>
          <p className="text-white/50 text-base mt-4 max-w-xl leading-relaxed">
            ホームページ制作からシステム開発まで。規模やご要望に合わせて柔軟に対応します。
          </p>
        </div>

        {/* ホームページ制作 */}
        <div ref={fade1.ref} className={`border border-white/10 rounded-2xl p-8 md:p-12 mb-8 transition-all duration-700 hover:border-white/20 hover:bg-white/[0.01] ${fade1.className}`}>
          <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-16">
            <div className="md:w-1/2">
              <p className="text-[#4A90D9] text-xs tracking-[0.3em] font-medium mb-3">WEB DESIGN</p>
              <h3 className="text-3xl md:text-5xl font-black mb-4">ホームページ制作</h3>
              <p className="text-[#4A90D9] text-2xl md:text-3xl font-black">
                ¥150,000<span className="text-lg font-medium text-white/40">〜</span>
              </p>
            </div>
            <div className="md:w-1/2">
              <p className="text-white/60 text-base leading-relaxed mb-6">
                お店や会社の顔となるホームページを制作します。スマホ対応はもちろん、お問い合わせフォームやアクセスマップなど必要な機能をまとめて。
              </p>
              <div className="space-y-3">
                {[
                  "店舗サイト・コーポレートサイト・LP制作",
                  "スマホ・タブレット完全対応",
                  "お問い合わせフォーム・Googleマップ設置",
                  "基本的なSEO設定（タイトル・メタ情報）込み",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="text-[#4A90D9] mt-1 text-sm">&#10003;</span>
                    <span className="text-white/70 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* システム開発 */}
        <div ref={fade2.ref} className={`border border-[#F5A623]/30 rounded-2xl p-8 md:p-12 mb-8 transition-all duration-700 relative overflow-hidden bg-gradient-to-br from-[#F5A623]/[0.03] to-transparent hover:border-[#F5A623]/50 hover:shadow-[0_0_60px_rgba(245,166,35,0.08)] ${fade2.className}`}>
          <div className="absolute top-4 right-4 md:top-6 md:right-6">
            <span className="font-display bg-[#F5A623] text-black text-[10px] font-bold px-3 py-1 rounded-full tracking-wider">POPULAR</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-16">
            <div className="md:w-1/2">
              <p className="text-[#F5A623] text-xs tracking-[0.3em] font-medium mb-3">SYSTEM DEVELOPMENT</p>
              <h3 className="text-3xl md:text-5xl font-black mb-4">オーダーメイド<br />システム開発</h3>
              <p className="text-[#F5A623] text-2xl md:text-3xl font-black">
                ¥300,000<span className="text-lg font-medium text-white/40">〜</span>
              </p>
            </div>
            <div className="md:w-1/2">
              <p className="text-white/60 text-base leading-relaxed mb-6">
                予約管理、顧客管理、売上集計、LINE予約・自動応答まで。業務を丸ごとシステム化して、あなたの時間を取り戻します。
              </p>
              <div className="space-y-3">
                {[
                  "ヒアリングからデザイン・開発・納品まで一貫対応",
                  "LINE予約システム・自動応答Bot構築",
                  "スマホ対応・管理画面・印刷機能など柔軟に",
                  "納品後の操作説明・導入サポート付き",
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

        {/* 保守サポート */}
        <div ref={fade3.ref} className={`border border-white/10 rounded-2xl p-8 md:p-12 mb-8 transition-all duration-700 hover:border-[#2ECC71]/20 hover:bg-[#2ECC71]/[0.01] ${fade3.className}`}>
          <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-16">
            <div className="md:w-1/2">
              <p className="text-[#2ECC71] text-xs tracking-[0.3em] font-medium mb-3">MAINTENANCE & SUPPORT</p>
              <h3 className="text-3xl md:text-4xl font-black mb-4">保守・運用サポート</h3>
              <p className="text-[#2ECC71] text-2xl md:text-3xl font-black">
                ¥12,000<span className="text-lg font-medium text-white/40">/月〜</span>
              </p>
            </div>
            <div className="md:w-1/2">
              <p className="text-white/60 text-base leading-relaxed mb-6">
                納品後も安心。サーバー・ドメイン管理からちょっとした修正まで、月額でまるごとお任せください。自社で運用できるなら不要です。
              </p>
              <div className="space-y-3">
                {[
                  "サーバー・ドメイン代込み",
                  "バグ修正・不具合対応",
                  "小さな変更・テキスト修正",
                  "電話・メールでの相談対応",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="text-[#2ECC71] mt-1 text-sm">&#10003;</span>
                    <span className="text-white/70 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-white/30 text-xs mt-6 leading-relaxed">
                ※ 大幅な仕様変更や機能実装がある場合は、別途お見積りとなります。
              </p>
            </div>
          </div>
        </div>

        {/* 注釈 */}
        <div ref={fade4.ref} className={`text-white/30 text-xs leading-relaxed mt-6 space-y-1 transition-all duration-700 ${fade4.className}`}>
          <p>※ 料金は案件の規模・機能数によって変動します。お見積りは無料です。</p>
          <p>※ 保守サポートは任意です。自社で運用される場合は不要です。</p>
          <p>※ 大規模な機能追加は別途お見積りとなります。</p>
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
