"use client";

import { useFadeIn } from "@/hooks/useFadeIn";

const steps = [
  {
    num: "01",
    title: "お問い合わせ",
    desc: "まずはお気軽にご相談ください。「こんなの作れる？」だけでOKです。メール・電話どちらでも。",
  },
  {
    num: "02",
    title: "ヒアリング・ご提案",
    desc: "現在の業務の流れやお困りごとを詳しくお聞きし、最適なプランをご提案します。お見積りも無料。",
  },
  {
    num: "03",
    title: "開発・制作",
    desc: "ご契約後、開発をスタート。進捗は随時共有しますので、途中での修正・変更もお気軽に。",
  },
  {
    num: "04",
    title: "納品・操作説明",
    desc: "完成したシステムを納品し、使い方を丁寧にご説明します。わからないことは何でも聞いてください。",
  },
  {
    num: "05",
    title: "保守・サポート開始",
    desc: "納品後も月額サポートで安心。修正対応・不具合対応・相談まで、ずっとお任せください。",
  },
];

/* Hooks違反修正: .map()内でuseFadeInを呼ばないよう、個別コンポーネントに切り出し */
function FlowStep({ step, i, isLast }: { step: typeof steps[number]; i: number; isLast: boolean }) {
  const fade = useFadeIn();
  return (
    <div
      ref={fade.ref}
      className={`flex gap-6 md:gap-10 items-start transition-all duration-700 ${fade.className}`}
    >
      {/* ナンバー */}
      <div className="relative flex-shrink-0">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-[#F5A623]/30 bg-[#F5A623]/5 flex items-center justify-center">
          <span className="text-[#F5A623] font-black text-sm md:text-base">{step.num}</span>
        </div>
        {!isLast && (
          <div className="absolute left-1/2 -translate-x-1/2 top-full h-12 md:h-16 w-px bg-gradient-to-b from-[#F5A623]/20 to-transparent hidden md:block" />
        )}
      </div>

      {/* コンテンツ */}
      <div className="flex-1 pb-2">
        <div className="mb-2">
          <h3 className="text-xl md:text-2xl font-bold">{step.title}</h3>
        </div>
        <p className="text-white/50 text-sm md:text-base leading-relaxed max-w-lg">
          {step.desc}
        </p>
      </div>
    </div>
  );
}

export default function Flow() {
  return (
    <section id="flow" className="relative py-20 md:py-36 bg-[#0a0a0a] text-white overflow-hidden noise-overlay">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        <div className="mb-20">
          <p className="font-display text-[#F5A623] font-semibold tracking-[0.4em] text-xs mb-4">FLOW</p>
          <h2 className="text-4xl md:text-6xl font-black leading-tight">
            ご利用の<span className="text-[#F5A623]">流れ</span>
          </h2>
          <p className="text-white/50 text-base mt-4 max-w-xl leading-relaxed">
            お問い合わせから納品、その後のサポートまでの流れをご紹介します。
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-white/10 hidden md:block" />

          <div className="space-y-12 md:space-y-16">
            {steps.map((step, i) => (
              <FlowStep key={step.num} step={step} i={i} isLast={i === steps.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
