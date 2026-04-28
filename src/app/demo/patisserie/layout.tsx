import type { Metadata } from "next";

const title = "Patisserie Soleil | 奄美大島のフレンチパティスリー（ALPACAデモサイト）";
const description =
  "奄美大島のフレンチパティスリー「Patisserie Soleil」のデモサイト。島の素材を活かした本格フランス菓子と焼き立てパンを想定したALPACA制作サンプルです。";
const url = "https://alpaca-amami.com/demo/patisserie";

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

export default function PatisserieDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
