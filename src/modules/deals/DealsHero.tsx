"use client";

import { Flame, ShieldCheck, Truck, Sparkles, TrendingDown } from "lucide-react";
import { GradientText } from "@/components/shared/GradientText";
import { BrandCard } from "@/components/shared/BrandCard";
import { DealsCountdown } from "./DealsCountdown";

export function DealsHero() {
  return (
    <section
      aria-labelledby="deals-hero-heading"
      className="relative overflow-hidden rounded-3xl bg-flow-gradient px-6 py-12 sm:px-12 sm:py-16 text-white shadow-xl"
    >
      {/* Decorative background aura blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-flow-cyan-light/25 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-amber-500/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Left Copy */}
        <div className="flex-1 text-center lg:text-left space-y-6 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-bold border border-white/20 shadow-xs">
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400 animate-bounce" />
            <span>MarketFlow 2026 Mega Clearance Event</span>
          </div>

          <h1
            id="deals-hero-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white"
          >
            Limited-Time{" "}
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200 bg-clip-text text-transparent">
              Offers
            </span>{" "}
            & Flash Sales
          </h1>

          <p className="text-white/85 text-base sm:text-lg leading-relaxed">
            Discover massive price drops on flagship smartphones, active noise-canceling audio, high-performance ultrabooks, and smart accessories. Updated daily.
          </p>

          {/* Quick value badges */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-white/90 pt-2">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15">
              <TrendingDown className="w-4 h-4 text-amber-400" />
              Up to 50% Off Regular Price
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15">
              <Truck className="w-4 h-4 text-flow-cyan-light" />
              Free Express Delivery $100+
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Official 2-Year Warranty
            </span>
          </div>
        </div>

        {/* Right Urgency Card */}
        <div className="shrink-0 w-full max-w-sm">
          <BrandCard variant="glass" className="border-white/25 space-y-5 p-6 bg-white/10 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/15 pb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  Flash Deal Window
                </span>
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-extrabold text-[10px] uppercase">
                Live
              </span>
            </div>

            <div className="flex flex-col items-center justify-center py-2 space-y-3">
              <p className="text-xs text-white/80 font-medium text-center">
                Offers expire when stock reaches 0 or timer runs out:
              </p>
              <DealsCountdown targetHours={14} />
            </div>

            <div className="bg-white/10 rounded-xl p-3.5 flex items-center justify-between text-xs text-white/90 border border-white/15">
              <div>
                <p className="text-[10px] text-white/60 uppercase font-bold">Extra Bonus</p>
                <p className="font-semibold text-white">Use code <span className="font-mono text-amber-300">FLOWDEALS20</span></p>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-flow-cyan text-white text-[11px] font-bold">
                -20% Extra
              </span>
            </div>
          </BrandCard>
        </div>
      </div>
    </section>
  );
}
