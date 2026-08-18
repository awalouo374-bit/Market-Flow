"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Package, Truck, ArrowRight, Home } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Props {
  orderNumber: string;
  email: string;
  estimatedDelivery: string;
}

export function CheckoutSuccessScreen({ orderNumber, email, estimatedDelivery }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-8 space-y-8"
    >
      {/* Success Animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
        className="w-24 h-24 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto"
      >
        <CheckCircle2 className="w-12 h-12 text-emerald-400" />
      </motion.div>

      {/* Title */}
      <div className="space-y-2">
        <h2 className="text-3xl font-extrabold text-white tracking-tight">Order Confirmed!</h2>
        <p className="text-slate-400 text-sm leading-relaxed max-w-sm mx-auto">
          Your order has been placed and is being processed at our fulfillment center.
        </p>
      </div>

      {/* Order Details Card */}
      <div className="rounded-2xl p-6 bg-slate-950 border border-slate-800 text-left space-y-4 max-w-sm mx-auto">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">Order Number</span>
          <Badge className="bg-[#00F0FF]/20 text-[#00F0FF] border-[#00F0FF]/30 font-mono text-xs font-bold">
            {orderNumber}
          </Badge>
        </div>

        <div className="flex items-center justify-between border-t border-slate-800 pt-3">
          <span className="text-xs font-semibold text-slate-400">Confirmation Sent To</span>
          <span className="text-xs text-white font-medium">{email}</span>
        </div>

        <div className="flex items-center justify-between border-t border-slate-800 pt-3">
          <span className="text-xs font-semibold text-slate-400">Estimated Delivery</span>
          <span className="text-xs font-bold text-emerald-400">{estimatedDelivery}</span>
        </div>
      </div>

      {/* Progress Timeline */}
      <div className="flex items-center justify-center gap-0 max-w-sm mx-auto">
        {[
          { label: "Order Placed", icon: CheckCircle2, done: true },
          { label: "Processing", icon: Package, done: true },
          { label: "Shipped", icon: Truck, done: false },
          { label: "Delivered", icon: Home, done: false },
        ].map((step, idx, arr) => {
          const Icon = step.icon;
          return (
            <React.Fragment key={idx}>
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all ${
                    step.done
                      ? "bg-[#00F0FF] border-[#00F0FF] text-slate-950"
                      : "bg-slate-900 border-slate-700 text-slate-500"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className={`text-[10px] font-semibold ${step.done ? "text-[#00F0FF]" : "text-slate-500"}`}>
                  {step.label}
                </span>
              </div>
              {idx < arr.length - 1 && (
                <div className={`h-0.5 flex-1 mb-5 ${idx < 1 ? "bg-[#00F0FF]" : "bg-slate-800"}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
        <Link href="/account/orders">
          <button
            type="button"
            className="h-12 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition-colors border border-slate-700 flex items-center gap-2 cursor-pointer w-full sm:w-auto"
          >
            <Package className="w-4 h-4 text-[#00F0FF]" />
            Track My Order
          </button>
        </Link>
        <Link href="/products">
          <button
            type="button"
            className="h-12 px-6 rounded-xl bg-[#FF4D4D] hover:bg-[#FF3333] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#FF4D4D]/25 hover:shadow-[#FF4D4D]/40 transition-all flex items-center gap-2 cursor-pointer w-full sm:w-auto"
          >
            Continue Shopping
            <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </div>
    </motion.div>
  );
}
