"use client";

import { useState, useTransition } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ProductCard } from "./ProductCard";
import { CatalogToolbar } from "./CatalogToolbar";
import { CatalogPagination } from "./CatalogPagination";
import { ProductGridSkeleton, ProductListSkeleton } from "./ProductCardSkeleton";
import type { CatalogProduct, CatalogCategory, CatalogBrand } from "@/lib/catalog";
import { EmptyState } from "./EmptyState";
import { GradientText } from "@/components/shared/GradientText";

interface Props {
  products: CatalogProduct[];
  total: number;
  totalPages: number;
  currentPage: number;
  categories: CatalogCategory[];
  brands: CatalogBrand[];
  search?: string;
  category?: string;
}

export function ProductGrid({ products, total, totalPages, currentPage, categories, brands, search, category }: Props) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isPending, startTransition] = useTransition();
  const hasFilters = !!(search || category);

  return (
    <div className="space-y-6">
      <CatalogToolbar
        total={total}
        categories={categories}
        brands={brands}
        viewMode={viewMode}
        onViewChange={setViewMode}
      />

      {!hasFilters && (
        <div>
          <GradientText as="h2" variant="flow" className="text-2xl font-bold">
            All Products
          </GradientText>
          <p className="text-sm text-muted-foreground mt-1">
            Handpicked tech from top brands, shipped fast
          </p>
        </div>
      )}

      {products.length === 0 ? (
        <EmptyState search={search} hasFilters={hasFilters} />
      ) : isPending ? (
        viewMode === "grid"
          ? <ProductGridSkeleton count={12} />
          : <ProductListSkeleton count={8} />
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} variant="grid" />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} variant="list" />
          ))}
        </div>
      )}

      <CatalogPagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
