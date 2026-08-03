import type { Metadata } from "next";
import Link from "next/link";
import { ShieldX, ArrowLeft, Lock } from "lucide-react";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { BrandButton } from "@/components/shared/BrandButton";

export const metadata: Metadata = {
  title: "Access Denied — MarketFlow",
  description: "You are not authorized to access this page.",
};

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen w-full bg-[#0F172A] text-foreground flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-red-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-flow-cyan/10 blur-3xl pointer-events-none" />

      <div className="w-full max-w-lg bg-card/90 dark:bg-card/75 backdrop-blur-xl border border-border/80 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 space-y-8 animate-in zoom-in-95 duration-300 text-center">
        {/* Logo */}
        <Link href="/" className="inline-block transition-transform hover:scale-105">
          <BrandLogo size="md" />
        </Link>

        {/* Shield Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center">
            <ShieldX className="w-10 h-10 text-red-400" />
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Access <span className="text-red-400">Denied</span>
          </h1>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
            You do not have the required permissions to view this page. This area is restricted to authorized administrators only.
          </p>
        </div>

        {/* Permission Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-[11px] font-bold uppercase tracking-widest">
          <Lock className="w-3.5 h-3.5" />
          <span>Administrator Access Required</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link href="/">
            <BrandButton variant="flow" size="sm" className="shadow-lg">
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              Back to Store
            </BrandButton>
          </Link>
          <Link href="/login">
            <BrandButton variant="ghost" size="sm">
              Sign In as Admin
            </BrandButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
