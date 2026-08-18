"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Truck,
  Zap,
  Clock,
  ShieldCheck,
  Globe,
  Check,
  Sparkles,
  Navigation,
  DollarSign,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ShippingTier {
  id: string;
  name: string;
  tagline: string;
  transitDays: string;
  price: string;
  freeThreshold?: string;
  carriers: string[];
  carrierBadges: { name: string; bg: string; text: string }[];
  accentColor: string;
  popular?: boolean;
  features: string[];
}

const SHIPPING_TIERS: ShippingTier[] = [
  {
    id: "standard-eco",
    name: "Standard Eco",
    tagline: "Cost-effective ground shipping for everyday items.",
    transitDays: "3–5 Business Days",
    price: "$4.99",
    freeThreshold: "FREE on orders over $75",
    carriers: ["UPS Ground", "USPS Priority"],
    carrierBadges: [
      { name: "UPS Ground", bg: "bg-amber-950/60 border-amber-800/60", text: "text-amber-300" },
      { name: "USPS", bg: "bg-blue-950/60 border-blue-800/60", text: "text-blue-300" },
    ],
    accentColor: "border-slate-700",
    features: [
      "Full end-to-end tracking",
      "Carbon-neutral transit offset",
      "Eligible for Free Shipping threshold",
    ],
  },
  {
    id: "express-air",
    name: "Express Air",
    tagline: "Priority air transport for urgent deliveries.",
    transitDays: "1–2 Business Days",
    price: "$14.99",
    carriers: ["FedEx Priority", "DHL Express"],
    carrierBadges: [
      { name: "FedEx Priority", bg: "bg-purple-950/60 border-purple-800/60", text: "text-purple-300" },
      { name: "DHL Express", bg: "bg-amber-950/60 border-amber-800/60", text: "text-amber-300" },
    ],
    accentColor: "border-[#00F0FF]/60",
    popular: true,
    features: [
      "Guaranteed air freight routing",
      "Signature optional on delivery",
      "Real-time SMS status updates",
      "Dispatched within 2 hours",
    ],
  },
  {
    id: "same-day",
    name: "Overnight / Same-Day",
    tagline: "Ultra-fast localized fulfillment for immediate needs.",
    transitDays: "Same-Day or Next Morning",
    price: "$29.99",
    carriers: ["FedEx SameDay", "Local Courier"],
    carrierBadges: [
      { name: "FedEx SameDay", bg: "bg-rose-950/60 border-rose-800/60", text: "text-rose-300" },
      { name: "OnTrac", bg: "bg-[#00F0FF]/10 border-[#00F0FF]/40", text: "text-[#00F0FF]" },
    ],
    accentColor: "border-[#FF4D4D]/60",
    features: [
      "Dedicated courier dispatch",
      "Live GPS map tracking",
      "Delivered before 10:30 AM",
      "Direct phone driver contact",
    ],
  },
  {
    id: "global-ddp",
    name: "Global Priority DDP",
    tagline: "Cross-border delivery with prepaid customs & duties.",
    transitDays: "3–6 Business Days Worldwide",
    price: "$19.99",
    carriers: ["DHL Express International", "UPS Worldwide"],
    carrierBadges: [
      { name: "DHL Global", bg: "bg-amber-950/60 border-amber-800/60", text: "text-amber-300" },
      { name: "UPS Worldwide", bg: "bg-emerald-950/60 border-emerald-800/60", text: "text-emerald-300" },
    ],
    accentColor: "border-emerald-700/60",
    features: [
      "Delivered Duty Paid (DDP)",
      "Zero customs fees at doorstep",
      "Global door-to-door tracking",
      "Handled by local carrier partners",
    ],
  },
];

export function ShippingTiersGrid() {
  const [selectedTier, setSelectedTier] = useState<string>("express-air");

  // Calculate dynamic arrival date helper
  const getEstimatedArrival = (daysStr: string) => {
    const today = new Date();
    let daysToAdd = 3;
    if (daysStr.includes("1–2")) daysToAdd = 2;
    if (daysStr.includes("Same-Day")) daysToAdd = 1;
    if (daysStr.includes("3–6")) daysToAdd = 5;

    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + daysToAdd);

    return targetDate.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <section className="py-16 sm:py-24 bg-[#0B0F19] relative border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-semibold text-[#00F0FF]">
            <Truck className="w-3.5 h-3.5" />
            <span>Fulfillment Options</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Choose Your Delivery Velocity
          </h2>

          <p className="text-slate-400 text-base leading-relaxed">
            From eco-friendly ground freight to guaranteed overnight air courier, select the tier that fits your timeline and location.
          </p>
        </div>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SHIPPING_TIERS.map((tier) => {
            const isSelected = selectedTier === tier.id;
            const arrivalDate = getEstimatedArrival(tier.transitDays);

            return (
              <motion.div
                key={tier.id}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                onClick={() => setSelectedTier(tier.id)}
                className={`relative rounded-2xl p-6 bg-slate-900/90 border ${
                  isSelected
                    ? "border-[#00F0FF] shadow-xl shadow-[#00F0FF]/15 ring-2 ring-[#00F0FF]/30"
                    : "border-slate-800 hover:border-slate-700"
                } transition-all duration-200 cursor-pointer flex flex-col justify-between text-left group`}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#FF4D4D] text-white text-[11px] font-bold tracking-wider uppercase shadow-lg shadow-[#FF4D4D]/30 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Most Popular</span>
                  </div>
                )}

                <div>
                  {/* Top Tier Title & Checkmark */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="text-lg font-bold text-white group-hover:text-[#00F0FF] transition-colors">
                      {tier.name}
                    </h3>
                    <div
                      className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-[#00F0FF] border-[#00F0FF] text-slate-950"
                          : "border-slate-700 bg-slate-950 text-transparent"
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 font-bold" />
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed mb-4 min-h-[36px]">
                    {tier.tagline}
                  </p>

                  {/* Price & Free Tag */}
                  <div className="mb-4 pb-4 border-b border-slate-800">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-white">{tier.price}</span>
                      <span className="text-xs text-slate-400">/ order</span>
                    </div>

                    {tier.freeThreshold && (
                      <span className="inline-block mt-1.5 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        {tier.freeThreshold}
                      </span>
                    )}
                  </div>

                  {/* Estimated Arrival Badge */}
                  <div className="mb-5 p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-[#00F0FF]" />
                      <span>Estimated Arrival:</span>
                    </div>
                    <p className="text-sm font-bold text-white pl-5">{arrivalDate}</p>
                    <p className="text-[11px] text-slate-500 pl-5">{tier.transitDays}</p>
                  </div>

                  {/* Carrier Badges */}
                  <div className="mb-5 space-y-1.5">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Carriers & Networks
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {tier.carrierBadges.map((badge, idx) => (
                        <span
                          key={idx}
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border ${badge.bg} ${badge.text}`}
                        >
                          {badge.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Feature Bullets */}
                  <div className="space-y-2 pt-2 border-t border-slate-800/80">
                    {tier.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-[#00F0FF] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Select Action */}
                <div className="pt-6 mt-6 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setSelectedTier(tier.id)}
                    className={`w-full h-10 rounded-xl font-bold text-xs tracking-wide transition-all ${
                      isSelected
                        ? "bg-[#00F0FF] text-slate-950 hover:bg-[#00D8E6]"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                    }`}
                  >
                    {isSelected ? "Selected Option" : "Select Tier"}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
