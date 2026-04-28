import type { Metadata } from "next";

const title = "珊瑚の宿 いそかぜ | 奄美大島のゲストハウス（ALPACAデモサイト）";
const description =
  "奄美大島のゲストハウス「珊瑚の宿 いそかぜ」のデモサイト。海まで徒歩すぐの好立地で、島暮らしのような滞在を想定したALPACA制作サンプルです。";
const url = "https://alpaca-amami.com/demo/guesthouse";

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

export default function GuesthouseDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
