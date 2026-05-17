"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * トップ（/）専用 ロゴオープニング演出
 * - ベタミント #12C998 背景 × 白の有機シェイプ
 * - 紺 #1D2A6E / ピンク #FF6B9E のアクセント丸
 * - 中央ロゴ → ALPACAテキスト → サブテキストの順にフェードイン
 * - sessionStorage で2回目以降スキップ（/web 側と独立キー）
 * - prefers-reduced-motion 対応
 */
export default function HomeLogoIntro() {
  const [show, setShow] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const seen =
      typeof window !== "undefined" &&
      sessionStorage.getItem("alpaca_home_intro_seen");
    if (seen) return;

    setShow(true);
    sessionStorage.setItem("alpaca_home_intro_seen", "1");

    const fadeTimer = setTimeout(() => setFadeOut(true), 2400);
    const hideTimer = setTimeout(() => setShow(false), 3000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#12C998] transition-opacity duration-700 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      {/* 背景：白の有機シェイプが回転拡大 */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M250,520 C200,340 380,200 540,250 C720,300 820,460 760,620 C700,780 460,840 320,760 C200,690 280,640 250,520 Z"
          fill="#FFFFFF"
          style={{
            transformOrigin: "500px 500px",
            animation: "home-intro-blob 2.6s cubic-bezier(0.22, 1, 0.36, 1) forwards",
          }}
        />
        {/* アクセント：紺の丸 */}
        <circle
          cx="820"
          cy="180"
          r="60"
          fill="#1D2A6E"
          style={{
            opacity: 0,
            animation: "home-intro-fade-in 0.5s ease-out 1.0s forwards",
          }}
        />
        {/* アクセント：ピンクの丸 */}
        <circle
          cx="180"
          cy="820"
          r="44"
          fill="#FF6B9E"
          style={{
            opacity: 0,
            animation: "home-intro-fade-in 0.5s ease-out 1.2s forwards",
          }}
        />
        {/* アクセント：紺の小さな丸 */}
        <circle
          cx="160"
          cy="240"
          r="18"
          fill="#1D2A6E"
          style={{
            opacity: 0,
            animation: "home-intro-fade-in 0.5s ease-out 1.4s forwards",
          }}
        />
        {/* アクセント：ピンクの小さな丸 */}
        <circle
          cx="860"
          cy="760"
          r="22"
          fill="#FF6B9E"
          style={{
            opacity: 0,
            animation: "home-intro-fade-in 0.5s ease-out 1.5s forwards",
          }}
        />
      </svg>

      <div className="relative flex flex-col items-center gap-6">
        <div
          className="relative w-[140px] h-[140px] md:w-[180px] md:h-[180px] opacity-0"
          style={{ animation: "home-intro-fade-in 0.6s ease-out 0.9s forwards" }}
        >
          <Image
            src="/images/logo/alpaca-mark.png"
            alt="ALPACAロゴ"
            width={180}
            height={180}
            priority
            className="w-full h-full object-contain"
          />
        </div>

        <div className="overflow-hidden">
          <p
            className="text-white text-3xl md:text-5xl font-bold tracking-[0.28em] opacity-0"
            style={{
              animation:
                "home-intro-text-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) 1.4s forwards",
            }}
          >
            ALPACA
          </p>
        </div>

        <p
          className="text-white/80 text-xs md:text-sm tracking-[0.3em] opacity-0"
          style={{ animation: "home-intro-fade-in 0.5s ease-out 1.9s forwards" }}
        >
          奄美大島から、業務を、スマートに。
        </p>
      </div>

      <style>{`
        @keyframes home-intro-blob {
          from {
            transform: scale(0.2) rotate(-90deg);
            opacity: 0;
          }
          to {
            transform: scale(1.6) rotate(0deg);
            opacity: 1;
          }
        }
        @keyframes home-intro-fade-in {
          from { opacity: 0; transform: scale(0.94); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes home-intro-text-up {
          from { opacity: 0; transform: translateY(60px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          svg path, svg circle, p, div { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>
    </div>
  );
}
