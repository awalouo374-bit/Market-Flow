"use client";

import { ShoppingBag, PackageCheck, Truck, CheckCircle2, XCircle } from "lucide-react";
import type { OrderStatusType } from "@/lib/user-orders";

interface OrderStatusStepperProps {
  status: OrderStatusType;
}

const STEPS = [
  { key: "ordered", label: "Ordered", icon: ShoppingBag },
  { key: "processing", label: "Processing", icon: PackageCheck },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "delivered", label: "Delivered", icon: CheckCircle2 },
];

function getStepIndex(status: OrderStatusType): number {
  switch (status) {
    case "pending":
      return 0;
    case "processing":
      return 1;
    case "shipped":
      return 2;
    case "delivered":
      return 3;
    case "cancelled":
    case "refunded":
      return -1;
    default:
      return 1;
  }
}

export function OrderStatusStepper({ status }: OrderStatusStepperProps) {
  const isCancelled = status === "cancelled" || status === "refunded";
  const activeIndex = getStepIndex(status);

  if (isCancelled) {
    return (
      <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold">
        <XCircle className="w-4 h-4 shrink-0" />
        <span>Order {status === "cancelled" ? "Cancelled" : "Refunded"} — No further action required</span>
      </div>
    );
  }

  return (
    <div className="space-y-2 py-2" aria-label={`Order status: ${status}`}>
      <div className="relative flex items-center justify-between">
        {/* Background track line */}
        <div className="absolute top-1/2 left-4 right-4 h-1 bg-border -translate-y-1/2 z-0" />
        
        {/* Active progress track line */}
        <div
          className="absolute top-1/2 left-4 h-1 bg-flow-gradient -translate-y-1/2 z-0 transition-all duration-500"
          style={{ width: `${(activeIndex / (STEPS.length - 1)) * 100}%` }}
        />

        {/* Step Nodes */}
        {STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isCompleted = idx < activeIndex;
          const isCurrent = idx === activeIndex;
          const isUpcoming = idx > activeIndex;

          return (
            <div key={step.key} className="relative z-10 flex flex-col items-center group">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isCompleted
                    ? "bg-flow-cyan text-white shadow-xs"
                    : isCurrent
                      ? "bg-market-navy text-white ring-4 ring-flow-cyan/30 shadow-glow-cyan"
                      : "bg-card border-2 border-border text-muted-foreground"
                }`}
              >
                <Icon className={`w-4 h-4 ${isCurrent ? "animate-pulse" : ""}`} />
              </div>
              <span
                className={`text-[10px] sm:text-xs font-bold mt-1.5 whitespace-nowrap ${
                  isCompleted || isCurrent ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
