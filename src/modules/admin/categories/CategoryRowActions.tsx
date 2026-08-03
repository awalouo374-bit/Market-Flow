"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal, Pencil, Trash2, Copy } from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConfirmDeleteModal } from "@/components/shared/ConfirmDeleteModal";
import { CategoryModal } from "./CategoryModal";
import { deleteCategoryAction } from "@/actions/categoryActions";
import { toast } from "sonner";
import type { AdminCategory } from "@/lib/admin-categories";

interface SelectOption { id: string; name: string; }

interface CategoryRowActionsProps {
  category: AdminCategory;
  parentOptions: SelectOption[];
}

export function CategoryRowActions({ category, parentOptions }: CategoryRowActionsProps) {
  const router = useRouter();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteCategoryAction(category.id);
      toast.success("Category deleted");
      router.refresh();
    } catch {
      toast.error("Failed to delete category");
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label={`Actions for ${category.name}`}
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer" onClick={() => setEditOpen(true)}>
            <Pencil className="w-3.5 h-3.5" />
            Edit Category
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => { navigator.clipboard.writeText(category.id); toast.success("ID copied"); }}
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

      <CategoryModal
        mode="edit"
        categoryId={category.id}
        defaults={{
          name: category.name,
          description: category.description,
          imageUrl: category.imageUrl,
          parentId: category.parentId,
          isActive: category.isActive,
        }}
        parentOptions={parentOptions}
        open={editOpen}
        onOpenChange={setEditOpen}
      />

      <ConfirmDeleteModal
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Category"
        description="Products in this category will have their category unlinked but not deleted."
        itemName={category.name}
        onConfirm={handleDelete}
      />
    </>
  );
}
