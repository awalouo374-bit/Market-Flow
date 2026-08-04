export default function SettingsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Page header */}
      <div className="h-16 rounded-2xl bg-muted" />

      <div className="flex gap-6">
        {/* Left nav skeleton */}
        <div className="hidden sm:flex flex-col gap-2 w-44 shrink-0">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-10 rounded-xl bg-muted" />
          ))}
        </div>

        {/* Content skeleton */}
        <div className="flex-1 space-y-4">
          <div className="h-24 rounded-2xl bg-muted" />
          <div className="grid grid-cols-2 gap-4">
            <div className="h-16 rounded-xl bg-muted" />
            <div className="h-16 rounded-xl bg-muted" />
            <div className="h-16 rounded-xl bg-muted" />
            <div className="h-16 rounded-xl bg-muted" />
          </div>
        </div>
      </div>
    </div>
  );
}
