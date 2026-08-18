"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Truck, Zap, Clock, ChevronRight, Check, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export type ShippingMethod = {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
  carrier: string;
  icon: React.ReactNode;
  badge?: string;
  badgeColor?: string;
};

const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: "standard",
    name: "Standard Eco Shipping",
    description: "Eco-friendly packaging via ground network",
    price: 0,
    estimatedDays: "3–5 Business Days",
    carrier: "UPS Ground / USPS",
    icon: <Truck className="w-5 h-5" />,
    badge: "Free",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  },
  {
    id: "express",
    name: "Express Air Priority",
    description: "Fast air delivery with live tracking updates",
    price: 14.99,
    estimatedDays: "1–2 Business Days",
    carrier: "FedEx Priority / DHL Express",
    icon: <Zap className="w-5 h-5" />,
    badge: "Most Popular",
    badgeColor: "bg-[#00F0FF]/20 text-[#00F0FF] border-[#00F0FF]/30",
  },
  {
    id: "overnight",
    name: "Overnight / Same-Day",
    description: "Priority overnight delivery with signature",
    price: 29.99,
    estimatedDays: "Next Business Day",
    carrier: "FedEx SameDay / OnTrac",
    icon: <Clock className="w-5 h-5" />,
    badge: "Fastest",
    badgeColor: "bg-[#FF4D4D]/20 text-[#FF4D4D] border-[#FF4D4D]/30",
  },
];

interface Props {
  subtotal: number;
  onNext: (method: ShippingMethod) => void;
  onBack: () => void;
}

export function CheckoutShippingStep({ subtotal, onNext, onBack }: Props) {
  const [selected, setSelected] = useState<string>("standard");

  const selectedMethod = SHIPPING_METHODS.find((m) => m.id === selected)!;

  // Free shipping if subtotal >= 75
  const adjustedMethods = SHIPPING_METHODS.map((m) =>
    m.id === "standard" && subtotal >= 75 ? { ...m, price: 0 } : m
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
        <Truck className="w-5 h-5 text-[#00F0FF]" />
        <span>Choose Shipping Method</span>
      </h2>
      <p className="text-xs text-slate-400 mb-6">
        {subtotal >= 75 ? (
          <span className="text-emerald-400 font-semibold">
            🎉 Your order qualifies for Free Standard Shipping!
          </span>
        ) : (
          <span>
            Add <strong className="text-white">${(75 - subtotal).toFixed(2)}</strong> more to unlock Free Standard Shipping.
          </span>
        )}
      </p>

      <div className="space-y-3 mb-6">
        {adjustedMethods.map((method) => {
          const Icon = () => <>{method.icon}</>;
          const isSelected = selected === method.id;

          return (
            <motion.button
              key={method.id}
              type="button"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setSelected(method.id)}
              className={`w-full p-4 rounded-xl border text-left transition-all flex items-center gap-4 cursor-pointer ${
                isSelected
                  ? "bg-slate-950 border-[#00F0FF] ring-1 ring-[#00F0FF]/40"
                  : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
              }`}
            >
              {/* Radio */}
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                  isSelected ? "border-[#00F0FF] bg-[#00F0FF]" : "border-slate-600"
                }`}
              >
                {isSelected && <Check className="w-3 h-3 text-slate-950" strokeWidth={3} />}
              </div>

              {/* Icon */}
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  isSelected
                    ? "bg-[#00F0FF]/20 text-[#00F0FF]"
                    : "bg-slate-900 text-slate-400"
                }`}
              >
                <Icon />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-bold text-white">{method.name}</span>
                  {method.badge && (
                    <Badge className={`text-[10px] font-bold border ${method.badgeColor}`}>
                      {method.badge}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{method.description}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {method.carrier} · {method.estimatedDays}
                </p>
              </div>

              {/* Price */}
              <div className="text-right shrink-0">
                {method.price === 0 ? (
                  <span className="text-sm font-bold text-emerald-400">Free</span>
                ) : (
                  <span className="text-sm font-bold text-white">${method.price.toFixed(2)}</span>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Trust badge */}
      <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 mb-6">
        <ShieldCheck className="w-4 h-4 text-[#00F0FF] shrink-0" />
        <span>All shipments are 100% insured. Free prepaid return labels included for 30 days.</span>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="h-12 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition-colors border border-slate-700 cursor-pointer"
        >
          Back
        </button>
        <button
          type="button"
          onClick={() => onNext(selectedMethod)}
          className="flex-1 h-12 rounded-xl bg-[#FF4D4D] hover:bg-[#FF3333] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#FF4D4D]/25 hover:shadow-[#FF4D4D]/40 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Continue to Payment</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
