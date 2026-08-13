"use client";

import { useState } from "react";
import { ShoppingBag, Heart, BadgeCheck, Zap, Star, Truck, RefreshCw, ShieldCheck } from "lucide-react";
import { BrandButton } from "@/components/shared/BrandButton";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

interface Variant { id: string; name: string; price: string; stock: number; sku: string; }

interface ProductDetailsProps {
  product: {
    id: string; name: string; description: string | null;
    price: string; compareAtPrice: string | null; isFeatured: boolean;
    categoryName?: string | null; brandName?: string | null;
  };
  variants: Variant[];
}

const TRUST = [
  { icon: Truck, label: "Free shipping $100+" },
  { icon: ShieldCheck, label: "Secure checkout" },
  { icon: RefreshCw, label: "30-day returns" },
];

export function ProductDetails({ product, variants }: ProductDetailsProps) {
  const { addItem } = useCart();
  const [selected, setSelected] = useState<Variant | null>(variants[0] ?? null);
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [adding, setAdding] = useState(false);

  const price = selected ? parseFloat(selected.price) : parseFloat(product.price);
  const compareAt = product.compareAtPrice ? parseFloat(product.compareAtPrice) : null;
  const discount = compareAt && compareAt > price ? Math.round(((compareAt - price) / compareAt) * 100) : null;
  const inStock = selected ? selected.stock > 0 : true;

  const handleAdd = () => {
    if (!inStock || adding) return;
    setAdding(true);
    addItem({ id: selected?.id ?? product.id, productId: product.id, name: product.name, price, image: undefined, quantity: qty });
    toast.success("Added to cart", { description: product.name });
    setTimeout(() => setAdding(false), 600);
  };

  return (
    <div className="space-y-6">
      {/* Category + badges */}
      <div className="flex items-center gap-2 flex-wrap">
        {product.categoryName && (
          <span className="text-xs font-bold uppercase tracking-wider text-accent">{product.categoryName}</span>
        )}
        {product.brandName && (
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground font-medium">
            <BadgeCheck className="w-3.5 h-3.5 text-flow-cyan" />{product.brandName}
          </span>
        )}
        {product.isFeatured && (
          <span className="inline-flex items-center gap-1 bg-flow-gradient text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            <Zap className="w-2.5 h-2.5" />Featured
          </span>
        )}
      </div>

      <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground leading-tight">{product.name}</h1>

      {/* Rating placeholder */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-0.5" aria-label="4 out of 5 stars">
          {[1,2,3,4,5].map((s) => (
            <Star key={s} className={`w-4 h-4 ${s <= 4 ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"}`} />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">(24 reviews)</span>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-extrabold text-foreground">${price.toFixed(2)}</span>
        {compareAt && compareAt > price && (
          <span className="text-lg text-muted-foreground line-through">${compareAt.toFixed(2)}</span>
        )}
        {discount && (
          <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-xs font-bold">-{discount}%</span>
        )}
      </div>

      {product.description && (
        <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
      )}

      {/* Variants */}
      {variants.length > 1 && (
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Variant</p>
          <div className="flex flex-wrap gap-2">
            {variants.map((v) => (
              <button key={v.id} type="button" onClick={() => setSelected(v)}
                aria-pressed={selected?.id === v.id}
                disabled={v.stock === 0}
                className={`px-3 py-1.5 rounded-xl border text-sm font-semibold transition-all ${
                  selected?.id === v.id
                    ? "border-accent bg-accent/10 text-accent"
                    : v.stock === 0
                    ? "border-border text-muted-foreground/50 line-through cursor-not-allowed"
                    : "border-border text-foreground hover:border-accent/50"
                }`}>
                {v.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Qty + CTA */}
      <div className="flex items-center gap-3">
        <div className="flex items-center border border-border rounded-xl overflow-hidden">
          <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="w-9 h-11 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors text-lg font-bold">−</button>
          <span className="w-10 text-center text-sm font-bold">{qty}</span>
          <button type="button" onClick={() => setQty((q) => q + 1)}
            className="w-9 h-11 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors text-lg font-bold">+</button>
        </div>

        <BrandButton variant="flow" size="md" onClick={handleAdd} disabled={!inStock || adding}
          className="flex-1 gap-2">
          <ShoppingBag className={`w-4 h-4 ${adding ? "animate-bounce" : ""}`} />
          {!inStock ? "Out of Stock" : adding ? "Adding…" : "Add to Cart"}
        </BrandButton>

        <button type="button" onClick={() => setWishlisted((w) => !w)} aria-pressed={wishlisted}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="w-11 h-11 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-red-500 hover:border-red-200 transition-colors">
          <Heart className={`w-5 h-5 ${wishlisted ? "fill-red-500 text-red-500" : ""}`} />
        </button>
      </div>

      {/* Trust badges */}
      <div className="flex flex-wrap gap-4 pt-2 border-t border-border">
        {TRUST.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Icon className="w-3.5 h-3.5 text-accent shrink-0" />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
