"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { BrandCard } from "@/components/shared/BrandCard";
import type { getCustomerGrowthSeries } from "@/lib/admin-analytics";

type Series = Awaited<ReturnType<typeof getCustomerGrowthSeries>>;

const chartConfig: ChartConfig = {
  newCustomers: { label: "New Customers", color: "oklch(0.60 0.14 240)" },
};

export function CustomerGrowthChart({ data }: { data: Series }) {
  const hasData = data.some((d) => d.newCustomers > 0);
  const sparse = data.filter((_, i) => i % Math.floor(data.length / 7) === 0);

  return (
    <BrandCard variant="default" className="space-y-4">
      <div>
        <h2 className="text-base font-bold text-foreground">Customer Acquisition</h2>
        <p className="text-xs text-muted-foreground">New registrations over the last 30 days</p>
      </div>

      {!hasData ? (
        <div className="h-52 flex items-center justify-center text-sm text-muted-foreground">
          No customer data for this period
        </div>
      ) : (
        <ChartContainer config={chartConfig} className="h-52 w-full">
          <BarChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="customerGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="oklch(0.60 0.14 240)" stopOpacity={0.9} />
                <stop offset="100%" stopColor="oklch(0.60 0.14 240)" stopOpacity={0.4} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border/40" />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10 }}
              ticks={sparse.map((d) => d.day)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10 }}
              width={28}
              allowDecimals={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="newCustomers" fill="url(#customerGradient)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      )}
    </BrandCard>
  );
}
