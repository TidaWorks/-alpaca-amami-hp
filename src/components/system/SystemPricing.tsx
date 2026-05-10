"use client";

import { useEffect, useRef, useState } from "react";

export default function SystemPricing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative bg-white py-20 md:py-28 px-6 scroll-mt-20 overflow-hidden border-t border-[#E5E7EB]"
    >
      <style>{`
        @keyframes sysPricingShine {
          0% { transform: translateX(-120%) skewX(-12deg); }
          60%, 100% { transform: translateX(220%) skewX(-12deg); }
        }
        @keyframes sysHeroFloat {
          0%, 100% { transform: translateY(0) rotate(3deg); }
          50% { transform: translateY(-3px) rotate(3deg); }
        }
      `}</style>
      <div className="relative max-w-5xl mx-auto">
        <div
          className="mb-12 md:mb-14 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <div className="inline-flex items-center gap-3 mb-5">
            <p className="text-[11px] font-bold tracking-[0.4em] text-[#1D3A8A]">
              CHAPTER 03
            </p>
            <span className="w-8 h-[1px] bg-[#1D3A8A]/30" />
            <p className="text-[11px] font-bold tracking-[0.3em] text-[#0A1228]/60">
              PRICING
            </p>
          </div>
          <h2 className="text-[#1A202C] text-3xl md:text-5xl font-extrabold leading-tight mb-3">
            業務にあわせた、
            <br className="md:hidden" />
            <span className="text-[#635BFF]">オーダーメイド</span>
            の見積もり。
          </h2>
          <p className="text-[#1A202C]/70 text-sm">
            ヒアリング後、必要な機能だけで構成したお見積りをお渡しします。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
          {/* 構築費用 */}
          <div
            className="group relative bg-white border border-[#E5E7EB] rounded-2xl shadow-sm hover:shadow-2xl hover:-translate-y-1 hover:border-[#635BFF]/40 overflow-hidden"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease 100ms, transform 0.5s ease 100ms, box-shadow 0.4s ease, border-color 0.3s ease, translate 0.3s ease",
            }}
          >
            {/* ホバー時のサブ光彩 */}
            <span
              aria-hidden="true"
              className="absolute -top-20 -right-20 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-500"
              style={{ background: "radial-gradient(circle, rgba(99,91,255,0.18) 0%, transparent 70%)" }}
            />
            <div className="p-7 md:p-8">
              <span className="inline-block text-[10px] font-black text-white bg-[#635BFF] rounded-full px-3 py-1 mb-5 tracking-[0.2em]">
                INITIAL
              </span>
              <h3 className="text-[#1A202C] text-2xl md:text-3xl font-extrabold mb-2">
                業務システム構築
              </h3>
              <p className="text-[#1A202C]/65 text-sm mb-6">
                予約・顧客・売上の一元管理を、最短2週間で。
              </p>

              <div className="mb-7 pb-6 border-b border-dashed border-[#E5E7EB]">
                <div className="flex items-baseline gap-1">
                  <span className="text-base text-[#1A202C]/60 font-bold">¥</span>
                  <span className="text-5xl md:text-6xl font-extrabold text-[#1A202C] tabular-nums leading-none">
                    300,000
                  </span>
                  <span className="text-base text-[#1A202C]/60 ml-1 font-bold">〜</span>
                </div>
                <p className="text-xs text-[#1A202C]/55 mt-3">
                  要件によりお見積り / 納期 2週間〜（規模次第）
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  "業務分析・ヒアリングは無料",
                  "予約管理 / 顧客台帳 / 売上集計の標準実装",
                  "スマホ・PC両対応のダッシュボード",
                  "マネージドクラウド構成で安全・高速",
                  "LINE連携（Botや自動応答）はオプション対応",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg className="mt-[3px] flex-shrink-0 w-4 h-4 text-[#635BFF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-sm text-[#1A202C] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="group/btn relative block w-full text-center text-sm font-black text-white bg-[#FF6B35] rounded-full py-3.5 shadow-md hover:shadow-xl hover:bg-[#15296B] hover:scale-[1.02] active:scale-[0.98] overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2 transition-all duration-200"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover/btn:opacity-100"
                  style={{
                    background: "linear-gradient(110deg, transparent 35%, rgba(255,255,255,0.4) 50%, transparent 65%)",
                    animation: "sysPricingShine 1.4s ease-out",
                  }}
                />
                <span className="relative z-10">このプランで相談する →</span>
              </a>
            </div>
          </div>

          {/* 保守 */}
          <div
            className="group relative bg-gradient-to-br from-[#635BFF]/5 to-[#FFC400]/5 border border-[#E5E7EB] rounded-2xl shadow-sm hover:shadow-2xl hover:-translate-y-1 hover:border-[#FFC400]/40 overflow-hidden"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease 220ms, transform 0.5s ease 220ms, box-shadow 0.4s ease, border-color 0.3s ease, translate 0.3s ease",
            }}
          >
            {/* ホバー時のサブ光彩 */}
            <span
              aria-hidden="true"
              className="absolute -top-20 -right-20 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-500"
              style={{ background: "radial-gradient(circle, rgba(255,196,0,0.25) 0%, transparent 70%)" }}
            />
            <div className="absolute top-3 right-3 z-10">
              <div
                className="bg-[#FFC400] text-[#1A202C] text-[10px] font-black tracking-widest px-3 py-1.5 rounded shadow-md"
                style={{ animation: "sysHeroFloat 3.6s ease-in-out infinite" }}
              >
                ★ 推奨
              </div>
            </div>

            <div className="p-7 md:p-8">
              <span className="inline-block text-[10px] font-black text-[#1A202C] bg-[#FFC400] rounded-full px-3 py-1 mb-5 tracking-[0.2em]">
                SUPPORT
              </span>
              <h3 className="text-[#1A202C] text-2xl md:text-3xl font-extrabold mb-2">
                保守・運用サポート
              </h3>
              <p className="text-[#1A202C]/65 text-sm mb-6">
                システムは作って終わりじゃない。育て続ける伴走型サポート。
              </p>

              <div className="mb-7 pb-6 border-b border-dashed border-[#E5E7EB]">
                <div className="flex items-baseline gap-1">
                  <span className="text-base text-[#1A202C]/60 font-bold">¥</span>
                  <span className="text-5xl md:text-6xl font-extrabold text-[#1A202C] tabular-nums leading-none">
                    20,000
                  </span>
                  <span className="text-base text-[#1A202C]/60 ml-1 font-bold">〜 / 月</span>
                </div>
                <p className="text-xs text-[#1A202C]/55 mt-3">
                  運用規模で調整 / 自主管理なら買い切り対応も可
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  "サーバー・データベース・APIの管理を全て代行",
                  "機能追加・改善要望への都度対応（基本当日）",
                  "障害発生時の即時切り分けと復旧対応",
                  "月次レポートで改善ポイントをご提案",
                  "現場の声に合わせて、システムを継続アップデート",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg className="mt-[3px] flex-shrink-0 w-4 h-4 text-[#FFC400]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-sm text-[#1A202C] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="group/btn relative block w-full text-center text-sm font-black text-[#1A202C] bg-[#FFC400] rounded-full py-3.5 shadow-md hover:shadow-xl hover:brightness-95 hover:scale-[1.02] active:scale-[0.98] overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400] focus-visible:ring-offset-2 transition-all duration-200"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover/btn:opacity-100"
                  style={{
                    background: "linear-gradient(110deg, transparent 35%, rgba(255,255,255,0.5) 50%, transparent 65%)",
                    animation: "sysPricingShine 1.4s ease-out",
                  }}
                />
                <span className="relative z-10">保守について相談する →</span>
              </a>
            </div>
          </div>
        </div>

        {/* 注釈 */}
        <p
          className="text-xs text-[#1A202C]/55 leading-relaxed mt-8 max-w-3xl transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transitionDelay: "350ms",
          }}
        >
          ※ 規模・機能要件により金額は変動します。LINE Bot構築（¥80,000〜）、外部API連携（¥50,000〜/件）など個別オプションも対応可能。
          詳細はヒアリング後の正式お見積りでご確認いただけます（相談は無料）。
        </p>
      </div>
    </section>
  );
}
