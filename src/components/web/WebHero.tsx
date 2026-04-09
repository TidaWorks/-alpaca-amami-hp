"use client";

import { useEffect, useRef, useState } from "react";

/* ═══════════════════════════════════════════════════════════
   WebHero — "Editorial Curtain"

   Concept: A high-end Japanese design magazine spread.
   Asymmetric layout. Cinematic horizontal mask reveal.
   Film grain texture. Confident, left-aligned typography.
   One unforgettable moment: the curtain wipe.
   ═══════════════════════════════════════════════════════════ */

const PHASE = { HIDDEN: 0, WIPE: 1, CONTENT: 2, FULL: 3 } as const;

export default function WebHero() {
  const [phase, setPhase] = useState<number>(PHASE.HIDDEN);
  const sectionRef = useRef<HTMLDivElement>(null);
  const grainRef = useRef<HTMLCanvasElement>(null);

  // Orchestrated reveal sequence
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(PHASE.WIPE), 200);    // Start wipe
    const t2 = setTimeout(() => setPhase(PHASE.CONTENT), 1000); // Content begins
    const t3 = setTimeout(() => setPhase(PHASE.FULL), 2200);    // Everything settled
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  // Film grain — canvas-based for authentic analog texture
  useEffect(() => {
    const canvas = grainRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let frame = 0;
    let paused = false;

    const draw = () => {
      if (paused) return;
      frame++;
      if (frame % 3 !== 0) { raf = requestAnimationFrame(draw); return; } // throttle to ~20fps

      canvas.width = 256;
      canvas.height = 256;
      const imageData = ctx.createImageData(256, 256);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = v; data[i + 1] = v; data[i + 2] = v;
        data[i + 3] = 18; // very subtle
      }
      ctx.putImageData(imageData, 0, 0);
      raf = requestAnimationFrame(draw);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        paused = true;
        cancelAnimationFrame(raf);
      } else {
        paused = false;
        raf = requestAnimationFrame(draw);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Shippori+Mincho+B1:wght@600;800&display=swap" rel="stylesheet" />
      <style>{`
        .hero-editorial {
          --accent: #E8A435;
          --dark: #050505;
          --warm: #F5EDE0;
          font-family: 'Shippori Mincho B1', serif;
        }

        /* ── Curtain wipe mask ── */
        @keyframes curtainWipe {
          0%   { clip-path: inset(0 100% 0 0); }
          100% { clip-path: inset(0 0 0 0); }
        }
        .curtain-reveal {
          clip-path: inset(0 100% 0 0);
          animation: curtainWipe 1.2s cubic-bezier(0.77, 0, 0.175, 1) forwards;
        }

        /* ── Vertical line draw ── */
        @keyframes lineGrow {
          from { transform: scaleY(0); }
          to   { transform: scaleY(1); }
        }

        /* ── Fade slide ── */
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        /* ── Accent bar expand ── */
        @keyframes barExpand {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }

        /* ── Scroll indicator pulse ── */
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; transform: scaleY(0.6); }
          50%      { opacity: 1; transform: scaleY(1); }
        }

        /* ── Slow drift for decorative elements ── */
        @keyframes slowDrift {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33%      { transform: translate(8px, -12px) rotate(0.5deg); }
          66%      { transform: translate(-6px, -4px) rotate(-0.3deg); }
        }

        /* ── Grain canvas ── */
        .grain-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.35;
          mix-blend-mode: overlay;
        }
        .grain-overlay canvas {
          width: 100%;
          height: 100%;
          object-fit: cover;
          image-rendering: pixelated;
        }
      `}</style>

      <section
        ref={sectionRef}
        className="hero-editorial relative min-h-screen overflow-hidden flex items-center"
        style={{ backgroundColor: "var(--dark)" }}
      >
        {/* ── Film grain ── */}
        <div className="grain-overlay" aria-hidden="true">
          <canvas ref={grainRef} />
        </div>

        {/* ── Background: warm gradient blob (top-right) ── */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "-20%", right: "-10%",
            width: "70vw", height: "70vw",
            maxWidth: "900px", maxHeight: "900px",
            background: "radial-gradient(ellipse at 60% 40%, rgba(232,164,53,0.07) 0%, rgba(232,164,53,0.02) 40%, transparent 70%)",
            animation: "slowDrift 20s ease-in-out infinite",
          }}
          aria-hidden="true"
        />

        {/* ── Background: cool gradient blob (bottom-left) ── */}
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "-15%", left: "-15%",
            width: "60vw", height: "60vw",
            maxWidth: "800px", maxHeight: "800px",
            background: "radial-gradient(ellipse at 40% 60%, rgba(100,140,180,0.04) 0%, transparent 60%)",
            animation: "slowDrift 25s ease-in-out 3s infinite reverse",
          }}
          aria-hidden="true"
        />

        {/* ── Decorative vertical line (left accent) ── */}
        <div
          className="absolute left-[7%] md:left-[9%] top-[15%] w-px bg-gradient-to-b from-transparent via-[var(--accent)] to-transparent origin-top"
          style={{
            height: "55%",
            opacity: phase >= PHASE.WIPE ? 0.25 : 0,
            animation: phase >= PHASE.WIPE ? "lineGrow 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both" : "none",
          }}
          aria-hidden="true"
        />

        {/* ── Decorative horizontal line (bottom accent) ── */}
        <div
          className="absolute bottom-[22%] left-[7%] md:left-[9%] h-px bg-gradient-to-r from-[var(--accent)] to-transparent origin-left"
          style={{
            width: "35%",
            opacity: phase >= PHASE.CONTENT ? 0.2 : 0,
            animation: phase >= PHASE.CONTENT ? "barExpand 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both" : "none",
          }}
          aria-hidden="true"
        />

        {/* ── Large decorative kanji watermark ── */}
        <div
          className="absolute pointer-events-none select-none"
          style={{
            right: "5%", top: "50%",
            transform: "translateY(-50%)",
            fontSize: "clamp(200px, 35vw, 500px)",
            fontFamily: "'Shippori Mincho B1', serif",
            fontWeight: 800,
            color: "transparent",
            WebkitTextStroke: "1px rgba(232,164,53,0.06)",
            lineHeight: 1,
            opacity: phase >= PHASE.WIPE ? 1 : 0,
            transition: "opacity 2s ease 0.5s",
          }}
          aria-hidden="true"
        >
          届
        </div>

        {/* ── Main content: left-aligned, asymmetric ── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 lg:px-24">

          {/* Label */}
          <div
            className="mb-6 md:mb-10"
            style={{
              opacity: phase >= PHASE.CONTENT ? 1 : 0,
              animation: phase >= PHASE.CONTENT ? "fadeSlideLeft 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0s both" : "none",
            }}
          >
            <span
              className="inline-block text-[10px] md:text-xs tracking-[0.35em] uppercase"
              style={{
                color: "var(--accent)",
                fontFamily: "var(--font-outfit), 'Outfit', sans-serif",
                fontWeight: 600,
              }}
            >
              TIDA WORKS &mdash; Amami Oshima
            </span>
          </div>

          {/* ── Headline with curtain wipe ── */}
          <div className="mb-8 md:mb-12">
            <h1
              className={phase >= PHASE.WIPE ? "curtain-reveal" : ""}
              style={{
                fontSize: "clamp(2.2rem, 7.5vw, 6rem)",
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                clipPath: phase < PHASE.WIPE ? "inset(0 100% 0 0)" : undefined,
              }}
            >
              <span style={{ color: "var(--warm)" }}>あなたのお店を、</span>
              <br />
              <span
                style={{
                  color: "var(--accent)",
                  textShadow: "0 0 120px rgba(232,164,53,0.2)",
                  animationDelay: phase >= PHASE.WIPE ? "0.25s" : undefined,
                }}
              >
                ネットに届ける。
              </span>
            </h1>
          </div>

          {/* ── Accent bar ── */}
          <div
            className="h-[3px] mb-8 md:mb-10 origin-left"
            style={{
              width: "clamp(60px, 8vw, 120px)",
              backgroundColor: "var(--accent)",
              opacity: phase >= PHASE.CONTENT ? 1 : 0,
              animation: phase >= PHASE.CONTENT ? "barExpand 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both" : "none",
            }}
          />

          {/* ── Subtitle ── */}
          <p
            className="max-w-md mb-10 md:mb-14 leading-relaxed"
            style={{
              fontSize: "clamp(0.9rem, 1.8vw, 1.15rem)",
              color: "rgba(245, 237, 224, 0.55)",
              fontFamily: "'Shippori Mincho B1', serif",
              fontWeight: 600,
              opacity: phase >= PHASE.CONTENT ? 1 : 0,
              animation: phase >= PHASE.CONTENT ? "fadeSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both" : "none",
            }}
          >
            奄美大島の小さなお店から、
            <br />
            ちょうどいいホームページを。
          </p>

          {/* ── CTAs ── */}
          <div
            className="flex flex-col sm:flex-row gap-4"
            style={{
              opacity: phase >= PHASE.CONTENT ? 1 : 0,
              animation: phase >= PHASE.CONTENT ? "fadeSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both" : "none",
            }}
          >
            <a
              href="#gallery"
              className="group relative inline-flex items-center justify-center overflow-hidden"
              style={{
                padding: "14px 36px",
                backgroundColor: "var(--accent)",
                color: "var(--dark)",
                fontFamily: "var(--font-outfit), 'Outfit', sans-serif",
                fontWeight: 700,
                fontSize: "0.85rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                border: "none",
                cursor: "pointer",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 40px rgba(232,164,53,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              実績を見る
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center"
              style={{
                padding: "14px 36px",
                color: "var(--warm)",
                fontFamily: "var(--font-outfit), 'Outfit', sans-serif",
                fontWeight: 600,
                fontSize: "0.85rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                border: "1px solid rgba(245,237,224,0.15)",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(245,237,224,0.06)";
                e.currentTarget.style.borderColor = "rgba(245,237,224,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.borderColor = "rgba(245,237,224,0.15)";
              }}
            >
              無料相談する
            </a>
          </div>
        </div>

        {/* ── Right-side vertical text (editorial accent) ── */}
        <div
          className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3"
          style={{
            opacity: phase >= PHASE.FULL ? 0.3 : 0,
            transition: "opacity 1.2s ease 0.5s",
            writingMode: "vertical-rl",
            fontFamily: "var(--font-outfit), 'Outfit', sans-serif",
            fontSize: "10px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--warm)",
          }}
          aria-hidden="true"
        >
          Web Design & Development
        </div>

        {/* ── Scroll indicator ── */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{
            opacity: phase >= PHASE.FULL ? 1 : 0,
            transition: "opacity 0.8s ease",
          }}
        >
          <span
            style={{
              fontSize: "9px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(245,237,224,0.3)",
              fontFamily: "var(--font-outfit), 'Outfit', sans-serif",
            }}
          >
            Scroll
          </span>
          <div
            className="w-px h-8 origin-top"
            style={{
              background: "linear-gradient(to bottom, var(--accent), transparent)",
              animation: "scrollPulse 2.4s ease-in-out infinite",
            }}
          />
        </div>

        {/* ── Bottom wave transition to next section ── */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] pointer-events-none z-20">
          <svg
            className="block w-full h-[40px] md:h-[60px]"
            viewBox="0 0 1440 60"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z"
              fill="#FAFAF8"
            />
          </svg>
        </div>
      </section>
    </>
  );
}
