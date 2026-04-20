"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import Image from "next/image";
import { useReveal } from "../hooks/useReveal";

// --- Salon Ornamental Divider (scissors centered in decorative lines) ---
function SalonDivider({
  inView = false,
}: {
  inView?: boolean;
}) {
  return (
    <div
      className="flex items-center justify-center gap-0 w-full my-6"
      style={{ opacity: inView ? 1 : 0, transition: "opacity 0.6s ease-out" }}
    >
      {/* Left decorative line */}
      <svg width="160" height="20" viewBox="0 0 160 20" fill="none" style={{ overflow: "visible" }}>
        <line
          x1="0" y1="10" x2="130" y2="10"
          stroke="rgba(196,162,101,0.35)"
          strokeWidth="1"
          className={inView ? "salon-divider-line" : ""}
          style={{ animationDelay: "0.1s" }}
        />
        {/* Small leaf flourish near center */}
        <path
          d="M120 10 C126 4, 134 4, 138 10 C134 16, 126 16, 120 10Z"
          stroke="rgba(196,162,101,0.4)"
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="108" cy="10" r="1.5" fill="rgba(196,162,101,0.45)" />
        <circle cx="100" cy="10" r="1" fill="rgba(196,162,101,0.3)" />
      </svg>

      {/* Center: Scissors icon */}
      <div className="flex-shrink-0 mx-3">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(196,162,101,0.75)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <line x1="20" y1="4" x2="8.12" y2="15.88" />
          <line x1="14.47" y1="14.48" x2="20" y2="20" />
          <line x1="8.12" y1="8.12" x2="12" y2="12" />
        </svg>
      </div>

      {/* Right decorative line (mirrored) */}
      <svg width="160" height="20" viewBox="0 0 160 20" fill="none" style={{ transform: "scaleX(-1)", overflow: "visible" }}>
        <line
          x1="0" y1="10" x2="130" y2="10"
          stroke="rgba(196,162,101,0.35)"
          strokeWidth="1"
          className={inView ? "salon-divider-line" : ""}
          style={{ animationDelay: "0.1s" }}
        />
        <path
          d="M120 10 C126 4, 134 4, 138 10 C134 16, 126 16, 120 10Z"
          stroke="rgba(196,162,101,0.4)"
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="108" cy="10" r="1.5" fill="rgba(196,162,101,0.45)" />
        <circle cx="100" cy="10" r="1" fill="rgba(196,162,101,0.3)" />
      </svg>
    </div>
  );
}

