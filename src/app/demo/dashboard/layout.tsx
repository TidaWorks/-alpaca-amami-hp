import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "業務ダッシュボード | ALPACA デモ",
  description:
    "美容室向け業務ダッシュボードのデモ。月間売上グラフ、本日の予約一覧、顧客数・売上サマリーをひと目で確認できます。",
};

export default function DashboardDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
