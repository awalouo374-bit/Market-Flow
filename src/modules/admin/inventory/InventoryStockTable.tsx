"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import type { InventoryVariant } from "@/lib/admin-inventory";
import { StockLevelBadge } from "./StockBadge";
import { AdjustStockModal } from "./AdjustStockModal";

function AdjustButton({ variant }: { variant: InventoryVariant }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline"
        aria-label={`Adjust stock for ${variant.variantName}`}
      >
        <SlidersHorizontal className="w-3.5 h-3.5" />
        Adjust
      </button>
      <AdjustStockModal
        variantId={variant.variantId}
        variantName={variant.variantName}
        productName={variant.productName}
        currentStock={variant.stock}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}

export function InventoryStockTable({ variants }: { variants: InventoryVariant[] }) {
  return (
    <div className="rounded-2xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 text-left">Product / Variant</th>
              <th className="px-4 py-3 text-left hidden md:table-cell">Variant SKU</th>
              <th className="px-4 py-3 text-left">Stock</th>
              <th className="px-4 py-3 text-left hidden sm:table-cell">Threshold</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60 bg-card">
            {variants.map((v) => (
              <tr key={v.variantId} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3">
                  <p className="font-semibold text-foreground line-clamp-1">{v.productName}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{v.variantName}</p>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className="font-mono text-xs text-muted-foreground">{v.variantSku}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`font-bold text-sm ${v.stock === 0 ? "text-destructive" : v.stock <= v.lowStockThreshold ? "text-amber-500" : "text-foreground"}`}>
                    {v.stock}
                  </span>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <span className="text-xs text-muted-foreground">{v.lowStockThreshold}</span>
                </td>
                <td className="px-4 py-3">
                  <StockLevelBadge stock={v.stock} threshold={v.lowStockThreshold} />
                </td>
                <td className="px-4 py-3 text-right">
                  <AdjustButton variant={v} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
