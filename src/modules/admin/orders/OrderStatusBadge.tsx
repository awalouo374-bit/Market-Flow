import type { OrderStatus, PaymentStatus, FulfillmentStatus } from "@/lib/admin-orders";

const ORDER_CFG: Record<OrderStatus, string> = {
  pending:    "bg-amber-500/15 text-amber-600",
  processing: "bg-blue-500/15 text-blue-600",
  shipped:    "bg-cyan-500/15 text-cyan-600",
  delivered:  "bg-emerald-500/15 text-emerald-600",
  cancelled:  "bg-muted text-muted-foreground",
  refunded:   "bg-orange-500/15 text-orange-600",
};

const PAYMENT_CFG: Record<PaymentStatus, string> = {
  pending:  "bg-amber-500/15 text-amber-600",
  paid:     "bg-emerald-500/15 text-emerald-600",
  failed:   "bg-destructive/15 text-destructive",
  refunded: "bg-orange-500/15 text-orange-600",
};

const FULFILLMENT_CFG: Record<FulfillmentStatus, string> = {
  unfulfilled:         "bg-muted text-muted-foreground",
  partially_fulfilled: "bg-blue-500/15 text-blue-600",
  fulfilled:           "bg-emerald-500/15 text-emerald-600",
};

const badge = (label: string, cls: string) => (
  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${cls}`}>
    {label.replace(/_/g, " ")}
  </span>
);

export const OrderStatusBadge    = ({ status }: { status: OrderStatus })       => badge(status, ORDER_CFG[status]);
export const PaymentStatusBadge  = ({ status }: { status: PaymentStatus })     => badge(status, PAYMENT_CFG[status]);
export const FulfillmentBadge    = ({ status }: { status: FulfillmentStatus }) => badge(status, FULFILLMENT_CFG[status]);
