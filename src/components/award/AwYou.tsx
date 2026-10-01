"use client";

import type { ReactNode } from "react";
import { FIRST, useYou, type Worry } from "./store";

/** 入れてもらった会社の名前。無ければ「あなたの会社」。React の普通の文字として出す（HTMLとしては解釈しない） */
export function Co({ fb = "あなたの会社", after = "" }: { fb?: string; after?: string }) {
  const { name } = useYou();
  // after（が・の・なら など）は名前と同じ文字の並びに入れ、間に「ここで折らない」印（U+2060）を挟む
  return (
    <span className="aw-co">
      {name || fb}
      {after && "\u2060" + after}
    </span>
  );
}

/** 名前が入っている時だけ中身を変える */
export function IfNamed({ yes, no }: { yes: ReactNode; no: ReactNode }) {
  const { name } = useYou();
  return <>{name ? yes : no}</>;
}

/** 困りごとごとに中身を変える。選んでいない時は d。変わった時は左から書き直す動き（aw-swap） */
export function ByWorry({ d, docs, hp, ai, as: Tag = "span", className = "" }: { d: ReactNode; docs: ReactNode; hp: ReactNode; ai: ReactNode; as?: "span" | "p" | "div"; className?: string }) {
  const { worry } = useYou();
  const node = worry === "docs" ? docs : worry === "hp" ? hp : worry === "ai" ? ai : d;
  if (node === null || node === undefined || node === false) return null;
  return (
    <Tag key={worry} className={`${className} ${worry ? "aw-swap" : ""}`.trim() || undefined}>
      {node}
    </Tag>
  );
}

const ORDER = ["web", "system", "komon"] as const;
type WorkId = (typeof ORDER)[number];
const rank = (id: WorkId, worry: Worry) => {
  const first = worry ? FIRST[worry] : null;
  const list = first ? [first, ...ORDER.filter((x) => x !== first)] : [...ORDER];
  return list.indexOf(id);
};

/** 仕事の番号。困りごとを選ぶと、先に頼む仕事が 01 になる */
export function WorkNo({ id }: { id: WorkId }) {
  const { worry } = useYou();
  return <>{String(rank(id, worry) + 1).padStart(2, "0")}</>;
}

/** 先に頼む仕事と、その料金の行に付く朱の札 */
export function FirstTag({ id, children }: { id: WorkId; children: ReactNode }) {
  const { worry } = useYou();
  if (!worry || FIRST[worry] !== id) return null;
  return <span className="aw-first aw-swap">{children}</span>;
}

/** 名前か困りごとを入れた人（一番上で先へ進んだ人）にだけ出す */
export function IfEngaged({ children }: { children: ReactNode }) {
  const { step } = useYou();
  return step === 1 ? <>{children}</> : null;
}
