"use client";

import { useFadeIn } from "@/hooks/useFadeIn";

export default function About() {
  const fade = useFadeIn();
  return (
    <section id="about" className="relative py-16 md:py-32 bg-[#111] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row gap-16 md:gap-24">
          {/* 左: タイトル */}
          <div className="md:w-1/3">
            <p className="text-[#F5A623] font-medium tracking-[0.3em] text-xs mb-4">ABOUT</p>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              会社
              <br />
              <span className="text-white/50">概要</span>
            </h2>
          </div>

          {/* 右: テーブル */}
          <div ref={fade.ref} className={`md:w-2/3 transition-all duration-700 ${fade.className}`}>
            <div className="border-t border-white/10">
              {[
                ["屋号", "TIDA WORKS（ティダ ワークス）"],
                ["代表者", "作田 大地"],
                ["事業内容", "Webアプリ開発 / LINE構築 / 業務システム構築 / 保守運用"],
                ["所在地", "鹿児島県 奄美大島"],
                ["メール", "tida1997amami@gmail.com"],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col md:flex-row border-b border-white/10 py-5 md:py-6">
                  <span className="text-[#F5A623]/50 text-sm font-medium md:w-1/4 mb-1 md:mb-0">{label}</span>
                  <span className="text-white/70 text-sm md:w-3/4">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
