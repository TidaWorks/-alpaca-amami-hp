"use client";

const FEATURES = [
  {
    no: "F-01",
    icon: "🕒",
    title: "24時間自動応答",
    body: "営業時間外も深夜も、お客様からのメッセージにAIが即返信。取り逃しゼロを実現します。",
  },
  {
    no: "F-02",
    icon: "📅",
    title: "予約受付（日付・人数）",
    body: "日時・人数・連絡先を会話で取得。Googleスプレッドシートに自動で記録され、即座に確認できます。",
  },
  {
    no: "F-03",
    icon: "💬",
    title: "FAQ自動応答",
    body: "営業時間・定休日・アクセス・メニューなど、よくある質問に文字通り何回でも答えます。",
  },
  {
    no: "F-04",
    icon: "🌺",
    title: "お店の口調を学習",
    body: "オーナーさんの言葉づかい・キャラクターを反映。お店らしさが消えない、自然な返信。",
  },
  {
    no: "F-05",
    icon: "🔔",
    title: "重要案件は人間に通知",
    body: "クレーム・複雑な相談はAIが判断して、オーナーさんのスマホに即通知。AIに任せきりにしません。",
  },
  {
    no: "F-06",
    icon: "📊",
    title: "週次レポート",
    body: "「今週は何件問い合わせがあったか」「よく聞かれた質問は何か」を毎週レポートでお届け。",
  },
];

export default function AgentFeatures() {
  return (
    <section id="features" className="relative py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* セクション見出し */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="bg-[#1A202C] text-white font-black text-[11px] tracking-widest px-2.5 py-1 rounded-full">
              03
            </span>
            <span className="text-[11px] font-bold tracking-[0.3em] text-[#1A202C]/60">
              FEATURES
            </span>
          </div>
          <h2 className="font-memphis-mincho text-[#1A202C] text-3xl md:text-5xl font-extrabold tracking-tight mb-5">
            AIスタッフが
            <br className="md:hidden" />
            <span className="relative inline-block">
              <span className="relative z-10">できること</span>
              <span className="absolute inset-x-0 bottom-1 h-[35%] bg-[#12C998]/40 -z-0" aria-hidden="true" />
            </span>
            、6つ。
          </h2>
          <p className="text-[#1A202C]/70 text-sm md:text-base font-bold leading-relaxed">
            お店のオーナーさんが「これ、自動でやってくれたら…」と思う作業を、ぜんぶ受け持ちます。
          </p>
        </div>

        {/* 6グリッド */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <div
              key={f.no}
              className="group relative bg-[#F5F3FF] rounded-3xl p-7 ring-1 ring-[#635BFF]/10 hover:ring-[#635BFF]/30 hover:bg-white hover:shadow-[0_12px_40px_-8px_rgba(99,91,255,0.18)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="absolute top-5 right-5 text-[9px] font-black tracking-widest text-[#635BFF]/40">
                {f.no}
              </div>
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="font-memphis-mincho font-extrabold text-[#1A202C] text-base md:text-lg mb-2.5 leading-snug">
                {f.title}
              </h3>
              <p className="text-[#1A202C]/70 text-[13px] leading-[1.9]">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
