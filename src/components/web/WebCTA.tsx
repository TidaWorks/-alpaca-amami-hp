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

  const contacts = [
    {
      type: "tel",
      href: "tel:08027906757",
      color: "#FF2E88",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
        </svg>
      ),
      label: "TEL",
      title: "電話で相談",
      body: "080-2790-6757",
      hint: "平日 9:00 - 18:00",
      delay: "250ms",
    },
    {
      type: "dm",
      href: "https://instagram.com/alpaca_amami",
      color: "#FFE500",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      ),
      label: "DM",
      title: "Instagram DM",
      body: "@alpaca_amami",
      hint: "DMでお気軽に",
      delay: "370ms",
    },
    {
      type: "mail",
      href: "mailto:alpaca.amami@gmail.com",
      color: "#00FF85",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      label: "MAIL",
      title: "メールで相談",
      body: "alpaca.amami@gmail.com",
      hint: "24時間受付",
      delay: "490ms",
    },
  ];

  return (
    <section ref={sectionRef} id="contact" className="relative bg-[#0A0A0A] py-20 md:py-28 px-6 scroll-mt-20 overflow-hidden">
      {/* ドット背景 */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        aria-hidden="true"
        style={{ backgroundImage: "radial-gradient(circle, #FFFFFF 1px, transparent 1px)", backgroundSize: "32px 32px" }}
      />
      {/* ダブルグロー */}
      <div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
        style={{ background: "rgba(255,46,136,0.2)" }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
        style={{ background: "rgba(0,255,133,0.15)" }}
      />

      <div className="relative max-w-3xl mx-auto text-center">
        {/* マスコット */}
        <img
          src="/images/alpaca/alpaca-love.png"
          alt="ハートに囲まれた嬉しそうなアルパカ"
          aria-hidden="true"
          className="w-32 md:w-40 mx-auto mb-5 pointer-events-none select-none transition-all duration-700 drop-shadow-[0_0_30px_rgba(255,46,136,0.4)]"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
          }}
        />

        {/* ラベル */}
        <div
          className="inline-flex items-center gap-2 mb-6 bg-[#FF2E88] text-white text-[10px] font-black tracking-[0.3em] px-3 py-1.5 rounded-sm rotate-[-2deg] shadow-[0_0_24px_rgba(255,46,136,0.5)] transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0) rotate(-2deg)" : "translateY(12px) rotate(-2deg)",
          }}
        >
          <span>✉</span>
          <span>CONTACT / FREE</span>
        </div>

        {/* 見出し */}
        <h2
          className="text-white text-3xl md:text-5xl font-black mb-4 leading-tight tracking-tight transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transitionDelay: "80ms",
          }}
        >
          まずは
          <span className="relative inline-block mx-1">
            <span className="relative z-10 text-black">気軽に</span>
            <span className="absolute inset-x-0 bottom-1 h-full bg-[#FFE500] -z-0 rotate-[-1deg]" style={{ boxShadow: "0 0 32px rgba(255,229,0,0.6)" }} />
          </span>
          <br className="md:hidden" />
          ご相談ください
        </h2>
        <p
          className="text-white/70 text-sm md:text-base mb-12 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transitionDelay: "150ms",
          }}
        >
          奄美島内なら直接お伺いします。<span className="text-[#00FF85] font-bold">オンライン</span>も対応可能です。
        </p>

        {/* 連絡先カード */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {contacts.map((c) => (
            <a
              key={c.type}
              href={c.href}
              target={c.type === "dm" ? "_blank" : undefined}
              rel={c.type === "dm" ? "noopener noreferrer" : undefined}
              className="group relative bg-[#141414] border border-white/10 rounded-2xl p-6 flex flex-col items-center gap-2 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.7s, transform 0.7s",
                transitionDelay: c.delay,
              }}
            >
              {/* ホバー時のネオン枠 */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ boxShadow: `inset 0 0 0 2px ${c.color}, 0 0 32px ${c.color}55` }}
              />
              {/* タグ */}
              <span
                className="absolute top-3 right-3 text-[9px] font-black tracking-[0.2em] px-2 py-0.5 rounded-sm rotate-[3deg]"
                style={{ background: c.color, color: "#0A0A0A" }}
              >
                {c.label}
              </span>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-1"
                style={{
                  background: `${c.color}22`,
                  color: c.color,
                  boxShadow: `inset 0 0 0 1px ${c.color}55`,
                }}
              >
                {c.icon}
              </div>
              <span className="text-white font-black text-sm mt-1">{c.title}</span>
              <span className="text-white font-semibold text-sm break-all">{c.body}</span>
              <span className="text-white/50 text-xs">{c.hint}</span>
            </a>
          ))}
        </div>

        {/* フッター */}
        <div className="border-t border-white/10 pt-8">
          <p className="flex items-center justify-center gap-2 text-white font-black text-xl tracking-[0.3em] mb-2 font-display">
            <span>ALPACA</span>
            <span className="text-[#00FF85] text-[10px] tracking-[0.3em]" style={{ textShadow: "0 0 8px rgba(0,255,133,0.6)" }}>WEB</span>
          </p>
          <p className="text-white/60 text-sm mb-4">
            奄美大島を拠点に、島の事業者さまのWeb制作を承ります。
          </p>
          <p className="text-white/30 text-xs">
            &copy; 2026 ALPACA. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
