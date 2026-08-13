

import { db } from "@/db";
import { products, categories, brands, productVariants, productImages } from "@/db/schema";
import { eq, and, ilike, inArray, sql, asc, desc, or } from "drizzle-orm";

export type ProductStatus = "draft" | "active" | "archived";

export interface AdminProduct {
  id: string;
  name: string;
  slug: string;
  sku: string;
  price: string;
  compareAtPrice: string | null;
  status: ProductStatus;
  isFeatured: boolean;
  categoryName: string | null;
  brandName: string | null;
  primaryImage: string | null;
  variantCount: number;
  totalStock: number;
  createdAt: Date;
}

export interface AdminProductsResult {
  items: AdminProduct[];
  total: number;
  totalPages: number;
}

export async function getAdminProducts(params: {
  search?: string;
  status?: string;
  sortBy?: string;
  page?: number;
  perPage?: number;
}): Promise<AdminProductsResult> {
  const { search, status, sortBy = "newest", page = 1, perPage = 20 } = params;
  const offset = (page - 1) * perPage;

  const conditions = [];

  if (search) {
    conditions.push(
      or(
        ilike(products.name, `%${search}%`),
        ilike(products.sku, `%${search}%`)
      )
    );
  }

  if (status && ["draft", "active", "archived"].includes(status)) {
    conditions.push(eq(products.status, status as ProductStatus));
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  const orderMap: Record<string, ReturnType<typeof asc>> = {
    newest: desc(products.createdAt),
    oldest: asc(products.createdAt),
    name_asc: asc(products.name),
    price_asc: asc(products.price),
    price_desc: desc(products.price),
  };

  const rows = await db
    .select({
      id: products.id,
      name: products.name,
      slug: products.slug,
      sku: products.sku,
      price: products.price,
      compareAtPrice: products.compareAtPrice,
      status: products.status,
      isFeatured: products.isFeatured,
      categoryName: categories.name,
      brandName: brands.name,
      createdAt: products.createdAt,
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .leftJoin(brands, eq(products.brandId, brands.id))
    .where(whereClause)
    .orderBy(orderMap[sortBy] ?? desc(products.createdAt))
    .limit(perPage)
    .offset(offset);

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(products)
    .where(whereClause);

  const ids = rows.map((r) => r.id);

  const [images, variants] = ids.length > 0
    ? await Promise.all([
        db.select({ productId: productImages.productId, url: productImages.url })
          .from(productImages)
          .where(and(inArray(productImages.productId, ids), eq(productImages.isPrimary, true))),
        db.select({
            productId: productVariants.productId,
            variantCount: sql<number>`count(*)::int`,
            totalStock: sql<number>`sum(${productVariants.stock})::int`,
          })
          .from(productVariants)
          .where(inArray(productVariants.productId, ids))
          .groupBy(productVariants.productId),
      ])
    : [[], []];

  const imgMap = new Map(images.map((i) => [i.productId, i.url]));
  const varMap = new Map(variants.map((v) => [v.productId, v]));

  return {
    items: rows.map((r) => ({
      ...r,
      primaryImage: imgMap.get(r.id) ?? null,
      variantCount: varMap.get(r.id)?.variantCount ?? 0,
      totalStock: varMap.get(r.id)?.totalStock ?? 0,
    })),
    total: count,
    totalPages: Math.ceil(count / perPage),
  };
}

export async function deleteProduct(id: string) {
  await db.delete(products).where(eq(products.id, id));
}

export async function getProductEditDefaults(id: string) {
  const product = await db.query.products.findFirst({
    where: eq(products.id, id),
    with: {
      images: { where: eq(productImages.isPrimary, true), limit: 1 },
      variants: { orderBy: (v, { asc }) => [asc(v.createdAt)], limit: 1 },
    },
  });
  return product ?? null;
}
