"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const features = [
  {
    number: "01",
    title: "島内で対面打ち合わせ",
    description:
      "奄美に住んでいるから、実際に会って話せる。「こういう雰囲気にしたい」「競合と差別化したい」——そのニュアンスをその場で共有し、齟齬なく形にする。オンライン専業の業者にはできない安心感が、ここにある。",
    imageUrl:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "カフェで打ち合わせする様子",
    photoRight: true,
  },
  {
    number: "02",
    title: "スマホでも美しく",
    description:
      "奄美の人がサイトを見るのは、ほぼスマホ。最初からスマホを主軸に設計し、指で操作しやすいレイアウト、読みやすい文字サイズ、快適な表示速度を徹底する。PCでも崩れない、どこから見ても美しいサイト。",
    imageUrl:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "スマホとPCのレスポンシブ表示",
    photoRight: false,
  },
  {
    number: "03",
    title: "納品後も安心サポート",
    description:
      "公開してからが本番。サーバー・ドメイン管理、セキュリティ更新、テキスト・画像の修正を月額12,000円で一括対応。困ったことはLINEで気軽に連絡できる。「作って終わり」では済まない、長期的な関係を大切にする。",
    imageUrl:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "スマホでサポートチャットを確認する様子",
    photoRight: true,
  },
  {
    number: "04",
    title: "SEO・集客もおまかせ",
    description:
      "「お店の名前 奄美」で検索して出てくる——それが最低ライン。構造化データ、メタ情報、表示速度最適化まで標準で対応。Googleに正しく認識されるための基盤を最初から組み込む。",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "アナリティクスダッシュボード",
    photoRight: false,
  },
];

