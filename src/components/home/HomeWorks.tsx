"use client";

import { useEffect, useRef, useState } from "react";

const works = [
  {
    name: "Hair Salon kukuru",
    category: "美容室",
    type: "ホームページ",
    href: "/demo/salon",
    image: "/images/demo-screenshots/salon.png",
    color: "#FF6B9E",
  },
  {
    name: "Bistro ADAN",
    category: "ビストロ",
    type: "ホームページ",
    href: "/demo/restaurant",
    image: "/images/demo-screenshots/restaurant.png",
    color: "#E63946",
  },
  {
    name: "BLUE AMAMI",
    category: "ダイビングショップ",
    type: "ホームページ",
    href: "/demo/diving",
    image: "/images/demo-screenshots/diving.png",
    color: "#1D9BF0",
  },
  {
    name: "AMAMI FOREST CAMP",
    category: "キャンプ場",
    type: "ホームページ",
    href: "/demo/camp",
    image: "/images/demo-screenshots/camp.png",
    color: "#3FA34D",
  },
];

export default function HomeWorks() {
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
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="works"
      className="relative bg-[#F8FAFC] py-20 md:py-28 px-6 scroll-mt-20 overflow-hidden border-t border-[#E5E7EB]"
    >
      <div className="relative max-w-6xl mx-auto">
        <div
          className="mb-14 md:mb-16 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <p className="text-xs font-bold tracking-[0.3em] text-[#635BFF] mb-3">DEMO</p>
          <h2 className="text-[#1A202C] text-3xl md:text-5xl font-extrabold leading-tight mb-3">
            公開中の
            <br className="md:hidden" />
            <span className="text-[#12C998]">デモサイト</span>
            。
          </h2>
          <p className="text-[#1A202C]/70 text-sm md:text-base">
            奄美大島の業種ごとに、ALPACAで作るホームページのサンプルを公開しています。
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {works.map((work, i) => (
            <a
              key={work.name}
              href={work.href}
              className="group relative bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:border-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#635BFF]"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.7s ease ${150 + i * 80}ms, transform 0.5s ease ${150 + i * 80}ms, box-shadow 0.4s ease, border-color 0.3s ease, translate 0.3s ease`,
              }}
            >
              {/* 上端アクセントライン */}
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 z-10"
                style={{ background: work.color }}
              />
              <div className="relative aspect-[4/3] bg-[#F8FAFC] overflow-hidden">
                <img
                  src={work.image}
                  alt={work.name}
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                {/* ホバー時の色オーバーレイ */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-500"
                  style={{ background: work.color }}
                />
                {/* ホバー時の暗グラデーション（VIEW DEMOテキスト視認性） */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                {/* VIEW DEMO バッジ */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <span
                    className="inline-flex items-center gap-2 bg-white text-[#1A202C] font-black text-[11px] tracking-widest px-4 py-2.5 rounded-full shadow-2xl scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-400 ease-out"
                    style={{ borderTop: `3px solid ${work.color}` }}
                  >
                    VIEW DEMO
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </span>
              </div>
              <div className="p-4 md:p-5">
                <p className="text-[10px] font-bold tracking-widest text-[#1A202C]/55 mb-1">
                  {work.category}
                </p>
                <h3
                  className="text-[#1A202C] text-base font-extrabold mb-2 transition-colors duration-300"
                  style={{ color: undefined }}
                >
                  <span className="group-hover:hidden">{work.name}</span>
                  <span className="hidden group-hover:inline" style={{ color: work.color }}>{work.name}</span>
                </h3>
                <span
                  className="inline-flex items-center gap-1 text-xs font-black"
                  style={{ color: work.color }}
                >
                  デモを見る
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-200">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>

        <div
          className="mt-10 text-center transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transitionDelay: "550ms",
          }}
        >
          <a
            href="/web"
            className="group inline-flex items-center gap-2 text-sm font-black text-[#1A202C] underline decoration-[#12C998] decoration-[2px] underline-offset-[6px] hover:decoration-[#635BFF] hover:underline-offset-[8px] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#635BFF] focus-visible:ring-offset-2 rounded-sm"
          >
            すべての実績を見る（9業種公開中）<span className="inline-block group-hover:translate-x-1 transition-transform duration-200">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
