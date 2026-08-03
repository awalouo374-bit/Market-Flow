"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FolderTree, Plus } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { BrandButton } from "@/components/shared/BrandButton";
import { CategoryFormFields, type CategoryDefaults } from "./CategoryFormFields";
import { createCategoryAction, editCategoryAction } from "@/actions/categoryActions";
import { toast } from "sonner";

interface SelectOption { id: string; name: string; }

interface CategoryModalProps {
  mode: "create" | "edit";
  categoryId?: string;
  defaults?: CategoryDefaults;
  parentOptions: SelectOption[];
  open: boolean;
  onOpenChange: (v: boolean) => void;
  trigger?: React.ReactNode;
}

export function CategoryModal({
  mode, categoryId, defaults, parentOptions, open, onOpenChange, trigger,
}: CategoryModalProps) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const data = {
      name: fd.get("name") as string,
      description: fd.get("description") as string,
      imageUrl: fd.get("imageUrl") as string,
      parentId: fd.get("parentId") as string,
      isActive: fd.get("isActive") === "on",
    };

    startTransition(async () => {
      const result = mode === "create"
        ? await createCategoryAction(data)
        : await editCategoryAction(categoryId!, data);

      if (result.error) { setError(result.error); return; }

      toast.success(mode === "create" ? "Category created" : "Category updated");
      if (mode === "create") formRef.current?.reset();
      onOpenChange(false);
      router.refresh();
    });
  };

  const isCreate = mode === "create";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <div onClick={() => onOpenChange(true)}>{trigger}</div>}

      <DialogContent showCloseButton className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-accent/10 text-accent">
              <FolderTree className="w-4 h-4" />
            </div>
            <div>
              <DialogTitle className="text-base font-bold">
                {isCreate ? "Create Category" : "Edit Category"}
              </DialogTitle>
              <DialogDescription className="text-xs mt-0.5">
                {isCreate ? "Add a new product category to the catalog." : "Update the category details below."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form ref={formRef} onSubmit={handleSubmit} id="category-form">
          <CategoryFormFields
            parentOptions={parentOptions}
            defaults={defaults}
            currentId={categoryId}
          />
          {error && (
            <p className="mt-3 text-xs text-destructive bg-destructive/10 rounded-xl px-3 py-2">
              {error}
            </p>
          )}
        </form>

        <DialogFooter>
          <BrandButton variant="ghost" size="sm" type="button" onClick={() => onOpenChange(false)} disabled={isPending}>
            Cancel
          </BrandButton>
          <BrandButton variant="flow" size="sm" type="submit" form="category-form" disabled={isPending} className="gap-2">
            {isPending ? "Saving…" : isCreate ? "Create Category" : "Save Changes"}
          </BrandButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
