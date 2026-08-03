export default function ReviewsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 w-40 bg-muted rounded-xl" />
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
          <div key={i} className="h-20 rounded-2xl bg-muted" />
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <div className="h-9 w-56 bg-muted rounded-xl" />
        <div className="h-9 w-32 bg-muted rounded-xl" />
        <div className="h-9 w-32 bg-muted rounded-xl" />
      </div>
      <div className="rounded-2xl border border-border overflow-hidden">
        <div className="h-10 bg-muted/50" />
        {Array.from({ length: 8 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
          <div key={i} className="flex items-start gap-4 px-4 py-3 border-t border-border/60">
            <div className="flex-1 space-y-2">
              <div className="h-3.5 bg-muted rounded-full w-40" />
              <div className="h-3 bg-muted rounded-full w-64" />
            </div>
            <div className="h-4 w-24 bg-muted rounded-full hidden md:block" />
            <div className="h-4 w-20 bg-muted rounded-full" />
            <div className="h-5 w-16 bg-muted rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
