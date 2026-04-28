"use client";

import { useEffect, useRef, useState } from "react";

const faqs = [
  {
    q: "システム開発と業務改善コンサルの違いは？",
    a: "ALPACAは「実際に動くもの」を作ります。コンサルだけで終わらず、データベースもUIも実装し、現場で運用してもらうところまで伴走するのが特徴です。",
  },
  {
    q: "予算はどれくらいから？",
    a: "業務システム構築は ¥300,000 〜 となります。要件のヒアリング後、機能を絞った正式お見積りをお渡しします。「これだけは外せない」「ここは将来追加」など段階的な相談も可能です。",
  },
  {
    q: "既存のシステムからの乗り換えは可能？",
    a: "可能です。データの移行（CSVや既存DBからのインポート）も対応します。乗り換え時のダブル運用期間も含めて計画を立てます。",
  },
  {
    q: "サーバーやデータベースは自社で持てる？",
    a: "ご希望によります。標準ではSupabase（DB）+Vercel（ホスティング）構成。ご自身で管理されたい場合は別構成（自社サーバー等）にも対応可能です。",
  },
  {
    q: "保守なしで買い切りでお願いできる？",
    a: "可能です。サーバー・データベース・APIを全てご自身で管理いただける前提で、買い切り対応も承ります。ただし障害時のサポートは別途ご相談となります。",
  },
  {
    q: "島外の事業者でも依頼できる？",
    a: "オンラインミーティング＋リモート開発で進められます。対面打ち合わせは奄美島内のみ可能ですが、進行管理は遠方の方も問題ありません。",
  },
  {
    q: "LINE Bot や予約システムは追加できる？",
    a: "オプションで対応可能です。LINE Bot構築は ¥80,000〜、予約フォームの公開ページ追加は ¥50,000〜（一例）。ご要件に合わせてお見積りします。",
  },
];

export default function SystemFAQ() {
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
      className="relative bg-white py-20 md:py-28 px-6 scroll-mt-20 overflow-hidden border-t border-[#E5E7EB]"
    >
      <div className="relative max-w-3xl mx-auto">
        <div
          className="mb-12 md:mb-14 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="bg-[#635BFF] text-white font-black text-[11px] tracking-widest px-2.5 py-1 rounded">
              07
            </span>
            <span className="text-[11px] font-bold tracking-[0.3em] text-[#1A202C]">FAQ</span>
          </div>
          <h2 className="text-[#1A202C] text-3xl md:text-5xl font-extrabold leading-tight">
            よく
            <span className="text-[#635BFF]">いただく質問</span>
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
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FFC400] flex items-center justify-center font-extrabold text-sm text-[#1A202C]">
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
