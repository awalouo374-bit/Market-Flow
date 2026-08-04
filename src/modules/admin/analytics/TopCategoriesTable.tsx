import { FolderTree } from "lucide-react";
import { BrandCard } from "@/components/shared/BrandCard";
import type { getTopCategories } from "@/lib/admin-analytics";

type Categories = Awaited<ReturnType<typeof getTopCategories>>;

const CATEGORY_COLORS = [
  "bg-flow-cyan/20 text-flow-cyan",
  "bg-market-navy/20 text-market-navy dark:text-flow-cyan-light",
  "bg-emerald-500/15 text-emerald-600",
  "bg-amber-500/15 text-amber-600",
  "bg-purple-500/15 text-purple-600",
];

export function TopCategoriesTable({ data }: { data: Categories }) {
  const maxRevenue = Math.max(...data.map((c) => parseFloat(c.revenue)), 1);

  return (
    <BrandCard variant="default" className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-foreground">Top Categories</h2>
          <p className="text-xs text-muted-foreground">By revenue — all time</p>
        </div>
        <div className="p-2 rounded-xl bg-accent/10 text-accent">
          <FolderTree className="w-4 h-4" />
        </div>
      </div>

      {data.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">No category data yet</p>
      ) : (
        <ol className="space-y-3">
          {data.map((category, i) => {
            const revenue = parseFloat(category.revenue);
            const barWidth = Math.round((revenue / maxRevenue) * 100);
            return (
              <li key={category.categoryName} className="space-y-1.5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className={`shrink-0 w-7 h-7 rounded-lg text-[11px] font-bold flex items-center justify-center ${CATEGORY_COLORS[i] ?? "bg-muted text-muted-foreground"}`}>
                      {category.categoryName.slice(0, 2).toUpperCase()}
                    </span>
                    <span className="text-sm font-medium text-foreground truncate">
                      {category.categoryName}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 text-right">
                    <span className="text-xs text-muted-foreground">{category.unitsSold} units</span>
                    <span className="text-sm font-bold text-foreground">
                      ${revenue.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-flow-gradient-horizontal transition-all duration-700"
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
