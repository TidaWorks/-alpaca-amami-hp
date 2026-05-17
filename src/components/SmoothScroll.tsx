"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

type Props = {
  children: ReactNode;
};

/**
 * Lenis によるスムーズスクロール。
 * - prefers-reduced-motion: reduce のユーザーには適用しない。
 * - rAF ループで update。アンマウント時に確実に destroy。
 */
export default function SmoothScroll({ children }: Props) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
