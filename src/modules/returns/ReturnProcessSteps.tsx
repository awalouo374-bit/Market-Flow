"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileCheck, QrCode, Zap, ArrowRight, Truck, Check } from "lucide-react";

const STEPS = [
  {
    step: "01",
    icon: FileCheck,
    title: "Initiate Return Online",
    description:
      "Enter your order details in our self-service portal to generate your instant RMA and prepaid shipping label.",
  },
  {
    step: "02",
    icon: QrCode,
    title: "Show QR Code at Drop-off",
    description:
      "No printer needed. Simply present your mobile QR code at any FedEx, UPS, or USPS location for free packaging.",
  },
  {
    step: "03",
    icon: Zap,
    title: "Instant Carrier Refund Scan",
    description:
      "As soon as the carrier scans your package, your refund or +$5 bonus store credit is automatically released.",
  },
];

export function ReturnProcessSteps() {
  return (
    <section className="py-16 sm:py-24 bg-[#0B0F19] relative border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-semibold text-[#00F0FF]">
            <Truck className="w-3.5 h-3.5" />
            <span>Simple 3-Step Process</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How MarketFlow Returns Work
          </h2>

          <p className="text-slate-400 text-sm leading-relaxed">
            Zero paperwork, zero shipping fees, and immediate refund processing as soon as your parcel enters the carrier network.
          </p>
        </div>

        {/* 3 Step Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {STEPS.map((item, idx) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="rounded-2xl p-6 sm:p-8 bg-slate-900/90 border border-slate-800 backdrop-blur-xl relative text-left flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#00F0FF]/10 border border-[#00F0FF]/30 flex items-center justify-center text-[#00F0FF] group-hover:bg-[#00F0FF] group-hover:text-slate-950 transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black text-slate-700 group-hover:text-[#00F0FF] transition-colors font-mono">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center gap-2 text-xs font-semibold text-[#00F0FF]">
                  <span>Step {item.step} Complete</span>
                  <Check className="w-4 h-4" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
