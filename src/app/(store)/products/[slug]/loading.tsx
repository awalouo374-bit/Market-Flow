export default function ProductLoading() {
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Gallery skeleton */}
        <div className="space-y-3">
          <div className="aspect-square rounded-3xl bg-muted" />
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => <div key={i} className="w-16 h-16 rounded-xl bg-muted shrink-0" />)}
          </div>
        </div>
        {/* Details skeleton */}
        <div className="space-y-5">
          <div className="flex gap-2">
            <div className="h-5 w-20 bg-muted rounded-full" />
            <div className="h-5 w-24 bg-muted rounded-full" />
          </div>
          <div className="space-y-2">
            <div className="h-8 bg-muted rounded-full w-4/5" />
            <div className="h-8 bg-muted rounded-full w-2/3" />
          </div>
          <div className="h-4 w-32 bg-muted rounded-full" />
          <div className="h-10 w-36 bg-muted rounded-full" />
          <div className="space-y-2">
            <div className="h-3 bg-muted rounded-full" />
            <div className="h-3 bg-muted rounded-full w-5/6" />
            <div className="h-3 bg-muted rounded-full w-4/6" />
          </div>
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => <div key={i} className="h-9 w-20 rounded-xl bg-muted" />)}
          </div>
          <div className="flex gap-3 pt-2">
            <div className="h-11 w-28 rounded-xl bg-muted" />
            <div className="h-11 flex-1 rounded-xl bg-muted" />
            <div className="h-11 w-11 rounded-xl bg-muted" />
          </div>
        </div>
      </div>
    </div>
  );
}
