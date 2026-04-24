"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  {
    tag: "MEETING",
    color: "#FF2E88",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
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
    color: "#00FF85",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: "納品後も安心サポート",
    description: "公開してからが本番。テキスト・画像の修正、サーバー管理まで月額で対応。",
  },
  {
    tag: "MOBILE",
    color: "#FFE500",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    title: "スマホでも美しく",
    description: "奄美の人がサイトを見るのは、ほぼスマホ。最初からスマホ主軸で設計します。",
  },
];

export default function WebFeatures() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="features" className="relative bg-[#0A0A0A] py-20 md:py-28 px-6 scroll-mt-20 overflow-hidden">
      {/* 背景ドット */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        aria-hidden="true"
        style={{ backgroundImage: "radial-gradient(circle, #FFFFFF 1px, transparent 1px)", backgroundSize: "32px 32px" }}
      />
      {/* ネオングロー */}
      <div
        className="absolute -top-20 right-1/4 w-[400px] h-[400px] rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
        style={{ background: "rgba(0,255,133,0.15)" }}
      />

      <div className="relative max-w-4xl mx-auto">
        {/* 見出し */}
        <div
          className="mb-12 md:mb-16 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <div className="inline-flex items-center gap-2 mb-5 bg-[#00FF85] text-black text-[10px] font-black tracking-[0.25em] px-3 py-1.5 rounded-sm rotate-[-2deg] shadow-[0_0_24px_rgba(0,255,133,0.4)]">
            <span>◆</span>
            <span>FEATURES / WHY ALPACA</span>
          </div>
          <h2 className="text-white text-3xl md:text-5xl font-black mb-4 leading-tight tracking-tight">
            ALPACAの
            <br className="md:hidden" />
            <span className="relative inline-block">
              <span className="relative z-10 text-black">3つの強み</span>
              <span className="absolute inset-x-0 bottom-1 h-full bg-[#FF2E88] -z-0 rotate-[-1deg]" style={{ boxShadow: "0 0 32px rgba(255,46,136,0.6)" }} />
            </span>
          </h2>
          <p className="text-white/70 text-sm md:text-base">
            島内に拠点を持つからこそ実現できる、<span className="text-[#00FF85] font-bold">顔の見えるWeb制作</span>。
          </p>
        </div>

        {/* 3カード */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="group relative bg-[#141414] border border-white/10 rounded-2xl p-6 md:p-7 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transitionDelay: `${150 + i * 100}ms`,
                boxShadow: `0 0 0 rgba(0,0,0,0)`,
              }}
            >
              {/* ホバー時のネオン枠 */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  boxShadow: `inset 0 0 0 2px ${feature.color}, 0 0 32px ${feature.color}55`,
                }}
              />
              {/* タグ */}
              <span
                className="absolute top-4 right-4 text-[9px] font-black tracking-[0.2em] px-2 py-0.5 rounded-sm rotate-[3deg]"
                style={{ background: feature.color, color: "#0A0A0A" }}
              >
                {feature.tag}
              </span>

              {/* 番号 */}
              <div className="text-[48px] font-black leading-none mb-2 font-display" style={{ color: feature.color, textShadow: `0 0 18px ${feature.color}55` }}>
                0{i + 1}
              </div>

              {/* アイコン */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300"
                style={{
                  background: `${feature.color}22`,
                  color: feature.color,
                  boxShadow: `inset 0 0 0 1px ${feature.color}55`,
                }}
              >
                {feature.icon}
              </div>

              <h3 className="text-white text-lg md:text-xl font-black mb-2">
                {feature.title}
              </h3>
              <p className="text-white/65 text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* ホバー時のアクセントバー */}
              <div
                className="h-[3px] w-0 group-hover:w-12 rounded-full mt-5 transition-all duration-500"
                style={{ background: feature.color, boxShadow: `0 0 12px ${feature.color}` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
