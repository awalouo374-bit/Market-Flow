import React from "react";
import Link from "next/link";
import {
  DollarSign,
  ShoppingBag,
  AlertTriangle,
  Users,
  ArrowUpRight,
  Plus,
  Boxes,
  Package,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { MetricCard } from "@/components/shared/MetricCard";
import { BrandCard } from "@/components/shared/BrandCard";
import { BrandButton } from "@/components/shared/BrandButton";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-flow-gradient text-white shadow-xl relative overflow-hidden">
        <div className="space-y-1 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold backdrop-blur-md">
            <TrendingUp className="w-3.5 h-3.5 text-flow-cyan-light" />
            <span>Store Performance: Up 12.4% this month</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Admin Operations Portal
          </h1>
          <p className="text-sm text-white/80 max-w-lg">
            Manage your inventory, monitor active customer orders, and track revenue metrics in real-time.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <Link href="/admin/inventory">
            <BrandButton variant="silver" size="sm" className="shadow-md flex items-center gap-2 text-white border-white/40 hover:bg-white/10">
              <Boxes className="w-4 h-4 text-flow-cyan-light" />
              <span>Inventory Audit</span>
            </BrandButton>
          </Link>
          <Link href="/admin/products/new">
            <BrandButton variant="flow" size="sm" className="bg-white text-primary hover:bg-white/90 shadow-md flex items-center gap-2 font-bold">
              <Plus className="w-4 h-4" />
              <span>New Product</span>
            </BrandButton>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard
          label="Total Sales Revenue"
          value="$48,290.00"
          change="+12.4% vs last month"
          trend="up"
          icon={<DollarSign className="w-5 h-5" />}
        />
        <MetricCard
          label="Active Orders"
          value="12"
          change="4 unfulfilled orders"
          trend="neutral"
          icon={<ShoppingBag className="w-5 h-5" />}
        />
        <MetricCard
          label="Low Stock Warning"
          value="3 Items"
          change="Requires restock"
          trend="down"
          icon={<AlertTriangle className="w-5 h-5" />}
        />
        <MetricCard
          label="Total Customers"
          value="1,420"
          change="+8.2% new users"
          trend="up"
          icon={<Users className="w-5 h-5" />}
        />
      </div>

      {/* Main Grid: Low Stock Alert & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Inventory Control Alerts (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-foreground">Inventory Stock Watch</h2>
              <p className="text-xs text-muted-foreground">Variants approaching low stock threshold</p>
            </div>
            <Link
              href="/admin/inventory"
              className="text-xs font-semibold text-accent hover:underline flex items-center gap-1"
            >
              <span>View All Inventory</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <BrandCard variant="default" className="p-0 overflow-hidden border-border/80">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-muted/50 border-b border-border font-semibold text-muted-foreground uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5 pl-5">Product & Variant</th>
                    <th className="p-3.5">SKU</th>
                    <th className="p-3.5">Stock Remaining</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right pr-5">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="p-3.5 pl-5 font-semibold text-foreground">
                      Aether Pro Phone X1 <span className="text-muted-foreground font-normal">(Matte Black / 256GB)</span>
                    </td>
                    <td className="p-3.5 font-mono text-muted-foreground">AETH-PH-X1-BLK-256</td>
                    <td className="p-3.5">
                      <span className="font-bold text-amber-500">3 units</span>
                    </td>
                    <td className="p-3.5">
                      <span className="inline-flex items-center gap-1 bg-amber-500/15 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full font-bold text-[10px]">
                        <AlertTriangle className="w-3 h-3" /> Low Stock
                      </span>
                    </td>
                    <td className="p-3.5 text-right pr-5">
                      <Link href="/admin/inventory" className="text-accent hover:underline font-semibold">
                        Restock +
                      </Link>
                    </td>
                  </tr>

                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="p-3.5 pl-5 font-semibold text-foreground">
                      Aether Wireless Earphones <span className="text-muted-foreground font-normal">(White / ANC)</span>
                    </td>
                    <td className="p-3.5 font-mono text-muted-foreground">AETH-EAR-WHT-01</td>
                    <td className="p-3.5">
                      <span className="font-bold text-amber-500">4 units</span>
                    </td>
                    <td className="p-3.5">
                      <span className="inline-flex items-center gap-1 bg-amber-500/15 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full font-bold text-[10px]">
                        <AlertTriangle className="w-3 h-3" /> Low Stock
                      </span>
                    </td>
                    <td className="p-3.5 text-right pr-5">
                      <Link href="/admin/inventory" className="text-accent hover:underline font-semibold">
                        Restock +
                      </Link>
                    </td>
                  </tr>

                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="p-3.5 pl-5 font-semibold text-foreground">
                      Flow Ultra Charger 65W <span className="text-muted-foreground font-normal">(Gallium Nitride)</span>
                    </td>
                    <td className="p-3.5 font-mono text-muted-foreground">FLOW-CHG-65W</td>
                    <td className="p-3.5">
                      <span className="font-bold text-emerald-500">52 units</span>
                    </td>
                    <td className="p-3.5">
                      <span className="inline-flex items-center gap-1 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full font-bold text-[10px]">
                        <CheckCircle2 className="w-3 h-3" /> Healthy
                      </span>
                    </td>
                    <td className="p-3.5 text-right pr-5">
                      <Link href="/admin/inventory" className="text-muted-foreground hover:text-foreground font-medium">
                        Log Audit
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </BrandCard>
        </div>

        {/* Quick Admin Actions & Store Stats (1 col) */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-foreground">Quick Management</h2>
            <p className="text-xs text-muted-foreground">Shortcuts to key administrative tasks</p>
          </div>

          <div className="space-y-3">
            <Link href="/admin/products" className="block group">
              <BrandCard variant="elevated" className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-accent/15 text-accent">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm group-hover:text-accent transition-colors">
                      Product Catalog
                    </h3>
                    <p className="text-xs text-muted-foreground">Manage titles, SKUs, and pricing</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
              </BrandCard>
            </Link>

            <Link href="/admin/orders" className="block group">
              <BrandCard variant="elevated" className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500/15 text-cyan-500">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm group-hover:text-accent transition-colors">
                      Customer Orders
                    </h3>
                    <p className="text-xs text-muted-foreground">Fulfill orders & process shipments</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
              </BrandCard>
            </Link>

            <Link href="/admin/inventory" className="block group">
              <BrandCard variant="elevated" className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-500">
                    <Boxes className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm group-hover:text-accent transition-colors">
                      Inventory Control
                    </h3>
                    <p className="text-xs text-muted-foreground">Audit stock logs & adjustments</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
              </BrandCard>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
