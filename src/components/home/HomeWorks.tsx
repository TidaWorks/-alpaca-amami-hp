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
          <p className="text-xs font-bold tracking-[0.3em] text-[#635BFF] mb-3">WORKS</p>
          <h2 className="text-[#1A202C] text-3xl md:text-5xl font-extrabold leading-tight mb-3">
            私たちが手がけた、
            <br className="md:hidden" />
            <span className="text-[#12C998]">プロジェクト</span>
            。
          </h2>
          <p className="text-[#1A202C]/70 text-sm md:text-base">
            奄美大島の事業者さま向けに制作したサイトをご紹介します。
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {works.map((work, i) => (
            <a
              key={work.name}
              href={work.href}
              className="group bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transitionDelay: `${150 + i * 80}ms`,
              }}
            >
              <div className="relative aspect-[4/3] bg-[#F8FAFC] overflow-hidden">
                <img
                  src={work.image}
                  alt={work.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span
                  className="absolute top-3 left-3 text-[10px] font-black tracking-widest text-white rounded px-2 py-1"
                  style={{ background: work.color }}
                >
                  {work.type}
                </span>
              </div>
              <div className="p-4 md:p-5">
                <p className="text-[10px] font-bold tracking-widest text-[#1A202C]/55 mb-1">
                  {work.category}
                </p>
                <h3 className="text-[#1A202C] text-base font-extrabold mb-2 group-hover:text-[#635BFF] transition-colors">
                  {work.name}
                </h3>
                <span className="inline-flex items-center gap-1 text-xs font-black text-[#635BFF]">
                  デモを見る
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform">
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
            href="/web#works"
            className="inline-flex items-center gap-2 text-sm font-black text-[#1A202C] underline decoration-[#12C998] decoration-[2px] underline-offset-[6px] hover:decoration-[#635BFF] transition-colors"
          >
            すべての実績を見る（9業種公開中） →
          </a>
        </div>
      </div>
    </section>
  );
}
