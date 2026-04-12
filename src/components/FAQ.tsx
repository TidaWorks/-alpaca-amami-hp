"use client";

import { useState } from "react";

const faqs = [
  { q: "本当に「こんなの作れる？」だけで相談していいんですか？", a: "はい、大歓迎です！漠然としたイメージでも大丈夫。お話を聞きながら、一緒に形にしていきます。" },
  { q: "制作期間はどのくらいですか？", a: "ホームページなら約2〜4週間、システム開発は規模によりますが2〜8週間が目安です。お急ぎの場合はご相談ください。" },
  { q: "途中で修正や変更はできますか？", a: "はい、開発中の修正・変更は随時対応します。進捗を共有しながら進めるので、「思ってたのと違う」を防げます。" },
  { q: "保守サポートは必須ですか？", a: "いいえ、任意です。ただ、サーバー管理や不具合対応を含むので、多くの方にご利用いただいています。" },
  { q: "島外からの依頼も受けていますか？", a: "現在は奄美大島内のお客様を中心に対応しています。島外の場合もオンラインで対応可能ですので、まずはご相談ください。" },
  { q: "支払い方法は？", a: "制作費用は納品時に銀行振込でお支払い。毎月の保守料金はクレジットカード決済または銀行振込に対応しています。" },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-20 md:py-32 bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 md:px-10">
        <div className="mb-14">
          <p className="text-xs font-semibold tracking-[0.25em] text-[#0D9488] mb-3">FAQ</p>
          <h2 className="text-3xl md:text-4xl font-black text-gray-800 leading-tight">よくある質問</h2>
        </div>

        <div className="border-t border-gray-200">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-gray-200">
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left group"
                aria-expanded={openIdx === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span className="text-gray-700 text-sm font-medium pr-4 group-hover:text-gray-900 transition-colors">
                  {faq.q}
                </span>
                <span className={`text-[#0D9488] text-xl flex-shrink-0 transition-transform duration-300 ${openIdx === i ? "rotate-45" : ""}`}>
                  +
                </span>
              </button>
              <div id={`faq-answer-${i}`} role="region" className={`overflow-hidden transition-all duration-300 ${openIdx === i ? "max-h-40 pb-5" : "max-h-0"}`}>
                <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
