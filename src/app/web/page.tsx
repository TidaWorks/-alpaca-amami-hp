import WebHeader from "@/components/web/WebHeader";
import WebHero from "@/components/web/WebHero";
import WebFeatures from "@/components/web/WebFeatures";
import WebPricing from "@/components/web/WebPricing";
import WebFlow from "@/components/web/WebFlow";
import WebCTA from "@/components/web/WebCTA";

export const metadata = {
  title: "Web制作 | ALPACA - 奄美大島のホームページ制作",
  description:
    "奄美大島の小規模事業者向けホームページ制作。スマホ対応・SEO設定込み。島内で対面打ち合わせできます。",
};

export default function WebPage() {
  return (
    <div className="overflow-x-hidden">
      <WebHeader />
      <WebHero />
      <WebFeatures />
      <WebPricing />
      <WebFlow />
      <WebCTA />
    </div>
  );
}
