import WebHeader from "@/components/web/WebHeader";
import WebHero from "@/components/web/WebHero";
import WebPainPoints from "@/components/web/WebPainPoints";
import WebFeatures from "@/components/web/WebFeatures";
import WebPricing from "@/components/web/WebPricing";
import WebFlow from "@/components/web/WebFlow";
import WebManifesto from "@/components/web/WebManifesto";
import WebFAQ from "@/components/web/WebFAQ";
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
      <WebPainPoints />
      <WebFeatures />
      <WebPricing />
      <WebFlow />
      <WebManifesto />
      <WebFAQ />
      <WebCTA />
    </div>
  );
}
