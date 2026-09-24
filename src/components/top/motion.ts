"use client";

/**
 * 新トップの動きの共通設定（お手本 e-chubu.jp の実測値。docs/research/hp-renew-2026-09-25/ref/MOTION-SPEC.md）
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

let ready = false;

export function setupGsap() {
  if (ready || typeof window === "undefined") return gsap;
  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, ScrollToPlugin);
  CustomEase.create("tpInOut", "0.85,0,0.15,1"); // ヒーロー写真の縮み
  CustomEase.create("tpVeil", "0.7,0,0.84,0"); // 白い幕の丸い穴
  CustomEase.create("tpEase", "0.25,0.1,0.25,1"); // CSS の ease と同じ
  ready = true;
  return gsap;
}

export const EASE = {
  bounceText: "elastic.out(1.2,0.6)", // 英字の1文字バウンド
  popIn: "elastic.out(1.1,0.3)", // イラストの入れ替わり
  softIn: "elastic.out(1.1,0.9)", // ギャラリー写真の登場
  copyIn: "elastic.out(0.6,0.7)", // オープニングのキャッチ
} as const;

export const isPC = () => window.matchMedia("(min-width: 768px)").matches;
export const isReduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** ScrollTrigger の開始位置（PC 70% / スマホ 80%） */
export const startPos = () => (isPC() ? "top 70%" : "top 80%");

export { gsap, ScrollTrigger, SplitText };
