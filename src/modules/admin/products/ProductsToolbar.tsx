"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Search, X, Plus } from "lucide-react";
import { BrandButton } from "@/components/shared/BrandButton";
import { CreateProductModal } from "./CreateProductModal";

const STATUS_OPTIONS = [
  { value: "", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "draft", label: "Draft" },
  { value: "archived", label: "Archived" },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "name_asc", label: "Name A–Z" },
  { value: "price_asc", label: "Price ↑" },
  { value: "price_desc", label: "Price ↓" },
];

interface SelectOption { id: string; name: string; }

interface ProductsToolbarProps {
  total: number;
  categories: SelectOption[];
  brands: SelectOption[];
}

export function ProductsToolbar({ total, categories, brands }: ProductsToolbarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const search = searchParams.get("search") ?? "";
  const status = searchParams.get("status") ?? "";
  const sort = searchParams.get("sort") ?? "newest";

  const update = (key: string, value: string) => {
    const p = new URLSearchParams(searchParams.toString());
    value ? p.set(key, value) : p.delete(key);
    p.delete("page");
    startTransition(() => router.push(`/admin/products?${p.toString()}`, { scroll: false }));
  };

  const hasFilters = !!(search || status);

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
      <div className="flex flex-wrap items-center gap-2 flex-1">
        <div className="relative">
          <Search className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${isPending ? "text-accent animate-pulse" : "text-muted-foreground"}`} />
          <input
            type="search"
            defaultValue={search}
            onKeyDown={(e) => e.key === "Enter" && update("search", e.currentTarget.value)}
            placeholder="Search name or SKU…"
            className="h-9 w-56 pl-8 pr-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all"
          />
        </div>

        <select
          value={status}
          onChange={(e) => update("status", e.target.value)}
          className="h-9 px-3 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
          aria-label="Filter by status"
        >
          {STATUS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>

        <select
          value={sort}
          onChange={(e) => update("sort", e.target.value)}
          className="h-9 px-3 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
          aria-label="Sort products"
        >
          {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>

        {hasFilters && (
          <button
            type="button"
            onClick={() => startTransition(() => router.push("/admin/products", { scroll: false }))}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            Clear
          </button>
        )}

        <span className="text-xs text-muted-foreground ml-1">
          {total} {total === 1 ? "product" : "products"}
        </span>
      </div>

      <CreateProductModal categories={categories} brands={brands} />
    </div>
  );
}
