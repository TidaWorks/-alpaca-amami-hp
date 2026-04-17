"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

/* ============================================================
   Patisserie Soleil — SS-rank demo site
   奄美大島のフレンチパティスリー
   ============================================================ */

// ---------- data ----------
const PRODUCTS = [
  { name: "ガトーショコラ奄美", price: 580, desc: "奄美産カカオと黒糖の深い味わい", img: "/images/demo/patisserie/product-gateau-chocolat.jpg" },
  { name: "タンカンのタルト", price: 620, desc: "島タンカンの爽やかな酸味とアーモンドクリーム", img: "/images/demo/patisserie/product-tankan-tart.jpg" },
  { name: "パッションフルーツのムース", price: 650, desc: "南国の情熱を閉じ込めた軽やかな一品", img: "/images/demo/patisserie/product-passionfruit-mousse.jpg" },
  { name: "島バナナのミルフィーユ", price: 700, desc: "サクサクのパイ生地と濃厚な島バナナ", img: "/images/demo/patisserie/product-banana-millefeuille.jpg" },
  { name: "黒糖カヌレ", price: 380, desc: "外はカリッと中はもっちり、黒糖の芳醇な香り", img: "/images/demo/patisserie/product-brown-sugar-canele.jpg" },
  { name: "マンゴーのシャルロット", price: 680, desc: "完熟マンゴーとビスキュイの華やかなハーモニー", img: "/images/demo/patisserie/product-mango-charlotte.jpg" },
];

const SEASONS = ["春", "夏", "秋", "冬"] as const;

// ---------- extracted components (module-level to prevent remount) ----------

const CreamWave = ({ flip, color, id }: { flip?: boolean; color?: string; id: string }) => (
  <svg
    viewBox="0 0 1440 120"
    preserveAspectRatio="none"
    style={{
      display: "block",
      width: "100%",
      height: "60px",
      transform: flip ? "scaleY(-1)" : undefined,
    }}
  >
    <path
      d={
        id === "w1"
          ? "M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
          : id === "w2"
          ? "M0,40 C180,100 360,0 540,50 C720,100 900,10 1080,60 C1260,110 1380,20 1440,40 L1440,120 L0,120 Z"
          : id === "w3"
          ? "M0,80 C200,20 400,100 600,40 C800,0 1000,80 1200,30 C1350,0 1420,50 1440,80 L1440,120 L0,120 Z"
          : id === "w4"
          ? "M0,50 C160,110 320,10 480,70 C640,130 800,20 960,60 C1120,100 1280,30 1440,50 L1440,120 L0,120 Z"
          : "M0,70 C300,10 600,100 900,50 C1100,20 1300,80 1440,70 L1440,120 L0,120 Z"
      }
      fill={color || "#FFF5F0"}
    />
  </svg>
);

const WhiskSVG = () => (
  <svg width="40" height="80" viewBox="0 0 40 80" className="sol-whisk" aria-hidden="true">
    <line x1="20" y1="0" x2="20" y2="30" stroke="#8B6F5E" strokeWidth="3" strokeLinecap="round" />
    <ellipse cx="20" cy="28" rx="4" ry="3" fill="#8B6F5E" />
    {[14, 17, 20, 23, 26].map((x, i) => (
      <path key={i} d={`M${x},30 Q${x + (i - 2) * 3},55 ${x},75`} stroke="#C9736B" strokeWidth="1.5" fill="none" opacity="0.7" />
    ))}
  </svg>
);

const PipingBagSVG = () => (
  <svg width="50" height="70" viewBox="0 0 50 70" className="sol-piping" aria-hidden="true">
    <polygon points="10,5 40,5 30,55 20,55" fill="#F2D7C9" stroke="#C9736B" strokeWidth="1.5" />
    <polygon points="20,55 30,55 27,68 23,68" fill="#D4A574" />
    <line x1="10" y1="5" x2="40" y2="5" stroke="#C9736B" strokeWidth="2" />
    <path d="M23,68 Q25,75 27,68" stroke="#D4A574" strokeWidth="2" fill="none" className="sol-squeeze" />
  </svg>
);

const RollingPinSVG = () => (
  <svg width="90" height="30" viewBox="0 0 90 30" className="sol-rolling" aria-hidden="true">
    <rect x="0" y="10" width="15" height="10" rx="3" fill="#8B6F5E" />
    <rect x="15" y="5" width="60" height="20" rx="10" fill="#D4A574" />
    <rect x="75" y="10" width="15" height="10" rx="3" fill="#8B6F5E" />
    {[25, 35, 45, 55, 65].map((x) => (
      <line key={x} x1={x} y1="7" x2={x} y2="23" stroke="#C9736B" strokeWidth="0.5" opacity="0.3" />
    ))}
  </svg>
);

const GiftBox = ({ children, label, price }: { children: string; label: string; price: string }) => (
  <div className="sol-gift-card">
    <div className="sol-gift-box">
      <div className="sol-gift-lid">
        <svg viewBox="0 0 200 40" width="100%" height="40" aria-hidden="true">
          <defs>
            <linearGradient id="ribbonShimmer" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E8734A" stopOpacity="0" />
              <stop offset="40%" stopColor="#FFD4A8" stopOpacity="0.6">
                <animate attributeName="offset" values="0;0.9;0" dur="2.8s" repeatCount="indefinite" />
              </stop>
              <stop offset="60%" stopColor="#FFD4A8" stopOpacity="0.0">
                <animate attributeName="offset" values="0.1;1.0;0.1" dur="2.8s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="#E8734A" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="ribbonShimmerV" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFD4A8" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#E8734A" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect x="0" y="10" width="200" height="30" rx="4" fill="#C9736B" />
          <rect x="0" y="0" width="200" height="15" rx="4" fill="#D4A574" />
          {/* ribbon horizontal */}
          <rect x="0" y="12" width="200" height="8" fill="#E8734A" opacity="0.3" />
          {/* ribbon shimmer overlay */}
          <rect x="0" y="12" width="200" height="8" fill="url(#ribbonShimmer)" />
          {/* ribbon vertical */}
          <rect x="90" y="0" width="20" height="40" fill="#E8734A" opacity="0.3" />
          <rect x="90" y="0" width="20" height="40" fill="url(#ribbonShimmerV)" opacity="0.5" />
          {/* bow */}
          <ellipse cx="100" cy="5" rx="18" ry="8" fill="#C9736B" />
          <ellipse cx="100" cy="5" rx="4" ry="4" fill="#D4A574" />
          {/* bow highlight shimmer */}
          <ellipse cx="96" cy="3" rx="6" ry="3" fill="#FFD4A8" opacity="0.35">
            <animate attributeName="opacity" values="0.15;0.55;0.15" dur="2.8s" repeatCount="indefinite" />
          </ellipse>
        </svg>
      </div>
      <div className="sol-gift-body">
        <p style={{ fontFamily: "var(--font-cormorant), serif", fontSize: 18, color: "#2C1810", margin: "0 0 4px" }}>{label}</p>
        <p style={{ fontSize: 13, color: "#8B6F5E", margin: "0 0 8px", lineHeight: 1.6 }}>{children}</p>
        <p style={{ fontFamily: "var(--font-cormorant), serif", fontSize: 16, color: "#C9736B", margin: 0 }}>{price}</p>
      </div>
    </div>
  </div>
);

