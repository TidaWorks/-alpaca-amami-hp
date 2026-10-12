"use client";

import { useEffect, useState } from "react";
import { YR_LINKS } from "./links";

// 右上の小さな丸い「menu」。開くと白い面にページ内の案内が出る
export default function YururiMenu() {
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
        className={`yr-mbtn ${open ? "is-open" : ""}`}
        aria-expanded={open}
        aria-controls="yr-menu"
        aria-label={open ? "案内を閉じる" : "案内を開く"}
        onClick={() => setOpen((v) => !v)}
      >
        <i aria-hidden="true">
          <b />
          <b />
        </i>
        <span>{open ? "close" : "menu"}</span>
      </button>
      <div id="yr-menu" className={`yr-menu ${open ? "is-open" : ""}`} hidden={!open}>
        <nav aria-label="ページ内の案内">
          <p className="yr-menu__logo">ゆるり整骨院</p>
          <ul>
            {YR_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)}>
                  <small>{l.en}</small>
                  <span>{l.ja}</span>
                </a>
              </li>
            ))}
          </ul>
          <a className="yr-menu__tel" href="tel:0997000000" onClick={() => setOpen(false)}>
            <small>ご予約・お問い合わせ</small>
            0997-00-0000
          </a>
        </nav>
      </div>
    </>
  );
}
