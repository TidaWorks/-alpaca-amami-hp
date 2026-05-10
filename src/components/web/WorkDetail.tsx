"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import type { Work } from "@/data/works";
import { SITE } from "@/lib/site";

export default function WorkDetail({ work }: { work: Work }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ページ進入アニメーション（吸い込みの着地）
    const el = containerRef.current;
    if (!el) return;
    el.style.opacity = "1";
    el.style.transform = "scale(1)";
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#0A0A0A] opacity-0 scale-[1.05] transition-all duration-700 ease-out"
    >
      {/* ナビ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/web"
            className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 text-sm"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 12L6 8L10 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            WORKSに戻る
          </Link>
          <span className="text-white/40 text-xs font-display tracking-widest">
            ALPACA
          </span>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8">
            <p className="text-[#F5A623] text-xs font-semibold uppercase tracking-[0.2em] font-display mb-4">
              {work.category}
            </p>
            <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
              {work.title}
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl">
              {work.description}
            </p>
          </div>

          {/* メタ情報 */}
          <div className="flex flex-wrap gap-6 text-sm">
            <div>
              <span className="text-gray-500">クライアント</span>
              <p className="text-white font-medium mt-1">{work.client}</p>
            </div>
            <div>
              <span className="text-gray-500">年</span>
              <p className="text-white font-medium mt-1">{work.year}</p>
            </div>
            <div>
              <span className="text-gray-500">技術</span>
              <div className="flex gap-2 mt-1">
                {work.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {work.url && (
              <div>
                <span className="text-gray-500">URL</span>
                <p className="mt-1">
                  <a
                    href={work.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F5A623] hover:underline"
                  >
                    サイトを見る
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* メインビジュアル（プレースホルダー） */}
      <section className="max-w-7xl mx-auto px-6 mb-16 md:mb-24">
        <div className="aspect-[16/9] bg-[#141414] rounded-2xl border border-white/5 flex items-center justify-center">
          <span className="text-gray-600 text-8xl font-display font-bold opacity-20">
            {work.title.charAt(0)}
          </span>
        </div>
      </section>

      {/* 課題と解決策 */}
      <section className="max-w-5xl mx-auto px-6 mb-16 md:mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#141414] rounded-2xl p-8 border border-white/5">
            <p className="text-[#F5A623] text-xs font-bold font-display tracking-widest mb-4">
              CHALLENGE
            </p>
            <h3 className="text-white text-xl font-bold mb-4">課題</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {work.challenge}
            </p>
          </div>
          <div className="bg-[#141414] rounded-2xl p-8 border border-white/5">
            <p className="text-[#F5A623] text-xs font-bold font-display tracking-widest mb-4">
              SOLUTION
            </p>
            <h3 className="text-white text-xl font-bold mb-4">解決策</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {work.solution}
            </p>
          </div>
        </div>
      </section>

      {/* 主な機能 */}
      <section className="max-w-5xl mx-auto px-6 mb-16 md:mb-24">
        <p className="text-[#F5A623] text-xs font-bold font-display tracking-widest mb-4">
          FEATURES
        </p>
        <h3 className="text-white text-xl font-bold mb-8">主な機能</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {work.features.map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-3 bg-[#141414] rounded-xl p-4 border border-white/5"
            >
              <span className="text-[#F5A623] flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M13.3 4.3L6 11.6L2.7 8.3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="text-gray-300 text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-white text-2xl md:text-3xl font-bold mb-4">
            こんなサイト、つくりませんか？
          </h2>
          <p className="text-gray-400 mb-8">
            あなたのお店に合った、ちょうどいいホームページを提案します。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={SITE.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#F5A623] text-black font-bold px-8 py-4 rounded-full hover:bg-[#E09510] hover:scale-105 hover:shadow-[0_0_30px_rgba(245,166,35,0.3)] transition-all duration-300"
            >
              相談する
            </a>
            <Link
              href="/web"
              className="border border-white/20 text-white font-bold px-8 py-4 rounded-full hover:bg-white/10 hover:border-white/40 transition-all duration-300"
            >
              他の実績を見る
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
