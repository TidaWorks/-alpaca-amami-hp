import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hair Salon kukuru | 奄美大島の美容室",
  description:
    "奄美大島の美容室「Hair Salon kukuru」。カット・カラー・パーマなど、島のリラックス空間であなたらしいスタイルをご提案します。",
};

export default function SalonDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
