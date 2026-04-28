import type { Metadata } from "next";

const title = "島つむぎ整骨院 | 奄美大島の整骨院（ALPACAデモサイト）";
const description =
  "奄美大島の整骨院「島つむぎ整骨院」のデモサイト。肩こり・腰痛・スポーツ障害など、一人ひとりに合わせた施術提案を想定したALPACA制作サンプルです。";
const url = "https://alpaca-amami.com/demo/osteopathic";

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

export default function OsteopathicDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
