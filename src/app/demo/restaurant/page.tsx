"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { CSSProperties, ReactNode, MouseEvent } from "react";
import Image from "next/image";
import { ClockIcon, PhoneIcon, MapPinIcon } from "../components/icons";

// metadata is exported from a separate file for app router compatibility
// Title: Bistro ADAN | 奄美大島のビストロダイニング

// --- Fixed Navigation Bar ---
function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: "当店について" },
    { href: "#menu", label: "メニュー" },
    { href: "#interior", label: "店内" },
    { href: "#access", label: "アクセス" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(26, 21, 16, 0.97)" : "rgba(26, 21, 16, 0.0)",
        borderBottom: scrolled ? "1px solid rgba(212, 163, 115, 0.12)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Left: back link */}
        <a
          href="/web#gallery"
          className="hidden md:flex items-center gap-2 text-sm transition-all duration-300 hover:gap-3"
          style={{ color: "#D4A373" }}
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span className="hidden sm:inline">ギャラリーに戻る</span>
          <span className="sm:hidden">戻る</span>
        </a>

        {/* Center: logo */}
        <span
          className="absolute left-1/2 -translate-x-1/2 text-base font-bold tracking-widest"
          style={{ color: "#F5F0E8" }}
        >
          Bistro ADAN
        </span>

        {/* Right: nav links (desktop) + hamburger (mobile) */}
        <nav className="hidden sm:flex items-center gap-6">
          {navLinks.map((link) => (
            <SmoothScrollLink
              key={link.href}
              href={link.href}
              className="text-sm tracking-wide transition-colors duration-200 hover:opacity-80"
              style={{ color: "rgba(245, 240, 232, 0.7)" }}
            >
              {link.label}
            </SmoothScrollLink>
          ))}
        </nav>

        {/* Hamburger (mobile) */}
        <button
          className="sm:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="メニューを開く"
        >
          <span
            className="block w-5 h-0.5 transition-all duration-200"
            style={{
              backgroundColor: "#D4A373",
              transform: menuOpen ? "translateY(8px) rotate(45deg)" : "none",
            }}
          />
          <span
            className="block w-5 h-0.5 transition-all duration-200"
            style={{
              backgroundColor: "#D4A373",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-5 h-0.5 transition-all duration-200"
            style={{
              backgroundColor: "#D4A373",
              transform: menuOpen ? "translateY(-8px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          className="sm:hidden flex flex-col py-3 px-4 gap-3"
          style={{
            backgroundColor: "rgba(26, 21, 16, 0.98)",
            borderTop: "1px solid rgba(212, 163, 115, 0.1)",
          }}
        >
          {navLinks.map((link) => (
            <SmoothScrollLink
              key={link.href}
              href={link.href}
              className="text-sm py-2 tracking-wide"
              style={{ color: "rgba(245, 240, 232, 0.75)" }}
            >
              {link.label}
            </SmoothScrollLink>
          ))}
        </div>
      )}
    </header>
  );
}

function SmoothScrollLink({
  href,
  children,
  className,
  style,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <a
      href={href}
      className={className}
      style={style}
      onClick={(e) => {
        if (href.startsWith("#")) {
          e.preventDefault();
          const el = document.querySelector(href);
          el?.scrollIntoView({ behavior: "smooth" });
        }
      }}
    >
      {children}
    </a>
  );
}

// --- Inline SVG Icons ---
function ChevronDownIcon({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function ArrowLeftIcon({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

// --- Ornamental SVG Components ---

/** Curling vine scroll for menu corners */
function CornerVine({
  flip = false,
  style,
}: {
  flip?: boolean;
  style?: CSSProperties;
}) {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: flip ? "scaleX(-1)" : undefined,
        ...style,
      }}
    >
      {/* Main stem curve */}
      <path
        d="M4 60 C4 60, 8 36, 28 28 C42 22, 58 24, 60 8"
        stroke="rgba(212,163,115,0.55)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Small leaf curl top */}
      <path
        d="M60 8 C56 2, 50 4, 52 10 C54 16, 60 12, 60 8Z"
        stroke="rgba(212,163,115,0.45)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Mid leaf curl */}
      <path
        d="M40 24 C36 16, 28 18, 32 26 C34 30, 42 28, 40 24Z"
        stroke="rgba(212,163,115,0.38)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Small tendril near base */}
      <path
        d="M14 50 C10 44, 6 46, 8 52 C10 56, 16 54, 14 50Z"
        stroke="rgba(212,163,115,0.32)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Tiny dot accents */}
      <circle cx="30" cy="18" r="1.5" fill="rgba(212,163,115,0.4)" />
      <circle cx="46" cy="12" r="1" fill="rgba(212,163,115,0.35)" />
      <circle cx="10" cy="44" r="1" fill="rgba(212,163,115,0.3)" />
    </svg>
  );
}

/** Wine glass silhouette — watermark */
function WineGlassWatermark({ style }: { style?: CSSProperties }) {
  return (
    <svg
      width="120"
      height="180"
      viewBox="0 0 120 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      {/* Bowl */}
      <path
        d="M20 10 C10 40, 14 80, 60 90 C106 80, 110 40, 100 10 Z"
        fill="rgba(212,163,115,0.06)"
        stroke="rgba(212,163,115,0.12)"
        strokeWidth="2"
      />
      {/* Liquid level inside bowl */}
      <path
        d="M28 55 C24 70, 30 82, 60 88 C90 82, 96 70, 92 55 Z"
        fill="rgba(212,163,115,0.05)"
      />
      {/* Stem */}
      <line x1="60" y1="90" x2="60" y2="155" stroke="rgba(212,163,115,0.12)" strokeWidth="2" strokeLinecap="round" />
      {/* Base */}
      <path
        d="M32 155 Q60 148 88 155"
        stroke="rgba(212,163,115,0.12)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M28 162 Q60 170 92 162"
        stroke="rgba(212,163,115,0.1)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/** Diamond ornament between menu categories */
function DiamondOrnament({ style }: { style?: CSSProperties }) {
  return (
    <svg
      width="28"
      height="14"
      viewBox="0 0 28 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <polygon
        points="14,1 27,7 14,13 1,7"
        stroke="rgba(212,163,115,0.65)"
        strokeWidth="1.5"
        fill="rgba(212,163,115,0.12)"
      />
      <circle cx="14" cy="7" r="1.5" fill="rgba(212,163,115,0.7)" />
    </svg>
  );
}

/** Ornamental section divider with a centered icon */
function OrnamentalDivider({
  icon = "fork-knife",
  inView = false,
}: {
  icon?: "fork-knife" | "wine-glass" | "fleur";
  inView?: boolean;
}) {
  return (
    <div
      className="flex items-center justify-center gap-0 w-full"
      style={{ opacity: inView ? 1 : 0, transition: "opacity 0.6s ease-out" }}
    >
      {/* Left decorative line with flourish */}
      <svg width="160" height="20" viewBox="0 0 160 20" fill="none" style={{ overflow: "visible" }}>
        <line
          x1="0" y1="10" x2="130" y2="10"
          stroke="rgba(212,163,115,0.35)"
          strokeWidth="1"
          className={inView ? "section-divider-line" : ""}
          style={{ animationDelay: "0.1s" }}
        />
        {/* Small inner flourish */}
        <path
          d="M120 10 C126 4, 134 4, 138 10 C134 16, 126 16, 120 10Z"
          stroke="rgba(212,163,115,0.4)"
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="108" cy="10" r="1.5" fill="rgba(212,163,115,0.45)" />
        <circle cx="100" cy="10" r="1" fill="rgba(212,163,115,0.3)" />
      </svg>

      {/* Center icon */}
      <div className="flex-shrink-0 mx-3">
        {icon === "fork-knife" && (
          <svg width="22" height="32" viewBox="0 0 22 32" fill="none">
            {/* Fork left */}
            <line x1="4" y1="2" x2="4" y2="14" stroke="rgba(212,163,115,0.75)" strokeWidth="2" strokeLinecap="round" />
            <line x1="1" y1="2" x2="1" y2="7" stroke="rgba(212,163,115,0.65)" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="4" y1="2" x2="4" y2="7" stroke="rgba(212,163,115,0.65)" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="7" y1="2" x2="7" y2="7" stroke="rgba(212,163,115,0.65)" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="4" y1="14" x2="4" y2="30" stroke="rgba(212,163,115,0.7)" strokeWidth="2" strokeLinecap="round" />
            {/* Knife right */}
            <path d="M18 2 C22 4, 22 10, 18 12 L18 30" stroke="rgba(212,163,115,0.75)" strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        )}
        {icon === "wine-glass" && (
          <svg width="20" height="34" viewBox="0 0 20 34" fill="none">
            <path d="M2 2 C0 10, 2 18, 10 20 C18 18, 20 10, 18 2 Z" stroke="rgba(212,163,115,0.75)" strokeWidth="2" fill="none" strokeLinecap="round" />
            <line x1="10" y1="20" x2="10" y2="30" stroke="rgba(212,163,115,0.7)" strokeWidth="2" strokeLinecap="round" />
            <path d="M4 30 Q10 27 16 30" stroke="rgba(212,163,115,0.7)" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M2 33 Q10 36 18 33" stroke="rgba(212,163,115,0.55)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          </svg>
        )}
        {icon === "fleur" && (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2 C12 2, 16 6, 12 10 C8 6, 12 2, 12 2Z" stroke="rgba(212,163,115,0.7)" strokeWidth="1.5" fill="rgba(212,163,115,0.1)" />
            <path d="M22 12 C22 12, 18 16, 14 12 C18 8, 22 12, 22 12Z" stroke="rgba(212,163,115,0.7)" strokeWidth="1.5" fill="rgba(212,163,115,0.1)" />
            <path d="M12 22 C12 22, 8 18, 12 14 C16 18, 12 22, 12 22Z" stroke="rgba(212,163,115,0.7)" strokeWidth="1.5" fill="rgba(212,163,115,0.1)" />
            <path d="M2 12 C2 12, 6 8, 10 12 C6 16, 2 12, 2 12Z" stroke="rgba(212,163,115,0.7)" strokeWidth="1.5" fill="rgba(212,163,115,0.1)" />
            <circle cx="12" cy="12" r="2" fill="rgba(212,163,115,0.6)" />
          </svg>
        )}
      </div>

      {/* Right decorative line (mirrored) */}
      <svg width="160" height="20" viewBox="0 0 160 20" fill="none" style={{ transform: "scaleX(-1)", overflow: "visible" }}>
        <line
          x1="0" y1="10" x2="130" y2="10"
          stroke="rgba(212,163,115,0.35)"
          strokeWidth="1"
          className={inView ? "section-divider-line" : ""}
          style={{ animationDelay: "0.1s" }}
        />
        <path
          d="M120 10 C126 4, 134 4, 138 10 C134 16, 126 16, 120 10Z"
          stroke="rgba(212,163,115,0.4)"
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="108" cy="10" r="1.5" fill="rgba(212,163,115,0.45)" />
        <circle cx="100" cy="10" r="1" fill="rgba(212,163,115,0.3)" />
      </svg>
    </div>
  );
}

/** Steam / smoke lines rising above the hero food photo */
function HeroSteam() {
  const steams = [
    { left: "42%", delay: "0s",   duration: "3.2s", height: 60, anim: "steamRise1" },
    { left: "49%", delay: "0.8s", duration: "2.8s", height: 50, anim: "steamRise2" },
    { left: "56%", delay: "1.5s", duration: "3.5s", height: 70, anim: "steamRise3" },
    { left: "38%", delay: "2.1s", duration: "3.0s", height: 55, anim: "steamRise2" },
    { left: "62%", delay: "0.4s", duration: "2.6s", height: 45, anim: "steamRise1" },
  ];
  return (
    <>
      {steams.map((s, i) => (
        <div
          key={i}
          className="steam-line"
          style={{
            left: s.left,
            bottom: "50%",
            height: `${s.height}px`,
            background: `linear-gradient(180deg, transparent 0%, rgba(245,240,232,0.18) 40%, rgba(245,240,232,0.08) 100%)`,
            animation: `${s.anim} ${s.duration} ease-out ${s.delay} infinite`,
            width: "2px",
          }}
        />
      ))}
    </>
  );
}

/** Floating warm bokeh dots in the hero */
function HeroBokeh() {
  const dots = [
    { left: "25%", top: "35%", size: 6,  delay: "0s",   duration: "5s",  anim: "bokehDrift1", color: "rgba(212,163,115,0.55)" },
    { left: "70%", top: "45%", size: 4,  delay: "1.2s", duration: "6s",  anim: "bokehDrift2", color: "rgba(212,163,115,0.45)" },
    { left: "55%", top: "60%", size: 8,  delay: "0.5s", duration: "7s",  anim: "bokehDrift3", color: "rgba(212,163,115,0.35)" },
    { left: "35%", top: "55%", size: 5,  delay: "2s",   duration: "5.5s",anim: "bokehDrift1", color: "rgba(245,220,180,0.5)"  },
    { left: "80%", top: "30%", size: 3,  delay: "0.8s", duration: "4.8s",anim: "bokehDrift2", color: "rgba(212,163,115,0.6)"  },
    { left: "15%", top: "50%", size: 5,  delay: "1.8s", duration: "6.2s",anim: "bokehDrift3", color: "rgba(212,163,115,0.4)"  },
    { left: "62%", top: "25%", size: 4,  delay: "3s",   duration: "5.2s",anim: "bokehDrift1", color: "rgba(245,220,180,0.45)" },
    { left: "45%", top: "70%", size: 6,  delay: "1.5s", duration: "7.5s",anim: "bokehDrift2", color: "rgba(212,163,115,0.3)"  },
  ];
  return (
    <>
      {dots.map((d, i) => (
        <div
          key={i}
          className="bokeh-dot"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            backgroundColor: d.color,
            animation: `${d.anim} ${d.duration} ease-out ${d.delay} infinite`,
          }}
        />
      ))}
    </>
  );
}

// --- Menu Data ---
type MenuItem = {
  name: string;
  price: string;
  desc: string;
  image?: string;
  imageAlt?: string;
};

const menuLeft: MenuItem[] = [
  {
    name: "島魚のカルパッチョ",
    price: "1,280",
    desc: "名瀬漁港直送の鮮魚を薄造りに。島レモンとオリーブオイル、島塩で仕上げる一皿",
  },
  {
    name: "本日のポワソン",
    price: "1,880",
    desc: "旬の島魚をその日の仕入れで。バターソースまたはヴァンブランで",
  },
  {
    name: "グラスワイン",
    price: "800~",
    desc: "フランス・イタリアを中心に、料理に合わせた赤・白・泡を常時8種以上",
  },
];

const menuRight: MenuItem[] = [
  {
    name: "島豚のコンフィ",
    price: "1,680",
    desc: "島で育った豚肩ロースを低温でじっくり火入れ。黒糖のグラッセを添えて",
  },
  {
    name: "黒糖焼酎カクテル",
    price: "750",
    desc: "島の黒糖焼酎をベースにしたオリジナルカクテル。季節のフルーツで",
  },
  {
    name: "島タンカンのスプリッツァー",
    price: "680",
    desc: "奄美産タンカンとスパークリングワインの爽やかな一杯",
  },
];

const menuDesserts: MenuItem[] = [
  {
    name: "黒糖のクレームブリュレ",
    price: "680",
    desc: "奄美産黒糖のほろ苦いカラメルが香る、当店シグネチャーのデセール",
  },
  {
    name: "季節のソルベ",
    price: "580",
    desc: "その日の果物を使ったグラス仕立て。島のハーブを添えて",
  },
];

// --- Intersection Observer Hook ---
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// --- Tilt Gallery Card ---
function TiltCard({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((y / rect.height) - 0.5) * -12;
    const ry = ((x / rect.width) - 0.5) * 12;
    card.style.setProperty("--rx", `${rx}deg`);
    card.style.setProperty("--ry", `${ry}deg`);
    card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
  };
  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
  };
  return (
    <div
      ref={cardRef}
      className={className}
      style={{ ...style, transition: "transform 0.3s ease-out", willChange: "transform" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

// --- Main Page Component ---
export default function BistroAdanPage() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 });
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => {
      const sy = window.scrollY;
      setScrollY(sy);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (sy / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  }, []);

  const heroOpacity = Math.max(0, 1 - scrollY / 600);
  const heroParallax = scrollY * 0.35;
  const heroScale = 1 + scrollY * 0.0003;

  // Intersection observer refs for menu stagger
  const menuSectionRef = useRef<HTMLDivElement>(null);
  const [menuInView, setMenuInView] = useState(false);
  useEffect(() => {
    const el = menuSectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setMenuInView(true); observer.disconnect(); } },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const aboutSection = useInView(0.2);
  const accessSection = useInView(0.15);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#1A1510", fontFamily: "var(--font-noto-sans-jp), sans-serif" }}
      onMouseMove={handleMouseMove}
    >
      <style>{`
        @keyframes textReveal {
          from { opacity: 0; transform: translateY(40px); filter: blur(6px); }
          to   { opacity: 1; transform: translateY(0);    filter: blur(0);   }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes menuItemWrite {
          from { opacity: 0; transform: translateX(-12px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes menuItemWriteRight {
          from { opacity: 0; transform: translateX(12px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes steamRise1 {
          0%   { opacity: 0;    transform: translateY(0)   translateX(0)    scaleX(1);   }
          15%  { opacity: 0.55; }
          70%  { opacity: 0.25; }
          100% { opacity: 0;    transform: translateY(-90px) translateX(6px) scaleX(1.4); }
        }
        @keyframes steamRise2 {
          0%   { opacity: 0;    transform: translateY(0)   translateX(0)    scaleX(1);   }
          15%  { opacity: 0.45; }
          70%  { opacity: 0.2;  }
          100% { opacity: 0;    transform: translateY(-80px) translateX(-8px) scaleX(1.3); }
        }
        @keyframes steamRise3 {
          0%   { opacity: 0;    transform: translateY(0)   translateX(0)    scaleX(1);   }
          15%  { opacity: 0.5;  }
          70%  { opacity: 0.22; }
          100% { opacity: 0;    transform: translateY(-100px) translateX(4px) scaleX(1.5); }
        }
        @keyframes bokehDrift1 {
          0%   { opacity: 0;    transform: translate(0, 0)      scale(1);   }
          20%  { opacity: 0.7;  }
          80%  { opacity: 0.35; }
          100% { opacity: 0;    transform: translate(14px, -50px) scale(1.6); }
        }
        @keyframes bokehDrift2 {
          0%   { opacity: 0;    transform: translate(0, 0)       scale(0.8); }
          20%  { opacity: 0.55; }
          80%  { opacity: 0.28; }
          100% { opacity: 0;    transform: translate(-18px, -60px) scale(1.4); }
        }
        @keyframes bokehDrift3 {
          0%   { opacity: 0;    transform: translate(0, 0)      scale(1.1); }
          20%  { opacity: 0.65; }
          80%  { opacity: 0.3;  }
          100% { opacity: 0;    transform: translate(8px, -44px) scale(1.8);  }
        }
        @keyframes ornamentPulse {
          0%, 100% { opacity: 0.55; transform: scale(1);    }
          50%       { opacity: 0.85; transform: scale(1.12); }
        }
        @keyframes dividerGrow {
          from { transform: scaleX(0); opacity: 0; }
          to   { transform: scaleX(1); opacity: 1; }
        }
        .steam-line {
          position: absolute;
          width: 2px;
          border-radius: 999px;
          transform-origin: bottom center;
          pointer-events: none;
        }
        .bokeh-dot {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(1.5px);
        }
        .menu-corner-ornament {
          position: absolute;
          pointer-events: none;
        }
        .section-divider-line {
          transform-origin: center;
          animation: dividerGrow 0.8s cubic-bezier(0.22,1,0.36,1) forwards;
        }

        .hero-word {
          display: inline-block;
          opacity: 0;
          animation: textReveal 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .stagger-item {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.65s ease-out, transform 0.65s ease-out;
        }
        .stagger-item.in-view {
          opacity: 1;
          transform: translateY(0);
        }
        .cursor-glow {
          position: fixed;
          width: 480px;
          height: 480px;
          background: radial-gradient(circle, rgba(212,163,115,0.22) 0%, rgba(212,163,115,0.06) 45%, transparent 70%);
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: left 0.25s ease-out, top 0.25s ease-out;
          border-radius: 50%;
        }

        /* Menu Book Styles */
        .menu-book {
          background-color: #1c1710;
          box-shadow:
            0 0 0 1px rgba(212, 163, 115, 0.12),
            0 8px 40px rgba(0, 0, 0, 0.6),
            inset 0 0 80px rgba(0, 0, 0, 0.3);
          position: relative;
        }
        .menu-book::before {
          display: none;
        }

        .menu-category-header {
          font-variant: small-caps;
          letter-spacing: 0.25em;
          position: relative;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .menu-category-header::before,
        .menu-category-header::after {
          content: '';
          flex: 1;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(212, 163, 115, 0.6));
          border-radius: 1px;
        }
        .menu-category-header::before {
          background: linear-gradient(90deg, rgba(212, 163, 115, 0.6), transparent);
        }

        .menu-item-write-left {
          opacity: 0;
          animation: menuItemWrite 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .menu-item-write-right {
          opacity: 0;
          animation: menuItemWriteRight 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .menu-item-line {
          position: relative;
        }
        .menu-item-line::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, rgba(212,163,115,0.12) 0%, rgba(212,163,115,0.06) 60%, transparent 100%);
        }

        .menu-ornament {
          display: inline-block;
          font-family: var(--font-cormorant), serif;
          font-style: italic;
          color: rgba(212, 163, 115, 0.8);
          font-size: 1.15em;
          letter-spacing: 0.05em;
          animation: ornamentPulse 4s ease-in-out infinite;
        }

        /* Interior asymmetric */
        .interior-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
        }
        @media (min-width: 640px) {
          .interior-grid {
            grid-template-columns: 5fr 4fr;
            grid-template-rows: auto auto;
            gap: 0;
          }
          .interior-primary {
            grid-column: 1;
            grid-row: 1 / 3;
          }
          .interior-secondary {
            grid-column: 2;
            grid-row: 1;
            margin-top: 48px;
          }
          .interior-caption {
            grid-column: 2;
            grid-row: 2;
            margin-top: -24px;
          }
        }
        html { scroll-behavior: smooth; }
        input:focus, textarea:focus, select:focus {
          border-color: #D4A373 !important;
          box-shadow: 0 0 0 3px rgba(212,163,115,0.18) !important;
          outline: none !important;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        button[type="submit"], button[type="button"], a[href*="tel:"], a[href="#access"] {
          transition: transform 0.2s ease, box-shadow 0.2s ease !important;
        }
        button[type="submit"]:hover, button[type="button"]:hover, a[href*="tel:"]:hover, a[href="#access"]:hover {
          transform: scale(1.03) !important;
        }
        button[type="submit"]:active, button[type="button"]:active, a[href*="tel:"]:active, a[href="#access"]:active {
          transform: scale(0.98) !important;
        }
      `}</style>

      {/* Cursor Glow — desktop only (touch devices have no hover cursor) */}
      <div
        className="cursor-glow hidden md:block"
        style={{ left: cursorPos.x, top: cursorPos.y }}
      />

      {/* Scroll Progress Bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "2px",
          width: `${scrollProgress}%`,
          backgroundColor: "#D4A373",
          zIndex: 9998,
          transition: "width 0.1s linear",
          boxShadow: "0 0 8px rgba(212, 163, 115, 0.6)",
        }}
      />

      <NavBar />

      {/* ===== HERO SECTION ===== */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background photo with dark overlay + parallax */}
        <div
          className="absolute inset-0"
          style={{
            transform: `scale(${heroScale}) translateY(${heroParallax * 0.5}px)`,
          }}
        >
          <Image
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80"
            alt="料理の背景写真"
            width={1200}
            height={800}
            priority
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(180deg, rgba(13, 10, 7, 0.7) 0%, rgba(26, 21, 16, 0.6) 40%, rgba(26, 21, 16, 0.85) 100%),
                radial-gradient(ellipse 80% 60% at 30% 40%, rgba(212, 163, 115, 0.1) 0%, transparent 60%)
              `,
            }}
          />
        </div>

        {/* Warm light flicker effect */}
        <div
          className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full animate-pulse"
          style={{
            background:
              "radial-gradient(circle, rgba(212, 163, 115, 0.08) 0%, transparent 70%)",
            animationDuration: "4s",
          }}
        />

        {/* Steam rising above hero */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <HeroSteam />
        </div>

        {/* Floating bokeh dots */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <HeroBokeh />
        </div>

        {/* Noren (curtain) decorative lines */}
        <div className="absolute top-0 left-0 right-0 h-2" style={{ backgroundColor: "#D4A373" }} />

        {/* Hero Content */}
        <div
          className="relative z-10 text-center px-6"
          style={{ opacity: heroOpacity }}
        >
          {/* Decorative top element */}
          <div
            className="mx-auto mb-8 flex items-center justify-center gap-4 transition-all duration-1000"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <div
              className="h-px w-12 sm:w-20"
              style={{ backgroundColor: "rgba(212, 163, 115, 0.4)" }}
            />
            <span className="text-sm tracking-[0.3em]" style={{ color: "#D4A373" }}>
              奄美大島 名瀬
            </span>
            <div
              className="h-px w-12 sm:w-20"
              style={{ backgroundColor: "rgba(212, 163, 115, 0.4)" }}
            />
          </div>

          {/* Restaurant name — cinematic letter reveal */}
          <h1
            style={{ fontFamily: "var(--font-cormorant), serif" }}
          >
            <span
              className="block text-6xl sm:text-8xl md:text-9xl font-bold tracking-wide"
              style={{
                color: "#F5F0E8",
                textShadow: "0 0 80px rgba(212, 163, 115, 0.3)",
              }}
            >
              {"Bistro".split("").map((ch, i) => (
                <span
                  key={i}
                  className="hero-word"
                  style={{ animationDelay: `${0.4 + i * 0.07}s` }}
                >
                  {ch}
                </span>
              ))}
            </span>
            <span
              className="block text-7xl sm:text-9xl md:text-[10rem] font-bold mt-2"
              style={{
                color: "#D4A373",
                textShadow: "0 0 60px rgba(212, 163, 115, 0.2)",
                letterSpacing: "0.05em",
              }}
            >
              {"ADAN".split("").map((ch, i) => (
                <span
                  key={i}
                  className="hero-word"
                  style={{ animationDelay: `${0.85 + i * 0.1}s` }}
                >
                  {ch}
                </span>
              ))}
            </span>
          </h1>

          {/* Tagline */}
          <p
            className="mt-8 text-base sm:text-lg tracking-[0.2em] transition-all duration-1000 delay-500"
            style={{
              color: "rgba(245, 240, 232, 0.6)",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
            }}
          >
            Island ingredients, French touch.
          </p>

          {/* Scroll indicator */}
          <div
            className="mt-16 animate-bounce transition-all duration-1000 delay-700"
            style={{
              opacity: isVisible ? 0.5 : 0,
              animationDuration: "2s",
            }}
          >
            <ChevronDownIcon className="w-6 h-6 mx-auto text-[#D4A373]" />
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background: "linear-gradient(transparent, #1A1510)",
          }}
        />
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section id="about" className="relative py-24 sm:py-32 px-6">
        <div ref={aboutSection.ref} className="max-w-3xl mx-auto text-center">
          {/* Section divider */}
          <div className="mb-12">
            <OrnamentalDivider icon="fleur" inView={aboutSection.inView} />
          </div>

          {/* Curving decorative arch above heading */}
          <div className="flex justify-center mb-3" style={{ opacity: aboutSection.inView ? 1 : 0, transition: "opacity 0.8s ease-out 0.15s" }}>
            <svg width="220" height="28" viewBox="0 0 220 28" fill="none">
              <path
                d="M10 24 Q55 4, 110 2 Q165 4, 210 24"
                stroke="rgba(212,163,115,0.38)"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="10" cy="24" r="2.5" fill="rgba(212,163,115,0.45)" />
              <circle cx="210" cy="24" r="2.5" fill="rgba(212,163,115,0.45)" />
              <circle cx="110" cy="2" r="2" fill="rgba(212,163,115,0.55)" />
              {/* Small inner arch echo */}
              <path
                d="M30 22 Q80 8, 110 6 Q140 8, 190 22"
                stroke="rgba(212,163,115,0.2)"
                strokeWidth="1"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>

          <h2
            className={`text-3xl sm:text-4xl font-bold mb-8 tracking-wide stagger-item${aboutSection.inView ? " in-view" : ""}`}
            style={{ color: "#F5F0E8", fontFamily: "var(--font-noto-serif-jp), serif", transitionDelay: "0.1s" }}
          >
            島の食材を、フレンチの技法で。
          </h2>

          <div className="space-y-6 text-base sm:text-lg leading-relaxed" style={{ color: "rgba(245, 240, 232, 0.75)" }}>
            <p className={`stagger-item${aboutSection.inView ? " in-view" : ""}`} style={{ transitionDelay: "0.2s" }}>
              「ADAN」は、奄美大島・名瀬の屋仁川通りにあるビストロです。
            </p>
            <p className={`stagger-item${aboutSection.inView ? " in-view" : ""}`} style={{ transitionDelay: "0.35s" }}>
              名瀬漁港から届く島魚のカルパッチョ、
              <br className="hidden sm:block" />
              島豚のコンフィ、黒糖を使ったデセール。
              <br className="hidden sm:block" />
              島の食材をフレンチの技法で仕立てます。
            </p>
            <p className={`stagger-item${aboutSection.inView ? " in-view" : ""}`} style={{ transitionDelay: "0.5s" }}>
              カウンターでグラスワインを一杯、
              <br className="hidden sm:block" />
              テーブルで大切な人とコース料理を。
              <br className="hidden sm:block" />
              気取らず、でも少し特別な夜を。
            </p>
          </div>

          {/* Decorative quote */}
          <div
            className="mt-12 pt-8 border-t"
            style={{ borderColor: "rgba(212, 163, 115, 0.15)" }}
          >
            <p className="text-sm tracking-[0.15em]" style={{ color: "rgba(212, 163, 115, 0.6)" }}>
              &mdash; シェフ・中村 健太
            </p>
          </div>
        </div>
      </section>

      {/* ===== MENU SECTION ===== */}
      <section id="menu" className="relative py-24 sm:py-32 px-4 sm:px-6">
        {/* Subtle warm background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent, rgba(212, 163, 115, 0.03) 50%, transparent)",
          }}
        />

        <div ref={menuSectionRef} className="relative max-w-5xl mx-auto">
          {/* Section header */}
          <div className={`text-center mb-16 stagger-item${menuInView ? " in-view" : ""}`} style={{ transitionDelay: "0s" }}>
            <div className="mb-6">
              <OrnamentalDivider icon="wine-glass" inView={menuInView} />
            </div>
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-wide"
              style={{ color: "#F5F0E8", fontFamily: "var(--font-noto-serif-jp), serif" }}
            >
              お品書き
            </h2>
            <p className="mt-3 text-sm tracking-widest" style={{ color: "rgba(245, 240, 232, 0.35)", fontFamily: "var(--font-cormorant), serif", fontStyle: "italic" }}>
              — all prices include tax —
            </p>
          </div>

          {/* ===== MENU BOOK ===== */}
          <div className={`menu-book rounded-sm overflow-hidden stagger-item${menuInView ? " in-view" : ""}`} style={{ transitionDelay: "0.1s", position: "relative" }}>

            {/* Corner vine ornaments */}
            <div className="menu-corner-ornament" style={{ top: 0, left: 0 }}>
              <CornerVine style={{ opacity: menuInView ? 1 : 0, transition: "opacity 0.8s ease-out 0.3s" }} />
            </div>
            <div className="menu-corner-ornament" style={{ top: 0, right: 0 }}>
              <CornerVine flip style={{ opacity: menuInView ? 1 : 0, transition: "opacity 0.8s ease-out 0.4s" }} />
            </div>
            <div className="menu-corner-ornament" style={{ bottom: 0, left: 0, transform: "scaleY(-1)" }}>
              <CornerVine style={{ opacity: menuInView ? 1 : 0, transition: "opacity 0.8s ease-out 0.5s" }} />
            </div>
            <div className="menu-corner-ornament" style={{ bottom: 0, right: 0, transform: "scale(-1, -1)" }}>
              <CornerVine style={{ opacity: menuInView ? 1 : 0, transition: "opacity 0.8s ease-out 0.6s" }} />
            </div>

            {/* Wine glass watermark — centered behind content */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
                zIndex: 0,
                opacity: menuInView ? 1 : 0,
                transition: "opacity 1.2s ease-out 0.5s",
              }}
            >
              <WineGlassWatermark />
            </div>

            {/* Book title strip */}
            <div
              className="text-center py-5 px-6"
              style={{
                borderBottom: "1px solid rgba(212, 163, 115, 0.14)",
                background: "linear-gradient(180deg, rgba(212,163,115,0.06) 0%, transparent 100%)",
              }}
            >
              <p
                className="text-xs tracking-[0.45em] uppercase"
                style={{ color: "rgba(212, 163, 115, 0.55)", fontFamily: "var(--font-cormorant), serif" }}
              >
                <span className="menu-ornament">&#10022;</span>
                &ensp;Bistro ADAN &mdash; Menu du Jour&ensp;
                <span className="menu-ornament">&#10022;</span>
              </p>
            </div>

            {/* Two-page spread */}
            <div className="grid grid-cols-1 sm:grid-cols-2" style={{ position: "relative", zIndex: 1 }}>

              {/* LEFT PAGE — Appetizers & Fish */}
              <div
                className="px-7 sm:px-10 py-10"
                style={{ borderRight: "none" }}
              >
                {/* Page category header */}
                <div className="mb-8">
                  <p className="menu-category-header text-xs" style={{ color: "#D4A373" }}>
                    <span style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "0.95rem" }}>
                      Entrées &amp; Poisson
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-center tracking-widest" style={{ color: "rgba(245, 240, 232, 0.3)", letterSpacing: "0.2em" }}>
                    前菜・魚料理 / お飲み物
                  </p>
                </div>

                {/* Items */}
                <div className="space-y-0">
                  {menuLeft.map((item, idx) => (
                    <div
                      key={idx}
                      className={`menu-item-line pb-6 mb-6${menuInView ? " menu-item-write-left" : ""}`}
                      style={{ animationDelay: `${0.25 + idx * 0.18}s` }}
                    >
                      <div className="flex items-baseline justify-between gap-3">
                        <h4
                          style={{
                            color: "#F5F0E8",
                            fontFamily: "var(--font-noto-serif-jp), serif",
                            fontSize: "1rem",
                            fontWeight: 400,
                            letterSpacing: "0.04em",
                            lineHeight: 1.5,
                          }}
                        >
                          {item.name}
                        </h4>
                        <span
                          className="shrink-0 text-sm tracking-wide"
                          style={{
                            color: "#D4A373",
                            fontFamily: "var(--font-cormorant), serif",
                            fontSize: "1.05rem",
                            fontWeight: 600,
                            whiteSpace: "nowrap",
                          }}
                        >
                          ¥{item.price}
                        </span>
                      </div>
                      {/* Dotted leader line */}
                      <div
                        className="mt-1.5 mb-2"
                        style={{
                          height: "1px",
                          background: "repeating-linear-gradient(90deg, rgba(212,163,115,0.2) 0, rgba(212,163,115,0.2) 2px, transparent 2px, transparent 6px)",
                        }}
                      />
                      <p
                        className="text-xs leading-relaxed"
                        style={{ color: "rgba(245, 240, 232, 0.4)", fontFamily: "var(--font-noto-sans-jp), sans-serif", fontWeight: 300 }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT PAGE — Meat & Drinks */}
              <div className="px-7 sm:px-10 py-10" style={{ position: "relative" }}>
                {/* Page category header */}
                <div className="mb-8">
                  <p className="menu-category-header text-xs" style={{ color: "#D4A373" }}>
                    <span style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "0.95rem" }}>
                      Viande &amp; Boissons
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-center tracking-widest" style={{ color: "rgba(245, 240, 232, 0.3)", letterSpacing: "0.2em" }}>
                    肉料理 / ドリンク
                  </p>
                </div>

                {/* Items */}
                <div className="space-y-0">
                  {menuRight.map((item, idx) => (
                    <div
                      key={idx}
                      className={`menu-item-line pb-6 mb-6${menuInView ? " menu-item-write-right" : ""}`}
                      style={{ animationDelay: `${0.3 + idx * 0.18}s` }}
                    >
                      <div className="flex items-baseline justify-between gap-3">
                        <h4
                          style={{
                            color: "#F5F0E8",
                            fontFamily: "var(--font-noto-serif-jp), serif",
                            fontSize: "1rem",
                            fontWeight: 400,
                            letterSpacing: "0.04em",
                            lineHeight: 1.5,
                          }}
                        >
                          {item.name}
                        </h4>
                        <span
                          className="shrink-0 text-sm tracking-wide"
                          style={{
                            color: "#D4A373",
                            fontFamily: "var(--font-cormorant), serif",
                            fontSize: "1.05rem",
                            fontWeight: 600,
                            whiteSpace: "nowrap",
                          }}
                        >
                          ¥{item.price}
                        </span>
                      </div>
                      {/* Dotted leader line */}
                      <div
                        className="mt-1.5 mb-2"
                        style={{
                          height: "1px",
                          background: "repeating-linear-gradient(90deg, rgba(212,163,115,0.2) 0, rgba(212,163,115,0.2) 2px, transparent 2px, transparent 6px)",
                        }}
                      />
                      <p
                        className="text-xs leading-relaxed"
                        style={{ color: "rgba(245, 240, 232, 0.4)", fontFamily: "var(--font-noto-sans-jp), sans-serif", fontWeight: 300 }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* DESSERTS — Full width strip */}
            <div
              style={{
                borderTop: "1px solid rgba(212, 163, 115, 0.14)",
                background: "linear-gradient(180deg, rgba(212,163,115,0.04) 0%, transparent 100%)",
                position: "relative",
                zIndex: 1,
              }}
            >
              {/* Diamond ornament between sections */}
              <div className="flex items-center justify-center pt-6 pb-0">
                <div className="h-px w-20" style={{ background: "linear-gradient(90deg, transparent, rgba(212,163,115,0.3))" }} />
                <div className="mx-3" style={{ animation: menuInView ? "ornamentPulse 3s ease-in-out infinite" : "none" }}>
                  <DiamondOrnament />
                </div>
                <div className="h-px w-20" style={{ background: "linear-gradient(90deg, rgba(212,163,115,0.3), transparent)" }} />
              </div>

              {/* Dessert header */}
              <div className="text-center pt-4 pb-2 px-6">
                <p
                  className="menu-category-header text-xs justify-center"
                  style={{ color: "#D4A373", maxWidth: "260px", margin: "0 auto" }}
                >
                  <span style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "0.95rem" }}>
                    Desserts
                  </span>
                </p>
                <p className="mt-1 text-xs tracking-widest" style={{ color: "rgba(245, 240, 232, 0.3)", letterSpacing: "0.2em" }}>
                  デセール
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 px-7 sm:px-10 pb-10 pt-6">
                {menuDesserts.map((item, idx) => (
                  <div
                    key={idx}
                    className={`menu-item-line pb-6 mb-6 ${idx % 2 === 0 ? (menuInView ? "menu-item-write-left" : "") : (menuInView ? "menu-item-write-right" : "")}`}
                    style={{
                      animationDelay: `${0.5 + idx * 0.2}s`,
                      paddingRight: idx % 2 === 0 ? "2rem" : "0",
                      paddingLeft: idx % 2 === 1 ? "2rem" : "0",
                    }}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <h4
                        style={{
                          color: "#F5F0E8",
                          fontFamily: "var(--font-noto-serif-jp), serif",
                          fontSize: "1rem",
                          fontWeight: 400,
                          letterSpacing: "0.04em",
                          lineHeight: 1.5,
                        }}
                      >
                        {item.name}
                      </h4>
                      <span
                        className="shrink-0"
                        style={{
                          color: "#D4A373",
                          fontFamily: "var(--font-cormorant), serif",
                          fontSize: "1.05rem",
                          fontWeight: 600,
                          whiteSpace: "nowrap",
                        }}
                      >
                        ¥{item.price}
                      </span>
                    </div>
                    <div
                      className="mt-1.5 mb-2"
                      style={{
                        height: "1px",
                        background: "repeating-linear-gradient(90deg, rgba(212,163,115,0.2) 0, rgba(212,163,115,0.2) 2px, transparent 2px, transparent 6px)",
                      }}
                    />
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: "rgba(245, 240, 232, 0.4)", fontFamily: "var(--font-noto-sans-jp), sans-serif", fontWeight: 300 }}
                    >
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Book footer */}
            <div
              className="text-center py-5 px-6"
              style={{
                borderTop: "1px solid rgba(212, 163, 115, 0.1)",
                background: "linear-gradient(0deg, rgba(212,163,115,0.04) 0%, transparent 100%)",
              }}
            >
              <p className="text-xs" style={{ color: "rgba(245, 240, 232, 0.3)", fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", letterSpacing: "0.08em" }}>
                仕入れ状況により内容が変わる場合がございます &mdash; アレルギーのご相談はお気軽に
              </p>
            </div>
          </div>
          {/* End menu book */}

        </div>
      </section>

      {/* ===== INTERIOR / ATMOSPHERE SECTION ===== */}
      <section id="interior" className="relative py-24 sm:py-32 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <div className="mb-4">
              <OrnamentalDivider icon="fork-knife" inView={true} />
            </div>
            <p className="text-sm tracking-[0.3em] mb-4" style={{ color: "#D4A373" }}>店内のご案内</p>
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-wide"
              style={{ color: "#F5F0E8", fontFamily: "var(--font-noto-serif-jp), serif" }}
            >
              くつろぎの空間
            </h2>
          </div>

          {/* === Asymmetric overlap image collage === */}
          <div className="relative mb-16 sm:mb-20">
            {/* Primary image — large, anchored left */}
            <TiltCard
              className="relative overflow-hidden"
              style={{
                width: "100%",
                maxWidth: "72%",
                borderRadius: "4px",
                boxShadow: "0 20px 60px rgba(0,0,0,0.55)",
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80"
                alt="落ち着いた雰囲気の店内"
                width={800}
                height={600}
                className="w-full object-cover"
                style={{ height: "360px", display: "block" }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(135deg, rgba(26,21,16,0.25) 0%, transparent 60%)",
                }}
              />
            </TiltCard>

            {/* Secondary image — smaller, offset top-right, overlapping */}
            <TiltCard
              className="absolute overflow-hidden hidden sm:block"
              style={{
                top: "-28px",
                right: "0",
                width: "34%",
                borderRadius: "4px",
                boxShadow: "0 16px 48px rgba(0,0,0,0.65)",
                border: "3px solid #1A1510",
                zIndex: 2,
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80"
                alt="カウンター席の様子"
                width={600}
                height={400}
                className="w-full object-cover"
                style={{ height: "220px", display: "block" }}
              />
            </TiltCard>

            {/* Third accent image — small, lower-right, further offset */}
            <TiltCard
              className="absolute overflow-hidden hidden sm:block"
              style={{
                bottom: "-36px",
                right: "6%",
                width: "22%",
                borderRadius: "4px",
                boxShadow: "0 12px 36px rgba(0,0,0,0.6)",
                border: "3px solid #1A1510",
                zIndex: 3,
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=400&q=80"
                alt="一枚板のカウンター"
                width={600}
                height={400}
                className="w-full object-cover"
                style={{ height: "150px", display: "block" }}
              />
            </TiltCard>

            {/* Mobile: show second image below */}
            <div className="sm:hidden mt-3">
              <Image
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80"
                alt="カウンター席の様子"
                width={600}
                height={400}
                className="w-full object-cover rounded"
                style={{ height: "200px" }}
              />
            </div>
          </div>

          {/* Spacer for overlapping images on desktop */}
          <div className="hidden sm:block" style={{ height: "36px" }} />

          {/* Interior detail cards — asymmetric text layout */}
          <div className="grid sm:grid-cols-2 gap-10 sm:gap-16 mt-4">
            {/* Counter seats — text-heavy, no image */}
            <div className="relative">
              <div
                className="absolute top-0 left-0 w-0.5 h-full"
                style={{ background: "linear-gradient(180deg, #D4A373 0%, transparent 100%)", opacity: 0.3 }}
              />
              <div className="pl-6">
                <p
                  className="text-xs tracking-[0.3em] mb-3"
                  style={{ color: "rgba(212, 163, 115, 0.6)", fontFamily: "var(--font-cormorant), serif", fontVariant: "small-caps" }}
                >
                  Counter Seats
                </p>
                <h3
                  className="text-xl font-bold mb-4"
                  style={{ color: "#F5F0E8", fontFamily: "var(--font-noto-serif-jp), serif" }}
                >
                  カウンター席
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(245, 240, 232, 0.6)" }}>
                  一枚板のカウンターは8席。目の前で店主が腕をふるう臨場感と、
                  シェフの手元が見える特等席。おひとり様でも気兼ねなくどうぞ。
                  常連さんとの会話が始まるのも、このカウンターから。
                </p>
                <div className="mt-5 flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full" style={{ backgroundColor: "#D4A373", opacity: 0.7 }} />
                  <span className="text-xs tracking-wider" style={{ color: "rgba(212, 163, 115, 0.55)" }}>
                    8席 &ensp;/&ensp; 予約不要
                  </span>
                </div>
              </div>
            </div>

            {/* Tatami room — offset slightly lower on desktop */}
            <div className="relative sm:mt-10">
              <div
                className="absolute top-0 left-0 w-0.5 h-full"
                style={{ background: "linear-gradient(180deg, rgba(212,163,115,0.5) 0%, transparent 100%)", opacity: 0.3 }}
              />
              <div className="pl-6">
                <p
                  className="text-xs tracking-[0.3em] mb-3"
                  style={{ color: "rgba(212, 163, 115, 0.6)", fontFamily: "var(--font-cormorant), serif", fontVariant: "small-caps" }}
                >
                  Private Room
                </p>
                <h3
                  className="text-xl font-bold mb-4"
                  style={{ color: "#F5F0E8", fontFamily: "var(--font-noto-serif-jp), serif" }}
                >
                  小上がり座敷
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(245, 240, 232, 0.6)" }}>
                  掘りごたつ式のお座敷は最大12名様まで。島唄が静かに流れる空間で、
                  ご家族の集まりや友人との語らいにぴったり。
                  襖を閉めれば半個室としてもお使いいただけます。
                </p>
                <div className="mt-5 flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full" style={{ backgroundColor: "#D4A373", opacity: 0.7 }} />
                  <span className="text-xs tracking-wider" style={{ color: "rgba(212, 163, 115, 0.55)" }}>
                    最大12名 &ensp;/&ensp; 要予約
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ===== ACCESS SECTION ===== */}
      <section id="access" className="relative py-24 sm:py-32 px-6">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent, rgba(13, 10, 7, 0.5) 100%)",
          }}
        />

        <div ref={accessSection.ref} className="relative max-w-3xl mx-auto">
          {/* Section header */}
          <div className={`text-center mb-16 stagger-item${accessSection.inView ? " in-view" : ""}`} style={{ transitionDelay: "0s" }}>
            <div className="mb-6">
              <OrnamentalDivider icon="fleur" inView={accessSection.inView} />
            </div>
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-wide"
              style={{ color: "#F5F0E8", fontFamily: "var(--font-noto-serif-jp), serif" }}
            >
              アクセス・営業案内
            </h2>
          </div>

          {/* Info grid */}
          <div className="space-y-8">
            {/* Address */}
            <div
              className={`flex gap-5 p-6 rounded-xl stagger-item${accessSection.inView ? " in-view" : ""}`}
              style={{
                backgroundColor: "rgba(212, 163, 115, 0.04)",
                border: "1px solid rgba(212, 163, 115, 0.08)",
                transitionDelay: "0.15s",
              }}
            >
              <div className="shrink-0 mt-1">
                <MapPinIcon className="w-5 h-5" style={{ color: "#D4A373" }} />
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2" style={{ color: "#D4A373" }}>
                  所在地
                </h3>
                <p className="text-base" style={{ color: "#F5F0E8" }}>
                  鹿児島県奄美市名瀬
                </p>
                <p className="text-sm mt-2" style={{ color: "rgba(245, 240, 232, 0.5)" }}>
                  屋仁川通り中央付近、赤提灯が目印
                </p>
              </div>
            </div>

            {/* Hours */}
            <div
              className={`flex gap-5 p-6 rounded-xl stagger-item${accessSection.inView ? " in-view" : ""}`}
              style={{
                backgroundColor: "rgba(212, 163, 115, 0.04)",
                border: "1px solid rgba(212, 163, 115, 0.08)",
                transitionDelay: "0.3s",
              }}
            >
              <div className="shrink-0 mt-1">
                <ClockIcon className="w-5 h-5" style={{ color: "#D4A373" }} />
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2" style={{ color: "#D4A373" }}>
                  営業時間
                </h3>
                <p className="text-base" style={{ color: "#F5F0E8" }}>
                  17:00 - 24:00（L.O. 23:30）
                </p>
                <p className="text-sm mt-2" style={{ color: "rgba(245, 240, 232, 0.5)" }}>
                  定休日：毎週日曜日
                </p>
                <p className="text-sm mt-1" style={{ color: "rgba(245, 240, 232, 0.35)" }}>
                  ※祝前日の日曜は営業する場合あり。お電話でご確認ください
                </p>
              </div>
            </div>

            {/* Phone */}
            <div
              className={`flex gap-5 p-6 rounded-xl stagger-item${accessSection.inView ? " in-view" : ""}`}
              style={{
                backgroundColor: "rgba(212, 163, 115, 0.04)",
                border: "1px solid rgba(212, 163, 115, 0.08)",
                transitionDelay: "0.45s",
              }}
            >
              <div className="shrink-0 mt-1">
                <PhoneIcon className="w-5 h-5" style={{ color: "#D4A373" }} />
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2" style={{ color: "#D4A373" }}>
                  ご予約・お問い合わせ
                </h3>
                <p className="text-xl font-light tracking-wider" style={{ color: "#F5F0E8" }}>
                  0997-XX-XXXX
                </p>
                <p className="text-sm mt-2" style={{ color: "rgba(245, 240, 232, 0.5)" }}>
                  お座敷のご予約はお電話にて承ります
                </p>
              </div>
            </div>

            {/* Parking / Access note */}
            <div
              className="text-center py-6 rounded-xl"
              style={{
                backgroundColor: "rgba(212, 163, 115, 0.03)",
                border: "1px solid rgba(212, 163, 115, 0.06)",
              }}
            >
              <p className="text-sm" style={{ color: "rgba(245, 240, 232, 0.45)" }}>
                奄美空港からお車で約45分 / 名瀬市街地中心部
              </p>
              <p className="text-sm mt-1" style={{ color: "rgba(245, 240, 232, 0.45)" }}>
                駐車場はございません。近隣のコインパーキングをご利用ください
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-16 px-6 text-center" style={{ borderTop: "1px solid rgba(212, 163, 115, 0.08)" }}>
        <p className="text-3xl font-bold tracking-wide" style={{ color: "rgba(212, 163, 115, 0.3)" }}>
          Bistro ADAN
        </p>
        <p className="mt-4 text-xs" style={{ color: "rgba(245, 240, 232, 0.2)" }}>
          &copy; 2026 Bistro ADAN. All rights reserved.
        </p>
        <p className="mt-2 text-xs" style={{ color: "rgba(245, 240, 232, 0.15)" }}>
          ※ これはALPACAが制作したデモサイトです。実在する店舗ではありません。
        </p>

        {/* ALPACA credit */}
        <div className="text-center mt-8 pt-6 border-t border-white/10">
          <p className="text-xs opacity-30">
            デモサイト — Designed by{" "}
            <a href="/web#gallery" className="hover:opacity-60 transition-opacity">ALPACA</a>
          </p>
        </div>
      </footer>

      {/* ===== FIXED BOTTOM CTA BAR ===== */}
      <style>{`
        @keyframes bistro-cta-slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .bistro-cta-bar {
          animation: bistro-cta-slide-up 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
      {scrollY > 500 && (
        <div
          className="bistro-cta-bar fixed bottom-0 left-0 right-0 z-40 px-4 py-3 flex items-center justify-between gap-3"
          style={{
            backgroundColor: "rgba(26, 21, 16, 0.97)",
            backdropFilter: "blur(12px)",
            borderTop: "1px solid rgba(212, 163, 115, 0.18)",
          }}
          role="complementary"
          aria-label="お問い合わせ・予約のショートカット"
        >
          <a
            href="tel:0997-XX-XXXX"
            className="flex items-center justify-center gap-2 flex-1 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 hover:opacity-80"
            style={{ backgroundColor: "#D4A373", color: "#1A1510" }}
            aria-label="電話する: 0997-XX-XXXX"
          >
            <PhoneIcon className="w-4 h-4" />
            電話する
          </a>
          <a
            href="#access"
            className="flex items-center justify-center gap-2 flex-1 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 hover:opacity-80"
            style={{ border: "1px solid rgba(212,163,115,0.5)", color: "#D4A373" }}
            aria-label="アクセス・お問い合わせへスクロール"
          >
            Web予約/お問い合わせ
          </a>
        </div>
      )}
    </div>
  );
}
