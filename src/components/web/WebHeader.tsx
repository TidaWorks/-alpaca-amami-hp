"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "#features", label: "特徴" },
  { href: "#pricing", label: "料金" },
  { href: "#flow", label: "流れ" },
  { href: "#contact", label: "相談" },
];

export default function WebHeader() {
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
          scrolled ? "bg-black/85 backdrop-blur-md border-b border-white/10" : "bg-transparent"
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 py-4 md:py-5 flex items-center justify-between">
          <a href="/" className="inline-block group" aria-label="ALPACAトップへ">
            <div className="flex items-baseline gap-1.5">
              <span className="text-white font-black text-xl md:text-2xl tracking-tight">ALPACA</span>
              <span
                className="text-[#00FF85] text-[9px] font-bold tracking-[0.3em] group-hover:text-[#FF2E88] transition-colors"
                style={{ textShadow: "0 0 8px rgba(0,255,133,0.5)" }}
              >
                WEB
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-bold text-white/85 hover:text-[#FF2E88] transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#FF2E88] scale-x-0 group-hover:scale-x-100 origin-left transition-transform" />
              </a>
            ))}
            <a
              href="#contact"
              className="text-xs font-black text-black bg-[#00FF85] rounded-full px-4 py-2 hover:bg-[#FF2E88] hover:text-white transition-colors shadow-[0_0_20px_rgba(0,255,133,0.4)]"
            >
              無料相談 →
            </a>
            <a
              href="/"
              className="text-[11px] font-semibold text-white/50 hover:text-white/90 transition-colors border-l border-white/15 pl-5"
            >
              SYSTEM
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={open}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full border border-white/20 hover:border-[#FF2E88] transition"
          >
            <div className="relative w-5 h-4">
              <span
                className={`absolute left-0 top-0 w-5 h-[2px] bg-white rounded-full transition-all duration-300 ${
                  open ? "translate-y-[7px] rotate-45 bg-[#FF2E88]" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] w-5 h-[2px] bg-white rounded-full transition-all duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[14px] w-5 h-[2px] bg-white rounded-full transition-all duration-300 ${
                  open ? "-translate-y-[7px] -rotate-45 bg-[#FF2E88]" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setOpen(false)} aria-hidden="true" />
        <div
          className={`absolute right-0 top-0 h-full w-[78%] max-w-xs bg-[#0A0A0A] border-l border-[#FF2E88]/30 shadow-[-8px_0_40px_rgba(255,46,136,0.15)] transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="pt-20 px-8 flex flex-col gap-5">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-bold text-white hover:text-[#FF2E88] transition-colors py-2 border-b border-white/10"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center justify-center text-sm font-black text-black bg-[#00FF85] rounded-full px-5 py-3 hover:bg-[#FF2E88] hover:text-white transition-colors"
            >
              無料相談 →
            </a>
            <a
              href="/"
              onClick={() => setOpen(false)}
              className="text-xs font-semibold text-white/50 hover:text-white transition-colors py-2 mt-2"
            >
              → システム開発ページ
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
