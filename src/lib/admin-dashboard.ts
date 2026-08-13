

import { db } from "@/db";
import { orders, users, products, productVariants, productReviews } from "@/db/schema";
import { eq, sql, desc, lte } from "drizzle-orm";

export async function getDashboardKPIs() {
  const [orderStats] = await db.select({
    totalRevenue: sql<string>`coalesce(sum(total)::text, '0.00')`,
    totalOrders:  sql<number>`count(*)::int`,
    pendingOrders: sql<number>`count(*) filter (where status = 'pending')::int`,
    processingOrders: sql<number>`count(*) filter (where status = 'processing')::int`,
  }).from(orders);

  const [customerStats] = await db.select({
    totalCustomers: sql<number>`count(*)::int`,
    activeCustomers: sql<number>`count(*) filter (where status = 'active')::int`,
  }).from(users).where(eq(users.role, "customer"));

  const [inventoryStats] = await db.select({
    lowStockCount: sql<number>`count(*) filter (where stock > 0 and stock <= low_stock_threshold)::int`,
    outOfStockCount: sql<number>`count(*) filter (where stock = 0)::int`,
  }).from(productVariants);

  const [reviewStats] = await db.select({
    pendingReviews: sql<number>`count(*) filter (where status = 'pending')::int`,
  }).from(productReviews);

  const [productStats] = await db.select({
    totalProducts: sql<number>`count(*)::int`,
    activeProducts: sql<number>`count(*) filter (where status = 'active')::int`,
  }).from(products);

  return {
    totalRevenue: orderStats?.totalRevenue ?? "0.00",
    totalOrders: orderStats?.totalOrders ?? 0,
    pendingOrders: orderStats?.pendingOrders ?? 0,
    processingOrders: orderStats?.processingOrders ?? 0,
    totalCustomers: customerStats?.totalCustomers ?? 0,
    activeCustomers: customerStats?.activeCustomers ?? 0,
    lowStockCount: inventoryStats?.lowStockCount ?? 0,
    outOfStockCount: inventoryStats?.outOfStockCount ?? 0,
    pendingReviews: reviewStats?.pendingReviews ?? 0,
    totalProducts: productStats?.totalProducts ?? 0,
    activeProducts: productStats?.activeProducts ?? 0,
  };
}

export async function getRecentOrders(limit = 6) {
  return db
    .select({
      id: orders.id,
      orderNumber: orders.orderNumber,
      customerName: users.name,
      customerEmail: users.email,
      status: orders.status,
      paymentStatus: orders.paymentStatus,
      total: orders.total,
      createdAt: orders.createdAt,
    })
    .from(orders)
    .leftJoin(users, eq(orders.userId, users.id))
    .orderBy(desc(orders.createdAt))
    .limit(limit);
}

export async function getCriticalStockVariants(limit = 5) {
  return db
    .select({
      variantId: productVariants.id,
      variantName: productVariants.name,
      variantSku: productVariants.sku,
      stock: productVariants.stock,
      lowStockThreshold: productVariants.lowStockThreshold,
      productName: products.name,
    })
    .from(productVariants)
    .innerJoin(products, eq(productVariants.productId, products.id))
    .where(lte(productVariants.stock, productVariants.lowStockThreshold))
    .orderBy(productVariants.stock)
    .limit(limit);
}
