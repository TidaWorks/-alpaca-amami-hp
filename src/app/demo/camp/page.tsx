"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";

export default function CampDemoPage() {
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const galleryRefs = useRef<HTMLDivElement[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showCta, setShowCta] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);
  const vineRef = useRef<SVGPathElement>(null);
  const [vineLength, setVineLength] = useState(1200);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // --- Scroll velocity for vine sway (ref avoids re-render on every scroll) ---
  const lastScrollY = useRef(0);
  const scrollVelocity = useRef(0);

  // Measure SVG path length at layout time for accurate first-paint dash-array
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (vineRef.current) {
      const len = vineRef.current.getTotalLength();
      if (len > 0) setVineLength(len);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-8");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    sectionsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    // Gallery stagger observer with directional animation
    const galleryObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.add("gallery-visible");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -30px 0px" }
    );

    galleryRefs.current.forEach((el) => {
      if (el) galleryObserver.observe(el);
    });

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 60);
      setShowCta(scrollY > 500);

      // Scroll progress for vine
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0;
      setScrollProgress(progress);

      // Parallax offset for mountain dividers
      setParallaxY(scrollY * 0.15);

      // Scroll velocity for leaf sway
      const vel = Math.min(Math.abs(scrollY - lastScrollY.current) / 16, 1);
      lastScrollY.current = scrollY;
      scrollVelocity.current = vel;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      galleryObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const addRef = (el: HTMLDivElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  const addGalleryRef = (el: HTMLDivElement | null) => {
    if (el && !galleryRefs.current.includes(el)) {
      galleryRefs.current.push(el);
    }
  };

  // Firefly positions (pre-computed to avoid hydration mismatch)
  const fireflies = [
    { top: "12%", left: "8%", delay: "0s", duration: "3.2s" },
    { top: "25%", left: "22%", delay: "0.7s", duration: "4.1s" },
    { top: "18%", left: "75%", delay: "1.3s", duration: "3.7s" },
    { top: "35%", left: "88%", delay: "0.4s", duration: "5.0s" },
    { top: "55%", left: "15%", delay: "2.1s", duration: "3.4s" },
    { top: "42%", left: "60%", delay: "1.8s", duration: "4.5s" },
    { top: "70%", left: "35%", delay: "0.2s", duration: "3.9s" },
    { top: "80%", left: "78%", delay: "1.1s", duration: "4.2s" },
    { top: "65%", left: "92%", delay: "2.6s", duration: "3.6s" },
    { top: "88%", left: "48%", delay: "0.9s", duration: "4.8s" },
    { top: "5%", left: "45%", delay: "1.5s", duration: "3.3s" },
    { top: "92%", left: "12%", delay: "2.3s", duration: "4.0s" },
    { top: "48%", left: "5%", delay: "0.6s", duration: "5.2s" },
    { top: "30%", left: "50%", delay: "1.9s", duration: "3.8s" },
    { top: "75%", left: "62%", delay: "2.8s", duration: "4.3s" },
    { top: "15%", left: "95%", delay: "0.3s", duration: "3.5s" },
    { top: "60%", left: "28%", delay: "2.0s", duration: "4.7s" },
    { top: "38%", left: "72%", delay: "1.4s", duration: "3.1s" },
  ];

  const vineDashOffset = vineLength - vineLength * scrollProgress;

  // Derive leaf sway intensity from scroll velocity
  const leafSwayDeg = `${6 + scrollVelocity.current * 18}deg`;
  const leafSwayDur = `${Math.max(0.7, 4 - scrollVelocity.current * 3.2)}s`;
  const leafSwayStyle = (lr: string, lox: string, loy: string): React.CSSProperties => ({
    "--lr": lr,
    "--lox": lox,
    "--loy": loy,
    "--lsway": leafSwayDeg,
    "--lsway-dur": leafSwayDur,
  } as React.CSSProperties);

  return (
    <>
      <style>{`
        .font-jost { font-family: var(--font-jost), sans-serif; }
        .font-caveat { font-family: var(--font-caveat), cursive; }
        html { scroll-behavior: smooth; }

        /* ---- existing floats ---- */
        @keyframes float1 {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-30px) scale(0.95); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        @keyframes scrollDown {
          0% { opacity: 1; transform: translateY(0); }
          50% { opacity: 0.3; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-float1 { animation: float1 6s ease-in-out infinite; }
        .animate-float2 { animation: float2 8s ease-in-out infinite; }
        .animate-float3 { animation: float3 7s ease-in-out infinite; }
        .animate-scroll { animation: scrollDown 2s ease-in-out infinite; }

        /* ---- Firefly / twinkle ---- */
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; transform: scale(0.5); }
          40% { opacity: 0.6; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.4); }
          60% { opacity: 0.7; transform: scale(1.1); }
        }
        @keyframes drift {
          0%   { transform: translate(0px, 0px); }
          25%  { transform: translate(6px, -9px); }
          50%  { transform: translate(-5px, -14px); }
          75%  { transform: translate(-9px, -5px); }
          100% { transform: translate(0px, 0px); }
        }
        .firefly {
          position: absolute;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #c8ffdc;
          box-shadow:
            0 0 4px 2px rgba(168, 255, 208, 0.9),
            0 0 12px 6px rgba(168, 255, 208, 0.5),
            0 0 24px 10px rgba(168, 255, 208, 0.2);
          animation: twinkle var(--tw-dur, 3.5s) ease-in-out infinite var(--tw-delay, 0s),
                     drift calc(var(--tw-dur, 3.5s) * 2) ease-in-out infinite var(--tw-delay, 0s);
          pointer-events: none;
        }
        .firefly::after {
          content: '';
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(168,255,208,0.35) 0%, transparent 70%);
          animation: twinkle var(--tw-dur, 3.5s) ease-in-out infinite var(--tw-delay, 0s);
        }

        /* ---- Marquee ---- */
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 28s linear infinite;
        }
        .marquee-track:hover { animation-play-state: paused; }

        /* ---- STAY card hover with campfire glow ---- */
        .stay-card {
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      box-shadow 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          will-change: transform;
        }
        .stay-card:hover {
          transform: scale(1.03) translateY(-8px);
          box-shadow:
            0 24px 48px rgba(255, 120, 40, 0.22),
            0 8px 20px rgba(255, 80, 20, 0.14),
            0 2px 8px rgba(0,0,0,0.10);
        }

        /* ---- Wood grain texture for dark sections ---- */
        .wood-grain {
          position: relative;
        }
        .wood-grain::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: 0.045;
          background-image:
            repeating-linear-gradient(
              88deg,
              transparent 0px,
              transparent 3px,
              rgba(255,220,160,0.6) 3px,
              rgba(255,220,160,0.6) 4px,
              transparent 4px,
              transparent 9px,
              rgba(200,160,100,0.4) 9px,
              rgba(200,160,100,0.4) 10px
            ),
            repeating-linear-gradient(
              92deg,
              transparent 0px,
              transparent 7px,
              rgba(180,130,80,0.3) 7px,
              rgba(180,130,80,0.3) 8px,
              transparent 8px,
              transparent 15px
            );
          background-size: 120px 100%, 200px 100%;
        }
        .wood-grain > * {
          position: relative;
          z-index: 1;
        }

        /* ---- Hero mist / fog layer ---- */
        @keyframes mistDrift1 {
          0%   { transform: translateX(-8%) scaleY(1); opacity: 0.55; }
          40%  { transform: translateX(3%) scaleY(1.08); opacity: 0.7; }
          100% { transform: translateX(-8%) scaleY(1); opacity: 0.55; }
        }
        @keyframes mistDrift2 {
          0%   { transform: translateX(5%) scaleY(1.05); opacity: 0.45; }
          50%  { transform: translateX(-6%) scaleY(0.95); opacity: 0.6; }
          100% { transform: translateX(5%) scaleY(1.05); opacity: 0.45; }
        }
        @keyframes mistDrift3 {
          0%   { transform: translateX(0%) scaleY(1); opacity: 0.35; }
          60%  { transform: translateX(-4%) scaleY(1.1); opacity: 0.5; }
          100% { transform: translateX(0%) scaleY(1); opacity: 0.35; }
        }
        .mist-layer-1 {
          animation: mistDrift1 18s ease-in-out infinite;
          transform-origin: center bottom;
        }
        .mist-layer-2 {
          animation: mistDrift2 24s ease-in-out infinite;
          transform-origin: center bottom;
        }
        .mist-layer-3 {
          animation: mistDrift3 30s ease-in-out infinite;
          transform-origin: center bottom;
        }

        /* ---- Gallery directional stagger ---- */
        .gallery-item-left {
          opacity: 0;
          transform: translateX(-40px);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }
        .gallery-item-right {
          opacity: 0;
          transform: translateX(40px);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }
        .gallery-item-bottom {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }
        .gallery-visible {
          opacity: 1 !important;
          transform: translate(0, 0) !important;
        }

        /* ---- Mountain divider parallax ---- */
        .mountain-divider {
          display: block;
          width: 100%;
          overflow: hidden;
          line-height: 0;
        }

        /* ---- Vine scroll indicator ---- */
        .vine-progress {
          position: fixed;
          left: 14px;
          top: 0;
          bottom: 0;
          width: 32px;
          z-index: 40;
          pointer-events: none;
        }
        .vine-svg {
          width: 32px;
          height: 100%;
          overflow: visible;
        }
        .vine-path {
          fill: none;
          stroke: #2D7D46;
          stroke-width: 3.5;
          stroke-linecap: round;
          stroke-linejoin: round;
          filter: drop-shadow(0 0 3px rgba(45,125,70,0.5));
        }
        .vine-glow {
          fill: none;
          stroke: #4CAF50;
          stroke-width: 7;
          stroke-linecap: round;
          opacity: 0.25;
          filter: blur(3px);
        }
        .vine-track {
          fill: none;
          stroke: #2D7D46;
          stroke-width: 1.5;
          stroke-linecap: round;
          opacity: 0.1;
        }
        @keyframes leafSway {
          0%, 100% { transform-origin: var(--lox, 16px) var(--loy, 50px); transform: rotate(var(--lr, 0deg)); }
          50% { transform-origin: var(--lox, 16px) var(--loy, 50px); transform: rotate(calc(var(--lr, 0deg) + var(--lsway, 6deg))); }
        }
        @keyframes leafSway2 {
          0%, 100% { transform-origin: var(--lox, 16px) var(--loy, 50px); transform: rotate(var(--lr, 0deg)); }
          50% { transform-origin: var(--lox, 16px) var(--loy, 50px); transform: rotate(calc(var(--lr, 0deg) - var(--lsway, 5deg))); }
        }
        @keyframes leafSwayWind {
          0%   { transform-origin: var(--lox, 16px) var(--loy, 50px); transform: rotate(calc(var(--lr, 0deg) - var(--lsway-hi, 14deg))); }
          30%  { transform-origin: var(--lox, 16px) var(--loy, 50px); transform: rotate(calc(var(--lr, 0deg) + var(--lsway-hi, 14deg))); }
          60%  { transform-origin: var(--lox, 16px) var(--loy, 50px); transform: rotate(calc(var(--lr, 0deg) - calc(var(--lsway-hi, 14deg) * 0.5))); }
          100% { transform-origin: var(--lox, 16px) var(--loy, 50px); transform: rotate(var(--lr, 0deg)); }
        }
        .vine-leaf { animation: leafSway var(--lsway-dur, 4s) ease-in-out infinite; }
        .vine-leaf-alt { animation: leafSway2 var(--lsway-dur, 3.5s) ease-in-out infinite; }
        .vine-leaf-wind { animation: leafSwayWind 0.8s ease-in-out forwards; }
        .vine-leaf-wind-alt { animation: leafSwayWind 0.65s ease-in-out forwards; }
        @media (max-width: 768px) {
          .vine-progress { left: 4px; width: 24px; }
          .vine-svg { width: 24px; }
        }

        /* ---- Reservation CTA button pulse ---- */
        @keyframes pulseRing {
          0%   { transform: scale(1); opacity: 0.6; }
          70%  { transform: scale(1.12); opacity: 0; }
          100% { transform: scale(1.12); opacity: 0; }
        }
        .btn-pulse { position: relative; }
        .btn-pulse::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: white;
          animation: pulseRing 2.4s ease-out infinite;
        }
        input:focus, textarea:focus, select:focus {
          border-color: #F59E42 !important;
          box-shadow: 0 0 0 3px rgba(245,158,66,0.18) !important;
          outline: none !important;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        button[type="submit"], button.btn-pulse, button[type="button"] {
          transition: transform 0.2s ease, box-shadow 0.2s ease !important;
        }
        button[type="submit"]:hover, button.btn-pulse:hover, button[type="button"]:hover {
          transform: scale(1.03) !important;
        }
        button[type="submit"]:active, button.btn-pulse:active, button[type="button"]:active {
          transform: scale(0.98) !important;
        }

        /* ── Campfire: The Signature Element ── */

        /* 5 flame layers — transform-based for all browsers */
        @keyframes flame1 {
          0%   { transform: scaleX(1) scaleY(1) translateY(0) rotate(-1deg); opacity: 0.95; }
          15%  { transform: scaleX(1.06) scaleY(0.96) translateY(-3px) rotate(2deg); opacity: 1; }
          30%  { transform: scaleX(0.94) scaleY(1.05) translateY(-6px) rotate(-3deg); opacity: 0.88; }
          45%  { transform: scaleX(1.08) scaleY(0.93) translateY(-2px) rotate(1.5deg); opacity: 1; }
          60%  { transform: scaleX(0.96) scaleY(1.03) translateY(-5px) rotate(-2deg); opacity: 0.92; }
          75%  { transform: scaleX(1.04) scaleY(0.97) translateY(-1px) rotate(2.5deg); opacity: 0.97; }
          100% { transform: scaleX(1) scaleY(1) translateY(0) rotate(-1deg); opacity: 0.95; }
        }
        @keyframes flame2 {
          0%   { transform: scaleX(1) scaleY(1) translateY(0) rotate(1deg); opacity: 1; }
          20%  { transform: scaleX(0.92) scaleY(1.08) translateY(-4px) rotate(-2.5deg); opacity: 0.9; }
          40%  { transform: scaleX(1.1) scaleY(0.92) translateY(-7px) rotate(3deg); opacity: 1; }
          60%  { transform: scaleX(0.95) scaleY(1.04) translateY(-3px) rotate(-1deg); opacity: 0.88; }
          80%  { transform: scaleX(1.06) scaleY(0.96) translateY(-5px) rotate(2deg); opacity: 0.96; }
          100% { transform: scaleX(1) scaleY(1) translateY(0) rotate(1deg); opacity: 1; }
        }
        @keyframes flame3 {
          0%   { transform: scaleX(1) scaleY(1) translateY(0) rotate(0deg); opacity: 0.95; }
          25%  { transform: scaleX(1.12) scaleY(0.9) translateY(-5px) rotate(3deg); opacity: 0.85; }
          50%  { transform: scaleX(0.88) scaleY(1.1) translateY(-8px) rotate(-3.5deg); opacity: 1; }
          75%  { transform: scaleX(1.06) scaleY(0.94) translateY(-3px) rotate(1.5deg); opacity: 0.9; }
          100% { transform: scaleX(1) scaleY(1) translateY(0) rotate(0deg); opacity: 0.95; }
        }
        @keyframes flame4 {
          0%   { transform: scaleX(1) scaleY(1) translateY(0); opacity: 0.9; }
          30%  { transform: scaleX(0.9) scaleY(1.12) translateY(-4px); opacity: 1; }
          60%  { transform: scaleX(1.1) scaleY(0.88) translateY(-6px); opacity: 0.85; }
          100% { transform: scaleX(1) scaleY(1) translateY(0); opacity: 0.9; }
        }
        @keyframes flameTip {
          0%   { transform: scaleX(1) scaleY(1) translateY(0) rotate(0); opacity: 0.8; }
          20%  { transform: scaleX(0.7) scaleY(1.2) translateY(-6px) rotate(4deg); opacity: 1; }
          40%  { transform: scaleX(1.2) scaleY(0.8) translateY(-3px) rotate(-5deg); opacity: 0.7; }
          60%  { transform: scaleX(0.8) scaleY(1.15) translateY(-8px) rotate(3deg); opacity: 0.9; }
          80%  { transform: scaleX(1.1) scaleY(0.85) translateY(-2px) rotate(-2deg); opacity: 0.75; }
          100% { transform: scaleX(1) scaleY(1) translateY(0) rotate(0); opacity: 0.8; }
        }

        /* Smoke wisps — gentle curling */
        @keyframes smokeA {
          0%   { transform: translateY(0) translateX(0) scale(0.8); opacity: 0.2; }
          30%  { transform: translateY(-24px) translateX(8px) scale(1.1); opacity: 0.14; }
          60%  { transform: translateY(-48px) translateX(-5px) scale(1.5); opacity: 0.07; }
          100% { transform: translateY(-72px) translateX(10px) scale(2); opacity: 0; }
        }
        @keyframes smokeB {
          0%   { transform: translateY(0) translateX(0) scale(0.7); opacity: 0.16; }
          35%  { transform: translateY(-20px) translateX(-10px) scale(1.2); opacity: 0.1; }
          65%  { transform: translateY(-44px) translateX(6px) scale(1.7); opacity: 0.04; }
          100% { transform: translateY(-66px) translateX(-7px) scale(2.1); opacity: 0; }
        }

        /* Embers — varied trajectories */
        @keyframes emA {
          0%   { transform: translate(0,0) scale(1); opacity: 0.95; }
          25%  { transform: translate(7px,-18px) scale(0.85); opacity: 0.75; }
          50%  { transform: translate(-3px,-38px) scale(0.6); opacity: 0.45; }
          75%  { transform: translate(9px,-54px) scale(0.3); opacity: 0.2; }
          100% { transform: translate(4px,-68px) scale(0.1); opacity: 0; }
        }
        @keyframes emB {
          0%   { transform: translate(0,0) scale(1); opacity: 0.9; }
          30%  { transform: translate(-9px,-20px) scale(0.8); opacity: 0.65; }
          60%  { transform: translate(4px,-40px) scale(0.45); opacity: 0.3; }
          100% { transform: translate(-3px,-62px) scale(0.08); opacity: 0; }
        }
        @keyframes emC {
          0%   { transform: translate(0,0) scale(1); opacity: 0.85; }
          20%  { transform: translate(11px,-16px) scale(0.9); opacity: 0.7; }
          50%  { transform: translate(-1px,-34px) scale(0.5); opacity: 0.35; }
          80%  { transform: translate(7px,-52px) scale(0.25); opacity: 0.12; }
          100% { transform: translate(5px,-64px) scale(0.06); opacity: 0; }
        }

        /* Glow + coal */
        @keyframes fGlow {
          0%, 100% { opacity: 0.45; transform: scale(1); }
          25%  { opacity: 0.65; transform: scale(1.05); }
          50%  { opacity: 0.5;  transform: scale(1.02); }
          75%  { opacity: 0.6;  transform: scale(1.04); }
        }
        @keyframes fCoal {
          0%, 100% { opacity: 0.6; }
          35% { opacity: 0.9; }
          65% { opacity: 0.7; }
        }
        @keyframes fGround {
          0%, 100% { opacity: 0.1; transform: scaleX(1); }
          50% { opacity: 0.18; transform: scaleX(1.03); }
        }

        .cf-f1   { transform-origin: 50% 100%; animation: flame1 2.2s ease-in-out infinite; }
        .cf-f2   { transform-origin: 50% 100%; animation: flame2 1.7s ease-in-out infinite; }
        .cf-f3   { transform-origin: 50% 100%; animation: flame3 1.3s ease-in-out infinite; }
        .cf-f4   { transform-origin: 50% 100%; animation: flame4 1.0s ease-in-out infinite; }
        .cf-tip  { transform-origin: 50% 100%; animation: flameTip 0.8s ease-in-out infinite; }
        .cf-smA  { animation: smokeA 4.5s ease-out infinite; }
        .cf-smB  { animation: smokeB 5.5s ease-out infinite 1.5s; }
        .cf-smC  { animation: smokeA 5s ease-out infinite 3s; }
        .cf-e1   { animation: emA 2.2s ease-out infinite; }
        .cf-e2   { animation: emB 2.8s ease-out infinite 0.4s; }
        .cf-e3   { animation: emC 2.4s ease-out infinite 0.9s; }
        .cf-e4   { animation: emA 3.0s ease-out infinite 1.3s; }
        .cf-e5   { animation: emB 2.1s ease-out infinite 0.7s; }
        .cf-e6   { animation: emC 2.6s ease-out infinite 1.8s; }
        .cf-e7   { animation: emA 1.9s ease-out infinite 2.2s; }
        .cf-e8   { animation: emB 2.3s ease-out infinite 0.2s; }
        .cf-e9   { animation: emC 2.7s ease-out infinite 1.1s; }
        .cf-e10  { animation: emA 2.5s ease-out infinite 1.6s; }
        .cf-glow { animation: fGlow 3s ease-in-out infinite; transform-origin: center; }
        .cf-coal { animation: fCoal 2s ease-in-out infinite; }
        .cf-grnd { animation: fGround 3s ease-in-out infinite; transform-origin: center; }
      `}</style>

      {/* ===== SCROLL VINE INDICATOR ===== */}
      <div className="vine-progress" aria-hidden="true">
        <svg className="vine-svg" viewBox="0 0 32 100" preserveAspectRatio="xMidYMin meet">
          <defs>
            <filter id="vineGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* === Background track === */}
          <path
            d="M16 1 C11 7, 21 13, 16 20 C11 27, 21 33, 16 40 C11 47, 21 53, 16 60 C11 67, 21 73, 16 80 C11 87, 21 93, 16 99"
            className="vine-track"
          />

          {/* === Decorative static leaves along track (always visible, faint) === */}
          {/* Left leaf at ~20% */}
          <path d="M16 20 C12 17, 7 18, 8 22 C9 25, 14 24, 16 20" fill="#2D7D46" opacity="0.12" />
          {/* Right leaf at ~33% */}
          <path d="M16 33 C20 30, 25 31, 24 35 C23 38, 18 37, 16 33" fill="#2D7D46" opacity="0.12" />
          {/* Left leaf at ~53% */}
          <path d="M16 53 C12 50, 7 51, 8 55 C9 58, 14 57, 16 53" fill="#2D7D46" opacity="0.12" />
          {/* Right leaf at ~73% */}
          <path d="M16 73 C20 70, 25 71, 24 75 C23 78, 18 77, 16 73" fill="#2D7D46" opacity="0.12" />

          {/* === Glow layer (progress-clipped) === */}
          <path
            d="M16 1 C11 7, 21 13, 16 20 C11 27, 21 33, 16 40 C11 47, 21 53, 16 60 C11 67, 21 73, 16 80 C11 87, 21 93, 16 99"
            className="vine-glow"
            strokeDasharray={`${vineLength}`}
            strokeDashoffset={`${vineDashOffset}`}
          />

          {/* === Active main vine === */}
          <path
            ref={vineRef}
            d="M16 1 C11 7, 21 13, 16 20 C11 27, 21 33, 16 40 C11 47, 21 53, 16 60 C11 67, 21 73, 16 80 C11 87, 21 93, 16 99"
            className="vine-path"
            strokeDasharray={`${vineLength}`}
            strokeDashoffset={`${vineDashOffset}`}
          />

          {/* === Leaves that appear as vine grows === */}
          {/* Leaf group at 20% — left */}
          {scrollProgress > 0.18 && (
            <g opacity={Math.min((scrollProgress - 0.18) / 0.06, 1)}>
              <path
                d="M16 20 C11 15, 4 16, 5 21 C6 25, 13 24, 16 20"
                fill="#4CAF50"
                className="vine-leaf"
                style={leafSwayStyle("-15deg", "16px", "20px")}
              />
              <path d="M16 20 C12 18, 9 19, 9.5 21.5" fill="none" stroke="#2D7D46" strokeWidth="0.8" opacity="0.8" />
              {/* Tendril */}
              <path
                d="M13 19 C11 17, 9 16, 8 18 C7 20, 9 21, 10 20"
                fill="none"
                stroke="#4CAF50"
                strokeWidth="0.7"
                strokeLinecap="round"
                opacity="0.7"
              />
            </g>
          )}

          {/* Leaf group at 33% — right */}
          {scrollProgress > 0.31 && (
            <g opacity={Math.min((scrollProgress - 0.31) / 0.06, 1)}>
              <path
                d="M16 33 C21 28, 28 29, 27 34 C26 38, 19 37, 16 33"
                fill="#81C784"
                className="vine-leaf-alt"
                style={leafSwayStyle("10deg", "16px", "33px")}
              />
              <path d="M16 33 C19 31, 22 32, 23 34" fill="none" stroke="#2D7D46" strokeWidth="0.8" opacity="0.8" />
              {/* Small flower/bud */}
              <circle cx="27" cy="29" r="1.8" fill="#FEC352" opacity="0.9" />
              <circle cx="25.5" cy="27.5" r="1.2" fill="#FEC352" opacity="0.7" />
              {/* Tendril */}
              <path
                d="M19 32 C21 30, 23 29, 24 31 C25 33, 23 34, 22 33"
                fill="none"
                stroke="#4CAF50"
                strokeWidth="0.7"
                strokeLinecap="round"
                opacity="0.7"
              />
            </g>
          )}

          {/* Leaf group at 46% — left (larger) */}
          {scrollProgress > 0.44 && (
            <g opacity={Math.min((scrollProgress - 0.44) / 0.06, 1)}>
              <path
                d="M16 46 C10 41, 3 42, 4 48 C5 53, 13 52, 16 46"
                fill="#2D7D46"
                className="vine-leaf"
                style={leafSwayStyle("-20deg", "16px", "46px")}
              />
              {/* Second smaller leaf */}
              <path
                d="M16 44 C13 41, 8 41, 8.5 44 C9 47, 13 46, 16 44"
                fill="#4CAF50"
                opacity="0.8"
                className="vine-leaf-alt"
                style={leafSwayStyle("-8deg", "16px", "44px")}
              />
              {/* Berry cluster */}
              <circle cx="4" cy="46" r="2.5" fill="#E53935" opacity="0.85" />
              <circle cx="7" cy="44.5" r="2" fill="#C62828" opacity="0.8" />
              <circle cx="5.5" cy="49" r="1.8" fill="#EF5350" opacity="0.75" />
            </g>
          )}

          {/* Leaf group at 60% — right */}
          {scrollProgress > 0.57 && (
            <g opacity={Math.min((scrollProgress - 0.57) / 0.06, 1)}>
              <path
                d="M16 60 C22 55, 29 56, 28 62 C27 66, 20 65, 16 60"
                fill="#81C784"
                className="vine-leaf"
                style={leafSwayStyle("18deg", "16px", "60px")}
              />
              <path d="M16 60 C20 58, 24 59, 25 62" fill="none" stroke="#2D7D46" strokeWidth="0.8" opacity="0.8" />
              {/* Pink bud */}
              <circle cx="29" cy="56" r="2" fill="#F48FB1" opacity="0.9" />
              <circle cx="27" cy="54.5" r="1.3" fill="#F06292" opacity="0.75" />
              {/* Tendril */}
              <path
                d="M19 59 C22 57, 24 56, 25 58 C26 60, 24 62, 23 61"
                fill="none"
                stroke="#4CAF50"
                strokeWidth="0.7"
                strokeLinecap="round"
                opacity="0.7"
              />
            </g>
          )}

          {/* Leaf group at 73% — left (large) */}
          {scrollProgress > 0.70 && (
            <g opacity={Math.min((scrollProgress - 0.70) / 0.06, 1)}>
              <path
                d="M16 73 C10 67, 2 68, 3 74 C4 79, 13 78, 16 73"
                fill="#4CAF50"
                className="vine-leaf-alt"
                style={leafSwayStyle("-12deg", "16px", "73px")}
              />
              {/* Second leaf */}
              <path
                d="M16 76 C11 74, 6 74, 6.5 77 C7 80, 13 79, 16 76"
                fill="#2D7D46"
                opacity="0.85"
                className="vine-leaf"
                style={leafSwayStyle("-5deg", "16px", "76px")}
              />
              {/* Berry cluster */}
              <circle cx="3.5" cy="72" r="2.5" fill="#FF6F00" opacity="0.85" />
              <circle cx="6" cy="70.5" r="2" fill="#E65100" opacity="0.8" />
              <circle cx="5" cy="74.5" r="1.8" fill="#FF8F00" opacity="0.75" />
            </g>
          )}

          {/* Leaf group at 86% — right */}
          {scrollProgress > 0.83 && (
            <g opacity={Math.min((scrollProgress - 0.83) / 0.06, 1)}>
              <path
                d="M16 86 C22 81, 30 82, 29 88 C28 93, 20 92, 16 86"
                fill="#2D7D46"
                className="vine-leaf"
                style={leafSwayStyle("22deg", "16px", "86px")}
              />
              <path d="M16 86 C21 84, 25 85, 26 88" fill="none" stroke="#2D7D46" strokeWidth="0.8" opacity="0.8" />
              {/* Yellow flower */}
              <circle cx="30" cy="82" r="2.2" fill="#FEC352" opacity="0.9" />
              <circle cx="28.5" cy="80" r="1.5" fill="#FFD54F" opacity="0.8" />
            </g>
          )}

          {/* === Growing tip bud === */}
          {scrollProgress > 0.01 && (
            <g transform={`translate(16, ${1 + scrollProgress * 98})`}>
              <circle r="3.5" fill="#4CAF50" opacity="0.95" filter="url(#vineGlow)" />
              <circle r="1.8" fill="#81C784" opacity="1" />
              {/* Tiny leaves at tip */}
              <path d="M0 0 C-2 -3, -5 -2, -4 0" fill="#2D7D46" opacity="0.9" />
              <path d="M0 0 C2 -3, 5 -2, 4 0" fill="#4CAF50" opacity="0.85" />
            </g>
          )}
        </svg>
      </div>

      <div className="min-h-screen bg-white text-[#000000]">
        {/* ===== HEADER ===== */}
        <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled
              ? "bg-[#0B8388]/95 backdrop-blur-md shadow-md"
              : "bg-transparent"
          }`}
        >
          <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
            {/* Left: back link */}
            <a
              href="/web#gallery"
              className="hidden md:inline-flex items-center gap-1.5 text-white/90 hover:text-white text-sm font-medium transition-colors"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
              ギャラリーに戻る
            </a>

            {/* Center: logo */}
            <span className="font-jost font-black text-white text-sm md:text-base tracking-widest absolute left-1/2 -translate-x-1/2">
              AMAMI FOREST CAMP
            </span>

            {/* Right: desktop nav */}
            <nav className="hidden md:flex items-center gap-6">
              {["STAY", "EAT", "PLAY", "FAQ", "ACCESS"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-white/80 hover:text-white text-xs font-jost font-semibold tracking-widest transition-colors"
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* Right: hamburger (mobile) */}
            <button
              className="md:hidden text-white p-1"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="メニューを開く"
            >
              {menuOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="M6 6l12 12"/></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h18"/><path d="M3 6h18"/><path d="M3 18h18"/></svg>
              )}
            </button>
          </div>

          {/* Mobile dropdown menu */}
          {menuOpen && (
            <div className="md:hidden bg-[#0B8388]/95 backdrop-blur-md border-t border-white/10">
              <nav className="flex flex-col py-2">
                {["STAY", "EAT", "PLAY", "FAQ", "ACCESS"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className="px-6 py-3 text-white/80 hover:text-white hover:bg-white/10 text-sm font-jost font-semibold tracking-widest transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>
          )}
        </header>

        {/* ===== HERO ===== */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0B8388] via-[#0e9a8f] to-[#14b8a6]">
          {/* Decorative blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[10%] left-[5%] w-64 h-64 rounded-full bg-[#0B8388]/30 blur-3xl animate-float1" />
            <div className="absolute top-[60%] right-[10%] w-80 h-80 rounded-full bg-[#14b8a6]/20 blur-3xl animate-float2" />
            <div className="absolute bottom-[20%] left-[30%] w-48 h-48 rounded-full bg-[#FEC352]/10 blur-2xl animate-float3" />
            <div className="absolute top-[30%] right-[25%] w-32 h-32 rounded-full bg-white/5 blur-2xl animate-float1" />
            <div className="absolute bottom-[40%] left-[60%] w-56 h-56 rounded-full bg-[#0B8388]/20 blur-3xl animate-float2" />
            {/* Tree-like shapes */}
            <div className="absolute bottom-0 left-[10%] w-24 h-40 bg-[#065f5f]/20 rounded-t-full" />
            <div className="absolute bottom-0 left-[15%] w-20 h-52 bg-[#065f5f]/15 rounded-t-full" />
            <div className="absolute bottom-0 right-[12%] w-28 h-44 bg-[#065f5f]/20 rounded-t-full" />
            <div className="absolute bottom-0 right-[18%] w-16 h-36 bg-[#065f5f]/15 rounded-t-full" />
            {/* Pine tree SVG silhouettes */}
            <svg className="absolute bottom-0 left-0 w-full" style={{ height: "180px", opacity: 0.18 }} viewBox="0 0 1440 180" preserveAspectRatio="none" aria-hidden="true">
              {/* Left cluster */}
              <polygon points="60,180 80,120 100,180" fill="#022e2e" />
              <polygon points="55,150 80,90 105,150" fill="#033a3a" />
              <polygon points="50,125 80,65 110,125" fill="#033a3a" />
              <rect x="74" y="165" width="12" height="15" fill="#022e2e" />
              <polygon points="120,180 140,130 160,180" fill="#022e2e" />
              <polygon points="115,155 140,100 165,155" fill="#033a3a" />
              <rect x="134" y="168" width="12" height="12" fill="#022e2e" />
              <polygon points="170,180 185,140 200,180" fill="#022e2e" />
              <rect x="179" y="172" width="10" height="8" fill="#022e2e" />
              {/* Right cluster */}
              <polygon points="1260,180 1280,125 1300,180" fill="#022e2e" />
              <polygon points="1255,150 1280,90 1305,150" fill="#033a3a" />
              <polygon points="1250,120 1280,60 1310,120" fill="#033a3a" />
              <rect x="1274" y="166" width="12" height="14" fill="#022e2e" />
              <polygon points="1310,180 1330,135 1350,180" fill="#022e2e" />
              <polygon points="1305,155 1330,105 1355,155" fill="#033a3a" />
              <rect x="1324" y="168" width="12" height="12" fill="#022e2e" />
              <polygon points="1360,180 1375,145 1390,180" fill="#022e2e" />
              <rect x="1369" y="172" width="10" height="8" fill="#022e2e" />
            </svg>
          </div>

          {/* Fireflies scattered across hero */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            {fireflies.map((f, i) => (
              <span
                key={i}
                className="firefly"
                style={{
                  top: f.top,
                  left: f.left,
                  ["--tw-delay" as string]: f.delay,
                  ["--tw-dur" as string]: f.duration,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 text-center px-6">
            <p className="font-caveat text-white/80 text-2xl md:text-3xl mb-4">
              Nature &amp; Glamping
            </p>
            <h1 className="font-jost font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-tight leading-none mb-6">
              AMAMI<br />FOREST CAMP
            </h1>
            <p className="text-white/90 text-lg md:text-xl tracking-widest mb-2">
              奄美の森で、特別な一日を。
            </p>
            <p className="text-white/60 text-sm mt-4 tracking-wider">
              GLAMPING &amp; CAMP IN AMAMI OSHIMA
            </p>
          </div>

          {/* Hero mist / morning fog layer */}
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-10" aria-hidden="true" style={{ height: "220px", overflow: "hidden" }}>
            {/* Layer 1 — heavy base mist */}
            <div
              className="mist-layer-1 absolute bottom-0 left-0 right-0"
              style={{ height: "130px" }}
            >
              <svg viewBox="0 0 1440 130" preserveAspectRatio="none" style={{ width: "130%", height: "100%", marginLeft: "-15%" }}>
                <defs>
                  <filter id="mistBlur1">
                    <feGaussianBlur stdDeviation="10" />
                  </filter>
                </defs>
                <ellipse cx="720" cy="130" rx="900" ry="90" fill="rgba(200,235,230,0.22)" filter="url(#mistBlur1)" />
                <ellipse cx="300" cy="130" rx="500" ry="70" fill="rgba(220,245,240,0.18)" filter="url(#mistBlur1)" />
                <ellipse cx="1100" cy="130" rx="450" ry="60" fill="rgba(210,240,235,0.16)" filter="url(#mistBlur1)" />
              </svg>
            </div>
            {/* Layer 2 — mid drift */}
            <div
              className="mist-layer-2 absolute bottom-0 left-0 right-0"
              style={{ height: "100px" }}
            >
              <svg viewBox="0 0 1440 100" preserveAspectRatio="none" style={{ width: "140%", height: "100%", marginLeft: "-20%" }}>
                <defs>
                  <filter id="mistBlur2">
                    <feGaussianBlur stdDeviation="14" />
                  </filter>
                </defs>
                <ellipse cx="500" cy="100" rx="600" ry="75" fill="rgba(240,255,250,0.16)" filter="url(#mistBlur2)" />
                <ellipse cx="1000" cy="100" rx="550" ry="65" fill="rgba(230,250,245,0.14)" filter="url(#mistBlur2)" />
              </svg>
            </div>
            {/* Layer 3 — thin wisp */}
            <div
              className="mist-layer-3 absolute bottom-0 left-0 right-0"
              style={{ height: "80px" }}
            >
              <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ width: "150%", height: "100%", marginLeft: "-25%" }}>
                <defs>
                  <filter id="mistBlur3">
                    <feGaussianBlur stdDeviation="18" />
                  </filter>
                </defs>
                <ellipse cx="720" cy="80" rx="800" ry="55" fill="rgba(255,255,255,0.12)" filter="url(#mistBlur3)" />
              </svg>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
            <span className="text-white/60 text-xs tracking-widest font-jost">SCROLL</span>
            <div className="animate-scroll">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"><path d="M12 5v14"/><path d="M19 12l-7 7-7-7"/></svg>
            </div>
          </div>
        </section>

        {/* ===== MOUNTAIN DIVIDER: hero -> about ===== */}
        <div className="mountain-divider relative bg-white" aria-hidden="true" style={{ marginTop: "-2px", overflow: "hidden" }}>
          <svg
            viewBox="0 0 1440 140"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMin meet"
            style={{ display: "block", width: "100%", height: "140px", transform: `translateY(${Math.max(-30, Math.min(30, parallaxY * -0.4))}px)` }}
          >
            {/* Back layer mountain */}
            <path d="M0 140 L0 70 L120 30 L240 65 L360 15 L480 55 L600 20 L720 60 L840 10 L960 50 L1080 25 L1200 55 L1320 35 L1440 60 L1440 140 Z" fill="#14b8a6" opacity="0.22" />
            {/* Back tree-line silhouette */}
            <path d="M30 68 L33 55 L36 68 M80 50 L83 37 L86 50 M150 58 L153 44 L156 58 M210 55 L215 40 L220 55 M290 45 L294 30 L298 45 M370 38 L374 23 L378 38 M440 48 L444 35 L448 48 M520 32 L524 17 L528 32 M600 40 L604 27 L608 40 M680 20 L684 5 L688 20 M760 48 L764 35 L768 48 M840 18 L844 3 L848 18 M920 42 L924 27 L928 42 M1000 30 L1004 16 L1008 30 M1080 38 L1084 24 L1088 38 M1160 45 L1164 31 L1168 45 M1240 32 L1244 18 L1248 32 M1340 38 L1344 24 L1348 38 M1410 52 L1414 38 L1418 52" stroke="#0e9a8f" strokeWidth="4" fill="none" opacity="0.2" strokeLinecap="round" />
            {/* Mid layer */}
            <path d="M0 140 L0 85 L80 50 L200 80 L320 40 L440 75 L560 35 L680 70 L800 45 L920 75 L1040 30 L1160 65 L1280 45 L1440 70 L1440 140 Z" fill="#0e9a8f" opacity="0.32" />
            {/* Mid tree-line */}
            <path d="M50 82 L54 67 L58 82 M110 72 L114 58 L118 72 M180 68 L184 53 L188 68 M260 60 L264 46 L268 60 M340 58 L344 44 L348 58 M420 65 L424 50 L428 65 M500 48 L504 34 L508 48 M580 62 L584 48 L588 62 M660 55 L664 41 L668 55 M740 48 L744 34 L748 48 M820 58 L824 44 L828 58 M900 52 L904 38 L908 52 M980 42 L984 28 L988 42 M1060 50 L1064 36 L1068 50 M1140 58 L1144 44 L1148 58 M1220 48 L1224 34 L1228 48 M1320 55 L1324 41 L1328 55 M1400 62 L1404 48 L1408 62" stroke="#0B8388" strokeWidth="5" fill="none" opacity="0.25" strokeLinecap="round" />
            {/* Front layer */}
            <path d="M0 140 L0 100 L100 70 L220 95 L340 60 L460 90 L580 55 L700 85 L820 65 L940 90 L1060 55 L1180 80 L1300 65 L1440 85 L1440 140 Z" fill="#0B8388" opacity="0.48" />
            {/* Front tree-line */}
            <path d="M20 98 L25 81 L30 98 M65 90 L70 74 L75 90 M130 88 L135 72 L140 88 M200 80 L205 65 L210 80 M280 75 L285 60 L290 75 M360 70 L365 55 L370 70 M430 82 L435 67 L440 82 M510 68 L515 53 L520 68 M590 75 L595 60 L600 75 M670 78 L675 63 L680 78 M750 72 L755 57 L760 72 M830 68 L835 53 L840 68 M910 80 L915 65 L920 80 M990 62 L995 47 L1000 62 M1070 72 L1075 57 L1080 72 M1150 78 L1155 63 L1160 78 M1240 68 L1245 53 L1250 68 M1340 75 L1345 60 L1350 75 M1420 82 L1425 67 L1430 82" stroke="#065f5f" strokeWidth="6" fill="none" opacity="0.3" strokeLinecap="round" />
          </svg>
        </div>

        {/* ===== MARQUEE STRIP ===== */}
        <div className="overflow-hidden bg-white py-4 border-y border-[#0B8388]/10" aria-hidden="true">
          <div className="marquee-track select-none">
            {[0, 1].map((rep) => (
              <span key={rep} className="flex items-center gap-0 shrink-0">
                {["CAMP", "NATURE", "AMAMI", "FOREST", "ADVENTURE", "GLAMPING", "ISLAND", "STARS"].map((word) => (
                  <span key={word} className="font-jost font-thin text-4xl md:text-6xl tracking-[0.3em] uppercase text-[#0B8388]/[0.07] px-8 whitespace-nowrap">
                    {word} ---
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* ===== ABOUT ===== */}
        <section id="about" className="py-20 md:py-32 bg-white">
          <div
            ref={addRef}
            className="max-w-6xl mx-auto px-6 opacity-0 translate-y-8 transition-all duration-700 ease-out"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-jost font-extrabold text-5xl md:text-7xl text-[#0B8388] leading-none mb-4">
                  ABOUT
                </h2>
                <h3 className="text-xl md:text-2xl font-bold mb-6">
                  奄美フォレストキャンプとは
                </h3>
                <p className="text-[#292929] leading-relaxed mb-4">
                  世界自然遺産に登録された奄美大島の豊かな森の中に佇むグランピング・キャンプ施設です。
                  亜熱帯の緑に囲まれながら、海まで徒歩5分という最高のロケーション。
                </p>
                <p className="text-[#292929] leading-relaxed mb-4">
                  手ぶらで楽しめるグランピングから、本格的なキャンプサイトまで、
                  あなたのスタイルに合わせた滞在をお選びいただけます。
                </p>
                <p className="text-[#292929] leading-relaxed">
                  満天の星空、波の音、鳥のさえずり。
                  奄美の自然がつくる非日常のひとときをお過ごしください。
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden">
                <Image
                  src="/images/demo/camp/hero.jpg"
                  alt="奄美の森の中のキャンプ場"
                  width={1200}
                  height={800}
                  priority
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ===== MOUNTAIN DIVIDER: about -> stay ===== */}
        <div className="mountain-divider relative" aria-hidden="true" style={{ overflow: "hidden" }}>
          <svg
            viewBox="0 0 1440 110"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMin meet"
            style={{ display: "block", width: "100%", height: "110px", transform: `translateY(${Math.max(-25, Math.min(25, parallaxY * -0.3))}px)` }}
          >
            <path d="M0 110 L0 60 L160 20 L280 55 L400 15 L520 50 L640 25 L760 55 L880 20 L1000 50 L1120 25 L1260 50 L1440 30 L1440 110 Z" fill="#d0ece8" opacity="0.5" />
            {/* Pine tree silhouettes on back ridge */}
            <path d="M155 18 L160 5 L165 18 M275 50 L280 38 L285 50 M395 13 L400 2 L405 13 M515 46 L520 35 L525 46 M635 22 L640 11 L645 22 M755 50 L760 39 L765 50 M875 17 L880 6 L885 17 M995 46 L1000 35 L1005 46 M1115 22 L1120 11 L1125 22 M1255 46 L1260 35 L1265 46 M1435 27 L1440 16 L1445 27" stroke="#0e9a8f" strokeWidth="5" fill="none" opacity="0.18" strokeLinecap="round" />
            <path d="M0 110 L0 75 L120 45 L240 70 L360 35 L480 65 L600 40 L720 68 L840 42 L960 70 L1080 38 L1200 65 L1320 50 L1440 60 L1440 110 Z" fill="#e0ecea" opacity="0.55" />
            {/* Front tree-line */}
            <path d="M35 72 L40 58 L45 72 M100 62 L105 49 L110 62 M175 66 L180 52 L185 66 M240 64 L245 50 L250 64 M340 52 L345 39 L350 52 M440 62 L445 49 L450 62 M540 48 L545 35 L550 48 M640 65 L645 52 L650 65 M720 60 L725 47 L730 60 M820 50 L825 37 L830 50 M920 66 L925 53 L930 66 M1020 45 L1025 32 L1030 45 M1120 60 L1125 47 L1130 60 M1220 52 L1225 39 L1230 52 M1340 56 L1345 43 L1350 56 M1420 62 L1425 49 L1430 62" stroke="#9ecdc8" strokeWidth="5" fill="none" opacity="0.3" strokeLinecap="round" />
          </svg>
        </div>

        {/* ===== STAY ===== */}
        <section id="stay" className="py-20 md:py-32 bg-[#F5F5F5]">
          <div
            ref={addRef}
            className="max-w-6xl mx-auto px-6 opacity-0 translate-y-8 transition-all duration-700 ease-out"
          >
            <div className="text-center mb-16">
              <h2 className="font-jost font-extrabold text-5xl md:text-7xl text-[#0B8388] leading-none mb-4">
                STAY
              </h2>
              <h3 className="text-xl md:text-2xl font-bold">泊まる</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "グランピングテント",
                  price: "¥18,000~/泊",
                  desc: "エアコン完備のラグジュアリーテント。ベッド・家具付きで快適な滞在を。",
                  img: "/images/demo/camp/stay-glamping.jpg",
                  alt: "グランピングテントの外観",
                },
                {
                  name: "コテージ",
                  price: "¥25,000~/泊",
                  desc: "木のぬくもり溢れるプライベートコテージ。キッチン・バス付き。ファミリーに人気。",
                  img: "/images/demo/camp/stay-cottage.jpg",
                  alt: "森の中のコテージ",
                },
                {
                  name: "テントサイト",
                  price: "¥3,000~/泊",
                  desc: "自分のテントで本格キャンプ。電源付きサイトもあり。",
                  img: "/images/demo/camp/stay-tent-site.jpg",
                  alt: "テントサイトの風景",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  ref={addRef}
                  className="stay-card bg-white rounded-2xl overflow-hidden opacity-0 translate-y-8 transition-all duration-700 ease-out cursor-pointer"
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <Image
                    src={item.img}
                    alt={item.alt}
                    width={800}
                    height={600}
                    className="w-full h-52 object-cover"
                  />
                  <div className="p-6">
                    <h4 className="text-lg font-bold mb-1">{item.name}</h4>
                    <p className="font-jost font-bold text-[#E86283] text-xl mb-3">{item.price}</p>
                    <p className="text-sm text-[#292929]/80 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== MOUNTAIN DIVIDER: stay -> eat ===== */}
        <div className="mountain-divider relative" aria-hidden="true" style={{ overflow: "hidden" }}>
          <svg
            viewBox="0 0 1440 120"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMin meet"
            style={{ display: "block", width: "100%", height: "120px", transform: `translateY(${Math.max(-30, Math.min(30, parallaxY * -0.5))}px)` }}
          >
            <path d="M0 120 L0 65 L100 35 L220 70 L340 20 L460 60 L580 30 L700 65 L820 30 L940 65 L1060 28 L1180 60 L1300 40 L1440 65 L1440 120 Z" fill="white" />
            {/* Tree silhouettes on ridge */}
            <path d="M95 33 L100 21 L105 33 M215 67 L220 56 L225 67 M335 18 L340 6 L345 18 M455 57 L460 46 L465 57 M575 27 L580 16 L585 27 M695 62 L700 51 L705 62 M815 27 L820 16 L825 27 M935 62 L940 51 L945 62 M1055 26 L1060 14 L1065 26 M1175 57 L1180 46 L1185 57 M1295 38 L1300 27 L1305 38" stroke="#cccccc" strokeWidth="5" fill="none" opacity="0.35" strokeLinecap="round" />
            <path d="M0 120 L0 80 L90 55 L200 80 L320 50 L440 75 L560 48 L680 78 L800 50 L920 78 L1040 48 L1160 75 L1280 55 L1440 75 L1440 120 Z" fill="#f0f0f0" opacity="0.5" />
            {/* Mushroom shapes on front */}
            <ellipse cx="150" cy="78" rx="8" ry="5" fill="#e0e0e0" opacity="0.5" />
            <rect x="147" y="78" width="6" height="4" rx="1" fill="#d8d8d8" opacity="0.5" />
            <ellipse cx="700" cy="76" rx="6" ry="4" fill="#e0e0e0" opacity="0.45" />
            <rect x="697" y="76" width="5" height="3" rx="1" fill="#d8d8d8" opacity="0.45" />
            <ellipse cx="1100" cy="70" rx="7" ry="4" fill="#e0e0e0" opacity="0.4" />
            <rect x="1097" y="70" width="6" height="3" rx="1" fill="#d8d8d8" opacity="0.4" />
          </svg>
        </div>

        {/* ===== EAT ===== */}
        <section id="eat" className="py-20 md:py-32 bg-white">
          <div
            ref={addRef}
            className="max-w-6xl mx-auto px-6 opacity-0 translate-y-8 transition-all duration-700 ease-out"
          >
            <div className="text-center mb-16">
              <h2 className="font-jost font-extrabold text-5xl md:text-7xl text-[#0B8388] leading-none mb-4">
                EAT
              </h2>
              <h3 className="text-xl md:text-2xl font-bold">食べる</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="rounded-2xl overflow-hidden">
                <Image
                  src="/images/demo/camp/bbq.jpg"
                  alt="BBQグリルの様子"
                  width={800}
                  height={600}
                  className="w-full h-[360px] object-cover"
                />
              </div>
              <div>
                <div className="space-y-6">
                  {[
                    {
                      name: "手ぶらBBQセット",
                      price: "¥3,500/人",
                      desc: "食材・機材・炭すべて込み。準備も片付けもおまかせ。",
                      color: "#FEC352",
                    },
                    {
                      name: "島食材BBQプレミアム",
                      price: "¥5,500/人",
                      desc: "奄美の黒毛和牛、地魚、島野菜をふんだんに使用した特別プラン。",
                      color: "#E86283",
                    },
                    {
                      name: "モーニングセット",
                      price: "¥800/人",
                      desc: "焼きたてパン、島たまご、フルーツ。森の朝を味わう朝食。",
                      color: "#FA9D7B",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      ref={addRef}
                      className="bg-[#F5F5F5] rounded-2xl p-6 opacity-0 translate-y-8 transition-all duration-700 ease-out"
                      style={{ transitionDelay: `${i * 150}ms` }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <div
                              className="w-3 h-3 rounded-full flex-shrink-0"
                              style={{ backgroundColor: item.color }}
                            />
                            <h4 className="text-lg font-bold">{item.name}</h4>
                          </div>
                          <p className="text-sm text-[#292929]/70 leading-relaxed">{item.desc}</p>
                        </div>
                        <span className="font-jost font-bold text-[#0B8388] text-lg whitespace-nowrap">
                          {item.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== MARQUEE STRIP 2 (dark) ===== */}
        <div className="wood-grain overflow-hidden bg-[#0B1a1a] py-5 border-y border-white/5" aria-hidden="true">
          <div className="marquee-track select-none" style={{ animationDirection: "reverse", animationDuration: "32s" }}>
            {[0, 1].map((rep) => (
              <span key={rep} className="flex items-center gap-0 shrink-0">
                {["CAMP", "NATURE", "AMAMI", "FOREST", "ADVENTURE", "GLAMPING", "ISLAND", "STARS"].map((word) => (
                  <span key={word} className="font-jost font-thin text-3xl md:text-5xl tracking-[0.35em] uppercase text-white/[0.06] px-8 whitespace-nowrap">
                    {word} ---
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* ===== PLAY ===== */}
        <section id="play" className="py-20 md:py-32 bg-[#F5F5F5]">
          <div
            ref={addRef}
            className="max-w-6xl mx-auto px-6 opacity-0 translate-y-8 transition-all duration-700 ease-out"
          >
            <div className="text-center mb-16">
              <h2 className="font-jost font-extrabold text-5xl md:text-7xl text-[#0B8388] leading-none mb-4">
                PLAY
              </h2>
              <h3 className="text-xl md:text-2xl font-bold">遊ぶ</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "カヤック体験",
                  price: "¥4,000/人",
                  desc: "マングローブの森をカヤックで探検。ガイド付きで初心者でも安心。",
                  img: "/images/demo/camp/activity-kayak.jpg",
                  alt: "カヤック体験の様子",
                },
                {
                  name: "星空観察ツアー",
                  price: "¥2,000/人",
                  desc: "光害のない奄美の空に広がる満天の星。天体望遠鏡で惑星観測も。",
                  img: "/images/demo/camp/activity-stargazing.jpg",
                  alt: "奄美の星空",
                },
                {
                  name: "ビーチまで徒歩5分",
                  price: "無料",
                  desc: "透明度抜群の海がすぐそこ。シュノーケリングや海水浴を満喫。",
                  img: "/images/demo/camp/activity-beach.jpg",
                  alt: "奄美のビーチ",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  ref={addRef}
                  className="group bg-white rounded-2xl overflow-hidden opacity-0 translate-y-8 transition-all duration-700 ease-out"
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className="overflow-hidden">
                    <Image
                      src={item.img}
                      alt={item.alt}
                      width={800}
                      height={600}
                      className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-bold">{item.name}</h4>
                      <span className="font-jost font-semibold text-[#0B8388]">{item.price}</span>
                    </div>
                    <p className="text-sm text-[#292929]/70 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== MOUNTAIN DIVIDER: play -> gallery ===== */}
        <div className="mountain-divider relative" aria-hidden="true" style={{ overflow: "hidden" }}>
          <svg
            viewBox="0 0 1440 100"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMin meet"
            style={{ display: "block", width: "100%", height: "100px", transform: `translateY(${Math.max(-25, Math.min(25, parallaxY * -0.35))}px)` }}
          >
            <path d="M0 100 L0 55 L180 15 L300 50 L420 10 L540 45 L660 15 L780 50 L900 18 L1020 52 L1140 20 L1260 50 L1440 25 L1440 100 Z" fill="white" />
            {/* Dense pine tree silhouettes */}
            <path d="M175 13 L180 2 L185 13 M295 47 L300 36 L305 47 M415 8 L420 -2 L425 8 M535 42 L540 31 L545 42 M655 12 L660 1 L665 12 M775 47 L780 36 L785 47 M895 16 L900 5 L905 16 M1015 49 L1020 38 L1025 49 M1135 18 L1140 7 L1145 18 M1255 47 L1260 36 L1265 47 M1435 23 L1440 12 L1445 23" stroke="#c8c8c8" strokeWidth="5" fill="none" opacity="0.4" strokeLinecap="round" />
            {/* Extra trees between peaks */}
            <path d="M235 45 L239 35 L243 45 M355 30 L359 20 L363 30 M475 42 L479 32 L483 42 M595 38 L599 28 L603 38 M715 44 L719 34 L723 44 M835 38 L839 28 L843 38 M955 46 L959 36 L963 46 M1075 36 L1079 26 L1083 36 M1195 44 L1199 34 L1203 44 M1350 38 L1354 28 L1358 38" stroke="#c8c8c8" strokeWidth="4" fill="none" opacity="0.3" strokeLinecap="round" />
            <path d="M0 100 L0 70 L150 42 L270 68 L390 38 L510 65 L630 40 L750 65 L870 38 L990 65 L1110 38 L1230 65 L1440 50 L1440 100 Z" fill="#ececec" opacity="0.5" />
          </svg>
        </div>

        {/* ===== GALLERY ===== */}
        <section className="py-20 md:py-32 bg-white">
          <div
            ref={addRef}
            className="max-w-6xl mx-auto px-6 opacity-0 translate-y-8 transition-all duration-700 ease-out"
          >
            <div className="text-center mb-16">
              <h2 className="font-jost font-extrabold text-5xl md:text-7xl text-[#0B8388] leading-none mb-4">
                GALLERY
              </h2>
              <h3 className="text-xl md:text-2xl font-bold">フォトギャラリー</h3>
            </div>
            <div className="columns-2 md:columns-3 gap-4 space-y-4">
              {[
                { src: "/images/demo/camp/gallery-campfire.jpg", alt: "キャンプファイヤーの様子", h: "h-64", dir: "gallery-item-left" },
                { src: "/images/demo/camp/gallery-tent-view.jpg", alt: "テントの中から見る景色", h: "h-48", dir: "gallery-item-bottom" },
                { src: "/images/demo/camp/gallery-lake-mountain.jpg", alt: "奄美の湖と山々", h: "h-72", dir: "gallery-item-right" },
                { src: "/images/demo/camp/gallery-mountain-top.jpg", alt: "山の上からの絶景", h: "h-56", dir: "gallery-item-right" },
                { src: "/images/demo/camp/gallery-sunset-camp.jpg", alt: "夕暮れのキャンプ場", h: "h-64", dir: "gallery-item-bottom" },
                { src: "/images/demo/camp/gallery-hammock.jpg", alt: "自然の中のハンモック", h: "h-52", dir: "gallery-item-left" },
              ].map((photo, i) => (
                <div
                  key={i}
                  ref={addGalleryRef}
                  className={`break-inside-avoid ${photo.dir}`}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={600}
                    height={400}
                    className={`w-full ${photo.h} object-cover rounded-2xl`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section id="faq" className="py-20 md:py-32 bg-white">
          <div
            ref={addRef}
            className="max-w-3xl mx-auto px-6 opacity-0 translate-y-8 transition-all duration-700 ease-out"
          >
            <div className="text-center mb-16">
              <h2 className="font-jost font-extrabold text-5xl md:text-7xl text-[#0B8388] leading-none mb-4">
                FAQ
              </h2>
              <h3 className="text-xl md:text-2xl font-bold">よくある質問</h3>
            </div>
            <div className="space-y-3">
              {[
                {
                  q: "持ち物は何が必要ですか？",
                  a: "グランピング・コテージプランは手ぶらでOKです。タオル・着替えだけお持ちください。テントサイトは寝袋・テントなど一式ご自身でご用意いただくか、レンタルセット（¥1,500〜）もございます。",
                },
                {
                  q: "ペットは連れて行けますか？",
                  a: "テントサイトのみペット同伴可能です（小型・中型犬まで）。グランピングテント・コテージへのペット同伴はご遠慮いただいております。リードの着用と他のお客様へのご配慮をお願いします。",
                },
                {
                  q: "キャンセルポリシーを教えてください。",
                  a: "7日前まで：無料。3〜6日前：ご利用料金の30%。前日：50%。当日・無連絡：100%のキャンセル料をいただきます。台風・自然災害による中止の場合は全額返金いたします。",
                },
                {
                  q: "近くにコンビニや買い物できる場所はありますか？",
                  a: "施設から車で約10分の場所にコンビニエンスストアがあります。飲料・軽食・BBQ食材の追加購入も可能です。また、場内の売店でも基本的な食材・お土産品をご用意しております。",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  ref={addRef}
                  className="bg-[#F5F5F5] rounded-2xl overflow-hidden opacity-0 translate-y-8 transition-all duration-700 ease-out"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <button
                    type="button"
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    <span className="font-bold text-[#292929] leading-snug pr-2">
                      {item.q}
                    </span>
                    <span
                      className="flex-shrink-0 w-7 h-7 rounded-full bg-[#0B8388] flex items-center justify-center transition-transform duration-300"
                      style={{ transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)" }}
                      aria-hidden="true"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-6">
                      <p className="text-[#292929]/80 leading-relaxed text-sm border-t border-[#0B8388]/10 pt-4">
                        {item.a}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== MOUNTAIN DIVIDER: faq -> access ===== */}
        <div className="mountain-divider relative" aria-hidden="true" style={{ overflow: "hidden" }}>
          <svg
            viewBox="0 0 1440 90"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMin meet"
            style={{ display: "block", width: "100%", height: "90px", transform: `translateY(${Math.max(-20, Math.min(20, parallaxY * -0.25))}px)` }}
          >
            <path d="M0 90 L0 50 L180 18 L360 48 L540 14 L720 46 L900 16 L1080 48 L1260 20 L1440 44 L1440 90 Z" fill="#d0ece8" opacity="0.45" />
            <path d="M175 16 L180 5 L185 16 M355 45 L360 34 L365 45 M535 12 L540 1 L545 12 M715 43 L720 32 L725 43 M895 14 L900 3 L905 14 M1075 45 L1080 34 L1085 45 M1255 18 L1260 7 L1265 18 M1435 41 L1440 30 L1445 41" stroke="#0e9a8f" strokeWidth="5" fill="none" opacity="0.18" strokeLinecap="round" />
            <path d="M0 90 L0 62 L160 38 L320 60 L480 32 L640 58 L800 34 L960 60 L1120 36 L1280 58 L1440 42 L1440 90 Z" fill="#e0f0ee" opacity="0.5" />
          </svg>
        </div>

        {/* ===== ACCESS ===== */}
        <section id="access" className="py-20 md:py-32 bg-[#F5F5F5]">
          <div
            ref={addRef}
            className="max-w-4xl mx-auto px-6 opacity-0 translate-y-8 transition-all duration-700 ease-out"
          >
            <div className="text-center mb-16">
              <h2 className="font-jost font-extrabold text-5xl md:text-7xl text-[#0B8388] leading-none mb-4">
                ACCESS
              </h2>
              <h3 className="text-xl md:text-2xl font-bold">アクセス</h3>
            </div>
            <div className="bg-white rounded-2xl p-8 md:p-12">
              <table className="w-full text-left">
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["施設名", "AMAMI FOREST CAMP（奄美フォレストキャンプ）"],
                    ["所在地", "鹿児島県奄美市住用町"],
                    ["アクセス", "奄美空港から車で約40分 / 名瀬市街地から車で約20分"],
                    ["チェックイン", "15:00〜18:00"],
                    ["チェックアウト", "〜10:00"],
                    ["駐車場", "無料（30台）"],
                    ["設備", "共用トイレ・シャワー / 炊事場 / 売店 / Wi-Fi完備"],
                  ].map(([label, value], i) => (
                    <tr key={i}>
                      <td className="py-4 pr-6 font-bold text-[#0B8388] whitespace-nowrap align-top text-sm md:text-base">
                        {label}
                      </td>
                      <td className="py-4 text-[#292929] text-sm md:text-base">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ===== RESERVATION CTA ===== */}
        <section className="wood-grain py-20 md:py-32 bg-[#0B8388] text-white relative overflow-hidden">
          {/* Fireflies in CTA section */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            {fireflies.slice(0, 10).map((f, i) => (
              <span
                key={i}
                className="firefly"
                style={{
                  top: f.top,
                  left: f.left,
                  ["--tw-delay" as string]: f.delay,
                  ["--tw-dur" as string]: f.duration,
                  background: "#c8ffe8",
                  boxShadow: "0 0 6px 2px rgba(200, 255, 232, 0.6)",
                }}
              />
            ))}
          </div>
          <div
            ref={addRef}
            className="max-w-4xl mx-auto px-6 text-center opacity-0 translate-y-8 transition-all duration-700 ease-out relative z-10"
          >
            <h2 className="font-jost font-extrabold text-4xl md:text-6xl leading-none mb-4">
              RESERVATION
            </h2>
            <h3 className="text-xl md:text-2xl font-bold mb-8">
              ご予約・お問い合わせ
            </h3>
            <p className="text-white/80 mb-8 leading-relaxed max-w-lg mx-auto">
              お電話またはオンラインでご予約を承っております。<br />
              ご不明点はお気軽にお問い合わせください。
            </p>
            <div className="font-jost text-3xl md:text-5xl font-bold mb-8 tracking-wider">
              0997-XX-XXXX
            </div>
            <p className="text-white/60 text-sm mb-10">受付時間 9:00〜18:00（年中無休）</p>

            {/* ===== Campfire SVG ===== */}
            <div className="flex justify-center mb-10" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200" style={{ overflow: "visible" }}>
                <defs>
                  <radialGradient id="cfGlow" cx="50%" cy="70%" r="45%">
                    <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.5" />
                    <stop offset="50%" stopColor="#FF8C42" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#FF6B35" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="cfCoal" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FF4500" stopOpacity="0.85" />
                    <stop offset="60%" stopColor="#CC2200" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#8B1A00" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="cfGrnd" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FF8C42" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#FF6B35" stopOpacity="0" />
                  </radialGradient>
                  <filter id="cfBlur"><feGaussianBlur stdDeviation="3" /></filter>
                  <filter id="cfBlur2"><feGaussianBlur stdDeviation="6" /></filter>
                </defs>

                {/* Ground light cast */}
                <ellipse className="cf-grnd" cx="100" cy="172" rx="80" ry="18" fill="url(#cfGrnd)" />

                {/* Warm glow behind fire */}
                <ellipse className="cf-glow" cx="100" cy="140" rx="60" ry="35" fill="url(#cfGlow)" filter="url(#cfBlur2)" />

                {/* Stone ring */}
                {[
                  { x: 58, y: 168 }, { x: 72, y: 172 }, { x: 88, y: 174 }, { x: 104, y: 174 },
                  { x: 120, y: 172 }, { x: 134, y: 168 }, { x: 142, y: 162 }, { x: 50, y: 162 },
                ].map((s, i) => (
                  <ellipse key={`st${i}`} cx={s.x} cy={s.y} rx={6 + (i % 3)} ry={4 + (i % 2)} fill={i % 2 ? "#6B7280" : "#7B8494"} opacity={0.6} />
                ))}

                {/* Logs */}
                <rect x="50" y="152" width="72" height="13" rx="6.5" fill="#8B5E34" transform="rotate(-15 86 158)" />
                <line x1="58" y1="156" x2="116" y2="156" stroke="#A0714A" strokeWidth="0.8" opacity="0.4" transform="rotate(-15 86 158)" />
                <rect x="72" y="152" width="72" height="13" rx="6.5" fill="#6B4423" transform="rotate(15 108 158)" />
                <line x1="80" y1="156" x2="138" y2="156" stroke="#8B5E34" strokeWidth="0.8" opacity="0.4" transform="rotate(15 108 158)" />
                <rect x="52" y="158" width="88" height="12" rx="6" fill="#7A4F2D" />
                <line x1="60" y1="163" x2="132" y2="163" stroke="#6B4423" strokeWidth="1" opacity="0.35" />
                <line x1="58" y1="166" x2="134" y2="166" stroke="#5C3A1E" strokeWidth="0.7" opacity="0.25" />
                {/* Log ends */}
                <ellipse cx="54" cy="164" rx="7" ry="6" fill="#5C3A1E" />
                <ellipse cx="138" cy="164" rx="7" ry="6" fill="#5C3A1E" />
                <circle cx="54" cy="164" r="2" fill="#4A2E14" opacity="0.5" />
                <circle cx="138" cy="164" r="2" fill="#4A2E14" opacity="0.5" />

                {/* Coal bed */}
                <ellipse className="cf-coal" cx="100" cy="156" rx="32" ry="8" fill="url(#cfCoal)" />

                {/* Smoke wisps */}
                <ellipse className="cf-smA" cx="95" cy="70" rx="8" ry="12" fill="#9CA3AF" opacity="0.15" filter="url(#cfBlur)" />
                <ellipse className="cf-smB" cx="108" cy="65" rx="6" ry="10" fill="#9CA3AF" opacity="0.12" filter="url(#cfBlur)" />
                <ellipse className="cf-smC" cx="100" cy="60" rx="7" ry="11" fill="#9CA3AF" opacity="0.1" filter="url(#cfBlur)" />

                {/* Flame layer 1: outer (deep red-orange) */}
                <path className="cf-f1"
                  d="M100 156 C82 142,66 118,72 90 C76 72,84 56,80 38 C88 52,86 66,92 76 C96 64,92 48,100 34 C108 48,104 64,108 76 C114 66,112 52,120 38 C116 56,124 72,128 90 C134 118,118 142,100 156 Z"
                  fill="#E8421E" opacity="0.85" />

                {/* Flame layer 2: orange */}
                <path className="cf-f2"
                  d="M100 154 C84 140,72 120,76 94 C79 76,86 62,82 44 C90 56,88 68,94 78 C98 66,94 52,100 40 C106 52,102 66,106 78 C112 68,110 56,118 44 C114 62,121 76,124 94 C128 120,116 140,100 154 Z"
                  fill="#FF6B35" opacity="0.9" />

                {/* Flame layer 3: yellow */}
                <path className="cf-f3"
                  d="M100 152 C88 140,78 122,82 100 C84 84,90 70,86 54 C92 64,90 74,96 82 C98 72,96 60,100 50 C104 60,102 72,104 82 C110 74,108 64,114 54 C110 70,116 84,118 100 C122 122,112 140,100 152 Z"
                  fill="#FFC857" opacity="0.92" />

                {/* Flame layer 4: bright yellow */}
                <path className="cf-f4"
                  d="M100 150 C90 140,82 126,86 108 C88 94,92 82,90 68 C96 76,94 84,98 90 C100 82,98 72,100 64 C102 72,100 82,102 90 C106 84,104 76,110 68 C108 82,112 94,114 108 C118 126,110 140,100 150 Z"
                  fill="#FFE082" opacity="0.88" />

                {/* Flame tip: white-hot core */}
                <path className="cf-tip"
                  d="M100 148 C94 140,88 128,92 114 C94 104,96 94,96 82 C98 90,98 98,100 106 C102 98,102 90,104 82 C104 94,106 104,108 114 C112 128,106 140,100 148 Z"
                  fill="#FFFACD" opacity="0.85" />

                {/* Bright core glow */}
                <ellipse cx="100" cy="130" rx="12" ry="20" fill="#FFFACD" opacity="0.3" filter="url(#cfBlur)" />

                {/* Embers — 10 sparks with varied trajectories */}
                <circle className="cf-e1" cx="92" cy="100" r="2.5" fill="#FF6B35" />
                <circle className="cf-e2" cx="110" cy="95" r="2" fill="#FFC857" />
                <circle className="cf-e3" cx="96" cy="88" r="1.8" fill="#FF8C42" />
                <circle className="cf-e4" cx="106" cy="104" r="2.2" fill="#FF6B35" />
                <circle className="cf-e5" cx="88" cy="92" r="1.5" fill="#FFC857" />
                <circle className="cf-e6" cx="114" cy="88" r="1.6" fill="#FFFACD" />
                <circle className="cf-e7" cx="98" cy="82" r="1.3" fill="#FF6B35" />
                <circle className="cf-e8" cx="104" cy="96" r="2" fill="#FFE082" />
                <circle className="cf-e9" cx="90" cy="86" r="1.7" fill="#FFC857" />
                <circle className="cf-e10" cx="112" cy="92" r="1.4" fill="#FFFACD" />
              </svg>
            </div>
            {/* ===== /Campfire SVG ===== */}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                type="button"
                className="btn-pulse inline-block bg-white text-[#0B8388] font-bold px-10 py-4 rounded-full text-lg hover:bg-white/90 transition-colors"
              >
                オンライン予約
              </button>
              <button
                type="button"
                className="inline-block bg-[#292929] text-white font-bold px-10 py-4 rounded-full text-lg hover:bg-[#3a3a3a] transition-colors"
              >
                お問い合わせ
              </button>
            </div>
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <footer className="wood-grain bg-[#292929] text-white py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="font-jost font-extrabold text-2xl md:text-3xl tracking-wider mb-2">
                AMAMI FOREST CAMP
              </h2>
              <p className="text-white/50 text-sm">奄美フォレストキャンプ</p>
            </div>
            <div className="text-center text-white/50 text-sm mb-8 space-y-1">
              <p>鹿児島県奄美市住用町</p>
              <p>TEL: 0997-XX-XXXX</p>
              <p>MAIL: <a href="mailto:info@amami-forest-camp.jp" className="hover:text-white/80 transition-colors">info@amami-forest-camp.jp</a></p>
            </div>
            {/* SNS */}
            <div className="flex justify-center gap-6 mb-10">
              {[
                { label: "Instagram", path: "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" },
                { label: "Facebook", path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
                { label: "Twitter", path: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" },
              ].map((sns, i) => (
                <span
                  key={i}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center opacity-50 cursor-default"
                  aria-hidden="true"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={sns.path} />
                  </svg>
                </span>
              ))}
            </div>
            <div className="text-center mt-8 pt-6 border-t border-white/10">
              <p className="text-xs opacity-30">
                &copy; 2026 AMAMI FOREST CAMP. All rights reserved. — デモサイト Designed by{" "}
                <a href="/web#gallery" className="hover:opacity-60 transition-opacity">ALPACA</a>
              </p>
            </div>
          </div>
        </footer>

        {/* ─── Fixed Bottom CTA Bar ─── */}
        <div className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ${showCta ? "translate-y-0" : "translate-y-full"}`}>
          <div className="bg-[#0B8388]/95 backdrop-blur-md border-t border-[#FEC352]/20 px-4 py-3">
            <div className="max-w-5xl mx-auto flex items-center justify-between">
              <div className="hidden sm:block">
                <p className="text-sm font-bold text-white font-jost">AMAMI FOREST CAMP</p>
                <p className="text-xs text-white/50">ご予約・お問い合わせ受付中</p>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href="tel:0997-XX-XXXX"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-white/30 hover:border-white/60 rounded-full text-sm font-bold text-white transition-all"
                  aria-label="電話する"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.6 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6 6l.94-.94a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.73 16.92z" />
                  </svg>
                  電話する
                </a>
                <a
                  href="#reserve"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#FEC352] hover:bg-[#ffd270] rounded-full text-sm font-bold text-[#0B8388] transition-all shadow-lg shadow-[#FEC352]/20"
                >
                  オンライン予約
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
