"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ShoppingBag, Star, Check, ShieldCheck, Truck, Zap } from "lucide-react";
import type { CatalogProduct } from "@/lib/catalog";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { BrandButton } from "@/components/shared/BrandButton";

interface FeaturedQuickViewModalProps {
  product: CatalogProduct | null;
  onClose: () => void;
}

const COLOR_OPTIONS = [
  { name: "Matte Black", bg: "bg-neutral-900 border-neutral-700" },
  { name: "Flow Cyan", bg: "bg-cyan-500 border-cyan-400" },
  { name: "Silver Metallic", bg: "bg-slate-300 border-slate-200" },
  { name: "Deep Navy", bg: "bg-indigo-950 border-indigo-800" },
];

const STORAGE_OPTIONS = ["128GB", "256GB", "512GB", "1TB"];

export function FeaturedQuickViewModal({ product, onClose }: FeaturedQuickViewModalProps) {
  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0].name);
  const [selectedStorage, setSelectedStorage] = useState(STORAGE_OPTIONS[1]);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  if (!product) return null;

  const priceNum = parseFloat(product.price);
  const compareNum = product.compareAtPrice ? parseFloat(product.compareAtPrice) : priceNum * 1.2;

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem({
      id: `${product.id}-${selectedColor}-${selectedStorage}`,
      productId: product.id,
      name: `${product.name} (${selectedColor}, ${selectedStorage})`,
      price: priceNum,
      image: product.primaryImage ?? undefined,
      quantity,
    });

    toast.success("Added to Cart!", {
      description: `${product.name} — ${selectedColor} / ${selectedStorage}`,
    });

    setTimeout(() => {
      setIsAdding(false);
      onClose();
    }, 400);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quickview-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      <div
        className="relative w-full max-w-3xl bg-card border border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close quick view modal"
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-background/80 hover:bg-background text-foreground/80 hover:text-foreground border border-border shadow-xs transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Image View */}
        <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto bg-muted/40 flex items-center justify-center p-6 shrink-0">
          {product.primaryImage ? (
            <Image
              src={product.primaryImage}
              alt={product.primaryImageAlt ?? product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <ShoppingBag className="w-16 h-16 stroke-1" />
              <span className="text-xs">No image available</span>
            </div>
          )}

          <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
            <span className="inline-flex items-center gap-1 bg-flow-gradient text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
              <Zap className="w-3.5 h-3.5 fill-white" />
              Featured Selection
            </span>
          </div>
        </div>

        {/* Right Product Options & Details */}
        <div className="flex-1 p-6 md:p-8 flex flex-col space-y-5">
          {/* Header info */}
          <div className="space-y-1">
            <span className="text-xs font-extrabold uppercase tracking-wider text-flow-cyan">
              {product.categoryName ?? "Spotlight"}
            </span>
            <h2 id="quickview-title" className="text-xl sm:text-2xl font-bold text-foreground">
              {product.name}
            </h2>

            {/* Ratings */}
            <div className="flex items-center gap-2 pt-1">
              <div className="flex items-center gap-0.5 text-amber-400">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-foreground">4.9</span>
              <span className="text-xs text-muted-foreground">(128 reviews)</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3 border-y border-border/60 py-3">
            <span className="text-2xl font-extrabold text-foreground">${priceNum.toFixed(2)}</span>
            {compareNum > priceNum && (
              <span className="text-sm text-muted-foreground line-through">
                ${compareNum.toFixed(2)}
              </span>
            )}
            <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md">
              In Stock & Ready to Ship
            </span>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3">
            {product.description ??
              "Premium engineered design built for maximum power, seamless connectivity, and unmatched daily reliability."}
          </p>

          {/* Color Selection */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-foreground">
              Finish: <span className="font-normal text-muted-foreground">{selectedColor}</span>
            </span>
            <div className="flex items-center gap-2">
              {COLOR_OPTIONS.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setSelectedColor(color.name)}
                  aria-label={`Select ${color.name} finish`}
                  className={`w-7 h-7 rounded-full ${color.bg} border-2 flex items-center justify-center transition-all cursor-pointer ${
                    selectedColor === color.name
                      ? "ring-2 ring-flow-cyan ring-offset-2 ring-offset-background scale-110"
                      : "opacity-80 hover:opacity-100"
                  }`}
                >
                  {selectedColor === color.name && <Check className="w-3.5 h-3.5 text-white" />}
                </button>
              ))}
            </div>
          </div>

          {/* Storage / Size Selection */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-foreground">
              Capacity: <span className="font-normal text-muted-foreground">{selectedStorage}</span>
            </span>
            <div className="grid grid-cols-4 gap-2">
              {STORAGE_OPTIONS.map((storage) => (
                <button
                  key={storage}
                  type="button"
                  onClick={() => setSelectedStorage(storage)}
                  className={`py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    selectedStorage === storage
                      ? "border-flow-cyan bg-flow-cyan/10 text-flow-cyan"
                      : "border-border bg-muted/40 text-muted-foreground hover:border-foreground/30"
                  }`}
                >
                  {storage}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="pt-2 flex items-center gap-3">
            {/* Quantity Selector */}
            <div className="flex items-center rounded-xl border border-border bg-muted/30">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="w-9 h-10 flex items-center justify-center text-sm font-bold hover:bg-muted transition-colors"
              >
                -
              </button>
              <span className="w-9 text-center text-xs font-bold">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="w-9 h-10 flex items-center justify-center text-sm font-bold hover:bg-muted transition-colors"
              >
                +
              </button>
            </div>

            {/* Submit CTA */}
            <BrandButton
              type="button"
              onClick={handleAddToCart}
              disabled={isAdding}
              variant="flow"
              size="md"
              fullWidth
              className="shadow-glow-cyan"
            >
              <ShoppingBag className={`w-4 h-4 ${isAdding ? "animate-bounce" : ""}`} />
              <span>{isAdding ? "Adding..." : "Add to Cart"}</span>
            </BrandButton>
          </div>

          {/* Guarantee Badges */}
          <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1 border-t border-border/60">
            <span className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-flow-cyan" />
              Free Express Shipping
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              2-Year Warranty
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
