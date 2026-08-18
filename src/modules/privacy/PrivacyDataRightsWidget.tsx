"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Download,
  Trash2,
  BellOff,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  ShieldCheck,
  Lock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const dataRightsSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Please enter a valid email address."),
  requestType: z.enum(["data_export", "account_erasure", "marketing_optout"]),
  notes: z.string().optional(),
});

type DataRightsFormValues = z.infer<typeof dataRightsSchema>;

export function PrivacyDataRightsWidget() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState<{
    requestId: string;
    requestType: string;
    email: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DataRightsFormValues>({
    resolver: zodResolver(dataRightsSchema),
    defaultValues: {
      fullName: "Jane Doe",
      email: "jane@example.com",
      requestType: "data_export",
    },
  });

  const selectedType = watch("requestType");

  const onSubmit = async (data: DataRightsFormValues) => {
    setIsSubmitting(true);
    setRequestSuccess(null);

    await new Promise((resolve) => setTimeout(resolve, 800));

    setRequestSuccess({
      requestId: `REQ-${Math.floor(100000 + Math.random() * 900000)}`,
      requestType: data.requestType,
      email: data.email,
    });

    setIsSubmitting(false);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#0B0F19] relative border-b border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-semibold text-[#00F0FF]">
            <Lock className="w-3.5 h-3.5" />
            <span>Interactive Data Control Center</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Exercise Your Privacy Rights
          </h2>

          <p className="text-slate-400 text-sm leading-relaxed">
            Submit a GDPR / CCPA request to download your entire data archive, opt out of marketing communications, or permanently delete your account profile.
          </p>
        </div>

        {/* Form Glassmorphic Card */}
        <div className="rounded-2xl p-6 sm:p-8 bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-2xl relative overflow-hidden text-left">
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  Full Name
                </label>
                <input
                  type="text"
                  {...register("fullName")}
                  placeholder="Jane Doe"
                  className="w-full h-11 px-3.5 rounded-xl bg-slate-950/90 border border-slate-700/80 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#00F0FF] focus:border-[#00F0FF] transition-all"
                />
                {errors.fullName && (
                  <p className="text-xs text-[#FF4D4D] flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.fullName.message}</span>
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  Account Email Address
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

            {/* Request Type Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">
                Select Request Action
              </label>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Export Data */}
                <label
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    selectedType === "data_export"
                      ? "bg-slate-950 border-[#00F0FF] ring-1 ring-[#00F0FF]/40"
                      : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="data_export"
                        {...register("requestType")}
                        className="text-[#00F0FF] focus:ring-[#00F0FF]"
                      />
                      <span className="text-xs font-bold text-white">Download Data</span>
                    </div>
                    <Download className="w-4 h-4 text-[#00F0FF]" />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Receive a JSON/CSV archive of your purchases & profile.
                  </p>
                </label>

                {/* Account Erasure */}
                <label
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    selectedType === "account_erasure"
                      ? "bg-slate-950 border-[#FF4D4D] ring-1 ring-[#FF4D4D]/40"
                      : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="account_erasure"
                        {...register("requestType")}
                        className="text-[#FF4D4D] focus:ring-[#FF4D4D]"
                      />
                      <span className="text-xs font-bold text-white">Delete Profile</span>
                    </div>
                    <Trash2 className="w-4 h-4 text-[#FF4D4D]" />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Permanently erase personal data from our servers.
                  </p>
                </label>

                {/* Marketing Opt-out */}
                <label
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    selectedType === "marketing_optout"
                      ? "bg-slate-950 border-emerald-500 ring-1 ring-emerald-500/40"
                      : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="marketing_optout"
                        {...register("requestType")}
                        className="text-emerald-400 focus:ring-emerald-400"
                      />
                      <span className="text-xs font-bold text-white">Opt-Out Promos</span>
                    </div>
                    <BellOff className="w-4 h-4 text-emerald-400" />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Stop all promotional emails and personalized suggestions.
                  </p>
                </label>
              </div>
            </div>

            {/* Optional Notes */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">
                Additional Comments / Verification Notes (Optional)
              </label>
              <textarea
                {...register("notes")}
                rows={2}
                placeholder="Specify any additional details or region (e.g. EU GDPR / California CCPA)..."
                className="w-full p-3 rounded-xl bg-slate-950/90 border border-slate-700/80 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#00F0FF] focus:border-[#00F0FF] transition-all resize-none"
              />
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 rounded-xl bg-[#00F0FF] hover:bg-[#00D8E6] text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-[#00F0FF]/20 hover:shadow-[#00F0FF]/35 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-slate-950" />
                  <span>Encrypting Request & Verifying Identity...</span>
                </>
              ) : (
                <>
                  <span>Submit Verified Data Request</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Success Response Alert */}
          <AnimatePresence>
            {requestSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="mt-6 pt-5 border-t border-slate-800"
              >
                <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/40 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">Privacy Request Logged!</span>
                      <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-[10px] uppercase font-bold">
                        {requestSuccess.requestId}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-300">
                      A secure identity verification link has been dispatched to <strong className="text-white">{requestSuccess.email}</strong>. Once confirmed, your request will be processed within 48 hours.
                    </p>
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
