import { DollarSign, ShoppingBag, Users, TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { getAnalyticsSummary } from "@/lib/admin-analytics";

type Summary = Awaited<ReturnType<typeof getAnalyticsSummary>>;

interface Props {
  summary: Summary;
  newCustomers: number;
  avgOrderValue: number;
}

function Delta({ change }: { change: number | null }) {
  if (change === null) {
    return <span className="text-xs text-muted-foreground">No prior data</span>;
  }
  const isUp = change >= 0;
  const Icon = change === 0 ? Minus : isUp ? TrendingUp : TrendingDown;
  const color = isUp ? "text-emerald-600 dark:text-emerald-400" : "text-destructive";
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold ${color}`}>
      <Icon className="w-3.5 h-3.5" />
      {Math.abs(change).toFixed(1)}% vs last 30 days
    </span>
  );
}

const CARDS = [
  {
    key: "revenue" as const,
    label: "Revenue (30 days)",
    icon: DollarSign,
    format: (v: string) => `$${parseFloat(v).toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
    changeKey: "revenueChange" as const,
    color: "bg-flow-cyan/10 text-flow-cyan",
  },
  {
    key: "orders" as const,
    label: "Orders (30 days)",
    icon: ShoppingBag,
    format: (v: number) => v.toLocaleString(),
    changeKey: "ordersChange" as const,
    color: "bg-market-navy/10 text-market-navy dark:text-flow-cyan-light",
  },
];

export function AnalyticsKPICards({ summary, newCustomers, avgOrderValue }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {CARDS.map(({ key, label, icon: Icon, format, changeKey, color }) => (
        <div
          key={key}
          className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-flow-gradient opacity-60 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">{label}</p>
              <p className="text-2xl font-extrabold tracking-tight text-foreground">
                {format(summary[key] as never)}
              </p>
            </div>
            <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${color}`}>
              <Icon className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <Delta change={summary[changeKey]} />
          </div>
        </div>
      ))}

      <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
        <div className="absolute inset-x-0 top-0 h-1 bg-flow-gradient opacity-60 group-hover:opacity-100 transition-opacity" />
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">New Customers (30 days)</p>
            <p className="text-2xl font-extrabold tracking-tight text-foreground">
              {newCustomers.toLocaleString()}
            </p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
            <Users className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <span className="text-xs text-muted-foreground">Registered this period</span>
        </div>
      </div>

      <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
        <div className="absolute inset-x-0 top-0 h-1 bg-silver-gradient opacity-60 group-hover:opacity-100 transition-opacity" />
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">Avg Order Value</p>
            <p className="text-2xl font-extrabold tracking-tight text-foreground">
              ${avgOrderValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-silver-metallic/15 text-silver-metallic">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <span className="text-xs text-muted-foreground">Last 30 days average</span>
        </div>
      </div>
    </div>
  );
}
