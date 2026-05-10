"use client";

import { useEffect, useRef, useState } from "react";

const faqs = [
  {
    q: "ALPACAでは何ができるの？",
    a: "業務改善システム開発（メイン）、ホームページ・ランディングページ制作、それぞれの保守運用までワンストップでお手伝いします。「うちの業務に合うのは何？」というご相談から無料でお受けしています。",
  },
  {
    q: "見積もりや相談は無料ですか？",
    a: "はい、ご相談・お見積りはすべて無料です。島内なら直接お伺いしてヒアリングしてから、正式なお見積りをお渡しします。",
  },
  {
    q: "料金はどれくらいから？",
    a: "ランディングページ制作 ¥70,000〜 / ホームページ ¥250,000〜 / 業務システム ¥300,000〜 が目安です。素材のご準備状況や機能要件で変動します。詳細は各サービスページをご覧ください。",
  },
  {
    q: "納期はどれくらい？",
    a: "ランディングページは3日〜1週間、ホームページは2〜4週間、業務システムは2週間〜（規模次第）が目安です。お急ぎの場合もご相談ください。",
  },
  {
    q: "島外でも依頼できる？",
    a: "オンラインミーティング＋リモートで対応可能です。対面打ち合わせは奄美島内のみとなりますが、進行管理は遠方の方も問題なく行えます。",
  },
  {
    q: "公開後のサポートはある？",
    a: "月額の保守サポート（ランディングページ ¥5,000〜 / HP ¥10,000〜 / システム ¥20,000〜）で、修正・サーバー管理・運用相談まで継続サポート。買い切りもご相談可能です。",
  },
];

export default function HomeFAQ() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative bg-[#F8FAFC] py-20 md:py-28 px-6 scroll-mt-20 overflow-hidden border-t border-[#E5E7EB]"
    >
      <div className="relative max-w-3xl mx-auto">
        <div
          className="mb-12 md:mb-14 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <div className="inline-flex items-center gap-3 mb-3">
            <p className="text-[11px] font-bold tracking-[0.4em] text-[#1D3A8A]">
              CHAPTER 05
            </p>
            <span className="w-8 h-[1px] bg-[#1D3A8A]/30" />
            <p className="text-[11px] font-bold tracking-[0.3em] text-[#0A1228]/60">
              FAQ
            </p>
          </div>
          <h2 className="text-[#1A202C] text-3xl md:text-5xl font-extrabold leading-tight">
            よく
            <span className="text-[#12C998]">いただく質問</span>
            。
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const open = openIdx === i;
            return (
              <div
                key={faq.q}
                className={`group bg-white border rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 ${
                  open ? "border-[#635BFF]/40 shadow-md" : "border-[#E5E7EB]"
                }`}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(16px)",
                  transition: `opacity 0.7s ease ${100 + i * 70}ms, transform 0.7s ease ${100 + i * 70}ms, box-shadow 0.3s, border-color 0.3s`,
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(open ? null : i)}
                  className="w-full flex items-start gap-4 text-left px-5 md:px-6 py-4 md:py-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#635BFF] focus-visible:ring-offset-2 rounded-2xl"
                  aria-expanded={open}
                >
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full bg-[#635BFF] flex items-center justify-center font-extrabold text-sm text-white transition-transform duration-300 ${open ? "scale-110" : "group-hover:scale-105"}`}>
                    Q
                  </span>
                  <span className={`flex-1 text-base md:text-lg font-bold leading-relaxed pt-1 transition-colors duration-200 ${open ? "text-[#635BFF]" : "text-[#1A202C]"}`}>
                    {faq.q}
                  </span>
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      open ? "bg-[#635BFF] border-[#635BFF] rotate-45" : "bg-[#F8FAFC] border-[#E5E7EB]"
                    }`}
                    aria-hidden="true"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={open ? "#FFFFFF" : "#635BFF"} strokeWidth="3" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: open ? 320 : 0 }}
                >
                  <div className="px-5 md:px-6 pb-5 md:pb-6 flex items-start gap-4 border-t border-dashed border-[#E5E7EB] pt-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#12C998] flex items-center justify-center font-extrabold text-sm text-white">
                      A
                    </span>
                    <p className="flex-1 text-sm md:text-base text-[#1A202C]/75 leading-relaxed pt-1">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
