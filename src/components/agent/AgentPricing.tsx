"use client";

const PLANS = [
  {
    name: "ライト",
    badge: "はじめての方に",
    badgeColor: "bg-[#12C998]",
    initial: "¥50,000",
    monthly: "¥8,000",
    desc: "まずは試してみたい、という方向けの最小構成。FAQ自動応答と簡単な予約受付に絞った導入パック。",
    items: [
      "FAQ自動応答（10問まで）",
      "予約受付（日付・人数・名前）",
      "スプシ連携（自動記録）",
      "月次レポート",
      "メール/LINEサポート",
    ],
    cta: "ライトで相談する",
    featured: false,
  },
  {
    name: "スタンダード",
    badge: "人気プラン",
    badgeColor: "bg-[#FF3D7F]",
    initial: "¥150,000",
    monthly: "¥20,000",
    desc: "本格的にお店の運営に組み込みたい方向け。会話の自由度と通知連携を強化。",
    items: [
      "FAQ自動応答（無制限）",
      "予約受付（カスタマイズ可）",
      "重要案件の人間通知",
      "お店の口調を学習",
      "週次レポート＋月次MTG",
      "FAQメンテ（月1回）",
    ],
    cta: "スタンダードで相談する",
    featured: true,
  },
  {
    name: "プロ",
    badge: "完全カスタム",
    badgeColor: "bg-[#635BFF]",
    initial: "¥250,000〜",
    monthly: "¥40,000〜",
    desc: "業務フロー全体を自動化したい方向け。POS連携・売上集計・複数ボット連動まで対応。",
    items: [
      "スタンダードの全機能",
      "業務フロー自動化",
      "POS/Square等の連携",
      "売上・在庫データ集計",
      "週次MTG＋随時改修",
      "優先サポート",
    ],
    cta: "プロで相談する",
    featured: false,
  },
];

export default function AgentPricing() {
  return (
    <section id="pricing" className="relative py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* セクション見出し */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="bg-[#1A202C] text-white font-black text-[11px] tracking-widest px-2.5 py-1 rounded-full">
              05
            </span>
            <span className="text-[11px] font-bold tracking-[0.3em] text-[#1A202C]/60">
              PRICING
            </span>
          </div>
          <h2 className="font-memphis-mincho text-[#1A202C] text-3xl md:text-5xl font-extrabold tracking-tight mb-5">
            シンプルな
            <span className="relative inline-block">
              <span className="relative z-10">3プラン</span>
              <span className="absolute inset-x-0 bottom-1 h-[35%] bg-[#FF3D7F]/30 -z-0" aria-hidden="true" />
            </span>
          </h2>
          <p className="text-[#1A202C]/70 text-sm md:text-base font-bold leading-relaxed">
            お店の規模に合わせて選べます。途中変更も可能です。
          </p>
        </div>

        {/* 3プラン */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-7">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-3xl p-8 transition-all duration-300 ${
                p.featured
                  ? "bg-gradient-to-br from-[#1A1B3F] via-[#3B2C73] to-[#635BFF] text-white shadow-[0_20px_60px_-12px_rgba(99,91,255,0.45)] md:scale-105"
                  : "bg-[#F5F3FF] ring-1 ring-[#1A202C]/8 hover:shadow-[0_12px_40px_-8px_rgba(99,91,255,0.18)] hover:-translate-y-1"
              }`}
            >
              {/* バッジ */}
              <span
                className={`absolute -top-3 left-1/2 -translate-x-1/2 ${p.badgeColor} text-white font-black text-[10px] tracking-widest px-3 py-1.5 rounded-full shadow-md`}
              >
                {p.badge}
              </span>

              <div className="text-center mb-6 mt-2">
                <h3
                  className={`font-memphis-mincho font-extrabold text-2xl mb-2 ${
                    p.featured ? "text-white" : "text-[#1A202C]"
                  }`}
                >
                  {p.name}
                </h3>
              </div>

              {/* 価格 */}
              <div
                className={`text-center mb-6 pb-6 border-b ${
                  p.featured ? "border-white/20" : "border-[#1A202C]/10"
                }`}
              >
                <div className="flex items-baseline justify-center gap-1 mb-1.5">
                  <span
                    className={`text-[10px] font-bold ${
                      p.featured ? "text-white/70" : "text-[#1A202C]/60"
                    }`}
                  >
                    構築費
                  </span>
                  <span
                    className={`font-memphis-gothic font-black text-2xl ${
                      p.featured ? "text-white" : "text-[#1A202C]"
                    }`}
                  >
                    {p.initial}
                  </span>
                </div>
                <div className="flex items-baseline justify-center gap-1">
                  <span
                    className={`text-[10px] font-bold ${
                      p.featured ? "text-white/70" : "text-[#1A202C]/60"
                    }`}
                  >
                    月額
                  </span>
                  <span
                    className={`font-memphis-gothic font-black text-3xl ${
                      p.featured ? "text-[#12C998]" : "text-[#635BFF]"
                    }`}
                  >
                    {p.monthly}
                  </span>
                  <span
                    className={`text-[10px] font-bold ${
                      p.featured ? "text-white/70" : "text-[#1A202C]/60"
                    }`}
                  >
                    /月
                  </span>
                </div>
              </div>

              <p
                className={`text-[12px] leading-[1.9] mb-5 ${
                  p.featured ? "text-white/80" : "text-[#1A202C]/70"
                }`}
              >
                {p.desc}
              </p>

              <ul className="space-y-2.5 mb-7">
                {p.items.map((item) => (
                  <li
                    key={item}
                    className={`text-[12px] flex items-start gap-2 ${
                      p.featured ? "text-white/90" : "text-[#1A202C]/85"
                    }`}
                  >
                    <span
                      className={`mt-[3px] flex-shrink-0 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-black ${
                        p.featured ? "bg-[#12C998] text-white" : "bg-[#635BFF] text-white"
                      }`}
                    >
                      ✓
                    </span>
                    <span className="font-bold leading-snug">{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`block text-center font-black text-sm rounded-full px-5 py-3 transition-all hover:scale-[1.03] active:scale-[0.97] ${
                  p.featured
                    ? "bg-[#FF3D7F] text-white shadow-md hover:shadow-lg"
                    : "bg-[#1A202C] text-white hover:bg-[#635BFF]"
                }`}
              >
                {p.cta} →
              </a>
            </div>
          ))}
        </div>

        {/* 注釈 */}
        <p className="text-center text-[#1A202C]/55 text-[11px] font-bold mt-10 leading-relaxed">
          ※ Claude API・LINE API等の実費はクライアント負担となります（月¥1,500〜¥7,500目安）
          <br />
          ※ 業種・要件により変動。詳細はお見積もりにてご案内します。
        </p>
      </div>
    </section>
  );
}
