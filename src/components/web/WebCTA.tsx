"use client";

import { useEffect, useRef, useState } from "react";
import { TextAnimate } from "@/components/ui/text-animate";
import { ShimmerButton } from "@/components/ui/shimmer-button";

function HibiscusIcon({ size, opacity }: { size: number; opacity: number | string }) {
  return (
    <svg
      className="absolute pointer-events-none"
      style={{ zIndex: 2, opacity }}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
    >
      <ellipse cx="32" cy="18" rx="10" ry="16" fill="#F5A623" transform="rotate(0 32 32)" />
      <ellipse cx="32" cy="18" rx="10" ry="16" fill="#F5A623" transform="rotate(72 32 32)" />
      <ellipse cx="32" cy="18" rx="10" ry="16" fill="#F5A623" transform="rotate(144 32 32)" />
      <ellipse cx="32" cy="18" rx="10" ry="16" fill="#F5A623" transform="rotate(216 32 32)" />
      <ellipse cx="32" cy="18" rx="10" ry="16" fill="#F5A623" transform="rotate(288 32 32)" />
      <circle cx="32" cy="32" r="6" fill="#fff" />
    </svg>
  );
}

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: 3 + (i % 5) * 2,
  x: (i * 17 + 11) % 97,
  y: (i * 23 + 7) % 88,
  delay: (i * 0.4) % 4,
  duration: 5 + (i % 4) * 2,
}));

export default function WebCTA() {
  const bgRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (!bgRef.current || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrolled = -rect.top;
      bgRef.current.style.transform = `scale(${1.0 + scrolled * 0.0002}) translateY(${scrolled * 0.3}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Trigger animations only when section enters viewport
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
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden"
    >
      {/* Wave transition from previous section (WebPricing = light background) */}
      <div className="absolute top-0 left-0 w-full z-10 leading-none pointer-events-none">
        <svg viewBox="0 0 1440 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0,36 C240,72 480,0 720,36 C960,72 1200,0 1440,36 L1440,0 L0,0 Z"
            fill="#0A0A0A"
          />
        </svg>
      </div>

      {/* Background image with ken-burns */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={bgRef}
          className="absolute inset-0 w-full h-full will-change-transform"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: "scale(1.0) translateY(0px)",
          }}
        />
        {/* Gradient overlay — heavier at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Bokeh particles */}
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: `radial-gradient(circle, rgba(255,210,100,0.55) 0%, transparent 70%)`,
            filter: "blur(2px)",
            animation: `bokehFloat ${p.duration}s ${p.delay}s ease-in-out infinite alternate`,
            zIndex: 2,
          }}
        />
      ))}

      {/* Floating hibiscus SVGs */}
      <div className="absolute left-8 bottom-32">
        <HibiscusIcon size={64} opacity={0.1} />
      </div>
      <div className="absolute right-12 top-24">
        <HibiscusIcon size={44} opacity={0.08} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-20 text-center">

        {/* Label */}
        <p
          className="text-[#F5A623] text-xs font-semibold tracking-[0.35em] uppercase mb-6"
          style={{ fontFamily: "'Outfit', sans-serif", animationDelay: "0.1s" }}
        >
          ALPACA
        </p>

        {/* Main heading — word-reveal via CSS, triggered by IntersectionObserver */}
        <TextAnimate
          as="h2"
          animation="blurInUp"
          by="character"
          once
          delay={0.2}
          duration={0.8}
          className="text-white text-4xl md:text-6xl font-bold leading-tight mb-6 drop-shadow-lg"
        >
          島のお店に、もっと光を。
        </TextAnimate>

        <p className="text-white/80 text-base md:text-lg leading-relaxed mb-14 max-w-xl mx-auto drop-shadow">
          「こんなホームページが欲しいな」そう思ったら、気軽にご相談ください。
          <br className="hidden sm:block" />
          奄美島内なら直接お伺いします。
        </p>

        {/* Contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
          {/* Phone — primary card with shimmer */}
          <ShimmerButton
            shimmerColor="#ffffff"
            shimmerSize="0.05em"
            shimmerDuration="3s"
            borderRadius="16px"
            background="rgba(245, 166, 35, 0.9)"
            aria-label="080-2790-6757に電話する"
            className={`w-full p-6 flex flex-col items-center gap-2 shadow-lg ${visible ? "animate-cardReveal" : "opacity-0"}`}
            style={{ animationDelay: "0.3s" } as React.CSSProperties}
            onClick={() => window.location.href = "tel:08027906757"}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
            <span className="font-bold text-sm text-black">電話相談</span>
            <span className="font-bold text-lg tracking-wide leading-tight text-black">080-2790-6757</span>
            <span className="text-xs text-black/70">平日 9:00 - 18:00</span>
          </ShimmerButton>

          {/* Instagram */}
          <a
            href="https://instagram.com/alpaca_amami"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram DMで相談"
            className={`group bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white rounded-2xl p-6 flex flex-col items-center gap-2 shadow-md transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm ${visible ? "animate-cardReveal" : "opacity-0"}`}
            style={{ animationDelay: "0.5s" }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
            </svg>
            <span className="font-bold text-sm">Instagram DM</span>
            <span className="font-semibold text-base tracking-wide">@alpaca_amami</span>
            <span className="text-xs text-white/50">DMでお気軽に</span>
          </a>

          {/* Mail */}
          <a
            href="mailto:alpaca.amami@gmail.com"
            aria-label="メールで相談"
            className={`group bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white rounded-2xl p-6 flex flex-col items-center gap-2 shadow-md transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm ${visible ? "animate-cardReveal" : "opacity-0"}`}
            style={{ animationDelay: "0.7s" }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <span className="font-bold text-sm">メール</span>
            <span className="font-medium text-sm break-all">alpaca.amami@gmail.com</span>
            <span className="text-xs text-white/50">24時間受付</span>
          </a>
        </div>

        {/* Footer identity */}
        <div className="border-t border-white/10 pt-10">
          <p className="text-white font-bold text-xl tracking-widest mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
            ALPACA（アルパカ）
          </p>
          <p className="text-white/50 text-sm mb-6">
            奄美大島を拠点に、島の事業者さまのWeb制作を承ります。
          </p>
          <p className="text-white/30 text-xs">
            &copy; 2026 ALPACA. All rights reserved.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes bokehFloat {
          from { opacity: 0.3; transform: translateY(0px) scale(1); }
          to   { opacity: 0.7; transform: translateY(-18px) scale(1.2); }
        }
        @keyframes cardReveal {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-cardReveal {
          animation: cardReveal 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>
    </section>
  );
}
