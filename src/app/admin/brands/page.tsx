import type { Metadata } from "next";
import { Suspense } from "react";
import { Tag } from "lucide-react";
import { getAdminBrands } from "@/lib/admin-brands";
import { BrandsPageClient } from "@/modules/admin/brands/BrandsPageClient";

export const metadata: Metadata = { title: "Brands — MarketFlow Admin" };

interface PageProps {
  searchParams: Promise<{ search?: string; page?: string }>;
}

export default async function AdminBrandsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.search;
  const page = Number(params.page ?? 1);

  const { items, total, totalPages } = await getAdminBrands({ search, page, perPage: 20 });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-accent/10 text-accent">
          <Tag className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Brands</h1>
          <p className="text-xs text-muted-foreground">Manage the brands associated with your products</p>
        </div>
      </div>

      <Suspense fallback={<div className="h-64 rounded-2xl bg-muted animate-pulse" />}>
        <BrandsPageClient
          brands={items}
          total={total}
          totalPages={totalPages}
          currentPage={page}
        />
      </Suspense>
    </div>
  );
}