const CakeCrossSection = ({ cakeProgress, cakeLayerRef }: { cakeProgress: number; cakeLayerRef: React.RefObject<SVGSVGElement | null> }) => {
  const layerOpacity = (threshold: number) => Math.max(0, Math.min(1, (cakeProgress - threshold) * 5));
  // Each layer drops in from above with a bounce; translateY starts at -20 and lands at 0
  const layerTranslate = (threshold: number) => {
    const t = Math.max(0, Math.min(1, (cakeProgress - threshold) * 5));
    // Cubic bounce: overshoot then settle
    const bounce = t < 0.7
      ? 0
      : t < 0.85
      ? (t - 0.7) / 0.15 * (-4) // slight upward overshoot at the end
      : -4 * (1 - (t - 0.85) / 0.15); // return to 0
    const drop = (1 - t) * -22 + bounce;
    return `translateY(${drop}px)`;
  };
  return (
    <svg ref={cakeLayerRef} viewBox="0 0 300 360" width="100%" style={{ maxWidth: 320 }}>
      {/* plate */}
      <g style={{ opacity: layerOpacity(0), transform: layerTranslate(0), transition: "none" }}>
        <ellipse cx="150" cy="340" rx="140" ry="18" fill="#E8DDD5" />
      </g>
      {/* sponge base */}
      <g style={{ opacity: layerOpacity(0.05), transform: layerTranslate(0.05), transition: "none" }}>
        <rect x="40" y="240" width="220" height="80" rx="12" fill="#D4A574" />
      </g>
      {/* cream layer 1 */}
      <g style={{ opacity: layerOpacity(0.2), transform: layerTranslate(0.2), transition: "none" }}>
        <rect x="40" y="200" width="220" height="40" rx="8" fill="#FFF5F0" stroke="#F2D7C9" strokeWidth="2" />
      </g>
      {/* sponge 2 */}
      <g style={{ opacity: layerOpacity(0.35), transform: layerTranslate(0.35), transition: "none" }}>
        <rect x="40" y="160" width="220" height="40" rx="8" fill="#C9A882" />
      </g>
      {/* cream layer 2 */}
      <g style={{ opacity: layerOpacity(0.45), transform: layerTranslate(0.45), transition: "none" }}>
        <rect x="40" y="130" width="220" height="30" rx="8" fill="#FFF5F0" stroke="#F2D7C9" strokeWidth="2" />
      </g>
      {/* fruit layer */}
      <g style={{ opacity: layerOpacity(0.55), transform: layerTranslate(0.55), transition: "none" }}>
        {[60, 95, 130, 165, 200, 235].map((x, i) => (
          <circle key={i} cx={x} cy="118" r="12" fill={i % 2 === 0 ? "#E8734A" : "#F4C542"} />
        ))}
      </g>
      {/* top glaze */}
      <g style={{ opacity: layerOpacity(0.7), transform: layerTranslate(0.7), transition: "none" }}>
        <path d="M40,95 Q60,60 150,55 Q240,60 260,95 L260,110 Q240,100 150,95 Q60,100 40,110 Z" fill="#C9736B" />
      </g>
      {/* decorations */}
      <g style={{ opacity: layerOpacity(0.85), transform: layerTranslate(0.85), transition: "none" }}>
        <circle cx="100" cy="55" r="8" fill="#E8734A" />
        <circle cx="150" cy="48" r="10" fill="#F4C542" />
        <circle cx="200" cy="55" r="8" fill="#4CAF50" />
        <path d="M195,50 Q205,40 210,50 Q205,55 195,50" fill="#66BB6A" />
      </g>
      {/* label lines */}
      <g opacity={layerOpacity(0.9)} style={{ fontFamily: "var(--font-noto-serif-jp), serif", fontSize: 11, fill: "#8B6F5E" }}>
        <text x="275" y="280" textAnchor="start">スポンジ</text>
        <line x1="262" y1="278" x2="270" y2="278" stroke="#8B6F5E" strokeWidth="0.8" />
        <text x="275" y="218" textAnchor="start">クリーム</text>
        <line x1="262" y1="216" x2="270" y2="216" stroke="#8B6F5E" strokeWidth="0.8" />
        <text x="275" y="118" textAnchor="start">フルーツ</text>
        <line x1="262" y1="116" x2="270" y2="116" stroke="#8B6F5E" strokeWidth="0.8" />
        <text x="275" y="80" textAnchor="start">グラサージュ</text>
        <line x1="262" y1="78" x2="270" y2="78" stroke="#8B6F5E" strokeWidth="0.8" />
      </g>
    </svg>
  );
};

// ---------- seasonal descriptions ----------
const SEASON_DETAILS = [
  { title: "春限定 -- 島苺とピスタチオのフレジエ", desc: "奄美の温暖な気候で育った島苺をたっぷりと使い、ピスタチオのクレームムースリーヌで包み込んだ春だけの特別なフレジエ。苺の鮮やかな断面が、ショーケースでひときわ目を引く一品です。\n\nほのかな酸味と上品な甘さのバランスを、ぜひお楽しみください。" },
  { title: "夏限定 -- マンゴーとパッションのヴェリーヌ", desc: "完熟マンゴーのピューレとパッションフルーツのジュレを層に重ねた、南国の夏を閉じ込めたヴェリーヌ。ココナッツのブランマンジェが爽やかなアクセントを添えます。\n\n暑い日にひとさじ、島のトロピカルな恵みをどうぞ。" },
  { title: "秋限定 -- 紫芋と黒糖のモンブラン", desc: "奄美産の紫芋をたっぷり使った秋色のモンブラン。黒糖のメレンゲと栗のクリームが織りなす、深く優しい味わいです。\n\n秋の実りを一皿に凝縮した、この季節だけの贅沢をお楽しみください。" },
  { title: "冬限定 -- タンカンとショコラのビュッシュ", desc: "島タンカンの爽やかな香りとビターショコラの濃厚なハーモニー。クリスマスシーズンにぴったりのビュッシュ・ド・ノエルです。\n\n冬の奄美から届く、心まで温まる一品をお楽しみください。" },
];

// ---------- Map illustration SVG ----------
const MapIllustration = () => (
  <svg viewBox="0 0 600 200" width="100%" height="100%" aria-label="店舗周辺の地図イラスト">
    {/* background */}
    <rect width="600" height="200" fill="rgba(255,245,240,0.12)" rx="8" />
    {/* streets - horizontal */}
    <line x1="0" y1="80" x2="600" y2="80" stroke="rgba(212,165,116,0.4)" strokeWidth="12" />
    <line x1="0" y1="140" x2="600" y2="140" stroke="rgba(212,165,116,0.25)" strokeWidth="8" />
    {/* streets - vertical */}
    <line x1="200" y1="0" x2="200" y2="200" stroke="rgba(212,165,116,0.3)" strokeWidth="10" />
    <line x1="400" y1="0" x2="400" y2="200" stroke="rgba(212,165,116,0.25)" strokeWidth="8" />
    {/* blocks */}
    <rect x="40" y="95" width="140" height="35" rx="3" fill="rgba(139,111,94,0.18)" />
    <rect x="220" y="15" width="160" height="55" rx="3" fill="rgba(139,111,94,0.18)" />
    <rect x="420" y="95" width="140" height="35" rx="3" fill="rgba(139,111,94,0.18)" />
    <rect x="220" y="150" width="160" height="40" rx="3" fill="rgba(139,111,94,0.18)" />
    {/* road labels */}
    <text x="100" y="76" fill="rgba(212,165,116,0.6)" fontSize="8" fontFamily="var(--font-noto-sans-jp), sans-serif" textAnchor="middle">末広通り</text>
    <text x="196" y="190" fill="rgba(212,165,116,0.6)" fontSize="8" fontFamily="var(--font-noto-sans-jp), sans-serif" textAnchor="middle" transform="rotate(-90, 196, 190)">港町通り</text>
    {/* store building */}
    <rect x="270" y="88" width="60" height="40" rx="4" fill="rgba(201,115,107,0.4)" stroke="rgba(201,115,107,0.6)" strokeWidth="1" />
    {/* pin marker */}
    <g transform="translate(300, 60)">
      <path d="M0,0 C-8,-14 -14,-20 -14,-28 A14,14 0 1,1 14,-28 C14,-20 8,-14 0,0 Z" fill="#C9736B" />
      <circle cx="0" cy="-28" r="5" fill="#FFF5F0" />
    </g>
    {/* store label */}
    <rect x="255" y="98" width="90" height="20" rx="3" fill="rgba(201,115,107,0.7)" />
    <text x="300" y="112" fill="#FFF5F0" fontSize="9" fontFamily="var(--font-noto-sans-jp), sans-serif" textAnchor="middle" fontWeight="400">Patisserie Soleil</text>
    {/* compass */}
    <g transform="translate(550, 30)">
      <circle cx="0" cy="0" r="14" fill="rgba(212,165,116,0.2)" stroke="rgba(212,165,116,0.5)" strokeWidth="1" />
      <text x="0" y="4" fill="#D4A574" fontSize="10" fontFamily="var(--font-cormorant), serif" textAnchor="middle" fontWeight="600">N</text>
      <line x1="0" y1="-10" x2="0" y2="-6" stroke="#D4A574" strokeWidth="1.5" />
    </g>
    {/* port indicator */}
    <text x="530" y="145" fill="rgba(212,165,116,0.6)" fontSize="9" fontFamily="var(--font-noto-sans-jp), sans-serif" textAnchor="middle">名瀬港 --&gt;</text>
  </svg>
);

