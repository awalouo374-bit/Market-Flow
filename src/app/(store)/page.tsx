import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, Zap, TrendingUp, Shield, Truck } from "lucide-react";

// This page fetches from the database via Neon serverless — it must not be
// statically pre-rendered at build time (the DB may be unreachable then).
export const dynamic = "force-dynamic";
import { getFeaturedProducts, getCatalogCategories } from "@/lib/catalog";
import { ProductCard } from "@/modules/catalog/ProductCard";
import { CategoryBanner } from "@/modules/catalog/CategoryBanner";
import { GradientText } from "@/components/shared/GradientText";
import { BrandButton } from "@/components/shared/BrandButton";
import { BrandCard } from "@/components/shared/BrandCard";
import { CatalogSearchBar } from "@/modules/catalog/CatalogSearchBar";
import { ProductGridSkeleton } from "@/modules/catalog/ProductCardSkeleton";
import { NewsletterSection } from "@/modules/catalog/NewsletterSection";

// ── Featured Products — async RSC streamed via Suspense ───────────────────────
async function FeaturedProductsSection() {
  const [featured, categories] = await Promise.all([
    getFeaturedProducts(8),
    getCatalogCategories(),
  ]);

  return (
    <div className="space-y-16">
      <CategoryBanner categories={categories} />

      <section aria-labelledby="featured-heading" className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <GradientText
              as="h2"
              id="featured-heading"
              variant="flow"
              className="text-2xl font-bold"
            >
              Featured Products
            </GradientText>
            <p className="text-sm text-muted-foreground mt-1">
              Our most popular picks — curated for quality and value
            </p>
          </div>
          <Link
            href="/products?featured=true"
            className="text-sm font-semibold text-accent hover:underline flex items-center gap-1 group"
          >
            <span>View all</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {featured.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Placeholder cards shown when the DB is empty */
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {DEMO_PRODUCTS.map((p) => (
              <div
                key={p.id}
                className="flex flex-col rounded-2xl border border-border bg-card overflow-hidden"
              >
                <div className="aspect-square bg-muted flex items-center justify-center text-4xl">
                  {p.emoji}
                </div>
                <div className="p-4 space-y-1.5">
                  <span className="text-[10px] font-bold text-accent uppercase tracking-wider">
                    {p.category}
                  </span>
                  <h3 className="font-semibold text-sm text-foreground leading-snug">
                    {p.name}
                  </h3>
                  <p className="text-lg font-bold text-foreground">{p.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

// ── Static data ───────────────────────────────────────────────────────────────

const DEMO_PRODUCTS = [
  { id: "1", name: "Aether Pro Phone X1", category: "Smartphones", price: "$999", emoji: "📱" },
  { id: "2", name: "Flow Wireless ANC Buds", category: "Audio", price: "$199", emoji: "🎧" },
  { id: "3", name: "Market UltraBook 15", category: "Laptops", price: "$1,499", emoji: "💻" },
  { id: "4", name: "Flow Ultra Charger 65W", category: "Accessories", price: "$49", emoji: "⚡" },
];

const TRUST_FEATURES = [
  { icon: Truck, title: "Free Global Shipping", desc: "On all orders over $100" },
  { icon: Shield, title: "Secure Payment", desc: "256-bit SSL encrypted" },
  { icon: TrendingUp, title: "Price Match", desc: "We match any competitor" },
  { icon: Zap, title: "Express Delivery", desc: "Next-day for orders by 3PM" },
];

// ── Page (pure Server Component — zero event handlers) ────────────────────────
export default function HomePage() {
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden rounded-3xl bg-flow-gradient px-6 py-14 sm:px-14 sm:py-20"
        aria-labelledby="home-hero-heading"
      >
        {/* Decorative background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-flow-cyan-light/20 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-white/10 blur-2xl" />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
          {/* Copy */}
          <div className="flex-1 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-white text-xs font-semibold">
              <Zap className="w-3.5 h-3.5 text-flow-cyan-light animate-pulse" />
              <span>New arrivals every week · Free shipping $100+</span>
            </div>

            <h1
              id="home-hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight"
            >
              Shop.{" "}
              <span className="text-flow-cyan-light">Flow.</span>{" "}
              Grow.
            </h1>

            <p className="text-white/80 text-lg max-w-xl mx-auto lg:mx-0">
              The next-generation e-commerce platform for tech enthusiasts.
              Discover the best smartphones, audio, and accessories — all in one place.
            </p>

            {/* CatalogSearchBar is a Client Component — safe to use here */}
            <div className="max-w-lg mx-auto lg:mx-0">
              <CatalogSearchBar />
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
              <Link href="/products">
                <BrandButton variant="glow" size="lg" className="shadow-glow-cyan gap-2">
                  <span>Browse Catalog</span>
                  <ArrowRight className="w-5 h-5" />
                </BrandButton>
              </Link>
              <Link href="/deals">
                <BrandButton
                  variant="silver"
                  size="lg"
                  className="border-white/40 text-white hover:bg-white/10"
                >
                  Today&apos;s Deals
                </BrandButton>
              </Link>
            </div>
          </div>

          {/* Stats card */}
          <div className="shrink-0 w-full max-w-xs">
            <BrandCard variant="glass" className="border-white/20 space-y-4">
              <p className="text-white/70 text-xs font-semibold uppercase tracking-wider">
                Platform Stats
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "10K+", label: "Products" },
                  { value: "50K+", label: "Customers" },
                  { value: "99%", label: "Satisfaction" },
                  { value: "4.9★", label: "Avg. Rating" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white/10 rounded-xl px-3 py-3 text-center"
                  >
                    <p className="text-white font-extrabold text-xl leading-none">
                      {stat.value}
                    </p>
                    <p className="text-white/60 text-xs mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </BrandCard>
          </div>
        </div>
      </section>

      {/* ── Trust bar ── */}
      <section aria-label="Why shop with us" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {TRUST_FEATURES.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="flex items-center gap-3 p-4 rounded-2xl border border-border bg-card hover:border-accent/30 transition-colors"
          >
            <div className="p-2.5 rounded-xl bg-flow-gradient text-white shrink-0 shadow-sm">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-sm text-foreground leading-tight">{title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ── Featured products & categories — streamed ── */}
      <Suspense fallback={<ProductGridSkeleton count={8} />}>
        <FeaturedProductsSection />
      </Suspense>

      {/* ── Newsletter — Client Component (has form state) ── */}
      <NewsletterSection />
    </div>
  );
}
