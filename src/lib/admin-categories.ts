

import { db } from "@/db";
import { categories, products } from "@/db/schema";
import { eq, ilike, sql, asc, desc, or } from "drizzle-orm";

export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  isActive: boolean;
  parentId: string | null;
  parentName: string | null;
  productCount: number;
  createdAt: Date;
}

export interface CategoryFormValues {
  name: string;
  description: string;
  imageUrl: string;
  parentId: string;
  isActive: boolean;
}

export async function getAdminCategories(params: {
  search?: string;
  page?: number;
  perPage?: number;
}): Promise<{ items: AdminCategory[]; total: number; totalPages: number }> {
  const { search, page = 1, perPage = 20 } = params;
  const offset = (page - 1) * perPage;

  const parent = categories;
  const child = db
    .select({
      id: categories.id,
      name: categories.name,
      slug: categories.slug,
      description: categories.description,
      imageUrl: categories.imageUrl,
      isActive: categories.isActive,
      parentId: categories.parentId,
      createdAt: categories.createdAt,
    })
    .from(categories)
    .as("child");

  const where = search
    ? or(ilike(categories.name, `%${search}%`), ilike(categories.slug, `%${search}%`))
    : undefined;

  const rows = await db
    .select({
      id: categories.id,
      name: categories.name,
      slug: categories.slug,
      description: categories.description,
      imageUrl: categories.imageUrl,
      isActive: categories.isActive,
      parentId: categories.parentId,
      parentName: sql<string | null>`(
        select name from categories p where p.id = ${categories.parentId}
      )`,
      productCount: sql<number>`(
        select count(*) from products pr where pr.category_id = ${categories.id}
      )::int`,
      createdAt: categories.createdAt,
    })
    .from(categories)
    .where(where)
    .orderBy(asc(categories.name))
    .limit(perPage)
    .offset(offset);

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(categories)
    .where(where);

  return { items: rows, total: count, totalPages: Math.ceil(count / perPage) };
}

export async function getParentCategoryOptions() {
  return db
    .select({ id: categories.id, name: categories.name })
    .from(categories)
    .where(eq(categories.isActive, true))
    .orderBy(asc(categories.name));
}
