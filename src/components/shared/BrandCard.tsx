"use client";

import type { ReactNode } from "react";

type BrandCardVariant = "default" | "glass" | "glow" | "elevated";

interface BrandCardProps {
  children: ReactNode;
  /** Card style variant */
  variant?: BrandCardVariant;
  /** Additional classes */
  className?: string;
  /** Click handler — makes card interactive */
  onClick?: () => void;
}

const variantClasses: Record<BrandCardVariant, string> = {
  default:
    "bg-card border border-border rounded-2xl shadow-sm hover:shadow-md transition-all duration-300",
  glass:
    "glass-panel rounded-2xl transition-all duration-300 hover:shadow-glow-cyan/30",
  glow: "bg-card border border-flow-cyan/20 rounded-2xl shadow-glow-cyan transition-all duration-300 hover:border-flow-cyan/40 hover:shadow-[0_0_30px_rgba(0,180,216,0.20)]",
  elevated:
    "bg-card border border-border rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300",
};

export function BrandCard({
  children,
  variant = "default",
  className = "",
  onClick,
}: BrandCardProps) {
  const interactive = onClick ? "cursor-pointer" : "";

  return (
    <div
      className={`p-6 ${variantClasses[variant]} ${interactive} ${className}`}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") onClick();
            }
          : undefined
      }
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
}
