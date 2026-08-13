"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, LayoutGrid, List, RotateCcw, Flame, Sparkles } from "lucide-react";
import type { CatalogProduct, CatalogCategory } from "@/lib/catalog";
import { DealCard } from "./DealCard";
import { BrandButton } from "@/components/shared/BrandButton";

interface DealsFilterGridProps {
  initialProducts: CatalogProduct[];
  categories: CatalogCategory[];
}

// Fallback curated high-converting deals if database catalog has limited compareAtPrice products
const MOCK_PROMO_DEALS: CatalogProduct[] = [
  {
    id: "deal-1",
    name: "Aether Pro Phone X1 Ultra (5G 256GB)",
    slug: "aether-pro-phone-x1",
    sku: "AETH-X1-DEAL",
    description: "Flagship 2026 AI smartphone featuring 120Hz LTPO AMOLED display and 200MP camera system.",
    price: "799.00",
    compareAtPrice: "1099.00",
    isFeatured: true,
    status: "active",
    categoryId: "smartphones",
    brandId: "aether",
    categoryName: "Smartphones",
    brandName: "Aether Tech",
    primaryImage: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    primaryImageAlt: "Aether Pro Phone X1",
    lowestVariantPrice: "799.00",
    totalStock: 3,
    createdAt: new Date(),
  },
  {
    id: "deal-2",
    name: "Flow Wireless ANC Buds Pro Studio",
    slug: "flow-wireless-anc-buds",
    sku: "FLOW-ANC-PRO",
    description: "Hi-Res spatial audio earbuds with active noise cancellation up to 48dB and 36-hour battery.",
    price: "129.00",
    compareAtPrice: "199.00",
    isFeatured: true,
    status: "active",
    categoryId: "audio",
    brandId: "flow",
    categoryName: "Audio",
    brandName: "Flow Sound",
    primaryImage: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
    primaryImageAlt: "Flow Wireless ANC Buds Pro",
    lowestVariantPrice: "129.00",
    totalStock: 5,
    createdAt: new Date(),
  },
  {
    id: "deal-3",
    name: "Market UltraBook Pro 15 (M3 Chip, 32GB)",
    slug: "market-ultrabook-15",
    sku: "UB-15-M3",
    description: "Ultra-slim carbon fiber laptop with Liquid Retina display, all-day 20-hour battery life.",
    price: "1199.00",
    compareAtPrice: "1599.00",
    isFeatured: true,
    status: "active",
    categoryId: "laptops",
    brandId: "market",
    categoryName: "Laptops",
    brandName: "MarketFlow",
    primaryImage: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    primaryImageAlt: "Market UltraBook Pro 15",
    lowestVariantPrice: "1199.00",
    totalStock: 2,
    createdAt: new Date(),
  },
  {
    id: "deal-4",
    name: "Flow Ultra 65W GaN Fast Charger Trio",
    slug: "flow-ultra-charger-65w",
    sku: "FLOW-65W-GAN",
    description: "Triple-port USB-C fast charger powered by GaN III technology for phone, laptop, and watch.",
    price: "34.99",
    compareAtPrice: "59.99",
    isFeatured: false,
    status: "active",
    categoryId: "accessories",
    brandId: "flow",
    categoryName: "Accessories",
    brandName: "Flow Gear",
    primaryImage: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0",
    primaryImageAlt: "Flow Ultra 65W Charger",
    lowestVariantPrice: "34.99",
    totalStock: 8,
    createdAt: new Date(),
  },
  {
    id: "deal-5",
    name: "Aether Watch Ultra Titanium (GPS + Cellular)",
    slug: "aether-watch-ultra",
    sku: "AETH-W-ULTRA",
    description: "Rugged aerospace-grade titanium smartwatch with dual-frequency GPS and dive meter.",
    price: "349.00",
    compareAtPrice: "499.00",
    isFeatured: true,
    status: "active",
    categoryId: "smartwatches",
    brandId: "aether",
    categoryName: "Accessories",
    brandName: "Aether Tech",
    primaryImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    primaryImageAlt: "Aether Watch Ultra Titanium",
    lowestVariantPrice: "349.00",
    totalStock: 4,
    createdAt: new Date(),
  },
  {
    id: "deal-6",
    name: "Flow Curved Gaming Monitor 34\" 175Hz OLED",
    slug: "flow-curved-monitor-34",
    sku: "FLOW-MON-34",
    description: "Quantum Dot OLED curved ultrawide display with 0.03ms response time and G-Sync Pro.",
    price: "699.00",
    compareAtPrice: "999.00",
    isFeatured: true,
    status: "active",
    categoryId: "monitors",
    brandId: "flow",
    categoryName: "Accessories",
    brandName: "Flow Sound",
    primaryImage: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf",
    primaryImageAlt: "Flow Curved Gaming Monitor",
    lowestVariantPrice: "699.00",
    totalStock: 3,
    createdAt: new Date(),
  },
];

