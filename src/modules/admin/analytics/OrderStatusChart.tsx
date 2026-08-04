"use client";

import { Cell, Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { BrandCard } from "@/components/shared/BrandCard";
import type { getOrderStatusBreakdown } from "@/lib/admin-analytics";

type Breakdown = Awaited<ReturnType<typeof getOrderStatusBreakdown>>;

const STATUS_COLORS: Record<string, string> = {
  pending:    "oklch(0.75 0.16 60)",
  processing: "oklch(0.72 0.16 220)",
  shipped:    "oklch(0.60 0.14 240)",
  delivered:  "oklch(0.65 0.18 160)",
  cancelled:  "oklch(0.58 0.22 27)",
  refunded:   "oklch(0.65 0.04 250)",
};

export function OrderStatusChart({ data }: { data: Breakdown }) {
  const chartConfig: ChartConfig = Object.fromEntries(
    data.map((d) => [
      d.status,
      { label: d.status.charAt(0).toUpperCase() + d.status.slice(1), color: STATUS_COLORS[d.status] ?? "oklch(0.65 0.04 250)" },
    ]),
  );

  const total = data.reduce((s, d) => s + d.count, 0);
  const hasData = total > 0;

  return (
    <BrandCard variant="default" className="space-y-3">
      <div>
        <h2 className="text-base font-bold text-foreground">Order Status</h2>
        <p className="text-xs text-muted-foreground">Distribution across all orders</p>
      </div>

      {!hasData ? (
        <div className="h-52 flex items-center justify-center text-sm text-muted-foreground">
          No order data yet
        </div>
      ) : (
        <ChartContainer config={chartConfig} className="h-52 w-full">
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="status"
              cx="50%"
              cy="50%"
              innerRadius="55%"
              outerRadius="80%"
              strokeWidth={2}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.status}
                  fill={STATUS_COLORS[entry.status] ?? "oklch(0.65 0.04 250)"}
                />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
          </PieChart>
        </ChartContainer>
      )}
    </BrandCard>
  );
}
