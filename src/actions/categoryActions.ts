"use server";

import { db } from "@/db";
import { categories } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import type { CategoryFormValues } from "@/lib/admin-categories";

function toSlug(name: string) {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export async function createCategoryAction(data: CategoryFormValues) {
  if (!data.name.trim()) return { error: "Category name is required." };

  try {
    await db.insert(categories).values({
      name: data.name.trim(),
      slug: toSlug(data.name),
      description: data.description.trim() || null,
      imageUrl: data.imageUrl.trim() || null,
      parentId: data.parentId || null,
      isActive: data.isActive,
    });
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "";
    if (msg.includes("unique")) return { error: "A category with this name already exists." };
    return { error: "Failed to create category." };
  }
}

export async function editCategoryAction(id: string, data: CategoryFormValues) {
  if (!data.name.trim()) return { error: "Category name is required." };

  try {
    await db.update(categories).set({
      name: data.name.trim(),
      slug: toSlug(data.name),
      description: data.description.trim() || null,
      imageUrl: data.imageUrl.trim() || null,
      parentId: data.parentId || null,
      isActive: data.isActive,
      updatedAt: new Date(),
    }).where(eq(categories.id, id));
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "";
    if (msg.includes("unique")) return { error: "A category with this name already exists." };
    return { error: "Failed to update category." };
  }
}

export async function deleteCategoryAction(id: string) {
  await db.delete(categories).where(eq(categories.id, id));
  revalidatePath("/admin/categories");
}
