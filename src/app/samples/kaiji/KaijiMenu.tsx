"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#menu", en: "MENU", ja: "メニューと料金" },
  { href: "#sea", en: "SEA", ja: "潜れる海" },
  { href: "#day", en: "A DAY", ja: "1日の流れ" },
  { href: "#safety", en: "SAFETY", ja: "安全のこと" },
  { href: "#access", en: "ACCESS", ja: "案内・予約" },
];

// 上の案内が画面から消えたら、右上に出る小さなメニュー
export default function KaijiMenu() {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const [nearEnd, setNearEnd] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShown(window.scrollY > 420);
      // 下の「電話で予約する」が見える所では、付いてくる電話ボタンを引っこめる
      setNearEnd(window.scrollY + window.innerHeight > document.documentElement.scrollHeight - 640);
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
        className={`kj-mbtn ${shown || open ? "is-shown" : ""} ${open ? "is-open" : ""}`}
        aria-expanded={open}
        aria-controls="kj-mpanel"
        aria-label={open ? "メニューを閉じる" : "メニューを開く"}
        onClick={() => setOpen((v) => !v)}
      >
        <b />
        <b />
      </button>
      {/* 開け閉めを 0.3 秒のフェードに（hidden だと移り変わりが出ない）。閉じている間は visibility で隠して押せなくする */}
      <div id="kj-mpanel" className={`kj-mpanel ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <nav aria-label="メニュー">
          <ul>
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)}>
                  <span className="kj-mpanel__en">{l.en}</span>
                  <span className="kj-mpanel__ja">{l.ja}</span>
                </a>
              </li>
            ))}
          </ul>
          <a className="kj-call" href="tel:0997000000" onClick={() => setOpen(false)}>
            電話で予約する <span aria-hidden="true">→</span>
          </a>
        </nav>
      </div>
      {/* スマホだけ：一番上を過ぎたら右下に付いてくる電話ボタン */}
      <a className={`kj-telfab ${shown && !open && !nearEnd ? "is-shown" : ""}`} href="tel:0997000000" aria-label="電話で予約する（0997-00-0000）">
        電話で予約
      </a>
    </>
  );
}
