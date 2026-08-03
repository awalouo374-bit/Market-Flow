import type { ProductStatus } from "@/lib/admin-products";

const config: Record<ProductStatus, { label: string; className: string }> = {
  active: { label: "Active", className: "bg-emerald-500/15 text-emerald-600" },
  draft: { label: "Draft", className: "bg-muted text-muted-foreground" },
  archived: { label: "Archived", className: "bg-orange-500/15 text-orange-600" },
};

export function ProductStatusBadge({ status }: { status: ProductStatus }) {
  const { label, className } = config[status];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${className}`}>
      {label}
    </span>
  );
}
