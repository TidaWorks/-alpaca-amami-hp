"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
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
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: "納品後も安心サポート",
    description: "公開してからが本番。テキスト・画像の修正、サーバー管理まで月額で対応。",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
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
    <section ref={sectionRef} className="bg-white py-20 md:py-28 px-6">
      <div className="max-w-4xl mx-auto">
        {/* 見出し */}
        <div
          className="mb-12 md:mb-16 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <p className="text-[#F5A623] text-[11px] font-semibold tracking-[0.3em] uppercase mb-4 font-display">
            FEATURES
          </p>
          <h2 className="text-[#2D2418] text-2xl md:text-3xl font-bold mb-3">
            ALPACAの3つの強み
          </h2>
          <p className="text-[#8A7D6B] text-sm">
            島内に拠点を持つからこそ実現できる、顔の見えるWeb制作。
          </p>
        </div>

        {/* 3カード */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="group bg-[#FFFBF5] border border-[#EDE8E0] rounded-2xl p-6 md:p-7 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_12px_32px_rgba(245,166,35,0.1),0_4px_12px_rgba(0,0,0,0.04)] hover:border-[#F5A623]/30"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transitionDelay: `${150 + i * 100}ms`,
              }}
            >
              {/* アイコン */}
              <div className="w-12 h-12 rounded-xl bg-[#FFF3E0] flex items-center justify-center text-[#F5A623] mb-5 group-hover:bg-[#F5A623] group-hover:text-white transition-colors duration-300">
                {feature.icon}
              </div>

              <h3 className="text-[#2D2418] text-lg font-bold mb-2">
                {feature.title}
              </h3>
              <p className="text-[#8A7D6B] text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* ホバー時に現れるアクセントバー */}
              <div className="h-[2px] w-0 group-hover:w-10 bg-[#F5A623] rounded-full mt-5 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
