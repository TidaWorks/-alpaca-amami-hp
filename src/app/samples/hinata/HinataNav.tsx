"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#farm", t: "農園のこと" },
  { href: "#tankan", t: "たんかんのこと" },
  { href: "#year", t: "畑の1年" },
  { href: "#order", t: "ご注文" },
  { href: "#stand", t: "直売所" },
  { href: "#news", t: "お知らせ" },
  { href: "#access", t: "案内" },
];

// 画面の下に浮かぶ「もくじ」。PC は横に並べ、スマホは押すと下から開く
export default function HinataNav() {
  const [shown, setShown] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setShown(window.scrollY > window.innerHeight * 0.6);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <nav className={`hn-nav ${shown || open ? "is-shown" : ""}`} aria-label="もくじ">
      <div className="hn-nav__pill">
        <span className="hn-nav__label" aria-hidden="true">
          もくじ
        </span>
        <ul className="hn-nav__pc">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.t}</a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="hn-nav__btn"
          aria-expanded={open}
          aria-controls="hn-nav-sheet"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "とじる" : "もくじ"}
        </button>
        <a className="hn-nav__order" href="#order" onClick={() => setOpen(false)}>
          ご注文
        </a>
      </div>
      <ul id="hn-nav-sheet" className={`hn-nav__sheet ${open ? "is-open" : ""}`} hidden={!open}>
        {LINKS.map((l) => (
          <li key={l.href}>
            <a href={l.href} onClick={() => setOpen(false)}>
              {l.t}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
