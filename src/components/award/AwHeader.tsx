"use client";

import { useEffect, useRef, useState } from "react";

const NAV = [
  { href: "#work", label: "仕事" },
  { href: "#about", label: "ALPACAについて" },
  { href: "#faq", label: "よくある質問" },
];

// 今読んでいる節の名前（ロゴの横に出す）
const SECTIONS: [string, string][] = [
  ["work", "仕事"],
  ["voice", "困りごと"],
  ["reason", "頼む理由"],
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
  const [menu, setMenu] = useState(false);
  const prog = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setTop(y < 8);
      // 読んだ分だけ、ヘッダーの下の線が朱で伸びる
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (prog.current) prog.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
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

  // 目次を開いている間は後ろを動かさない。Esc で閉じる
  useEffect(() => {
    document.documentElement.classList.toggle("aw-menu-open", menu);
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);

  return (
    <>
    <header className={`aw-head ${hidden && !menu ? "is-hidden" : ""} ${top ? "is-top" : ""} ${cur ? "has-now" : ""}`} onFocus={() => setHidden(false)}>
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
        <a href="#contact" className="aw-head__cta" onClick={() => setMenu(false)}>
          相談する
        </a>
        <button
          type="button"
          className={`aw-head__menu ${menu ? "is-open" : ""}`}
          aria-expanded={menu}
          aria-controls="aw-menu"
          aria-label={menu ? "メニューを閉じる" : "メニューを開く"}
          onClick={() => setMenu(!menu)}
        >
          <span className="aw-head__menu-txt">{menu ? "閉じる" : "目次"}</span>
          <span className="aw-head__menu-bars" aria-hidden="true" />
        </button>
      </div>
      <span className="aw-head__prog" ref={prog} aria-hidden="true" />
    </header>

    {/* 目次（スマホ・タブレット）。10/5 白地に太いゴシックで節の名前を並べる（BoostX 風にそろえる） */}
    <div className={`aw-menu ${menu ? "is-open" : ""}`} id="aw-menu" aria-hidden={!menu}>
      <nav className="aw-wrap aw-menu__in" aria-label="目次">
        <ol>
          {SECTIONS.map(([id, label], i) => (
            <li key={id} style={{ transitionDelay: `${0.05 + i * 0.04}s` }}>
              <a href={`#${id}`} tabIndex={menu ? 0 : -1} onClick={() => setMenu(false)}>
                <span className="aw-menu__n">{String(i + 1).padStart(2, "0")}</span>
                <span className="aw-menu__t">{label}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </div>
    </>
  );
}
