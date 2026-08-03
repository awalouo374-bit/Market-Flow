export default function CategoriesLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 w-44 bg-muted rounded-xl" />
      <div className="flex gap-3">
        <div className="h-9 w-52 bg-muted rounded-xl" />
        <div className="ml-auto h-9 w-36 bg-muted rounded-xl" />
      </div>
      <div className="rounded-2xl border border-border overflow-hidden">
        <div className="h-10 bg-muted/50" />
        {Array.from({ length: 6 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
          <div key={i} className="flex items-center gap-4 px-4 py-3 border-t border-border/60">
            <div className="w-9 h-9 rounded-xl bg-muted shrink-0" />
            <div className="flex-1 h-4 bg-muted rounded-full" />
            <div className="w-24 h-4 bg-muted rounded-full hidden md:block" />
            <div className="w-12 h-5 bg-muted rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
