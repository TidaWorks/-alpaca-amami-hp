"use client";

import { useReveal } from "@/hooks/useReveal";

const features = [
  {
    tag: "MEETING",
    accent: "#1D3A8A",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "島内で対面打ち合わせ",
    description: "奄美に住んでいるから、直接会って話せます。ニュアンスもその場で共有。",
  },
  {
    tag: "SUPPORT",
    accent: "#FF6B35",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: "納品後も安心サポート",
    description: "公開してからが本番。テキスト・画像の修正、サーバー管理まで月額で対応。",
  },
  {
    tag: "MOBILE",
    accent: "#15296B",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    title: "スマホでも美しく",
    description: "奄美の人がサイトを見るのは、ほぼスマホ。最初からスマホ主軸で設計します。",
  },
];

export default function WebFeatures() {
  const [sectionRef, visible] = useReveal<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative bg-[#FAFAF7] py-24 md:py-32 px-6 scroll-mt-20 overflow-hidden"
    >
      <div className="relative max-w-5xl mx-auto">
        {/* 章扉 */}
        <div
          className="mb-14 md:mb-16 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <p className="text-[11px] font-bold tracking-[0.4em] text-[#1D3A8A] mb-3">
            CHAPTER 02 / SOLUTION
          </p>
          <h2 className="font-memphis-mincho text-[#0A1228] text-3xl md:text-5xl font-extrabold mb-5 leading-[1.2] tracking-tight">
            ALPACAの
            <br className="md:hidden" />
            <span className="relative inline-block">
              <span className="relative z-10">3つの強み</span>
              <span
                className="absolute inset-x-0 bottom-1 h-[40%] bg-[#FF6B35]/25 -z-0"
                aria-hidden="true"
              />
            </span>
            。
          </h2>
          <p className="font-hand text-[#0A1228]/70 text-base md:text-lg mt-5 max-w-xl leading-relaxed">
            ALPACAの3つの強み
          </p>
          <p className="text-[#0A1228]/75 text-sm md:text-base mt-3">
            島内に拠点を持つからこそ実現できる、顔の見えるWeb制作。
          </p>
        </div>

        {/* 3カード */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 md:gap-8">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden bg-white border border-[#0A1228]/8 rounded-xl p-6 md:p-7 transition-all duration-500 shadow-[0_8px_30px_-10px_rgba(10,18,40,0.15)] hover:-translate-y-1 hover:shadow-[0_12px_40px_-10px_rgba(10,18,40,0.22)]"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transitionDelay: `${150 + i * 100}ms`,
              }}
            >
              {/* タグ */}
              <span
                className="absolute -top-3 right-4 text-[10px] font-black tracking-[0.2em] px-2.5 py-1 rounded-full text-white z-10"
                style={{ background: feature.accent }}
              >
                {feature.tag}
              </span>

              {/* 番号 — mento風 巨大背景的 */}
              <div
                className="font-memphis-mincho text-[64px] md:text-[80px] font-extrabold leading-none absolute top-4 left-5 text-[#0A1228]/[0.08] pointer-events-none select-none"
                aria-hidden="true"
              >
                0{i + 1}
              </div>

              {/* アイコン円 */}
              <div
                className="relative w-14 h-14 rounded-full flex items-center justify-center mb-5 mt-10 text-white transition-transform duration-300 group-hover:rotate-[-6deg] group-hover:scale-110"
                style={{ background: feature.accent }}
              >
                {feature.icon}
              </div>

              <h3 className="relative font-memphis-mincho text-[#0A1228] text-xl md:text-[1.4rem] font-extrabold mb-3">
                {feature.title}
              </h3>
              <p className="relative text-[#0A1228]/75 text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* アクセントバー */}
              <div
                className="relative h-[3px] w-12 mt-6"
                style={{ background: feature.accent }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
