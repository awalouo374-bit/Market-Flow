export default function OrdersLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 w-40 bg-muted rounded-xl" />
      <div className="space-y-3">
        <div className="flex gap-3">
          <div className="h-9 w-60 bg-muted rounded-xl" />
        </div>
        <div className="flex gap-1.5">
          {Array.from({ length: 6 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
            <div key={i} className="h-8 w-24 bg-muted rounded-xl" />
          ))}
        </div>
      </div>
      <div className="rounded-2xl border border-border overflow-hidden">
        <div className="h-10 bg-muted/50" />
        {Array.from({ length: 8 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
          <div key={i} className="flex items-center gap-4 px-4 py-3 border-t border-border/60">
            <div className="space-y-1.5 flex-1">
              <div className="h-3.5 bg-muted rounded-full w-32" />
              <div className="h-3 bg-muted rounded-full w-24" />
            </div>
            <div className="h-5 w-20 bg-muted rounded-full hidden md:block" />
            <div className="h-5 w-16 bg-muted rounded-full" />
            <div className="h-5 w-16 bg-muted rounded-full hidden sm:block" />
            <div className="h-5 w-12 bg-muted rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
