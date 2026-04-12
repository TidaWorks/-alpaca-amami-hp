"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { works } from "@/data/works";

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
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const duplicated = [...works, ...works, ...works];

  useEffect(() => {
    const row1 = row1Ref.current;
    const row2 = row2Ref.current;
    if (!row1 || !row2) return;

    const pauseRow1 = () => {
      row1.style.animationPlayState = "paused";
    };
    const resumeRow1 = () => {
      row1.style.animationPlayState = "running";
    };
    const pauseRow2 = () => {
      row2.style.animationPlayState = "paused";
    };
    const resumeRow2 = () => {
      row2.style.animationPlayState = "running";
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

  const [transition, setTransition] = useState<{ title: string; accent: string; cx: number; cy: number } | null>(null);

  const handleCardClick = (
    e: React.MouseEvent<HTMLDivElement>,
    slug: string
  ) => {
    if (transition) return;
    const work = works.find((w) => w.slug === slug);
    const destination = work?.demoUrl || work?.url || `/works/${slug}`;
    const accent = work?.thumbnail.accent || "#F5A623";
    const title = work?.title || "";

    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    setTransition({ title, accent, cx, cy });

    setTimeout(() => {
      router.push(destination);
    }, 1000);
  };

  return (
    <>
    {/* Transition overlay — ripple + aura + title */}
    {transition && (
      <>
        <style>{`
          @keyframes tidaRippleExpand {
            from { width: 0; height: 0; opacity: 0.5; border-width: 2px; }
            to   { width: 300vmax; height: 300vmax; opacity: 0; border-width: 1px; }
          }
          @keyframes tidaAuraExpand {
            from { width: 0; height: 0; opacity: 0; }
            to   { width: 200vmax; height: 200vmax; opacity: 1; }
          }
          @keyframes tidaOverlayIn {
            from { backdrop-filter: blur(0px); background: rgba(5,5,5,0); }
            to   { backdrop-filter: blur(20px); background: rgba(5,5,5,0.92); }
          }
          @keyframes tidaTitleIn {
            from { opacity: 0; transform: translate(-50%,-50%) scale(0.9); }
            to   { opacity: 1; transform: translate(-50%,-50%) scale(1); }
          }
          @keyframes tidaTitleOut {
            from { opacity: 1; transform: translate(-50%,-50%) scale(1); }
            to   { opacity: 0; transform: translate(-50%,-50%) scale(1.08); }
          }
        `}</style>

        {/* Ripple ring from click point */}
        <div className="fixed z-[9998] pointer-events-none rounded-full border border-white/25"
          style={{
            left: transition.cx, top: transition.cy,
            transform: "translate(-50%,-50%)",
            animation: "tidaRippleExpand 1s cubic-bezier(0.16,1,0.3,1) forwards",
          }}
        />

        {/* Accent color aura */}
        <div className="fixed z-[9997] pointer-events-none rounded-full"
          style={{
            left: transition.cx, top: transition.cy,
            transform: "translate(-50%,-50%)",
            background: `radial-gradient(circle, ${transition.accent}40 0%, ${transition.accent}15 40%, transparent 70%)`,
            animation: "tidaAuraExpand 1.2s cubic-bezier(0.16,1,0.3,1) forwards",
          }}
        />

        {/* Blur + darken overlay */}
        <div className="fixed inset-0 z-[9999] pointer-events-none"
          style={{ animation: "tidaOverlayIn 1s cubic-bezier(0.4,0,0.2,1) forwards" }}
        />

        {/* Site title flash */}
        <div className="fixed z-[10000] pointer-events-none text-white text-3xl md:text-5xl font-bold tracking-wider whitespace-nowrap"
          style={{
            left: "50%", top: "50%",
            fontFamily: "'Shippori Mincho B1', 'Noto Serif JP', serif",
            textShadow: `0 0 60px ${transition.accent}60, 0 0 120px ${transition.accent}30`,
            animation: "tidaTitleIn 0.5s cubic-bezier(0.16,1,0.3,1) 0.2s forwards, tidaTitleOut 0.3s ease 0.8s forwards",
            opacity: 0,
          }}
        >
          {transition.title}
        </div>

      </>
    )}

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
    </>
  );
}
