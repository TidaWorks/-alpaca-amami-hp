"use client";

import { useEffect, useState } from "react";

// スマホ用のメニュー（PC は横並びの案内をそのまま出す）
const LINKS = [
  { href: "#story", en: "Story" },
  { href: "#service", en: "Service" },
  { href: "#fee", en: "Fee" },
  { href: "#flow", en: "Flow" },
  { href: "#office", en: "Office" },
  { href: "#contact", en: "Contact" },
];

export default function MinatoMenu() {
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
        className={`mn-burger ${open ? "is-x" : ""}`}
        aria-expanded={open}
        aria-controls="mn-menu"
        aria-label={open ? "メニューを閉じる" : "メニューを開く"}
        onClick={() => setOpen((v) => !v)}
      >
        <b aria-hidden="true" />
        <b aria-hidden="true" />
      </button>
      <div id="mn-menu" className={`mn-menu ${open ? "is-open" : ""}`} hidden={!open}>
        <nav aria-label="ページ内の案内">
          <ul>
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)}>
                  {l.en}
                </a>
              </li>
            ))}
          </ul>
          <p className="mn-menu__tel">
            <a href="tel:0997000000" onClick={() => setOpen(false)}>
              Tel : 0997-00-0000
            </a>
          </p>
        </nav>
      </div>
    </>
  );
}
