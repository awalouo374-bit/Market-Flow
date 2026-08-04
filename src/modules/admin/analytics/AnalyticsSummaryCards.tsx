import { TrendingUp, TrendingDown, Minus, DollarSign, ShoppingBag } from "lucide-react";
import type { getAnalyticsSummary } from "@/lib/admin-analytics";

type Summary = Awaited<ReturnType<typeof getAnalyticsSummary>>;

function ChangeIndicator({ change }: { change: number | null }) {
  if (change === null) return <span className="text-xs text-muted-foreground">No prior data</span>;
  const isUp = change >= 0;
  const Icon = change === 0 ? Minus : isUp ? TrendingUp : TrendingDown;
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold ${isUp ? "text-emerald-600" : "text-destructive"}`}>
      <Icon className="w-3.5 h-3.5" />
      {Math.abs(change).toFixed(1)}% vs last 30 days
    </span>
  );
}

const STAT_CARDS = [
  { key: "revenue" as const, label: "Revenue (30 days)", icon: DollarSign, changeKey: "revenueChange" as const, format: (v: string) => `$${parseFloat(v).toLocaleString("en-US", { minimumFractionDigits: 2 })}` },
  { key: "orders"  as const, label: "Orders (30 days)",  icon: ShoppingBag, changeKey: "ordersChange"  as const, format: (v: number) => v.toLocaleString() },
];

export function AnalyticsSummaryCards({ summary }: { summary: Summary }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {STAT_CARDS.map(({ key, label, icon: Icon, changeKey, format }) => (
        <div
          key={key}
          className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-flow-gradient opacity-60 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-sm font-medium text-muted-foreground">{label}</span>
              <p className="text-3xl font-bold tracking-tight text-foreground">
                {format(summary[key] as never)}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-flow-cyan/10 text-flow-cyan">
              <Icon className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <ChangeIndicator change={summary[changeKey]} />
          </div>
        </div>
      ))}
    </div>
  );
}
