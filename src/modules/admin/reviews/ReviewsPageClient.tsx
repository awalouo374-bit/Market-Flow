"use client";

import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { ReviewsTable } from "./ReviewsTable";
import { CatalogPagination } from "@/modules/catalog/CatalogPagination";
import type { AdminReview } from "@/lib/admin-reviews";

const STATUS_FILTERS = [
  { value: "all", label: "All" },
  { value: "pending",  label: "Pending"  },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
];

const RATING_FILTERS = [
  { value: "all", label: "All Stars" },
  ...([5, 4, 3, 2, 1].map((r) => ({ value: String(r), label: `${r} ★` }))),
];

interface ReviewsPageClientProps {
  reviews: AdminReview[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export function ReviewsPageClient({ reviews, total, totalPages, currentPage }: ReviewsPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const search = searchParams.get("search") ?? "";
  const status = searchParams.get("status") ?? "all";
  const rating = searchParams.get("rating") ?? "all";

  const push = (updates: Record<string, string | null>) => {
    const p = new URLSearchParams(searchParams.toString());
    for (const [k, v] of Object.entries(updates)) v === null ? p.delete(k) : p.set(k, v);
    p.delete("page");
    startTransition(() => router.push(`/admin/reviews?${p.toString()}`, { scroll: false }));
  };

  const hasFilters = !!(search || status !== "all" || rating !== "all");

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${isPending ? "text-accent animate-pulse" : "text-muted-foreground"}`} />
            <input
              type="search"
              defaultValue={search}
              onKeyDown={(e) => e.key === "Enter" && push({ search: e.currentTarget.value || null })}
              placeholder="Search product or reviewer…"
              className="h-9 w-56 pl-8 pr-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all"
            />
          </div>

          <select
            value={status}
            onChange={(e) => push({ status: e.target.value === "all" ? null : e.target.value })}
            className="h-9 px-3 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
          >
            {STATUS_FILTERS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
          </select>

          <select
            value={rating}
            onChange={(e) => push({ rating: e.target.value === "all" ? null : e.target.value })}
            className="h-9 px-3 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
          >
            {RATING_FILTERS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
          </select>

          {hasFilters && (
            <button type="button" onClick={() => push({ search: null, status: null, rating: null })}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors">
              <X className="w-3.5 h-3.5" /> Clear
            </button>
          )}
          <span className="text-xs text-muted-foreground">{total} reviews</span>
        </div>
      </div>

      {reviews.length === 0 ? (
        <p className="text-center py-16 text-sm text-muted-foreground">No reviews match your filters.</p>
      ) : (
        <>
          <ReviewsTable reviews={reviews} />
          <CatalogPagination currentPage={currentPage} totalPages={totalPages} />
        </>
      )}
    </div>
  );
}
