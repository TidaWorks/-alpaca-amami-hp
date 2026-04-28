import type { Metadata } from "next";

const title = "BLUE AMAMI | 奄美大島のダイビングショップ（ALPACAデモサイト）";
const description =
  "奄美大島のダイビングショップ「BLUE AMAMI」のデモサイト。体験ダイビングからファンダイビングまで、奄美の海を楽しむコースを想定したALPACA制作サンプルです。";
const url = "https://alpaca-amami.com/demo/diving";

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

export default function DivingDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
