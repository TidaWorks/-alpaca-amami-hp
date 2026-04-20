"use client";

import { useFadeIn } from "@/hooks/useFadeIn";

export default function Services() {
  const fade1 = useFadeIn();
  const fade2 = useFadeIn();

  return (
    <section id="services" className="relative py-20 md:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="mb-14">
          <p className="text-xs font-semibold tracking-[0.25em] text-[#0D9488] mb-3">SERVICE</p>
          <h2 className="text-3xl md:text-4xl font-black text-gray-800 leading-tight">
            サービス内容
          </h2>
          <p className="text-gray-500 text-sm mt-3 max-w-lg">
            業務の「困った」を仕組みで解決。システム構築からWeb制作まで対応します。
          </p>
        </div>

        {/* システム開発（メイン） */}
        <div ref={fade1.ref} className={`bg-white border border-gray-100 rounded-2xl p-8 md:p-10 mb-6 shadow-sm hover:shadow-md transition-all duration-700 ${fade1.className}`}>
          <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12">
            <div className="md:w-1/2">
              <span className="inline-block text-[10px] text-[#0D9488] border border-[#0D9488]/30 bg-[#0D9488]/10 rounded-full px-3 py-1 mb-4 tracking-wide font-medium">
                メインサービス
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-gray-800 mb-3">業務改善システム構築</h3>
              <p className="text-2xl font-black text-[#0D9488] mb-1">
                ¥300,000<span className="text-sm font-medium text-gray-500">〜（要見積）</span>
              </p>
              <p className="text-xs text-gray-500">納期：規模に応じてご相談</p>
            </div>
            <div className="md:w-1/2">
              <p className="text-sm text-gray-500 leading-relaxed mb-5">
                予約管理、顧客管理、売上集計など、業務フローに合わせたオーダーメイドのシステムを構築します。紙・Excelからの脱却を支援します。
              </p>
              <ul className="space-y-2 mb-5">
                {[
                  "業務フローに合わせたオーダーメイド設計",
                  "予約管理・顧客管理・売上集計など",
                  "スマホ対応・管理画面・印刷機能",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-[5px] flex-shrink-0 w-[5px] h-[5px] rounded-full bg-[#0D9488]" />
                    <span className="text-xs text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-3.5">
                <p className="text-xs font-bold text-gray-700 mb-1">納品後の保守サポート（¥20,000/月）</p>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  納品して終わりではありません。サーバー・ドメイン管理、不具合修正、操作に関するご質問、画面の変更対応などを月額でサポートします。「使い方がわからない」「ここを変えたい」も、メッセージひとつで対応します。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Web制作 + 保守（サブ：コンパクトにまとめる） */}
        <div ref={fade2.ref} className={`mt-10 border-t border-gray-200 pt-8 transition-all duration-700 ${fade2.className}`}>
          <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-16">
            <div className="md:w-1/2">
              <h4 className="text-sm font-bold text-gray-700 mb-2">Web制作</h4>
              <p className="text-xs text-gray-500 leading-relaxed mb-2">LP ¥70,000〜 / HP ¥150,000〜</p>
              <a href="/web" className="text-[#0D9488] text-xs font-medium hover:text-[#0F766E] transition-colors">
                詳細・デモサイトを見る →
              </a>
            </div>
            <div className="md:w-1/2">
              <h4 className="text-sm font-bold text-gray-700 mb-2">保守サポート</h4>
              <p className="text-xs text-gray-500 leading-relaxed">LP ¥5,000〜/月 / HP ¥10,000〜/月 / システム ¥20,000〜/月</p>
              <p className="text-xs text-gray-500 mt-1">サーバー管理込み・当日対応。自主管理なら買い切りも可</p>
            </div>
          </div>
        </div>

        {/* 注釈 */}
        <div className="text-gray-500 text-xs leading-relaxed mt-8 space-y-1">
          <p>※ 料金は案件の規模・機能数によって変動します。お見積りは無料です。</p>
          <p>※ 写真・ロゴ等の素材はお客様にご用意いただきます。</p>
          <p>※ 初回相談無料。まずはお気軽にお問い合わせください。</p>
        </div>
      </div>
    </section>
  );
}
