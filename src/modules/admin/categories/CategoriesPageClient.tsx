"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Plus, X } from "lucide-react";
import { BrandButton } from "@/components/shared/BrandButton";
import { CategoryModal } from "./CategoryModal";
import { CategoriesEmptyState } from "./CategoriesEmptyState";
import { CategoriesTable } from "./CategoriesTable";
import { CatalogPagination } from "@/modules/catalog/CatalogPagination";
import type { AdminCategory } from "@/lib/admin-categories";

interface SelectOption { id: string; name: string; }

interface CategoriesPageClientProps {
  categories: AdminCategory[];
  parentOptions: SelectOption[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export function CategoriesPageClient({
  categories, parentOptions, total, totalPages, currentPage,
}: CategoriesPageClientProps) {
  const [createOpen, setCreateOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const search = searchParams.get("search") ?? "";

  const updateSearch = (value: string) => {
    const p = new URLSearchParams(searchParams.toString());
    value ? p.set("search", value) : p.delete("search");
    p.delete("page");
    startTransition(() => router.push(`/admin/categories?${p.toString()}`, { scroll: false }));
  };

  const hasFilters = !!search;

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
              placeholder="Search categories…"
              className="h-9 w-52 pl-8 pr-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all"
            />
          </div>
          {hasFilters && (
            <button
              type="button"
              onClick={() => updateSearch("")}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors"
            >
              <X className="w-3.5 h-3.5" /> Clear
            </button>
          )}
          <span className="text-xs text-muted-foreground">
            {total} {total === 1 ? "category" : "categories"}
          </span>
        </div>

        {categories.length === 0 ? (
        <p></p>
        ):(
        <BrandButton variant="flow" size="sm" className="gap-2 shrink-0" onClick={() => setCreateOpen(true)}>
          <Plus className="w-4 h-4" />
          Add Category
        </BrandButton>
        )}
      </div>

      {categories.length === 0 ? (
        <CategoriesEmptyState hasFilters={hasFilters} onAdd={() => setCreateOpen(true)} />
      ) : (
        <>
          <CategoriesTable categories={categories} parentOptions={parentOptions} />
          <CatalogPagination currentPage={currentPage} totalPages={totalPages} />
        </>
      )}

      <CategoryModal
        mode="create"
        parentOptions={parentOptions}
        open={createOpen}
        onOpenChange={setCreateOpen}
      />
    </div>
  );
}
