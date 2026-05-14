"use client";

import { useReveal } from "@/hooks/useReveal";

export default function WebManifesto() {
  const [ref, visible] = useReveal<HTMLElement>({ threshold: 0.2 });

  const items = [
    { num: "3", unit: "日〜", label: "最短ランディングページ納品" },
    { num: "対面", unit: "OK", label: "奄美島内で打合せ可能" },
  ];

  return (
    <section
      id="works"
      ref={ref}
      className="relative overflow-hidden bg-[#F8F8F8] py-32 md:py-40 px-6"
    >
      {/* 装飾シェイプ */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg
          className="absolute -top-20 -left-10 w-[420px] h-[420px] hidden md:block"
          viewBox="0 0 400 400"
        >
          <path
            d="M80,180 C50,80 200,40 280,80 C360,120 370,260 320,320 C270,380 120,360 80,260 Z"
            fill="#FFE900"
            opacity="0.55"
          />
        </svg>
        <svg
          className="absolute bottom-10 right-0 w-[180px] h-[180px] hidden md:block"
          viewBox="0 0 200 200"
        >
          <circle cx="100" cy="100" r="80" fill="#004097" opacity="0.08" />
        </svg>
      </div>

      <div className="relative max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-[1.1fr_1.4fr] gap-16 lg:gap-24 items-start">
          {/* 左：巨大英文タイトル＋黄色楕円ストロークアニメ */}
          <div className="relative">
            {/* 手描き風黄色楕円 */}
            <svg
              className="absolute -top-6 -left-4 w-[360px] md:w-[480px] h-auto pointer-events-none"
              viewBox="0 0 500 200"
              aria-hidden="true"
            >
              <path
                d="M250,30 C420,30 470,90 470,110 C470,160 360,180 240,180 C120,180 30,150 30,110 C30,70 80,30 250,30 Z"
                stroke="#FFE900"
                strokeWidth="20"
                fill="none"
                strokeLinecap="round"
                className="manifesto-oval"
                style={{
                  strokeDasharray: 1400,
                  strokeDashoffset: visible ? 0 : 1400,
                  transition: "stroke-dashoffset 2s cubic-bezier(0.65, 0, 0.35, 1) 0.3s",
                }}
              />
            </svg>

            <div className="relative pt-4">
              <p
                className="text-sm tracking-[0.3em] text-black/70 mb-6 transition-all duration-700"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(16px)",
                }}
              >
                Our state ment
              </p>
              <h2
                className="text-black text-[3.5rem] md:text-[6rem] lg:text-[7rem] leading-[0.95] tracking-[-0.02em] transition-all duration-700"
                style={{
                  fontWeight: 400,
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(24px)",
                  transitionDelay: "200ms",
                }}
              >
                <span className="block">Our</span>
                <span className="block">state</span>
                <span className="block">ment</span>
              </h2>
              <p
                className="text-sm tracking-[0.2em] text-black/70 mt-6 transition-all duration-700"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(16px)",
                  transitionDelay: "400ms",
                }}
              >
                私たちについて
              </p>
            </div>
          </div>

          {/* 右：見出し＋本文＋実績数字 */}
          <div className="space-y-12">
            <h3
              className="text-black text-[2.2rem] md:text-[3.2rem] leading-[1.3] tracking-[-0.01em] transition-all duration-700"
              style={{
                fontWeight: 500,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transitionDelay: "300ms",
              }}
            >
              奄美大島を拠点に、
              <br />
              ホームページ
              <br />
              を作っています。
            </h3>

            <p
              className="text-black/80 text-base md:text-lg leading-loose tracking-wide max-w-xl transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transitionDelay: "500ms",
              }}
            >
              業種やお店の規模に合わせて、必要な機能だけを揃えたサイトを作ります。
              島内なら直接伺えるので、イメージを詰めるところから一緒に動けます。
            </p>

            {/* 数字カード */}
            <div
              className="grid grid-cols-2 gap-6 max-w-xl transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transitionDelay: "700ms",
              }}
            >
              {items.map((item, i) => (
                <div
                  key={item.label}
                  className="border-t border-black pt-5"
                  style={{ transitionDelay: `${800 + i * 120}ms` }}
                >
                  <p className="flex items-baseline gap-2">
                    <span className="text-black text-5xl md:text-6xl tabular-nums leading-none" style={{ fontWeight: 500 }}>
                      {item.num}
                    </span>
                    <span className="text-[#EC6C00] text-lg">{item.unit}</span>
                  </p>
                  <p className="text-black/70 text-xs md:text-sm mt-3 tracking-wide">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            {/* 黒丸pill button */}
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transitionDelay: "900ms",
              }}
            >
              <span className="inline-block bg-black text-white text-sm font-medium rounded-full px-7 py-3.5 group-hover:bg-[#EC6C00] transition-colors">
                ALPACAに相談する
              </span>
              <span className="w-11 h-11 border border-black rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
