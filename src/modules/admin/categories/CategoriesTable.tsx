import Image from "next/image";
import { CheckCircle2, XCircle, FolderOpen } from "lucide-react";
import type { AdminCategory } from "@/lib/admin-categories";
import { CategoryRowActions } from "./CategoryRowActions";

interface SelectOption { id: string; name: string; }

interface CategoriesTableProps {
  categories: AdminCategory[];
  parentOptions: SelectOption[];
}

export function CategoriesTable({ categories, parentOptions }: CategoriesTableProps) {
  return (
    <div className="rounded-2xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left hidden md:table-cell">Slug</th>
              <th className="px-4 py-3 text-left hidden lg:table-cell">Parent</th>
              <th className="px-4 py-3 text-left hidden sm:table-cell">Products</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60 bg-card">
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-muted border border-border/60 overflow-hidden shrink-0 relative flex items-center justify-center">
                      {cat.imageUrl ? (
                        <Image src={cat.imageUrl} alt={cat.name} fill className="object-cover" sizes="36px" />
                      ) : (
                        <FolderOpen className="w-4 h-4 text-muted-foreground/50" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground leading-tight line-clamp-1">{cat.name}</p>
                      {cat.description && (
                        <p className="text-[10px] text-muted-foreground line-clamp-1 mt-0.5">{cat.description}</p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className="font-mono text-xs text-muted-foreground">{cat.slug}</span>
                </td>
                <td className="px-4 py-3 hidden lg:table-cell">
                  <span className="text-xs text-muted-foreground">{cat.parentName ?? "—"}</span>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-accent/10 text-accent">
                    {cat.productCount}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {cat.isActive ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide bg-emerald-500/15 text-emerald-600 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" /> Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                      <XCircle className="w-3 h-3" /> Inactive
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <CategoryRowActions category={cat} parentOptions={parentOptions} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
