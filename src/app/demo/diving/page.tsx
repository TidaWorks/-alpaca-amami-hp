"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { WaveIcon, SunIcon, MapPinIcon, PhoneIcon, ClockIcon, CarIcon } from "../components/icons";

// ─── Inline SVG Icons ───────────────────────────────────────────────
function CompassIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" opacity="0.3" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

function MaskIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 28c0-8 5-16 24-16s24 8 24 16-6 14-12 14h-6c-2 0-3-1-6-1s-4 1-6 1h-6C14 42 8 36 8 28z" />
      <ellipse cx="22" cy="28" rx="8" ry="6" />
      <ellipse cx="42" cy="28" rx="8" ry="6" />
      <path d="M30 28h4" />
      <path d="M32 42v8" />
      <circle cx="32" cy="52" r="2" />
    </svg>
  );
}

function CheckIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ArrowLeftIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

function CameraIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}

// ─── Bubble animation component ─────────────────────────────────────
// Large individual bubbles with shine highlight
const LARGE_BUBBLES = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  size: 30 + ((i * 7 + 3) % 12), // 30–42px
  left: (i * 12.5 + 3) % 95,
  delay: (i * 1.2) % 10,
  duration: 9 + (i * 1.3) % 7,
  wobbleType: i % 3, // 0=straight, 1=wobbleLeft, 2=wobbleRight
}));

// Small bubble clusters (groups of 3–4 tiny bubbles)
const BUBBLE_CLUSTERS = Array.from({ length: 5 }, (_, ci) => ({
  id: ci,
  left: (ci * 19 + 8) % 90,
  delay: (ci * 1.8) % 11,
  duration: 8 + (ci * 1.4) % 6,
  bubbles: Array.from({ length: 3 + (ci % 2) }, (_, bi) => ({
    id: bi,
    size: 4 + bi * 2,
    offsetX: (bi - 1) * 8,
    delayExtra: bi * 0.3,
  })),
}));

