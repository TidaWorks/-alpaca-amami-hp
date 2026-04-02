import type { Metadata } from "next";
import { Noto_Sans_JP, Outfit } from "next/font/google";
import "./globals.css";

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

const siteName = "TIDA WORKS";
const siteUrl = "https://tidaworks.com";
const siteDescription =
  "奄美大島を拠点に業務システム開発・Web制作・保守運用を提供するTIDA WORKS。予約管理・顧客管理・売上集計など、島のビジネスの「困った」を仕組みで解決します。";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TIDA WORKS | 奄美大島の業務システム開発・Web制作",
    template: "%s | TIDA WORKS",
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
  authors: [{ name: "TIDA WORKS（作田 大地）" }],
  creator: "TIDA WORKS",
  publisher: "TIDA WORKS",
  formatDetection: {
    telephone: false,
    email: false,
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    siteName,
    title: "TIDA WORKS | 奄美大島の業務システム開発・Web制作",
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: "TIDA WORKS | 奄美大島の業務システム開発・Web制作",
    description: siteDescription,
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
  name: "TIDA WORKS",
  alternateName: "ティダ ワークス",
  description: siteDescription,
  url: siteUrl,
  logo: `${siteUrl}/opengraph-image`,
  image: `${siteUrl}/opengraph-image`,
  telephone: "",
  email: "tida1997amami@gmail.com",
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
        className={`${notoSansJP.variable} ${outfit.variable} font-sans antialiased text-[var(--color-dark-base)] bg-[var(--color-white)] overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
