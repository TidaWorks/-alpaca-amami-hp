import type { Metadata } from "next";
import { Outfit, Shippori_Antique_B1, Shippori_Mincho, Klee_One, Zen_Kurenaido } from "next/font/google";
import "./globals.css";
import ScrollResetOnReload from "@/components/ScrollResetOnReload";
import ScrollProgress from "@/components/ScrollProgress";
import SmoothScroll from "@/components/SmoothScroll";
import { SITE } from "@/lib/site";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-outfit",
  preload: false,
});

const shipporiGothic = Shippori_Antique_B1({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-shippori-gothic",
  preload: false,
});

const shipporiMincho = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  display: "swap",
  variable: "--font-shippori-mincho",
  // 日本語は字の範囲ごとに百近いファイルに分かれる。先読みすると全部（約6.6MB）を取りに行き、load が 40秒を超えていた
  preload: false,
});

const kleeOne = Klee_One({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-klee",
  preload: false,
});

const zenKurenaido = Zen_Kurenaido({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-zen-kurenaido",
  preload: false,
});

const siteName = "ALPACA";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://alpaca-amami.com";  // プレビューの時だけ書き出し時に差し替える
const siteTitle = "ALPACA | あなたの仕事の、ベストパートナー。";
const siteDescription =
  "ホームページも、システムも、AIの相談も、窓口はひとつ。ホームページ制作（25万円から・税別）、業務システムの開発、会社のIT担当として中に入るAI顧問（月15万円・税別）。鹿児島県奄美市有屋町のALPACA。";
// 共有リンクの画像＝一番上の決定版の画像（10/5 大地さん「共有リンクのここダサい」）
const ogImage = `${siteUrl}/og.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | ALPACA",
  },
  description: siteDescription,
  keywords: ["AI顧問", "AI導入支援", "AIエージェント", "業務の自動化", "システム開発", "ホームページ制作", "奄美大島", "奄美", "鹿児島"],
  authors: [{ name: "ALPACA（作田 大地）" }],
  creator: "ALPACA",
  publisher: "ALPACA",
  formatDetection: {
    telephone: false,
    email: false,
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    siteName,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "あなたの仕事の、ベストパートナー。ALPACA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [ogImage],
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// JSON-LD 構造化データ（LocalBusiness）
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "ALPACA",
  alternateName: "アルパカ",
  description: siteDescription,
  url: siteUrl,
  logo: `${siteUrl}/opengraph-image`,
  image: `${siteUrl}/opengraph-image`,
  telephone: SITE.contact.tel,
  email: SITE.contact.email,
  address: {
    "@type": "PostalAddress",
    addressRegion: "鹿児島県",
    addressLocality: "奄美市有屋町",
    addressCountry: "JP",
  },
  areaServed: [
    {
      "@type": "Place",
      name: "奄美大島",
    },
    {
      "@type": "Place",
      name: "鹿児島県",
    },
  ],
  founder: {
    "@type": "Person",
    name: "作田 大地",
  },
  knowsAbout: ["AI導入支援", "AIエージェント", "業務の自動化", "業務システム開発", "ホームページ制作"],
  // 料金は税別（2026-09-25 の方針）。システム開発は要見積もりなので金額を載せない
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "サービス一覧",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI顧問",
          description:
            "月1〜2回の打ち合わせで、AIに任せる仕事を決め、会社専用のAIエージェントや自動化を作り、社員が使えるまで教える顧問。期間の縛りなし。",
        },
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "150000",
          minPrice: "150000",
          maxPrice: "250000",
          priceCurrency: "JPY",
          valueAddedTaxIncluded: false,
          unitText: "月",
          billingDuration: "P1M",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "システム開発",
          description: "業務に合わせた受託開発。料金は要見積もり。",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "ホームページ制作",
          description: "LP・コーポレートサイトの制作。",
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          price: "250000",
          minPrice: "250000",
          priceCurrency: "JPY",
          valueAddedTaxIncluded: false,
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <meta name="format-detection" content="telephone=no, email=no, address=no" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${outfit.variable} ${shipporiGothic.variable} ${shipporiMincho.variable} ${kleeOne.variable} ${zenKurenaido.variable} font-sans antialiased text-[var(--color-dark-base)] bg-[var(--color-white)] overflow-x-hidden`}
      >
        <SmoothScroll>
          <ScrollProgress />
          <ScrollResetOnReload />
          <main id="main">{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
