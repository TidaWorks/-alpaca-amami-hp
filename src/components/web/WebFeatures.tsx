"use client";

import { useReveal } from "@/hooks/useReveal";

const features = [
  {
    tag: "MEETING",
    accent: "#635BFF",
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
    accent: "#12C998",
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
    accent: "#8B86FF",
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
      className="relative bg-gradient-to-br from-[#F5F3FF] via-white to-[#EFF6FF] py-20 md:py-28 px-6 scroll-mt-20 overflow-hidden"
    >
      <div className="relative max-w-5xl mx-auto">
        {/* 見出し */}
        <div
          className="mb-14 md:mb-16 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="bg-[#635BFF] text-white font-black text-[11px] tracking-widest px-2.5 py-1 rounded-md">
              02
            </span>
            <span className="text-[11px] font-bold tracking-[0.3em] text-[#1A202C]">FEATURES</span>
          </div>
          <h2 className="font-memphis-mincho text-[#1A202C] text-3xl md:text-5xl font-extrabold mb-5 leading-[1.3] tracking-tight">
            ALPACAの
            <br className="md:hidden" />
            <span className="relative inline-block">
              <span className="relative z-10">3つの強み</span>
              <span
                className="absolute inset-x-0 bottom-1 h-[40%] bg-[#12C998]/45 -z-0"
                aria-hidden="true"
              />
            </span>
            。
          </h2>
          <p className="font-memphis-mincho text-[#1A202C]/75 text-sm md:text-base">
            島内に拠点を持つからこそ実現できる、顔の見えるWeb制作。
          </p>
        </div>

        {/* 3カード */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 md:gap-8">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="group relative bg-white border border-[#1A202C]/10 rounded-2xl p-6 md:p-7 transition-all duration-500 shadow-lg hover:-translate-y-1 hover:shadow-xl"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transitionDelay: `${150 + i * 100}ms`,
              }}
            >
              {/* タグ */}
              <span
                className="absolute -top-3 right-4 text-[10px] font-black tracking-[0.2em] px-2.5 py-1 rounded-full text-white"
                style={{ background: feature.accent }}
              >
                {feature.tag}
              </span>

              {/* 番号 */}
              <div
                className="font-memphis-mincho text-[64px] font-extrabold leading-none mb-3 text-[#1A202C]"
              >
                0{i + 1}
              </div>

              {/* アイコン */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-5 text-white transition-transform duration-300 group-hover:rotate-[-6deg] group-hover:scale-110 shadow-md"
                style={{ background: feature.accent }}
              >
                {feature.icon}
              </div>

              <h3 className="font-memphis-mincho text-[#1A202C] text-xl md:text-[1.4rem] font-extrabold mb-3">
                {feature.title}
              </h3>
              <p className="text-[#1A202C]/75 text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* アクセントバー */}
              <div
                className="h-[4px] w-12 rounded-full mt-6"
                style={{ background: feature.accent }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
