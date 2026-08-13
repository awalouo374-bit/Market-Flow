"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MoreHorizontal, Pencil, Eye, Trash2, Copy } from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConfirmDeleteModal } from "@/components/shared/ConfirmDeleteModal";
import { EditProductModal } from "./EditProductModal";
import { deleteProductAction, getProductEditDefaultsAction } from "@/actions/editProductAction";
import { toast } from "sonner";
import type { AdminProduct } from "@/lib/admin-products";
import type { ProductDefaultValues } from "./ProductFormFields";

interface SelectOption { id: string; name: string; }

interface ProductRowActionsProps {
  product: AdminProduct;
  categories: SelectOption[];
  brands: SelectOption[];
}

export function ProductRowActions({ product, categories, brands }: ProductRowActionsProps) {
  const router = useRouter();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editDefaults, setEditDefaults] = useState<ProductDefaultValues | null>(null);
  const [isFetching, startFetch] = useTransition();

  const openEdit = () => {
    startFetch(async () => {
      const full = await getProductEditDefaultsAction(product.id);
      setEditDefaults({
        name: product.name,
        sku: product.sku,
        price: product.price,
        compareAtPrice: product.compareAtPrice,
        status: product.status,
        isFeatured: product.isFeatured,
        imageUrl: full?.images?.[0]?.url ?? null,
        imageAlt: full?.images?.[0]?.altText ?? null,
        variantName: full?.variants?.[0]?.name ?? null,
        variantSku: full?.variants?.[0]?.sku ?? null,
        variantStock: full?.variants?.[0]?.stock ?? null,
        lowStockThreshold: full?.variants?.[0]?.lowStockThreshold ?? null,
      });
      setEditOpen(true);
    });
  };

  const handleDelete = async () => {
    try {
      await deleteProductAction(product.id);
      toast.success("Product deleted");
      router.refresh();
    } catch {
      toast.error("Failed to delete product");
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label={`Actions for ${product.name}`}
            disabled={isFetching}
          >
            <MoreHorizontal className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer" onClick={openEdit}>
            <Pencil className="w-3.5 h-3.5" />
            Edit Product
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/products/${product.slug}`} target="_blank" className="flex items-center gap-2 cursor-pointer">
              <Eye className="w-3.5 h-3.5" />
              View in Store
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => { navigator.clipboard.writeText(product.id); toast.success("Product ID copied"); }}
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

      {editDefaults && (
        <EditProductModal
          productId={product.id}
          defaults={editDefaults}
          categories={categories}
          brands={brands}
          open={editOpen}
          onOpenChange={setEditOpen}
        />
      )}

      <ConfirmDeleteModal
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Product"
        description="All variants, images and inventory logs linked to this product will be permanently removed."
        itemName={product.name}
        onConfirm={handleDelete}
      />
    </>
  );
}
