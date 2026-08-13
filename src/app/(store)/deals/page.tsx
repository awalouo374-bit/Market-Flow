import type { Metadata } from "next";
import { Suspense } from "react";
import { Shield, Truck, Zap, RefreshCw, BadgePercent } from "lucide-react";
import { getDealsProducts, getCatalogCategories } from "@/lib/catalog";
import { DealsStickyPromoBar } from "@/modules/deals/DealsStickyPromoBar";
import { DealsHero } from "@/modules/deals/DealsHero";
import { DealsFilterGrid } from "@/modules/deals/DealsFilterGrid";
import { DealsSkeleton } from "@/modules/deals/DealsSkeleton";
import { NewsletterSection } from "@/modules/catalog/NewsletterSection";

// Opt out of static pre-rendering — database content is fetched dynamically on demand
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Limited-Time Deals & Flash Sales – MarketFlow",
  description:
    "Save up to 50% on smartphones, audio, laptops and gadgets. Exclusive limited-time discounts and flash deals at MarketFlow.",
  openGraph: {
    title: "Limited-Time Deals & Flash Sales – MarketFlow",
    description:
      "Save up to 50% on top tech. Flash sales, live timers, and exclusive discounts updated daily.",
  },
};

const DEAL_BENEFITS = [
  {
    icon: BadgePercent,
    title: "Guaranteed Savings",
    desc: "Up to 50% off original MSRP prices",
  },
  {
    icon: Truck,
    title: "Free Express Shipping",
    desc: "On all qualifying deal orders over $100",
  },
  {
    icon: Shield,
    title: "Full Warranty Included",
    desc: "2-year manufacturer warranty on all items",
  },
  {
    icon: RefreshCw,
    title: "30-Day Easy Returns",
    desc: "Hassle-free money-back guarantee",
  },
];

async function DealsContent() {
  const [dealsResult, categories] = await Promise.all([
    getDealsProducts({ perPage: 24 }),
    getCatalogCategories(),
  ]);

  return (
    <DealsFilterGrid
      initialProducts={dealsResult.items}
      categories={categories}
    />
  );
}

export default function DealsPage() {
  return (
    <div className="space-y-12 pb-16">
      {/* 1. Sticky Promo Notification Bar */}
      <DealsStickyPromoBar />

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* 2. Hero Section */}
        <DealsHero />

        {/* 3. Trust & Benefits Bar */}
        <section
          aria-label="Why shop MarketFlow deals"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {DEAL_BENEFITS.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex items-center gap-3.5 p-4 rounded-2xl border border-border bg-card hover:border-amber-500/30 transition-all duration-300 shadow-2xs"
            >
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm text-foreground leading-tight">
                  {title}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </section>

        {/* 4. Deals Grid Section (Dynamic Server Component + Client Filters) */}
        <Suspense fallback={<DealsSkeleton count={8} />}>
          <DealsContent />
        </Suspense>

        {/* 5. Newsletter Signup */}
        <NewsletterSection />
      </div>
    </div>
  );
}
