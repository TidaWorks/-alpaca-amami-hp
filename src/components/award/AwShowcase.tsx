"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";
import type React from "react";

// 制作の見本（架空のお店10本）をパソコンとスマホの枠の中で流して見せる（10/13 大地さん「1」＝ショーケース型）
// 縦長の画面写真は public/images/samples/full/<slug>-pc.webp・-sp.webp（高さは下の h に合わせる）
const SAMPLES = [
  { slug: "isago", k: "宿", name: "isago", hp: 3850, hs: 5844 },
  { slug: "kuroto", k: "パン屋", name: "黒糖のパン屋 くろと", hp: 3517, hs: 6114 },
  { slug: "yuigi", k: "工務店", name: "結木工務店", hp: 4185, hs: 5425 },
  { slug: "soyo", k: "美容室", name: "hair room soyo", hp: 5505, hs: 9477 },
  { slug: "kamado", k: "食堂", name: "島の食堂 かまど", hp: 5357, hs: 8006 },
  { slug: "kaiji", k: "ダイビング", name: "KAIJI DIVE", hp: 5787, hs: 9586 },
  { slug: "yururi", k: "整骨院", name: "ゆるり整骨院", hp: 6192, hs: 9596 },
  { slug: "minato", k: "税理士事務所", name: "みなと税理士事務所", hp: 8034, hs: 10466 },
  { slug: "hinata", k: "農園", name: "ひなた農園", hp: 6906, hs: 10362 },
  { slug: "amairo", k: "工房", name: "泥染め工房 あまいろ", hp: 5801, hs: 8646 },
];
const pad2 = (n: number) => String(n + 1).padStart(2, "0");

export default function AwShowcase({ head }: { head?: React.ReactNode }) {
  const [cur, setCur] = useState(0);
  const [auto, setAuto] = useState(true);
  const [held, setHeld] = useState(false);
  const [still, setStill] = useState(false);
  // 欄が画面に入ってから枠をせり上げ、流し始める（入る前に勝手に進まない）
  const [seen, setSeen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const chips = useRef<HTMLDivElement>(null);
  const s = SAMPLES[cur];
  // 流れる速さ：1秒に 140px（画面写真の高さで秒数が変わる）。一周したら次の見本へ
  const durPc = Math.max(10, (s.hp - 550) / 140);

  useEffect(() => {
    setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.18 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!seen || !auto || held) return;
    const t = window.setTimeout(() => setCur((c) => (c + 1) % SAMPLES.length), (still ? 6 : durPc + 2.5) * 1000);
    return () => window.clearTimeout(t);
  }, [cur, auto, held, durPc, still, seen]);

  // 選んだ札が横の並びの中で見えるように（スマホ）
  useEffect(() => {
    const el = chips.current?.querySelector<HTMLElement>(`[data-i="${cur}"]`);
    const box = chips.current;
    if (el && box && box.scrollWidth > box.clientWidth) {
      box.scrollTo({ left: el.offsetLeft - box.clientWidth / 2 + el.clientWidth / 2, behavior: "smooth" });
    }
  }, [cur]);

  // 次の見本の画像を先に読んでおく
  useEffect(() => {
    const n = SAMPLES[(cur + 1) % SAMPLES.length];
    [`${n.slug}-pc`, `${n.slug}-sp`].forEach((f) => {
      const im = new Image();
      im.src = `/images/samples/full/${f}.webp`;
    });
  }, [cur]);

  const pick = (i: number) => {
    setCur(i);
    setAuto(false);
  };

  return (
    <div ref={root} className={`aw-sc ${seen ? "is-in" : ""}`} onPointerEnter={() => setHeld(true)} onPointerLeave={() => setHeld(false)}>
      {/* 画面そのものを押すと、その見本サイトに入る（10/13 大地さん「タップしたら中に入る感じに」） */}
      <a className="aw-sc__stage" href={`/samples/${s.slug}`} aria-label={`${s.k}の見本「${s.name}」に入る`}>
        <div className="aw-sc__pc" aria-hidden="true">
          <span className="aw-sc__bar">
            <i />
            <i />
            <i />
            <b>alpaca-amami.com/samples/{s.slug}</b>
          </span>
          <span className="aw-sc__screen">
            <img
              key={`pc-${s.slug}`}
              src={`/images/samples/full/${s.slug}-pc.webp`}
              alt=""
              className="aw-sc__scroll"
              style={{ animationDuration: `${durPc}s` }}
            />
          </span>
        </div>
        <div className="aw-sc__sp" aria-hidden="true">
          <span className="aw-sc__screen aw-sc__screen--sp">
            <img
              key={`sp-${s.slug}`}
              src={`/images/samples/full/${s.slug}-sp.webp`}
              alt=""
              className="aw-sc__scroll"
              style={{ animationDuration: `${durPc}s` }}
            />
          </span>
        </div>
        {/* 押せると分かる薄い字。画面の真ん中でゆっくり点滅（10/13 大地さん） */}
        <span className="aw-sc__tap" aria-hidden="true">
          <span className="aw-sc__tap-touch">タップして<br />開く</span>
          <span className="aw-sc__tap-mouse">クリックして<br />開く</span>
          <i>↗</i>
        </span>
      </a>

      <div className="aw-sc__side">
        {head && <div className="aw-sc__head">{head}</div>}
        <p className="aw-sc__now">
          <span className="aw-sc__now-n">{pad2(cur)}</span>
          <span className="aw-sc__now-k">{s.k}</span>
        </p>
        <p className="aw-sc__name">{s.name}</p>
        <div className="aw-sc__chips" ref={chips} role="tablist" aria-label="見本の業種">
          {SAMPLES.map((x, i) => (
            <button
              key={x.slug}
              type="button"
              role="tab"
              aria-selected={i === cur}
              data-i={i}
              className={`aw-sc__chip ${i === cur ? "is-cur" : ""}`}
              onClick={() => pick(i)}
            >
              <span className="aw-sc__chip-n">{pad2(i)}</span>
              {x.k}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
