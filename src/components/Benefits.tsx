"use client";

import { useFadeIn } from "@/hooks/useFadeIn";

/* ─── Hooks違反修正: .map()内でuseFadeInを呼ばないよう、個別コンポーネントに切り出し ─── */

const benefits = [
  {
    number: "01",
    title: "あなた専用だから、使いやすい",
    description: "既製品のアプリじゃ痒いところに手が届かない。あなたのやりたいことに合わせてゼロから作るから、無駄な機能ゼロ、欲しい機能だけ。",
    keyword: "CUSTOM",
    accent: "#F5A623",
  },
  {
    number: "02",
    title: "業務が、まるごと見える化",
    description: "予約・顧客・売上・在庫——バラバラだった情報がひとつのシステムでつながります。今どうなってるか、いつでもすぐ確認できる。",
    keyword: "EFFICIENT",
    accent: "#4A90D9",
  },
  {
    number: "03",
    title: "ツライ作業から解放される",
    description: "電話対応、手書きの台帳、Excelの転記。毎日やってた作業をアプリに任せれば、あなたの時間がもっと自由になります。",
    keyword: "FREEDOM",
    accent: "#2ECC71",
  },
];

/* 各Benefitカードを個別コンポーネントにしてHooks違反を解消 */
function BenefitCard({ b, i }: { b: typeof benefits[number]; i: number }) {
  const fade = useFadeIn();
  const isReversed = i % 2 === 1;
  return (
    <div
      key={b.number}
      ref={fade.ref}
      className={`flex flex-col ${isReversed ? "md:flex-row-reverse" : "md:flex-row"} items-start gap-8 md:gap-16`}
    >
      {/* 数字 + キーワード */}
      <div className={`md:w-1/3 flex-shrink-0 benefit-number ${fade.className}`}>
        <span
          className="text-[8rem] md:text-[10rem] font-black leading-none block"
          style={{ color: b.accent, opacity: 0.15 }}
        >
          {b.number}
        </span>
        <p
          className="text-xs font-bold tracking-[0.4em] -mt-8 ml-2"
          style={{ color: b.accent, opacity: 0.6 }}
        >
          {b.keyword}
        </p>
      </div>

      {/* テキスト */}
      <div className={`md:w-2/3 md:pt-12 ${isReversed ? "benefit-text-reverse" : "benefit-text"} ${fade.className}`}>
        <h3 className="text-2xl md:text-4xl font-bold mb-4 leading-snug">
          {b.title}
        </h3>
        <div className={`w-16 h-[2px] mb-6 line-grow ${fade.className}`} style={{ background: b.accent }} />
        <p className="text-white/40 text-base md:text-lg leading-relaxed max-w-xl">
          {b.description}
        </p>
      </div>
    </div>
  );
}

export default function Benefits() {
  return (
    <section id="benefits" className="relative py-20 md:py-36 bg-[#0a0a0a] text-white overflow-hidden noise-overlay">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F5A623]/20 to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        <div className="mb-24">
          <p className="font-display text-[#F5A623] font-semibold tracking-[0.4em] text-xs mb-4">BENEFITS</p>
          <h2 className="text-4xl md:text-6xl font-black leading-tight">
            選ばれる
            <br />
            <span className="text-white/40">3つの理由</span>
          </h2>
          <div className="w-20 h-[2px] bg-[#F5A623]/40 mt-6" />
        </div>

        <div className="space-y-24 md:space-y-32">
          {benefits.map((b, i) => (
            <BenefitCard key={b.number} b={b} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