function Bubbles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large bubbles with shine */}
      {LARGE_BUBBLES.map((b) => (
        <div
          key={b.id}
          className="absolute rounded-full"
          style={{
            width: `${b.size}px`,
            height: `${b.size}px`,
            left: `${b.left}%`,
            bottom: "-50px",
            background: "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.12) 35%, rgba(100,220,255,0.08) 100%)",
            border: "1.5px solid rgba(255,255,255,0.35)",
            boxShadow: "inset 0 0 6px rgba(255,255,255,0.15), 0 0 10px rgba(34,211,238,0.15)",
            animationName: b.wobbleType === 1 ? "bubbleRiseWobbleLeft" : b.wobbleType === 2 ? "bubbleRiseWobbleRight" : "bubbleRise",
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
          }}
        >
          {/* Shine highlight dot */}
          <div
            className="absolute rounded-full bg-white/70"
            style={{ width: "28%", height: "22%", top: "14%", left: "20%" }}
          />
          {/* Secondary smaller shine */}
          <div
            className="absolute rounded-full bg-white/40"
            style={{ width: "14%", height: "10%", top: "28%", left: "30%" }}
          />
        </div>
      ))}

      {/* Small bubble clusters */}
      {BUBBLE_CLUSTERS.map((cluster) => (
        <div
          key={cluster.id}
          className="absolute"
          style={{
            left: `${cluster.left}%`,
            bottom: "-30px",
            animationName: "bubbleRise",
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
            animationDelay: `${cluster.delay}s`,
            animationDuration: `${cluster.duration}s`,
          }}
        >
          {cluster.bubbles.map((bb) => (
            <div
              key={bb.id}
              className="absolute rounded-full"
              style={{
                width: `${bb.size}px`,
                height: `${bb.size}px`,
                left: `${bb.offsetX}px`,
                bottom: `${bb.id * 6}px`,
                background: "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.1) 60%)",
                border: "1px solid rgba(255,255,255,0.3)",
                animationDelay: `${bb.delayExtra}s`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

// Sea foam dots that appear at wave crests
function SeaFoam({ flip = false }: { flip?: boolean }) {
  const foamDots = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: (i * 5.6 + 2) % 98,
    size: 3 + (i % 3) * 2,
    delay: (i * 0.4) % 3,
    topOffset: flip ? (4 + (i % 4) * 3) : (6 + (i % 4) * 3),
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {foamDots.map((d) => (
        <div
          key={d.id}
          className="absolute rounded-full bg-white/60"
          style={{
            width: `${d.size}px`,
            height: `${d.size}px`,
            left: `${d.left}%`,
            top: `${d.topOffset}px`,
            animationName: "foamPop",
            animationDuration: "2.5s",
            animationTimingFunction: "ease-out",
            animationIterationCount: "infinite",
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Animated SVG Wave Divider ───────────────────────────────────────
function WaveDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div
      className="relative w-full overflow-hidden pointer-events-none"
      style={{ height: "100px", transform: flip ? "scaleY(-1)" : "none" }}
    >
      {/* Slow wave layer (background) */}
      <div
        className="absolute top-0 left-0 flex"
        style={{
          width: "200%",
          height: "100%",
          animationName: "waveMove",
          animationDuration: "14s",
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        {[0, 1].map((k) => (
          <svg
            key={k}
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
            style={{ width: "50%", height: "100%", flexShrink: 0 }}
          >
            <path
              d="M0,50 C180,95 360,5 540,50 C720,95 900,5 1080,50 C1260,95 1350,25 1440,50 L1440,100 L0,100 Z"
              fill="rgba(12,74,110,0.4)"
            />
          </svg>
        ))}
      </div>
      {/* Fast wave layer (foreground) */}
      <div
        className="absolute top-0 left-0 flex"
        style={{
          width: "200%",
          height: "100%",
          animationName: "waveMove",
          animationDuration: "9s",
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        {[0, 1].map((k) => (
          <svg
            key={k}
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
            style={{ width: "50%", height: "100%", flexShrink: 0 }}
          >
            <path
              d="M0,62 C240,25 480,82 720,58 C960,25 1200,78 1440,62 L1440,100 L0,100 Z"
              fill="rgba(34,211,238,0.18)"
            />
            {/* Wave crest highlight (white edge) */}
            <path
              d="M0,62 C240,25 480,82 720,58 C960,25 1200,78 1440,62"
              fill="none"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="2.5"
            />
          </svg>
        ))}
      </div>
      <SeaFoam flip={flip} />
    </div>
  );
}

// ─── Marquee Strip ───────────────────────────────────────────────────
function MarqueeStrip() {
  const text = "DIVE INTO THE BLUE --- AMAMI OSHIMA --- EXPLORE THE OCEAN --- WORLD HERITAGE REEF --- BLUE AMAMI --- ";
  return (
    <div className="relative w-full overflow-hidden py-4 pointer-events-none" style={{ background: "rgba(12,74,110,0.15)" }}>
      <div
        className="flex whitespace-nowrap"
        style={{
          animationName: "marqueeScroll",
          animationDuration: "28s",
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        {[text, text].map((t, idx) => (
          <span
            key={idx}
            className="text-2xl sm:text-3xl font-thin uppercase tracking-[0.3em] text-white/10"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── 3D Tilt Card ────────────────────────────────────────────────────
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string; }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    card.style.transform = `perspective(900px) rotateY(${dx * 7}deg) rotateX(${-dy * 5}deg) scale3d(1.02,1.02,1.02)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)";
  }, []);

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: "transform 0.15s ease-out", transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

// ─── Stagger-reveal wrapper (Intersection Observer) ───────────────────
function StaggerItem({ children, index, className = "" }: { children: React.ReactNode; index: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 150);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.97)",
        transition: "opacity 0.55s ease-out, transform 0.55s ease-out",
      }}
    >
      {children}
    </div>
  );
}

// ─── Pulsing dot for dive spots ──────────────────────────────────────
function PulseDot() {
  return (
    <span className="relative inline-flex w-3 h-3 mr-2 flex-shrink-0 mt-1">
      <span
        className="absolute inline-flex rounded-full bg-cyan-400"
        style={{
          inset: 0,
          animationName: "pulseRing",
          animationDuration: "2s",
          animationTimingFunction: "ease-out",
          animationIterationCount: "infinite",
        }}
      />
      <span className="relative inline-flex rounded-full w-3 h-3 bg-cyan-500" />
    </span>
  );
}

// ─── Decorative fish SVG components ──────────────────────────────────

// Tropical fish (clownfish style — orange stripes)
function FishTropical({ facing = "right", className = "" }: { facing?: "left" | "right"; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 60 36"
      fill="none"
      style={{ transform: facing === "left" ? "scaleX(-1)" : "none" }}
    >
      {/* Body */}
      <ellipse cx="34" cy="18" rx="18" ry="11" fill="#FF7A20" />
      {/* White vertical stripe 1 */}
      <ellipse cx="34" cy="18" rx="4" ry="11" fill="rgba(255,255,255,0.85)" />
      {/* White vertical stripe 2 */}
      <ellipse cx="44" cy="18" rx="2.5" ry="8" fill="rgba(255,255,255,0.6)" />
      {/* Black outline */}
      <ellipse cx="34" cy="18" rx="18" ry="11" fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth="1" />
      {/* Tail fin */}
      <path d="M16 18 L4 8 L7 18 L4 28 Z" fill="#FF7A20" stroke="rgba(0,0,0,0.25)" strokeWidth="0.8" />
      {/* Dorsal fin */}
      <path d="M28 7 Q32 1 40 5 Q36 8 30 8 Z" fill="#FF7A20" stroke="rgba(0,0,0,0.2)" strokeWidth="0.8" />
      {/* Pectoral fin */}
      <path d="M34 22 Q30 28 26 26 Q28 22 34 22 Z" fill="rgba(255,200,100,0.8)" />
      {/* Eye */}
      <circle cx="46" cy="15" r="3" fill="white" />
      <circle cx="47" cy="15" r="1.8" fill="#111" />
      <circle cx="47.5" cy="14.2" r="0.6" fill="white" />
    </svg>
  );
}

// Angelfish (tall, thin — yellow/blue)
function FishAngel({ facing = "right", className = "" }: { facing?: "left" | "right"; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 56"
      fill="none"
      style={{ transform: facing === "left" ? "scaleX(-1)" : "none" }}
    >
      {/* Body */}
      <ellipse cx="26" cy="30" rx="12" ry="18" fill="#22D3EE" />
      {/* Yellow stripe */}
      <path d="M20 14 Q26 12 32 14 L34 46 Q26 48 18 46 Z" fill="rgba(250,204,21,0.7)" />
      {/* Dorsal fin */}
      <path d="M22 12 Q18 2 26 4 Q32 2 28 12 Z" fill="#0EA5E9" stroke="rgba(0,0,0,0.2)" strokeWidth="0.8" />
      {/* Ventral fin */}
      <path d="M22 48 Q18 56 26 54 Q32 56 28 48 Z" fill="#0EA5E9" stroke="rgba(0,0,0,0.2)" strokeWidth="0.8" />
      {/* Tail fin */}
      <path d="M14 30 L2 22 L5 30 L2 38 Z" fill="#0EA5E9" />
      {/* Outline */}
      <ellipse cx="26" cy="30" rx="12" ry="18" fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="1" />
      {/* Eye */}
      <circle cx="34" cy="24" r="3" fill="white" />
      <circle cx="35" cy="24" r="1.8" fill="#111" />
      <circle cx="35.5" cy="23.2" r="0.6" fill="white" />
    </svg>
  );
}

// Sea turtle
function SeaTurtle({ facing = "right", className = "" }: { facing?: "left" | "right"; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 72 48"
      fill="none"
      style={{ transform: facing === "left" ? "scaleX(-1)" : "none" }}
    >
      {/* Shell */}
      <ellipse cx="36" cy="26" rx="20" ry="14" fill="#3B6E45" />
      {/* Shell pattern */}
      <ellipse cx="36" cy="26" rx="14" ry="9" fill="#4E9258" />
      <path d="M30 17 L36 26 L42 17" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
      <path d="M22 26 L36 26 L50 26" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
      <path d="M30 35 L36 26 L42 35" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
      {/* Head */}
      <ellipse cx="54" cy="24" rx="7" ry="5" fill="#5AA865" />
      <circle cx="57" cy="22" r="1.5" fill="#111" />
      <circle cx="57.5" cy="21.5" r="0.5" fill="white" />
      {/* Front flippers */}
      <path d="M38 14 Q45 6 52 10 Q46 14 40 16 Z" fill="#3B6E45" />
      <path d="M38 38 Q45 46 52 42 Q46 38 40 36 Z" fill="#3B6E45" />
      {/* Back flippers */}
      <path d="M20 14 Q14 8 10 12 Q14 16 18 17 Z" fill="#3B6E45" />
      <path d="M20 38 Q14 44 10 40 Q14 36 18 35 Z" fill="#3B6E45" />
      {/* Tail */}
      <path d="M16 26 L6 26 L10 22 L10 30 Z" fill="#3B6E45" />
    </svg>
  );
}

// Simple fish (existing style but bigger and cyan-tinted for depth background)
function DepthFish({ facing = "right", className = "" }: { facing?: "left" | "right"; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 60 36"
      fill="none"
      style={{ transform: facing === "left" ? "scaleX(-1)" : "none" }}
    >
      {/* Body */}
      <ellipse cx="34" cy="18" rx="18" ry="10" fill="rgba(34,211,238,0.3)" stroke="rgba(34,211,238,0.55)" strokeWidth="1.2" />
      {/* Belly highlight */}
      <ellipse cx="34" cy="20" rx="10" ry="5" fill="rgba(255,255,255,0.1)" />
      {/* Tail */}
      <path d="M16 18 L4 8 L7 18 L4 28 Z" fill="rgba(34,211,238,0.3)" stroke="rgba(34,211,238,0.5)" strokeWidth="1" />
      {/* Dorsal fin */}
      <path d="M28 8 Q34 3 40 7 Q36 9 28 8 Z" fill="rgba(34,211,238,0.4)" />
      {/* Eye */}
      <circle cx="46" cy="15" r="2.5" fill="rgba(34,211,238,0.8)" />
      <circle cx="46.5" cy="14.5" r="1" fill="rgba(255,255,255,0.9)" />
    </svg>
  );
}

// ─── Coral & Seaweed decorations ─────────────────────────────────────

function Seaweed({ x = 0, height = 80, color = "rgba(34,197,94,0.6)", delay = 0 }: { x?: number; height?: number; color?: string; delay?: number }) {
  return (
    <g transform={`translate(${x}, 0)`}>
      {/* Main stem with sway animation handled via CSS class */}
      <path
        d={`M0,${height} Q-8,${height * 0.75} 4,${height * 0.55} Q-6,${height * 0.38} 2,${height * 0.2} Q-4,${height * 0.08} 0,0`}
        fill="none"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        style={{
          transformOrigin: `0px ${height}px`,
          animationName: "seaweedSway",
          animationDuration: "3s",
          animationTimingFunction: "ease-in-out",
          animationIterationCount: "infinite",
          animationDelay: `${delay}s`,
        }}
      />
      {/* Leaves */}
      {[0.3, 0.55, 0.75].map((frac, li) => (
        <ellipse
          key={li}
          cx={li % 2 === 0 ? -10 : 8}
          cy={height * (1 - frac)}
          rx="8"
          ry="4"
          fill={color}
          style={{
            transformOrigin: `0px ${height}px`,
            animationName: "seaweedSway",
            animationDuration: "3s",
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
            animationDelay: `${delay + li * 0.1}s`,
          }}
        />
      ))}
    </g>
  );
}

function CoralBranch({ x = 0, color = "rgba(255,100,130,0.7)" }: { x?: number; color?: string }) {
  return (
    <g transform={`translate(${x}, 0)`}>
      {/* Main trunk */}
      <path d="M0,60 L0,30" stroke={color} strokeWidth="5" strokeLinecap="round" />
      {/* Branches */}
      <path d="M0,45 L-16,20" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M0,45 L18,18" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M0,35 L-10,12" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M-16,20 L-24,6" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M18,18 L26,4" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Polyp tips */}
      {[[-16,20],[-24,6],[18,18],[26,4],[0,30],[-10,12]].map(([cx,cy], pi) => (
        <circle key={pi} cx={cx} cy={cy} r="3.5" fill={color} />
      ))}
    </g>
  );
}

function Starfish({ cx = 0, cy = 0, r = 14, color = "rgba(255,160,50,0.75)" }: { cx?: number; cy?: number; r?: number; color?: string }) {
  const arms = 5;
  const outerR = r;
  const innerR = r * 0.42;
  const points = Array.from({ length: arms * 2 }, (_, i) => {
    const angle = (Math.PI * 2 * i) / (arms * 2) - Math.PI / 2;
    const rad = i % 2 === 0 ? outerR : innerR;
    return `${cx + rad * Math.cos(angle)},${cy + rad * Math.sin(angle)}`;
  }).join(" ");
  return <polygon points={points} fill={color} stroke="rgba(255,255,255,0.2)" strokeWidth="1" />;
}

function SeabedDecorations({ variant = "a" }: { variant?: "a" | "b" | "c" }) {
  if (variant === "a") {
    return (
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none overflow-hidden">
        <svg viewBox="0 0 1440 128" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
          {/* Sandy seafloor base */}
          <path d="M0,100 Q360,85 720,95 Q1080,105 1440,90 L1440,128 L0,128 Z" fill="rgba(20,40,80,0.5)" />
          {/* Seaweed clusters */}
          <Seaweed x={60} height={70} color="rgba(34,197,94,0.65)" delay={0} />
          <Seaweed x={75} height={55} color="rgba(16,185,129,0.55)" delay={0.5} />
          <Seaweed x={88} height={80} color="rgba(52,211,153,0.6)" delay={1.0} />
          <Seaweed x={300} height={65} color="rgba(34,197,94,0.5)" delay={0.3} />
          <Seaweed x={315} height={85} color="rgba(16,185,129,0.6)" delay={0.8} />
          <Seaweed x={700} height={72} color="rgba(52,211,153,0.55)" delay={0.2} />
          <Seaweed x={715} height={58} color="rgba(34,197,94,0.6)" delay={0.7} />
          <Seaweed x={1100} height={80} color="rgba(16,185,129,0.6)" delay={0.4} />
          <Seaweed x={1115} height={60} color="rgba(34,197,94,0.5)" delay={0.9} />
          <Seaweed x={1350} height={68} color="rgba(52,211,153,0.6)" delay={0.1} />
          {/* Coral */}
          <CoralBranch x={160} color="rgba(255,100,130,0.7)" />
          <CoralBranch x={500} color="rgba(255,140,60,0.65)" />
          <CoralBranch x={900} color="rgba(220,80,180,0.65)" />
          <CoralBranch x={1250} color="rgba(255,100,130,0.6)" />
          {/* Starfish */}
          <Starfish cx={240} cy={110} r={12} color="rgba(255,160,50,0.75)" />
          <Starfish cx={620} cy={118} r={9} color="rgba(255,120,80,0.7)" />
          <Starfish cx={1020} cy={112} r={14} color="rgba(255,170,40,0.7)" />
          <Starfish cx={1380} cy={116} r={10} color="rgba(255,140,60,0.65)" />
        </svg>
      </div>
    );
  }
  if (variant === "b") {
    return (
      <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none overflow-hidden">
        <svg viewBox="0 0 1440 112" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
          <path d="M0,88 Q360,72 720,82 Q1080,92 1440,76 L1440,112 L0,112 Z" fill="rgba(15,30,65,0.45)" />
          <Seaweed x={120} height={60} color="rgba(34,197,94,0.6)" delay={0.2} />
          <Seaweed x={400} height={75} color="rgba(16,185,129,0.55)" delay={0.6} />
          <Seaweed x={415} height={50} color="rgba(52,211,153,0.5)" delay={1.1} />
          <Seaweed x={820} height={68} color="rgba(34,197,94,0.6)" delay={0.4} />
          <Seaweed x={1200} height={72} color="rgba(16,185,129,0.6)" delay={0.8} />
          <CoralBranch x={220} color="rgba(255,120,80,0.7)" />
          <CoralBranch x={650} color="rgba(255,100,130,0.65)" />
          <CoralBranch x={1060} color="rgba(255,150,40,0.7)" />
          <Starfish cx={340} cy={98} r={11} color="rgba(255,160,50,0.7)" />
          <Starfish cx={780} cy={104} r={8} color="rgba(255,110,90,0.65)" />
          <Starfish cx={1310} cy={100} r={12} color="rgba(255,170,40,0.7)" />
        </svg>
      </div>
    );
  }
  // variant c
  return (
    <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none overflow-hidden">
      <svg viewBox="0 0 1440 96" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
        <path d="M0,76 Q360,60 720,72 Q1080,84 1440,68 L1440,96 L0,96 Z" fill="rgba(10,25,55,0.4)" />
        <Seaweed x={50} height={55} color="rgba(52,211,153,0.6)" delay={0} />
        <Seaweed x={480} height={65} color="rgba(34,197,94,0.55)" delay={0.5} />
        <Seaweed x={900} height={60} color="rgba(16,185,129,0.6)" delay={0.3} />
        <Seaweed x={1300} height={70} color="rgba(52,211,153,0.5)" delay={0.7} />
        <CoralBranch x={180} color="rgba(220,80,180,0.65)" />
        <CoralBranch x={720} color="rgba(255,100,130,0.65)" />
        <CoralBranch x={1150} color="rgba(255,140,60,0.6)" />
        <Starfish cx={290} cy={84} r={10} color="rgba(255,160,50,0.7)" />
        <Starfish cx={850} cy={88} r={13} color="rgba(255,130,70,0.7)" />
      </svg>
    </div>
  );
}

// ─── Bubble Cursor Follower ──────────────────────────────────────────
function BubbleCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -200, y: -200 });
  const bubblesRef = useRef<Array<{
    x: number; y: number; vx: number; vy: number;
    r: number; alpha: number; decay: number;
  }>>([]);
  const frameRef = useRef<number>(0);
  const cursorRef = useRef({ x: -200, y: -200, targetX: -200, targetY: -200 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      // Spawn 1-2 tiny trail bubbles on movement
      for (let k = 0; k < 2; k++) {
        bubblesRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 14,
          y: e.clientY + (Math.random() - 0.5) * 14,
          vx: (Math.random() - 0.5) * 0.6,
          vy: -(0.4 + Math.random() * 0.8),
          r: 2 + Math.random() * 4,
          alpha: 0.55 + Math.random() * 0.3,
          decay: 0.012 + Math.random() * 0.01,
        });
      }
      // Cap trail length
      if (bubblesRef.current.length > 80) bubblesRef.current.splice(0, 20);
    };
    window.addEventListener("mousemove", onMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth-lerp main cursor circle
      const cur = cursorRef.current;
      cur.x += (mouseRef.current.x - cur.x) * 0.18;
      cur.y += (mouseRef.current.y - cur.y) * 0.18;

      // Main cursor: small circle with subtle glow
      ctx.save();
      ctx.globalAlpha = 0.5;
      const grad = ctx.createRadialGradient(cur.x, cur.y, 0, cur.x, cur.y, 14);
      grad.addColorStop(0, "rgba(255,255,255,0.55)");
      grad.addColorStop(0.4, "rgba(34,211,238,0.3)");
      grad.addColorStop(1, "rgba(34,211,238,0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cur.x, cur.y, 14, 0, Math.PI * 2);
      ctx.fill();
      // Crisp ring
      ctx.globalAlpha = 0.45;
      ctx.strokeStyle = "rgba(255,255,255,0.7)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(cur.x, cur.y, 9, 0, Math.PI * 2);
      ctx.stroke();
      // Shine highlight inside
      ctx.globalAlpha = 0.65;
      ctx.fillStyle = "rgba(255,255,255,0.8)";
      ctx.beginPath();
      ctx.arc(cur.x - 3, cur.y - 3, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Trail bubbles
      bubblesRef.current = bubblesRef.current.filter((b) => b.alpha > 0.02);
      for (const b of bubblesRef.current) {
        b.x += b.vx;
        b.y += b.vy;
        b.alpha -= b.decay;
        ctx.save();
        ctx.globalAlpha = b.alpha;
        // Bubble ring
        ctx.strokeStyle = "rgba(255,255,255,0.9)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.stroke();
        // Shine
        ctx.fillStyle = "rgba(255,255,255,0.7)";
        ctx.beginPath();
        ctx.arc(b.x - b.r * 0.28, b.y - b.r * 0.28, b.r * 0.25, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      frameRef.current = requestAnimationFrame(draw);
    };
    frameRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-20"
      style={{ mixBlendMode: "screen" }}
    />
  );
}

// ─── Caustic Light Effect (Hero) ────────────────────────────────────
function CausticOverlay() {
  // Animated light caustic patterns: multiple blurred, shifting light blobs
  const caustics = [
    { cx: "20%", cy: "15%", r: "18%", dur: "7s", delay: "0s", opacity: 0.07 },
    { cx: "55%", cy: "10%", r: "22%", dur: "9s", delay: "1.5s", opacity: 0.06 },
    { cx: "75%", cy: "22%", r: "16%", dur: "11s", delay: "0.7s", opacity: 0.05 },
    { cx: "35%", cy: "30%", r: "14%", dur: "8s", delay: "2.2s", opacity: 0.055 },
    { cx: "80%", cy: "5%",  r: "12%", dur: "6s", delay: "1.0s", opacity: 0.045 },
    { cx: "10%", cy: "35%", r: "10%", dur: "13s", delay: "3s",  opacity: 0.04 },
  ];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
      {caustics.map((c, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: c.cx,
            top: c.cy,
            width: c.r,
            paddingBottom: c.r,
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(ellipse, rgba(255,255,255,${c.opacity * 1.8}) 0%, rgba(34,211,238,${c.opacity}) 30%, transparent 70%)`,
            filter: "blur(8px)",
            animationName: "causticDrift",
            animationDuration: c.dur,
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
            animationDelay: c.delay,
            animationDirection: i % 2 === 0 ? "alternate" : "alternate-reverse",
          }}
        />
      ))}
      {/* Fine caustic mesh lines */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{
          opacity: 0.04,
          animationName: "causticShimmer",
          animationDuration: "5s",
          animationTimingFunction: "ease-in-out",
          animationIterationCount: "infinite",
        }}
      >
        <defs>
          <filter id="causticBlur">
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
        </defs>
        <g filter="url(#causticBlur)">
          {[
            "M0,80 Q200,30 400,90 Q600,150 800,60 Q1000,0 1200,80 Q1300,120 1440,50",
            "M0,130 Q300,60 600,140 Q900,210 1200,100 Q1350,50 1440,110",
            "M100,50 Q350,120 600,40 Q850,-20 1100,70 Q1300,140 1440,80",
          ].map((d, pi) => (
            <path
              key={pi}
              d={d}
              fill="none"
              stroke="rgba(200,240,255,0.9)"
              strokeWidth="2.5"
              style={{ animationDelay: `${pi * 0.6}s` }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}

// ─── Footer Seabed Decoration (Enhanced for footer context) ──────────
function FooterSeabed() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none overflow-hidden">
      <svg viewBox="0 0 1440 160" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
        {/* Sandy base */}
        <path d="M0,120 Q360,100 720,115 Q1080,130 1440,108 L1440,160 L0,160 Z" fill="rgba(12,35,70,0.6)" />
        {/* Dense seaweed — more varied heights, closer spacing */}
        <Seaweed x={30}   height={90}  color="rgba(34,197,94,0.7)"  delay={0}   />
        <Seaweed x={48}   height={68}  color="rgba(16,185,129,0.6)" delay={0.6} />
        <Seaweed x={65}   height={105} color="rgba(52,211,153,0.65)" delay={1.1} />
        <Seaweed x={200}  height={80}  color="rgba(34,197,94,0.6)"  delay={0.3} />
        <Seaweed x={218}  height={60}  color="rgba(16,185,129,0.5)" delay={0.9} />
        <Seaweed x={380}  height={95}  color="rgba(52,211,153,0.65)" delay={0.5} />
        <Seaweed x={395}  height={72}  color="rgba(34,197,94,0.55)" delay={1.2} />
        <Seaweed x={560}  height={85}  color="rgba(16,185,129,0.65)" delay={0.2} />
        <Seaweed x={578}  height={60}  color="rgba(52,211,153,0.6)" delay={0.7} />
        <Seaweed x={750}  height={100} color="rgba(34,197,94,0.7)"  delay={0.4} />
        <Seaweed x={768}  height={75}  color="rgba(16,185,129,0.6)" delay={1.0} />
        <Seaweed x={940}  height={88}  color="rgba(52,211,153,0.65)" delay={0.1} />
        <Seaweed x={958}  height={65}  color="rgba(34,197,94,0.55)" delay={0.8} />
        <Seaweed x={1120} height={92}  color="rgba(16,185,129,0.7)" delay={0.3} />
        <Seaweed x={1138} height={70}  color="rgba(52,211,153,0.6)" delay={0.9} />
        <Seaweed x={1300} height={82}  color="rgba(34,197,94,0.65)" delay={0.5} />
        <Seaweed x={1318} height={58}  color="rgba(16,185,129,0.55)" delay={1.1} />
        <Seaweed x={1400} height={75}  color="rgba(52,211,153,0.6)" delay={0.2} />
        {/* Coral — more + varied colors */}
        <CoralBranch x={120}  color="rgba(255,100,130,0.75)" />
        <CoralBranch x={310}  color="rgba(255,140,60,0.7)"  />
        <CoralBranch x={480}  color="rgba(220,80,180,0.7)"  />
        <CoralBranch x={680}  color="rgba(255,100,130,0.65)" />
        <CoralBranch x={870}  color="rgba(255,180,40,0.7)"  />
        <CoralBranch x={1060} color="rgba(255,100,100,0.68)" />
        <CoralBranch x={1240} color="rgba(180,100,255,0.65)" />
        <CoralBranch x={1380} color="rgba(255,140,60,0.6)"  />
        {/* Starfish */}
        <Starfish cx={170}  cy={140} r={13} color="rgba(255,160,50,0.78)" />
        <Starfish cx={430}  cy={148} r={9}  color="rgba(255,120,80,0.72)" />
        <Starfish cx={630}  cy={143} r={14} color="rgba(255,180,40,0.75)" />
        <Starfish cx={820}  cy={150} r={10} color="rgba(255,140,60,0.7)"  />
        <Starfish cx={1000} cy={145} r={12} color="rgba(255,160,50,0.72)" />
        <Starfish cx={1180} cy={148} r={8}  color="rgba(255,120,80,0.68)" />
        <Starfish cx={1350} cy={142} r={11} color="rgba(255,170,40,0.7)"  />
      </svg>
    </div>
  );
}

// ─── Main Page Component ────────────────────────────────────────────
export default function BluAmamiDivingPage() {
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [depthProgress, setDepthProgress] = useState(0);
  const coursesSectionRef = useRef<HTMLElement>(null);
  const spotsScrollRef = useRef<HTMLDivElement>(null);
  const [activeSpot, setActiveSpot] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const el = coursesSectionRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const total = el.offsetHeight - window.innerHeight;
        const scrolled = -rect.top;
        const p = Math.max(0, Math.min(1, scrolled / Math.max(total, 1)));
        setDepthProgress(p);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const SPOT_COUNT = 3;
  useEffect(() => {
    const container = spotsScrollRef.current;
    if (!container) return;
    const handleSpotsScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll <= 0) {
        setActiveSpot(0);
        return;
      }
      const ratio = scrollLeft / maxScroll;
      const index = Math.round(ratio * (SPOT_COUNT - 1));
      setActiveSpot(Math.max(0, Math.min(SPOT_COUNT - 1, index)));
    };
    container.addEventListener("scroll", handleSpotsScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleSpotsScroll);
  // eslint-disable-next-line react-hooks/exhaustive-deps -- mount-only: refs are stable
  }, []);

  // Ordered shallow → deep for depth meter visualization
  const courses = [
    {
      title: "シュノーケリング",
      price: "5,000",
      description: "お子様からご年配の方まで。透明度抜群の奄美の海を水面から楽しめます。カラフルな熱帯魚に会いに行こう。",
      duration: "約2時間",
      highlight: "家族におすすめ",
      gradient: "from-emerald-400 to-cyan-500",
      accentColor: "rgba(52,211,153,0.7)",
      depthLabel: "0m",
      depthPercent: 2,
      image: "https://images.unsplash.com/photo-1560275619-4662e36fa65c?auto=format&fit=crop&w=800&q=80",
      imageAlt: "シュノーケリングを楽しむ様子",
    },
    {
      title: "体験ダイビング",
      price: "12,000",
      description: "初めての方でも安心。インストラクターが完全サポートで、奄美の海の世界をご案内します。ライセンス不要。",
      duration: "約3時間",
      highlight: "初心者おすすめ",
      gradient: "from-cyan-400 to-blue-500",
      accentColor: "rgba(34,211,238,0.7)",
      depthLabel: "5m",
      depthPercent: 22,
      image: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=800&q=80",
      imageAlt: "水中を泳ぐダイバー",
    },
    {
      title: "ライセンス講習",
      price: "55,000",
      description: "PADIオープンウォーター取得コース。学科・プール・海洋実習の3日間で、ダイバーの第一歩を。",
      duration: "3日間",
      highlight: "PADI認定",
      gradient: "from-sky-400 to-blue-600",
      accentColor: "rgba(56,189,248,0.7)",
      depthLabel: "12m",
      depthPercent: 52,
      image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=800&q=80",
      imageAlt: "美しい青い海",
    },
    {
      title: "ファンダイビング",
      price: "15,000",
      unit: "/ 1ダイブ",
      description: "ライセンス保持者向け。奄美の豊かなサンゴ礁と多様な海洋生物を堪能できるガイド付きダイブ。",
      duration: "約2時間",
      highlight: "ライセンス保持者向け",
      gradient: "from-blue-500 to-indigo-600",
      accentColor: "rgba(99,102,241,0.7)",
      depthLabel: "20m",
      depthPercent: 82,
      image: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&w=800&q=80",
      imageAlt: "美しいサンゴ礁の海中風景",
    },
  ];

  const spots = [
    {
      name: "大浜海浜公園エリア",
      description: "奄美市街から最も近いダイビングスポット。穏やかな海況でビギナーにも最適。ウミガメとの遭遇率が非常に高く、色とりどりのサンゴ礁が広がります。",
      features: ["ウミガメ遭遇率70%以上", "初心者OK", "ビーチエントリー"],
      color: "bg-cyan-500/20 border-cyan-400/30",
      depth: "5〜18m",
      image: "https://images.unsplash.com/photo-1591025207163-942350e47db2?auto=format&fit=crop&w=800&q=80",
      imageAlt: "海中を泳ぐウミガメ",
    },
    {
      name: "倉崎ビーチ",
      description: "真っ白な砂地にサンゴが点在する、奄美屈指の美しいポイント。透明度は20〜30mに達することも。ハナゴイやデバスズメダイの群れが圧巻。",
      features: ["透明度20〜30m", "白砂のパラダイス", "フォトジェニック"],
      color: "bg-blue-500/20 border-blue-400/30",
      depth: "8〜25m",
      image: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&w=800&q=80",
      imageAlt: "透明度の高いサンゴ礁の海",
    },
    {
      name: "手広海岸",
      description: "太平洋側に面したダイナミックなポイント。大物との遭遇チャンスがあり、マダラトビエイやナポレオンフィッシュが見られることも。上級者に人気。",
      features: ["大物遭遇チャンス", "ダイナミック地形", "上級者向け"],
      color: "bg-indigo-500/20 border-indigo-400/30",
      depth: "10〜35m",
      image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=800&q=80",
      imageAlt: "深く青い海の風景",
    },
  ];

  const staff = [
    {
      name: "山田 海斗",
      role: "代表 / チーフインストラクター",
      description: "奄美大島生まれ、ダイビング歴20年。2,000本以上の潜水経験を持ち、奄美の海を知り尽くしたベテランガイド。初めての方にも丁寧に、一生忘れられない海の思い出を作ります。",
      certifications: ["PADI IDCスタッフインストラクター", "潜水士", "EFR インストラクター", "小型船舶1級"],
      image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=400&q=80",
      imageAlt: "インストラクター 山田 海斗",
    },
    {
      name: "佐藤 美波",
      role: "インストラクター / 水中カメラマン",
      description: "元水族館スタッフ。海洋生物の知識が豊富で、生き物の名前や生態を楽しく解説。水中写真の撮影サービスも担当し、最高の瞬間を写真に残します。",
      certifications: ["PADI オープンウォーターインストラクター", "潜水士", "水中写真家認定", "救急救命士"],
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
      imageAlt: "インストラクター 佐藤 美波",
    },
  ];

  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
      alt: "透き通った海の中を泳ぐダイバー",
      span: "col-span-1 md:col-span-2 row-span-2",
    },
    {
      src: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&w=800&q=80",
      alt: "色鮮やかなサンゴ礁",
      span: "",
    },
    {
      src: "https://images.unsplash.com/photo-1591025207163-942350e47db2?auto=format&fit=crop&w=800&q=80",
      alt: "優雅に泳ぐウミガメ",
      span: "",
    },
    {
      src: "https://images.unsplash.com/photo-1560275619-4662e36fa65c?auto=format&fit=crop&w=800&q=80",
      alt: "シュノーケリングで海を楽しむ",
      span: "",
    },
    {
      src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      alt: "奄美大島の美しいビーチ",
      span: "col-span-1 md:col-span-2",
    },
    {
      src: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=800&q=80",
      alt: "どこまでも続く青い海",
      span: "",
    },
  ];

  return (
    <>
      {/* CSS Animations */}
      <style jsx global>{`
        /* ── Existing keyframes ── */
        @keyframes wave-drift {
          0% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(-25px) translateY(-5px); }
          100% { transform: translateX(0) translateY(0); }
        }
        @keyframes wave-drift-reverse {
          0% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(25px) translateY(-3px); }
          100% { transform: translateX(0) translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(34, 211, 238, 0.3); }
          50% { box-shadow: 0 0 40px rgba(34, 211, 238, 0.6); }
        }
        @keyframes ken-burns {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }

        /* ── NEW: Bubble rise (straight) ── */
        @keyframes bubbleRise {
          0%   { transform: translateY(100vh) scale(0.6); opacity: 0; }
          10%  { opacity: 0.75; }
          90%  { opacity: 0.45; }
          100% { transform: translateY(-12vh) scale(1.1); opacity: 0; }
        }
        /* ── NEW: Bubble rise wobble left ── */
        @keyframes bubbleRiseWobbleLeft {
          0%   { transform: translateY(100vh) translateX(0) scale(0.6); opacity: 0; }
          10%  { opacity: 0.75; }
          25%  { transform: translateY(75vh) translateX(-18px) scale(0.75); }
          50%  { transform: translateY(50vh) translateX(8px) scale(0.9); }
          75%  { transform: translateY(25vh) translateX(-14px) scale(1.0); }
          90%  { opacity: 0.45; }
          100% { transform: translateY(-12vh) translateX(0) scale(1.1); opacity: 0; }
        }
        /* ── NEW: Bubble rise wobble right ── */
        @keyframes bubbleRiseWobbleRight {
          0%   { transform: translateY(100vh) translateX(0) scale(0.6); opacity: 0; }
          10%  { opacity: 0.75; }
          25%  { transform: translateY(75vh) translateX(18px) scale(0.75); }
          50%  { transform: translateY(50vh) translateX(-8px) scale(0.9); }
          75%  { transform: translateY(25vh) translateX(14px) scale(1.0); }
          90%  { opacity: 0.45; }
          100% { transform: translateY(-12vh) translateX(0) scale(1.1); opacity: 0; }
        }

        /* ── NEW: Animated wave divider ── */
        @keyframes waveMove {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* ── NEW: Sea foam pop ── */
        @keyframes foamPop {
          0%   { transform: scale(0); opacity: 0; }
          20%  { transform: scale(1.3); opacity: 0.8; }
          50%  { transform: scale(1); opacity: 0.6; }
          80%  { transform: scale(0.8); opacity: 0.3; }
          100% { transform: scale(0); opacity: 0; }
        }

        /* ── NEW: Seaweed sway ── */
        @keyframes seaweedSway {
          0%, 100% { transform: rotate(-6deg); }
          50%       { transform: rotate(6deg); }
        }

        /* ── NEW: Pulse dot ring ── */
        @keyframes pulseRing {
          0%   { transform: scale(1); opacity: 1; }
          50%  { transform: scale(1.8); opacity: 0; }
          100% { transform: scale(1); opacity: 0; }
        }

        /* ── NEW: Marquee scroll ── */
        @keyframes marqueeScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* ── NEW: Depth connector pulse ── */
        @keyframes connectorPulse {
          0%, 100% { opacity: 0.4; }
          50%  { opacity: 1; }
        }

        /* ── NEW: Fish swim (with body waggle) ── */
        @keyframes fishSwim {
          0%   { transform: translateX(0) translateY(0) rotate(0deg); }
          20%  { transform: translateX(6px) translateY(-5px) rotate(-2deg); }
          40%  { transform: translateX(12px) translateY(0px) rotate(2deg); }
          60%  { transform: translateX(10px) translateY(5px) rotate(-1.5deg); }
          80%  { transform: translateX(4px) translateY(-3px) rotate(1.5deg); }
          100% { transform: translateX(0) translateY(0) rotate(0deg); }
        }

        /* ── NEW: Depth spot scroll strip ── */
        .spots-scroll::-webkit-scrollbar { display: none; }
        .spots-scroll { -ms-overflow-style: none; scrollbar-width: none; }

        /* ── NEW: Caustic drift ── */
        @keyframes causticDrift {
          0%   { transform: translate(-50%, -50%) scale(1) rotate(0deg); opacity: 0.6; }
          33%  { transform: translate(-50%, -50%) scale(1.18) rotate(8deg); opacity: 1; }
          66%  { transform: translate(-50%, -50%) scale(0.88) rotate(-5deg); opacity: 0.8; }
          100% { transform: translate(-50%, -50%) scale(1.06) rotate(3deg); opacity: 0.7; }
        }
        /* ── NEW: Caustic shimmer (SVG lines) ── */
        @keyframes causticShimmer {
          0%, 100% { opacity: 0.03; }
          50%       { opacity: 0.08; }
        }
        /* ── NEW: Course card ocean glow ── */
        @keyframes oceanGlowPulse {
          0%, 100% { box-shadow: 0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06), 0 0 0 0 rgba(34,211,238,0); }
          50%       { box-shadow: 0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06), 0 0 32px 4px rgba(34,211,238,0.18); }
        }

        /* ── Utility classes ── */
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-ken-burns {
          animation: ken-burns 20s ease-in-out infinite alternate;
        }
        .animate-fish-swim {
          animation: fishSwim 5s ease-in-out infinite;
        }
        /* ── Course card hover glass glow ── */
        .course-card-inner {
          transition: box-shadow 0.45s ease, border-color 0.45s ease, background 0.45s ease;
        }
        .course-card-wrap:hover .course-card-inner {
          background: rgba(14, 42, 80, 0.55) !important;
          border-color: rgba(34,211,238,0.32) !important;
          box-shadow: 0 8px 40px rgba(0,0,0,0.35),
                      inset 0 1px 0 rgba(255,255,255,0.09),
                      0 0 28px 2px rgba(34,211,238,0.18),
                      0 0 60px 8px rgba(56,189,248,0.08) !important;
        }
        html { scroll-behavior: smooth; }
        input:focus, textarea:focus, select:focus {
          border-color: #22D3EE !important;
          box-shadow: 0 0 0 3px rgba(34,211,238,0.18) !important;
          outline: none !important;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        button[type="submit"] {
          transition: transform 0.2s ease, box-shadow 0.2s ease !important;
        }
        button[type="submit"]:hover { transform: scale(1.03) !important; }
        button[type="submit"]:active { transform: scale(0.98) !important; }
      `}</style>

      <BubbleCursor />
      <div className="min-h-screen bg-[#0a1628] text-white overflow-x-hidden">
        {/* ─── Back to Gallery ─── */}
        <a
          href="/web#gallery"
          className="hidden md:flex fixed top-4 left-4 z-50 items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300 text-sm"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          ギャラリーに戻る
        </a>

        {/* ─── Navigation ─── */}
        <nav className={`fixed top-0 w-full z-40 transition-all duration-500 ${scrollY > 100 ? "bg-[#0C4A6E]/95 backdrop-blur-md shadow-lg shadow-cyan-900/20" : "bg-transparent"}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <a href="#hero" className="flex items-center gap-2">
                <WaveIcon className="w-8 h-8 text-cyan-400" />
                <span className="text-xl font-bold tracking-wider">BLUE AMAMI</span>
              </a>
              <div className="hidden md:flex items-center gap-8 text-sm">
                <a href="#courses" className="hover:text-cyan-400 transition-colors">コース</a>
                <a href="#spots" className="hover:text-cyan-400 transition-colors">ダイブスポット</a>
                <a href="#gallery" className="hover:text-cyan-400 transition-colors">ギャラリー</a>
                <a href="#staff" className="hover:text-cyan-400 transition-colors">スタッフ</a>
                <a href="#access" className="hover:text-cyan-400 transition-colors">アクセス</a>
                <a href="#reserve" className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 rounded-full font-bold transition-colors text-sm">予約する</a>
              </div>
              <button
                className="md:hidden text-white p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="メニューを開く"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-[#0C4A6E]/95 backdrop-blur-md border-t border-white/10">
              <div className="px-4 py-4 space-y-3">
                {[
                  { href: "#courses", label: "コース" },
                  { href: "#spots", label: "ダイブスポット" },
                  { href: "#gallery", label: "ギャラリー" },
                  { href: "#staff", label: "スタッフ" },
                  { href: "#access", label: "アクセス" },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block py-2 text-white/80 hover:text-cyan-400 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <a href="#reserve" className="block mt-2 px-5 py-3 bg-cyan-500 rounded-full font-bold text-center" onClick={() => setIsMenuOpen(false)}>
                  予約する
                </a>
              </div>
            </div>
          )}
        </nav>

        {/* ─── Hero Section ─── */}
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Full-screen background photo */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80"
              alt="奄美大島の美しい海中風景"
              width={1200}
              height={800}
              priority
              className="w-full h-full object-cover animate-ken-burns"
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0C4A6E]/70 via-[#0C4A6E]/50 to-[#0a1628]/90" />
          </div>

          {/* Caustic light patterns — sun through water surface */}
          <CausticOverlay />

          {/* Light rays */}
          <div className="absolute inset-0 opacity-15">
            <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-white/40 to-transparent rotate-12" />
            <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-white/30 to-transparent -rotate-6" />
            <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-white/20 to-transparent rotate-3" />
          </div>

          <Bubbles />

          {/* Hero content */}
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <div className="animate-float mb-8">
              <MaskIcon className="w-20 h-20 sm:w-24 sm:h-24 mx-auto text-cyan-300/80" />
            </div>
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-widest mb-4 drop-shadow-2xl">
              BLUE AMAMI
            </h1>
            <div className="w-16 h-px bg-white/30 mx-auto mb-6" />
            <p className="text-lg sm:text-xl md:text-2xl text-cyan-100 font-light tracking-wide mb-2">
              奄美大島のダイビングショップ
            </p>
            <p className="text-sm sm:text-base text-cyan-200/60 tracking-widest mb-12">
              DIVING SHOP in AMAMI OSHIMA
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#courses"
                className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-cyan-500/30 animate-pulse-glow"
              >
                コースを見る
              </a>
              <a
                href="#reserve"
                className="px-8 py-4 border-2 border-white/40 hover:border-white rounded-full font-bold text-lg transition-all duration-300 hover:bg-white/10"
              >
                今すぐ予約
              </a>
            </div>
          </div>

          {/* Wave SVG at bottom */}
          <div className="absolute bottom-0 left-0 w-full">
            <svg
              className="w-[200%] md:w-full"
              viewBox="0 0 1440 200"
              fill="none"
              preserveAspectRatio="none"
              style={{ animation: "wave-drift 8s ease-in-out infinite" }}
            >
              <path
                d="M0,120 C240,180 480,60 720,120 C960,180 1200,60 1440,120 L1440,200 L0,200 Z"
                fill="#0a1628"
                fillOpacity="0.6"
              />
            </svg>
            <svg
              className="w-[200%] md:w-full absolute bottom-0 left-0"
              viewBox="0 0 1440 200"
              fill="none"
              preserveAspectRatio="none"
              style={{ animation: "wave-drift-reverse 6s ease-in-out infinite" }}
            >
              <path
                d="M0,140 C360,80 720,180 1080,100 C1260,60 1380,120 1440,140 L1440,200 L0,200 Z"
                fill="#0a1628"
                fillOpacity="0.8"
              />
            </svg>
            <svg
              className="w-[200%] md:w-full absolute bottom-0 left-0"
              viewBox="0 0 1440 200"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M0,160 C480,120 960,180 1440,150 L1440,200 L0,200 Z"
                fill="#0a1628"
              />
            </svg>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 animate-bounce z-10">
            <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 14l-7 7m0 0l-7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </section>

        {/* ─── Wave Divider: Hero → Courses ─── */}
        <WaveDivider />

        {/* ─── Courses Section: Depth Meter Visualization ─── */}
        <section
          id="courses"
          ref={coursesSectionRef}
          className="relative overflow-hidden"
          style={{
            background: "linear-gradient(to bottom, #0d3a52 0%, #0a2540 30%, #071a35 65%, #050f28 100%)",
            paddingTop: "80px",
            paddingBottom: "80px",
          }}
        >
          {/* Ambient light rays at top (sunlight filtering down) */}
          <div className="absolute top-0 inset-x-0 h-64 pointer-events-none overflow-hidden">
            <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-cyan-300/20 to-transparent rotate-6" />
            <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-cyan-200/15 to-transparent -rotate-3" />
            <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-cyan-300/10 to-transparent rotate-9" />
            <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-blue-300/10 to-transparent -rotate-6" />
          </div>

          {/* Colorful fish decorations at various depths */}
          <div className="absolute left-[5%] top-[8%] opacity-80 pointer-events-none animate-fish-swim" style={{ animationDelay: "0s" }}>
            <FishTropical facing="right" className="w-14 h-9" />
          </div>
          <div className="absolute right-[4%] top-[22%] opacity-70 pointer-events-none animate-fish-swim" style={{ animationDelay: "1.5s" }}>
            <FishAngel facing="left" className="w-10 h-14" />
          </div>
          <div className="absolute left-[8%] top-[42%] opacity-75 pointer-events-none animate-fish-swim" style={{ animationDelay: "3s" }}>
            <DepthFish facing="right" className="w-12 h-8" />
          </div>
          <div className="absolute right-[7%] top-[58%] opacity-65 pointer-events-none animate-fish-swim" style={{ animationDelay: "0.8s" }}>
            <FishTropical facing="left" className="w-12 h-8" />
          </div>
          <div className="absolute left-[6%] top-[74%] opacity-60 pointer-events-none animate-fish-swim" style={{ animationDelay: "2.2s" }}>
            <SeaTurtle facing="right" className="w-16 h-11" />
          </div>
          <div className="absolute right-[5%] top-[88%] opacity-50 pointer-events-none animate-fish-swim" style={{ animationDelay: "1.0s" }}>
            <DepthFish facing="left" className="w-10 h-7" />
          </div>

          {/* Scattered bubbles at various depths */}
          {[6, 15, 25, 38, 52, 64, 75, 88].map((top, idx) => (
            <div
              key={idx}
              className="absolute rounded-full border border-white/15 bg-white/5 pointer-events-none"
              style={{
                width: `${5 + (idx % 3) * 4}px`,
                height: `${5 + (idx % 3) * 4}px`,
                left: `${(idx * 11 + 4) % 90}%`,
                top: `${top}%`,
                opacity: 0.3 - idx * 0.02,
              }}
            />
          ))}

          <div className="max-w-6xl mx-auto px-4 relative z-10">
            {/* Section header */}
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <WaveIcon className="w-8 h-8 text-cyan-400" />
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">コース一覧</h2>
                <WaveIcon className="w-8 h-8 text-cyan-400" />
              </div>
              <p className="text-cyan-300/60 tracking-widest text-sm mt-2">COURSES</p>
              <p className="text-white/60 mt-4 max-w-2xl mx-auto">
                初めての方からライセンス保持者まで、あなたにぴったりのコースが見つかります。すべてのコースに器材レンタル・保険料が含まれています。
              </p>
            </div>

            {/* Depth meter layout */}
            <div className="relative flex gap-0 md:gap-4">

              {/* ─── Left: Depth Ruler with glow point ─── */}
              {(() => {
                const depthLabels = [
                  { label: "0m", pct: 2 },
                  { label: "5m", pct: 22 },
                  { label: "10m", pct: 42 },
                  { label: "15m", pct: 62 },
                  { label: "20m", pct: 82 },
                  { label: "30m", pct: 96 },
                ];
                const currentPct = depthProgress * 100;
                return (
                  <div className="hidden md:flex flex-col items-center flex-shrink-0 w-16 relative pt-2 pb-2">
                    {/* Track — dim background */}
                    <div
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-px"
                      style={{ height: "100%", background: "rgba(255,255,255,0.08)" }}
                    />
                    {/* Filled portion */}
                    <div
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-px"
                      style={{
                        height: `${Math.min(100, currentPct)}%`,
                        background: "linear-gradient(to bottom, rgba(34,211,238,0.4), rgba(99,102,241,0.25))",
                        transition: "height 0.2s ease-out",
                      }}
                    />
                    {/* Glow point */}
                    <div
                      className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full z-10"
                      style={{
                        top: `calc(${Math.min(98, currentPct)}% - 4px)`,
                        background: "rgba(34,211,238,0.9)",
                        boxShadow: "0 0 8px rgba(34,211,238,0.8), 0 0 20px rgba(34,211,238,0.4)",
                        transition: "top 0.2s ease-out",
                      }}
                    />
                    {/* Micro bubbles rising from glow point */}
                    {[0, 1, 2].map((bi) => {
                      const bTop = Math.max(0, currentPct - (bi + 1) * 3);
                      return (
                        <div
                          key={bi}
                          className="absolute left-1/2 rounded-full"
                          style={{
                            width: 3 - bi * 0.5,
                            height: 3 - bi * 0.5,
                            top: `${bTop}%`,
                            transform: `translateX(${-1 + bi * 2}px)`,
                            background: "rgba(34,211,238,0.3)",
                            opacity: 0.5 - bi * 0.15,
                            transition: "top 0.3s ease-out",
                          }}
                        />
                      );
                    })}
                    {/* Depth labels — active one glows */}
                    {depthLabels.map(({ label, pct }) => {
                      const isActive = Math.abs(currentPct - pct) < 12;
                      return (
                        <div
                          key={label}
                          className="absolute flex items-center gap-1.5"
                          style={{ top: `${pct}%`, left: 0, right: 0, transition: "opacity 0.3s ease" }}
                        >
                          <span
                            className="ml-auto text-xs font-mono tracking-tight leading-none"
                            style={{
                              color: isActive ? "rgba(34,211,238,0.9)" : "rgba(255,255,255,0.25)",
                              textShadow: isActive ? "0 0 8px rgba(34,211,238,0.5)" : "none",
                              transition: "color 0.3s ease, text-shadow 0.3s ease",
                            }}
                          >
                            {label}
                          </span>
                          <div
                            className="flex-shrink-0"
                            style={{
                              width: isActive ? 8 : 4,
                              height: 1,
                              background: isActive ? "rgba(34,211,238,0.6)" : "rgba(255,255,255,0.2)",
                              transition: "all 0.3s ease",
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                );
              })()}

              {/* ─── Right: Course Cards ─── */}
              <div className="flex-1 space-y-0">
                {courses.map((course, i) => (
                  <div
                    key={i}
                    className="relative"
                    style={{
                      marginBottom: i < courses.length - 1 ? "clamp(48px, 8vw, 80px)" : "0",
                    }}
                  >
                    {/* Connector: dotted line from ruler to card (desktop only) */}
                    <div
                      className="hidden md:block absolute left-0 top-8 pointer-events-none"
                      style={{
                        width: "24px",
                        borderTop: `2px dashed ${course.accentColor}`,
                        opacity: 0.7,
                        animationName: "connectorPulse",
                        animationDuration: "2s",
                        animationTimingFunction: "ease-in-out",
                        animationIterationCount: "infinite",
                        animationDelay: `${i * 0.4}s`,
                      }}
                    />

                    {/* Depth badge on the ruler line (desktop only) */}
                    <div
                      className="hidden md:flex absolute -left-[5.5rem] top-6 items-center justify-center w-10 h-6 rounded-full text-[10px] font-mono font-bold border z-10"
                      style={{
                        background: "rgba(10,22,40,0.9)",
                        borderColor: course.accentColor,
                        color: course.accentColor,
                        boxShadow: `0 0 6px ${course.accentColor}`,
                      }}
                    >
                      {course.depthLabel}
                    </div>

                    {/* The glass course card */}
                    <div className="group course-card-wrap relative rounded-2xl overflow-hidden cursor-default">
                      <div
                        className="course-card-inner rounded-2xl overflow-hidden border"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          backdropFilter: "blur(14px)",
                          WebkitBackdropFilter: "blur(14px)",
                          borderColor: "rgba(255,255,255,0.1)",
                          boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
                        }}
                      >
                        <div className="flex flex-col sm:flex-row">
                          {/* Photo */}
                          <div className="relative sm:w-56 md:w-64 h-44 sm:h-auto flex-shrink-0 overflow-hidden">
                            <Image
                              src={course.image}
                              alt={course.imageAlt}
                              width={800}
                              height={600}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a1628]/30 sm:bg-gradient-to-r" />
                            {/* Depth label visible on mobile */}
                            <div
                              className="md:hidden absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold border"
                              style={{
                                background: "rgba(10,22,40,0.85)",
                                borderColor: course.accentColor,
                                color: course.accentColor,
                              }}
                            >
                              {course.depthLabel}
                            </div>
                            {/* Highlight badge */}
                            <span
                              className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg"
                              style={{
                                background: `linear-gradient(135deg, ${course.accentColor}, rgba(99,102,241,0.6))`,
                              }}
                            >
                              {course.highlight}
                            </span>
                          </div>
                          {/* Info */}
                          <div className="flex-1 p-5 sm:p-6 md:p-8 flex flex-col justify-between">
                            <div>
                              <h3 className="text-xl sm:text-2xl font-bold mb-2 tracking-wide">{course.title}</h3>
                              <div className="flex items-baseline gap-1 mb-3">
                                <span className="text-sm text-white/50">¥</span>
                                <span className="text-3xl sm:text-4xl font-black" style={{ color: course.accentColor }}>
                                  {course.price}
                                </span>
                                <span className="text-sm text-white/50">{course.unit || "〜 / 人"}</span>
                              </div>
                              <p className="text-white/60 text-sm leading-relaxed">{course.description}</p>
                            </div>
                            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/10">
                              <div className="flex items-center gap-1.5 text-white/45 text-xs">
                                <ClockIcon className="w-3.5 h-3.5" />
                                <span>所要時間: {course.duration}</span>
                              </div>
                              {/* Glowing accent line */}
                              <div
                                className="flex-1 h-px opacity-30"
                                style={{ background: `linear-gradient(to right, ${course.accentColor}, transparent)` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-center text-white/35 text-xs mt-12 relative z-10">
              * 全コース税込み価格 / 器材レンタル・保険料込み / 水中写真データプレゼント
            </p>
            <div className="h-16" />
          </div>
          <SeabedDecorations variant="a" />
        </section>

        {/* ─── Marquee Strip ─── */}
        <MarqueeStrip />

        {/* ─── Wave Divider: Courses → Spots ─── */}
        <WaveDivider flip />

        {/* ─── Dive Spots Section: Horizontal Panoramic Strip ─── */}
        <section id="spots" className="py-20 sm:py-28 relative bg-gradient-to-b from-transparent via-[#0C4A6E]/20 to-transparent overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 mb-10">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <CompassIcon className="w-8 h-8 text-cyan-400" />
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">ダイブスポット</h2>
                <CompassIcon className="w-8 h-8 text-cyan-400" />
              </div>
              <p className="text-cyan-300/60 tracking-widest text-sm mt-2">DIVE SPOTS</p>
              <p className="text-white/60 mt-4 max-w-2xl mx-auto">
                世界自然遺産・奄美大島の海は、サンゴの種類が日本一。透明度の高い海で、ここでしか出会えない感動が待っています。
              </p>
            </div>
          </div>

          {/* Scroll hint arrow (visible on smaller screens) */}
          <div className="flex justify-end pr-4 sm:pr-8 mb-3 md:hidden">
            <div className="flex items-center gap-1.5 text-white/30 text-xs">
              <span>スクロール</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Horizontal scrollable strip */}
          <div
            ref={spotsScrollRef}
            className="spots-scroll flex gap-4 overflow-x-auto px-4 sm:px-8 pb-4"
            style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
          >
            {/* Left spacer to center content on large screens */}
            <div className="flex-shrink-0 w-[max(0px,calc((100vw-1152px)/2))]" />

            {spots.map((spot, i) => (
              <div
                key={i}
                className="group relative flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer"
                style={{
                  width: "clamp(280px, 70vw, 480px)",
                  height: "clamp(340px, 55vw, 480px)",
                  scrollSnapAlign: "start",
                }}
              >
                {/* Panoramic photo fills entire card */}
                <Image
                  src={spot.image}
                  alt={spot.imageAlt}
                  width={800}
                  height={600}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Dark gradient overlay for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050f28]/92 via-[#0a1628]/40 to-transparent" />

                {/* Top: Depth badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3 py-1.5 rounded-full text-xs font-mono text-cyan-300 bg-[#0a1628]/80 backdrop-blur-sm border border-cyan-400/30">
                    水深 {spot.depth}
                  </span>
                </div>

                {/* Bottom: Text overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-10">
                  {/* Pulse dot + spot name */}
                  <div className="flex items-center gap-2 mb-2">
                    <MapPinIcon className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <PulseDot />
                    <h3 className="text-lg sm:text-xl font-bold leading-tight">{spot.name}</h3>
                  </div>

                  {/* Description */}
                  <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-3">
                    {spot.description}
                  </p>

                  {/* Feature tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {spot.features.map((feature, j) => (
                      <span
                        key={j}
                        className="px-2.5 py-1 rounded-full text-xs backdrop-blur-sm border text-cyan-300"
                        style={{ background: "rgba(10,22,40,0.6)", borderColor: "rgba(34,211,238,0.2)" }}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover glow border */}
                <div
                  className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-cyan-400/30 transition-all duration-500 pointer-events-none"
                  style={{ boxShadow: "inset 0 0 0 1px rgba(34,211,238,0)" }}
                />
              </div>
            ))}

            {/* Right spacer */}
            <div className="flex-shrink-0 w-[max(0px,calc((100vw-1152px)/2))]" />
          </div>

          {/* Scroll indicator dots */}
          <div className="flex justify-center gap-2 mt-5">
            {spots.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === activeSpot ? "20px" : "6px",
                  height: "6px",
                  background: i === activeSpot ? "rgba(34,211,238,0.9)" : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>
          <SeabedDecorations variant="b" />
        </section>

        {/* ─── Wave Divider: Spots → Gallery ─── */}
        <WaveDivider />

        {/* ─── Photo Gallery Section ─── */}
        <section id="gallery" className="py-20 sm:py-28 px-4 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <CameraIcon className="w-8 h-8 text-cyan-400" />
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">フォトギャラリー</h2>
                <CameraIcon className="w-8 h-8 text-cyan-400" />
              </div>
              <p className="text-cyan-300/60 tracking-widest text-sm mt-2">PHOTO GALLERY</p>
              <p className="text-white/60 mt-4 max-w-2xl mx-auto">
                言葉では伝えきれない、奄美の海の美しさ。この感動を、あなた自身の目で確かめてください。
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[200px]">
              {galleryImages.map((img, i) => (
                <StaggerItem
                  key={i}
                  index={i}
                  className={`relative rounded-xl overflow-hidden group cursor-pointer ${img.span}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-[#0C4A6E]/0 group-hover:bg-[#0C4A6E]/40 transition-colors duration-500" />
                  <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <p className="text-sm text-white font-medium drop-shadow-lg">{img.alt}</p>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </div>
          <SeabedDecorations variant="c" />
        </section>

        {/* ─── Marquee Strip 2 ─── */}
        <MarqueeStrip />

        {/* ─── Full-width scenic break ─── */}
        <section className="relative h-[50vh] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
            alt="奄美大島のトロピカルビーチ"
            width={1200}
            height={800}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/60 via-transparent to-[#0a1628]/80" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-2xl mb-4">
                人生を変える、青い世界へ
              </p>
              <p className="text-cyan-200/80 text-lg drop-shadow-lg">
                奄美大島で、あなただけの海の物語が始まる
              </p>
            </div>
          </div>
        </section>

        {/* ─── Wave Divider: scenic → Staff ─── */}
        <WaveDivider flip />

        {/* ─── Staff Section ─── */}
        <section id="staff" className="py-20 sm:py-28 px-4 relative">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <SunIcon className="w-8 h-8 text-cyan-400" />
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">スタッフ紹介</h2>
                <SunIcon className="w-8 h-8 text-cyan-400" />
              </div>
              <p className="text-cyan-300/60 tracking-widest text-sm mt-2">OUR STAFF</p>
              <p className="text-white/60 mt-4 max-w-2xl mx-auto">
                経験豊富なインストラクターが、安全で楽しいダイビング体験をお約束します。
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {staff.map((person, i) => (
                <div
                  key={i}
                  className="relative rounded-2xl bg-gradient-to-br from-[#0d1f3c] to-[#0C4A6E]/30 border border-white/10 p-6 sm:p-8 hover:border-cyan-400/30 transition-all duration-500"
                >
                  {/* Staff photo */}
                  <div className="w-28 h-28 rounded-full overflow-hidden mb-6 mx-auto md:mx-0 shadow-lg shadow-cyan-500/20 ring-4 ring-cyan-400/20">
                    <Image
                      src={person.image}
                      alt={person.imageAlt}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-1 text-center md:text-left">{person.name}</h3>
                  <p className="text-cyan-400 text-sm mb-4 text-center md:text-left">{person.role}</p>
                  <p className="text-white/60 text-sm leading-relaxed mb-5">{person.description}</p>
                  <div className="space-y-2">
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-2">資格・認定</p>
                    {person.certifications.map((cert, j) => (
                      <div key={j} className="flex items-center gap-2 text-sm text-white/70">
                        <CheckIcon className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                        <span>{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Wave Divider: Staff → Access ─── */}
        <WaveDivider />

        {/* ─── Access & Info Section ─── */}
        <section id="access" className="py-20 sm:py-28 px-4 relative bg-gradient-to-b from-transparent via-[#0C4A6E]/20 to-transparent">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <MapPinIcon className="w-8 h-8 text-cyan-400" />
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">アクセス・ご案内</h2>
                <MapPinIcon className="w-8 h-8 text-cyan-400" />
              </div>
              <p className="text-cyan-300/60 tracking-widest text-sm mt-2">ACCESS & INFO</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Meeting point & Access */}
              <div className="rounded-2xl bg-[#0d1f3c] border border-white/10 p-6 sm:p-8">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <MapPinIcon className="w-6 h-6 text-cyan-400" />
                  集合場所・アクセス
                </h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPinIcon className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <p className="font-bold text-white/90">集合場所</p>
                      <p className="text-white/60">BLUE AMAMI ショップ</p>
                      <p className="text-white/50">鹿児島県奄美市名瀬</p>
                      <p className="text-white/50">奄美空港から車で約50分</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ClockIcon className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <p className="font-bold text-white/90">営業時間</p>
                      <p className="text-white/60">8:00〜18:00（年中無休）</p>
                      <p className="text-white/50">午前の部 8:00〜 / 午後の部 13:00〜</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <PhoneIcon className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <p className="font-bold text-white/90">お電話</p>
                      <p className="text-white/60">0997-XX-XXXX</p>
                      <p className="text-white/50">お気軽にお問い合わせください</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CarIcon className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-bold text-emerald-400">送迎サービスあり</p>
                      <p className="text-white/60">名瀬市街地エリアは無料送迎</p>
                      <p className="text-white/50">その他エリアはご相談ください</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* What to bring */}
              <div className="rounded-2xl bg-[#0d1f3c] border border-white/10 p-6 sm:p-8">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <CheckIcon className="w-6 h-6 text-cyan-400" />
                  持ち物・ご準備
                </h3>
                <div className="space-y-3">
                  {[
                    { item: "水着", desc: "服の下に着てきてください", required: true },
                    { item: "タオル", desc: "バスタオル1枚", required: true },
                    { item: "着替え", desc: "帰りの着替え", required: true },
                    { item: "日焼け止め", desc: "海に優しいタイプ推奨", required: false },
                    { item: "酔い止め薬", desc: "船酔いが心配な方", required: false },
                    { item: "Cカード", desc: "ファンダイビングの方のみ", required: false },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 py-2 border-b border-white/5 last:border-0">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${item.required ? "bg-cyan-500/20" : "bg-white/5"}`}>
                        <CheckIcon className={`w-3 h-3 ${item.required ? "text-cyan-400" : "text-white/30"}`} />
                      </div>
                      <div>
                        <span className="text-white/90 text-sm font-medium">
                          {item.item}
                          {item.required && <span className="ml-2 text-xs text-cyan-400">必須</span>}
                        </span>
                        <p className="text-white/40 text-xs">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 rounded-xl bg-cyan-500/10 border border-cyan-400/20">
                  <p className="text-sm text-cyan-300 font-medium mb-1">ご安心ください</p>
                  <p className="text-xs text-white/50">
                    ダイビング器材・ウェットスーツは全てショップでご用意しています。手ぶらでもOK!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Wave Divider: Access → Reserve ─── */}
        <WaveDivider flip />

        {/* ─── Reservation CTA Section ─── */}
        <section id="reserve" className="py-20 sm:py-28 px-4 relative overflow-hidden">
          {/* Background with photo */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=1200&q=80"
              alt="ダイバーが海中を泳ぐ風景"
              width={1200}
              height={800}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#0a1628]/85 backdrop-blur-sm" />
          </div>
          <Bubbles />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <WaveIcon className="w-12 h-12 text-cyan-400 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              奄美の海が、<br className="sm:hidden" />あなたを待っています
            </h2>
            <p className="text-white/60 mb-10 max-w-xl mx-auto">
              透き通る青い海、色鮮やかなサンゴ礁、そしてウミガメとの出会い。一生忘れられない感動体験を、BLUE AMAMIで。
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mb-10 text-left max-w-lg mx-auto">
              {[
                "少人数制で安心",
                "器材レンタル無料",
                "写真データプレゼント",
                "名瀬市街無料送迎",
                "当日予約OK",
                "雨天でも開催",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span className="text-sm text-white/70">{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:0997-XX-XXXX"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-400 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-cyan-500/30"
                aria-label="電話する"
              >
                <PhoneIcon className="w-5 h-5" />
                電話で予約
              </a>
              <span
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-cyan-400/50 rounded-full font-bold text-lg opacity-60 cursor-default"
              >
                WEB予約はこちら
              </span>
            </div>
            <p className="text-white/30 text-xs mt-6">
              * これはALPACAが制作したデモサイトです。実在の店舗ではありません。
            </p>
          </div>
        </section>

        {/* ─── Wave Divider: Reserve → Footer ─── */}
        <WaveDivider />

        {/* ─── Footer ─── */}
        <footer className="relative border-t border-white/10 pt-16 px-4 pb-48 sm:pb-40 overflow-hidden"
          style={{ background: "linear-gradient(to bottom, #0a1628 0%, #071220 100%)" }}
        >
          {/* Animated seaweed/coral silhouettes */}
          <FooterSeabed />

          <div className="relative z-10 max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                <WaveIcon className="w-6 h-6 text-cyan-400" />
                <span className="text-lg font-bold tracking-wider">BLUE AMAMI</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 text-sm text-white/40">
                {[
                  { href: "#courses", label: "コース" },
                  { href: "#spots",   label: "スポット" },
                  { href: "#gallery", label: "ギャラリー" },
                  { href: "#staff",   label: "スタッフ" },
                  { href: "#access",  label: "アクセス" },
                ].map((link) => (
                  <a key={link.href} href={link.href} className="hover:text-cyan-400 transition-colors duration-200 text-center">
                    {link.label}
                  </a>
                ))}
              </div>
              <div className="text-center sm:text-right text-sm text-white/40">
                <p>鹿児島県奄美市名瀬</p>
                <p>TEL: 0997-XX-XXXX</p>
              </div>
            </div>
            <div className="text-center mt-8 pt-6 border-t border-white/10">
              <p className="text-xs opacity-30">
                &copy; 2026 デモサイト — Designed by{" "}
                <a href="/web#gallery" className="hover:opacity-60 transition-opacity">ALPACA</a>
              </p>
            </div>
          </div>
        </footer>

        {/* ─── Fixed Bottom Reservation Bar ─── */}
        <div className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ${scrollY > 500 ? "translate-y-0" : "translate-y-full"}`}>
          <div className="bg-[#0C4A6E]/95 backdrop-blur-md border-t border-cyan-400/20 px-4 py-3">
            <div className="max-w-5xl mx-auto flex items-center justify-between">
              <div className="hidden sm:block">
                <p className="text-sm font-bold">BLUE AMAMI</p>
                <p className="text-xs text-white/50">体験ダイビング ¥12,000〜</p>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href="tel:0997-XX-XXXX"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-white/20 hover:border-white/40 rounded-full text-sm font-bold transition-all"
                  aria-label="電話する"
                >
                  <PhoneIcon className="w-4 h-4" />
                  <span className="sm:hidden">電話</span>
                  <span className="hidden sm:inline">電話予約</span>
                </a>
                <a
                  href="#reserve"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 rounded-full text-sm font-bold transition-all shadow-lg shadow-cyan-500/20"
                >
                  今すぐ予約
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
