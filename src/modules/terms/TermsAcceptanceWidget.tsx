"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  ShieldCheck,
  Send,
  Download,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const termsVerificationSchema = z.object({
  fullName: z.string().min(2, "Please enter your full legal name."),
  email: z.string().email("Please enter a valid email address."),
  action: z.enum(["request_pdf", "verify_status"]),
});

type TermsFormValues = z.infer<typeof termsVerificationSchema>;

export function TermsAcceptanceWidget() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    confirmationId: string;
    action: string;
    email: string;
    timestamp: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TermsFormValues>({
    resolver: zodResolver(termsVerificationSchema),
    defaultValues: {
      fullName: "Jane Doe",
      email: "jane@example.com",
      action: "request_pdf",
    },
  });

  const selectedAction = watch("action");

  const onSubmit = async (data: TermsFormValues) => {
    setIsSubmitting(true);
    setVerificationResult(null);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const now = new Date();
    const timestampStr = now.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    setVerificationResult({
      confirmationId: `TRM-${Math.floor(100000 + Math.random() * 900000)}`,
      action: data.action,
      email: data.email,
      timestamp: timestampStr,
    });

    setIsSubmitting(false);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#0B0F19] relative border-b border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-semibold text-[#00F0FF]">
            <FileText className="w-3.5 h-3.5" />
            <span>Interactive Terms Verification</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Request Official Agreement Copy
          </h2>

          <p className="text-slate-400 text-sm leading-relaxed">
            Obtain a timestamped digital PDF record of the MarketFlow Terms of Service for your commercial records or account verification.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl p-6 sm:p-8 bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-2xl relative overflow-hidden text-left">
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  Full Legal Name
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

            {/* Action Type Selection */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">
                Select Verification Action
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* PDF Copy */}
                <label
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    selectedAction === "request_pdf"
                      ? "bg-slate-950 border-[#00F0FF] ring-1 ring-[#00F0FF]/40"
                      : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="request_pdf"
                        {...register("action")}
                        className="text-[#00F0FF] focus:ring-[#00F0FF]"
                      />
                      <span className="text-xs font-bold text-white">Email Signed Terms PDF</span>
                    </div>
                    <Download className="w-4 h-4 text-[#00F0FF]" />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Receive a PDF copy of current terms timestamped for your records.
                  </p>
                </label>

                {/* Status Verification */}
                <label
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    selectedAction === "verify_status"
                      ? "bg-slate-950 border-emerald-500 ring-1 ring-emerald-500/40"
                      : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="verify_status"
                        {...register("action")}
                        className="text-emerald-400 focus:ring-emerald-400"
                      />
                      <span className="text-xs font-bold text-white">Verify Account Standing</span>
                    </div>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Confirm your account active agreement status & standing.
                  </p>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 rounded-xl bg-[#FF4D4D] hover:bg-[#FF3333] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#FF4D4D]/25 hover:shadow-[#FF4D4D]/40 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-white" />
                  <span>Generating Official Timestamp...</span>
                </>
              ) : (
                <>
                  <span>Request Official Document Copy</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Success Response Alert */}
          <AnimatePresence>
            {verificationResult && (
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
                      <span className="text-xs font-bold text-white">Request Dispatched!</span>
                      <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-[10px] uppercase font-bold">
                        {verificationResult.confirmationId}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-300">
                      An official copy has been dispatched to <strong className="text-white">{verificationResult.email}</strong>. Timestamp: <span className="text-[#00F0FF] font-mono">{verificationResult.timestamp}</span>.
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
