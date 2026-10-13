"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#stay", ja: "宿泊", en: "stay" },
  { href: "#bath", ja: "湯", en: "bath" },
  { href: "#table", ja: "島のごはん", en: "island table" },
  { href: "#around", ja: "島めぐり", en: "around the island" },
  { href: "#access", ja: "アクセス", en: "access" },
];

export default function IsagoMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // html ではなく body で止める（body に overflow-x:hidden があるため、html を止めると body が別のスクロール枠になり、
    // 上の帯の追従が外れ、閉じた時にページの頭へ戻ってしまう）
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="ig-menu-btn"
        aria-expanded={open}
        aria-controls="ig-menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span>{open ? "close" : "menu"}</span>
        <i aria-hidden="true" className={open ? "is-x" : ""}>
          <b />
          <b />
          <b />
        </i>
      </button>
      {/* hidden を使うと開け閉めのフェードが出ないので、visibility と opacity で切り替える（CSS 側） */}
      <div id="ig-menu" className={`ig-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <nav aria-label="ページ内の案内">
          <ul>
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)}>
                  <span className="ig-menu__ja">{l.ja}</span>
                  <span className="ig-menu__en">{l.en}</span>
                </a>
              </li>
            ))}
          </ul>
          <a className="ig-reserve ig-reserve--menu" href="#access" onClick={() => setOpen(false)}>
            <svg viewBox="0 0 200 14" aria-hidden="true">
              <path pathLength={1} d="M0 9 C 20 2, 34 2, 52 8 S 86 14, 104 7 S 140 1, 160 7 S 188 12, 200 6" />
            </svg>
            reserve <span aria-hidden="true">›</span>
          </a>
        </nav>
      </div>
    </>
  );
}
