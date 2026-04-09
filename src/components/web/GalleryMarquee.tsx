"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { works } from "@/data/works";

// Helper: remove all tracked overlay elements and reset transition flag
function cleanupOverlays(
  overlayRefs: React.MutableRefObject<HTMLElement[]>,
  isTransitioning: React.MutableRefObject<boolean>
) {
  overlayRefs.current.forEach((el) => el.parentNode?.removeChild(el));
  overlayRefs.current = [];
  isTransitioning.current = false;
}

// Unsplash images keyed by slug — single source of truth for gallery visuals
const slugImageMap: Record<string, string> = {
  "salon-kukuru":
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=840&q=80",
  "restaurant-adan":
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=840&q=80",
  "construction-hae":
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=840&q=80",
  "camp-amami":
    "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=840&q=80",
  "diving-blue":
    "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=840&q=80",
  "tida-works-hp":
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=840&q=80",
  "nursery-hidamari":
    "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?auto=format&fit=crop&w=840&q=80",
  "osteopathic-shimatsumugi":
    "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=840&q=80",
  "guesthouse-isokaze":
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=840&q=80",
  "farm-taiyo":
    "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=840&q=80",
  "patisserie-soleil":
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=840&q=80",
};

function getWorkImage(slug: string): string {
  return slugImageMap[slug] ?? "";
}

function BrowserFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2 bg-[#1e1e1e] border-b border-white/10">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        <div className="ml-2 flex-1 max-w-[140px] h-4 rounded-sm bg-white/10" />
      </div>
      {children}
    </div>
  );
}

function GalleryCard({
  work,
  onClick,
}: {
  work: (typeof works)[0];
  onClick: (e: React.MouseEvent<HTMLDivElement>, slug: string) => void;
}) {
  const image = getWorkImage(work.slug);
  const accent = work.thumbnail.accent;

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={(e) => onClick(e, work.slug)}
      onKeyDown={(e) => {
        if (e.key === "Enter") onClick(e as unknown as React.MouseEvent<HTMLDivElement>, work.slug);
      }}
      className="flex-shrink-0 w-[260px] sm:w-[300px] md:w-[420px] group cursor-pointer"
      style={
        {
          "--accent": accent,
        } as React.CSSProperties
      }
    >
      <BrowserFrame>
        <div className="relative overflow-hidden aspect-[3/2]">
          {/* Background image */}
          <Image
            src={image}
            alt={work.title}
            width={600}
            height={400}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />

          {/* Persistent gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />

          {/* Accent glow on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
            style={{
              boxShadow: `inset 0 0 60px 20px ${accent}`,
            }}
          />

          {/* Arrow icon */}
          <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/0 group-hover:bg-white flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000"
              strokeWidth="2.5"
            >
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </div>

          {/* Bottom text */}
          <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
            <h3 className="text-white font-bold text-lg md:text-xl leading-tight tracking-tight">
              {work.title}
            </h3>
            <p className="text-white/60 text-xs mt-1 line-clamp-1 group-hover:text-white/80 transition-colors duration-300">
              {work.description}
            </p>

            {/* Tags on hover */}
            <div className="flex gap-1.5 mt-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
              {work.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] text-white/70 bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Category label — animates in from below on hover */}
          <div className="absolute top-3 left-3 z-10 overflow-hidden">
            <span
              className="block text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full backdrop-blur-md translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"
              style={{
                backgroundColor: `${accent}CC`,
                color: "#fff",
              }}
            >
              {work.category}
            </span>
          </div>
        </div>
      </BrowserFrame>
    </div>
  );
}

function PulsingBadge({ count }: { count: number }) {
  return (
    <span className="relative inline-flex items-center justify-center">
      <span className="absolute inline-flex h-full w-full rounded-full bg-[#F5A623] opacity-40 animate-ping" />
      <span className="relative inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#F5A623] text-black text-xs font-bold">
        {count}
      </span>
    </span>
  );
}

function GalleryCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="max-w-7xl mx-auto px-6 mt-20 md:mt-28 text-center"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <h2 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-5">
        あなたの業種でも、作れます。
      </h2>
      <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto mb-10 leading-relaxed">
        美容室、飲食店、建設業、ダイビング、保育園、整骨院、宿泊施設、農園、パティスリー...<br className="hidden sm:block" />
        どんな業種にも対応します。
      </p>
      <a
        href="#contact"
        className="inline-block px-10 py-4 rounded-full text-black font-bold text-base md:text-lg tracking-wide"
        style={{
          backgroundColor: "#F5A623",
          boxShadow: visible
            ? "0 0 0 0 rgba(245,166,35,0)"
            : undefined,
          transition: "box-shadow 0.3s ease, transform 0.2s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.boxShadow =
            "0 0 24px 6px rgba(245,166,35,0.55), 0 0 60px 16px rgba(245,166,35,0.2)";
          (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.04)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.boxShadow =
            "0 0 0 0 rgba(245,166,35,0)";
          (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
        }}
      >
        無料で相談する
      </a>
    </div>
  );
}

