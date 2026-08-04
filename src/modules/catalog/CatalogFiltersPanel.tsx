"use client";

import { useTransition, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react";
import type { CatalogCategory, CatalogBrand } from "@/lib/catalog";

interface Props {
  categories: CatalogCategory[];
  brands: CatalogBrand[];
  totalProducts: number;
}

const SORT_OPTIONS = [
  { value: "newest",     label: "Newest First" },
  { value: "price_asc",  label: "Price: Low → High" },
  { value: "price_desc", label: "Price: High → Low" },
  { value: "name_asc",   label: "Name A–Z" },
] as const;

function FilterSection({
  label, open, onToggle, children,
}: { label: string; open: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <div className="py-4 border-b border-border space-y-3">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
        aria-expanded={open}
      >
        <span>{label}</span>
        {open ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
      </button>
      {open && <div>{children}</div>}
    </div>
  );
}

export function CatalogFiltersPanel({ categories, brands, totalProducts }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [openSections, setOpenSections] = useState({ sort: true, category: true, brand: false, price: false });

  const currentCategory = searchParams.get("category") ?? "";
  const currentBrand    = searchParams.get("brand")    ?? "";
  const currentSort     = searchParams.get("sort")     ?? "newest";
  const currentFeatured = searchParams.get("featured") === "true";
  const currentMinPrice = searchParams.get("minPrice") ?? "";
  const currentMaxPrice = searchParams.get("maxPrice") ?? "";

  const toggle = (k: keyof typeof openSections) =>
    setOpenSections((p) => ({ ...p, [k]: !p[k] }));

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    value ? params.set(key, value) : params.delete(key);
    params.delete("page");
    startTransition(() => router.push(`/products?${params.toString()}`, { scroll: false }));
  };

  const clearAll = () =>
    startTransition(() => router.push("/products", { scroll: false }));

  const hasFilters = !!(currentCategory || currentBrand || currentFeatured || currentMinPrice || currentMaxPrice);

  const optionCls = (active: boolean) =>
    `w-full text-left px-3 py-2 rounded-xl text-sm flex items-center justify-between transition-all duration-150 ${
      active ? "bg-accent/10 text-accent font-semibold" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
    }`;

  return (
    <aside className="w-full space-y-1" aria-label="Product filters">
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-accent" />
          <span className="font-bold text-sm text-foreground">Filters</span>
          {isPending && <span className="w-4 h-4 rounded-full border-2 border-accent border-t-transparent animate-spin" />}
        </div>
        {hasFilters && (
          <button type="button" onClick={clearAll}
            className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1 transition-colors">
            <X className="w-3 h-3" />Clear all
          </button>
        )}
      </div>

      <p className="text-xs text-muted-foreground py-2">
        <span className="font-bold text-foreground">{totalProducts}</span> products
      </p>

      {/* Featured toggle */}
      <div className="py-3 border-b border-border">
        <button type="button"
          onClick={() => updateParam("featured", currentFeatured ? null : "true")}
          aria-pressed={currentFeatured}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl border text-sm font-medium transition-all duration-150 ${
            currentFeatured ? "border-accent bg-accent/10 text-accent" : "border-border text-muted-foreground hover:border-accent/40 hover:text-foreground"
          }`}>
          <span>Featured Only</span>
          <span className={`w-8 h-4 rounded-full relative transition-colors ${currentFeatured ? "bg-accent" : "bg-muted"}`}>
            <span className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow-sm transition-transform ${currentFeatured ? "translate-x-4" : "translate-x-0.5"}`} />
          </span>
        </button>
      </div>

      {/* Sort */}
      <FilterSection label="Sort By" open={openSections.sort} onToggle={() => toggle("sort")}>
        <div className="space-y-1">
          {SORT_OPTIONS.map((opt) => (
            <button type="button" key={opt.value} onClick={() => updateParam("sort", opt.value)}
              className={optionCls(currentSort === opt.value)} aria-pressed={currentSort === opt.value}>
              {opt.label}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Categories */}
      {categories.length > 0 && (
        <FilterSection label="Category" open={openSections.category} onToggle={() => toggle("category")}>
          <div className="space-y-1">
            <button type="button" onClick={() => updateParam("category", null)}
              className={optionCls(!currentCategory)} aria-pressed={!currentCategory}>
              All Categories
            </button>
            {categories.map((cat) => (
              <button type="button" key={cat.id} onClick={() => updateParam("category", cat.slug)}
                className={optionCls(currentCategory === cat.slug)} aria-pressed={currentCategory === cat.slug}>
                <span>{cat.name}</span>
                {cat.productCount > 0 && (
                  <span className="text-[10px] font-medium bg-muted px-1.5 py-0.5 rounded-full">
                    {cat.productCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </FilterSection>
      )}

      {/* Brands */}
      {brands.length > 0 && (
        <FilterSection label="Brand" open={openSections.brand} onToggle={() => toggle("brand")}>
          <div className="space-y-1">
            <button type="button" onClick={() => updateParam("brand", null)}
              className={optionCls(!currentBrand)} aria-pressed={!currentBrand}>
              All Brands
            </button>
            {brands.map((b) => (
              <button type="button" key={b.id} onClick={() => updateParam("brand", b.id)}
                className={optionCls(currentBrand === b.id)} aria-pressed={currentBrand === b.id}>
                {b.name}
              </button>
            ))}
          </div>
        </FilterSection>
      )}

      {/* Price Range */}
      <FilterSection label="Price Range" open={openSections.price} onToggle={() => toggle("price")}>
        <div className="space-y-4 px-1">
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <label className="text-[10px] text-muted-foreground uppercase tracking-wide font-semibold mb-1 block" htmlFor="min-price">Min</label>
              <input id="min-price" type="number" min={0} placeholder="$0"
                defaultValue={currentMinPrice}
                onBlur={(e) => updateParam("minPrice", e.target.value || null)}
                className="w-full h-9 px-3 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all" />
            </div>
            <span className="text-muted-foreground mt-5">–</span>
            <div className="flex-1">
              <label className="text-[10px] text-muted-foreground uppercase tracking-wide font-semibold mb-1 block" htmlFor="max-price">Max</label>
              <input id="max-price" type="number" min={0} placeholder="∞"
                defaultValue={currentMaxPrice}
                onBlur={(e) => updateParam("maxPrice", e.target.value || null)}
                className="w-full h-9 px-3 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all" />
            </div>
          </div>
        </div>
      </FilterSection>
    </aside>
  );
}
