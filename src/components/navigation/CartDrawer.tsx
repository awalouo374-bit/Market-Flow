"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { BrandButton } from "@/components/shared/BrandButton";

export function CartDrawer() {
  const { isCartOpen, closeCart, items, subtotal, removeItem, updateQuantity, itemCount } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
        onClick={closeCart}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-background text-foreground shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 border-l border-border">
          {/* Header */}
          <div className="p-6 border-b border-border flex items-center justify-between bg-muted/30">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-accent/10 text-accent">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-semibold text-lg leading-tight">Your Cart</h2>
                <p className="text-xs text-muted-foreground">
                  {itemCount} {itemCount === 1 ? "item" : "items"} selected
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={closeCart}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                  <ShoppingBag className="w-10 h-10 stroke-1" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium text-base">Your cart is empty</h3>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Looks like you haven't added any products to your cart yet.
                  </p>
                </div>
                <BrandButton variant="flow" size="sm" onClick={closeCart} className="mt-4">
                  Start Shopping
                </BrandButton>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 rounded-xl border border-border/80 bg-card hover:border-accent/40 transition-all duration-200 group"
                >
                  <div className="w-20 h-20 rounded-lg bg-muted relative overflow-hidden flex-shrink-0 border border-border/40">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-sm text-foreground line-clamp-1 group-hover:text-accent transition-colors">
                          {item.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors p-1"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      {item.variantName && (
                        <span className="inline-block text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded mt-1">
                          {item.variantName}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <span className="font-semibold text-sm">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>

                      <div className="flex items-center border border-border rounded-lg bg-background">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-medium">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-border bg-muted/20 space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-medium text-foreground">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className="text-accent font-medium">Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-base font-semibold text-foreground pt-2 border-t border-border">
                  <span>Total</span>
                  <span className="text-flow-gradient">${subtotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Link href="/checkout" onClick={closeCart} className="block w-full">
                  <BrandButton variant="flow" className="w-full flex items-center justify-center gap-2 group">
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </BrandButton>
                </Link>
                <Link href="/cart" onClick={closeCart} className="block w-full">
                  <BrandButton variant="silver" className="w-full text-xs">
                    View Detailed Cart
                  </BrandButton>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
