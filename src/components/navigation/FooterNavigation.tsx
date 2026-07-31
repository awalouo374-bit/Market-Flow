"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { BrandButton } from "@/components/shared/BrandButton";
import { Mail, ArrowRight, ShieldCheck, Truck, RefreshCw, Headphones } from "lucide-react";
import { toast } from "sonner";

export function FooterNavigation() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Thank you for subscribing to MarketFlow updates!", {
      description: "We've sent a confirmation code to your inbox.",
    });
    setEmail("");
  };

  return (
    <footer className="bg-card border-t border-border text-foreground pt-16 pb-12 mt-auto">
      {/* Features Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 border-b border-border">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/40 border border-border/60 hover:border-accent/40 transition-colors">
            <div className="p-3 rounded-xl bg-flow-gradient text-white shadow-xs">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Free Global Shipping</h4>
              <p className="text-xs text-muted-foreground">On all orders over $100</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/40 border border-border/60 hover:border-accent/40 transition-colors">
            <div className="p-3 rounded-xl bg-flow-gradient text-white shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Secure Payment</h4>
              <p className="text-xs text-muted-foreground">256-bit SSL encrypted</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/40 border border-border/60 hover:border-accent/40 transition-colors">
            <div className="p-3 rounded-xl bg-flow-gradient text-white shadow-xs">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">30-Day Free Returns</h4>
              <p className="text-xs text-muted-foreground">Hassle-free guarantee</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/40 border border-border/60 hover:border-accent/40 transition-colors">
            <div className="p-3 rounded-xl bg-flow-gradient text-white shadow-xs">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">24/7 Expert Support</h4>
              <p className="text-xs text-muted-foreground">Dedicated customer care</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info & Newsletter */}
          <div className="lg:col-span-2 space-y-6">
            <BrandLogo size="md" showTagline />
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              MarketFlow is an ultra-fast, high-conversion e-commerce platform built with modern design principles and serverless PostgreSQL infrastructure.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3 max-w-sm">
              <label htmlFor="newsletter-email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                Subscribe to Insider Deals
              </label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full h-10 pl-9 pr-4 rounded-xl bg-muted/60 border border-border/80 text-sm focus:outline-none focus:ring-2 focus:ring-ring/50 transition-all"
                  />
                </div>
                <BrandButton type="submit" variant="flow" size="sm" className="h-10 px-4">
                  <ArrowRight className="w-4 h-4" />
                </BrandButton>
              </div>
            </form>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-foreground">Explore</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link href="/products" className="hover:text-accent transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-accent transition-colors">
                  Product Categories
                </Link>
              </li>
              <li>
                <Link href="/featured" className="hover:text-accent transition-colors">
                  Featured Items
                </Link>
              </li>
              <li>
                <Link href="/deals" className="hover:text-accent transition-colors">
                  Special Clearance Deals
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-foreground">Customer Care</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link href="/support" className="hover:text-accent transition-colors">
                  Help Center & FAQ
                </Link>
              </li>
              <li>
                <Link href="/account/orders" className="hover:text-accent transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-accent transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-accent transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
            </ul>
          </div>

          {/* Admin & Company */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-foreground">Company</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-accent transition-colors">
                  About MarketFlow
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-accent transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-accent transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-accent font-semibold hover:underline flex items-center gap-1">
                  <span>Admin Console</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Social Icons */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} MarketFlow Inc. All rights reserved.</p>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg hover:text-foreground hover:bg-muted transition-colors"
            aria-label="GitHub"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Twitter"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
