import React from "react";
import Link from "next/link";
import { SearchX } from "lucide-react";
import { BrandButton } from "@/components/shared/BrandButton";
import { GradientText } from "@/components/shared/GradientText";

interface EmptyStateProps {
  search?: string;
  hasFilters?: boolean;
}

export function EmptyState({ search, hasFilters }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center space-y-5">
      <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground">
        <SearchX className="w-10 h-10 stroke-1" />
      </div>
      <div className="space-y-2">
        <GradientText as="h2" variant="flow" className="text-2xl font-bold">
          {search ? `No results for "${search}"` : "No products found"}
        </GradientText>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          {hasFilters
            ? "Try adjusting your filters or removing some criteria to see more products."
            : "We couldn't find any products matching your search. Try a different term."}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Link href="/products">
          <BrandButton variant="flow" size="sm">
            Browse All Products
          </BrandButton>
        </Link>
      </div>
    </div>
  );
}
