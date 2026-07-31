"use client";

import React from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { UserCheck } from "lucide-react";

export function RegisterHeader() {
  return (
    <div className="flex flex-col items-center text-center space-y-3">
      <Link href="/" className="inline-block transition-transform hover:scale-105">
        <BrandLogo size="md" />
      </Link>

      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-flow-cyan/10 border border-flow-cyan/30 text-flow-cyan text-[11px] font-bold uppercase tracking-widest">
        <UserCheck className="w-3.5 h-3.5" />
        <span>Customer Account Registration</span>
      </div>

      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          Create Your <span className="text-flow-gradient">Account</span>
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto">
          Join MarketFlow today for instant checkout, order tracking, and exclusive customer rewards.
        </p>
      </div>
    </div>
  );
}
