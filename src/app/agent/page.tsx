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
  title: "LINE自動応答ボット | ALPACA - 奄美のお店の中の人（AI版）",
  description:
    "営業時間外も24時間お客様に返事するLINEボットを構築。奄美の飲食店・宿・サロン・観光業向け。月¥8,000〜、構築費¥50,000〜の小さくはじめるAIエージェント。",
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
