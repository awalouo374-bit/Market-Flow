"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Search,
  Bell,
  Sun,
  Moon,
  Plus,
  ChevronRight,
  ShieldCheck,
  Menu,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { BrandButton } from "@/components/shared/BrandButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AdminHeaderProps {
  onMobileMenuToggle?: () => void;
}

export function AdminHeader({ onMobileMenuToggle }: AdminHeaderProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Format path into readable breadcrumb
  const pathSegments = pathname.split("/").filter(Boolean);
  const breadcrumbItems = pathSegments.map((segment) => {
    const formatted = segment.charAt(0).toUpperCase() + segment.slice(1);
    return formatted;
  });

  return (
    <header className="h-16 border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-3">
        {onMobileMenuToggle && (
          <button
            type="button"
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="font-semibold text-foreground flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-accent" />
            Admin
          </span>
          {breadcrumbItems.slice(1).map((item, idx) => (
            <React.Fragment key={item}>
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60" />
              <span
                className={`font-medium ${
                  idx === breadcrumbItems.length - 2
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground"
                }`}
              >
                {item}
              </span>
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Center: Admin Search */}
      <div className="hidden md:flex items-center flex-1 max-w-xs relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search products, orders, customers..."
          className="w-full h-9 pl-9 pr-4 rounded-xl bg-muted/50 border border-border text-xs focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all"
        />
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Add Product */}
        <Link href="/admin/products/new">
          <BrandButton variant="flow" size="sm" className="h-9 px-3 text-xs flex items-center gap-1.5 shadow-xs">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Product</span>
          </BrandButton>
        </Link>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="relative p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent animate-ping" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-80 p-2">
            <DropdownMenuLabel className="font-semibold text-xs flex items-center justify-between">
              <span>Admin Notifications</span>
              <span className="text-[10px] text-accent bg-accent/15 px-2 py-0.5 rounded-full font-bold">
                2 Unread
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <DropdownMenuItem className="p-3 cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-amber-500/15 text-amber-500 mt-0.5">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold leading-tight">Low Stock Alert</p>
                  <p className="text-[11px] text-muted-foreground">Aether Pro Phone X1 (BLK-256) is down to 3 units.</p>
                  <span className="text-[9px] text-muted-foreground/80">10 mins ago</span>
                </div>
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem className="p-3 cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-500 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold leading-tight">New Order Received</p>
                  <p className="text-[11px] text-muted-foreground">Order #MF-8921 placed by Jane Doe ($999.00).</p>
                  <span className="text-[9px] text-muted-foreground/80">45 mins ago</span>
                </div>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme Toggle */}
        {mounted && (
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>
        )}
      </div>
    </header>
  );
}
