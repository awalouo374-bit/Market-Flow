export function DealsSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Filter panel skeleton */}
      <div className="h-32 rounded-2xl bg-muted/60 border border-border" />

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {Array.from({ length: count }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
          <div key={i} className="flex flex-col rounded-2xl border border-border bg-card overflow-hidden">
            <div className="aspect-square bg-muted" />
            <div className="p-4 space-y-3">
              <div className="flex justify-between">
                <div className="h-3 bg-muted rounded-full w-1/3" />
                <div className="h-3 bg-muted rounded-full w-1/4" />
              </div>
              <div className="h-4 bg-muted rounded-full w-4/5" />
              <div className="h-5 bg-muted rounded-full w-1/2 mt-2" />
              <div className="h-2 bg-muted rounded-full w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
