import type { Metadata } from "next";

const title = "あまみ果樹園 太陽のしずく | 奄美大島の直売農園（ALPACAデモサイト）";
const description =
  "奄美大島の直売農園「あまみ果樹園 太陽のしずく」のデモサイト。完熟マンゴーやパッションフルーツなど、南国の恵みを直送するイメージを想定したALPACA制作サンプルです。";
const url = "https://alpaca-amami.com/demo/farm";

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

export default function FarmDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
