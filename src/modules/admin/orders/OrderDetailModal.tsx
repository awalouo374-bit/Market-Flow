"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { BrandButton } from "@/components/shared/BrandButton";
import { OrderStatusBadge, PaymentStatusBadge, FulfillmentBadge } from "./OrderStatusBadge";
import { updateOrderStatusAction } from "@/actions/orderActions";
import { toast } from "sonner";
import type { AdminOrderDetail, OrderStatus, PaymentStatus, FulfillmentStatus } from "@/lib/admin-orders";

const selectCls = "h-8 px-2 rounded-lg border border-border bg-background text-xs focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all";

interface OrderDetailModalProps {
  order: AdminOrderDetail;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

export function OrderDetailModal({ order, open, onOpenChange }: OrderDetailModalProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(order.paymentStatus);
  const [fulfillmentStatus, setFulfillmentStatus] = useState<FulfillmentStatus>(order.fulfillmentStatus);

  const handleSave = () => {
    startTransition(async () => {
      const result = await updateOrderStatusAction({ orderId: order.id, status, paymentStatus, fulfillmentStatus });
      if (result.error) { toast.error(result.error); return; }
      toast.success("Order updated");
      onOpenChange(false);
      router.refresh();
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-accent/10 text-accent">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <DialogTitle className="text-base font-bold">Order {order.orderNumber}</DialogTitle>
              <DialogDescription className="text-xs mt-0.5">
                {order.customerName ?? "Guest"} · {order.customerEmail ?? "—"}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-3">
          {([
            ["Order Status", ["pending","processing","shipped","delivered","cancelled","refunded"], status, setStatus],
            ["Payment", ["pending","paid","failed","refunded"], paymentStatus, setPaymentStatus],
            ["Fulfillment", ["unfulfilled","partially_fulfilled","fulfilled"], fulfillmentStatus, setFulfillmentStatus],
          ] as const).map(([label, options, value, setter]) => (
            <div key={label}>
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
              <select value={value} onChange={(e) => (setter as (v: string) => void)(e.target.value)} className={selectCls}>
                {options.map((o) => <option key={o} value={o}>{o.replace(/_/g, " ")}</option>)}
              </select>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-3 py-2 text-left font-semibold text-muted-foreground uppercase tracking-wider">Item</th>
                <th className="px-3 py-2 text-left font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">SKU</th>
                <th className="px-3 py-2 text-right font-semibold text-muted-foreground uppercase tracking-wider">Qty</th>
                <th className="px-3 py-2 text-right font-semibold text-muted-foreground uppercase tracking-wider">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {order.items.map((item) => (
                <tr key={item.id} className="hover:bg-muted/20">
                  <td className="px-3 py-2">
                    <p className="font-semibold text-foreground">{item.productName}</p>
                    {item.variantName && <p className="text-muted-foreground">{item.variantName}</p>}
                  </td>
                  <td className="px-3 py-2 font-mono text-muted-foreground hidden sm:table-cell">{item.sku}</td>
                  <td className="px-3 py-2 text-right">{item.quantity}</td>
                  <td className="px-3 py-2 text-right font-semibold">${parseFloat(item.total).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs bg-muted/30 rounded-xl p-3 border border-border">
          {[["Subtotal", order.subtotal], ["Tax", order.tax], ["Shipping", order.shippingFee], ["Discount", `-${order.discountTotal}`]].map(([label, val]) => (
            <div key={label} className="flex justify-between">
              <span className="text-muted-foreground">{label}</span>
              <span className="font-medium">${parseFloat(String(val).replace("-", "")).toFixed(2)}</span>
            </div>
          ))}
          <div className="col-span-2 flex justify-between border-t border-border pt-2 mt-1 font-bold text-sm">
            <span>Total</span>
            <span>${parseFloat(order.total).toFixed(2)}</span>
          </div>
        </div>

        {order.shippingAddress && (
          <div className="text-xs text-muted-foreground bg-muted/20 rounded-xl px-3 py-2 border border-border">
            <p className="font-semibold text-foreground mb-0.5">Ship to</p>
            <p>{order.shippingAddress.recipientName} · {order.shippingAddress.phone}</p>
            <p>{order.shippingAddress.streetAddress}, {order.shippingAddress.city}, {order.shippingAddress.country} {order.shippingAddress.postalCode}</p>
          </div>
        )}

        <div className="flex justify-end gap-2 pt-1">
          <BrandButton variant="ghost" size="sm" type="button" onClick={() => onOpenChange(false)} disabled={isPending}>Cancel</BrandButton>
          <BrandButton variant="flow" size="sm" type="button" onClick={handleSave} disabled={isPending} className="gap-2">
            {isPending ? "Saving…" : "Save Changes"}
          </BrandButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
