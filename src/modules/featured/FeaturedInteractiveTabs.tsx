"use client";

import { useState, useMemo } from "react";
import { Flame, Sparkles, Zap, Award, Search, RotateCcw } from "lucide-react";
import type { CatalogProduct } from "@/lib/catalog";
import { FeaturedProductCard } from "./FeaturedProductCard";
import { FeaturedQuickViewModal } from "./FeaturedQuickViewModal";

interface FeaturedInteractiveTabsProps {
  products: CatalogProduct[];
  onSelectSpotlight?: (product: CatalogProduct) => void;
}

type TabType = "trending" | "editors_picks" | "new_arrivals" | "staff_choices";

const TABS: { id: TabType; label: string; icon: React.ReactNode; badge: string }[] = [
  {
    id: "trending",
    label: "Trending Now",
    icon: <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />,
    badge: "Bestseller #1",
  },
  {
    id: "editors_picks",
    label: "Editor's Picks",
    icon: <Award className="w-4 h-4 text-flow-cyan" />,
    badge: "Editor's Pick",
  },
  {
    id: "new_arrivals",
    label: "New Arrivals",
    icon: <Sparkles className="w-4 h-4 text-purple-400" />,
    badge: "2026 Release",
  },
  {
    id: "staff_choices",
    label: "Staff Choices",
    icon: <Zap className="w-4 h-4 text-emerald-400" />,
    badge: "Staff Favorite",
  },
];

// Curated mock fallback items to guarantee rich presentation even if database is small
const CURATED_MOCK_FEATURED: CatalogProduct[] = [
  {
    id: "feat-1",
    name: "Aether Pro Phone X1 Ultra (256GB)",
    slug: "aether-pro-phone-x1",
    sku: "AETH-X1-PRO",
    description: "Flagship 2026 AI smartphone with 120Hz LTPO AMOLED display and 200MP camera system.",
    price: "999.00",
    compareAtPrice: "1199.00",
    isFeatured: true,
    status: "active",
    categoryId: "smartphones",
    brandId: "aether",
    categoryName: "Smartphones",
    brandName: "Aether Tech",
    primaryImage: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    primaryImageAlt: "Aether Pro Phone X1",
    lowestVariantPrice: "999.00",
    totalStock: 12,
    createdAt: new Date(),
  },
  {
    id: "feat-2",
    name: "Flow Wireless ANC Buds Pro Studio",
    slug: "flow-wireless-anc-buds",
    sku: "FLOW-ANC-PRO",
    description: "Hi-Res spatial audio earbuds with active noise cancellation up to 48dB.",
    price: "199.00",
    compareAtPrice: "249.00",
    isFeatured: true,
    status: "active",
    categoryId: "audio",
    brandId: "flow",
    categoryName: "Audio",
    brandName: "Flow Sound",
    primaryImage: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
    primaryImageAlt: "Flow Wireless ANC Buds Pro",
    lowestVariantPrice: "199.00",
    totalStock: 25,
    createdAt: new Date(),
  },
  {
    id: "feat-3",
    name: "Market UltraBook Pro 15 (M3 Chip, 32GB)",
    slug: "market-ultrabook-15",
    sku: "UB-15-M3",
    description: "Ultra-slim carbon fiber laptop with Liquid Retina display and 20-hour battery.",
    price: "1499.00",
    compareAtPrice: "1699.00",
    isFeatured: true,
    status: "active",
    categoryId: "laptops",
    brandId: "market",
    categoryName: "Laptops",
    brandName: "MarketFlow",
    primaryImage: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    primaryImageAlt: "Market UltraBook Pro 15",
    lowestVariantPrice: "1499.00",
    totalStock: 8,
    createdAt: new Date(),
  },
  {
    id: "feat-4",
    name: "Flow Ultra 65W GaN Fast Charger Trio",
    slug: "flow-ultra-charger-65w",
    sku: "FLOW-65W-GAN",
    description: "Triple-port USB-C fast charger powered by GaN III technology.",
    price: "49.00",
    compareAtPrice: "69.00",
    isFeatured: false,
    status: "active",
    categoryId: "accessories",
    brandId: "flow",
    categoryName: "Accessories",
    brandName: "Flow Gear",
    primaryImage: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0",
    primaryImageAlt: "Flow Ultra 65W Charger",
    lowestVariantPrice: "49.00",
    totalStock: 30,
    createdAt: new Date(),
  },
  {
    id: "feat-5",
    name: "Aether Watch Ultra Titanium (GPS + Cellular)",
    slug: "aether-watch-ultra",
    sku: "AETH-W-ULTRA",
    description: "Rugged aerospace-grade titanium smartwatch with dual-frequency GPS.",
    price: "449.00",
    compareAtPrice: "549.00",
    isFeatured: true,
    status: "active",
    categoryId: "smartwatches",
    brandId: "aether",
    categoryName: "Accessories",
    brandName: "Aether Tech",
    primaryImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    primaryImageAlt: "Aether Watch Ultra",
    lowestVariantPrice: "449.00",
    totalStock: 10,
    createdAt: new Date(),
  },
  {
    id: "feat-6",
    name: "Flow Curved Gaming Monitor 34\" 175Hz OLED",
    slug: "flow-curved-monitor-34",
    sku: "FLOW-MON-34",
    description: "Quantum Dot OLED curved ultrawide display with 0.03ms response time.",
    price: "899.00",
    compareAtPrice: "1099.00",
    isFeatured: true,
    status: "active",
    categoryId: "monitors",
    brandId: "flow",
    categoryName: "Accessories",
    brandName: "Flow Sound",
    primaryImage: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf",
    primaryImageAlt: "Flow Curved Gaming Monitor",
    lowestVariantPrice: "899.00",
    totalStock: 5,
    createdAt: new Date(),
  },
];

