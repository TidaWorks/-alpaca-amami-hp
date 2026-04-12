"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { WaveIcon, SunIcon, MapPinIcon, PhoneIcon, ClockIcon, CarIcon } from "../components/icons";

// ─── SVG Icons ───────────────────────────────────────────────────────────────

function MailIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function StarIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function ArrowRightIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function BikeIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5.5" cy="17.5" r="3.5" />
      <circle cx="18.5" cy="17.5" r="3.5" />
      <path d="M15 6a1 1 0 0 0-1 1v5.571A2 2 0 0 1 12.143 14H9.5" />
      <path d="m9 15 3-3" />
      <path d="M5.5 14 8 9h6" />
      <path d="m14 9 1.5 3" />
    </svg>
  );
}

function UtensilsIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
  );
}

function MoonIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function BeachIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Beach umbrella pole */}
      <line x1="10" y1="8" x2="16" y2="20" />
      {/* Umbrella canopy arc */}
      <path d="M3 10 C3 5.6 6.5 2 11 2 C15.5 2 19 5.6 19 10Z" />
      {/* Horizon / waterline */}
      <line x1="1" y1="20" x2="23" y2="20" />
      {/* Wave hint */}
      <path d="M4 17 C6 15.5 8 18.5 10 17 C12 15.5 14 18.5 16 17 C18 15.5 20 17 20 17" strokeOpacity="0.55" />
    </svg>
  );
}

function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function ChevronDownIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

// ─── Particle data ───────────────────────────────────────────────────────────

// Bokeh-style glowing circles (8-15px, bright)
const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: 4 + (i * 7.1) % 93,
  size: 8 + (i * 2.3) % 8,          // 8–15px
  delay: (i * 0.75) % 7,
  duration: 9 + (i * 1.1) % 6,
  opacity: 0.55 + (i * 0.03) % 0.35, // 0.55–0.90
  // type: 0=bokeh circle, 1=petal, 2=sea-spray droplet
  type: i % 3,
}));

// Hibiscus decorative SVG paths (3 floating instances)
const HIBISCUS_INSTANCES = [
  { top: "18%", left: "7%",  delay: 0,   duration: 12, opacity: 0.18, scale: 1.1 },
  { top: "62%", left: "91%", delay: 2.5, duration: 15, opacity: 0.14, scale: 0.9 },
  { top: "38%", left: "3%",  delay: 5,   duration: 13, opacity: 0.12, scale: 1.0 },
];

// Shared journey stops data (used by both desktop and mobile layouts)
const JOURNEY_STOPS = [
  {
    step: "01",
    title: "徒歩2分でビーチ",
    desc: "目の前に広がる奄美の海。白い砂浜と透明なエメラルドブルーの海は、世界でも屈指の美しさです。朝の散歩から夕日鑑賞まで、いつでもビーチへ。",
    time: "Early morning",
    offsetY: 0,
  },
  {
    step: "02",
    title: "島料理の朝ごはん",
    desc: "地元の食材を使った奄美の郷土料理をベースにした朝食。鶏飯（けいはん）をはじめ、島野菜のおかず、奄美黒糖のデザートなど、毎朝作りたてをご提供します。",
    time: "7:30 -- 9:00",
    offsetY: 80,
  },
  {
    step: "03",
    title: "星空テラス",
    desc: "光害の少ない奄美大島の夜空は、天の川が肉眼で見えるほどの星空。屋上テラスでゆったりと星を眺める時間は、旅の忘れられない一ページになるはずです。",
    time: "After sunset",
    offsetY: -10,
  },
  {
    step: "04",
    title: "レンタサイクル無料",
    desc: "電動アシスト自転車を無料でご利用いただけます。海沿いのサイクリングロードを走り、地元の市場や隠れ家カフェを巡る島暮らし体験をお楽しみください。",
    time: "Anytime",
    offsetY: 60,
  },
];

// Shared surroundings data (used by both desktop scatter map and mobile list)
const SURROUNDINGS_DATA = [
  {
    name: "あやまる岬",
    distance: "車で約10分",
    desc: "珊瑚礁の海と太平洋が見渡せる絶景の岬。夕日スポットとして地元でも人気の場所です。",
    img: "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?auto=format&fit=crop&w=500&q=75",
    category: "観光スポット",
    top: "12%", left: "15%", rotate: -1.5, width: 200,
  },
  {
    name: "マングローブカヌー",
    distance: "車で約15分",
    desc: "日本最大級のマングローブ林を小さなカヌーで探索。神秘的な自然を間近で体感できます。",
    img: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&w=500&q=75",
    category: "アクティビティ",
    top: "8%", left: "60%", rotate: 2, width: 210,
  },
  {
    name: "大浜海浜公園",
    distance: "車で約20分",
    desc: "奄美大島屈指の美しいビーチ。エメラルドグリーンの海でシュノーケリングを楽しめます。",
    img: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=500&q=75",
    category: "ビーチ",
    top: "30%", left: "82%", rotate: -2, width: 190,
  },
  {
    name: "海洋展示館",
    distance: "車で約25分",
    desc: "大浜海浜公園内の海洋展示館。ウミガメの観察ができ、奄美の海の生き物を間近で体感できます。",
    img: "https://images.unsplash.com/photo-1544552866-d3ed42536cfd?auto=format&fit=crop&w=500&q=75",
    category: "体験施設",
    top: "60%", left: "10%", rotate: 1.5, width: 195,
  },
  {
    name: "名瀬市場通り",
    distance: "車で約30分",
    desc: "奄美の中心地にある昔ながらの商店街。黒糖焼酎や大島紬など奄美ならではのお土産が揃います。",
    img: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=500&q=75",
    category: "グルメ",
    top: "72%", left: "48%", rotate: -1, width: 205,
  },
  {
    name: "金作原原生林",
    distance: "車で約35分",
    desc: "国の天然記念物であるルリカケスが棲む原始の森。ガイドツアーで亜熱帯の自然を歩きます。",
    img: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=500&q=75",
    category: "自然",
    top: "68%", left: "78%", rotate: 1.8, width: 195,
  },
];

