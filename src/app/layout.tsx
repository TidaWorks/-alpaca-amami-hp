import type { Metadata } from "next";
import { Noto_Sans_JP, Outfit, Shippori_Antique_B1, Shippori_Mincho } from "next/font/google";
import "./globals.css";
import ScrollResetOnReload from "@/components/ScrollResetOnReload";
import ScrollProgress from "@/components/ScrollProgress";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
  variable: "--font-noto",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-outfit",
});

const shipporiGothic = Shippori_Antique_B1({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-shippori-gothic",
});

const shipporiMincho = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-shippori-mincho",
});

const siteName = "ALPACA";
const siteUrl = "https://alpaca-amami.com";
const siteTitle = "ALPACA | 奄美大島のWeb・システム制作スタジオ";
const siteDescription =
  "奄美大島の事業者向けWeb・システム制作スタジオALPACA。ホームページ制作、業務システム開発、LINE連携、保守運用まで、島のビジネスの「困った」を仕組みで解決します。";
const ogImage = `${siteUrl}/opengraph-image`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | ALPACA",
  },
  description: siteDescription,
  keywords: [
    "奄美大島",
    "Web制作",
    "ホームページ制作",
    "業務システム開発",
    "システム開発",
    "予約管理システム",
    "顧客管理",
    "LINE予約",
    "保守運用",
    "奄美",
    "鹿児島",
    "島のIT",
  ],
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
        alt: "ALPACA - 奄美大島のWeb・システム制作スタジオ",
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
  telephone: "080-2790-6757",
  email: "alpaca.amami@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressRegion: "鹿児島県",
    addressLocality: "奄美大島",
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
  priceRange: "¥¥",
  knowsAbout: [
    "Web制作",
    "業務システム開発",
    "ホームページ制作",
    "予約管理システム",
    "顧客管理システム",
    "LINE連携",
    "保守運用サポート",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "サービス一覧",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "ホームページ制作",
          description:
            "店舗サイト・コーポレートサイト・LP制作。スマホ対応、お問い合わせフォーム付き。",
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          price: "150000",
          priceCurrency: "JPY",
          minPrice: "150000",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "オーダーメイドシステム開発",
          description:
            "予約管理・顧客管理・売上集計など、業務に合わせたシステムをゼロから構築。",
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          price: "300000",
          priceCurrency: "JPY",
          minPrice: "300000",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "保守・運用サポート",
          description:
            "サーバー・ドメイン管理、バグ修正、小さな変更対応を月額で。",
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          price: "12000",
          priceCurrency: "JPY",
          minPrice: "12000",
          billingDuration: "P1M",
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
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${notoSansJP.variable} ${outfit.variable} ${shipporiGothic.variable} ${shipporiMincho.variable} font-sans antialiased text-[var(--color-dark-base)] bg-[var(--color-white)] overflow-x-hidden`}
      >
        <ScrollProgress />
        <ScrollResetOnReload />
        {children}
      </body>
    </html>
  );
}
