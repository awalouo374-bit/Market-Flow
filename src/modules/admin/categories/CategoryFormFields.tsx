import type { AdminCategory } from "@/lib/admin-categories";

interface SelectOption { id: string; name: string; }

export interface CategoryDefaults {
  name?: string;
  description?: string | null;
  imageUrl?: string | null;
  parentId?: string | null;
  isActive?: boolean;
}

interface CategoryFormFieldsProps {
  parentOptions: SelectOption[];
  defaults?: CategoryDefaults;
  currentId?: string;
}

const inputCls = "w-full h-9 px-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all";
const labelCls = "block text-xs font-semibold text-foreground mb-1";

export function CategoryFormFields({ parentOptions, defaults, currentId }: CategoryFormFieldsProps) {
  const d = defaults ?? {};
  const filteredParents = parentOptions.filter((p) => p.id !== currentId);

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="col-span-2">
        <label htmlFor="cf-name" className={labelCls}>
          Category Name <span className="text-destructive">*</span>
        </label>
        <input
          id="cf-name" name="name" required
          defaultValue={d.name}
          placeholder="e.g. Smartphones"
          className={inputCls}
        />
      </div>

      <div className="col-span-2">
        <label htmlFor="cf-desc" className={labelCls}>Description</label>
        <textarea
          id="cf-desc" name="description" rows={2}
          defaultValue={d.description ?? ""}
          placeholder="Short description of this category…"
          className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/40 resize-none transition-all"
        />
      </div>

      <div className="col-span-2">
        <label htmlFor="cf-image" className={labelCls}>Image URL</label>
        <input
          id="cf-image" name="imageUrl" type="url"
          defaultValue={d.imageUrl ?? ""}
          placeholder="https://images.unsplash.com/…"
          className={inputCls}
        />
      </div>

      <div>
        <label htmlFor="cf-parent" className={labelCls}>Parent Category</label>
        <select id="cf-parent" name="parentId" defaultValue={d.parentId ?? ""} className={inputCls}>
          <option value="">— None (Top-level) —</option>
          {filteredParents.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col justify-end pb-0.5">
        <div className="flex items-center gap-2 h-9">
          <input
            id="cf-active" name="isActive" type="checkbox"
            defaultChecked={d.isActive ?? true}
            className="w-4 h-4 rounded accent-accent"
          />
          <label htmlFor="cf-active" className="text-sm text-foreground font-medium cursor-pointer">
            Active (visible in store)
          </label>
        </div>
      </div>
    </div>
  );
}
