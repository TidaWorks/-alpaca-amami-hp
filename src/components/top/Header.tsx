"use client";

import { useEffect, useRef, useState } from "react";
import { setupGsap, gsap, isReduced } from "./motion";
import { SITE } from "@/lib/site";
import { Phone } from "lucide-react";

type Sub = { href: string; label: string; note?: string };
export const NAV: { href: string; label: string; sub: Sub[] }[] = [
  {
    href: "#what",
    label: "AI顧問とは",
    sub: [
      { href: "#what", label: "AI顧問とは", note: "毎月ひとつずつ、AIに任せる仕事を増やす" },
      { href: "#voice", label: "社長の困りごと" },
      { href: "#faq", label: "よくある質問" },
    ],
  },
  {
    href: "#price",
    label: "料金",
    sub: [
      // 古い方針の下層（/system /web）へは飛ばさない（作り直すまでトップの料金へ）
      { href: "#price", label: "AI顧問", note: "月15万円〜（税別）" },
      { href: "#price", label: "システム開発", note: "要見積もり" },
      { href: "#price", label: "ホームページ制作", note: "25万円〜（税別）" },
    ],
  },
  {
    href: "#reason",
    label: "頼む理由",
    sub: [
      { href: "#reason", label: "期間の縛りなし" },
      { href: "#reason", label: "奄美の会社は訪問も" },
      { href: "#reason", label: "自社でもAIの秘書を毎日使っている" },
    ],
  },
  {
    href: "#flow",
    label: "毎月の流れ",
    sub: [
      { href: "#flow", label: "01 仕事を洗い出す" },
      { href: "#flow", label: "02 任せる所を決める" },
      { href: "#flow", label: "03 仕組みを作る" },
      { href: "#flow", label: "04 根付かせる" },
    ],
  },
  {
    href: "#about",
    label: "ALPACAについて",
    sub: [
      { href: "#about", label: "ALPACAについて" },
      { href: "#contact", label: "お問い合わせ" },
    ],
  },
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
        <MegaMenu />
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
          {[...NAV.map(({ href, label }) => ({ href, label })), ...SUB].map((l) => (
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

/**
 * PC のメニュー（#37）: 乗せると下にパネルが開き、背景が 50% 暗くなる。
 * 別の項目へ移るとパネルが左右にずれながら入れ替わり、高さもなめらかに変わる。項目の下の目印が横に滑る
 */
function MegaMenu() {
  const [active, setActive] = useState(-1);
  const [prev, setPrev] = useState(-1);
  const [box, setBox] = useState({ left: 0, width: 0, height: 0, bar: 0, barW: 0, barTop: 0 });
  const items = useRef<(HTMLLIElement | null)[]>([]);
  const bodies = useRef<(HTMLDivElement | null)[]>([]);
  const closeT = useRef(0);

  const open = (i: number) => {
    window.clearTimeout(closeT.current);
    if (!window.matchMedia("(any-hover: hover) and (min-width: 1024px)").matches) return;
    const li = items.current[i];
    const body = bodies.current[i];
    if (!li || !body) return;
    const r = li.getBoundingClientRect();
    const w = Math.min(window.innerWidth - 32, Math.max(360, body.scrollWidth));
    const left = Math.max(16, Math.min(window.innerWidth - w - 16, r.left + r.width / 2 - w / 2));
    setBox({ left, width: w, height: body.offsetHeight, bar: r.left, barW: r.width, barTop: r.bottom - 12 });
    setPrev(active);
    setActive(i);
  };
  const close = () => {
    window.clearTimeout(closeT.current);
    closeT.current = window.setTimeout(() => {
      setPrev(-1);
      setActive(-1);
    }, 120);
  };
  useEffect(() => {
    document.documentElement.classList.toggle("tp-mega-open", active >= 0);
    if (active < 0) return;
    // キーボードで開いた時: Esc か、メニューとパネルの外へフォーカスが出たら閉じる（開いたまま画面全体が暗くなっていた）
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setPrev(-1);
      setActive(-1);
    };
    const onFocusIn = (e: FocusEvent) => {
      const t = e.target as Node;
      const inMenu = items.current.some((li) => li?.contains(t)) || bodies.current.some((b) => b?.contains(t));
      if (!inMenu) {
        setPrev(-1);
        setActive(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("focusin", onFocusIn);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("focusin", onFocusIn);
    };
  }, [active]);
  useEffect(() => () => window.clearTimeout(closeT.current), []);

  return (
    <>
      <ul className="tp-header__menu" onPointerLeave={close}>
        {NAV.map((l, i) => (
          <li key={l.href} ref={(el) => { items.current[i] = el; }} onPointerEnter={() => open(i)}>
            <a href={l.href} className={`tp-header__link ${active === i ? "is-active" : ""}`} onFocus={() => open(i)}>
              {l.label}
            </a>
          </li>
        ))}
      </ul>
      <span
        className={`tp-mega__bar ${active >= 0 ? "is-on" : ""}`}
        style={{ transform: `translateX(${box.bar}px)`, width: box.barW, top: box.barTop }}
        aria-hidden="true"
      />
      <div className={`tp-mega__shade ${active >= 0 ? "is-on" : ""}`} aria-hidden="true" onPointerEnter={close} />
      <div
        className={`tp-mega ${active >= 0 ? "is-on" : ""} ${prev < 0 ? "is-first" : ""}`}
        style={{ left: box.left, width: box.width, height: box.height }}
        onPointerEnter={() => window.clearTimeout(closeT.current)}
        onPointerLeave={close}
      >
        {NAV.map((l, i) => {
          // 今の項目より左の中身は左に、右の中身は右に控えておき、切り替えで横から滑り込ませる
          const side = active < 0 ? 0 : Math.sign(i - active);
          return (
            <div
              key={l.href}
              ref={(el) => { bodies.current[i] = el; }}
              className={`tp-mega__body ${i === active ? "is-active" : ""}`}
              style={{ "--side": side } as React.CSSProperties}
              aria-hidden={i !== active}
            >
              <p className="tp-mega__ttl">{l.label}</p>
              <ul className="tp-mega__list">
                {l.sub.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} className="tp-mega__link" tabIndex={i === active ? 0 : -1} onClick={() => setActive(-1)}>
                      <span>{s.label}</span>
                      {s.note && <span className="tp-mega__note">{s.note}</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
}
