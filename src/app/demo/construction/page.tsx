"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useReveal } from "../hooks/useReveal";

// --- Animated construction crane SVG ---
function CraneWatermark() {
  const [angle, setAngle] = useState(0);
  useEffect(() => {
    let frame: number;
    let start: number | null = null;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      // Slow pendulum: ±18deg over 5s
      setAngle(Math.sin((elapsed / 5000) * Math.PI * 2) * 18);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      className="absolute bottom-0 right-0 pointer-events-none select-none"
      style={{ width: 160, height: 220, opacity: 0.07 }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 160 220" width="160" height="220" fill="none">
        {/* Vertical mast */}
        <rect x="72" y="40" width="10" height="175" fill="white" rx="2" />
        {/* Counter-jib (left) */}
        <rect x="20" y="44" width="52" height="7" fill="white" rx="2" />
        {/* Main jib (right) */}
        <rect x="82" y="44" width="68" height="7" fill="white" rx="2" />
        {/* Cab box */}
        <rect x="64" y="32" width="26" height="18" fill="white" rx="3" />
        {/* Counterweight */}
        <rect x="16" y="51" width="20" height="12" fill="white" rx="2" />
        {/* Pendant cable from jib tip — rotates */}
        <g
          style={{
            transformOrigin: "144px 47px",
            transform: `rotate(${angle}deg)`,
            transition: "transform 0.05s linear",
          }}
        >
          <line x1="144" y1="47" x2="144" y2="110" stroke="white" strokeWidth="2" />
          {/* Hook block */}
          <rect x="137" y="110" width="14" height="10" fill="white" rx="2" />
          {/* Hook */}
          <path d="M144 120 Q152 128 144 134 Q138 134 138 128" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
        {/* Base / undercarriage */}
        <rect x="54" y="210" width="46" height="8" fill="white" rx="2" />
        <line x1="60" y1="215" x2="40" y2="215" stroke="white" strokeWidth="3" strokeLinecap="round" />
        <line x1="94" y1="215" x2="114" y2="215" stroke="white" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// --- Blueprint draw-number hook (supports up to 4 stats) ---
function useBlueprintDraw(count: number = 1) {
  // Refs are declared unconditionally to satisfy Rules of Hooks.
  // count must be a compile-time constant (1–4) at each call site.
  const ref0 = useRef<HTMLDivElement>(null);
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);
  const allRefs = [ref0, ref1, ref2, ref3];
  const refs = allRefs.slice(0, count);

  const [drawn, setDrawn] = useState<boolean[]>(Array(count).fill(false));

  useEffect(() => {
    const observers = refs.map((ref, i) => {
      const el = ref.current;
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setDrawn((prev) => {
              if (prev[i]) return prev;
              const next = [...prev];
              next[i] = true;
              return next;
            });
            observer.disconnect();
          }
        },
        { threshold: 0.05, rootMargin: "50px 0px" }
      );
      observer.observe(el);
      return observer;
    });
    // フォールバック: 2秒後に全stat強制表示
    const timer = setTimeout(() => {
      setDrawn((prev) => prev.map(() => true));
    }, 2000);

    return () => {
      observers.forEach((obs) => obs?.disconnect());
      clearTimeout(timer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps -- mount-only: refs are stable
  }, []);

  return refs.map((wrapperRef, i) => ({ wrapperRef, drawn: drawn[i] }));
}

// --- Individual work-card for staggered layout ---
function WorkCard({
  src,
  alt,
  badge,
  title,
  date,
  desc,
  delay,
  size,
}: {
  src: string;
  alt: string;
  badge: string;
  title: string;
  date: string;
  desc: string;
  delay: number;
  size?: "large" | "small" | "medium";
}) {
  const { ref, visible } = useReveal();
  const aspectClass = size === "large" ? "aspect-[4/3]" : size === "small" ? "aspect-square" : "aspect-[3/4]";
  return (
    <div
      ref={ref}
      className="group cursor-pointer"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) rotate(0deg)" : "translateY(32px) rotate(1deg)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      <div className={`${aspectClass} rounded-sm mb-3 overflow-visible relative work-card-inner`}>
        {/* SVG construction document pin — top center */}
        <div className="card-pin">
          <svg width="20" height="28" viewBox="0 0 20 28" fill="none" aria-hidden="true">
            <circle cx="10" cy="8" r="8" fill="#1E3A5F" stroke="#3B82F6" strokeWidth="1.5" />
            <circle cx="10" cy="8" r="4" fill="#3B82F6" opacity="0.85" />
            <circle cx="8" cy="6" r="1.5" fill="white" opacity="0.5" />
            <line x1="10" y1="16" x2="10" y2="28" stroke="#1E3A5F" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
        {/* SVG tape strips — corners */}
        <div className="card-pin-left">
          <svg width="36" height="14" viewBox="0 0 36 14" fill="none" aria-hidden="true">
            <rect x="0" y="0" width="36" height="14" rx="2" fill="rgba(59,130,246,0.35)" stroke="rgba(59,130,246,0.55)" strokeWidth="0.75" />
            <line x1="9" y1="0" x2="9" y2="14" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
            <line x1="18" y1="0" x2="18" y2="14" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
            <line x1="27" y1="0" x2="27" y2="14" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
          </svg>
        </div>
        <div className="card-pin-right">
          <svg width="36" height="14" viewBox="0 0 36 14" fill="none" aria-hidden="true">
            <rect x="0" y="0" width="36" height="14" rx="2" fill="rgba(59,130,246,0.35)" stroke="rgba(59,130,246,0.55)" strokeWidth="0.75" />
            <line x1="9" y1="0" x2="9" y2="14" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
            <line x1="18" y1="0" x2="18" y2="14" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
            <line x1="27" y1="0" x2="27" y2="14" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
          </svg>
        </div>
        <div className="rounded-sm overflow-hidden w-full h-full">
          <Image
            src={src}
            alt={alt}
            width={800}
            height={600}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
            style={{
              clipPath: visible ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" : "polygon(0 0, 0 0, 0 100%, 0 100%)",
              transition: `clip-path 0.9s cubic-bezier(0.4,0,0.2,1) ${delay + 100}ms`,
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <span className="inline-block bg-[#3B82F6] text-white text-xs px-2 py-0.5 rounded-sm font-sans-jp tracking-wide">
              {badge}
            </span>
          </div>
        </div>
      </div>
      <h3 className="text-sm font-bold mb-0.5 group-hover:text-[#3B82F6] transition font-serif-jp leading-snug">
        {title}
      </h3>
      <p className="text-xs text-slate-400 mb-1 font-sans-jp">{date}</p>
      <p className="text-slate-500 text-xs leading-relaxed font-sans-jp line-clamp-3">{desc}</p>
    </div>
  );
}

// --- Full-width alternating service block ---
function ServiceBlock({
  src,
  alt,
  icon,
  title,
  desc,
  index,
}: {
  src: string;
  alt: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  index: number;
}) {
  const { ref, visible } = useReveal();
  const isEven = index % 2 === 0; // even index (0,2) = photo left; odd index (1,3) = photo right

  return (
    <div
      ref={ref}
      className="relative flex flex-col md:flex-row overflow-hidden"
      style={{ minHeight: "420px" }}
    >
      {/* Photo side */}
      <div
        className={`relative w-full md:w-[60%] ${isEven ? "md:order-1" : "md:order-2"} flex-shrink-0`}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible
            ? "translateX(0)"
            : isEven
            ? "translateX(-60px)"
            : "translateX(60px)",
          transition: "opacity 0.8s ease 0.1s, transform 0.8s cubic-bezier(0.4,0,0.2,1) 0.1s",
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={800}
          height={600}
          className="w-full h-full object-cover"
          style={{
            minHeight: "320px",
            clipPath: isEven
              ? "polygon(0 0, 96% 0, 100% 100%, 0 100%)"
              : "polygon(4% 0, 100% 0, 100% 100%, 0 100%)",
          }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-r"
          style={{
            background: isEven
              ? "linear-gradient(to right, transparent 70%, rgba(248,250,252,0.95) 100%)"
              : "linear-gradient(to left, transparent 70%, rgba(248,250,252,0.95) 100%)",
          }}
        />
      </div>

      {/* Text side */}
      <div
        className={`relative w-full md:w-[40%] flex items-center ${isEven ? "md:order-2" : "md:order-1"} bg-[#F8FAFC] z-10`}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible
            ? "translateX(0)"
            : isEven
            ? "translateX(40px)"
            : "translateX(-40px)",
          transition: "opacity 0.8s ease 0.25s, transform 0.8s cubic-bezier(0.4,0,0.2,1) 0.25s",
        }}
      >
        <div className={`px-8 md:px-12 py-10 ${isEven ? "md:-ml-8" : "md:-mr-8"}`}>
          <h3 className="text-2xl font-bold mb-4 font-serif-jp text-[#1E293B]">{title}</h3>
          <p className="text-slate-600 leading-relaxed font-sans-jp text-sm">{desc}</p>
        </div>
      </div>
    </div>
  );
}

// --- Flow step with alternating slide-in ---
function FlowStep({
  step,
  title,
  desc,
  fromLeft,
}: {
  step: number;
  title: string;
  desc: string;
  fromLeft: boolean;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className="relative bg-white rounded-lg border border-slate-200 p-6"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateX(0)"
          : fromLeft
          ? "translateX(-48px)"
          : "translateX(48px)",
        transition: `opacity 0.6s ease ${step * 80}ms, transform 0.6s ease ${step * 80}ms`,
      }}
    >
      <div className="w-10 h-10 bg-[#3B82F6] rounded-full flex items-center justify-center mb-4">
        <span className="text-white text-base font-bold font-sans-jp">{step}</span>
      </div>
      <h4 className="font-bold text-base mb-2 font-serif-jp">{title}</h4>
      <p className="text-slate-600 text-sm leading-relaxed font-sans-jp">{desc}</p>
      {step < 6 && (
        <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      )}
    </div>
  );
}

