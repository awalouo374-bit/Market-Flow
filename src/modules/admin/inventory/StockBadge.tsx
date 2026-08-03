import { AlertTriangle, XCircle, CheckCircle2 } from "lucide-react";
import type { LogType } from "@/lib/admin-inventory";

export function StockLevelBadge({ stock, threshold }: { stock: number; threshold: number }) {
  if (stock === 0) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-destructive/15 text-destructive">
        <XCircle className="w-3 h-3" /> Out of Stock
      </span>
    );
  }
  if (stock <= threshold) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-amber-500/15 text-amber-600">
        <AlertTriangle className="w-3 h-3" /> Low Stock
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-emerald-500/15 text-emerald-600">
      <CheckCircle2 className="w-3 h-3" /> Healthy
    </span>
  );
}

const LOG_TYPE_CONFIG: Record<LogType, { label: string; className: string }> = {
  restock:    { label: "Restock",    className: "bg-emerald-500/15 text-emerald-600" },
  return:     { label: "Return",     className: "bg-blue-500/15 text-blue-600" },
  adjustment: { label: "Adjustment", className: "bg-accent/15 text-accent" },
  sale:       { label: "Sale",       className: "bg-muted text-muted-foreground" },
  damaged:    { label: "Damaged",    className: "bg-destructive/15 text-destructive" },
};

export function LogTypeBadge({ type }: { type: LogType }) {
  const { label, className } = LOG_TYPE_CONFIG[type];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${className}`}>
      {label}
    </span>
  );
}
