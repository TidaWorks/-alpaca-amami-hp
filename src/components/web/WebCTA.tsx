"use client";

import { useEffect, useRef, useState } from "react";

export default function WebCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="bg-[#FFFBF5] py-20 md:py-28 px-6">
      <div className="max-w-3xl mx-auto text-center">
        {/* ラベル */}
        <p
          className="text-[#F5A623] text-[11px] font-semibold tracking-[0.3em] uppercase mb-5 font-display transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
          }}
        >
          CONTACT
        </p>

        {/* 見出し */}
        <h2
          className="text-[#2D2418] text-2xl md:text-3xl font-bold mb-3 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transitionDelay: "80ms",
          }}
        >
          まずは気軽にご相談ください
        </h2>
        <p
          className="text-[#8A7D6B] text-sm md:text-base mb-12 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transitionDelay: "150ms",
          }}
        >
          奄美島内なら直接お伺いします。オンラインも対応可能です。
        </p>

        {/* 連絡先カード */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {/* 電話 */}
          <a
            href="tel:08027906757"
            className="group bg-white border border-[#EDE8E0] hover:border-[#F5A623]/50 rounded-2xl p-6 flex flex-col items-center gap-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(245,166,35,0.12)]"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s, transform 0.7s",
              transitionDelay: "250ms",
            }}
          >
            <div className="w-10 h-10 rounded-xl bg-[#FFF3E0] flex items-center justify-center text-[#F5A623] mb-1">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
            </div>
            <span className="text-[#2D2418] font-bold text-sm">電話相談</span>
            <span className="text-[#2D2418] font-bold text-base tracking-wide">080-2790-6757</span>
            <span className="text-[#B0A898] text-xs">平日 9:00 - 18:00</span>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/alpaca_amami"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white border border-[#EDE8E0] hover:border-[#F5A623]/50 rounded-2xl p-6 flex flex-col items-center gap-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(245,166,35,0.12)]"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s, transform 0.7s",
              transitionDelay: "370ms",
            }}
          >
            <div className="w-10 h-10 rounded-xl bg-[#FFF3E0] flex items-center justify-center text-[#F5A623] mb-1">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </div>
            <span className="text-[#2D2418] font-bold text-sm">Instagram DM</span>
            <span className="text-[#2D2418] font-semibold text-base">@alpaca_amami</span>
            <span className="text-[#B0A898] text-xs">DMでお気軽に</span>
          </a>

          {/* メール */}
          <a
            href="mailto:alpaca.amami@gmail.com"
            className="group bg-white border border-[#EDE8E0] hover:border-[#F5A623]/50 rounded-2xl p-6 flex flex-col items-center gap-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(245,166,35,0.12)]"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s, transform 0.7s",
              transitionDelay: "490ms",
            }}
          >
            <div className="w-10 h-10 rounded-xl bg-[#FFF3E0] flex items-center justify-center text-[#F5A623] mb-1">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <span className="text-[#2D2418] font-bold text-sm">メール</span>
            <span className="text-[#2D2418] font-medium text-sm break-all">alpaca.amami@gmail.com</span>
            <span className="text-[#B0A898] text-xs">24時間受付</span>
          </a>
        </div>

        {/* フッター */}
        <div className="border-t border-[#EDE8E0] pt-8">
          <p className="text-[#2D2418] font-bold text-lg tracking-widest mb-2 font-display">
            ALPACA
          </p>
          <p className="text-[#8A7D6B] text-sm mb-4">
            奄美大島を拠点に、島の事業者さまのWeb制作を承ります。
          </p>
          <p className="text-[#C4BEB5] text-xs">
            &copy; 2026 ALPACA. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
