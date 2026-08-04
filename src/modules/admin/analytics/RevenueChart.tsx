"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig,
} from "@/components/ui/chart";
import { BrandCard } from "@/components/shared/BrandCard";
import type { getRevenueSeries } from "@/lib/admin-analytics";

type Series = Awaited<ReturnType<typeof getRevenueSeries>>;

const chartConfig: ChartConfig = {
  revenue: { label: "Revenue ($)", color: "oklch(0.72 0.16 220)" },
  orders:  { label: "Orders",      color: "oklch(0.24 0.06 250)" },
};

export function RevenueChart({ data }: { data: Series }) {
  const maxRevenue = Math.max(...data.map((d) => d.revenue), 1);
  const hasData = data.some((d) => d.revenue > 0);

  return (
    <BrandCard variant="default" className="space-y-4">
      <div>
        <h2 className="text-base font-bold text-foreground">Revenue Trend</h2>
        <p className="text-xs text-muted-foreground">Daily revenue over the last 30 days</p>
      </div>

      {!hasData ? (
        <div className="h-48 flex items-center justify-center text-sm text-muted-foreground">
          No revenue data for this period
        </div>
      ) : (
        <ChartContainer config={chartConfig} className="h-52 w-full">
          <AreaChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="oklch(0.72 0.16 220)" stopOpacity={0.25} />
                <stop offset="95%" stopColor="oklch(0.72 0.16 220)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border/40" />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              interval={Math.floor(data.length / 6)}
            />
            <YAxis
              tickFormatter={(v) => `$${v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v}`}
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              width={48}
              domain={[0, maxRevenue * 1.1]}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name) =>
                    name === "revenue"
                      ? [`$${Number(value).toFixed(2)}`, "Revenue"]
                      : [value, "Orders"]
                  }
                />
              }
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="oklch(0.72 0.16 220)"
              strokeWidth={2}
              fill="url(#revenueGradient)"
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
          </AreaChart>
        </ChartContainer>
      )}
    </BrandCard>
  );
}