export function DealsFilterGrid({ initialProducts, categories }: DealsFilterGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [minDiscount, setMinDiscount] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("discount_desc");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Merge real DB products with fallback promo items so deal catalog is rich
  const allDeals = useMemo(() => {
    const combined = [...initialProducts];
    
    // Add promo items if they aren't already in initialProducts by slug
    const existingSlugs = new Set(initialProducts.map((p) => p.slug));
    for (const item of MOCK_PROMO_DEALS) {
      if (!existingSlugs.has(item.slug)) {
        combined.push(item);
      }
    }
    return combined;
  }, [initialProducts]);

  // Filter & Sort logic
  const filteredProducts = useMemo(() => {
    return allDeals
      .filter((product) => {
        // Search query
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchesName = product.name.toLowerCase().includes(query);
          const matchesDesc = product.description?.toLowerCase().includes(query);
          const matchesCat = product.categoryName?.toLowerCase().includes(query);
          if (!matchesName && !matchesDesc && !matchesCat) return false;
        }

        // Category filter
        if (selectedCategory !== "all") {
          const catName = product.categoryName?.toLowerCase() || "";
          const catSlug = product.categoryId?.toLowerCase() || "";
          if (!catName.includes(selectedCategory) && !catSlug.includes(selectedCategory)) {
            return false;
          }
        }

        // Discount filter
        const price = parseFloat(product.price);
        const compare = product.compareAtPrice ? parseFloat(product.compareAtPrice) : price * 1.25;
        const discountPercent = Math.round(((compare - price) / compare) * 100);
        if (discountPercent < minDiscount) return false;

        return true;
      })
      .sort((a, b) => {
        const priceA = parseFloat(a.price);
        const compareA = a.compareAtPrice ? parseFloat(a.compareAtPrice) : priceA * 1.25;
        const discA = ((compareA - priceA) / compareA) * 100;

        const priceB = parseFloat(b.price);
        const compareB = b.compareAtPrice ? parseFloat(b.compareAtPrice) : priceB * 1.25;
        const discB = ((compareB - priceB) / compareB) * 100;

        if (sortBy === "discount_desc") return discB - discA;
        if (sortBy === "price_asc") return priceA - priceB;
        if (sortBy === "price_desc") return priceB - priceA;
        if (sortBy === "savings_desc") return (compareB - priceB) - (compareA - priceA);
        return 0;
      });
  }, [allDeals, searchQuery, selectedCategory, minDiscount, sortBy]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setMinDiscount(0);
    setSortBy("discount_desc");
  };

  const isFiltered = searchQuery !== "" || selectedCategory !== "all" || minDiscount > 0;

  return (
    <div id="deals-grid-section" className="space-y-8 scroll-mt-28">
      {/* Filter Control Panel */}
      <div className="rounded-2xl border border-border bg-card p-5 space-y-5 shadow-xs">
        
        {/* Top Row: Search, Sort, View Toggle */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search limited-time deals..."
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-flow-cyan transition-all"
            />
          </div>

          {/* Right Controls: Sort & Layout */}
          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <label htmlFor="deals-sort-select" className="text-xs font-semibold text-muted-foreground whitespace-nowrap">
                Sort by:
              </label>
              <select
                id="deals-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-11 px-3 py-2 rounded-xl border border-border bg-background text-xs font-semibold text-foreground focus:outline-hidden focus:ring-2 focus:ring-flow-cyan transition-all cursor-pointer"
              >
                <option value="discount_desc">Highest % Discount</option>
                <option value="savings_desc">Highest Dollar Savings</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center rounded-xl border border-border bg-muted/40 p-1">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === "grid" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                aria-label="List view"
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === "list" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Row: Category & Discount Quick Pills */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-border/60 pt-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider pr-1 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Category:
            </span>

            {[
              { label: "All Deals", value: "all" },
              { label: "Smartphones", value: "smartphone" },
              { label: "Audio", value: "audio" },
              { label: "Laptops", value: "laptop" },
              { label: "Accessories", value: "accessories" },
            ].map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.value
                    ? "bg-market-navy text-white shadow-xs dark:bg-flow-cyan dark:text-market-navy"
                    : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Discount Tier Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider pr-1">
              Discount:
            </span>
            {[
              { label: "All Drops", min: 0 },
              { label: "25%+ OFF", min: 25 },
              { label: "30%+ OFF", min: 30 },
              { label: "40%+ OFF", min: 40 },
            ].map((tier) => (
              <button
                key={tier.min}
                type="button"
                onClick={() => setMinDiscount(tier.min)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  minDiscount === tier.min
                    ? "bg-amber-500 text-white shadow-xs"
                    : "bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20"
                }`}
              >
                {tier.label}
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
          <h2 className="text-xl font-bold text-foreground">
            Active Limited-Time Deals ({filteredProducts.length})
          </h2>
        </div>

        {isFiltered && (
          <button
            type="button"
            onClick={resetFilters}
            className="text-xs font-semibold text-flow-cyan hover:underline flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset all filters
          </button>
        )}
      </div>

      {/* Grid or List Display */}
      {filteredProducts.length > 0 ? (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
              : "flex flex-col gap-4"
          }
        >
          {filteredProducts.map((product) => (
            <DealCard key={product.id} product={product} variant={viewMode} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-3xl border border-border bg-card p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-foreground">No deals matched your criteria</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Try adjusting your search query, clearing category filters, or selecting a lower discount threshold.
          </p>
          <BrandButton type="button" onClick={resetFilters} variant="flow" size="sm" className="mt-2">
            Reset All Filters
          </BrandButton>
        </div>
      )}
    </div>
  );
}
