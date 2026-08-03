"use server";

import { db } from "@/db";
import { products, productImages, productVariants } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import type { ProductFormData } from "./createProductAction";

export async function editProductAction(id: string, data: ProductFormData) {
  if (!data.name.trim() || !data.sku.trim() || !data.price) {
    return { error: "Name, SKU and price are required." };
  }

  const slug = data.name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  try {
    await db.update(products).set({
      name: data.name.trim(),
      slug,
      sku: data.sku.trim().toUpperCase(),
      description: data.description.trim() || null,
      price: data.price,
      compareAtPrice: data.compareAtPrice || null,
      costPrice: data.costPrice || null,
      categoryId: data.categoryId || null,
      brandId: data.brandId || null,
      status: data.status,
      isFeatured: data.isFeatured,
      updatedAt: new Date(),
    }).where(eq(products.id, id));

    if (data.imageUrl.trim()) {
      const existing = await db.query.productImages.findFirst({
        where: and(eq(productImages.productId, id), eq(productImages.isPrimary, true)),
      });

      if (existing) {
        await db.update(productImages)
          .set({ url: data.imageUrl.trim(), altText: data.imageAlt.trim() || data.name.trim() })
          .where(eq(productImages.id, existing.id));
      } else {
        await db.insert(productImages).values({
          productId: id,
          url: data.imageUrl.trim(),
          altText: data.imageAlt.trim() || data.name.trim(),
          isPrimary: true,
          displayOrder: 1,
        });
      }
    }

    if (data.variantSku.trim()) {
      const existingVariant = await db.query.productVariants.findFirst({
        where: eq(productVariants.productId, id),
        orderBy: (v, { asc }) => [asc(v.createdAt)],
      });

      if (existingVariant) {
        await db.update(productVariants).set({
          name: data.variantName.trim() || existingVariant.name,
          stock: parseInt(data.variantStock || "0", 10),
          lowStockThreshold: parseInt(data.lowStockThreshold || "5", 10),
          price: data.price,
        }).where(eq(productVariants.id, existingVariant.id));
      } else {
        await db.insert(productVariants).values({
          productId: id,
          name: data.variantName.trim() || "Default",
          sku: data.variantSku.trim().toUpperCase(),
          price: data.price,
          stock: parseInt(data.variantStock || "0", 10),
          lowStockThreshold: parseInt(data.lowStockThreshold || "5", 10),
        });
      }
    }

    revalidatePath("/admin/products");
    return { success: true };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "";
    if (msg.includes("unique")) return { error: "Another product with this SKU or name already exists." };
    return { error: "Failed to update product. Please try again." };
  }
}
