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
            ? "bg-white/80 backdrop-blur-md border-b border-[#1A202C]/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 md:py-5 flex items-center justify-between">
          <a href="/" className="inline-block group" aria-label="ALPACAトップへ">
            <div className="flex items-baseline gap-2">
              <span
                className={`font-memphis-gothic font-black text-2xl md:text-3xl tracking-tight transition-colors duration-300 group-hover:text-[#635BFF] ${
                  scrolled ? "text-[#1A202C]" : "text-white"
                }`}
              >
                ALPACA
              </span>
              <span
                className={`hidden sm:inline text-[10px] font-bold tracking-[0.3em] pl-2 border-l transition-colors duration-300 ${
                  scrolled
                    ? "text-[#1A202C] border-[#1A202C]/30"
                    : "text-white/90 border-white/40"
                }`}
              >
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
                className={`text-sm font-bold transition-colors relative group ${
                  scrolled
                    ? "text-[#1A202C] hover:text-[#635BFF]"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#635BFF] scale-x-0 group-hover:scale-x-100 origin-left transition-transform" />
              </a>
            ))}
            <a
              href="#contact"
              className="text-xs font-black text-white bg-[#FF3D7F] rounded-full px-5 py-2.5 shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.97] transition-all"
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
            className="md:hidden w-11 h-11 flex items-center justify-center rounded-full bg-white/70 backdrop-blur-sm ring-1 ring-[#1A202C]/10 shadow-sm hover:bg-white active:scale-[0.92] transition cursor-pointer"
          >
            <div className="relative w-5 h-4">
              <span
                className={`absolute left-0 top-0 w-5 h-[2.5px] bg-[#1A202C] rounded-full transition-all duration-300 ${
                  open ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] w-5 h-[2.5px] bg-[#1A202C] rounded-full transition-all duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[14px] w-5 h-[2.5px] bg-[#1A202C] rounded-full transition-all duration-300 ${
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
          className="absolute inset-0 bg-[#1A202C]/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
        <div
          className={`absolute right-0 top-0 h-full w-[82%] max-w-xs bg-[#F5F3FF] border-l border-[#1A202C]/10 shadow-2xl transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="pt-20 px-8 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-bold text-[#1A202C] hover:text-[#635BFF] transition-colors py-3 border-b border-[#1A202C]/10"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center justify-center text-sm font-black text-white bg-[#FF3D7F] rounded-full px-5 py-3 shadow-md hover:shadow-lg transition-all"
            >
              無料相談 →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
