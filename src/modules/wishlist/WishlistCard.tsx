"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Trash2, TrendingDown, AlertTriangle, CheckCircle2, Star, Eye } from "lucide-react";
import type { CatalogProduct } from "@/lib/catalog";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

export interface WishlistItem extends CatalogProduct {
  priceDropAmount?: number;
  isBackInStock?: boolean;
  lowStockCount?: number;
  addedAt?: string;
}

interface WishlistCardProps {
  item: WishlistItem;
  variant?: "grid" | "list";
  onRemove: (id: string) => void;
}

export function WishlistCard({ item, variant = "grid", onRemove }: WishlistCardProps) {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const priceNum = parseFloat(item.price);
  const compareNum = item.compareAtPrice ? parseFloat(item.compareAtPrice) : null;
  const productUrl = `/products/${item.slug}`;

  // Smart alert badges
  const priceDrop = item.priceDropAmount ?? (compareNum && compareNum > priceNum ? compareNum - priceNum : 0);
  const isLowStock = item.lowStockCount ? item.lowStockCount <= 5 : item.totalStock > 0 && item.totalStock <= 5;
  const isBackInStock = item.isBackInStock ?? false;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAdding) return;

    setIsAdding(true);
    addItem({
      id: item.id,
      productId: item.id,
      name: item.name,
      price: priceNum,
      image: item.primaryImage ?? undefined,
      quantity: 1,
    });

    toast.success("Added to Cart!", {
      description: item.name,
    });

    setTimeout(() => setIsAdding(false), 500);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Call optimistic removal
    onRemove(item.id);
  };

  if (variant === "list") {
    return (
      <div className="group relative flex flex-col sm:flex-row items-center gap-5 p-5 rounded-2xl border border-border bg-card hover:border-flow-cyan/40 hover:shadow-lg transition-all duration-300">
        <Link
          href={productUrl}
          className="absolute inset-0 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flow-cyan z-0"
          aria-label={`View ${item.name}`}
        />

        {/* Thumbnail */}
        <div className="relative w-full sm:w-32 h-32 rounded-xl overflow-hidden bg-muted/40 shrink-0 z-10">
          {item.primaryImage ? (
            <Image
              src={item.primaryImage}
              alt={item.primaryImageAlt ?? item.name}
              fill
              sizes="128px"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground/40">
              <ShoppingBag className="w-10 h-10 stroke-1" />
            </div>
          )}

          {/* Badge Overlays */}
          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
            {priceDrop > 0 && (
              <span className="inline-flex items-center gap-1 bg-emerald-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs">
                <TrendingDown className="w-3 h-3" />
                -${priceDrop.toFixed(0)} Drop
              </span>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="relative z-10 flex-1 min-w-0 space-y-1.5 pointer-events-none w-full">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-flow-cyan">
              {item.categoryName ?? "Saved Item"}
            </span>
            {isBackInStock && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-md">
                <CheckCircle2 className="w-3 h-3" />
                Back in Stock
              </span>
            )}
            {isLowStock && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded-md">
                <AlertTriangle className="w-3 h-3" />
                Only {item.lowStockCount ?? item.totalStock ?? 3} left!
              </span>
            )}
          </div>

          <h3 className="font-bold text-base text-foreground line-clamp-1 group-hover:text-flow-cyan transition-colors">
            {item.name}
          </h3>

          <div className="flex items-baseline gap-2.5">
            <span className="text-lg font-extrabold text-foreground">${priceNum.toFixed(2)}</span>
            {compareNum && compareNum > priceNum && (
              <span className="text-xs text-muted-foreground line-through">
                ${compareNum.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="relative z-10 shrink-0 flex items-center sm:flex-col gap-2.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isAdding}
            aria-label={`Add ${item.name} to cart`}
            className="flex-1 sm:flex-initial h-10 px-4 rounded-xl bg-market-navy text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-flow-cyan transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-50"
          >
            <ShoppingBag className={`w-3.5 h-3.5 ${isAdding ? "animate-bounce" : ""}`} />
            <span>{isAdding ? "Adding..." : "Add to Cart"}</span>
          </button>

          <button
            type="button"
            onClick={handleRemove}
            aria-label={`Remove ${item.name} from wishlist`}
            className="h-10 px-3 rounded-xl border border-border bg-card text-xs font-semibold flex items-center justify-center gap-1.5 text-muted-foreground hover:text-red-500 hover:border-red-200 hover:bg-red-500/5 transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span className="sm:hidden">Remove</span>
          </button>
        </div>
      </div>
    );
  }

  // Grid View Variant
  return (
    <div className="group relative flex flex-col rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-flow-cyan/40">
      <Link
        href={productUrl}
        className="absolute inset-0 z-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flow-cyan"
        aria-label={`View ${item.name}`}
      />

      {/* Image Area */}
      <div className="relative aspect-square overflow-hidden bg-muted/40 z-10">
        {item.primaryImage ? (
          <Image
            src={item.primaryImage}
            alt={item.primaryImageAlt ?? item.name}
            fill
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground/40">
            <ShoppingBag className="w-12 h-12 stroke-1" />
          </div>
        )}

        {/* Status Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-20 pointer-events-none">
          {priceDrop > 0 && (
            <span className="inline-flex items-center gap-1 bg-emerald-500 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-xs">
              <TrendingDown className="w-3 h-3" />
              -${priceDrop.toFixed(0)} Price Drop
            </span>
          )}
          {isBackInStock && (
            <span className="inline-flex items-center gap-1 bg-amber-500 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-xs">
              <CheckCircle2 className="w-3 h-3" />
              Back in Stock
            </span>
          )}
          {isLowStock && (
            <span className="inline-flex items-center gap-1 bg-red-500 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-xs">
              <AlertTriangle className="w-3 h-3" />
              Only {item.lowStockCount ?? item.totalStock ?? 2} left
            </span>
          )}
        </div>

        {/* Delete Trigger Button Top-Right */}
        <div className="absolute top-3 right-3 z-20">
          <button
            type="button"
            onClick={handleRemove}
            aria-label={`Remove ${item.name} from wishlist`}
            className="w-8 h-8 rounded-xl bg-background/90 backdrop-blur-md border border-border flex items-center justify-center text-muted-foreground hover:text-red-500 hover:border-red-200 transition-colors shadow-xs cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Hover Quick Add to Cart Bar */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isAdding}
            aria-label={`Add ${item.name} to cart`}
            className="w-full h-11 bg-market-navy/95 backdrop-blur-md text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-flow-cyan transition-colors shadow-lg cursor-pointer disabled:opacity-60"
          >
            <ShoppingBag className={`w-4 h-4 ${isAdding ? "animate-bounce" : ""}`} />
            {isAdding ? "Adding to Cart..." : "Move to Cart"}
          </button>
        </div>
      </div>

      {/* Info Body */}
      <div className="flex flex-col flex-1 p-4 gap-2 z-10 pointer-events-none">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-flow-cyan">
          {item.categoryName ?? "Saved Item"}
        </span>

        <h3 className="font-bold text-sm text-foreground line-clamp-2 leading-snug group-hover:text-flow-cyan transition-colors">
          {item.name}
        </h3>

        <div className="mt-auto pt-2 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-extrabold text-foreground">${priceNum.toFixed(2)}</span>
            {compareNum && compareNum > priceNum && (
              <span className="text-xs text-muted-foreground line-through">
                ${compareNum.toFixed(2)}
              </span>
            )}
          </div>
          <span className="text-[10px] text-muted-foreground">Saved recently</span>
        </div>
      </div>
    </div>
  );
}
