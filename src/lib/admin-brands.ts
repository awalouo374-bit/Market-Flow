

import { db } from "@/db";
import { brands, products } from "@/db/schema";
import { ilike, sql, asc, or } from "drizzle-orm";

export interface AdminBrand {
  id: string;
  name: string;
  slug: string;
  logoUrl: string | null;
  website: string | null;
  productCount: number;
  createdAt: Date;
}

export interface BrandFormValues {
  name: string;
  logoUrl: string;
  website: string;
}

export async function getAdminBrands(params: {
  search?: string;
  page?: number;
  perPage?: number;
}): Promise<{ items: AdminBrand[]; total: number; totalPages: number }> {
  const { search, page = 1, perPage = 20 } = params;
  const offset = (page - 1) * perPage;

  const where = search
    ? or(ilike(brands.name, `%${search}%`), ilike(brands.slug, `%${search}%`))
    : undefined;

  const rows = await db
    .select({
      id: brands.id,
      name: brands.name,
      slug: brands.slug,
      logoUrl: brands.logoUrl,
      website: brands.website,
      createdAt: brands.createdAt,
      productCount: sql<number>`(
        select count(*) from products pr where pr.brand_id = ${brands.id}
      )::int`,
    })
    .from(brands)
    .where(where)
    .orderBy(asc(brands.name))
    .limit(perPage)
    .offset(offset);

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(brands)
    .where(where);

  return { items: rows, total: count, totalPages: Math.ceil(count / perPage) };
}
