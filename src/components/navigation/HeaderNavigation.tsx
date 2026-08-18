"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Search,
  ShoppingBag,
  User,
  Sun,
  Moon,
  Menu,
  X,
  LayoutDashboard,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  Heart,
  Store,
  LogOutIcon
} from "lucide-react";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { BrandButton } from "@/components/shared/BrandButton";
import { useCart } from "@/context/CartContext";
import { CartDrawer } from "./CartDrawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";

const navLinks = [
  { href: "/products", label: "Catalog" },
  { href: "/categories", label: "Categories" },
  { href: "/featured", label: "Featured" },
  { href: "/deals", label: "Deals", badge: "Hot" },
  { href: "/shipping", label: "Shipping" },
];

type Props = { userName?: string; userEmail?: string };

export function HeaderNavigation({ userName, userEmail }: Props) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { itemCount, toggleCart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);



  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Top Promo Announcement Banner */}
      <div className="bg-flow-gradient-horizontal text-white text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-between">
        <div className="hidden sm:block text-white/80 text-[11px]"> MarketFlow Commerce</div>
        <div className="mx-auto flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-flow-cyan-light" />
          <span>Special Offer: Free Express Shipping on orders over $100!</span>
          <span className="hidden md:inline bg-white/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
            FLOW100
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-white/80 text-[11px]">
          <Link href="/support" className="hover:text-white transition-colors">
            Support
          </Link>
          <Link href="/admin" className="hover:text-white transition-colors flex items-center gap-1 font-semibold">
            <ShieldCheck className="w-3 h-3 text-flow-cyan-light" />
            Admin Portal
          </Link>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">

          {/* Logo & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="lg:hidden p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link href="/" className="flex items-center gap-2 group">
              <BrandLogo size="sm" />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${isActive
                    ? "bg-accent/15 text-accent font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[10px] uppercase font-bold bg-flow-gradient text-white px-1.5 py-0.2 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-xs relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full h-10 pl-9 pr-12 rounded-xl bg-muted/50 border border-border/80 text-sm focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring transition-all"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-5 items-center gap-1 rounded border border-border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              ⌘K
            </kbd>
          </div>

          {/* Action Items */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle */}
            {mounted && (
              <button
                type="button"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-amber-400" />
                ) : (
                  <Moon className="w-5 h-5 text-slate-700" />
                )}
              </button>
            )}

            {/* Wishlist Button */}
            <Link
              href="/wishlist"
              className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors hidden sm:block"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
            </Link>

            {/* Cart Button */}
            <button
              type="button"
              onClick={toggleCart}
              className="relative p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors group"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-flow-gradient text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-in zoom-in-50 duration-200">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </button>

            {/* User Dropdown */}
            {userName ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="flex items-center gap-2 p-1.5 rounded-xl border border-border/60 hover:bg-muted/50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-flow-gradient text-white flex items-center justify-center font-semibold text-xs shadow-xs">
                      {userName.substring(0, 2)}
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-muted-foreground hidden sm:block" />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56 p-2">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-semibold leading-none">{userName}</p>
                      <p className="text-xs text-muted-foreground leading-none">{userEmail}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/account" className="cursor-pointer flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span>My Account</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/orders" className="cursor-pointer flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-muted-foreground" />
                      <span>Order History</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="text-accent font-medium">
                    <button
                      type="button"
                      onClick={async () => {
                        await authClient.signOut();
                        window.location.href = "/";
                      }}
                      className="flex items-center gap-2 text-accent font-medium cursor-pointer w-full text-left"
                    >
                      <LogOutIcon className="w-4 h-4" />
                      <span>Se déconnecter</span>
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>) : (
              <Link href="/login" className="hidden lg:block">
                <BrandButton variant="flow" size="sm" className="shadow-xs">
                  Se connecter
                </BrandButton>
              </Link>)}

            {/* CTA Button */}
            <Link href="/products" className="hidden lg:block">
              <BrandButton variant="flow" size="sm" className="shadow-xs">
                Shop Now
              </BrandButton>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-b border-border bg-background px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
            {/* Mobile Search */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full h-10 pl-9 pr-4 rounded-xl bg-muted/60 border border-border text-sm focus:outline-none"
              />
            </div>

            {/* Mobile Links */}
            <nav className="flex flex-col space-y-1">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-muted flex items-center gap-2"
              >
                <Store className="w-4 h-4 text-muted-foreground" />
                <span>Home Store</span>
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-muted flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[10px] uppercase font-bold bg-flow-gradient text-white px-2 py-0.5 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
              <div className="pt-2 border-t border-border mt-2">
                <Link
                  href="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm font-semibold text-accent hover:bg-accent/10 flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Switch to Admin Portal</span>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Cart Drawer */}
      <CartDrawer />
    </>
  );
}
