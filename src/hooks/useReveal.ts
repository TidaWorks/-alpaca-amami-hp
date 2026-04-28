"use client";

import { useEffect, useRef, useState } from "react";

/**
 * IntersectionObserver で要素が画面内に入ったら true を返す。
 *
 * 改善点（2026-04-28）:
 * - マウント時に getBoundingClientRect() で既に画面内ならその場で setVisible(true)
 * - フェイルセーフ: 1秒後には必ず可視化（IO 発火しないケースを防ぐ）
 * - prefers-reduced-motion: reduce 時は即座に visible
 *
 * 戻り値: [ref, visible]
 */
export function useReveal<T extends HTMLElement = HTMLElement>(
  options: IntersectionObserverInit = { threshold: 0.15 }
) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // reduced-motion の場合は即可視化
    if (typeof window !== "undefined" && window.matchMedia) {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) {
        setVisible(true);
        return;
      }
    }

    // 既に画面内なら即 visible
    const rect = node.getBoundingClientRect();
    const inView =
      rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom > 0;
    if (inView) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      options
    );
    observer.observe(node);

    // フェイルセーフ: 1秒後にも visible にしてしまう
    const failSafe = window.setTimeout(() => {
      setVisible(true);
      observer.disconnect();
    }, 1000);

    return () => {
      observer.disconnect();
      window.clearTimeout(failSafe);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, visible] as const;
}
