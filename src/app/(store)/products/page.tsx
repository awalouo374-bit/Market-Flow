import type { Metadata } from "next";
import { Suspense } from "react";
import { getCatalogProducts, getCatalogCategories, getCatalogBrands } from "@/lib/catalog";
import { CatalogHero } from "@/modules/catalog/CatalogHero";
import { CategoryBanner } from "@/modules/catalog/CategoryBanner";
import { CatalogFiltersPanel } from "@/modules/catalog/CatalogFiltersPanel";
import { ProductGrid } from "@/modules/catalog/ProductGrid";
import { ProductGridSkeleton } from "@/modules/catalog/ProductCardSkeleton";

export const metadata: Metadata = {
  title: "Product Catalog – MarketFlow",
  description: "Explore the full MarketFlow catalog – smartphones, audio, laptops and accessories from the world's leading brands.",
  openGraph: {
    title: "Product Catalog – MarketFlow",
    description: "Shop the latest in consumer electronics at MarketFlow.",
    type: "website",
  },
};

interface PageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    brand?: string;
    featured?: string;
    sort?: string;
    page?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}

const VALID_SORTS = ["newest", "price_asc", "price_desc", "name_asc"] as const;
type SortBy = typeof VALID_SORTS[number];

async function CatalogContent({
  search, category, brand, featured, sort, page, minPrice, maxPrice, categories, brands,
}: {
  search?: string; category?: string; brand?: string; featured: boolean;
  sort: SortBy; page: number; minPrice?: number; maxPrice?: number;
  categories: Awaited<ReturnType<typeof getCatalogCategories>>;
  brands: Awaited<ReturnType<typeof getCatalogBrands>>;
}) {
  const { items, total, totalPages, page: currentPage } = await getCatalogProducts({
    search, categorySlug: category, brandId: brand, featured,
    sortBy: sort, page, perPage: 16, minPrice, maxPrice,
  });

  return (
    <ProductGrid
      products={items}
      total={total}
      totalPages={totalPages}
      currentPage={currentPage}
      categories={categories}
      brands={brands}
      search={search}
      category={category}
    />
  );
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params   = await searchParams;
  const search   = params.search;
  const category = params.category;
  const brand    = params.brand;
  const featured = params.featured === "true";
  const sort     = (VALID_SORTS.includes(params.sort as SortBy) ? params.sort : "newest") as SortBy;
  const page     = Number(params.page ?? 1);
  const minPrice = params.minPrice ? Number(params.minPrice) : undefined;
  const maxPrice = params.maxPrice ? Number(params.maxPrice) : undefined;

  const [categories, brands, { total }] = await Promise.all([
    getCatalogCategories(),
    getCatalogBrands(),
    getCatalogProducts({ search, categorySlug: category, brandId: brand, featured, sortBy: sort, page, perPage: 16, minPrice, maxPrice }),
  ]);

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <CatalogHero />
      <CategoryBanner categories={categories} />

      <div className="flex gap-8">
        {/* Desktop sidebar — sticky, never causes layout shift */}
        <aside className="hidden lg:block w-56 xl:w-64 shrink-0">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-1">
            <CatalogFiltersPanel categories={categories} brands={brands} totalProducts={total} />
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <Suspense fallback={<ProductGridSkeleton count={16} />}>
            <CatalogContent
              search={search} category={category} brand={brand}
              featured={featured} sort={sort} page={page}
              minPrice={minPrice} maxPrice={maxPrice}
              categories={categories} brands={brands}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
