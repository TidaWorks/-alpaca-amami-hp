"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#concept", ja: "店の考え", en: "Concept" },
  { href: "#menu", ja: "昼と夜の品書き", en: "Menu" },
  { href: "#shochu", ja: "黒糖焼酎", en: "Shochu" },
  { href: "#room", ja: "お店の様子", en: "Room" },
  { href: "#news", ja: "お知らせ", en: "News" },
  { href: "#access", ja: "ご案内", en: "Access" },
];

// 一番上を過ぎたら右上に出る「menu」。開くと全画面の案内
export default function KamadoMenu() {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const [nearEnd, setNearEnd] = useState(false);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(".km-hero");
    const onScroll = () => {
      const limit = hero ? hero.offsetTop + hero.offsetHeight * 0.5 : 600;
      setShown(window.scrollY > limit);
      setAtTop(window.scrollY < 48);
      // 下の「電話で予約する」が見える所では、付いてくる電話ボタンを引っこめる
      setNearEnd(window.scrollY + window.innerHeight > document.documentElement.scrollHeight - 900);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        className={`km-mbtn ${shown || open ? "is-shown" : ""} ${open ? "is-open" : ""} ${atTop && !open ? "is-top" : ""}`}
        aria-expanded={open}
        aria-controls="km-menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span>{open ? "Close" : "Menu"}</span>
        <i aria-hidden="true">
          <b />
          <b />
        </i>
      </button>
      {/* 開け閉めをフェードに（hidden だと移り変わりが出ない）。閉じている間は visibility で隠して押せなくする */}
      <div id="km-menu" className={`km-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <nav aria-label="ページ内の案内">
          <p className="km-menu__logo" aria-hidden="true">
            <small>島の食堂</small>かまど
          </p>
          <ul>
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)}>
                  <span className="km-menu__en">{l.en}</span>
                  <span className="km-menu__ja">{l.ja}</span>
                </a>
              </li>
            ))}
          </ul>
          <a className="km-btn km-btn--line" href="tel:0997000000" onClick={() => setOpen(false)}>
            ご予約 0997-00-0000
          </a>
        </nav>
      </div>
      {/* スマホだけ：一番上を過ぎたら右下に付いてくる電話ボタン */}
      <a className={`km-telfab ${shown && !open && !nearEnd ? "is-shown" : ""}`} href="tel:0997000000" aria-label="電話で予約する（0997-00-0000）">
        電話で予約
      </a>
    </>
  );
}
