import type { Metadata } from "next";
import { Suspense } from "react";
import { FolderTree } from "lucide-react";
import { getAdminCategories, getParentCategoryOptions } from "@/lib/admin-categories";
import { CategoriesPageClient } from "@/modules/admin/categories/CategoriesPageClient";

export const metadata: Metadata = { title: "Categories — MarketFlow Admin" };

interface PageProps {
  searchParams: Promise<{ search?: string; page?: string }>;
}

export default async function AdminCategoriesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.search;
  const page = Number(params.page ?? 1);

  const [{ items, total, totalPages }, parentOptions] = await Promise.all([
    getAdminCategories({ search, page, perPage: 20 }),
    getParentCategoryOptions(),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-accent/10 text-accent">
          <FolderTree className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Categories</h1>
          <p className="text-xs text-muted-foreground">Organize your catalog with a hierarchical category tree</p>
        </div>
      </div>

      <Suspense fallback={<div className="h-64 rounded-2xl bg-muted animate-pulse" />}>
        <CategoriesPageClient
          categories={items}
          parentOptions={parentOptions}
          total={total}
          totalPages={totalPages}
          currentPage={page}
        />
      </Suspense>
    </div>
  );
}
