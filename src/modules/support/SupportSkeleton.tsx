export function SupportSkeleton() {
  return (
    <div className="space-y-12 animate-pulse">
      {/* Hero Skeleton */}
      <div className="h-64 rounded-3xl bg-muted/60 border border-border" />

      {/* Topics Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
          <div key={i} className="h-32 rounded-2xl bg-card border border-border p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-muted" />
            <div className="h-4 bg-muted rounded-full w-2/3" />
            <div className="h-3 bg-muted rounded-full w-full" />
          </div>
        ))}
      </div>

      {/* FAQ Accordion Skeleton */}
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
          <div key={i} className="h-16 rounded-2xl bg-card border border-border" />
        ))}
      </div>
    </div>
  );
}
