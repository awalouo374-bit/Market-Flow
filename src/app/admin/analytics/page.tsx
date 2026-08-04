import type { Metadata } from "next";
import { Suspense } from "react";
import { BarChart3, TrendingUp } from "lucide-react";
import {
  getAnalyticsSummary,
  getRevenueSeries,
  getOrderStatusBreakdown,
  getTopProducts,
  getCustomerGrowthSeries,
  getTopCategories,
  getNewCustomersCount,
  getAvgOrderValue,
} from "@/lib/admin-analytics";
import { AnalyticsKPICards } from "@/modules/admin/analytics/AnalyticsKPICards";
import { RevenueChart } from "@/modules/admin/analytics/RevenueChart";
import { OrderStatusChart } from "@/modules/admin/analytics/OrderStatusChart";
import { TopProductsTable } from "@/modules/admin/analytics/TopProductsTable";
import { CustomerGrowthChart } from "@/modules/admin/analytics/CustomerGrowthChart";
import { TopCategoriesTable } from "@/modules/admin/analytics/TopCategoriesTable";
import { GradientText } from "@/components/shared/GradientText";
import AnalyticsLoading from "./loading";

export const metadata: Metadata = { title: "Analytics — MarketFlow Admin" };

async function AnalyticsContent() {
  const [summary, revenueSeries, statusBreakdown, topProducts, customerSeries, topCategories, newCustomers, avgOrderValue] =
    await Promise.all([
      getAnalyticsSummary(),
      getRevenueSeries(30),
      getOrderStatusBreakdown(),
      getTopProducts(5),
      getCustomerGrowthSeries(30),
      getTopCategories(5),
      getNewCustomersCount(),
      getAvgOrderValue(),
    ]);

  return (
    <div className="space-y-6">
      <AnalyticsKPICards summary={summary} newCustomers={newCustomers} avgOrderValue={avgOrderValue} />
      <RevenueChart data={revenueSeries} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <OrderStatusChart data={statusBreakdown} />
        </div>
        <div className="lg:col-span-1">
          <TopProductsTable data={topProducts} />
        </div>
        <div className="lg:col-span-1">
          <TopCategoriesTable data={topCategories} />
        </div>
      </div>

      <CustomerGrowthChart data={customerSeries} />
    </div>
  );
}

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-flow-gradient text-white shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-flow-cyan-light/15 blur-3xl" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/5 blur-2xl" />
        </div>
        <div className="space-y-1 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold backdrop-blur-sm">
            <TrendingUp className="w-3.5 h-3.5 text-flow-cyan-light" />
            <span>Live data — refreshed on every visit</span>
          </div>
          <GradientText as="h1" variant="cyan" className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Analytics & Reporting
          </GradientText>
          <p className="text-sm text-white/80 max-w-lg">
            Revenue trends, order pipeline, customer acquisition and top-performer rankings — all in one view.
          </p>
        </div>
        <div className="shrink-0 relative z-10">
          <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
            <BarChart3 className="w-8 h-8 text-flow-cyan-light" />
          </div>
        </div>
      </div>

      <Suspense fallback={<AnalyticsLoading />}>
        <AnalyticsContent />
      </Suspense>
    </div>
  );
}
