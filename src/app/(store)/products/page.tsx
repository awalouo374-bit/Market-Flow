import type { Metadata } from "next";
import { Suspense } from "react";
import { getCatalogProducts, getCatalogCategories } from "@/lib/catalog";
import { CatalogHero } from "@/modules/catalog/CatalogHero";
import { CategoryBanner } from "@/modules/catalog/CategoryBanner";
import { CatalogFiltersPanel } from "@/modules/catalog/CatalogFiltersPanel";
import { CatalogMobileFilters } from "@/modules/catalog/CatalogMobileFilters";
import { ProductCard } from "@/modules/catalog/ProductCard";
import { CatalogPagination } from "@/modules/catalog/CatalogPagination";
import { EmptyState } from "@/modules/catalog/EmptyState";
import { ProductGridSkeleton } from "@/modules/catalog/ProductCardSkeleton";
import { GradientText } from "@/components/shared/GradientText";
import { LayoutGrid, List } from "lucide-react";

export const metadata: Metadata = {
  title: "Product Catalog â€” MarketFlow",
  description:
    "Explore the full MarketFlow catalog â€” smartphones, audio, laptops and accessories from the world's leading brands.",
  openGraph: {
    title: "Product Catalog â€” MarketFlow",
    description: "Shop the latest in consumer electronics at MarketFlow.",
    type: "website",
  },
};

// â”€â”€ Search params types â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

interface PageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    brand?: string;
    featured?: string;
    sort?: string;
    page?: string;
  }>;
}

// â”€â”€ Product Grid â€” isolated async Server Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

async function ProductGrid({
  search,
  category,
  brand,
  featured,
  sort,
  page,
}: {
  search?: string;
  category?: string;
  brand?: string;
  featured?: boolean;
  sort?: string;
  page?: number;
}) {
  const sortBy = (["newest", "price_asc", "price_desc", "name_asc"].includes(sort ?? "")
    ? sort
    : "newest") as "newest" | "price_asc" | "price_desc" | "name_asc";

  const { items, total, totalPages, page: currentPage } = await getCatalogProducts({
    search,
    categorySlug: category,
    brandId: brand,
    featured,
    sortBy,
    page: page ?? 1,
    perPage: 12,
  });

  if (items.length === 0) {
    return (
      <EmptyState
        search={search}
        hasFilters={!!(category || brand || featured)}
      />
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <CatalogPagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}

// â”€â”€ Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.search;
  const category = params.category;
  const brand = params.brand;
  const featured = params.featured === "true";
  const sort = params.sort ?? "newest";
  const page = Number(params.page ?? 1);

  // Fetch sidebar data in parallel with the hero
  const [categories, { total }] = await Promise.all([
    getCatalogCategories(),
    getCatalogProducts({
      search,
      categorySlug: category,
      brandId: brand,
      featured,
      sortBy: (["newest", "price_asc", "price_desc", "name_asc"].includes(sort)
        ? sort
        : "newest") as "newest" | "price_asc" | "price_desc" | "name_asc",
      page,
      perPage: 12,
    }),
  ]);

  const hasActiveFilters = !!(search || category || brand || featured);

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Hero Banner */}
      <CatalogHero />

      {/* Category Navigation */}
      <CategoryBanner categories={categories} />

      {/* Main Catalog Layout */}
      <div className="flex gap-8">
        {/* Sidebar â€” desktop */}
        <aside className="hidden lg:block w-56 xl:w-64 shrink-0">
          <div className="sticky top-24">
            <CatalogFiltersPanel categories={categories} totalProducts={total} />
          </div>
        </aside>

        {/* Right column */}
        <div className="flex-1 min-w-0 space-y-6">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {/* Mobile filter trigger */}
              <CatalogMobileFilters categories={categories} totalProducts={total} />

              {/* Breadcrumb / active filter chips */}
              <div className="flex flex-wrap items-center gap-2">
                {search && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold">
                    Search: {search}
                  </span>
                )}
                {category && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold">
                    {categories.find((c) => c.slug === category)?.name ?? category}
                  </span>
                )}
                {featured && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold">
                    Featured
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Results count */}
              <p className="text-sm text-muted-foreground hidden sm:block">
                <span className="font-semibold text-foreground">{total}</span> products
              </p>
              {/* Grid layout icons â€” decorative, single grid mode */}
              <div className="flex items-center gap-1 border border-border rounded-xl overflow-hidden">
                <button
                  type="button"
                  className="p-2 bg-muted/60 text-foreground"
                  aria-label="Grid view"
                  aria-pressed="true"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
                  aria-label="List view"
                  aria-pressed="false"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Section heading */}
          {!hasActiveFilters ? (
            <div>
              <GradientText as="h2" variant="flow" className="text-2xl font-bold">
                All Products
              </GradientText>
              <p className="text-sm text-muted-foreground mt-1">
                Handpicked tech from top brands, shipped fast
              </p>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-bold text-foreground">
                {search ? `Results for "${search}"` : category
                  ? (categories.find((c) => c.slug === category)?.name ?? "Category")
                  : "Featured Products"}
              </h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                {total} {total === 1 ? "product" : "products"} found
              </p>
            </div>
          )}

          {/* Product Grid â€” streamed with Suspense */}
          <Suspense fallback={<ProductGridSkeleton count={12} />}>
            <ProductGrid
              search={search}
              category={category}
              brand={brand}
              featured={featured}
              sort={sort}
              page={page}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
