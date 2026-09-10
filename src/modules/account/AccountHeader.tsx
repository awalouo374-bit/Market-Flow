"use client";

import Link from "next/link";
import { 
  Package, 
  Clock, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Crown,
  ChevronRight,
  Sparkles
} from "lucide-react";
import type { AccountProfile, AccountStats } from "@/lib/user-account";

interface AccountHeaderProps {
  profile: AccountProfile;
  stats: AccountStats;
}

export function AccountHeader({ profile, stats }: AccountHeaderProps) {
  const initials = (profile.name || profile.email || "MF")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0c1427] via-[#090e1b] to-[#070a14] p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
      {/* Decorative ambient background glows */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[oklch(0.72_0.16_220)]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[oklch(0.24_0.06_250)]/30 blur-3xl" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        {/* User Identity Info */}
        <div className="flex items-center gap-5 sm:gap-6 min-w-0">
          <div className="relative shrink-0">
            {profile.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.image}
                alt={profile.name}
                className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl object-cover ring-2 ring-[oklch(0.72_0.16_220)]/60 shadow-[0_0_24px_oklch(0.72_0.16_220/25%)]"
              />
            ) : (
              <div className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-[oklch(0.30_0.08_250)] via-[oklch(0.24_0.06_250)] to-[oklch(0.72_0.16_220)] text-white text-2xl sm:text-3xl font-extrabold shadow-[0_0_24px_oklch(0.72_0.16_220/30%)] ring-2 ring-[oklch(0.72_0.16_220)]/50">
                {initials}
              </div>
            )}
            
            {/* VIP / Verified Mini Badge on Avatar */}
            <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-xl bg-[#090e1b] border border-white/15 text-[oklch(0.72_0.16_220)] shadow-md">
              {profile.isVip ? (
                <Crown className="h-4 w-4 text-amber-400 fill-amber-400/20" />
              ) : (
                <ShieldCheck className="h-4 w-4 text-[oklch(0.72_0.16_220)]" />
              )}
            </div>
          </div>

          <div className="space-y-1.5 min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight truncate">
                {profile.name}
              </h1>

              {/* Status Badge */}
              {profile.isVip ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.15)]">
                  <Sparkles className="h-3 w-3" />
                  Membre VIP
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[oklch(0.72_0.16_220)]/30 bg-[oklch(0.72_0.16_220)]/10 px-3 py-1 text-xs font-bold text-[oklch(0.72_0.16_220)] shadow-[0_0_12px_oklch(0.72_0.16_220/15%)]">
                  <ShieldCheck className="h-3 w-3" />
                  Compte Vérifié
                </span>
              )}
            </div>

            <p className="text-sm font-medium text-slate-400 truncate">
              {profile.email}
            </p>

            <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
              <span>Client depuis</span>
              <span className="text-slate-300 font-semibold">
                {profile.memberSince
                  ? new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric" }).format(new Date(profile.memberSince))
                  : "2026"}
              </span>
            </p>
          </div>
        </div>

        {/* Quick Stats Bar (4 compact metrics) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 lg:w-auto">
          {/* Active Orders */}
          <Link
            href="/account/orders"
            className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 sm:p-4 hover:border-[oklch(0.72_0.16_220)]/50 hover:bg-white/[0.06] transition-all duration-300 hover:shadow-[0_0_20px_oklch(0.72_0.16_220/15%)]"
          >
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold">En cours</span>
              <Clock className="h-4 w-4 text-[oklch(0.72_0.16_220)] group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-white">
                {stats.activeOrdersCount}
              </span>
              <ChevronRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-[oklch(0.72_0.16_220)] group-hover:translate-x-0.5 transition-all" />
            </div>
          </Link>

          {/* Total Orders */}
          <Link
            href="/account/orders"
            className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 sm:p-4 hover:border-white/25 hover:bg-white/[0.06] transition-all duration-300"
          >
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold">Commandes</span>
              <Package className="h-4 w-4 text-slate-300 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-white">
                {stats.totalOrdersCount}
              </span>
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Total</span>
            </div>
          </Link>

          {/* Saved Addresses */}
          <div className="relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 sm:p-4 transition-all duration-300">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold">Adresses</span>
              <MapPin className="h-4 w-4 text-slate-300" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-white">
                {stats.addressesCount}
              </span>
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Lieux</span>
            </div>
          </div>

          {/* Reviews Published */}
          <div className="relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 sm:p-4 transition-all duration-300">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold">Avis publiés</span>
              <Star className="h-4 w-4 text-amber-400 fill-amber-400/20" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-white">
                {stats.reviewsCount}
              </span>
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Avis</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
