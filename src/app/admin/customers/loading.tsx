export default function CustomersLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 w-44 bg-muted rounded-xl" />
      <div className="flex flex-wrap gap-2">
        <div className="h-9 w-56 bg-muted rounded-xl" />
        <div className="h-9 w-32 bg-muted rounded-xl" />
        <div className="h-9 w-32 bg-muted rounded-xl" />
      </div>
      <div className="rounded-2xl border border-border overflow-hidden">
        <div className="h-10 bg-muted/50" />
        {Array.from({ length: 8 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
          <div key={i} className="flex items-center gap-4 px-4 py-3 border-t border-border/60">
            <div className="w-8 h-8 rounded-xl bg-muted shrink-0" />
            <div className="flex-1 space-y-1.5">
              <div className="h-3.5 bg-muted rounded-full w-32" />
              <div className="h-3 bg-muted rounded-full w-44" />
            </div>
            <div className="h-5 w-16 bg-muted rounded-full hidden md:block" />
            <div className="h-5 w-14 bg-muted rounded-full" />
            <div className="h-5 w-10 bg-muted rounded-full hidden sm:block" />
            <div className="h-4 w-16 bg-muted rounded-full hidden lg:block" />
          </div>
        ))}
      </div>
    </div>
  );
}