export function FeaturedInteractiveTabs({ products }: FeaturedInteractiveTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("trending");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedQuickViewProduct, setSelectedQuickViewProduct] = useState<CatalogProduct | null>(
    null
  );

  // Combine DB products with fallback curated items
  const allFeaturedProducts = useMemo(() => {
    const combined = [...products];
    const existingSlugs = new Set(products.map((p) => p.slug));
    for (const item of CURATED_MOCK_FEATURED) {
      if (!existingSlugs.has(item.slug)) {
        combined.push(item);
      }
    }
    return combined;
  }, [products]);

  // Tab Filtering & Search
  const filteredList = useMemo(() => {
    return allFeaturedProducts.filter((product) => {
      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCat = product.categoryName?.toLowerCase().includes(query);
        if (!matchesName && !matchesCat) return false;
      }

      // Tab filter heuristic logic for variety
      if (activeTab === "trending") return product.isFeatured || product.totalStock > 0;
      if (activeTab === "editors_picks") return Boolean(product.compareAtPrice) || product.isFeatured;
      if (activeTab === "new_arrivals") return true;
      if (activeTab === "staff_choices") return product.categoryId !== null;

      return true;
    });
  }, [allFeaturedProducts, activeTab, searchQuery]);

  const activeTabMeta = TABS.find((t) => t.id === activeTab) ?? TABS[0];

  return (
    <div className="space-y-8">
      {/* Tab Switcher & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/80 pb-4">
        {/* Tab Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-market-navy text-white shadow-md dark:bg-flow-cyan dark:text-market-navy scale-105"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search filter input */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search featured picks..."
            className="w-full h-10 pl-10 pr-4 rounded-xl border border-border bg-background text-xs font-medium placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-flow-cyan transition-all"
          />
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {activeTabMeta.icon}
          <h2 className="text-xl font-bold text-foreground">
            {activeTabMeta.label} ({filteredList.length})
          </h2>
        </div>
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="text-xs font-semibold text-flow-cyan hover:underline flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Clear search
          </button>
        )}
      </div>

      {/* Products Grid */}
      {filteredList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredList.map((product, idx) => (
            <FeaturedProductCard
              key={product.id}
              product={product}
              badgeTag={activeTabMeta.badge}
              ratingScore={Number((4.7 + (idx % 3) * 0.1).toFixed(1))}
              reviewCount={42 + idx * 14}
              onQuickView={(p) => setSelectedQuickViewProduct(p)}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-3xl border border-border bg-card p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-flow-cyan/10 text-flow-cyan flex items-center justify-center mx-auto">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-foreground">No featured items found</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            No items matched &quot;{searchQuery}&quot; in the {activeTabMeta.label} collection.
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="px-4 py-2 rounded-xl bg-market-navy text-white text-xs font-bold hover:bg-flow-cyan transition-colors"
          >
            Show All Items
          </button>
        </div>
      )}

      {/* Quick View Modal */}
      <FeaturedQuickViewModal
        product={selectedQuickViewProduct}
        onClose={() => setSelectedQuickViewProduct(null)}
      />
    </div>
  );
}
