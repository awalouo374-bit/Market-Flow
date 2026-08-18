"use client";

import React from "react";
import { motion } from "framer-motion";
import { Scale, ShieldCheck, FileText, Gavel, CheckCircle2, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const HIGHLIGHTS = [
  {
    icon: Scale,
    title: "Binding Legal Agreement",
    description: "Governs your use of MarketFlow storefront, account registration, and checkout orders.",
  },
  {
    icon: Gavel,
    title: "Governing Law & Arbitration",
    description: "Fair, transparent dispute resolution under standard commercial arbitration frameworks.",
  },
  {
    icon: ShieldCheck,
    title: "Consumer Rights Protection",
    description: "Compliant with international consumer protection laws and 30-day refund policies.",
  },
  {
    icon: FileText,
    title: "IP & Brand Ownership",
    description: "All logos, product photography, software code, and trademarks remain protected property.",
  },
];

export function TermsHeroSection() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24 border-b border-slate-800/80 bg-[#0B0F19]">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#00F0FF]/15 via-cyan-500/5 to-transparent blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-[#00F0FF]/30 text-xs font-semibold text-[#00F0FF] backdrop-blur-md mb-6">
          <Scale className="w-4 h-4 text-[#00F0FF]" />
          <span>Legal Framework & User Agreement</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] max-w-4xl mx-auto mb-6">
          Terms of Service & <br />
          <span className="bg-gradient-to-r from-[#00F0FF] via-cyan-200 to-white bg-clip-text text-transparent">
            Store Usage Conditions.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed mb-14">
          Effective Date: January 1, 2026. Please read these terms carefully before placing an order or registering a MarketFlow customer account.
        </p>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {HIGHLIGHTS.map((h, idx) => {
            const Icon = h.icon;

            return (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="rounded-2xl p-6 bg-slate-900/90 border border-slate-800 backdrop-blur-xl flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#00F0FF]/10 border border-[#00F0FF]/30 flex items-center justify-center text-[#00F0FF] mb-4 group-hover:bg-[#00F0FF] group-hover:text-slate-950 transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{h.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{h.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
