export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card overflow-hidden animate-pulse">
      <div className="aspect-square bg-muted" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-muted rounded-full w-1/3" />
        <div className="h-4 bg-muted rounded-full w-4/5" />
        <div className="h-3 bg-muted rounded-full w-2/5" />
        <div className="h-5 bg-muted rounded-full w-1/3 mt-2" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
