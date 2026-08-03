import Link from "next/link";
import { AlertTriangle, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { BrandCard } from "@/components/shared/BrandCard";
import type { getCriticalStockVariants } from "@/lib/admin-dashboard";

type Variants = Awaited<ReturnType<typeof getCriticalStockVariants>>;

export function LowStockAlert({ variants }: { variants: Variants }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-foreground">Stock Alerts</h2>
          <p className="text-xs text-muted-foreground">Variants at or below reorder threshold</p>
        </div>
        <Link href="/admin/inventory" className="text-xs font-semibold text-accent hover:underline flex items-center gap-1 group">
          Manage
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <BrandCard variant="default" className="p-0 overflow-hidden">
        {variants.length === 0 ? (
          <div className="flex items-center justify-center gap-2 py-10 text-emerald-600">
            <CheckCircle2 className="w-5 h-5" />
            <p className="text-sm font-medium">All inventory levels are healthy</p>
          </div>
        ) : (
          <div className="divide-y divide-border/60">
            {variants.map((v) => {
              const isEmpty = v.stock === 0;
              return (
                <div key={v.variantId} className="flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-xs text-foreground line-clamp-1">{v.productName}</p>
                    <p className="text-[10px] text-muted-foreground font-mono mt-0.5">{v.variantSku}</p>
                  </div>
                  <div className="flex items-center gap-3 ml-3 shrink-0">
                    <span className={`font-bold text-sm ${isEmpty ? "text-destructive" : "text-amber-500"}`}>
                      {v.stock} units
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isEmpty
                        ? "bg-destructive/15 text-destructive"
                        : "bg-amber-500/15 text-amber-600"
                    }`}>
                      <AlertTriangle className="w-2.5 h-2.5" />
                      {isEmpty ? "Out" : "Low"}
                    </span>
                    <Link href="/admin/inventory" className="text-[10px] font-semibold text-accent hover:underline">
                      Restock
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </BrandCard>
    </div>
  );
}
