"use client";

import Image from "next/image";
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
            ? "bg-[#F8F8F8]/95 backdrop-blur-md border-b border-black/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-4 md:py-5 flex items-center justify-between">
          <a href="/" className="inline-flex items-center gap-3 group" aria-label="ALPACAトップへ">
            <Image
              src="/images/logo/alpaca-mark.png"
              alt="ALPACAロゴ"
              width={40}
              height={40}
              priority
              className="h-9 md:h-10 w-auto"
            />
            <span className="text-black text-2xl md:text-3xl tracking-[0.05em] font-medium transition-colors duration-300 group-hover:text-[#EC6C00]">
              ALPACA
            </span>
            <span className="hidden sm:inline text-[11px] md:text-xs tracking-[0.2em] pl-3 ml-1 border-l border-black/20 text-black/70">
              ホームページ・LP制作
            </span>
          </a>

          {/* Desktop nav — givee風 右寄せ細字 */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-sm text-black hover:text-[#EC6C00] transition-colors group"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-[#FFE900] scale-x-0 group-hover:scale-x-100 origin-left transition-transform" />
              </a>
            ))}
            {/* 黒丸pill CTA + アロー丸 */}
            <a
              href="#contact"
              className="group inline-flex items-center gap-2"
            >
              <span className="inline-block bg-black text-white text-xs font-medium rounded-full px-5 py-2.5 group-hover:bg-[#EC6C00] transition-colors">
                無料相談
              </span>
              <span className="w-9 h-9 border border-black rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={open}
            className={`md:hidden w-11 h-11 flex items-center justify-center rounded-full ring-1 active:scale-[0.92] transition cursor-pointer ${
              scrolled
                ? "bg-white ring-black/15"
                : "bg-white/80 ring-black/10"
            }`}
          >
            <div className="relative w-5 h-4">
              <span
                className={`absolute left-0 top-0 w-5 h-[2.5px] rounded-full bg-black transition-all duration-300 ${
                  open ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] w-5 h-[2.5px] rounded-full bg-black transition-all duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[14px] w-5 h-[2.5px] rounded-full bg-black transition-all duration-300 ${
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
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
        <div
          className={`absolute right-0 top-0 h-full w-[82%] max-w-xs bg-[#F8F8F8] border-l border-black/10 shadow-2xl transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* 黄色装飾シェイプ */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FFE900] rounded-full pointer-events-none" />
          <div className="relative pt-20 px-8 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base text-black hover:text-[#EC6C00] transition-colors py-3 border-b border-black/10"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center justify-center text-sm font-medium text-white bg-black hover:bg-[#EC6C00] rounded-full px-5 py-3.5 transition-all"
            >
              無料相談 →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