export default function PatisseriePage() {
  // ---- refs ----
  const headerRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const showcaseScrollRef = useRef<HTMLDivElement>(null);
  const cakeLayerRef = useRef<SVGSVGElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const sparkleCanvasRef = useRef<HTMLCanvasElement>(null);
  const pipingTrailRef = useRef<HTMLDivElement>(null);
  const patissierPhotoRef = useRef<HTMLDivElement>(null);

  // ---- state ----
  const [heroLettersSpread, setHeroLettersSpread] = useState(true);
  const [seasonIdx, setSeasonIdx] = useState(0);
  const [cakeProgress, setCakeProgress] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // ---- show CTA bar after scrolling 500px ----
  useEffect(() => {
    const onScroll = () => setShowCta(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ---- hero letter animation ----
  useEffect(() => {
    const t = setTimeout(() => setHeroLettersSpread(false), 800);
    return () => clearTimeout(t);
  }, []);

  // ---- season rotation ----
  useEffect(() => {
    const iv = setInterval(() => setSeasonIdx((p) => (p + 1) % 4), 3000);
    return () => clearInterval(iv);
  }, []);

  // ---- header scroll opacity ----
  useEffect(() => {
    const h = headerRef.current;
    if (!h) return;
    const onScroll = () => {
      const s = window.scrollY;
      const o = Math.min(s / 120, 1);
      h.style.backgroundColor = `rgba(44,24,16,${o * 0.92})`;
      h.style.backdropFilter = o > 0.1 ? "blur(12px)" : "none";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ---- parallax for hero ----
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const onScroll = () => {
      const y = window.scrollY;
      const bg = hero.querySelector(".hero-bg") as HTMLElement;
      if (bg) bg.style.transform = `translateY(${y * 0.35}px) scale(1.1)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ---- IntersectionObserver for section reveal ----
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("sol-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    sectionRefs.current.filter(Boolean).forEach((el) => observer.observe(el!));
    return () => observer.disconnect();
  }, []);

  // ---- Cake cross-section scroll progress ----
  useEffect(() => {
    const onScroll = () => {
      const el = cakeLayerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));
      setCakeProgress(progress);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ---- Sparkle / sugar crystal particle canvas ----
  useEffect(() => {
    const canvas = sparkleCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId = 0;
    const particles: { x: number; y: number; r: number; vy: number; vx: number; o: number; phase: number }[] = [];
    let lastHeight = 0;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
      lastHeight = canvas.height;
    };
    resize();
    window.addEventListener("resize", resize);
    // Periodic height check for content-driven changes
    const heightInterval = setInterval(() => {
      const h = document.documentElement.scrollHeight;
      if (h !== lastHeight) {
        canvas.width = window.innerWidth;
        canvas.height = h;
        lastHeight = h;
      }
    }, 2000);
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * document.documentElement.scrollHeight,
        r: Math.random() * 2.5 + 1,
        vy: -(Math.random() * 0.3 + 0.1),
        vx: (Math.random() - 0.5) * 0.2,
        o: Math.random() * 0.5 + 0.2,
        phase: Math.random() * Math.PI * 2,
      });
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const t = Date.now() * 0.001;
      particles.forEach((p) => {
        p.y += p.vy;
        p.x += p.vx + Math.sin(t + p.phase) * 0.15;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        const flicker = 0.5 + 0.5 * Math.sin(t * 2 + p.phase);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,165,116,${p.o * flicker})`;
        ctx.fill();
        // cross sparkle
        ctx.strokeStyle = `rgba(255,245,240,${p.o * flicker * 0.6})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(p.x - p.r * 2, p.y);
        ctx.lineTo(p.x + p.r * 2, p.y);
        ctx.moveTo(p.x, p.y - p.r * 2);
        ctx.lineTo(p.x, p.y + p.r * 2);
        ctx.stroke();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      clearInterval(heightInterval);
    };
  }, []);

  // ---- Piping trail scroll progress ----
  useEffect(() => {
    const trail = pipingTrailRef.current;
    if (!trail) return;
    const onScroll = () => {
      const scrollPct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      trail.style.height = `${scrollPct * 100}%`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ---- Patissier photo parallax ----
  useEffect(() => {
    const el = patissierPhotoRef.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = (vh / 2 - rect.top - rect.height / 2) / (vh + rect.height);
      const img = el.querySelector("img") as HTMLElement;
      if (img) img.style.transform = `translateY(${progress * 40}px) scale(1.08)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ---- showcase horizontal scroll ----
  const onShowcaseWheel = useCallback((e: React.WheelEvent) => {
    const el = showcaseScrollRef.current;
    if (!el) return;
    // Prevent double-scroll on trackpad: if horizontal scroll dominates, let browser handle it
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    const atStart = el.scrollLeft === 0 && e.deltaY < 0;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2 && e.deltaY > 0;
    if (!atStart && !atEnd) {
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    }
  }, []);

  const addSectionRef = useCallback((el: HTMLElement | null, idx: number) => {
    sectionRefs.current[idx] = el;
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 3000);
  };

  // ================================================================
  return (
    <>
      {/* ---- Global styles ---- */}
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body { overflow-x: hidden; }

        .sol-page {
          font-family: var(--font-noto-sans-jp), var(--font-noto-serif-jp), sans-serif;
          color: #2C1810;
          background: #FFF5F0;
          overflow-x: hidden;
          position: relative;
        }

        /* --- sparkle canvas --- */
        .sol-sparkle-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        /* --- piping trail --- */
        .sol-piping-trail {
          position: fixed;
          right: 16px;
          top: 0;
          width: 3px;
          background: linear-gradient(to bottom, #D4A574, #C9736B);
          border-radius: 2px;
          z-index: 90;
          transition: height 0.05s linear;
          opacity: 0.5;
        }
        .sol-piping-trail::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 10px;
          height: 10px;
          background: #C9736B;
          border-radius: 50%;
        }
        @media (max-width: 768px) {
          .sol-piping-trail { display: none; }
        }

        /* --- header --- */
        .sol-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          padding: 16px 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: background-color 0.3s, backdrop-filter 0.3s;
        }
        .sol-header a {
          color: #FFF5F0;
          text-decoration: none;
          font-family: var(--font-noto-sans-jp), sans-serif;
          font-size: 13px;
          opacity: 0.85;
          transition: opacity 0.3s;
        }
        .sol-header a:hover { opacity: 1; }
        .sol-header-brand {
          font-family: var(--font-cormorant), serif;
          font-size: 20px;
          font-weight: 300;
          color: #FFF5F0;
          letter-spacing: 3px;
        }
        .sol-header-nav {
          display: flex;
          gap: 24px;
          list-style: none;
        }
        @media (max-width: 768px) {
          .sol-header { padding: 12px 16px; }
          .sol-header-nav { gap: 12px; }
          .sol-header-nav a { font-size: 11px; }
          .sol-header-brand { font-size: 16px; }
          .sol-desktop-nav { display: none !important; }
          .sol-mobile-menu-btn { display: flex !important; }
        }
        @media (min-width: 769px) {
          .sol-mobile-menu-btn { display: none !important; }
          .sol-mobile-menu { display: none !important; }
        }

        /* --- section reveal --- */
        .sol-section {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1), transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sol-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* --- hero --- */
        .sol-hero {
          position: relative;
          height: 100vh;
          min-height: 600px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          background-image: url('/images/demo/patisserie/hero.jpg');
          background-size: cover;
          background-position: center;
          will-change: transform;
        }
        .hero-bg::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at 50% 40%, rgba(44,24,16,0.15) 0%, rgba(44,24,16,0.5) 60%, rgba(44,24,16,0.75) 100%),
            linear-gradient(to bottom, rgba(255,245,240,0.08) 0%, transparent 30%, rgba(44,24,16,0.6) 100%);
        }
        .sol-hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          color: #FFF5F0;
        }
        .sol-hero-title {
          font-family: var(--font-cormorant), serif;
          font-weight: 300;
          font-size: clamp(32px, 6vw, 72px);
          letter-spacing: 0.3em;
          margin-bottom: 20px;
          overflow: hidden;
        }
        .sol-hero-title span {
          display: inline-block;
          transition: letter-spacing 1.2s cubic-bezier(0.22, 1, 0.36, 1), opacity 1s ease;
        }
        .sol-hero-title .spread {
          letter-spacing: 0.8em;
          opacity: 0;
        }
        .sol-hero-title .gathered {
          letter-spacing: 0.3em;
          opacity: 1;
        }
        .sol-hero-sub {
          font-family: var(--font-noto-serif-jp), serif;
          font-weight: 300;
          font-size: clamp(14px, 2.2vw, 22px);
          letter-spacing: 0.15em;
          opacity: 0;
          animation: solFadeUp 1.2s 1.5s forwards;
        }
        .sol-hero-line {
          width: 60px;
          height: 1px;
          background: #D4A574;
          margin: 24px auto;
          opacity: 0;
          animation: solFadeUp 1s 1.8s forwards;
        }
        .sol-hero-scroll {
          position: absolute;
          bottom: 80px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          color: #FFF5F0;
          font-size: 11px;
          letter-spacing: 2px;
          opacity: 0;
          animation: solFadeUp 1s 2.2s forwards;
        }
        .sol-hero-scroll::after {
          content: '';
          display: block;
          width: 1px;
          height: 40px;
          background: #D4A574;
          margin: 8px auto 0;
          animation: solScrollLine 2s infinite;
        }
        @keyframes solScrollLine {
          0% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          51% { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
        @keyframes solFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* --- parchment texture for light sections --- */
        /* Layered onto the section's own background-color via a pseudo-element */
        .sol-parchment::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.032'/%3E%3C/svg%3E");
          background-repeat: repeat;
          pointer-events: none;
          z-index: 0;
        }
        .sol-parchment > * {
          position: relative;
          z-index: 1;
        }

        /* --- concept / story --- */
        .sol-concept {
          padding: 60px 5vw;
          background: #FFF5F0;
          position: relative;
          overflow: hidden;
        }
        .sol-concept-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }
        @media (max-width: 768px) {
          .sol-concept-inner { grid-template-columns: 1fr; gap: 40px; }
        }
        .sol-concept-text h2 {
          font-family: var(--font-cormorant), serif;
          font-weight: 300;
          font-size: clamp(24px, 3.5vw, 42px);
          color: #2C1810;
          margin-bottom: 12px;
          letter-spacing: 0.1em;
        }
        .sol-concept-text .sol-tagline {
          font-family: var(--font-noto-serif-jp), serif;
          font-size: clamp(14px, 1.8vw, 18px);
          color: #C9736B;
          margin-bottom: 24px;
          position: relative;
          display: inline-block;
        }
        .sol-concept-text .sol-tagline::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, #D4A574, #C9736B, transparent);
          border-radius: 1px;
        }
        .sol-concept-text p {
          font-size: 15px;
          line-height: 2;
          color: #5C4A3D;
          font-weight: 300;
        }
        .sol-concept-visual {
          display: flex;
          justify-content: center;
          position: relative;
        }
        .sol-concept-visual::before {
          content: '';
          position: absolute;
          inset: -12px;
          border: 1px solid rgba(212,165,116,0.15);
          border-radius: 16px;
          pointer-events: none;
        }
        .sol-concept-visual::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 12px;
          box-shadow: inset 0 0 40px rgba(44,24,16,0.15), 0 12px 40px rgba(44,24,16,0.12);
          pointer-events: none;
        }

        /* --- showcase --- */
        .sol-showcase {
          background: #2C1810;
          padding: 60px 0;
          position: relative;
        }
        .sol-showcase h2 {
          font-family: var(--font-cormorant), serif;
          font-weight: 300;
          font-size: clamp(28px, 4vw, 48px);
          color: #FFF5F0;
          text-align: center;
          letter-spacing: 0.15em;
          margin-bottom: 8px;
        }
        .sol-showcase-sub {
          text-align: center;
          font-family: var(--font-noto-serif-jp), serif;
          color: #D4A574;
          font-size: 14px;
          letter-spacing: 0.1em;
          margin-bottom: 48px;
        }
        /* glass case frame */
        .sol-glass-frame {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
        }
        .sol-glass-top {
          height: 24px;
          background: linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.03) 100%);
          border-radius: 8px 8px 0 0;
          border: 1px solid rgba(255,255,255,0.1);
          border-bottom: none;
          margin: 0 -4px;
          position: relative;
          overflow: hidden;
        }
        .sol-glass-top::after {
          display: none;
        }
        .sol-glass-body {
          border: 1px solid rgba(255,255,255,0.08);
          border-top: none;
          border-radius: 0 0 8px 8px;
          padding: 32px 0;
          background: linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
          overflow: hidden;
        }
        .sol-showcase-scroll {
          display: flex;
          gap: 32px;
          overflow-x: auto;
          padding: 16px 32px 24px;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .sol-showcase-scroll::-webkit-scrollbar { display: none; }
        .sol-showcase-item {
          flex: 0 0 240px;
          scroll-snap-align: center;
          text-align: center;
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sol-showcase-item:hover { transform: translateY(-8px); }
        .sol-pedestal {
          width: 200px;
          height: 200px;
          margin: 0 auto 12px;
          border-radius: 50%;
          overflow: hidden;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .sol-pedestal img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sol-showcase-item:hover .sol-pedestal img {
          transform: scale(1.08);
        }
        .sol-pedestal::before {
          content: '';
          position: absolute;
          top: -30%;
          left: 50%;
          transform: translateX(-50%);
          width: 70%;
          height: 70%;
          background: radial-gradient(ellipse at center, rgba(255,245,240,0.18) 0%, transparent 70%);
          z-index: 2;
          pointer-events: none;
          border-radius: 50%;
          animation: spotlightPulse 3.5s ease-in-out infinite;
        }
        @keyframes spotlightPulse {
          0%, 100% { opacity: 0.6; transform: translateX(-50%) scale(1); }
          50%       { opacity: 1;   transform: translateX(-50%) scale(1.12); }
        }
        .sol-pedestal::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 30%;
          background: linear-gradient(to top, rgba(44,24,16,0.4), transparent);
        }
        .sol-pedestal-base {
          width: 160px;
          height: 8px;
          background: linear-gradient(to bottom, rgba(212,165,116,0.4), rgba(212,165,116,0.1));
          border-radius: 50%;
          margin: 0 auto 12px;
        }
        .sol-showcase-name {
          font-family: var(--font-noto-serif-jp), serif;
          font-size: 15px;
          color: #FFF5F0;
          margin-bottom: 4px;
          font-weight: 400;
        }
        .sol-showcase-desc {
          font-size: 12px;
          color: #8B6F5E;
          margin-bottom: 6px;
          line-height: 1.5;
        }
        .sol-showcase-price {
          font-family: var(--font-cormorant), serif;
          font-size: 18px;
          color: #D4A574;
          letter-spacing: 0.05em;
        }
        .sol-scroll-hint {
          text-align: center;
          color: rgba(255,245,240,0.4);
          font-size: 12px;
          margin-top: 16px;
          letter-spacing: 1px;
        }

        /* --- seasonal --- */
        .sol-seasonal {
          position: relative;
          min-height: 80vh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .sol-seasonal-bg {
          position: absolute;
          inset: 0;
          background-image: url('/images/demo/patisserie/seasonal-bg.jpg');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
        }
        .sol-seasonal-bg::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(44,24,16,0.75) 0%, rgba(44,24,16,0.5) 100%);
        }
        .sol-seasonal-content {
          position: relative;
          z-index: 2;
          max-width: 900px;
          margin: 0 auto;
          padding: 60px 5vw;
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 60px;
          align-items: center;
        }
        @media (max-width: 768px) {
          .sol-seasonal-content { grid-template-columns: 1fr; gap: 32px; padding: 60px 5vw; }
        }
        .sol-season-wheel {
          width: 120px;
          height: 120px;
          position: relative;
        }
        .sol-season-item {
          position: absolute;
          font-family: var(--font-noto-serif-jp), serif;
          font-size: 22px;
          transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sol-season-active {
          color: #D4A574;
          font-size: 36px;
          font-weight: 500;
        }
        .sol-season-inactive {
          color: rgba(255,245,240,0.3);
          font-size: 18px;
        }
        .sol-seasonal-text h2 {
          font-family: var(--font-cormorant), serif;
          font-weight: 300;
          font-size: clamp(28px, 4vw, 48px);
          color: #FFF5F0;
          letter-spacing: 0.1em;
          margin-bottom: 8px;
        }
        .sol-seasonal-text h3 {
          font-family: var(--font-noto-serif-jp), serif;
          font-size: 22px;
          color: #D4A574;
          margin-bottom: 16px;
          font-weight: 400;
        }
        .sol-seasonal-text p {
          font-size: 15px;
          color: rgba(255,245,240,0.85);
          line-height: 2;
          font-weight: 300;
        }

        /* --- atelier --- */
        .sol-atelier {
          padding: 60px 5vw;
          background: #FFF5F0;
          position: relative;
        }
        .sol-atelier h2 {
          font-family: var(--font-cormorant), serif;
          font-weight: 300;
          font-size: clamp(28px, 4vw, 48px);
          color: #2C1810;
          text-align: center;
          letter-spacing: 0.15em;
          margin-bottom: 8px;
        }
        .sol-atelier-sub {
          text-align: center;
          font-family: var(--font-noto-serif-jp), serif;
          color: #C9736B;
          font-size: 14px;
          letter-spacing: 0.1em;
          margin-bottom: 60px;
        }
        .sol-atelier-collage {
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          grid-template-rows: 250px 200px;
          gap: 16px;
          position: relative;
        }
        @media (max-width: 768px) {
          .sol-atelier-collage {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 200px 160px 160px;
          }
        }
        .sol-atelier-img {
          border-radius: 8px;
          overflow: hidden;
          position: relative;
        }
        .sol-atelier-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sol-atelier-img:hover img {
          transform: scale(1.05);
        }
        .sol-atelier-img:nth-child(1) { grid-row: 1 / 3; }
        @media (max-width: 768px) {
          .sol-atelier-img:nth-child(1) { grid-column: 1 / 3; grid-row: auto; }
        }
        .sol-atelier-tools {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          gap: 48px;
          pointer-events: none;
          opacity: 0.15;
        }
        @keyframes solWhisk {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes solRolling {
          0%, 100% { transform: translateX(-4px); }
          50% { transform: translateX(4px); }
        }
        @keyframes solSqueeze {
          0%, 100% { transform: scaleY(1) translateY(0); }
          50% { transform: scaleY(1.15) translateY(2px); }
        }
        .sol-whisk { animation: solWhisk 2s ease-in-out infinite; }
        .sol-rolling { animation: solRolling 3s ease-in-out infinite; }
        .sol-piping { animation: solSqueeze 2.5s ease-in-out infinite; transform-origin: top center; }
        .sol-squeeze { animation: solSqueeze 2.5s ease-in-out infinite; transform-origin: top center; }

        /* --- patissier --- */
        .sol-patissier {
          background: #2C1810;
          padding: 60px 5vw;
          position: relative;
          overflow: hidden;
        }
        .sol-patissier-inner {
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 60px;
          align-items: center;
        }
        @media (max-width: 768px) {
          .sol-patissier-inner { grid-template-columns: 1fr; gap: 40px; }
        }
        .sol-patissier-photo {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          aspect-ratio: 3/4;
        }
        .sol-patissier-photo img {
          width: 100%;
          height: 108%;
          object-fit: cover;
          will-change: transform;
          transition: none;
          display: block;
        }
        .sol-patissier-photo::after {
          content: '';
          position: absolute;
          inset: 0;
          border: 1px solid rgba(212,165,116,0.2);
          border-radius: 12px;
        }
        .sol-toque {
          position: absolute;
          top: -30px;
          right: -20px;
          opacity: 0.12;
          animation: solFloat 4s ease-in-out infinite;
        }
        @keyframes solFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .sol-patissier-text h2 {
          font-family: var(--font-cormorant), serif;
          font-weight: 300;
          font-size: clamp(24px, 3.5vw, 40px);
          color: #FFF5F0;
          letter-spacing: 0.1em;
          margin-bottom: 8px;
        }
        .sol-patissier-text h3 {
          font-family: var(--font-noto-serif-jp), serif;
          font-size: 14px;
          color: #D4A574;
          letter-spacing: 0.1em;
          margin-bottom: 24px;
          font-weight: 400;
        }
        .sol-patissier-text p {
          font-size: 15px;
          color: rgba(255,245,240,0.8);
          line-height: 2;
          margin-bottom: 24px;
          font-weight: 300;
        }
        .sol-badges {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .sol-badge {
          padding: 6px 16px;
          border: 1px solid rgba(212,165,116,0.3);
          border-radius: 20px;
          font-size: 12px;
          color: #D4A574;
          font-family: var(--font-noto-sans-jp), sans-serif;
          letter-spacing: 0.05em;
        }

        /* --- gift --- */
        .sol-gift {
          padding: 60px 5vw;
          background: #FFF5F0;
          position: relative;
          overflow: hidden;
        }
        .sol-gift h2 {
          font-family: var(--font-cormorant), serif;
          font-weight: 300;
          font-size: clamp(28px, 4vw, 48px);
          color: #2C1810;
          text-align: center;
          letter-spacing: 0.15em;
          margin-bottom: 8px;
        }
        .sol-gift-sub {
          text-align: center;
          font-family: var(--font-noto-serif-jp), serif;
          color: #C9736B;
          font-size: 14px;
          letter-spacing: 0.1em;
          margin-bottom: 60px;
        }
        .sol-gift-grid {
          max-width: 900px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 32px;
        }
        .sol-gift-card {
          perspective: 600px;
        }
        .sol-gift-box {
          background: #FFF;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(44,24,16,0.08);
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s;
        }
        .sol-gift-box:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 40px rgba(44,24,16,0.15);
        }
        .sol-gift-lid {
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
          transform-origin: top center;
        }
        .sol-gift-box:hover .sol-gift-lid {
          transform: translateY(-8px) rotateX(15deg);
        }
        .sol-gift-body {
          padding: 20px 24px 24px;
        }

        /* --- access --- */
        .sol-access {
          background: #2C1810;
          padding: 60px 5vw;
          position: relative;
        }
        .sol-access h2 {
          font-family: var(--font-cormorant), serif;
          font-weight: 300;
          font-size: clamp(28px, 4vw, 48px);
          color: #FFF5F0;
          text-align: center;
          letter-spacing: 0.15em;
          margin-bottom: 48px;
        }
        .sol-ticket {
          max-width: 600px;
          margin: 0 auto;
          border: 2px dashed rgba(212,165,116,0.4);
          border-radius: 16px;
          padding: 40px;
          position: relative;
          background: rgba(255,245,240,0.03);
        }
        .sol-ticket::before, .sol-ticket::after {
          content: '';
          position: absolute;
          width: 24px;
          height: 24px;
          background: #2C1810;
          border-radius: 50%;
          border: 2px dashed rgba(212,165,116,0.4);
        }
        .sol-ticket::before { top: -13px; left: 50%; transform: translateX(-50%); }
        .sol-ticket::after { bottom: -13px; left: 50%; transform: translateX(-50%); }
        .sol-ticket-brand {
          font-family: var(--font-cormorant), serif;
          font-size: 24px;
          color: #D4A574;
          text-align: center;
          letter-spacing: 0.15em;
          margin-bottom: 24px;
        }
        .sol-ticket-divider {
          border: none;
          border-top: 1px dashed rgba(212,165,116,0.3);
          margin: 16px 0;
        }
        .sol-ticket-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding: 8px 0;
        }
        .sol-ticket-label {
          font-size: 12px;
          color: #8B6F5E;
          letter-spacing: 0.1em;
          font-family: var(--font-noto-sans-jp), sans-serif;
        }
        .sol-ticket-value {
          font-size: 14px;
          color: #FFF5F0;
          font-family: var(--font-noto-serif-jp), serif;
          text-align: right;
        }

        /* --- contact --- */
        .sol-contact {
          padding: 60px 5vw;
          background: #FFF5F0;
          position: relative;
          overflow: hidden;
        }
        .sol-contact h2 {
          font-family: var(--font-cormorant), serif;
          font-weight: 300;
          font-size: clamp(28px, 4vw, 48px);
          color: #2C1810;
          text-align: center;
          letter-spacing: 0.15em;
          margin-bottom: 8px;
        }
        .sol-contact-sub {
          text-align: center;
          font-family: var(--font-noto-serif-jp), serif;
          color: #C9736B;
          font-size: 14px;
          letter-spacing: 0.1em;
          margin-bottom: 60px;
        }
        .sol-form-frame {
          max-width: 600px;
          margin: 0 auto;
          position: relative;
          padding: 48px;
          background: #FFF;
          border-radius: 16px;
          box-shadow: 0 4px 32px rgba(44,24,16,0.06);
        }
        /* piping pattern border */
        .sol-form-frame::before {
          content: '';
          position: absolute;
          inset: 8px;
          border: 2px solid transparent;
          border-image: repeating-linear-gradient(90deg, #F2D7C9 0px, #F2D7C9 8px, transparent 8px, transparent 14px) 2;
          border-radius: 12px;
          pointer-events: none;
        }
        .sol-form-group {
          margin-bottom: 24px;
        }
        .sol-form-group label {
          display: block;
          font-family: var(--font-noto-serif-jp), serif;
          font-size: 13px;
          color: #8B6F5E;
          margin-bottom: 8px;
          letter-spacing: 0.05em;
        }
        .sol-form-group input, .sol-form-group textarea {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #F2D7C9;
          border-radius: 8px;
          font-size: 15px;
          font-family: var(--font-noto-sans-jp), sans-serif;
          color: #2C1810;
          background: #FFFAF8;
          outline: none;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .sol-form-group input:focus, .sol-form-group textarea:focus {
          border-color: #C9736B;
          box-shadow: 0 0 0 3px rgba(201,115,107,0.1);
        }
        .sol-form-group textarea { resize: vertical; min-height: 120px; }
        .sol-form-submit {
          display: block;
          width: 100%;
          padding: 14px;
          background: #C9736B;
          color: #FFF5F0;
          border: none;
          border-radius: 8px;
          font-size: 15px;
          font-family: var(--font-noto-serif-jp), serif;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: background 0.3s, transform 0.2s;
        }
        .sol-form-submit:hover { background: #B5625A; transform: translateY(-1px); }
        .sol-form-submit:active { transform: translateY(0); }
        .sol-form-sent {
          text-align: center;
          padding: 40px;
          font-family: var(--font-noto-serif-jp), serif;
          color: #C9736B;
          font-size: 16px;
        }
        @media (max-width: 768px) {
          .sol-form-frame { padding: 32px 24px; }
        }

        /* --- footer --- */
        .sol-footer {
          background: #1E110B;
          padding: 60px 5vw 40px;
          text-align: center;
        }
        .sol-footer-brand {
          font-family: var(--font-cormorant), serif;
          font-size: 28px;
          font-weight: 300;
          color: #D4A574;
          letter-spacing: 0.2em;
          margin-bottom: 16px;
        }
        .sol-footer-info {
          font-size: 12px;
          color: #8B6F5E;
          margin-bottom: 24px;
          line-height: 1.8;
        }
        .sol-footer-copy {
          font-size: 11px;
          color: rgba(139,111,94,0.5);
          letter-spacing: 0.05em;
        }
        .sol-footer-cake {
          display: inline-block;
          margin-bottom: 16px;
          opacity: 0.2;
        }
        .sol-footer-tida {
          margin-top: 20px;
          font-size: 11px;
          color: rgba(139,111,94,0.4);
        }
        .sol-footer-tida a {
          color: rgba(139,111,94,0.5);
          text-decoration: none;
          transition: color 0.3s;
        }
        .sol-footer-tida a:hover { color: #D4A574; }

        /* --- demo banner --- */
        .sol-demo-banner {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 200;
          background: linear-gradient(135deg, #2C1810 0%, #3D251B 100%);
          padding: 12px 24px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 16px;
          border-top: 1px solid rgba(212,165,116,0.2);
        }
        .sol-demo-banner p {
          color: #FFF5F0;
          font-size: 13px;
          font-family: var(--font-noto-sans-jp), sans-serif;
        }
        .sol-demo-banner a {
          display: inline-block;
          padding: 8px 20px;
          background: #C9736B;
          color: #FFF5F0;
          border-radius: 6px;
          text-decoration: none;
          font-size: 13px;
          font-family: var(--font-noto-sans-jp), sans-serif;
          transition: background 0.3s;
        }
        .sol-demo-banner a:hover { background: #B5625A; }

        /* --- section title helper --- */
        .sol-section-label {
          font-family: var(--font-cormorant), serif;
          font-size: 12px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          margin-bottom: 4px;
        }
        html { scroll-behavior: smooth; }
        button[type="submit"], .sol-form-submit {
          transition: transform 0.2s ease, box-shadow 0.2s ease !important;
        }
        button[type="submit"]:hover, .sol-form-submit:hover { transform: scale(1.03) !important; }
        button[type="submit"]:active, .sol-form-submit:active { transform: scale(0.98) !important; }
      `}</style>

      <div className="sol-page">
        {/* Sparkle canvas */}
        <canvas ref={sparkleCanvasRef} className="sol-sparkle-canvas" />

        {/* Piping trail */}
        <div ref={pipingTrailRef} className="sol-piping-trail" style={{ height: "0%" }} />

        {/* ============ HEADER ============ */}
        <header ref={headerRef} className="sol-header">
          <span className="sol-header-brand">Soleil</span>
          <nav className="sol-desktop-nav" style={{ display: "flex" }}>
            <ul className="sol-header-nav">
              <li><a href="/web#gallery">ギャラリーに戻る</a></li>
              <li><a href="#showcase">ショーケース</a></li>
              <li><a href="#atelier">アトリエ</a></li>
              <li><a href="#contact">お問い合わせ</a></li>
            </ul>
          </nav>
          {/* Mobile Menu Button */}
          <button
            className="sol-mobile-menu-btn"
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
                  background: "#FFF5F0",
                  transition: "background 0.4s",
                }}
              />
            ))}
          </button>
        </header>
        {/* Mobile Menu */}
        {menuOpen && (
          <div
            className="sol-mobile-menu"
            style={{
              position: "fixed",
              top: 48,
              left: 0,
              right: 0,
              zIndex: 99,
              background: "rgba(44,24,16,0.97)",
              backdropFilter: "blur(12px)",
              padding: "16px 24px 24px",
            }}
          >
            {[
              { href: "/web#gallery", label: "ギャラリーに戻る" },
              { href: "#showcase", label: "ショーケース" },
              { href: "#atelier", label: "アトリエ" },
              { href: "#contact", label: "お問い合わせ" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "12px 0",
                  color: "#FFF5F0",
                  fontSize: "0.9rem",
                  letterSpacing: "0.06em",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(212,165,116,0.2)",
                  fontFamily: "var(--font-noto-sans-jp), sans-serif",
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}

        {/* ============ HERO ============ */}
        <div className="sol-hero" ref={heroRef}>
          <div className="hero-bg" />
          <div className="sol-hero-content">
            <h1 className="sol-hero-title">
              <span className={heroLettersSpread ? "spread" : "gathered"}>
                {"Patisserie Soleil".split("").map((ch, i) => (
                  <span key={i} style={{ display: "inline-block", minWidth: ch === " " ? "0.3em" : undefined }}>
                    {ch}
                  </span>
                ))}
              </span>
            </h1>
            <div className="sol-hero-line" />
            <p className="sol-hero-sub">奄美の恵みを、ひとつのケーキに</p>
          </div>
          <div className="sol-hero-scroll">SCROLL</div>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 3 }}>
            <CreamWave id="w1" />
          </div>
        </div>

        {/* ============ CONCEPT ============ */}
        <section
          className="sol-concept sol-parchment sol-section"
          ref={(el) => addSectionRef(el, 0)}
        >
          <div className="sol-concept-inner">
            <div className="sol-concept-text">
              <p className="sol-section-label" style={{ color: "#D4A574" }}>Concept</p>
              <h2>Notre Histoire</h2>
              <p className="sol-tagline">
                島のフルーツと、フランスの技法が出会う場所
              </p>
              <p>
                奄美大島の陽光が育てた果実たち。タンカン、パッションフルーツ、島バナナ、マンゴー。
                この豊かな恵みに、パリで磨いたフランス菓子の技法を重ね合わせる。
                <br /><br />
                素材の声に耳を傾け、一つひとつ丁寧に。島の風土とフランスの伝統が交差する場所で、
                ここにしかない味わいを生み出しています。
              </p>
            </div>
            <div className="sol-concept-visual" style={{ borderRadius: 12, overflow: "hidden" }}>
              <Image
                src="/images/demo/patisserie/concept.jpg"
                alt="美しいケーキの断面"
                width={800}
                height={600}
                className="w-full aspect-[4/5] object-cover"
              />
            </div>
          </div>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
            <CreamWave id="w2" color="#2C1810" />
          </div>
        </section>

        {/* ============ SHOWCASE ============ */}
        <section
          className="sol-showcase sol-section"
          id="showcase"
          ref={(el) => addSectionRef(el, 1)}
        >
          <p className="sol-section-label" style={{ color: "#8B6F5E", textAlign: "center" }}>Lineup</p>
          <h2>ラインナップ</h2>
          <p className="sol-showcase-sub">季節のおすすめ</p>
          <div className="sol-glass-frame">
            <div className="sol-glass-top" />
            <div className="sol-glass-body">
              <div
                className="sol-showcase-scroll"
                ref={showcaseScrollRef}
                onWheel={onShowcaseWheel}
              >
                {PRODUCTS.map((p, i) => (
                  <div className="sol-showcase-item" key={i}>
                    <div className="sol-pedestal">
                      <Image src={p.img} alt={p.name} width={600} height={400} />
                    </div>
                    <div className="sol-pedestal-base" />
                    <p className="sol-showcase-name">{p.name}</p>
                    <p className="sol-showcase-desc">{p.desc}</p>
                    <p className="sol-showcase-price">&yen;{p.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="sol-scroll-hint">-- 横にスクロールしてご覧ください --</p>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
            <CreamWave id="w3" color="#FFF5F0" />
          </div>
        </section>

        {/* ============ SEASONAL ============ */}
        <section
          className="sol-seasonal sol-section"
          ref={(el) => addSectionRef(el, 2)}
        >
          <div className="sol-seasonal-bg" />
          <div className="sol-seasonal-content">
            <div className="sol-season-wheel">
              {SEASONS.map((s, i) => {
                const active = i === seasonIdx;
                const positions = [
                  { top: 0, left: "50%", transform: "translateX(-50%)" },
                  { top: "50%", right: 0, transform: "translateY(-50%)" },
                  { bottom: 0, left: "50%", transform: "translateX(-50%)" },
                  { top: "50%", left: 0, transform: "translateY(-50%)" },
                ];
                return (
                  <span
                    key={s}
                    className={`sol-season-item ${active ? "sol-season-active" : "sol-season-inactive"}`}
                    style={positions[i] as React.CSSProperties}
                  >
                    {s}
                  </span>
                );
              })}
            </div>
            <div className="sol-seasonal-text">
              <p className="sol-section-label" style={{ color: "#8B6F5E" }}>Seasonal</p>
              <h2>季節のケーキ</h2>
              <h3 style={{ transition: "opacity 0.4s ease" }}>{SEASON_DETAILS[seasonIdx].title}</h3>
              <p style={{ transition: "opacity 0.4s ease", whiteSpace: "pre-line" }}>
                {SEASON_DETAILS[seasonIdx].desc}
              </p>
            </div>
          </div>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 3 }}>
            <CreamWave id="w4" />
          </div>
        </section>

        {/* ============ ATELIER ============ */}
        <section
          className="sol-atelier sol-parchment sol-section"
          id="atelier"
          ref={(el) => addSectionRef(el, 3)}
        >
          <p className="sol-section-label" style={{ color: "#D4A574", textAlign: "center" }}>Atelier</p>
          <h2>アトリエ</h2>
          <p className="sol-atelier-sub">お菓子が生まれる場所</p>
          <div className="sol-atelier-collage">
            <div className="sol-atelier-img">
              <Image
                src="/images/demo/patisserie/atelier.jpg"
                alt="アトリエ風景"
                width={600}
                height={400}
              />
            </div>
            <div className="sol-atelier-img">
              <Image
                src="/images/demo/patisserie/atelier-baking.jpg"
                alt="焼き上がり"
                width={600}
                height={400}
              />
            </div>
            <div className="sol-atelier-img">
              <Image
                src="/images/demo/patisserie/atelier-decoration.jpg"
                alt="デコレーション"
                width={600}
                height={400}
              />
            </div>
            <div className="sol-atelier-img">
              <Image
                src="/images/demo/patisserie/atelier-ingredients.jpg"
                alt="素材"
                width={600}
                height={400}
              />
            </div>
            <div className="sol-atelier-img">
              <Image
                src="/images/demo/patisserie/atelier-display.jpg"
                alt="仕上げ"
                width={600}
                height={400}
              />
            </div>
            <div className="sol-atelier-tools">
              <WhiskSVG />
              <PipingBagSVG />
              <RollingPinSVG />
            </div>
          </div>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
            <CreamWave id="w5" color="#2C1810" />
          </div>
        </section>

        {/* ============ PATISSIER ============ */}
        <section
          className="sol-patissier sol-section"
          ref={(el) => addSectionRef(el, 4)}
        >
          {/* floating toque */}
          <svg className="sol-toque" width="120" height="140" viewBox="0 0 120 140" aria-hidden="true">
            <ellipse cx="60" cy="50" rx="45" ry="40" fill="#FFF5F0" opacity="0.15" />
            <ellipse cx="60" cy="35" rx="25" ry="22" fill="#FFF5F0" opacity="0.12" />
            <ellipse cx="60" cy="25" rx="15" ry="15" fill="#FFF5F0" opacity="0.10" />
            <rect x="20" y="80" width="80" height="30" rx="2" fill="#FFF5F0" opacity="0.12" />
            <line x1="20" y1="90" x2="100" y2="90" stroke="#D4A574" strokeWidth="1" opacity="0.15" />
          </svg>
          <div className="sol-patissier-inner">
            <div className="sol-patissier-photo" ref={patissierPhotoRef}>
              <Image
                src="/images/demo/patisserie/patissier.jpg"
                alt="パティシエ"
                width={800}
                height={600}
              />
            </div>
            <div className="sol-patissier-text">
              <p className="sol-section-label" style={{ color: "#8B6F5E" }}>Patissier</p>
              <h2>Chef Patissier</h2>
              <h3>鈴木 陽子 / Yoko Sakuta</h3>
              <p>
                東京の製菓学校を卒業後、パリの名店「Pierre Herme」で3年間の修業。
                帰国後は都内のパティスリーでシェフパティシエを務め、2023年に故郷・奄美大島で
                Patisserie Soleilをオープン。
              </p>
              <p>
                「島の素材には、まだ知られていない可能性がたくさんあります。フランス菓子の技法で、
                その魅力を最大限に引き出したい。」
              </p>
              <div className="sol-badges">
                <span className="sol-badge">製菓衛生師</span>
                <span className="sol-badge">Pierre Herme Paris 研修</span>
                <span className="sol-badge">フランス菓子技術認定</span>
                <span className="sol-badge">奄美大島出身</span>
              </div>
            </div>
          </div>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
            <CreamWave id="w1" />
          </div>
        </section>

        {/* ============ GIFT ============ */}
        <section
          className="sol-gift sol-parchment sol-section"
          ref={(el) => addSectionRef(el, 5)}
        >
          <p className="sol-section-label" style={{ color: "#D4A574", textAlign: "center" }}>Gift</p>
          <h2>ギフト</h2>
          <p className="sol-gift-sub">大切な方への贈り物に</p>
          <div className="sol-gift-grid">
            {[
              {
                label: "Petit Cadeau",
                price: "¥2,400（税込）",
                desc: "焼き菓子5種の小箱。黒糖カヌレ、マドレーヌ、島バナナのフィナンシェなど。日持ち約2週間。ちょっとしたお礼やご挨拶に。",
                img: "/images/demo/patisserie/gift-petit.jpg",
              },
              {
                label: "Coffret Soleil",
                price: "¥4,800（税込）",
                desc: "当店人気の焼き菓子8種にタンカンのコンフィチュール、パッションフルーツのパートドフリュイを添えた看板ギフト。のし対応可。",
                img: "/images/demo/patisserie/gift-coffret.jpg",
              },
              {
                label: "Celebration",
                price: "¥8,000（税込）",
                desc: "記念日や特別な贈り物に。生菓子と焼き菓子の贅沢なアソート。メッセージカード付き。3日前までの要予約。",
                img: "/images/demo/patisserie/atelier-decoration.jpg",
              },
            ].map((item, i) => (
              <div key={i} className="sol-gift-card" style={{ background: "none", border: "none", padding: 0 }}>
                <div style={{ borderRadius: 12, overflow: "hidden", marginBottom: 16 }}>
                  <Image src={item.img} alt={item.label} width={600} height={400} className="w-full aspect-[3/2] object-cover" />
                </div>
                <p style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1.1rem", fontWeight: 600, color: "#D4A574", letterSpacing: "0.05em", marginBottom: 4 }}>{item.label}</p>
                <p style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1.2rem", fontWeight: 700, color: "#C9736B", marginBottom: 8 }}>{item.price}</p>
                <p style={{ fontSize: "0.82rem", color: "#5C4A3D", lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
            <CreamWave id="w2" color="#2C1810" />
          </div>
        </section>

        {/* ============ ACCESS ============ */}
        <section
          className="sol-access sol-section"
          ref={(el) => addSectionRef(el, 6)}
        >
          <p className="sol-section-label" style={{ color: "#8B6F5E", textAlign: "center" }}>Access</p>
          <h2>アクセス</h2>
          <div className="sol-ticket">
            <p className="sol-ticket-brand">Patisserie Soleil</p>
            <hr className="sol-ticket-divider" />
            <div className="sol-ticket-row">
              <span className="sol-ticket-label">所在地</span>
              <span className="sol-ticket-value">鹿児島県奄美市名瀬</span>
            </div>
            <div className="sol-ticket-row">
              <span className="sol-ticket-label">営業時間</span>
              <span className="sol-ticket-value">10:00 - 19:00</span>
            </div>
            <div className="sol-ticket-row">
              <span className="sol-ticket-label">定休日</span>
              <span className="sol-ticket-value">毎週火曜日</span>
            </div>
            <hr className="sol-ticket-divider" />
            <div className="sol-ticket-row">
              <span className="sol-ticket-label">電話</span>
              <span className="sol-ticket-value">0997-XX-XXXX</span>
            </div>
            <div className="sol-ticket-row">
              <span className="sol-ticket-label">メール</span>
              <span className="sol-ticket-value">info@soleil-amami.com</span>
            </div>
            <hr className="sol-ticket-divider" />
            <div className="sol-ticket-row">
              <span className="sol-ticket-label">駐車場</span>
              <span className="sol-ticket-value">3台分あり</span>
            </div>
            <div className="sol-ticket-row">
              <span className="sol-ticket-label">最寄り</span>
              <span className="sol-ticket-value">名瀬港より車で5分</span>
            </div>
            {/* Map illustration */}
            <div style={{
              marginTop: 24,
              height: 200,
              borderRadius: 8,
              overflow: "hidden",
              border: "1px solid rgba(212,165,116,0.15)",
            }}>
              <MapIllustration />
            </div>
          </div>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
            <CreamWave id="w3" />
          </div>
        </section>

        {/* ============ CONTACT ============ */}
        <section
          className="sol-contact sol-parchment sol-section"
          id="contact"
          ref={(el) => addSectionRef(el, 7)}
        >
          <p className="sol-section-label" style={{ color: "#D4A574", textAlign: "center" }}>Contact</p>
          <h2>お問い合わせ</h2>
          <p className="sol-contact-sub">ご予約・ご質問はこちらから</p>
          <div className="sol-form-frame">
            {formSent ? (
              <div className="sol-form-sent">
                <p>お問い合わせありがとうございます。</p>
                <p style={{ fontSize: 14, marginTop: 8, color: "#8B6F5E" }}>
                  2営業日以内にご返信いたします。
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="sol-form-group">
                  <label htmlFor="sol-name">お名前</label>
                  <input
                    id="sol-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="sol-form-group">
                  <label htmlFor="sol-email">メールアドレス</label>
                  <input
                    id="sol-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="sol-form-group">
                  <label htmlFor="sol-message">メッセージ</label>
                  <textarea
                    id="sol-message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>
                <button type="submit" className="sol-form-submit">
                  送信する
                </button>
              </form>
            )}
          </div>
        </section>

        {/* ============ FOOTER ============ */}
        <footer className="sol-footer">
          {/* cake silhouette */}
          <div className="sol-footer-cake">
            <svg width="60" height="50" viewBox="0 0 60 50" aria-hidden="true">
              <rect x="10" y="25" width="40" height="20" rx="4" fill="#D4A574" />
              <rect x="10" y="15" width="40" height="12" rx="4" fill="#C9736B" />
              <path d="M10,15 Q15,8 30,6 Q45,8 50,15" fill="#F2D7C9" />
              <circle cx="22" cy="6" r="3" fill="#E8734A" />
              <circle cx="30" cy="3" r="3" fill="#F4C542" />
              <circle cx="38" cy="6" r="3" fill="#4CAF50" />
              <rect x="28" y="45" width="4" height="5" rx="1" fill="#8B6F5E" />
            </svg>
          </div>
          <p className="sol-footer-brand">Patisserie Soleil</p>
          <p className="sol-footer-info">
            鹿児島県奄美市名瀬<br />
            TEL: 0997-XX-XXXX / info@soleil-amami.com<br />
            営業時間: 10:00 - 19:00 / 定休日: 火曜日
          </p>
          <p className="sol-footer-copy">&copy; 2026 Patisserie Soleil. All rights reserved.</p>
          <p className="sol-footer-tida">
            Designed by <a href="/web#gallery">ALPACA</a>
          </p>
        </footer>

        {/* ============ DEMO BANNER ============ */}
        <div className="sol-demo-banner">
          <p>これはALPACAが制作したデモサイトです</p>
          <a href="/web#gallery">ギャラリーに戻る</a>
        </div>
      </div>

      {/* ===== FIXED BOTTOM CTA BAR ===== */}
      <style>{`
        @keyframes patisserie-cta-slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .patisserie-cta-bar {
          animation: patisserie-cta-slide-up 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
      {showCta && (
        <div
          className="patisserie-cta-bar fixed bottom-0 left-0 right-0 z-40 px-4 py-3 flex items-center justify-between gap-3"
          style={{
            backgroundColor: "rgba(255, 245, 240, 0.97)",
            backdropFilter: "blur(12px)",
            borderTop: "1px solid rgba(201,115,107,0.25)",
            boxShadow: "0 -4px 20px rgba(201,115,107,0.1)",
          }}
          role="complementary"
          aria-label="お問い合わせのショートカット"
        >
          <a
            href="tel:0997-XX-XXXX"
            className="flex items-center justify-center gap-2 flex-1 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 hover:opacity-80"
            style={{ backgroundColor: "#C9736B", color: "#ffffff" }}
            aria-label="電話する: 0997-XX-XXXX"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>
            電話する
          </a>
          <a
            href="#contact"
            className="flex items-center justify-center gap-2 flex-1 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 hover:opacity-80"
            style={{ border: "1px solid rgba(201,115,107,0.5)", color: "#C9736B" }}
            aria-label="お問い合わせフォームへスクロール"
          >
            Web予約/お問い合わせ
          </a>
        </div>
      )}
    </>
  );
}
