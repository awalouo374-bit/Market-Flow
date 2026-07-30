"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type BrandButtonVariant = "flow" | "navy" | "silver" | "glow" | "ghost";
type BrandButtonSize = "sm" | "md" | "lg";

interface BrandButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  /** Button style variant */
  variant?: BrandButtonVariant;
  /** Button size */
  size?: BrandButtonSize;
  /** Full width */
  fullWidth?: boolean;
}

const baseClasses =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 ease-out cursor-pointer select-none disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flow-cyan";

const sizeClasses: Record<BrandButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-base",
  lg: "h-13 px-8 text-lg",
};

const variantClasses: Record<BrandButtonVariant, string> = {
  flow: "bg-flow-gradient text-white hover:shadow-glow-cyan hover:scale-[1.02] active:scale-[0.98]",
  navy: "bg-market-navy text-white hover:bg-market-navy-dark hover:shadow-glow-navy hover:scale-[1.02] active:scale-[0.98]",
  silver:
    "bg-transparent text-market-navy dark:text-silver-light border-2 border-silver-metallic hover:border-flow-cyan hover:text-flow-cyan hover:scale-[1.02] active:scale-[0.98]",
  glow: "bg-flow-cyan text-white shadow-glow-cyan hover:shadow-[0_0_30px_rgba(0,180,216,0.40),0_0_80px_rgba(0,180,216,0.15)] hover:scale-[1.03] active:scale-[0.97]",
  ghost:
    "bg-transparent text-market-navy dark:text-flow-cyan-light hover:bg-market-navy/5 dark:hover:bg-flow-cyan/10 hover:scale-[1.02] active:scale-[0.98]",
};

export function BrandButton({
  children,
  variant = "flow",
  size = "md",
  fullWidth = false,
  className = "",
  ...props
}: BrandButtonProps) {
  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
