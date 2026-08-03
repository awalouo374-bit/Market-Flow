import { FolderTree, Plus } from "lucide-react";
import { BrandButton } from "@/components/shared/BrandButton";

interface CategoriesEmptyStateProps {
  hasFilters: boolean;
  onAdd: () => void;
}

export function CategoriesEmptyState({ hasFilters, onAdd }: CategoriesEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground">
        <FolderTree className="w-8 h-8 stroke-1" />
      </div>
      <div>
        <p className="font-semibold text-foreground">
          {hasFilters ? "No categories match your search" : "No categories yet"}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          {hasFilters ? "Try clearing your search." : "Create your first category to organize your products."}
        </p>
      </div>
      {!hasFilters && (
        <BrandButton variant="flow" size="sm" className="gap-2" onClick={onAdd}>
          <Plus className="w-4 h-4" />
          Add Category
        </BrandButton>
      )}
    </div>
  );
}
