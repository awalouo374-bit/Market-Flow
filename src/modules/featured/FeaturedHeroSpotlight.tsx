"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles, Star, ArrowRight, ShieldCheck, Zap, Award, ShoppingBag } from "lucide-react";
import type { CatalogProduct } from "@/lib/catalog";
import { BrandButton } from "@/components/shared/BrandButton";
import { BrandCard } from "@/components/shared/BrandCard";

interface FeaturedHeroSpotlightProps {
  spotlightProduct?: CatalogProduct | null;
  onQuickView?: (product: CatalogProduct) => void;
}

export function FeaturedHeroSpotlight({
  spotlightProduct,
  onQuickView,
}: FeaturedHeroSpotlightProps) {
  // Hero spotlight default metadata
  const title = spotlightProduct?.name ?? "Aether Pro Phone X1 Ultra";
  const category = spotlightProduct?.categoryName ?? "Smartphones";
  const price = spotlightProduct?.price ? `$${parseFloat(spotlightProduct.price).toFixed(2)}` : "$999.00";
  const image = spotlightProduct?.primaryImage ?? "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9";

  return (
    <section
      aria-labelledby="featured-spotlight-heading"
      className="relative overflow-hidden rounded-3xl bg-flow-gradient px-6 py-12 sm:px-12 sm:py-16 text-white shadow-2xl"
    >
      {/* Decorative ambient blurred aura */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-flow-cyan-light/30 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-market-navy-dark/40 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Left Editorial Narrative */}
        <div className="flex-1 text-center lg:text-left space-y-6 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-extrabold border border-white/20 shadow-xs">
            <Sparkles className="w-4 h-4 text-flow-cyan-light animate-pulse" />
            <span>EDITORIAL SPOTLIGHT // 2026 EDITION</span>
          </div>

          <h1
            id="featured-spotlight-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white"
          >
            Curated{" "}
            <span className="bg-gradient-to-r from-flow-cyan-light via-white to-flow-cyan bg-clip-text text-transparent">
              Excellence
            </span>{" "}
            & Staff Picks
          </h1>

          <p className="text-white/85 text-base sm:text-lg leading-relaxed">
            Hand-tested and meticulously selected by our tech editors. Experience the pinnacle of design, speed, audio fidelity, and craftsmanship.
          </p>

          {/* Value Badges */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-white/90 pt-2">
            <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15">
              <Award className="w-4 h-4 text-amber-400" />
              Editor&apos;s Choice Winner
            </span>
            <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              4.9/5 Rated by 50,000+ Users
            </span>
            <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Official Warranty Included
            </span>
          </div>
        </div>

        {/* Right Product Spotlight Card */}
        <div className="shrink-0 w-full max-w-sm">
          <BrandCard
            variant="glass"
            className="border-white/25 space-y-4 p-6 bg-white/10 shadow-2xl relative overflow-hidden group"
          >
            {/* Top Ribbon */}
            <div className="flex items-center justify-between border-b border-white/15 pb-3">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-flow-cyan-light">
                Product of the Month
              </span>
              <span className="inline-flex items-center gap-1 bg-amber-400/20 text-amber-300 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-amber-400/30">
                <Star className="w-3 h-3 fill-amber-300" />
                #1 Top Rated
              </span>
            </div>

            {/* Spotlight Thumbnail */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black/20 border border-white/15">
              <Image
                src={image}
                alt={title}
                fill
                sizes="384px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Details */}
            <div className="space-y-1 text-left">
              <span className="text-[10px] uppercase font-bold text-white/70 tracking-wider">
                {category}
              </span>
              <h2 className="text-lg font-bold text-white line-clamp-1">{title}</h2>
              <div className="flex items-baseline justify-between pt-1">
                <span className="text-xl font-extrabold text-flow-cyan-light">{price}</span>
                <span className="text-xs text-white/80 font-medium">Free Express Delivery</span>
              </div>
            </div>

            {/* Spotlight CTA */}
            <div className="pt-2 flex items-center gap-2">
              {spotlightProduct && onQuickView ? (
                <BrandButton
                  type="button"
                  onClick={() => onQuickView(spotlightProduct)}
                  variant="glow"
                  size="md"
                  fullWidth
                  className="gap-2 shadow-glow-cyan"
                >
                  <Zap className="w-4 h-4" />
                  <span>Inspect Spotlight</span>
                </BrandButton>
              ) : (
                <Link href={`/products`} className="w-full">
                  <BrandButton variant="glow" size="md" fullWidth className="gap-2 shadow-glow-cyan">
                    <span>Inspect Collection</span>
                    <ArrowRight className="w-4 h-4" />
                  </BrandButton>
                </Link>
              )}
            </div>
          </BrandCard>
        </div>
      </div>
    </section>
  );
}
