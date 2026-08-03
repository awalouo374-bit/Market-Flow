"use client";

import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import type { OrderStatus } from "@/lib/admin-orders";

const STATUS_FILTERS: { value: string; label: string }[] = [
  { value: "all",        label: "All" },
  { value: "pending",    label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "shipped",    label: "Shipped" },
  { value: "delivered",  label: "Delivered" },
  { value: "cancelled",  label: "Cancelled" },
];

export function OrdersToolbar({ total }: { total: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const search = searchParams.get("search") ?? "";
  const status = searchParams.get("status") ?? "all";

  const push = (updates: Record<string, string | null>) => {
    const p = new URLSearchParams(searchParams.toString());
    for (const [k, v] of Object.entries(updates)) {
      v === null ? p.delete(k) : p.set(k, v);
    }
    p.delete("page");
    startTransition(() => router.push(`/admin/orders?${p.toString()}`, { scroll: false }));
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative">
          <Search className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${isPending ? "text-accent animate-pulse" : "text-muted-foreground"}`} />
          <input
            type="search"
            defaultValue={search}
            onKeyDown={(e) => e.key === "Enter" && push({ search: e.currentTarget.value || null })}
            placeholder="Order # or customer email…"
            className="h-9 w-60 pl-8 pr-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all"
          />
        </div>
        {search && (
          <button type="button" onClick={() => push({ search: null })}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors">
            <X className="w-3.5 h-3.5" /> Clear
          </button>
        )}
        <span className="text-xs text-muted-foreground ml-1">{total} orders</span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => push({ status: f.value === "all" ? null : f.value })}
            className={`h-8 px-3 rounded-xl text-xs font-semibold border transition-all ${
              status === f.value || (f.value === "all" && !searchParams.get("status"))
                ? "bg-accent/15 border-accent/30 text-accent"
                : "border-border text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}
