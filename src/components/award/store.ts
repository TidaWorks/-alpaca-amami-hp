"use client";

import { useSyncExternalStore } from "react";

/**
 * 見ている人が入れた「会社の名前」と「困りごと」。この画面の中だけで使う（どこにも送らない）。
 * 開き直しても残るように sessionStorage にだけ写す（タブを閉じれば消える）。
 */
export type Worry = "" | "docs" | "hp" | "ai";
export type You = { name: string; worry: Worry; step: 0 | 1 };

const KEY = "aw-you";
const EMPTY: You = { name: "", worry: "", step: 0 };
let state: You = EMPTY;
const subs = new Set<() => void>();

/** 前後と連続の空白を落とし、30字（絵文字も1字に数える）で切る。空白だけなら空 */
export function cleanName(raw: string): string {
  const t = raw.replace(/\s+/g, " ").trim();
  return Array.from(t).slice(0, 30).join("");
}

export function setYou(patch: Partial<You>) {
  const next = { ...state, ...patch };
  if (patch.name !== undefined) next.name = cleanName(patch.name);
  if (next.name === state.name && next.worry === state.worry && next.step === state.step) return;
  state = next;
  try {
    sessionStorage.setItem(KEY, JSON.stringify(state));
  } catch {}
  subs.forEach((f) => f());
}

/** 開いた時に1回だけ: 同じタブで前に入れた物があれば戻す */
export function restoreYou() {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return;
    const v = JSON.parse(raw) as Partial<You>;
    const worry = v.worry === "docs" || v.worry === "hp" || v.worry === "ai" ? v.worry : "";
    setYou({ name: typeof v.name === "string" ? v.name : "", worry, step: v.step === 1 ? 1 : 0 });
  } catch {}
}

export const getYou = () => state;
export function subscribeYou(f: () => void) {
  subs.add(f);
  return () => {
    subs.delete(f);
  };
}
export const useYou = () => useSyncExternalStore(subscribeYou, getYou, () => EMPTY);

/** 困りごと → 先に頼む仕事 */
export const FIRST: Record<Exclude<Worry, "">, "system" | "web" | "komon"> = { docs: "system", hp: "web", ai: "komon" };

export const WORRIES: { id: Exclude<Worry, "">; label: string; msg: string }[] = [
  { id: "docs", label: "見積や書類づくりに時間がかかる", msg: "見積や書類づくりに時間がかかっている。" },
  { id: "hp", label: "ホームページから問い合わせが来ない", msg: "ホームページから問い合わせが来ない。" },
  { id: "ai", label: "AIを何に使えばいいか分からない", msg: "AIを何に使えばいいか分からない。" },
];
