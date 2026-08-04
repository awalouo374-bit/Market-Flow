import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CatalogCategory } from "@/lib/catalog";

interface CategorySubItemProps {
  category: CatalogCategory;
}

export function CategorySubItem({ category }: CategorySubItemProps) {
  return (
    <Link
      href={`/products?category=${category.slug}`}
      className="group inline-flex items-center justify-between gap-2 px-3 py-2 rounded-xl border border-border bg-muted/40 hover:border-accent/40 hover:bg-accent/5 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flow-cyan"
      aria-label={`Browse ${category.name}${category.productCount > 0 ? ` — ${category.productCount} products` : ""}`}
    >
      <span className="text-xs font-semibold text-foreground group-hover:text-accent transition-colors truncate">
        {category.name}
      </span>
      <div className="flex items-center gap-1.5 shrink-0">
        {category.productCount > 0 && (
          <span className="text-[10px] font-bold text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full">
            {category.productCount}
          </span>
        )}
        <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 transition-all duration-200" />
      </div>
    </Link>
  );
}
