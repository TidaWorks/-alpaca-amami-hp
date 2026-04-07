"use client";

import { useFadeIn } from "@/hooks/useFadeIn";

const points = [
  {
    label: "SPEED",
    title: "判断が速い、対応も速い",
    description:
      "大手制作会社のように、社内会議や承認フローを通す必要がありません。お客様の「こうしたい」に、最短即日で対応します。",
    accent: "#F5A623",
  },
  {
    label: "DIRECT",
    title: "作る人と、直接話せる",
    description:
      "営業担当→ディレクター→エンジニア……という伝言ゲームは起きません。要望がそのまま、作る人に届きます。ニュアンスのズレも、やり直しも最小限。",
    accent: "#4A90D9",
  },
  {
    label: "COST",
    title: "余計なコストが、かからない",
    description:
      "チーム管理や間接部門のコストがないぶん、品質を落とさずに価格を抑えられます。浮いた予算は、もっと大事なことに使えます。",
    accent: "#2ECC71",
  },
];

function PointCard({ point, index }: { point: (typeof points)[number]; index: number }) {
  const fade = useFadeIn();
  return (
    <div ref={fade.ref} className={`relative ${fade.className}`}>
      <div className="flex items-start gap-6">
        {/* 左の縦ライン */}
        <div className="flex flex-col items-center pt-1">
          <div
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ background: point.accent }}
          />
          {index < points.length - 1 && (
            <div className="w-px h-full min-h-[60px] bg-white/10 mt-2" />
          )}
        </div>

        {/* テキスト */}
        <div className="pb-10">
          <p
            className="font-display text-xs tracking-[0.3em] font-medium mb-2"
            style={{ color: point.accent, opacity: 0.7 }}
          >
            {point.label}
          </p>
          <h3 className="text-xl md:text-2xl font-bold mb-3">{point.title}</h3>
          <p className="text-white/40 text-sm md:text-base leading-relaxed max-w-lg">
            {point.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function WhySolo() {
  const fadeSub = useFadeIn();

  return (
    <section className="relative py-20 md:py-36 bg-[#0a0a0a] text-white overflow-hidden noise-overlay">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:gap-20">
          {/* 左: 見出し（md以上で固定表示） */}
          <div className="md:w-2/5 mb-16 md:mb-0 md:sticky md:top-32 md:self-start">
            <p className="font-display text-[#F5A623] font-semibold tracking-[0.4em] text-xs mb-4">
              DIFFERENCE
            </p>
            <h2 className="text-3xl md:text-5xl font-black leading-tight mb-6">
              ひとりだから、
              <br />
              <span className="text-white/40">できること。</span>
            </h2>
            <div className="w-16 h-[2px] bg-[#F5A623]/40 mb-6" />
            <p
              ref={fadeSub.ref}
              className={`text-white/40 text-sm md:text-base leading-relaxed max-w-sm ${fadeSub.className}`}
            >
              個人だからこそ、余計な工程がなく、お客様の声がダイレクトに届きます。スピードとコストパフォーマンスで、大手にはできない柔軟さを。
            </p>
          </div>

          {/* 右: ポイント */}
          <div className="md:w-3/5">
            {points.map((point, i) => (
              <PointCard key={point.label} point={point} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
