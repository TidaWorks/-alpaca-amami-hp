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
        {/* スマホ・タブレットだけ：押すとそのまま電話 */}
        <a className="hn-nav__tel" href="tel:0997000000" aria-label="電話で注文する 0997-00-0000">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z" />
          </svg>
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
