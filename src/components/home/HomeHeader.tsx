"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "#service", label: "サービス" },
  { href: "#works", label: "実績" },
  { href: "#about", label: "ALPACAについて" },
  { href: "#flow", label: "進め方" },
  { href: "#faq", label: "よくある質問" },
  { href: "#contact", label: "お問い合わせ" },
];

export default function HomeHeader() {
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${
          scrolled ? "shadow-sm border-b border-[#E5E7EB]" : "border-b border-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 md:py-5 flex items-center justify-between">
          <a
            href="/"
            className="inline-flex items-baseline gap-2 group rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D2A6E] focus-visible:ring-offset-2"
            aria-label="ALPACAトップへ"
          >
            <span className="font-extrabold text-2xl md:text-3xl tracking-tight text-[#1A202C] group-hover:text-[#1D2A6E] transition-colors duration-300">
              ALPACA
            </span>
            <span className="hidden sm:inline text-[10px] font-bold tracking-[0.3em] text-[#12C998] border-l border-[#E5E7EB] pl-2 group-hover:tracking-[0.35em] transition-all duration-300">
              AMAMI STUDIO
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-bold text-[#1A202C] hover:text-[#1D2A6E] transition-colors relative group rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D2A6E] focus-visible:ring-offset-2"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#1D2A6E] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              </a>
            ))}
            <a
              href="#contact"
              className="text-xs font-black text-white bg-[#FF6B9E] rounded-full px-4 py-2 hover:bg-[#15296B] hover:scale-105 active:scale-95 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B9E] focus-visible:ring-offset-2"
            >
              無料相談 →
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={open}
            className="md:hidden w-11 h-11 flex items-center justify-center rounded-full border border-[#E5E7EB] bg-white hover:bg-[#F8FAFC] active:scale-90 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D2A6E] focus-visible:ring-offset-2"
          >
            <div className="relative w-5 h-4">
              <span className={`absolute left-0 top-0 w-5 h-[2.5px] bg-[#1A202C] rounded-full transition-all duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`absolute left-0 top-[7px] w-5 h-[2.5px] bg-[#1A202C] rounded-full transition-all duration-300 ${open ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 top-[14px] w-5 h-[2.5px] bg-[#1A202C] rounded-full transition-all duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </header>

      <div
        className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-[#1A202C]/40 backdrop-blur-sm" onClick={() => setOpen(false)} aria-hidden="true" />
        <div
          className={`absolute right-0 top-0 h-full w-[82%] max-w-xs bg-white border-l border-[#E5E7EB] transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="pt-20 px-8 flex flex-col gap-1">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-bold text-[#1A202C] hover:text-[#1D2A6E] hover:translate-x-1 transition-all duration-200 py-3 border-b border-[#E5E7EB] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D2A6E] focus-visible:ring-offset-2 rounded-sm"
                style={{
                  opacity: open ? 1 : 0,
                  transform: open ? "translateX(0)" : "translateX(20px)",
                  transition: `opacity 0.4s ease ${100 + i * 50}ms, transform 0.4s ease ${100 + i * 50}ms, color 0.2s, translate 0.2s`,
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center justify-center text-sm font-black text-white bg-[#FF6B9E] rounded-full px-5 py-3 hover:bg-[#15296B] active:scale-95 transition-all duration-200 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B9E] focus-visible:ring-offset-2"
            >
              無料相談 →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
