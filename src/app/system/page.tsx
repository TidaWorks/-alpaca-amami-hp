import SystemHeader from "@/components/system/SystemHeader";
import SystemHero from "@/components/system/SystemHero";
import SystemPainPoints from "@/components/system/SystemPainPoints";
import SystemFeatures from "@/components/system/SystemFeatures";
import SystemPricing from "@/components/system/SystemPricing";
import SystemFlow from "@/components/system/SystemFlow";
import SystemManifesto from "@/components/system/SystemManifesto";
import SystemFAQ from "@/components/system/SystemFAQ";
import SystemCTA from "@/components/system/SystemCTA";

export const metadata = {
  title: "システム開発 | ALPACA - 奄美大島の業務システム構築",
  description:
    "奄美大島の小規模事業者向けに、予約管理・顧客管理・売上集計などの業務改善システムを構築。データで業務をなめらかに整えます。",
};

export default function SystemPage() {
  return (
    <div className="overflow-x-hidden bg-white">
      <SystemHeader />
      <SystemHero />
      <SystemPainPoints />
      <SystemFeatures />
      <SystemPricing />
      <SystemFlow />
      <SystemManifesto />
      <SystemFAQ />
      <SystemCTA />
    </div>
  );
}
