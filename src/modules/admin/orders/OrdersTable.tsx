import { formatDistanceToNow } from "date-fns";
import type { AdminOrder } from "@/lib/admin-orders";
import { OrderStatusBadge, PaymentStatusBadge, FulfillmentBadge } from "./OrderStatusBadge";
import { OrderRowActions } from "./OrderRowActions";

export function OrdersTable({ orders }: { orders: AdminOrder[] }) {
  return (
    <div className="rounded-2xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 text-left">Order</th>
              <th className="px-4 py-3 text-left hidden md:table-cell">Customer</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left hidden sm:table-cell">Payment</th>
              <th className="px-4 py-3 text-left hidden lg:table-cell">Fulfillment</th>
              <th className="px-4 py-3 text-left">Total</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60 bg-card">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3">
                  <p className="font-semibold text-foreground font-mono text-xs">{order.orderNumber}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {order.itemCount} item{order.itemCount !== 1 ? "s" : ""} · {formatDistanceToNow(order.createdAt, { addSuffix: true })}
                  </p>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <p className="text-xs font-medium text-foreground line-clamp-1">{order.customerName ?? "Guest"}</p>
                  <p className="text-[10px] text-muted-foreground line-clamp-1">{order.customerEmail ?? "—"}</p>
                </td>
                <td className="px-4 py-3">
                  <OrderStatusBadge status={order.status} />
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <PaymentStatusBadge status={order.paymentStatus} />
                </td>
                <td className="px-4 py-3 hidden lg:table-cell">
                  <FulfillmentBadge status={order.fulfillmentStatus} />
                </td>
                <td className="px-4 py-3">
                  <span className="font-bold text-sm">${parseFloat(order.total).toFixed(2)}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <OrderRowActions order={order} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
