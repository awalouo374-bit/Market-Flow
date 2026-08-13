"use client";

import { Search, MessageSquare, Mail, PhoneCall, Zap, Clock } from "lucide-react";
import { toast } from "sonner";

interface SupportHeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onScrollToForm: () => void;
}

export function SupportHero({ searchQuery, onSearchChange, onScrollToForm }: SupportHeroProps) {
  const handleLiveChat = () => {
    toast.info("Connecting to MarketFlow Live Support...", {
      description: "Average wait time: < 1 minute.",
    });
  };

  return (
    <section
      aria-labelledby="support-hero-heading"
      className="relative overflow-hidden rounded-3xl bg-flow-gradient px-6 py-12 sm:px-12 sm:py-16 text-white shadow-2xl"
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-flow-cyan-light/25 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-market-navy-dark/50 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-bold border border-white/20 shadow-xs">
          <Zap className="w-4 h-4 text-flow-cyan-light animate-pulse" />
          <span>MarketFlow Help & Customer Support Hub</span>
        </div>

        {/* Headline */}
        <div className="space-y-3">
          <h1
            id="support-hero-heading"
            className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight text-white"
          >
            How can we{" "}
            <span className="bg-gradient-to-r from-flow-cyan-light via-white to-flow-cyan bg-clip-text text-transparent">
              help you
            </span>{" "}
            today?
          </h1>
          <p className="text-white/85 text-base sm:text-lg max-w-xl mx-auto">
            Search our knowledge base, explore frequent answers, or get in touch directly with our support specialists.
          </p>
        </div>

        {/* High-Impact Search Input */}
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search for answers (e.g. tracking, returns, warranty, payment)..."
            className="w-full h-14 pl-12 pr-4 rounded-2xl border border-white/30 bg-card/95 backdrop-blur-md text-foreground text-sm placeholder:text-muted-foreground shadow-2xl focus:outline-hidden focus:ring-2 focus:ring-flow-cyan transition-all"
          />
        </div>

        {/* Omnichannel Direct Contact Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          
          {/* Live Chat */}
          <button
            type="button"
            onClick={handleLiveChat}
            className="flex items-center gap-3 p-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-left transition-colors cursor-pointer"
          >
            <div className="p-2.5 rounded-xl bg-flow-cyan text-white shrink-0 shadow-xs">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm text-white flex items-center gap-1.5">
                <span>Live Chat</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </p>
              <p className="text-xs text-white/70">Wait time: &lt; 1 min</p>
            </div>
          </button>

          {/* Email Support Form */}
          <button
            type="button"
            onClick={onScrollToForm}
            className="flex items-center gap-3 p-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-left transition-colors cursor-pointer"
          >
            <div className="p-2.5 rounded-xl bg-amber-500 text-white shrink-0 shadow-xs">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm text-white">Email Ticket</p>
              <p className="text-xs text-white/70">Response within 2 hrs</p>
            </div>
          </button>

          {/* Phone Hotline */}
          <a
            href="tel:18005550199"
            className="flex items-center gap-3 p-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-left transition-colors"
          >
            <div className="p-2.5 rounded-xl bg-emerald-500 text-white shrink-0 shadow-xs">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm text-white">Call Support</p>
              <p className="text-xs text-white/70 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                24/7 Toll-Free
              </p>
            </div>
          </a>

        </div>

      </div>
    </section>
  );
}
