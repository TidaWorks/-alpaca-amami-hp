"use client";

const CASES = [
  {
    no: "U-01",
    icon: "🍽",
    industry: "飲食店",
    title: "予約・メニュー案内・営業時間",
    body: "「今日空いてる？」「メニューは？」「定休日いつ？」を24時間自動応答。予約はそのままスプシで管理。",
    tagColor: "bg-[#FF3D7F]",
  },
  {
    no: "U-02",
    icon: "🏨",
    industry: "宿・ゲストハウス",
    title: "チェックイン案内・観光FAQ",
    body: "「チェックインの流れ」「Wi-Fiパスワード」「周辺おすすめ」を自動回答。海外ゲストも英語対応可。",
    tagColor: "bg-[#635BFF]",
  },
  {
    no: "U-03",
    icon: "💇",
    industry: "サロン・整体",
    title: "予約受付・施術案内",
    body: "「料金教えて」「カット予約したい」を会話で受付。初回カウンセリングの事前ヒアリングも可能。",
    tagColor: "bg-[#12C998]",
  },
  {
    no: "U-04",
    icon: "🚐",
    industry: "観光ツアー",
    title: "予約・当日集合案内・天気対応",
    body: "「マングローブツアー予約」「集合場所どこ？」を即返信。台風時の自動キャンセル案内も。",
    tagColor: "bg-[#FF8B3D]",
  },
];

export default function AgentUseCases() {
  return (
    <section
      id="usecases"
      className="relative py-24 md:py-32 bg-gradient-to-b from-[#F5F3FF] to-[#EAE6FF]"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* セクション見出し */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="bg-[#1A202C] text-white font-black text-[11px] tracking-widest px-2.5 py-1 rounded-full">
              04
            </span>
            <span className="text-[11px] font-bold tracking-[0.3em] text-[#1A202C]/60">
              USE CASES
            </span>
          </div>
          <h2 className="font-memphis-mincho text-[#1A202C] text-3xl md:text-5xl font-extrabold tracking-tight mb-5">
            業種別の
            <span className="relative inline-block">
              <span className="relative z-10">活用イメージ</span>
              <span className="absolute inset-x-0 bottom-1 h-[35%] bg-[#635BFF]/30 -z-0" aria-hidden="true" />
            </span>
          </h2>
          <p className="text-[#1A202C]/70 text-sm md:text-base font-bold leading-relaxed">
            奄美の事業者さんに合わせて、お店ごとに会話内容をチューニングします。
          </p>
        </div>

        {/* 4カード */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-7">
          {CASES.map((c) => (
            <div
              key={c.no}
              className="relative bg-white rounded-3xl p-7 md:p-8 ring-1 ring-[#1A202C]/8 shadow-[0_8px_32px_-8px_rgba(99,91,255,0.12)] hover:shadow-[0_12px_40px_-8px_rgba(99,91,255,0.22)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="absolute top-5 right-5 text-[10px] font-black tracking-widest text-[#1A202C]/30">
                {c.no}
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">{c.icon}</div>
                <span
                  className={`${c.tagColor} text-white font-black text-[11px] tracking-widest px-3 py-1 rounded-full`}
                >
                  {c.industry}
                </span>
              </div>
              <h3 className="font-memphis-mincho font-extrabold text-[#1A202C] text-lg md:text-xl mb-3 leading-snug">
                {c.title}
              </h3>
              <p className="text-[#1A202C]/70 text-[13px] md:text-sm leading-[1.9]">
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
