"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

const NAV_LINKS = [
  { href: "#concept", label: "コンセプト" },
  { href: "#pain", label: "困りごと" },
  { href: "#features", label: "サービス内容" },
  { href: "#usecases", label: "業種別事例" },
  { href: "#pricing", label: "料金" },
  { href: "#faq", label: "よくある質問" },
];

export default function AgentHeader() {
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
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-5 md:py-6 flex items-center justify-between">
          <a href="/" className="inline-flex items-baseline gap-3 group" aria-label="ALPACAトップへ">
            <span className="font-extrabold text-2xl md:text-[1.7rem] tracking-tight text-[#1D2A6E]">
              ALPACA
            </span>
            <span className="hidden sm:inline text-[10px] font-bold tracking-[0.3em] pl-3 border-l text-[#5A6280] border-[#E5E9F5]">
              アルパカAI顧問
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-9">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] font-bold tracking-wide text-[#1A1A1A] hover:text-[#12C998] relative group transition-colors"
              >
                {link.label}
                <span className="absolute -bottom-2 left-0 right-0 h-[1.5px] bg-[#12C998] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              </a>
            ))}
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 text-[12px] font-bold text-white bg-[#12C998] rounded-full pl-5 pr-2 py-2 hover:bg-[#0DA67D] transition-colors duration-200"
            >
              無料相談
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white text-[#12C998] transition-transform duration-300 group-hover:rotate-[-45deg]">
                <ArrowRight className="w-3 h-3" strokeWidth={2.5} aria-hidden="true" />
              </span>
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={open}
            className="md:hidden w-11 h-11 flex items-center justify-center rounded-full bg-[#F4F6F8] ring-1 ring-[#E5E9F5] active:scale-[0.92] transition cursor-pointer"
          >
            <div className="relative w-5 h-4">
              <span className={`absolute left-0 top-0 w-5 h-[2px] bg-[#1D2A6E] rounded-full transition-all duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`absolute left-0 top-[7px] w-5 h-[2px] bg-[#1D2A6E] rounded-full transition-all duration-300 ${open ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 top-[14px] w-5 h-[2px] bg-[#1D2A6E] rounded-full transition-all duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </header>

      <div
        className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-[#1D2A6E]/40 backdrop-blur-sm" onClick={() => setOpen(false)} aria-hidden="true" />
        <div
          className={`absolute right-0 top-0 h-full w-[86%] max-w-sm bg-white border-l border-[#E5E9F5] transition-transform duration-500 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="pt-24 px-8 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-bold text-[#1A1A1A] py-4 border-b border-[#E5E9F5]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-8 group inline-flex items-center justify-between text-sm font-bold text-white bg-[#12C998] rounded-full pl-6 pr-2 py-3"
            >
              無料相談
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white text-[#12C998]">
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} aria-hidden="true" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
