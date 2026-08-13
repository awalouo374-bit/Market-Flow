"use client";

import { useState } from "react";
import Link from "next/link";
import { LayoutGrid, List, ShoppingBag, Share2, Trash2, Heart, ArrowRight } from "lucide-react";
import type { CatalogProduct } from "@/lib/catalog";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { BrandButton } from "@/components/shared/BrandButton";
import { WishlistCard, type WishlistItem } from "./WishlistCard";
import { WishlistEmptyState } from "./WishlistEmptyState";
import { WishlistShareModal } from "./WishlistShareModal";

interface WishlistDashboardProps {
  initialItems: CatalogProduct[];
  recommendations: CatalogProduct[];
}

export function WishlistDashboard({ initialItems, recommendations }: WishlistDashboardProps) {
  const { addItem } = useCart();
  const [items, setItems] = useState<WishlistItem[]>(() =>
    initialItems.map((p, idx) => ({
      ...p,
      // Inject smart alerts for demo dashboard experience
      priceDropAmount: idx === 0 ? 50 : idx === 2 ? 20 : undefined,
      isBackInStock: idx === 1,
      lowStockCount: idx === 0 ? 2 : undefined,
    }))
  );

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isMovingAll, setIsMovingAll] = useState(false);

  // Optimistic Item Removal with Undo Stack
  const handleRemove = (id: string) => {
    const itemToRemove = items.find((i) => i.id === id);
    if (!itemToRemove) return;

    // Optimistic state update
    setItems((prev) => prev.filter((i) => i.id !== id));

    // Toast with Undo callback
    toast("Item removed from Wishlist", {
      description: itemToRemove.name,
      action: {
        label: "Undo",
        onClick: () => {
          setItems((prev) => [...prev, itemToRemove]);
          toast.success("Restored to Wishlist", { description: itemToRemove.name });
        },
      },
    });
  };

  // Move All Items to Cart
  const handleMoveAllToCart = () => {
    if (items.length === 0 || isMovingAll) return;

    setIsMovingAll(true);
    let addedCount = 0;

    for (const item of items) {
      const priceNum = parseFloat(item.price);
      addItem({
        id: item.id,
        productId: item.id,
        name: item.name,
        price: priceNum,
        image: item.primaryImage ?? undefined,
        quantity: 1,
      });
      addedCount++;
    }

    toast.success(`Moved ${addedCount} item${addedCount === 1 ? "" : "s"} to Cart!`);

    setTimeout(() => {
      setIsMovingAll(false);
    }, 600);
  };

  // Clear Entire Wishlist
  const handleClearAll = () => {
    if (items.length === 0) return;
    const backup = [...items];
    setItems([]);

    toast("Wishlist cleared", {
      action: {
        label: "Undo",
        onClick: () => {
          setItems(backup);
          toast.success("Wishlist restored!");
        },
      },
    });
  };

  // Summary calculations
  const totalValue = items.reduce((acc, i) => acc + parseFloat(i.price), 0);

  if (items.length === 0) {
    return <WishlistEmptyState recommendations={recommendations} />;
  }

  return (
    <div className="space-y-8">
      {/* Dashboard Top Header Control Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl border border-border bg-card shadow-xs">
        
        {/* Left Info: Saved Count & Estimated Value */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-foreground">
              My Saved Wishlist ({items.length})
            </h1>
          </div>
          <p className="text-xs text-muted-foreground">
            Total Estimated Value: <strong className="text-foreground font-bold">${totalValue.toFixed(2)}</strong>
          </p>
        </div>

        {/* Right Bulk Action Buttons & Layout Toggle */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Share Link */}
          <button
            type="button"
            onClick={() => setIsShareModalOpen(true)}
            className="h-11 px-4 rounded-xl border border-border bg-background text-xs font-bold text-foreground flex items-center gap-2 hover:border-flow-cyan/40 hover:text-flow-cyan transition-colors cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>

          {/* Clear All */}
          <button
            type="button"
            onClick={handleClearAll}
            className="h-11 px-3.5 rounded-xl border border-border bg-background text-xs font-semibold text-muted-foreground flex items-center gap-1.5 hover:text-red-500 hover:border-red-200 transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Clear All</span>
          </button>

          {/* Primary CTA: Move All to Cart */}
          <BrandButton
            type="button"
            onClick={handleMoveAllToCart}
            disabled={isMovingAll}
            variant="flow"
            size="md"
            className="shadow-glow-cyan gap-2"
          >
            <ShoppingBag className={`w-4 h-4 ${isMovingAll ? "animate-bounce" : ""}`} />
            <span>{isMovingAll ? "Moving..." : "Move All to Cart"}</span>
          </BrandButton>

          {/* View Mode Toggle */}
          <div className="hidden sm:flex items-center rounded-xl border border-border bg-muted/40 p-1 ml-1">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                viewMode === "grid" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              aria-label="List view"
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                viewMode === "list" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Grid or List Display of Saved Wishlist Items */}
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            : "flex flex-col gap-4"
        }
      >
        {items.map((item) => (
          <WishlistCard
            key={item.id}
            item={item}
            variant={viewMode}
            onRemove={handleRemove}
          />
        ))}
      </div>

      {/* Public Share Modal */}
      <WishlistShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        itemCount={items.length}
      />
    </div>
  );
}
