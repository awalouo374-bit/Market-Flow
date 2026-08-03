export default function ProductsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 w-48 bg-muted rounded-xl" />
      <div className="flex gap-3">
        <div className="h-9 w-56 bg-muted rounded-xl" />
        <div className="h-9 w-32 bg-muted rounded-xl" />
        <div className="h-9 w-32 bg-muted rounded-xl" />
        <div className="ml-auto h-9 w-32 bg-muted rounded-xl" />
      </div>
      <div className="rounded-2xl border border-border overflow-hidden">
        <div className="h-10 bg-muted/50" />
        {Array.from({ length: 8 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
          <div key={i} className="flex items-center gap-4 px-4 py-3 border-t border-border/60">
            <div className="w-10 h-10 rounded-xl bg-muted shrink-0" />
            <div className="flex-1 h-4 bg-muted rounded-full" />
            <div className="w-24 h-4 bg-muted rounded-full hidden md:block" />
            <div className="w-16 h-4 bg-muted rounded-full" />
            <div className="w-16 h-5 bg-muted rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
