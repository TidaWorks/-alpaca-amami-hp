"use client";

import { useState } from "react";

const faqs = [
  {
    q: "本当に「こんなの作れる？」だけで相談していいんですか？",
    a: "はい、大歓迎です！漠然としたイメージでも大丈夫。お話を聞きながら、一緒に形にしていきます。",
  },
  {
    q: "制作期間はどのくらいですか？",
    a: "ホームページなら約2〜4週間、システム開発は規模によりますが2〜8週間が目安です。お急ぎの場合はご相談ください。",
  },
  {
    q: "途中で修正や変更はできますか？",
    a: "はい、開発中の修正・変更は随時対応します。進捗を共有しながら進めるので、「思ってたのと違う」を防げます。",
  },
  {
    q: "保守サポートは必須ですか？",
    a: "いいえ、任意です。ご自身で運用できる場合は不要です。ただ、サーバー管理や不具合対応を含むので、多くの方にご利用いただいています。",
  },
  {
    q: "島外からの依頼も受けていますか？",
    a: "現在は奄美大島内のお客様を中心に対応しています。島外の場合もオンラインで対応可能ですので、まずはご相談ください。",
  },
  {
    q: "支払い方法は？",
    a: "制作費用は納品時に銀行振込でお支払い。毎月の保守料金はクレジットカード決済または銀行振込に対応しています。",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-20 md:py-36 bg-[#111] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row gap-16 md:gap-24">
          {/* 左: タイトル */}
          <div className="md:w-1/3">
            <p className="font-display text-[#F5A623] font-semibold tracking-[0.4em] text-xs mb-4">FAQ</p>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              よくある
              <br />
              <span className="text-[#F5A623]">質問</span>
            </h2>
          </div>

          {/* 右: アコーディオン */}
          <div className="md:w-2/3">
            <div className="border-t border-white/10">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-white/10">
                  <button
                    onClick={() => setOpenIdx(openIdx === i ? null : i)}
                    className="w-full flex items-center justify-between py-5 md:py-6 text-left group"
                  >
                    <span className="text-white/80 text-sm md:text-base font-medium pr-4 group-hover:text-white transition-colors">
                      {faq.q}
                    </span>
                    <span
                      className={`text-[#F5A623] text-xl flex-shrink-0 transition-transform duration-300 ${
                        openIdx === i ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIdx === i ? "max-h-40 pb-5" : "max-h-0"
                    }`}
                  >
                    <p className="text-white/50 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
