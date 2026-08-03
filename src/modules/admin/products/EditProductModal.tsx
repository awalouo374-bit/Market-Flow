"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Package } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { BrandButton } from "@/components/shared/BrandButton";
import { ProductFormFields, type ProductDefaultValues } from "./ProductFormFields";
import { editProductAction } from "@/actions/editProductAction";
import { toast } from "sonner";

interface SelectOption { id: string; name: string; }

interface EditProductModalProps {
  productId: string;
  defaults: ProductDefaultValues;
  categories: SelectOption[];
  brands: SelectOption[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditProductModal({
  productId,
  defaults,
  categories,
  brands,
  open,
  onOpenChange,
}: EditProductModalProps) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await editProductAction(productId, {
        name: fd.get("name") as string,
        sku: fd.get("sku") as string,
        price: fd.get("price") as string,
        compareAtPrice: fd.get("compareAtPrice") as string,
        costPrice: fd.get("costPrice") as string,
        description: fd.get("description") as string,
        categoryId: fd.get("categoryId") as string,
        brandId: fd.get("brandId") as string,
        status: fd.get("status") as "draft" | "active" | "archived",
        isFeatured: fd.get("isFeatured") === "on",
        imageUrl: fd.get("imageUrl") as string,
        imageAlt: fd.get("imageAlt") as string,
        variantName: fd.get("variantName") as string,
        variantSku: fd.get("variantSku") as string,
        variantStock: fd.get("variantStock") as string,
        lowStockThreshold: fd.get("lowStockThreshold") as string,
      });

      if (result.error) {
        setError(result.error);
        return;
      }

      toast.success("Product updated successfully");
      onOpenChange(false);
      router.refresh();
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="sm:max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-accent/10 text-accent">
              <Package className="w-4 h-4" />
            </div>
            <div>
              <DialogTitle className="text-base font-bold">Edit Product</DialogTitle>
              <DialogDescription className="text-xs mt-0.5">
                Update the product details below.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form ref={formRef} onSubmit={handleSubmit} id="edit-product-form">
          <ProductFormFields categories={categories} brands={brands} defaults={defaults} />
          {error && (
            <p className="mt-3 text-xs text-destructive bg-destructive/10 rounded-xl px-3 py-2">
              {error}
            </p>
          )}
        </form>

        <DialogFooter>
          <BrandButton
            variant="ghost"
            size="sm"
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </BrandButton>
          <BrandButton
            variant="flow"
            size="sm"
            type="submit"
            form="edit-product-form"
            disabled={isPending}
            className="gap-2"
          >
            <Pencil className="w-3.5 h-3.5" />
            {isPending ? "Saving…" : "Save Changes"}
          </BrandButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
