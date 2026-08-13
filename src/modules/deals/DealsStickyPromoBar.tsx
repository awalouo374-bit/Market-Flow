"use client";

import { useState } from "react";
import { Zap, Copy, Check, X, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { DealsCountdown } from "./DealsCountdown";

export function DealsStickyPromoBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [copied, setCopied] = useState(false);

  if (!isVisible) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText("FLOWDEALS20");
    setCopied(true);
    toast.success("Promo code copied!", {
      description: "Use FLOWDEALS20 at checkout for an extra 20% off.",
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToGrid = () => {
    const element = document.getElementById("deals-grid-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      role="banner"
      aria-label="Limited Time Promotion"
      className="sticky top-16 z-40 w-full bg-market-navy-dark/95 backdrop-blur-md border-b border-flow-cyan/30 text-white shadow-lg transition-all"
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
        
        {/* Left: Badge & Description */}
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-linear-to-r from-amber-500 to-red-500 text-white font-extrabold text-[11px] uppercase tracking-wider shadow-xs animate-pulse">
            <Zap className="w-3.5 h-3.5 fill-white" />
            Flash Sale Active
          </span>
          <p className="hidden md:block text-white/90 font-medium">
            Get up to <strong className="text-amber-400 font-extrabold">50% OFF</strong> on top flagship tech + Extra 20% OFF!
          </p>
        </div>

        {/* Center: Live countdown */}
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline text-white/70 text-xs">Ends in:</span>
          <DealsCountdown compact />
        </div>

        {/* Right: Code copy & Action */}
        <div className="flex items-center gap-2 sm:gap-3 ml-auto sm:ml-0">
          <button
            type="button"
            onClick={handleCopyCode}
            aria-label="Copy promo code FLOWDEALS20"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono font-bold text-xs transition-colors cursor-pointer"
          >
            <span>Code: <strong>FLOWDEALS20</strong></span>
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-white/70" />
            )}
          </button>

          <button
            type="button"
            onClick={scrollToGrid}
            className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-flow-cyan text-white font-semibold text-xs hover:bg-flow-cyan-light hover:text-market-navy transition-colors cursor-pointer shadow-xs"
          >
            <span>Shop Deals</span>
            <ArrowRight className="w-3 h-3" />
          </button>

          <button
            type="button"
            onClick={() => setIsVisible(false)}
            aria-label="Dismiss promotion banner"
            className="p-1 rounded-md text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
