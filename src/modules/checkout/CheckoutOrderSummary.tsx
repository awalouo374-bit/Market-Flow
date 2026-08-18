"use client";

import React from "react";
import { Minus, Plus, Trash2, ShoppingBag, Package } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import type { ShippingMethod } from "./CheckoutShippingStep";

interface Props {
  shippingMethod?: ShippingMethod;
  step: number;
}

const FREE_SHIPPING_THRESHOLD = 75;

export function CheckoutOrderSummary({ shippingMethod, step }: Props) {
  const { items, subtotal, updateQuantity, removeItem } = useCart();
  const tax = subtotal * 0.08;
  const shippingCost = shippingMethod ? shippingMethod.price : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 4.99;
  const total = subtotal + tax + shippingCost;

  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  if (items.length === 0 && step < 3) {
    return (
      <div className="rounded-2xl p-8 bg-slate-900/90 border border-slate-800 backdrop-blur-xl text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto">
          <ShoppingBag className="w-7 h-7 text-slate-500" />
        </div>
        <p className="text-sm font-bold text-white">Your cart is empty</p>
        <p className="text-xs text-slate-400">Add products to continue to checkout.</p>
        <Link href="/products">
          <button className="h-10 px-5 rounded-xl bg-[#FF4D4D] hover:bg-[#FF3333] text-white font-bold text-xs mt-2 cursor-pointer transition-colors">
            Browse Products
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl overflow-hidden">
      
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-800 flex items-center gap-2">
        <Package className="w-4 h-4 text-[#00F0FF]" />
        <span className="text-sm font-bold text-white">
          Order Summary ({items.reduce((a, i) => a + i.quantity, 0)} items)
        </span>
      </div>

      {/* Free Shipping Progress */}
      {subtotal < FREE_SHIPPING_THRESHOLD && step < 2 && (
        <div className="px-5 py-3 bg-slate-950/50 border-b border-slate-800">
          <div className="flex justify-between text-xs mb-2">
            <span className="text-slate-400">
              Add <strong className="text-white">${remaining.toFixed(2)}</strong> for Free Shipping
            </span>
            <span className="text-[#00F0FF] font-bold">${FREE_SHIPPING_THRESHOLD}</span>
          </div>
          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#00F0FF] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Items List */}
      <div className="px-5 py-4 space-y-4 max-h-72 overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            {/* Image or Fallback */}
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-800 shrink-0 border border-slate-700">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="w-5 h-5 text-slate-500" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">{item.name}</p>
              {item.variantName && (
                <p className="text-[11px] text-slate-400">{item.variantName}</p>
              )}
              <p className="text-xs font-bold text-[#00F0FF] mt-0.5">
                ${(item.price * item.quantity).toFixed(2)}
              </p>

              {/* Qty Controls (only show in step 0) */}
              {step === 0 && (
                <div className="flex items-center gap-2 mt-1.5">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-6 h-6 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center cursor-pointer transition-colors"
                  >
                    <Minus className="w-3 h-3 text-slate-300" />
                  </button>
                  <span className="text-xs font-mono text-white w-4 text-center">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-6 h-6 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center cursor-pointer transition-colors"
                  >
                    <Plus className="w-3 h-3 text-slate-300" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="w-6 h-6 rounded-md bg-[#FF4D4D]/10 hover:bg-[#FF4D4D]/20 border border-[#FF4D4D]/30 flex items-center justify-center cursor-pointer transition-colors ml-1"
                  >
                    <Trash2 className="w-3 h-3 text-[#FF4D4D]" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="px-5 py-4 border-t border-slate-800 space-y-2.5">
        <div className="flex justify-between text-xs text-slate-400">
          <span>Subtotal</span>
          <span className="text-white">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-xs text-slate-400">
          <span>Shipping</span>
          {shippingCost === 0 ? (
            <span className="text-emerald-400 font-bold">Free</span>
          ) : (
            <span className="text-white">${shippingCost.toFixed(2)}</span>
          )}
        </div>
        <div className="flex justify-between text-xs text-slate-400">
          <span>Estimated Tax (8%)</span>
          <span className="text-white">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-base border-t border-slate-800 pt-3 mt-1">
          <span className="text-white">Total Due</span>
          <span className="text-[#FF4D4D]">${total.toFixed(2)}</span>
        </div>
      </div>

    </div>
  );
}
