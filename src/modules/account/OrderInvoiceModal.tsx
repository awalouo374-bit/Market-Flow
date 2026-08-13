"use client";

import { X, Printer, Download, FileText, CheckCircle2 } from "lucide-react";
import type { CustomerOrder } from "@/lib/user-orders";
import { BrandButton } from "@/components/shared/BrandButton";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { toast } from "sonner";

interface OrderInvoiceModalProps {
  order: CustomerOrder | null;
  onClose: () => void;
}

export function OrderInvoiceModal({ order, onClose }: OrderInvoiceModalProps) {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    toast.success(`Invoice PDF generated for ${order.orderNumber}`, {
      description: "Downloading document...",
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="invoice-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      <div
        className="relative w-full max-w-2xl bg-card border border-border rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-flow-cyan/10 text-flow-cyan">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 id="invoice-title" className="text-lg font-bold text-foreground">
                Official Invoice
              </h2>
              <p className="text-xs text-muted-foreground">
                Invoice #{order.orderNumber}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              aria-label="Print invoice"
              className="p-2 rounded-xl border border-border bg-background text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
            </button>
            <BrandButton
              type="button"
              onClick={handleDownload}
              variant="flow"
              size="sm"
              className="gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>PDF</span>
            </BrandButton>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close invoice dialog"
              className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Invoice Printable Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1 text-xs sm:text-sm">
          {/* Logo & Invoice Date */}
          <div className="flex items-center justify-between border-b border-border pb-6">
            <BrandLogo size="md" />
            <div className="text-right space-y-1">
              <span className="inline-flex items-center gap-1 text-emerald-500 font-bold text-xs bg-emerald-500/10 px-2.5 py-0.5 rounded-md">
                <CheckCircle2 className="w-3 h-3" />
                Payment Received
              </span>
              <p className="text-muted-foreground text-xs">
                Date: {new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
          </div>

          {/* Billing & Shipping Grid */}
          <div className="grid grid-cols-2 gap-6 bg-muted/20 p-4 rounded-2xl border border-border/60">
            <div>
              <p className="font-bold text-foreground text-xs uppercase tracking-wider mb-1">
                Billed & Shipped To:
              </p>
              <p className="font-semibold text-foreground">{order.shippingAddress?.recipientName ?? "Customer"}</p>
              <p className="text-muted-foreground text-xs">{order.shippingAddress?.streetAddress}</p>
              <p className="text-muted-foreground text-xs">
                {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.postalCode}
              </p>
              <p className="text-muted-foreground text-xs">{order.shippingAddress?.country}</p>
            </div>

            <div>
              <p className="font-bold text-foreground text-xs uppercase tracking-wider mb-1">
                Payment Details:
              </p>
              <p className="font-semibold text-foreground">{order.paymentMethod}</p>
              <p className="text-muted-foreground text-xs">Status: {order.paymentStatus.toUpperCase()}</p>
              <p className="text-muted-foreground text-xs">Fulfillment: {order.fulfillmentStatus}</p>
            </div>
          </div>

          {/* Items Table */}
          <div className="space-y-2">
            <p className="font-bold text-foreground text-xs uppercase tracking-wider">
              Order Items Summary
            </p>
            <div className="rounded-2xl border border-border overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted/50 border-b border-border text-xs font-bold text-muted-foreground">
                    <th className="py-3 px-4">Item</th>
                    <th className="py-3 px-4 text-center">Qty</th>
                    <th className="py-3 px-4 text-right">Price</th>
                    <th className="py-3 px-4 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {order.items.map((item) => (
                    <tr key={item.id} className="text-xs">
                      <td className="py-3 px-4">
                        <p className="font-bold text-foreground">{item.productName}</p>
                        {item.variantName && (
                          <p className="text-[11px] text-muted-foreground">{item.variantName}</p>
                        )}
                        <p className="text-[10px] text-muted-foreground font-mono">SKU: {item.sku}</p>
                      </td>
                      <td className="py-3 px-4 text-center font-bold">{item.quantity}</td>
                      <td className="py-3 px-4 text-right">${parseFloat(item.price).toFixed(2)}</td>
                      <td className="py-3 px-4 text-right font-bold">${parseFloat(item.total).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Breakdown Totals */}
          <div className="flex justify-end pt-2">
            <div className="w-full max-w-xs space-y-2 text-xs">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${parseFloat(order.subtotal).toFixed(2)}</span>
              </div>
              {parseFloat(order.discountTotal) > 0 && (
                <div className="flex justify-between text-emerald-500 font-semibold">
                  <span>Discount</span>
                  <span>-${parseFloat(order.discountTotal).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-muted-foreground">
                <span>Estimated Tax</span>
                <span>${parseFloat(order.tax).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>{parseFloat(order.shippingFee) === 0 ? "FREE" : `$${parseFloat(order.shippingFee).toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-border text-sm font-extrabold text-foreground">
                <span>Total Billed</span>
                <span className="text-flow-cyan">${parseFloat(order.total).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
