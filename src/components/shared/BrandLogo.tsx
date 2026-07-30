"use client";

import Image from "next/image";

type BrandLogoSize = "sm" | "md" | "lg" | "xl";

interface BrandLogoProps {
  /** Size variant */
  size?: BrandLogoSize;
  /** Show the tagline "SHOP. FLOW. GROW." below the logo */
  showTagline?: boolean;
  /** Additional classes */
  className?: string;
}

const sizeMap: Record<BrandLogoSize, { width: number; height: number; taglineClass: string }> = {
  sm: { width: 32, height: 32, taglineClass: "text-[8px] tracking-[0.12em]" },
  md: { width: 48, height: 48, taglineClass: "text-[10px] tracking-[0.14em]" },
  lg: { width: 72, height: 72, taglineClass: "text-xs tracking-[0.15em]" },
  xl: { width: 120, height: 120, taglineClass: "text-sm tracking-[0.15em]" },
};

export function BrandLogo({ size = "md", showTagline = false, className = "" }: BrandLogoProps) {
  const config = sizeMap[size];

  return (
    <div
      className={`inline-flex flex-col items-center gap-1 transition-transform duration-300 hover:scale-105 ${className}`}
    >
      <Image
        src="/logo.png"
        alt="MarketFlow"
        width={config.width}
        height={config.height}
        priority
        className="object-contain"
      />
      {showTagline && (
        <span
          className={`font-medium text-muted-foreground uppercase ${config.taglineClass}`}
        >
          Shop. Flow. Grow.
        </span>
      )}
    </div>
  );
}
