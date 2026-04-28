"use client";

import { useEffect, useState } from "react";

/**
 * スクロール量に応じて translateY 用のオフセット値を返す。
 *
 * - speed: 1あたりのスクロール量に対するピクセル係数（例: 0.15 = ゆっくり、0.4 = 速め）
 * - スマホ（< 768px）では常に 0 を返してパフォーマンスを保つ
 * - prefers-reduced-motion: reduce のときは無効化
 * - requestAnimationFrame で値を間引いて更新
 */
export function useParallax(speed: number = 0.2): number {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // モバイル: 無効化
    if (window.innerWidth < 768) return;

    // reduced-motion: 無効化
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let rafId = 0;
    let ticking = false;

    const update = () => {
      setOffset(window.scrollY * speed);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        rafId = window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [speed]);

  return offset;
}
