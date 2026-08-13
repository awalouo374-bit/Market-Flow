import type { Metadata } from "next";
import { Suspense } from "react";
import { getFeaturedProducts } from "@/lib/catalog";
import { FeaturedHeroSpotlight } from "@/modules/featured/FeaturedHeroSpotlight";
import { FeaturedSocialProofStrip } from "@/modules/featured/FeaturedSocialProofStrip";
import { FeaturedInteractiveTabs } from "@/modules/featured/FeaturedInteractiveTabs";
import { FeaturedSkeleton } from "@/modules/featured/FeaturedSkeleton";
import { NewsletterSection } from "@/modules/catalog/NewsletterSection";

// Opt out of static pre-rendering — data is fetched dynamically on demand
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Featured Collection & Staff Picks – MarketFlow",
  description:
    "Explore MarketFlow's curated featured collection. Hand-picked smartphones, audio, ultrabooks, and tech accessories.",
  openGraph: {
    title: "Featured Collection & Staff Picks – MarketFlow",
    description:
      "Hand-tested tech, top-rated gear, and editor's choices curated by MarketFlow product specialists.",
  },
};

async function FeaturedContent() {
  const products = await getFeaturedProducts(16);
  const spotlightItem = products[0] ?? null;

  return (
    <div className="space-y-14">
      {/* 1. Hero Spotlight */}
      <FeaturedHeroSpotlight spotlightProduct={spotlightItem} />

      {/* 2. Social Proof Bar */}
      <FeaturedSocialProofStrip />

      {/* 3. Interactive Multi-Tab Collection */}
      <FeaturedInteractiveTabs products={products} />
    </div>
  );
}

export default function FeaturedPage() {
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      <Suspense fallback={<FeaturedSkeleton count={8} />}>
        <FeaturedContent />
      </Suspense>

      {/* 4. Newsletter Signup */}
      <NewsletterSection />
    </div>
  );
}
