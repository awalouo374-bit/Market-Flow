import React from "react";
import Link from "next/link";
import { GradientText } from "@/components/shared/GradientText";
import { BrandButton } from "@/components/shared/BrandButton";
import { Sparkles, ArrowRight, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { CatalogSearchBar } from "./CatalogSearchBar";

export function CatalogHero() {
  return (
    <section
      className="relative overflow-hidden rounded-3xl bg-flow-gradient px-6 py-12 sm:px-12 sm:py-16"
      aria-labelledby="catalog-hero-heading"
    >
      {/* Decorative background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-flow-cyan-light/20 blur-3xl" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-32 bg-white/5 blur-2xl rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        {/* Copy */}
        <div className="flex-1 text-center lg:text-left space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-white text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-flow-cyan-light animate-pulse" />
            <span>New arrivals every week</span>
          </div>

          <h1
            id="catalog-hero-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight"
          >
            Discover the{" "}
            <span className="text-flow-cyan-light">Future</span>{" "}
            of Tech
          </h1>

          <p className="text-white/80 text-base sm:text-lg max-w-lg mx-auto lg:mx-0">
            Shop the latest smartphones, audio gear, and accessories from the world's leading brands â€” all in one place.
          </p>

          {/* Search Bar */}
          <div className="pt-2">
            <CatalogSearchBar />
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1">
            <div className="flex items-center gap-1.5 text-white/70 text-xs font-medium">
              <Truck className="w-3.5 h-3.5 text-flow-cyan-light" />
              <span>Free shipping $100+</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/70 text-xs font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-flow-cyan-light" />
              <span>Secure checkout</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/70 text-xs font-medium">
              <RefreshCw className="w-3.5 h-3.5 text-flow-cyan-light" />
              <span>30-day returns</span>
            </div>
          </div>
        </div>

        {/* CTA Panel */}
        <div className="shrink-0 w-full max-w-xs lg:max-w-none lg:w-auto">
          <div className="glass-panel rounded-2xl p-6 space-y-4 border-white/20">
            <p className="text-white font-semibold text-sm uppercase tracking-wider">
              Today's Top Deals
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-white/10 rounded-xl px-4 py-3">
                <span className="text-white/90 text-sm font-medium">Up to 20% Off</span>
                <span className="text-flow-cyan-light text-xs font-bold bg-white/10 px-2 py-0.5 rounded-full">
                  Smartphones
                </span>
              </div>
              <div className="flex items-center justify-between bg-white/10 rounded-xl px-4 py-3">
                <span className="text-white/90 text-sm font-medium">Bundle &amp; Save</span>
                <span className="text-flow-cyan-light text-xs font-bold bg-white/10 px-2 py-0.5 rounded-full">
                  Accessories
                </span>
              </div>
            </div>
            <Link href="/deals" className="block">
              <BrandButton
                variant="glow"
                fullWidth
                className="text-sm gap-2"
              >
                <span>View All Deals</span>
                <ArrowRight className="w-4 h-4" />
              </BrandButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
