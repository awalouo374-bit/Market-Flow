import { Trophy } from "lucide-react";
import { BrandCard } from "@/components/shared/BrandCard";
import type { getTopProducts } from "@/lib/admin-analytics";

type Products = Awaited<ReturnType<typeof getTopProducts>>;

const RANK_STYLES = [
  "bg-amber-400/20 text-amber-600 border-amber-400/30",
  "bg-zinc-300/20 text-zinc-500 border-zinc-300/30",
  "bg-orange-400/15 text-orange-600 border-orange-400/30",
];

export function TopProductsTable({ data }: { data: Products }) {
  const maxRevenue = Math.max(...data.map((p) => parseFloat(p.revenue)), 1);

  return (
    <BrandCard variant="default" className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-foreground">Top Products</h2>
          <p className="text-xs text-muted-foreground">By revenue — all time</p>
        </div>
        <div className="p-2 rounded-xl bg-accent/10 text-accent">
          <Trophy className="w-4 h-4" />
        </div>
      </div>

      {data.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">No sales data yet</p>
      ) : (
        <ol className="space-y-3">
          {data.map((product, i) => {
            const revenue = parseFloat(product.revenue);
            const barWidth = Math.round((revenue / maxRevenue) * 100);
            return (
              <li key={product.productName} className="space-y-1.5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className={`shrink-0 w-6 h-6 rounded-lg border text-[11px] font-bold flex items-center justify-center ${RANK_STYLES[i] ?? "bg-muted text-muted-foreground border-border"}`}>
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium text-foreground truncate">
                      {product.productName}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 text-right">
                    <span className="text-xs text-muted-foreground">{product.unitsSold} units</span>
                    <span className="text-sm font-bold text-foreground">
                      ${revenue.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-flow-gradient transition-all duration-700"
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </BrandCard>
  );
}
