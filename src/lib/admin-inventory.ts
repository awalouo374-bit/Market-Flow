import { db } from "@/db";
import { productVariants, products, inventoryLogs, users } from "@/db/schema";
import { eq, ilike, sql, desc, or } from "drizzle-orm";

export type LogType = "restock" | "sale" | "adjustment" | "return" | "damaged";
export type StockFilter = "all" | "low" | "out";

export interface InventoryVariant {
  variantId: string;
  variantName: string;
  variantSku: string;
  stock: number;
  lowStockThreshold: number;
  productId: string;
  productName: string;
  productSku: string;
}

export interface InventoryLog {
  id: string;
  variantSku: string;
  variantName: string;
  productName: string;
  changeQuantity: number;
  type: LogType;
  notes: string | null;
  performedBy: string | null;
  createdAt: Date;
}

export async function getInventoryVariants(params: {
  search?: string;
  filter?: "all" | "low" | "out";
  page?: number;
  perPage?: number;
}): Promise<{ items: InventoryVariant[]; total: number; totalPages: number }> {
  const { search, filter = "all", page = 1, perPage = 25 } = params;
  const offset = (page - 1) * perPage;

  const conditions: ReturnType<typeof eq>[] = [];

  if (search) {
    conditions.push(
      or(
        ilike(productVariants.sku, `%${search}%`),
        ilike(productVariants.name, `%${search}%`),
        ilike(products.name, `%${search}%`)
      ) as ReturnType<typeof eq>
    );
  }

  if (filter === "low") {
    conditions.push(
      sql`${productVariants.stock} > 0 AND ${productVariants.stock} <= ${productVariants.lowStockThreshold}` as unknown as ReturnType<typeof eq>
    );
  } else if (filter === "out") {
    conditions.push(eq(productVariants.stock, 0));
  }

  const where = conditions.length > 0
    ? sql`${conditions.reduce((a, b) => sql`${a} AND ${b}`)}`
    : undefined;

  const rows = await db
    .select({
      variantId: productVariants.id,
      variantName: productVariants.name,
      variantSku: productVariants.sku,
      stock: productVariants.stock,
      lowStockThreshold: productVariants.lowStockThreshold,
      productId: products.id,
      productName: products.name,
      productSku: products.sku,
    })
    .from(productVariants)
    .innerJoin(products, eq(productVariants.productId, products.id))
    .where(where)
    .orderBy(productVariants.stock)
    .limit(perPage)
    .offset(offset);

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(productVariants)
    .innerJoin(products, eq(productVariants.productId, products.id))
    .where(where);

  return { items: rows, total: count, totalPages: Math.ceil(count / perPage) };
}

export async function getInventoryLogs(params: {
  search?: string;
  page?: number;
  perPage?: number;
}): Promise<{ items: InventoryLog[]; total: number; totalPages: number }> {
  const { search, page = 1, perPage = 25 } = params;
  const offset = (page - 1) * perPage;

  const where = search
    ? or(ilike(productVariants.sku, `%${search}%`), ilike(products.name, `%${search}%`))
    : undefined;

  const rows = await db
    .select({
      id: inventoryLogs.id,
      variantSku: productVariants.sku,
      variantName: productVariants.name,
      productName: products.name,
      changeQuantity: inventoryLogs.changeQuantity,
      type: inventoryLogs.type,
      notes: inventoryLogs.notes,
      performedBy: users.name,
      createdAt: inventoryLogs.createdAt,
    })
    .from(inventoryLogs)
    .innerJoin(productVariants, eq(inventoryLogs.variantId, productVariants.id))
    .innerJoin(products, eq(productVariants.productId, products.id))
    .leftJoin(users, eq(inventoryLogs.performedBy, users.id))
    .where(where)
    .orderBy(desc(inventoryLogs.createdAt))
    .limit(perPage)
    .offset(offset);

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(inventoryLogs)
    .innerJoin(productVariants, eq(inventoryLogs.variantId, productVariants.id))
    .innerJoin(products, eq(productVariants.productId, products.id))
    .where(where);

  return { items: rows, total: count, totalPages: Math.ceil(count / perPage) };
}
