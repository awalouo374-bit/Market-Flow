import { ProductGridSkeleton } from "@/modules/catalog/ProductCardSkeleton";

export default function ProductsLoading() {
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <div className="rounded-3xl bg-muted animate-pulse h-64" />
      <div className="grid grid-cols-5 gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-24 rounded-2xl bg-muted animate-pulse" />
        ))}
      </div>

      <div className="flex gap-8">
        <div className="hidden lg:block w-56 xl:w-64 flex-shrink-0">
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-9 rounded-xl bg-muted animate-pulse" />
            ))}
          </div>
        </div>
        <div className="flex-1">
          <ProductGridSkeleton count={12} />
        </div>
      </div>
    </div>
  );
}
