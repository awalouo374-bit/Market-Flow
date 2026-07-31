"use client";

import React from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { ShieldCheck } from "lucide-react";

export function AuthHeader() {
  return (
    <div className="flex flex-col items-center text-center space-y-3">
      <Link href="/" className="inline-block transition-transform hover:scale-105">
        <BrandLogo size="md" />
      </Link>

      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-flow-cyan/10 border border-flow-cyan/30 text-flow-cyan text-[11px] font-bold uppercase tracking-widest">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>Secure Commerce Access</span>
      </div>

      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          Welcome Back to <span className="text-flow-gradient">MarketFlow</span>
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto">
          Sign in to manage your orders, access exclusive deals, and streamline your checkout experience.
        </p>
      </div>
    </div>
  );
}
