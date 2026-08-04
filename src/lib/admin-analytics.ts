import { db } from "@/db";
import { orders, users, orderItems, products, categories } from "@/db/schema";
import { eq, sql, gte, and } from "drizzle-orm";
import { subDays, format } from "date-fns";

export async function getRevenueSeries(days = 30) {
  const since = subDays(new Date(), days);

  const rows = await db
    .select({
      day:     sql<string>`date_trunc('day', created_at)::date::text`,
      revenue: sql<string>`coalesce(sum(total), 0)::text`,
      count:   sql<number>`count(*)::int`,
    })
    .from(orders)
    .where(gte(orders.createdAt, since))
    .groupBy(sql`date_trunc('day', created_at)`)
    .orderBy(sql`date_trunc('day', created_at)`);

  const map = new Map(rows.map((r) => [r.day, r]));

  return Array.from({ length: days }, (_, i) => {
    const d = format(subDays(new Date(), days - 1 - i), "yyyy-MM-dd");
    const row = map.get(d);
    return { day: format(new Date(d), "MMM d"), revenue: parseFloat(row?.revenue ?? "0"), orders: row?.count ?? 0 };
  });
}

export async function getOrderStatusBreakdown() {
  const rows = await db
    .select({
      status: orders.status,
      count:  sql<number>`count(*)::int`,
    })
    .from(orders)
    .groupBy(orders.status)
    .orderBy(sql`count(*) desc`);

  return rows.map((r) => ({ status: r.status, count: r.count }));
}

export async function getTopProducts(limit = 5) {
  const rows = await db
    .select({
      productName: orderItems.productName,
      revenue:     sql<string>`sum(${orderItems.total})::text`,
      unitsSold:   sql<number>`sum(${orderItems.quantity})::int`,
    })
    .from(orderItems)
    .groupBy(orderItems.productName)
    .orderBy(sql`sum(${orderItems.total}) desc`)
    .limit(limit);

  return rows;
}

export async function getCustomerGrowthSeries(days = 30) {
  const since = subDays(new Date(), days);

  const rows = await db
    .select({
      day:   sql<string>`date_trunc('day', created_at)::date::text`,
      count: sql<number>`count(*)::int`,
    })
    .from(users)
    .where(and(gte(users.createdAt, since), eq(users.role, "customer")))
    .groupBy(sql`date_trunc('day', created_at)`)
    .orderBy(sql`date_trunc('day', created_at)`);

  const map = new Map(rows.map((r) => [r.day, r.count]));

  return Array.from({ length: days }, (_, i) => {
    const d = format(subDays(new Date(), days - 1 - i), "yyyy-MM-dd");
    return { day: format(new Date(d), "MMM d"), newCustomers: map.get(d) ?? 0 };
  });
}

export async function getAnalyticsSummary() {
  const now = new Date();
  const thisMonth = subDays(now, 30);
  const lastMonth = subDays(now, 60);

  const period = async (from: Date, to: Date) => {
    const [r] = await db
      .select({
        revenue: sql<string>`coalesce(sum(total), 0)::text`,
        orders:  sql<number>`count(*)::int`,
      })
      .from(orders)
      .where(and(gte(orders.createdAt, from), sql`created_at < ${to}`));
    return r;
  };

  const [current, previous] = await Promise.all([
    period(thisMonth, now),
    period(lastMonth, thisMonth),
  ]);

  const revenueChange = previous?.revenue && parseFloat(previous.revenue) > 0
    ? ((parseFloat(current?.revenue ?? "0") - parseFloat(previous.revenue)) / parseFloat(previous.revenue)) * 100
    : null;

  const ordersChange = previous?.orders && previous.orders > 0
    ? ((( current?.orders ?? 0) - previous.orders) / previous.orders) * 100
    : null;

  return {
    revenue: current?.revenue ?? "0.00",
    orders: current?.orders ?? 0,
    revenueChange,
    ordersChange,
  };
}

export async function getTopCategories(limit = 5) {
  const rows = await db
    .select({
      categoryName: categories.name,
      revenue: sql<string>`sum(${orderItems.total})::text`,
      unitsSold: sql<number>`sum(${orderItems.quantity})::int`,
    })
    .from(orderItems)
    .innerJoin(products, eq(orderItems.productId, products.id))
    .innerJoin(categories, eq(products.categoryId, categories.id))
    .groupBy(categories.name)
    .orderBy(sql`sum(${orderItems.total}) desc`)
    .limit(limit);

  return rows;
}

export async function getNewCustomersCount() {
  const [row] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(users)
    .where(
      and(
        eq(users.role, "customer"),
        gte(users.createdAt, subDays(new Date(), 30)),
      ),
    );
  return row?.count ?? 0;
}

export async function getAvgOrderValue() {
  const [row] = await db
    .select({
      avg: sql<string>`coalesce(avg(total), 0)::text`,
    })
    .from(orders)
    .where(gte(orders.createdAt, subDays(new Date(), 30)));
  return parseFloat(row?.avg ?? "0");
}
