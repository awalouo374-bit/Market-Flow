import { ProductGridSkeleton } from "@/modules/catalog/ProductCardSkeleton";

export default function ProductsLoading() {
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-pulse">
      {/* Hero skeleton — fixed height prevents layout shift */}
      <div className="rounded-3xl bg-muted h-56 sm:h-64" />

      {/* Category pills */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-24 rounded-2xl bg-muted" />
        ))}
      </div>

      <div className="flex gap-8">
        {/* Sidebar skeleton */}
        <div className="hidden lg:flex flex-col gap-3 w-56 xl:w-64 shrink-0">
          <div className="h-6 bg-muted rounded-full w-1/2" />
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-9 rounded-xl bg-muted" />
          ))}
        </div>

        {/* Grid skeleton — same grid class as real grid = zero CLS */}
        <div className="flex-1 space-y-6">
          <div className="flex justify-between">
            <div className="h-9 w-28 rounded-xl bg-muted" />
            <div className="flex gap-2">
              <div className="h-9 w-24 rounded-xl bg-muted" />
              <div className="h-9 w-20 rounded-xl bg-muted" />
            </div>
          </div>
          <ProductGridSkeleton count={16} />
        </div>
      </div>
    </div>
  );
}
