"use client";

import React, { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react";
import type { CatalogCategory } from "@/lib/catalog";

interface CatalogFiltersPanelProps {
  categories: CatalogCategory[];
  totalProducts: number;
}

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "name_asc", label: "Name A–Z" },
] as const;

export function CatalogFiltersPanel({ categories, totalProducts }: CatalogFiltersPanelProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [isCategoryOpen, setIsCategoryOpen] = React.useState(true);

  const currentCategory = searchParams.get("category") ?? "";
  const currentSort = searchParams.get("sort") ?? "newest";
  const currentFeatured = searchParams.get("featured") === "true";

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === null || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    params.delete("page");
    startTransition(() => {
      router.push(`/products?${params.toString()}`, { scroll: false });
    });
  };

  const clearAllFilters = () => {
    startTransition(() => {
      router.push("/products", { scroll: false });
    });
  };

  const hasActiveFilters = currentCategory || currentFeatured;

  return (
    <aside
      className="w-full space-y-1"
      aria-label="Product filters"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-accent" />
          <h2 className="font-semibold text-sm text-foreground">Filters</h2>
          {isPending && (
            <span className="w-4 h-4 rounded-full border-2 border-accent border-t-transparent animate-spin" />
          )}
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearAllFilters}
            className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1 transition-colors"
            aria-label="Clear all filters"
          >
            <X className="w-3 h-3" />
            Clear all
          </button>
        )}
      </div>

      {/* Results count */}
      <p className="text-xs text-muted-foreground py-2">
        <span className="font-semibold text-foreground">{totalProducts}</span> products found
      </p>

      {/* Sort */}
      <div className="py-4 border-b border-border space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Sort By
        </h3>
        <div className="space-y-1">
          {SORT_OPTIONS.map((opt) => (
            <button
              type="button"
              key={opt.value}
              onClick={() => updateParam("sort", opt.value)}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all duration-150 ${
                currentSort === opt.value
                  ? "bg-accent/10 text-accent font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
              aria-pressed={currentSort === opt.value}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Toggle */}
      <div className="py-4 border-b border-border">
        <button
          type="button"
          onClick={() => updateParam("featured", currentFeatured ? null : "true")}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl border text-sm font-medium transition-all duration-150 ${
            currentFeatured
              ? "border-accent bg-accent/10 text-accent"
              : "border-border text-muted-foreground hover:border-accent/40 hover:text-foreground"
          }`}
          aria-pressed={currentFeatured}
        >
          <span>Featured Only</span>
          <span
            className={`w-8 h-4 rounded-full transition-colors ${
              currentFeatured ? "bg-accent" : "bg-muted"
            } relative`}
          >
            <span
              className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform shadow-sm ${
                currentFeatured ? "translate-x-4" : "translate-x-0.5"
              }`}
            />
          </span>
        </button>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="py-4 space-y-3">
          <button
            type="button"
            onClick={() => setIsCategoryOpen((p) => !p)}
            className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            aria-expanded={isCategoryOpen}
          >
            <span>Categories</span>
            {isCategoryOpen ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>

          {isCategoryOpen && (
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => updateParam("category", null)}
                className={`w-full text-left px-3 py-2 rounded-xl text-sm flex items-center justify-between transition-all duration-150 ${
                  !currentCategory
                    ? "bg-accent/10 text-accent font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
                aria-pressed={!currentCategory}
              >
                <span>All Categories</span>
              </button>
              {categories.map((cat) => (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => updateParam("category", cat.slug)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-sm flex items-center justify-between transition-all duration-150 ${
                    currentCategory === cat.slug
                      ? "bg-accent/10 text-accent font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                  aria-pressed={currentCategory === cat.slug}
                >
                  <span>{cat.name}</span>
                  {cat.productCount > 0 && (
                    <span className="text-[10px] font-medium bg-muted px-1.5 py-0.5 rounded-full">
                      {cat.productCount}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </aside>
  );
}
