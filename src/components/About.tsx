"use client";

import { useFadeIn } from "@/hooks/useFadeIn";

export default function About() {
  const fade = useFadeIn();
  return (
    <section id="about" className="relative py-20 md:py-36 bg-[#111] text-white overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F5A623]/15 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row gap-16 md:gap-24">
          {/* 左: タイトル */}
          <div className="md:w-1/3">
            <p className="font-display text-[#F5A623] font-semibold tracking-[0.4em] text-xs mb-4">ABOUT</p>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              About
            </h2>
          </div>

          {/* 右: プロフィール + テーブル */}
          <div ref={fade.ref} className={`md:w-2/3 transition-all duration-700 ${fade.className}`}>
            {/* 代表プロフィール */}
            <div className="mb-10 p-6 md:p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="flex items-start gap-5">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#F5A623]/10 border-2 border-[#F5A623]/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <img
                    src="/images/alpaca-logo.svg"
                    alt="ALPACA ロゴ"
                    className="w-[70%] h-[70%] object-contain"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-white/90 text-lg md:text-xl font-bold mb-1">作田 大地<span className="text-white/30 text-sm font-normal ml-2">Daichi Sakuda</span></p>
                  <p className="text-[#00C9C9] text-xs tracking-wider font-medium mb-3">ALPACA</p>
                  <p className="text-white/50 text-sm leading-[1.9]">
                    奄美大島出身・在住。「島の事業者さんが本業に集中できる環境をつくりたい」
                    という想いから、ALPACAを立ち上げました。
                    地元だからこそ、対面でじっくりお話を聞いて、ぴったりのシステムをお届けします。
                  </p>
                </div>
              </div>
            </div>

            {/* 事業情報テーブル */}
            <div className="border-t border-white/10">
              {[
                ["屋号", "ALPACA（アルパカ）"],
                ["代表者", "作田 大地"],
                ["事業内容", "Webアプリ開発 / LINE構築 / 業務システム構築 / 保守運用"],
                ["所在地", "鹿児島県 奄美大島"],
                ["メール", "alpaca.amami@gmail.com"],
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
