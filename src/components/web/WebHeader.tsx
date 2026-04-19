"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const NAV_LINKS = [
  { href: "#features", label: "特徴" },
  { href: "#pricing", label: "料金" },
  { href: "#flow", label: "流れ" },
  { href: "#contact", label: "相談する" },
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
          scrolled ? "bg-[#FFFBF5]/90 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 py-4 md:py-5 flex items-center justify-between">
          <a href="/" className="inline-block" aria-label="ALPACAトップへ">
            <div className="relative w-24 h-10 md:w-28 md:h-12">
              <Image src="/images/alpaca-logo.png" alt="ALPACA" fill className="object-contain object-left" />
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#2D2418] hover:text-[#F5A623] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/"
              className="text-sm font-medium text-[#8A7D6B] hover:text-[#2D2418] transition-colors border-l border-[#D4CEC5] pl-6"
            >
              システム開発
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={open}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 transition"
          >
            <div className="relative w-5 h-4">
              <span
                className={`absolute left-0 top-0 w-5 h-[2px] bg-[#2D2418] rounded-full transition-all duration-300 ${
                  open ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] w-5 h-[2px] bg-[#2D2418] rounded-full transition-all duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[14px] w-5 h-[2px] bg-[#2D2418] rounded-full transition-all duration-300 ${
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
        <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} aria-hidden="true" />
        <div
          className={`absolute right-0 top-0 h-full w-[78%] max-w-xs bg-[#FFFBF5] shadow-2xl transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="pt-20 px-8 flex flex-col gap-5">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-[#2D2418] hover:text-[#F5A623] transition-colors py-2 border-b border-[#EFE8DE]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/"
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-[#8A7D6B] hover:text-[#2D2418] transition-colors py-2 mt-4"
            >
              → システム開発ページ
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
