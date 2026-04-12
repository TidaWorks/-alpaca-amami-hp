"use client";

import { useFadeIn } from "@/hooks/useFadeIn";

export default function About() {
  const fade = useFadeIn();
  return (
    <section id="about" className="relative py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row gap-14 md:gap-20">
          {/* 左: タイトル */}
          <div className="md:w-1/3">
            <p className="text-xs font-semibold tracking-[0.25em] text-[#0D9488] mb-3">ABOUT</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-800 leading-tight">About</h2>
          </div>

          {/* 右: プロフィール + テーブル */}
          <div ref={fade.ref} className={`md:w-2/3 transition-all duration-700 ${fade.className}`}>
            <div className="mb-10 p-6 md:p-8 rounded-2xl border border-[#0D9488]/15 bg-[#0D9488]/[0.04]">
              <div className="flex items-start gap-5">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#0D9488]/10 border-2 border-[#0D9488]/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <img src="/images/alpaca-logo.png" alt="ALPACA ロゴ" className="w-[70%] h-[70%] object-contain" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 text-lg md:text-xl font-bold mb-1">作田 大地<span className="text-gray-400 text-sm font-normal ml-2">Daichi Sakuda</span></p>
                  <p className="text-[#0D9488] text-xs tracking-wider font-medium mb-3">ALPACA</p>
                  <p className="text-gray-500 text-sm leading-[1.9]">
                    奄美大島出身・在住。「島の事業者さんが本業に集中できる環境をつくりたい」
                    という想いから、ALPACAを立ち上げました。
                    地元だからこそ、対面でじっくりお話を聞いて、ぴったりのシステムをお届けします。
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200">
              {[
                ["屋号", "ALPACA（アルパカ）"],
                ["代表者", "作田 大地"],
                ["事業内容", "業務システム構築 / Web制作 / LINE構築 / 保守運用"],
                ["所在地", "鹿児島県 奄美大島"],
                ["メール", "alpaca.amami@gmail.com"],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col md:flex-row border-b border-gray-100 py-4 md:py-5">
                  <span className="text-gray-400 text-sm font-medium md:w-1/4 mb-1 md:mb-0">{label}</span>
                  <span className="text-gray-700 text-sm md:w-3/4">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
