import type { MetadataRoute } from "next";

const SITE_URL = "https://alpaca-amami.com";

const demoSlugs = [
  "salon",
  "restaurant",
  "guesthouse",
  "construction",
  "diving",
  "patisserie",
  "camp",
  "osteopathic",
  "farm",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const mainPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/web`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/system`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/smart`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  const demoPages: MetadataRoute.Sitemap = demoSlugs.map((slug) => ({
    url: `${SITE_URL}/demo/${slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...mainPages, ...demoPages];
}
