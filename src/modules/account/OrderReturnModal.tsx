"use client";

import { useState } from "react";
import { X, RotateCcw, ShieldCheck, Check } from "lucide-react";
import type { CustomerOrder } from "@/lib/user-orders";
import { BrandButton } from "@/components/shared/BrandButton";
import { toast } from "sonner";

interface OrderReturnModalProps {
  order: CustomerOrder | null;
  onClose: () => void;
}

const REASON_OPTIONS = [
  "Item defective or damaged upon arrival",
  "Incorrect item or size received",
  "No longer needed / Changed mind",
  "Item does not match product description",
];

export function OrderReturnModal({ order, onClose }: OrderReturnModalProps) {
  const [selectedReason, setSelectedReason] = useState(REASON_OPTIONS[0]);
  const [returnType, setReturnType] = useState<"refund" | "exchange">("refund");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!order) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Return Request Submitted!", {
        description: `Reference #${order.orderNumber} — Return label sent to your email.`,
      });
      onClose();
    }, 600);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="return-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      <div
        className="relative w-full max-w-lg bg-card border border-border rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h2 id="return-title" className="text-lg font-bold text-foreground">
                Return or Exchange
              </h2>
              <p className="text-xs text-muted-foreground">Order #{order.orderNumber}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close return dialog"
            className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Action Choice: Refund vs Exchange */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-foreground">Preferred Resolution:</span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setReturnType("refund")}
                className={`p-3 rounded-2xl border text-xs font-bold transition-all text-center cursor-pointer ${
                  returnType === "refund"
                    ? "border-flow-cyan bg-flow-cyan/10 text-flow-cyan"
                    : "border-border bg-muted/30 text-muted-foreground hover:border-foreground/30"
                }`}
              >
                Refund to Payment
              </button>
              <button
                type="button"
                onClick={() => setReturnType("exchange")}
                className={`p-3 rounded-2xl border text-xs font-bold transition-all text-center cursor-pointer ${
                  returnType === "exchange"
                    ? "border-flow-cyan bg-flow-cyan/10 text-flow-cyan"
                    : "border-border bg-muted/30 text-muted-foreground hover:border-foreground/30"
                }`}
              >
                Exchange Item
              </button>
            </div>
          </div>

          {/* Reason Selector */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-foreground">Reason for Return:</span>
            <div className="space-y-2">
              {REASON_OPTIONS.map((reason) => (
                <button
                  key={reason}
                  type="button"
                  onClick={() => setSelectedReason(reason)}
                  className={`w-full p-3 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                    selectedReason === reason
                      ? "border-flow-cyan bg-flow-cyan/5 text-foreground"
                      : "border-border bg-card text-muted-foreground hover:bg-muted/30"
                  }`}
                >
                  <span>{reason}</span>
                  {selectedReason === reason && <Check className="w-4 h-4 text-flow-cyan" />}
                </button>
              ))}
            </div>
          </div>

          {/* Policy Callout */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/40 text-[11px] text-muted-foreground">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>MarketFlow 30-Day Money Back Guarantee applies to all eligible purchases.</span>
          </div>

          {/* Submit Action */}
          <BrandButton
            type="submit"
            disabled={isSubmitting}
            variant="flow"
            size="md"
            fullWidth
            className="shadow-glow-cyan"
          >
            {isSubmitting ? "Submitting Request..." : "Request Prepaid Return Label"}
          </BrandButton>
        </form>
      </div>
    </div>
  );
}
