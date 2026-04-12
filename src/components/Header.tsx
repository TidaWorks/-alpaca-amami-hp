"use client";

import { useState, useEffect } from "react";

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
          ? "bg-white/95 backdrop-blur-md border-b border-gray-200/60 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 text-xl font-bold tracking-tight group">
          <img
            src="/images/alpaca-logo.svg"
            alt="ALPACA ロゴ"
            className="h-10 w-auto transition-transform group-hover:scale-110"
          />
          <span className="font-display font-extrabold tracking-wider">
            <span className="text-gray-800">ALPACA</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {[
            { href: "#services", label: "サービス・料金" },
            { href: "#advantage", label: "選ばれる理由" },
            { href: "#flow", label: "ご利用の流れ" },
            { href: "#faq", label: "FAQ" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-gray-500 hover:text-gray-800 transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-gray-800 text-white font-bold px-5 py-2 rounded-full hover:bg-gray-700 transition-colors text-sm"
          >
            無料相談
          </a>
        </nav>

        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="メニュー"
          aria-expanded={menuOpen}
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 px-6 pb-6 flex flex-col gap-4 text-sm">
          <a href="#services" onClick={() => setMenuOpen(false)} className="py-2 text-gray-600">サービス・料金</a>
          <a href="#advantage" onClick={() => setMenuOpen(false)} className="py-2 text-gray-600">選ばれる理由</a>
          <a href="#flow" onClick={() => setMenuOpen(false)} className="py-2 text-gray-600">ご利用の流れ</a>
          <a href="#faq" onClick={() => setMenuOpen(false)} className="py-2 text-gray-600">FAQ</a>
          <a href="#contact" onClick={() => setMenuOpen(false)} className="bg-gray-800 text-white font-bold text-center px-5 py-2 rounded-full">無料相談</a>
        </nav>
      )}
    </header>
  );
}
