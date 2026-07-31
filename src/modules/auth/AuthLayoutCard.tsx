"use client";

import React from "react";
import Link from "next/link";

interface AuthLayoutCardProps {
  children: React.ReactNode;
  footerPrompt?: string;
  footerLinkHref?: string;
  footerLinkLabel?: string;
}

export function AuthLayoutCard({
  children,
  footerPrompt = "Don't have a MarketFlow account yet?",
  footerLinkHref = "/register",
  footerLinkLabel = "Create an Account",
}: AuthLayoutCardProps) {
  return (
    <div className="min-h-screen w-full bg-[#0F172A] text-foreground flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-flow-cyan/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-flow-cyan/10 blur-3xl pointer-events-none" />

      {/* Main Glassmorphic Card */}
      <div className="w-full max-w-md bg-card/90 dark:bg-card/75 backdrop-blur-xl border border-border/80 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 space-y-6 animate-in zoom-in-95 duration-300">
        {children}

        {/* Footer Prompt */}
        <div className="pt-4 border-t border-border/60 text-center text-xs text-muted-foreground">
          {footerPrompt}{" "}
          <Link href={footerLinkHref} className="font-bold text-flow-cyan hover:underline">
            {footerLinkLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
