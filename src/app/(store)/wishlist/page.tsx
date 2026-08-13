import type { Metadata } from "next";
import { Suspense } from "react";
import { getFeaturedProducts } from "@/lib/catalog";
import { WishlistDashboard } from "@/modules/wishlist/WishlistDashboard";
import { WishlistSkeleton } from "@/modules/wishlist/WishlistSkeleton";
import { NewsletterSection } from "@/modules/catalog/NewsletterSection";

// Opt out of static pre-rendering — user saved list & catalog are fetched dynamically on demand
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "My Saved Wishlist – MarketFlow",
  description:
    "Manage your saved products, track price drops, get back-in-stock alerts, and move items to cart with MarketFlow.",
  openGraph: {
    title: "My Saved Wishlist – MarketFlow",
    description:
      "Your personal saved tech list. Track price reductions, stock alerts, and share your wishlist.",
  },
};

async function WishlistContent() {
  const products = await getFeaturedProducts(8);
  // Initial wishlist items (slice first 3 items as pre-saved items)
  const initialWishlistItems = products.slice(0, 3);
  const recommendations = products.slice(3);

  return (
    <WishlistDashboard
      initialItems={initialWishlistItems}
      recommendations={recommendations}
    />
  );
}

export default function WishlistPage() {
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      <Suspense fallback={<WishlistSkeleton count={4} />}>
        <WishlistContent />
      </Suspense>

      {/* Newsletter Section */}
      <NewsletterSection />
    </div>
  );
}
