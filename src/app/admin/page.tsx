import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { TrendingUp, Boxes, Star, Clock, Plus } from "lucide-react";
import { getDashboardKPIs, getRecentOrders, getCriticalStockVariants } from "@/lib/admin-dashboard";
import { DashboardMetrics } from "@/modules/admin/dashboard/DashboardMetrics";
import { RecentOrdersTable } from "@/modules/admin/dashboard/RecentOrdersTable";
import { LowStockAlert } from "@/modules/admin/dashboard/LowStockAlert";
import { DashboardQuickNav } from "@/modules/admin/dashboard/DashboardQuickNav";
import { BrandButton } from "@/components/shared/BrandButton";
import { getConnectedUser } from "@/lib/session";

export const metadata: Metadata = { title: "Dashboard — MarketFlow Admin" };

async function DashboardContent() {
  const [kpis, recentOrders, criticalStock] = await Promise.all([
    getDashboardKPIs(),
    getRecentOrders(6),
    getCriticalStockVariants(5),
  ]);

  const alertCount = kpis.lowStockCount + kpis.outOfStockCount + kpis.pendingReviews + kpis.pendingOrders;

  return (
    <div className="space-y-8">
      <DashboardMetrics kpis={kpis} />

      {alertCount > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {kpis.pendingOrders > 0 && (
            <Link href="/admin/orders?status=pending"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10 transition-colors">
              <div className="p-2 rounded-xl bg-amber-500/15 text-amber-600 shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-amber-600">{kpis.pendingOrders} Pending Orders</p>
                <p className="text-[10px] text-muted-foreground">Require processing</p>
              </div>
            </Link>
          )}
          {(kpis.lowStockCount + kpis.outOfStockCount) > 0 && (
            <Link href="/admin/inventory?filter=low"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-destructive/30 bg-destructive/5 hover:bg-destructive/10 transition-colors">
              <div className="p-2 rounded-xl bg-destructive/15 text-destructive shrink-0">
                <Boxes className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-destructive">{kpis.outOfStockCount} Out of Stock</p>
                <p className="text-[10px] text-muted-foreground">{kpis.lowStockCount} more running low</p>
              </div>
            </Link>
          )}
          {kpis.pendingReviews > 0 && (
            <Link href="/admin/reviews?status=pending"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-accent/30 bg-accent/5 hover:bg-accent/10 transition-colors">
              <div className="p-2 rounded-xl bg-accent/15 text-accent shrink-0">
                <Star className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-accent">{kpis.pendingReviews} Reviews to Moderate</p>
                <p className="text-[10px] text-muted-foreground">Awaiting approval</p>
              </div>
            </Link>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <RecentOrdersTable orders={recentOrders} />
          <LowStockAlert variants={criticalStock} />
        </div>
        <DashboardQuickNav kpis={kpis} />
      </div>
    </div>
  );
}

export default async function AdminDashboardPage() {
  const user = await getConnectedUser();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-flow-gradient text-white shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-flow-cyan-light/15 blur-3xl" />
        </div>
        <div className="space-y-1 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold backdrop-blur-md">
            <TrendingUp className="w-3.5 h-3.5 text-flow-cyan-light" />
            <span>Live data — updates on every visit</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}
          </h1>
          <p className="text-sm text-white/80 max-w-lg">
            Here&apos;s a real-time overview of your store&apos;s performance across all operations.
          </p>
        </div>
        <div className="flex items-center gap-3 relative z-10">
          <Link href="/admin/inventory">
            <BrandButton variant="silver" size="sm" className="text-white border-white/40 hover:bg-white/10 gap-2">
              <Boxes className="w-4 h-4 text-flow-cyan-light" />
              Inventory
            </BrandButton>
          </Link>
          <Link href="/admin/products">
            <BrandButton variant="flow" size="sm" className="bg-white text-primary hover:bg-white/90 gap-2 font-bold">
              <Plus className="w-4 h-4" />
              New Product
            </BrandButton>
          </Link>
        </div>
      </div>

      <Suspense fallback={
        <div className="space-y-6">
          <div className="grid grid-cols-4 gap-5">{Array.from({length:4}).map((_,i)=><div key={i} className="h-28 rounded-2xl bg-muted animate-pulse"/>)}</div>
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 h-64 rounded-2xl bg-muted animate-pulse"/>
            <div className="h-64 rounded-2xl bg-muted animate-pulse"/>
          </div>
        </div>
      }>
        <DashboardContent />
      </Suspense>
    </div>
  );
}
