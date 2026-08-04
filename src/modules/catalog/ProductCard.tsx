"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag, Heart, Star, Eye, BadgeCheck, Zap } from "lucide-react";
import type { CatalogProduct } from "@/lib/catalog";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

interface ProductCardProps {
  product: CatalogProduct;
  variant?: "grid" | "list";
}

function ProductBadges({ product }: { product: CatalogProduct }) {
  const discountPercent =
    product.compareAtPrice && parseFloat(product.compareAtPrice) > parseFloat(product.price)
      ? Math.round(((parseFloat(product.compareAtPrice) - parseFloat(product.price)) / parseFloat(product.compareAtPrice)) * 100)
      : null;
  const isOutOfStock = product.totalStock === 0;
  const isLowStock   = product.totalStock > 0 && product.totalStock <= 5;
  return (
    <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
      {product.isFeatured && (
        <span className="inline-flex items-center gap-1 bg-flow-gradient text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
          <Zap className="w-2.5 h-2.5" />Featured
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
      {isLowStock && (
        <span className="inline-flex items-center bg-amber-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
          Only {product.totalStock} left
        </span>
      )}
    </div>
  );
}

function StarRating() {
  return (
    <div className="flex items-center gap-1" aria-label="4 out of 5 stars">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} className={`w-3 h-3 ${s <= 4 ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"}`} />
      ))}
      <span className="text-[10px] text-muted-foreground ml-0.5">(24)</span>
    </div>
  );
}

function PriceRow({ product }: { product: CatalogProduct }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="text-lg font-bold text-foreground">${parseFloat(product.price).toFixed(2)}</span>
      {product.compareAtPrice && parseFloat(product.compareAtPrice) > parseFloat(product.price) && (
        <span className="text-sm text-muted-foreground line-through">
          ${parseFloat(product.compareAtPrice).toFixed(2)}
        </span>
      )}
    </div>
  );
}

