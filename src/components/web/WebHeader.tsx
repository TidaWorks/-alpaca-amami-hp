"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "#concept", label: "私たちについて" },
  { href: "#features", label: "サービス" },
  { href: "#works", label: "プロジェクト" },
  { href: "#pricing", label: "料金" },
  { href: "#faq", label: "よくある質問" },
  { href: "#contact", label: "お問い合わせ" },
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
          scrolled
            ? "bg-[#F7F7F7]/95 backdrop-blur-md border-b-2 border-[#111111]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 md:py-5 flex items-center justify-between">
          <a href="/" className="inline-block group" aria-label="ALPACAトップへ">
            <div className="flex items-baseline gap-2">
              <span className="font-memphis-gothic text-[#111111] font-black text-2xl md:text-3xl tracking-tight transition-colors duration-300 group-hover:text-[#FF2DA0]">
                ALPACA
              </span>
              <span className="hidden sm:inline text-[10px] font-bold tracking-[0.3em] text-[#111111] border-l-2 border-[#111111] pl-2">
                WEB DESIGN
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-bold text-[#111111] hover:text-[#FF2DA0] transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-[#FF2DA0] scale-x-0 group-hover:scale-x-100 origin-left transition-transform" />
              </a>
            ))}
            <a
              href="#contact"
              className="text-xs font-black text-white bg-[#FF2DA0] border-2 border-[#111111] rounded-full px-4 py-2 shadow-[3px_3px_0_0_#111111] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_0_#111111] active:scale-[0.97] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[0_0_0_0_#111111] transition-all"
            >
              無料相談 →
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={open}
            className="md:hidden w-11 h-11 flex items-center justify-center rounded-full border-2 border-[#111111] bg-[#FFD600] hover:bg-[#FF2DA0] active:scale-[0.92] transition shadow-[3px_3px_0_0_#111111] cursor-pointer"
          >
            <div className="relative w-5 h-4">
              <span
                className={`absolute left-0 top-0 w-5 h-[2.5px] bg-[#111111] rounded-full transition-all duration-300 ${
                  open ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] w-5 h-[2.5px] bg-[#111111] rounded-full transition-all duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[14px] w-5 h-[2.5px] bg-[#111111] rounded-full transition-all duration-300 ${
                  open ? "-translate-y-[7px] -rotate-45" : ""
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
        <div
          className="absolute inset-0 bg-[#111111]/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
        <div
          className={`absolute right-0 top-0 h-full w-[82%] max-w-xs bg-[#F7F7F7] border-l-4 border-[#111111] transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="pt-20 px-8 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-bold text-[#111111] hover:text-[#FF2DA0] transition-colors py-3 border-b-2 border-dashed border-[#111111]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center justify-center text-sm font-black text-white bg-[#FF2DA0] border-2 border-[#111111] rounded-full px-5 py-3 shadow-[3px_3px_0_0_#111111]"
            >
              無料相談 →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