export default function GalleryMarquee() {
  const router = useRouter();
  const pathname = usePathname();
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const isTransitioning = useRef(false);
  const navigatingTo = useRef<string | null>(null);
  // Track all DOM elements created during transition so they can be cleaned up
  const overlayRefs = useRef<HTMLElement[]>([]);

  const duplicated = [...works, ...works, ...works];

  // Cleanup all overlay elements on component unmount
  useEffect(() => {
    return () => {
      cleanupOverlays(overlayRefs, isTransitioning);
    };
  }, []);

  // Detect pathname change = navigation completed → cleanup overlays
  useEffect(() => {
    if (navigatingTo.current && pathname === navigatingTo.current) {
      // Navigation completed — clean up overlays
      cleanupOverlays(overlayRefs, isTransitioning);
      navigatingTo.current = null;
    }
  }, [pathname]);

  useEffect(() => {
    const row1 = row1Ref.current;
    const row2 = row2Ref.current;
    if (!row1 || !row2) return;

    const pauseRow1 = () => {
      row1.style.animationPlayState = "paused";
    };
    const resumeRow1 = () => {
      if (!isTransitioning.current) row1.style.animationPlayState = "running";
    };
    const pauseRow2 = () => {
      row2.style.animationPlayState = "paused";
    };
    const resumeRow2 = () => {
      if (!isTransitioning.current) row2.style.animationPlayState = "running";
    };

    row1.addEventListener("mouseenter", pauseRow1);
    row1.addEventListener("mouseleave", resumeRow1);
    row2.addEventListener("mouseenter", pauseRow2);
    row2.addEventListener("mouseleave", resumeRow2);

    return () => {
      row1.removeEventListener("mouseenter", pauseRow1);
      row1.removeEventListener("mouseleave", resumeRow1);
      row2.removeEventListener("mouseenter", pauseRow2);
      row2.removeEventListener("mouseleave", resumeRow2);
    };
  }, []);

  const handleCardClick = (
    e: React.MouseEvent<HTMLDivElement>,
    slug: string
  ) => {
    const work = works.find((w) => w.slug === slug);
    const destination = work?.demoUrl || work?.url || `/works/${slug}`;

    if (isTransitioning.current) return;
    isTransitioning.current = true;

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    // ── Step 1: Ripple ring from click point ──
    const ripple = document.createElement("div");
    ripple.style.cssText = `
      position: fixed;
      left: ${cx}px; top: ${cy}px;
      width: 0; height: 0;
      border-radius: 50%;
      border: 2px solid rgba(255,255,255,0.25);
      transform: translate(-50%, -50%);
      z-index: 9998;
      pointer-events: none;
      transition: width 1s cubic-bezier(0.16, 1, 0.3, 1),
                  height 1s cubic-bezier(0.16, 1, 0.3, 1),
                  opacity 1s ease,
                  border-width 1s ease;
    `;
    document.body.appendChild(ripple);
    overlayRefs.current.push(ripple);

    // Second ripple (delayed, wider)
    const ripple2 = ripple.cloneNode() as HTMLDivElement;
    ripple2.style.border = "1px solid rgba(255,255,255,0.12)";
    ripple2.style.transitionDelay = "0.12s";
    document.body.appendChild(ripple2);
    overlayRefs.current.push(ripple2);

    const accent = work?.thumbnail.accent || "#F5A623";
    const title = work?.title || "";

    // ── Step 2: Accent color aura (にじみ) ──
    const aura = document.createElement("div");
    aura.style.cssText = `
      position: fixed;
      left: ${cx}px; top: ${cy}px;
      width: 0; height: 0;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      z-index: 9996;
      pointer-events: none;
      background: radial-gradient(circle, ${accent}40 0%, ${accent}15 40%, transparent 70%);
      opacity: 0;
      transition: width 1.4s cubic-bezier(0.16, 1, 0.3, 1),
                  height 1.4s cubic-bezier(0.16, 1, 0.3, 1),
                  opacity 0.8s ease;
    `;
    document.body.appendChild(aura);
    overlayRefs.current.push(aura);

    // ── Step 3: Full-page overlay that blurs + darkens ──
    const overlay = document.createElement("div");
    overlay.style.cssText = `
      position: fixed; inset: 0; z-index: 9997;
      backdrop-filter: blur(0px);
      -webkit-backdrop-filter: blur(0px);
      background: radial-gradient(circle at ${cx}px ${cy}px, rgba(5,5,5,0) 0%, rgba(5,5,5,0) 100%);
      transition: backdrop-filter 1.2s cubic-bezier(0.4, 0, 0.2, 1),
                  -webkit-backdrop-filter 1.2s cubic-bezier(0.4, 0, 0.2, 1),
                  background 1.2s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
    `;
    document.body.appendChild(overlay);
    overlayRefs.current.push(overlay);

    // Global click on overlay cancels transition
    const handleOverlayClick = () => {
      cleanupOverlays(overlayRefs, isTransitioning);
      card.style.transform = "";
      card.style.zIndex = "";
      card.style.filter = "";
      card.style.opacity = "";
      card.style.transition = "";
    };
    overlay.addEventListener("click", handleOverlayClick, { once: true });

    // ── Step 4: Site name title flash ──
    const titleEl = document.createElement("div");
    titleEl.textContent = title;
    titleEl.style.cssText = `
      position: fixed;
      left: 50%; top: 50%;
      transform: translate(-50%, -50%) scale(0.9);
      z-index: 10000;
      pointer-events: none;
      font-family: 'Shippori Mincho B1', 'Noto Serif JP', serif;
      font-size: clamp(2rem, 6vw, 4.5rem);
      font-weight: 800;
      letter-spacing: 0.08em;
      color: white;
      opacity: 0;
      white-space: nowrap;
      text-shadow: 0 0 60px ${accent}60, 0 0 120px ${accent}30;
      transition: opacity 0.5s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    `;
    document.body.appendChild(titleEl);
    overlayRefs.current.push(titleEl);

    // ── Step 5: Card itself scales up and becomes the portal ──
    card.style.transition = "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), filter 1.2s ease, opacity 1.2s ease";
    card.style.transform = "scale(2.5)";
    card.style.zIndex = "9999";
    card.style.filter = "brightness(1.1) saturate(1.2)";

    // ── Execute animations ──
    requestAnimationFrame(() => {
      // Ripples expand
      const maxDim = Math.max(window.innerWidth, window.innerHeight) * 2.5;
      ripple.style.width = `${maxDim}px`;
      ripple.style.height = `${maxDim}px`;
      ripple.style.opacity = "0";
      ripple.style.borderWidth = "1px";

      ripple2.style.width = `${maxDim * 1.2}px`;
      ripple2.style.height = `${maxDim * 1.2}px`;
      ripple2.style.opacity = "0";

      // Accent aura expands (color bleed)
      const auraDim = maxDim * 0.8;
      aura.style.width = `${auraDim}px`;
      aura.style.height = `${auraDim}px`;
      aura.style.opacity = "1";

      // Overlay blurs and darkens
      overlay.style.backdropFilter = "blur(20px)";
      (overlay.style as unknown as Record<string, string>).webkitBackdropFilter = "blur(20px)";
      overlay.style.background = `radial-gradient(circle at ${cx}px ${cy}px, ${accent}18 0%, rgba(5,5,5,0.92) 65%)`;
    });

    // ── Title flash appears (0.4s in) ──
    setTimeout(() => {
      if (!isTransitioning.current) return;
      titleEl.style.opacity = "1";
      titleEl.style.transform = "translate(-50%, -50%) scale(1)";
    }, 400);

    // ── Title fades out (0.9s in) ──
    setTimeout(() => {
      if (!isTransitioning.current) return;
      titleEl.style.transition = "opacity 0.4s ease, transform 0.4s ease";
      titleEl.style.opacity = "0";
      titleEl.style.transform = "translate(-50%, -50%) scale(1.08)";
    }, 900);

    // ── Card fades into the blur (0.7s in) ──
    setTimeout(() => {
      if (!isTransitioning.current) return;
      card.style.opacity = "0";
      card.style.filter = "brightness(2) saturate(0) blur(8px)";
    }, 700);

    // ── Aura fades, overlay solidifies (1.1s in) ──
    setTimeout(() => {
      if (!isTransitioning.current) return;
      aura.style.transition = "opacity 0.3s ease";
      aura.style.opacity = "0";
      overlay.style.transition = "background 0.3s ease";
      overlay.style.background = "rgba(5,5,5,1)";
    }, 1100);

    // ── TIDA WORKS logo loading (1.4s in) ──
    setTimeout(() => {
      if (!isTransitioning.current) return;

      const logoWrap = document.createElement("div");
      logoWrap.style.cssText = `
        position: fixed; inset: 0; z-index: 10001;
        display: flex; flex-direction: column;
        align-items: center; justify-content: center;
        background: #050505;
        pointer-events: none;
      `;

      const logoText = document.createElement("div");
      logoText.textContent = "TIDA WORKS";
      logoText.style.cssText = `
        font-family: 'Outfit', var(--font-outfit), sans-serif;
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 0.35em;
        text-transform: uppercase;
        color: rgba(245,237,224,0.5);
        opacity: 0;
        transform: translateY(6px);
        transition: opacity 0.4s ease, transform 0.4s ease;
      `;

      const spinner = document.createElement("div");
      spinner.style.cssText = `
        width: 24px; height: 24px;
        border: 2px solid rgba(245,237,224,0.1);
        border-top-color: rgba(232,164,53,0.6);
        border-radius: 50%;
        margin-bottom: 16px;
        opacity: 0;
        transition: opacity 0.3s ease;
        animation: tidaSpin 0.8s linear infinite;
      `;

      const spinStyle = document.createElement("style");
      spinStyle.textContent = `@keyframes tidaSpin { to { transform: rotate(360deg); } }`;

      logoWrap.appendChild(spinStyle);
      logoWrap.appendChild(spinner);
      logoWrap.appendChild(logoText);
      document.body.appendChild(logoWrap);
      overlayRefs.current.push(logoWrap);

      // Fade in logo
      requestAnimationFrame(() => {
        spinner.style.opacity = "1";
        logoText.style.opacity = "1";
        logoText.style.transform = "translateY(0)";
      });

      // SPA navigate (1.8s in — logo visible for ~0.4s)
      setTimeout(() => {
        if (!isTransitioning.current) return;

        // Record where we're navigating to — cleanup happens when pathname changes
        navigatingTo.current = destination;

        // Reset card styles (it will unmount anyway)
        card.style.transform = "";
        card.style.zIndex = "";
        card.style.filter = "";
        card.style.opacity = "";
        card.style.transition = "";

        try {
          router.push(destination);
        } catch {
          // Fallback: navigate directly
          cleanupOverlays(overlayRefs, isTransitioning);
          navigatingTo.current = null;
          window.location.href = destination;
          return;
        }

        // Safety net: if pathname change isn't detected within 5s, force cleanup
        setTimeout(() => {
          if (isTransitioning.current) {
            cleanupOverlays(overlayRefs, isTransitioning);
            navigatingTo.current = null;
          }
        }, 5000);
      }, 400);
    }, 1400);
  };

  return (
    <section
      id="gallery"
      className="relative bg-[#0A0A0A] overflow-hidden"
    >
      {/* Wave divider — transitions from previous light section into this dark section */}
      <div className="relative w-full overflow-hidden leading-none -mt-1">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="block w-full h-16 md:h-20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M0,0 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,0 L0,0 Z"
            fill="#FAFAF8"
          />
        </svg>
      </div>

      <div className="pt-12 pb-16 md:pt-16 md:pb-20">
        {/* Section heading */}
        <div className="max-w-7xl mx-auto px-6 mb-14 md:mb-20">
          <p className="text-[#F5A623] text-sm font-semibold uppercase tracking-[0.2em] font-display mb-5">
            WORKS
          </p>
          <h2 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-4">
            制作サンプル、<br className="sm:hidden" />ぜんぶ見せます。
          </h2>
          <p className="text-gray-400 text-base md:text-lg mt-4">
            全てデモサイトです。クリックして中を覗いてみてください
          </p>
        </div>

        {/* Marquee Row 1 */}
        <div className="mb-5">
          <div
            ref={row1Ref}
            className="flex gap-5 animate-[marqueeLeft_45s_linear_infinite]"
            style={{ width: "max-content" }}
          >
            {duplicated.map((work, i) => (
              <GalleryCard
                key={`r1-${i}`}
                work={work}
                onClick={handleCardClick}
              />
            ))}
          </div>
        </div>

        {/* Marquee Row 2 */}
        <div>
          <div
            ref={row2Ref}
            className="flex gap-5 animate-[marqueeRight_50s_linear_infinite]"
            style={{ width: "max-content" }}
          >
            {[...duplicated].reverse().map((work, i) => (
              <GalleryCard
                key={`r2-${i}`}
                work={work}
                onClick={handleCardClick}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="max-w-7xl mx-auto px-6 mt-14 md:mt-18 flex items-center gap-3">
          <PulsingBadge count={works.length} />
          <p className="text-gray-400 text-sm md:text-base">
            全{works.length}サイトのデモを公開中
          </p>
        </div>

        {/* Strong CTA block */}
        <GalleryCTA />
      </div>

      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-32 md:w-48 bg-gradient-to-r from-[#0A0A0A] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-32 md:w-48 bg-gradient-to-l from-[#0A0A0A] to-transparent pointer-events-none z-10" />
    </section>
  );
}
