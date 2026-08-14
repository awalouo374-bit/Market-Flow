

import { db } from "@/db";
import { users, orders } from "@/db/schema";
import { eq, ilike, sql, desc, or, and } from "drizzle-orm";

export type CustomerRole   = "admin" | "manager" | "customer";
export type CustomerStatus = "active" | "suspended";

export interface AdminCustomer {
  id: string;
  name: string | null;
  email: string;
  role: CustomerRole;
  status: CustomerStatus;
  orderCount: number;
  totalSpent: string;
  createdAt: Date;
}

export interface AdminCustomerDetail extends AdminCustomer {
  image: string | null;
  emailVerified: boolean;
  recentOrders: {
    id: string;
    orderNumber: string;
    status: string;
    total: string;
    createdAt: Date;
  }[];
}

export async function getAdminCustomers(params: {
  search?: string;
  role?: string;
  status?: string;
  page?: number;
  perPage?: number;
}): Promise<{ items: AdminCustomer[]; total: number; totalPages: number }> {
  const { search, role, status, page = 1, perPage = 25 } = params;
  const offset = (page - 1) * perPage;

  const conditions = [];
  if (search) conditions.push(or(ilike(users.name, `%${search}%`), ilike(users.email, `%${search}%`)));
  if (role   && role   !== "all") conditions.push(eq(users.role,   role   as CustomerRole));
  if (status && status !== "all") conditions.push(eq(users.status, status as CustomerStatus));
  const where = conditions.length > 0 ? and(...conditions) : undefined;

  const rows = await db
    .select({
      id:         users.id,
      name:       users.name,
      email:      users.email,
      role:       users.role,
      status:     users.status,
      createdAt:  users.createdAt,
      orderCount: sql<number>`(select count(*) from orders o where o.user_id = ${users.id})::int`,
      totalSpent: sql<string>`coalesce((select sum(o.total) from orders o where o.user_id = ${users.id})::text, '0.00')`,
    })
    .from(users)
    .where(where)
    .orderBy(desc(users.createdAt))
    .limit(perPage)
    .offset(offset);

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(users)
    .where(where);

  return { items: rows, total: count, totalPages: Math.ceil(count / perPage) };
}

export async function getCustomerDetail(id: string): Promise<AdminCustomerDetail | null> {
  const user = await db.query.users.findFirst({ where: eq(users.id, id) });
  if (!user) return null;

  const [stats] = await db
    .select({
      orderCount: sql<number>`count(*)::int`,
      totalSpent: sql<string>`coalesce(sum(total)::text, '0.00')`,
    })
    .from(orders)
    .where(eq(orders.userId, id));

  const recentOrders = await db
    .select({ id: orders.id, orderNumber: orders.orderNumber, status: orders.status, total: orders.total, createdAt: orders.createdAt })
    .from(orders)
    .where(eq(orders.userId, id))
    .orderBy(desc(orders.createdAt))
    .limit(5);

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role as CustomerRole,
    status: user.status as CustomerStatus,
    image: user.image,
    emailVerified: user.emailVerified,
    createdAt: user.createdAt,
    orderCount: stats?.orderCount ?? 0,
    totalSpent: stats?.totalSpent ?? "0.00",
    recentOrders,
  };
}
