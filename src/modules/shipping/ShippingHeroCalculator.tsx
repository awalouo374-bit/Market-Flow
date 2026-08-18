"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Truck,
  Globe,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertCircle,
  Calculator,
  ArrowRight,
  ShieldCheck,
  Clock,
  Package,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const FREE_SHIPPING_THRESHOLD = 75;

const calculatorSchema = z.object({
  country: z.string().min(1, "Please select a destination country."),
  postalCode: z
    .string()
    .min(3, "Postal/ZIP code must be at least 3 characters.")
    .max(10, "Postal code is too long."),
  orderTotal: z.number().min(0, "Order total cannot be negative."),
});

type CalculatorFormValues = z.infer<typeof calculatorSchema>;

const COUNTRIES = [
  { code: "US", name: "United States", flag: "🇺🇸", basePrice: 4.99, expressPrice: 14.99, days: "2–4 days" },
  { code: "CA", name: "Canada", flag: "🇨🇦", basePrice: 7.99, expressPrice: 18.99, days: "3–5 days" },
  { code: "UK", name: "United Kingdom", flag: "🇬🇧", basePrice: 9.99, expressPrice: 22.99, days: "3–5 days" },
  { code: "FR", name: "France", flag: "🇫🇷", basePrice: 9.99, expressPrice: 22.99, days: "3–5 days" },
  { code: "DE", name: "Germany", flag: "🇩🇪", basePrice: 9.99, expressPrice: 22.99, days: "3–5 days" },
  { code: "AU", name: "Australia", flag: "🇦🇺", basePrice: 12.99, expressPrice: 28.99, days: "4–7 days" },
  { code: "JP", name: "Japan", flag: "🇯🇵", basePrice: 11.99, expressPrice: 24.99, days: "3–6 days" },
];

