"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  Package,
  ArrowRight,
  Sparkles,
  QrCode,
  CreditCard,
  RefreshCw,
  AlertCircle,
  Clock,
  Gift,
  Loader2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const returnFormSchema = z.object({
  orderNumber: z
    .string()
    .min(4, "Order number must be at least 4 characters.")
    .max(30, "Order number is too long."),
  email: z.string().email("Please enter a valid account email address."),
  returnReason: z.string().min(1, "Please select a return reason."),
  refundPreference: z.enum(["store_credit", "original_payment"]),
});

type ReturnFormValues = z.infer<typeof returnFormSchema>;

const REASONS = [
  "Wrong Size or Fit",
  "Changed My Mind",
  "Item Defective / Not Working",
  "Item Arrived Damaged",
  "Not as Described on Website",
  "Ordered Multiple Sizes to Try",
];

export function ReturnsHeroPortal() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [returnSuccess, setReturnSuccess] = useState<{
    rmaNumber: string;
    refundPreference: string;
    bonusApplied: boolean;
    qrCodeValue: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ReturnFormValues>({
    resolver: zodResolver(returnFormSchema),
    defaultValues: {
      orderNumber: "MF-99482",
      email: "jane@example.com",
      returnReason: "Wrong Size or Fit",
      refundPreference: "store_credit",
    },
  });

  const selectedRefundPref = watch("refundPreference");

  const handleDemoFill = () => {
    setValue("orderNumber", "MF-99482");
    setValue("email", "jane@example.com");
    setValue("returnReason", "Wrong Size or Fit");
    setValue("refundPreference", "store_credit");
  };

  const onSubmit = async (data: ReturnFormValues) => {
    setIsSubmitting(true);
    setReturnSuccess(null);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const rma = `RMA-${Math.floor(100000 + Math.random() * 900000)}`;

    setReturnSuccess({
      rmaNumber: rma,
      refundPreference: data.refundPreference,
      bonusApplied: data.refundPreference === "store_credit",
      qrCodeValue: `https://marketflow.com/rma/${rma}`,
    });

    setIsSubmitting(false);
  };

  return (
    <section className="relative overflow-hidden py-16 lg:py-24 border-b border-slate-800/80 bg-[#0B0F19]">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#00F0FF]/15 via-[#00F0FF]/5 to-transparent blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[250px] bg-gradient-to-br from-[#FF4D4D]/10 to-transparent blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Text & Policy Guarantee */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-[#00F0FF]/30 text-xs font-semibold text-[#00F0FF] backdrop-blur-md">
              <RotateCcw className="w-4 h-4 text-[#00F0FF] animate-spin-slow" />
              <span>30-Day Hassle-Free Return Guarantee</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
              Returns Made Simple, <br />
              <span className="bg-gradient-to-r from-[#00F0FF] via-cyan-200 to-white bg-clip-text text-transparent">
                Refunds Delivered Fast.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
              Initiate instant self-service returns in under 60 seconds. Enjoy <strong className="text-white font-semibold">Free Prepaid Return Labels</strong>, QR code drop-offs, and an extra <strong className="text-[#00F0FF]">$5 bonus credit</strong> when choosing instant store credit.
            </p>

            {/* Quick Guarantee Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
                <Clock className="w-5 h-5 text-[#00F0FF] shrink-0" />
                <div className="text-left">
                  <p className="text-xs font-bold text-white">30 Days Window</p>
                  <p className="text-[11px] text-slate-400">From Delivery Date</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
                <QrCode className="w-5 h-5 text-[#00F0FF] shrink-0" />
                <div className="text-left">
                  <p className="text-xs font-bold text-white">Printerless QR</p>
                  <p className="text-[11px] text-slate-400">Mobile Drop-Off</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm col-span-2 sm:col-span-1">
                <Gift className="w-5 h-5 text-[#FF4D4D] shrink-0" />
                <div className="text-left">
                  <p className="text-xs font-bold text-white">+$5 Store Credit</p>
                  <p className="text-[11px] text-slate-400">Instant Bonus</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Self-Service Return Portal */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl p-6 sm:p-8 bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl relative overflow-hidden text-left"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-5 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#00F0FF]/10 border border-[#00F0FF]/30 flex items-center justify-center text-[#00F0FF]">
                    <RefreshCw className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">Self-Service Return Portal</h2>
                    <p className="text-xs text-slate-400">Start an instant return or exchange</p>
                  </div>
                </div>

                <Badge variant="outline" className="border-[#00F0FF]/40 text-[#00F0FF] bg-[#00F0FF]/5 text-xs px-2.5 py-1">
                  Instant RMA
                </Badge>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Order Number */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 block">
                      Order Number
                    </label>
                    <div className="relative">
                      <Package className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="text"
                        {...register("orderNumber")}
                        placeholder="e.g. MF-99482"
                        className="w-full h-11 pl-10 pr-4 rounded-xl bg-slate-950/90 border border-slate-700/80 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#00F0FF] focus:border-[#00F0FF] transition-all uppercase placeholder:normal-case font-mono"
                      />
                    </div>
                    {errors.orderNumber && (
                      <p className="text-xs text-[#FF4D4D] flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.orderNumber.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 block">
                      Account Email
                    </label>
                    <input
                      type="email"
                      {...register("email")}
                      placeholder="name@example.com"
                      className="w-full h-11 px-3.5 rounded-xl bg-slate-950/90 border border-slate-700/80 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#00F0FF] focus:border-[#00F0FF] transition-all"
                    />
                    {errors.email && (
                      <p className="text-xs text-[#FF4D4D] flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.email.message}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Return Reason Select */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">
                    Reason for Return / Exchange
                  </label>
                  <select
                    {...register("returnReason")}
                    className="w-full h-11 px-3.5 rounded-xl bg-slate-950/90 border border-slate-700/80 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#00F0FF] focus:border-[#00F0FF] transition-all cursor-pointer"
                  >
                    {REASONS.map((r, idx) => (
                      <option key={idx} value={r} className="bg-slate-900 text-white">
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Refund Method Radio Options */}
                <div className="space-y-2 pt-1">
                  <label className="text-xs font-semibold text-slate-300 block">
                    Select Refund Method
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Option 1: Store Credit */}
                    <label
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                        selectedRefundPref === "store_credit"
                          ? "bg-slate-950 border-[#00F0FF] ring-1 ring-[#00F0FF]/40"
                          : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            value="store_credit"
                            {...register("refundPreference")}
                            className="text-[#00F0FF] focus:ring-[#00F0FF]"
                          />
                          <span className="text-xs font-bold text-white">Store Credit</span>
                        </div>
                        <Badge className="bg-[#00F0FF]/15 text-[#00F0FF] border-[#00F0FF]/30 text-[10px]">
                          +$5 Bonus
                        </Badge>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-2">
                        Issued instantly upon first carrier package scan.
                      </p>
                    </label>

                    {/* Option 2: Original Payment Method */}
                    <label
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                        selectedRefundPref === "original_payment"
                          ? "bg-slate-950 border-[#00F0FF] ring-1 ring-[#00F0FF]/40"
                          : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            value="original_payment"
                            {...register("refundPreference")}
                            className="text-[#00F0FF] focus:ring-[#00F0FF]"
                          />
                          <span className="text-xs font-bold text-white">Original Payment</span>
                        </div>
                        <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                      <p className="text-[11px] text-slate-400 mt-2">
                        Refunded to card within 2-3 banking days.
                      </p>
                    </label>
                  </div>
                </div>

                {/* Demo Button & Action Button */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={handleDemoFill}
                    className="text-xs text-[#00F0FF] hover:underline flex items-center gap-1 font-medium cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
                    <span>Fill Demo Order (MF-99482)</span>
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-xl bg-[#FF4D4D] hover:bg-[#FF3333] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#FF4D4D]/25 hover:shadow-[#FF4D4D]/40 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin text-white" />
                      <span>Generating Prepaid Label...</span>
                    </>
                  ) : (
                    <>
                      <span>Generate Prepaid Return Label</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* RMA Return Success Output */}
              <AnimatePresence>
                {returnSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="mt-6 pt-5 border-t border-slate-800 space-y-4"
                  >
                    <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">Return Authorization Created!</span>
                          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-[10px] uppercase font-bold">
                            {returnSuccess.rmaNumber}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-300">
                          Your prepaid shipping label and mobile QR code have been emailed to your account. Drop off your package at any FedEx or UPS drop box.
                        </p>
                        {returnSuccess.bonusApplied && (
                          <p className="text-xs font-bold text-[#00F0FF] flex items-center gap-1 pt-1">
                            <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
                            <span>+$5.00 Instant Store Credit Bonus will be credited on scan!</span>
                          </p>
                        )}
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
