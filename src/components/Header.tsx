"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 text-xl font-bold tracking-tight group">
          <Image
            src="/images/tida-works-logo.png"
            alt="TIDA WORKS ロゴ"
            width={48}
            height={48}
            className="h-10 w-auto transition-transform group-hover:scale-110"
          />
          <span className="font-display font-extrabold tracking-wider">
            <span className="text-[#F5A623]">TIDA</span>{" "}
            <span className="text-white">WORKS</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {[
            { href: "#benefits", label: "選ばれる理由" },
            { href: "#services", label: "料金" },
            { href: "#flow", label: "ご利用の流れ" },
            { href: "#faq", label: "よくある質問" },
            { href: "#about", label: "About" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-white/70 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-[#F5A623] text-black font-bold px-5 py-2 rounded-full hover:bg-[#FFD700] transition-colors text-sm"
          >
            無料相談
          </a>
        </nav>

        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="メニュー"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-md border-t border-white/5 px-6 pb-6 flex flex-col gap-4 text-sm">
          <a href="#benefits" onClick={() => setMenuOpen(false)} className="py-2 text-white/70">選ばれる理由</a>
          <a href="#services" onClick={() => setMenuOpen(false)} className="py-2 text-white/70">料金</a>
          <a href="#flow" onClick={() => setMenuOpen(false)} className="py-2 text-white/70">ご利用の流れ</a>
          <a href="#faq" onClick={() => setMenuOpen(false)} className="py-2 text-white/70">よくある質問</a>
          <a href="#about" onClick={() => setMenuOpen(false)} className="py-2 text-white/70">About</a>
          <a href="#contact" onClick={() => setMenuOpen(false)} className="bg-[#F5A623] text-black font-bold text-center px-5 py-2 rounded-full">無料相談</a>
        </nav>
      )}
    </header>
  );
}
