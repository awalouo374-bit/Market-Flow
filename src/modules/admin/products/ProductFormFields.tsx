interface SelectOption { id: string; name: string; }

export interface ProductDefaultValues {
  name?: string;
  sku?: string;
  price?: string;
  compareAtPrice?: string | null;
  costPrice?: string | null;
  description?: string | null;
  categoryId?: string | null;
  brandId?: string | null;
  status?: "draft" | "active" | "archived";
  isFeatured?: boolean;
  imageUrl?: string | null;
  imageAlt?: string | null;
  variantName?: string | null;
  variantSku?: string | null;
  variantStock?: number | null;
  lowStockThreshold?: number | null;
}

interface ProductFormFieldsProps {
  categories: SelectOption[];
  brands: SelectOption[];
  defaults?: ProductDefaultValues;
}

const inputCls = "w-full h-9 px-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all";
const labelCls = "block text-xs font-semibold text-foreground mb-1";
const sectionCls = "pt-4 border-t border-border space-y-3";
const sectionTitle = "text-xs font-bold text-muted-foreground uppercase tracking-wider";

export function ProductFormFields({ categories, brands, defaults }: ProductFormFieldsProps) {
  const d = defaults ?? {};

  return (
    <div className="space-y-3">

      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <label htmlFor="pf-name" className={labelCls}>Product Name <span className="text-destructive">*</span></label>
          <input id="pf-name" name="name" required defaultValue={d.name} placeholder="e.g. Aether Pro Phone X1" className={inputCls} />
        </div>

        <div>
          <label htmlFor="pf-sku" className={labelCls}>SKU <span className="text-destructive">*</span></label>
          <input id="pf-sku" name="sku" required defaultValue={d.sku} placeholder="AETH-PH-X1" className={inputCls} />
        </div>

        <div>
          <label htmlFor="pf-status" className={labelCls}>Status</label>
          <select id="pf-status" name="status" defaultValue={d.status ?? "draft"} className={inputCls}>
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div>
          <label htmlFor="pf-price" className={labelCls}>Price ($) <span className="text-destructive">*</span></label>
          <input id="pf-price" name="price" type="number" step="0.01" min="0" required defaultValue={d.price} placeholder="0.00" className={inputCls} />
        </div>

        <div>
          <label htmlFor="pf-compare" className={labelCls}>Compare-at ($)</label>
          <input id="pf-compare" name="compareAtPrice" type="number" step="0.01" min="0" defaultValue={d.compareAtPrice ?? ""} placeholder="0.00" className={inputCls} />
        </div>

        <div>
          <label htmlFor="pf-cost" className={labelCls}>Cost Price ($)</label>
          <input id="pf-cost" name="costPrice" type="number" step="0.01" min="0" defaultValue={d.costPrice ?? ""} placeholder="0.00" className={inputCls} />
        </div>

        <div>
          <label htmlFor="pf-category" className={labelCls}>Category</label>
          <select id="pf-category" name="categoryId" defaultValue={d.categoryId ?? ""} className={inputCls}>
            <option value="">— None —</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="pf-brand" className={labelCls}>Brand</label>
          <select id="pf-brand" name="brandId" defaultValue={d.brandId ?? ""} className={inputCls}>
            <option value="">— None —</option>
            {brands.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
        </div>

        <div className="col-span-2 flex items-center gap-2">
          <input id="pf-featured" name="isFeatured" type="checkbox" defaultChecked={d.isFeatured} className="w-4 h-4 rounded accent-accent" />
          <label htmlFor="pf-featured" className="text-sm text-foreground font-medium cursor-pointer">Mark as Featured</label>
        </div>

        <div className="col-span-2">
          <label htmlFor="pf-desc" className={labelCls}>Description</label>
          <textarea
            id="pf-desc" name="description" rows={2}
            defaultValue={d.description ?? ""}
            placeholder="Product description…"
            className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all resize-none"
          />
        </div>
      </div>

      <div className={sectionCls}>
        <p className={sectionTitle}>Primary Image</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <label htmlFor="pf-image-url" className={labelCls}>Image URL</label>
            <input
              id="pf-image-url" name="imageUrl" type="url"
              defaultValue={d.imageUrl ?? ""}
              placeholder="https://images.unsplash.com/…"
              className={inputCls}
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="pf-image-alt" className={labelCls}>Alt Text</label>
            <input
              id="pf-image-alt" name="imageAlt" type="text"
              defaultValue={d.imageAlt ?? ""}
              placeholder="Short description of the image"
              className={inputCls}
            />
          </div>
        </div>
      </div>

      <div className={sectionCls}>
        <p className={sectionTitle}>Default Variant & Stock</p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="pf-var-name" className={labelCls}>Variant Name</label>
            <input
              id="pf-var-name" name="variantName" type="text"
              defaultValue={d.variantName ?? ""}
              placeholder="e.g. Default / Black / 256GB"
              className={inputCls}
            />
          </div>
          <div>
            <label htmlFor="pf-var-sku" className={labelCls}>Variant SKU</label>
            <input
              id="pf-var-sku" name="variantSku" type="text"
              defaultValue={d.variantSku ?? ""}
              placeholder="AETH-PH-X1-BLK"
              className={inputCls}
            />
          </div>
          <div>
            <label htmlFor="pf-stock" className={labelCls}>Stock Quantity <span className="text-destructive">*</span></label>
            <input
              id="pf-stock" name="variantStock" type="number" min="0" step="1"
              defaultValue={d.variantStock ?? 0}
              placeholder="0"
              className={inputCls}
            />
          </div>
          <div>
            <label htmlFor="pf-threshold" className={labelCls}>Low Stock Alert At</label>
            <input
              id="pf-threshold" name="lowStockThreshold" type="number" min="0" step="1"
              defaultValue={d.lowStockThreshold ?? 5}
              placeholder="5"
              className={inputCls}
            />
          </div>
        </div>
      </div>

    </div>
  );
}
