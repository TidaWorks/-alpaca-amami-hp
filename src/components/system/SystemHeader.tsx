"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "#concept", label: "コンセプト" },
  { href: "#features", label: "機能" },
  { href: "#pricing", label: "料金" },
  { href: "#flow", label: "導入の流れ" },
  { href: "#faq", label: "よくある質問" },
  { href: "#contact", label: "お問い合わせ" },
];

export default function SystemHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-[#E5E9F5]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-4 md:py-5 flex items-center justify-between">
          <a
            href="/"
            className="inline-flex items-baseline gap-3 group rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2860E1] focus-visible:ring-offset-2"
            aria-label="ALPACAトップへ"
          >
            <span className="font-bold text-2xl md:text-[1.7rem] tracking-tight text-[#1D2A6E] group-hover:text-[#2860E1] transition-colors duration-300">
              ALPACA
            </span>
            <span className="hidden sm:inline text-[10px] font-bold tracking-[0.3em] text-[#5A6280] border-l border-[#E5E9F5] pl-3">
              業務システム
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] font-bold tracking-wide text-[#2A2E45] hover:text-[#2860E1] transition-colors relative group rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2860E1] focus-visible:ring-offset-2"
              >
                {link.label}
                <span className="absolute -bottom-2 left-0 right-0 h-[1.5px] bg-[#2860E1] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              </a>
            ))}
            <a
              href="#contact"
              className="text-[12px] font-bold text-white bg-[#2860E1] rounded-full px-5 py-2.5 hover:bg-[#1D4FCE] transition-all duration-200 shadow-[0_4px_12px_rgba(40,96,225,0.25)] hover:shadow-[0_6px_18px_rgba(40,96,225,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2860E1] focus-visible:ring-offset-2"
            >
              無料相談 →
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={open}
            className="md:hidden w-11 h-11 flex items-center justify-center rounded-full border border-[#E5E9F5] bg-white hover:bg-[#F4F6FF] active:scale-90 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2860E1] focus-visible:ring-offset-2"
          >
            <div className="relative w-5 h-4">
              <span
                className={`absolute left-0 top-0 w-5 h-[2px] bg-[#1D2A6E] rounded-full transition-all duration-300 ${
                  open ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] w-5 h-[2px] bg-[#1D2A6E] rounded-full transition-all duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[14px] w-5 h-[2px] bg-[#1D2A6E] rounded-full transition-all duration-300 ${
                  open ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      <div
        className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-[#1D2A6E]/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
        <div
          className={`absolute right-0 top-0 h-full w-[82%] max-w-xs bg-white border-l border-[#E5E9F5] transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="pt-20 px-8 flex flex-col gap-1">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-bold text-[#1D2A6E] hover:text-[#2860E1] py-3 border-b border-[#E5E9F5] transition-colors"
                style={{
                  opacity: open ? 1 : 0,
                  transform: open ? "translateX(0)" : "translateX(20px)",
                  transition: `opacity 0.4s ease ${100 + i * 50}ms, transform 0.4s ease ${100 + i * 50}ms`,
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex items-center justify-center text-sm font-bold text-white bg-[#2860E1] rounded-full px-5 py-3 hover:bg-[#1D4FCE] shadow-[0_4px_12px_rgba(40,96,225,0.25)]"
            >
              無料相談 →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
