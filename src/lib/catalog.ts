/**
 * Catalog data-fetching helpers — server-side only (RSC)
 * All functions run on the server and query Neon via Drizzle.
 */

import { db } from "@/db";
import { products, categories, brands, productImages, productVariants } from "@/db/schema";
import { eq, and, ilike, inArray, sql, asc, desc, or, gte, lte, isNotNull } from "drizzle-orm";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface CatalogProduct {
  id: string;
  name: string;
  slug: string;
  sku: string;
  description: string | null;
  price: string;
  compareAtPrice: string | null;
  isFeatured: boolean;
  status: string;
  categoryId: string | null;
  brandId: string | null;
  categoryName: string | null;
  brandName: string | null;
  primaryImage: string | null;
  primaryImageAlt: string | null;
  lowestVariantPrice: string | null;
  totalStock: number;
  createdAt: Date;
}

export interface CatalogCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  parentId: string | null;
  productCount: number;
}

export interface CatalogFilters {
  search?: string;
  categorySlug?: string;
  brandId?: string;
  featured?: boolean;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "newest" | "price_asc" | "price_desc" | "name_asc";
  page?: number;
  perPage?: number;
  dealsOnly?: boolean;
}

export interface CatalogBrand {
  id: string;
  name: string;
  slug: string;
  logoUrl: string | null;
}