export function ShippingHeroCalculator() {
  const [calculationResult, setCalculationResult] = useState<{
    countryName: string;
    flag: string;
    standardFee: number;
    expressFee: number;
    isFreeStandard: boolean;
    estimatedDelivery: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CalculatorFormValues>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      country: "US",
      postalCode: "10001",
      orderTotal: 55,
    },
  });

  const currentOrderTotal = watch("orderTotal") || 0;
  const amountRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - currentOrderTotal);
  const progressPercent = Math.min(100, (currentOrderTotal / FREE_SHIPPING_THRESHOLD) * 100);

  const onSubmit = (data: CalculatorFormValues) => {
    const selectedCountry = COUNTRIES.find((c) => c.code === data.country) || COUNTRIES[0];
    const isFree = data.orderTotal >= FREE_SHIPPING_THRESHOLD;

    // Calculate delivery date estimates
    const today = new Date();
    const minDeliveryDate = new Date(today);
    minDeliveryDate.setDate(today.getDate() + 3);
    const maxDeliveryDate = new Date(today);
    maxDeliveryDate.setDate(today.getDate() + 5);

    const formatOpts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
    const dateStr = `${minDeliveryDate.toLocaleDateString("en-US", formatOpts)} – ${maxDeliveryDate.toLocaleDateString("en-US", formatOpts)}`;

    setCalculationResult({
      countryName: selectedCountry.name,
      flag: selectedCountry.flag,
      standardFee: isFree ? 0 : selectedCountry.basePrice,
      expressFee: selectedCountry.expressPrice,
      isFreeStandard: isFree,
      estimatedDelivery: dateStr,
    });
  };

  return (
    <section className="relative overflow-hidden py-16 lg:py-24 border-b border-slate-800/80 bg-[#0B0F19]">
      {/* Background Glow Decorations */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#00F0FF]/15 via-[#00F0FF]/5 to-transparent blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[250px] bg-gradient-to-br from-[#FF4D4D]/10 to-transparent blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Text & Trust Markers */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-[#00F0FF]/30 text-xs font-semibold text-[#00F0FF] shadow-inner backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-[#00F0FF] animate-pulse" />
              <span>Worldwide Express Fulfillment Network</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
              Global Shipping, <br />
              <span className="bg-gradient-to-r from-[#00F0FF] via-cyan-200 to-white bg-clip-text text-transparent">
                Next-Gen Precision.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
              Track package timelines in real-time, calculate customs-cleared transit costs instantly, and enjoy <strong className="text-white font-semibold">Free Worldwide Standard Shipping</strong> on all orders over $75.
            </p>

            {/* Quick Benefits Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
                <Truck className="w-5 h-5 text-[#00F0FF] shrink-0" />
                <div className="text-left">
                  <p className="text-xs font-bold text-white">Express Air</p>
                  <p className="text-[11px] text-slate-400">1–2 Business Days</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
                <Globe className="w-5 h-5 text-[#00F0FF] shrink-0" />
                <div className="text-left">
                  <p className="text-xs font-bold text-white">DDP Guarantee</p>
                  <p className="text-[11px] text-slate-400">No Hidden Duties</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm col-span-2 sm:col-span-1">
                <ShieldCheck className="w-5 h-5 text-[#00F0FF] shrink-0" />
                <div className="text-left">
                  <p className="text-xs font-bold text-white">100% Insured</p>
                  <p className="text-[11px] text-slate-400">Loss & Damage</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Shipping Calculator Widget */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl p-6 sm:p-8 bg-slate-900/80 border border-slate-800/90 shadow-2xl backdrop-blur-xl relative overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-5 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#00F0FF]/10 border border-[#00F0FF]/30 flex items-center justify-center text-[#00F0FF]">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">Shipping Estimator</h2>
                    <p className="text-xs text-slate-400">Get live delivery dates & rates</p>
                  </div>
                </div>

                <Badge variant="outline" className="border-[#00F0FF]/40 text-[#00F0FF] bg-[#00F0FF]/5 text-xs px-2.5 py-1">
                  Threshold: $75
                </Badge>
              </div>

              {/* Free Shipping Progress Tracker */}
              <div className="mb-6 p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-300 flex items-center gap-1.5">
                    <Package className="w-4 h-4 text-[#00F0FF]" />
                    <span>Free Standard Shipping Tracker</span>
                  </span>
                  <span className="font-bold text-white">${currentOrderTotal.toFixed(2)} / $75.00</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#00F0FF] via-cyan-400 to-[#FF4D4D] transition-all duration-500 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <div className="text-[12px] pt-1">
                  {amountRemaining > 0 ? (
                    <p className="text-slate-300">
                      Add <span className="font-bold text-[#00F0FF]">${amountRemaining.toFixed(2)}</span> more to unlock <strong className="text-white">FREE Standard Delivery</strong>!
                    </p>
                  ) : (
                    <p className="text-emerald-400 font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Congratulations! You qualify for FREE Standard Shipping!</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Calculator Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Destination Country Select */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 block">
                      Destination Country
                    </label>
                    <select
                      {...register("country")}
                      className="w-full h-11 px-3.5 rounded-xl bg-slate-950/80 border border-slate-700/80 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#00F0FF] focus:border-[#00F0FF] transition-all cursor-pointer"
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c.code} value={c.code} className="bg-slate-900 text-white">
                          {c.flag} {c.name}
                        </option>
                      ))}
                    </select>
                    {errors.country && (
                      <p className="text-xs text-[#FF4D4D] flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.country.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Postal / ZIP Code */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 block">
                      ZIP / Postal Code
                    </label>
                    <input
                      type="text"
                      {...register("postalCode")}
                      placeholder="e.g. 10001"
                      className="w-full h-11 px-3.5 rounded-xl bg-slate-950/80 border border-slate-700/80 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#00F0FF] focus:border-[#00F0FF] transition-all"
                    />
                    {errors.postalCode && (
                      <p className="text-xs text-[#FF4D4D] flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.postalCode.message}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Estimated Order Total Input */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-slate-300">
                      Estimated Cart Subtotal ($)
                    </label>
                    <div className="flex gap-1.5">
                      <button
                        type="button"
                        onClick={() => setValue("orderTotal", 45)}
                        className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 hover:text-white transition-colors"
                      >
                        $45
                      </button>
                      <button
                        type="button"
                        onClick={() => setValue("orderTotal", 85)}
                        className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-[#00F0FF] hover:bg-slate-700 transition-colors font-medium"
                      >
                        $85 (Free Tier)
                      </button>
                    </div>
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    {...register("orderTotal", { valueAsNumber: true })}
                    placeholder="55.00"
                    className="w-full h-11 px-3.5 rounded-xl bg-slate-950/80 border border-slate-700/80 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#00F0FF] focus:border-[#00F0FF] transition-all"
                  />
                  {errors.orderTotal && (
                    <p className="text-xs text-[#FF4D4D] flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.orderTotal.message}</span>
                    </p>
                  )}
                </div>

                {/* Calculate CTA Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-xl bg-[#FF4D4D] hover:bg-[#FF3333] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#FF4D4D]/25 hover:shadow-[#FF4D4D]/40 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Calculate Shipping Rates</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Dynamic Calculation Result Output Card */}
              <AnimatePresence>
                {calculationResult && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 pt-5 border-t border-slate-800 text-left space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Available Rates for {calculationResult.flag} {calculationResult.countryName}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#00F0FF]" />
                        <span>Est: {calculationResult.estimatedDelivery}</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Standard Result */}
                      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white">Standard Delivery</span>
                            {calculationResult.isFreeStandard ? (
                              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-[10px] uppercase font-bold">
                                FREE
                              </Badge>
                            ) : (
                              <span className="text-xs font-bold text-[#00F0FF]">
                                ${calculationResult.standardFee.toFixed(2)}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400 mt-1">3–5 Business Days</p>
                        </div>
                      </div>

                      {/* Express Result */}
                      <div className="p-3.5 rounded-xl bg-slate-950 border border-[#00F0FF]/30 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white flex items-center gap-1">
                              <Zap className="w-3.5 h-3.5 text-[#00F0FF]" />
                              <span>Express Air</span>
                            </span>
                            <span className="text-xs font-bold text-[#00F0FF]">
                              ${calculationResult.expressFee.toFixed(2)}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-1">1–2 Business Days</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