// --- Construction-themed section heading with ruler ornament ---
function SectionHeading({
  label,
  title,
  light = false,
}: {
  label: string;
  title: string;
  light?: boolean;
}) {
  const labelColor = "#3B82F6";
  const titleColor = light ? "#ffffff" : "#1E293B";
  const mutedColor = light ? "rgba(147,197,253,0.7)" : "rgba(59,130,246,0.5)";

  return (
    <div className="text-center mb-14">
      <p
        className="text-sm font-medium tracking-widest uppercase mb-2 font-sans-jp"
        style={{ color: labelColor }}
      >
        {label}
      </p>
      <h2
        className="text-3xl font-bold font-serif-jp mb-4"
        style={{ color: titleColor }}
      >
        {title}
      </h2>
      {/* Ruler ornament */}
      <div className="flex items-center justify-center gap-0 select-none" aria-hidden="true">
        {/* Left ruler ticks */}
        <svg width="80" height="18" viewBox="0 0 80 18" fill="none">
          {[0,10,20,30,40,50,60,70,80].map((x) => (
            <line
              key={x}
              x1={x} y1="9"
              x2={x} y2={x % 20 === 0 ? "2" : "5"}
              stroke={mutedColor}
              strokeWidth={x % 20 === 0 ? 1.5 : 1}
            />
          ))}
          <line x1="0" y1="9" x2="80" y2="9" stroke={mutedColor} strokeWidth="1" />
        </svg>

        {/* Center tool icon — wrench */}
        <div style={{ margin: "0 10px", color: labelColor, opacity: 0.85 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
          </svg>
        </div>

        {/* Right ruler ticks */}
        <svg width="80" height="18" viewBox="0 0 80 18" fill="none">
          {[0,10,20,30,40,50,60,70,80].map((x) => (
            <line
              key={x}
              x1={x} y1="9"
              x2={x} y2={x % 20 === 0 ? "2" : "5"}
              stroke={mutedColor}
              strokeWidth={x % 20 === 0 ? 1.5 : 1}
            />
          ))}
          <line x1="0" y1="9" x2="80" y2="9" stroke={mutedColor} strokeWidth="1" />
        </svg>
      </div>
    </div>
  );
}

export default function ConstructionDemoPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "",
    message: "",
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Horizontal scroll gallery
  const galleryRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [galleryX, setGalleryX] = useState(0);

  const handleScroll = useCallback(() => {
    // On mobile (< 768px) the gallery uses native touch scroll — skip JS-driven translateX
    if (typeof window !== "undefined" && window.innerWidth < 768) return;
    const section = sectionRef.current;
    const gallery = galleryRef.current;
    if (!section || !gallery) return;
    const rect = section.getBoundingClientRect();
    const windowH = window.innerHeight;
    // progress 0→1 as section travels through viewport
    const progress = Math.max(0, Math.min(1, (windowH - rect.top) / (windowH + rect.height)));
    const maxShift = gallery.scrollWidth - gallery.clientWidth;
    setGalleryX(-(progress * maxShift));
  }, []);

  useEffect(() => {
    const onScroll = () => {
      handleScroll();
      setShowCta(window.scrollY > 500);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [handleScroll]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navItems = [
    { href: "#services", label: "事業内容" },
    { href: "#works", label: "施工実績" },
    { href: "#company", label: "会社概要" },
    { href: "#contact", label: "お問い合わせ" },
  ];

  // Blueprint draw stats — single hook call returns array of 4 {wrapperRef, drawn}
  const [bpStat1, bpStat2, bpStat3, bpStat4] = useBlueprintDraw(4);

  // Section reveals for diagonal sections
  const servicesReveal = useReveal();
  const companyReveal = useReveal();

  const flowSteps = [
    { step: 1, title: "ご相談・お問い合わせ", desc: "お電話・メールにてお気軽にご連絡ください。どんな小さなことでもお気軽にどうぞ。" },
    { step: 2, title: "現地調査・ヒアリング", desc: "担当者が現地を訪問し、施工箇所の状況確認とお客様のご要望を丁寧にお伺いします。" },
    { step: 3, title: "プラン提案・お見積り", desc: "調査内容をもとに最適なプランと詳細なお見積りをご提示します。費用は明確にご説明します。" },
    { step: 4, title: "ご契約", desc: "内容・金額にご納得いただいてから契約を締結します。着工前に疑問点はすべて解消します。" },
    { step: 5, title: "着工・施工", desc: "安全管理を徹底し、スケジュールどおりに丁寧な施工を進めます。進捗はその都度ご報告します。" },
    { step: 6, title: "完了・お引渡し", desc: "完成後に立会い検査を実施。お客様の確認・承認をいただいてから正式にお引渡しします。" },
  ];

  return (
    <div className="construction-page min-h-screen bg-[#F8FAFC] text-[#1E293B]">
      <style>{`
        .font-serif-jp { font-family: var(--font-noto-serif-jp), serif; }
        .font-sans-jp { font-family: var(--font-noto-sans-jp), sans-serif; }

        /* Blueprint hero grid — tighter, more visible */
        @keyframes blueprintScroll {
          from { background-position: 0 0; }
          to { background-position: 24px 24px; }
        }
        .blueprint-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(59,130,246,0.22) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.22) 1px, transparent 1px),
            linear-gradient(rgba(59,130,246,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.07) 1px, transparent 1px);
          background-size: 120px 120px, 120px 120px, 24px 24px, 24px 24px;
          animation: blueprintScroll 3s linear infinite;
          pointer-events: none;
        }

        /* Diagonal section helpers */
        .diagonal-section-top {
          clip-path: polygon(0 4%, 100% 0, 100% 100%, 0 100%);
          margin-top: -2rem;
          padding-top: 4rem;
        }
        .diagonal-section-both {
          clip-path: polygon(0 3%, 100% 0, 100% 97%, 0 100%);
          margin-top: -2rem;
          padding-top: 4rem;
          padding-bottom: 4rem;
        }

        /* Blueprint number draw animation — faster + glow pulse */
        @keyframes drawNumber {
          from { stroke-dashoffset: 2000; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes glowPulse {
          0%   { filter: drop-shadow(0 0 0px rgba(59,130,246,0)); }
          50%  { filter: drop-shadow(0 0 12px rgba(59,130,246,0.9)); }
          100% { filter: drop-shadow(0 0 6px rgba(59,130,246,0.5)); }
        }
        .blueprint-stat-text {
          fill: none;
          stroke: white;
          stroke-width: 3;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 2000;
          stroke-dashoffset: 2000;
          paint-order: stroke fill;
        }
        .blueprint-stat-text.animate {
          animation: drawNumber 0.9s cubic-bezier(0.2,0,0.1,1) forwards,
                     glowPulse 0.8s ease 0.9s forwards;
        }
        /* Glow underlay text (behind main text) */
        .blueprint-stat-glow {
          fill: none;
          stroke: rgba(59,130,246,0.0);
          stroke-width: 8;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 2000;
          stroke-dashoffset: 2000;
          filter: blur(3px);
        }
        .blueprint-stat-glow.animate {
          animation: drawNumber 0.9s cubic-bezier(0.2,0,0.1,1) forwards,
                     glowPulse 0.8s ease 0.9s forwards;
        }

        /* Horizontal gallery scroll wrapper */
        .h-gallery-track {
          display: flex;
          gap: 1rem;
          will-change: transform;
          transition: transform 0.05s linear;
        }
        .h-gallery-item {
          flex: 0 0 260px;
          height: 260px;
          border-radius: 0.75rem;
          overflow: hidden;
        }
        /* On mobile, disable JS-driven translateX and use native touch scroll */
        @media (max-width: 767px) {
          .h-gallery-outer {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scroll-snap-type: x mandatory;
          }
          .h-gallery-track {
            will-change: auto;
            transition: none;
            transform: none !important;
          }
          .h-gallery-item {
            scroll-snap-align: start;
          }
        }
        @media (max-width: 640px) {
          .diagonal-section-top { clip-path: none; margin-top: 0; }
          .diagonal-section-both { clip-path: none; margin-top: 0; }
        }

        /* Ken Burns zoom for hero */
        @keyframes kenBurns {
          0%   { transform: scale(1.0) translate(0, 0); }
          50%  { transform: scale(1.08) translate(-1%, -1%); }
          100% { transform: scale(1.0) translate(0, 0); }
        }
        .hero-bg-img {
          animation: kenBurns 18s ease-in-out infinite;
          transform-origin: center center;
        }

        /* Noise/grain texture for dark industrial sections */
        .grain-texture {
          position: relative;
        }
        .grain-texture::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.045'/%3E%3C/svg%3E");
          background-size: 128px 128px;
          background-repeat: repeat;
          opacity: 0.55;
          mix-blend-mode: overlay;
          z-index: 1;
        }

        /* Work card hover: lift + blueprint border glow */
        .work-card-inner {
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease;
        }
        .group:hover .work-card-inner {
          transform: translateY(-6px) scale(1.01);
          box-shadow:
            0 12px 32px rgba(0,0,0,0.22),
            0 0 0 2px rgba(59,130,246,0.55),
            0 0 18px rgba(59,130,246,0.3);
        }

        /* SVG document pin */
        .card-pin {
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));
        }
        .card-pin-left {
          position: absolute;
          top: -8px;
          left: 18px;
          z-index: 10;
          transform: rotate(-8deg);
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));
        }
        .card-pin-right {
          position: absolute;
          top: -8px;
          right: 18px;
          z-index: 10;
          transform: rotate(8deg);
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));
        }
        html { scroll-behavior: smooth; }
        input:focus, textarea:focus, select:focus {
          border-color: #3B82F6 !important;
          box-shadow: 0 0 0 3px rgba(59,130,246,0.18) !important;
          outline: none !important;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        button[type="submit"] {
          transition: transform 0.2s ease, box-shadow 0.2s ease !important;
        }
        button[type="submit"]:hover { transform: scale(1.03) !important; }
        button[type="submit"]:active { transform: scale(0.98) !important; }
      `}</style>

      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1E293B] text-white shadow-lg font-sans-jp">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#3B82F6] rounded flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21h18" />
                <path d="M5 21V7l7-4 7 4v14" />
                <path d="M9 21v-6h6v6" />
              </svg>
            </div>
            <div>
              <div className="text-lg font-bold leading-tight tracking-wide">南風建設</div>
              <div className="text-xs text-slate-300">Hae Construction Co., Ltd.</div>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-sm">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-[#3B82F6] transition">
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a
              href="tel:0997-XX-XXXX"
              className="flex items-center gap-2 bg-[#3B82F6] hover:bg-blue-600 transition px-4 py-2 rounded text-sm font-medium"
              aria-label="電話する"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              <span className="hidden md:inline">0997-XX-XXXX</span>
            </a>
            {/* Hamburger button — mobile only */}
            <button
              className="sm:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 focus:outline-none"
              aria-label="メニューを開く"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className={`block w-5 h-0.5 bg-white transition-transform duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-5 h-0.5 bg-white transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-white transition-transform duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu overlay */}
        {menuOpen && (
          <div className="sm:hidden bg-[#1E293B] border-t border-slate-700 px-4 py-4 flex flex-col gap-4 text-sm">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-[#3B82F6] transition py-1"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="/web#gallery"
              className="text-slate-400 hover:text-[#3B82F6] transition py-1 border-t border-slate-700 pt-3 flex items-center gap-1 text-xs"
              onClick={() => setMenuOpen(false)}
            >
              &#8592; ギャラリーに戻る
            </a>
          </div>
        )}
      </header>

      {/* Back to Gallery */}
      <div className="hidden md:block fixed top-[52px] left-0 right-0 z-50 bg-slate-100 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-1.5">
          <a href="/web#gallery" className="text-sm text-[#3B82F6] hover:text-blue-700 transition flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
            ギャラリーに戻る
          </a>
        </div>
      </div>

      {/* ===== Hero Section ===== */}
      <section className="relative pt-[100px]">
        <div className="relative text-white">
          <Image
            src="/images/demo/construction/hero.jpg"
            alt="建設現場の様子"
            width={1200}
            height={800}
            priority
            className="absolute inset-0 w-full h-full object-cover hero-bg-img"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-[#1E293B]/80" />
          {/* Blueprint animated grid */}
          <div className="blueprint-overlay" />

          {/* Compass rose — bottom right corner of hero */}
          <div className="absolute bottom-16 right-6 md:right-12 pointer-events-none select-none" style={{ opacity: 0.45 }} aria-hidden="true">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              {/* Outer circle */}
              <circle cx="40" cy="40" r="36" stroke="rgba(59,130,246,0.7)" strokeWidth="1.5" strokeDasharray="4 3" />
              <circle cx="40" cy="40" r="28" stroke="rgba(59,130,246,0.4)" strokeWidth="1" />
              {/* Cardinal arrows */}
              <polygon points="40,6 44,30 40,26 36,30" fill="white" opacity="0.9" />
              <polygon points="40,74 44,50 40,54 36,50" fill="rgba(59,130,246,0.6)" opacity="0.7" />
              <polygon points="6,40 30,44 26,40 30,36" fill="rgba(59,130,246,0.6)" opacity="0.7" />
              <polygon points="74,40 50,44 54,40 50,36" fill="rgba(59,130,246,0.6)" opacity="0.7" />
              {/* Center dot */}
              <circle cx="40" cy="40" r="3" fill="white" opacity="0.9" />
              {/* N label */}
              <text x="40" y="3" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="sans-serif" opacity="0.9">N</text>
              {/* Tick marks */}
              {[0,45,90,135,180,225,270,315].map((deg) => (
                <line
                  key={deg}
                  x1={40 + 27 * Math.sin((deg * Math.PI) / 180)}
                  y1={40 - 27 * Math.cos((deg * Math.PI) / 180)}
                  x2={40 + 32 * Math.sin((deg * Math.PI) / 180)}
                  y2={40 - 32 * Math.cos((deg * Math.PI) / 180)}
                  stroke="rgba(59,130,246,0.7)"
                  strokeWidth="1.5"
                />
              ))}
            </svg>
          </div>

          {/* Scale ruler — bottom left corner of hero */}
          <div className="absolute bottom-16 left-6 md:left-12 pointer-events-none select-none" style={{ opacity: 0.45 }} aria-hidden="true">
            <svg width="140" height="32" viewBox="0 0 140 32" fill="none">
              {/* Ruler body */}
              <rect x="0" y="10" width="140" height="12" stroke="rgba(59,130,246,0.7)" strokeWidth="1.5" fill="rgba(59,130,246,0.08)" />
              {/* Tick marks at 0, 20, 40, 60, 80, 100, 120, 140 */}
              {[0,20,40,60,80,100,120,140].map((x, i) => (
                <g key={x}>
                  <line x1={x} y1="10" x2={x} y2={i % 2 === 0 ? "4" : "7"} stroke="rgba(59,130,246,0.8)" strokeWidth="1.5" />
                </g>
              ))}
              {/* Labels */}
              <text x="0" y="28" fill="rgba(255,255,255,0.7)" fontSize="7" fontFamily="monospace">0</text>
              <text x="56" y="28" fill="rgba(255,255,255,0.7)" fontSize="7" fontFamily="monospace">1:100</text>
              <text x="126" y="28" fill="rgba(255,255,255,0.7)" fontSize="7" fontFamily="monospace">5m</text>
            </svg>
          </div>

          <div className="relative max-w-6xl mx-auto px-4 py-24 md:py-32">
            <div className="max-w-2xl">
              <p className="text-[#3B82F6] text-sm font-medium tracking-widest uppercase mb-4 font-sans-jp">
                Since 2003 in Amami Oshima
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 font-serif-jp">
                信頼で築く、
                <br />
                島の暮らし。
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed mb-8 font-sans-jp">
                奄美大島で創業20年。新築住宅からリフォーム、店舗内装、公共工事まで、
                地域に根ざした確かな施工で、島の暮らしと未来をつくります。
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center bg-[#3B82F6] hover:bg-blue-600 transition text-white px-8 py-4 rounded font-medium text-base font-sans-jp"
                >
                  無料相談・お見積り
                </a>
                <a
                  href="#works"
                  className="inline-flex items-center justify-center border border-slate-500 hover:border-white transition text-white px-8 py-4 rounded font-medium text-base font-sans-jp"
                >
                  施工実績を見る
                </a>
              </div>
            </div>
          </div>
          {/* Animated crane watermark */}
          <CraneWatermark />

          {/* Decorative bottom bar */}
          <div className="relative flex">
            <div className="h-1 flex-1 bg-[#3B82F6]" />
            <div className="h-1 flex-1 bg-blue-400" />
            <div className="h-1 flex-1 bg-blue-300" />
            <div className="h-1 flex-1 bg-slate-400" />
          </div>
        </div>

        {/* Stats bar — bold & simple */}
        <div className="bg-[#0F172A]">
          <div className="max-w-6xl mx-auto px-4 py-14 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {[
              { number: "20", unit: "年+", label: "地域密着の実績" },
              { number: "350", unit: "件+", label: "累計施工件数" },
              { number: "98", unit: "%", label: "お客様満足度" },
              { number: "8", unit: "名", label: "専門スタッフ" },
            ].map(({ number, unit, label }, i) => (
              <div key={i} className="text-center">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-white text-5xl md:text-6xl font-black font-sans-jp leading-none">{number}</span>
                  <span className="text-blue-400 text-lg md:text-xl font-bold">{unit}</span>
                </div>
                <div className="text-slate-400 text-xs mt-3 font-sans-jp tracking-wider">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Services Section — full-width alternating blocks ===== */}
      <section
        id="services"
        className="scroll-mt-24 diagonal-section-top bg-[#F8FAFC] pt-[60px] pb-4"
        ref={servicesReveal.ref}
      >
        <div className="max-w-6xl mx-auto px-4 mb-12">
          <SectionHeading label="Services" title="事業内容" />
        </div>

        <div className="space-y-2">
          <ServiceBlock
            index={0}
            src="/images/demo/construction/service-new-house.jpg"
            alt="新築住宅の外観"
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9,22 9,12 15,12 15,22" />
              </svg>
            }
            title="新築住宅"
            desc="台風・塩害に強い奄美の気候に適した住宅設計。木造・RC造を問わず、ご家族のライフスタイルに合わせた快適で安全な住まいをご提案します。土地探しからサポート可能です。"
          />
          <ServiceBlock
            index={1}
            src="/images/demo/construction/service-reform.jpg"
            alt="リフォーム後の室内"
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
              </svg>
            }
            title="リフォーム"
            desc="水回りの改修、バリアフリー化、耐震補強、外壁塗装まで幅広く対応。暮らしの「困った」を解決し、住み慣れた家をもっと快適にします。小さな修繕から大規模改修までお気軽にご相談ください。"
          />
          <ServiceBlock
            index={2}
            src="/images/demo/construction/service-shop-interior.jpg"
            alt="店舗内装の施工例"
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16,8 20,8 23,11 23,16 16,16 16,8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
            }
            title="店舗内装"
            desc="飲食店、美容室、物販店など、島内の店舗開業・改装をサポート。集客につながる空間デザインと、使いやすい動線設計でオーナー様のビジネス成功をお手伝いします。"
          />
          <ServiceBlock
            index={3}
            src="/images/demo/construction/service-public-works.jpg"
            alt="公共工事の施工現場"
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                <path d="M9 22v-4h6v4" />
                <path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M12 6h.01" />
                <path d="M12 10h.01" /><path d="M12 14h.01" />
                <path d="M16 10h.01" /><path d="M16 14h.01" />
                <path d="M8 10h.01" /><path d="M8 14h.01" />
              </svg>
            }
            title="公共工事"
            desc="道路補修、護岸工事、公共施設の建築・改修など、奄美市をはじめとする自治体発注の公共工事に豊富な実績があります。安全管理を徹底し、地域インフラの維持・整備に貢献しています。"
          />
        </div>
      </section>

      {/* ===== Construction Ruler Divider ===== */}
      <div className="relative bg-[#1E3A5F] overflow-hidden" style={{ height: 56 }} aria-hidden="true">
        {/* Ruler tape */}
        <svg width="100%" height="56" viewBox="0 0 1200 56" preserveAspectRatio="xMidYMid meet" fill="none" style={{ display: "block" }}>
          <rect x="0" y="18" width="1200" height="20" fill="rgba(59,130,246,0.18)" stroke="rgba(59,130,246,0.5)" strokeWidth="1" />
          {/* Major ticks every 60px, minor every 12px */}
          {Array.from({ length: 101 }, (_, i) => i).map((i) => {
            const x = i * 12;
            const isMajor = i % 5 === 0;
            return (
              <line key={i} x1={x} y1="18" x2={x} y2={isMajor ? "12" : "15"} stroke="rgba(59,130,246,0.7)" strokeWidth={isMajor ? 1.5 : 1} />
            );
          })}
          {/* Bottom ticks */}
          {Array.from({ length: 101 }, (_, i) => i).map((i) => {
            const x = i * 12;
            const isMajor = i % 5 === 0;
            return (
              <line key={`b${i}`} x1={x} y1="38" x2={x} y2={isMajor ? "44" : "41"} stroke="rgba(59,130,246,0.7)" strokeWidth={isMajor ? 1.5 : 1} />
            );
          })}
          {/* Dimension labels */}
          {[0,60,120,180,240,300,360,420,480,540,600,660,720,780,840,900,960,1020,1080,1140,1200].map((x, i) => (
            <text key={x} x={x + 3} y="29" fill="rgba(147,197,253,0.7)" fontSize="7" fontFamily="monospace">{i * 5}</text>
          ))}
        </svg>
        {/* Hammer icon at left */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 opacity-60">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(147,197,253,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 12l-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 010-3L12 9" />
            <path d="M17.64 15L22 10.64" />
            <path d="M20.91 11.7l-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 00-3.94-1.64H9l.92.82A6.18 6.18 0 0112 8.4v1.56l2 2h2.47l2.26 1.91" />
          </svg>
        </div>
        {/* Wrench icon at right */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-60">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(147,197,253,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
          </svg>
        </div>
        {/* Hard hat watermark center */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30">
          <svg width="28" height="22" viewBox="0 0 28 22" fill="none">
            <ellipse cx="14" cy="16" rx="13" ry="5" fill="rgba(59,130,246,0.8)" />
            <path d="M4 16 Q4 6 14 4 Q24 6 24 16" fill="rgba(59,130,246,0.8)" />
            <rect x="6" y="15" width="16" height="3" rx="1" fill="rgba(59,130,246,0.5)" />
          </svg>
        </div>
      </div>

      {/* ===== Works Section — staggered scrapbook layout ===== */}
      <section id="works" className="py-[60px] bg-white scroll-mt-24 diagonal-section-both">
        <div className="max-w-6xl mx-auto px-4">
          <div className="relative">
            {/* Hard hat watermark behind heading */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none" style={{ opacity: 0.05 }} aria-hidden="true">
              <svg width="160" height="120" viewBox="0 0 160 120" fill="none">
                <ellipse cx="80" cy="90" rx="72" ry="26" fill="#1E3A5F" />
                <path d="M20 90 Q20 30 80 20 Q140 30 140 90" fill="#1E3A5F" />
                <rect x="28" y="84" width="104" height="16" rx="4" fill="#3B82F6" />
                <line x1="8" y1="90" x2="152" y2="90" stroke="#3B82F6" strokeWidth="4" />
              </svg>
            </div>
            <SectionHeading label="Works" title="施工実績" />
          </div>

          {/* Scrapbook grid — asymmetric sizes and offsets */}
          <div className="grid grid-cols-12 gap-4 md:gap-6">
            {/* Card 1: large, cols 1-7, row 1 */}
            <div className="col-span-12 md:col-span-7 md:mt-0">
              <WorkCard
                src="/images/demo/construction/work-new-house.jpg"
                alt="名瀬 S様邸 新築住宅の外観"
                badge="新築住宅"
                title="名瀬 S様邸 新築工事"
                date="2024年3月完工"
                desc="台風に強いRC造2階建て。奄美の気候を考慮した通風設計と、ご家族4人がゆったり暮らせる4LDKの間取り。太陽光パネル設置。"
                delay={0}
                size="large"
              />
            </div>
            {/* Card 2: small, cols 8-12, row 1, pushed down */}
            <div className="col-span-12 md:col-span-5 md:mt-12">
              <WorkCard
                src="/images/demo/construction/work-reform.jpg"
                alt="龍郷町 M様邸 リフォーム後の外観"
                badge="リフォーム"
                title="龍郷町 M様邸 全面リフォーム"
                date="2023年11月完工"
                desc="築35年の木造住宅を全面改修。耐震補強、断熱改修、バリアフリー化を実施。キッチン・浴室を最新設備に入替え、快適な住空間に生まれ変わりました。"
                delay={180}
                size="medium"
              />
            </div>
            {/* Card 3: medium, full row (公共工事削除後) */}
            <div className="col-span-12 md:col-span-8 md:col-start-3 md:mt-6">
              <WorkCard
                src="/images/demo/construction/work-cafe.jpg"
                alt="島カフェ アルパカ 店舗内装の施工例"
                badge="店舗内装"
                title="名瀬 島カフェ「アルパカ」内装工事"
                date="2024年1月完工"
                desc="空きテナントを島の素材を活かしたカフェ空間にフルリノベーション。奄美大島産の木材を使用したカウンターと、観光客にも人気の開放的なテラス席を設計。"
                delay={300}
                size="medium"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Construction Ruler Divider 2 ===== */}
      <div className="relative bg-[#0F172A] overflow-hidden" style={{ height: 48 }} aria-hidden="true">
        <svg width="100%" height="48" viewBox="0 0 1200 48" preserveAspectRatio="xMidYMid meet" fill="none" style={{ display: "block" }}>
          <rect x="0" y="16" width="1200" height="16" fill="rgba(59,130,246,0.12)" stroke="rgba(59,130,246,0.4)" strokeWidth="1" />
          {Array.from({ length: 121 }, (_, i) => i).map((i) => {
            const x = i * 10;
            const isMajor = i % 5 === 0;
            return (
              <line key={i} x1={x} y1="16" x2={x} y2={isMajor ? "10" : "13"} stroke="rgba(59,130,246,0.6)" strokeWidth={isMajor ? 1.5 : 1} />
            );
          })}
          {Array.from({ length: 121 }, (_, i) => i).map((i) => {
            const x = i * 10;
            const isMajor = i % 5 === 0;
            return (
              <line key={`b${i}`} x1={x} y1="32" x2={x} y2={isMajor ? "38" : "35"} stroke="rgba(59,130,246,0.6)" strokeWidth={isMajor ? 1.5 : 1} />
            );
          })}
        </svg>
        {/* Wrench left */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-50">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(147,197,253,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
          </svg>
        </div>
        {/* Hammer right */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-50">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(147,197,253,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 12l-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 010-3L12 9" />
            <path d="M17.64 15L22 10.64" />
            <path d="M20.91 11.7l-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 00-3.94-1.64H9l.92.82A6.18 6.18 0 0112 8.4v1.56l2 2h2.47l2.26 1.91" />
          </svg>
        </div>
      </div>

      {/* ===== 施工の様子 — horizontal scroll gallery ===== */}
      <section className="py-[60px] bg-[#F8FAFC] scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4">
          <div>
            <SectionHeading label="Process" title="施工の様子" />
            <p className="text-slate-500 -mt-8 mb-14 text-center max-w-lg mx-auto font-sans-jp">
              安全第一を徹底し、丁寧な施工でお客様の理想を形にしています。
            </p>
          </div>

          {/* Horizontal scroll gallery */}
          <div ref={sectionRef} className="h-gallery-outer overflow-hidden rounded-xl">
            <div
              ref={galleryRef}
              className="h-gallery-track"
              style={{ transform: `translateX(${galleryX}px)` }}
            >
              {[
                { src: "/images/demo/construction/gallery-worksite.jpg", alt: "建設現場での作業風景" },
                { src: "/images/demo/construction/gallery-exterior.jpg", alt: "完成した建物の外観" },
                { src: "/images/demo/construction/gallery-modern.jpg", alt: "モダン建築の外観" },
                { src: "/images/demo/construction/gallery-interior.jpg", alt: "完成物件の内装" },
                { src: "/images/demo/construction/hero.jpg", alt: "施工現場の全景" },
                { src: "/images/demo/construction/service-public-works.jpg", alt: "外構工事の様子" },
              ].map(({ src, alt }, i) => (
                <div key={i} className="h-gallery-item">
                  <Image
                    src={src}
                    alt={alt}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Construction Flow — 6 steps with alternating slide-in */}
          <div className="mt-16">
            <h3 className="text-center text-xl font-bold mb-10 font-serif-jp">施工の流れ</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {flowSteps.map(({ step, title, desc }) => (
                <FlowStep
                  key={step}
                  step={step}
                  title={title}
                  desc={desc}
                  fromLeft={step % 2 !== 0}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Company Profile Section — diagonal top ===== */}
      <section
        id="company"
        className="py-[60px] scroll-mt-24 diagonal-section-top bg-white"
        ref={companyReveal.ref}
      >
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeading label="Company" title="会社概要" />

          <div className="max-w-3xl mx-auto bg-white rounded-lg border border-slate-200 overflow-hidden">
            <div className="divide-y divide-slate-200">
              {[
                ["商号", "有限会社 南風建設"],
                ["所在地", "鹿児島県奄美市名瀬"],
                ["代表者", "代表取締役 山本 太郎"],
                ["設立", "平成15年（2003年）4月"],
                ["資本金", "1,000万円"],
                ["従業員数", "8名"],
                ["保有資格", "一級建築士 / 二級建築士 / 1級建築施工管理技士 / 2級土木施工管理技士"],
                ["事業内容", "新築住宅の設計・施工 / リフォーム・リノベーション / 店舗内装工事 / 公共工事 / 外構・エクステリア工事"],
                ["許可", "鹿児島県知事許可（般-5）第00000号（建築工事業・土木工事業）"],
                ["加盟団体", "奄美建設業協会 / 鹿児島県建築士会奄美支部"],
                ["電話番号", "0997-XX-XXXX"],
                ["FAX", "0997-XX-XXXX"],
                ["営業時間", "平日 8:00 - 17:00（土日祝休み）"],
              ].map(([label, value], i) => (
                <div key={i} className="flex flex-col sm:flex-row">
                  <div className="sm:w-40 flex-shrink-0 bg-slate-50 px-6 py-4 font-medium text-sm text-[#1E293B] font-sans-jp">
                    {label}
                  </div>
                  <div className="px-6 py-4 text-sm text-slate-600 font-sans-jp">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Contact Section ===== */}
      <section id="contact" className="py-[60px] bg-[#1E293B] text-white scroll-mt-24 grain-texture">
        <div className="max-w-6xl mx-auto px-4">
          <div>
            <SectionHeading label="Contact" title="お問い合わせ" light={true} />
            <p className="text-slate-400 -mt-8 mb-14 text-center max-w-lg mx-auto font-sans-jp">
              新築・リフォーム・店舗工事のご相談、お見積りは無料です。
              お気軽にお問い合わせください。
            </p>
          </div>

          {/* Phone CTA */}
          <div className="text-center mb-12">
            <p className="text-slate-400 text-sm mb-2 font-sans-jp">お電話でのお問い合わせ</p>
            <a
              href="tel:0997-XX-XXXX"
              className="text-3xl md:text-4xl font-bold text-[#3B82F6] hover:text-blue-400 transition flex items-center justify-center gap-3 font-sans-jp"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              0997-XX-XXXX
            </a>
            <p className="text-slate-500 text-sm mt-2 font-sans-jp">
              受付時間: 平日 8:00 - 17:00
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center max-w-2xl mx-auto mb-12">
            <div className="flex-1 h-px bg-slate-600" />
            <span className="px-4 text-slate-500 text-sm font-sans-jp">または</span>
            <div className="flex-1 h-px bg-slate-600" />
          </div>

          {/* Form */}
          <div className="max-w-2xl mx-auto">
            <p className="text-slate-400 text-sm text-center mb-8 font-sans-jp">メールでのお問い合わせ</p>
            {submitted ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#3B82F6]/20 mb-6">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="text-white text-lg font-medium font-sans-jp mb-2">お問い合わせありがとうございます。</p>
                <p className="text-slate-400 text-sm font-sans-jp">担当者よりご連絡いたします。</p>
              </div>
            ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2 font-sans-jp">
                    お名前 <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="山本 太郎"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-500 focus:outline-none focus:border-[#3B82F6] transition font-sans-jp"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2 font-sans-jp">電話番号</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="0997-XX-XXXX"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-500 focus:outline-none focus:border-[#3B82F6] transition font-sans-jp"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 font-sans-jp">
                  メールアドレス <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-500 focus:outline-none focus:border-[#3B82F6] transition font-sans-jp"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 font-sans-jp">ご相談内容</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-[#3B82F6] transition font-sans-jp"
                >
                  <option value="">選択してください</option>
                  <option value="new">新築住宅のご相談</option>
                  <option value="reform">リフォームのご相談</option>
                  <option value="shop">店舗内装のご相談</option>
                  <option value="other">その他のご相談</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 font-sans-jp">
                  お問い合わせ内容 <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="ご相談内容をご記入ください"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-500 focus:outline-none focus:border-[#3B82F6] transition resize-none font-sans-jp"
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-[#3B82F6] hover:bg-blue-600 transition text-white px-12 py-4 rounded font-medium text-base font-sans-jp"
                >
                  送信する
                </button>
              </div>
            </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F172A] text-slate-400 py-12 font-sans-jp grain-texture">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-[#3B82F6] rounded flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21h18" />
                    <path d="M5 21V7l7-4 7 4v14" />
                    <path d="M9 21v-6h6v6" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-bold font-serif-jp">南風建設</div>
                  <div className="text-xs">Hae Construction</div>
                </div>
              </div>
              <p className="text-sm leading-relaxed">
                奄美大島で創業20年。地域に根ざした確かな施工で、
                島の暮らしと未来をつくります。
              </p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">事業内容</h4>
              <ul className="space-y-2 text-sm">
                <li>新築住宅</li>
                <li>リフォーム・リノベーション</li>
                <li>店舗内装工事</li>
                <li>公共工事</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">お問い合わせ</h4>
              <ul className="space-y-2 text-sm">
                <li>TEL: 0997-XX-XXXX</li>
                <li>FAX: 0997-XX-XXXX</li>
                <li>受付: 平日 8:00 - 17:00</li>
                <li>鹿児島県奄美市名瀬</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-xs">
            <p>&copy; 2026 有限会社 南風建設. All rights reserved.</p>
          </div>
          <div className="text-center mt-8 pt-6 border-t border-current/10">
            <p className="text-xs opacity-30">
              デモサイト — Designed by{" "}
              <a href="/web#gallery" className="hover:opacity-60 transition-opacity">ALPACA</a>
            </p>
          </div>
        </div>
      </footer>

      {/* ===== FIXED BOTTOM CTA BAR ===== */}
      <style>{`
        @keyframes const-cta-slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .const-cta-bar {
          animation: const-cta-slide-up 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
      {showCta && (
        <div
          className="const-cta-bar fixed bottom-0 left-0 right-0 z-40 px-4 py-3 flex items-center justify-between gap-3"
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.97)",
            backdropFilter: "blur(12px)",
            borderTop: "1px solid rgba(59,130,246,0.2)",
          }}
          role="complementary"
          aria-label="お問い合わせのショートカット"
        >
          <a
            href="tel:0997-XX-XXXX"
            className="flex items-center justify-center gap-2 flex-1 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 hover:opacity-80"
            style={{ backgroundColor: "#3B82F6", color: "#ffffff" }}
            aria-label="電話する: 0997-XX-XXXX"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>
            電話する
          </a>
          <a
            href="#contact"
            className="flex items-center justify-center gap-2 flex-1 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 hover:opacity-80"
            style={{ border: "1px solid rgba(59,130,246,0.5)", color: "#3B82F6" }}
            aria-label="お問い合わせフォームへスクロール"
          >
            Web予約/お問い合わせ
          </a>
        </div>
      )}
    </div>
  );
}
