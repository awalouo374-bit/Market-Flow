"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Zap, ShieldCheck, Globe, Rocket, ArrowRight } from "lucide-react";
import Link from "next/link";
import { BrandButton } from "@/components/shared/BrandButton";

export function AboutHeroStory() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24 border-b border-slate-800/80 bg-[#0B0F19]">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-gradient-to-tr from-[#00F0FF]/15 via-cyan-400/5 to-transparent blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Story Text */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-[#00F0FF]/30 text-xs font-semibold text-[#00F0FF] backdrop-blur-md">
              <Rocket className="w-4 h-4 text-[#00F0FF]" />
              <span>Reinventing E-Commerce Architecture</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
              Engineering the Future of <br />
              <span className="bg-gradient-to-r from-[#00F0FF] via-cyan-200 to-white bg-clip-text text-transparent">
                Direct-to-Consumer Commerce.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              MarketFlow was born out of frustration with slow, bloated legacy storefronts. We combined cutting-edge Next.js serverless architecture with direct factory partnerships to deliver flagship tech & audio gear with sub-100ms page loads and zero customs surprises.
            </p>

            <p className="text-sm text-slate-400 leading-relaxed">
              From our automated robotic sorting centers in Austin to priority air dispatch worldwide, every detail of the MarketFlow experience is optimized for speed, security, and customer delight.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/products">
                <button
                  type="button"
                  className="h-12 px-6 rounded-xl bg-[#FF4D4D] hover:bg-[#FF3333] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#FF4D4D]/25 hover:shadow-[#FF4D4D]/40 transition-all duration-200 flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Flagship Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>

              <Link href="/shipping">
                <button
                  type="button"
                  className="h-12 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition-colors border border-slate-700 flex items-center gap-2 cursor-pointer"
                >
                  <Globe className="w-4 h-4 text-[#00F0FF]" />
                  <span>Global Logistics Network</span>
                </button>
              </Link>
            </div>
          </div>

          {/* Right Visual Glass Card */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl p-8 bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl relative overflow-hidden text-left space-y-6"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#00F0FF]/10 border border-[#00F0FF]/30 flex items-center justify-center text-[#00F0FF]">
                <Sparkles className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-2">Built for Performance</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  We don&apos;t just sell products — we design the infrastructure that gets premium goods to your door faster than ever before.
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Page Load Latency</span>
                  <span className="font-bold text-[#00F0FF]">Sub-80ms Average</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Warehouse Dispatch</span>
                  <span className="font-bold text-emerald-400">Under 2 Hours</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Customer Satisfaction</span>
                  <span className="font-bold text-white">4.9 / 5.0 Rating</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
