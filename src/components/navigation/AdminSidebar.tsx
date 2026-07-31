"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Boxes,
  FolderTree,
  Tag,
  ShoppingBag,
  Users,
  Star,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Store,
  LogOut,
  ShieldCheck,
  Database,
  Sparkles,
} from "lucide-react";
import { BrandLogo } from "@/components/shared/BrandLogo";

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const adminNavSections = [
  {
    title: "Overview",
    items: [
      { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
      { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    ],
  },
  {
    title: "Catalog & Stock",
    items: [
      { href: "/admin/products", label: "Products", icon: Package },
      { href: "/admin/inventory", label: "Inventory Control", icon: Boxes, badge: "Low Stock", badgeVariant: "warning" },
      { href: "/admin/categories", label: "Categories", icon: FolderTree },
      { href: "/admin/brands", label: "Brands", icon: Tag },
    ],
  },
  {
    title: "Operations",
    items: [
      { href: "/admin/orders", label: "Orders", icon: ShoppingBag, badge: "12 New", badgeVariant: "info" },
      { href: "/admin/customers", label: "Customers", icon: Users },
      { href: "/admin/reviews", label: "Reviews", icon: Star },
    ],
  },
  {
    title: "System",
    items: [
      { href: "/admin/settings", label: "Settings", icon: Settings },
    ],
  },
];

export function AdminSidebar({ isCollapsed, onToggleCollapse }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen bg-card border-r border-border transition-all duration-300 flex flex-col ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Sidebar Header */}
      <div className="h-16 px-4 border-b border-border flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-3 overflow-hidden">
          <BrandLogo size="sm" />
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight leading-none text-flow-gradient">
                MarketFlow
              </span>
              <span className="text-[10px] font-bold text-accent uppercase tracking-wider mt-0.5 flex items-center gap-1">
                <ShieldCheck className="w-2.5 h-2.5" />
                Admin
              </span>
            </div>
          )}
        </Link>

        <button
          type="button"
          onClick={onToggleCollapse}
          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {adminNavSections.map((section) => (
          <div key={section.title} className="space-y-1">
            {!isCollapsed && (
              <h3 className="px-3 text-[11px] font-bold text-muted-foreground/70 uppercase tracking-wider">
                {section.title}
              </h3>
            )}
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={isCollapsed ? item.label : undefined}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                      isActive
                        ? "bg-accent/15 text-accent font-semibold shadow-xs"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110 ${
                          isActive ? "text-accent" : "text-muted-foreground group-hover:text-foreground"
                        }`}
                      />
                      {!isCollapsed && <span>{item.label}</span>}
                    </div>

                    {!isCollapsed && item.badge && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          item.badgeVariant === "warning"
                            ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                            : "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Return to Store Link & Admin User Info */}
      <div className="p-3 border-t border-border space-y-2 bg-muted/20">
        <Link
          href="/"
          className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-colors ${
            isCollapsed ? "justify-center" : ""
          }`}
          title={isCollapsed ? "Back to Public Store" : undefined}
        >
          <Store className="w-4 h-4 text-accent" />
          {!isCollapsed && <span>Back to Public Store</span>}
        </Link>

        <div className={`flex items-center justify-between p-2 rounded-xl bg-card border border-border/80 ${isCollapsed ? "justify-center" : ""}`}>
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-flow-gradient text-white flex items-center justify-center font-bold text-xs shadow-xs flex-shrink-0">
              MA
            </div>
            {!isCollapsed && (
              <div className="flex flex-col overflow-hidden">
                <span className="text-xs font-semibold truncate leading-tight">Marketflow Admin</span>
                <span className="text-[10px] text-muted-foreground truncate">admin@marketflow.com</span>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <Link href="/logout" className="text-muted-foreground hover:text-destructive p-1 transition-colors" title="Log Out">
              <LogOut className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </aside>
  );
}
