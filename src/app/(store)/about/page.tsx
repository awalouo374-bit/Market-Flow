import type { Metadata } from "next";
import { AboutHeroStory } from "@/modules/about/AboutHeroStory";
import { AboutMetricsStrip } from "@/modules/about/AboutMetricsStrip";
import { AboutValuesGrid } from "@/modules/about/AboutValuesGrid";
import { AboutTeamSection } from "@/modules/about/AboutTeamSection";

export const metadata: Metadata = {
  title: "About Us — Engineering Next-Gen E-Commerce | MarketFlow",
  description:
    "Discover the story behind MarketFlow. We combine sub-100ms serverless application speed with transparent global logistics and direct-to-consumer flagship tech products.",
  keywords: [
    "about marketflow",
    "direct to consumer commerce",
    "nextjs ecommerce",
    "global logistics technology",
    "marketflow team",
  ],
  openGraph: {
    title: "MarketFlow Story — Engineering Direct-to-Consumer Commerce",
    description: "Discover our mission, sub-second application architecture, and global logistics fulfillment network.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white selection:bg-[#00F0FF] selection:text-slate-950 font-sans">
      <AboutHeroStory />
      <AboutMetricsStrip />
      <AboutValuesGrid />
      <AboutTeamSection />
    </div>
  );
}
