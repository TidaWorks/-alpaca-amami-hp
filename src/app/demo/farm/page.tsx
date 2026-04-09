"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function FarmDemoPage() {
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "",
    message: "",
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showCta, setShowCta] = useState(false);

  // Hero parallax
  const heroRef = useRef<HTMLElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);

  // Product card 3D tilt
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Calendar bar animation
  const calendarRef = useRef<HTMLDivElement>(null);
  const [calendarVisible, setCalendarVisible] = useState(false);

  // Gallery stagger
  const galleryRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Stats tree rings
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  // Shipping flow animation
  const shippingRef = useRef<HTMLDivElement>(null);
  const [shippingVisible, setShippingVisible] = useState(false);

  useEffect(() => {
    document.title = "あまみ果樹園 太陽のしずく | 奄美大島の直売農園";
  }, []);

  useEffect(() => {
    const onScroll = () => setShowCta(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hero parallax on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!heroImgRef.current) return;
      const scrollY = window.scrollY;
      heroImgRef.current.style.transform = `translateY(${scrollY * 0.35}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Product card 3D tilt
  useEffect(() => {
    const cards = cardRefs.current;
    const handlers: Array<{ el: HTMLDivElement; move: (e: MouseEvent) => void; leave: () => void }> = [];

    cards.forEach((card) => {
      if (!card) return;
      const onMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotX = ((y - cy) / cy) * -5;
        const rotY = ((x - cx) / cx) * 5;
        card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
        const shine = card.querySelector<HTMLDivElement>(".card-shine");
        if (shine) {
          const pct = (x / rect.width) * 100;
          shine.style.background = `linear-gradient(${105 + rotY * 2}deg, transparent ${pct - 10}%, rgba(255,255,255,0.18) ${pct}%, transparent ${pct + 10}%)`;
          shine.style.opacity = "1";
        }
      };
      const onLeave = () => {
        card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
        const shine = card.querySelector<HTMLDivElement>(".card-shine");
        if (shine) shine.style.opacity = "0";
      };
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      handlers.push({ el: card, move: onMove, leave: onLeave });
    });

    return () => {
      handlers.forEach(({ el, move, leave }) => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  // Vine fruit sway — add sway class after drop animation finishes
  useEffect(() => {
    if (!calendarVisible) return;
    const timer = setTimeout(() => {
      const dots = document.querySelectorAll<SVGElement>(".fruit-dot.vine-visible");
      dots.forEach((el, i) => {
        el.classList.add("fruit-sway-active");
        // Stagger the sway phase so fruits don't all move in unison
        const delay = (i * 0.22) % 3.2;
        (el as unknown as HTMLElement).style.animationDelay = `${-delay}s`;
      });
    }, 2800); // after the last vine + fruit drop finishes
    return () => clearTimeout(timer);
  }, [calendarVisible]);

  // Calendar, stats, shipping, gallery Intersection Observers
  useEffect(() => {
    const options = { threshold: 0.15 };

    const calObs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setCalendarVisible(true);
        calObs.disconnect();
      }
    }, options);
    if (calendarRef.current) calObs.observe(calendarRef.current);

    const statsObs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setStatsVisible(true);
        statsObs.disconnect();
      }
    }, options);
    if (statsRef.current) statsObs.observe(statsRef.current);

    const shipObs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setShippingVisible(true);
        shipObs.disconnect();
      }
    }, options);
    if (shippingRef.current) shipObs.observe(shippingRef.current);

    // Gallery stagger
    const galObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const idx = parseInt(el.dataset.idx || "0", 10);
          setTimeout(() => {
            el.classList.add("gallery-revealed");
          }, idx * 120);
          galObs.unobserve(el);
        }
      });
    }, { threshold: 0.1 });
    galleryRefs.current.forEach((el) => { if (el) galObs.observe(el); });

    return () => {
      calObs.disconnect();
      statsObs.disconnect();
      shipObs.disconnect();
      galObs.disconnect();
    };
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

    return () => observer.disconnect();
  }, []);

  const addRef = (el: HTMLDivElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  const addCardRef = (el: HTMLDivElement | null, i: number) => {
    cardRefs.current[i] = el;
  };

  const addGalleryRef = (el: HTMLDivElement | null, i: number) => {
    galleryRefs.current[i] = el;
  };

  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  const products = [
    {
      name: "たんかん",
      sub: "奄美特産柑橘",
      price: "¥2,800",
      unit: "3kg",
      desc: "奄美の温暖な気候が育てた甘みたっぷりの柑橘。皮が薄く、濃厚な果汁が特徴です。",
      season: "2〜3月",
      img: "https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=600&q=80",
      alt: "新鮮なたんかん",
    },
    {
      name: "パッションフルーツ",
      sub: "情熱果実",
      price: "¥3,200",
      unit: "6個",
      desc: "南国の香り漂う芳醇な果実。甘酸っぱさの中に深いコクがあり、ヨーグルトとも相性抜群。",
      season: "6〜8月",
      img: "https://images.unsplash.com/photo-1604928141064-207cea6f571f?auto=format&fit=crop&w=600&q=80",
      alt: "パッションフルーツ",
    },
    {
      name: "マンゴー",
      sub: "奄美完熟マンゴー",
      price: "¥4,500",
      unit: "1kg",
      desc: "木で完熟させてから収穫するため、とろけるような甘さと豊かな香り。贈り物にも人気。",
      season: "7〜8月",
      img: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=600&q=80",
      alt: "完熟マンゴー",
    },
    {
      name: "島バナナ",
      sub: "小粒で濃厚",
      price: "¥1,500",
      unit: "1房",
      desc: "市販のものと違い、小粒ながら甘みが凝縮された島バナナ。もちもちとした食感も魅力。",
      season: "通年",
      img: "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=600&q=80",
      alt: "島バナナ",
    },
    {
      name: "黒糖（自家製）",
      sub: "サトウキビ100%",
      price: "¥800",
      unit: "300g",
      desc: "自家栽培のサトウキビを昔ながらの製法で炊き上げた純黒糖。コクと深みが違います。",
      season: "通年",
      img: "https://images.unsplash.com/photo-1606788075772-de37ce4e3a98?auto=format&fit=crop&w=600&q=80",
      alt: "自家製黒糖",
    },
    {
      name: "ドラゴンフルーツ",
      sub: "南国の彩り果実",
      price: "¥1,800",
      unit: "3個",
      desc: "鮮やかなピンクの果肉が特徴。さっぱりとした甘さで南国気分を味わえる。",
      season: "8〜10月",
      img: "https://images.unsplash.com/photo-1527325678964-54921661f888?auto=format&fit=crop&w=600&q=80",
      alt: "ドラゴンフルーツ",
    },
    {
      name: "ジャム・ジュースセット",
      sub: "加工品セット",
      price: "¥2,500",
      unit: "セット",
      desc: "旬の果物で作ったジャム2本とフレッシュジュース1本のセット。お土産に大変人気です。",
      season: "通年",
      img: "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?auto=format&fit=crop&w=600&q=80",
      alt: "ジャムとジュースのセット",
    },
  ];

  const seasons = [
    { fruit: "たんかん", months: [2, 3], color: "#E07B39" },
    { fruit: "パッションフルーツ", months: [6, 7, 8], color: "#C84B9E" },
    { fruit: "マンゴー", months: [7, 8], color: "#F5A623" },
    { fruit: "島バナナ", months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], color: "#F7DC6F" },
    { fruit: "たんかん（早生）", months: [12, 1], color: "#E8A87C" },
    { fruit: "ドラゴンフルーツ", months: [8, 9, 10], color: "#E74C3C" },
  ];

  const monthLabels = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];

  const galleryPhotos = [
    { src: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=600&q=80", alt: "農園の果樹と青空", h: "h-64" },
    { src: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=600&q=80", alt: "収穫のようす", h: "h-48" },
    { src: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80", alt: "島の果樹園風景", h: "h-72" },
    { src: "https://images.unsplash.com/photo-1592921870789-04563d55041c?auto=format&fit=crop&w=600&q=80", alt: "南国の色鮮やかな果物", h: "h-56" },
    { src: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80", alt: "果物の断面", h: "h-64" },
    { src: "https://images.unsplash.com/photo-1526399543710-61d2a26cd2ea?auto=format&fit=crop&w=600&q=80", alt: "果樹の枝と実", h: "h-52" },
  ];

  return (
    <>
      <style>{`
        .font-sans-jp { font-family: var(--font-noto-sans-jp), sans-serif; }
        .font-serif-jp { font-family: var(--font-noto-serif-jp), serif; }
        html { scroll-behavior: smooth; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scrollDown {
          0%, 100% { opacity: 1; transform: translateY(0); }
          50% { opacity: 0.3; transform: translateY(12px); }
        }
        @keyframes leafSway {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        /* Vine fruit sway when calendar is visible */
        @keyframes fruitSway {
          0%, 100% { transform: rotate(-6deg) translateX(0px); }
          30% { transform: rotate(5deg) translateX(1px); }
          60% { transform: rotate(-4deg) translateX(-1px); }
        }
        /* Stem wobble for plant growth */
        @keyframes stemWobble {
          0% { transform: rotate(0deg); }
          20% { transform: rotate(1.5deg); }
          40% { transform: rotate(-1deg); }
          60% { transform: rotate(0.8deg); }
          80% { transform: rotate(-0.5deg); }
          100% { transform: rotate(0deg); }
        }
        /* Leaf flutter after appearing */
        @keyframes leafFlutter {
          0%, 100% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.04) rotate(2deg); }
          50% { transform: scale(0.98) rotate(-1.5deg); }
          75% { transform: scale(1.02) rotate(1deg); }
        }
        /* shun stamp wiggle on hover */
        @keyframes shunWiggle {
          0% { transform: rotate(-3deg) scale(1); }
          20% { transform: rotate(4deg) scale(1.12); }
          40% { transform: rotate(-3deg) scale(1.08); }
          60% { transform: rotate(3deg) scale(1.1); }
          80% { transform: rotate(-2deg) scale(1.05); }
          100% { transform: rotate(-3deg) scale(1); }
        }
        @keyframes barGrow {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }

        /* Growing plant / sprout animations */
        @keyframes stemGrow {
          from { stroke-dashoffset: 120; opacity: 0; }
          to { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes leafUnfurl {
          from { transform: scale(0) rotate(-30deg); opacity: 0; }
          to { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes fruitAppear {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes numberFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes soilSettle {
          from { transform: scaleX(0); opacity: 0; }
          to { transform: scaleX(1); opacity: 1; }
        }
        .plant-stem {
          stroke-dasharray: 120;
          stroke-dashoffset: 120;
          opacity: 0;
          transform-origin: bottom center;
        }
        .plant-stem.plant-visible {
          animation: stemGrow 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards, stemWobble 0.6s ease-in-out 0.75s forwards;
        }
        .plant-leaf {
          /* transform-origin is set per-element via inline style */
          transform: scale(0) rotate(-30deg);
          opacity: 0;
        }
        .plant-leaf.plant-visible {
          animation: leafUnfurl 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards, leafFlutter 2s ease-in-out 0.8s infinite;
        }
        .plant-fruit {
          transform-origin: center center;
          transform: scale(0);
          opacity: 0;
        }
        .plant-fruit.plant-visible {
          animation: fruitAppear 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .plant-soil {
          transform-origin: center center;
          transform: scaleX(0);
          opacity: 0;
        }
        .plant-soil.plant-visible {
          animation: soilSettle 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .plant-number {
          opacity: 0;
        }
        .plant-number.plant-visible {
          animation: numberFadeIn 0.4s ease forwards;
        }

        /* Earth / paper texture overlay for warm sections */
        .earth-texture {
          position: relative;
        }
        .earth-texture::after {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background-image:
            repeating-linear-gradient(
              47deg,
              transparent,
              transparent 18px,
              rgba(139,94,52,0.018) 18px,
              rgba(139,94,52,0.018) 19px
            ),
            repeating-linear-gradient(
              -30deg,
              transparent,
              transparent 22px,
              rgba(139,94,52,0.013) 22px,
              rgba(139,94,52,0.013) 23px
            );
          background-size: 80px 80px;
          border-radius: inherit;
          mix-blend-mode: multiply;
        }

        /* Wood grain background for stats */
        .wood-grain-bg {
          background-color: #F5ECD7;
          background-image:
            repeating-linear-gradient(
              92deg,
              transparent,
              transparent 3px,
              rgba(139,94,52,0.04) 3px,
              rgba(139,94,52,0.04) 6px
            ),
            repeating-linear-gradient(
              180deg,
              transparent,
              transparent 18px,
              rgba(139,94,52,0.03) 18px,
              rgba(139,94,52,0.03) 36px
            );
        }

        /* Market crate / マルシェ木箱 styles */
        .market-crate {
          position: relative;
          background: linear-gradient(145deg, #F5E6C8 0%, #EDD9A3 30%, #E8CE8A 60%, #F0D9A0 100%);
          border-radius: 6px;
          overflow: hidden;
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
        }
        /* On mobile, flex children in row-1 and row-3 expand to full width */
        @media (max-width: 639px) {
          .market-crate-flex-large,
          .market-crate-flex-small {
            flex: 1 1 100% !important;
          }
        }
        .market-crate::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 6px;
          background-image:
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 48px,
              rgba(139,94,52,0.12) 48px,
              rgba(139,94,52,0.12) 50px
            ),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 28px,
              rgba(139,94,52,0.08) 28px,
              rgba(139,94,52,0.08) 30px
            );
          pointer-events: none;
        }
        .market-crate::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 8px;
          background: linear-gradient(180deg, rgba(139,94,52,0.18) 0%, transparent 100%);
          border-radius: 6px 6px 0 0;
          pointer-events: none;
        }
        .market-crate:hover {
          transform: translateY(-8px) rotate(0.6deg) scale(1.012);
          box-shadow: 0 24px 56px rgba(44,24,16,0.30), 0 6px 18px rgba(44,24,16,0.16), inset 0 1px 0 rgba(255,253,247,0.5);
        }
        .market-crate:hover .crate-action-hint {
          opacity: 1;
          transform: translateY(0);
        }
        .market-crate:hover .shun-badge {
          animation: shunWiggle 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .crate-action-hint {
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.25s ease, transform 0.25s ease;
        }
        .crate-img-overflow {
          position: relative;
          z-index: 2;
          margin-top: -20px;
          margin-left: 12px;
          margin-right: 12px;
        }
        .price-tag {
          position: absolute;
          top: 12px;
          right: 10px;
          background: #FFFDF7;
          border: 1.5px solid rgba(139,94,52,0.35);
          border-radius: 4px 4px 4px 4px;
          padding: 4px 8px;
          line-height: 1;
          box-shadow: 2px 3px 8px rgba(44,24,16,0.18);
        }
        /* Dangling string above price tag */
        .price-tag::before {
          content: '';
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          width: 1.5px;
          height: 12px;
          background: rgba(139,94,52,0.45);
        }
        /* Hole punch circle at top */
        .price-tag::after {
          content: '';
          position: absolute;
          top: -4px;
          left: 50%;
          transform: translateX(-50%);
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(245,236,215,1);
          border: 1px solid rgba(139,94,52,0.4);
        }
        .shun-badge {
          display: inline-block;
          background: #E07B39;
          color: #FFFDF7;
          font-size: 10px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 2px;
          transform: rotate(-3deg);
          box-shadow: 2px 2px 6px rgba(44,24,16,0.25);
          letter-spacing: 0.05em;
          position: relative;
        }
        .shun-badge::before {
          content: '';
          position: absolute;
          inset: -1px;
          border: 1.5px dashed rgba(255,253,247,0.5);
          border-radius: 2px;
        }
        .handwritten-label {
          font-family: var(--font-noto-serif-jp), serif;
          font-weight: 400;
          letter-spacing: 0.02em;
          color: #3A2010;
        }
        .crate-border-h {
          position: absolute;
          left: 0; right: 0;
          height: 6px;
          background: linear-gradient(180deg, rgba(139,94,52,0.25) 0%, rgba(139,94,52,0.06) 100%);
        }
        .crate-border-v {
          position: absolute;
          top: 0; bottom: 0;
          width: 6px;
          background: linear-gradient(90deg, rgba(139,94,52,0.2) 0%, rgba(139,94,52,0.05) 100%);
        }

        /* Shipping cost badge — top-right corner of each crate */
        .shipping-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          z-index: 10;
          background: #E07B39;
          color: #FFFDF7;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.04em;
          padding: 3px 7px 3px 9px;
          line-height: 1.4;
          clip-path: polygon(8px 0%, 100% 0%, 100% 100%, 8px 100%, 0% 50%);
          box-shadow: 1px 2px 6px rgba(44,24,16,0.22);
          white-space: nowrap;
          pointer-events: none;
        }

        /* Order button — always visible, accent fill */
        .order-btn {
          display: block;
          width: 100%;
          margin-top: 10px;
          padding: 9px 12px;
          background: #E07B39;
          color: #FFFDF7;
          font-size: 12px;
          font-weight: 700;
          text-align: center;
          border-radius: 4px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          letter-spacing: 0.04em;
          transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
          box-shadow: 0 3px 10px rgba(224,123,57,0.35);
          position: relative;
          z-index: 4;
        }
        .order-btn:hover {
          background: #C96A28;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(224,123,57,0.45);
        }
        .order-btn:active {
          transform: translateY(0);
          box-shadow: 0 2px 6px rgba(224,123,57,0.3);
        }

        /* Vine / trellis calendar */
        @keyframes vineGrow {
          from { stroke-dashoffset: 1000; opacity: 0; }
          to { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes fruitDrop {
          from { opacity: 0; transform: scale(0) translateY(-8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .vine-path {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          /* pathLength="1000" is set on each <path> so dasharray/offset are normalized */
        }
        .vine-path.vine-visible {
          animation: vineGrow 2.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .fruit-dot {
          opacity: 0;
          transform-origin: top center;
        }
        .fruit-dot-sway {
          transform-origin: top center;
        }
        .fruit-dot.vine-visible {
          animation: fruitDrop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        /* Sway class applied after drop animation completes */
        .fruit-sway-active {
          animation: fruitSway 3.2s ease-in-out infinite;
          transform-origin: top center;
        }

        @keyframes growIn {
          from { opacity: 0; transform: scale(0.55); border-radius: 50%; }
          to { opacity: 1; transform: scale(1); border-radius: 0.75rem; }
        }
        @keyframes fruitFloat1 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          33% { transform: translateY(-18px) translateX(8px) rotate(4deg); }
          66% { transform: translateY(10px) translateX(-6px) rotate(-3deg); }
        }
        @keyframes fruitFloat2 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          40% { transform: translateY(14px) translateX(-10px) rotate(-5deg); }
          70% { transform: translateY(-8px) translateX(12px) rotate(3deg); }
        }
        @keyframes fruitFloat3 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          50% { transform: translateY(-22px) translateX(5px) rotate(6deg); }
        }
        @keyframes fruitFloat4 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          25% { transform: translateY(-12px) translateX(14px) rotate(5deg); }
          75% { transform: translateY(16px) translateX(-8px) rotate(-4deg); }
        }
        @keyframes drawArrow {
          from { stroke-dashoffset: 28; opacity: 0; }
          to { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes stepAppear {
          from { opacity: 0; transform: translateX(-16px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .animate-scroll { animation: scrollDown 2s ease-in-out infinite; }
        .hero-text { animation: fadeInUp 1s ease-out forwards; }
        .hero-text-delay { animation: fadeInUp 1s ease-out 0.3s forwards; opacity: 0; }
        .hero-text-delay2 { animation: fadeInUp 1s ease-out 0.6s forwards; opacity: 0; }

        /* Hero parallax bg clipped */
        .hero-bg-wrap {
          position: absolute; inset: 0; overflow: hidden;
        }
        .hero-parallax-img {
          position: absolute; inset: -20% 0; width: 100%; height: 140%;
          object-fit: cover; will-change: transform;
        }

        /* Diagonal dividers */
        .diagonal-down {
          clip-path: polygon(0 0, 100% 0, 100% 92%, 0 100%);
          padding-bottom: 5rem;
        }
        .diagonal-up {
          clip-path: polygon(0 8%, 100% 0, 100% 100%, 0 100%);
          padding-top: 6rem;
          margin-top: -3rem;
        }
        .diagonal-both {
          clip-path: polygon(0 4%, 100% 0, 100% 96%, 0 100%);
          padding-top: 5rem;
          padding-bottom: 5rem;
          margin-top: -2rem;
        }

        /* Product card 3D */
        .product-card-3d {
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          transform-style: preserve-3d;
          cursor: default;
          position: relative;
          overflow: hidden;
        }
        .product-card-3d:hover {
          box-shadow: 0 12px 40px rgba(44,24,16,0.18);
        }
        .card-shine {
          position: absolute; inset: 0; pointer-events: none;
          opacity: 0; transition: opacity 0.3s ease;
          z-index: 5;
          border-radius: inherit;
        }
        .product-card-3d:hover .product-img { transform: scale(1.05); }
        .product-img { transition: transform 0.5s ease; }

        /* Calendar bars */
        .cal-bar-wrap { transform-origin: left center; }
        .cal-bar-animated {
          animation: barGrow 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
          transform-origin: left center;
        }

        /* Gallery grow-in */
        .gallery-item {
          opacity: 0;
          transform: scale(0.55);
          border-radius: 50%;
          transition: none;
          /* Reserve height before animation to prevent columns layout shift */
          min-height: 120px;
        }
        .gallery-revealed {
          animation: growIn 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        /* Floating fruit silhouettes */
        .fruit-sil-1 { animation: fruitFloat1 7s ease-in-out infinite; }
        .fruit-sil-2 { animation: fruitFloat2 9s ease-in-out infinite; }
        .fruit-sil-3 { animation: fruitFloat3 11s ease-in-out infinite; }
        .fruit-sil-4 { animation: fruitFloat4 13s ease-in-out infinite; }

        /* Shipping steps */
        .shipping-step { opacity: 0; animation: none; }
        .shipping-step.visible {
          animation: stepAppear 0.5s ease-out both;
        }
        .step-arrow { stroke-dasharray: 28; stroke-dashoffset: 28; }
        .step-arrow.visible {
          animation: drawArrow 0.4s ease-out both;
        }

        .nav-link { position: relative; }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: #E07B39;
          transition: width 0.3s ease;
        }
        .nav-link:hover::after { width: 100%; }
        .season-bar { transition: all 0.3s ease; }
        .season-bar:hover { opacity: 0.8; filter: brightness(1.1); }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #FFFDF7; }
        ::-webkit-scrollbar-thumb { background: #E07B39; border-radius: 3px; }
        input:focus, textarea:focus, select:focus {
          border-color: #E07B39 !important;
          box-shadow: 0 0 0 3px rgba(224,123,57,0.18) !important;
          outline: none !important;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        button[type="submit"] {
          transition: transform 0.2s ease, box-shadow 0.2s ease !important;
        }
        button[type="submit"]:hover { transform: scale(1.03) !important; }
        button[type="submit"]:active { transform: scale(0.98) !important; }
      `}</style>

      <div className="min-h-screen font-sans-jp" style={{ backgroundColor: "#FFFDF7", color: "#2C1810" }}>

        {/* ===== FIXED HEADER ===== */}
        <header
          className="fixed top-0 left-0 right-0 z-50"
          style={{ backgroundColor: "rgba(255,253,247,0.96)", backdropFilter: "blur(8px)", borderBottom: "1px solid rgba(139,94,52,0.12)" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
            {/* Back link */}
            <a
              href="/web#gallery"
              className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-60"
              style={{ color: "#8B5E34" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>
              </svg>
              ギャラリーに戻る
            </a>

            {/* Farm name */}
            <div className="text-center">
              <p className="font-serif-jp font-semibold text-sm sm:text-base leading-tight" style={{ color: "#2C1810" }}>
                あまみ果樹園
              </p>
              <p className="font-serif-jp text-xs sm:text-sm" style={{ color: "#E07B39" }}>
                太陽のしずく
              </p>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              {[
                { label: "農園紹介", id: "about" },
                { label: "商品紹介", id: "products" },
                { label: "旬のカレンダー", id: "calendar" },
                { label: "農園体験", id: "experience" },
                { label: "配送について", id: "shipping" },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="nav-link text-sm font-medium"
                  style={{ color: "#5C3D2E" }}
                  onClick={(e) => smoothScroll(e, item.id)}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                className="text-sm font-medium px-4 py-2 rounded-full transition-all"
                style={{ backgroundColor: "#E07B39", color: "#fff" }}
                onClick={(e) => smoothScroll(e, "contact")}
              >
                ご注文はこちら
              </a>
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden flex flex-col gap-1 p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="メニューを開く"
            >
              <span className="block w-5 h-0.5 transition-all" style={{ backgroundColor: "#5C3D2E", transform: menuOpen ? "rotate(45deg) translate(3px,3px)" : "none" }} />
              <span className="block w-5 h-0.5 transition-all" style={{ backgroundColor: "#5C3D2E", opacity: menuOpen ? 0 : 1 }} />
              <span className="block w-5 h-0.5 transition-all" style={{ backgroundColor: "#5C3D2E", transform: menuOpen ? "rotate(-45deg) translate(3px,-3px)" : "none" }} />
            </button>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden" style={{ backgroundColor: "#FFFDF7", borderTop: "1px solid rgba(139,94,52,0.12)" }}>
              <nav className="flex flex-col px-6 py-4 gap-4">
                {[
                  { label: "農園紹介", id: "about" },
                  { label: "商品紹介", id: "products" },
                  { label: "旬のカレンダー", id: "calendar" },
                  { label: "農園体験", id: "experience" },
                  { label: "配送について", id: "shipping" },
                  { label: "アクセス", id: "access" },
                  { label: "ご注文・お問い合わせ", id: "contact" },
                ].map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="text-sm font-medium py-1"
                    style={{ color: "#5C3D2E" }}
                    onClick={(e) => smoothScroll(e, item.id)}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          )}
        </header>

        {/* ===== HERO ===== */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ paddingTop: "64px" }}>
          {/* Background image with parallax */}
          <div className="hero-bg-wrap">
            <Image
              ref={heroImgRef}
              src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80"
              alt="奄美の農園風景"
              className="hero-parallax-img"
              width={1200}
              height={800}
              priority
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(44,24,16,0.45) 0%, rgba(44,24,16,0.2) 50%, rgba(44,24,16,0.65) 100%)" }} />
          </div>

          {/* Floating fruit silhouettes — tankan, passion fruit, mango */}
          {/* Tankan (orange) with leaf */}
          <div className="fruit-sil-1 absolute pointer-events-none z-[1]" style={{ top: "16%", left: "7%", opacity: 0.18 }}>
            <svg width="70" height="80" viewBox="0 0 70 80">
              {/* Tankan body */}
              <ellipse cx="35" cy="50" rx="30" ry="28" fill="#E07B39" />
              {/* Navel dimple at top */}
              <ellipse cx="35" cy="23" rx="5" ry="3" fill="#C86420" />
              {/* Leaf */}
              <path d="M35 22 C28 10 18 6 14 14 C22 12 30 16 35 22Z" fill="#4A7C3F" />
              {/* Shine highlight */}
              <ellipse cx="25" cy="40" rx="7" ry="5" fill="rgba(255,255,255,0.25)" transform="rotate(-20 25 40)" />
            </svg>
          </div>
          {/* Passion fruit — oval with pattern lines */}
          <div className="fruit-sil-2 absolute pointer-events-none z-[1]" style={{ top: "58%", right: "6%", opacity: 0.17 }}>
            <svg width="60" height="72" viewBox="0 0 60 72">
              <ellipse cx="30" cy="38" rx="24" ry="30" fill="#7B3F9E" />
              {/* Surface pattern lines */}
              <path d="M30 10 Q42 24 30 38 Q18 52 30 66" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none" />
              <path d="M8 30 Q20 36 30 38 Q40 40 52 46" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none" />
              <path d="M10 48 Q20 42 30 38 Q40 34 50 28" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none" />
              {/* Stem */}
              <path d="M30 8 Q34 2 38 4" stroke="#4A7C3F" strokeWidth="3" fill="none" strokeLinecap="round" />
              {/* Shine */}
              <ellipse cx="21" cy="28" rx="5" ry="7" fill="rgba(255,255,255,0.2)" transform="rotate(-15 21 28)" />
            </svg>
          </div>
          {/* Mango */}
          <div className="fruit-sil-3 absolute pointer-events-none z-[1]" style={{ top: "25%", right: "13%", opacity: 0.16 }}>
            <svg width="58" height="72" viewBox="0 0 58 72">
              {/* Mango body — teardrop shape */}
              <path d="M29 68 C10 68 4 52 6 36 C8 20 18 6 29 4 C40 6 50 20 52 36 C54 52 48 68 29 68Z" fill="#F5A623" />
              {/* Blush on one side */}
              <path d="M38 20 C46 28 48 42 44 54 C48 46 50 34 48 24Z" fill="#E07B39" opacity="0.5" />
              {/* Stem */}
              <path d="M29 4 Q32 -2 35 0" stroke="#8B5E34" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              {/* Leaf */}
              <path d="M29 4 C20 -4 10 -2 8 6 C16 2 24 2 29 4Z" fill="#4A7C3F" />
              {/* Shine */}
              <ellipse cx="20" cy="28" rx="5" ry="8" fill="rgba(255,255,255,0.22)" transform="rotate(-20 20 28)" />
            </svg>
          </div>
          {/* Extra: small banana silhouette */}
          <div className="fruit-sil-4 absolute pointer-events-none z-[1]" style={{ top: "72%", left: "12%", opacity: 0.15 }}>
            <svg width="64" height="44" viewBox="0 0 64 44">
              <path d="M8 34 C12 12 34 4 54 10 C46 8 26 12 18 30Z" fill="#F7DC6F" />
              <path d="M8 34 C14 38 22 36 28 28 C22 34 14 36 8 34Z" fill="#D4B200" />
            </svg>
          </div>

          {/* Sun rays decoration */}
          <div className="absolute top-[8%] right-[18%] pointer-events-none z-[1]" style={{ opacity: 0.13 }}>
            <svg width="120" height="120" viewBox="0 0 120 120">
              <g transform="translate(60,60)">
                {Array.from({ length: 12 }, (_, i) => {
                  const angle = (i / 12) * 360;
                  const innerR = 18;
                  const outerR = 52 + (i % 3 === 0 ? 10 : 0);
                  const rad = (angle * Math.PI) / 180;
                  return (
                    <line
                      key={i}
                      x1={Math.cos(rad) * innerR}
                      y1={Math.sin(rad) * innerR}
                      x2={Math.cos(rad) * outerR}
                      y2={Math.sin(rad) * outerR}
                      stroke="#F5C842"
                      strokeWidth={i % 3 === 0 ? 3 : 1.5}
                      strokeLinecap="round"
                    />
                  );
                })}
                <circle cx="0" cy="0" r="16" fill="#F5C842" />
              </g>
            </svg>
          </div>

          {/* Butterfly 1 */}
          <div className="absolute pointer-events-none z-[1]" style={{ top: "42%", left: "18%", opacity: 0.18 }}>
            <svg width="44" height="36" viewBox="0 0 44 36" style={{ animation: "fruitFloat2 6s ease-in-out infinite" }}>
              {/* Left wings */}
              <path d="M22 18 C14 8 2 4 4 14 C6 22 14 22 22 18Z" fill="#F5C842" stroke="#8B5E34" strokeWidth="0.8" />
              <path d="M22 18 C12 20 6 28 10 32 C16 34 20 26 22 18Z" fill="#E07B39" stroke="#8B5E34" strokeWidth="0.8" opacity="0.9" />
              {/* Right wings */}
              <path d="M22 18 C30 8 42 4 40 14 C38 22 30 22 22 18Z" fill="#F5C842" stroke="#8B5E34" strokeWidth="0.8" />
              <path d="M22 18 C32 20 38 28 34 32 C28 34 24 26 22 18Z" fill="#E07B39" stroke="#8B5E34" strokeWidth="0.8" opacity="0.9" />
              {/* Body */}
              <ellipse cx="22" cy="18" rx="1.5" ry="6" fill="#2C1810" />
              {/* Antennae */}
              <path d="M21 13 Q18 8 16 6" stroke="#2C1810" strokeWidth="0.8" fill="none" strokeLinecap="round" />
              <circle cx="16" cy="6" r="1" fill="#2C1810" />
              <path d="M23 13 Q26 8 28 6" stroke="#2C1810" strokeWidth="0.8" fill="none" strokeLinecap="round" />
              <circle cx="28" cy="6" r="1" fill="#2C1810" />
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <p
              className="hero-text font-serif-jp text-sm sm:text-base tracking-widest mb-4"
              style={{ color: "rgba(255,253,247,0.85)" }}
            >
              鹿児島県 奄美大島
            </p>
            <h1
              className="hero-text-delay font-serif-jp text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-4"
              style={{ color: "#FFFDF7", textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
            >
              あまみ果樹園<br />
              <span style={{ color: "#F5C842" }}>太陽のしずく</span>
            </h1>
            <p
              className="hero-text-delay2 font-serif-jp text-lg sm:text-xl md:text-2xl font-normal tracking-wide"
              style={{ color: "rgba(255,253,247,0.92)" }}
            >
              奄美の太陽が育てた、島のめぐみ
            </p>
            <div
              className="hero-text-delay2 mt-8 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="#products"
                className="inline-block px-8 py-3 rounded-full font-medium text-sm sm:text-base transition-all hover:opacity-90"
                style={{ backgroundColor: "#E07B39", color: "#fff" }}
                onClick={(e) => smoothScroll(e, "products")}
              >
                商品を見る
              </a>
              <a
                href="#experience"
                className="inline-block px-8 py-3 rounded-full font-medium text-sm sm:text-base transition-all hover:bg-white/20"
                style={{ border: "2px solid rgba(255,253,247,0.8)", color: "#FFFDF7" }}
                onClick={(e) => smoothScroll(e, "experience")}
              >
                農園体験
              </a>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
            <span className="text-xs tracking-widest" style={{ color: "rgba(255,253,247,0.6)" }}>SCROLL</span>
            <div className="animate-scroll">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,253,247,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14"/><path d="M19 12l-7 7-7-7"/>
              </svg>
            </div>
          </div>
        </section>

        {/* ===== ABOUT ===== */}
        <section id="about" className="diagonal-down earth-texture" style={{ backgroundColor: "#FFFDF7", position: "relative", overflow: "hidden" }}>
          {/* Subtle bee near stats */}
          <div className="absolute pointer-events-none" style={{ top: "30%", right: "3%", opacity: 0.12, zIndex: 0 }}>
            <svg width="34" height="28" viewBox="0 0 34 28" style={{ animation: "fruitFloat3 7s ease-in-out infinite" }}>
              <ellipse cx="10" cy="9" rx="9" ry="5.5" fill="rgba(255,255,255,0.65)" stroke="rgba(139,94,52,0.25)" strokeWidth="0.7" />
              <ellipse cx="24" cy="9" rx="9" ry="5.5" fill="rgba(255,255,255,0.65)" stroke="rgba(139,94,52,0.25)" strokeWidth="0.7" />
              <ellipse cx="17" cy="18" rx="6" ry="8" fill="#F5C842" />
              <rect x="11" y="15" width="12" height="2.5" fill="#2C1810" opacity="0.65" rx="1" />
              <rect x="11" y="19" width="12" height="2.5" fill="#2C1810" opacity="0.65" rx="1" />
              <circle cx="17" cy="10" r="4.5" fill="#F5C842" />
              <circle cx="15.5" cy="9" r="0.9" fill="#2C1810" />
              <circle cx="18.5" cy="9" r="0.9" fill="#2C1810" />
            </svg>
          </div>
          <div
            ref={addRef}
            className="max-w-6xl mx-auto px-6 opacity-0 translate-y-8 transition-all duration-700 ease-out"
          >
            {/* Section label */}
            <div className="flex items-center gap-4 mb-12">
              <div className="h-px flex-1" style={{ backgroundColor: "#E07B39", opacity: 0.3 }} />
              <p className="text-xs tracking-widest font-medium" style={{ color: "#E07B39" }}>OUR STORY</p>
              <div className="h-px flex-1" style={{ backgroundColor: "#E07B39", opacity: 0.3 }} />
            </div>

            <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
              <div>
                <h2 className="font-serif-jp text-3xl md:text-4xl font-bold mb-6" style={{ color: "#2C1810" }}>
                  私たちの農園
                </h2>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#5C3D2E" }}>
                  「太陽のしずく」は、奄美大島の豊かな自然の中で3世代にわたって果樹を育ててきた農園です。祖父の代から続くこの土地で、島の気候と土壌を活かした農業を守り続けています。
                </p>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#5C3D2E" }}>
                  奄美大島は年間を通じて温暖な気候と豊富な雨量に恵まれており、亜熱帯の果物が力強く育ちます。化学肥料に頼らず、島の恵みを最大限に引き出す栽培方法にこだわっています。
                </p>
                <p className="text-sm leading-relaxed mb-8" style={{ color: "#5C3D2E" }}>
                  完熟してから収穫し、島から直接お届けする「採れたての美味しさ」をぜひ体験してください。
                </p>
                <div ref={statsRef} className="rounded-2xl p-6 wood-grain-bg" style={{ border: "1px solid rgba(139,94,52,0.18)" }}>
                  <div className="grid grid-cols-3 gap-4">

                    {/* Stat 1: 60+ years — large tankan fruit on stem */}
                    <div className="flex flex-col items-center gap-2">
                      <div style={{ position: "relative", width: 90, height: 110 }}>
                        <svg width="90" height="110" viewBox="0 0 90 110" style={{ overflow: "visible" }}>
                          {/* Soil mound */}
                          <ellipse
                            cx="45" cy="102" rx="32" ry="8"
                            fill="#8B5E34"
                            opacity="0.7"
                            className={`plant-soil${statsVisible ? " plant-visible" : ""}`}
                            style={{ animationDelay: statsVisible ? "0ms" : "0ms" }}
                          />
                          {/* Stem */}
                          <line
                            x1="45" y1="100" x2="45" y2="42"
                            stroke="#4A7C3F"
                            strokeWidth="3"
                            strokeLinecap="round"
                            pathLength="120"
                            className={`plant-stem${statsVisible ? " plant-visible" : ""}`}
                            style={{ animationDelay: statsVisible ? "80ms" : "0ms" }}
                          />
                          {/* Left leaf */}
                          <path
                            d="M45 72 C36 64 28 66 30 74 C36 78 42 76 45 72Z"
                            fill="#4A7C3F"
                            className={`plant-leaf${statsVisible ? " plant-visible" : ""}`}
                            style={{ animationDelay: statsVisible ? "500ms" : "0ms", transformOrigin: "45px 72px" }}
                          />
                          {/* Leaf vein */}
                          <path d="M45 72 C38 68 32 70 30 74" stroke="#3A6230" strokeWidth="0.8" fill="none"
                            className={`plant-leaf${statsVisible ? " plant-visible" : ""}`}
                            style={{ animationDelay: statsVisible ? "500ms" : "0ms", transformOrigin: "45px 72px" }}
                          />
                          {/* Right leaf */}
                          <path
                            d="M45 62 C54 54 62 56 60 64 C54 68 48 66 45 62Z"
                            fill="#5E8F54"
                            className={`plant-leaf${statsVisible ? " plant-visible" : ""}`}
                            style={{ animationDelay: statsVisible ? "620ms" : "0ms", transformOrigin: "45px 62px" }}
                          />
                          {/* Tankan fruit */}
                          <circle
                            cx="45" cy="32" r="20"
                            fill="#E07B39"
                            className={`plant-fruit${statsVisible ? " plant-visible" : ""}`}
                            style={{ animationDelay: statsVisible ? "800ms" : "0ms" }}
                          />
                          {/* Fruit highlight */}
                          <ellipse cx="38" cy="24" rx="5" ry="4" fill="rgba(255,255,255,0.2)" transform="rotate(-20 38 24)"
                            className={`plant-fruit${statsVisible ? " plant-visible" : ""}`}
                            style={{ animationDelay: statsVisible ? "800ms" : "0ms" }}
                          />
                          {/* Fruit leaf */}
                          <path d="M45 13 C38 6 30 8 32 15 C36 12 41 12 45 13Z" fill="#4A7C3F"
                            className={`plant-fruit${statsVisible ? " plant-visible" : ""}`}
                            style={{ animationDelay: statsVisible ? "900ms" : "0ms" }}
                          />
                          {/* Number inside fruit */}
                          <text
                            x="45" y="35"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            style={{ fontFamily: "var(--font-noto-serif-jp), serif", fontSize: 14, fontWeight: 700, fill: "#FFFDF7", animationDelay: statsVisible ? "950ms" : "0ms" }}
                            className={`plant-number${statsVisible ? " plant-visible" : ""}`}
                          >60+</text>
                        </svg>
                      </div>
                      <p className="text-xs text-center" style={{ color: "#8B5E34" }}>年の歴史</p>
                    </div>

                    {/* Stat 2: 3 generations — 3 leaves on stem, number on leaf */}
                    <div className="flex flex-col items-center gap-2">
                      <div style={{ position: "relative", width: 90, height: 110 }}>
                        <svg width="90" height="110" viewBox="0 0 90 110" style={{ overflow: "visible" }}>
                          {/* Soil */}
                          <ellipse cx="45" cy="102" rx="30" ry="7" fill="#8B5E34" opacity="0.7"
                            className={`plant-soil${statsVisible ? " plant-visible" : ""}`}
                            style={{ animationDelay: statsVisible ? "300ms" : "0ms" }}
                          />
                          {/* Stem with slight curve */}
                          <path d="M45 100 C44 85 46 70 45 42"
                            stroke="#4A7C3F" strokeWidth="3" fill="none" strokeLinecap="round"
                            pathLength="120"
                            className={`plant-stem${statsVisible ? " plant-visible" : ""}`}
                            style={{ animationDelay: statsVisible ? "380ms" : "0ms" }}
                          />
                          {/* Leaf 1 bottom-left */}
                          <path d="M44 84 C33 78 26 82 29 90 C35 92 41 89 44 84Z" fill="#4A7C3F"
                            className={`plant-leaf${statsVisible ? " plant-visible" : ""}`}
                            style={{ animationDelay: statsVisible ? "700ms" : "0ms", transformOrigin: "44px 84px" }}
                          />
                          {/* Leaf 2 right */}
                          <path d="M45 66 C55 60 62 63 60 71 C54 74 48 71 45 66Z" fill="#5E8F54"
                            className={`plant-leaf${statsVisible ? " plant-visible" : ""}`}
                            style={{ animationDelay: statsVisible ? "820ms" : "0ms", transformOrigin: "45px 66px" }}
                          />
                          {/* Leaf 3 top-left with number */}
                          <path d="M44 52 C32 44 24 48 27 57 C34 60 40 57 44 52Z" fill="#4A7C3F"
                            className={`plant-leaf${statsVisible ? " plant-visible" : ""}`}
                            style={{ animationDelay: statsVisible ? "950ms" : "0ms", transformOrigin: "44px 52px" }}
                          />
                          {/* Flower/top bud */}
                          <circle cx="45" cy="35" r="12" fill="#86B47E"
                            className={`plant-fruit${statsVisible ? " plant-visible" : ""}`}
                            style={{ animationDelay: statsVisible ? "1100ms" : "0ms" }}
                          />
                          <text x="45" y="38" textAnchor="middle" dominantBaseline="middle"
                            style={{ fontFamily: "var(--font-noto-serif-jp), serif", fontSize: 14, fontWeight: 700, fill: "#FFFDF7" }}
                            className={`plant-number${statsVisible ? " plant-visible" : ""}`}
                          >3</text>
                        </svg>
                      </div>
                      <p className="text-xs text-center" style={{ color: "#8B5E34" }}>世代続く農園</p>
                    </div>

                    {/* Stat 3: 8 varieties — 8-petal flower with number in center */}
                    <div className="flex flex-col items-center gap-2">
                      <div style={{ position: "relative", width: 90, height: 110 }}>
                        <svg width="90" height="110" viewBox="0 0 90 110" style={{ overflow: "visible" }}>
                          {/* Soil */}
                          <ellipse cx="45" cy="102" rx="28" ry="7" fill="#8B5E34" opacity="0.7"
                            className={`plant-soil${statsVisible ? " plant-visible" : ""}`}
                            style={{ animationDelay: statsVisible ? "600ms" : "0ms" }}
                          />
                          {/* Stem */}
                          <line x1="45" y1="100" x2="45" y2="52"
                            stroke="#4A7C3F" strokeWidth="3" strokeLinecap="round"
                            pathLength="120"
                            className={`plant-stem${statsVisible ? " plant-visible" : ""}`}
                            style={{ animationDelay: statsVisible ? "680ms" : "0ms" }}
                          />
                          {/* Side leaves */}
                          <path d="M45 80 C35 73 28 76 30 83 C36 86 42 83 45 80Z" fill="#4A7C3F"
                            className={`plant-leaf${statsVisible ? " plant-visible" : ""}`}
                            style={{ animationDelay: statsVisible ? "1000ms" : "0ms", transformOrigin: "45px 80px" }}
                          />
                          <path d="M45 68 C55 61 62 64 60 72 C54 75 48 72 45 68Z" fill="#5E8F54"
                            className={`plant-leaf${statsVisible ? " plant-visible" : ""}`}
                            style={{ animationDelay: statsVisible ? "1100ms" : "0ms", transformOrigin: "45px 68px" }}
                          />
                          {/* 8 flower petals */}
                          {Array.from({ length: 8 }, (_, pi) => {
                            const ang = (pi / 8) * 2 * Math.PI;
                            const px = 45 + Math.cos(ang) * 16;
                            const py = 34 + Math.sin(ang) * 16;
                            return (
                              <ellipse key={pi} cx={px} cy={py} rx="7" ry="5"
                                fill={pi % 2 === 0 ? "#E07B39" : "#F5C842"}
                                transform={`rotate(${(pi / 8) * 360} ${px} ${py})`}
                                className={`plant-fruit${statsVisible ? " plant-visible" : ""}`}
                                style={{ animationDelay: statsVisible ? `${1200 + pi * 60}ms` : "0ms" }}
                              />
                            );
                          })}
                          {/* Flower center */}
                          <circle cx="45" cy="34" r="11" fill="#8B5E34"
                            className={`plant-fruit${statsVisible ? " plant-visible" : ""}`}
                            style={{ animationDelay: statsVisible ? "1680ms" : "0ms" }}
                          />
                          <text x="45" y="37" textAnchor="middle" dominantBaseline="middle"
                            style={{ fontFamily: "var(--font-noto-serif-jp), serif", fontSize: 13, fontWeight: 700, fill: "#FFFDF7" }}
                            className={`plant-number${statsVisible ? " plant-visible" : ""}`}
                          >8</text>
                        </svg>
                      </div>
                      <p className="text-xs text-center" style={{ color: "#8B5E34" }}>種類の果物</p>
                    </div>

                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80"
                    alt="農園で働く様子"
                    width={800}
                    height={600}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=400&q=80"
                      alt="果樹の木と実"
                      width={600}
                      height={400}
                      className="w-full h-36 object-cover"
                    />
                  </div>
                  <div className="rounded-xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=400&q=80"
                      alt="収穫した果物"
                      width={600}
                      height={400}
                      className="w-full h-36 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Philosophy cards */}
            <div
              ref={addRef}
              className="grid md:grid-cols-3 gap-6 mt-16 opacity-0 translate-y-8 transition-all duration-700 ease-out"
            >
              {[
                {
                  icon: (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4A7C3F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22V12M12 12C12 8 9 5 5 5c0 4 3 7 7 7zM12 12c0-4 3-7 7-7 0 4-3 7-7 7z"/>
                    </svg>
                  ),
                  title: "島の土壌を守る",
                  desc: "化学農薬を最小限に抑え、島の生態系と共存した農業を続けています。",
                },
                {
                  icon: (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E07B39" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="5"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M17.66 6.34l-1.41 1.41M6.34 17.66l-1.41 1.41"/>
                    </svg>
                  ),
                  title: "太陽の恵みで完熟",
                  desc: "木になったまま太陽の光を浴び、十分に熟してから丁寧に収穫します。",
                },
                {
                  icon: (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8B5E34" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12H3a9 9 0 009 9 9 9 0 009-9h-2"/><path d="M12 3L8 7h8l-4-4z"/>
                    </svg>
                  ),
                  title: "採れたて直送",
                  desc: "収穫後すぐに梱包・発送。島から日本全国へ鮮度を保ってお届けします。",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-6"
                  style={{ backgroundColor: "#FFF8EE", border: "1px solid rgba(139,94,52,0.1)" }}
                >
                  <div className="mb-4">{item.icon}</div>
                  <h3 className="font-serif-jp font-semibold text-base mb-2" style={{ color: "#2C1810" }}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#5C3D2E" }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== PRODUCTS ===== */}
        <section id="products" className="diagonal-both earth-texture" style={{ backgroundColor: "#FFF4E6", position: "relative", overflow: "hidden" }}>
          {/* Basket silhouette watermark */}
          <div className="absolute pointer-events-none" style={{ bottom: "5%", right: "-2%", opacity: 0.05, zIndex: 0 }}>
            <svg width="220" height="180" viewBox="0 0 220 180">
              {/* Basket weave body */}
              <path d="M20 80 Q30 140 110 160 Q190 140 200 80 Z" fill="#8B5E34" />
              {/* Horizontal weave lines */}
              {[95, 110, 125, 140, 155].map((y, i) => (
                <path key={i} d={`M${20 + i * 4} ${y} Q110 ${y + 5} ${200 - i * 4} ${y}`}
                  stroke="#FFFDF7" strokeWidth="2" fill="none" opacity="0.4" />
              ))}
              {/* Vertical weave */}
              {[50, 70, 90, 110, 130, 150, 170].map((x, i) => (
                <path key={i} d={`M${x} 80 L${x + (i % 2 === 0 ? -5 : 5)} 158`}
                  stroke="#FFFDF7" strokeWidth="1.5" fill="none" opacity="0.3" />
              ))}
              {/* Rim */}
              <ellipse cx="110" cy="80" rx="90" ry="18" fill="#A0703E" />
              {/* Handle */}
              <path d="M60 78 Q110 30 160 78" stroke="#8B5E34" strokeWidth="12" fill="none" strokeLinecap="round" />
              <path d="M60 78 Q110 30 160 78" stroke="#C49460" strokeWidth="6" fill="none" strokeLinecap="round" />
            </svg>
          </div>
          <div
            ref={addRef}
            className="max-w-6xl mx-auto px-6 opacity-0 translate-y-8 transition-all duration-700 ease-out"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px flex-1" style={{ backgroundColor: "#E07B39", opacity: 0.3 }} />
              <p className="text-xs tracking-widest font-medium" style={{ color: "#E07B39" }}>PRODUCTS</p>
              <div className="h-px flex-1" style={{ backgroundColor: "#E07B39", opacity: 0.3 }} />
            </div>
            <h2 className="font-serif-jp text-3xl md:text-4xl font-bold text-center mb-2" style={{ color: "#2C1810" }}>
              商品紹介
            </h2>
            <p className="text-center text-sm mb-12" style={{ color: "#8B5E34" }}>
              奄美の自然が育てた、季節の贈りもの
            </p>

            {/* Row 1: Large (60%) + Medium (40%) */}
            <div className="flex flex-col sm:flex-row gap-5 mb-5">
              {/* Large crate - たんかん */}
              <div
                ref={(el) => { addRef(el); addCardRef(el, 0); }}
                className="market-crate market-crate-flex-large opacity-0 translate-y-8 transition-all duration-700 ease-out"
                style={{ flex: "0 0 60%", minWidth: 0, boxShadow: "0 8px 32px rgba(44,24,16,0.16), inset 0 1px 0 rgba(255,253,247,0.4)", border: "1.5px solid rgba(139,94,52,0.25)", paddingBottom: 16 }}
              >
                <div className="crate-border-h" style={{ top: 0 }} />
                <div className="crate-border-h" style={{ bottom: 0 }} />
                <div className="crate-border-v" style={{ left: 0 }} />
                <div className="crate-border-v" style={{ right: 0 }} />
                <div className="shipping-badge">全国送料: ¥1,100〜</div>
                {/* Wood grain SVG texture overlay */}
                <div style={{ position: "absolute", inset: 0, borderRadius: 6, overflow: "hidden", pointerEvents: "none", zIndex: 1 }}>
                  <svg width="100%" height="100%" preserveAspectRatio="none" style={{ position: "absolute", inset: 0 }}>
                    <defs>
                      <pattern id="woodgrain0" x="0" y="0" width="8" height="60" patternUnits="userSpaceOnUse">
                        <path d="M4 0 Q5 15 3 30 Q5 45 4 60" stroke="rgba(139,94,52,0.07)" strokeWidth="1" fill="none" />
                        <path d="M2 0 Q1 20 3 40 Q1 50 2 60" stroke="rgba(139,94,52,0.05)" strokeWidth="0.8" fill="none" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#woodgrain0)" />
                  </svg>
                </div>
                {/* Straw/hay strands peeking at sides */}
                <div style={{ position: "absolute", bottom: 28, left: 8, zIndex: 3, pointerEvents: "none" }}>
                  <svg width="24" height="40" viewBox="0 0 24 40">
                    <path d="M4 40 Q6 28 3 16 Q5 8 4 0" stroke="#C8A055" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.7" />
                    <path d="M10 40 Q8 26 11 14 Q9 6 10 0" stroke="#D4AA60" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
                    <path d="M16 40 Q18 30 15 18 Q17 8 16 2" stroke="#C0983C" strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.5" />
                  </svg>
                </div>
                <div className="crate-img-overflow rounded-xl overflow-hidden" style={{ height: 200 }}>
                  <Image src={products[0].img} alt={products[0].alt} width={600} height={400} className="w-full h-full object-cover" />
                </div>
                <div className="px-5 pt-3 pb-1 relative">
                  <div className="price-tag">
                    <p className="font-bold text-base" style={{ color: "#E07B39", lineHeight: 1 }}>{products[0].price}</p>
                    <p className="text-xs mt-0.5" style={{ color: "#8B5E34" }}>{products[0].unit}</p>
                  </div>
                  <div className="mb-1">
                    <span className="shun-badge" style={{ marginRight: 8 }}>旬 {products[0].season}</span>
                  </div>
                  <h3 className="handwritten-label text-xl font-bold mb-0.5 mt-2">{products[0].name}</h3>
                  <p className="text-xs mb-2" style={{ color: "#8B5E34" }}>{products[0].sub}</p>
                  <p className="text-xs leading-relaxed" style={{ color: "#5C3D2E" }}>{products[0].desc}</p>
                  <a
                    href="#contact"
                    className="crate-action-hint mt-3 inline-block text-xs font-bold px-5 py-2 rounded-full"
                    style={{ backgroundColor: "#2C1810", color: "#FFFDF7" }}
                    onClick={(e) => smoothScroll(e, "contact")}
                  >
                    カゴに入れる
                  </a>
                  <a
                    href="#contact"
                    className="order-btn"
                    onClick={(e) => smoothScroll(e, "contact")}
                  >
                    この商品を注文する
                  </a>
                </div>
              </div>

              {/* Medium crate - パッションフルーツ */}
              <div
                ref={(el) => { addRef(el); addCardRef(el, 1); }}
                className="market-crate market-crate-flex-small opacity-0 translate-y-8 transition-all duration-700 ease-out"
                style={{ flex: "1 1 40%", minWidth: 0, boxShadow: "0 8px 32px rgba(44,24,16,0.14), inset 0 1px 0 rgba(255,253,247,0.4)", border: "1.5px solid rgba(139,94,52,0.25)", paddingBottom: 16, transitionDelay: "80ms" }}
              >
                <div className="crate-border-h" style={{ top: 0 }} />
                <div className="crate-border-h" style={{ bottom: 0 }} />
                <div className="crate-border-v" style={{ left: 0 }} />
                <div className="crate-border-v" style={{ right: 0 }} />
                <div className="shipping-badge">全国送料: ¥1,100〜</div>
                <div style={{ position: "absolute", inset: 0, borderRadius: 6, overflow: "hidden", pointerEvents: "none", zIndex: 1 }}>
                  <svg width="100%" height="100%" preserveAspectRatio="none" style={{ position: "absolute", inset: 0 }}>
                    <defs>
                      <pattern id="woodgrain1" x="0" y="0" width="8" height="60" patternUnits="userSpaceOnUse">
                        <path d="M4 0 Q5 15 3 30 Q5 45 4 60" stroke="rgba(139,94,52,0.07)" strokeWidth="1" fill="none" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#woodgrain1)" />
                  </svg>
                </div>
                <div style={{ position: "absolute", bottom: 26, right: 8, zIndex: 3, pointerEvents: "none" }}>
                  <svg width="20" height="36" viewBox="0 0 20 36">
                    <path d="M3 36 Q5 24 2 12 Q4 5 3 0" stroke="#C8A055" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.65" />
                    <path d="M10 36 Q8 22 11 10 Q9 4 10 0" stroke="#D4AA60" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.55" />
                  </svg>
                </div>
                <div className="crate-img-overflow rounded-xl overflow-hidden" style={{ height: 160 }}>
                  <Image src={products[1].img} alt={products[1].alt} width={600} height={400} className="w-full h-full object-cover" />
                </div>
                <div className="px-4 pt-3 pb-1 relative">
                  <div className="price-tag">
                    <p className="font-bold text-sm" style={{ color: "#E07B39", lineHeight: 1 }}>{products[1].price}</p>
                    <p className="text-xs mt-0.5" style={{ color: "#8B5E34" }}>{products[1].unit}</p>
                  </div>
                  <div className="mb-1">
                    <span className="shun-badge" style={{ transform: "rotate(2deg)" }}>旬 {products[1].season}</span>
                  </div>
                  <h3 className="handwritten-label text-base font-bold mt-2 mb-0.5">{products[1].name}</h3>
                  <p className="text-xs mb-2" style={{ color: "#8B5E34" }}>{products[1].sub}</p>
                  <p className="text-xs leading-relaxed" style={{ color: "#5C3D2E", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" } as React.CSSProperties}>{products[1].desc}</p>
                  <a
                    href="#contact"
                    className="crate-action-hint mt-3 inline-block text-xs font-bold px-4 py-2 rounded-full"
                    style={{ backgroundColor: "#2C1810", color: "#FFFDF7" }}
                    onClick={(e) => smoothScroll(e, "contact")}
                  >
                    カゴに入れる
                  </a>
                  <a
                    href="#contact"
                    className="order-btn"
                    onClick={(e) => smoothScroll(e, "contact")}
                  >
                    この商品を注文する
                  </a>
                </div>
              </div>
            </div>

            {/* Row 2: Three small crates (33% each) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 mb-5">
              {[products[2], products[3], products[4]].map((product, ii) => (
                <div
                  key={ii}
                  ref={(el) => { addRef(el); addCardRef(el, ii + 2); }}
                  className="market-crate opacity-0 translate-y-8 transition-all duration-700 ease-out"
                  style={{ boxShadow: "0 6px 24px rgba(44,24,16,0.13), inset 0 1px 0 rgba(255,253,247,0.4)", border: "1.5px solid rgba(139,94,52,0.25)", paddingBottom: 14, transitionDelay: `${(ii + 2) * 80}ms` }}
                >
                  <div className="crate-border-h" style={{ top: 0 }} />
                  <div className="crate-border-h" style={{ bottom: 0 }} />
                  <div className="crate-border-v" style={{ left: 0 }} />
                  <div className="crate-border-v" style={{ right: 0 }} />
                  <div className="shipping-badge">全国送料: ¥1,100〜</div>
                  <div className="crate-img-overflow rounded-lg overflow-hidden" style={{ height: 120 }}>
                    <Image src={product.img} alt={product.alt} width={600} height={400} className="w-full h-full object-cover" />
                  </div>
                  <div className="px-3 pt-2 pb-1 relative">
                    <div className="price-tag" style={{ top: 8, right: -2 }}>
                      <p className="font-bold text-xs" style={{ color: "#E07B39", lineHeight: 1 }}>{product.price}</p>
                      <p style={{ fontSize: 10, color: "#8B5E34", marginTop: 2 }}>{product.unit}</p>
                    </div>
                    <span className="shun-badge" style={{ fontSize: 9, padding: "2px 6px", transform: `rotate(${ii % 2 === 0 ? "-2deg" : "2deg"})` }}>
                      旬
                    </span>
                    <h3 className="handwritten-label text-sm font-bold mt-2 mb-0.5">{product.name}</h3>
                    <p style={{ fontSize: 10, color: "#8B5E34", marginBottom: 4 }}>{product.sub}</p>
                    <p className="leading-relaxed" style={{ fontSize: 10, color: "#5C3D2E", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" } as React.CSSProperties}>{product.desc}</p>
                    <a
                      href="#contact"
                      className="crate-action-hint mt-2 inline-block font-bold rounded-full"
                      style={{ fontSize: 10, padding: "4px 10px", backgroundColor: "#2C1810", color: "#FFFDF7" }}
                      onClick={(e) => smoothScroll(e, "contact")}
                    >
                      カゴに入れる
                    </a>
                    <a
                      href="#contact"
                      className="order-btn"
                      style={{ fontSize: 11 }}
                      onClick={(e) => smoothScroll(e, "contact")}
                    >
                      この商品を注文する
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Row 3: Medium (40%) + Large (60%) */}
            <div className="flex flex-col sm:flex-row gap-5">
              {/* Medium - ドラゴンフルーツ */}
              <div
                ref={(el) => { addRef(el); addCardRef(el, 5); }}
                className="market-crate market-crate-flex-small opacity-0 translate-y-8 transition-all duration-700 ease-out"
                style={{ flex: "0 0 40%", minWidth: 0, boxShadow: "0 8px 32px rgba(44,24,16,0.14), inset 0 1px 0 rgba(255,253,247,0.4)", border: "1.5px solid rgba(139,94,52,0.25)", paddingBottom: 16, transitionDelay: "500ms" }}
              >
                <div className="crate-border-h" style={{ top: 0 }} />
                <div className="crate-border-h" style={{ bottom: 0 }} />
                <div className="crate-border-v" style={{ left: 0 }} />
                <div className="crate-border-v" style={{ right: 0 }} />
                <div className="shipping-badge">全国送料: ¥1,100〜</div>
                <div className="crate-img-overflow rounded-xl overflow-hidden" style={{ height: 150 }}>
                  <Image src={products[5].img} alt={products[5].alt} width={600} height={400} className="w-full h-full object-cover" />
                </div>
                <div className="px-4 pt-3 pb-1 relative">
                  <div className="price-tag">
                    <p className="font-bold text-sm" style={{ color: "#E07B39", lineHeight: 1 }}>{products[5].price}</p>
                    <p className="text-xs mt-0.5" style={{ color: "#8B5E34" }}>{products[5].unit}</p>
                  </div>
                  <span className="shun-badge" style={{ transform: "rotate(-1deg)" }}>旬 {products[5].season}</span>
                  <h3 className="handwritten-label text-base font-bold mt-2 mb-0.5">{products[5].name}</h3>
                  <p className="text-xs mb-2" style={{ color: "#8B5E34" }}>{products[5].sub}</p>
                  <p className="text-xs leading-relaxed" style={{ color: "#5C3D2E", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" } as React.CSSProperties}>{products[5].desc}</p>
                  <a
                    href="#contact"
                    className="crate-action-hint mt-3 inline-block text-xs font-bold px-4 py-2 rounded-full"
                    style={{ backgroundColor: "#2C1810", color: "#FFFDF7" }}
                    onClick={(e) => smoothScroll(e, "contact")}
                  >
                    カゴに入れる
                  </a>
                  <a
                    href="#contact"
                    className="order-btn"
                    onClick={(e) => smoothScroll(e, "contact")}
                  >
                    この商品を注文する
                  </a>
                </div>
              </div>

              {/* Large crate - ジャム・ジュースセット */}
              <div
                ref={(el) => { addRef(el); addCardRef(el, 6); }}
                className="market-crate market-crate-flex-large opacity-0 translate-y-8 transition-all duration-700 ease-out"
                style={{ flex: "1 1 60%", minWidth: 0, boxShadow: "0 8px 32px rgba(44,24,16,0.16), inset 0 1px 0 rgba(255,253,247,0.4)", border: "1.5px solid rgba(139,94,52,0.25)", paddingBottom: 16, transitionDelay: "580ms" }}
              >
                <div className="crate-border-h" style={{ top: 0 }} />
                <div className="crate-border-h" style={{ bottom: 0 }} />
                <div className="crate-border-v" style={{ left: 0 }} />
                <div className="crate-border-v" style={{ right: 0 }} />
                <div className="shipping-badge">全国送料: ¥1,100〜</div>
                <div className="crate-img-overflow rounded-xl overflow-hidden" style={{ height: 190 }}>
                  <Image src={products[6].img} alt={products[6].alt} width={600} height={400} className="w-full h-full object-cover" />
                </div>
                <div className="px-5 pt-3 pb-1 relative">
                  <div className="price-tag">
                    <p className="font-bold text-base" style={{ color: "#E07B39", lineHeight: 1 }}>{products[6].price}</p>
                    <p className="text-xs mt-0.5" style={{ color: "#8B5E34" }}>{products[6].unit}</p>
                  </div>
                  <span className="shun-badge" style={{ transform: "rotate(1.5deg)", backgroundColor: "#4A7C3F" }}>通年</span>
                  <h3 className="handwritten-label text-xl font-bold mt-2 mb-0.5">{products[6].name}</h3>
                  <p className="text-xs mb-2" style={{ color: "#8B5E34" }}>{products[6].sub}</p>
                  <p className="text-xs leading-relaxed" style={{ color: "#5C3D2E" }}>{products[6].desc}</p>
                  <a
                    href="#contact"
                    className="crate-action-hint mt-3 inline-block text-xs font-bold px-5 py-2 rounded-full"
                    style={{ backgroundColor: "#2C1810", color: "#FFFDF7" }}
                    onClick={(e) => smoothScroll(e, "contact")}
                  >
                    カゴに入れる
                  </a>
                  <a
                    href="#contact"
                    className="order-btn"
                    onClick={(e) => smoothScroll(e, "contact")}
                  >
                    この商品を注文する
                  </a>
                </div>
              </div>
            </div>

            <div
              ref={addRef}
              className="mt-10 text-center opacity-0 translate-y-8 transition-all duration-700 ease-out"
            >
              <p className="text-sm" style={{ color: "#8B5E34" }}>
                ※ 価格はすべて税込・送料別です。在庫状況によりご注文をお断りする場合がございます。
              </p>
            </div>
          </div>
        </section>

        {/* ===== SEASONAL CALENDAR ===== */}
        <section id="calendar" className="py-20 md:py-32" style={{ backgroundColor: "#FFFDF7" }}>
          <div
            ref={(el) => { addRef(el); if (el) calendarRef.current = el; }}
            className="max-w-6xl mx-auto px-6 opacity-0 translate-y-8 transition-all duration-700 ease-out"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px flex-1" style={{ backgroundColor: "#4A7C3F", opacity: 0.3 }} />
              <p className="text-xs tracking-widest font-medium" style={{ color: "#4A7C3F" }}>SEASONAL CALENDAR</p>
              <div className="h-px flex-1" style={{ backgroundColor: "#4A7C3F", opacity: 0.3 }} />
            </div>
            <h2 className="font-serif-jp text-3xl md:text-4xl font-bold text-center mb-2" style={{ color: "#2C1810" }}>
              旬のカレンダー
            </h2>
            <p className="text-center text-sm mb-12" style={{ color: "#8B5E34" }}>
              それぞれの果物が最も美味しい旬の時期をご確認ください
            </p>

            {/* Vine / Trellis Calendar */}
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(139,94,52,0.15)", backgroundColor: "#FFF8EE" }}>
              {/* Trellis SVG calendar */}
              <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" } as React.CSSProperties}>
                <div style={{ minWidth: 660, padding: "24px 20px 16px" }}>
                  {/* Month labels at top */}
                  <div className="flex mb-3" style={{ paddingLeft: 140 }}>
                    {monthLabels.map((m, i) => (
                      <div key={i} className="text-center text-xs font-medium flex-1" style={{ color: "#8B5E34" }}>{m}</div>
                    ))}
                  </div>

                  {/* Trellis rows per fruit */}
                  {seasons.map((item, ri) => {
                    // Build continuous segments from months
                    const segments: { start: number; end: number }[] = [];
                    let seg: { start: number; end: number } | null = null;
                    for (let m = 1; m <= 12; m++) {
                      if (item.months.includes(m)) {
                        if (!seg) seg = { start: m, end: m };
                        else seg.end = m;
                      } else {
                        if (seg) { segments.push(seg); seg = null; }
                      }
                    }
                    if (seg) segments.push(seg);

                    const rowH = 56;
                    const leftPad = 140;
                    const colW = (520) / 12; // total track width / 12

                    return (
                      <div key={ri} className="relative flex items-center" style={{ height: rowH, marginBottom: ri < seasons.length - 1 ? 4 : 0 }}>
                        {/* Fruit label */}
                        <div className="text-sm font-medium flex-shrink-0" style={{ width: leftPad, color: "#2C1810", paddingRight: 16 }}>
                          {item.fruit}
                        </div>

                        {/* Trellis track */}
                        <div style={{ flex: 1, position: "relative", height: rowH }}>
                          <svg
                            width="100%"
                            height={rowH}
                            viewBox={`0 0 520 ${rowH}`}
                            preserveAspectRatio="none"
                            style={{ overflow: "visible" }}
                          >
                            {/* Trellis wire (background line) */}
                            <line
                              x1={0} y1={rowH / 2}
                              x2={520} y2={rowH / 2}
                              stroke="rgba(139,94,52,0.15)"
                              strokeWidth="1.5"
                              strokeDasharray="4 6"
                            />

                            {/* Month divider ticks */}
                            {Array.from({ length: 13 }, (_, i) => (
                              <line
                                key={i}
                                x1={i * colW} y1={rowH / 2 - 5}
                                x2={i * colW} y2={rowH / 2 + 5}
                                stroke="rgba(139,94,52,0.12)"
                                strokeWidth="1"
                              />
                            ))}

                            {/* Vine branches for active segments */}
                            {segments.map((seg, si) => {
                              const x1 = (seg.start - 1) * colW + colW * 0.1;
                              const x2 = (seg.end - 1) * colW + colW * 0.9;
                              const cy = rowH / 2;
                              const midX = (x1 + x2) / 2;
                              // Vine path with gentle wave
                              const waveAmp = 6;
                              const segLen = x2 - x1;
                              let d = `M ${x1} ${cy}`;
                              const steps = Math.max(4, Math.floor(segLen / 20));
                              for (let s = 1; s <= steps; s++) {
                                const px = x1 + (s / steps) * segLen;
                                const py = cy + Math.sin((s / steps) * Math.PI * 2) * waveAmp;
                                d += ` L ${px} ${py}`;
                              }

                              // Fruit positions: at peaks of wave
                              const fruitPositions: { x: number; y: number }[] = [];
                              const numFruits = Math.max(1, Math.floor((x2 - x1) / 40));
                              for (let f = 0; f < numFruits; f++) {
                                const t = (f + 0.5) / numFruits;
                                const fx = x1 + t * segLen;
                                const fy = cy + Math.sin(t * Math.PI * 2) * waveAmp;
                                fruitPositions.push({ x: fx, y: fy });
                              }

                              return (
                                <g key={si}>
                                  {/* Main vine — pathLength normalizes dasharray to 1000 units */}
                                  <path
                                    d={d}
                                    stroke={item.color}
                                    strokeWidth="3.5"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    pathLength="1000"
                                    className={`vine-path${calendarVisible ? " vine-visible" : ""}`}
                                    style={{
                                      animationDelay: calendarVisible ? `${ri * 180 + si * 120}ms` : "0ms",
                                      animationDuration: `${0.8 + segLen / 300}s`,
                                    }}
                                  />
                                  {/* Vine border / highlight */}
                                  <path
                                    d={d}
                                    stroke="rgba(255,255,255,0.35)"
                                    strokeWidth="1.5"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    pathLength="1000"
                                    className={`vine-path${calendarVisible ? " vine-visible" : ""}`}
                                    style={{
                                      animationDelay: calendarVisible ? `${ri * 180 + si * 120}ms` : "0ms",
                                      animationDuration: `${0.8 + segLen / 300}s`,
                                    }}
                                  />

                                  {/* Fruit shapes hanging along vine — recognizable per fruit type */}
                                  {fruitPositions.map((fp, fi) => {
                                    const fruitDelay = calendarVisible ? `${ri * 180 + si * 120 + fi * 80 + 400}ms` : "0ms";
                                    // Alternate between small fruit shapes by row index
                                    const isTankan = ri === 0 || ri === 4;
                                    const isPassion = ri === 1;
                                    const isMango = ri === 2;
                                    const isBanana = ri === 3;
                                    const isDragon = ri === 5;
                                    return (
                                      <g key={fi}>
                                        {/* Short stem */}
                                        <line
                                          x1={fp.x} y1={fp.y}
                                          x2={fp.x} y2={fp.y - 10}
                                          stroke={item.color}
                                          strokeWidth="1.5"
                                          opacity="0.9"
                                          className={`fruit-dot${calendarVisible ? " vine-visible" : ""}`}
                                          style={{ animationDelay: fruitDelay }}
                                        />
                                        {isTankan && (
                                          <>
                                            {/* Tankan round */}
                                            <circle cx={fp.x} cy={fp.y + 9} r={7} fill={item.color} opacity="0.95"
                                              className={`fruit-dot${calendarVisible ? " vine-visible" : ""}`}
                                              style={{ animationDelay: fruitDelay }}
                                            />
                                            <ellipse cx={fp.x - 2} cy={fp.y + 6} rx={2.5} ry={2} fill="rgba(255,255,255,0.3)"
                                              className={`fruit-dot${calendarVisible ? " vine-visible" : ""}`}
                                              style={{ animationDelay: fruitDelay }}
                                            />
                                          </>
                                        )}
                                        {isPassion && (
                                          <>
                                            {/* Passion fruit oval */}
                                            <ellipse cx={fp.x} cy={fp.y + 9} rx={5} ry={7} fill={item.color} opacity="0.9"
                                              className={`fruit-dot${calendarVisible ? " vine-visible" : ""}`}
                                              style={{ animationDelay: fruitDelay }}
                                            />
                                            <path d={`M${fp.x} ${fp.y + 4} Q${fp.x + 3} ${fp.y + 9} ${fp.x} ${fp.y + 14}`}
                                              stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" fill="none"
                                              className={`fruit-dot${calendarVisible ? " vine-visible" : ""}`}
                                              style={{ animationDelay: fruitDelay }}
                                            />
                                          </>
                                        )}
                                        {isMango && (
                                          <>
                                            {/* Mango teardrop */}
                                            <path d={`M${fp.x} ${fp.y + 2} C${fp.x - 5} ${fp.y + 5} ${fp.x - 5} ${fp.y + 13} ${fp.x} ${fp.y + 16} C${fp.x + 5} ${fp.y + 13} ${fp.x + 5} ${fp.y + 5} ${fp.x} ${fp.y + 2}Z`}
                                              fill={item.color} opacity="0.9"
                                              className={`fruit-dot${calendarVisible ? " vine-visible" : ""}`}
                                              style={{ animationDelay: fruitDelay }}
                                            />
                                          </>
                                        )}
                                        {isBanana && (
                                          <>
                                            {/* Banana crescent */}
                                            <path d={`M${fp.x - 5} ${fp.y + 5} Q${fp.x} ${fp.y + 2} ${fp.x + 5} ${fp.y + 9} Q${fp.x + 2} ${fp.y + 14} ${fp.x - 3} ${fp.y + 12}`}
                                              fill={item.color} opacity="0.85"
                                              className={`fruit-dot${calendarVisible ? " vine-visible" : ""}`}
                                              style={{ animationDelay: fruitDelay }}
                                            />
                                          </>
                                        )}
                                        {isDragon && (
                                          <>
                                            {/* Dragon fruit oval with spiky top */}
                                            <ellipse cx={fp.x} cy={fp.y + 9} rx={6} ry={7} fill={item.color} opacity="0.9"
                                              className={`fruit-dot${calendarVisible ? " vine-visible" : ""}`}
                                              style={{ animationDelay: fruitDelay }}
                                            />
                                            {[-4, 0, 4].map((dx, si2) => (
                                              <line key={si2}
                                                x1={fp.x + dx * 0.6} y1={fp.y + 3}
                                                x2={fp.x + dx} y2={fp.y - 2}
                                                stroke="#4A7C3F" strokeWidth="1.2" strokeLinecap="round"
                                                className={`fruit-dot${calendarVisible ? " vine-visible" : ""}`}
                                                style={{ animationDelay: fruitDelay }}
                                              />
                                            ))}
                                          </>
                                        )}
                                        {/* Default for anything else */}
                                        {!isTankan && !isPassion && !isMango && !isBanana && !isDragon && (
                                          <circle cx={fp.x} cy={fp.y + 8} r={5.5} fill={item.color} opacity="0.9"
                                            className={`fruit-dot${calendarVisible ? " vine-visible" : ""}`}
                                            style={{ animationDelay: fruitDelay }}
                                          />
                                        )}
                                      </g>
                                    );
                                  })}

                                  {/* Detailed leaves with veins at start, mid, end */}
                                  {/* Start leaf */}
                                  <path
                                    d={`M${x1 + 4} ${cy} C${x1 - 4} ${cy - 14} ${x1 + 10} ${cy - 18} ${x1 + 14} ${cy - 8} C${x1 + 8} ${cy - 4} ${x1 + 4} ${cy} ${x1 + 4} ${cy}Z`}
                                    fill={item.color}
                                    opacity="0.6"
                                    className={`fruit-dot${calendarVisible ? " vine-visible" : ""}`}
                                    style={{ animationDelay: calendarVisible ? `${ri * 180 + si * 120 + 200}ms` : "0ms" }}
                                  />
                                  {/* Leaf vein */}
                                  <path d={`M${x1 + 4} ${cy} L${x1 + 10} ${cy - 12}`}
                                    stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" fill="none"
                                    className={`fruit-dot${calendarVisible ? " vine-visible" : ""}`}
                                    style={{ animationDelay: calendarVisible ? `${ri * 180 + si * 120 + 200}ms` : "0ms" }}
                                  />
                                  {/* Mid leaf */}
                                  <path
                                    d={`M${midX} ${cy} C${midX - 8} ${cy - 15} ${midX + 8} ${cy - 19} ${midX + 12} ${cy - 8} C${midX + 6} ${cy - 3} ${midX} ${cy} ${midX} ${cy}Z`}
                                    fill={item.color}
                                    opacity="0.55"
                                    className={`fruit-dot${calendarVisible ? " vine-visible" : ""}`}
                                    style={{ animationDelay: calendarVisible ? `${ri * 180 + si * 120 + 320}ms` : "0ms" }}
                                  />
                                  {/* Mid leaf vein */}
                                  <path d={`M${midX} ${cy} L${midX + 7} ${cy - 13}`}
                                    stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" fill="none"
                                    className={`fruit-dot${calendarVisible ? " vine-visible" : ""}`}
                                    style={{ animationDelay: calendarVisible ? `${ri * 180 + si * 120 + 320}ms` : "0ms" }}
                                  />
                                  {/* Small flower along vine */}
                                  {(() => {
                                    const fx2 = (x1 + x2) * 0.72;
                                    const fy2 = cy - 4;
                                    return (
                                      <g className={`fruit-dot${calendarVisible ? " vine-visible" : ""}`}
                                        style={{ animationDelay: calendarVisible ? `${ri * 180 + si * 120 + 600}ms` : "0ms" }}>
                                        {[0, 60, 120, 180, 240, 300].map((ang, pi) => {
                                          const pr = (ang * Math.PI) / 180;
                                          return (
                                            <ellipse key={pi}
                                              cx={fx2 + Math.cos(pr) * 5} cy={fy2 + Math.sin(pr) * 5}
                                              rx={3} ry={2}
                                              fill="rgba(255,255,255,0.55)"
                                              transform={`rotate(${ang} ${fx2 + Math.cos(pr) * 5} ${fy2 + Math.sin(pr) * 5})`}
                                            />
                                          );
                                        })}
                                        <circle cx={fx2} cy={fy2} r={2.5} fill={item.color} />
                                      </g>
                                    );
                                  })()}
                                </g>
                              );
                            })}
                          </svg>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-4 justify-center">
              {seasons.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <svg width="20" height="12" viewBox="0 0 20 12">
                    <path d="M 0 6 Q 5 2 10 6 Q 15 10 20 6" stroke={item.color} strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    <circle cx="10" cy="10" r="2.5" fill={item.color} opacity="0.9" />
                  </svg>
                  <span className="text-xs" style={{ color: "#5C3D2E" }}>{item.fruit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FARM EXPERIENCE ===== */}
        <section id="experience" className="diagonal-up" style={{ backgroundColor: "#F0F7EE", position: "relative", overflow: "hidden" }}>
          {/* Butterfly 2 */}
          <div className="absolute pointer-events-none" style={{ top: "12%", right: "8%", opacity: 0.22, zIndex: 0 }}>
            <svg width="50" height="40" viewBox="0 0 50 40" style={{ animation: "fruitFloat3 8s ease-in-out infinite" }}>
              <path d="M25 20 C16 10 3 6 5 16 C7 24 16 24 25 20Z" fill="#C84B9E" stroke="#7B2060" strokeWidth="0.7" />
              <path d="M25 20 C14 22 8 30 12 34 C18 36 22 28 25 20Z" fill="#E07B39" stroke="#8B3020" strokeWidth="0.7" opacity="0.9" />
              <path d="M25 20 C34 10 47 6 45 16 C43 24 34 24 25 20Z" fill="#C84B9E" stroke="#7B2060" strokeWidth="0.7" />
              <path d="M25 20 C36 22 42 30 38 34 C32 36 28 28 25 20Z" fill="#E07B39" stroke="#8B3020" strokeWidth="0.7" opacity="0.9" />
              {/* Wing spots */}
              <circle cx="18" cy="17" r="2" fill="rgba(255,253,247,0.4)" />
              <circle cx="34" cy="17" r="2" fill="rgba(255,253,247,0.4)" />
              <ellipse cx="25" cy="20" rx="1.5" ry="6" fill="#1A0F0A" />
              <path d="M24 15 Q21 9 19 7" stroke="#1A0F0A" strokeWidth="0.8" fill="none" strokeLinecap="round" />
              <circle cx="19" cy="7" r="1" fill="#1A0F0A" />
              <path d="M26 15 Q29 9 31 7" stroke="#1A0F0A" strokeWidth="0.8" fill="none" strokeLinecap="round" />
              <circle cx="31" cy="7" r="1" fill="#1A0F0A" />
            </svg>
          </div>
          {/* Bee near the section */}
          <div className="absolute pointer-events-none" style={{ top: "35%", left: "5%", opacity: 0.2, zIndex: 0 }}>
            <svg width="38" height="30" viewBox="0 0 38 30" style={{ animation: "fruitFloat1 5s ease-in-out infinite" }}>
              {/* Wings */}
              <ellipse cx="12" cy="10" rx="10" ry="6" fill="rgba(255,255,255,0.7)" stroke="rgba(139,94,52,0.3)" strokeWidth="0.8" />
              <ellipse cx="26" cy="10" rx="10" ry="6" fill="rgba(255,255,255,0.7)" stroke="rgba(139,94,52,0.3)" strokeWidth="0.8" />
              {/* Body */}
              <ellipse cx="19" cy="19" rx="7" ry="9" fill="#F5C842" />
              {/* Stripes */}
              <rect x="12" y="16" width="14" height="3" fill="#2C1810" opacity="0.7" rx="1" />
              <rect x="12" y="21" width="14" height="3" fill="#2C1810" opacity="0.7" rx="1" />
              {/* Head */}
              <circle cx="19" cy="10" r="5" fill="#F5C842" />
              {/* Eyes */}
              <circle cx="17" cy="9" r="1" fill="#2C1810" />
              <circle cx="21" cy="9" r="1" fill="#2C1810" />
              {/* Antennae */}
              <path d="M17 6 Q14 2 12 1" stroke="#2C1810" strokeWidth="1" fill="none" strokeLinecap="round" />
              <circle cx="12" cy="1" r="1" fill="#2C1810" />
              <path d="M21 6 Q24 2 26 1" stroke="#2C1810" strokeWidth="1" fill="none" strokeLinecap="round" />
              <circle cx="26" cy="1" r="1" fill="#2C1810" />
            </svg>
          </div>
          {/* Butterfly 3 */}
          <div className="absolute pointer-events-none" style={{ bottom: "15%", right: "12%", opacity: 0.19, zIndex: 0 }}>
            <svg width="42" height="34" viewBox="0 0 42 34" style={{ animation: "fruitFloat2 9s ease-in-out infinite" }}>
              <path d="M21 17 C13 8 1 4 3 13 C5 21 13 21 21 17Z" fill="#4A7C3F" stroke="#2A5A1F" strokeWidth="0.7" />
              <path d="M21 17 C11 19 5 27 9 31 C15 33 19 25 21 17Z" fill="#F5C842" stroke="#8B7820" strokeWidth="0.7" opacity="0.9" />
              <path d="M21 17 C29 8 41 4 39 13 C37 21 29 21 21 17Z" fill="#4A7C3F" stroke="#2A5A1F" strokeWidth="0.7" />
              <path d="M21 17 C31 19 37 27 33 31 C27 33 23 25 21 17Z" fill="#F5C842" stroke="#8B7820" strokeWidth="0.7" opacity="0.9" />
              <ellipse cx="21" cy="17" rx="1.5" ry="5.5" fill="#1A0F0A" />
              <path d="M20 13 Q17 8 15 6" stroke="#1A0F0A" strokeWidth="0.7" fill="none" strokeLinecap="round" />
              <circle cx="15" cy="6" r="0.9" fill="#1A0F0A" />
              <path d="M22 13 Q25 8 27 6" stroke="#1A0F0A" strokeWidth="0.7" fill="none" strokeLinecap="round" />
              <circle cx="27" cy="6" r="0.9" fill="#1A0F0A" />
            </svg>
          </div>
          <div
            ref={addRef}
            className="max-w-6xl mx-auto px-6 opacity-0 translate-y-8 transition-all duration-700 ease-out"
            style={{ position: "relative", zIndex: 1 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px flex-1" style={{ backgroundColor: "#4A7C3F", opacity: 0.3 }} />
              <p className="text-xs tracking-widest font-medium" style={{ color: "#4A7C3F" }}>FARM EXPERIENCE</p>
              <div className="h-px flex-1" style={{ backgroundColor: "#4A7C3F", opacity: 0.3 }} />
            </div>
            <h2 className="font-serif-jp text-3xl md:text-4xl font-bold text-center mb-2" style={{ color: "#2C1810" }}>
              農園体験
            </h2>
            <p className="text-center text-sm mb-12" style={{ color: "#4A7C3F" }}>
              奄美の農園で、特別な体験を
            </p>

            <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
              <div className="rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1592921870789-04563d55041c?auto=format&fit=crop&w=800&q=80"
                  alt="農園体験の様子"
                  width={800}
                  height={600}
                  className="w-full h-72 md:h-96 object-cover"
                />
              </div>
              <div>
                <p className="text-sm leading-relaxed mb-8" style={{ color: "#2C1810" }}>
                  観光客・地域の方を問わず、農園見学や収穫体験をお楽しみいただけます。土に触れ、南国の果物が実る様子を間近で体感してください。収穫した果物はその場でお召し上がりいただけます。
                </p>

                {[
                  {
                    name: "収穫体験",
                    price: "¥2,000 / 人",
                    time: "約60分",
                    desc: "季節の果物を自分の手で収穫する体験です。収穫した果物（約500g相当）はお持ち帰りいただけます。",
                    included: ["収穫した果物のお持ち帰り", "農園スタッフによる説明", "農園内フリー見学"],
                    color: "#E07B39",
                  },
                  {
                    name: "農園ツアー",
                    price: "¥1,500 / 人",
                    time: "約45分",
                    desc: "農園スタッフがご案内する、農園の隅々まで歩くガイドツアーです。果樹の育て方や農園の歴史もご紹介します。",
                    included: ["ガイド付き農園散策", "果物の試食（少量）", "黒糖の試食"],
                    color: "#4A7C3F",
                  },
                ].map((plan, i) => (
                  <div
                    key={i}
                    ref={addRef}
                    className="rounded-xl p-5 mb-4 opacity-0 translate-y-8 transition-all duration-700 ease-out"
                    style={{
                      backgroundColor: "#FFFDF7",
                      border: `2px solid ${plan.color}22`,
                      transitionDelay: `${i * 150}ms`,
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-serif-jp font-bold text-lg" style={{ color: "#2C1810" }}>{plan.name}</h3>
                        <p className="text-xs mt-0.5" style={{ color: "#8B5E34" }}>所要時間：{plan.time}</p>
                      </div>
                      <p className="font-bold text-xl" style={{ color: plan.color }}>{plan.price}</p>
                    </div>
                    <p className="text-xs leading-relaxed mb-3" style={{ color: "#5C3D2E" }}>{plan.desc}</p>
                    <ul className="space-y-1">
                      {plan.included.map((inc, j) => (
                        <li key={j} className="flex items-center gap-2 text-xs" style={{ color: "#5C3D2E" }}>
                          <span style={{ color: plan.color }}>✓</span>
                          {inc}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                <p className="text-xs mt-4" style={{ color: "#8B5E34" }}>
                  ※ 体験は要予約です。お電話またはお問い合わせフォームからご予約ください。<br />
                  ※ 小学生以下のお子様は半額。3歳以下は無料です。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SHIPPING ===== */}
        <section id="shipping" className="py-20 md:py-32" style={{ backgroundColor: "#FFFDF7" }}>
          <div
            ref={(el) => { addRef(el); if (el) shippingRef.current = el; }}
            className="max-w-4xl mx-auto px-6 opacity-0 translate-y-8 transition-all duration-700 ease-out"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px flex-1" style={{ backgroundColor: "#E07B39", opacity: 0.3 }} />
              <p className="text-xs tracking-widest font-medium" style={{ color: "#E07B39" }}>SHIPPING</p>
              <div className="h-px flex-1" style={{ backgroundColor: "#E07B39", opacity: 0.3 }} />
            </div>
            <h2 className="font-serif-jp text-3xl md:text-4xl font-bold text-center mb-2" style={{ color: "#2C1810" }}>
              全国配送について
            </h2>
            <p className="text-center text-sm mb-12" style={{ color: "#8B5E34" }}>
              島から日本全国へ、採れたての美味しさをお届けします
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-10">
              {/* How to order */}
              <div className="rounded-2xl p-6" style={{ backgroundColor: "#FFF8EE", border: "1px solid rgba(224,123,57,0.15)" }}>
                <h3 className="font-serif-jp font-bold text-lg mb-6" style={{ color: "#2C1810" }}>
                  ご注文の流れ
                </h3>
                <div className="space-y-0">
                  {[
                    { step: "01", title: "ご注文・お問い合わせ", desc: "フォームまたはお電話でご希望の商品・お届け先をお知らせください。" },
                    { step: "02", title: "収穫・梱包", desc: "ご注文を受けてから収穫・丁寧に梱包します。" },
                    { step: "03", title: "発送・お届け", desc: "クール便で発送。奄美から本州まで翌日〜2日でお届けします。" },
                    { step: "04", title: "お楽しみください", desc: "届いたらすぐにお召し上がりいただくと一番美味しくいただけます。" },
                  ].map((step, i) => (
                    <div key={i}>
                      <div
                        className={`shipping-step flex gap-4${shippingVisible ? " visible" : ""}`}
                        style={{ animationDelay: shippingVisible ? `${i * 220}ms` : "0ms", paddingBottom: i < 3 ? "0" : "0" }}
                      >
                        <div className="flex flex-col items-center">
                          <div
                            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                            style={{ backgroundColor: "#E07B39", color: "#fff" }}
                          >
                            {step.step}
                          </div>
                          {i < 3 && (
                            <svg width="2" height="28" viewBox="0 0 2 28" className="my-1">
                              <line
                                x1="1" y1="0" x2="1" y2="28"
                                stroke="#E07B39" strokeWidth="2" strokeDasharray="4 3"
                                pathLength="28"
                                className={`step-arrow${shippingVisible ? " visible" : ""}`}
                                style={{ animationDelay: shippingVisible ? `${i * 220 + 180}ms` : "0ms" }}
                              />
                            </svg>
                          )}
                        </div>
                        <div style={{ paddingBottom: i < 3 ? "1rem" : "0" }}>
                          <p className="font-medium text-sm mb-1" style={{ color: "#2C1810" }}>{step.title}</p>
                          <p className="text-xs leading-relaxed" style={{ color: "#5C3D2E" }}>{step.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping info */}
              <div className="space-y-4">
                {[
                  {
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4A7C3F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                      </svg>
                    ),
                    title: "配送方法",
                    desc: "ヤマト運輸クール宅急便\n（冷蔵・冷凍どちらも対応）",
                  },
                  {
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E07B39" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                    ),
                    title: "配送エリア",
                    desc: "日本全国（沖縄・離島は別途料金）",
                  },
                  {
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B5E34" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                    ),
                    title: "お届け日数",
                    desc: "ご注文から3〜5日前後\n（旬の時期は発送が遅れる場合がございます）",
                  },
                  {
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C84B9E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
                      </svg>
                    ),
                    title: "送料",
                    desc: "全国一律 ¥1,100〜\n沖縄・離島は別途料金",
                  },
                ].map((info, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-4 flex gap-4 items-start"
                    style={{ backgroundColor: "#FFF8EE", border: "1px solid rgba(139,94,52,0.1)" }}
                  >
                    <div className="flex-shrink-0 mt-0.5">{info.icon}</div>
                    <div>
                      <p className="font-medium text-sm mb-1" style={{ color: "#2C1810" }}>{info.title}</p>
                      <p className="text-xs leading-relaxed whitespace-pre-line" style={{ color: "#5C3D2E" }}>{info.desc}</p>
                    </div>
                  </div>
                ))}

                <div
                  className="rounded-xl p-4 flex items-center gap-3"
                  style={{ backgroundColor: "#FFF4E6", border: "2px solid #E07B39" }}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: "#E07B39" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: "#E07B39" }}>送料について</p>
                    <p className="text-xs font-bold mt-0.5" style={{ color: "#2C1810" }}>5,000円以上のご注文で送料無料</p>
                  </div>
                </div>

                <div
                  className="rounded-xl p-4"
                  style={{ backgroundColor: "#E07B39", color: "#fff" }}
                >
                  <p className="font-bold text-sm mb-1">鮮度保証</p>
                  <p className="text-xs leading-relaxed opacity-90">
                    お届けした商品に品質上の問題があった場合は、到着後2日以内にご連絡ください。返品・交換にて対応いたします。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== GALLERY ===== */}
        <section id="gallery" className="py-20 md:py-32" style={{ backgroundColor: "#2C1810" }}>
          <div
            ref={addRef}
            className="max-w-6xl mx-auto px-6 opacity-0 translate-y-8 transition-all duration-700 ease-out"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px flex-1" style={{ backgroundColor: "#E07B39", opacity: 0.4 }} />
              <p className="text-xs tracking-widest font-medium" style={{ color: "#E07B39" }}>GALLERY</p>
              <div className="h-px flex-1" style={{ backgroundColor: "#E07B39", opacity: 0.4 }} />
            </div>
            <h2 className="font-serif-jp text-3xl md:text-4xl font-bold text-center mb-2" style={{ color: "#FFFDF7" }}>
              農園の風景
            </h2>
            <p className="text-center text-sm mb-12" style={{ color: "rgba(255,253,247,0.6)" }}>
              奄美の自然と、実る果物たち
            </p>

            <div className="columns-2 md:columns-3 gap-4 space-y-4">
              {galleryPhotos.map((photo, i) => (
                <div
                  key={i}
                  ref={(el) => addGalleryRef(el, i)}
                  data-idx={i}
                  className="break-inside-avoid gallery-item rounded-xl overflow-hidden"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={600}
                    height={400}
                    className={`w-full ${photo.h} object-cover hover:scale-105 transition-transform duration-500`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== ACCESS ===== */}
        <section id="access" className="py-20 md:py-32" style={{ backgroundColor: "#FFFDF7" }}>
          <div
            ref={addRef}
            className="max-w-5xl mx-auto px-6 opacity-0 translate-y-8 transition-all duration-700 ease-out"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px flex-1" style={{ backgroundColor: "#4A7C3F", opacity: 0.3 }} />
              <p className="text-xs tracking-widest font-medium" style={{ color: "#4A7C3F" }}>ACCESS</p>
              <div className="h-px flex-1" style={{ backgroundColor: "#4A7C3F", opacity: 0.3 }} />
            </div>
            <h2 className="font-serif-jp text-3xl md:text-4xl font-bold text-center mb-2" style={{ color: "#2C1810" }}>
              アクセス
            </h2>
            <p className="text-center text-sm mb-12" style={{ color: "#8B5E34" }}>
              農園へのご来園をお待ちしております
            </p>

            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* Map placeholder */}
              <div
                className="rounded-2xl overflow-hidden flex items-center justify-center"
                style={{ height: "320px", backgroundColor: "#F0F7EE", border: "2px dashed rgba(74,124,63,0.3)" }}
              >
                <div className="text-center p-8">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#4A7C3F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4">
                    <path d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <p className="text-sm font-medium mb-1" style={{ color: "#4A7C3F" }}>Googleマップ</p>
                  <p className="text-xs" style={{ color: "#8B5E34" }}>
                    鹿児島県奄美市名瀬<br />あまみ果樹園 太陽のしずく
                  </p>
                </div>
              </div>

              {/* Info table */}
              <div>
                <table className="w-full">
                  <tbody>
                    {[
                      ["農園名", "あまみ果樹園 太陽のしずく"],
                      ["所在地", "〒894-0000 鹿児島県奄美市名瀬"],
                      ["アクセス", "奄美空港から車で約30分\n名瀬市街地から車で約10分"],
                      ["営業時間", "9:00〜17:00"],
                      ["定休日", "水曜日・年末年始"],
                      ["駐車場", "あり（無料・10台）"],
                      ["電話番号", "0997-XX-XXXX"],
                      ["メール", "info@taiyo-shizuku.example.com"],
                    ].map(([label, value], i) => (
                      <tr key={i} style={{ borderBottom: "1px solid rgba(139,94,52,0.1)" }}>
                        <td
                          className="py-3 pr-4 font-medium text-sm whitespace-nowrap align-top"
                          style={{ color: "#8B5E34", width: "100px" }}
                        >
                          {label}
                        </td>
                        <td className="py-3 text-sm whitespace-pre-line" style={{ color: "#2C1810" }}>
                          {value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-xs mt-4" style={{ color: "#8B5E34" }}>
                  農園体験・見学は事前のご予約をお願いします。<br />
                  直売所は営業時間内いつでもご来店いただけます。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== CONTACT / ORDER ===== */}
        <section id="contact" className="py-20 md:py-32 earth-texture" style={{ backgroundColor: "#FFF4E6", position: "relative" }}>
          <div
            ref={addRef}
            className="max-w-3xl mx-auto px-6 opacity-0 translate-y-8 transition-all duration-700 ease-out"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px flex-1" style={{ backgroundColor: "#E07B39", opacity: 0.3 }} />
              <p className="text-xs tracking-widest font-medium" style={{ color: "#E07B39" }}>CONTACT & ORDER</p>
              <div className="h-px flex-1" style={{ backgroundColor: "#E07B39", opacity: 0.3 }} />
            </div>
            <h2 className="font-serif-jp text-3xl md:text-4xl font-bold text-center mb-2" style={{ color: "#2C1810" }}>
              お問い合わせ・ご注文
            </h2>
            <p className="text-center text-sm mb-2" style={{ color: "#8B5E34" }}>
              お気軽にご連絡ください
            </p>

            {/* Phone CTA */}
            <div
              className="rounded-2xl p-6 text-center mb-8"
              style={{ backgroundColor: "#E07B39" }}
            >
              <p className="text-sm font-medium mb-2" style={{ color: "rgba(255,253,247,0.85)" }}>
                お電話でのご注文・お問い合わせ
              </p>
              <p className="font-serif-jp text-3xl md:text-4xl font-bold mb-1" style={{ color: "#FFFDF7" }}>
                0997-XX-XXXX
              </p>
              <p className="text-xs" style={{ color: "rgba(255,253,247,0.7)" }}>
                受付時間 9:00〜17:00（水曜・年末年始を除く）
              </p>
            </div>

            {/* Form */}
            <div
              className="rounded-2xl p-6 md:p-8"
              style={{ backgroundColor: "#FFFDF7", boxShadow: "0 2px 20px rgba(44,24,16,0.08)" }}
            >
              <h3 className="font-serif-jp font-bold text-lg mb-6 text-center" style={{ color: "#2C1810" }}>
                フォームからのご連絡
              </h3>
              {formSubmitted ? (
              <div
                className="rounded-2xl p-8 text-center"
                style={{ backgroundColor: "#F0F7EE", border: "2px solid rgba(74,124,63,0.25)" }}
              >
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#4A7C3F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <h3 className="font-serif-jp font-bold text-xl mb-2" style={{ color: "#2C1810" }}>
                  お問い合わせありがとうございます
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#5C3D2E" }}>
                  内容を確認のうえ、2〜3営業日以内にご連絡いたします。
                </p>
              </div>
            ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setFormSubmitted(true);
              }}
              className="space-y-5"
            >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "#5C3D2E" }}>
                      お名前 <span style={{ color: "#E07B39" }}>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="山田 太郎"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-lg px-4 py-2.5 text-sm outline-none transition-all"
                      style={{
                        backgroundColor: "#FFFDF7",
                        border: "1.5px solid rgba(139,94,52,0.25)",
                        color: "#2C1810",
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "#5C3D2E" }}>
                      電話番号
                    </label>
                    <input
                      type="tel"
                      placeholder="090-0000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-lg px-4 py-2.5 text-sm outline-none transition-all"
                      style={{
                        backgroundColor: "#FFFDF7",
                        border: "1.5px solid rgba(139,94,52,0.25)",
                        color: "#2C1810",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "#5C3D2E" }}>
                    メールアドレス <span style={{ color: "#E07B39" }}>*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-lg px-4 py-2.5 text-sm outline-none transition-all"
                    style={{
                      backgroundColor: "#FFFDF7",
                      border: "1.5px solid rgba(139,94,52,0.25)",
                      color: "#2C1810",
                    }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "#5C3D2E" }}>
                    お問い合わせ種別
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full rounded-lg px-4 py-2.5 text-sm outline-none transition-all"
                    style={{
                      backgroundColor: "#FFFDF7",
                      border: "1.5px solid rgba(139,94,52,0.25)",
                      color: formData.type ? "#2C1810" : "#8B5E34",
                    }}
                  >
                    <option value="" disabled>選択してください</option>
                    <option value="order">商品のご注文</option>
                    <option value="experience">農園体験のご予約</option>
                    <option value="wholesale">卸・まとめ買いのご相談</option>
                    <option value="gift">ギフト・お歳暮のご相談</option>
                    <option value="other">その他のお問い合わせ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "#5C3D2E" }}>
                    メッセージ・ご希望商品など <span style={{ color: "#E07B39" }}>*</span>
                  </label>
                  <textarea
                    rows={5}
                    placeholder="ご希望の商品・数量、お届け日のご希望などをご記入ください。"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-lg px-4 py-2.5 text-sm outline-none transition-all resize-none"
                    style={{
                      backgroundColor: "#FFFDF7",
                      border: "1.5px solid rgba(139,94,52,0.25)",
                      color: "#2C1810",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full font-bold text-sm transition-all hover:opacity-90"
                  style={{ backgroundColor: "#E07B39", color: "#fff" }}
                >
                  送信する
                </button>

                <p className="text-xs text-center" style={{ color: "#8B5E34" }}>
                  ※ 通常2〜3営業日以内にご返信いたします。
                </p>
              </form>
            )}
            </div>
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <footer style={{ backgroundColor: "#1A0F0A", color: "#FFFDF7" }}>
          <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="grid md:grid-cols-3 gap-10 mb-12">
              {/* Farm info */}
              <div>
                <h2 className="font-serif-jp font-bold text-xl mb-1" style={{ color: "#FFFDF7" }}>
                  あまみ果樹園
                </h2>
                <p className="font-serif-jp text-base mb-4" style={{ color: "#F5C842" }}>
                  太陽のしずく
                </p>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,253,247,0.55)" }}>
                  奄美大島で3世代にわたって<br />
                  果樹を育ててきた農園です。<br />
                  島の恵みを日本全国へお届けします。
                </p>
              </div>

              {/* Navigation */}
              <div>
                <h3 className="font-medium text-sm mb-4" style={{ color: "rgba(255,253,247,0.6)" }}>
                  サイトマップ
                </h3>
                <ul className="space-y-2">
                  {[
                    { label: "農園紹介", id: "about" },
                    { label: "商品紹介", id: "products" },
                    { label: "旬のカレンダー", id: "calendar" },
                    { label: "農園体験", id: "experience" },
                    { label: "配送について", id: "shipping" },
                    { label: "アクセス", id: "access" },
                    { label: "お問い合わせ", id: "contact" },
                  ].map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="text-xs transition-opacity hover:opacity-60"
                        style={{ color: "rgba(255,253,247,0.7)" }}
                        onClick={(e) => smoothScroll(e, item.id)}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact info */}
              <div>
                <h3 className="font-medium text-sm mb-4" style={{ color: "rgba(255,253,247,0.6)" }}>
                  お問い合わせ先
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,253,247,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                    </svg>
                    <div>
                      <p className="text-xs" style={{ color: "rgba(255,253,247,0.7)" }}>0997-XX-XXXX</p>
                      <p className="text-xs" style={{ color: "rgba(255,253,247,0.4)" }}>9:00〜17:00（水曜除く）</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,253,247,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                    </svg>
                    <p className="text-xs" style={{ color: "rgba(255,253,247,0.7)" }}>
                      info@taiyo-shizuku.example.com
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,253,247,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
                      <path d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                    <p className="text-xs" style={{ color: "rgba(255,253,247,0.7)" }}>
                      〒894-0000<br />鹿児島県奄美市名瀬
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div
              className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
              style={{ borderTop: "1px solid rgba(255,253,247,0.1)" }}
            >
              <p className="text-xs" style={{ color: "rgba(255,253,247,0.3)" }}>
                &copy; 2026 あまみ果樹園 太陽のしずく. All rights reserved.
              </p>
              <p className="text-xs" style={{ color: "rgba(255,253,247,0.25)" }}>
                デモサイト — Designed by{" "}
                <a href="/web#gallery" className="hover:opacity-60 transition-opacity" style={{ color: "rgba(255,253,247,0.4)" }}>
                  TIDA WORKS
                </a>
              </p>
            </div>
          </div>
        </footer>

      </div>

      {/* ===== FIXED BOTTOM CTA BAR ===== */}
      <style>{`
        @keyframes farm-cta-slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .farm-cta-bar {
          animation: farm-cta-slide-up 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
      {showCta && (
        <div
          className="farm-cta-bar fixed bottom-0 left-0 right-0 z-40 px-4 py-3 flex items-center justify-between gap-3"
          style={{
            backgroundColor: "rgba(255, 253, 247, 0.97)",
            backdropFilter: "blur(12px)",
            borderTop: "1px solid rgba(224,123,57,0.25)",
            boxShadow: "0 -4px 20px rgba(224,123,57,0.08)",
          }}
          role="complementary"
          aria-label="お問い合わせのショートカット"
        >
          <a
            href="tel:0997-XX-XXXX"
            className="flex items-center justify-center gap-2 flex-1 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 hover:opacity-80"
            style={{ backgroundColor: "#E07B39", color: "#ffffff" }}
            aria-label="電話する: 0997-XX-XXXX"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>
            電話する
          </a>
          <a
            href="#contact"
            className="flex items-center justify-center gap-2 flex-1 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 hover:opacity-80"
            style={{ border: "1px solid rgba(224,123,57,0.5)", color: "#E07B39" }}
            aria-label="お問い合わせフォームへスクロール"
          >
            Web予約/お問い合わせ
          </a>
        </div>
      )}
    </>
  );
}
