import { DollarSign, ShoppingBag, Users, Package } from "lucide-react";
import { MetricCard } from "@/components/shared/MetricCard";
import type { getDashboardKPIs } from "@/lib/admin-dashboard";

type KPIs = Awaited<ReturnType<typeof getDashboardKPIs>>;

export function DashboardMetrics({ kpis }: { kpis: KPIs }) {
  const unfulfilledOrders = kpis.pendingOrders + kpis.processingOrders;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <MetricCard
        label="Total Revenue"
        value={`$${parseFloat(kpis.totalRevenue).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
        change={`${kpis.totalOrders} orders total`}
        trend="up"
        icon={<DollarSign className="w-5 h-5" />}
      />
      <MetricCard
        label="Active Orders"
        value={kpis.totalOrders}
        change={`${unfulfilledOrders} need attention`}
        trend={unfulfilledOrders > 0 ? "neutral" : "up"}
        icon={<ShoppingBag className="w-5 h-5" />}
      />
      <MetricCard
        label="Stock Alerts"
        value={kpis.lowStockCount + kpis.outOfStockCount}
        change={`${kpis.outOfStockCount} out of stock`}
        trend={kpis.outOfStockCount > 0 ? "down" : kpis.lowStockCount > 0 ? "neutral" : "up"}
        icon={<Package className="w-5 h-5" />}
      />
      <MetricCard
        label="Customers"
        value={kpis.totalCustomers.toLocaleString()}
        change={`${kpis.activeCustomers} active`}
        trend="up"
        icon={<Users className="w-5 h-5" />}
      />
    </div>
  );
}
