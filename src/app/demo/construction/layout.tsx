import type { Metadata } from "next";

const title = "南風建設 | 奄美大島の建設・リフォーム（ALPACAデモサイト）";
const description =
  "奄美大島の建設会社「南風建設」のデモサイト。新築住宅・リフォーム・店舗内装・公共工事まで、地域密着の施工イメージを想定したALPACA制作サンプルです。";
const url = "https://alpaca-amami.com/demo/construction";

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

export default function ConstructionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
