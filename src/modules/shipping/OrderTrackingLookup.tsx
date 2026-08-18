"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Package,
  CheckCircle2,
  Clock,
  Truck,
  MapPin,
  AlertCircle,
  Loader2,
  ArrowRight,
  ShieldCheck,
  Building,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const trackingSchema = z.object({
  orderNumber: z
    .string()
    .min(4, "Order number must be at least 4 characters.")
    .max(30, "Order number is too long."),
  email: z.string().email("Please enter a valid email address."),
});

type TrackingFormValues = z.infer<typeof trackingSchema>;

interface TrackingStatus {
  orderNumber: string;
  customerEmail: string;
  carrier: string;
  trackingCode: string;
  estimatedDelivery: string;
  currentLocation: string;
  statusStage: number; // 1 to 5
  steps: {
    title: string;
    description: string;
    timestamp: string;
    completed: boolean;
    current: boolean;
  }[];
}

export function OrderTrackingLookup() {
  const [isLoading, setIsLoading] = useState(false);
  const [trackingResult, setTrackingResult] = useState<TrackingStatus | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TrackingFormValues>({
    resolver: zodResolver(trackingSchema),
    defaultValues: {
      orderNumber: "MF-99482",
      email: "jane@example.com",
    },
  });

  const handleDemoFill = () => {
    setValue("orderNumber", "MF-99482");
    setValue("email", "jane@example.com");
  };

  const onSubmit = async (data: TrackingFormValues) => {
    setIsLoading(true);
    setTrackingResult(null);

    // Simulate API delay for realistic live lookup UX
    await new Promise((resolve) => setTimeout(resolve, 900));

    const today = new Date();
    const estDate = new Date(today);
    estDate.setDate(today.getDate() + 2);

    const estStr = estDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });

    setTrackingResult({
      orderNumber: data.orderNumber.toUpperCase(),
      customerEmail: data.email,
      carrier: "FedEx Express Air",
      trackingCode: "FX-9083149182US",
      estimatedDelivery: estStr,
      currentLocation: "Memphis Global Air Sorting Hub (TN)",
      statusStage: 3, // In Transit
      steps: [
        {
          title: "Order Confirmed & Payment Verified",
          description: "MarketFlow Fulfillment Hub, Austin TX",
          timestamp: "Aug 16, 09:14 AM",
          completed: true,
          current: false,
        },
        {
          title: "Quality Audit & Custom Box Packaging",
          description: "Item inspected, sealed in eco-mailer",
          timestamp: "Aug 16, 02:45 PM",
          completed: true,
          current: false,
        },
        {
          title: "In Transit — Sorting Hub Departure",
          description: "Arrived at Memphis Global Air Sorting Facility",
          timestamp: "Aug 17, 04:20 AM",
          completed: true,
          current: true,
        },
        {
          title: "Out for Local Delivery",
          description: "Dispatched with local courier driver",
          timestamp: "Pending",
          completed: false,
          current: false,
        },
        {
          title: "Package Delivered & Signed",
          description: "Front door / recipient handover",
          timestamp: "Pending",
          completed: false,
          current: false,
        },
      ],
    });

    setIsLoading(false);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#0B0F19] relative border-b border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Card Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-[#00F0FF]/30 text-xs font-semibold text-[#00F0FF]">
            <Search className="w-3.5 h-3.5" />
            <span>Instant Order Lookup</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Track Your Shipment Live
          </h2>

          <p className="text-slate-400 text-sm leading-relaxed">
            Enter your MarketFlow order number and email address to view step-by-step dispatch updates and real-time location.
          </p>
        </div>

        {/* Lookup Glassmorphic Card */}
        <div className="rounded-2xl p-6 sm:p-8 bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Order Number Input */}
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

              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  Account / Order Email
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

            {/* Quick Demo Pre-fill Button */}
            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={handleDemoFill}
                className="text-xs text-[#00F0FF] hover:underline flex items-center gap-1 font-medium cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span>Fill Sample Demo Order (MF-99482)</span>
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-xl bg-[#00F0FF] hover:bg-[#00D8E6] text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-[#00F0FF]/20 hover:shadow-[#00F0FF]/35 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-slate-950" />
                  <span>Searching Global Courier Networks...</span>
                </>
              ) : (
                <>
                  <span>Track Package Now</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Tracking Result Details & Progress Stage Timeline */}
          <AnimatePresence>
            {trackingResult && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="mt-8 pt-6 border-t border-slate-800 text-left space-y-6"
              >
                {/* Result Top Summary Banner */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-400">Order:</span>
                      <span className="text-sm font-mono font-bold text-white">{trackingResult.orderNumber}</span>
                      <Badge className="bg-[#00F0FF]/10 text-[#00F0FF] border-[#00F0FF]/30 text-[10px] uppercase font-bold ml-1">
                        In Transit
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-400 flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-[#00F0FF]" />
                      <span>Carrier: <strong className="text-white">{trackingResult.carrier}</strong> ({trackingResult.trackingCode})</span>
                    </p>
                  </div>

                  <div className="text-left sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800">
                    <span className="text-[11px] font-semibold uppercase text-slate-400 block">Est. Delivery</span>
                    <span className="text-base font-bold text-emerald-400">{trackingResult.estimatedDelivery}</span>
                  </div>
                </div>

                {/* Current Location Note */}
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300">
                  <MapPin className="w-4 h-4 text-[#FF4D4D] shrink-0" />
                  <span>Current Hub: <strong className="text-white">{trackingResult.currentLocation}</strong></span>
                </div>

                {/* Progress Steps Timeline */}
                <div className="space-y-4 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Shipment Timeline
                  </h4>

                  <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
                    {trackingResult.steps.map((step, idx) => (
                      <div key={idx} className="relative flex items-start justify-between gap-4 group">
                        {/* Timeline Node Icon */}
                        <div
                          className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border transition-colors ${
                            step.completed
                              ? "bg-[#00F0FF] border-[#00F0FF] text-slate-950"
                              : step.current
                              ? "bg-slate-900 border-[#00F0FF] text-[#00F0FF] animate-pulse"
                              : "bg-slate-950 border-slate-700 text-slate-600"
                          }`}
                        >
                          {step.completed ? (
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          ) : (
                            <span>{idx + 1}</span>
                          )}
                        </div>

                        {/* Step Details */}
                        <div className="space-y-0.5">
                          <p className={`text-sm font-bold ${step.completed || step.current ? "text-white" : "text-slate-500"}`}>
                            {step.title}
                          </p>
                          <p className="text-xs text-slate-400">{step.description}</p>
                        </div>

                        {/* Timestamp */}
                        <div className="text-right shrink-0">
                          <span className={`text-xs font-mono font-medium ${step.completed ? "text-slate-300" : "text-slate-600"}`}>
                            {step.timestamp}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
