"use server";

import { db } from "@/db";
import { products, categories, brands, productImages, productVariants } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export interface ProductFormData {
  name: string;
  sku: string;
  price: string;
  compareAtPrice: string;
  costPrice: string;
  description: string;
  categoryId: string;
  brandId: string;
  status: "draft" | "active" | "archived";
  isFeatured: boolean;
  imageUrl: string;
  imageAlt: string;
  variantName: string;
  variantSku: string;
  variantStock: string;
  lowStockThreshold: string;
}

export async function createProductAction(data: ProductFormData) {
  if (!data.name.trim() || !data.sku.trim() || !data.price) {
    return { error: "Name, SKU and price are required." };
  }

  const slug = data.name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  try {
    const [product] = await db.insert(products).values({
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
    }).returning({ id: products.id });

    if (data.imageUrl.trim()) {
      await db.insert(productImages).values({
        productId: product.id,
        url: data.imageUrl.trim(),
        altText: data.imageAlt.trim() || data.name.trim(),
        isPrimary: true,
        displayOrder: 1,
      });
    }

    if (data.variantName.trim() || data.variantSku.trim()) {
      await db.insert(productVariants).values({
        productId: product.id,
        name: data.variantName.trim() || "Default",
        sku: (data.variantSku.trim() || `${data.sku.trim()}-DEFAULT`).toUpperCase(),
        price: data.price,
        stock: parseInt(data.variantStock || "0", 10),
        lowStockThreshold: parseInt(data.lowStockThreshold || "5", 10),
      });
    }

    revalidatePath("/admin/products");
    return { success: true };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "";
    if (msg.includes("unique")) return { error: "A product with this SKU or name already exists." };
    return { error: "Failed to create product. Please try again." };
  }
}

export async function getFormSelectOptions() {
  const [cats, brnds] = await Promise.all([
    db.select({ id: categories.id, name: categories.name }).from(categories)
      .where(eq(categories.isActive, true)).orderBy(asc(categories.name)),
    db.select({ id: brands.id, name: brands.name }).from(brands).orderBy(asc(brands.name)),
  ]);
  return { categories: cats, brands: brnds };
}
