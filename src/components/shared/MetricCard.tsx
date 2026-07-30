"use client";

import type { ReactNode } from "react";

type TrendDirection = "up" | "down" | "neutral";

interface MetricCardProps {
  /** Title / label for the metric */
  label: string;
  /** Main value to display */
  value: string | number;
  /** Percentage or delta change */
  change?: string;
  /** Trend direction — drives color and arrow */
  trend?: TrendDirection;
  /** Optional icon slot */
  icon?: ReactNode;
  /** Additional classes */
  className?: string;
}

function TrendArrow({ direction }: { direction: TrendDirection }) {
  if (direction === "neutral") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-muted-foreground">
        <path d="M2 8h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  const isUp = direction === "up";
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={`transition-transform duration-300 ${isUp ? "text-emerald-500" : "text-red-500 rotate-180"}`}
    >
      <path
        d="M8 13V3M8 3L3 8M8 3L13 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MetricCard({
  label,
  value,
  change,
  trend = "neutral",
  icon,
  className = "",
}: MetricCardProps) {
  const trendColor: Record<TrendDirection, string> = {
    up: "text-emerald-500",
    down: "text-red-500",
    neutral: "text-muted-foreground",
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${className}`}
    >
      {/* Subtle gradient accent at top */}
      <div className="absolute inset-x-0 top-0 h-1 bg-flow-gradient opacity-60 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
          <span className="text-3xl font-bold tracking-tight text-foreground">{value}</span>
        </div>
        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-flow-cyan/10 text-flow-cyan">
            {icon}
          </div>
        )}
      </div>

      {change && (
        <div className={`mt-3 flex items-center gap-1.5 text-sm font-medium ${trendColor[trend]}`}>
          <TrendArrow direction={trend} />
          <span>{change}</span>
        </div>
      )}
    </div>
  );
}
