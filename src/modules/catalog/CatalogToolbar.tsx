"use client";

import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LayoutGrid, List, X, SlidersHorizontal } from "lucide-react";
import { CatalogMobileFilters } from "./CatalogMobileFilters";
import type { CatalogCategory, CatalogBrand } from "@/lib/catalog";

interface Props {
  total: number;
  categories: CatalogCategory[];
  brands: CatalogBrand[];
  viewMode: "grid" | "list";
  onViewChange: (v: "grid" | "list") => void;
}

const SORT_OPTIONS = [
  { value: "newest",     label: "Newest" },
  { value: "price_asc",  label: "Price ↑" },
  { value: "price_desc", label: "Price ↓" },
  { value: "name_asc",   label: "A–Z" },
] as const;

export function CatalogToolbar({ total, categories, brands, viewMode, onViewChange }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const currentSort     = searchParams.get("sort")     ?? "newest";
  const currentCategory = searchParams.get("category") ?? "";
  const currentBrand    = searchParams.get("brand")    ?? "";
  const currentSearch   = searchParams.get("search")   ?? "";
  const currentFeatured = searchParams.get("featured") === "true";
  const currentMin      = searchParams.get("minPrice") ?? "";
  const currentMax      = searchParams.get("maxPrice") ?? "";

  const removeParam = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    params.delete("page");
    startTransition(() => router.push(`/products?${params.toString()}`, { scroll: false }));
  };

  const setSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    params.delete("page");
    startTransition(() => router.push(`/products?${params.toString()}`, { scroll: false }));
  };

  const activeFilterCount = [currentCategory, currentBrand, currentFeatured, currentMin, currentMax]
    .filter(Boolean).length;

  const categoryLabel = categories.find((c) => c.slug === currentCategory)?.name ?? currentCategory;
  const brandLabel    = brands.find((b) => b.id === currentBrand)?.name ?? currentBrand;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left: mobile filter trigger + result count */}
        <div className="flex items-center gap-3">
          <CatalogMobileFilters
            categories={categories}
            brands={brands}
            totalProducts={total}
            activeFilterCount={activeFilterCount}
          />
          <p className="text-sm text-muted-foreground">
            <span className="font-bold text-foreground">{total}</span> products
          </p>
        </div>

        {/* Right: sort select + view toggle */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <SlidersHorizontal className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <select
              value={currentSort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort products"
              className="h-9 pl-8 pr-3 rounded-xl border border-border bg-background text-sm text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer transition-all appearance-none"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center border border-border rounded-xl overflow-hidden">
            <button
              type="button"
              onClick={() => onViewChange("grid")}
              aria-label="Grid view"
              aria-pressed={viewMode === "grid"}
              className={`p-2 transition-colors ${viewMode === "grid" ? "bg-accent/10 text-accent" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onViewChange("list")}
              aria-label="List view"
              aria-pressed={viewMode === "list"}
              className={`p-2 transition-colors ${viewMode === "list" ? "bg-accent/10 text-accent" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Active filter chips */}
      {(currentSearch || currentCategory || currentBrand || currentFeatured || currentMin || currentMax) && (
        <div className="flex flex-wrap items-center gap-2" aria-label="Active filters">
          {currentSearch && (
            <FilterChip label={`"${currentSearch}"`} onRemove={() => removeParam("search")} />
          )}
          {currentCategory && (
            <FilterChip label={categoryLabel} onRemove={() => removeParam("category")} />
          )}
          {currentBrand && (
            <FilterChip label={brandLabel} onRemove={() => removeParam("brand")} />
          )}
          {currentFeatured && (
            <FilterChip label="Featured" onRemove={() => removeParam("featured")} />
          )}
          {(currentMin || currentMax) && (
            <FilterChip
              label={`$${currentMin || "0"} – $${currentMax || "∞"}`}
              onRemove={() => { removeParam("minPrice"); removeParam("maxPrice"); }}
            />
          )}
        </div>
      )}
    </div>
  );
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 h-7 pl-3 pr-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold">
      {label}
      <button type="button" onClick={onRemove} aria-label={`Remove ${label} filter`}
        className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-accent/20 transition-colors">
        <X className="w-2.5 h-2.5" />
      </button>
    </span>
  );
}
