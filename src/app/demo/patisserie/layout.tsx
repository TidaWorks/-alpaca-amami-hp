import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Patisserie Soleil | 奄美大島のフレンチパティスリー",
  description:
    "奄美大島のフレンチパティスリー「Patisserie Soleil」。島の素材を活かした本格フランス菓子と焼き立てパンをお届けします。",
};

export default function PatisserieDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
