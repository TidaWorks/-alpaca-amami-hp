import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bistro ADAN | 奄美大島のビストロダイニング",
  description:
    "奄美大島・名瀬の屋仁川通りにあるビストロ「ADAN」。島の食材を洋風にアレンジした創作料理と、厳選ワイン・黒糖焼酎をご用意。カウンター席・テーブル席あり。",
};

export default function RestaurantDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
