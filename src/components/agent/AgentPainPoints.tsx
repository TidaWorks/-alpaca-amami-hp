"use client";

const PAINS = [
  {
    no: "01",
    icon: "🌙",
    title: "営業時間外の問い合わせを取り逃してる",
    body: "夜中のLINE、翌朝に返信した頃にはもうお客さんは別のお店を予約している。せっかくのチャンスが毎日消えていく。",
  },
  {
    no: "02",
    icon: "📞",
    title: "同じ質問に毎日答えてる",
    body: "「営業時間は？」「駐車場ある？」「定休日いつ？」毎日同じ質問。本当はもっと別のことに時間を使いたい。",
  },
  {
    no: "03",
    icon: "👥",
    title: "スタッフ雇うほどじゃないけど人手は欲しい",
    body: "問い合わせ対応のためだけに人を雇うのは現実的じゃない。でも自分一人で全部こなすのも限界がある。",
  },
];

export default function AgentPainPoints() {
  return (
    <section
      id="pain"
      className="relative py-24 md:py-32 bg-[#F5F3FF]"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* セクション見出し */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-3 mb-5">
            <p className="text-[11px] font-bold tracking-[0.4em] text-[#1D3A8A]">
              CHAPTER 01
            </p>
            <span className="w-8 h-[1px] bg-[#1D3A8A]/30" />
            <p className="text-[11px] font-bold tracking-[0.3em] text-[#0A1228]/60">
              PAIN POINTS
            </p>
          </div>
          <h2 className="font-memphis-mincho text-[#1A202C] text-3xl md:text-5xl font-extrabold tracking-tight mb-5">
            こんな
            <span className="relative inline-block">
              <span className="relative z-10">困りごと</span>
              <span className="absolute inset-x-0 bottom-1 h-[35%] bg-[#FF3D7F]/30 -z-0" aria-hidden="true" />
            </span>
            、ありませんか？
          </h2>
          <p className="text-[#1A202C]/70 text-sm md:text-base font-bold leading-relaxed">
            奄美のお店オーナーさんから、よく聞く声です。
          </p>
        </div>

        {/* カード3枚 */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-7">
          {PAINS.map((p) => (
            <div
              key={p.no}
              className="relative bg-white rounded-3xl p-7 md:p-8 ring-1 ring-[#1A202C]/8 shadow-[0_8px_32px_-8px_rgba(99,91,255,0.12)] hover:shadow-[0_12px_40px_-8px_rgba(99,91,255,0.22)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="absolute top-5 right-5 text-[10px] font-black tracking-widest text-[#635BFF]/40">
                {p.no}
              </div>
              <div className="text-4xl mb-5">{p.icon}</div>
              <h3 className="font-memphis-mincho font-extrabold text-[#1A202C] text-lg md:text-xl mb-3 leading-snug">
                {p.title}
              </h3>
              <p className="text-[#1A202C]/70 text-[13px] md:text-sm leading-[1.9]">
                {p.body}
              </p>
            </div>
          ))}
        </div>

        {/* 解決策への橋渡し */}
        <div className="text-center mt-16 md:mt-20">
          <p className="font-memphis-mincho text-[#1A202C] text-xl md:text-2xl font-extrabold leading-relaxed">
            ALPACAの
            <span className="text-[#635BFF]">AIスタッフ</span>が、
            <br className="md:hidden" />
            ぜんぶ自動で答えます。
          </p>
        </div>
      </div>
    </section>
  );
}
