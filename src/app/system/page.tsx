import SystemHeader from "@/components/system/SystemHeader";
import SystemHero from "@/components/system/SystemHero";
import SystemAbout from "@/components/system/SystemAbout";
import SystemPainPoints from "@/components/system/SystemPainPoints";
import SystemFeatures from "@/components/system/SystemFeatures";
import SystemUseCases from "@/components/system/SystemUseCases";
import SystemFlow from "@/components/system/SystemFlow";
import SystemPricing from "@/components/system/SystemPricing";
import SystemFAQ from "@/components/system/SystemFAQ";
import SystemCTA from "@/components/system/SystemCTA";

export const metadata = {
  title: "業務システム開発 | ALPACA - 奄美大島の現場に合わせた仕組みづくり",
  description:
    "奄美大島の小規模事業者向けに、予約管理・顧客管理・売上集計などの業務システムを現場ヒアリングから構築。仕組み化で時間と利益を取り戻します。",
};

export default function SystemPage() {
  return (
    <div className="overflow-x-hidden">
      <SystemHeader />
      <SystemHero />
      <SystemAbout />
      <SystemPainPoints />
      <SystemFeatures />
      <SystemUseCases />
      <SystemFlow />
      <SystemPricing />
      <SystemFAQ />
      <SystemCTA />
    </div>
  );
}
