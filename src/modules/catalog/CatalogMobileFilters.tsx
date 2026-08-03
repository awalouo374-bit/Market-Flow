"use client";

import React, { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { CatalogFiltersPanel } from "./CatalogFiltersPanel";
import type { CatalogCategory } from "@/lib/catalog";

interface CatalogMobileFiltersProps {
  categories: CatalogCategory[];
  totalProducts: number;
}

export function CatalogMobileFilters({ categories, totalProducts }: CatalogMobileFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Trigger button — visible on mobile only */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="lg:hidden flex items-center gap-2 h-9 px-4 rounded-xl border border-border bg-background text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
        aria-label="Open filters"
        aria-expanded={isOpen}
        aria-controls="mobile-filters-drawer"
      >
        <SlidersHorizontal className="w-4 h-4" />
        <span>Filters</span>
      </button>

      {/* Drawer backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Product filters"
          id="mobile-filters-drawer"
        >
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 left-0 w-80 max-w-full bg-background shadow-2xl border-r border-border flex flex-col animate-in slide-in-from-left duration-300">
            {/* Drawer header */}
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h2 className="font-semibold text-base flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-accent" />
                Filters
              </h2>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {/* Filter panel content */}
            <div className="flex-1 overflow-y-auto p-5">
              <CatalogFiltersPanel categories={categories} totalProducts={totalProducts} />
            </div>
            {/* Close button at bottom */}
            <div className="p-5 border-t border-border">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full h-10 rounded-xl bg-market-navy text-white font-semibold text-sm hover:bg-market-navy-dark transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
