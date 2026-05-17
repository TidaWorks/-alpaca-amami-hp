"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

export type UseRevealOptions = IntersectionObserverInit & {
  /** 一度 reveal したら observer を切る（既定: true） */
  once?: boolean;
};

/**
 * 共通 reveal フック（モーションシステム統一・2026-05-17 改修）。
 * セクションが画面に入ったら revealed = true を返す。
 *
 * 設計メモ:
 * - fail-safe（setTimeout 強制 true）は撤去。
 *   観測漏れが起きないよう threshold / rootMargin を呼び出し側で調整する。
 * - prefers-reduced-motion: reduce なら即時表示。
 * - SSR セーフ（IntersectionObserver / matchMedia 未定義時は即時表示）。
 *
 * 戻り値（後方互換のため tuple + object のハイブリッド）:
 *   const [ref, revealed] = useReveal();         // 旧来の使い方
 *   const { ref, revealed } = useReveal();       // 推奨の使い方
 *   const r = useReveal(); r.ref / r.revealed;
 */
export type UseRevealReturn<T extends HTMLElement> = readonly [
  RefObject<T | null>,
  boolean,
] & {
  ref: RefObject<T | null>;
  revealed: boolean;
  /** 旧 API 互換（= revealed） */
  visible: boolean;
};

export function useReveal<T extends HTMLElement = HTMLElement>(
  options: UseRevealOptions | number = {}
): UseRevealReturn<T> {
  const opts: UseRevealOptions =
    typeof options === "number" ? { threshold: options } : options;
  const { threshold = 0.15, rootMargin = "0px 0px -10% 0px", once = true } =
    opts;

  const ref = useRef<T | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // モーション低減モードは即時表示
    const prefersReduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setRevealed(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    // IntersectionObserver 非対応環境は即時表示
    if (typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            if (once) io.disconnect();
            break;
          } else if (!once) {
            setRevealed(false);
          }
        }
      },
      { threshold, rootMargin }
    );

    io.observe(el);
    return () => io.disconnect();
    // threshold が配列の場合に毎レンダで参照が変わるのを避けるため
    // 呼び出し側で安定した値を渡す前提とする
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rootMargin, once]);

  // tuple + object のハイブリッド戻り値
  const tuple = [ref, revealed] as const;
  return Object.assign(tuple, {
    ref,
    revealed,
    visible: revealed,
  }) as UseRevealReturn<T>;
}

export default useReveal;
