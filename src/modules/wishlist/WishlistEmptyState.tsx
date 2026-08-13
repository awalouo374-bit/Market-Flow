"use client";

import Link from "next/link";
import { Heart, Smartphone, Headphones, Laptop, Sparkles, ArrowRight } from "lucide-react";
import type { CatalogProduct } from "@/lib/catalog";
import { BrandButton } from "@/components/shared/BrandButton";
import { WishlistCard } from "./WishlistCard";

interface WishlistEmptyStateProps {
  recommendations: CatalogProduct[];
}

const CATEGORY_SHORTCUTS = [
  {
    name: "Smartphones",
    slug: "smartphones",
    icon: Smartphone,
    desc: "Next-Gen 5G Flagships",
  },
  {
    name: "Audio",
    slug: "audio",
    icon: Headphones,
    desc: "ANC Buds & Headphones",
  },
  {
    name: "Laptops",
    slug: "laptops",
    icon: Laptop,
    desc: "Ultrabooks & Powerhouses",
  },
  {
    name: "Accessories",
    slug: "accessories",
    icon: Sparkles,
    desc: "GaN Fast Chargers & Gear",
  },
];

export function WishlistEmptyState({ recommendations }: WishlistEmptyStateProps) {
  return (
    <div className="space-y-16 py-6">
      {/* 1. Main Hero Empty Banner */}
      <div className="rounded-3xl border border-border bg-card p-8 sm:p-14 text-center space-y-6 max-w-3xl mx-auto shadow-sm">
        <div className="w-20 h-20 rounded-3xl bg-flow-cyan/10 text-flow-cyan flex items-center justify-center mx-auto shadow-inner">
          <Heart className="w-10 h-10 stroke-[1.5]" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Your Wishlist is Empty
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            You haven&apos;t saved any products yet. Browse our catalog to bookmark items, track price drops, and get back-in-stock alerts.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap justify-center gap-3">
          <Link href="/products">
            <BrandButton variant="flow" size="lg" className="shadow-glow-cyan gap-2">
              <span>Explore All Products</span>
              <ArrowRight className="w-4 h-4" />
            </BrandButton>
          </Link>
          <Link href="/deals">
            <BrandButton variant="silver" size="lg">
              View Today&apos;s Deals
            </BrandButton>
          </Link>
        </div>
      </div>

      {/* 2. Category Shortcuts */}
      <section aria-labelledby="shortcuts-heading" className="space-y-6">
        <div className="text-center space-y-1">
          <h3 id="shortcuts-heading" className="text-lg font-bold text-foreground">
            Popular Categories to Explore
          </h3>
          <p className="text-xs text-muted-foreground">
            Find your favorite tech and start curating your saved list
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {CATEGORY_SHORTCUTS.map(({ name, slug, icon: Icon, desc }) => (
            <Link
              key={slug}
              href={`/products?category=${slug}`}
              className="group flex flex-col items-center p-5 rounded-2xl border border-border bg-card hover:border-flow-cyan/40 hover:shadow-md transition-all duration-300 hover:-translate-y-1 text-center"
            >
              <div className="p-3 rounded-2xl bg-flow-cyan/10 text-flow-cyan mb-3 group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-foreground group-hover:text-flow-cyan transition-colors">
                {name}
              </h4>
              <p className="text-[11px] text-muted-foreground mt-1">{desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Recommended Products Grid */}
      {recommendations.length > 0 && (
        <section aria-labelledby="recommendations-heading" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 id="recommendations-heading" className="text-lg font-bold text-foreground">
                Recommended For You
              </h3>
              <p className="text-xs text-muted-foreground">
                Trending items tech enthusiasts love
              </p>
            </div>
            <Link
              href="/featured"
              className="text-xs font-semibold text-flow-cyan hover:underline flex items-center gap-1"
            >
              <span>View Featured</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {recommendations.slice(0, 4).map((product) => (
              <WishlistCard
                key={product.id}
                item={product}
                variant="grid"
                onRemove={() => {}}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