export default function WebFeatures() {
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    blockRefs.current.forEach((block, i) => {
      if (!block) return;

      const photoEl = block.querySelector<HTMLElement>(".feat-photo");
      const textEl = block.querySelector<HTMLElement>(".feat-text");
      const isPhotoRight = features[i].photoRight;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (photoEl) {
                photoEl.style.opacity = "1";
                photoEl.style.transform = "translateX(0) scale(1)";
              }
              if (textEl) {
                textEl.style.opacity = "1";
                textEl.style.transform = "translateX(0)";
              }
              observer.disconnect();
            }
          });
        },
        { threshold: 0.15 }
      );

      // Set initial hidden states via JS (avoids FOUC by applying before first paint via useEffect)
      // Note: Tailwind classes for opacity-0 / translate are set here so SSR renders visible,
      // then JS hides and animates in — preventing a flash of invisible content on hydration.
      if (photoEl) {
        photoEl.style.opacity = "0";
        photoEl.style.transform = `translateX(${isPhotoRight ? "60px" : "-60px"}) scale(1.04)`;
        photoEl.style.transition =
          "opacity 0.85s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.85s cubic-bezier(0.25,0.46,0.45,0.94)";
      }
      if (textEl) {
        textEl.style.opacity = "0";
        textEl.style.transform = `translateX(${isPhotoRight ? "-40px" : "40px"})`;
        textEl.style.transition =
          "opacity 0.85s cubic-bezier(0.25,0.46,0.45,0.94) 0.15s, transform 0.85s cubic-bezier(0.25,0.46,0.45,0.94) 0.15s";
      }

      observer.observe(block);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section className="relative">
      {/* Section header — transparent so it blends with surrounding sections */}
      <div className="bg-transparent border-t border-[rgba(245,166,35,0.18)] py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#F5A623] text-sm font-semibold uppercase tracking-[0.2em] mb-4">
            FEATURES
          </p>
          <h2 className="text-[#0A0A0A] text-3xl md:text-5xl font-bold leading-tight mb-5">
            TIDA WORKSの<br className="md:hidden" />4つの強み
          </h2>
          <p className="text-gray-500 text-lg max-w-xl leading-relaxed">
            島内に拠点を持つからこそ実現できる、
            <br className="hidden md:block" />
            顔の見えるWeb制作。
          </p>
        </div>
      </div>

      {/* Alternating feature blocks */}
      {features.map((feature, i) => {
        const isDark = i % 2 === 0;
        const isPhotoRight = feature.photoRight;

        // Choose gradient direction based on photo position — no scaleX transform needed
        const desktopOverlayClass = isDark
          ? isPhotoRight
            ? "bg-gradient-to-r from-transparent via-transparent to-[rgba(10,10,10,0.55)]"
            : "bg-gradient-to-l from-transparent via-transparent to-[rgba(10,10,10,0.55)]"
          : isPhotoRight
          ? "bg-gradient-to-r from-transparent via-transparent to-[rgba(250,250,248,0.45)]"
          : "bg-gradient-to-l from-transparent via-transparent to-[rgba(250,250,248,0.45)]";

        return (
          <div
            key={feature.number}
            ref={(el) => { blockRefs.current[i] = el; }}
            className={`relative overflow-hidden ${
              isDark ? "bg-[#0A0A0A]" : "bg-[#FAFAF8]"
            }`}
          >
            {/* Desktop: side-by-side layout */}
            <div
              className={`hidden md:flex min-h-[520px] ${
                isPhotoRight ? "flex-row" : "flex-row-reverse"
              }`}
            >
              {/* Photo side — 55% */}
              <div className="feat-photo relative w-[55%] overflow-hidden">
                <Image
                  src={feature.imageUrl}
                  alt={feature.imageAlt}
                  width={800}
                  height={600}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Directional gradient overlay — direction matches photo side, no scaleX */}
                <div className={`absolute inset-0 ${desktopOverlayClass}`} />
                <div className="absolute inset-0 bg-[rgba(180,100,20,0.08)] mix-blend-multiply" />

                {/* Feature number watermark on photo */}
                <span
                  className="absolute bottom-6 left-6 text-[120px] font-black leading-none select-none pointer-events-none"
                  style={{
                    color: "rgba(245,166,35,0.15)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {feature.number}
                </span>
              </div>

              {/* Text side — 45% */}
              <div
                className={`feat-text relative w-[45%] flex items-center px-12 xl:px-20 py-16 ${
                  isDark ? "bg-[#0A0A0A]" : "bg-[#FAFAF8]"
                }`}
              >
                {/* Diagonal clip accent line */}
                <div
                  className={`absolute top-0 ${
                    isPhotoRight ? "left-0" : "right-0"
                  } h-full w-px`}
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent, rgba(245,166,35,0.4) 40%, rgba(245,166,35,0.4) 60%, transparent)",
                  }}
                />

                <div className="max-w-md">
                  <span className="inline-block text-[#F5A623] text-xs font-bold tracking-[0.25em] uppercase mb-6">
                    {feature.number}
                  </span>
                  <h3
                    className={`text-3xl xl:text-4xl font-bold leading-snug mb-6 ${
                      isDark ? "text-white" : "text-[#0A0A0A]"
                    }`}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className={`text-base leading-[1.9] ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {feature.description}
                  </p>

                  {/* Orange underline accent */}
                  <div className="mt-8 h-px w-12 bg-[#F5A623]" />
                </div>
              </div>
            </div>

            {/* Mobile: stacked layout */}
            <div className="md:hidden">
              <div className="feat-photo relative h-56 overflow-hidden">
                <Image
                  src={feature.imageUrl}
                  alt={feature.imageAlt}
                  width={800}
                  height={600}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[rgba(180,100,20,0.08)] mix-blend-multiply" />
                <div
                  className={`absolute inset-0 ${
                    isDark
                      ? "bg-gradient-to-t from-[rgba(10,10,10,0.6)] to-transparent"
                      : "bg-gradient-to-t from-[rgba(250,250,248,0.5)] to-transparent"
                  }`}
                />
                <span
                  className="absolute bottom-4 right-4 text-[80px] font-black leading-none select-none pointer-events-none"
                  style={{ color: "rgba(245,166,35,0.15)" }}
                >
                  {feature.number}
                </span>
              </div>

              <div
                className={`feat-text px-6 py-10 ${
                  isDark ? "bg-[#0A0A0A]" : "bg-[#FAFAF8]"
                }`}
              >
                <span className="inline-block text-[#F5A623] text-xs font-bold tracking-[0.25em] uppercase mb-4">
                  {feature.number}
                </span>
                <h3
                  className={`text-2xl font-bold leading-snug mb-4 ${
                    isDark ? "text-white" : "text-[#0A0A0A]"
                  }`}
                >
                  {feature.title}
                </h3>
                <p
                  className={`text-sm leading-[1.9] ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {feature.description}
                </p>
                <div className="mt-6 h-px w-10 bg-[#F5A623]" />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
