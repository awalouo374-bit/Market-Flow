"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag, Heart, Star, Eye, BadgeCheck, Zap } from "lucide-react";
import type { CatalogProduct } from "@/lib/catalog";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

interface ProductCardProps {
  product: CatalogProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const router = useRouter();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const discountPercent =
    product.compareAtPrice && parseFloat(product.compareAtPrice) > parseFloat(product.price)
      ? Math.round(
          ((parseFloat(product.compareAtPrice) - parseFloat(product.price)) /
            parseFloat(product.compareAtPrice)) *
            100
        )
      : null;

  const isOutOfStock = product.totalStock === 0;
  const isLowStock = product.totalStock > 0 && product.totalStock <= 5;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isOutOfStock || isAddingToCart) return;

    setIsAddingToCart(true);
    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: parseFloat(product.price),
      image: product.primaryImage ?? undefined,
      quantity: 1,
    });
    toast.success("Added to cart", {
      description: product.name,
    });
    setTimeout(() => setIsAddingToCart(false), 600);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted((prev) => !prev);
    toast(isWishlisted ? "Removed from wishlist" : "Added to wishlist", {
      description: product.name,
    });
  };

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex flex-col rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-accent/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flow-cyan"
      aria-label={`View ${product.name}`}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted/40">
        {product.primaryImage ? (
          <Image
            src={product.primaryImage}
            alt={product.primaryImageAlt ?? product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground/40">
            <ShoppingBag className="w-12 h-12 stroke-1" />
          </div>
        )}

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges — top-left */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isFeatured && (
            <span className="inline-flex items-center gap-1 bg-flow-gradient text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
              <Zap className="w-2.5 h-2.5" />
              Featured
            </span>
          )}
          {discountPercent && (
            <span className="inline-flex items-center bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
              -{discountPercent}%
            </span>
          )}
          {isOutOfStock && (
            <span className="inline-flex items-center bg-muted text-muted-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
              Out of Stock
            </span>
          )}
          {isLowStock && !isOutOfStock && (
            <span className="inline-flex items-center bg-amber-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
              Only {product.totalStock} left
            </span>
          )}
        </div>

        {/* Action buttons — top-right */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-10 group-hover:translate-x-0 transition-transform duration-300">
          <button
            type="button"
            onClick={handleWishlist}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={isWishlisted}
            className="w-8 h-8 rounded-lg bg-background/90 backdrop-blur-sm border border-border/60 flex items-center justify-center text-muted-foreground hover:text-red-500 hover:border-red-200 transition-colors shadow-sm"
          >
            <Heart
              className={`w-4 h-4 transition-all duration-200 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`}
            />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              router.push(`/products/${product.slug}`);
            }}
            aria-label={`Quick view ${product.name}`}
            className="w-8 h-8 rounded-lg bg-background/90 backdrop-blur-sm border border-border/60 flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/40 transition-colors shadow-sm"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Add to cart — bottom overlay on hover */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isOutOfStock || isAddingToCart}
            aria-label={`Add ${product.name} to cart`}
            className="w-full h-11 bg-market-navy/95 backdrop-blur-sm text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-flow-cyan transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <ShoppingBag className={`w-4 h-4 ${isAddingToCart ? "animate-bounce" : ""}`} />
            {isOutOfStock ? "Out of Stock" : isAddingToCart ? "Adding…" : "Add to Cart"}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        {/* Category & Brand */}
        <div className="flex items-center justify-between">
          {product.categoryName && (
            <span className="text-[10px] font-semibold uppercase tracking-wider text-accent">
              {product.categoryName}
            </span>
          )}
          {product.brandName && (
            <span className="inline-flex items-center gap-0.5 text-[10px] text-muted-foreground font-medium">
              <BadgeCheck className="w-3 h-3 text-flow-cyan" />
              {product.brandName}
            </span>
          )}
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-sm text-foreground line-clamp-2 leading-snug group-hover:text-accent transition-colors">
          {product.name}
        </h3>

        {/* Star Rating placeholder */}
        <div className="flex items-center gap-1" aria-label="4.5 out of 5 stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-3 h-3 ${star <= 4 ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"}`}
            />
          ))}
          <span className="text-[10px] text-muted-foreground ml-0.5">(24)</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-auto pt-1">
          <span className="text-lg font-bold text-foreground">
            ${parseFloat(product.price).toFixed(2)}
          </span>
          {product.compareAtPrice &&
            parseFloat(product.compareAtPrice) > parseFloat(product.price) && (
              <span className="text-sm text-muted-foreground line-through">
                ${parseFloat(product.compareAtPrice).toFixed(2)}
              </span>
            )}
        </div>
      </div>
    </Link>
  );
}
