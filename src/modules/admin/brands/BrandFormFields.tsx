export interface BrandDefaults {
  name?: string;
  logoUrl?: string | null;
  website?: string | null;
}

const inputCls = "w-full h-9 px-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all";
const labelCls = "block text-xs font-semibold text-foreground mb-1";

export function BrandFormFields({ defaults }: { defaults?: BrandDefaults }) {
  const d = defaults ?? {};
  return (
    <div className="space-y-3">
      <div>
        <label htmlFor="bf-name" className={labelCls}>
          Brand Name <span className="text-destructive">*</span>
        </label>
        <input
          id="bf-name" name="name" required
          defaultValue={d.name}
          placeholder="e.g. Aether Tech"
          className={inputCls}
        />
      </div>

      <div>
        <label htmlFor="bf-logo" className={labelCls}>Logo URL</label>
        <input
          id="bf-logo" name="logoUrl" type="url"
          defaultValue={d.logoUrl ?? ""}
          placeholder="https://cdn.example.com/logo.png"
          className={inputCls}
        />
      </div>

      <div>
        <label htmlFor="bf-website" className={labelCls}>Website</label>
        <input
          id="bf-website" name="website" type="url"
          defaultValue={d.website ?? ""}
          placeholder="https://example.com"
          className={inputCls}
        />
      </div>
    </div>
  );
}
