"use client";

import { useEffect, useRef, useState } from "react";

// 上の帯とスマホ用メニュー。
// 一番上では写真の上に重ねる。下へ読み進めている間は隠し、上へ戻る時だけ生成りの細い帯で出す
// （10/13 検品：スマホの丸いボタンが青地で見えない・白地で本文を隠す → 固定の丸をやめ、帯の中に入れた）
const LINKS = [
  { href: "#story", en: "Story" },
  { href: "#service", en: "Service" },
  { href: "#fee", en: "Fee" },
  { href: "#flow", en: "Flow" },
  { href: "#office", en: "Office" },
  { href: "#contact", en: "Contact" },
];

type Mode = "top" | "hidden" | "shown";

export default function MinatoMenu() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("top");
  const [anim, setAnim] = useState(false);
  const last = useRef(0);
  const modeRef = useRef<Mode>("top");

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = 0;
      const y = window.scrollY;
      const dy = y - last.current;
      last.current = y;
      let next: Mode;
      let withAnim: boolean;
      if (y < 160) {
        next = "top";
        withAnim = false;
      } else if (Math.abs(dy) < 4) {
        return;
      } else if (dy < 0) {
        next = "shown";
        withAnim = true;
      } else {
        // 下へ：出ていた帯は滑って隠す。一番上から来た時はそのまま隠す（ちらつかせない）
        next = "hidden";
        withAnim = modeRef.current === "shown";
      }
      modeRef.current = next;
      setMode(next);
      setAnim(withAnim);
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(tick);
    };
    last.current = window.scrollY;
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  const cls = ["mn-bar", mode !== "top" && "is-fixed", mode === "shown" && "is-show", anim && "is-anim", open && "is-open"]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <header className={cls}>
        <a href="#top" className="mn-mark" aria-label="みなと税理士事務所 トップへ">
          M<i aria-hidden="true" />
        </a>
        <nav className="mn-bar__nav" aria-label="ページ内の案内">
          {LINKS.map((n) => (
            <a key={n.href} href={n.href}>
              {n.en}
            </a>
          ))}
        </nav>
        <div className="mn-bar__sp">
          <a className="mn-bar__tel" href="tel:0997000000">
            電話
          </a>
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
        </div>
      </header>
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
