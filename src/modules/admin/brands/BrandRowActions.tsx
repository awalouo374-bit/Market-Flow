"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal, Pencil, Trash2, Copy } from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConfirmDeleteModal } from "@/components/shared/ConfirmDeleteModal";
import { BrandModal } from "./BrandModal";
import { deleteBrandAction } from "@/actions/brandActions";
import { toast } from "sonner";
import type { AdminBrand } from "@/lib/admin-brands";

export function BrandRowActions({ brand }: { brand: AdminBrand }) {
  const router = useRouter();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteBrandAction(brand.id);
      toast.success("Brand deleted");
      router.refresh();
    } catch {
      toast.error("Failed to delete brand");
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label={`Actions for ${brand.name}`}
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer" onClick={() => setEditOpen(true)}>
            <Pencil className="w-3.5 h-3.5" />
            Edit Brand
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => { navigator.clipboard.writeText(brand.id); toast.success("ID copied"); }}
          >
            <Copy className="w-3.5 h-3.5" />
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex items-center gap-2 text-destructive cursor-pointer"
            onClick={() => setDeleteOpen(true)}
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <BrandModal
        mode="edit"
        brandId={brand.id}
        defaults={{ name: brand.name, logoUrl: brand.logoUrl, website: brand.website }}
        open={editOpen}
        onOpenChange={setEditOpen}
      />

      <ConfirmDeleteModal
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Brand"
        description="Products linked to this brand will have their brand unlinked but not deleted."
        itemName={brand.name}
        onConfirm={handleDelete}
      />
    </>
  );
}
