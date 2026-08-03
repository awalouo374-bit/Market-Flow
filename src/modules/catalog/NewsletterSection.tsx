"use client";

import { useState } from "react";
import { Zap } from "lucide-react";
import { GradientText } from "@/components/shared/GradientText";
import { BrandButton } from "@/components/shared/BrandButton";
import { toast } from "sonner";

export function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("You're subscribed!", {
      description: "Check your inbox for a confirmation email.",
    });
    setEmail("");
  };

  return (
    <section
      className="relative overflow-hidden rounded-3xl border border-border bg-card px-8 py-12 text-center"
      aria-labelledby="newsletter-heading"
    >
      <div
        className="absolute inset-0 bg-linear-to-br from-accent/5 to-transparent pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative z-10 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/5 text-accent text-xs font-semibold">
          <Zap className="w-3 h-3" />
          Insider Access
        </div>

        <GradientText
          as="h2"
          id="newsletter-heading"
          variant="flow"
          className="text-3xl font-extrabold"
        >
          Get Exclusive Deals First
        </GradientText>

        <p className="text-muted-foreground max-w-md mx-auto text-sm">
          Join 50,000+ subscribers and get early access to flash sales, new
          arrivals, and member-only discounts.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-2"
          aria-label="Newsletter signup"
        >
          <label htmlFor="home-newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="home-newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 w-full h-11 px-4 rounded-xl border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-all"
          />
          <BrandButton type="submit" variant="flow" size="md" className="w-full sm:w-auto">
            Subscribe
          </BrandButton>
        </form>

        <p className="text-xs text-muted-foreground">
          No spam, ever. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