export interface PaginatedProducts {
  items: CatalogProduct[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

// ── Catalog Products ──────────────────────────────────────────────────────────

export async function getCatalogProducts(
  filters: CatalogFilters = {}
): Promise<PaginatedProducts> {
  const {
    search,
    categorySlug,
    brandId,
    featured,
    minPrice,
    maxPrice,
    sortBy = "newest",
    page = 1,
    perPage = 12,
    dealsOnly,
  } = filters;

  const offset = (page - 1) * perPage;

  // Resolve category id from slug if provided
  let categoryId: string | null = null;
  if (categorySlug) {
    const cat = await db.query.categories.findFirst({
      where: eq(categories.slug, categorySlug),
    });
    categoryId = cat?.id ?? null;
  }

  // Build where conditions
  const conditions = [eq(products.status, "active")];

  if (search) {
    conditions.push(
      or(
        ilike(products.name, `%${search}%`),
        ilike(products.description, `%${search}%`)
      ) as ReturnType<typeof eq>
    );
  }

  if (categoryId) {
    conditions.push(eq(products.categoryId, categoryId));
  }

  if (brandId) {
    conditions.push(eq(products.brandId, brandId));
  }

  if (featured) {
    conditions.push(eq(products.isFeatured, true));
  }

  if (dealsOnly) {
    conditions.push(isNotNull(products.compareAtPrice));
  }

  const whereClause = conditions.length > 1 ? and(...conditions) : conditions[0];

  // Order
  const orderMap = {
    newest: desc(products.createdAt),
    price_asc: asc(products.price),
    price_desc: desc(products.price),
    name_asc: asc(products.name),
  };

  // Fetch products
  const rows = await db
    .select({
      id: products.id,
      name: products.name,
      slug: products.slug,
      sku: products.sku,
      description: products.description,
      price: products.price,
      compareAtPrice: products.compareAtPrice,
      isFeatured: products.isFeatured,
      status: products.status,
      categoryId: products.categoryId,
      brandId: products.brandId,
      categoryName: categories.name,
      brandName: brands.name,
      createdAt: products.createdAt,
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .leftJoin(brands, eq(products.brandId, brands.id))
    .where(whereClause)
    .orderBy(orderMap[sortBy])
    .limit(perPage)
    .offset(offset);

  // Count total
  const [{ count }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .where(whereClause);

  // Fetch primary images for all products in one query
  const productIds = rows.map((r) => r.id);
  const images =
    productIds.length > 0
      ? await db
          .select({
            productId: productImages.productId,
            url: productImages.url,
            altText: productImages.altText,
          })
          .from(productImages)
          .where(
            and(
              inArray(productImages.productId, productIds),
              eq(productImages.isPrimary, true)
            )
          )
      : [];

  // Fetch variant stock totals
  const variantStocks =
    productIds.length > 0
      ? await db
          .select({
            productId: productVariants.productId,
            totalStock: sql<number>`sum(${productVariants.stock})::int`,
            lowestPrice: sql<string>`min(${productVariants.price})::text`,
          })
          .from(productVariants)
          .where(inArray(productVariants.productId, productIds))
          .groupBy(productVariants.productId)
      : [];

  const imageMap = new Map(images.map((i) => [i.productId, i]));
  const stockMap = new Map(variantStocks.map((v) => [v.productId, v]));

  const items: CatalogProduct[] = rows.map((r) => {
    const img = imageMap.get(r.id);
    const stock = stockMap.get(r.id);
    return {
      ...r,
      primaryImage: img?.url ?? null,
      primaryImageAlt: img?.altText ?? null,
      lowestVariantPrice: stock?.lowestPrice ?? null,
      totalStock: stock?.totalStock ?? 0,
    };
  });

  return {
    items,
    total: count,
    page,
    perPage,
    totalPages: Math.ceil(count / perPage),
  };
}

// ── Categories ────────────────────────────────────────────────────────────────

export async function getCatalogCategories(): Promise<CatalogCategory[]> {
  const rows = await db
    .select({
      id: categories.id,
      name: categories.name,
      slug: categories.slug,
      description: categories.description,
      imageUrl: categories.imageUrl,
      parentId: categories.parentId,
      productCount: sql<number>`count(${products.id})::int`,
    })
    .from(categories)
    .leftJoin(
      products,
      and(eq(products.categoryId, categories.id), eq(products.status, "active"))
    )
    .where(eq(categories.isActive, true))
    .groupBy(
      categories.id,
      categories.name,
      categories.slug,
      categories.description,
      categories.imageUrl,
      categories.parentId
    )
    .orderBy(asc(categories.name));

  return rows;
}

// ── Brands ────────────────────────────────────────────────────────────────────

export async function getCatalogBrands() {
  return db
    .select({
      id: brands.id,
      name: brands.name,
      slug: brands.slug,
      logoUrl: brands.logoUrl,
    })
    .from(brands)
    .orderBy(asc(brands.name));
}

// ── Single Product ────────────────────────────────────────────────────────────

export async function getProductBySlug(slug: string) {
  const product = await db.query.products.findFirst({
    where: and(eq(products.slug, slug), eq(products.status, "active")),
    with: {
      category: true,
      brand: true,
      images: { orderBy: (i, { asc }) => [asc(i.displayOrder)] },
      variants: true,
    },
  });

  return product ?? null;
}

// ── Featured Products ─────────────────────────────────────────────────────────

export async function getFeaturedProducts(limit = 8): Promise<CatalogProduct[]> {
  const result = await getCatalogProducts({ featured: true, perPage: limit });
  return result.items;
}

// ── Deals Products ────────────────────────────────────────────────────────────

export async function getDealsProducts(
  filters: CatalogFilters = {}
): Promise<PaginatedProducts> {
  return getCatalogProducts({ ...filters, dealsOnly: true });
}

// ── Categories Hub — root categories with their children ─────────────────────

export interface CategoryWithChildren extends CatalogCategory {
  children: CatalogCategory[];
}

export async function getCategoriesWithChildren(): Promise<CategoryWithChildren[]> {
  // Single query: all active categories with product counts
  const all = await getCatalogCategories();

  // Separate roots and children
  const roots = all.filter((c) => c.parentId === null);
  const childMap = new Map<string, CatalogCategory[]>();

  for (const cat of all) {
    if (cat.parentId) {
      const list = childMap.get(cat.parentId) ?? [];
      list.push(cat);
      childMap.set(cat.parentId, list);
    }
  }

  return roots.map((root) => ({
    ...root,
    children: childMap.get(root.id) ?? [],
  }));
}
