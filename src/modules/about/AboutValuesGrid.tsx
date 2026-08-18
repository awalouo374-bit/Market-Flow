"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Globe, Leaf, Headphones, ShieldCheck, HeartHandshake } from "lucide-react";

const VALUES = [
  {
    icon: Zap,
    title: "Sub-Second Performance",
    description: "Every page, product search, and instant checkout flow is optimized for sub-100ms response times globally.",
  },
  {
    icon: Globe,
    title: "Transparent DDP Logistics",
    description: "No unexpected customs fees or surprise doorstep invoices. Taxes and duties are pre-calculated at checkout.",
  },
  {
    icon: Leaf,
    title: "100% Sustainable Footprint",
    description: "Recycled mailers, zero single-use plastic air pillows, and carbon-offset flight partnerships.",
  },
  {
    icon: Headphones,
    title: "24/7 Human-First Support",
    description: "Real logistics engineers and customer advocates available around the clock via live chat and hotline.",
  },
];

export function AboutValuesGrid() {
  return (
    <section className="py-16 sm:py-24 bg-[#0B0F19] relative border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-semibold text-[#00F0FF]">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Our Core Operating Pillars</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            What Drives MarketFlow
          </h2>

          <p className="text-slate-400 text-sm leading-relaxed">
            We hold ourselves to uncompromising standards across software engineering, global logistics, and customer advocacy.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {VALUES.map((val, idx) => {
            const Icon = val.icon;

            return (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="rounded-2xl p-6 bg-slate-900/90 border border-slate-800 backdrop-blur-xl flex flex-col justify-between group"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#00F0FF]/10 border border-[#00F0FF]/30 flex items-center justify-center text-[#00F0FF] mb-5 group-hover:bg-[#00F0FF] group-hover:text-slate-950 transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{val.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{val.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
