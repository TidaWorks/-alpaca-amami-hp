"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

export default function OsteopathicPage() {
  useEffect(() => {
    const onScroll = () => setShowCta(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [formData, setFormData] = useState({ name: "", phone: "", date: "", menu: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [showCta, setShowCta] = useState(false);

  // ===== Pulse line animation state =====
  const statsRef = useRef<HTMLElement | null>(null);
  const [pulseVisible, setPulseVisible] = useState(false);
  // statsRevealed[i] === true means stat i+1 is visible
  const [statsRevealed, setStatsRevealed] = useState([false, false, false]);
  const statsTimerRefs = useRef<ReturnType<typeof setTimeout>[]>([]);

  // ===== Body hotspot state =====
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  // ===== Flow section ref for animated connecting line + step icon bounce =====
  const flowRef = useRef<HTMLElement | null>(null);
  const [flowVisible, setFlowVisible] = useState(false);
  const [flowIconsBounced, setFlowIconsBounced] = useState([false, false, false, false]);

  // ===== Intersection Observer for section-fade + special sections =====
  const observerRef = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");

            // Pulse line animation trigger
            if (entry.target === statsRef.current) {
              setPulseVisible(true);
              statsTimerRefs.current.push(
                setTimeout(() => setStatsRevealed((prev) => [true, prev[1], prev[2]]), 600),
                setTimeout(() => setStatsRevealed((prev) => [prev[0], true, prev[2]]), 1100),
                setTimeout(() => setStatsRevealed((prev) => [prev[0], prev[1], true]), 1700),
              );
            }

            // Flow line animation + icon bounce
            if (entry.target === flowRef.current) {
              setFlowVisible(true);
              setTimeout(() => setFlowIconsBounced((prev) => { const n = [...prev]; n[0] = true; return n; }), 200);
              setTimeout(() => setFlowIconsBounced((prev) => { const n = [...prev]; n[1] = true; return n; }), 550);
              setTimeout(() => setFlowIconsBounced((prev) => { const n = [...prev]; n[2] = true; return n; }), 900);
              setTimeout(() => setFlowIconsBounced((prev) => { const n = [...prev]; n[3] = true; return n; }), 1250);
            }
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".section-fade").forEach((el) => {
      // Skip statsRef and flowRef — they are observed separately below
      if (el !== statsRef.current && el !== flowRef.current) {
        observerRef.current?.observe(el);
      }
    });
    if (statsRef.current) observerRef.current?.observe(statsRef.current);
    if (flowRef.current) observerRef.current?.observe(flowRef.current);
    return () => {
      observerRef.current?.disconnect();
      statsTimerRefs.current.forEach(clearTimeout);
    };
  }, []);

  // ===== 3D Card Tilt =====
  const handleCardMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = ((y - cy) / cy) * -5;
    const ry = ((x - cx) / cx) * 5;
    card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
    card.style.boxShadow = `0 20px 40px rgba(46,134,171,0.2)`;
  }, []);

  const handleCardMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    card.style.boxShadow = `0 4px 20px rgba(26,43,60,0.05)`;
  }, []);

  // Day-of-week + time-of-day reception status
  const today = new Date();
  const dow = today.getDay(); // 0=Sun, 6=Sat
  const hour = today.getHours();
  let receptionLabel = "受付中";
  let receptionColor = "#48B89C";
  if (dow === 0) {
    // Sunday: closed all day
    receptionLabel = "本日休診";
    receptionColor = "#9BA8B5";
  } else if (dow === 6) {
    // Saturday: open 9-13 only
    if (hour >= 13) {
      receptionLabel = "本日受付終了";
      receptionColor = "#9BA8B5";
    } else if (hour < 9) {
      receptionLabel = "本日9時より受付";
      receptionColor = "#9BA8B5";
    }
  } else {
    // Weekday (Mon-Fri): open 9-12, closed 12-14 (lunch), open 14-19
    if (hour < 9) {
      receptionLabel = "本日9時より受付";
      receptionColor = "#9BA8B5";
    } else if (hour >= 12 && hour < 14) {
      receptionLabel = "昼休み中";
      receptionColor = "#9BA8B5";
    } else if (hour >= 19) {
      receptionLabel = "本日受付終了";
      receptionColor = "#9BA8B5";
    }
  }

  const footerLinkMap: Record<string, string> = {
    "施術メニュー": "menu",
    "当院の特徴": "features",
    "院長紹介": "staff",
    "アクセス・診療時間": "access",
    "ご予約・お問い合わせ": "contact",
  };

  // ===== Hotspot data =====
  // Positions are % values within the SVG viewBox (0-100 x, 0-100 y)
  const hotspots = [
    {
      id: 0,
      label: "頭痛・偏頭痛",
      desc: "首や肩のこりからくる緊張型頭痛、姿勢改善による根本アプローチ",
    },
    {
      id: 1,
      label: "肩こり・首こり",
      desc: "デスクワークや姿勢の悪さによる慢性的な肩・首の張り",
    },
    {
      id: 2,
      label: "交通事故後遺症",
      desc: "むち打ち・事故後の慢性痛など交通事故によるケガの後遺症ケア",
    },
    {
      id: 3,
      label: "姿勢の歪み",
      desc: "O脚・X脚・骨盤の歪み・猫背などの体型・姿勢のお悩み",
    },
    {
      id: 4,
      label: "腰痛・ぎっくり腰",
      desc: "重いものを持ったり、長時間同じ姿勢を続けることで起きる腰痛",
    },
    {
      id: 5,
      label: "スポーツ障害",
      desc: "捻挫・打撲・肉離れなどスポーツによるケガのリハビリ・ケア",
    },
  ];

  return (
    <div
      className="min-h-screen bg-[#F7F9FC] text-[#1A2B3C]"
      style={{ fontFamily: "var(--font-noto-sans-jp), sans-serif" }}
    >
      {/* ===== Google Fonts ===== */}
      <style>{`
        html { scroll-behavior: smooth; }
        .font-serif-jp { font-family: var(--font-noto-serif-jp), serif; }
        .font-sans-jp { font-family: var(--font-noto-sans-jp), sans-serif; }

        /* ===== Section Reveal ===== */
        @keyframes sectionReveal {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .section-fade { opacity: 0; transform: translateY(40px); }
        .section-fade.visible {
          animation: sectionReveal 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* ===== 3D Card Tilt ===== */
        .tilt-card {
          transition: transform 0.35s ease-out, box-shadow 0.35s ease-out;
          transform-style: preserve-3d;
          will-change: transform;
        }

        /* ===== Treatment Flow connecting line draw animation ===== */
        @keyframes lineGrow {
          from { width: 0; }
          to   { width: 100%; }
        }
        .flow-line-animated {
          display: none;
          position: absolute;
          top: 21px;
          left: 50%;
          height: 3px;
          background: linear-gradient(90deg, #2E86AB, #48B89C);
          border-radius: 2px;
          width: 0;
          overflow: visible;
        }
        @media (min-width: 768px) {
          .flow-line-animated { display: block; }
          .flow-line-animated.draw {
            animation: lineGrow 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          .flow-line-animated.draw-delay-1 { animation-delay: 0.3s; }
          .flow-line-animated.draw-delay-2 { animation-delay: 0.6s; }
          .flow-line-animated.draw-delay-3 { animation-delay: 0.9s; }
        }

        /* ===== CTA Pulse / Glow ===== */
        @keyframes ctaPulse {
          0%   { box-shadow: 0 8px 40px rgba(0,0,0,0.22), 0 0 0 0 rgba(46,134,171,0.55), 0 0 0 0 rgba(72,184,156,0.3); }
          50%  { box-shadow: 0 8px 40px rgba(0,0,0,0.22), 0 0 0 18px rgba(46,134,171,0), 0 0 0 36px rgba(72,184,156,0); }
          100% { box-shadow: 0 8px 40px rgba(0,0,0,0.22), 0 0 0 0 rgba(46,134,171,0.55), 0 0 0 0 rgba(72,184,156,0.3); }
        }
        .cta-pulse {
          animation: ctaPulse 2.4s ease-in-out infinite;
        }

        @keyframes ctaButtonPulse {
          0%   { box-shadow: 0 6px 28px rgba(72,184,156,0.45), 0 0 0 0 rgba(46,134,171,0.5), 0 0 0 0 rgba(72,184,156,0.3); }
          50%  { box-shadow: 0 6px 28px rgba(72,184,156,0.45), 0 0 0 16px rgba(46,134,171,0), 0 0 0 30px rgba(72,184,156,0); }
          100% { box-shadow: 0 6px 28px rgba(72,184,156,0.45), 0 0 0 0 rgba(46,134,171,0.5), 0 0 0 0 rgba(72,184,156,0.3); }
        }
        .cta-button-pulse {
          animation: ctaButtonPulse 2.4s ease-in-out infinite;
        }

        .hover-lift { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .hover-lift:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(46,134,171,0.15); }
        input, textarea, select { outline: none; }
        input:focus, textarea:focus { border-color: #2E86AB !important; box-shadow: 0 0 0 3px rgba(46,134,171,0.12); }

        /* ===== Pulse / ECG line draw ===== */
        @keyframes drawPulseLine {
          from { stroke-dashoffset: 2400; }
          to   { stroke-dashoffset: 0; }
        }
        .pulse-path {
          stroke-dasharray: 2400;
          stroke-dashoffset: 2400;
        }
        .pulse-path.animate {
          animation: drawPulseLine 2.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        /* ===== ECG glow trail ===== */
        .pulse-glow-path {
          stroke-dasharray: 2400;
          stroke-dashoffset: 2400;
          filter: blur(3px);
        }
        .pulse-glow-path.animate {
          animation: drawPulseLine 2.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        /* ===== ECG peak flash ===== */
        @keyframes peakFlash {
          0%   { opacity: 0; transform: scale(1); }
          30%  { opacity: 1; transform: scale(2.25); }
          60%  { opacity: 0.6; transform: scale(1.5); }
          100% { opacity: 1; transform: scale(1); }
        }
        .peak-dot.flash {
          animation: peakFlash 0.5s ease-out forwards;
          transform-origin: center center;
          transform-box: fill-box;
        }

        /* ===== ECG monitor grid ===== */
        .ecg-monitor-bg {
          background-color: rgba(8, 28, 20, 0.96);
          background-image:
            linear-gradient(rgba(0,255,100,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,100,0.07) 1px, transparent 1px),
            linear-gradient(rgba(0,255,100,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,100,0.03) 1px, transparent 1px);
          background-size: 56px 56px, 56px 56px, 14px 14px, 14px 14px;
        }

        @keyframes statFadeIn {
          from { opacity: 0; transform: translateY(12px) scale(0.8); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .stat-label {
          opacity: 0;
        }
        .stat-label.visible {
          animation: statFadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* ===== Hotspot pulse ring ===== */
        @keyframes hotspotPing {
          0%   { transform: scale(1); opacity: 0.8; }
          70%  { transform: scale(3.2); opacity: 0; }
          100% { transform: scale(3.2); opacity: 0; }
        }
        @keyframes hotspotPing2 {
          0%   { transform: scale(1); opacity: 0.5; }
          70%  { transform: scale(2.4); opacity: 0; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        .hotspot-ring {
          animation: hotspotPing 2.2s ease-out infinite;
        }
        .hotspot-ring-2 {
          animation: hotspotPing2 2.2s ease-out 0.7s infinite;
        }

        /* ===== Body silhouette glow outline ===== */
        @keyframes bodyGlow {
          0%, 100% { filter: drop-shadow(0 0 4px rgba(46,134,171,0.25)); }
          50%       { filter: drop-shadow(0 0 12px rgba(72,184,156,0.4)); }
        }

        /* ===== Floating medical crosses ===== */
        @keyframes floatCross {
          0%   { transform: translateY(0px) rotate(0deg); opacity: 0.12; }
          50%  { transform: translateY(-14px) rotate(10deg); opacity: 0.22; }
          100% { transform: translateY(0px) rotate(0deg); opacity: 0.12; }
        }
        .float-cross { animation: floatCross var(--dur, 6s) ease-in-out infinite; animation-delay: var(--delay, 0s); }

        /* ===== Stethoscope watermark ===== */
        @keyframes watermarkPulse {
          0%, 100% { opacity: 0.04; }
          50%       { opacity: 0.07; }
        }
        .hero-watermark { animation: watermarkPulse 5s ease-in-out infinite; }

        /* ===== Flow progress dots ===== */
        @keyframes travelDot {
          0%   { left: 0%; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        .flow-travel-dot {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: white;
          box-shadow: 0 0 6px rgba(72,184,156,0.9);
          animation: travelDot 1.8s linear infinite;
          animation-delay: var(--dot-delay, 0s);
          opacity: 0;
        }

        /* ===== Treatment horizontal scroll ===== */
        .treatment-scroll::-webkit-scrollbar { height: 4px; }
        .treatment-scroll::-webkit-scrollbar-track { background: #EEF4F9; border-radius: 4px; }
        .treatment-scroll::-webkit-scrollbar-thumb { background: rgba(46,134,171,0.3); border-radius: 4px; }
        .treatment-scroll::-webkit-scrollbar-thumb:hover { background: rgba(46,134,171,0.5); }

        /* ===== Medical grid bg ===== */
        .medical-grid {
          background-image:
            linear-gradient(rgba(46,134,171,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(46,134,171,0.04) 1px, transparent 1px);
          background-size: 28px 28px;
        }

        /* ===== ECG scan line ===== */
        @keyframes ecgScanLine {
          0%   { left: -2%; opacity: 0; }
          4%   { opacity: 1; }
          96%  { opacity: 1; }
          100% { left: 102%; opacity: 0; }
        }
        .ecg-scan-line {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 3px;
          background: linear-gradient(180deg, transparent 0%, rgba(77,255,138,0.35) 20%, rgba(77,255,138,0.55) 50%, rgba(77,255,138,0.35) 80%, transparent 100%);
          filter: blur(1px);
          animation: ecgScanLine 3.8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          pointer-events: none;
        }
        .ecg-scan-glow {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 18px;
          background: linear-gradient(90deg, transparent, rgba(77,255,138,0.07), transparent);
          filter: blur(3px);
          animation: ecgScanLine 3.8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          pointer-events: none;
        }

        /* ===== Body breathing animation ===== */
        @keyframes bodyBreathe {
          0%, 100% { transform: scale(1);     opacity: 1; }
          45%       { transform: scale(1.018); opacity: 1; }
          50%       { transform: scale(1.018); opacity: 1; }
        }
        .body-silhouette-svg {
          animation: bodyGlow 3.5s ease-in-out infinite, bodyBreathe 4.2s ease-in-out infinite;
          transform-origin: 50% 50%;
        }

        /* ===== Flow icon scale-bounce ===== */
        @keyframes iconBounce {
          0%   { transform: scale(1); }
          30%  { transform: scale(1.32); }
          55%  { transform: scale(0.92); }
          75%  { transform: scale(1.12); }
          90%  { transform: scale(0.97); }
          100% { transform: scale(1); }
        }
        .flow-icon-bounce {
          animation: iconBounce 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97) forwards;
        }
        button[type="submit"] {
          transition: transform 0.2s ease, box-shadow 0.2s ease !important;
        }
        button[type="submit"]:hover { transform: scale(1.03) !important; }
        button[type="submit"]:active { transform: scale(0.98) !important; }
      `}</style>

      {/* ===== Fixed Header ===== */}
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-[#F7F9FC]/96 backdrop-blur-sm border-b border-[#2E86AB]/10"
        style={{ boxShadow: "0 1px 16px rgba(46,134,171,0.07)" }}
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a
            href="/web#gallery"
            className="text-sm text-[#2E86AB] hover:text-[#1A2B3C] transition-colors hidden md:flex items-center gap-1"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            ギャラリーに戻る
          </a>
          <div className="text-center">
            <span className="font-serif-jp text-base tracking-widest text-[#1A2B3C]">島つむぎ整骨院</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-[#1A2B3C]/70">
            <a href="#menu" className="hover:text-[#2E86AB] transition-colors">施術メニュー</a>
            <a href="#access" className="hover:text-[#2E86AB] transition-colors">アクセス</a>
            <a
              href="#contact"
              className="bg-[#2E86AB] text-white px-4 py-1.5 rounded-full text-xs hover:bg-[#1d6a8a] transition-colors"
            >
              ご予約
            </a>
          </nav>
        </div>
      </header>

      {/* ===== Hero Section ===== */}
      <section className="relative pt-[60px]">
        <div className="relative h-[88vh] min-h-[560px] flex items-center justify-center overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=80"
            alt="島つむぎ整骨院 施術風景"
            className="absolute inset-0 w-full h-full object-cover"
            width={1200}
            height={800}
            priority
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(26,43,60,0.72) 0%, rgba(46,134,171,0.45) 100%)" }} />

          {/* subtle grid overlay */}
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "48px 48px" }} />

          {/* Stethoscope watermark */}
          <div className="hero-watermark absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <svg width="520" height="520" viewBox="0 0 200 200" fill="none" aria-hidden="true" style={{ opacity: 1 }}>
              {/* Stethoscope chest piece */}
              <circle cx="100" cy="148" r="22" stroke="white" strokeWidth="3" fill="none" />
              <circle cx="100" cy="148" r="10" stroke="white" strokeWidth="2" fill="none" />
              {/* tubing left arc */}
              <path d="M78,148 C55,148 42,130 42,110 L42,72 C42,60 50,52 62,52" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
              {/* tubing right arc */}
              <path d="M122,148 C145,148 158,130 158,110 L158,72 C158,60 150,52 138,52" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
              {/* earpieces */}
              <circle cx="62" cy="48" r="6" stroke="white" strokeWidth="2.5" fill="none" />
              <circle cx="138" cy="48" r="6" stroke="white" strokeWidth="2.5" fill="none" />
            </svg>
          </div>

          {/* Floating medical cross decorations */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {([
              { x: "8%",  y: "15%", size: 14, dur: "7s",  delay: "0s"   },
              { x: "88%", y: "22%", size: 10, dur: "9s",  delay: "1.5s" },
              { x: "15%", y: "72%", size: 12, dur: "8s",  delay: "3s"   },
              { x: "82%", y: "65%", size: 9,  dur: "6.5s",delay: "0.8s" },
              { x: "50%", y: "88%", size: 11, dur: "10s", delay: "2.2s" },
              { x: "30%", y: "40%", size: 8,  dur: "7.5s",delay: "4s"   },
              { x: "72%", y: "45%", size: 13, dur: "8.5s",delay: "1s"   },
            ] as Array<{x:string;y:string;size:number;dur:string;delay:string}>).map((c, i) => (
              <div
                key={i}
                className="float-cross absolute"
                style={{ left: c.x, top: c.y, "--dur": c.dur, "--delay": c.delay } as React.CSSProperties}
              >
                <svg width={c.size} height={c.size} viewBox="0 0 12 12" fill="white" aria-hidden="true">
                  <rect x="4.5" y="0" width="3" height="12" rx="1" />
                  <rect x="0" y="4.5" width="12" height="3" rx="1" />
                </svg>
              </div>
            ))}
          </div>

          <div className="relative text-center px-6 max-w-2xl mx-auto">
            {/* Cross / Health icon */}
            <div className="mb-6 flex justify-center">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)" }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F7F9FC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M2 12h20" />
                </svg>
              </div>
            </div>

            <p className="text-xs tracking-[0.35em] text-white/70 mb-3 font-light">SHIMATSUMUGI SEIKOTSUIN</p>
            <h1 className="font-serif-jp text-4xl md:text-6xl tracking-[0.15em] text-white mb-4">
              島つむぎ整骨院
            </h1>
            <div className="w-16 h-px bg-white/30 mx-auto my-6" />
            <p className="font-serif-jp text-base md:text-lg tracking-wider text-white/85 leading-relaxed">
              島の暮らしに寄り添う、からだのケア
            </p>
            <p className="text-sm text-white/65 mt-3 font-light tracking-wide">
              奄美大島 / 整骨・鍼灸・スポーツケア
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="cta-button-pulse px-8 py-3 rounded-full text-sm font-medium text-white transition-all"
                style={{ background: "linear-gradient(135deg, #2E86AB, #48B89C)", boxShadow: "0 4px 20px rgba(46,134,171,0.4)" }}
              >
                ご予約はこちら
              </a>
              <a
                href="#menu"
                className="px-8 py-3 rounded-full text-sm font-medium text-white transition-all"
                style={{ border: "1px solid rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.08)" }}
              >
                施術メニューを見る
              </a>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="text-xs text-white/50 tracking-widest">SCROLL</span>
            <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
          </div>
        </div>
      </section>

      {/* ===== Stats Section — Heartbeat / ECG Pulse Line ===== */}
      <section className="py-20 bg-white medical-grid section-fade" ref={statsRef}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.3em] text-[#2E86AB]/60 font-light mb-2">VITAL DATA</p>
            <h2 className="font-serif-jp text-xl md:text-2xl text-[#1A2B3C]/80">島つむぎ整骨院の実績</h2>
          </div>

          {/* ECG / pulse line visualization */}
          <div className="relative">
            {/* Corner labels — medical monitor aesthetic */}
            <div className="absolute top-3 left-4 flex items-center gap-2 z-10">
              <span className="text-[10px] text-[#4dff8a] tracking-widest font-medium opacity-80">II</span>
              <span className="text-[10px] text-[#4dff8a]/40 tracking-widest">25mm/s</span>
              <span className="text-[10px] text-[#4dff8a]/30 tracking-widest">10mm/mV</span>
            </div>
            <div className="absolute top-3 right-4 flex items-center gap-2 z-10">
              <span
                className="text-[10px] tracking-widest font-medium"
                style={{ color: receptionColor === "#48B89C" ? "#4dff8a" : "#9BA8B5" }}
              >
                {receptionLabel}
              </span>
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: receptionColor === "#48B89C" ? "#4dff8a" : "#9BA8B5", boxShadow: receptionColor === "#48B89C" ? `0 0 8px #4dff8a` : "none" }}
              />
            </div>

            {/* SVG ECG canvas */}
            <div
              className="ecg-monitor-bg rounded-2xl overflow-hidden px-4 md:px-8 pt-14 pb-10 relative"
              style={{
                border: "1px solid rgba(0,200,80,0.18)",
                boxShadow: "0 4px 48px rgba(0,0,0,0.35), inset 0 0 60px rgba(0,255,80,0.03)",
              }}
            >
              {/* Scan line sweeping left-to-right */}
              <div className="ecg-scan-glow" style={{ animationDelay: "0.6s" }} />
              <div className="ecg-scan-line" style={{ animationDelay: "0.6s" }} />

              {/* Stat labels floating above peaks */}
              <div className="relative h-24 md:h-32">
                {/* Stat 1 — years — aligned to first major spike */}
                <div
                  className={`stat-label absolute text-center${statsRevealed[0] ? " visible" : ""}`}
                  style={{ left: "20%", top: 0, transform: "translateX(-50%)" }}
                >
                  <p className="text-3xl md:text-5xl font-medium leading-none tabular-nums" style={{ color: "#4dff8a", textShadow: "0 0 20px rgba(77,255,138,0.5)" }}>
                    20<span className="text-lg md:text-2xl font-light">年</span>
                  </p>
                  <p className="text-[10px] mt-1.5 tracking-wide" style={{ color: "rgba(77,255,138,0.6)" }}>島での施術実績</p>
                </div>

                {/* Stat 2 — patients — center spike */}
                <div
                  className={`stat-label absolute text-center${statsRevealed[1] ? " visible" : ""}`}
                  style={{ left: "50%", top: 0, transform: "translateX(-50%)" }}
                >
                  <p className="text-3xl md:text-5xl font-medium leading-none tabular-nums" style={{ color: "#4dff8a", textShadow: "0 0 20px rgba(77,255,138,0.5)" }}>
                    3,000<span className="text-lg md:text-2xl font-light">+</span>
                  </p>
                  <p className="text-[10px] mt-1.5 tracking-wide" style={{ color: "rgba(77,255,138,0.6)" }}>延べ来院患者数</p>
                </div>

                {/* Stat 3 — satisfaction — right spike */}
                <div
                  className={`stat-label absolute text-center${statsRevealed[2] ? " visible" : ""}`}
                  style={{ left: "80%", top: 0, transform: "translateX(-50%)" }}
                >
                  <p className="text-3xl md:text-5xl font-medium leading-none tabular-nums" style={{ color: "#4dff8a", textShadow: "0 0 20px rgba(77,255,138,0.5)" }}>
                    97<span className="text-lg md:text-2xl font-light">%</span>
                  </p>
                  <p className="text-[10px] mt-1.5 tracking-wide" style={{ color: "rgba(77,255,138,0.6)" }}>患者満足度</p>
                </div>
              </div>

              {/* The SVG pulse line */}
              <svg
                viewBox="0 0 1200 140"
                preserveAspectRatio="none"
                className="w-full"
                style={{ height: "90px" }}
                aria-hidden="true"
              >
                {/* Horizontal baseline grid lines — green-tinted monitor */}
                <line x1="0" y1="70" x2="1200" y2="70" stroke="rgba(0,255,80,0.15)" strokeWidth="1" />
                <line x1="0" y1="35" x2="1200" y2="35" stroke="rgba(0,255,80,0.07)" strokeWidth="1" />
                <line x1="0" y1="105" x2="1200" y2="105" stroke="rgba(0,255,80,0.07)" strokeWidth="1" />
                <line x1="0" y1="17" x2="1200" y2="17" stroke="rgba(0,255,80,0.04)" strokeWidth="1" />
                <line x1="0" y1="122" x2="1200" y2="122" stroke="rgba(0,255,80,0.04)" strokeWidth="1" />
                {/* Vertical tick grid lines */}
                {[120, 240, 360, 480, 600, 720, 840, 960, 1080].map((x) => (
                  <line key={x} x1={x} y1="10" x2={x} y2="130" stroke="rgba(0,255,80,0.08)" strokeWidth="1" />
                ))}
                {/* Finer vertical subdivisions */}
                {[60, 180, 300, 420, 540, 660, 780, 900, 1020, 1140].map((x) => (
                  <line key={`sub-${x}`} x1={x} y1="55" x2={x} y2="85" stroke="rgba(0,255,80,0.04)" strokeWidth="1" />
                ))}

                {/* Wide outer glow trail — brightest */}
                <path
                  className={`pulse-glow-path${pulseVisible ? " animate" : ""}`}
                  d={`M0,70 L60,70 L80,70
                      L100,72 L110,68 L120,70
                      L170,70 L190,72 L200,50 L210,20 L215,8 L220,110 L225,85 L230,70 L240,70
                      L360,70 L380,70
                      L430,70 L450,72 L460,50 L470,20 L475,8 L480,110 L485,85 L490,70 L500,70
                      L560,70 L570,72 L575,68 L580,70
                      L700,70 L720,70
                      L770,70 L790,72 L800,50 L810,20 L815,8 L820,110 L825,85 L830,70 L840,70
                      L900,70 L910,72 L915,68 L920,70
                      L1020,70 L1030,70 L1040,72 L1045,68 L1050,70 L1200,70`}
                  fill="none"
                  stroke="rgba(77,255,138,0.22)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Medium glow trail */}
                <path
                  className={`pulse-glow-path${pulseVisible ? " animate" : ""}`}
                  d={`M0,70 L60,70 L80,70
                      L100,72 L110,68 L120,70
                      L170,70 L190,72 L200,50 L210,20 L215,8 L220,110 L225,85 L230,70 L240,70
                      L360,70 L380,70
                      L430,70 L450,72 L460,50 L470,20 L475,8 L480,110 L485,85 L490,70 L500,70
                      L560,70 L570,72 L575,68 L580,70
                      L700,70 L720,70
                      L770,70 L790,72 L800,50 L810,20 L815,8 L820,110 L825,85 L830,70 L840,70
                      L900,70 L910,72 L915,68 L920,70
                      L1020,70 L1030,70 L1040,72 L1045,68 L1050,70 L1200,70`}
                  fill="none"
                  stroke="rgba(77,255,138,0.35)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Main ECG path — bright green, 3px */}
                <path
                  className={`pulse-path${pulseVisible ? " animate" : ""}`}
                  d={`M0,70 L60,70 L80,70
                      L100,72 L110,68 L120,70
                      L170,70 L190,72 L200,50 L210,20 L215,8 L220,110 L225,85 L230,70 L240,70
                      L360,70 L380,70
                      L430,70 L450,72 L460,50 L470,20 L475,8 L480,110 L485,85 L490,70 L500,70
                      L560,70 L570,72 L575,68 L580,70
                      L700,70 L720,70
                      L770,70 L790,72 L800,50 L810,20 L815,8 L820,110 L825,85 L830,70 L840,70
                      L900,70 L910,72 L915,68 L920,70
                      L1020,70 L1030,70 L1040,72 L1045,68 L1050,70 L1200,70`}
                  fill="none"
                  stroke="#4dff8a"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Large glow halo at each peak */}
                {[215, 475, 815].map((x, i) => (
                  <circle
                    key={`halo-${i}`}
                    cx={x}
                    cy="8"
                    r="20"
                    fill="rgba(77,255,138,0.08)"
                    opacity={pulseVisible ? 1 : 0}
                    style={{ transition: `opacity 0.5s ease ${0.85 + i * 0.5}s`, filter: "blur(6px)" }}
                  />
                ))}

                {/* Medium glow ring at each peak */}
                {[215, 475, 815].map((x, i) => (
                  <circle
                    key={`glow-${i}`}
                    cx={x}
                    cy="8"
                    r="10"
                    fill="none"
                    opacity={pulseVisible ? 0.6 : 0}
                    stroke="#4dff8a"
                    strokeWidth="1.5"
                    style={{ transition: `opacity 0.5s ease ${0.9 + i * 0.5}s`, filter: "blur(2px)" }}
                  />
                ))}

                {/* Peak dots at each QRS peak — flash on appear */}
                {[215, 475, 815].map((x, i) => (
                  <circle
                    key={`peak-${i}`}
                    className={pulseVisible ? "peak-dot flash" : "peak-dot"}
                    cx={x}
                    cy="8"
                    r="4"
                    fill="#4dff8a"
                    opacity={pulseVisible ? 1 : 0}
                    style={{
                      transition: `opacity 0.3s ease ${0.9 + i * 0.5}s`,
                      animationDelay: `${0.9 + i * 0.5}s`,
                      filter: "drop-shadow(0 0 4px rgba(77,255,138,0.9))"
                    }}
                  />
                ))}

                {/* Small P-wave and T-wave dots */}
                {[120, 380, 580, 920].map((x, i) => (
                  <circle
                    key={`minor-${i}`}
                    cx={x}
                    cy="70"
                    r="2.5"
                    fill="rgba(77,255,138,0.4)"
                    opacity={pulseVisible ? 1 : 0}
                    style={{ transition: `opacity 0.4s ease ${1.4 + i * 0.2}s` }}
                  />
                ))}

                {/* Dashed connector lines from peaks up toward stat labels */}
                {[215, 475, 815].map((x, i) => (
                  <line
                    key={`conn-${i}`}
                    x1={x}
                    y1="8"
                    x2={x}
                    y2="0"
                    stroke="#4dff8a"
                    strokeWidth="1"
                    strokeDasharray="2 3"
                    opacity={pulseVisible ? 0.6 : 0}
                    style={{ transition: `opacity 0.4s ease ${1.2 + i * 0.5}s` }}
                  />
                ))}
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Symptoms Section — Body Silhouette Hotspot Map ===== */}
      <section className="py-20 bg-white section-fade relative overflow-hidden" id="symptoms">
        {/* Subtle floating crosses */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {([
            { x: "5%",  y: "20%", size: 12, dur: "8s",  delay: "0s"   },
            { x: "92%", y: "35%", size: 9,  dur: "10s", delay: "2s"   },
            { x: "3%",  y: "75%", size: 11, dur: "7s",  delay: "1s"   },
            { x: "95%", y: "80%", size: 8,  dur: "9s",  delay: "3.5s" },
          ] as Array<{x:string;y:string;size:number;dur:string;delay:string}>).map((c, i) => (
            <div
              key={i}
              className="float-cross absolute"
              style={{ left: c.x, top: c.y, "--dur": c.dur, "--delay": c.delay } as React.CSSProperties}
            >
              <svg width={c.size} height={c.size} viewBox="0 0 12 12" fill="rgba(46,134,171,0.18)" aria-hidden="true">
                <rect x="4.5" y="0" width="3" height="12" rx="1" />
                <rect x="0" y="4.5" width="12" height="3" rx="1" />
              </svg>
            </div>
          ))}
        </div>
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] text-[#2E86AB] mb-3">SYMPTOMS</p>
            <h2 className="font-serif-jp text-2xl md:text-3xl text-[#1A2B3C] mb-4">
              こんなお悩みありませんか？
            </h2>
            <p className="text-sm text-[#1A2B3C]/55 max-w-md mx-auto leading-relaxed">
              日常のちょっとした不調から慢性的な痛みまで、島つむぎ整骨院が丁寧にサポートします。
              <br className="hidden md:block" />
              気になる部位をクリックしてください。
            </p>
          </div>

          {/* Desktop: body silhouette + hotspots */}
          <div className="hidden md:block">
            <div className="flex items-start justify-center gap-12 relative">
              {/* Body silhouette SVG with hotspots */}
              <div className="relative flex-shrink-0" style={{ width: "280px", height: "560px", overflow: "visible" }}>
                {/* Subtle radial glow behind body */}
                <div
                  className="absolute"
                  style={{
                    width: "200px",
                    height: "400px",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    background: "radial-gradient(ellipse, rgba(46,134,171,0.06) 0%, transparent 70%)",
                    pointerEvents: "none",
                  }}
                />

                {/* Human body front-view silhouette */}
                <svg
                  viewBox="0 0 280 560"
                  fill="none"
                  className="body-silhouette-svg absolute inset-0 w-full h-full"
                  aria-hidden="true"
                >
                  {/* Head */}
                  <ellipse cx="140" cy="45" rx="32" ry="38" fill="rgba(46,134,171,0.07)" stroke="rgba(46,134,171,0.35)" strokeWidth="2" />
                  {/* Neck */}
                  <rect x="130" y="79" width="20" height="24" rx="7" fill="rgba(46,134,171,0.06)" stroke="rgba(46,134,171,0.28)" strokeWidth="2" />
                  {/* Shoulders + Torso */}
                  <path
                    d="M92,103 C80,103 68,116 65,140 L60,215 C59,234 63,248 76,252 L204,252 C217,248 221,234 220,215 L215,140 C212,116 200,103 188,103 Z"
                    fill="rgba(46,134,171,0.07)"
                    stroke="rgba(46,134,171,0.35)"
                    strokeWidth="2"
                  />
                  {/* Pelvis */}
                  <path
                    d="M78,252 Q70,276 74,290 L206,290 Q210,276 202,252 Z"
                    fill="rgba(46,134,171,0.05)"
                    stroke="rgba(46,134,171,0.28)"
                    strokeWidth="2"
                  />
                  {/* Left arm */}
                  <path
                    d="M92,107 C76,109 60,124 54,150 L44,215 C42,232 46,242 54,244 C62,246 68,238 70,222 L78,168 C80,152 82,138 92,126 Z"
                    fill="rgba(46,134,171,0.05)"
                    stroke="rgba(46,134,171,0.26)"
                    strokeWidth="2"
                  />
                  {/* Right arm */}
                  <path
                    d="M188,107 C204,109 220,124 226,150 L236,215 C238,232 234,242 226,244 C218,246 212,238 210,222 L202,168 C200,152 198,138 188,126 Z"
                    fill="rgba(46,134,171,0.05)"
                    stroke="rgba(46,134,171,0.26)"
                    strokeWidth="2"
                  />
                  {/* Left leg */}
                  <path
                    d="M95,288 C90,300 84,332 82,362 L78,415 C76,436 78,456 80,476 C82,492 86,502 94,506 C102,510 110,508 114,500 C117,494 116,478 115,462 L112,418 L116,368 C118,340 120,310 124,288 Z"
                    fill="rgba(46,134,171,0.05)"
                    stroke="rgba(46,134,171,0.26)"
                    strokeWidth="2"
                  />
                  {/* Right leg */}
                  <path
                    d="M185,288 C190,300 196,332 198,362 L202,415 C204,436 202,456 200,476 C198,492 194,502 186,506 C178,510 170,508 166,500 C163,494 164,478 165,462 L168,418 L164,368 C162,340 160,310 156,288 Z"
                    fill="rgba(46,134,171,0.05)"
                    stroke="rgba(46,134,171,0.26)"
                    strokeWidth="2"
                  />
                  {/* Spine line — more visible */}
                  <line x1="140" y1="103" x2="140" y2="288" stroke="rgba(46,134,171,0.22)" strokeWidth="1.5" strokeDasharray="4 4" />
                  {/* Shoulder reference line */}
                  <line x1="65" y1="115" x2="215" y2="115" stroke="rgba(46,134,171,0.14)" strokeWidth="1" strokeDasharray="3 6" />
                  {/* Hip reference line */}
                  <line x1="60" y1="252" x2="220" y2="252" stroke="rgba(46,134,171,0.14)" strokeWidth="1" strokeDasharray="3 6" />
                  {/* Knee reference line */}
                  <line x1="68" y1="410" x2="172" y2="410" stroke="rgba(46,134,171,0.1)" strokeWidth="1" strokeDasharray="3 6" />
                  {/* Rib cage hint */}
                  <ellipse cx="140" cy="175" rx="40" ry="50" fill="none" stroke="rgba(46,134,171,0.08)" strokeWidth="1" strokeDasharray="2 4" />
                  {/* Anatomical label: spine indicator tick marks */}
                  {[130, 160, 190, 220, 250, 275].map((y) => (
                    <line key={y} x1="135" y1={y} x2="145" y2={y} stroke="rgba(46,134,171,0.18)" strokeWidth="1" />
                  ))}
                </svg>

                {/* Hotspot overlays — absolute positioned within the 280x560 container */}
                {/* 0: head — 頭痛 */}
                <HotspotDot
                  id={0}
                  label={hotspots[0].label}
                  desc={hotspots[0].desc}
                  x={140}
                  y={32}
                  active={activeHotspot === 0}
                  onToggle={setActiveHotspot}
                  tooltipRight={true}
                />
                {/* 1: shoulders — 肩こり */}
                <HotspotDot
                  id={1}
                  label={hotspots[1].label}
                  desc={hotspots[1].desc}
                  x={82}
                  y={112}
                  active={activeHotspot === 1}
                  onToggle={setActiveHotspot}
                  tooltipRight={false}
                />
                {/* 2: neck/upper spine — 交通事故後遺症 */}
                <HotspotDot
                  id={2}
                  label={hotspots[2].label}
                  desc={hotspots[2].desc}
                  x={198}
                  y={88}
                  active={activeHotspot === 2}
                  onToggle={setActiveHotspot}
                  tooltipRight={true}
                />
                {/* 3: mid spine — 姿勢の歪み */}
                <HotspotDot
                  id={3}
                  label={hotspots[3].label}
                  desc={hotspots[3].desc}
                  x={140}
                  y={185}
                  active={activeHotspot === 3}
                  onToggle={setActiveHotspot}
                  tooltipRight={false}
                />
                {/* 4: lower back — 腰痛 */}
                <HotspotDot
                  id={4}
                  label={hotspots[4].label}
                  desc={hotspots[4].desc}
                  x={140}
                  y={268}
                  active={activeHotspot === 4}
                  onToggle={setActiveHotspot}
                  tooltipRight={true}
                />
                {/* 5: knee — スポーツ障害 */}
                <HotspotDot
                  id={5}
                  label={hotspots[5].label}
                  desc={hotspots[5].desc}
                  x={108}
                  y={415}
                  active={activeHotspot === 5}
                  onToggle={setActiveHotspot}
                  tooltipRight={false}
                />
              </div>

              {/* Legend — right side */}
              <div className="flex flex-col gap-3 min-w-[260px] pt-8">
                <p className="text-xs text-[#1A2B3C]/40 tracking-widest mb-3">対応している症状</p>
                {hotspots.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => setActiveHotspot(activeHotspot === h.id ? null : h.id)}
                    className="flex items-start gap-3 text-left group transition-all rounded-lg px-3 py-2.5 -mx-3"
                    style={{
                      background: activeHotspot === h.id ? "rgba(46,134,171,0.04)" : "transparent",
                    }}
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-0.5 transition-all"
                      style={{
                        background: activeHotspot === h.id ? "#48B89C" : "rgba(46,134,171,0.35)",
                        boxShadow: activeHotspot === h.id ? "0 0 10px rgba(72,184,156,0.6)" : "none",
                        transform: activeHotspot === h.id ? "scale(1.5)" : "scale(1)",
                      }}
                    />
                    <div>
                      <p
                        className="text-sm font-medium transition-colors"
                        style={{ color: activeHotspot === h.id ? "#2E86AB" : "#1A2B3C" }}
                      >
                        {h.label}
                      </p>
                      <p
                        className="text-xs text-[#1A2B3C]/50 leading-relaxed mt-0.5 transition-all overflow-hidden"
                        style={{
                          maxHeight: activeHotspot === h.id ? "80px" : "0px",
                          opacity: activeHotspot === h.id ? 1 : 0,
                          transition: "max-height 0.35s ease, opacity 0.3s ease",
                        }}
                      >
                        {h.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile: compact body silhouette + tappable hotspots */}
          <div className="md:hidden">
            {/* Small body silhouette with tappable areas */}
            <div className="relative mx-auto mb-6" style={{ width: "180px", height: "360px" }}>
              <svg
                viewBox="0 0 280 560"
                fill="none"
                className="absolute inset-0 w-full h-full"
                aria-hidden="true"
              >
                <ellipse cx="140" cy="45" rx="32" ry="38" fill="rgba(46,134,171,0.05)" stroke="rgba(46,134,171,0.2)" strokeWidth="1.5" />
                <rect x="130" y="79" width="20" height="24" rx="7" fill="rgba(46,134,171,0.05)" stroke="rgba(46,134,171,0.18)" strokeWidth="1.5" />
                <path d="M92,103 C80,103 68,116 65,140 L60,215 C59,234 63,248 76,252 L204,252 C217,248 221,234 220,215 L215,140 C212,116 200,103 188,103 Z" fill="rgba(46,134,171,0.05)" stroke="rgba(46,134,171,0.2)" strokeWidth="1.5" />
                <path d="M78,252 Q70,276 74,290 L206,290 Q210,276 202,252 Z" fill="rgba(46,134,171,0.04)" stroke="rgba(46,134,171,0.16)" strokeWidth="1.5" />
                <path d="M92,107 C76,109 60,124 54,150 L44,215 C42,232 46,242 54,244 C62,246 68,238 70,222 L78,168 C80,152 82,138 92,126 Z" fill="rgba(46,134,171,0.04)" stroke="rgba(46,134,171,0.16)" strokeWidth="1.5" />
                <path d="M188,107 C204,109 220,124 226,150 L236,215 C238,232 234,242 226,244 C218,246 212,238 210,222 L202,168 C200,152 198,138 188,126 Z" fill="rgba(46,134,171,0.04)" stroke="rgba(46,134,171,0.16)" strokeWidth="1.5" />
                <path d="M95,288 C90,300 84,332 82,362 L78,415 C76,436 78,456 80,476 C82,492 86,502 94,506 C102,510 110,508 114,500 C117,494 116,478 115,462 L112,418 L116,368 C118,340 120,310 124,288 Z" fill="rgba(46,134,171,0.04)" stroke="rgba(46,134,171,0.16)" strokeWidth="1.5" />
                <path d="M185,288 C190,300 196,332 198,362 L202,415 C204,436 202,456 200,476 C198,492 194,502 186,506 C178,510 170,508 166,500 C163,494 164,478 165,462 L168,418 L164,368 C162,340 160,310 156,288 Z" fill="rgba(46,134,171,0.04)" stroke="rgba(46,134,171,0.16)" strokeWidth="1.5" />
                <line x1="140" y1="103" x2="140" y2="288" stroke="rgba(46,134,171,0.1)" strokeWidth="1" strokeDasharray="4 4" />
              </svg>

              {/* Mobile hotspot dots — scaled positions for the 180x360 container */}
              {[
                { id: 0, x: 90, y: 21 },
                { id: 1, x: 53, y: 72 },
                { id: 2, x: 127, y: 56 },
                { id: 3, x: 90, y: 119 },
                { id: 4, x: 90, y: 172 },
                { id: 5, x: 69, y: 267 },
              ].map((pos) => (
                <button
                  key={pos.id}
                  onClick={() => setActiveHotspot(activeHotspot === pos.id ? null : pos.id)}
                  className="absolute"
                  style={{
                    left: `${pos.x}px`,
                    top: `${pos.y}px`,
                    transform: "translate(-50%, -50%)",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    background: activeHotspot === pos.id
                      ? "radial-gradient(circle, #48B89C, #2E86AB)"
                      : "radial-gradient(circle, rgba(72,184,156,0.8), rgba(46,134,171,0.65))",
                    border: `2px solid ${activeHotspot === pos.id ? "#48B89C" : "rgba(72,184,156,0.8)"}`,
                    boxShadow: activeHotspot === pos.id
                      ? "0 0 22px rgba(72,184,156,0.85), 0 0 6px rgba(46,134,171,0.4)"
                      : "0 0 12px rgba(72,184,156,0.5), 0 0 4px rgba(46,134,171,0.25)",
                    zIndex: activeHotspot === pos.id ? 20 : 10,
                    transition: "all 0.2s ease",
                  }}
                  aria-label={hotspots[pos.id].label}
                />
              ))}
            </div>

            {/* Mobile symptom detail cards */}
            <div className="grid grid-cols-2 gap-3">
              {hotspots.map((h) => (
                <button
                  key={h.id}
                  onClick={() => setActiveHotspot(activeHotspot === h.id ? null : h.id)}
                  className="text-left rounded-2xl p-4 transition-all"
                  style={{
                    background: activeHotspot === h.id
                      ? "linear-gradient(135deg, rgba(46,134,171,0.1), rgba(72,184,156,0.08))"
                      : "linear-gradient(135deg, #F7F9FC, #EEF4F9)",
                    border: `1.5px solid ${activeHotspot === h.id ? "rgba(46,134,171,0.35)" : "rgba(46,134,171,0.1)"}`,
                    boxShadow: activeHotspot === h.id ? "0 4px 16px rgba(46,134,171,0.1)" : "none",
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0 transition-all"
                      style={{
                        background: activeHotspot === h.id ? "#48B89C" : "rgba(46,134,171,0.4)",
                        boxShadow: activeHotspot === h.id ? "0 0 8px rgba(72,184,156,0.5)" : "none",
                      }}
                    />
                    <p
                      className="font-medium text-sm transition-colors"
                      style={{ color: activeHotspot === h.id ? "#2E86AB" : "#1A2B3C" }}
                    >
                      {h.label}
                    </p>
                  </div>
                  <p
                    className="text-xs text-[#1A2B3C]/55 leading-relaxed transition-all overflow-hidden"
                    style={{
                      maxHeight: activeHotspot === h.id ? "80px" : "0px",
                      opacity: activeHotspot === h.id ? 1 : 0,
                      transition: "max-height 0.35s ease, opacity 0.3s ease",
                    }}
                  >
                    {h.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="text-center mt-10">
            <p className="text-sm text-[#1A2B3C]/55">
              上記以外のお悩みもお気軽にご相談ください。まずはカウンセリングからお受けします。
            </p>
          </div>
        </div>
      </section>

      {/* ===== Treatment Menu Section — Horizontal Scroll Strip ===== */}
      <section className="py-20 bg-[#F7F9FC] section-fade" id="menu">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] text-[#2E86AB] mb-3">TREATMENT MENU</p>
            <h2 className="font-serif-jp text-2xl md:text-3xl text-[#1A2B3C] mb-4">施術メニュー</h2>
            <p className="text-sm text-[#1A2B3C]/55 max-w-md mx-auto leading-relaxed">
              お体の状態に合わせた最適な施術をご提案します。初回は必ずカウンセリングを行います。
            </p>
          </div>

          {/* Horizontal scroll hint */}
          <div className="flex items-center gap-2 mb-4 text-xs text-[#1A2B3C]/35">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <span>スクロールして全メニューを確認</span>
          </div>

          {/* Horizontal scroll container */}
          <div
            className="treatment-scroll flex gap-6 overflow-x-auto pb-6 px-1"
            style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
          >
            {[
              {
                title: "骨盤矯正",
                subtitle: "Pelvis Correction",
                desc: "骨盤の歪みを整え、腰痛・肩こり・姿勢の改善を図ります。産後骨盤矯正にも対応。体のバランスを根本から整えることで慢性的な不調を改善します。",
                price: "¥3,500〜",
                duration: "30〜45分",
                img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80",
                tag: "人気No.1",
                tagColor: "#2E86AB",
                accentBorder: "#2E86AB",
              },
              {
                title: "鍼灸施術",
                subtitle: "Acupuncture",
                desc: "東洋医学の知識を活かした鍼灸で、慢性痛・自律神経の乱れ・頭痛・冷えなど幅広いお悩みに対応。国家資格を持つ鍼灸師が担当します。",
                price: "¥4,000〜",
                duration: "40〜60分",
                img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=80",
                tag: "慢性痛に",
                tagColor: "#48B89C",
                accentBorder: "#48B89C",
              },
              {
                title: "手技マッサージ",
                subtitle: "Manual Therapy",
                desc: "筋肉の緊張をほぐし、血行を促進するマッサージ療法。疲労回復・肩こり・腰痛など日常の疲れをリセットします。コース選択で全身・部分施術も可能。",
                price: "¥2,800〜",
                duration: "20〜60分",
                img: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=600&q=80",
                tag: "リラックス",
                tagColor: "#2E86AB",
                accentBorder: "#2E86AB",
              },
              {
                title: "スポーツケア",
                subtitle: "Sports Care",
                desc: "捻挫・打撲・肉離れなどのスポーツ障害の早期回復をサポート。テーピング・アイシング・リハビリ指導も含む包括的なケアで競技復帰までを支援します。",
                price: "¥3,000〜",
                duration: "30〜60分",
                img: "https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=600&q=80",
                tag: "アスリート向け",
                tagColor: "#48B89C",
                accentBorder: "#48B89C",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="tilt-card flex-shrink-0 rounded-2xl overflow-hidden bg-white flex flex-col"
                style={{
                  width: "clamp(270px, 74vw, 310px)",
                  minHeight: "480px",
                  scrollSnapAlign: "start",
                  border: "1px solid rgba(46,134,171,0.1)",
                  borderTop: `3px solid ${item.accentBorder}`,
                  boxShadow: "0 6px 28px rgba(26,43,60,0.07)",
                }}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
              >
                {/* Photo — tall top section */}
                <div className="relative overflow-hidden" style={{ height: "240px" }}>
                  <Image src={item.img} alt={item.title} className="w-full h-full object-cover" width={600} height={400} />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(26,43,60,0.6) 100%)" }} />
                  <span
                    className="absolute top-3 right-3 text-xs px-3 py-1 rounded-full text-white font-medium"
                    style={{ background: `linear-gradient(135deg, ${item.tagColor}, rgba(26,43,60,0.5))` }}
                  >
                    {item.tag}
                  </span>
                  {/* Price overlay on image bottom */}
                  <div className="absolute bottom-0 left-0 right-0 px-5 pb-4 flex items-end justify-between">
                    <div>
                      <h3 className="font-serif-jp text-xl text-white leading-tight drop-shadow-sm">{item.title}</h3>
                      <p className="text-[10px] text-white/70 tracking-wider mt-0.5">{item.subtitle}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white text-lg font-medium leading-none">{item.price}</p>
                      <p className="text-white/65 text-[10px] mt-0.5">{item.duration}</p>
                    </div>
                  </div>
                </div>

                {/* Details — bottom section */}
                <div className="p-5 flex flex-col gap-3 flex-1">
                  <p className="text-xs text-[#1A2B3C]/60 leading-relaxed flex-1">{item.desc}</p>
                  <a
                    href="#contact"
                    className="mt-auto text-center text-xs py-2.5 rounded-full font-medium transition-all hover:shadow-md"
                    style={{
                      background: `linear-gradient(135deg, ${item.accentBorder}10, ${item.accentBorder}08)`,
                      color: item.accentBorder,
                      border: `1px solid ${item.accentBorder}30`,
                    }}
                  >
                    この施術を予約する
                  </a>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-[#1A2B3C]/45 mt-6">
            ※ 表示価格は税込みです。症状・施術内容によって変動する場合があります。詳しくはお問い合わせください。
          </p>
        </div>
      </section>

      {/* ===== Features Section ===== */}
      <section className="py-20 bg-white medical-grid section-fade" id="features">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] text-[#2E86AB] mb-3">OUR STRENGTHS</p>
            <h2 className="font-serif-jp text-2xl md:text-3xl text-[#1A2B3C] mb-4">当院の特徴</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                title: "丁寧なカウンセリング",
                desc: "初回は必ず30分以上のカウンセリングを実施。生活習慣・お体の状態・ご要望を丁寧にヒアリングし、最適な施術プランを一緒に考えます。押しつけの施術は一切しません。",
                icon: (
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2E86AB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                ),
              },
              {
                num: "02",
                title: "島で20年の実績",
                desc: "奄美大島で20年以上にわたり地域の方々のお体を支えてきました。離島特有の生活環境・労働環境を熟知した上で、島ならではのアドバイスをお伝えします。",
                icon: (
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2E86AB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                ),
              },
              {
                num: "03",
                title: "予約優先制で待ち時間なし",
                desc: "完全予約優先制を採用しているため、お待たせすることがありません。お電話・LINEから簡単にご予約いただけます。急なお悩みにも当日予約で対応します。",
                icon: (
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2E86AB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                    <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <div key={i} className="text-center flex flex-col items-center gap-4">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #EEF4F9, #E0EFF8)", border: "2px solid rgba(46,134,171,0.15)" }}
                >
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs tracking-widest text-[#48B89C] mb-1 font-medium">{item.num}</p>
                  <h3 className="font-serif-jp text-lg text-[#1A2B3C] mb-3">{item.title}</h3>
                  <p className="text-sm text-[#1A2B3C]/60 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Flow Section ===== */}
      <section className="py-20 bg-[#F7F9FC] section-fade" id="flow" ref={flowRef}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] text-[#2E86AB] mb-3">FLOW</p>
            <h2 className="font-serif-jp text-2xl md:text-3xl text-[#1A2B3C] mb-4">施術の流れ</h2>
            <p className="text-sm text-[#1A2B3C]/55">初めての方も安心してご来院いただけるよう、わかりやすくご説明します。</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative">
            {[
              {
                step: "01",
                title: "ご予約",
                desc: "お電話またはLINEにてご予約。当日予約も可能です。",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 9.8a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                ),
              },
              {
                step: "02",
                title: "受付・問診",
                desc: "来院後、問診票にご記入いただきます。初回は10〜15分ほどです。",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                ),
              },
              {
                step: "03",
                title: "カウンセリング・施術",
                desc: "担当スタッフが丁寧にお体の状態を確認し、最適な施術を行います。",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                ),
              },
              {
                step: "04",
                title: "アフターケア",
                desc: "施術後のセルフケア方法や次回来院の目安をお伝えします。",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-3 relative">
                {i < 3 && (
                  <div
                    className={`flow-line-animated${flowVisible ? ` draw draw-delay-${i + 1}` : ""}`}
                  >
                    {flowVisible && (
                      <>
                        <div className="flow-travel-dot" style={{ "--dot-delay": `${0.4 + i * 0.3 + 0.6}s` } as React.CSSProperties} />
                        <div className="flow-travel-dot" style={{ "--dot-delay": `${0.4 + i * 0.3 + 1.4}s` } as React.CSSProperties} />
                        <div className="flow-travel-dot" style={{ "--dot-delay": `${0.4 + i * 0.3 + 2.2}s` } as React.CSSProperties} />
                      </>
                    )}
                  </div>
                )}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center z-10 relative flex-shrink-0${flowIconsBounced[i] ? " flow-icon-bounce" : ""}`}
                  style={{
                    background: "linear-gradient(135deg, #2E86AB, #48B89C)",
                    boxShadow: "0 4px 20px rgba(46,134,171,0.4), 0 0 0 3px rgba(46,134,171,0.1)"
                  }}
                >
                  {item.icon}
                </div>
                <p className="text-xs font-medium text-[#48B89C] tracking-wider">STEP {item.step}</p>
                <h3 className="font-medium text-[#1A2B3C] text-sm">{item.title}</h3>
                <p className="text-xs text-[#1A2B3C]/55 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Staff Section ===== */}
      <section className="py-20 bg-white medical-grid section-fade" id="staff">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] text-[#2E86AB] mb-3">STAFF</p>
            <h2 className="font-serif-jp text-2xl md:text-3xl text-[#1A2B3C] mb-4">院長紹介</h2>
          </div>

          <div
            className="rounded-2xl overflow-hidden flex flex-col md:flex-row"
            style={{ border: "1px solid rgba(46,134,171,0.1)", boxShadow: "0 8px 40px rgba(26,43,60,0.07)" }}
          >
            <div className="md:w-64 h-64 md:h-auto flex-shrink-0 overflow-hidden relative">
              <Image
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80"
                alt="院長 高橋 健一"
                className="w-full h-full object-cover"
                width={400}
                height={400}
              />
              <div className="absolute bottom-0 left-0 right-0 p-3 md:hidden" style={{ background: "linear-gradient(0deg, rgba(26,43,60,0.7) 0%, transparent 100%)" }}>
                <p className="text-white font-serif-jp text-lg">高橋 健一</p>
              </div>
            </div>
            <div className="p-8 flex flex-col justify-center">
              <div className="hidden md:block mb-1">
                <p className="text-xs text-[#2E86AB] tracking-widest mb-1">DIRECTOR</p>
                <h3 className="font-serif-jp text-2xl text-[#1A2B3C] mb-1">高橋 健一</h3>
                <p className="text-xs text-[#1A2B3C]/50 mb-4">Kenichi Sakuta</p>
              </div>
              <div className="flex flex-wrap gap-2 mb-5">
                {["柔道整復師", "鍼灸師", "健康運動指導士"].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full"
                    style={{ background: "rgba(46,134,171,0.08)", color: "#2E86AB", border: "1px solid rgba(46,134,171,0.2)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-sm text-[#1A2B3C]/65 leading-relaxed mb-4">
                奄美大島出身。東京の専門学校で柔道整復術・鍼灸を学び、都内クリニックでの勤務経験を経て故郷・奄美大島に戻り開業。「島で生まれ育った者として、島の人たちの体を支えたい」という思いで日々施術に取り組んでいます。
              </p>
              <p className="text-sm text-[#1A2B3C]/65 leading-relaxed">
                漁業・農業・建設など体を酷使するお仕事の方から、子育て中のお母さん、スポーツに取り組む学生まで、幅広い世代の方々に寄り添ってきました。患者さん一人ひとりの生活背景を大切に、長く通い続けていただける整骨院を目指しています。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Gallery / Clinic Interior Section ===== */}
      <section className="py-20 bg-[#F7F9FC] section-fade" id="gallery">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] text-[#2E86AB] mb-3">CLINIC</p>
            <h2 className="font-serif-jp text-2xl md:text-3xl text-[#1A2B3C] mb-4">院内紹介</h2>
            <p className="text-sm text-[#1A2B3C]/55 max-w-md mx-auto">清潔で落ち着いた院内で、リラックスして施術を受けていただけます。</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              {
                src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80",
                label: "受付・待合室",
                span: "md:col-span-2",
              },
              {
                src: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=600&q=80",
                label: "施術室",
                span: "",
              },
              {
                src: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80",
                label: "骨盤矯正ルーム",
                span: "",
              },
              {
                src: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=600&q=80",
                label: "鍼灸室",
                span: "",
              },
              {
                src: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=600&q=80",
                label: "リハビリエリア",
                span: "",
              },
            ].map((photo, i) => (
              <div
                key={i}
                className={`relative rounded-xl overflow-hidden group ${photo.span}`}
                style={{ height: "200px" }}
              >
                <Image
                  src={photo.src}
                  alt={photo.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  width={600}
                  height={400}
                />
                <div
                  className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(0deg, rgba(26,43,60,0.7) 0%, transparent 60%)" }}
                >
                  <span className="text-white text-sm font-medium">{photo.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Access Section ===== */}
      <section className="py-20 bg-white section-fade" id="access">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] text-[#2E86AB] mb-3">ACCESS</p>
            <h2 className="font-serif-jp text-2xl md:text-3xl text-[#1A2B3C] mb-4">アクセス・診療時間</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            {/* Hours Table */}
            <div>
              <h3 className="font-serif-jp text-lg text-[#1A2B3C] mb-5 flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2E86AB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                診療時間
              </h3>
              <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(46,134,171,0.12)" }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: "linear-gradient(135deg, #2E86AB, #48B89C)" }}>
                      <th className="text-left px-4 py-3 text-white font-medium">診療日</th>
                      <th className="text-center px-4 py-3 text-white font-medium">午前</th>
                      <th className="text-center px-4 py-3 text-white font-medium">午後</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { day: "月・火・水・木・金", am: "9:00〜12:00", pm: "14:00〜19:00", closed: false },
                      { day: "土曜日", am: "9:00〜13:00", pm: "休診", closed: true },
                      { day: "日曜・祝日", am: "休診", pm: "休診", closed: true },
                    ].map((row, i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? "#F7F9FC" : "white", borderBottom: "1px solid rgba(46,134,171,0.07)" }}>
                        <td className="px-4 py-3 font-medium text-[#1A2B3C]">{row.day}</td>
                        <td className={`px-4 py-3 text-center ${row.am === "休診" ? "text-[#1A2B3C]/35" : "text-[#2E86AB]"}`}>{row.am}</td>
                        <td className={`px-4 py-3 text-center ${row.pm === "休診" ? "text-[#1A2B3C]/35" : "text-[#2E86AB]"}`}>{row.pm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-[#1A2B3C]/45 mt-3">※ 祝日の翌平日は休診となる場合がございます。</p>

              <div className="mt-8 space-y-4">
                <h3 className="font-serif-jp text-lg text-[#1A2B3C] flex items-center gap-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2E86AB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  所在地・アクセス
                </h3>
                <div className="space-y-2 text-sm text-[#1A2B3C]/65">
                  <p><span className="font-medium text-[#1A2B3C]">住所：</span>鹿児島県奄美市名瀬XX-XX</p>
                  <p><span className="font-medium text-[#1A2B3C]">電話：</span><a href="tel:0997-XX-XXXX" className="text-[#2E86AB]">0997-XX-XXXX</a></p>
                  <p><span className="font-medium text-[#1A2B3C]">メール：</span><a href="mailto:info@shimatsumugi.com" className="text-[#2E86AB]">info@shimatsumugi.com</a></p>
                  <p><span className="font-medium text-[#1A2B3C]">駐車場：</span>院前に6台分あり（無料）</p>
                  <p><span className="font-medium text-[#1A2B3C]">バス：</span>名瀬バスターミナルより徒歩10分</p>
                </div>
              </div>
            </div>

            <div>
              <div
                className="rounded-xl overflow-hidden h-80 flex items-center justify-center relative"
                style={{ background: "linear-gradient(135deg, #EEF4F9, #DDF0F3)", border: "1px solid rgba(46,134,171,0.12)" }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80"
                  alt="奄美大島の風景"
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                  width={600}
                  height={400}
                />
                <div className="relative text-center">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2E86AB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-3">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <p className="text-[#2E86AB] font-medium">島つむぎ整骨院</p>
                  <p className="text-xs text-[#1A2B3C]/50 mt-1">鹿児島県奄美市名瀬</p>
                  <p className="text-xs text-[#1A2B3C]/40 mt-3">※ 実際の地図はGoogle Maps等で表示します</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Contact / Reservation Section ===== */}
      <section
        className="py-20"
        id="contact"
        style={{ background: "linear-gradient(135deg, #1A2B3C 0%, #2E86AB 100%)" }}
      >
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] text-white/60 mb-3">CONTACT</p>
            <h2 className="font-serif-jp text-2xl md:text-3xl text-white mb-4">ご予約・お問い合わせ</h2>
            <p className="text-sm text-white/65 max-w-md mx-auto">
              お気軽にお電話またはフォームからご連絡ください。初めての方も歓迎いたします。
            </p>
          </div>

          {/* Phone CTA */}
          <div className="text-center mb-12">
            <a
              href="tel:0997-XX-XXXX"
              className="cta-pulse inline-flex items-center gap-3 px-10 py-5 rounded-full transition-all hover:-translate-y-1"
              style={{ background: "white", boxShadow: "0 8px 40px rgba(0,0,0,0.2)" }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2E86AB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 9.8a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <div className="text-left">
                <p className="text-xs text-[#1A2B3C]/50 leading-none mb-1">お電話でのご予約</p>
                <p className="text-2xl font-medium text-[#2E86AB] tracking-wider leading-none">0997-XX-XXXX</p>
              </div>
            </a>
            <p className="text-xs text-white/40 mt-3">受付時間：月〜金 9:00〜12:00 / 14:00〜19:00 / 土 9:00〜13:00</p>
          </div>

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-4">
              <div className="h-px w-16 bg-white/20" />
              <span className="text-white/40 text-sm">またはフォームで送信</span>
              <div className="h-px w-16 bg-white/20" />
            </div>
          </div>

          {/* Contact Form */}
          <div
            className="rounded-2xl p-8 md:p-10"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(12px)" }}
          >
            {submitted ? (
              <div className="text-center py-12">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ background: "rgba(72,184,156,0.2)", border: "2px solid #48B89C" }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#48B89C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-serif-jp text-xl text-white mb-3">送信ありがとうございます</h3>
                <p className="text-sm text-white/65">内容を確認の上、2営業日以内にご連絡いたします。</p>
              </div>
            ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs text-white/70 mb-2 tracking-wide">お名前 <span className="text-[#48B89C]">*</span></label>
                <input
                  type="text"
                  placeholder="山田 花子"
                  className="w-full px-4 py-3 rounded-xl text-sm text-[#1A2B3C] transition-all"
                  style={{ background: "rgba(255,255,255,0.92)", border: "1px solid rgba(255,255,255,0.3)" }}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs text-white/70 mb-2 tracking-wide">電話番号 <span className="text-[#48B89C]">*</span></label>
                <input
                  type="tel"
                  placeholder="0997-XX-XXXX"
                  className="w-full px-4 py-3 rounded-xl text-sm text-[#1A2B3C] transition-all"
                  style={{ background: "rgba(255,255,255,0.92)", border: "1px solid rgba(255,255,255,0.3)" }}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs text-white/70 mb-2 tracking-wide">ご希望日時</label>
                <input
                  type="datetime-local"
                  className="w-full px-4 py-3 rounded-xl text-sm text-[#1A2B3C] transition-all"
                  style={{ background: "rgba(255,255,255,0.92)", border: "1px solid rgba(255,255,255,0.3)" }}
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs text-white/70 mb-2 tracking-wide">施術メニュー</label>
                <select
                  className="w-full px-4 py-3 rounded-xl text-sm text-[#1A2B3C] transition-all appearance-none"
                  style={{ background: "rgba(255,255,255,0.92)", border: "1px solid rgba(255,255,255,0.3)" }}
                  value={formData.menu}
                  onChange={(e) => setFormData({ ...formData, menu: e.target.value })}
                >
                  <option value="">選択してください</option>
                  <option value="pelvis">骨盤矯正</option>
                  <option value="acupuncture">鍼灸施術</option>
                  <option value="massage">手技マッサージ</option>
                  <option value="sports">スポーツケア</option>
                  <option value="other">その他・相談したい</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs text-white/70 mb-2 tracking-wide">症状・ご相談内容</label>
                <textarea
                  rows={4}
                  placeholder="気になる症状や、ご質問がございましたらご記入ください。初めての方も気軽にどうぞ。"
                  className="w-full px-4 py-3 rounded-xl text-sm text-[#1A2B3C] resize-none transition-all"
                  style={{ background: "rgba(255,255,255,0.92)", border: "1px solid rgba(255,255,255,0.3)" }}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
            </div>
            <div className="mt-6 text-center">
              <button
                type="submit"
                className="cta-button-pulse px-12 py-4 rounded-full text-white text-sm font-medium transition-all hover:-translate-y-1"
                style={{ background: "linear-gradient(135deg, #48B89C, #2E86AB)", boxShadow: "0 6px 28px rgba(72,184,156,0.4)" }}
              >
                送信する
              </button>
              <p className="text-xs text-white/40 mt-3">送信後、2営業日以内にご連絡いたします。</p>
            </div>
            </form>
            )}
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="bg-[#1A2B3C] text-white/55 py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            {/* Brand */}
            <div>
              <h3 className="font-serif-jp text-xl text-white mb-2">島つむぎ整骨院</h3>
              <p className="text-xs leading-relaxed mb-4">
                島の暮らしに寄り添う、からだのケア。<br />
                奄美大島に根ざした整骨院として、地域の皆様の健康をサポートします。
              </p>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 rounded-full" style={{ background: receptionColor }} />
                <span style={{ color: receptionColor }}>{receptionLabel}</span>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-white text-sm font-medium mb-4">メニュー</h4>
              <ul className="space-y-2 text-sm">
                {(["施術メニュー", "当院の特徴", "院長紹介", "アクセス・診療時間", "ご予約・お問い合わせ"] as const).map((item) => (
                  <li key={item}>
                    <a href={`#${footerLinkMap[item]}`} className="hover:text-white transition-colors text-xs">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white text-sm font-medium mb-4">お問い合わせ</h4>
              <div className="space-y-2 text-xs">
                <p>鹿児島県奄美市名瀬XX-XX</p>
                <p><a href="tel:0997-XX-XXXX" className="hover:text-white transition-colors">TEL: 0997-XX-XXXX</a></p>
                <p><a href="mailto:info@shimatsumugi.com" className="hover:text-white transition-colors text-[10px]">info@shimatsumugi.com</a></p>
                <p className="pt-2">月〜金 9:00〜19:00（昼休み 12:00〜14:00）<br />土 9:00〜13:00 / 日祝 休診</p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
            <p>&copy; 2026 島つむぎ整骨院 All Rights Reserved.</p>
            <p>
              このサイトは{" "}
              <a href="/web#gallery" className="text-[#2E86AB] hover:text-[#48B89C] transition-colors">ALPACA</a>
              {" "}によるデモサイトです
            </p>
          </div>
        </div>
      </footer>

      {/* ===== FIXED BOTTOM CTA BAR ===== */}
      <style>{`
        @keyframes osteo-cta-slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .osteo-cta-bar {
          animation: osteo-cta-slide-up 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
      {showCta && (
        <div
          className="osteo-cta-bar fixed bottom-0 left-0 right-0 z-40 px-4 py-3 flex items-center justify-between gap-3"
          style={{
            backgroundColor: "rgba(247, 249, 252, 0.97)",
            backdropFilter: "blur(12px)",
            borderTop: "1px solid rgba(46,134,171,0.2)",
            boxShadow: "0 -4px 20px rgba(46,134,171,0.08)",
          }}
          role="complementary"
          aria-label="お問い合わせのショートカット"
        >
          <a
            href="tel:0997-XX-XXXX"
            className="flex items-center justify-center gap-2 flex-1 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 hover:opacity-80"
            style={{ backgroundColor: "#2E86AB", color: "#ffffff" }}
            aria-label="電話する: 0997-XX-XXXX"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>
            電話する
          </a>
          <a
            href="#contact"
            className="flex items-center justify-center gap-2 flex-1 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 hover:opacity-80"
            style={{ border: "1px solid rgba(46,134,171,0.5)", color: "#2E86AB" }}
            aria-label="お問い合わせフォームへスクロール"
          >
            Web予約/お問い合わせ
          </a>
        </div>
      )}
    </div>
  );
}

// ===== Hotspot Dot Component =====
// containerWidth: pixel width of the parent container (default 280)
// tooltipRight: preferred side — auto-flipped if tooltip would overflow
function HotspotDot({
  id,
  label,
  desc,
  x,
  y,
  active,
  onToggle,
  tooltipRight,
  containerWidth = 280,
}: {
  id: number;
  label: string;
  desc: string;
  x: number;
  y: number;
  active: boolean;
  onToggle: (id: number | null) => void;
  tooltipRight: boolean;
  containerWidth?: number;
}) {
  const TOOLTIP_W = 200;
  const CONNECTOR = 14;
  // Flip if the preferred side would overflow the container
  const wouldOverflowRight = tooltipRight && x + CONNECTOR + TOOLTIP_W > containerWidth;
  const wouldOverflowLeft = !tooltipRight && x - CONNECTOR - TOOLTIP_W < 0;
  const showRight = wouldOverflowLeft ? true : wouldOverflowRight ? false : tooltipRight;

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        transform: "translate(-50%, -50%)",
        zIndex: active ? 20 : 10,
        overflow: "visible",
      }}
    >
      {/* Pulse rings */}
      {!active && (
        <>
          <div
            className="hotspot-ring absolute rounded-full"
            style={{
              width: "20px",
              height: "20px",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "rgba(72,184,156,0.45)",
            }}
          />
          <div
            className="hotspot-ring-2 absolute rounded-full"
            style={{
              width: "20px",
              height: "20px",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "rgba(46,134,171,0.3)",
            }}
          />
        </>
      )}

      {/* Active glow ring */}
      {active && (
        <div
          className="absolute rounded-full"
          style={{
            width: "36px",
            height: "36px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(72,184,156,0.15)",
            border: "2px solid rgba(72,184,156,0.5)",
            boxShadow: "0 0 20px rgba(72,184,156,0.4), inset 0 0 8px rgba(72,184,156,0.2)",
          }}
        />
      )}

      {/* Dot button */}
      <button
        onClick={() => onToggle(active ? null : id)}
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          background: active
            ? "radial-gradient(circle, #48B89C, #2E86AB)"
            : "radial-gradient(circle, rgba(72,184,156,0.8), rgba(46,134,171,0.7))",
          border: `2px solid ${active ? "#48B89C" : "rgba(72,184,156,0.9)"}`,
          boxShadow: active
            ? "0 0 24px rgba(72,184,156,0.85), 0 0 8px rgba(46,134,171,0.5)"
            : "0 0 12px rgba(72,184,156,0.5), 0 0 4px rgba(46,134,171,0.3)",
          cursor: "pointer",
          position: "relative",
          zIndex: 2,
          transition: "all 0.25s ease",
          transform: active ? "scale(1.5)" : "scale(1)",
        }}
        aria-label={label}
      />

      {/* Tooltip */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          [showRight ? "left" : "right"]: "calc(100% + 14px)",
          transform: `translateY(-50%) ${active ? "scale(1)" : "scale(0.92)"}`,
          background: "white",
          border: "1px solid rgba(46,134,171,0.15)",
          borderLeft: showRight ? "3px solid #48B89C" : "1px solid rgba(46,134,171,0.15)",
          borderRight: !showRight ? "3px solid #48B89C" : "1px solid rgba(46,134,171,0.15)",
          borderRadius: "12px",
          padding: "12px 16px",
          width: "200px",
          boxShadow: "0 12px 32px rgba(26,43,60,0.12), 0 2px 8px rgba(46,134,171,0.08)",
          opacity: active ? 1 : 0,
          pointerEvents: active ? "auto" : "none",
          transition: "opacity 0.25s ease, transform 0.25s ease",
          transformOrigin: showRight ? "left center" : "right center",
          zIndex: 30,
          overflow: "visible",
        }}
      >
        <p style={{ fontSize: "13px", fontWeight: 600, color: "#1A2B3C", marginBottom: "5px" }}>{label}</p>
        <p style={{ fontSize: "11px", color: "rgba(26,43,60,0.55)", lineHeight: 1.7 }}>{desc}</p>
        {/* connector line */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            [showRight ? "left" : "right"]: "-14px",
            width: "14px",
            height: "1px",
            background: "linear-gradient(90deg, rgba(72,184,156,0.5), rgba(46,134,171,0.2))",
            transform: "translateY(-50%)",
          }}
        />
      </div>
    </div>
  );
}
