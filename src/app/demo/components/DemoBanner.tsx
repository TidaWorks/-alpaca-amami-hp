"use client";

import React from "react";

type Tone = "dark" | "light" | "brand";

interface DemoBannerProps {
  tone?: Tone;
  className?: string;
  style?: React.CSSProperties;
}

const palette: Record<Tone, { bg: string; text: string; subText: string; ctaBg: string; ctaText: string; border: string }> = {
  brand: {
    bg: "linear-gradient(135deg, #0d7f6c 0%, #15a488 100%)",
    text: "#FFFFFF",
    subText: "rgba(255,255,255,0.8)",
    ctaBg: "#FFFFFF",
    ctaText: "#0d7f6c",
    border: "rgba(255,255,255,0.2)",
  },
  dark: {
    bg: "linear-gradient(135deg, #1A2332 0%, #2A3547 100%)",
    text: "#F5F0E8",
    subText: "rgba(245,240,232,0.65)",
    ctaBg: "#15a488",
    ctaText: "#FFFFFF",
    border: "rgba(255,255,255,0.08)",
  },
  light: {
    bg: "#FAFAF5",
    text: "#1A2332",
    subText: "rgba(26,35,50,0.6)",
    ctaBg: "#0d7f6c",
    ctaText: "#FFFFFF",
    border: "rgba(26,35,50,0.08)",
  },
};

export function DemoBanner({ tone = "brand", className, style }: DemoBannerProps) {
  const p = palette[tone];

  return (
    <section
      aria-label="ALPACA制作のデモサイトです"
      className={className}
      style={{
        width: "100%",
        padding: "40px 20px",
        background: p.bg,
        borderTop: `1px solid ${p.border}`,
        ...style,
      }}
    >
      <div
        style={{
          maxWidth: 560,
          margin: "0 auto",
          textAlign: "center",
          fontFamily: "var(--font-noto-sans-jp), system-ui, sans-serif",
        }}
      >
        <p
          style={{
            fontSize: 11,
            letterSpacing: "0.25em",
            color: p.subText,
            margin: 0,
            marginBottom: 12,
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          Demo Site by ALPACA
        </p>
        <h3
          style={{
            fontSize: 17,
            lineHeight: 1.6,
            color: p.text,
            margin: 0,
            marginBottom: 6,
            fontWeight: 600,
          }}
        >
          このページはALPACAが制作したデモサイトです
        </h3>
        <p
          style={{
            fontSize: 13,
            color: p.subText,
            margin: 0,
            marginBottom: 22,
            lineHeight: 1.7,
          }}
        >
          奄美大島のWeb制作・業務システム開発なら、お気軽にご相談ください。
        </p>
        <a
          href="/web"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: p.ctaBg,
            color: p.ctaText,
            padding: "12px 28px",
            borderRadius: 999,
            textDecoration: "none",
            fontSize: 14,
            fontWeight: 600,
            boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 10px 28px rgba(0,0,0,0.18)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.12)";
          }}
        >
          ALPACAのWeb制作を見る
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
