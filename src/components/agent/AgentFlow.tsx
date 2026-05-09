"use client";

const STEPS = [
  {
    no: "01",
    title: "ヒアリング（30分・無料）",
    body: "お店の業態・よくある問い合わせ・予約フローをお聞きします。LINE・電話・対面どれでもOK。",
    duration: "1日目",
  },
  {
    no: "02",
    title: "プロトタイプ提示",
    body: "1週間以内に、お店専用のAIスタッフのデモ版をご覧いただきます。会話を実際に試せる状態でお渡しします。",
    duration: "〜7日",
  },
  {
    no: "03",
    title: "本番構築・LINE連携",
    body: "プロトタイプにOKをいただいたら、お店のLINE公式アカウントに接続。FAQの精度をチューニングします。",
    duration: "〜14日",
  },
  {
    no: "04",
    title: "運用開始・継続改善",
    body: "実際に動かしながら、よく聞かれる質問を月1回FAQに追加。お店の成長と一緒にAIも育てていきます。",
    duration: "運用中",
  },
];

export default function AgentFlow() {
  return (
    <section className="relative py-24 md:py-32 bg-[#F5F3FF]">
      <div className="max-w-6xl mx-auto px-6">
        {/* セクション見出し */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="bg-[#1A202C] text-white font-black text-[11px] tracking-widest px-2.5 py-1 rounded-full">
              06
            </span>
            <span className="text-[11px] font-bold tracking-[0.3em] text-[#1A202C]/60">
              FLOW
            </span>
          </div>
          <h2 className="font-memphis-mincho text-[#1A202C] text-3xl md:text-5xl font-extrabold tracking-tight mb-5">
            ご相談から
            <span className="relative inline-block">
              <span className="relative z-10">運用開始まで</span>
              <span className="absolute inset-x-0 bottom-1 h-[35%] bg-[#12C998]/40 -z-0" aria-hidden="true" />
            </span>
          </h2>
          <p className="text-[#1A202C]/70 text-sm md:text-base font-bold leading-relaxed">
            最短2週間で、お店のLINEにAIスタッフが立ちます。
          </p>
        </div>

        {/* タイムライン */}
        <div className="relative max-w-3xl mx-auto">
          {/* 縦線 */}
          <div className="absolute left-6 md:left-8 top-2 bottom-2 w-[2px] bg-gradient-to-b from-[#635BFF] via-[#12C998] to-[#FF3D7F]" />

          {STEPS.map((step) => (
            <div key={step.no} className="relative pl-16 md:pl-20 mb-10 last:mb-0">
              {/* 番号バッジ */}
              <div className="absolute left-0 top-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white ring-4 ring-[#F5F3FF] flex items-center justify-center shadow-md">
                <span className="font-memphis-gothic font-black text-[#635BFF] text-base md:text-lg">
                  {step.no}
                </span>
              </div>

              {/* 内容 */}
              <div className="bg-white rounded-2xl p-6 ring-1 ring-[#1A202C]/8 hover:shadow-[0_8px_24px_-8px_rgba(99,91,255,0.18)] transition-all">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                  <h3 className="font-memphis-mincho font-extrabold text-[#1A202C] text-base md:text-lg">
                    {step.title}
                  </h3>
                  <span className="text-[10px] font-black tracking-widest text-[#FF3D7F] bg-[#FF3D7F]/10 px-2.5 py-1 rounded-full">
                    {step.duration}
                  </span>
                </div>
                <p className="text-[#1A202C]/70 text-[13px] leading-[1.9]">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
