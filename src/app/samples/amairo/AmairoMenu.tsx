"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#dorozome", ja: "泥染めのこと", en: "DOROZOME" },
  { href: "#taiken", ja: "染めの体験", en: "WORKSHOP" },
  { href: "#shop", ja: "工房の小物", en: "SHOP" },
  { href: "#day", ja: "工房の一日", en: "A DAY" },
  { href: "#news", ja: "お知らせ", en: "NEWS" },
  { href: "#guide", ja: "ご案内", en: "GUIDE" },
];

export default function AmairoMenu() {
  const [open, setOpen] = useState(false);

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
        className={`am-menu-btn ${open ? "is-open" : ""}`}
        aria-expanded={open}
        aria-controls="am-menu"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "CLOSE" : "MENU"}
      </button>
      <div id="am-menu" className={`am-menu ${open ? "is-open" : ""}`} hidden={!open}>
        <nav aria-label="ページ内の案内">
          <p className="am-menu__name">泥染め工房 あまいろ</p>
          <ul>
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)}>
                  <span className="am-menu__ja">{l.ja}</span>
                  <span className="am-menu__en">{l.en}</span>
                </a>
              </li>
            ))}
          </ul>
          <a className="am-btn am-btn--light" href="#guide" onClick={() => setOpen(false)}>
            <span>体験を予約する</span>
            <i aria-hidden="true">▸</i>
          </a>
        </nav>
      </div>
    </>
  );
}
