"use client";

import { useEffect, useState } from "react";
import { setupGsap, gsap, isReduced } from "./motion";
import { SITE } from "@/lib/site";
import { Phone } from "lucide-react";

export const NAV = [
  { href: "#what", label: "AI顧問とは" },
  { href: "#price", label: "料金" },
  { href: "#reason", label: "頼む理由" },
  { href: "#flow", label: "毎月の流れ" },
  { href: "#about", label: "ALPACAについて" },
];

const SUB = [
  { href: "#faq", label: "よくある質問" },
  { href: "#contact", label: "お問い合わせ" },
];

/** ページ内リンクを 0.48s power2.inOut でスクロール（#40） */
export function useAnchorScroll() {
  useEffect(() => {
    setupGsap();
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href")!.slice(1);
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      e.preventDefault();
      const header = document.querySelector<HTMLElement>(".tp-header__logo");
      const offset = header ? header.offsetHeight + 8 : 0;
      if (isReduced()) {
        window.scrollTo(0, target.getBoundingClientRect().top + window.scrollY - offset);
      } else {
        gsap.to(window, { duration: 0.48, ease: "power2.inOut", scrollTo: { y: target, offsetY: offset } });
      }
      history.replaceState(null, "", `#${id}`);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
}

export default function Header() {
  const [open, setOpen] = useState(false);
  useAnchorScroll();

  useEffect(() => {
    document.documentElement.classList.toggle("tp-menu-open", open);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`tp-header ${open ? "is-open" : ""}`}>
      <a href="#top" className="tp-header__logo" aria-label="ALPACA トップへ">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/top/logo-mark.webp" alt="" className="tp-header__mark" />
        <span className="tp-header__name">
          <span className="tp-header__en">ALPACA</span>
          <span className="tp-header__tag">奄美・鹿児島の会社のAI顧問</span>
        </span>
      </a>

      <nav className="tp-header__nav" aria-label="メインメニュー">
        <div className="tp-header__row1">
          <a href={SITE.contact.telHref} className="tp-header__tel">
            <Phone className="tp-header__telicon" aria-hidden="true" />
            {SITE.contact.tel}
          </a>
          {SUB.map((l) => (
            <a key={l.href} href={l.href} className="tp-header__sub">
              {l.label}
            </a>
          ))}
        </div>
        <ul className="tp-header__menu">
          {NAV.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="tp-header__link">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="tp-header__cta">
        <a href="#contact" className="tp-header__ctabtn tp-header__ctabtn--main">
          無料相談
        </a>
        <a href={SITE.contact.telHref} className="tp-header__ctabtn tp-header__ctabtn--sub">
          電話する
        </a>
      </div>

      <button
        type="button"
        className="tp-burger"
        aria-label={open ? "メニューを閉じる" : "メニューを開く"}
        aria-expanded={open}
        aria-controls="tp-drawer"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="tp-burger__line" />
        <span className="tp-burger__line" />
        <span className="tp-burger__line" />
      </button>

      <div className="tp-drawer" id="tp-drawer" onClick={(e) => (e.target as HTMLElement).closest("a") && setOpen(false)}>
        <ul className="tp-drawer__list">
          {[...NAV, ...SUB].map((l) => (
            <li key={l.href}>
              <a href={l.href} className="tp-drawer__link">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a href={SITE.contact.telHref} className="tp-drawer__tel">
          {SITE.contact.tel}
        </a>
      </div>
    </header>
  );
}
