import Link from "next/link";
import { PackageSearch, Plus } from "lucide-react";
import { BrandButton } from "@/components/shared/BrandButton";

export function ProductsEmptyState({ hasFilters }: { hasFilters: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground">
        <PackageSearch className="w-8 h-8 stroke-1" />
      </div>
      <div>
        <p className="font-semibold text-foreground">
          {hasFilters ? "No products match your filters" : "No products yet"}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          {hasFilters ? "Try clearing your search or status filter." : "Create your first product to get started."}
        </p>
      </div>
      {!hasFilters && (
        <Link href="/admin/products/new">
          <BrandButton variant="flow" size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Add Product
          </BrandButton>
        </Link>
      )}
    </div>
  );
}
