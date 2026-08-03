"use client";

import type { ReactNode } from "react";

type GradientVariant = "flow" | "cyan" | "silver";

interface GradientTextProps {
  children: ReactNode;
  variant?: GradientVariant;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  id?: string;
}

const gradientStyles: Record<GradientVariant, string> = {
  flow: "bg-gradient-to-r from-market-navy to-flow-cyan dark:from-flow-cyan-light dark:to-flow-cyan",
  cyan: "bg-gradient-to-r from-flow-cyan to-flow-cyan-light",
  silver: "bg-gradient-to-r from-silver-metallic to-flow-cyan-light",
};

export function GradientText({
  children,
  variant = "flow",
  as: Tag = "span",
  className = "",
  id,
}: GradientTextProps) {
  return (
    <Tag
      id={id}
      className={`bg-clip-text text-transparent ${gradientStyles[variant]} ${className}`}
    >
      {children}
    </Tag>
  );
}
