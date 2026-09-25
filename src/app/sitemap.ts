import type { MetadataRoute } from "next";

const SITE_URL = "https://alpaca-amami.com";

/**
 * 載せるのはトップと規約類だけ。
 * 古い方針の下層（/web /system /smart /demo/*）はページとしては残すが、作り直すまで一覧には載せない（2026-09-25）
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: SITE_URL, lastModified, changeFrequency: "monthly", priority: 1.0 },
    { url: `${SITE_URL}/tokushoho`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
