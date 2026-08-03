"use client";

import React, { useTransition, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";

export function CatalogSearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);
  const currentSearch = searchParams.get("search") ?? "";

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value.trim()) {
      params.set("search", value.trim());
    } else {
      params.delete("search");
    }
    params.delete("page");
    startTransition(() => {
      router.push(`/products?${params.toString()}`, { scroll: false });
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(e.currentTarget.value);
    }
  };

  const clearSearch = () => {
    if (inputRef.current) inputRef.current.value = "";
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    params.delete("page");
    startTransition(() => {
      router.push(`/products?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="relative w-full max-w-lg" role="search">
      <label htmlFor="catalog-search" className="sr-only">
        Search products
      </label>
      <Search
        className={`w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
          isPending ? "text-accent animate-pulse" : "text-muted-foreground"
        }`}
        aria-hidden="true"
      />
      <input
        ref={inputRef}
        id="catalog-search"
        type="search"
        defaultValue={currentSearch}
        onKeyDown={handleKeyDown}
        placeholder="Search products, brands, categories…"
        autoComplete="off"
        className="w-full h-11 pl-10 pr-10 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring transition-all"
        aria-label="Search products"
      />
      {currentSearch && (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
