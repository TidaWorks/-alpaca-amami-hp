"use client";

import { useFadeIn } from "@/hooks/useFadeIn";

const steps = [
  { num: "01", title: "お問い合わせ", desc: "まずはお気軽にご相談ください。「こんなの作れる？」だけでOKです。" },
  { num: "02", title: "ヒアリング・ご提案", desc: "業務の流れやお困りごとを詳しくお聞きし、最適なプランをご提案。お見積りも無料。" },
  { num: "03", title: "開発・制作", desc: "ご契約後、開発をスタート。進捗は随時共有。途中での修正もお気軽に。" },
  { num: "04", title: "納品・操作説明", desc: "完成したシステムを納品し、使い方を丁寧にご説明します。" },
  { num: "05", title: "保守・サポート", desc: "納品後も月額サポートで安心。修正・不具合対応・相談まで、ずっとお任せください。" },
];

function FlowStep({ step, isLast }: { step: typeof steps[number]; isLast: boolean }) {
  const fade = useFadeIn();
  return (
    <div ref={fade.ref} className={`flex gap-6 items-start transition-all duration-700 ${fade.className}`}>
      <div className="relative flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-[#0D9488]/10 border border-[#0D9488]/20 flex items-center justify-center">
          <span className="text-[#0D9488] font-black text-sm">{step.num}</span>
        </div>
        {!isLast && (
          <div className="absolute left-1/2 -translate-x-1/2 top-full h-10 w-px bg-gray-200 hidden md:block" />
        )}
      </div>
      <div className="flex-1 pb-2">
        <h3 className="text-lg font-bold text-gray-800 mb-1">{step.title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
      </div>
    </div>
  );
}

export default function Flow() {
  return (
    <section id="flow" className="relative py-20 md:py-32 bg-white">
      <div className="max-w-3xl mx-auto px-6 md:px-10">
        <div className="mb-14">
          <p className="text-xs font-semibold tracking-[0.25em] text-[#0D9488] mb-3">FLOW</p>
          <h2 className="text-3xl md:text-4xl font-black text-gray-800 leading-tight">ご利用の流れ</h2>
        </div>

        <div className="space-y-10">
          {steps.map((step, i) => (
            <FlowStep key={step.num} step={step} isLast={i === steps.length - 1} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm mb-4">「こんなの作れる？」だけでOKです。</p>
          <a href="#contact" className="inline-block bg-gray-800 text-white font-bold px-8 py-3.5 rounded-full text-sm hover:bg-gray-700 transition-all hover:scale-105">
            無料で相談する
          </a>
        </div>
      </div>
    </section>
  );
}
