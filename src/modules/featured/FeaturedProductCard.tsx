"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Heart, Star, Eye, Zap, Award, Check } from "lucide-react";
import type { CatalogProduct } from "@/lib/catalog";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const COLOR_SWATCHES = [
  { name: "Matte Black", colorClass: "bg-neutral-900" },
  { name: "Flow Cyan", colorClass: "bg-cyan-500" },
  { name: "Silver Metallic", colorClass: "bg-slate-300" },
];

interface FeaturedProductCardProps {
  product: CatalogProduct;
  badgeTag?: string;
  ratingScore?: number;
  reviewCount?: number;
  onQuickView?: (product: CatalogProduct) => void;
}

export function FeaturedProductCard({
  product,
  badgeTag = "Featured Pick",
  ratingScore = 4.9,
  reviewCount = 64,
  onQuickView,
}: FeaturedProductCardProps) {
  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState(COLOR_SWATCHES[0].name);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const priceNum = parseFloat(product.price);
  const compareNum = product.compareAtPrice ? parseFloat(product.compareAtPrice) : null;
  const productUrl = `/products/${product.slug}`;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAdding) return;

    setIsAdding(true);
    addItem({
      id: product.id,
      productId: product.id,
      name: `${product.name} (${selectedColor})`,
      price: priceNum,
      image: product.primaryImage ?? undefined,
      quantity: 1,
    });

    toast.success("Added to cart!", {
      description: `${product.name} (${selectedColor})`,
    });

    setTimeout(() => setIsAdding(false), 500);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted((prev) => !prev);
    toast(isWishlisted ? "Removed from wishlist" : "Added to wishlist", {
      description: product.name,
    });
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) onQuickView(product);
  };

  return (
    <div className="group relative flex flex-col rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-flow-cyan/40">
      {/* Clickable link area */}
      <Link
        href={productUrl}
        className="absolute inset-0 z-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flow-cyan"
        aria-label={`View details for ${product.name}`}
      />

      {/* Image Spotlight Section */}
      <div className="relative aspect-square overflow-hidden bg-muted/40 z-10">
        {product.primaryImage ? (
          <Image
            src={product.primaryImage}
            alt={product.primaryImageAlt ?? product.name}
            fill
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground/40">
            <ShoppingBag className="w-12 h-12 stroke-1" />
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-20 pointer-events-none">
          <span className="inline-flex items-center gap-1 bg-market-navy-dark/90 backdrop-blur-md text-flow-cyan-light text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-flow-cyan/30 shadow-xs uppercase tracking-wider">
            <Award className="w-3 h-3 text-flow-cyan" />
            {badgeTag}
          </span>
          {compareNum && compareNum > priceNum && (
            <span className="inline-flex items-center bg-red-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs">
              Save ${(compareNum - priceNum).toFixed(0)}
            </span>
          )}
        </div>

        {/* Action Buttons (Wishlist & Quick View) */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-10 group-hover:translate-x-0 transition-transform duration-300 z-20">
          <button
            type="button"
            onClick={handleWishlist}
            aria-pressed={isWishlisted}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className="w-8 h-8 rounded-xl bg-background/90 backdrop-blur-md border border-border flex items-center justify-center text-muted-foreground hover:text-red-500 hover:border-red-200 transition-colors shadow-xs cursor-pointer"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
          </button>
          <button
            type="button"
            onClick={handleQuickViewClick}
            aria-label={`Quick view ${product.name}`}
            className="w-8 h-8 rounded-xl bg-background/90 backdrop-blur-md border border-border flex items-center justify-center text-muted-foreground hover:text-flow-cyan hover:border-flow-cyan/40 transition-colors shadow-xs cursor-pointer"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Hover Quick Add to Cart Bar */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isAdding}
            aria-label={`Add ${product.name} to cart`}
            className="w-full h-11 bg-market-navy/95 backdrop-blur-md text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-flow-cyan transition-colors shadow-lg cursor-pointer disabled:opacity-60"
          >
            <ShoppingBag className={`w-4 h-4 ${isAdding ? "animate-bounce" : ""}`} />
            {isAdding ? "Adding to Cart..." : "Quick Add to Cart"}
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div className="flex flex-col flex-1 p-4 gap-2.5 z-10 pointer-events-none">
        {/* Category & Swatches Row */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-flow-cyan">
            {product.categoryName ?? "Spotlight"}
          </span>

          {/* Color swatches */}
          <div className="flex items-center gap-1.5 pointer-events-auto">
            {COLOR_SWATCHES.map((swatch) => (
              <button
                key={swatch.name}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedColor(swatch.name);
                }}
                aria-label={`Select ${swatch.name}`}
                className={`w-3.5 h-3.5 rounded-full ${swatch.colorClass} border border-border transition-transform cursor-pointer ${
                  selectedColor === swatch.name ? "ring-2 ring-flow-cyan ring-offset-1 scale-110" : "opacity-75 hover:opacity-100"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-sm text-foreground line-clamp-2 leading-snug group-hover:text-flow-cyan transition-colors">
          {product.name}
        </h3>

        {/* Rating Stars */}
        <div className="flex items-center gap-1 text-xs">
          <div className="flex items-center gap-0.5 text-amber-400">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-3 h-3 fill-amber-400" />
            ))}
          </div>
          <span className="font-bold text-foreground text-xs ml-1">{ratingScore}</span>
          <span className="text-muted-foreground text-[11px]">({reviewCount})</span>
        </div>

        {/* Price & Stock Row */}
        <div className="mt-auto pt-1 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-extrabold text-foreground">
              ${priceNum.toFixed(2)}
            </span>
            {compareNum && compareNum > priceNum && (
              <span className="text-xs text-muted-foreground line-through">
                ${compareNum.toFixed(2)}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md">
            In Stock
          </span>
        </div>
      </div>
    </div>
  );
}
