import Image from "next/image";
import { AlertTriangle, Zap } from "lucide-react";
import type { AdminProduct } from "@/lib/admin-products";
import { ProductStatusBadge } from "./ProductStatusBadge";
import { ProductRowActions } from "./ProductRowActions";

interface SelectOption { id: string; name: string; }

interface ProductsTableProps {
  products: AdminProduct[];
  categories: SelectOption[];
  brands: SelectOption[];
}

export function ProductsTable({ products, categories, brands }: ProductsTableProps) {
  return (
    <div className="rounded-2xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 text-left">Product</th>
              <th className="px-4 py-3 text-left hidden md:table-cell">SKU</th>
              <th className="px-4 py-3 text-left hidden lg:table-cell">Category</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left hidden sm:table-cell">Stock</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60 bg-card">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-muted/30 transition-colors group">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-muted border border-border/60 overflow-hidden shrink-0 relative">
                      {p.primaryImage ? (
                        <Image src={p.primaryImage} alt={p.name} fill className="object-cover" sizes="40px" />
                      ) : (
                        <div className="w-full h-full bg-muted" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <button
                        type="button"
                        className="font-semibold text-foreground hover:text-accent transition-colors line-clamp-1 text-left"
                      >
                        {p.name}
                      </button>
                      {p.isFeatured && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] text-amber-500 font-semibold mt-0.5">
                          <Zap className="w-2.5 h-2.5" />
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className="font-mono text-xs text-muted-foreground">{p.sku}</span>
                </td>
                <td className="px-4 py-3 hidden lg:table-cell">
                  <span className="text-xs text-muted-foreground">{p.categoryName ?? "—"}</span>
                </td>
                <td className="px-4 py-3">
                  <div>
                    <span className="font-semibold">${parseFloat(p.price).toFixed(2)}</span>
                    {p.compareAtPrice && parseFloat(p.compareAtPrice) > parseFloat(p.price) && (
                      <span className="block text-[10px] text-muted-foreground line-through">
                        ${parseFloat(p.compareAtPrice).toFixed(2)}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <StockCell stock={p.totalStock} variantCount={p.variantCount} />
                </td>
                <td className="px-4 py-3">
                  <ProductStatusBadge status={p.status} />
                </td>
                <td className="px-4 py-3 text-right">
                  <ProductRowActions product={p} categories={categories} brands={brands} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StockCell({ stock, variantCount }: { stock: number; variantCount: number }) {
  const isLow = stock > 0 && stock <= 5;
  const isEmpty = stock === 0;
  return (
    <div className="flex items-center gap-1.5">
      {(isLow || isEmpty) && (
        <AlertTriangle className={`w-3.5 h-3.5 shrink-0 ${isEmpty ? "text-destructive" : "text-amber-500"}`} />
      )}
      <span className={`text-xs font-semibold ${isEmpty ? "text-destructive" : isLow ? "text-amber-500" : "text-foreground"}`}>
        {stock} units
      </span>
      {variantCount > 0 && (
        <span className="text-[10px] text-muted-foreground">/ {variantCount} var.</span>
      )}
    </div>
  );
}
