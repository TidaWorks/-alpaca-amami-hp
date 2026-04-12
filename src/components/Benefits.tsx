"use client";

import { useFadeIn } from "@/hooks/useFadeIn";

const advantages = [
  {
    num: "01",
    title: "あなた専用だから、使いやすい",
    desc: "既製品のアプリじゃ痒いところに手が届かない。あなたの業務に合わせてゼロから作るから、無駄な機能ゼロ、欲しい機能だけ。",
  },
  {
    num: "02",
    title: "作る人と直接やりとり。伝言ゲームなし",
    desc: "営業→ディレクター→エンジニアの伝言ゲームは起きません。要望を聞いた本人がそのまま作るから、ニュアンスのズレも最小限。困った時もメッセージひとつで基本当日対応。",
  },
  {
    num: "03",
    title: "納品して終わりじゃない",
    desc: "作って渡して終わり、ではありません。使い始めてから出てくる「ここ変えたい」「この機能も欲しい」に、継続的に対応していきます。",
  },
  {
    num: "04",
    title: "余計なコストが、かからない",
    desc: "大きな会社の管理コストがないぶん、品質を落とさず価格を抑えられます。浮いた予算は、もっと大事なことに使えます。",
  },
];

function AdvantageCard({ item, index }: { item: typeof advantages[number]; index: number }) {
  const fade = useFadeIn();
  return (
    <div ref={fade.ref} className={`flex items-start gap-6 transition-all duration-700 ${fade.className}`}>
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#0D9488]/10 border border-[#0D9488]/20 flex items-center justify-center">
        <span className="text-[#0D9488] font-black text-sm">{item.num}</span>
      </div>
      <div className={`flex-1 ${index < advantages.length - 1 ? "pb-10 border-b border-gray-100" : ""}`}>
        <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
      </div>
    </div>
  );
}

export default function Benefits() {
  const fade = useFadeIn();
  return (
    <section id="advantage" className="relative py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:gap-20">
          {/* 左: 見出し */}
          <div ref={fade.ref} className={`md:w-2/5 mb-14 md:mb-0 md:sticky md:top-32 md:self-start transition-all duration-700 ${fade.className}`}>
            <p className="text-xs font-semibold tracking-[0.25em] text-[#0D9488] mb-3">ADVANTAGE</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-800 leading-tight mb-4">
              選ばれる
              <br />
              4つの理由
            </h2>
            <div className="w-12 h-[2px] bg-[#0D9488]/40" />
          </div>

          {/* 右: カード */}
          <div className="md:w-3/5 space-y-8">
            {advantages.map((item, i) => (
              <AdvantageCard key={item.num} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