export function ProductCard({ product, variant = "grid" }: ProductCardProps) {
  const { addItem } = useCart();
  const router = useRouter();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const isOutOfStock = product.totalStock === 0;
  const productUrl = `/products/${product.slug}`;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock || isAddingToCart) return;
    setIsAddingToCart(true);
    addItem({ id: product.id, productId: product.id, name: product.name, price: parseFloat(product.price), image: product.primaryImage ?? undefined, quantity: 1 });
    toast.success("Added to cart", { description: product.name });
    setTimeout(() => setIsAddingToCart(false), 600);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted((p) => !p);
    toast(isWishlisted ? "Removed from wishlist" : "Added to wishlist", { description: product.name });
  };

  // ── List variant — uses a div wrapper so buttons are never nested in <a> ──
  if (variant === "list") {
    return (
      <div className="group relative flex items-center gap-4 p-4 rounded-2xl border border-border bg-card hover:border-accent/30 hover:shadow-md transition-all duration-300">
        {/* Full-card click area behind everything */}
        <Link href={productUrl} className="absolute inset-0 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flow-cyan" aria-label={`View ${product.name}`} tabIndex={0} />

        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-muted/40 shrink-0 z-10">
          {product.primaryImage
            ? <Image src={product.primaryImage} alt={product.primaryImageAlt ?? product.name} fill sizes="112px" className="object-cover group-hover:scale-105 transition-transform duration-500" />
            : <div className="w-full h-full flex items-center justify-center text-muted-foreground/40"><ShoppingBag className="w-8 h-8 stroke-1" /></div>}
          <ProductBadges product={product} />
        </div>

        <div className="relative z-10 flex-1 min-w-0 space-y-1.5 pointer-events-none">
          <div className="flex items-center gap-2">
            {product.categoryName && <span className="text-[10px] font-bold uppercase tracking-wider text-accent">{product.categoryName}</span>}
            {product.brandName && <span className="inline-flex items-center gap-0.5 text-[10px] text-muted-foreground"><BadgeCheck className="w-3 h-3 text-flow-cyan" />{product.brandName}</span>}
          </div>
          <h3 className="font-semibold text-sm text-foreground line-clamp-2 leading-snug group-hover:text-accent transition-colors">{product.name}</h3>
          <StarRating />
          {product.description && <p className="text-xs text-muted-foreground line-clamp-2 hidden sm:block">{product.description}</p>}
          <PriceRow product={product} />
        </div>

        <div className="relative z-10 shrink-0 flex flex-col gap-2">
          <button type="button" onClick={handleAddToCart} disabled={isOutOfStock || isAddingToCart}
            aria-label={`Add ${product.name} to cart`}
            className="h-9 px-4 rounded-xl bg-market-navy text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-flow-cyan transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            <ShoppingBag className={`w-3.5 h-3.5 ${isAddingToCart ? "animate-bounce" : ""}`} />
            <span className="hidden sm:inline">{isOutOfStock ? "Sold Out" : isAddingToCart ? "Adding…" : "Add to Cart"}</span>
          </button>
          <button type="button" onClick={handleWishlist} aria-pressed={isWishlisted}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className="h-9 px-4 rounded-xl border border-border text-xs font-semibold flex items-center justify-center gap-1.5 text-muted-foreground hover:text-red-500 hover:border-red-200 transition-colors">
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
          </button>
        </div>
      </div>
    );
  }

  // ── Grid variant — outer Link, action buttons only (no nested <a>) ──
  return (
    <Link href={productUrl}
      className="group relative flex flex-col rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-accent/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flow-cyan"
      aria-label={`View ${product.name}`}>
      <div className="relative aspect-square overflow-hidden bg-muted/40">
        {product.primaryImage
          ? <Image src={product.primaryImage} alt={product.primaryImageAlt ?? product.name} fill sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw,25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
          : <div className="w-full h-full flex items-center justify-center text-muted-foreground/40"><ShoppingBag className="w-12 h-12 stroke-1" /></div>}
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <ProductBadges product={product} />

        {/* Action buttons — all <button>, no nested <a> */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-10 group-hover:translate-x-0 transition-transform duration-300">
          <button type="button" onClick={handleWishlist} aria-pressed={isWishlisted}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className="w-8 h-8 rounded-lg bg-background/90 backdrop-blur-sm border border-border/60 flex items-center justify-center text-muted-foreground hover:text-red-500 hover:border-red-200 transition-colors shadow-sm">
            <Heart className={`w-4 h-4 transition-all duration-200 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
          </button>
          <button type="button"
            onClick={(e) => { e.preventDefault(); router.push(productUrl); }}
            aria-label={`Quick view ${product.name}`}
            className="w-8 h-8 rounded-lg bg-background/90 backdrop-blur-sm border border-border/60 flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/40 transition-colors shadow-sm">
            <Eye className="w-4 h-4" />
          </button>
        </div>

        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button type="button" onClick={handleAddToCart} disabled={isOutOfStock || isAddingToCart}
            aria-label={`Add ${product.name} to cart`}
            className="w-full h-11 bg-market-navy/95 backdrop-blur-sm text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-flow-cyan transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
            <ShoppingBag className={`w-4 h-4 ${isAddingToCart ? "animate-bounce" : ""}`} />
            {isOutOfStock ? "Out of Stock" : isAddingToCart ? "Adding…" : "Add to Cart"}
          </button>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-4 gap-2">
        <div className="flex items-center justify-between">
          {product.categoryName && <span className="text-[10px] font-bold uppercase tracking-wider text-accent">{product.categoryName}</span>}
          {product.brandName && <span className="inline-flex items-center gap-0.5 text-[10px] text-muted-foreground"><BadgeCheck className="w-3 h-3 text-flow-cyan" />{product.brandName}</span>}
        </div>
        <h3 className="font-semibold text-sm text-foreground line-clamp-2 leading-snug group-hover:text-accent transition-colors">{product.name}</h3>
        <StarRating />
        <div className="mt-auto pt-1"><PriceRow product={product} /></div>
      </div>
    </Link>
  );
}
