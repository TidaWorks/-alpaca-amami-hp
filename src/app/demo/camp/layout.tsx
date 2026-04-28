import type { Metadata } from "next";

const title = "AMAMI FOREST CAMP | 奄美大島のグランピング・キャンプ場（ALPACAデモサイト）";
const description =
  "奄美大島のグランピング・キャンプ場「AMAMI FOREST CAMP」のデモサイト。手ぶらBBQや海まで徒歩5分の立地を想定したALPACA制作サンプルです。";
const url = "https://alpaca-amami.com/demo/camp";

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
export default function CampDemoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
