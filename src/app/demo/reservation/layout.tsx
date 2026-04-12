import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "予約管理システム | ALPACA デモ",
  description:
    "美容室向け予約管理システムのデモ。カレンダー表示、タイムライン、スタッフ別管理、新規予約の追加が可能です。",
};

export default function ReservationDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
