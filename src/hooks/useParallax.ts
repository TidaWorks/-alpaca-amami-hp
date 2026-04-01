"use client";

import { useEffect, useRef } from "react";

/**
 * パララックス背景テキスト用フック
 * スクロール量に応じて要素を縦方向に移動させる
 */
export function useParallax(speed = 0.3) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const offset = (window.innerHeight - rect.top) * speed;
      ref.current.style.transform = `translateY(${offset}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);

  return ref;
}
