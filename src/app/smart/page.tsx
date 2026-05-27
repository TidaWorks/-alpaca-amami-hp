import AgentHeader from "@/components/agent/AgentHeader";
import AgentHero from "@/components/agent/AgentHero";
import AgentPainPoints from "@/components/agent/AgentPainPoints";
import AgentFeatures from "@/components/agent/AgentFeatures";
import AgentPricing from "@/components/agent/AgentPricing";
import AgentFlow from "@/components/agent/AgentFlow";
import AgentFAQ from "@/components/agent/AgentFAQ";
import AgentCTA from "@/components/agent/AgentCTA";

export const metadata = {
  title: "アルパカスマート — 業務を、スマートに。月¥30,000のAI担当者",
  description:
    "奄美大島発・月額制AIサポート「アルパカスマート」。チャットで相談無制限、軽サポート込み。本格実装は別途お見積もり（顧問特典価格）。いつでも月単位で解約可能。業務をAIでスマートにする伴走サービス。",
};

export default function AgentPage() {
  return (
    <div className="overflow-x-hidden">
      <AgentHeader />
      <AgentHero />
      <AgentPainPoints />
      <AgentFeatures />
      <AgentPricing />
      <AgentFlow />
      <AgentFAQ />
      <AgentCTA />
    </div>
  );
}
