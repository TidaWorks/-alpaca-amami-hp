"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function NurseryPage() {
  const [formData, setFormData] = useState({
    parentName: "",
    phone: "",
    email: "",
    childAge: "",
    visitDate: "",
    visitTime: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState<{ parentName?: string; email?: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const [crayonVisible, setCrayonVisible] = useState(false);
  const [walkPathProgress, setWalkPathProgress] = useState(0);

  // ---- Unified visibility state ----
  // Keys: "blocks", "timelineLine", "timeline_0"..."timeline_7",
  //       "staff_0"..."staff_2", "facility_0"..."facility_5"
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
  const setVisible = (key: string) =>
    setVisibleSections((prev) => (prev[key] ? prev : { ...prev, [key]: true }));

  const enrollmentRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const staffRef = useRef<HTMLDivElement>(null);
  const facilityRef = useRef<HTMLDivElement>(null);
  const crayonRef = useRef<HTMLDivElement>(null);
  const walkMapRef = useRef<HTMLDivElement>(null);

  // ---- Merged scroll + intersection observers ----
  useEffect(() => {
    // Scroll: floating CTA + walk map path progress
    const onScroll = () => {
      setShowCta(window.scrollY > 500);
      if (walkMapRef.current) {
        const rect = walkMapRef.current.getBoundingClientRect();
        const windowH = window.innerHeight;
        // Start drawing when top of element enters viewport, finish when bottom exits
        const start = rect.top - windowH * 0.85;
        const end = rect.bottom - windowH * 0.15;
        const range = end - start;
        if (range > 0) {
          const raw = -start / range;
          setWalkPathProgress(Math.min(1, Math.max(0, raw)));
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // IntersectionObserver helpers
    const makeObs = (
      el: HTMLDivElement,
      threshold: number,
      onIntersect: () => void
    ) => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            onIntersect();
            obs.disconnect();
          }
        },
        { threshold }
      );
      obs.observe(el);
      return obs;
    };

    const observers: IntersectionObserver[] = [];

    if (enrollmentRef.current) {
      observers.push(
        makeObs(enrollmentRef.current, 0.3, () => setVisible("blocks"))
      );
    }

    if (timelineRef.current) {
      observers.push(
        makeObs(timelineRef.current, 0.1, () => {
          setVisible("timelineLine");
          Array.from({ length: 8 }).forEach((_, i) => {
            setTimeout(() => setVisible(`timeline_${i}`), i * 180);
          });
        })
      );
    }

    if (staffRef.current) {
      observers.push(
        makeObs(staffRef.current, 0.2, () => {
          [0, 1, 2].forEach((i) => {
            setTimeout(() => setVisible(`staff_${i}`), i * 200);
          });
        })
      );
    }

    if (facilityRef.current) {
      observers.push(
        makeObs(facilityRef.current, 0.1, () => {
          Array.from({ length: 6 }).forEach((_, i) => {
            setTimeout(() => setVisible(`facility_${i}`), i * 120);
          });
        })
      );
    }

    if (crayonRef.current) {
      observers.push(
        makeObs(crayonRef.current, 0.15, () => setCrayonVisible(true))
      );
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  // ---- Form validation ----
  const validateForm = (): boolean => {
    const errors: { parentName?: string; email?: string } = {};
    if (!formData.parentName.trim()) {
      errors.parentName = "保護者のお名前を入力してください。";
    }
    if (!formData.email.trim()) {
      errors.email = "メールアドレスを入力してください。";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "正しいメールアドレスの形式で入力してください。";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setSubmitted(true);
  };

  return (
    <div
      className="min-h-screen text-[#3D2A1A]"
      style={{ fontFamily: "var(--font-noto-sans-jp), sans-serif", scrollBehavior: "smooth", backgroundColor: "#FFF8F0" }}
    >
      {/* ===== Google Fonts + Animations ===== */}
      <style>{`
        html { scroll-behavior: smooth; }
        .font-rounded { font-family: var(--font-mplus-rounded), var(--font-noto-sans-jp), sans-serif; }
        .font-sans-jp { font-family: var(--font-noto-sans-jp), sans-serif; }

        /* ---- Floating decorations in hero ---- */
        @keyframes gentleFloat1 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33%       { transform: translate(12px, -18px) scale(1.06); }
          66%       { transform: translate(-9px, -9px) scale(0.94); }
        }
        @keyframes gentleFloat2 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33%       { transform: translate(-14px, -12px) scale(0.96); }
          66%       { transform: translate(8px, -20px) scale(1.04); }
        }
        @keyframes gentleFloat3 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50%       { transform: translate(10px, -14px) scale(1.08); }
        }
        @keyframes gentleFloat4 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          40%       { transform: translate(-10px, -16px) scale(0.92); }
          80%       { transform: translate(6px, -6px) scale(1.05); }
        }
        @keyframes gentleFloat5 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          60%       { transform: translate(16px, -10px) scale(1.03); }
        }
        @keyframes birdFlap {
          0%   { transform: translate(0px, 0px) scaleY(1); }
          20%  { transform: translate(18px, -14px) scaleY(0.82); }
          40%  { transform: translate(38px, -6px) scaleY(1.12); }
          60%  { transform: translate(56px, -20px) scaleY(0.85); }
          80%  { transform: translate(72px, -8px) scaleY(1.08); }
          100% { transform: translate(88px, -16px) scaleY(0.9); }
        }
        @keyframes starTwinkle {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.22; }
          50%       { transform: scale(1.25) rotate(18deg); opacity: 0.35; }
        }
        @keyframes rainbowFloat {
          0%, 100% { transform: translate(0px, 0px); opacity: 0.18; }
          50%       { transform: translate(-6px, -14px); opacity: 0.28; }
        }

        /* ---- Timeline line draw ---- */
        @keyframes lineGrow {
          from { transform: scaleY(0); }
          to   { transform: scaleY(1); }
        }

        /* ---- Staff bounce-in ---- */
        @keyframes bounceIn {
          0%   { opacity: 0; transform: translateY(60px) scale(0.9); }
          60%  { transform: translateY(-10px) scale(1.02); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* ---- Facility pop-in ---- */
        @keyframes popIn {
          0%   { opacity: 0; transform: scale(0.8) rotate(-3deg); }
          70%  { transform: scale(1.05) rotate(1deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }

        /* ---- Building blocks stack animation — sharp clack with overshoot ---- */
        @keyframes blockStack {
          0%   { opacity: 0; transform: translateY(44px) scaleX(0.65); }
          55%  { transform: translateY(-10px) scaleX(1.07); }
          72%  { transform: translateY(5px) scaleX(0.96); }
          85%  { transform: translateY(-3px) scaleX(1.02); }
          100% { opacity: 1; transform: translateY(0) scaleX(1); }
        }
        @keyframes blockTopBounce {
          0%   { opacity: 0; transform: translateY(36px) scale(0.70); }
          50%  { transform: translateY(-12px) scale(1.09); }
          68%  { transform: translateY(6px) scale(0.95); }
          82%  { transform: translateY(-4px) scale(1.03); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* ---- Hero ken-burns zoom ---- */
        @keyframes kenBurns {
          0%   { transform: scale(1.0); }
          100% { transform: scale(1.12); }
        }
        .hero-img-kenburns {
          animation: kenBurns 14s ease-in-out infinite alternate;
        }

        /* ---- Timeline icon animations ---- */
        @keyframes sunGlow {
          0%, 100% { filter: drop-shadow(0 0 0px #FFD700); transform: scale(1) rotate(0deg); }
          50%       { filter: drop-shadow(0 0 6px #FFD70099); transform: scale(1.18) rotate(20deg); }
        }
        @keyframes moonPulse {
          0%, 100% { filter: drop-shadow(0 0 0px #87CEEB); transform: scale(1); opacity: 0.95; }
          50%       { filter: drop-shadow(0 0 6px #87CEEB88); transform: scale(1.15); opacity: 1; }
        }
        @keyframes moonPulse2 {
          0%, 100% { filter: drop-shadow(0 0 0px #B39DDB); transform: scale(1); }
          50%       { filter: drop-shadow(0 0 7px #B39DDB99); transform: scale(1.14); }
        }
        @keyframes starSpin {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50%       { transform: scale(1.2) rotate(36deg); }
        }
        @keyframes pencilWiggle {
          0%, 100% { transform: rotate(0deg); }
          30%       { transform: rotate(-14deg); }
          60%       { transform: rotate(10deg); }
        }
        @keyframes plateWobble {
          0%, 100% { transform: scale(1) rotate(0deg); }
          40%       { transform: scale(1.12) rotate(-6deg); }
          70%       { transform: scale(1.06) rotate(4deg); }
        }
        @keyframes cookieBounce {
          0%, 100% { transform: translateY(0px) scale(1); }
          50%       { transform: translateY(-3px) scale(1.1); }
        }
        @keyframes houseWave {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.12) translateY(-2px); }
        }
        .tl-icon-sun   { animation: sunGlow    3.2s ease-in-out infinite; }
        .tl-icon-star  { animation: starSpin   4s   ease-in-out infinite; }
        .tl-icon-pencil{ animation: pencilWiggle 3.8s ease-in-out infinite; }
        .tl-icon-plate { animation: plateWobble 3.5s ease-in-out infinite; }
        .tl-icon-moon  { animation: moonPulse  4.2s ease-in-out infinite; }
        .tl-icon-cookie{ animation: cookieBounce 3s  ease-in-out infinite; }
        .tl-icon-house { animation: houseWave  3.6s ease-in-out infinite; }
        .tl-icon-moon2 { animation: moonPulse2 5s   ease-in-out infinite; }

        /* ---- Bubble pillar floating ---- */
        @keyframes bubbleFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes bubbleFloat2 {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-14px); }
        }
        @keyframes bubbleFloat3 {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }

        @keyframes waveCloudFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-5px); }
        }
        .wave-cloud { animation: waveCloudFloat 4s ease-in-out infinite; }
        .wave-cloud:nth-child(2) { animation-delay: 0.8s; }
        .wave-cloud:nth-child(3) { animation-delay: 1.6s; }
        .wave-cloud:nth-child(4) { animation-delay: 2.4s; }
        @keyframes staffDecorSpin {
          0%, 100% { transform: rotate(-15deg) scale(1); }
          50%       { transform: rotate(15deg) scale(1.15); }
        }
        .staff-decor { animation: staffDecorSpin 5s ease-in-out infinite; }

        /* ---- Bubble pillars ---- */
        .bubble-pillar {
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease;
          cursor: default;
        }
        .bubble-group:hover .bubble-pillar-1 { transform: scale(1.06) translateY(-6px); }
        .bubble-group:hover .bubble-pillar-2 { transform: scale(0.96) translateX(6px); }
        .bubble-group:hover .bubble-pillar-3 { transform: scale(0.96) translateX(-6px); }

        /* Mobile: reset bubble negative margins */
        @media (max-width: 767px) {
          .bubble-pillar-1 { margin: 0 !important; }
          .bubble-pillar-3 { margin-left: 0 !important; }
        }

        /* ---- Staff scattered photos ---- */
        .staff-card {
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, z-index 0s;
        }
        .staff-card:hover {
          transform: rotate(0deg) scale(1.05) translateY(-6px) !important;
          box-shadow: 0 20px 48px rgba(0,0,0,0.18) !important;
          z-index: 10;
        }
        .staff-bounce-in {
          animation: bounceIn 0.65s cubic-bezier(0.22,1,0.36,1) both;
        }
        /* On mobile, neutralize overlap margin for staff */
        @media (max-width: 767px) {
          .staff-card { margin-left: 0 !important; }
        }

        /* ---- Facility scattered ---- */
        .facility-pop-in {
          animation: popIn 0.5s cubic-bezier(0.22,1,0.36,1) both;
        }
        .facility-card {
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease;
        }
        .facility-card:hover {
          transform: rotate(0deg) scale(1.04) translateY(-4px) !important;
          box-shadow: 0 16px 40px rgba(0,0,0,0.16) !important;
          z-index: 10;
        }
        /* Mobile: remove minHeight on facility container */
        @media (max-width: 767px) {
          .facility-container { min-height: auto !important; }
        }

        /* Mobile: switch facility from absolute to normal flow */
        @media (max-width: 767px) {
          .facility-card {
            position: relative !important;
            top: auto !important;
            left: auto !important;
            width: 100% !important;
            max-width: 100% !important;
            margin-bottom: 12px;
          }
        }

        /* ---- Paper / crayon texture on warm light sections ---- */
        .paper-texture {
          position: relative;
        }
        .paper-texture::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: 0.035;
          background-image:
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
          background-size: 200px 200px;
          mix-blend-mode: multiply;
        }
        .paper-texture > * {
          position: relative;
          z-index: 1;
        }
        /* ---- Crayon draw-on animation ---- */
        @keyframes crayonDraw {
          from { stroke-dashoffset: var(--dash-len, 800); }
          to   { stroke-dashoffset: 0; }
        }
        .crayon-path {
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: var(--dash-len, 800);
          stroke-dashoffset: var(--dash-len, 800);
        }
        .crayon-draw-active .crayon-path {
          animation: crayonDraw var(--draw-dur, 1.2s) cubic-bezier(0.4, 0, 0.6, 1) var(--draw-delay, 0s) forwards;
        }

        /* ---- Walk map footprint bounce ---- */
        @keyframes footprintAppear {
          0%   { opacity: 0; transform: scale(0.3) rotate(-20deg); }
          70%  { transform: scale(1.2) rotate(5deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes stopPop {
          0%   { opacity: 0; transform: scale(0.5); }
          65%  { transform: scale(1.15); }
          100% { opacity: 1; transform: scale(1); }
        }

        input:focus, textarea:focus, select:focus {
          border-color: #F59E42 !important;
          box-shadow: 0 0 0 3px rgba(245,158,66,0.18) !important;
          outline: none !important;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        button[type="submit"] {
          transition: transform 0.2s ease, box-shadow 0.2s ease !important;
        }
        button[type="submit"]:hover { transform: scale(1.03) !important; }
        button[type="submit"]:active { transform: scale(0.98) !important; }
      `}</style>

      {/* ===== Fixed Header ===== */}
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{ backgroundColor: "rgba(255,248,240,0.96)", backdropFilter: "blur(8px)", borderBottom: "1px solid rgba(245,158,66,0.2)" }}
      >
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <a
            href="/web#gallery"
            className="text-sm hidden md:flex items-center gap-1 transition-colors text-[#F59E42] hover:text-[#d4862e]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            ギャラリーに戻る
          </a>

          <div className="font-rounded font-bold text-lg" style={{ color: "#F59E42" }}>
            ひだまり保育園
          </div>

          <nav className="hidden md:flex items-center gap-5">
            {[
              { label: "理念", href: "#about" },
              { label: "一日の流れ", href: "#schedule" },
              { label: "園の紹介", href: "#facilities" },
              { label: "先生紹介", href: "#staff" },
              { label: "入園案内", href: "#enrollment" },
              { label: "アクセス", href: "#access" },
              { label: "お問い合わせ", href: "#contact" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm transition-colors text-[#6B5744] hover:text-[#F59E42]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile hamburger button */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="メニューを開く"
          >
            <span
              className="block w-6 h-0.5 rounded-full transition-all duration-300"
              style={{
                backgroundColor: "#F59E42",
                transform: mobileMenuOpen ? "translateY(8px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="block w-6 h-0.5 rounded-full transition-all duration-300"
              style={{
                backgroundColor: "#F59E42",
                opacity: mobileMenuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-6 h-0.5 rounded-full transition-all duration-300"
              style={{
                backgroundColor: "#F59E42",
                transform: mobileMenuOpen ? "translateY(-8px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>

        {/* Mobile nav overlay */}
        {mobileMenuOpen && (
          <div
            className="md:hidden px-4 pb-4"
            style={{ borderTop: "1px solid rgba(245,158,66,0.15)" }}
          >
            <nav className="flex flex-col gap-1 pt-3">
              {[
                { label: "理念", href: "#about" },
                { label: "一日の流れ", href: "#schedule" },
                { label: "園の紹介", href: "#facilities" },
                { label: "先生紹介", href: "#staff" },
                { label: "入園案内", href: "#enrollment" },
                { label: "アクセス", href: "#access" },
                { label: "お問い合わせ", href: "#contact" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block py-2.5 px-3 rounded-xl text-sm font-medium transition-colors text-[#6B5744] hover:text-[#F59E42] hover:bg-[rgba(245,158,66,0.08)]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* ===== Hero Section ===== */}
      <section className="relative pt-14" id="hero">
        <div className="relative overflow-hidden" style={{ height: "88vh", minHeight: "520px" }}>
          <Image
            src="/images/demo/nursery/hero.jpg"
            alt="子どもたちが笑顔で遊ぶ様子"
            className="absolute inset-0 w-full h-full object-cover hero-img-kenburns"
            width={1200}
            height={800}
            priority
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(255,248,240,0.15) 0%, rgba(180,100,30,0.45) 100%)" }} />

          {/* Floating cute decorations — clouds, stars, birds, rainbows */}

          {/* Cloud 1 — top-left, orange pastel */}
          <div className="absolute top-16 left-8" style={{ animation: "gentleFloat1 7s ease-in-out infinite", opacity: 0.22 }}>
            <svg width="80" height="52" viewBox="0 0 80 52" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="40" cy="36" rx="36" ry="16" fill="#F9C87A"/>
              <ellipse cx="28" cy="30" rx="18" ry="16" fill="#F9C87A"/>
              <ellipse cx="52" cy="28" rx="20" ry="18" fill="#F9C87A"/>
              <ellipse cx="40" cy="24" rx="16" ry="15" fill="#F9C87A"/>
            </svg>
          </div>

          {/* Cloud 2 — top-right, sky blue */}
          <div className="absolute top-28 right-10" style={{ animation: "gentleFloat2 9s ease-in-out infinite", opacity: 0.2 }}>
            <svg width="68" height="44" viewBox="0 0 68 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="34" cy="32" rx="30" ry="13" fill="#87CEEB"/>
              <ellipse cx="24" cy="26" rx="15" ry="14" fill="#87CEEB"/>
              <ellipse cx="44" cy="23" rx="17" ry="15" fill="#87CEEB"/>
              <ellipse cx="34" cy="20" rx="13" ry="12" fill="#87CEEB"/>
            </svg>
          </div>

          {/* Star 1 — top-center-left, yellow */}
          <div className="absolute top-20" style={{ left: "28%", animation: "starTwinkle 5s ease-in-out infinite", opacity: 0.22 }}>
            <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M29 4 L34.5 21.5 L53 21.5 L38.5 32.5 L44 50 L29 39 L14 50 L19.5 32.5 L5 21.5 L23.5 21.5 Z" fill="#FFD700"/>
            </svg>
          </div>

          {/* Star 2 — right side, pink */}
          <div className="absolute top-1/3 right-16" style={{ animation: "starTwinkle 6s ease-in-out infinite", animationDelay: "1.2s", opacity: 0.2 }}>
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25 3 L30 18.5 L46 18.5 L33 28 L38 44 L25 34.5 L12 44 L17 28 L4 18.5 L20 18.5 Z" fill="#FFB6C1"/>
            </svg>
          </div>

          {/* Bird silhouette — left middle */}
          <div className="absolute" style={{ top: "42%", left: "6%", animation: "birdFlap 11s ease-in-out infinite", opacity: 0.2 }}>
            <svg width="62" height="32" viewBox="0 0 62 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M31 16 C20 4 6 2 2 8 C8 8 16 12 20 16 C16 12 14 8 20 6" fill="none" stroke="#FFF8F0" strokeWidth="3" strokeLinecap="round"/>
              <path d="M31 16 C42 4 56 2 60 8 C54 8 46 12 42 16 C46 12 48 8 42 6" fill="none" stroke="#FFF8F0" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </div>

          {/* Bird 2 — smaller, upper right area */}
          <div className="absolute" style={{ top: "22%", right: "30%", animation: "birdFlap 13s ease-in-out infinite", animationDelay: "2s", opacity: 0.18 }}>
            <svg width="44" height="22" viewBox="0 0 44 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 11 C14 3 4 1 1 5 C5 5 11 8 14 11 C11 8 10 5 14 4" fill="none" stroke="#FFF8F0" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M22 11 C30 3 40 1 43 5 C39 5 33 8 30 11 C33 8 34 5 30 4" fill="none" stroke="#FFF8F0" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>

          {/* Rainbow arc — bottom-left */}
          <div className="absolute bottom-28 left-12" style={{ animation: "rainbowFloat 8s ease-in-out infinite", opacity: 0.2 }}>
            <svg width="72" height="40" viewBox="0 0 72 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 38 Q36 2 68 38" stroke="#FF6B6B" strokeWidth="4" fill="none" strokeLinecap="round"/>
              <path d="M10 38 Q36 8 62 38" stroke="#FFA500" strokeWidth="4" fill="none" strokeLinecap="round"/>
              <path d="M16 38 Q36 14 56 38" stroke="#FFD700" strokeWidth="4" fill="none" strokeLinecap="round"/>
              <path d="M22 38 Q36 20 50 38" stroke="#7EC8A0" strokeWidth="4" fill="none" strokeLinecap="round"/>
              <path d="M28 38 Q36 26 44 38" stroke="#87CEEB" strokeWidth="4" fill="none" strokeLinecap="round"/>
            </svg>
          </div>

          {/* Rainbow arc 2 — top-right corner */}
          <div className="absolute top-12 right-6" style={{ animation: "rainbowFloat 10s ease-in-out infinite", animationDelay: "3s", opacity: 0.18 }}>
            <svg width="60" height="34" viewBox="0 0 60 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 32 Q30 2 57 32" stroke="#FFB6C1" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
              <path d="M8 32 Q30 7 52 32" stroke="#FFA500" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
              <path d="M13 32 Q30 12 47 32" stroke="#FFD700" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
              <path d="M18 32 Q30 17 42 32" stroke="#7EC8A0" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
            </svg>
          </div>

          {/* Cloud 3 — bottom-right, pink */}
          <div className="absolute bottom-24 right-16" style={{ animation: "gentleFloat3 8s ease-in-out infinite", opacity: 0.18 }}>
            <svg width="70" height="46" viewBox="0 0 70 46" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="35" cy="34" rx="31" ry="13" fill="#FFB6C1"/>
              <ellipse cx="25" cy="28" rx="16" ry="14" fill="#FFB6C1"/>
              <ellipse cx="47" cy="26" rx="18" ry="16" fill="#FFB6C1"/>
              <ellipse cx="35" cy="22" rx="14" ry="13" fill="#FFB6C1"/>
            </svg>
          </div>

          {/* Star 3 — lower-left, green */}
          <div className="absolute bottom-20 left-1/2" style={{ animation: "starTwinkle 7s ease-in-out infinite", animationDelay: "2.5s", opacity: 0.18 }}>
            <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23 2 L27.5 16.5 L43 16.5 L31 25.5 L35.5 40 L23 31 L10.5 40 L15 25.5 L3 16.5 L18.5 16.5 Z" fill="#7EC8A0"/>
            </svg>
          </div>

          <div className="relative flex flex-col items-center justify-center h-full text-center px-6">
            <div
              className="inline-block px-5 py-2 rounded-full text-sm font-medium mb-6"
              style={{ backgroundColor: "rgba(255,248,240,0.9)", color: "#F59E42" }}
            >
              奄美大島の認可保育園
            </div>
            <h1
              className="font-rounded font-bold mb-4"
              style={{ fontSize: "clamp(2.2rem, 6vw, 3.8rem)", color: "#FFF8F0", textShadow: "0 2px 16px rgba(0,0,0,0.25)", letterSpacing: "0.06em" }}
            >
              ひだまり保育園
            </h1>
            <p
              className="text-lg md:text-xl font-medium"
              style={{ color: "rgba(255,248,240,0.92)", textShadow: "0 1px 8px rgba(0,0,0,0.3)", letterSpacing: "0.08em" }}
            >
              笑顔あふれる、もうひとつのおうち
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href="#enrollment"
                className="px-8 py-3 rounded-full font-rounded font-bold text-sm transition-all hover:-translate-y-0.5 hover:bg-[#e08930]"
                style={{ backgroundColor: "#F59E42", color: "#FFF8F0", boxShadow: "0 4px 16px rgba(245,158,66,0.5)" }}
              >
                入園案内を見る
              </a>
              <a
                href="#contact"
                className="px-8 py-3 rounded-full font-rounded font-bold text-sm transition-all hover:-translate-y-0.5 hover:bg-[#FFF8F0]"
                style={{ backgroundColor: "rgba(255,248,240,0.9)", color: "#F59E42", boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}
              >
                見学のご予約
              </a>
            </div>
          </div>

          {/* Wave bottom */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
              <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#FFF8F0" />
            </svg>
          </div>
        </div>
      </section>

      {/* ===== Wave Divider: Hero → About ===== */}
      <div style={{ backgroundColor: "#FFF8F0", marginTop: "-2px", position: "relative" }}>
        <svg viewBox="0 0 1440 72" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%" }}>
          {/* Thicker, more visible wave */}
          <path d="M0,36 C240,72 480,4 720,36 C960,68 1200,4 1440,36 L1440,72 L0,72 Z" fill="#FFF8F0" />
          <path d="M0,36 C240,72 480,4 720,36 C960,68 1200,4 1440,36" stroke="#F9C87A" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.45"/>
          {/* Tiny cloud decorations sitting on the wave */}
          <g className="wave-cloud" transform="translate(180, 18)">
            <ellipse cx="22" cy="18" rx="20" ry="9" fill="#FFF8F0"/>
            <ellipse cx="14" cy="14" rx="11" ry="10" fill="#FFF8F0"/>
            <ellipse cx="30" cy="12" rx="13" ry="11" fill="#FFF8F0"/>
            <ellipse cx="22" cy="10" rx="9" ry="8" fill="#FFF8F0"/>
          </g>
          <g className="wave-cloud" transform="translate(560, 6)">
            <ellipse cx="18" cy="14" rx="16" ry="7" fill="#FFF8F0"/>
            <ellipse cx="11" cy="10" rx="9" ry="8" fill="#FFF8F0"/>
            <ellipse cx="24" cy="9" rx="10" ry="9" fill="#FFF8F0"/>
            <ellipse cx="18" cy="7" rx="7" ry="7" fill="#FFF8F0"/>
          </g>
          <g className="wave-cloud" transform="translate(980, 20)">
            <ellipse cx="24" cy="16" rx="21" ry="9" fill="#FFF8F0"/>
            <ellipse cx="15" cy="12" rx="12" ry="10" fill="#FFF8F0"/>
            <ellipse cx="32" cy="11" rx="14" ry="11" fill="#FFF8F0"/>
            <ellipse cx="24" cy="9" rx="10" ry="9" fill="#FFF8F0"/>
          </g>
          <g className="wave-cloud" transform="translate(1280, 10)">
            <ellipse cx="16" cy="13" rx="14" ry="6" fill="#FFF8F0"/>
            <ellipse cx="10" cy="9" rx="8" ry="7" fill="#FFF8F0"/>
            <ellipse cx="21" cy="8" rx="9" ry="8" fill="#FFF8F0"/>
            <ellipse cx="16" cy="7" rx="6" ry="6" fill="#FFF8F0"/>
          </g>
        </svg>
      </div>

      {/* ===== A: お絵かきドロー — Crayon Drawing Strip ===== */}
      <div
        ref={crayonRef}
        className={crayonVisible ? "crayon-draw-active" : ""}
        style={{ backgroundColor: "#FFF8F0", overflow: "hidden", padding: "8px 0 0" }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 16px" }}>
          <p className="font-rounded text-center text-xs font-medium tracking-widest mb-4" style={{ color: "#F59E42", opacity: 0.7 }}>
            こどもたちのかいた えのぐ
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              gap: "clamp(12px, 4vw, 48px)",
              flexWrap: "wrap",
            }}
          >
            {/* Sun — yellow/orange */}
            <svg
              width="110" height="110"
              viewBox="0 0 110 110"
              aria-hidden="true"
              style={{ flexShrink: 0 }}
            >
              {/* Sun circle */}
              <circle
                className="crayon-path"
                cx="55" cy="55" r="22"
                stroke="#FFD700" strokeWidth="4"
                style={{ "--dash-len": "140", "--draw-dur": "0.9s", "--draw-delay": "0s" } as React.CSSProperties}
              />
              {/* Wobbly rays */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, ri) => {
                const r = Math.PI * deg / 180;
                const cx = 55, cy = 55;
                const wobble = ri % 2 === 0 ? 2 : -2;
                const x1 = cx + Math.cos(r) * 30;
                const y1 = cy + Math.sin(r) * 30;
                const x2 = cx + Math.cos(r) * 46 + wobble;
                const y2 = cy + Math.sin(r) * 46 + wobble;
                const mx = (x1 + x2) / 2 + (ri % 3 === 0 ? 3 : -3);
                const my = (y1 + y2) / 2 + (ri % 2 === 0 ? -3 : 3);
                return (
                  <path
                    key={ri}
                    className="crayon-path"
                    d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`}
                    stroke="#FF8C00" strokeWidth="3.5"
                    style={{
                      "--dash-len": "22",
                      "--draw-dur": "0.4s",
                      "--draw-delay": `${0.9 + ri * 0.12}s`,
                    } as React.CSSProperties}
                  />
                );
              })}
            </svg>

            {/* Flower — pink petals + green stem */}
            <svg
              width="90" height="120"
              viewBox="0 0 90 120"
              aria-hidden="true"
              style={{ flexShrink: 0 }}
            >
              {/* Wobbly stem */}
              <path
                className="crayon-path"
                d="M 45 115 C 43 95 47 80 44 62"
                stroke="#4CAF50" strokeWidth="4"
                style={{ "--dash-len": "60", "--draw-dur": "0.7s", "--draw-delay": "0.5s" } as React.CSSProperties}
              />
              {/* Leaf left */}
              <path
                className="crayon-path"
                d="M 44 90 C 28 85 22 70 30 65 C 36 63 42 75 44 80"
                stroke="#4CAF50" strokeWidth="3.5"
                style={{ "--dash-len": "60", "--draw-dur": "0.5s", "--draw-delay": "1.1s" } as React.CSSProperties}
              />
              {/* Petals — 5 wobbly ovals around center */}
              {[0, 72, 144, 216, 288].map((deg, pi) => {
                const r = Math.PI * deg / 180;
                const pcx = 45 + Math.cos(r) * 17;
                const pcy = 44 + Math.sin(r) * 17;
                const ex1 = pcx + Math.cos(r + 1.2) * 11;
                const ey1 = pcy + Math.sin(r + 1.2) * 11;
                const ex2 = pcx + Math.cos(r - 1.2) * 11;
                const ey2 = pcy + Math.sin(r - 1.2) * 11;
                const topX = pcx + Math.cos(r) * 14 + (pi % 2 === 0 ? 2 : -2);
                const topY = pcy + Math.sin(r) * 14 + (pi % 3 === 0 ? -2 : 2);
                return (
                  <path
                    key={pi}
                    className="crayon-path"
                    d={`M ${45 + Math.cos(r) * 4} ${44 + Math.sin(r) * 4} C ${ex1} ${ey1} ${topX} ${topY} ${ex2} ${ey2} Z`}
                    stroke="#FF69B4" strokeWidth="3.5"
                    style={{
                      "--dash-len": "55",
                      "--draw-dur": "0.5s",
                      "--draw-delay": `${1.5 + pi * 0.15}s`,
                    } as React.CSSProperties}
                  />
                );
              })}
              {/* Flower center circle */}
              <circle
                className="crayon-path"
                cx="45" cy="44" r="9"
                stroke="#FFD700" strokeWidth="3.5"
                style={{ "--dash-len": "60", "--draw-dur": "0.5s", "--draw-delay": "2.3s" } as React.CSSProperties}
              />
            </svg>

            {/* House — blue roof + brown walls */}
            <svg
              width="110" height="110"
              viewBox="0 0 110 110"
              aria-hidden="true"
              style={{ flexShrink: 0 }}
            >
              {/* House body — wobbly rectangle */}
              <path
                className="crayon-path"
                d="M 20 98 C 19 80 21 62 20 50 C 35 51 75 49 90 50 C 89 65 91 82 90 98 Z"
                stroke="#8B4513" strokeWidth="4"
                style={{ "--dash-len": "260", "--draw-dur": "1.1s", "--draw-delay": "0.5s" } as React.CSSProperties}
              />
              {/* Roof — wobbly triangle */}
              <path
                className="crayon-path"
                d="M 12 52 C 25 38 42 22 55 14 C 68 22 85 36 98 52"
                stroke="#87CEEB" strokeWidth="4.5"
                style={{ "--dash-len": "160", "--draw-dur": "0.8s", "--draw-delay": "1.5s" } as React.CSSProperties}
              />
              {/* Door */}
              <path
                className="crayon-path"
                d="M 46 98 C 45 85 45 76 46 70 C 51 69 59 70 64 70 C 65 77 65 86 64 98"
                stroke="#8B4513" strokeWidth="3.5"
                style={{ "--dash-len": "90", "--draw-dur": "0.5s", "--draw-delay": "2.2s" } as React.CSSProperties}
              />
              {/* Window left */}
              <rect
                className="crayon-path"
                x="25" y="58" width="16" height="16" rx="2"
                stroke="#87CEEB" strokeWidth="3"
                style={{ "--dash-len": "70", "--draw-dur": "0.4s", "--draw-delay": "2.6s" } as React.CSSProperties}
              />
              {/* Window right */}
              <rect
                className="crayon-path"
                x="70" y="58" width="16" height="16" rx="2"
                stroke="#87CEEB" strokeWidth="3"
                style={{ "--dash-len": "70", "--draw-dur": "0.4s", "--draw-delay": "2.9s" } as React.CSSProperties}
              />
            </svg>

            {/* Stick figure family — 3 figures (dad, mom, child) */}
            <svg
              width="150" height="120"
              viewBox="0 0 150 120"
              aria-hidden="true"
              style={{ flexShrink: 0 }}
            >
              {/* Dad — tallest, orange */}
              {/* Head */}
              <circle className="crayon-path" cx="35" cy="22" r="11"
                stroke="#FF8C00" strokeWidth="3.5"
                style={{ "--dash-len": "72", "--draw-dur": "0.5s", "--draw-delay": "0.5s" } as React.CSSProperties}
              />
              {/* Body */}
              <path className="crayon-path" d="M 35 33 C 34 50 36 62 35 75"
                stroke="#FF8C00" strokeWidth="3.5"
                style={{ "--dash-len": "45", "--draw-dur": "0.4s", "--draw-delay": "0.9s" } as React.CSSProperties}
              />
              {/* Arms */}
              <path className="crayon-path" d="M 35 44 C 22 48 16 54 13 58"
                stroke="#FF8C00" strokeWidth="3"
                style={{ "--dash-len": "30", "--draw-dur": "0.3s", "--draw-delay": "1.2s" } as React.CSSProperties}
              />
              <path className="crayon-path" d="M 35 44 C 47 46 52 51 56 55"
                stroke="#FF8C00" strokeWidth="3"
                style={{ "--dash-len": "28", "--draw-dur": "0.3s", "--draw-delay": "1.4s" } as React.CSSProperties}
              />
              {/* Legs */}
              <path className="crayon-path" d="M 35 75 C 30 88 26 100 24 110"
                stroke="#FF8C00" strokeWidth="3"
                style={{ "--dash-len": "40", "--draw-dur": "0.3s", "--draw-delay": "1.6s" } as React.CSSProperties}
              />
              <path className="crayon-path" d="M 35 75 C 40 87 43 99 45 109"
                stroke="#FF8C00" strokeWidth="3"
                style={{ "--dash-len": "38", "--draw-dur": "0.3s", "--draw-delay": "1.8s" } as React.CSSProperties}
              />

              {/* Mom — medium, pink */}
              <circle className="crayon-path" cx="75" cy="26" r="10"
                stroke="#FF69B4" strokeWidth="3.5"
                style={{ "--dash-len": "66", "--draw-dur": "0.5s", "--draw-delay": "2.0s" } as React.CSSProperties}
              />
              {/* Body / skirt */}
              <path className="crayon-path" d="M 75 36 C 74 50 76 58 75 68"
                stroke="#FF69B4" strokeWidth="3.5"
                style={{ "--dash-len": "38", "--draw-dur": "0.35s", "--draw-delay": "2.4s" } as React.CSSProperties}
              />
              <path className="crayon-path" d="M 75 68 C 62 72 58 78 56 84 L 94 84 C 92 78 88 72 75 68"
                stroke="#FF69B4" strokeWidth="3"
                style={{ "--dash-len": "100", "--draw-dur": "0.5s", "--draw-delay": "2.7s" } as React.CSSProperties}
              />
              {/* Arms */}
              <path className="crayon-path" d="M 75 46 C 63 48 57 52 54 56"
                stroke="#FF69B4" strokeWidth="3"
                style={{ "--dash-len": "28", "--draw-dur": "0.3s", "--draw-delay": "3.1s" } as React.CSSProperties}
              />
              <path className="crayon-path" d="M 75 46 C 86 46 91 50 95 54"
                stroke="#FF69B4" strokeWidth="3"
                style={{ "--dash-len": "26", "--draw-dur": "0.3s", "--draw-delay": "3.3s" } as React.CSSProperties}
              />
              {/* Legs */}
              <path className="crayon-path" d="M 63 84 C 60 96 58 106 57 115"
                stroke="#FF69B4" strokeWidth="3"
                style={{ "--dash-len": "35", "--draw-dur": "0.3s", "--draw-delay": "3.5s" } as React.CSSProperties}
              />
              <path className="crayon-path" d="M 87 84 C 88 96 90 106 91 115"
                stroke="#FF69B4" strokeWidth="3"
                style={{ "--dash-len": "35", "--draw-dur": "0.3s", "--draw-delay": "3.7s" } as React.CSSProperties}
              />

              {/* Child — small, sky blue */}
              <circle className="crayon-path" cx="118" cy="35" r="9"
                stroke="#87CEEB" strokeWidth="3.5"
                style={{ "--dash-len": "60", "--draw-dur": "0.45s", "--draw-delay": "3.9s" } as React.CSSProperties}
              />
              <path className="crayon-path" d="M 118 44 C 117 56 119 66 118 76"
                stroke="#87CEEB" strokeWidth="3.5"
                style={{ "--dash-len": "35", "--draw-dur": "0.35s", "--draw-delay": "4.3s" } as React.CSSProperties}
              />
              {/* Arms */}
              <path className="crayon-path" d="M 118 52 C 108 55 104 59 102 63"
                stroke="#87CEEB" strokeWidth="3"
                style={{ "--dash-len": "24", "--draw-dur": "0.3s", "--draw-delay": "4.6s" } as React.CSSProperties}
              />
              <path className="crayon-path" d="M 118 52 C 127 53 131 57 134 60"
                stroke="#87CEEB" strokeWidth="3"
                style={{ "--dash-len": "22", "--draw-dur": "0.3s", "--draw-delay": "4.8s" } as React.CSSProperties}
              />
              {/* Legs */}
              <path className="crayon-path" d="M 118 76 C 113 88 110 100 109 110"
                stroke="#87CEEB" strokeWidth="3"
                style={{ "--dash-len": "36", "--draw-dur": "0.3s", "--draw-delay": "5.0s" } as React.CSSProperties}
              />
              <path className="crayon-path" d="M 118 76 C 122 87 124 98 126 108"
                stroke="#87CEEB" strokeWidth="3"
                style={{ "--dash-len": "36", "--draw-dur": "0.3s", "--draw-delay": "5.2s" } as React.CSSProperties}
              />
            </svg>
          </div>
          {/* Ground line below drawings */}
          <svg width="100%" height="12" viewBox="0 0 900 12" preserveAspectRatio="none" style={{ display: "block", marginTop: "4px" }}>
            <path
              className="crayon-path"
              d="M 0 8 C 60 4 120 10 180 7 C 240 4 300 9 360 6 C 420 3 480 10 540 7 C 600 4 660 9 720 6 C 780 3 840 8 900 6"
              stroke="#F9C87A" strokeWidth="3"
              style={{ "--dash-len": "920", "--draw-dur": "1.5s", "--draw-delay": "0.2s" } as React.CSSProperties}
            />
          </svg>
        </div>
      </div>

      {/* ===== About / 理念 ===== */}
      <section id="about" className="py-20 px-4 paper-texture" style={{ backgroundColor: "#FFF8F0" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-medium tracking-widest uppercase" style={{ color: "#F59E42" }}>Our Philosophy</span>
            <h2 className="font-rounded font-bold text-3xl md:text-4xl mt-2" style={{ color: "#3D2A1A" }}>
              保育理念
            </h2>
            <div className="mt-4 mx-auto w-12 h-1 rounded-full" style={{ backgroundColor: "#F59E42" }} />
          </div>

          <div
            className="rounded-3xl p-8 md:p-12 mb-14 text-center"
            style={{ backgroundColor: "#FFF2E0", border: "2px solid rgba(245,158,66,0.2)" }}
          >
            <p className="text-lg md:text-xl leading-relaxed font-medium" style={{ color: "#3D2A1A" }}>
              子どもたちが毎日「また来たい」と思える場所を目指して。<br />
              奄美の自然と地域のぬくもりに包まれながら、<br />
              一人ひとりの「好き」と「できた」を大切に育てます。
            </p>
          </div>

          {/* 3 Pillars — floating bubbles */}
          <div className="bubble-group relative flex flex-col md:flex-row items-center justify-center gap-0 md:gap-0" style={{ minHeight: "340px" }}>
            {/* Center large bubble */}
            <div
              className="bubble-pillar bubble-pillar-1 relative z-20 flex-shrink-0"
              style={{
                width: "240px",
                height: "240px",
                borderRadius: "50%",
                background: "radial-gradient(circle at 38% 38%, #FFF8F0 0%, #FFE8C2 60%, #F9C87A 100%)",
                border: "3px solid rgba(245,158,66,0.35)",
                boxShadow: "0 12px 40px rgba(245,158,66,0.22), inset 0 -4px 12px rgba(245,158,66,0.1)",
                animation: "bubbleFloat2 6s ease-in-out infinite",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "28px",
                margin: "0 -24px",
                zIndex: 20,
              }}
            >
              <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#F59E42" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "10px", flexShrink: 0 }}>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="3" />
                <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="3" />
              </svg>
              <h3 className="font-rounded font-bold text-base mb-2" style={{ color: "#3D2A1A", lineHeight: 1.3 }}>のびのび遊ぶ</h3>
              <p className="text-xs leading-relaxed" style={{ color: "#6B5744" }}>奄美の海・山・空を五感で感じながら、子どもらしい好奇心を大切に育てます。</p>
            </div>

            {/* Left bubble */}
            <div
              className="bubble-pillar bubble-pillar-2 relative flex-shrink-0"
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                background: "radial-gradient(circle at 38% 38%, #F0FAF4 0%, #C6EDDA 60%, #7EC8A0 100%)",
                border: "3px solid rgba(126,200,160,0.4)",
                boxShadow: "0 10px 32px rgba(126,200,160,0.22), inset 0 -4px 10px rgba(126,200,160,0.12)",
                animation: "bubbleFloat 7s ease-in-out infinite",
                animationDelay: "0.8s",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "24px",
                zIndex: 10,
                order: -1,
                marginBottom: "0",
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#5AAE85" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "8px", flexShrink: 0 }}>
                <path d="M12 22c-4-4-8-7.5-8-12a8 8 0 0 1 16 0c0 4.5-4 8-8 12z" />
                <path d="M12 12V8" />
                <path d="M9 10l3-2 3 2" />
              </svg>
              <h3 className="font-rounded font-bold text-sm mb-1.5" style={{ color: "#3D2A1A", lineHeight: 1.3 }}>食育</h3>
              <p className="text-xs leading-relaxed" style={{ color: "#5A7060" }}>地元の旬の食材で食べる喜びを伝え、野菜を育て収穫する体験を大切にしています。</p>
            </div>

            {/* Right bubble */}
            <div
              className="bubble-pillar bubble-pillar-3 relative flex-shrink-0"
              style={{
                width: "210px",
                height: "210px",
                borderRadius: "50%",
                background: "radial-gradient(circle at 38% 38%, #FFF8F0 0%, #FFD6E0 60%, #FFB6C1 100%)",
                border: "3px solid rgba(255,182,193,0.5)",
                boxShadow: "0 10px 32px rgba(255,182,193,0.3), inset 0 -4px 10px rgba(255,182,193,0.12)",
                animation: "bubbleFloat3 8s ease-in-out infinite",
                animationDelay: "1.6s",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "24px",
                zIndex: 10,
                marginLeft: "-20px",
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E07B8A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "8px", flexShrink: 0 }}>
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <h3 className="font-rounded font-bold text-sm mb-1.5" style={{ color: "#3D2A1A", lineHeight: 1.3 }}>地域とつながる</h3>
              <p className="text-xs leading-relaxed" style={{ color: "#7A4A52" }}>島の伝統行事や地域の方との交流を通じ、奄美への愛着と感謝の心を育てます。</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Wave Divider: About → Schedule ===== */}
      <div style={{ backgroundColor: "#F0FAF4", marginTop: "-2px", position: "relative" }}>
        <svg viewBox="0 0 1440 72" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%" }}>
          <path d="M0,24 C180,72 360,4 540,36 C720,68 900,12 1080,40 C1260,68 1380,18 1440,36 L1440,72 L0,72 Z" fill="#FFF8F0" />
          <path d="M0,24 C180,72 360,4 540,36 C720,68 900,12 1080,40 C1260,68 1380,18 1440,36" stroke="#A8DFC4" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.5"/>
          {/* Small flower dots on wave crests */}
          <circle cx="180" cy="62" r="5" fill="#7EC8A0" opacity="0.5"/>
          <circle cx="178" cy="62" r="3" fill="#FFF8F0"/>
          <circle cx="540" cy="28" r="5" fill="#F9C87A" opacity="0.55"/>
          <circle cx="540" cy="28" r="3" fill="#FFF8F0"/>
          <circle cx="900" cy="14" r="5" fill="#FFB6C1" opacity="0.5"/>
          <circle cx="900" cy="14" r="3" fill="#FFF8F0"/>
          <circle cx="1260" cy="58" r="5" fill="#7EC8A0" opacity="0.5"/>
          <circle cx="1260" cy="58" r="3" fill="#FFF8F0"/>
          {/* Tiny floating stars near wave */}
          <g className="wave-cloud" transform="translate(720, 58)">
            <path d="M8 0 L9.8 5.9 L16 5.9 L11 9.1 L12.9 15 L8 11.8 L3.1 15 L5 9.1 L0 5.9 L6.2 5.9 Z" fill="#FFD700" opacity="0.5"/>
          </g>
          <g className="wave-cloud" transform="translate(1100, 34)">
            <path d="M7 0 L8.5 5.2 L14 5.2 L9.6 8 L11.3 13 L7 10.3 L2.7 13 L4.4 8 L0 5.2 L5.5 5.2 Z" fill="#FFB6C1" opacity="0.55"/>
          </g>
        </svg>
      </div>

      {/* ===== Daily Schedule / 一日の流れ ===== */}
      <section id="schedule" className="py-20 px-4" style={{ backgroundColor: "#F0FAF4" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-medium tracking-widest uppercase" style={{ color: "#7EC8A0" }}>Daily Schedule</span>
            <h2 className="font-rounded font-bold text-3xl md:text-4xl mt-2" style={{ color: "#3D2A1A" }}>
              一日の流れ
            </h2>
            <div className="mt-4 mx-auto w-12 h-1 rounded-full" style={{ backgroundColor: "#7EC8A0" }} />
          </div>

          {/* ===== B: おさんぽマップ — Walk Map ===== */}
          <div
            ref={walkMapRef}
            style={{ marginBottom: "48px", position: "relative" }}
          >
            <p className="font-rounded text-center text-xs font-medium tracking-widest mb-6" style={{ color: "#7EC8A0" }}>
              おさんぽマップ
            </p>
            <div style={{ position: "relative", width: "100%", overflowX: "auto" }}>
              <svg
                viewBox="0 0 860 240"
                width="100%"
                style={{ display: "block", minWidth: "340px" }}
                aria-hidden="true"
              >
                {/* Background sky gradient fill */}
                <defs>
                  <linearGradient id="pathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%"   stopColor="#FFD700" stopOpacity="0.9"/>
                    <stop offset="45%"  stopColor="#FF8C00" stopOpacity="0.9"/>
                    <stop offset="100%" stopColor="#87CEEB" stopOpacity="0.9"/>
                  </linearGradient>
                  <marker id="foot" markerWidth="12" markerHeight="12" refX="6" refY="6" orient="auto">
                    <ellipse cx="6" cy="6" rx="4" ry="3" fill="#FF8C00" opacity="0.6"/>
                  </marker>
                </defs>

                {/* The winding path — drawn via scroll progress */}
                {(() => {
                  const fullPath = "M 30 140 C 80 100 130 180 200 140 C 270 100 320 170 400 140 C 480 110 520 180 600 145 C 665 120 710 175 780 150 C 810 140 835 135 850 130";
                  // Total approximate length for the dasharray
                  const totalLen = 920;
                  const drawn = totalLen * walkPathProgress;
                  return (
                    <>
                      {/* Shadow / ghost path */}
                      <path
                        d={fullPath}
                        fill="none"
                        stroke="rgba(200,200,200,0.25)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray="8 12"
                      />
                      {/* Animated gradient path */}
                      <path
                        d={fullPath}
                        fill="none"
                        stroke="url(#pathGrad)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${drawn} ${totalLen}`}
                        strokeDashoffset="0"
                      />
                      {/* Dotted overlay for texture */}
                      <path
                        d={fullPath}
                        fill="none"
                        stroke="rgba(255,255,255,0.55)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray="1 16"
                        strokeDashoffset="0"
                        style={{ clipPath: `inset(0 ${100 - walkPathProgress * 100}% 0 0)` }}
                      />
                    </>
                  );
                })()}

                {/* Footprint pairs along path */}
                {[
                  { x: 70,  y: 120 },
                  { x: 150, y: 160 },
                  { x: 245, y: 115 },
                  { x: 340, y: 165 },
                  { x: 450, y: 120 },
                  { x: 555, y: 160 },
                  { x: 650, y: 130 },
                  { x: 745, y: 160 },
                ].map((fp, i) => {
                  const threshold = (i + 1) / 9;
                  const visible = walkPathProgress >= threshold;
                  return (
                    <g key={i} style={{ opacity: visible ? 1 : 0, transition: "opacity 0.4s ease" }}>
                      {/* Left foot */}
                      <ellipse cx={fp.x - 5} cy={fp.y} rx="5" ry="7" fill="#FF8C00" opacity="0.55" transform={`rotate(-15, ${fp.x - 5}, ${fp.y})`}/>
                      <ellipse cx={fp.x - 4} cy={fp.y - 8} rx="2.5" ry="2" fill="#FF8C00" opacity="0.45"/>
                      <ellipse cx={fp.x - 1} cy={fp.y - 10} rx="2" ry="1.5" fill="#FF8C00" opacity="0.4"/>
                      <ellipse cx={fp.x + 2} cy={fp.y - 10} rx="2" ry="1.5" fill="#FF8C00" opacity="0.4"/>
                      {/* Right foot */}
                      <ellipse cx={fp.x + 10} cy={fp.y - 4} rx="5" ry="7" fill="#FF8C00" opacity="0.55" transform={`rotate(15, ${fp.x + 10}, ${fp.y - 4})`}/>
                      <ellipse cx={fp.x + 9}  cy={fp.y - 12} rx="2.5" ry="2" fill="#FF8C00" opacity="0.45"/>
                      <ellipse cx={fp.x + 12} cy={fp.y - 14} rx="2" ry="1.5" fill="#FF8C00" opacity="0.4"/>
                      <ellipse cx={fp.x + 15} cy={fp.y - 14} rx="2" ry="1.5" fill="#FF8C00" opacity="0.4"/>
                    </g>
                  );
                })}

                {/* Stop points along the path */}
                {[
                  {
                    x: 30,  y: 140, cx: 30,  cy: 90,
                    label: "登園", time: "7:00",
                    color: "#FF6B6B",
                    icon: (
                      /* Sun icon */
                      <g>
                        <circle cx="0" cy="0" r="9" fill="#FF6B6B"/>
                        <circle cx="0" cy="0" r="5" fill="#FFD700"/>
                        {[0,60,120,180,240,300].map((d,i)=>{
                          const rd=Math.PI*d/180;
                          return <line key={i} x1={Math.cos(rd)*6.5} y1={Math.sin(rd)*6.5} x2={Math.cos(rd)*10} y2={Math.sin(rd)*10} stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round"/>;
                        })}
                      </g>
                    ),
                    threshold: 0,
                  },
                  {
                    x: 200, y: 140, cx: 200, cy: 105,
                    label: "朝の会", time: "9:00",
                    color: "#FFA500",
                    icon: (
                      <g>
                        <circle cx="0" cy="0" r="9" fill="#FFA500"/>
                        <path d="M-5 2 L-2 -3 L0 0 L2 -3 L5 2 Z" fill="#FFF8F0" opacity="0.9"/>
                      </g>
                    ),
                    threshold: 0.22,
                  },
                  {
                    x: 400, y: 140, cx: 400, cy: 95,
                    label: "設定保育", time: "10:30",
                    color: "#FFD700",
                    icon: (
                      <g>
                        <circle cx="0" cy="0" r="9" fill="#FFD700"/>
                        <path d="M-4 3 L-1 -4 L0 -2 L1 -4 L4 3 Z" fill="#8B4513" opacity="0.85"/>
                      </g>
                    ),
                    threshold: 0.44,
                  },
                  {
                    x: 600, y: 145, cx: 600, cy: 110,
                    label: "給食・午睡", time: "12:00",
                    color: "#7EC8A0",
                    icon: (
                      <g>
                        <circle cx="0" cy="0" r="9" fill="#7EC8A0"/>
                        <circle cx="0" cy="0" r="5" fill="#FFF8F0" opacity="0.8"/>
                        <circle cx="-2" cy="-1" r="1.2" fill="#7EC8A0"/>
                        <circle cx="1" cy="2" r="1" fill="#7EC8A0"/>
                      </g>
                    ),
                    threshold: 0.66,
                  },
                  {
                    x: 780, y: 150, cx: 780, cy: 115,
                    label: "おやつ・降園", time: "15:00〜",
                    color: "#87CEEB",
                    icon: (
                      <g>
                        <circle cx="0" cy="0" r="9" fill="#87CEEB"/>
                        <path d="M -6 3 Q 0 -6 6 3 Z" fill="#FFF8F0" opacity="0.85"/>
                      </g>
                    ),
                    threshold: 0.88,
                  },
                ].map((stop, si) => {
                  const active = walkPathProgress >= stop.threshold;
                  return (
                    <g key={si} style={{ opacity: active ? 1 : 0, transform: active ? "none" : "scale(0.4)", transformOrigin: `${stop.cx}px ${stop.cy}px`, transition: "opacity 0.5s ease, transform 0.5s cubic-bezier(0.22,1,0.36,1)" }}>
                      {/* Connector line from path to label */}
                      <line
                        x1={stop.x} y1={stop.y - 9}
                        x2={stop.cx} y2={stop.cy + 22}
                        stroke={stop.color} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6"
                      />
                      {/* Icon */}
                      <g transform={`translate(${stop.cx}, ${stop.cy + 10})`}>
                        {stop.icon}
                      </g>
                      {/* Label pill */}
                      <rect x={stop.cx - 28} y={stop.cy - 6} width="56" height="20" rx="10" fill={stop.color} opacity="0.15"/>
                      <text x={stop.cx} y={stop.cy + 7} textAnchor="middle" fontSize="8" fontWeight="700" fill={stop.color} fontFamily="var(--font-mplus-rounded), sans-serif">
                        {stop.label}
                      </text>
                      <text x={stop.cx} y={stop.cy - 9} textAnchor="middle" fontSize="7.5" fill={stop.color} fontFamily="var(--font-mplus-rounded), sans-serif" opacity="0.8">
                        {stop.time}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
            <p className="text-center text-xs mt-2" style={{ color: "#A0917F" }}>
              スクロールするとみちがひらきます
            </p>
          </div>

          <div className="relative pl-8" ref={timelineRef}>
            {/* Animated vertical rainbow gradient line */}
            <div
              className="absolute left-0 top-0 rounded-full"
              style={{
                width: "4px",
                height: "100%",
                background: "linear-gradient(to bottom, #FF6B6B 0%, #FFA500 18%, #FFD700 36%, #7EC8A0 54%, #87CEEB 72%, #B39DDB 90%)",
                transformOrigin: "top center",
                transform: visibleSections["timelineLine"] ? "scaleY(1)" : "scaleY(0)",
                transition: "transform 1.8s cubic-bezier(0.22,1,0.36,1)",
                boxShadow: "0 0 8px rgba(245,158,66,0.25)",
              }}
            />
            {[
              {
                time: "7:00", label: "開園・順次登園",
                desc: "保護者の方からお子さまをお預かりします。体温・体調確認を行います。",
                dotColor: "#FF6B6B",
                iconClass: "tl-icon-sun",
                icon: (
                  /* Sun icon */
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFF8F0" strokeWidth="2.2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="4" fill="#FFF8F0" stroke="none"/>
                    <line x1="12" y1="2" x2="12" y2="5"/>
                    <line x1="12" y1="19" x2="12" y2="22"/>
                    <line x1="2" y1="12" x2="5" y2="12"/>
                    <line x1="19" y1="12" x2="22" y2="12"/>
                    <line x1="4.9" y1="4.9" x2="7" y2="7"/>
                    <line x1="17" y1="17" x2="19.1" y2="19.1"/>
                    <line x1="4.9" y1="19.1" x2="7" y2="17"/>
                    <line x1="17" y1="7" x2="19.1" y2="4.9"/>
                  </svg>
                ),
              },
              {
                time: "9:00", label: "朝の会・自由遊び",
                desc: "みんなで朝のあいさつ。その後は室内・園庭での自由遊びを楽しみます。",
                dotColor: "#FFA500",
                iconClass: "tl-icon-star",
                icon: (
                  /* Star */
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="#FFF8F0">
                    <path d="M10 1 L12.2 7.2 L18.8 7.2 L13.4 11.4 L15.6 17.6 L10 13.4 L4.4 17.6 L6.6 11.4 L1.2 7.2 L7.8 7.2 Z"/>
                  </svg>
                ),
              },
              {
                time: "10:30", label: "設定保育",
                desc: "年齢に合わせた製作・音楽・体操などの活動を行います。",
                dotColor: "#FFD700",
                iconClass: "tl-icon-pencil",
                icon: (
                  /* Crayon/pencil */
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFF8F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 3a2.83 2.83 0 0 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
                  </svg>
                ),
              },
              {
                time: "12:00", label: "給食",
                desc: "地元食材を使った手作り給食。0〜2歳児は離乳食・幼児食に対応します。",
                dotColor: "#7EC8A0",
                iconClass: "tl-icon-plate",
                icon: (
                  /* Plate + fork */
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#FFF8F0" strokeWidth="2.2" strokeLinecap="round">
                    <circle cx="11" cy="13" r="6"/>
                    <path d="M11 7V2"/>
                    <path d="M19 2v4a2 2 0 0 1-2 2h-1"/>
                  </svg>
                ),
              },
              {
                time: "13:00", label: "午睡（お昼寝）",
                desc: "SIDS防止のため、0〜2歳児は5分おきに呼吸確認を行っています。",
                dotColor: "#87CEEB",
                iconClass: "tl-icon-moon",
                icon: (
                  /* Moon */
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFF8F0" stroke="#FFF8F0" strokeWidth="1">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                  </svg>
                ),
              },
              {
                time: "15:00", label: "おやつ・自由遊び",
                desc: "手作りおやつの後は、室内・園庭で好きな遊びを楽しみます。",
                dotColor: "#F9C87A",
                iconClass: "tl-icon-cookie",
                icon: (
                  /* Cookie / snack */
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#FFF8F0" strokeWidth="2.2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="9"/>
                    <circle cx="9" cy="10" r="1.2" fill="#FFF8F0"/>
                    <circle cx="14" cy="14" r="1.2" fill="#FFF8F0"/>
                    <circle cx="12" cy="8" r="0.8" fill="#FFF8F0"/>
                  </svg>
                ),
              },
              {
                time: "16:00", label: "順次降園",
                desc: "保護者の方へお渡しします。今日の様子を口頭でお伝えします。",
                dotColor: "#FFB6C1",
                iconClass: "tl-icon-house",
                icon: (
                  /* House */
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#FFF8F0" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
                    <path d="M9 21V12h6v9"/>
                  </svg>
                ),
              },
              {
                time: "19:00", label: "閉園（延長保育終了）",
                desc: "延長保育をご利用の場合は19:00まで対応しています。",
                dotColor: "#B39DDB",
                iconClass: "tl-icon-moon2",
                icon: (
                  /* Moon + stars */
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#FFF8F0" strokeWidth="2" strokeLinecap="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="#FFF8F0" stroke="none" opacity="0.9"/>
                    <circle cx="19" cy="4" r="1" fill="#FFF8F0"/>
                    <circle cx="22" cy="7" r="0.8" fill="#FFF8F0"/>
                  </svg>
                ),
              },
            ].map((item, i) => (
              <div
                key={i}
                className="relative mb-8 pl-8"
                style={{
                  opacity: visibleSections[`timeline_${i}`] ? 1 : 0,
                  transform: visibleSections[`timeline_${i}`] ? "translateX(0)" : "translateX(-20px)",
                  transition: "opacity 0.4s ease, transform 0.4s ease",
                }}
              >
                {/* Icon dot — bigger with recognizable animated icon */}
                <div
                  className="absolute left-0 top-1 w-9 h-9 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: item.dotColor,
                    transform: "translateX(-50%)",
                    boxShadow: `0 0 0 4px ${item.dotColor}30, 0 2px 8px ${item.dotColor}60`,
                    border: "2px solid white",
                  }}
                >
                  <span className={item.iconClass} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {item.icon}
                  </span>
                </div>
                <div
                  className="rounded-2xl p-5"
                  style={{ backgroundColor: "#FFFFFF", boxShadow: "0 2px 12px rgba(126,200,160,0.12)", borderLeft: `3px solid ${item.dotColor}40` }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-rounded font-bold text-lg" style={{ color: item.dotColor }}>{item.time}</span>
                    <span className="font-rounded font-bold" style={{ color: "#3D2A1A" }}>{item.label}</span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#6B5744" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Wave Divider: Schedule → Facilities ===== */}
      <div style={{ backgroundColor: "#FFF8F0", marginTop: "-2px", position: "relative" }}>
        <svg viewBox="0 0 1440 76" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%" }}>
          <path d="M0,38 C320,76 640,4 960,38 C1120,56 1300,20 1440,28 L1440,76 L0,76 Z" fill="#F0FAF4" />
          <path d="M0,38 C320,76 640,4 960,38 C1120,56 1300,20 1440,28" stroke="#F9C87A" strokeWidth="3.5" fill="none" strokeLinecap="round" opacity="0.4"/>
          {/* Rolling hills with tiny flowers */}
          <g className="wave-cloud" transform="translate(300, 64)">
            <ellipse cx="6" cy="0" rx="3" ry="7" fill="#7EC8A0" opacity="0.55"/>
            <ellipse cx="6" cy="-7" rx="5" ry="4" fill="#FFB6C1" opacity="0.6"/>
          </g>
          <g className="wave-cloud" transform="translate(640, 6)">
            <ellipse cx="6" cy="0" rx="3" ry="7" fill="#7EC8A0" opacity="0.55"/>
            <ellipse cx="6" cy="-7" rx="5" ry="4" fill="#F9C87A" opacity="0.6"/>
          </g>
          <g className="wave-cloud" transform="translate(960, 34)">
            <ellipse cx="6" cy="0" rx="3" ry="7" fill="#7EC8A0" opacity="0.55"/>
            <ellipse cx="6" cy="-7" rx="5" ry="4" fill="#FFB6C1" opacity="0.6"/>
          </g>
          <g className="wave-cloud" transform="translate(1200, 18)">
            <ellipse cx="6" cy="0" rx="3" ry="7" fill="#7EC8A0" opacity="0.55"/>
            <ellipse cx="6" cy="-7" rx="5" ry="4" fill="#F9C87A" opacity="0.6"/>
          </g>
        </svg>
      </div>

      {/* ===== Facilities / 園の紹介 ===== */}
      <section id="facilities" className="py-20 px-4 paper-texture" style={{ backgroundColor: "#FFF8F0" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-medium tracking-widest uppercase" style={{ color: "#F59E42" }}>Facilities</span>
            <h2 className="font-rounded font-bold text-3xl md:text-4xl mt-2" style={{ color: "#3D2A1A" }}>
              園の紹介
            </h2>
            <div className="mt-4 mx-auto w-12 h-1 rounded-full" style={{ backgroundColor: "#F59E42" }} />
            <p className="mt-4 text-sm" style={{ color: "#6B5744" }}>子どもたちが安全に、楽しく過ごせる環境を整えています。</p>
          </div>

          {/* Scattered organic layout — like photos spread on a table */}
          <div className="facility-container relative md:block flex flex-col" ref={facilityRef} style={{ minHeight: "680px" }}>
            {[
              {
                src: "/images/demo/nursery/facility-classroom.jpg",
                alt: "保育室",
                label: "明るい保育室",
                desc: "木のぬくもりを大切にした、明るく広い保育室。",
                rotate: "-2deg",
                pos: { top: "0%", left: "0%" },
                size: { w: "340px", h: "240px" },
                zIndex: 3,
              },
              {
                src: "/images/demo/nursery/facility-playground.jpg",
                alt: "園庭",
                label: "広々した園庭",
                desc: "思い切り走り回れる広い園庭。砂場・滑り台も完備。",
                rotate: "1.5deg",
                pos: { top: "0%", left: "34%" },
                size: { w: "300px", h: "210px" },
                zIndex: 2,
              },
              {
                src: "/images/demo/nursery/facility-kitchen.jpg",
                alt: "給食室",
                label: "手作り給食室",
                desc: "栄養士が毎日、地元の旬の食材で手作りしています。",
                rotate: "3deg",
                pos: { top: "2%", left: "64%" },
                size: { w: "310px", h: "220px" },
                zIndex: 3,
              },
              {
                src: "/images/demo/nursery/facility-reading.jpg",
                alt: "絵本コーナー",
                label: "絵本コーナー",
                desc: "500冊以上の絵本を揃えた、落ち着いた読書スペース。",
                rotate: "-1.5deg",
                pos: { top: "46%", left: "5%" },
                size: { w: "280px", h: "200px" },
                zIndex: 4,
              },
              {
                src: "/images/demo/nursery/facility-nap-room.jpg",
                alt: "お昼寝室",
                label: "安全なお昼寝室",
                desc: "換気・温度管理を徹底し、安心して眠れる環境です。",
                rotate: "2.5deg",
                pos: { top: "44%", left: "36%" },
                size: { w: "320px", h: "220px" },
                zIndex: 2,
              },
              {
                src: "/images/demo/nursery/facility-garden.jpg",
                alt: "菜園",
                label: "みんなの菜園",
                desc: "子どもたちが野菜を育て、収穫し、食卓へ。食育の場です。",
                rotate: "-2.5deg",
                pos: { top: "48%", left: "67%" },
                size: { w: "290px", h: "210px" },
                zIndex: 3,
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`facility-card absolute rounded-2xl overflow-hidden${visibleSections[`facility_${i}`] ? " facility-pop-in" : ""}`}
                style={{
                  top: item.pos.top,
                  left: item.pos.left,
                  width: item.size.w,
                  maxWidth: "90vw",
                  zIndex: item.zIndex,
                  transform: `rotate(${item.rotate})`,
                  boxShadow: "0 6px 24px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.07)",
                  opacity: visibleSections[`facility_${i}`] ? 1 : 0,
                  animationDelay: `${i * 0.13}s`,
                }}
              >
                <div className="relative overflow-hidden" style={{ height: item.size.h }}>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-500 scale-[1.02] hover:scale-[1.08]"
                    width={600}
                    height={400}
                  />
                </div>
                <div className="p-4" style={{ backgroundColor: "#FFFFFF" }}>
                  <h3 className="font-rounded font-bold text-sm mb-1" style={{ color: "#3D2A1A" }}>{item.label}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "#6B5744" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Spacer for the scattered absolute layout — desktop only */}
          <div className="hidden md:block" style={{ height: "100px" }} />
        </div>
      </section>

      {/* ===== Wave Divider: Facilities → Staff ===== */}
      <div style={{ backgroundColor: "#F0FAF4", marginTop: "-2px", position: "relative" }}>
        <svg viewBox="0 0 1440 68" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%" }}>
          <path d="M0,22 C200,62 440,4 700,34 C900,60 1160,10 1440,24 L1440,68 L0,68 Z" fill="#FFF8F0" />
          <path d="M0,22 C200,62 440,4 700,34 C900,60 1160,10 1440,24" stroke="#A8DFC4" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.45"/>
          {/* Small cloud puffs resting on the wave */}
          <g className="wave-cloud" transform="translate(420, 6)">
            <ellipse cx="16" cy="11" rx="14" ry="6" fill="#F0FAF4"/>
            <ellipse cx="10" cy="8" rx="8" ry="7" fill="#F0FAF4"/>
            <ellipse cx="21" cy="7" rx="9" ry="8" fill="#F0FAF4"/>
            <ellipse cx="16" cy="6" rx="6" ry="6" fill="#F0FAF4"/>
          </g>
          <g className="wave-cloud" transform="translate(820, 28)">
            <ellipse cx="18" cy="13" rx="16" ry="7" fill="#F0FAF4"/>
            <ellipse cx="11" cy="9" rx="9" ry="8" fill="#F0FAF4"/>
            <ellipse cx="24" cy="8" rx="10" ry="9" fill="#F0FAF4"/>
            <ellipse cx="18" cy="6" rx="7" ry="7" fill="#F0FAF4"/>
          </g>
          <g className="wave-cloud" transform="translate(1150, 8)">
            <ellipse cx="14" cy="10" rx="12" ry="5" fill="#F0FAF4"/>
            <ellipse cx="9" cy="7" rx="7" ry="6" fill="#F0FAF4"/>
            <ellipse cx="19" cy="7" rx="8" ry="7" fill="#F0FAF4"/>
            <ellipse cx="14" cy="5" rx="5" ry="5" fill="#F0FAF4"/>
          </g>
        </svg>
      </div>

      {/* ===== Staff / 先生紹介 ===== */}
      <section id="staff" className="py-20 px-4" style={{ backgroundColor: "#F0FAF4" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14" style={{ position: "relative" }}>
            {/* Crayon/pencil decoration — left of heading */}
            <div style={{ position: "absolute", left: "clamp(10px, 8%, 120px)", top: "0px", opacity: 0.7 }}>
              <svg width="28" height="80" viewBox="0 0 28 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="staff-decor">
                {/* Pencil body */}
                <rect x="9" y="14" width="10" height="46" rx="2" fill="#FFD700"/>
                <rect x="9" y="14" width="10" height="46" rx="2" stroke="#e8b800" strokeWidth="1"/>
                {/* Pencil tip */}
                <path d="M9 60 L14 74 L19 60 Z" fill="#F4C6A0"/>
                <path d="M12 62 L14 70 L16 62 Z" fill="#333"/>
                {/* Eraser */}
                <rect x="9" y="8" width="10" height="8" rx="1" fill="#FFB6C1"/>
                <rect x="9" y="13" width="10" height="2" fill="#e8a0b0"/>
                {/* Metal band */}
                <rect x="9" y="11" width="10" height="3" rx="0" fill="#ccc"/>
                {/* Pencil lines */}
                <line x1="14" y1="14" x2="14" y2="60" stroke="#e8b800" strokeWidth="1" opacity="0.4"/>
              </svg>
            </div>
            {/* Stars scattered near heading */}
            <div style={{ position: "absolute", right: "clamp(10px, 8%, 120px)", top: "4px", opacity: 0.65 }}>
              <svg width="60" height="32" viewBox="0 0 60 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="wave-cloud">
                <path d="M10 0 L12.4 7.6 L20 7.6 L14 12.4 L16.4 20 L10 15.2 L3.6 20 L6 12.4 L0 7.6 L7.6 7.6 Z" fill="#F59E42"/>
                <path d="M42 2 L43.8 7.6 L49.6 7.6 L45 11 L46.8 16.6 L42 13.2 L37.2 16.6 L39 11 L34.4 7.6 L40.2 7.6 Z" fill="#FFB6C1"/>
                <path d="M56 0 L57.2 3.8 L61 3.8 L58 5.8 L59.2 9.6 L56 7.6 L52.8 9.6 L54 5.8 L51 3.8 L54.8 3.8 Z" fill="#7EC8A0" transform="scale(0.7) translate(14,2)"/>
              </svg>
            </div>
            {/* Heart decorations near heading */}
            <div style={{ position: "absolute", right: "clamp(60px, 14%, 180px)", top: "28px", opacity: 0.55 }}>
              <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="staff-decor" style={{ animationDelay: "1.5s" }}>
                <path d="M11 18 C11 18 1 12 1 5.5 C1 3 3 1 5.5 1 C7.5 1 9.5 2.5 11 4 C12.5 2.5 14.5 1 16.5 1 C19 1 21 3 21 5.5 C21 12 11 18 11 18Z" fill="#FFB6C1"/>
              </svg>
            </div>
            <span className="text-xs font-medium tracking-widest uppercase" style={{ color: "#7EC8A0" }}>Our Staff</span>
            <h2 className="font-rounded font-bold text-3xl md:text-4xl mt-2" style={{ color: "#3D2A1A" }}>
              先生紹介
            </h2>
            <div className="mt-4 mx-auto w-12 h-1 rounded-full" style={{ backgroundColor: "#7EC8A0" }} />
          </div>

          {/* Scattered photo style — like photos pinned to a corkboard */}
          <div className="flex flex-col md:flex-row justify-center items-end gap-2 md:gap-0 md:items-start" ref={staffRef} style={{ paddingBottom: "16px", paddingTop: "8px" }}>
            {[
              {
                src: "/images/demo/nursery/staff-yamada.jpg",
                name: "山田 恵子 先生",
                role: "園長 / 保育士歴20年",
                msg: "子どもたちの「なんで?」という目の輝きが大好きです。一人ひとりの個性を大切に、のびのびと育てていきます。",
                rotate: "-3deg",
                translateY: "20px",
                zIndex: 2,
                accentColor: "#F59E42",
              },
              {
                src: "/images/demo/nursery/staff-tanaka.jpg",
                name: "田中 美穂 先生",
                role: "主任保育士 / 保育士歴12年",
                msg: "子どもたちの笑顔が私の原動力。安心してお預けいただけるよう、毎日丁寧に関わっています。",
                rotate: "1deg",
                translateY: "0px",
                zIndex: 3,
                accentColor: "#7EC8A0",
              },
              {
                src: "/images/demo/nursery/staff-maeda.jpg",
                name: "前田 葵 先生",
                role: "保育士 / 保育士歴4年",
                msg: "子どもたちと一緒に成長できる毎日がうれしい。元気いっぱい、一緒に遊びましょう！",
                rotate: "2.5deg",
                translateY: "12px",
                zIndex: 2,
                accentColor: "#FFB6C1",
              },
            ].map((staff, i) => (
              <div
                key={i}
                className={`staff-card rounded-2xl overflow-hidden text-center flex-shrink-0 w-full md:w-72${visibleSections[`staff_${i}`] ? " staff-bounce-in" : ""}`}
                style={{
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0 6px 24px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
                  opacity: visibleSections[`staff_${i}`] ? 1 : 0,
                  animationDelay: `${i * 0.2}s`,
                  transform: `rotate(${staff.rotate}) translateY(${staff.translateY})`,
                  zIndex: staff.zIndex,
                  position: "relative",
                  marginLeft: i > 0 ? "-16px" : "0",
                  // On mobile, remove overlap
                }}
              >
                {/* Colored tape strip at top */}
                <div style={{ height: "6px", backgroundColor: staff.accentColor, opacity: 0.7 }} />
                <div className="relative overflow-hidden" style={{ height: "220px" }}>
                  <Image
                    src={staff.src}
                    alt={staff.name}
                    className="w-full h-full object-cover object-top"
                    width={400}
                    height={400}
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 55%, rgba(0,0,0,0.18) 100%)" }} />
                </div>
                <div className="p-6">
                  <h3 className="font-rounded font-bold text-lg mb-1" style={{ color: "#3D2A1A" }}>{staff.name}</h3>
                  <p className="text-xs font-medium mb-3" style={{ color: staff.accentColor }}>{staff.role}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "#6B5744" }}>{staff.msg}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Wave Divider: Staff → Enrollment ===== */}
      <div style={{ backgroundColor: "#FFF8F0", marginTop: "-2px", position: "relative" }}>
        <svg viewBox="0 0 1440 72" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%" }}>
          <path d="M0,36 C360,72 720,4 1080,36 C1200,50 1340,22 1440,30 L1440,72 L0,72 Z" fill="#F0FAF4" />
          <path d="M0,36 C360,72 720,4 1080,36 C1200,50 1340,22 1440,30" stroke="#F9C87A" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.4"/>
          {/* Little stars scattered across wave */}
          <g className="wave-cloud" transform="translate(200, 58)">
            <path d="M7 0 L8.5 5.2 L14 5.2 L9.6 8 L11.3 13 L7 10.3 L2.7 13 L4.4 8 L0 5.2 L5.5 5.2 Z" fill="#F9C87A" opacity="0.6"/>
          </g>
          <g className="wave-cloud" transform="translate(560, 8)">
            <path d="M8 0 L9.8 5.9 L16 5.9 L11 9.1 L12.9 15 L8 11.8 L3.1 15 L5 9.1 L0 5.9 L6.2 5.9 Z" fill="#FFB6C1" opacity="0.6"/>
          </g>
          <g className="wave-cloud" transform="translate(920, 54)">
            <path d="M7 0 L8.5 5.2 L14 5.2 L9.6 8 L11.3 13 L7 10.3 L2.7 13 L4.4 8 L0 5.2 L5.5 5.2 Z" fill="#7EC8A0" opacity="0.6"/>
          </g>
          <g className="wave-cloud" transform="translate(1250, 24)">
            <path d="M8 0 L9.8 5.9 L16 5.9 L11 9.1 L12.9 15 L8 11.8 L3.1 15 L5 9.1 L0 5.9 L6.2 5.9 Z" fill="#F9C87A" opacity="0.6"/>
          </g>
        </svg>
      </div>

      {/* ===== Enrollment Info / 入園案内 ===== */}
      <section id="enrollment" className="py-20 px-4 paper-texture" style={{ backgroundColor: "#FFF8F0" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-medium tracking-widest uppercase" style={{ color: "#F59E42" }}>Enrollment</span>
            <h2 className="font-rounded font-bold text-3xl md:text-4xl mt-2" style={{ color: "#3D2A1A" }}>
              入園案内
            </h2>
            <div className="mt-4 mx-auto w-12 h-1 rounded-full" style={{ backgroundColor: "#F59E42" }} />

            {/* Building blocks stats — toy blocks with letters, 3D depth, bright colors */}
            <div ref={enrollmentRef} className="mt-10 flex justify-center gap-10 md:gap-20 flex-wrap items-end">
              {[
                {
                  label: "定員",
                  value: "75",
                  unit: "名",
                  topColor: "#F59E42",
                  topDark: "#d4862e",
                  letter: "A",
                  blocks: [
                    { color: "#F9C87A", dark: "#e8a840", h: "22px", letter: "B" },
                    { color: "#F59E42", dark: "#d4862e", h: "26px", letter: "C" },
                    { color: "#FBDFA3", dark: "#e5c060", h: "20px", letter: "D" },
                    { color: "#F9C87A", dark: "#e8a840", h: "22px", letter: "E" },
                  ],
                },
                {
                  label: "クラス数",
                  value: "6",
                  unit: "クラス",
                  topColor: "#7EC8A0",
                  topDark: "#5aae82",
                  letter: "F",
                  blocks: [
                    { color: "#A8DFC4", dark: "#7ec8a0", h: "22px", letter: "G" },
                    { color: "#7EC8A0", dark: "#5aae82", h: "26px", letter: "H" },
                    { color: "#C8EDDA", dark: "#a8dfc4", h: "20px", letter: "I" },
                  ],
                },
                {
                  label: "最長保育士歴",
                  value: "20",
                  unit: "年",
                  topColor: "#FFB6C1",
                  topDark: "#e08090",
                  letter: "J",
                  blocks: [
                    { color: "#FFCFE0", dark: "#ffb6c1", h: "20px", letter: "K" },
                    { color: "#FFB6C1", dark: "#e08090", h: "24px", letter: "L" },
                    { color: "#FFD6E4", dark: "#ffcfe0", h: "20px", letter: "M" },
                    { color: "#FFB6C1", dark: "#e08090", h: "24px", letter: "N" },
                    { color: "#FFCFE0", dark: "#ffb6c1", h: "20px", letter: "O" },
                  ],
                },
              ].map((stat, si) => (
                <div key={si} className="flex flex-col items-center">
                  {/* Stacked toy blocks with letter faces and 3D shadow */}
                  <div className="flex flex-col-reverse items-center gap-1 mb-2" style={{ width: "80px" }}>
                    {stat.blocks.map((block, bi) => (
                      <div
                        key={bi}
                        style={{
                          width: bi % 2 === 0 ? "76px" : "66px",
                          height: block.h,
                          backgroundColor: block.color,
                          borderRadius: "8px",
                          /* 3D depth: bottom-right shadow simulates a real block */
                          boxShadow: `3px 3px 0px ${block.dark}, 0 4px 10px ${block.color}99`,
                          border: `2px solid ${block.dark}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          opacity: visibleSections["blocks"] ? 1 : 0,
                          animation: visibleSections["blocks"]
                            ? `blockStack 0.55s cubic-bezier(0.22,1,0.36,1) both`
                            : "none",
                          animationDelay: visibleSections["blocks"]
                            ? `${si * 0.15 + bi * 0.1}s`
                            : "0s",
                          position: "relative",
                        }}
                      >
                        <span style={{ fontSize: "10px", fontWeight: "800", color: block.dark, fontFamily: "var(--font-mplus-rounded), sans-serif", opacity: 0.8 }}>{block.letter}</span>
                      </div>
                    ))}
                    {/* Top label block — bigger and more prominent */}
                    <div
                      style={{
                        width: "80px",
                        padding: "8px 4px",
                        backgroundColor: stat.topColor,
                        borderRadius: "12px",
                        textAlign: "center",
                        /* 3D depth */
                        boxShadow: `4px 4px 0px ${stat.topDark}, 0 6px 16px ${stat.topColor}88`,
                        border: `2px solid ${stat.topDark}`,
                        opacity: visibleSections["blocks"] ? 1 : 0,
                        animation: visibleSections["blocks"]
                          ? `blockTopBounce 0.6s cubic-bezier(0.22,1,0.36,1) both`
                          : "none",
                        animationDelay: visibleSections["blocks"]
                          ? `${si * 0.15 + stat.blocks.length * 0.1}s`
                          : "0s",
                        position: "relative",
                      }}
                    >
                      {/* Letter on block face */}
                      <div style={{ position: "absolute", top: "3px", left: "5px", fontSize: "9px", fontWeight: "800", color: stat.topDark, opacity: 0.7, fontFamily: "var(--font-mplus-rounded), sans-serif" }}>{stat.letter}</div>
                      <span className="font-rounded font-bold" style={{ fontSize: "1.6rem", color: "#3D2A1A", lineHeight: 1 }}>
                        {stat.value}
                      </span>
                      <span className="text-xs ml-0.5 font-medium" style={{ color: "#3D2A1A" }}>{stat.unit}</span>
                    </div>
                  </div>
                  <p className="text-xs font-medium" style={{ color: "#6B5744" }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {/* Basic Info */}
            <div
              className="rounded-3xl p-8"
              style={{ backgroundColor: "#FFFFFF", boxShadow: "0 4px 16px rgba(245,158,66,0.1)" }}
            >
              <h3 className="font-rounded font-bold text-lg mb-6" style={{ color: "#3D2A1A" }}>基本情報</h3>
              <div className="space-y-4">
                {[
                  { label: "対象年齢", value: "0歳〜5歳（就学前まで）" },
                  { label: "定員", value: "75名" },
                  { label: "開園時間", value: "7:00〜19:00（延長保育込み）" },
                  { label: "休園日", value: "日曜・祝日・年末年始" },
                  { label: "給食", value: "完全給食（アレルギー対応可）" },
                ].map((row, i) => (
                  <div key={i} className="flex items-start gap-3 pb-3" style={{ borderBottom: i < 4 ? "1px solid rgba(245,158,66,0.15)" : "none" }}>
                    <span
                      className="text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap mt-0.5"
                      style={{ backgroundColor: "#FFF2E0", color: "#F59E42" }}
                    >
                      {row.label}
                    </span>
                    <span className="text-sm" style={{ color: "#3D2A1A" }}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Age Groups */}
            <div
              className="rounded-3xl p-8"
              style={{ backgroundColor: "#FFFFFF", boxShadow: "0 4px 16px rgba(245,158,66,0.1)" }}
            >
              <h3 className="font-rounded font-bold text-lg mb-6" style={{ color: "#3D2A1A" }}>年齢別クラス</h3>
              <div className="space-y-3">
                {[
                  { age: "0歳児", name: "ひよこ組", capacity: "6名", color: "#F59E42" },
                  { age: "1歳児", name: "たんぽぽ組", capacity: "12名", color: "#FBCB75" },
                  { age: "2歳児", name: "すみれ組", capacity: "12名", color: "#7EC8A0" },
                  { age: "3歳児", name: "さくら組", capacity: "15名", color: "#5BB88A" },
                  { age: "4歳児", name: "ひまわり組", capacity: "15名", color: "#F59E42" },
                  { age: "5歳児", name: "もも組", capacity: "15名（若干名募集中）", color: "#7EC8A0" },
                ].map((cls, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                    style={{ backgroundColor: "#FFF8F0" }}
                  >
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: cls.color }}
                    />
                    <span className="text-xs font-medium w-16" style={{ color: "#6B5744" }}>{cls.age}</span>
                    <span className="font-rounded font-bold text-sm flex-1" style={{ color: "#3D2A1A" }}>{cls.name}</span>
                    <span className="text-xs" style={{ color: "#6B5744" }}>定員 {cls.capacity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Fees Overview */}
          <div
            className="rounded-3xl p-8"
            style={{ backgroundColor: "#FFF2E0", border: "2px solid rgba(245,158,66,0.25)" }}
          >
            <h3 className="font-rounded font-bold text-lg mb-4" style={{ color: "#3D2A1A" }}>保育料について</h3>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#6B5744" }}>
              ひだまり保育園は認可保育園のため、保育料は世帯収入に応じて市町村が決定します。
              無償化（3〜5歳児クラス）の対象となる場合があります。
              詳細はお住まいの市区町村窓口またはお電話にてお問い合わせください。
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div
                className="flex-1 rounded-2xl p-4 text-center"
                style={{ backgroundColor: "#FFFFFF" }}
              >
                <p className="text-xs mb-1" style={{ color: "#6B5744" }}>延長保育料</p>
                <p className="font-rounded font-bold text-base" style={{ color: "#F59E42" }}>月額 2,000円〜</p>
              </div>
              <div
                className="flex-1 rounded-2xl p-4 text-center"
                style={{ backgroundColor: "#FFFFFF" }}
              >
                <p className="text-xs mb-1" style={{ color: "#6B5744" }}>入園金</p>
                <p className="font-rounded font-bold text-base" style={{ color: "#F59E42" }}>5,000円</p>
              </div>
              <div
                className="flex-1 rounded-2xl p-4 text-center"
                style={{ backgroundColor: "#FFFFFF" }}
              >
                <p className="text-xs mb-1" style={{ color: "#6B5744" }}>入園申込受付</p>
                <p className="font-rounded font-bold text-base" style={{ color: "#F59E42" }}>随時受付中</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Access / アクセス ===== */}
      <section id="access" className="py-20 px-4" style={{ backgroundColor: "#F0FAF4" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-medium tracking-widest uppercase" style={{ color: "#7EC8A0" }}>Access</span>
            <h2 className="font-rounded font-bold text-3xl md:text-4xl mt-2" style={{ color: "#3D2A1A" }}>
              アクセス
            </h2>
            <div className="mt-4 mx-auto w-12 h-1 rounded-full" style={{ backgroundColor: "#7EC8A0" }} />
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div
              className="rounded-3xl overflow-hidden"
              style={{ height: "300px", backgroundColor: "#D4EDE1", boxShadow: "0 4px 16px rgba(126,200,160,0.15)" }}
            >
              <div className="w-full h-full flex flex-col items-center justify-center" style={{ color: "#7EC8A0" }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-3 opacity-60">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <p className="text-sm font-medium opacity-70">Google Map 埋め込みエリア</p>
                <p className="text-xs opacity-50 mt-1">奄美大島 ひだまり保育園</p>
              </div>
            </div>

            {/* Address Info */}
            <div
              className="rounded-3xl p-8"
              style={{ backgroundColor: "#FFFFFF", boxShadow: "0 4px 16px rgba(126,200,160,0.12)" }}
            >
              <div className="space-y-5">
                {[
                  {
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7EC8A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    ),
                    label: "所在地",
                    value: "〒894-XXXX\n鹿児島県奄美市名瀬〇〇町X-XX",
                  },
                  {
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F59E42" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.42 2 2 0 0 1 3.62 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" />
                      </svg>
                    ),
                    label: "電話番号",
                    value: "0997-XX-XXXX",
                  },
                  {
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7EC8A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    ),
                    label: "メール",
                    value: "info@hidamari-hoikuen.com",
                  },
                  {
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F59E42" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
                      </svg>
                    ),
                    label: "駐車場",
                    value: "園前に10台分あり（無料）",
                  },
                ].map((info, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "#F0FAF4" }}
                    >
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-xs font-medium mb-1" style={{ color: "#7EC8A0" }}>{info.label}</p>
                      <p className="text-sm whitespace-pre-line" style={{ color: "#3D2A1A" }}>{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 見学予約フォーム ===== */}
      <section id="contact" className="py-20 px-4 paper-texture" style={{ backgroundColor: "#FFF8F0" }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-medium tracking-widest uppercase" style={{ color: "#F59E42" }}>Reservation</span>
            <h2 className="font-rounded font-bold text-3xl md:text-4xl mt-2" style={{ color: "#3D2A1A" }}>
              見学のご予約
            </h2>
            <div className="mt-4 mx-auto w-12 h-1 rounded-full" style={{ backgroundColor: "#F59E42" }} />
            <p className="mt-4 text-sm leading-relaxed" style={{ color: "#6B5744" }}>
              まずは園の雰囲気を見にきてください
            </p>
          </div>

          {submitted ? (
            <div
              className="rounded-3xl p-12 text-center"
              style={{ backgroundColor: "#FFFFFF", boxShadow: "0 4px 24px rgba(245,158,66,0.12)" }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: "#F0FAF4" }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#7EC8A0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="font-rounded font-bold text-xl mb-3" style={{ color: "#3D2A1A" }}>見学予約を受け付けました</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#6B5744" }}>
                ご予約いただきありがとうございます。<br />
                担当より1〜2営業日以内にご連絡いたします。<br />
                当日、みなさまのお越しをお待ちしています。
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl p-8 md:p-10"
              style={{ backgroundColor: "#FFFFFF", boxShadow: "0 4px 24px rgba(245,158,66,0.12)" }}
            >
              <div className="space-y-5">
                {/* 保護者のお名前 */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#3D2A1A" }}>
                    保護者のお名前
                    <span className="ml-1 text-xs px-1.5 py-0.5 rounded-full" style={{ backgroundColor: "#FFF2E0", color: "#F59E42" }}>必須</span>
                  </label>
                  <input
                    type="text"
                    placeholder="山田 花子"
                    value={formData.parentName}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, parentName: e.target.value }));
                      if (formErrors.parentName) setFormErrors((prev) => ({ ...prev, parentName: undefined }));
                    }}
                    className="w-full px-4 py-3 rounded-2xl text-sm outline-none transition-all"
                    style={{
                      backgroundColor: "#FFF8F0",
                      border: `2px solid ${formErrors.parentName ? "#e05555" : "rgba(245,158,66,0.2)"}`,
                      color: "#3D2A1A",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = formErrors.parentName ? "#e05555" : "#F59E42")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = formErrors.parentName ? "#e05555" : "rgba(245,158,66,0.2)")}
                  />
                  {formErrors.parentName && (
                    <p className="mt-1.5 text-xs" style={{ color: "#e05555" }}>{formErrors.parentName}</p>
                  )}
                </div>

                {/* 電話番号 */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#3D2A1A" }}>
                    電話番号
                  </label>
                  <input
                    type="tel"
                    placeholder="0997-XX-XXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 rounded-2xl text-sm outline-none transition-all"
                    style={{ backgroundColor: "#FFF8F0", border: "2px solid rgba(245,158,66,0.2)", color: "#3D2A1A" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#F59E42")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(245,158,66,0.2)")}
                  />
                </div>

                {/* メールアドレス */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#3D2A1A" }}>
                    メールアドレス
                    <span className="ml-1 text-xs px-1.5 py-0.5 rounded-full" style={{ backgroundColor: "#FFF2E0", color: "#F59E42" }}>必須</span>
                  </label>
                  <input
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, email: e.target.value }));
                      if (formErrors.email) setFormErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    className="w-full px-4 py-3 rounded-2xl text-sm outline-none transition-all"
                    style={{
                      backgroundColor: "#FFF8F0",
                      border: `2px solid ${formErrors.email ? "#e05555" : "rgba(245,158,66,0.2)"}`,
                      color: "#3D2A1A",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = formErrors.email ? "#e05555" : "#F59E42")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = formErrors.email ? "#e05555" : "rgba(245,158,66,0.2)")}
                  />
                  {formErrors.email && (
                    <p className="mt-1.5 text-xs" style={{ color: "#e05555" }}>{formErrors.email}</p>
                  )}
                </div>

                {/* お子さまの年齢 */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#3D2A1A" }}>
                    お子さまの年齢
                  </label>
                  <div className="relative">
                    <select
                      value={formData.childAge}
                      onChange={(e) => setFormData((prev) => ({ ...prev, childAge: e.target.value }))}
                      className="w-full px-4 py-3 rounded-2xl text-sm outline-none transition-all appearance-none"
                      style={{ backgroundColor: "#FFF8F0", border: "2px solid rgba(245,158,66,0.2)", color: formData.childAge ? "#3D2A1A" : "#A0917F" }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#F59E42")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(245,158,66,0.2)")}
                    >
                      <option value="">選択してください</option>
                      <option value="0歳">0歳</option>
                      <option value="1歳">1歳</option>
                      <option value="2歳">2歳</option>
                      <option value="3歳">3歳</option>
                      <option value="4歳">4歳</option>
                      <option value="5歳">5歳</option>
                    </select>
                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F59E42" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* 見学希望日・時間帯 (2列) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* 見学希望日 */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "#3D2A1A" }}>
                      見学希望日
                    </label>
                    <input
                      type="date"
                      value={formData.visitDate}
                      onChange={(e) => setFormData((prev) => ({ ...prev, visitDate: e.target.value }))}
                      className="w-full px-4 py-3 rounded-2xl text-sm outline-none transition-all"
                      style={{ backgroundColor: "#FFF8F0", border: "2px solid rgba(245,158,66,0.2)", color: "#3D2A1A" }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#F59E42")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(245,158,66,0.2)")}
                    />
                  </div>

                  {/* 見学希望時間帯 */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "#3D2A1A" }}>
                      見学希望時間帯
                    </label>
                    <div className="relative">
                      <select
                        value={formData.visitTime}
                        onChange={(e) => setFormData((prev) => ({ ...prev, visitTime: e.target.value }))}
                        className="w-full px-4 py-3 rounded-2xl text-sm outline-none transition-all appearance-none"
                        style={{ backgroundColor: "#FFF8F0", border: "2px solid rgba(245,158,66,0.2)", color: formData.visitTime ? "#3D2A1A" : "#A0917F" }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "#F59E42")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(245,158,66,0.2)")}
                      >
                        <option value="">選択してください</option>
                        <option value="10:00〜11:00">10:00〜11:00</option>
                        <option value="11:00〜12:00">11:00〜12:00</option>
                        <option value="14:00〜15:00">14:00〜15:00</option>
                        <option value="15:00〜16:00">15:00〜16:00</option>
                      </select>
                      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F59E42" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* メッセージ・ご質問 */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#3D2A1A" }}>
                    メッセージ・ご質問
                  </label>
                  <textarea
                    rows={4}
                    placeholder="ご質問・ご要望などがあればお気軽にご記入ください。"
                    value={formData.message}
                    onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                    className="w-full px-4 py-3 rounded-2xl text-sm outline-none transition-all resize-none"
                    style={{ backgroundColor: "#FFF8F0", border: "2px solid rgba(245,158,66,0.2)", color: "#3D2A1A" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#F59E42")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(245,158,66,0.2)")}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl font-rounded font-bold text-base transition-all hover:bg-[#e08930] hover:-translate-y-0.5"
                  style={{ backgroundColor: "#F59E42", color: "#FFF8F0", boxShadow: "0 4px 16px rgba(245,158,66,0.4)" }}
                >
                  見学を予約する
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer style={{ backgroundColor: "#3D2A1A" }} className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            {/* Brand */}
            <div>
              <h3 className="font-rounded font-bold text-xl mb-3" style={{ color: "#F59E42" }}>ひだまり保育園</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,248,240,0.65)" }}>
                笑顔あふれる、もうひとつのおうち。<br />
                奄美大島で、子どもたちの笑顔とともに。
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-rounded font-bold text-sm mb-4" style={{ color: "rgba(255,248,240,0.8)" }}>メニュー</h4>
              <ul className="space-y-2">
                {[
                  { label: "保育理念", href: "#about" },
                  { label: "一日の流れ", href: "#schedule" },
                  { label: "園の紹介", href: "#facilities" },
                  { label: "先生紹介", href: "#staff" },
                  { label: "入園案内", href: "#enrollment" },
                  { label: "アクセス", href: "#access" },
                ].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm transition-colors text-[rgba(255,248,240,0.6)] hover:text-[#F59E42]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-rounded font-bold text-sm mb-4" style={{ color: "rgba(255,248,240,0.8)" }}>お問い合わせ</h4>
              <div className="space-y-2">
                <p className="text-sm" style={{ color: "rgba(255,248,240,0.65)" }}>
                  TEL: 0997-XX-XXXX
                </p>
                <p className="text-sm" style={{ color: "rgba(255,248,240,0.65)" }}>
                  info@hidamari-hoikuen.com
                </p>
                <p className="text-sm" style={{ color: "rgba(255,248,240,0.65)" }}>
                  受付: 7:00〜19:00（日祝除く）
                </p>
              </div>
            </div>
          </div>

          <div
            className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
            style={{ borderTop: "1px solid rgba(255,248,240,0.1)", color: "rgba(255,248,240,0.4)" }}
          >
            <p>© 2026 ひだまり保育園 All Rights Reserved.</p>
            <p>このページは ALPACA のデモサイトです</p>
          </div>
        </div>
      </footer>

      {/* ===== FIXED BOTTOM CTA BAR ===== */}
      <style>{`
        @keyframes nursery-cta-slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .nursery-cta-bar {
          animation: nursery-cta-slide-up 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
