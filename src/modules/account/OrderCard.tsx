"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  RotateCcw,
  FileText,
  Truck,
  Copy,
  Check,
  ExternalLink,
  MapPin,
  CreditCard,
  Package,
} from "lucide-react";
import type { CustomerOrder } from "@/lib/user-orders";
import { OrderStatusStepper } from "./OrderStatusStepper";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

interface OrderCardProps {
  order: CustomerOrder;
  onOpenInvoice: (order: CustomerOrder) => void;
  onOpenReturn: (order: CustomerOrder) => void;
}

export function OrderCard({ order, onOpenInvoice, onOpenReturn }: OrderCardProps) {
  const { addItem } = useCart();
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedTracking, setCopiedTracking] = useState(false);
  const [isReordering, setIsReordering] = useState(false);

  const totalNum = parseFloat(order.total);

  // Status color styles
  const statusStyles: Record<string, string> = {
    delivered: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    shipped: "bg-flow-cyan/10 text-flow-cyan border-flow-cyan/30",
    processing: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    pending: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
  };

  const handleCopyTracking = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!order.trackingNumber) return;

    navigator.clipboard.writeText(order.trackingNumber);
    setCopiedTracking(true);
    toast.success("Tracking number copied!", { description: order.trackingNumber });
    setTimeout(() => setCopiedTracking(false), 2000);
  };

  const handleBuyAgain = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isReordering) return;

    setIsReordering(true);
    let count = 0;
    for (const item of order.items) {
      addItem({
        id: item.id,
        productId: item.productId ?? item.id,
        name: item.productName,
        price: parseFloat(item.price),
        image: item.image,
        quantity: item.quantity,
      });
      count += item.quantity;
    }

    toast.success(`Reordered ${count} item${count === 1 ? "" : "s"}!`, {
      description: "Added to your shopping cart.",
    });

    setTimeout(() => setIsReordering(false), 600);
  };

  return (
    <div className="rounded-3xl border border-border bg-card overflow-hidden transition-all duration-300 hover:border-flow-cyan/40 shadow-xs">
      {/* 1. Header Summary Row */}
      <div className="p-5 sm:p-6 bg-muted/20 space-y-4 border-b border-border/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* Order # & Date */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-flow-cyan" />
              <span className="font-extrabold text-base sm:text-lg text-foreground font-mono">
                {order.orderNumber}
              </span>
              <span
                className={`inline-flex items-center text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${
                  statusStyles[order.status] ?? statusStyles.processing
                }`}
              >
                {order.status}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Placed on {new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
            </p>
          </div>

          {/* Price & Action Triggers */}
          <div className="flex items-center justify-between sm:justify-end gap-4 pt-2 sm:pt-0">
            <div className="text-left sm:text-right">
              <span className="text-xs text-muted-foreground block font-medium">Total Price</span>
              <span className="text-lg sm:text-xl font-extrabold text-foreground">${totalNum.toFixed(2)}</span>
            </div>

            {/* Expand / Collapse Accordion Toggle */}
            <button
              type="button"
              onClick={() => setIsExpanded((prev) => !prev)}
              aria-expanded={isExpanded}
              aria-label="Toggle order details"
              className="h-10 px-3.5 rounded-xl border border-border bg-background text-xs font-bold text-foreground flex items-center gap-1.5 hover:border-flow-cyan/40 transition-colors cursor-pointer"
            >
              <span>{isExpanded ? "Hide Details" : "View Details"}</span>
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

        </div>

        {/* 2. Visual Progress Stepper */}
        <OrderStatusStepper status={order.status} />

        {/* 3. Carrier & Tracking Banner */}
        {order.trackingNumber && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-card border border-border text-xs">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-flow-cyan shrink-0" />
              <div>
                <span className="font-bold text-foreground">{order.carrier}</span>
                <span className="text-muted-foreground ml-2">({order.estimatedDelivery})</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyTracking}
                className="inline-flex items-center gap-1 text-xs font-mono font-bold text-foreground hover:text-flow-cyan transition-colors cursor-pointer"
              >
                <span>{order.trackingNumber}</span>
                {copiedTracking ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                )}
              </button>

              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(order.trackingNumber)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 rounded-md text-flow-cyan hover:bg-flow-cyan/10 transition-colors"
                aria-label="Track on carrier website"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* 4. Action Buttons Strip */}
      <div className="p-4 sm:p-5 bg-card flex flex-wrap items-center justify-between gap-3 border-b border-border/60">
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* Buy Again / Reorder */}
          <button
            type="button"
            onClick={handleBuyAgain}
            disabled={isReordering}
            className="flex-1 sm:flex-initial h-10 px-4 rounded-xl bg-market-navy text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-flow-cyan transition-colors cursor-pointer disabled:opacity-50"
          >
            <ShoppingBag className={`w-3.5 h-3.5 ${isReordering ? "animate-bounce" : ""}`} />
            <span>{isReordering ? "Reordering..." : "Buy Again"}</span>
          </button>

          {/* Download Invoice PDF */}
          <button
            type="button"
            onClick={() => onOpenInvoice(order)}
            className="h-10 px-3.5 rounded-xl border border-border text-xs font-semibold flex items-center justify-center gap-1.5 text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Invoice PDF</span>
          </button>

          {/* Return / Replace */}
          {order.status === "delivered" && (
            <button
              type="button"
              onClick={() => onOpenReturn(order)}
              className="h-10 px-3.5 rounded-xl border border-border text-xs font-semibold flex items-center justify-center gap-1.5 text-muted-foreground hover:text-amber-500 hover:border-amber-200 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Return / Replace</span>
            </button>
          )}
        </div>

        <span className="text-xs text-muted-foreground hidden lg:block">
          {order.items.length} item{order.items.length === 1 ? "" : "s"} in this order
        </span>
      </div>

      {/* 5. Accordion Expandable Detailed Breakdown */}
      {isExpanded && (
        <div className="p-6 bg-muted/10 space-y-6 animate-in slide-in-from-top-2 duration-300">
          
          {/* Itemized Products List */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-foreground uppercase tracking-wider">
              Itemized Order Contents
            </span>

            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-3.5 rounded-2xl border border-border/80 bg-card"
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-muted/40 shrink-0">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.productName}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <ShoppingBag className="w-6 h-6 stroke-1" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 space-y-0.5">
                    <p className="font-bold text-xs sm:text-sm text-foreground line-clamp-1">
                      {item.productName}
                    </p>
                    {item.variantName && (
                      <p className="text-xs text-muted-foreground">{item.variantName}</p>
                    )}
                    <p className="text-[10px] text-muted-foreground font-mono">SKU: {item.sku}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="font-bold text-xs sm:text-sm text-foreground">
                      ${parseFloat(item.price).toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Address & Financial Breakdown Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* Delivery Address */}
            <div className="p-4 rounded-2xl border border-border/80 bg-card space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-foreground uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-flow-cyan" />
                <span>Shipping Address</span>
              </div>
              <div className="text-xs text-muted-foreground space-y-0.5">
                <p className="font-bold text-foreground">{order.shippingAddress?.recipientName}</p>
                <p>{order.shippingAddress?.streetAddress}</p>
                <p>
                  {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.postalCode}
                </p>
                <p>{order.shippingAddress?.country}</p>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="p-4 rounded-2xl border border-border/80 bg-card space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-foreground uppercase tracking-wider">
                <CreditCard className="w-4 h-4 text-flow-cyan" />
                <span>Payment Summary</span>
              </div>

              <div className="space-y-1.5 pt-1 text-muted-foreground">
                <div className="flex justify-between">
                  <span>Method</span>
                  <span className="font-semibold text-foreground">{order.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${parseFloat(order.subtotal).toFixed(2)}</span>
                </div>
                {parseFloat(order.discountTotal) > 0 && (
                  <div className="flex justify-between text-emerald-500 font-semibold">
                    <span>Discount</span>
                    <span>-${parseFloat(order.discountTotal).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Tax & Shipping</span>
                  <span>
                    ${(parseFloat(order.tax) + parseFloat(order.shippingFee)).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border font-extrabold text-sm text-foreground">
                  <span>Total Paid</span>
                  <span className="text-flow-cyan">${totalNum.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
