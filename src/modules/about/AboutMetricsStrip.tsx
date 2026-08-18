"use client";

import React from "react";
import { motion } from "framer-motion";
import { Package, Globe, Award, Users, ShieldCheck, Zap } from "lucide-react";

const METRICS = [
  {
    icon: Package,
    number: "$45M+",
    label: "Products Delivered",
    subtext: "Shipped across North America, EU & Asia",
  },
  {
    icon: Zap,
    number: "99.98%",
    label: "On-Time Dispatch Rate",
    subtext: "Automated same-day warehouse fulfillment",
  },
  {
    icon: Globe,
    number: "180+",
    label: "Countries Served",
    subtext: "Pre-cleared DDP customs clearance",
  },
  {
    icon: Users,
    number: "240K+",
    label: "Verified Customers",
    subtext: "4.9/5 Average product satisfaction score",
  },
];

export function AboutMetricsStrip() {
  return (
    <section className="py-16 bg-[#0B0F19] border-b border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {METRICS.map((m, idx) => {
            const Icon = m.icon;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md text-left flex flex-col justify-between group hover:border-[#00F0FF]/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#00F0FF]/10 border border-[#00F0FF]/30 flex items-center justify-center text-[#00F0FF] group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <span className="text-3xl sm:text-4xl font-black text-white tracking-tight group-hover:text-[#00F0FF] transition-colors block">
                    {m.number}
                  </span>
                  <p className="text-sm font-bold text-slate-200 mt-1">{m.label}</p>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{m.subtext}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
