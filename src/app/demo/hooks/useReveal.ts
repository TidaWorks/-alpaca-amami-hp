"use client";
import { useEffect, useRef, useState } from "react";

export function useReveal(threshold = 0.05) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // IntersectionObserverが使えない環境のフォールバック
    if (typeof IntersectionObserver === "undefined") {
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
      { threshold, rootMargin: "50px 0px" }
    );
    observer.observe(el);

    // フォールバック: 2秒後に強制表示（Observerが発火しなかった場合の保険）
    const timer = setTimeout(() => {
      setVisible(true);
    }, 2000);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [threshold]);

  return { ref, visible };
}
