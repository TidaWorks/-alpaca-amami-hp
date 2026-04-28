import type { Metadata } from "next";

const title = "Hair Salon kukuru | 奄美大島の美容室（ALPACAデモサイト）";
const description =
  "奄美大島の美容室「Hair Salon kukuru」のデモサイト。カット・カラー・パーマなど、島のリラックス空間でのスタイル提案を想定したALPACA制作サンプルです。";
const url = "https://alpaca-amami.com/demo/salon";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url,
    siteName: "ALPACA",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function SalonDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
