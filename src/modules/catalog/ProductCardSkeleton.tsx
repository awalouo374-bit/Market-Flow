export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card overflow-hidden animate-pulse">
      {/* Fixed aspect-square so grid never shifts */}
      <div className="aspect-square bg-muted" />
      <div className="p-4 space-y-3">
        <div className="flex justify-between">
          <div className="h-2.5 bg-muted rounded-full w-1/4" />
          <div className="h-2.5 bg-muted rounded-full w-1/5" />
        </div>
        <div className="h-4 bg-muted rounded-full w-4/5" />
        <div className="h-3 bg-muted rounded-full w-2/5" />
        <div className="h-5 bg-muted rounded-full w-1/3 mt-2" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
      {Array.from({ length: count }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProductListSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: count }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
        <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-card animate-pulse">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-muted shrink-0" />
          <div className="flex-1 space-y-2.5">
            <div className="h-2.5 bg-muted rounded-full w-1/4" />
            <div className="h-4 bg-muted rounded-full w-3/4" />
            <div className="h-3 bg-muted rounded-full w-1/3" />
            <div className="h-3 bg-muted rounded-full w-full hidden sm:block" />
            <div className="h-5 bg-muted rounded-full w-1/4" />
          </div>
          <div className="shrink-0 flex-col gap-2 hidden sm:flex">
            <div className="h-9 w-28 bg-muted rounded-xl" />
            <div className="h-9 w-28 bg-muted rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}
