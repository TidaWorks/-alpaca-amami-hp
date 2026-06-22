import AgentHeader from "@/components/agent/AgentHeader";
import AgentHero from "@/components/agent/AgentHero";
import AgentPainPoints from "@/components/agent/AgentPainPoints";
import AgentFeatures from "@/components/agent/AgentFeatures";
import AgentUseCases from "@/components/agent/AgentUseCases";
import AgentPricing from "@/components/agent/AgentPricing";
import AgentFlow from "@/components/agent/AgentFlow";
import AgentFAQ from "@/components/agent/AgentFAQ";
import AgentCTA from "@/components/agent/AgentCTA";

export const metadata = {
  title: "アルパカスマート — もう、事務作業に追われない。 | 奄美のAI導入パートナー",
  description:
    "奄美大島発・AIエージェント秘書セットアップ「アルパカスマート」。Gmail / LINE / Google カレンダー / freee / マネーフォワード / kintone 等、50以上のサービスと繋がるあなた専用のAI秘書を、奄美からセットアップします。初期¥70,000＋月額¥15,000、承認ゲート設計＋責任分界契約で安心。",
};

export default function AgentPage() {
  return (
    <div className="overflow-x-hidden">
      <AgentHeader />
      <AgentHero />
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
