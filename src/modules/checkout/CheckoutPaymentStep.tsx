"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  Lock,
  AlertCircle,
  ChevronRight,
  ShieldCheck,
  Check,
  Loader2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const paymentSchema = z.object({
  cardholderName: z.string().min(2, "Cardholder name is required."),
  cardNumber: z
    .string()
    .min(16, "Enter a valid 16-digit card number.")
    .max(19, "Card number too long.")
    .regex(/^[\d\s\-]+$/, "Card number must contain only digits."),
  expiryDate: z
    .string()
    .min(5, "Enter expiry as MM/YY.")
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Enter expiry as MM/YY."),
  cvv: z
    .string()
    .min(3, "CVV must be 3–4 digits.")
    .max(4, "CVV must be 3–4 digits.")
    .regex(/^\d+$/, "CVV must contain only digits."),
  saveCard: z.boolean().optional(),
});

export type PaymentFormValues = z.infer<typeof paymentSchema>;

const INPUT_CLASS =
  "w-full h-11 px-3.5 rounded-xl bg-slate-950/90 border border-slate-700/80 text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00F0FF] focus:border-[#00F0FF] transition-all font-mono";
const LABEL_CLASS = "text-xs font-semibold text-slate-300 block mb-1.5";
const ERROR_CLASS = "text-xs text-[#FF4D4D] flex items-center gap-1 mt-1";

type PaymentMethod = "card" | "paypal" | "apple_pay";

interface Props {
  onNext: (data: PaymentFormValues) => void;
  onBack: () => void;
  isProcessing?: boolean;
}

function formatCardNumber(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
}

export function CheckoutPaymentStep({ onNext, onBack, isProcessing }: Props) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      saveCard: true,
    },
  });

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
    setValue("cardNumber", formatted, { shouldValidate: true });
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value);
    setExpiry(formatted);
    setValue("expiryDate", formatted, { shouldValidate: true });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <CreditCard className="w-5 h-5 text-[#00F0FF]" />
        <span>Payment Method</span>
      </h2>

      {/* Payment Method Selector Tabs */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {(["card", "paypal", "apple_pay"] as PaymentMethod[]).map((method) => (
          <button
            key={method}
            type="button"
            onClick={() => setPaymentMethod(method)}
            className={`h-11 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              paymentMethod === method
                ? "bg-slate-950 border-[#00F0FF] text-[#00F0FF] ring-1 ring-[#00F0FF]/30"
                : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
            }`}
          >
            {method === "card" && "💳 Card"}
            {method === "paypal" && "🅿 PayPal"}
            {method === "apple_pay" && "🍎 Apple Pay"}
          </button>
        ))}
      </div>

      {/* Card Form */}
      <AnimatePresence mode="wait">
        {paymentMethod === "card" && (
          <motion.form
            key="card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSubmit(onNext)}
            className="space-y-4"
          >
            {/* Cardholder Name */}
            <div>
              <label className={LABEL_CLASS}>Cardholder Name</label>
              <input
                {...register("cardholderName")}
                placeholder="Jane Doe"
                className={INPUT_CLASS}
              />
              {errors.cardholderName && (
                <p className={ERROR_CLASS}>
                  <AlertCircle className="w-3 h-3" />
                  {errors.cardholderName.message}
                </p>
              )}
            </div>

            {/* Card Number */}
            <div>
              <label className={LABEL_CLASS}>Card Number</label>
              <div className="relative">
                <CreditCard className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                <input
                  placeholder="4242 4242 4242 4242"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  className={`${INPUT_CLASS} pl-10`}
                  maxLength={19}
                />
              </div>
              {errors.cardNumber && (
                <p className={ERROR_CLASS}>
                  <AlertCircle className="w-3 h-3" />
                  {errors.cardNumber.message}
                </p>
              )}
            </div>

            {/* Expiry & CVV */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={LABEL_CLASS}>Expiry Date</label>
                <input
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={handleExpiryChange}
                  className={INPUT_CLASS}
                  maxLength={5}
                />
                {errors.expiryDate && (
                  <p className={ERROR_CLASS}>
                    <AlertCircle className="w-3 h-3" />
                    {errors.expiryDate.message}
                  </p>
                )}
              </div>
              <div>
                <label className={LABEL_CLASS}>CVV / CVC</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                  <input
                    type="password"
                    {...register("cvv")}
                    placeholder="•••"
                    className={`${INPUT_CLASS} pl-10`}
                    maxLength={4}
                  />
                </div>
                {errors.cvv && (
                  <p className={ERROR_CLASS}>
                    <AlertCircle className="w-3 h-3" />
                    {errors.cvv.message}
                  </p>
                )}
              </div>
            </div>

            {/* Save Card */}
            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="relative">
                <input
                  type="checkbox"
                  {...register("saveCard")}
                  className="sr-only peer"
                  id="save-card"
                />
                <div className="w-5 h-5 rounded border border-slate-600 peer-checked:bg-[#00F0FF] peer-checked:border-[#00F0FF] transition-colors flex items-center justify-center">
                  <Check className="w-3 h-3 text-slate-950 peer-checked:block hidden" />
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Save card for future purchases</p>
                <p className="text-[11px] text-slate-400">Stored securely via Stripe PCI DSS Level 1 vault</p>
              </div>
            </label>

            {/* Security Banner */}
            <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-950/60 border border-emerald-500/20 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong className="text-white">256-bit TLS encrypted</strong> · PCI DSS Level 1 Compliant · Powered by Stripe
              </span>
            </div>

            <div className="flex gap-3 pt-1">
              <button
                type="button"
                onClick={onBack}
                className="h-12 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition-colors border border-slate-700 cursor-pointer"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isProcessing}
                className="flex-1 h-12 rounded-xl bg-[#FF4D4D] hover:bg-[#FF3333] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#FF4D4D]/25 hover:shadow-[#FF4D4D]/40 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Place Secure Order
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}

        {(paymentMethod === "paypal" || paymentMethod === "apple_pay") && (
          <motion.div
            key={paymentMethod}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="p-8 rounded-xl bg-slate-950/60 border border-slate-800 text-center space-y-3">
              <p className="text-4xl">{paymentMethod === "paypal" ? "🅿" : "🍎"}</p>
              <p className="text-sm font-bold text-white">
                {paymentMethod === "paypal" ? "PayPal Express Checkout" : "Apple Pay"}
              </p>
              <p className="text-xs text-slate-400">
                You&apos;ll be securely redirected to complete payment upon clicking below.
              </p>
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
                disabled={isProcessing}
                className="flex-1 h-12 rounded-xl bg-[#FF4D4D] hover:bg-[#FF3333] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#FF4D4D]/25 hover:shadow-[#FF4D4D]/40 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Redirecting...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Continue with {paymentMethod === "paypal" ? "PayPal" : "Apple Pay"}
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
