import Link from "next/link";
import { LayoutGrid } from "lucide-react";
import { GradientText } from "@/components/shared/GradientText";
import { CategoryCard } from "./CategoryCard";
import type { CategoryWithChildren } from "@/lib/catalog";

interface CategoriesGridProps {
  categories: CategoryWithChildren[];
}

function EmptyCategoriesState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center space-y-5">
      <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground">
        <LayoutGrid className="w-10 h-10 stroke-1" />
      </div>
      <div className="space-y-2">
        <GradientText as="h2" variant="flow" className="text-2xl font-bold">
          No categories yet
        </GradientText>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          Categories will appear here once they are created in the admin panel.
        </p>
      </div>
      <Link
        href="/products"
        className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-flow-gradient text-white text-sm font-bold hover:opacity-90 transition-opacity"
      >
        Browse All Products
      </Link>
    </div>
  );
}

export function CategoriesGrid({ categories }: CategoriesGridProps) {
  if (categories.length === 0) {
    return <EmptyCategoriesState />;
  }

  return (
    <section aria-labelledby="categories-grid-heading" className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <GradientText as="h2" id="categories-grid-heading" variant="flow" className="text-2xl font-bold">
            All Departments
          </GradientText>
          <p className="text-sm text-muted-foreground mt-1">
            {categories.length} {categories.length === 1 ? "department" : "departments"} —
            select one to explore its products and sub-categories
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <CategoryCard key={category.id} category={category} index={index} />
        ))}
      </div>
    </section>
  );
}