// ─── Gallery images list (for lightbox prev/next navigation) ─────────────────
const GALLERY_IMAGES = [
  { src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1400&q=90", alt: "奄美の海" },
  { src: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=90", alt: "客室の朝" },
  { src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1400&q=90", alt: "海の夕日" },
  { src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1400&q=90", alt: "島料理" },
  { src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=90", alt: "テラス" },
  { src: "https://images.unsplash.com/photo-1587749091230-8fdb2a5f6723?auto=format&fit=crop&w=1400&q=90", alt: "マングローブ" },
  { src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1400&q=90", alt: "テラスからの眺め" },
  { src: "https://images.unsplash.com/photo-1502673530728-f79b4cab31b1?auto=format&fit=crop&w=1400&q=90", alt: "夜の海" },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function GuesthousePage() {
  const [scrolled, setScrolled] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkin: "",
    checkout: "",
    guests: "2名",
    room: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [showCta, setShowCta] = useState(false);

  // Lightbox state — now index-based for prev/next navigation
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const lightboxSrc = lightboxIndex !== null ? GALLERY_IMAGES[lightboxIndex].src : null;
  const lightboxAlt = lightboxIndex !== null ? GALLERY_IMAGES[lightboxIndex].alt : "";

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }, []);

  const lightboxPrev = useCallback(() => {
    setLightboxIndex((prev) => prev !== null ? (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length : null);
  }, []);

  const lightboxNext = useCallback(() => {
    setLightboxIndex((prev) => prev !== null ? (prev + 1) % GALLERY_IMAGES.length : null);
  }, []);

  // Surroundings reveal state (index of visible items)
  const [visibleSpots, setVisibleSpots] = useState<Set<number>>(new Set());
  const spotRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Room showcase scroll state
  const [activeRoomSlide, setActiveRoomSlide] = useState(0);
  const roomScrollRef = useRef<HTMLDivElement | null>(null);
  const roomSlideRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Journey path animation state
  const [journeyPathAnimated, setJourneyPathAnimated] = useState(false);
  const journeyRef = useRef<HTMLDivElement | null>(null);

  // Surroundings route animation state
  const [routeAnimated, setRouteAnimated] = useState(false);
  const surroundingsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 60);
      setParallaxOffset(scrollY * 0.45);
      setShowCta(scrollY > 500);

      // Scroll progress bar
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollY / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for surrounding spots
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = spotRefs.current.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1) {
              setVisibleSpots((prev) => new Set([...prev, idx]));
            }
          }
        });
      },
      { threshold: 0.15 }
    );
    const current = spotRefs.current;
    current.forEach((el) => { if (el) observer.observe(el); });
    return () => { current.forEach((el) => { if (el) observer.unobserve(el); }); };
  }, []);

  // Intersection Observer for room showcase active slide
  useEffect(() => {
    const slides = roomSlideRefs.current;
    const root = roomScrollRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const idx = slides.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1) setActiveRoomSlide(idx);
          }
        });
      },
      { threshold: 0.5, root: root ?? null }
    );
    slides.forEach((el) => { if (el) observer.observe(el); });
    return () => { slides.forEach((el) => { if (el) observer.unobserve(el); }); };
  }, []);

  // Intersection Observer for journey path animation
  useEffect(() => {
    const el = journeyRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setJourneyPathAnimated(true);
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => { observer.unobserve(el); };
  }, []);

  // Intersection Observer for surroundings route path
  useEffect(() => {
    const el = surroundingsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setRouteAnimated(true);
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => { observer.unobserve(el); };
  }, []);

  // Lightbox keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") lightboxPrev();
      if (e.key === "ArrowRight") lightboxNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, closeLightbox, lightboxPrev, lightboxNext]);

  // Room showcase: scroll to slide
  const scrollToRoom = useCallback((idx: number) => {
    const slide = roomSlideRefs.current[idx];
    if (slide) {
      slide.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const navItems = [
    { href: "#concept", label: "コンセプト" },
    { href: "#rooms", label: "お部屋" },
    { href: "#highlights", label: "魅力" },
    { href: "#gallery", label: "ギャラリー" },
    { href: "#surroundings", label: "周辺ガイド" },
    { href: "#booking", label: "ご予約" },
    { href: "#access", label: "アクセス" },
    { href: "#contact", label: "お問い合わせ" },
  ];

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        html { scroll-behavior: smooth; }

        body {
          font-family: var(--font-noto-sans-jp), sans-serif;
          background-color: #FAFAF5;
          color: #2C2C2C;
          overflow-x: hidden;
        }

        .font-serif { font-family: var(--font-noto-serif-jp), serif; }

        .section-title {
          font-family: var(--font-noto-serif-jp), serif;
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          font-weight: 600;
          color: #1A2332;
          letter-spacing: 0.04em;
        }

        .section-title-en {
          font-family: var(--font-noto-serif-jp), serif;
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #E8A87C;
          font-weight: 400;
        }

        .nav-link {
          font-size: 0.8rem;
          letter-spacing: 0.08em;
          color: white;
          text-decoration: none;
          opacity: 0.9;
          transition: opacity 0.2s;
          padding: 4px 0;
          position: relative;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: #E8A87C;
          transition: width 0.3s;
        }

        .nav-link:hover { opacity: 1; }
        .nav-link:hover::after { width: 100%; }

        .nav-link-dark {
          color: #1A2332;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #E8A87C;
          color: white;
          padding: 14px 32px;
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: background 0.3s, transform 0.2s;
        }

        .btn-primary:hover {
          background: #D4956A;
          transform: translateY(-1px);
        }

        .btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: white;
          padding: 13px 30px;
          font-size: 0.9rem;
          font-weight: 400;
          letter-spacing: 0.06em;
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.6);
          cursor: pointer;
          transition: background 0.3s, border-color 0.3s;
        }

        .btn-outline:hover {
          background: rgba(255,255,255,0.1);
          border-color: white;
        }

        /* ── Room Showcase ── */
        .room-showcase-track {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .room-showcase-track::-webkit-scrollbar {
          display: none;
        }

        .room-showcase-slide {
          flex: 0 0 100%;
          width: 100%;
          scroll-snap-align: start;
          position: relative;
          height: 90vh;
          min-height: 560px;
          display: flex;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .room-showcase-slide {
            flex-direction: column;
            height: auto;
          }
        }

        .room-slide-photo {
          position: relative;
          width: 70%;
          flex-shrink: 0;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .room-slide-photo {
            width: 100%;
            height: 60vw;
            min-height: 240px;
          }
        }

        @keyframes roomKenBurns {
          0%   { transform: scale(1); }
          100% { transform: scale(1.08); }
        }

        .room-slide-photo-active img {
          animation: roomKenBurns 12s ease-in-out infinite alternate;
        }

        .room-slide-details {
          flex: 1;
          background: rgba(26, 35, 50, 0.82);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 48px 44px;
          position: relative;
        }

        @media (max-width: 768px) {
          .room-slide-details {
            padding: 32px 24px;
            backdrop-filter: none;
            -webkit-backdrop-filter: none;
            background: #1A2332;
          }
        }

        /* ── Highlights Journey Path ── */
        .journey-path-svg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: visible;
        }

        .journey-path-line {
          fill: none;
          stroke: url(#journeyGradient);
          stroke-width: 3;
          stroke-dasharray: 1200;
          stroke-dashoffset: 1200;
          stroke-linecap: round;
          transition: stroke-dashoffset 2.2s ease-out;
          filter: drop-shadow(0 0 4px rgba(232,168,124,0.55));
        }

        .journey-path-line.animated {
          stroke-dashoffset: 0;
        }

        /* Journey stop decorative node pulse */
        @keyframes nodeRipple {
          0%   { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.2); opacity: 0; }
        }

        .journey-node-ripple {
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          border: 2px solid rgba(232,168,124,0.5);
          animation: nodeRipple 2s ease-out infinite;
          pointer-events: none;
        }

        .journey-stop {
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .journey-stop-node {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          transition: background 0.4s, border-color 0.4s, transform 0.4s;
          cursor: default;
          position: relative;
          z-index: 2;
        }

        .journey-stop-node:hover {
          transform: scale(1.1);
        }

        @media (max-width: 700px) {
          .journey-desktop { display: none !important; }
          .journey-mobile { display: flex !important; }
        }

        @media (min-width: 701px) {
          .journey-desktop { display: block !important; }
          .journey-mobile { display: none !important; }
        }

        /* ── Gallery responsive grid ── */
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          grid-template-rows: auto;
          gap: 8px;
        }

        @media (min-width: 600px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .gallery-grid .gallery-span2 {
            grid-row: span 2;
          }
        }

        @media (min-width: 900px) {
          .gallery-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .gallery-item {
          overflow: hidden;
          cursor: pointer;
        }

        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .gallery-item:hover img {
          transform: scale(1.06);
        }

        .form-input {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #DDD;
          background: white;
          font-family: var(--font-noto-sans-jp), sans-serif;
          font-size: 0.9rem;
          color: #2C2C2C;
          outline: none;
          transition: border-color 0.2s;
          border-radius: 0;
          -webkit-appearance: none;
        }

        .form-input:focus {
          border-color: #E8A87C;
        }

        .form-label {
          display: block;
          font-size: 0.8rem;
          font-weight: 500;
          color: #666;
          letter-spacing: 0.06em;
          margin-bottom: 6px;
        }

        .divider {
          width: 40px;
          height: 2px;
          background: #E8A87C;
          margin: 12px auto 0;
        }

        .divider-left {
          margin-left: 0;
        }

        .price-badge {
          display: inline-block;
          background: #FFF3EC;
          color: #E8A87C;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          padding: 4px 10px;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          letter-spacing: 0.08em;
          color: white;
          text-decoration: none;
          opacity: 0.85;
          transition: opacity 0.2s;
          white-space: nowrap;
        }

        .back-link-dark { color: #1A2332; }

        .back-link:hover { opacity: 1; }

        .attraction-card {
          background: white;
          padding: 24px;
          transition: box-shadow 0.3s, transform 0.3s;
        }

        .attraction-card:hover {
          box-shadow: 0 8px 24px rgba(26,35,50,0.1);
          transform: translateY(-3px);
        }

        /* ── Surrounding Map Scatter ── */
        .map-scatter-wrapper {
          position: relative;
          min-height: 720px;
        }

        @media (max-width: 900px) {
          .map-scatter-wrapper {
            min-height: auto;
          }
        }

        .map-spot-card {
          position: absolute;
          z-index: 2;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }

        .map-spot-card:hover {
          z-index: 10;
          transform: translate(-50%, -50%) rotate(0deg) scale(1.05) !important;
          box-shadow: 0 16px 40px rgba(26,35,50,0.18) !important;
        }

        .map-spot-card .distance-badge {
          position: absolute;
          top: -10px;
          right: -10px;
          background: #E8A87C;
          color: white;
          font-size: 0.6rem;
          font-weight: 600;
          padding: 3px 8px;
          letter-spacing: 0.04em;
          z-index: 3;
          white-space: nowrap;
        }

        @media (max-width: 900px) {
          .map-scatter-desktop { display: none !important; }
          .map-scatter-mobile { display: flex !important; }
        }

        @media (min-width: 901px) {
          .map-scatter-desktop { display: block !important; }
          .map-scatter-mobile { display: none !important; }
        }

        @media (max-width: 768px) {
          .desktop-nav { display: none; }
          .mobile-menu-btn { display: flex !important; }
        }

        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
          .mobile-menu { display: none !important; }
        }

        /* ── Ken Burns ── */
        @keyframes kenBurns {
          0%   { transform: scale(1); }
          100% { transform: scale(1.1); }
        }

        .hero-img-kenburns {
          animation: kenBurns 20s ease-in-out infinite alternate;
        }

        /* ── Secondary parallax overlay ── */
        .hero-overlay-secondary {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(135,206,235,0.18) 0%, rgba(232,168,124,0.12) 50%, transparent 100%);
          pointer-events: none;
          will-change: transform;
        }

        /* ── Text reveal ── */
        @keyframes wordReveal {
          0%   { opacity: 0; filter: blur(8px); transform: translateY(10px); }
          100% { opacity: 1; filter: blur(0); transform: translateY(0); }
        }

        .tagline-word {
          display: inline-block;
          opacity: 0;
          animation: wordReveal 0.7s ease forwards;
        }

        /* ── Gallery lightbox ── */
        .gallery-item-clickable {
          overflow: hidden;
          cursor: zoom-in;
        }

        .gallery-item-clickable img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .gallery-item-clickable:hover img {
          transform: scale(1.06);
        }

        @keyframes lightboxFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        @keyframes lightboxImgIn {
          from { opacity: 0; transform: scale(0.85); }
          to   { opacity: 1; transform: scale(1); }
        }

        .lightbox-overlay {
          position: fixed;
          inset: 0;
          z-index: 9000;
          background: rgba(10,16,26,0.92);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: lightboxFadeIn 0.25s ease forwards;
          cursor: zoom-out;
        }

        .lightbox-img {
          max-width: 92vw;
          max-height: 88vh;
          object-fit: contain;
          border-radius: 2px;
          box-shadow: 0 32px 80px rgba(0,0,0,0.6);
          animation: lightboxImgIn 0.3s ease forwards;
          cursor: default;
        }

        .lightbox-close {
          position: fixed;
          top: 24px;
          right: 28px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          color: white;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 1.2rem;
          transition: background 0.2s;
          z-index: 9001;
        }

        .lightbox-close:hover {
          background: rgba(232,168,124,0.4);
        }

        /* ── Surrounding spots stagger reveal ── */
        @keyframes spotFromLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        @keyframes spotFromRight {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .spot-card {
          opacity: 0;
        }

        .spot-card.visible-left {
          animation: spotFromLeft 0.65s ease forwards;
        }

        .spot-card.visible-right {
          animation: spotFromRight 0.65s ease forwards;
        }

        .mobile-spot-item {
          display: flex;
          gap: 16px;
          padding: 16px 0;
          border-bottom: 1px solid rgba(26,35,50,0.06);
          align-items: flex-start;
        }

        .mobile-spot-item:last-child {
          border-bottom: none;
        }

        .mobile-spot-photo {
          width: 80px;
          height: 80px;
          flex-shrink: 0;
          overflow: hidden;
        }

        .mobile-spot-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* ── Particles ── */
        @keyframes particleFloat {
          0%   { transform: translateY(0) translateX(0) scale(1); opacity: var(--p-opacity); }
          25%  { transform: translateY(-28%) translateX(10px) scale(1.15); opacity: calc(var(--p-opacity) * 1.1); }
          55%  { transform: translateY(-62%) translateX(-8px) scale(0.92); }
          100% { transform: translateY(-115%) translateX(4px) scale(1.05); opacity: 0; }
        }

        @keyframes petalDrift {
          0%   { transform: translateY(0) translateX(0) rotate(0deg) scale(1); opacity: var(--p-opacity); }
          30%  { transform: translateY(-25%) translateX(14px) rotate(45deg) scale(1.1); }
          65%  { transform: translateY(-60%) translateX(-10px) rotate(120deg) scale(0.9); }
          100% { transform: translateY(-110%) translateX(6px) rotate(200deg) scale(0.8); opacity: 0; }
        }

        @keyframes sprayBurst {
          0%   { transform: translateY(0) translateX(0) scaleX(1.6) scaleY(0.7); opacity: var(--p-opacity); }
          40%  { transform: translateY(-30%) translateX(-12px) scaleX(1) scaleY(1); opacity: calc(var(--p-opacity) * 1.2); }
          100% { transform: translateY(-100%) translateX(8px) scaleX(0.6) scaleY(1.4); opacity: 0; }
        }

        .hero-particle {
          position: absolute;
          pointer-events: none;
        }

        .hero-particle-bokeh {
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, rgba(255,255,255,1) 0%, rgba(255,245,220,0.9) 40%, rgba(232,168,124,0.4) 70%, transparent 100%);
          box-shadow: 0 0 var(--p-glow) var(--p-glow-half) rgba(255,255,255,0.7), 0 0 calc(var(--p-glow) * 2) var(--p-glow) rgba(232,200,160,0.4);
          animation: particleFloat var(--p-duration) ease-in var(--p-delay) infinite;
        }

        .hero-particle-petal {
          border-radius: 80% 0 80% 0;
          background: linear-gradient(135deg, rgba(255,180,200,0.9) 0%, rgba(255,120,160,0.7) 50%, rgba(232,80,120,0.4) 100%);
          box-shadow: 0 0 6px 2px rgba(255,150,180,0.5);
          animation: petalDrift var(--p-duration) ease-in var(--p-delay) infinite;
        }

        .hero-particle-spray {
          border-radius: 50% 50% 50% 0;
          background: radial-gradient(circle, rgba(200,235,255,0.95) 0%, rgba(135,206,235,0.7) 60%, transparent 100%);
          box-shadow: 0 0 5px 1px rgba(135,206,235,0.6);
          animation: sprayBurst var(--p-duration) ease-in var(--p-delay) infinite;
        }

        /* ── Hibiscus floating animation ── */
        @keyframes hibiscusDrift {
          0%   { transform: translateY(0) rotate(-5deg) scale(var(--h-scale)); }
          40%  { transform: translateY(-18px) rotate(4deg) scale(calc(var(--h-scale) * 1.05)); }
          100% { transform: translateY(0) rotate(-5deg) scale(var(--h-scale)); }
        }

        .hibiscus-float {
          position: absolute;
          pointer-events: none;
          animation: hibiscusDrift var(--h-duration) ease-in-out var(--h-delay) infinite;
        }

        /* ── Palm tree decoration ── */
        .palm-bg-deco {
          position: absolute;
          bottom: 0;
          pointer-events: none;
          opacity: 0.06;
        }

        /* ── Wave section divider ── */
        .wave-divider {
          position: relative;
          height: 64px;
          overflow: hidden;
          pointer-events: none;
        }

        .wave-divider svg {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 100%;
        }

        /* ── Seashell decoration ── */
        @keyframes shellRock {
          0%, 100% { transform: rotate(-4deg) scale(1); }
          50%       { transform: rotate(4deg) scale(1.04); }
        }

        .seashell-deco {
          position: absolute;
          pointer-events: none;
          opacity: 0.15;
          animation: shellRock 4s ease-in-out infinite;
        }

        /* ── Scroll progress bar ── */
        .scroll-progress-bar {
          position: fixed;
          top: 0;
          left: 0;
          height: 4px;
          background: linear-gradient(to right, #87CEEB, #E8A87C, #D4956A);
          z-index: 200;
          transition: width 0.1s linear;
          pointer-events: none;
          box-shadow: 0 0 10px rgba(232,168,124,0.8), 0 0 20px rgba(232,168,124,0.4);
        }

        /* Surfboard icon at scroll bar leading edge */
        .scroll-progress-bar::after {
          content: '';
          position: absolute;
          right: -1px;
          top: 50%;
          transform: translateY(-50%);
          width: 16px;
          height: 8px;
          background: #E8A87C;
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          box-shadow: 0 0 8px rgba(232,168,124,0.9);
        }

        /* ── Hero vignette pulse ── */
        @keyframes vignettePulse {
          0%,100% { opacity: 0.55; }
          50%      { opacity: 0.72; }
        }

        .hero-vignette-pulse {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 55%, transparent 38%, rgba(10,14,22,0.72) 100%);
          pointer-events: none;
          animation: vignettePulse 6s ease-in-out infinite;
        }

        /* ── Room slide warm glow on hover ── */
        .room-showcase-slide {
          transition: filter 0.4s ease;
        }

        .room-showcase-slide:hover .room-slide-photo img {
          filter: saturate(1.2) brightness(1.04);
          transition: filter 0.5s ease, transform 0.6s ease;
        }

        .room-showcase-slide:hover .room-slide-details {
          box-shadow: inset 0 0 60px rgba(232,168,124,0.08);
        }

        .room-slide-details {
          transition: box-shadow 0.4s ease;
        }

        /* ── Lightbox nav arrows ── */
        .lightbox-arrow {
          position: fixed;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255,255,255,0.09);
          border: 1px solid rgba(255,255,255,0.18);
          color: white;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 9001;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
          backdrop-filter: blur(8px);
        }

        .lightbox-arrow:hover {
          background: rgba(232,168,124,0.35);
          border-color: rgba(232,168,124,0.6);
          transform: translateY(-50%) scale(1.08);
        }

        .lightbox-arrow-prev { left: 24px; }
        .lightbox-arrow-next { right: 24px; }

        .lightbox-counter {
          position: fixed;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 9001;
          font-size: 0.72rem;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.5);
          pointer-events: none;
        }

        /* ── Surroundings animated dotted path ── */
        @keyframes routeDraw {
          from { stroke-dashoffset: 2400; }
          to   { stroke-dashoffset: 0; }
        }

        .surroundings-route-path {
          fill: none;
          stroke: #E8A87C;
          stroke-width: 2;
          stroke-dasharray: 6 10;
          stroke-dashoffset: 2400;
          stroke-linecap: round;
          opacity: 0.55;
          transition: none;
        }

        .surroundings-route-path.route-animated {
          animation: routeDraw 3.2s ease-out forwards;
        }

        @keyframes routeWalkerFade {
          from { opacity: 0; }
          to   { opacity: 0.9; }
        }

        .route-walker-dot {
          animation: routeWalkerFade 0.4s ease-out 3s forwards;
          opacity: 0;
        }
        input:focus, textarea:focus, select:focus {
          border-color: #E8A87C !important;
          box-shadow: 0 0 0 3px rgba(232,168,124,0.18) !important;
          outline: none !important;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        button[type="submit"] {
          transition: transform 0.2s ease, box-shadow 0.2s ease !important;
        }
        button[type="submit"]:hover { transform: scale(1.03) !important; }
        button[type="submit"]:active { transform: scale(0.98) !important; }
      `}</style>

      {/* ── Scroll Progress Bar ─────────────────────────────────────────────── */}
      <div
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* ── Lightbox ─────────────────────────────────────────────────────────── */}
      {lightboxSrc && lightboxIndex !== null && (
        <div
          className="lightbox-overlay"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="拡大写真"
        >
          {/* Close */}
          <button
            className="lightbox-close"
            onClick={closeLightbox}
            aria-label="閉じる"
          >
            &#215;
          </button>

          {/* Prev arrow */}
          <button
            className="lightbox-arrow lightbox-arrow-prev"
            onClick={(e) => { e.stopPropagation(); lightboxPrev(); }}
            aria-label="前の写真"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Image */}
          <Image
            src={lightboxSrc}
            alt={lightboxAlt}
            width={1200}
            height={800}
            className="lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next arrow */}
          <button
            className="lightbox-arrow lightbox-arrow-next"
            onClick={(e) => { e.stopPropagation(); lightboxNext(); }}
            aria-label="次の写真"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Counter */}
          <div className="lightbox-counter" onClick={(e) => e.stopPropagation()}>
            {lightboxIndex + 1} / {GALLERY_IMAGES.length}
          </div>
        </div>
      )}

      {/* ── Fixed Header ───────────────────────────────────────────────────── */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: "background 0.4s, box-shadow 0.4s",
          background: scrolled ? "rgba(255,250,245,0.97)" : "transparent",
          boxShadow: scrolled ? "0 1px 20px rgba(26,35,50,0.08)" : "none",
          backdropFilter: scrolled ? "blur(8px)" : "none",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
            {/* Logo */}
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
              <span
                className="font-serif"
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  color: scrolled ? "#1A2332" : "white",
                  letterSpacing: "0.08em",
                  transition: "color 0.4s",
                }}
              >
                珊瑚の宿 いそかぜ
              </span>
              <span
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.15em",
                  color: scrolled ? "#E8A87C" : "rgba(232,168,124,0.9)",
                  transition: "color 0.4s",
                  textTransform: "uppercase",
                }}
              >
                Sango no Yado Isokaze
              </span>
            </div>

            {/* Desktop Nav */}
            <nav className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 24 }}>
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`nav-link ${scrolled ? "nav-link-dark" : ""}`}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                style={{
                  background: "#E8A87C",
                  color: "white",
                  padding: "8px 18px",
                  fontSize: "0.8rem",
                  letterSpacing: "0.06em",
                  textDecoration: "none",
                  transition: "background 0.3s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "#D4956A")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "#E8A87C")}
              >
                予約相談
              </a>
              <a
                href="/web#gallery"
                className={`back-link ${scrolled ? "back-link-dark" : ""}`}
                style={{ color: scrolled ? "#1A2332" : "white", borderLeft: `1px solid ${scrolled ? "#CCC" : "rgba(255,255,255,0.3)"}`, paddingLeft: 16, marginLeft: 4, opacity: 0.7, fontSize: "0.72rem" }}
              >
                &#8592; ギャラリーに戻る
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="mobile-menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                gap: 5,
                padding: 4,
              }}
              aria-label="メニュー"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    display: "block",
                    width: 22,
                    height: 1.5,
                    background: scrolled ? "#1A2332" : "white",
                    transition: "background 0.4s",
                  }}
                />
              ))}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            className="mobile-menu"
            style={{
              background: "rgba(255,250,245,0.98)",
              borderTop: "1px solid #EEE",
              padding: "16px 24px 24px",
            }}
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "12px 0",
                  color: "#1A2332",
                  fontSize: "0.9rem",
                  letterSpacing: "0.06em",
                  textDecoration: "none",
                  borderBottom: "1px solid #F0EDE8",
                }}
              >
                {item.label}
              </a>
            ))}
            <a
              href="/web#gallery"
              style={{
                display: "block",
                paddingTop: 16,
                color: "#888",
                fontSize: "0.8rem",
                textDecoration: "none",
              }}
            >
              &#8592; ギャラリーに戻る
            </a>
          </div>
        )}
      </header>

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          minHeight: 600,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Parallax Background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `translateY(${parallaxOffset}px)`,
            willChange: "transform",
          }}
        >
          <Image
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85"
            alt="奄美大島の海"
            width={1200}
            height={800}
            priority
            className="hero-img-kenburns"
            style={{
              width: "100%",
              height: "115%",
              objectFit: "cover",
              objectPosition: "center 30%",
              display: "block",
              marginTop: "-7.5%",
            }}
          />
        </div>

        {/* Primary Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(26,35,50,0.35) 0%, rgba(26,35,50,0.55) 60%, rgba(26,35,50,0.75) 100%)",
          }}
        />

        {/* Secondary Parallax Overlay (moves at different speed) */}
        <div
          className="hero-overlay-secondary"
          style={{
            transform: `translateY(${parallaxOffset * 0.2}px)`,
            willChange: "transform",
          }}
        />

        {/* Pulsing vignette for cinematic depth */}
        <div className="hero-vignette-pulse" aria-hidden="true" />

        {/* Ambient Particles — bokeh + petals + sea spray */}
        {PARTICLES.map((p) => {
          const glowPx = Math.round(p.size * 1.8);
          const petalW = p.size;
          const petalH = Math.round(p.size * 0.55);
          const sprayW = Math.round(p.size * 1.4);
          const sprayH = Math.round(p.size * 0.8);
          return (
            <div
              key={p.id}
              className={`hero-particle ${p.type === 0 ? "hero-particle-bokeh" : p.type === 1 ? "hero-particle-petal" : "hero-particle-spray"}`}
              style={{
                left: `${p.left}%`,
                bottom: `${8 + (p.id * 5.7) % 30}%`,
                width:  p.type === 1 ? petalW  : p.type === 2 ? sprayW  : p.size,
                height: p.type === 1 ? petalH  : p.type === 2 ? sprayH  : p.size,
                ["--p-opacity" as string]:   p.opacity,
                ["--p-duration" as string]:  `${p.duration}s`,
                ["--p-delay" as string]:     `${p.delay}s`,
                ["--p-glow" as string]:      `${glowPx}px`,
                ["--p-glow-half" as string]: `${Math.round(glowPx / 2)}px`,
              }}
            />
          );
        })}

        {/* Palm Tree Silhouette (bottom-right, subtle) */}
        <svg
          className="palm-bg-deco"
          viewBox="0 0 160 280"
          style={{ right: "2%", width: 140, height: 260, fill: "rgba(255,255,255,0.9)" }}
          aria-hidden="true"
        >
          {/* trunk */}
          <path d="M76 280 C74 220, 70 160, 80 100 C90 160, 86 220, 84 280Z" />
          {/* fronds */}
          <path d="M80 110 C40 70, 0 90, 10 70 C30 50, 70 80, 80 100Z" />
          <path d="M80 110 C120 70, 155 90, 148 70 C130 50, 90 80, 80 100Z" />
          <path d="M80 105 C50 55, 15 40, 20 20 C40 10, 72 70, 80 95Z" />
          <path d="M80 105 C110 55, 145 40, 138 20 C118 10, 88 70, 80 95Z" />
          <path d="M80 100 C68 50, 55 10, 38 0 C45 20, 70 65, 78 95Z" />
          <path d="M80 100 C92 50, 104 10, 120 0 C115 20, 90 65, 82 95Z" />
        </svg>

        {/* Hibiscus floating decorations */}
        {HIBISCUS_INSTANCES.map((h, hi) => (
          <svg
            key={hi}
            className="hibiscus-float"
            viewBox="0 0 80 80"
            style={{
              top: h.top,
              left: h.left,
              width: 64,
              height: 64,
              opacity: h.opacity,
              ["--h-scale" as string]: h.scale,
              ["--h-duration" as string]: `${h.duration}s`,
              ["--h-delay" as string]: `${h.delay}s`,
              zIndex: 1,
            }}
            aria-hidden="true"
          >
            {/* 5 petals */}
            <g transform="translate(40,40)">
              {[0, 72, 144, 216, 288].map((angle, pi) => (
                <ellipse
                  key={pi}
                  cx={0} cy={-18}
                  rx={9} ry={16}
                  fill="rgba(255,80,120,0.85)"
                  transform={`rotate(${angle})`}
                />
              ))}
              {/* center stamen */}
              <circle cx={0} cy={0} r={6} fill="rgba(255,220,50,0.95)" />
              <circle cx={0} cy={0} r={3} fill="rgba(255,160,30,1)" />
            </g>
          </svg>
        ))}

        {/* Hero Content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            padding: "0 24px",
            maxWidth: 760,
          }}
        >
          <p
            style={{
              fontSize: "0.72rem",
              letterSpacing: "0.25em",
              color: "#E8A87C",
              textTransform: "uppercase",
              marginBottom: 20,
              fontWeight: 400,
            }}
          >
            Amami Oshima / Guesthouse
          </p>
          <h1
            className="font-serif"
            style={{
              fontSize: "clamp(2.2rem, 6vw, 4rem)",
              fontWeight: 600,
              color: "white",
              letterSpacing: "0.08em",
              lineHeight: 1.3,
              marginBottom: 20,
              textShadow: "0 2px 20px rgba(0,0,0,0.3)",
            }}
          >
            珊瑚の宿 いそかぜ
          </h1>
          <p
            className="font-serif"
            style={{
              fontSize: "clamp(0.95rem, 2.5vw, 1.25rem)",
              color: "rgba(255,255,255,0.88)",
              letterSpacing: "0.12em",
              lineHeight: 1.8,
              marginBottom: 40,
              fontWeight: 300,
            }}
          >
            {["波音と", "ともに", "目覚める、", "奄美の朝"].map((word, i) => (
              <span
                key={i}
                className="tagline-word"
                style={{ animationDelay: `${0.6 + i * 0.18}s`, opacity: 0 }}
              >
                {word}
              </span>
            ))}
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#contact" className="btn-primary">
              予約相談はこちら <ArrowRightIcon />
            </a>
            <a href="#rooms" className="btn-outline">
              お部屋を見る
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            animation: "bounce 2s ease-in-out infinite",
          }}
        >
          <span
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.6)",
              textTransform: "uppercase",
            }}
          >
            Scroll
          </span>
          <ChevronDownIcon className="w-4 h-4" />
          <style>{`
            @keyframes bounce {
              0%, 100% { transform: translateX(-50%) translateY(0); }
              50% { transform: translateX(-50%) translateY(6px); }
            }
          `}</style>
        </div>
      </section>

      {/* ── Wave Divider (Hero → Concept) ─────────────────────────────────── */}
      <div style={{ background: "#FAFAF5", marginTop: -2, lineHeight: 0 }} aria-hidden="true">
        <svg viewBox="0 0 1440 72" preserveAspectRatio="none" style={{ width: "100%", height: 72, display: "block" }}>
          <path d="M0,36 C240,72 480,0 720,36 C960,72 1200,0 1440,36 L1440,72 L0,72Z" fill="#1A2332" opacity="0.06" />
          <path d="M0,48 C200,20 400,68 720,42 C1040,16 1240,64 1440,44 L1440,72 L0,72Z" fill="#E8A87C" opacity="0.04" />
        </svg>
      </div>

      {/* ── Concept ─────────────────────────────────────────────────────────── */}
      <section id="concept" style={{ background: "#FAFAF5", padding: "100px 24px", position: "relative", overflow: "hidden" }}>
        {/* Seashell decorations */}
        <svg className="seashell-deco" viewBox="0 0 60 60" style={{ right: "4%", top: "8%", width: 54, animationDelay: "0s" }} aria-hidden="true">
          <path d="M30 52 C10 52, 4 36, 10 22 C16 8, 30 4, 44 10 C58 16, 58 36, 44 46 C38 50, 34 52, 30 52Z" fill="none" stroke="#E8A87C" strokeWidth="1.5" />
          <path d="M30 52 C24 40, 14 32, 14 22 C14 14, 22 8, 30 8" fill="none" stroke="#E8A87C" strokeWidth="1" strokeOpacity="0.6" />
          <path d="M30 52 C36 40, 46 32, 46 22 C46 14, 38 8, 30 8" fill="none" stroke="#E8A87C" strokeWidth="1" strokeOpacity="0.6" />
          <path d="M30 52 C30 36, 30 18, 30 8" fill="none" stroke="#E8A87C" strokeWidth="0.8" strokeOpacity="0.4" />
          <circle cx="30" cy="8" r="3" fill="#E8A87C" opacity="0.5" />
        </svg>
        <svg className="seashell-deco" viewBox="0 0 60 60" style={{ left: "2%", bottom: "12%", width: 40, animationDelay: "1.5s" }} aria-hidden="true">
          <path d="M30 52 C10 52, 4 36, 10 22 C16 8, 30 4, 44 10 C58 16, 58 36, 44 46 C38 50, 34 52, 30 52Z" fill="none" stroke="#87CEEB" strokeWidth="1.5" />
          <path d="M30 52 C30 36, 30 18, 30 8" fill="none" stroke="#87CEEB" strokeWidth="0.8" strokeOpacity="0.4" />
          <circle cx="30" cy="8" r="3" fill="#87CEEB" opacity="0.5" />
        </svg>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "64px",
              alignItems: "center",
            }}
          >
            {/* Text */}
            <div>
              <p className="section-title-en" style={{ marginBottom: 12 }}>Concept</p>
              <h2 className="section-title" style={{ marginBottom: 8 }}>コンセプト</h2>
              <div className="divider divider-left" style={{ marginBottom: 32 }} />
              <p
                className="font-serif"
                style={{
                  fontSize: "1.3rem",
                  color: "#1A2332",
                  lineHeight: 1.7,
                  letterSpacing: "0.04em",
                  marginBottom: 24,
                  fontWeight: 400,
                }}
              >
                島の暮らしに、そっと溶け込む滞在を。
              </p>
              <p
                style={{
                  fontSize: "0.92rem",
                  color: "#555",
                  lineHeight: 2,
                  marginBottom: 20,
                  letterSpacing: "0.02em",
                }}
              >
                いそかぜは、奄美大島北部の静かな海沿いに佇む古民家を改装したゲストハウスです。
                縁側から見える紺碧の海、朝の潮風、島の食材を使った手作りの朝ごはん。
                ここでは、時間がゆっくりと流れます。
              </p>
              <p
                style={{
                  fontSize: "0.92rem",
                  color: "#555",
                  lineHeight: 2,
                  letterSpacing: "0.02em",
                }}
              >
                ビーチまで徒歩2分。夜は満天の星空を眺めながら、日常の喧騒を忘れてください。
                奄美の自然と文化を、もっと深く体験する旅のベースとして、ぜひ「いそかぜ」をご利用ください。
              </p>
              <div style={{ marginTop: 32, display: "flex", gap: 32 }}>
                {[
                  { num: "2003", label: "創業年" },
                  { num: "4.9", label: "平均評価" },
                  { num: "3,000+", label: "ご宿泊実績" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p
                      className="font-serif"
                      style={{ fontSize: "1.8rem", fontWeight: 600, color: "#E8A87C", lineHeight: 1 }}
                    >
                      {stat.num}
                    </p>
                    <p style={{ fontSize: "0.72rem", color: "#888", letterSpacing: "0.1em", marginTop: 4 }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div style={{ position: "relative" }}>
              <div
                style={{
                  width: "100%",
                  paddingTop: "120%",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1535827841776-24afc1e255ac?auto=format&fit=crop&w=700&q=80"
                  alt="いそかぜの縁側"
                  width={800}
                  height={600}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              {/* Accent box */}
              <div
                style={{
                  position: "absolute",
                  bottom: -20,
                  left: -20,
                  width: 120,
                  height: 120,
                  background: "#E8A87C",
                  opacity: 0.15,
                  zIndex: -1,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: -16,
                  right: -16,
                  width: 80,
                  height: 80,
                  background: "#87CEEB",
                  opacity: 0.2,
                  zIndex: -1,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Rooms ────────────────────────────────────────────────────────────── */}
      <section id="rooms" style={{ background: "#0D1520", position: "relative", overflow: "hidden" }}>
        {/* Section header */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            padding: "72px 40px 40px",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 20,
            maxWidth: 1400,
            margin: "0 auto",
          }}
        >
          <div>
            <p style={{ fontSize: "0.72rem", letterSpacing: "0.22em", color: "#E8A87C", textTransform: "uppercase", marginBottom: 10 }}>Rooms</p>
            <h2
              className="font-serif"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 600, color: "white", letterSpacing: "0.04em", lineHeight: 1.2, marginBottom: 0 }}
            >
              お部屋
            </h2>
          </div>
          <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.8, maxWidth: 360 }}>
            全3タイプのお部屋をご用意しています。どのお部屋からも、奄美の自然を感じることができます。
          </p>
        </div>

        {/* Horizontal scroll showcase */}
        <div
          className="room-showcase-track"
          ref={roomScrollRef}
          style={{ position: "relative" }}
        >
          {[
            {
              name: "和室 オーシャンビュー",
              nameEn: "Japanese Room / Ocean View",
              img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1400&q=85",
              capacity: "1〜3名",
              size: "18畳",
              amenities: ["オーシャンビュー", "縁側付き", "エアコン", "Wi-Fi", "バス・トイレ"],
              price: "¥12,000〜",
              priceNote: "/ 名 (朝食込み)",
              badge: "人気 No.1",
              desc: "縁側から広がる奄美の海。朝の光が畳の上に落ちる、静かで豊かな和の時間をお過ごしください。",
            },
            {
              name: "洋室 ガーデンビュー",
              nameEn: "Western Room / Garden View",
              img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1400&q=85",
              capacity: "1〜2名",
              size: "14m²",
              amenities: ["ガーデンビュー", "デスク付き", "エアコン", "Wi-Fi", "バス・トイレ"],
              price: "¥9,800〜",
              priceNote: "/ 名 (朝食込み)",
              badge: null,
              desc: "南国の緑に包まれた落ち着いた洋室。長期滞在やワーケーションにも対応するデスクをご用意しています。",
            },
            {
              name: "ファミリールーム",
              nameEn: "Family Room",
              img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=85",
              capacity: "2〜5名",
              size: "28畳",
              amenities: ["半露天バス", "リビングスペース", "エアコン", "Wi-Fi", "ロフト付き"],
              price: "¥30,000〜",
              priceNote: "/ 室 (朝食込み)",
              badge: "グループ向き",
              desc: "広々としたリビングスペースとロフトを備えた特別室。半露天バスで星空を眺める贅沢な夜をどうぞ。",
            },
          ].map((room, idx) => (
            <div
              key={room.name}
              className="room-showcase-slide"
              ref={(el) => { roomSlideRefs.current[idx] = el; }}
            >
              {/* Photo 70% */}
              <div
                className={`room-slide-photo${activeRoomSlide === idx ? " room-slide-photo-active" : ""}`}
              >
                <Image
                  src={room.img}
                  alt={room.name}
                  width={800}
                  height={600}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transformOrigin: "center center",
                  }}
                />
                {/* Dark gradient toward details panel */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to right, transparent 50%, rgba(13,21,32,0.55) 100%)",
                    pointerEvents: "none",
                  }}
                />
                {/* Slide index counter */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 32,
                    left: 36,
                    display: "flex",
                    alignItems: "baseline",
                    gap: 4,
                  }}
                >
                  <span
                    className="font-serif"
                    style={{ fontSize: "2.4rem", fontWeight: 600, color: "rgba(255,255,255,0.18)", lineHeight: 1 }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>
                    / 03
                  </span>
                </div>
              </div>

              {/* Details panel 30% */}
              <div className="room-slide-details">
                {room.badge && (
                  <div
                    style={{
                      display: "inline-block",
                      background: "#E8A87C",
                      color: "white",
                      fontSize: "0.65rem",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      padding: "4px 12px",
                      marginBottom: 20,
                      alignSelf: "flex-start",
                    }}
                  >
                    {room.badge}
                  </div>
                )}
                {!room.badge && <div style={{ marginBottom: 20, height: 22 }} />}

                <p style={{ fontSize: "0.65rem", letterSpacing: "0.18em", color: "#E8A87C", textTransform: "uppercase", marginBottom: 10 }}>
                  {room.nameEn}
                </p>
                <h3
                  className="font-serif"
                  style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)", color: "white", fontWeight: 600, marginBottom: 16, letterSpacing: "0.04em", lineHeight: 1.3 }}
                >
                  {room.name}
                </h3>
                <div
                  style={{
                    width: 32,
                    height: 1,
                    background: "#E8A87C",
                    marginBottom: 20,
                  }}
                />
                <p
                  style={{
                    fontSize: "0.84rem",
                    color: "rgba(255,255,255,0.65)",
                    lineHeight: 1.85,
                    marginBottom: 28,
                    letterSpacing: "0.02em",
                  }}
                >
                  {room.desc}
                </p>

                {/* Specs */}
                <div style={{ display: "flex", gap: 24, marginBottom: 24 }}>
                  <div>
                    <p style={{ fontSize: "0.62rem", letterSpacing: "0.12em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", marginBottom: 4 }}>定員</p>
                    <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>{room.capacity}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: "0.62rem", letterSpacing: "0.12em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", marginBottom: 4 }}>広さ</p>
                    <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>{room.size}</p>
                  </div>
                </div>

                {/* Amenity tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 32 }}>
                  {room.amenities.map((a) => (
                    <span
                      key={a}
                      style={{
                        fontSize: "0.68rem",
                        color: "rgba(255,255,255,0.55)",
                        background: "rgba(255,255,255,0.07)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        padding: "3px 9px",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {a}
                    </span>
                  ))}
                </div>

                {/* Price */}
                <div
                  style={{
                    borderTop: "1px solid rgba(255,255,255,0.1)",
                    paddingTop: 24,
                    display: "flex",
                    alignItems: "baseline",
                    gap: 8,
                    marginBottom: 28,
                  }}
                >
                  <span
                    className="font-serif"
                    style={{ fontSize: "2rem", fontWeight: 600, color: "#E8A87C", lineHeight: 1 }}
                  >
                    {room.price}
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>{room.priceNote}</span>
                </div>

                <a
                  href="#contact"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "transparent",
                    color: "white",
                    border: "1px solid rgba(255,255,255,0.3)",
                    padding: "11px 24px",
                    fontSize: "0.8rem",
                    letterSpacing: "0.08em",
                    textDecoration: "none",
                    transition: "background 0.3s, border-color 0.3s",
                    alignSelf: "flex-start",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "#E8A87C";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "#E8A87C";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.3)";
                  }}
                >
                  このお部屋を予約相談 <ArrowRightIcon />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation: room name tabs + dots */}
        <div
          style={{
            background: "#0D1520",
            padding: "24px 40px 36px",
            display: "flex",
            alignItems: "center",
            gap: 32,
            flexWrap: "wrap",
          }}
        >
          {/* Room name tabs */}
          <div style={{ display: "flex", gap: 4, flex: 1, flexWrap: "wrap" }}>
            {["和室 オーシャンビュー", "洋室 ガーデンビュー", "ファミリールーム"].map((name, idx) => (
              <button
                key={name}
                onClick={() => scrollToRoom(idx)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "8px 20px",
                  fontSize: "0.78rem",
                  letterSpacing: "0.06em",
                  color: activeRoomSlide === idx ? "white" : "rgba(255,255,255,0.35)",
                  borderBottom: `2px solid ${activeRoomSlide === idx ? "#E8A87C" : "transparent"}`,
                  transition: "color 0.25s, border-color 0.25s",
                  fontFamily: "var(--font-noto-serif-jp), serif",
                  whiteSpace: "nowrap",
                }}
              >
                {name}
              </button>
            ))}
          </div>
          {/* Dots */}
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {[0, 1, 2].map((idx) => (
              <button
                key={idx}
                onClick={() => scrollToRoom(idx)}
                aria-label={`スライド ${idx + 1}`}
                style={{
                  width: activeRoomSlide === idx ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: activeRoomSlide === idx ? "#E8A87C" : "rgba(255,255,255,0.2)",
                  border: "none",
                  cursor: "pointer",
                  transition: "width 0.3s, background 0.3s",
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Wave Divider (Rooms → Highlights) ─────────────────────────────── */}
      <div style={{ background: "#1A2332", lineHeight: 0 }} aria-hidden="true">
        <svg viewBox="0 0 1440 56" preserveAspectRatio="none" style={{ width: "100%", height: 56, display: "block" }}>
          <path d="M0,28 C360,56 720,0 1080,28 C1260,42 1380,20 1440,28 L1440,0 L0,0Z" fill="#0D1520" />
        </svg>
      </div>

      {/* ── Highlights ──────────────────────────────────────────────────────── */}
      <section id="highlights" style={{ background: "#1A2332", padding: "100px 0", overflow: "hidden" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <p style={{ fontSize: "0.72rem", letterSpacing: "0.2em", color: "#E8A87C", textTransform: "uppercase", marginBottom: 12 }}>
              Highlights
            </p>
            <h2
              className="font-serif section-title"
              style={{ color: "white" }}
            >
              いそかぜの魅力
            </h2>
            <div className="divider" style={{ marginBottom: 0 }} />
          </div>

          {/* Desktop: horizontal journey with winding SVG path */}
          <div
            ref={journeyRef}
            className="journey-desktop"
            style={{ position: "relative", minHeight: 420, paddingTop: 40 }}
          >
            {/* Winding SVG path connecting 4 stops */}
            <svg
              className="journey-path-svg"
              viewBox="0 0 1000 380"
              preserveAspectRatio="none"
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="journeyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor="#87CEEB" stopOpacity="0.9" />
                  <stop offset="35%"  stopColor="#E8A87C" stopOpacity="1" />
                  <stop offset="65%"  stopColor="#D4956A" stopOpacity="1" />
                  <stop offset="100%" stopColor="#87CEEB" stopOpacity="0.9" />
                </linearGradient>
              </defs>
              {/* Faint background path (glow base) */}
              <path
                d="M 60 80 C 160 80, 200 180, 300 180 S 440 60, 540 80 S 680 200, 740 180 S 880 60, 940 80"
                fill="none"
                stroke="rgba(232,168,124,0.18)"
                strokeWidth="6"
                strokeLinecap="round"
              />
              {/* Animated gradient path */}
              <path
                d="M 60 80 C 160 80, 200 180, 300 180 S 440 60, 540 80 S 680 200, 740 180 S 880 60, 940 80"
                className={`journey-path-line${journeyPathAnimated ? " animated" : ""}`}
              />
              {/* Decorative nodes at each stop point on the path */}
              {[
                { cx: 60,  cy: 80 },
                { cx: 300, cy: 180 },
                { cx: 540, cy: 80 },
                { cx: 940, cy: 80 },
              ].map((pt, i) => (
                <g key={i}>
                  <circle cx={pt.cx} cy={pt.cy} r={10} fill="rgba(232,168,124,0.15)" stroke="#E8A87C" strokeWidth="1.5" strokeOpacity="0.4" />
                  <circle cx={pt.cx} cy={pt.cy} r={4}  fill="#E8A87C" fillOpacity={journeyPathAnimated ? 1 : 0} style={{ transition: `fill-opacity 0.4s ease ${0.8 + i * 0.3}s` }} />
                </g>
              ))}
            </svg>

            {/* 4 stops positioned along the path */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, position: "relative", zIndex: 2 }}>
              {JOURNEY_STOPS.map((item, idx) => {
                const ICONS_LG = [
                  <BeachIcon key="beach" className="w-7 h-7" />,
                  <UtensilsIcon key="utensils" className="w-7 h-7" />,
                  <MoonIcon key="moon" className="w-7 h-7" />,
                  <BikeIcon key="bike" className="w-7 h-7" />,
                ];
                return (
                <div
                  key={item.title}
                  className="journey-stop"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "0 16px",
                    marginTop: item.offsetY,
                    opacity: journeyPathAnimated ? 1 : 0,
                    transform: journeyPathAnimated ? "translateY(0)" : "translateY(20px)",
                    transition: `opacity 0.6s ease ${0.4 + idx * 0.25}s, transform 0.6s ease ${0.4 + idx * 0.25}s`,
                  }}
                >
                  {/* Step number label */}
                  <p
                    style={{
                      fontSize: "0.58rem",
                      letterSpacing: "0.2em",
                      color: "rgba(232,168,124,0.4)",
                      textTransform: "uppercase",
                      marginBottom: 10,
                      fontWeight: 500,
                    }}
                  >
                    {item.step}
                  </p>

                  {/* Node circle */}
                  <div
                    style={{
                      position: "relative",
                      width: 72,
                      height: 72,
                      borderRadius: "50%",
                      background: idx === 0 ? "#E8A87C" : "rgba(232,168,124,0.12)",
                      border: `2px solid ${idx === 0 ? "#E8A87C" : "rgba(232,168,124,0.4)"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: idx === 0 ? "white" : "#E8A87C",
                      marginBottom: 20,
                      transition: "background 0.35s, border-color 0.35s, transform 0.35s, box-shadow 0.35s",
                      cursor: "default",
                      boxShadow: idx === 0
                        ? "0 0 0 8px rgba(232,168,124,0.15), 0 0 24px rgba(232,168,124,0.4)"
                        : "0 0 16px rgba(232,168,124,0.15)",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.background = "#E8A87C";
                      el.style.borderColor = "#E8A87C";
                      el.style.transform = "scale(1.12)";
                      el.style.boxShadow = "0 0 0 10px rgba(232,168,124,0.2), 0 0 28px rgba(232,168,124,0.5)";
                      const svg = el.querySelector("svg");
                      if (svg) (svg as SVGElement).style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.transform = "scale(1)";
                      if (idx !== 0) {
                        el.style.background = "rgba(232,168,124,0.12)";
                        el.style.borderColor = "rgba(232,168,124,0.4)";
                        el.style.boxShadow = "0 0 16px rgba(232,168,124,0.15)";
                        const svg = el.querySelector("svg");
                        if (svg) (svg as SVGElement).style.color = "#E8A87C";
                      } else {
                        el.style.boxShadow = "0 0 0 8px rgba(232,168,124,0.15), 0 0 24px rgba(232,168,124,0.4)";
                      }
                    }}
                  >
                    {/* Ripple ring for active node */}
                    {idx === 0 && <div className="journey-node-ripple" />}
                    {ICONS_LG[idx]}
                  </div>

                  {/* Time label */}
                  <p
                    style={{
                      fontSize: "0.6rem",
                      letterSpacing: "0.16em",
                      color: "rgba(232,168,124,0.45)",
                      textTransform: "uppercase",
                      marginBottom: 10,
                    }}
                  >
                    {item.time}
                  </p>

                  {/* Title */}
                  <h3
                    className="font-serif"
                    style={{
                      fontSize: "1rem",
                      color: "white",
                      fontWeight: 600,
                      marginBottom: 14,
                      letterSpacing: "0.04em",
                      textAlign: "center",
                      lineHeight: 1.4,
                    }}
                  >
                    {item.title}
                  </h3>

                  {/* Divider */}
                  <div style={{ width: 24, height: 1, background: "rgba(232,168,124,0.3)", marginBottom: 14 }} />

                  {/* Description */}
                  <p
                    style={{
                      fontSize: "0.78rem",
                      color: "rgba(255,255,255,0.45)",
                      lineHeight: 1.9,
                      letterSpacing: "0.02em",
                      textAlign: "center",
                      maxWidth: 220,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              ); })}
            </div>
          </div>

          {/* Mobile: vertical journey path */}
          <div
            className="journey-mobile"
            style={{ display: "none", flexDirection: "column", position: "relative", paddingLeft: 48 }}
          >
            {/* Vertical path line */}
            <div
              style={{
                position: "absolute",
                left: 31,
                top: 0,
                bottom: 0,
                width: 2,
                background: "linear-gradient(to bottom, rgba(232,168,124,0.08), rgba(232,168,124,0.3) 15%, rgba(232,168,124,0.3) 85%, rgba(232,168,124,0.08))",
                backgroundImage: "repeating-linear-gradient(to bottom, rgba(232,168,124,0.4) 0, rgba(232,168,124,0.4) 6px, transparent 6px, transparent 14px)",
              }}
            />

            {JOURNEY_STOPS.map((item, idx) => {
              const ICONS_SM = [
                <BeachIcon key="beach" className="w-6 h-6" />,
                <UtensilsIcon key="utensils" className="w-6 h-6" />,
                <MoonIcon key="moon" className="w-6 h-6" />,
                <BikeIcon key="bike" className="w-6 h-6" />,
              ];
              return (
              <div
                key={item.title}
                style={{
                  display: "flex",
                  gap: 20,
                  alignItems: "flex-start",
                  marginBottom: idx < 3 ? 48 : 0,
                  position: "relative",
                }}
              >
                {/* Node on the vertical line */}
                <div
                  style={{
                    position: "absolute",
                    left: -48,
                    top: 0,
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: idx === 0 ? "#E8A87C" : "rgba(232,168,124,0.12)",
                    border: `2px solid ${idx === 0 ? "#E8A87C" : "rgba(232,168,124,0.3)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: idx === 0 ? "white" : "#E8A87C",
                    zIndex: 2,
                    transform: "translateX(7px)",
                  }}
                >
                  {ICONS_SM[idx]}
                </div>

                <div style={{ paddingTop: 4 }}>
                  <p style={{ fontSize: "0.58rem", letterSpacing: "0.16em", color: "rgba(232,168,124,0.45)", textTransform: "uppercase", marginBottom: 6 }}>
                    {item.step} / {item.time}
                  </p>
                  <h3
                    className="font-serif"
                    style={{ fontSize: "0.98rem", color: "white", fontWeight: 600, marginBottom: 10, letterSpacing: "0.04em", lineHeight: 1.4 }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.85, letterSpacing: "0.02em" }}>
                    {item.desc}
                  </p>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Wave Divider (Highlights → Gallery) ───────────────────────────── */}
      <div style={{ background: "#FAFAF5", lineHeight: 0 }} aria-hidden="true">
        <svg viewBox="0 0 1440 56" preserveAspectRatio="none" style={{ width: "100%", height: 56, display: "block" }}>
          <path d="M0,20 C300,56 600,0 900,32 C1100,52 1300,10 1440,28 L1440,0 L0,0Z" fill="#1A2332" />
        </svg>
      </div>

      {/* ── Gallery ──────────────────────────────────────────────────────────── */}
      <section id="gallery" style={{ background: "#FAFAF5", padding: "100px 24px", position: "relative", overflow: "hidden" }}>
        {/* Seashell near gallery */}
        <svg className="seashell-deco" viewBox="0 0 60 60" style={{ left: "1.5%", top: "6%", width: 48, animationDelay: "2.2s" }} aria-hidden="true">
          <path d="M30 52 C10 52, 4 36, 10 22 C16 8, 30 4, 44 10 C58 16, 58 36, 44 46 C38 50, 34 52, 30 52Z" fill="none" stroke="#E8A87C" strokeWidth="1.5" />
          <path d="M30 52 C24 40, 14 32, 14 22 C14 14, 22 8, 30 8" fill="none" stroke="#E8A87C" strokeWidth="1" strokeOpacity="0.6" />
          <path d="M30 52 C36 40, 46 32, 46 22 C46 14, 38 8, 30 8" fill="none" stroke="#E8A87C" strokeWidth="1" strokeOpacity="0.6" />
          <path d="M30 52 C30 36, 30 18, 30 8" fill="none" stroke="#E8A87C" strokeWidth="0.8" strokeOpacity="0.4" />
          <circle cx="30" cy="8" r="3" fill="#E8A87C" opacity="0.5" />
        </svg>
        {/* Hibiscus in gallery section */}
        <svg
          className="hibiscus-float"
          viewBox="0 0 80 80"
          style={{
            right: "2%",
            bottom: "8%",
            width: 56,
            height: 56,
            opacity: 0.12,
            ["--h-scale" as string]: 1,
            ["--h-duration" as string]: "14s",
            ["--h-delay" as string]: "3s",
            zIndex: 0,
          }}
          aria-hidden="true"
        >
          <g transform="translate(40,40)">
            {[0, 72, 144, 216, 288].map((angle, pi) => (
              <ellipse key={pi} cx={0} cy={-18} rx={9} ry={16} fill="rgba(255,80,120,0.85)" transform={`rotate(${angle})`} />
            ))}
            <circle cx={0} cy={0} r={6} fill="rgba(255,220,50,0.95)" />
            <circle cx={0} cy={0} r={3} fill="rgba(255,160,30,1)" />
          </g>
        </svg>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <p className="section-title-en" style={{ marginBottom: 12 }}>Gallery</p>
            <h2 className="section-title">フォトギャラリー</h2>
            <div className="divider" />
          </div>

          {/* Masonry-style grid */}
          <div className="gallery-grid">
            {/* Large left image */}
            <div
              className="gallery-item gallery-item-clickable gallery-span2"
              style={{ height: 520 }}
              onClick={() => openLightbox(0)}
              role="button"
              aria-label="奄美の海 を拡大表示"
            >
              <Image
                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80"
                alt="奄美の海"
                width={600}
                height={400}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>

            {/* Top middle */}
            <div
              className="gallery-item gallery-item-clickable"
              style={{ height: 256 }}
              onClick={() => openLightbox(1)}
              role="button"
              aria-label="客室の朝 を拡大表示"
            >
              <Image
                src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80"
                alt="客室の朝"
                width={600}
                height={400}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>

            {/* Top right */}
            <div
              className="gallery-item gallery-item-clickable"
              style={{ height: 256 }}
              onClick={() => openLightbox(2)}
              role="button"
              aria-label="海の夕日 を拡大表示"
            >
              <Image
                src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80"
                alt="海の夕日"
                width={600}
                height={400}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>

            {/* Bottom middle */}
            <div
              className="gallery-item gallery-item-clickable"
              style={{ height: 256 }}
              onClick={() => openLightbox(3)}
              role="button"
              aria-label="島料理 を拡大表示"
            >
              <Image
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80"
                alt="島料理"
                width={600}
                height={400}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>

            {/* Bottom right */}
            <div
              className="gallery-item gallery-item-clickable"
              style={{ height: 256 }}
              onClick={() => openLightbox(4)}
              role="button"
              aria-label="テラス を拡大表示"
            >
              <Image
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80"
                alt="テラス"
                width={600}
                height={400}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>

            {/* Bottom row */}
            <div
              className="gallery-item gallery-item-clickable"
              style={{ height: 200 }}
              onClick={() => openLightbox(5)}
              role="button"
              aria-label="マングローブ を拡大表示"
            >
              <Image
                src="https://images.unsplash.com/photo-1587749091230-8fdb2a5f6723?auto=format&fit=crop&w=600&q=80"
                alt="マングローブ"
                width={600}
                height={400}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
            <div
              className="gallery-item gallery-item-clickable"
              style={{ height: 200 }}
              onClick={() => openLightbox(6)}
              role="button"
              aria-label="テラスからの眺め を拡大表示"
            >
              <Image
                src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80"
                alt="テラスからの眺め"
                width={600}
                height={400}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
            <div
              className="gallery-item gallery-item-clickable"
              style={{ height: 200 }}
              onClick={() => openLightbox(7)}
              role="button"
              aria-label="夜の海 を拡大表示"
            >
              <Image
                src="https://images.unsplash.com/photo-1502673530728-f79b4cab31b1?auto=format&fit=crop&w=600&q=80"
                alt="夜の海"
                width={600}
                height={400}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Wave Divider (Gallery → Surroundings) ──────────────────────────── */}
      <div style={{ background: "#FAFAF5", lineHeight: 0 }} aria-hidden="true">
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" style={{ width: "100%", height: 48, display: "block" }}>
          <path d="M0,24 C400,0 800,48 1200,24 C1320,18 1390,30 1440,24 L1440,48 L0,48Z" fill="rgba(135,206,235,0.06)" />
          <path d="M0,36 C300,12 700,48 1100,28 C1300,16 1400,36 1440,32 L1440,48 L0,48Z" fill="rgba(232,168,124,0.04)" />
        </svg>
      </div>

      {/* ── Surroundings ─────────────────────────────────────────────────────── */}
      <section id="surroundings" style={{ background: "#FAFAF5", padding: "100px 24px", overflow: "hidden", position: "relative" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p className="section-title-en" style={{ marginBottom: 12 }}>Surroundings</p>
            <h2 className="section-title">周辺ガイド</h2>
            <div className="divider" style={{ marginBottom: 20 }} />
            <p style={{ fontSize: "0.9rem", color: "#777", lineHeight: 1.8, maxWidth: 500, margin: "0 auto" }}>
              いそかぜを拠点に、奄美の魅力を存分に楽しんでください。
            </p>
          </div>

          {/* Desktop: Map-like scattered layout with rotated cards and connecting dotted lines */}
          <div
            ref={surroundingsRef}
            className="map-scatter-desktop"
            style={{
              position: "relative",
              minHeight: 720,
              overflow: "hidden",
            }}
          >
            {/* SVG dotted connecting lines between nearby spots */}
            <svg
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                overflow: "visible",
                zIndex: 0,
              }}
              aria-hidden="true"
            >
              <defs>
                <style>{`
                  @keyframes mapPulse1 { 0%,100% { r: 14; stroke-opacity: 0.55; } 50% { r: 22; stroke-opacity: 0.15; } }
                  @keyframes mapPulse2 { 0%,100% { r: 24; stroke-opacity: 0.3; } 50% { r: 36; stroke-opacity: 0.06; } }
                  @keyframes mapPulse3 { 0%,100% { r: 38; stroke-opacity: 0.12; } 50% { r: 52; stroke-opacity: 0; } }
                  @keyframes planeMove { 0% { offset-distance: 10%; } 100% { offset-distance: 90%; } }
                  .map-pulse1 { animation: mapPulse1 2.4s ease-in-out infinite; }
                  .map-pulse2 { animation: mapPulse2 2.4s ease-in-out 0.6s infinite; }
                  .map-pulse3 { animation: mapPulse3 2.4s ease-in-out 1.2s infinite; }
                `}</style>
              </defs>

              {/* Connecting lines — thicker, more visible */}
              {/* あやまる岬 → center */}
              <line x1="15%" y1="12%" x2="42%" y2="40%" stroke="#E8A87C" strokeWidth="1.8" strokeDasharray="5,9" strokeOpacity="0.45" />
              {/* マングローブ → center */}
              <line x1="60%" y1="8%" x2="42%" y2="40%" stroke="#E8A87C" strokeWidth="1.8" strokeDasharray="5,9" strokeOpacity="0.45" />
              {/* 大浜 → center */}
              <line x1="82%" y1="30%" x2="42%" y2="40%" stroke="#E8A87C" strokeWidth="1.8" strokeDasharray="5,9" strokeOpacity="0.45" />
              {/* 海洋展示館 → center */}
              <line x1="10%" y1="60%" x2="42%" y2="40%" stroke="#E8A87C" strokeWidth="1.8" strokeDasharray="5,9" strokeOpacity="0.45" />
              {/* 名瀬 → center */}
              <line x1="48%" y1="72%" x2="42%" y2="40%" stroke="#E8A87C" strokeWidth="1.8" strokeDasharray="5,9" strokeOpacity="0.45" />
              {/* 金作原 → center */}
              <line x1="78%" y1="68%" x2="42%" y2="40%" stroke="#E8A87C" strokeWidth="1.8" strokeDasharray="5,9" strokeOpacity="0.45" />
              {/* 大浜 → 海洋展示館 */}
              <line x1="82%" y1="30%" x2="78%" y2="68%" stroke="#87CEEB" strokeWidth="1.4" strokeDasharray="4,8" strokeOpacity="0.35" />
              {/* 名瀬 → 金作原 */}
              <line x1="48%" y1="72%" x2="78%" y2="68%" stroke="#87CEEB" strokeWidth="1.4" strokeDasharray="4,8" strokeOpacity="0.35" />

              {/* (Airplane and walking person rendered as overlay divs below the SVG) */}

              {/* Center HERE marker — larger, prominent, pulsing rings */}
              <circle cx="42%" cy="40%" r="6" fill="#E8A87C" fillOpacity="1" />
              <circle className="map-pulse1" cx="42%" cy="40%" r="14" fill="none" stroke="#E8A87C" strokeWidth="2" />
              <circle className="map-pulse2" cx="42%" cy="40%" r="24" fill="none" stroke="#E8A87C" strokeWidth="1.5" />
              <circle className="map-pulse3" cx="42%" cy="40%" r="38" fill="none" stroke="#E8A87C" strokeWidth="1" />
            </svg>

            {/* Tiny airplane along the あやまる岬 → center line (~27%, ~25%) */}
            <svg
              viewBox="0 0 22 10"
              style={{ position: "absolute", left: "27%", top: "25%", width: 22, height: 10, opacity: 0.65, transform: "rotate(-50deg)", pointerEvents: "none", zIndex: 1 }}
              aria-hidden="true"
            >
              <ellipse cx="11" cy="5" rx="9" ry="3.5" fill="#E8A87C" />
              <polygon points="8,2 14,2 12,5 10,5" fill="#E8A87C" />
              <polygon points="17,4 21,1.5 21,5" fill="#E8A87C" opacity="0.7" />
            </svg>

            {/* Walking person along the 名瀬 → center line (~46%, ~59%) */}
            <svg
              viewBox="0 0 16 20"
              style={{ position: "absolute", left: "46%", top: "59%", width: 16, height: 20, opacity: 0.55, pointerEvents: "none", zIndex: 1 }}
              aria-hidden="true"
            >
              <circle cx="8" cy="3" r="3" fill="#87CEEB" />
              <line x1="8" y1="6" x2="8" y2="12" stroke="#87CEEB" strokeWidth="2" strokeLinecap="round" />
              <line x1="8" y1="8" x2="3" y2="12" stroke="#87CEEB" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="8" y1="8" x2="13" y2="12" stroke="#87CEEB" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="8" y1="12" x2="5" y2="18" stroke="#87CEEB" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="8" y1="12" x2="11" y2="18" stroke="#87CEEB" strokeWidth="1.5" strokeLinecap="round" />
            </svg>

            {/* Animated walking route path — draws on scroll into view */}
            <svg
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                overflow: "visible",
                zIndex: 1,
              }}
              viewBox="0 0 1000 720"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <filter id="routeGlow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              {/* Faint glow base */}
              <path
                d="M 150 88 C 230 88, 290 200, 420 200 C 520 200, 560 120, 660 120 S 780 240, 820 200 S 880 88, 940 88"
                fill="none"
                stroke="rgba(232,168,124,0.12)"
                strokeWidth="8"
                strokeLinecap="round"
              />
              {/* Animated dotted route */}
              <path
                d="M 150 88 C 230 88, 290 200, 420 200 C 520 200, 560 120, 660 120 S 780 240, 820 200 S 880 88, 940 88"
                className={`surroundings-route-path${routeAnimated ? " route-animated" : ""}`}
                filter="url(#routeGlow)"
              />
              {/* Tiny walker dot that travels the route using SVG animateMotion */}
              {routeAnimated && (
                <g>
                  {/* Head + glow */}
                  <circle r="5" fill="rgba(232,168,124,0.25)" className="route-walker-dot">
                    <animateMotion
                      dur="3.2s"
                      begin="0.15s"
                      fill="freeze"
                      rotate="auto"
                      path="M 150 88 C 230 88, 290 200, 420 200 C 520 200, 560 120, 660 120 S 780 240, 820 200 S 880 88, 940 88"
                    />
                  </circle>
                  <circle r="3" fill="#E8A87C" className="route-walker-dot">
                    <animateMotion
                      dur="3.2s"
                      begin="0.15s"
                      fill="freeze"
                      rotate="auto"
                      path="M 150 88 C 230 88, 290 200, 420 200 C 520 200, 560 120, 660 120 S 780 240, 820 200 S 880 88, 940 88"
                    />
                  </circle>
                </g>
              )}
            </svg>

            {/* "HERE" marker label — bigger and more prominent */}
            <div
              style={{
                position: "absolute",
                left: "42%",
                top: "40%",
                transform: "translate(-50%, -50%)",
                zIndex: 3,
                textAlign: "center",
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  background: "rgba(232,168,124,0.18)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  border: "1.5px solid rgba(232,168,124,0.5)",
                  padding: "8px 18px",
                  marginTop: -56,
                  boxShadow: "0 4px 16px rgba(232,168,124,0.25)",
                }}
              >
                <p style={{ fontSize: "0.68rem", letterSpacing: "0.22em", color: "#E8A87C", textTransform: "uppercase", fontWeight: 700, whiteSpace: "nowrap" }}>
                  いそかぜ
                </p>
                <p style={{ fontSize: "0.52rem", letterSpacing: "0.14em", color: "rgba(232,168,124,0.7)", textTransform: "uppercase", marginTop: 2, whiteSpace: "nowrap" }}>
                  HERE
                </p>
              </div>
              {/* Pin stem */}
              <div style={{ width: 1.5, height: 12, background: "rgba(232,168,124,0.6)", margin: "0 auto" }} />
            </div>

            {/* Spots positioned in scattered geographic layout with slight rotation */}
            {SURROUNDINGS_DATA.map((spot, idx) => (
              <div
                key={spot.name}
                ref={(el) => { spotRefs.current[idx] = el; }}
                className={`map-spot-card spot-card${visibleSpots.has(idx) ? (idx % 2 === 0 ? " visible-left" : " visible-right") : ""}`}
                style={{
                  position: "absolute",
                  top: spot.top,
                  left: spot.left,
                  width: spot.width,
                  transform: `translate(-50%, -50%) rotate(${spot.rotate}deg)`,
                  zIndex: 2,
                  animationDelay: `${0.08 + idx * 0.12}s`,
                }}
              >
                {/* Distance badge */}
                <div className="distance-badge">{spot.distance}</div>

                <div
                  style={{
                    background: "white",
                    boxShadow: "0 6px 24px rgba(26,35,50,0.1)",
                    border: "1px solid rgba(26,35,50,0.06)",
                    overflow: "hidden",
                  }}
                >
                  {/* Photo */}
                  <div style={{ height: 110, overflow: "hidden" }}>
                    <Image
                      src={spot.img}
                      alt={spot.name}
                      width={600}
                      height={400}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        transition: "transform 0.5s ease",
                      }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.1)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
                    />
                  </div>
                  {/* Details */}
                  <div style={{ padding: "12px 14px 14px" }}>
                    <div style={{ fontSize: "0.58rem", color: "#87CEEB", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4, fontWeight: 500 }}>
                      {spot.category}
                    </div>
                    <h3 className="font-serif" style={{ fontSize: "0.84rem", color: "#1A2332", fontWeight: 600, marginBottom: 6, lineHeight: 1.4 }}>
                      {spot.name}
                    </h3>
                    <p style={{ fontSize: "0.7rem", color: "#888", lineHeight: 1.6 }}>{spot.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: styled list fallback */}
          <div
            className="map-scatter-mobile"
            style={{
              display: "none",
              flexDirection: "column",
              background: "white",
              padding: "8px 20px",
              boxShadow: "0 2px 16px rgba(26,35,50,0.06)",
            }}
          >
            {SURROUNDINGS_DATA.map((spot) => (
              <div key={spot.name} className="mobile-spot-item">
                <div className="mobile-spot-photo">
                  <Image src={spot.img} alt={spot.name} width={600} height={400} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <h3 className="font-serif" style={{ fontSize: "0.9rem", color: "#1A2332", fontWeight: 600, lineHeight: 1.3 }}>{spot.name}</h3>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 6 }}>
                    <MapPinIcon className="w-3 h-3" />
                    <span style={{ fontSize: "0.68rem", color: "#E8A87C", fontWeight: 500 }}>{spot.distance}</span>
                    <span style={{ fontSize: "0.6rem", color: "#87CEEB", letterSpacing: "0.08em", marginLeft: 8, textTransform: "uppercase" }}>{spot.category}</span>
                  </div>
                  <p style={{ fontSize: "0.76rem", color: "#777", lineHeight: 1.65 }}>{spot.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Booking Info ─────────────────────────────────────────────────────── */}
      <section id="booking" style={{ background: "#F5F3EF", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <p className="section-title-en" style={{ marginBottom: 12 }}>Booking</p>
            <h2 className="section-title">ご予約について</h2>
            <div className="divider" />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 32,
              marginBottom: 48,
            }}
          >
            {/* Check-in/out */}
            <div style={{ background: "white", padding: "32px 28px" }}>
              <div style={{ color: "#E8A87C", marginBottom: 16 }}>
                <ClockIcon className="w-6 h-6" />
              </div>
              <h3 className="font-serif" style={{ fontSize: "1rem", color: "#1A2332", fontWeight: 600, marginBottom: 20 }}>
                チェックイン・アウト
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { label: "チェックイン", value: "15:00 〜 20:00" },
                  { label: "チェックアウト", value: "〜 11:00" },
                  { label: "朝食提供", value: "7:30 〜 9:00" },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{ display: "flex", justifyContent: "space-between", paddingBottom: 12, borderBottom: "1px solid #F0EDE8" }}
                  >
                    <span style={{ fontSize: "0.82rem", color: "#888" }}>{item.label}</span>
                    <span style={{ fontSize: "0.82rem", color: "#1A2332", fontWeight: 500 }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cancellation Policy */}
            <div style={{ background: "white", padding: "32px 28px" }}>
              <div style={{ color: "#E8A87C", marginBottom: 16 }}>
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 11l3 3L22 4" />
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
              </div>
              <h3 className="font-serif" style={{ fontSize: "1rem", color: "#1A2332", fontWeight: 600, marginBottom: 20 }}>
                キャンセルポリシー
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { label: "7日前まで", value: "無料" },
                  { label: "3〜6日前", value: "宿泊料金の30%" },
                  { label: "前日", value: "宿泊料金の50%" },
                  { label: "当日・無断キャンセル", value: "宿泊料金の100%" },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{ display: "flex", justifyContent: "space-between", paddingBottom: 12, borderBottom: "1px solid #F0EDE8" }}
                  >
                    <span style={{ fontSize: "0.82rem", color: "#888" }}>{item.label}</span>
                    <span style={{ fontSize: "0.82rem", color: item.value === "無料" ? "#4CAF82" : "#1A2332", fontWeight: 500 }}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div style={{ background: "white", padding: "32px 28px" }}>
              <div style={{ color: "#E8A87C", marginBottom: 16 }}>
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <h3 className="font-serif" style={{ fontSize: "1rem", color: "#1A2332", fontWeight: 600, marginBottom: 20 }}>
                ご注意事項
              </h3>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  "全室禁煙（喫煙スペース有）",
                  "ペット同伴不可",
                  "22時以降は静粛にお願いします",
                  "朝食は前日22時までにお申し付けください",
                  "小学生以下のお子様は半額",
                  "素泊まりプランもご用意しています",
                ].map((note) => (
                  <li key={note} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <span style={{ color: "#E8A87C", fontSize: "0.7rem", marginTop: 3, flexShrink: 0 }}>●</span>
                    <span style={{ fontSize: "0.82rem", color: "#666", lineHeight: 1.6 }}>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Price Table */}
          <div style={{ background: "white", padding: "36px 32px" }}>
            <h3
              className="font-serif"
              style={{ fontSize: "1.1rem", color: "#1A2332", fontWeight: 600, marginBottom: 24, textAlign: "center" }}
            >
              料金表（1名あたり・朝食込み）
            </h3>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 480 }}>
                <thead>
                  <tr style={{ background: "#1A2332" }}>
                    {["お部屋", "平日", "土・日・祝", "繁忙期（7-8月・GW・年末年始）"].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: "12px 16px",
                          textAlign: "left",
                          fontSize: "0.78rem",
                          color: "rgba(255,255,255,0.85)",
                          fontWeight: 500,
                          letterSpacing: "0.04em",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { room: "和室 オーシャンビュー", weekday: "¥12,000", weekend: "¥14,000", peak: "¥16,000" },
                    { room: "洋室 ガーデンビュー", weekday: "¥9,800", weekend: "¥11,800", peak: "¥13,800" },
                    { room: "ファミリールーム（室料）", weekday: "¥30,000", weekend: "¥35,000", peak: "¥42,000" },
                  ].map((row, i) => (
                    <tr
                      key={row.room}
                      style={{ background: i % 2 === 0 ? "#FAFAF5" : "white", borderBottom: "1px solid #EEE" }}
                    >
                      <td style={{ padding: "14px 16px", fontSize: "0.85rem", color: "#1A2332", fontWeight: 500 }}>
                        {row.room}
                      </td>
                      <td style={{ padding: "14px 16px", fontSize: "0.85rem", color: "#555" }}>{row.weekday}</td>
                      <td style={{ padding: "14px 16px", fontSize: "0.85rem", color: "#555" }}>{row.weekend}</td>
                      <td style={{ padding: "14px 16px", fontSize: "0.85rem", color: "#E8A87C", fontWeight: 500 }}>
                        {row.peak}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: "0.75rem", color: "#999", marginTop: 12, textAlign: "right" }}>
              ※ 素泊まりは各料金より1,500円引き。税込価格です。
            </p>
          </div>
        </div>
      </section>

      {/* ── Wave Divider (Booking → Access) ────────────────────────────────── */}
      <div style={{ background: "#1A2332", lineHeight: 0 }} aria-hidden="true">
        <svg viewBox="0 0 1440 56" preserveAspectRatio="none" style={{ width: "100%", height: 56, display: "block" }}>
          <path d="M0,40 C360,12 720,56 1080,28 C1260,14 1380,44 1440,32 L1440,0 L0,0Z" fill="#F5F3EF" />
        </svg>
      </div>

      {/* ── Access ───────────────────────────────────────────────────────────── */}
      <section id="access" style={{ background: "#1A2332", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <p style={{ fontSize: "0.72rem", letterSpacing: "0.2em", color: "#E8A87C", textTransform: "uppercase", marginBottom: 12 }}>
              Access
            </p>
            <h2 className="font-serif section-title" style={{ color: "white" }}>アクセス</h2>
            <div className="divider" />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 48,
              alignItems: "start",
            }}
          >
            <div>
              <div style={{ marginBottom: 32 }}>
                <h3
                  className="font-serif"
                  style={{ fontSize: "0.95rem", color: "#E8A87C", fontWeight: 600, letterSpacing: "0.08em", marginBottom: 16 }}
                >
                  所在地
                </h3>
                <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.8 }}>
                  鹿児島県大島郡笠利町<br />
                  珊瑚の宿 いそかぜ
                </p>
              </div>

              <div style={{ marginBottom: 32 }}>
                <h3
                  className="font-serif"
                  style={{ fontSize: "0.95rem", color: "#E8A87C", fontWeight: 600, letterSpacing: "0.08em", marginBottom: 16 }}
                >
                  空港からのアクセス
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { icon: <CarIcon className="w-4 h-4" />, text: "奄美空港より車で約15分（タクシー約2,500円）" },
                    { icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="22" height="16" rx="2" /><path d="M1 9h22M9 3v16" /></svg>, text: "空港連絡バス「笠利方面行き」で約20分、浜崎バス停下車徒歩3分" },
                    { icon: <BikeIcon className="w-4 h-4" />, text: "当館にて無料レンタサイクルをご用意しています" },
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <div style={{ color: "#E8A87C", flexShrink: 0, marginTop: 2 }}>{item.icon}</div>
                      <p style={{ fontSize: "0.83rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }}>{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3
                  className="font-serif"
                  style={{ fontSize: "0.95rem", color: "#E8A87C", fontWeight: 600, letterSpacing: "0.08em", marginBottom: 16 }}
                >
                  駐車場
                </h3>
                <p style={{ fontSize: "0.83rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.8 }}>
                  無料駐車場あり（5台まで）<br />
                  大型車・バスは事前にお問い合わせください
                </p>
              </div>
            </div>

            <div
              style={{
                background: "rgba(135,206,235,0.08)",
                border: "1px solid rgba(135,206,235,0.2)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 320,
                padding: 40,
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Decorative grid lines */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: "linear-gradient(rgba(135,206,235,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(135,206,235,0.06) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "#E8A87C",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                    boxShadow: "0 0 0 12px rgba(232,168,124,0.15)",
                  }}
                >
                  <MapPinIcon className="w-6 h-6" />
                </div>
                <p
                  className="font-serif"
                  style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.95rem", fontWeight: 600, letterSpacing: "0.06em", marginBottom: 6 }}
                >
                  珊瑚の宿 いそかぜ
                </p>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.78rem", lineHeight: 1.8, marginBottom: 20 }}>
                  鹿児島県大島郡笠利町
                </p>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    padding: "6px 14px",
                    fontSize: "0.7rem",
                    color: "rgba(255,255,255,0.5)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  <svg style={{ width: 12, height: 12 }} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  Google Maps
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────────────────────────────── */}
      <section id="contact" style={{ background: "#FAFAF5", padding: "100px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <p className="section-title-en" style={{ marginBottom: 12 }}>Contact</p>
            <h2 className="section-title">お問い合わせ</h2>
            <div className="divider" style={{ marginBottom: 20 }} />
            <p style={{ fontSize: "0.9rem", color: "#777", lineHeight: 1.8 }}>
              ご予約・お問い合わせはお気軽にどうぞ。<br />
              2営業日以内にご連絡いたします。
            </p>
          </div>

          {/* Contact info */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "center", marginBottom: 48 }}>
            {[
              { icon: <PhoneIcon />, label: "TEL", value: "0997-XX-XXXX", note: "9:00〜20:00（年中無休）" },
              { icon: <MailIcon />, label: "MAIL", value: "info@isokaze-amami.com", note: "24時間受付" },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  gap: 16,
                  alignItems: "flex-start",
                  background: "white",
                  padding: "20px 28px",
                  flex: "1 1 280px",
                  maxWidth: 360,
                }}
              >
                <div style={{ color: "#E8A87C", flexShrink: 0, marginTop: 2 }}>{item.icon}</div>
                <div>
                  <p style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: "#E8A87C", marginBottom: 4 }}>
                    {item.label}
                  </p>
                  <p style={{ fontSize: "0.95rem", color: "#1A2332", fontWeight: 500, marginBottom: 4 }}>
                    {item.value}
                  </p>
                  <p style={{ fontSize: "0.72rem", color: "#AAA" }}>{item.note}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          {submitted ? (
            <div
              style={{
                background: "white",
                padding: "60px 40px",
                textAlign: "center",
              }}
            >
              <div style={{ color: "#4CAF82", marginBottom: 20, display: "flex", justifyContent: "center" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 48, height: 48 }}>
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3
                className="font-serif"
                style={{ fontSize: "1.4rem", color: "#1A2332", fontWeight: 600, marginBottom: 12 }}
              >
                お問い合わせを受け付けました
              </h3>
              <p style={{ fontSize: "0.9rem", color: "#777", lineHeight: 1.8 }}>
                ご連絡いただきありがとうございます。<br />
                2営業日以内にご返信いたします。
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{ background: "white", padding: "40px 36px", display: "flex", flexDirection: "column", gap: 24 }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
                <div>
                  <label className="form-label">
                    お名前 <span style={{ color: "#E8A87C" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="山田 太郎"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="form-label">
                    メールアドレス <span style={{ color: "#E8A87C" }}>*</span>
                  </label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="example@mail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
                <div>
                  <label className="form-label">電話番号</label>
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="090-XXXX-XXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label">人数</label>
                  <select
                    className="form-input"
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    style={{ cursor: "pointer" }}
                  >
                    {["1名", "2名", "3名", "4名", "5名以上"].map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
                <div>
                  <label className="form-label">チェックイン希望日</label>
                  <input
                    type="date"
                    className="form-input"
                    value={formData.checkin}
                    onChange={(e) => setFormData({ ...formData, checkin: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label">チェックアウト希望日</label>
                  <input
                    type="date"
                    className="form-input"
                    value={formData.checkout}
                    onChange={(e) => setFormData({ ...formData, checkout: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="form-label">ご希望のお部屋</label>
                <select
                  className="form-input"
                  value={formData.room}
                  onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                  style={{ cursor: "pointer" }}
                >
                  <option value="">-- 選択してください --</option>
                  <option value="japanese">和室 オーシャンビュー</option>
                  <option value="western">洋室 ガーデンビュー</option>
                  <option value="family">ファミリールーム</option>
                  <option value="any">おまかせ</option>
                </select>
              </div>

              <div>
                <label className="form-label">お問い合わせ内容・ご要望</label>
                <textarea
                  className="form-input"
                  placeholder="アレルギーや特別なご要望がございましたらお知らせください。"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{ minHeight: 120, resize: "vertical" }}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ alignSelf: "center", marginTop: 8 }}>
                送信する <ArrowRightIcon />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────────── */}
      <footer style={{ background: "#0F1820", padding: "60px 24px 32px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 48,
              justifyContent: "space-between",
              marginBottom: 48,
              paddingBottom: 48,
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {/* Brand */}
            <div style={{ flex: "1 1 240px" }}>
              <p
                className="font-serif"
                style={{
                  fontSize: "1.1rem",
                  color: "white",
                  letterSpacing: "0.1em",
                  marginBottom: 4,
                  fontWeight: 600,
                }}
              >
                珊瑚の宿 いそかぜ
              </p>
              <p style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: "#E8A87C", marginBottom: 16, textTransform: "uppercase" }}>
                Sango no Yado Isokaze
              </p>
              <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.9, maxWidth: 280 }}>
                奄美大島の自然に溶け込む小さな宿。
                波の音とともに目覚める島暮らしを、あなたにも。
              </p>
              {/* Instagram hint */}
              <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
                <a
                  href="#"
                  aria-label="Instagram"
                  style={{
                    width: 36,
                    height: 36,
                    background: "rgba(255,255,255,0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,255,255,0.6)",
                    textDecoration: "none",
                    transition: "background 0.3s, color 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = "#E8A87C";
                    el.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = "rgba(255,255,255,0.06)";
                    el.style.color = "rgba(255,255,255,0.6)";
                  }}
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Links */}
            <div style={{ flex: "1 1 160px" }}>
              <h4
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.15em",
                  color: "#E8A87C",
                  textTransform: "uppercase",
                  marginBottom: 16,
                  fontWeight: 500,
                }}
              >
                Navigation
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    style={{
                      fontSize: "0.82rem",
                      color: "rgba(255,255,255,0.55)",
                      textDecoration: "none",
                      letterSpacing: "0.04em",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.9)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.55)")}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div style={{ flex: "1 1 200px" }}>
              <h4
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.15em",
                  color: "#E8A87C",
                  textTransform: "uppercase",
                  marginBottom: 16,
                  fontWeight: 500,
                }}
              >
                Contact
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { icon: <MapPinIcon className="w-4 h-4" />, text: "鹿児島県大島郡笠利町" },
                  { icon: <PhoneIcon className="w-4 h-4" />, text: "0997-XX-XXXX" },
                  { icon: <MailIcon className="w-4 h-4" />, text: "info@isokaze-amami.com" },
                  { icon: <ClockIcon className="w-4 h-4" />, text: "受付時間 9:00〜20:00" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <div style={{ color: "#E8A87C", flexShrink: 0, marginTop: 1 }}>{item.icon}</div>
                    <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
            }}
          >
            <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.04em" }}>
              &copy; 2026 珊瑚の宿 いそかぜ. All rights reserved.
            </p>
            <a
              href="/web#gallery"
              style={{
                fontSize: "0.72rem",
                color: "rgba(255,255,255,0.3)",
                textDecoration: "none",
                letterSpacing: "0.06em",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.7)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.3)")}
            >
              &#8592; ギャラリーに戻る
            </a>
          </div>
        </div>
      </footer>

      {/* ===== FIXED BOTTOM CTA BAR ===== */}
      <style>{`
        @keyframes guest-cta-slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .guest-cta-bar {
          animation: guest-cta-slide-up 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
      {showCta && (
        <div
          className="guest-cta-bar fixed bottom-0 left-0 right-0 z-40 px-4 py-3 flex items-center justify-between gap-3"
          style={{
            backgroundColor: "rgba(26, 35, 50, 0.97)",
            backdropFilter: "blur(12px)",
            borderTop: "1px solid rgba(232,168,124,0.2)",
          }}
          role="complementary"
          aria-label="お問い合わせのショートカット"
        >
          <a
            href="tel:0997-XX-XXXX"
            className="flex items-center justify-center gap-2 flex-1 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 hover:opacity-80"
            style={{ backgroundColor: "#E8A87C", color: "#1A2332" }}
            aria-label="電話する: 0997-XX-XXXX"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>
            電話する
          </a>
          <a
            href="#contact"
            className="flex items-center justify-center gap-2 flex-1 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 hover:opacity-80"
            style={{ border: "1px solid rgba(232,168,124,0.5)", color: "#E8A87C" }}
            aria-label="お問い合わせフォームへスクロール"
          >
            Web予約/お問い合わせ
          </a>
        </div>
      )}
    </>
  );
}
