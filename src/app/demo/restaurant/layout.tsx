import type { Metadata } from "next";

const title = "Bistro ADAN | 奄美大島のビストロダイニング（ALPACAデモサイト）";
const description =
  "奄美大島・名瀬の屋仁川通りを舞台にしたビストロ「ADAN」のデモサイト。島の食材を洋風にアレンジした創作料理と厳選ワインを想定したALPACA制作サンプルです。";
const url = "https://alpaca-amami.com/demo/restaurant";

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

export default function RestaurantDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
