import AgentHeader from "@/components/agent/AgentHeader";
import AgentHero from "@/components/agent/AgentHero";
import AgentAbout from "@/components/agent/AgentAbout";
import AgentPainPoints from "@/components/agent/AgentPainPoints";
import AgentFeatures from "@/components/agent/AgentFeatures";
import AgentUseCases from "@/components/agent/AgentUseCases";
import AgentPricing from "@/components/agent/AgentPricing";
import AgentFlow from "@/components/agent/AgentFlow";
import AgentFAQ from "@/components/agent/AgentFAQ";
import AgentCTA from "@/components/agent/AgentCTA";

export const metadata = {
  title: "アルパカAI顧問 | ALPACA - 奄美のあなたの会社にAI担当者を月¥50,000で",
  description:
    "奄美大島の事業者向けAI顧問サービス。LINE公式アカウントでの相談無制限、月5時間以内の実装込み、月¥50,000の継続サブスクリプション。AIの導入と運用をまるごとサポート。",
};

export default function AgentPage() {
  return (
    <div className="overflow-x-hidden">
      <AgentHeader />
      <AgentHero />
      <AgentAbout />
      <AgentPainPoints />
      <AgentFeatures />
      <AgentUseCases />
      <AgentPricing />
      <AgentFlow />
      <AgentFAQ />
      <AgentCTA />
    </div>
  );
}
