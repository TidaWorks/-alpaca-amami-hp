"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "AIの返答内容は信頼できますか？間違ったらどうなりますか？",
    a: "AIには「お店の情報以外は答えない」「不確かなことは人間に確認するよう案内する」という指示を入れています。重要な質問・複雑な相談はAIが判断して、オーナーさんのスマホに即通知が飛ぶ仕組みです。AIに任せきりにはしません。",
  },
  {
    q: "うちのお店のID・パスワードを預けるのは不安です",
    a: "ご安心ください。ID/パスワードはお預かりしません。LINE公式アカウントの公式機能（Messaging API）を使ってOAuth認証で連携します。お店の管理画面はオーナーさんが完全に持ったままです。",
  },
  {
    q: "途中で解約できますか？",
    a: "はい、最低契約期間はありません。月単位でいつでも解約可能です。解約後はAIスタッフは停止しますが、構築したFAQデータはお渡しします。",
  },
  {
    q: "API実費とは何ですか？",
    a: "AIが返答するためのClaude APIや、LINE Messaging APIの利用料です。お店の問い合わせ件数によりますが、月¥1,500〜¥7,500が目安です。請求は実費分をクライアント様に直接ご負担いただく形になります。",
  },
  {
    q: "奄美外のお店でも依頼できますか？",
    a: "はい、ご相談可能です。ALPACAは奄美大島が拠点ですが、LINEボット構築は完全リモートで対応できます。打ち合わせはオンラインで実施します。",
  },
  {
    q: "AIエージェントって、つまり何ですか？",
    a: "「人間の代わりに、決められた業務を自動でこなしてくれるAI」のことです。今回のLINE自動応答は、AIエージェントの中でも「お店の問い合わせ対応に特化したスタッフ」というイメージです。",
  },
];

export default function AgentFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 md:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        {/* セクション見出し */}
        <div className="text-center mb-14 md:mb-16">
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="bg-[#1A202C] text-white font-black text-[11px] tracking-widest px-2.5 py-1 rounded-full">
              07
            </span>
            <span className="text-[11px] font-bold tracking-[0.3em] text-[#1A202C]/60">
              FAQ
            </span>
          </div>
          <h2 className="font-memphis-mincho text-[#1A202C] text-3xl md:text-5xl font-extrabold tracking-tight mb-5">
            よくある
            <span className="relative inline-block">
              <span className="relative z-10">ご質問</span>
              <span className="absolute inset-x-0 bottom-1 h-[35%] bg-[#635BFF]/30 -z-0" aria-hidden="true" />
            </span>
          </h2>
        </div>

        {/* アコーディオン */}
        <div className="space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className={`rounded-2xl ring-1 transition-all duration-300 ${
                  isOpen
                    ? "bg-[#F5F3FF] ring-[#635BFF]/30 shadow-[0_8px_24px_-8px_rgba(99,91,255,0.18)]"
                    : "bg-white ring-[#1A202C]/10 hover:ring-[#1A202C]/20"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full text-left px-5 md:px-7 py-5 flex items-start gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-memphis-gothic font-black text-[#635BFF] text-sm flex-shrink-0 pt-[2px]">
                    Q{String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 font-memphis-mincho font-extrabold text-[#1A202C] text-[15px] md:text-base leading-snug">
                    {faq.q}
                  </span>
                  <span
                    className={`flex-shrink-0 w-7 h-7 rounded-full bg-white ring-1 ring-[#1A202C]/15 flex items-center justify-center transition-transform duration-300 ${
                      isOpen ? "rotate-45 bg-[#FF3D7F] ring-0" : ""
                    }`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isOpen ? "white" : "#1A202C"} strokeWidth="3" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 md:px-7 pb-5 pt-0 ml-12">
                    <p className="text-[#1A202C]/75 text-[13px] md:text-sm leading-[2]">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
