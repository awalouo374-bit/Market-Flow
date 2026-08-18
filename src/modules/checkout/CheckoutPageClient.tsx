"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Lock, ArrowLeft, ChevronRight } from "lucide-react";
import { CheckoutContactForm, type ContactFormValues } from "@/modules/checkout/CheckoutContactForm";
import { CheckoutShippingStep, type ShippingMethod } from "@/modules/checkout/CheckoutShippingStep";
import { CheckoutPaymentStep, type PaymentFormValues } from "@/modules/checkout/CheckoutPaymentStep";
import { CheckoutSuccessScreen } from "@/modules/checkout/CheckoutSuccessScreen";
import { CheckoutOrderSummary } from "@/modules/checkout/CheckoutOrderSummary";
import { useCart } from "@/context/CartContext";

const STEPS = [
  { id: 0, label: "Contact" },
  { id: 1, label: "Shipping" },
  { id: 2, label: "Payment" },
  { id: 3, label: "Confirmed" },
];

export function CheckoutPageClient() {
  const { subtotal, clearCart } = useCart();
  const [step, setStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  // Stored form state across steps
  const [contactData, setContactData] = useState<ContactFormValues | null>(null);
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod | null>(null);
  const [orderResult, setOrderResult] = useState<{
    orderNumber: string;
    email: string;
    estimatedDelivery: string;
  } | null>(null);

  const handleContactNext = (data: ContactFormValues) => {
    setContactData(data);
    setStep(1);
  };

  const handleShippingNext = (method: ShippingMethod) => {
    setShippingMethod(method);
    setStep(2);
  };

  const handlePaymentNext = async (_data: PaymentFormValues) => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1800));

    const today = new Date();
    const estDate = new Date(today);
    const daysToAdd =
      shippingMethod?.id === "overnight"
        ? 1
        : shippingMethod?.id === "express"
        ? 2
        : 5;
    estDate.setDate(today.getDate() + daysToAdd);
    const estStr = estDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });

    setOrderResult({
      orderNumber: `MF-${Math.floor(10000 + Math.random() * 90000)}`,
      email: contactData?.email ?? "",
      estimatedDelivery: estStr,
    });

    setIsProcessing(false);
    clearCart();
    setStep(3);
  };

  const isConfirmed = step === 3;

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white selection:bg-[#00F0FF] selection:text-slate-950 font-sans">
      
      {/* Header Bar */}
      <div className="border-b border-slate-800/80 bg-[#0B0F19]/95 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo / Back */}
          <div className="flex items-center gap-3">
            {step > 0 && step < 3 && (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center cursor-pointer transition-colors"
              >
                <ArrowLeft className="w-4 h-4 text-slate-300" />
              </button>
            )}
            <span className="text-lg font-black text-white">
              Market<span className="text-[#00F0FF]">Flow</span>
            </span>
            <span className="text-slate-600 text-sm hidden sm:block">· Secure Checkout</span>
          </div>

          {/* Stepper Pills */}
          {!isConfirmed && (
            <div className="hidden md:flex items-center gap-1">
              {STEPS.slice(0, 3).map((s, idx) => (
                <React.Fragment key={s.id}>
                  <div
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                      step === s.id
                        ? "bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/40"
                        : step > s.id
                        ? "text-emerald-400"
                        : "text-slate-500"
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-black ${
                        step > s.id
                          ? "bg-emerald-500 text-white"
                          : step === s.id
                          ? "bg-[#00F0FF] text-slate-950"
                          : "bg-slate-800 text-slate-500"
                      }`}
                    >
                      {step > s.id ? "✓" : s.id + 1}
                    </span>
                    {s.label}
                  </div>
                  {idx < 2 && <ChevronRight className="w-3 h-3 text-slate-700" />}
                </React.Fragment>
              ))}
            </div>
          )}

          {/* Security Badge */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:block">SSL Secured</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        
        {isConfirmed && orderResult ? (
          /* Success Page */
          <div className="max-w-xl mx-auto">
            <div className="rounded-2xl p-6 sm:p-10 bg-slate-900/90 border border-slate-800 backdrop-blur-xl">
              <CheckoutSuccessScreen
                orderNumber={orderResult.orderNumber}
                email={orderResult.email}
                estimatedDelivery={orderResult.estimatedDelivery}
              />
            </div>
          </div>
        ) : (
          /* Two-Column Layout: Form + Sidebar */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Left: Checkout Steps */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl p-6 sm:p-8 bg-slate-900/90 border border-slate-800 backdrop-blur-xl">
                <AnimatePresence mode="wait">
                  {step === 0 && (
                    <CheckoutContactForm
                      key="contact"
                      onNext={handleContactNext}
                      defaultValues={contactData ?? undefined}
                    />
                  )}
                  {step === 1 && (
                    <CheckoutShippingStep
                      key="shipping"
                      subtotal={subtotal}
                      onNext={handleShippingNext}
                      onBack={() => setStep(0)}
                    />
                  )}
                  {step === 2 && (
                    <CheckoutPaymentStep
                      key="payment"
                      onNext={handlePaymentNext}
                      onBack={() => setStep(1)}
                      isProcessing={isProcessing}
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Trust Badges Strip */}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  PCI DSS Level 1
                </span>
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  256-bit TLS Encryption
                </span>
                <span className="flex items-center gap-1.5">
                  🔒 Stripe Payments
                </span>
              </div>
            </div>

            {/* Right: Order Summary Sidebar */}
            <div className="lg:col-span-5">
              <div className="sticky top-24">
                <CheckoutOrderSummary shippingMethod={shippingMethod ?? undefined} step={step} />
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
