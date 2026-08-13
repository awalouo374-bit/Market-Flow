export function OrderSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header controls skeleton */}
      <div className="h-28 rounded-3xl bg-muted/60 border border-border" />

      {/* Orders list skeleton */}
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
          <div key={i} className="h-48 rounded-3xl bg-card border border-border p-6 space-y-4">
            <div className="flex justify-between">
              <div className="h-4 bg-muted rounded-full w-1/3" />
              <div className="h-4 bg-muted rounded-full w-1/5" />
            </div>
            <div className="h-10 bg-muted/40 rounded-2xl" />
            <div className="flex justify-between pt-2">
              <div className="h-8 bg-muted rounded-xl w-1/4" />
              <div className="h-8 bg-muted rounded-xl w-1/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
