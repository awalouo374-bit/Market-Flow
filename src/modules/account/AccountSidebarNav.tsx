"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  MapPin, 
  CreditCard, 
  ShieldCheck, 
  LogOut,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { AccountLogoutModal } from "./AccountLogoutModal";

interface AccountSidebarNavProps {
  activeOrdersCount?: number;
}

export function AccountSidebarNav({ activeOrdersCount = 0 }: AccountSidebarNavProps) {
  const pathname = usePathname();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const navItems = [
    {
      label: "Vue d'ensemble",
      href: "/account",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      label: "Mes Commandes",
      href: "/account/orders",
      icon: ShoppingBag,
      badge: activeOrdersCount > 0 ? `${activeOrdersCount} en cours` : null,
      badgeColor: "bg-[oklch(0.72_0.16_220)]/15 text-[oklch(0.72_0.16_220)] border-[oklch(0.72_0.16_220)]/30",
    },
    {
      label: "Mes Adresses",
      href: "#addresses",
      icon: MapPin,
      badge: null,
      isHash: true,
    },
    {
      label: "Modes de Paiement",
      href: "#payments",
      icon: CreditCard,
      badge: null,
      isHash: true,
    },
    {
      label: "Sécurité & Profil",
      href: "/account/settings",
      icon: ShieldCheck,
      badge: null,
    },
  ];

  return (
    <>
      <nav
        aria-label="Navigation de l'espace compte"
        className="w-full lg:w-72 shrink-0"
      >
        {/* Mobile Horizontal Scroll Nav */}
        <div className="lg:hidden overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 flex items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap text-xs font-semibold shrink-0 transition-all border ${
                  isActive
                    ? "bg-[oklch(0.72_0.16_220)]/15 text-[oklch(0.72_0.16_220)] border-[oklch(0.72_0.16_220)]/40 shadow-[0_0_12px_oklch(0.72_0.16_220/15%)]"
                    : "bg-[#0c1427]/80 text-slate-300 border-white/10 hover:border-white/20 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[oklch(0.72_0.16_220)] text-black font-extrabold">
                    {activeOrdersCount}
                  </span>
                )}
              </Link>
            );
          })}

          <button
            type="button"
            onClick={() => setIsLogoutModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap text-xs font-semibold shrink-0 transition-all border border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/20 cursor-pointer"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span>Déconnexion</span>
          </button>
        </div>

        {/* Desktop Vertical Glass Card Nav */}
        <div className="hidden lg:flex flex-col gap-1.5 rounded-3xl border border-white/10 bg-[#090e1b]/80 p-3 shadow-2xl backdrop-blur-xl">
          <div className="px-4 py-3 border-b border-white/5 mb-1 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Espace Client
            </span>
            <span className="flex items-center gap-1 text-[11px] font-bold text-[oklch(0.72_0.16_220)]">
              <Sparkles className="h-3 w-3" />
              Édition 2026
            </span>
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`group relative flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-[oklch(0.72_0.16_220)]/15 text-[oklch(0.72_0.16_220)] border border-[oklch(0.72_0.16_220)]/30 shadow-[0_0_20px_oklch(0.72_0.16_220/15%)]"
                    : "text-slate-300 hover:text-white hover:bg-white/[0.04] border border-transparent"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon
                    className={`h-4.5 w-4.5 shrink-0 transition-colors ${
                      isActive ? "text-[oklch(0.72_0.16_220)]" : "text-slate-400 group-hover:text-white"
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>

                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isActive
                        ? "text-[oklch(0.72_0.16_220)] translate-x-0.5"
                        : "text-slate-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5"
                    }`}
                  />
                </div>
              </Link>
            );
          })}

          {/* Divider */}
          <div className="my-2 border-t border-white/5" />

          {/* Destructive Logout Action */}
          <button
            type="button"
            onClick={() => setIsLogoutModalOpen(true)}
            className="group flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold text-slate-400 hover:text-destructive hover:bg-destructive/10 border border-transparent hover:border-destructive/20 transition-all duration-200 cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <LogOut className="h-4.5 w-4.5 shrink-0 text-slate-400 group-hover:text-destructive transition-colors" />
              <span>Se déconnecter</span>
            </div>
            <span className="text-xs text-slate-500 group-hover:text-destructive">Fermer</span>
          </button>
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      <AccountLogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
      />
    </>
  );
}
