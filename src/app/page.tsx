import HomeHeader from "@/components/home/HomeHeader";
import HomeHero from "@/components/home/HomeHero";
import HomeServices from "@/components/home/HomeServices";
import HomeWorks from "@/components/home/HomeWorks";
import HomeAbout from "@/components/home/HomeAbout";
import HomeFlow from "@/components/home/HomeFlow";
import HomeFAQ from "@/components/home/HomeFAQ";
import HomeContact from "@/components/home/HomeContact";

export default function Home() {
  return (
    <div className="overflow-x-hidden bg-white">
      <HomeHeader />
      <HomeHero />
      <HomeServices />
      <HomeWorks />
      <HomeAbout />
      <HomeFlow />
      <HomeFAQ />
      <HomeContact />
    </div>
  );
}
