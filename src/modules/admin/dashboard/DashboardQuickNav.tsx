import Link from "next/link";
import { Package, ShoppingBag, Boxes, Users, FolderTree, Tag, Star, ArrowUpRight } from "lucide-react";
import { BrandCard } from "@/components/shared/BrandCard";
import type { getDashboardKPIs } from "@/lib/admin-dashboard";

type KPIs = Awaited<ReturnType<typeof getDashboardKPIs>>;

const NAV_ITEMS = [
  { href: "/admin/products",   icon: Package,    label: "Products",   colorCls: "bg-accent/10 text-accent",       kpiKey: "activeProducts" as keyof KPIs,    kpiSuffix: "active" },
  { href: "/admin/orders",     icon: ShoppingBag,label: "Orders",     colorCls: "bg-cyan-500/10 text-cyan-600",   kpiKey: "pendingOrders" as keyof KPIs,     kpiSuffix: "pending" },
  { href: "/admin/inventory",  icon: Boxes,      label: "Inventory",  colorCls: "bg-amber-500/10 text-amber-600", kpiKey: "lowStockCount" as keyof KPIs,     kpiSuffix: "alerts" },
  { href: "/admin/customers",  icon: Users,      label: "Customers",  colorCls: "bg-emerald-500/10 text-emerald-600", kpiKey: "totalCustomers" as keyof KPIs, kpiSuffix: "total" },
  { href: "/admin/categories", icon: FolderTree, label: "Categories", colorCls: "bg-violet-500/10 text-violet-600", kpiKey: null, kpiSuffix: "" },
  { href: "/admin/brands",     icon: Tag,        label: "Brands",     colorCls: "bg-pink-500/10 text-pink-600",   kpiKey: null, kpiSuffix: "" },
  { href: "/admin/reviews",    icon: Star,       label: "Reviews",    colorCls: "bg-orange-500/10 text-orange-600", kpiKey: "pendingReviews" as keyof KPIs, kpiSuffix: "pending" },
] as const;

export function DashboardQuickNav({ kpis }: { kpis: KPIs }) {
  return (
    <div className="space-y-3">
      <h2 className="text-base font-bold text-foreground">Quick Navigation</h2>
      <div className="grid grid-cols-1 gap-2">
        {NAV_ITEMS.map(({ href, icon: Icon, label, colorCls, kpiKey, kpiSuffix }) => (
          <Link key={href} href={href} className="block group">
            <BrandCard variant="elevated" className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${colorCls}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground group-hover:text-accent transition-colors">{label}</p>
                  {kpiKey && (
                    <p className="text-[10px] text-muted-foreground">
                      {kpis[kpiKey]} {kpiSuffix}
                    </p>
                  )}
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
            </BrandCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
