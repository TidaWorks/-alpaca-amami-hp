"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export default function SystemPricing() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const buildItems = [
    "業務分析・ヒアリングは無料",
    "予約・顧客・売上の標準実装",
    "スマホ・PC両対応のダッシュボード",
    "マネージドクラウド構成で安全・高速",
    "AI機能（要約・チャット・自動応答など）はオプション対応",
    "LINE自動化ボットもオプション対応",
  ];

  const maintenanceItems = [
    "サーバー・データベース・APIの管理を代行",
    "機能追加・改善要望への都度対応（基本当日）",
    "障害発生時の即時切り分けと復旧",
    "現場の声を聞いて継続アップデート",
  ];

  return (
    <section
      ref={ref}
      id="pricing"
      className="relative bg-white py-28 md:py-36 px-6 md:px-10 overflow-hidden"
    >
      {/* 雲SVG装飾 */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg className="absolute -top-10 -right-20 w-[420px] h-auto opacity-30" viewBox="0 0 400 200" fill="none">
          <ellipse cx="120" cy="120" rx="80" ry="50" fill="#DCE5FF" />
          <ellipse cx="200" cy="100" rx="100" ry="60" fill="#DCE5FF" />
          <ellipse cx="290" cy="130" rx="70" ry="45" fill="#DCE5FF" />
        </svg>
      </div>

      <div className="relative max-w-[1200px] mx-auto">
        {/* 章扉 */}
        <div className="text-center mb-16 md:mb-20" style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.7s, transform 0.7s",
        }}>
          <p className="inline-block text-[10px] tracking-[0.4em] text-[#2860E1] font-bold mb-5 px-3 py-1 rounded-full bg-[#2860E1]/10">
            料金 — オーダーメイドの見積
          </p>
          <h2 className="text-[#1D2A6E] text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.3] tracking-tight mb-6">
            要件に合わせた、
            <br className="md:hidden" />
            <span className="text-[#2860E1]">オーダーメイド</span>。
          </h2>
          <p className="text-[#2A2E45] text-base md:text-lg leading-loose max-w-2xl mx-auto">
            ヒアリングのあと、必要な機能だけで構成した正式お見積りをお渡しします。
          </p>
        </div>

        {/* プラン2枚 */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-7">
          {/* 構築 */}
          <div
            className="relative bg-white rounded-3xl border border-[#E5E9F5] shadow-[0_4px_20px_rgba(40,96,225,0.06)] hover:shadow-[0_12px_36px_rgba(40,96,225,0.14)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s, box-shadow 0.3s, translate 0.3s",
            }}
          >
            <div className="p-8 md:p-10">
              <span className="inline-block text-[10px] font-bold tracking-[0.3em] text-[#2860E1] mb-5 px-3 py-1 rounded-full bg-[#F4F6FF]">
                業務システムを、ゼロから
              </span>
              <h3 className="text-[#1D2A6E] text-2xl md:text-3xl font-bold mb-3">
                業務システム構築
              </h3>
              <p className="text-[#2A2E45] text-sm leading-loose mb-8">
                ヒアリング・設計・開発・納品までを一気通貫で。最短2週間からスタート可能です。
              </p>

              <div className="mb-8 pb-6 border-b border-[#E5E9F5]">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm text-[#5A6280] font-bold">¥</span>
                  <span className="text-[#1D2A6E] text-5xl md:text-6xl font-bold tabular-nums leading-none">
                    300,000
                  </span>
                  <span className="text-sm text-[#5A6280] font-bold ml-1">〜</span>
                </div>
                <p className="text-xs text-[#5A6280] mt-4 tracking-wide font-bold">納期 2週間〜（規模次第）</p>
              </div>

              <ul className="space-y-3 mb-10">
                {buildItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-[#2860E1]/10 text-[#2860E1] flex items-center justify-center">
                      <Check className="w-3 h-3" strokeWidth={3} aria-hidden="true" />
                    </span>
                    <span className="text-sm text-[#2A2E45] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="group inline-flex items-center gap-2 bg-[#2860E1] text-white font-bold text-sm rounded-full px-6 py-3 hover:bg-[#1D4FCE] transition-all duration-300 shadow-[0_4px_12px_rgba(40,96,225,0.25)] hover:shadow-[0_6px_18px_rgba(40,96,225,0.35)]"
              >
                このプランで相談する
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* 保守 */}
          <div
            className="relative bg-gradient-to-br from-[#F4F6FF] to-[#EEF1FF] rounded-3xl border border-[#2860E1]/15 shadow-[0_8px_28px_rgba(40,96,225,0.12)] hover:shadow-[0_16px_44px_rgba(40,96,225,0.2)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.8s ease 0.42s, transform 0.8s ease 0.42s, box-shadow 0.3s, translate 0.3s",
            }}
          >
            <div className="p-8 md:p-10">
              <span className="inline-block text-[10px] font-bold tracking-[0.3em] text-white mb-5 px-3 py-1 rounded-full bg-[#2860E1]">
                納品後も、ずっと並走
              </span>
              <h3 className="text-[#1D2A6E] text-2xl md:text-3xl font-bold mb-3">
                保守・運用サポート
              </h3>
              <p className="text-[#2A2E45] text-sm leading-loose mb-8">
                システムは作って終わりじゃない、現場の声を聞きながら毎月育てる伴走型。
              </p>

              <div className="mb-8 pb-6 border-b border-[#2860E1]/15">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm text-[#5A6280] font-bold">¥</span>
                  <span className="text-[#1D2A6E] text-5xl md:text-6xl font-bold tabular-nums leading-none">
                    20,000
                  </span>
                  <span className="text-sm text-[#5A6280] font-bold ml-1">〜 / 月</span>
                </div>
                <p className="text-xs text-[#5A6280] mt-4 tracking-wide font-bold">運用規模で調整可能</p>
              </div>

              <ul className="space-y-3 mb-10">
                {maintenanceItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-[#2860E1] text-white flex items-center justify-center">
                      <Check className="w-3 h-3" strokeWidth={3} aria-hidden="true" />
                    </span>
                    <span className="text-sm text-[#2A2E45] leading-relaxed flex-1">{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="group inline-flex items-center gap-2 bg-[#1D2A6E] text-white font-bold text-sm rounded-full px-6 py-3 hover:bg-[#2860E1] transition-all duration-300 shadow-[0_4px_12px_rgba(29,42,110,0.3)] hover:shadow-[0_6px_18px_rgba(40,96,225,0.4)]"
              >
                このプランで相談する
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* 注釈 */}
        <p
          className="text-xs md:text-sm text-[#5A6280] leading-loose mt-12 max-w-3xl mx-auto text-center"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.7s ease 0.7s" }}
        >
          ※ 規模・機能要件により金額は変動します。AI機能組み込み（要約・チャット・自動応答など）、LINE自動化ボット構築（¥80,000〜）、外部API連携（¥50,000〜/件）など個別オプションも対応可能。リリース後の継続伴走・AI活用相談は<a href="/smart" className="text-[#2860E1] font-bold underline-offset-4 hover:underline">アルパカスマート（月¥50,000〜）</a>でもサポート。詳細はヒアリング後の正式お見積りでご確認いただけます（相談は無料）。
        </p>
      </div>
    </section>
  );
}
