export default function AnalyticsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="h-20 rounded-3xl bg-muted" />

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-28 rounded-2xl bg-muted" />
        ))}
      </div>

      {/* Revenue chart */}
      <div className="h-64 rounded-2xl bg-muted" />

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="h-72 rounded-2xl bg-muted" />
        <div className="h-72 rounded-2xl bg-muted" />
        <div className="lg:col-span-1 h-72 rounded-2xl bg-muted" />
      </div>
    </div>
  );
}
