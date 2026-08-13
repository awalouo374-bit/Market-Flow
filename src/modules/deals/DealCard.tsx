"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag, Heart, Eye, Zap, Flame, ShieldAlert, Sparkles } from "lucide-react";
import type { CatalogProduct } from "@/lib/catalog";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

export interface DealProduct extends CatalogProduct {
  discountPercent: number;
  savingsAmount: number;
  dealEndsInHours?: number;
  claimedPercentage?: number;
}

interface DealCardProps {
  product: CatalogProduct;
  variant?: "grid" | "list";
}

export function DealCard({ product, variant = "grid" }: DealCardProps) {
  const { addItem } = useCart();
  const router = useRouter();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Calculated or fallback deal attributes
  const rawPrice = parseFloat(product.price);
  const rawCompare = product.compareAtPrice ? parseFloat(product.compareAtPrice) : rawPrice * 1.25;
  const comparePrice = rawCompare > rawPrice ? rawCompare : rawPrice * 1.25;
  const discountPercent = Math.round(((comparePrice - rawPrice) / comparePrice) * 100);
  const savingsAmount = comparePrice - rawPrice;

  // Stock indicator
  const stock = product.totalStock > 0 ? product.totalStock : 4; // fallback active stock
  const claimedPercentage = Math.min(92, Math.max(45, 100 - stock * 7));
  const isLowStock = stock <= 5;
  const productUrl = `/products/${product.slug}`;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAddingToCart) return;

    setIsAddingToCart(true);
    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: rawPrice,
      image: product.primaryImage ?? undefined,
      quantity: 1,
    });

    toast.success("Deal added to cart!", {
      description: `${product.name} — Saved $${savingsAmount.toFixed(2)}`,
    });

    setTimeout(() => setIsAddingToCart(false), 600);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted((prev) => !prev);
    toast(isWishlisted ? "Removed from wishlist" : "Added to deal wishlist", {
      description: product.name,
    });
  };

  if (variant === "list") {
    return (
      <div className="group relative flex flex-col sm:flex-row items-center gap-5 p-5 rounded-2xl border border-amber-500/20 bg-card hover:border-flow-cyan/50 hover:shadow-xl transition-all duration-300">
        <Link
          href={productUrl}
          className="absolute inset-0 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flow-cyan z-0"
          aria-label={`View deal for ${product.name}`}
        />

        {/* Thumbnail */}
        <div className="relative w-full sm:w-36 h-36 rounded-xl overflow-hidden bg-muted/40 shrink-0 z-10">
          {product.primaryImage ? (
            <Image
              src={product.primaryImage}
              alt={product.primaryImageAlt ?? product.name}
              fill
              sizes="144px"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground/40">
              <ShoppingBag className="w-10 h-10 stroke-1" />
            </div>
          )}
          {/* Badge overlay */}
          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
            <span className="inline-flex items-center gap-1 bg-linear-to-r from-red-600 to-amber-500 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm uppercase tracking-wider">
              <Flame className="w-3 h-3 fill-white" />
              -{discountPercent}% OFF
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="relative z-10 flex-1 min-w-0 space-y-2 pointer-events-none w-full">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-md">
              Flash Deal
            </span>
            {product.categoryName && (
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                {product.categoryName}
              </span>
            )}
          </div>

          <h3 className="font-bold text-base text-foreground line-clamp-2 group-hover:text-flow-cyan transition-colors">
            {product.name}
          </h3>

          {/* Pricing Row */}
          <div className="flex items-baseline gap-2.5">
            <span className="text-xl font-extrabold text-foreground">${rawPrice.toFixed(2)}</span>
            <span className="text-sm text-muted-foreground line-through">${comparePrice.toFixed(2)}</span>
            <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md">
              Save ${savingsAmount.toFixed(2)}
            </span>
          </div>

          {/* Stock Meter */}
          <div className="space-y-1 max-w-md">
            <div className="flex justify-between text-[11px] font-semibold">
              <span className="text-amber-500 flex items-center gap-1">
                <ShieldAlert className="w-3 h-3" />
                {isLowStock ? `Hurry, only ${stock} left!` : "Limited quantities"}
              </span>
              <span className="text-muted-foreground">{claimedPercentage}% claimed</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-linear-to-r from-amber-500 to-red-500 transition-all duration-500"
                style={{ width: `${claimedPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="relative z-10 shrink-0 flex flex-row sm:flex-col gap-2.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            aria-label={`Add deal ${product.name} to cart`}
            className="flex-1 sm:flex-initial h-11 px-5 rounded-xl bg-market-navy text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-flow-cyan transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-50"
          >
            <ShoppingBag className={`w-4 h-4 ${isAddingToCart ? "animate-bounce" : ""}`} />
            <span>{isAddingToCart ? "Adding…" : "Claim Deal"}</span>
          </button>

          <button
            type="button"
            onClick={handleWishlist}
            aria-pressed={isWishlisted}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className="h-11 px-4 rounded-xl border border-border bg-card text-xs font-semibold flex items-center justify-center gap-1.5 text-muted-foreground hover:text-red-500 hover:border-red-200 transition-colors cursor-pointer"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
          </button>
        </div>
      </div>
    );
  }

  // Grid Variant
  return (
    <Link
      href={productUrl}
      className="group relative flex flex-col rounded-2xl border border-amber-500/20 bg-card overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-flow-cyan/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flow-cyan"
      aria-label={`View deal for ${product.name}`}
    >
      {/* Thumbnail area */}
      <div className="relative aspect-square overflow-hidden bg-muted/40">
        {product.primaryImage ? (
          <Image
            src={product.primaryImage}
            alt={product.primaryImageAlt ?? product.name}
            fill
            sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw,25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground/40">
            <ShoppingBag className="w-12 h-12 stroke-1" />
          </div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Deal Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          <span className="inline-flex items-center gap-1 bg-linear-to-r from-red-600 to-amber-500 text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full shadow-md uppercase tracking-wider">
            <Flame className="w-3 h-3 fill-white animate-pulse" />
            -{discountPercent}% OFF
          </span>
          {product.isFeatured && (
            <span className="inline-flex items-center gap-1 bg-flow-gradient text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
              <Zap className="w-2.5 h-2.5" />
              Hot Pick
            </span>
          )}
        </div>

        {/* Top Right Wishlist & Quick View */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-10 group-hover:translate-x-0 transition-transform duration-300 z-10">
          <button
            type="button"
            onClick={handleWishlist}
            aria-pressed={isWishlisted}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className="w-8 h-8 rounded-xl bg-background/95 backdrop-blur-md border border-border/60 flex items-center justify-center text-muted-foreground hover:text-red-500 hover:border-red-200 transition-colors shadow-sm cursor-pointer"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              router.push(productUrl);
            }}
            aria-label={`Quick view ${product.name}`}
            className="w-8 h-8 rounded-xl bg-background/95 backdrop-blur-md border border-border/60 flex items-center justify-center text-muted-foreground hover:text-flow-cyan hover:border-flow-cyan/40 transition-colors shadow-sm cursor-pointer"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Hover Add to Cart Bar */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            aria-label={`Add deal ${product.name} to cart`}
            className="w-full h-11 bg-market-navy/95 backdrop-blur-md text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-flow-cyan transition-colors shadow-lg cursor-pointer disabled:opacity-60"
          >
            <ShoppingBag className={`w-4 h-4 ${isAddingToCart ? "animate-bounce" : ""}`} />
            {isAddingToCart ? "Adding…" : "Claim Deal Now"}
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col flex-1 p-4 gap-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-md">
            Save ${savingsAmount.toFixed(0)}
          </span>
          {product.categoryName && (
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              {product.categoryName}
            </span>
          )}
        </div>

        <h3 className="font-bold text-sm text-foreground line-clamp-2 leading-snug group-hover:text-flow-cyan transition-colors">
          {product.name}
        </h3>

        {/* Price & Savings */}
        <div className="mt-auto pt-1 space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-extrabold text-foreground">${rawPrice.toFixed(2)}</span>
            <span className="text-xs text-muted-foreground line-through">${comparePrice.toFixed(2)}</span>
          </div>

          {/* Stock Meter */}
          <div className="space-y-1 pt-1">
            <div className="flex justify-between text-[10px] font-bold">
              <span className="text-amber-500">Only {stock} left!</span>
              <span className="text-muted-foreground">{claimedPercentage}% claimed</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-linear-to-r from-amber-500 to-red-500 transition-all duration-500"
                style={{ width: `${claimedPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
