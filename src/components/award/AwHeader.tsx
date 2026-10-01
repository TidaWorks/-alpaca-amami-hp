"use client";

import { useEffect, useRef, useState } from "react";

const NAV = [
  { href: "#work", label: "仕事" },
  { href: "#flow", label: "毎月の流れ" },
  { href: "#price", label: "料金" },
  { href: "#about", label: "ALPACAについて" },
  { href: "#faq", label: "よくある質問" },
];

// 今読んでいる節の名前（ロゴの横に出す）
const SECTIONS: [string, string][] = [
  ["work", "仕事"],
  ["voice", "よく聞く話"],
  ["reason", "頼む理由"],
  ["flow", "毎月の流れ"],
  ["price", "料金"],
  ["about", "ALPACAについて"],
  ["faq", "よくある質問"],
  ["contact", "お問い合わせ"],
];

/** 下へ読む時は隠れ、上へ戻ると出るヘッダー。一番上では線なし。ロゴの横に今の節の名前 */
export default function AwHeader() {
  const [hidden, setHidden] = useState(false);
  const [top, setTop] = useState(true);
  const last = useRef(0);
  const [cur, setCur] = useState("");

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setTop(y < 8);
      // 画面の上から3割の所にある節を「今の節」にする
      const line = window.innerHeight * 0.3;
      let now = "";
      for (const [id] of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) now = id;
      }
      setCur(now);
      if (Math.abs(y - last.current) > 6) {
        setHidden(y > last.current && y > 240);
        last.current = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`aw-head ${hidden ? "is-hidden" : ""} ${top ? "is-top" : ""}`} onFocus={() => setHidden(false)}>
      <div className="aw-wrap aw-head__in">
        <a href="#" className="aw-head__logo" aria-label="ALPACA　一番上へ">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/top/logo-mark.webp" alt="" width={240} height={204} />
          <span>ALPACA</span>
        </a>
        <p className="aw-head__now" aria-hidden="true">
          {SECTIONS.map(([id, label]) => (
            <span key={id} className={cur === id ? "is-on" : ""}>
              {label}
            </span>
          ))}
        </p>
        <nav className="aw-head__nav" aria-label="ページ内の案内">
          <ul>
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className={cur === n.href.slice(1) ? "is-on" : ""}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a href="#contact" className="aw-head__cta">
          相談する
        </a>
      </div>
    </header>
  );
}
