import type { Metadata } from "next";
import { Suspense } from "react";
import { Package } from "lucide-react";
import { getAdminProducts } from "@/lib/admin-products";
import { getFormSelectOptions } from "@/actions/createProductAction";
import { ProductsToolbar } from "@/modules/admin/products/ProductsToolbar";
import { ProductsTable } from "@/modules/admin/products/ProductsTable";
import { ProductsEmptyState } from "@/modules/admin/products/ProductsEmptyState";
import { CatalogPagination } from "@/modules/catalog/CatalogPagination";

export const metadata: Metadata = { title: "Products — MarketFlow Admin" };

interface PageProps {
  searchParams: Promise<{
    search?: string;
    status?: string;
    sort?: string;
    page?: string;
  }>;
}

async function ProductsContent({ search, status, sort, page, categories, brands }: {
  search?: string; status?: string; sort?: string; page: number;
  categories: { id: string; name: string }[];
  brands: { id: string; name: string }[];
}) {
  const { items, total, totalPages } = await getAdminProducts({
    search, status, sortBy: sort, page, perPage: 20,
  });

  if (items.length === 0) {
    return <ProductsEmptyState hasFilters={!!(search || status)} />;
  }

  return (
    <div className="space-y-5">
      <ProductsTable products={items} categories={categories} brands={brands} />
      <CatalogPagination currentPage={page} totalPages={totalPages} />
    </div>
  );
}

export default async function AdminProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.search;
  const status = params.status;
  const sort = params.sort;
  const page = Number(params.page ?? 1);

  const [{ total }, { categories, brands }] = await Promise.all([
    getAdminProducts({ search, status, sortBy: sort, page, perPage: 20 }),
    getFormSelectOptions(),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-accent/10 text-accent">
          <Package className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Product Catalog</h1>
          <p className="text-xs text-muted-foreground">Manage products, pricing, variants and visibility</p>
        </div>
      </div>

      <ProductsToolbar total={total} categories={categories} brands={brands} />

      <Suspense fallback={<div className="h-64 rounded-2xl bg-muted animate-pulse" />}>
        <ProductsContent search={search} status={status} sort={sort} page={page} categories={categories} brands={brands} />
      </Suspense>
    </div>
  );
}
