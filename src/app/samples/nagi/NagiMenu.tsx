"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#concept", en: "Concept", ja: "nagi のこと" },
  { href: "#menu", en: "Menu", ja: "メニューと料金" },
  { href: "#stylist", en: "Stylist", ja: "店の人" },
  { href: "#reserve", en: "Reserve", ja: "予約の流れ" },
  { href: "#news", en: "News", ja: "お知らせ" },
  { href: "#info", en: "Information", ja: "店の案内" },
];

// スマホの時だけ出る menu（PC は上の帯に文字で並ぶ）
export default function NagiMenu() {
  const [open, setOpen] = useState(false);
  const [top, setTop] = useState(56);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="ng-mbtn"
        aria-expanded={open}
        aria-controls="ng-menu"
        onClick={() => {
          // 上の帯の下端から開く（一番上では「見本」の帯の分だけ下がる）
          const bar = document.querySelector(".ng-bar");
          if (bar) setTop(Math.max(0, Math.round(bar.getBoundingClientRect().bottom)));
          setOpen((v) => !v);
        }}
      >
        <span>{open ? "Close" : "Menu"}</span>
        <i aria-hidden="true" className={open ? "is-x" : ""}>
          <b />
          <b />
        </i>
      </button>
      <div id="ng-menu" className={`ng-menu ${open ? "is-open" : ""}`} hidden={!open} style={{ top }}>
        <nav aria-label="ページ内の案内">
          <ul>
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)}>
                  <span className="ng-menu__en">{l.en}</span>
                  <span className="ng-menu__ja">{l.ja}</span>
                </a>
              </li>
            ))}
          </ul>
          <a className="ng-pill ng-pill--dark" href="tel:0997000000" onClick={() => setOpen(false)}>
            電話で予約する <span aria-hidden="true">→</span>
          </a>
        </nav>
      </div>
    </>
  );
}
