import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "珊瑚の宿 いそかぜ | 奄美大島のゲストハウス",
  description:
    "奄美大島のゲストハウス「珊瑚の宿 いそかぜ」。海まで徒歩すぐの好立地で、島暮らしのようなゆったりとした滞在をお楽しみいただけます。",
};

export default function GuesthouseDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
