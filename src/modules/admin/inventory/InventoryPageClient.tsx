"use client";

import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X, Package, ClipboardList } from "lucide-react";
import { InventoryStockTable } from "./InventoryStockTable";
import { InventoryLogsTable } from "./InventoryLogsTable";
import { CatalogPagination } from "@/modules/catalog/CatalogPagination";
import type { InventoryVariant, InventoryLog, StockFilter } from "@/lib/admin-inventory";

type Tab = "stock" | "logs";

interface InventoryPageClientProps {
  variants: InventoryVariant[];
  logs: InventoryLog[];
  variantsTotal: number;
  variantsTotalPages: number;
  logsTotal: number;
  logsTotalPages: number;
  currentPage: number;
}

const STOCK_FILTERS: { value: StockFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "low", label: "Low Stock" },
  { value: "out", label: "Out of Stock" },
];

export function InventoryPageClient({
  variants, logs, variantsTotal, variantsTotalPages,
  logsTotal, logsTotalPages, currentPage,
}: InventoryPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const tab = (searchParams.get("tab") ?? "stock") as Tab;
  const search = searchParams.get("search") ?? "";
  const filter = (searchParams.get("filter") ?? "all") as StockFilter;

  const push = (updates: Record<string, string | null>) => {
    const p = new URLSearchParams(searchParams.toString());
    for (const [k, v] of Object.entries(updates)) {
      v === null ? p.delete(k) : p.set(k, v);
    }
    p.delete("page");
    startTransition(() => router.push(`/admin/inventory?${p.toString()}`, { scroll: false }));
  };

  const isStock = tab === "stock";

  return (
    <div className="space-y-5">
      <div className="flex gap-1 p-1 bg-muted/50 rounded-xl w-fit border border-border">
        {([["stock", "Stock Watch", Package], ["logs", "Audit Log", ClipboardList]] as const).map(([value, label, Icon]) => (
          <button
            key={value}
            type="button"
            onClick={() => push({ tab: value, search: null, filter: null })}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              tab === value
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${isPending ? "text-accent animate-pulse" : "text-muted-foreground"}`} />
            <input
              key={tab}
              type="search"
              defaultValue={search}
              onKeyDown={(e) => e.key === "Enter" && push({ search: e.currentTarget.value || null })}
              placeholder={isStock ? "Search SKU or product…" : "Search SKU or product…"}
              className="h-9 w-52 pl-8 pr-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all"
            />
          </div>

          {isStock && STOCK_FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => push({ filter: f.value })}
              className={`h-9 px-3 rounded-xl text-xs font-semibold border transition-all ${
                filter === f.value
                  ? "bg-accent/15 border-accent/30 text-accent"
                  : "border-border text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {f.label}
            </button>
          ))}

          {search && (
            <button type="button" onClick={() => push({ search: null })}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors">
              <X className="w-3.5 h-3.5" /> Clear
            </button>
          )}

          <span className="text-xs text-muted-foreground">
            {isStock ? variantsTotal : logsTotal}{" "}
            {isStock ? "variants" : "entries"}
          </span>
        </div>
      </div>

      {isStock ? (
        variants.length === 0 ? (
          <p className="text-center py-16 text-sm text-muted-foreground">No variants match your filter.</p>
        ) : (
          <>
            <InventoryStockTable variants={variants} />
            <CatalogPagination currentPage={currentPage} totalPages={variantsTotalPages} />
          </>
        )
      ) : (
        logs.length === 0 ? (
          <p className="text-center py-16 text-sm text-muted-foreground">No audit log entries yet.</p>
        ) : (
          <>
            <InventoryLogsTable logs={logs} />
            <CatalogPagination currentPage={currentPage} totalPages={logsTotalPages} />
          </>
        )
      )}
    </div>
  );
}
