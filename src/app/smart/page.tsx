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
  title: "アルパカスマート | ALPACA - 業務を、スマートに。いつでも相談できるAI担当者を月¥50,000で",
  description:
    "奄美大島の事業者向け月額制AIサポート「アルパカスマート」。LINE公式アカウントでの相談無制限、月5時間以内の軽実装込み、追加実装は¥5,000/時間。最低契約期間3ヶ月。業務をAIでスマートにする伴走サービス。",
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
