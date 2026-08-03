import Image from "next/image";
import { Globe, Tag } from "lucide-react";
import type { AdminBrand } from "@/lib/admin-brands";
import { BrandRowActions } from "./BrandRowActions";

export function BrandsTable({ brands }: { brands: AdminBrand[] }) {
  return (
    <div className="rounded-2xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 text-left">Brand</th>
              <th className="px-4 py-3 text-left hidden md:table-cell">Slug</th>
              <th className="px-4 py-3 text-left hidden lg:table-cell">Website</th>
              <th className="px-4 py-3 text-left hidden sm:table-cell">Products</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60 bg-card">
            {brands.map((brand) => (
              <tr key={brand.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-muted border border-border/60 overflow-hidden shrink-0 relative flex items-center justify-center">
                      {brand.logoUrl ? (
                        <Image src={brand.logoUrl} alt={brand.name} fill className="object-contain p-1" sizes="36px" />
                      ) : (
                        <Tag className="w-4 h-4 text-muted-foreground/50" />
                      )}
                    </div>
                    <p className="font-semibold text-foreground line-clamp-1">{brand.name}</p>
                  </div>
                </td>

                <td className="px-4 py-3 hidden md:table-cell">
                  <span className="font-mono text-xs text-muted-foreground">{brand.slug}</span>
                </td>

                <td className="px-4 py-3 hidden lg:table-cell">
                  {brand.website ? (
                    <a
                      href={brand.website}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-accent hover:underline"
                    >
                      <Globe className="w-3 h-3" />
                      {brand.website.replace(/^https?:\/\//, "")}
                    </a>
                  ) : (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
                </td>

                <td className="px-4 py-3 hidden sm:table-cell">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-accent/10 text-accent">
                    {brand.productCount}
                  </span>
                </td>

                <td className="px-4 py-3 text-right">
                  <BrandRowActions brand={brand} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
