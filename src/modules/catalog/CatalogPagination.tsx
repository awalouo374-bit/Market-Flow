"use client";

import React, { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CatalogPaginationProps {
  currentPage: number;
  totalPages: number;
}

export function CatalogPagination({ currentPage, totalPages }: CatalogPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  if (totalPages <= 1) return null;

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    startTransition(() => {
      router.push(`/products?${params.toString()}`, { scroll: true });
    });
  };

  // Build visible page numbers with ellipsis
  const getPages = (): (number | "…")[] => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | "…")[] = [1];
    if (currentPage > 3) pages.push("…");
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("…");
    pages.push(totalPages);
    return pages;
  };

  return (
    <nav
      className="flex items-center justify-center gap-1.5 pt-10"
      aria-label="Pagination"
    >
      {/* Prev */}
      <button
        type="button"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1 || isPending}
        className="w-9 h-9 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 disabled:opacity-40 disabled:pointer-events-none transition-all"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {getPages().map((page, idx) =>
        page === "…" ? (
          // biome-ignore lint/suspicious/noArrayIndexKey: ellipsis
          <span key={`ellipsis-${idx}`} className="w-9 h-9 flex items-center justify-center text-muted-foreground text-sm">
            …
          </span>
        ) : (
          <button
            type="button"
            key={page}
            onClick={() => goToPage(page as number)}
            disabled={isPending}
            aria-label={`Page ${page}`}
            aria-current={currentPage === page ? "page" : undefined}
            className={`w-9 h-9 rounded-xl text-sm font-medium transition-all duration-150 ${
              currentPage === page
                ? "bg-flow-gradient text-white shadow-sm"
                : "border border-border text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        type="button"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages || isPending}
        className="w-9 h-9 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 disabled:opacity-40 disabled:pointer-events-none transition-all"
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
}
