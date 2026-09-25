import type { ReactNode } from "react";

/**
 * 日本語の文を「、」「。」「／」「）」の後ろと「（」の前で区切り、かたまりごとに折り返す（Safari は word-break: auto-phrase が効かないため）
 * かたまりが1行より長い時は、そのかたまりの中で折り返す
 */
export function ph(text: string): ReactNode {
  // 区切りの後ろ（、。／）」）と「（」の前で切る
  const parts = text
    // 「）〜」の「〜」は前に付ける（スマホで行頭に「〜」が来ていた・4周目）
    .replace(/([、。／）」]+〜?)/g, "$1\u0000")
    .replace(/（/g, "\u0000（")
    .split("\u0000")
    .filter(Boolean);
  if (parts.length < 2) return text;
  return parts.map((p, i) => (
    <span key={i} className="tp-ph">
      {p}
    </span>
  ));
}
