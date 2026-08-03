import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { BrandCard } from "@/components/shared/BrandCard";
import { OrderStatusBadge, PaymentStatusBadge } from "@/modules/admin/orders/OrderStatusBadge";
import type { getRecentOrders } from "@/lib/admin-dashboard";

type Orders = Awaited<ReturnType<typeof getRecentOrders>>;

export function RecentOrdersTable({ orders }: { orders: Orders }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-foreground">Recent Orders</h2>
          <p className="text-xs text-muted-foreground">Latest transactions across the store</p>
        </div>
        <Link href="/admin/orders" className="text-xs font-semibold text-accent hover:underline flex items-center gap-1 group">
          View all
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <BrandCard variant="default" className="p-0 overflow-hidden">
        {orders.length === 0 ? (
          <p className="text-center py-10 text-sm text-muted-foreground">No orders yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-muted/50 border-b border-border text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-2.5 text-left">Order</th>
                  <th className="px-4 py-2.5 text-left hidden md:table-cell">Customer</th>
                  <th className="px-4 py-2.5 text-left">Status</th>
                  <th className="px-4 py-2.5 text-left hidden sm:table-cell">Payment</th>
                  <th className="px-4 py-2.5 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 bg-card">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-2.5">
                      <p className="font-mono font-semibold text-foreground">{o.orderNumber}</p>
                      <p className="text-muted-foreground mt-0.5">
                        {formatDistanceToNow(o.createdAt, { addSuffix: true })}
                      </p>
                    </td>
                    <td className="px-4 py-2.5 hidden md:table-cell">
                      <p className="text-foreground line-clamp-1">{o.customerName ?? "Guest"}</p>
                    </td>
                    <td className="px-4 py-2.5">
                      <OrderStatusBadge status={o.status} />
                    </td>
                    <td className="px-4 py-2.5 hidden sm:table-cell">
                      <PaymentStatusBadge status={o.paymentStatus} />
                    </td>
                    <td className="px-4 py-2.5 text-right font-bold text-foreground">
                      ${parseFloat(o.total).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </BrandCard>
    </div>
  );
}
