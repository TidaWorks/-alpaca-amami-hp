"use client";

import { ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

/**
 * Section 11: Notification (SmartHR top-notification)
 * お知らせリスト3件＋一覧リンク。
 */
const notifications = [
  { date: "2026/05/13", title: "アルパカAI顧問サービス『アルパカスマート』の提供を開始しました" },
  { date: "2026/05/10", title: "観光ブランドサイトのデモを公開しました" },
  { date: "2026/04/27", title: "GWの営業日について（4/27〜5/6は不定期返信）" },
];

export default function HomeNotification() {
  const { ref, revealed } = useReveal<HTMLDivElement>();

  return (
    <section
      ref={ref}
      className="relative py-16 md:py-20 px-6 bg-white"
      aria-label="お知らせ"
    >
      <div
        className="max-w-[1184px] mx-auto transition-all duration-700"
        style={{
          opacity: revealed ? 1 : 0,
          transform: revealed ? "translateY(0)" : "translateY(12px)",
        }}
      >
        <div className="flex items-end justify-between mb-6 md:mb-8 flex-wrap gap-3">
          <h2
            className="font-bold text-[#23221F]"
            style={{ fontSize: "clamp(1.5rem, 3vw, 1.75rem)", lineHeight: 1.4 }}
          >
            お知らせ
          </h2>
          <a
            href="#contact"
            className="inline-flex items-center gap-1 text-sm font-bold hover:underline"
            style={{ color: "#0B8C6E" }}
          >
            お知らせ一覧
            <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
          </a>
        </div>
        <ul className="border-t border-[#DADADA]/70">
          {notifications.map((n) => (
            <li
              key={n.date + n.title}
              className="flex flex-col md:flex-row md:items-center gap-1 md:gap-6 py-4 md:py-5 border-b border-[#DADADA]/70"
            >
              <time className="text-sm font-bold tabular-nums text-[#4C4C4C] md:w-28 flex-shrink-0">
                {n.date}
              </time>
              <p className="text-sm md:text-base text-[#23221F] leading-relaxed">
                {n.title}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
