"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Plus, X, Tag } from "lucide-react";
import { BrandButton } from "@/components/shared/BrandButton";
import { BrandModal } from "./BrandModal";
import { BrandsTable } from "./BrandsTable";
import { CatalogPagination } from "@/modules/catalog/CatalogPagination";
import type { AdminBrand } from "@/lib/admin-brands";

interface BrandsPageClientProps {
  brands: AdminBrand[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export function BrandsPageClient({ brands, total, totalPages, currentPage }: BrandsPageClientProps) {
  const [createOpen, setCreateOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const search = searchParams.get("search") ?? "";

  const updateSearch = (value: string) => {
    const p = new URLSearchParams(searchParams.toString());
    value ? p.set("search", value) : p.delete("search");
    p.delete("page");
    startTransition(() => router.push(`/admin/brands?${p.toString()}`, { scroll: false }));
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${isPending ? "text-accent animate-pulse" : "text-muted-foreground"}`} />
            <input
              type="search"
              defaultValue={search}
              onKeyDown={(e) => e.key === "Enter" && updateSearch(e.currentTarget.value)}
              placeholder="Search brands…"
              className="h-9 w-52 pl-8 pr-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all"
            />
          </div>
          {search && (
            <button
              type="button"
              onClick={() => updateSearch("")}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors"
            >
              <X className="w-3.5 h-3.5" /> Clear
            </button>
          )}
          <span className="text-xs text-muted-foreground">
            {total} {total === 1 ? "brand" : "brands"}
          </span>
        </div>

        {brands.length === 0 ? (
        <p></p>
        ): (
        <BrandButton variant="flow" size="sm" className="gap-2 shrink-0" onClick={() => setCreateOpen(true)}>
          <Plus className="w-4 h-4" />
          Add Brand
        </BrandButton>
        )}
      </div>

      {brands.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground">
            <Tag className="w-8 h-8 stroke-1" />
          </div>
          <div>
            <p className="font-semibold text-foreground">
              {search ? "No brands match your search" : "No brands yet"}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {search ? "Try clearing your search." : "Create your first brand to tag your products."}
            </p>
          </div>
          {!search && (
            <BrandButton variant="flow" size="sm" className="gap-2" onClick={() => setCreateOpen(true)}>
              <Plus className="w-4 h-4" />
              Add Brand
            </BrandButton>
          )}
        </div>
      ) : (
        <>
          <BrandsTable brands={brands} />
          <CatalogPagination currentPage={currentPage} totalPages={totalPages} />
        </>
      )}

      <BrandModal mode="create" open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  );
}
