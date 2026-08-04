export default function CategoriesLoading() {
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-pulse">
      {/* Hero skeleton */}
      <div className="rounded-3xl bg-muted h-56 sm:h-64" />

      {/* Section header */}
      <div className="space-y-2">
        <div className="h-7 bg-muted rounded-full w-48" />
        <div className="h-4 bg-muted rounded-full w-72" />
      </div>

      {/* Category card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col rounded-2xl border border-border bg-card overflow-hidden">
            {/* Image area */}
            <div className="h-40 bg-muted" />
            {/* Body */}
            <div className="p-5 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-2 flex-1">
                  <div className="h-5 bg-muted rounded-full w-2/3" />
                  <div className="h-3 bg-muted rounded-full w-full" />
                  <div className="h-3 bg-muted rounded-full w-4/5" />
                </div>
                <div className="h-8 w-20 bg-muted rounded-xl shrink-0" />
              </div>
              <div className="space-y-2">
                <div className="h-2.5 bg-muted rounded-full w-24" />
                <div className="h-8 bg-muted rounded-xl" />
                <div className="h-8 bg-muted rounded-xl" />
                <div className="h-8 bg-muted rounded-xl" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
