import HomeLogoIntro from "@/components/home/HomeLogoIntro";
import HomeHeader from "@/components/home/HomeHeader";
import HomeHero from "@/components/home/HomeHero";
import HomeSolution from "@/components/home/HomeSolution";
import HomeService from "@/components/home/HomeService";
import HomeWhyChosen from "@/components/home/HomeWhyChosen";
import HomeCaseStudy from "@/components/home/HomeCaseStudy";
import HomeNotification from "@/components/home/HomeNotification";
import HomeSupportFlow from "@/components/home/HomeSupportFlow";
import HomeInquiry from "@/components/home/HomeInquiry";

/**
 * ALPACA トップページ — SmartHR系13セクション構造（2026-05-17）
 * 参照: /tmp/claude/smarthr-analysis.md
 * Section 10 Trend は薄いためスキップ。
 */
export default function Home() {
  return (
    <div className="overflow-x-hidden bg-white">
      <HomeLogoIntro />
      <HomeHeader />
      {/* 1. Hero */}
      <HomeHero />
      {/* 5. Solution */}
      <HomeSolution />
      {/* 6. Service (最重要) */}
      <HomeService />
      {/* 7. Why Chosen */}
      <HomeWhyChosen />
      {/* 8. Case Study */}
      <HomeCaseStudy />
      {/* 9. Knowhow ─ 削除（資料なしのため、2026-05-17） */}
      {/* 10. Trend ─ スキップ */}
      {/* 11. Notification */}
      <HomeNotification />
      {/* 12. Support Flow */}
      <HomeSupportFlow />
      {/* 13. Inquiry CTA */}
      <HomeInquiry />
    </div>
  );
}