export default function SalonPage() {
  const headerRef = useRef<HTMLElement>(null);
  const conceptImageRef = useRef<HTMLDivElement>(null);
  const stylist1Ref = useRef<HTMLDivElement>(null);
  const stylist2Ref = useRef<HTMLDivElement>(null);
  const galleryItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Section divider inView hooks
  const conceptSection = useReveal(0.2);
  const menuSection = useReveal(0.1);
  const stylistSection = useReveal(0.15);
  const gallerySection = useReveal(0.15);
  const reservationSection = useReveal(0.1);
  const accessSection = useReveal(0.15);

  // --- Reservation form state ---
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { href: "#menu", label: "メニュー" },
    { href: "#stylist", label: "スタイリスト" },
    { href: "#reservation", label: "ご予約" },
    { href: "#access", label: "アクセス" },
  ];

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    menu: "",
    datetime: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "お名前を入力してください";
    if (!formData.phone.trim()) errors.phone = "電話番号を入力してください";
    if (!formData.menu) errors.menu = "メニューを選択してください";
    if (!formData.datetime) errors.datetime = "ご希望日時を選択してください";
    return errors;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    setFormSubmitted(true);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => { const next = { ...prev }; delete next[name]; return next; });
    }
  };

  // --- Lightbox state ---
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxClosing, setLightboxClosing] = useState(false);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxClosing(false);
  };

  const closeLightbox = () => {
    setLightboxClosing(true);
    setTimeout(() => {
      setLightboxIndex(null);
      setLightboxClosing(false);
    }, 280);
  };

  const lightboxPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + galleryItems.length) % galleryItems.length);
  };

  const lightboxNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % galleryItems.length);
  };

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") setLightboxIndex((prev) => prev === null ? null : (prev - 1 + galleryItems.length) % galleryItems.length);
      if (e.key === "ArrowRight") setLightboxIndex((prev) => prev === null ? null : (prev + 1) % galleryItems.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps -- closeLightbox/galleryItems are stable
  }, [lightboxIndex]);

  // Scroll-linked header opacity
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const opacity = Math.min(scrollY / 80, 1);
      header.style.backgroundColor = `rgba(245, 240, 232, ${0.6 + opacity * 0.35})`;
      header.style.boxShadow = opacity > 0.5
        ? `0 1px 0 rgba(139, 105, 20, ${opacity * 0.15})`
        : "none";
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for mask reveal (concept image + stylist photos)
  useEffect(() => {
    const targets = [
      conceptImageRef.current,
      stylist1Ref.current,
      stylist2Ref.current,
    ].filter(Boolean) as HTMLDivElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("mask-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);


  // Intersection Observer for gallery stagger
  useEffect(() => {
    const items = galleryItemRefs.current.filter(Boolean) as HTMLDivElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("gallery-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Carousel focus effect on scroll
  const updateCarouselFocus = useCallback(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const items = carouselItemRefs.current.filter(Boolean) as HTMLDivElement[];
    if (items.length === 0) return;

    const carouselCenter = carousel.scrollLeft + carousel.clientWidth / 2;

    items.forEach((item) => {
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const distance = Math.abs(carouselCenter - itemCenter);
      const maxDistance = carousel.clientWidth * 0.6;
      const ratio = Math.min(distance / maxDistance, 1);

      const scale = 1.05 - ratio * 0.1;
      const opacity = 1 - ratio * 0.35;
      const zIndex = ratio < 0.3 ? 10 : 1;

      item.style.transform = `scale(${scale})`;
      item.style.opacity = String(opacity);
      item.style.zIndex = String(zIndex);
    });
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    // Initial focus update
    updateCarouselFocus();

    carousel.addEventListener("scroll", updateCarouselFocus, { passive: true });
    window.addEventListener("resize", updateCarouselFocus, { passive: true });

    return () => {
      carousel.removeEventListener("scroll", updateCarouselFocus);
      window.removeEventListener("resize", updateCarouselFocus);
    };
  }, [updateCarouselFocus]);

  const menuItems = [
    {
      label: "カット",
      desc: "シャンプー・ブロー込み",
      price: "¥4,400",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B6914" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 opacity-60">
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <line x1="20" y1="4" x2="8.12" y2="15.88" />
          <line x1="14.47" y1="14.48" x2="20" y2="20" />
          <line x1="8.12" y1="8.12" x2="12" y2="12" />
        </svg>
      ),
    },
    {
      label: "カラー",
      desc: "リタッチ / フルカラー",
      price: "¥6,600〜",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B6914" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 opacity-60">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </svg>
      ),
    },
    {
      label: "パーマ",
      desc: "カット込み",
      price: "¥7,700〜",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B6914" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 opacity-60">
          <path d="M4 12c0-3 2-6 4-7s4 0 4 3-2 6-4 7-4 0-4-3z" />
          <path d="M12 12c0-3 2-6 4-7s4 0 4 3-2 6-4 7-4 0-4-3z" />
        </svg>
      ),
    },
    {
      label: "縮毛矯正",
      desc: "カット込み",
      price: "¥13,200〜",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B6914" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 opacity-60">
          <path d="M4 4v16" />
          <path d="M9 4v16" />
          <path d="M14 4v16" />
          <path d="M19 4v16" />
          <path d="M4 20h15" />
        </svg>
      ),
    },
    {
      label: "ヘッドスパ",
      desc: "頭皮ケア・リラクゼーション",
      price: "¥3,300",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B6914" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 opacity-60">
          <circle cx="12" cy="8" r="5" />
          <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
          <path d="M8 3c1 2 3 3 4 3s3-1 4-3" />
        </svg>
      ),
    },
    {
      label: "トリートメント",
      desc: "ダメージ補修・ツヤ髪ケア",
      price: "¥3,300〜",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B6914" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 opacity-60">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      ),
    },
  ];

  const galleryItems = [
    { src: "/images/demo/salon/gallery-counseling.jpg", label: "カウンセリングスペース" },
    { src: "/images/demo/salon/gallery-cut-booth.jpg", label: "カットブース" },
    { src: "/images/demo/salon/gallery-organic.jpg", label: "オーガニック商品" },
    { src: "/images/demo/salon/hero.jpg", label: "店内の雰囲気" },
    { src: "/images/demo/salon/gallery-relax.jpg", label: "リラックス空間" },
  ];

  const heroLetters = "kukuru".split("");

  return (
    <div className="min-h-screen bg-[#F5F0E8] text-[#3D2E0A]" style={{ fontFamily: "var(--font-noto-sans-jp), sans-serif" }}>
      {/* ===== Google Fonts + Keyframes ===== */}
      <style>{`
        html { scroll-behavior: smooth; }
        .font-serif-jp { font-family: var(--font-noto-serif-jp), serif; }

        /* ---- 1. Hero text reveal ---- */
        @keyframes revealChar {
          from {
            opacity: 0;
            transform: translateY(30px) rotateX(-40deg);
            filter: blur(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
            filter: blur(0);
          }
        }
        .hero-char {
          display: inline-block;
          opacity: 0;
          animation: revealChar 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        /* ---- 2. Image mask reveal ---- */
        @keyframes maskReveal {
          from { clip-path: inset(0 100% 0 0); }
          to   { clip-path: inset(0 0% 0 0); }
        }
        @keyframes maskRevealCircle {
          from { clip-path: circle(0% at 50% 50%); }
          to   { clip-path: circle(75% at 50% 50%); }
        }
        .mask-reveal-wrapper {
          clip-path: inset(0 0 0 0);
        }
        /* Circle variant for round portraits */
        .mask-reveal-circle {
          clip-path: circle(0% at 50% 50%);
        }
        .mask-reveal-circle.mask-revealed {
          animation: maskRevealCircle 0.9s cubic-bezier(0.77, 0, 0.18, 1) forwards;
        }

        /* ---- 4. Floating organic shapes ---- */
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50%       { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes floatReverse {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50%       { transform: translateY(20px) rotate(-5deg); }
        }
        .float-shape {
          animation: float 7s ease-in-out infinite;
          pointer-events: none;
        }
        .float-shape-reverse {
          animation: floatReverse 9s ease-in-out infinite;
          pointer-events: none;
        }
        .float-shape-slow {
          animation: float 12s ease-in-out infinite;
          pointer-events: none;
        }

        /* ---- Scissors slow rotation ---- */
        @keyframes scissorFloat {
          0%   { transform: translateY(0) rotate(-15deg); }
          30%  { transform: translateY(-14px) rotate(5deg); }
          60%  { transform: translateY(-8px) rotate(-10deg); }
          100% { transform: translateY(0) rotate(-15deg); }
        }
        .scissors-float {
          animation: scissorFloat 8s ease-in-out infinite;
          pointer-events: none;
        }

        /* ---- Comb sway ---- */
        @keyframes combSway {
          0%, 100% { transform: translateY(0) rotate(20deg); }
          50%       { transform: translateY(-18px) rotate(28deg); }
        }
        .comb-float {
          animation: combSway 10s ease-in-out infinite;
          pointer-events: none;
        }

        /* ---- Leaf drift ---- */
        @keyframes leafDrift {
          0%   { transform: translateY(0) rotate(0deg); }
          33%  { transform: translateY(-16px) rotate(12deg); }
          66%  { transform: translateY(-8px) rotate(-8deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        .leaf-float {
          animation: leafDrift 11s ease-in-out infinite;
          pointer-events: none;
        }

        /* ---- Sparkle twinkle ---- */
        @keyframes sparklePulse {
          0%, 100% { opacity: 0.15; transform: scale(0.8) rotate(0deg); }
          50%       { opacity: 0.6; transform: scale(1.2) rotate(45deg); }
        }
        @keyframes sparklePulse2 {
          0%, 100% { opacity: 0.2; transform: scale(1) rotate(0deg); }
          50%       { opacity: 0.7; transform: scale(1.4) rotate(-30deg); }
        }
        @keyframes sparklePulse3 {
          0%, 100% { opacity: 0.1; transform: scale(0.9) rotate(20deg); }
          50%       { opacity: 0.55; transform: scale(1.3) rotate(65deg); }
        }
        .sparkle-1 { animation: sparklePulse  3.2s ease-in-out infinite; pointer-events: none; }
        .sparkle-2 { animation: sparklePulse2 4.1s ease-in-out infinite; pointer-events: none; }
        .sparkle-3 { animation: sparklePulse3 2.8s ease-in-out infinite; pointer-events: none; }
        .sparkle-4 { animation: sparklePulse  5s   ease-in-out infinite; pointer-events: none; }
        .sparkle-5 { animation: sparklePulse2 3.7s ease-in-out infinite; pointer-events: none; }
        .sparkle-6 { animation: sparklePulse3 4.5s ease-in-out infinite; pointer-events: none; }

        /* ---- 6. Gallery stagger ---- */
        .gallery-item {
          opacity: 0;
          transform: scale(0.94);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }
        .gallery-item.gallery-visible {
          opacity: 1;
          transform: scale(1);
        }

        /* ---- Scissors icon fade-in ---- */
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 0.7; transform: translateY(0); }
        }
        .hero-icon {
          animation: fadeInDown 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both;
        }

        /* ---- Hero sub-text fade ---- */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-sub {
          animation: fadeInUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        /* ---- 7. Menu carousel ---- */
        .carousel-track {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding: 24px 0 32px;
          gap: 20px;
        }
        .carousel-track::-webkit-scrollbar {
          display: none;
        }
        .carousel-card {
          flex: 0 0 260px;
          scroll-snap-align: center;
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
                      opacity 0.35s ease,
                      box-shadow 0.35s ease;
          will-change: transform, opacity;
          position: relative;
        }
        @media (max-width: 640px) {
          .carousel-card {
            flex: 0 0 80vw;
          }
        }
        .carousel-thread {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent 0%, #C4A265 15%, #E8B4B8 40%, #C4A265 60%, #A8C5A0 80%, transparent 100%);
          opacity: 0.55;
          pointer-events: none;
          z-index: 0;
        }
        /* Ornamental nodes on the golden thread */
        .carousel-thread::before,
        .carousel-thread::after {
          content: '';
          position: absolute;
          top: 50%;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #C4A265;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 6px rgba(196, 162, 101, 0.5);
        }
        .carousel-thread::before { left: 25%; }
        .carousel-thread::after  { left: 75%; }

        /* ---- Section wave divider ---- */
        .section-wave {
          display: block;
          width: 100%;
          overflow: hidden;
          line-height: 0;
        }

        /* ---- Falling petal ---- */
        @keyframes petalFall {
          0%   { transform: translateY(-30px) rotate(0deg);   opacity: 0; }
          15%  { opacity: 0.6; }
          85%  { opacity: 0.5; }
          100% { transform: translateY(80px) rotate(180deg);  opacity: 0; }
        }
        .petal-fall-1 { animation: petalFall 6s ease-in-out infinite; }
        .petal-fall-2 { animation: petalFall 8s ease-in-out infinite; }
        .petal-fall-3 { animation: petalFall 7s ease-in-out infinite; }
        .petal-fall-4 { animation: petalFall 9s ease-in-out infinite; }
        .petal-fall-5 { animation: petalFall 5.5s ease-in-out infinite; }

        /* ---- 8. Stylist overlap layout ---- */
        .stylist-overlap-grid {
          display: flex;
          flex-direction: column;
          gap: 0;
          position: relative;
        }
        @media (min-width: 768px) {
          .stylist-overlap-grid {
            flex-direction: row;
            align-items: flex-start;
          }
          .stylist-card-1 {
            position: relative;
            z-index: 2;
            margin-right: -40px;
            transform: translateY(0) rotate(-1.5deg);
            transition: transform 0.3s ease, z-index 0s;
          }
          .stylist-card-1:hover {
            transform: translateY(-6px) rotate(-0.5deg);
            z-index: 10;
          }
          .stylist-card-2 {
            position: relative;
            z-index: 1;
            margin-top: 32px;
            transform: translateY(0) rotate(1.5deg);
            transition: transform 0.3s ease, z-index 0s;
          }
          .stylist-card-2:hover {
            transform: translateY(-6px) rotate(0.5deg);
            z-index: 10;
          }
        }
        @media (max-width: 767px) {
          .stylist-card-1 {
            position: relative;
            z-index: 1;
            margin-bottom: -8px;
            transform: rotate(-1deg);
            transition: transform 0.3s ease;
          }
          .stylist-card-1:hover {
            transform: rotate(0deg) translateY(-4px);
          }
          .stylist-card-2 {
            position: relative;
            z-index: 2;
            margin-left: 20px;
            transform: rotate(1deg);
            transition: transform 0.3s ease;
          }
          .stylist-card-2:hover {
            transform: rotate(0deg) translateY(-4px);
          }
        }

        /* ---- 9. Bento box gallery ---- */
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: 200px 160px 160px;
          gap: 8px;
        }
        @media (max-width: 640px) {
          .bento-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: 180px 140px 140px 140px;
          }
        }
        .bento-large {
          grid-column: span 2;
          grid-row: span 2;
        }
        @media (max-width: 640px) {
          .bento-large {
            grid-column: span 2;
            grid-row: span 1;
          }
        }

        /* ---- Ornamental section divider (scissors) ---- */
        @keyframes dividerGrow {
          from { transform: scaleX(0); opacity: 0; }
          to   { transform: scaleX(1); opacity: 1; }
        }
        .salon-divider-line {
          transform-origin: center;
          animation: dividerGrow 0.8s cubic-bezier(0.22,1,0.36,1) forwards;
        }

        /* ---- Carousel decorative frame ---- */
        .carousel-frame {
          position: relative;
        }
        .carousel-frame::before,
        .carousel-frame::after {
          content: '';
          position: absolute;
          left: 16px;
          right: 16px;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(196,162,101,0.35) 20%, rgba(196,162,101,0.5) 50%, rgba(196,162,101,0.35) 80%, transparent 100%);
          pointer-events: none;
          z-index: 2;
        }
        .carousel-frame::before { top: 0; }
        .carousel-frame::after  { bottom: 0; }

        /* Corner ornament dots */
        .carousel-corner {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(196,162,101,0.55);
          pointer-events: none;
          z-index: 3;
        }

        /* ---- Stylist photo parallax wrapper ---- */
        .stylist-photo-parallax {
          transition: transform 0.1s linear;
          will-change: transform;
        }

        /* ---- Lightbox ---- */
        @keyframes lightboxOpen {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes lightboxClose {
          from { opacity: 1; transform: scale(1); }
          to   { opacity: 0; transform: scale(0.92); }
        }
        @keyframes lightboxOverlayIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes lightboxOverlayOut {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
        .lightbox-overlay {
          animation: lightboxOverlayIn 0.28s ease forwards;
        }
        .lightbox-overlay.closing {
          animation: lightboxOverlayOut 0.28s ease forwards;
        }
        .lightbox-img {
          animation: lightboxOpen 0.28s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .lightbox-img.closing {
          animation: lightboxClose 0.28s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        /* ---- Reservation form ---- */
        .reservation-input {
          width: 100%;
          background: rgba(245, 240, 232, 0.8);
          border: 1px solid rgba(139, 105, 20, 0.2);
          border-radius: 10px;
          padding: 12px 16px;
          font-size: 0.9rem;
          color: #3D2E0A;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          font-family: var(--font-noto-sans-jp), sans-serif;
        }
        .reservation-input:focus {
          border-color: rgba(139, 105, 20, 0.55);
          box-shadow: 0 0 0 3px rgba(139, 105, 20, 0.08);
        }
        .reservation-input::placeholder {
          color: rgba(61, 46, 10, 0.35);
        }
        .reservation-input.error {
          border-color: rgba(180, 60, 60, 0.55);
        }
        .reservation-label {
          display: block;
          font-size: 0.75rem;
          letter-spacing: 0.12em;
          color: #8B6914;
          margin-bottom: 6px;
        }
        .reservation-error {
          font-size: 0.72rem;
          color: #b43c3c;
          margin-top: 4px;
          letter-spacing: 0.04em;
        }
        button[type="submit"], a[href="#reservation"], a[href*="tel:"] {
          transition: transform 0.2s ease, box-shadow 0.2s ease !important;
        }
        button[type="submit"]:hover, a[href="#reservation"]:hover, a[href*="tel:"]:hover {
          transform: scale(1.03) !important;
        }
        button[type="submit"]:active, a[href="#reservation"]:active, a[href*="tel:"]:active {
          transform: scale(0.98) !important;
        }

        /* ---- Desktop Nav / Mobile Menu ---- */
        .salon-nav-link {
          font-size: 0.78rem;
          letter-spacing: 0.1em;
          color: #8B6914;
          text-decoration: none;
          opacity: 0.75;
          transition: opacity 0.2s ease;
          position: relative;
        }
        .salon-nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: #8B6914;
          transition: width 0.25s ease;
        }
        .salon-nav-link:hover { opacity: 1; }
        .salon-nav-link:hover::after { width: 100%; }

        @media (max-width: 768px) {
          .salon-desktop-nav { display: none !important; }
          .salon-mobile-menu-btn { display: flex !important; }
        }

        @media (min-width: 769px) {
          .salon-mobile-menu-btn { display: none !important; }
          .salon-mobile-menu { display: none !important; }
        }
      `}</style>

      {/* ===== Fixed Header ===== */}
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm"
        style={{ backgroundColor: "rgba(245, 240, 232, 0.6)", transition: "background-color 0.3s ease, box-shadow 0.3s ease" }}
      >
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/web#gallery" className="text-sm text-[#8B6914] hover:text-[#3D2E0A] transition-colors hidden md:flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            ギャラリーに戻る
          </a>
          <div className="text-center">
            <span className="font-serif-jp text-lg tracking-widest text-[#8B6914]">kukuru</span>
          </div>

          {/* Desktop Nav */}
          <nav className="salon-desktop-nav" style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="salon-nav-link">
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="salon-mobile-menu-btn"
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
                  background: "#8B6914",
                  transition: "background 0.4s",
                }}
              />
            ))}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            className="salon-mobile-menu"
            style={{
              background: "rgba(245, 240, 232, 0.98)",
              borderTop: "1px solid rgba(139, 105, 20, 0.15)",
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
                  color: "#3D2E0A",
                  fontSize: "0.9rem",
                  letterSpacing: "0.06em",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(139, 105, 20, 0.1)",
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
                color: "#8B6914",
                fontSize: "0.8rem",
                textDecoration: "none",
                opacity: 0.6,
              }}
            >
              &#8592; ギャラリーに戻る
            </a>
          </div>
        )}
      </header>

      {/* ===== Hero Section ===== */}
      <section className="relative pt-16">
        <div className="relative h-[85vh] min-h-[500px] flex items-center justify-center overflow-hidden">
          {/* Hero background image */}
          <Image
            src="/images/demo/salon/hero.jpg"
            alt="美容室の店内風景"
            className="absolute inset-0 w-full h-full object-cover"
            width={1200}
            height={800}
            priority
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-[#3D2E0A]/50" />

          {/* ---- 4. Floating decorative shapes (salon motifs) ---- */}
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">

            {/* Scissors — top-left, rotating */}
            <div className="scissors-float absolute top-16 left-10 opacity-25" style={{ animationDelay: "0s" }}>
              <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#C4A265" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="6" cy="6" r="3" />
                <circle cx="6" cy="18" r="3" />
                <line x1="20" y1="4" x2="8.12" y2="15.88" />
                <line x1="14.47" y1="14.48" x2="20" y2="20" />
                <line x1="8.12" y1="8.12" x2="12" y2="12" />
              </svg>
            </div>

            {/* Comb — bottom-right */}
            <div className="comb-float absolute bottom-32 right-14 opacity-20" style={{ animationDelay: "1.5s" }}>
              <svg width="48" height="48" viewBox="0 0 40 40" fill="none" stroke="#E8B4B8" strokeWidth="1.6" strokeLinecap="round">
                {/* comb base */}
                <rect x="4" y="4" width="32" height="6" rx="2" fill="none" />
                {/* comb teeth */}
                <line x1="9"  y1="10" x2="9"  y2="28" />
                <line x1="15" y1="10" x2="15" y2="28" />
                <line x1="21" y1="10" x2="21" y2="28" />
                <line x1="27" y1="10" x2="27" y2="28" />
                <line x1="33" y1="10" x2="33" y2="28" />
              </svg>
            </div>

            {/* Flower — top-right */}
            <div className="leaf-float absolute top-28 right-20 opacity-25" style={{ animationDelay: "2.5s" }}>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <ellipse cx="24" cy="12" rx="6" ry="10" fill="#A8C5A0" opacity="0.8" transform="rotate(0   24 24)" />
                <ellipse cx="24" cy="12" rx="6" ry="10" fill="#A8C5A0" opacity="0.8" transform="rotate(60  24 24)" />
                <ellipse cx="24" cy="12" rx="6" ry="10" fill="#A8C5A0" opacity="0.8" transform="rotate(120 24 24)" />
                <ellipse cx="24" cy="12" rx="6" ry="10" fill="#C4A265" opacity="0.8" transform="rotate(180 24 24)" />
                <ellipse cx="24" cy="12" rx="6" ry="10" fill="#C4A265" opacity="0.8" transform="rotate(240 24 24)" />
                <ellipse cx="24" cy="12" rx="6" ry="10" fill="#C4A265" opacity="0.8" transform="rotate(300 24 24)" />
                <circle cx="24" cy="24" r="5" fill="#F5F0E8" opacity="0.9" />
              </svg>
            </div>

            {/* Scissors 2 — bottom-left, smaller */}
            <div className="scissors-float absolute bottom-40 left-16 opacity-20" style={{ animationDelay: "3.5s" }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#E8B4B8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="6" cy="6" r="3" />
                <circle cx="6" cy="18" r="3" />
                <line x1="20" y1="4" x2="8.12" y2="15.88" />
                <line x1="14.47" y1="14.48" x2="20" y2="20" />
                <line x1="8.12" y1="8.12" x2="12" y2="12" />
              </svg>
            </div>

            {/* Leaf — mid-left */}
            <div className="leaf-float absolute top-1/2 left-8 opacity-20" style={{ animationDelay: "1s" }}>
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                <path d="M22 4 C32 4 40 14 40 24 C40 36 30 42 22 42 C14 42 4 36 4 24 C4 14 12 4 22 4 Z" fill="#A8C5A0" opacity="0.7" />
                <path d="M22 8 C22 8 22 34 22 42" stroke="#F5F0E8" strokeWidth="1" opacity="0.5" />
                <path d="M12 18 C12 18 22 22 32 18" stroke="#F5F0E8" strokeWidth="0.8" opacity="0.4" />
              </svg>
            </div>

            {/* Sparkle stars around hero name — positioned at hero center */}
            <div className="sparkle-1 absolute top-[36%] left-[22%] opacity-30">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#C4A265">
                <path d="M12 2l2.09 6.26L20 10l-5.91 3.74L12 22l-2.09-7.26L4 10l5.91-1.74z" />
              </svg>
            </div>
            <div className="sparkle-2 absolute top-[30%] right-[24%] opacity-35">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#E8B4B8">
                <path d="M12 2l2.09 6.26L20 10l-5.91 3.74L12 22l-2.09-7.26L4 10l5.91-1.74z" />
              </svg>
            </div>
            <div className="sparkle-3 absolute top-[44%] right-[18%] opacity-25">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#A8C5A0">
                <path d="M12 2l2.09 6.26L20 10l-5.91 3.74L12 22l-2.09-7.26L4 10l5.91-1.74z" />
              </svg>
            </div>
            <div className="sparkle-4 absolute top-[42%] left-[26%] opacity-20">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#C4A265">
                <path d="M12 2l2.09 6.26L20 10l-5.91 3.74L12 22l-2.09-7.26L4 10l5.91-1.74z" />
              </svg>
            </div>
            <div className="sparkle-5 absolute top-[52%] left-[30%] opacity-25">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#E8B4B8">
                <path d="M12 2l2.09 6.26L20 10l-5.91 3.74L12 22l-2.09-7.26L4 10l5.91-1.74z" />
              </svg>
            </div>
            <div className="sparkle-6 absolute top-[34%] right-[30%] opacity-30">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="#A8C5A0">
                <path d="M12 2l2.09 6.26L20 10l-5.91 3.74L12 22l-2.09-7.26L4 10l5.91-1.74z" />
              </svg>
            </div>
          </div>

          <div className="relative text-center px-6">
            {/* Scissors icon */}
            <div className="mb-8 flex justify-center hero-icon">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#C4A265" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="6" cy="6" r="3" />
                <circle cx="6" cy="18" r="3" />
                <line x1="20" y1="4" x2="8.12" y2="15.88" />
                <line x1="14.47" y1="14.48" x2="20" y2="20" />
                <line x1="8.12" y1="8.12" x2="12" y2="12" />
              </svg>
            </div>

            {/* ---- 1. Character-by-character reveal ---- */}
            <div className="relative inline-block">
              {/* Sparkle dots twinkling around the salon name */}
              <span className="sparkle-1 absolute -top-5 -left-6 pointer-events-none">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#C4A265">
                  <path d="M12 2l2.09 6.26L20 10l-5.91 3.74L12 22l-2.09-7.26L4 10l5.91-1.74z" />
                </svg>
              </span>
              <span className="sparkle-3 absolute -top-4 right-4 pointer-events-none">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#E8B4B8">
                  <path d="M12 2l2.09 6.26L20 10l-5.91 3.74L12 22l-2.09-7.26L4 10l5.91-1.74z" />
                </svg>
              </span>
              <span className="sparkle-5 absolute top-0 -right-7 pointer-events-none">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#A8C5A0">
                  <path d="M12 2l2.09 6.26L20 10l-5.91 3.74L12 22l-2.09-7.26L4 10l5.91-1.74z" />
                </svg>
              </span>
              <span className="sparkle-2 absolute -bottom-3 -left-3 pointer-events-none">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="#C4A265">
                  <path d="M12 2l2.09 6.26L20 10l-5.91 3.74L12 22l-2.09-7.26L4 10l5.91-1.74z" />
                </svg>
              </span>
              <span className="sparkle-4 absolute -bottom-4 right-0 pointer-events-none">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="#E8B4B8">
                  <path d="M12 2l2.09 6.26L20 10l-5.91 3.74L12 22l-2.09-7.26L4 10l5.91-1.74z" />
                </svg>
              </span>
              <h1
                className="font-serif-jp text-4xl md:text-6xl tracking-[0.3em] text-[#F5F0E8] mb-4"
                aria-label="kukuru"
                style={{ perspective: "600px" }}
              >
                {heroLetters.map((char, i) => (
                  <span
                    key={i}
                    className="hero-char"
                    style={{ animationDelay: `${0.5 + i * 0.1}s` }}
                  >
                    {char}
                  </span>
                ))}
              </h1>
            </div>

            <p
              className="font-serif-jp text-base md:text-lg tracking-[0.2em] text-[#F5F0E8]/80 mb-2 hero-sub"
              style={{ animationDelay: "1.3s" }}
            >
              Hair Salon
            </p>

            <div
              className="w-16 h-px bg-[#F5F0E8]/40 mx-auto my-8 hero-sub"
              style={{ animationDelay: "1.5s" }}
            />

            <p
              className="text-sm md:text-base tracking-wider leading-relaxed text-[#F5F0E8]/90 max-w-md mx-auto font-light hero-sub"
              style={{ animationDelay: "1.7s" }}
            >
              島の風と光に似合う、
              <br />
              あなただけの自然な美しさを。
            </p>

            <p
              className="mt-6 text-xs tracking-widest text-[#F5F0E8]/60 uppercase hero-sub"
              style={{ animationDelay: "1.9s" }}
            >
              Amami Oshima
            </p>
          </div>

          {/* Scroll indicator — direct child of hero container so bottom-8 resolves correctly */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F5F0E8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </section>

      {/* ===== Section Divider: Hair-wave between Hero and Concept ===== */}
      <div className="section-wave -mt-1 bg-[#F5F0E8]" aria-hidden="true">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%", height: "60px" }}>
          {/* Flowing hair strand wave */}
          <path d="M0,30 C120,55 240,5 360,30 C480,55 600,5 720,30 C840,55 960,5 1080,30 C1200,55 1320,5 1440,30 L1440,0 L0,0 Z" fill="rgba(139,105,20,0.12)" />
          <path d="M0,38 C180,12 360,52 540,28 C720,4 900,48 1080,32 C1260,16 1380,44 1440,36 L1440,60 L0,60 Z" fill="rgba(196,162,101,0.10)" />
          {/* Scattered petal-dots along the wave */}
          <circle cx="180"  cy="32" r="3" fill="#C4A265" opacity="0.35" />
          <circle cx="360"  cy="28" r="2" fill="#E8B4B8" opacity="0.4" />
          <circle cx="540"  cy="34" r="3" fill="#A8C5A0" opacity="0.35" />
          <circle cx="720"  cy="26" r="2" fill="#C4A265" opacity="0.4" />
          <circle cx="900"  cy="32" r="3" fill="#E8B4B8" opacity="0.35" />
          <circle cx="1080" cy="28" r="2" fill="#A8C5A0" opacity="0.4" />
          <circle cx="1260" cy="34" r="3" fill="#C4A265" opacity="0.35" />
        </svg>
      </div>

      {/* ===== Concept Section ===== */}
      <section className="relative py-[60px] px-6 overflow-hidden" ref={conceptSection.ref}>
        {/* ---- 4. Floating shapes in concept section ---- */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          {/* Flower — top-right */}
          <div className="leaf-float absolute -top-6 right-8 opacity-20" style={{ animationDelay: "0.8s" }}>
            <svg width="80" height="80" viewBox="0 0 48 48" fill="none">
              <ellipse cx="24" cy="12" rx="6" ry="10" fill="#C4A265" opacity="0.8" transform="rotate(0   24 24)" />
              <ellipse cx="24" cy="12" rx="6" ry="10" fill="#C4A265" opacity="0.8" transform="rotate(60  24 24)" />
              <ellipse cx="24" cy="12" rx="6" ry="10" fill="#C4A265" opacity="0.8" transform="rotate(120 24 24)" />
              <ellipse cx="24" cy="12" rx="6" ry="10" fill="#A8C5A0" opacity="0.8" transform="rotate(180 24 24)" />
              <ellipse cx="24" cy="12" rx="6" ry="10" fill="#A8C5A0" opacity="0.8" transform="rotate(240 24 24)" />
              <ellipse cx="24" cy="12" rx="6" ry="10" fill="#A8C5A0" opacity="0.8" transform="rotate(300 24 24)" />
              <circle cx="24" cy="24" r="5" fill="#F5F0E8" opacity="0.9" />
            </svg>
          </div>
          {/* Leaf — bottom-left */}
          <div className="leaf-float absolute bottom-4 left-4 opacity-20" style={{ animationDelay: "2s" }}>
            <svg width="64" height="64" viewBox="0 0 44 44" fill="none">
              <path d="M22 4 C32 4 40 14 40 24 C40 36 30 42 22 42 C14 42 4 36 4 24 C4 14 12 4 22 4 Z" fill="#A8C5A0" opacity="0.6" />
              <path d="M22 8 C22 8 22 34 22 42" stroke="#F5F0E8" strokeWidth="1.2" opacity="0.4" />
            </svg>
          </div>
          {/* Scissors — mid-right */}
          <div className="scissors-float absolute top-1/2 right-4 opacity-15" style={{ animationDelay: "3s" }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C4A265" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="6" cy="6" r="3" />
              <circle cx="6" cy="18" r="3" />
              <line x1="20" y1="4" x2="8.12" y2="15.88" />
              <line x1="14.47" y1="14.48" x2="20" y2="20" />
              <line x1="8.12" y1="8.12" x2="12" y2="12" />
            </svg>
          </div>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* ---- 2. Image mask reveal ---- */}
            <div className="order-2 md:order-1">
              <div
                ref={conceptImageRef}
                className="rounded-2xl overflow-hidden shadow-lg mask-reveal-wrapper"
              >
                <Image
                  src="/images/demo/salon/concept.jpg"
                  alt="サロンの落ち着いた内装"
                  className="w-full aspect-[4/5] object-cover"
                  width={600}
                  height={400}
                />
              </div>
            </div>
            {/* Text */}
            <div className="order-1 md:order-2 text-center md:text-left">
              <p className="font-serif-jp text-xs tracking-[0.3em] text-[#8B6914] mb-4 uppercase">Concept</p>
              <SalonDivider inView={conceptSection.visible} />
              <h2 className="font-serif-jp text-2xl md:text-3xl tracking-wider mb-8 leading-relaxed mt-4">
                心がほどける、
                <br />
                あなたの居場所
              </h2>
              <div className="w-12 h-px bg-[#8B6914]/30 mx-auto md:mx-0 mb-8" />
              <p className="text-sm md:text-base leading-loose text-[#3D2E0A]/70 font-light">
                「kukuru」は島の言葉で「心」。
                <br />
                奄美の豊かな自然に囲まれたこの場所で、
                <br />
                髪も心も、ゆっくりほぐれていく。
                <br />
                一人ひとりの個性を大切に、
                <br />
                素材を活かしたスタイルをご提案します。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Section Divider: Petals between Concept and Menu ===== */}
      <div className="relative h-16 overflow-hidden" aria-hidden="true">
        <div className="petal-fall-1 absolute left-[15%] top-0 opacity-50" style={{ animationDelay: "0s" }}>
          <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
            <ellipse cx="7" cy="9" rx="5" ry="8" fill="#E8B4B8" transform="rotate(-20 7 9)" />
          </svg>
        </div>
        <div className="petal-fall-2 absolute left-[30%] top-0 opacity-45" style={{ animationDelay: "1.2s" }}>
          <svg width="12" height="16" viewBox="0 0 14 18" fill="none">
            <ellipse cx="7" cy="9" rx="5" ry="8" fill="#A8C5A0" transform="rotate(15 7 9)" />
          </svg>
        </div>
        <div className="petal-fall-3 absolute left-[50%] top-0 opacity-55" style={{ animationDelay: "0.5s" }}>
          <svg width="16" height="20" viewBox="0 0 14 18" fill="none">
            <ellipse cx="7" cy="9" rx="5" ry="8" fill="#C4A265" transform="rotate(-10 7 9)" />
          </svg>
        </div>
        <div className="petal-fall-4 absolute left-[68%] top-0 opacity-40" style={{ animationDelay: "2s" }}>
          <svg width="11" height="14" viewBox="0 0 14 18" fill="none">
            <ellipse cx="7" cy="9" rx="5" ry="8" fill="#E8B4B8" transform="rotate(25 7 9)" />
          </svg>
        </div>
        <div className="petal-fall-5 absolute left-[82%] top-0 opacity-50" style={{ animationDelay: "0.8s" }}>
          <svg width="13" height="17" viewBox="0 0 14 18" fill="none">
            <ellipse cx="7" cy="9" rx="5" ry="8" fill="#A8C5A0" transform="rotate(-30 7 9)" />
          </svg>
        </div>
      </div>

      {/* ===== Menu Section ===== */}
      <section id="menu" className="py-[60px] bg-white/40 overflow-hidden" ref={menuSection.ref}>
        <div className="text-center mb-10 px-6">
          <p className="font-serif-jp text-xs tracking-[0.3em] text-[#8B6914] mb-4 uppercase">Menu</p>
          <SalonDivider inView={menuSection.visible} />
          <h2 className="font-serif-jp text-2xl md:text-3xl tracking-wider mt-4">メニュー・料金</h2>
        </div>

        {/* ---- Menu: elegant list ---- */}
        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-[#F5F0E8]/60 border border-[#8B6914]/10 rounded-2xl p-8 md:p-10">
            <div className="space-y-0">
              {menuItems.map((item, i) => (
                <div key={i} className={`flex items-baseline gap-3 py-4 ${i < menuItems.length - 1 ? "border-b border-[#8B6914]/8" : ""}`}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <h3 className="font-serif-jp text-base md:text-lg tracking-wider text-[#3D2E0A]">{item.label}</h3>
                      <div className="flex-1 border-b border-dotted border-[#8B6914]/20 translate-y-[-4px] mx-1" />
                      <span className="font-serif-jp text-base md:text-lg text-[#8B6914] tabular-nums whitespace-nowrap text-left min-w-[6.5rem] flex-shrink-0">{item.price}</span>
                    </div>
                    <p className="text-xs text-[#3D2E0A]/40 mt-1 font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-[#3D2E0A]/30 mt-6 text-right">
              ※ 表示価格はすべて税込みです
            </p>
          </div>
        </div>
      </section>

      {/* ===== Section Divider: Gentle wave before Stylist ===== */}
      <div className="section-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 50" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%", height: "50px" }}>
          <path d="M0,25 C200,45 400,5 600,25 C800,45 1000,5 1200,25 C1320,38 1400,18 1440,25 L1440,50 L0,50 Z" fill="rgba(196,162,101,0.12)" />
          <path d="M0,20 C300,40 600,0 900,20 C1100,35 1300,10 1440,20 L1440,50 L0,50 Z" fill="rgba(168,197,160,0.10)" />
          {/* Diamond ornaments */}
          <polygon points="240,22 244,26 240,30 236,26" fill="#C4A265" opacity="0.4" />
          <polygon points="480,18 484,22 480,26 476,22" fill="#E8B4B8" opacity="0.4" />
          <polygon points="720,25 724,29 720,33 716,29" fill="#A8C5A0" opacity="0.4" />
          <polygon points="960,20 964,24 960,28 956,24" fill="#C4A265" opacity="0.4" />
          <polygon points="1200,23 1204,27 1200,31 1196,27" fill="#E8B4B8" opacity="0.4" />
        </svg>
      </div>

      {/* ===== Stylist Section ===== */}
      <section id="stylist" className="relative py-[60px] px-6 overflow-hidden" ref={stylistSection.ref}>
        {/* ---- 4. Floating shapes in stylist section ---- */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          {/* Comb — top-center */}
          <div className="comb-float absolute top-8 left-1/2 -translate-x-1/2 opacity-20" style={{ animationDelay: "0.5s" }}>
            <svg width="56" height="56" viewBox="0 0 40 40" fill="none" stroke="#E8B4B8" strokeWidth="1.6" strokeLinecap="round">
              <rect x="4" y="4" width="32" height="6" rx="2" fill="none" />
              <line x1="9"  y1="10" x2="9"  y2="28" />
              <line x1="15" y1="10" x2="15" y2="28" />
              <line x1="21" y1="10" x2="21" y2="28" />
              <line x1="27" y1="10" x2="27" y2="28" />
              <line x1="33" y1="10" x2="33" y2="28" />
            </svg>
          </div>
          {/* Sparkles */}
          <div className="sparkle-2 absolute top-12 right-16 opacity-30">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#C4A265">
              <path d="M12 2l2.09 6.26L20 10l-5.91 3.74L12 22l-2.09-7.26L4 10l5.91-1.74z" />
            </svg>
          </div>
          <div className="sparkle-4 absolute bottom-16 left-12 opacity-25">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#A8C5A0">
              <path d="M12 2l2.09 6.26L20 10l-5.91 3.74L12 22l-2.09-7.26L4 10l5.91-1.74z" />
            </svg>
          </div>
          {/* Leaf — bottom-right */}
          <div className="leaf-float absolute bottom-10 right-8 opacity-20" style={{ animationDelay: "2.5s" }}>
            <svg width="48" height="60" viewBox="0 0 44 44" fill="none">
              <path d="M22 4 C32 4 40 14 40 24 C40 36 30 42 22 42 C14 42 4 36 4 24 C4 14 12 4 22 4 Z" fill="#A8C5A0" opacity="0.6" />
              <path d="M22 8 C22 8 22 34 22 42" stroke="#F5F0E8" strokeWidth="1.2" opacity="0.4" />
            </svg>
          </div>
        </div>

        <div className="max-w-3xl mx-auto relative">
          <div className="text-center mb-16">
            <p className="font-serif-jp text-xs tracking-[0.3em] text-[#8B6914] mb-4 uppercase">Stylist</p>
            <SalonDivider inView={stylistSection.visible} />
            <h2 className="font-serif-jp text-2xl md:text-3xl tracking-wider mt-4">スタイリスト</h2>
          </div>

          {/* ---- Overlapping stacked layout ---- */}
          <div className="stylist-overlap-grid max-w-2xl mx-auto">
            {/* Stylist 1 — slightly tilted, on top */}
            <div className="stylist-card-1 flex-1">
              <div className="bg-[#F5F0E8] border border-[#8B6914]/15 rounded-2xl p-8 shadow-md text-center">
                <div
                  ref={stylist1Ref}
                  className="w-44 h-44 mx-auto mb-5 rounded-full overflow-hidden border-2 border-[#8B6914]/25 mask-reveal-circle shadow-sm"
                >
                  <Image
                    src="/images/demo/salon/stylist-misaki.jpg"
                    alt="スタイリスト 佐藤 美咲"
                    className="w-full h-full object-cover"
                    width={600}
                    height={600}
                    quality={92}
                  />
                </div>
                <p className="text-xs tracking-[0.2em] text-[#8B6914] mb-2 uppercase">Owner Stylist</p>
                <h3 className="font-serif-jp text-xl tracking-wider mb-1">佐藤 美咲</h3>
                <p className="text-xs text-[#3D2E0A]/50 mb-4">Misaki Sato</p>
                <div className="w-8 h-px bg-[#8B6914]/20 mx-auto mb-4" />
                <p className="text-sm leading-relaxed text-[#3D2E0A]/70 font-light">
                  東京の有名サロンで10年の経験を積み、
                  奄美の自然に惹かれて移住。
                  一人ひとりのライフスタイルに
                  寄り添ったスタイルを提案します。
                  得意なスタイルはナチュラルボブ
                  とゆるふわパーマ。
                </p>
              </div>
            </div>

            {/* Stylist 2 — slightly tilted opposite, behind */}
            <div className="stylist-card-2 flex-1">
              <div className="bg-white/80 border border-[#8B6914]/15 rounded-2xl p-8 shadow-md text-center">
                <div
                  ref={stylist2Ref}
                  className="w-44 h-44 mx-auto mb-5 rounded-full overflow-hidden border-2 border-[#8B6914]/25 mask-reveal-circle shadow-sm"
                >
                  <Image
                    src="/images/demo/salon/stylist-hina.jpg"
                    alt="スタイリスト 田中 陽菜"
                    className="w-full h-full object-cover"
                    width={600}
                    height={600}
                    quality={92}
                  />
                </div>
                <p className="text-xs tracking-[0.2em] text-[#8B6914] mb-2 uppercase">Stylist</p>
                <h3 className="font-serif-jp text-xl tracking-wider mb-1">田中 陽菜</h3>
                <p className="text-xs text-[#3D2E0A]/50 mb-4">Hina Tanaka</p>
                <div className="w-8 h-px bg-[#8B6914]/20 mx-auto mb-4" />
                <p className="text-sm leading-relaxed text-[#3D2E0A]/70 font-light">
                  奄美大島出身。地元の風土を知り尽くした
                  島っ子スタイリスト。
                  湿気に負けないスタイリングや
                  ヘッドスパが好評。
                  お客様との会話も大切にしています。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Gallery-like atmosphere section ===== */}
      <section className="py-[60px] px-6 bg-white/40" ref={gallerySection.ref}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-serif-jp text-xs tracking-[0.3em] text-[#8B6914] mb-4 uppercase">Atmosphere</p>
            <SalonDivider inView={gallerySection.visible} />
            <h2 className="font-serif-jp text-2xl md:text-3xl tracking-wider mt-4">サロンの雰囲気</h2>
          </div>

          {/* ---- 6. Bento box gallery ---- */}
          <div className="bento-grid">
            {galleryItems.map((item, i) => (
              <div
                key={i}
                className={`relative group overflow-hidden rounded-xl gallery-item cursor-pointer${i === 0 ? " bento-large" : ""}`}
                ref={(el) => { galleryItemRefs.current[i] = el; }}
                style={{ transitionDelay: `${i * 0.12}s` }}
                onClick={() => openLightbox(i)}
                role="button"
                aria-label={`${item.label}を拡大表示`}
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox(i); } }}
              >
                <Image
                  src={item.src}
                  alt={item.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  width={600}
                  height={400}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3D2E0A]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between">
                  <span className="text-xs text-[#F5F0E8] tracking-wider p-3">
                    {item.label}
                  </span>
                  <span className="p-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F5F0E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-[#3D2E0A]/40 mt-8">
            ※ 木のぬくもりを感じる、落ち着いた空間です
          </p>
        </div>
      </section>

      {/* ===== Reservation Section ===== */}
      <section id="reservation" className="py-[60px] px-6 bg-white/40" ref={reservationSection.ref}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-serif-jp text-xs tracking-[0.3em] text-[#8B6914] mb-4 uppercase">Reservation</p>
            <SalonDivider inView={reservationSection.visible} />
            <h2 className="font-serif-jp text-2xl md:text-3xl tracking-wider mt-4">Web予約</h2>
            <p className="text-sm text-[#3D2E0A]/55 mt-4 font-light leading-relaxed">
              ご希望の内容をご入力ください。<br />
              確認後、営業時間内にお電話にてご連絡いたします。
            </p>
          </div>

          {formSubmitted ? (
            <div
              className="rounded-2xl bg-[#F5F0E8] border border-[#8B6914]/20 p-12 text-center shadow-sm"
              style={{ animation: "lightboxOpen 0.45s cubic-bezier(0.22,1,0.36,1) forwards" }}
            >
              {/* Check icon */}
              <div className="w-16 h-16 rounded-full bg-[#8B6914]/10 flex items-center justify-center mx-auto mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8B6914" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="font-serif-jp text-xl tracking-wider text-[#3D2E0A] mb-3">
                ご予約を受け付けました
              </p>
              <div className="w-10 h-px bg-[#8B6914]/25 mx-auto my-4" />
              <p className="text-sm text-[#3D2E0A]/60 leading-relaxed font-light">
                {formData.name} 様、ありがとうございます。<br />
                確認後、担当者よりお電話いたします。<br />
                しばらくお待ちくださいませ。
              </p>
              <button
                type="button"
                className="mt-8 text-xs tracking-widest text-[#8B6914] border border-[#8B6914]/30 px-6 py-3 rounded-full hover:bg-[#8B6914]/5 transition-colors"
                onClick={() => { setFormSubmitted(false); setFormData({ name: "", phone: "", menu: "", datetime: "", message: "" }); }}
              >
                別の予約をする
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleFormSubmit}
              className="rounded-2xl bg-[#F5F0E8] border border-[#8B6914]/15 p-8 md:p-10 shadow-sm space-y-6"
              noValidate
            >
              {/* Row: Name + Phone */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="reservation-label" htmlFor="res-name">
                    お名前 <span className="text-[#b43c3c]">*</span>
                  </label>
                  <input
                    id="res-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="山田 花子"
                    value={formData.name}
                    onChange={handleFormChange}
                    className={`reservation-input${formErrors.name ? " error" : ""}`}
                  />
                  {formErrors.name && <p className="reservation-error">{formErrors.name}</p>}
                </div>
                <div>
                  <label className="reservation-label" htmlFor="res-phone">
                    電話番号 <span className="text-[#b43c3c]">*</span>
                  </label>
                  <input
                    id="res-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="090-0000-0000"
                    value={formData.phone}
                    onChange={handleFormChange}
                    className={`reservation-input${formErrors.phone ? " error" : ""}`}
                  />
                  {formErrors.phone && <p className="reservation-error">{formErrors.phone}</p>}
                </div>
              </div>

              {/* Menu select */}
              <div>
                <label className="reservation-label" htmlFor="res-menu">
                  メニュー <span className="text-[#b43c3c]">*</span>
                </label>
                <select
                  id="res-menu"
                  name="menu"
                  value={formData.menu}
                  onChange={handleFormChange}
                  className={`reservation-input${formErrors.menu ? " error" : ""}`}
                  style={{ appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238B6914' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center" }}
                >
                  <option value="">選択してください</option>
                  <option value="カット">カット</option>
                  <option value="カラー">カラー</option>
                  <option value="パーマ">パーマ</option>
                  <option value="縮毛矯正">縮毛矯正</option>
                  <option value="ヘッドスパ">ヘッドスパ</option>
                </select>
                {formErrors.menu && <p className="reservation-error">{formErrors.menu}</p>}
              </div>

              {/* Datetime */}
              <div>
                <label className="reservation-label" htmlFor="res-datetime">
                  ご希望日時 <span className="text-[#b43c3c]">*</span>
                </label>
                <input
                  id="res-datetime"
                  name="datetime"
                  type="datetime-local"
                  value={formData.datetime}
                  onChange={handleFormChange}
                  className={`reservation-input${formErrors.datetime ? " error" : ""}`}
                />
                {formErrors.datetime && <p className="reservation-error">{formErrors.datetime}</p>}
                <p className="text-xs text-[#3D2E0A]/40 mt-2 tracking-wider">営業時間: 10:00〜18:00（火曜・第3月曜定休）</p>
              </div>

              {/* Message */}
              <div>
                <label className="reservation-label" htmlFor="res-message">
                  メッセージ（任意）
                </label>
                <textarea
                  id="res-message"
                  name="message"
                  rows={4}
                  placeholder="気になることやご要望があればご自由にどうぞ"
                  value={formData.message}
                  onChange={handleFormChange}
                  className="reservation-input resize-none"
                  style={{ lineHeight: "1.75" }}
                />
              </div>

              {/* Divider ornament */}
              <div className="flex items-center gap-3 py-2">
                <div className="flex-1 h-px bg-[#8B6914]/15" />
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(139,105,20,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" />
                  <line x1="20" y1="4" x2="8.12" y2="15.88" />
                  <line x1="14.47" y1="14.48" x2="20" y2="20" />
                  <line x1="8.12" y1="8.12" x2="12" y2="12" />
                </svg>
                <div className="flex-1 h-px bg-[#8B6914]/15" />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-[#8B6914] hover:bg-[#A07A1A] text-[#F5F0E8] py-4 px-8 rounded-full text-sm tracking-widest transition-colors font-light shadow-sm"
              >
                予約リクエストを送る
              </button>

              <p className="text-xs text-[#3D2E0A]/35 text-center tracking-wider">
                ※ こちらはデモサイトです。実際の予約は承れません。
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ===== Section Divider: Petals before Access ===== */}
      <div className="relative h-12 overflow-hidden" aria-hidden="true">
        <div className="petal-fall-3 absolute left-[20%] top-0 opacity-40" style={{ animationDelay: "0.3s" }}>
          <svg width="13" height="17" viewBox="0 0 14 18" fill="none">
            <ellipse cx="7" cy="9" rx="5" ry="8" fill="#C4A265" transform="rotate(10 7 9)" />
          </svg>
        </div>
        <div className="petal-fall-1 absolute left-[45%] top-0 opacity-45" style={{ animationDelay: "1.5s" }}>
          <svg width="11" height="15" viewBox="0 0 14 18" fill="none">
            <ellipse cx="7" cy="9" rx="5" ry="8" fill="#E8B4B8" transform="rotate(-15 7 9)" />
          </svg>
        </div>
        <div className="petal-fall-5 absolute left-[72%] top-0 opacity-40" style={{ animationDelay: "0.7s" }}>
          <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
            <ellipse cx="7" cy="9" rx="5" ry="8" fill="#A8C5A0" transform="rotate(20 7 9)" />
          </svg>
        </div>
      </div>

      {/* ===== Access Section ===== */}
      <section id="access" className="py-[60px] px-6" ref={accessSection.ref}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-serif-jp text-xs tracking-[0.3em] text-[#8B6914] mb-4 uppercase">Access</p>
            <SalonDivider inView={accessSection.visible} />
            <h2 className="font-serif-jp text-2xl md:text-3xl tracking-wider mt-4">アクセス・営業時間</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Info */}
            <div className="space-y-8">
              {/* Address */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B6914" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs tracking-wider text-[#8B6914] mb-2">住所</p>
                  <p className="text-sm leading-relaxed">
                    鹿児島県奄美市名瀬
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B6914" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs tracking-wider text-[#8B6914] mb-2">営業時間</p>
                  <p className="text-sm leading-relaxed">
                    10:00 - 19:00（最終受付 18:00）
                  </p>
                  <p className="text-xs text-[#3D2E0A]/50 mt-1">
                    ※ 火曜日・第3月曜日 定休
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B6914" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs tracking-wider text-[#8B6914] mb-2">電話番号</p>
                  <p className="text-sm">
                    <a href="tel:0997-XX-XXXX" className="hover:text-[#8B6914] transition-colors">
                      0997-XX-XXXX
                    </a>
                  </p>
                </div>
              </div>

              {/* Parking */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B6914" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13" rx="2" ry="2" />
                    <path d="M16 8h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs tracking-wider text-[#8B6914] mb-2">駐車場</p>
                  <p className="text-sm">
                    店舗前に3台分あり（無料）
                  </p>
                </div>
              </div>
            </div>

            {/* 外観写真 */}
            <div>
              <div className="aspect-square md:aspect-[4/5] rounded-xl overflow-hidden relative">
                <Image
                  src="/images/demo/salon/exterior.jpg"
                  alt="サロンの外観"
                  className="w-full h-full object-cover"
                  width={600}
                  height={400}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#3D2E0A]/60 to-transparent p-4">
                  <p className="text-xs text-[#F5F0E8]/80 tracking-wider">
                    名瀬郵便局から徒歩3分
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Google Map */}
          <div className="mt-12 rounded-xl overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3393.8!2d129.4946!3d28.3785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z5aWE576O5biC5ZCN54CoI!5e0!3m2!1sja!2sjp!4v1"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="サロンの場所"
            />
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="py-12 px-6 bg-[#3D2E0A] text-[#F5F0E8]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-serif-jp text-2xl tracking-[0.3em] mb-2">kukuru</p>
          <p className="text-xs tracking-wider opacity-50 mb-6">Hair Salon</p>
          <div className="w-8 h-px bg-[#F5F0E8]/20 mx-auto mb-6" />
          <p className="text-xs opacity-40 leading-loose">
            鹿児島県奄美市名瀬
            <br />
            TEL: 0997-XX-XXXX
          </p>
          <p className="text-xs opacity-20 mt-8">
            &copy; 2026 Hair Salon kukuru. All rights reserved.
          </p>
        </div>

        {/* Demo badge */}
        <div className="text-center mt-8 pt-6 border-t border-current/10">
          <p className="text-xs opacity-30">
            デモサイト — Designed by{" "}
            <a href="/web#gallery" className="hover:opacity-60 transition-opacity">ALPACA</a>
          </p>
        </div>
      </footer>

      {/* ===== Lightbox ===== */}
      {lightboxIndex !== null && (
        <div
          className={`lightbox-overlay${lightboxClosing ? " closing" : ""} fixed inset-0 z-[100] flex items-center justify-center`}
          style={{ backgroundColor: "rgba(20, 14, 4, 0.88)", backdropFilter: "blur(6px)" }}
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="ギャラリー拡大表示"
        >
          {/* Image container — stop propagation so clicking image doesn't close */}
          <div
            className={`lightbox-img${lightboxClosing ? " closing" : ""} relative max-w-[90vw] max-h-[85vh] flex flex-col items-center`}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryItems[lightboxIndex].src}
              alt={galleryItems[lightboxIndex].label}
              className="max-w-full max-h-[75vh] rounded-xl object-contain shadow-2xl"
              style={{ border: "1px solid rgba(196,162,101,0.25)" }}
              width={1200}
              height={800}
            />
            {/* Label */}
            <p className="mt-4 text-sm tracking-widest text-[#F5F0E8]/70 font-light">
              {galleryItems[lightboxIndex].label}
            </p>
            {/* Counter */}
            <p className="mt-1 text-xs text-[#F5F0E8]/35 tracking-widest">
              {lightboxIndex + 1} / {galleryItems.length}
            </p>
          </div>

          {/* Close button */}
          <button
            type="button"
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#F5F0E8]/10 hover:bg-[#F5F0E8]/20 flex items-center justify-center transition-colors"
            onClick={closeLightbox}
            aria-label="閉じる"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F5F0E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Prev arrow */}
          <button
            type="button"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#F5F0E8]/10 hover:bg-[#F5F0E8]/20 flex items-center justify-center transition-colors"
            onClick={(e) => { e.stopPropagation(); lightboxPrev(); }}
            aria-label="前の写真"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F5F0E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Next arrow */}
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#F5F0E8]/10 hover:bg-[#F5F0E8]/20 flex items-center justify-center transition-colors"
            onClick={(e) => { e.stopPropagation(); lightboxNext(); }}
            aria-label="次の写真"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F5F0E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      )}

    </div>
  );
}
