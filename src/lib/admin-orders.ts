import { db } from "@/db";
import { orders, users, orderItems } from "@/db/schema";
import { eq, ilike, sql, desc, or } from "drizzle-orm";

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded";
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";
export type FulfillmentStatus = "unfulfilled" | "partially_fulfilled" | "fulfilled";

export interface AdminOrder {
  id: string;
  orderNumber: string;
  customerName: string | null;
  customerEmail: string | null;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  fulfillmentStatus: FulfillmentStatus;
  total: string;
  itemCount: number;
  createdAt: Date;
}

export interface AdminOrderDetail extends AdminOrder {
  subtotal: string;
  tax: string;
  shippingFee: string;
  discountTotal: string;
  notes: string | null;
  shippingAddress: Record<string, string> | null;
  items: {
    id: string;
    productName: string;
    variantName: string | null;
    sku: string;
    price: string;
    quantity: number;
    total: string;
  }[];
}

export async function getAdminOrders(params: {
  search?: string;
  status?: string;
  page?: number;
  perPage?: number;
}): Promise<{ items: AdminOrder[]; total: number; totalPages: number }> {
  const { search, status, page = 1, perPage = 25 } = params;
  const offset = (page - 1) * perPage;

  const conditions = [];
  if (search) conditions.push(or(ilike(orders.orderNumber, `%${search}%`), ilike(users.email, `%${search}%`), ilike(users.name, `%${search}%`)));
  if (status && status !== "all") conditions.push(eq(orders.status, status as OrderStatus));
  const where = conditions.length > 0 ? sql`${conditions.reduce((a, b) => sql`${a} AND ${b}`)}` : undefined;

  const rows = await db
    .select({
      id: orders.id,
      orderNumber: orders.orderNumber,
      customerName: users.name,
      customerEmail: users.email,
      status: orders.status,
      paymentStatus: orders.paymentStatus,
      fulfillmentStatus: orders.fulfillmentStatus,
      total: orders.total,
      itemCount: sql<number>`(select count(*) from order_items oi where oi.order_id = ${orders.id})::int`,
      createdAt: orders.createdAt,
    })
    .from(orders)
    .leftJoin(users, eq(orders.userId, users.id))
    .where(where)
    .orderBy(desc(orders.createdAt))
    .limit(perPage)
    .offset(offset);

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(orders)
    .leftJoin(users, eq(orders.userId, users.id))
    .where(where);

  return { items: rows, total: count, totalPages: Math.ceil(count / perPage) };
}

export async function getOrderDetail(id: string): Promise<AdminOrderDetail | null> {
  const order = await db.query.orders.findFirst({
    where: eq(orders.id, id),
    with: { user: true, items: true },
  });
  if (!order) return null;

  return {
    id: order.id,
    orderNumber: order.orderNumber,
    customerName: order.user?.name ?? null,
    customerEmail: order.user?.email ?? null,
    status: order.status as OrderStatus,
    paymentStatus: order.paymentStatus as PaymentStatus,
    fulfillmentStatus: order.fulfillmentStatus as FulfillmentStatus,
    total: order.total,
    subtotal: order.subtotal,
    tax: order.tax,
    shippingFee: order.shippingFee,
    discountTotal: order.discountTotal,
    notes: order.notes,
    shippingAddress: order.shippingAddress as Record<string, string> | null,
    itemCount: order.items.length,
    createdAt: order.createdAt,
    items: order.items.map((i) => ({
      id: i.id,
      productName: i.productName,
      variantName: i.variantName,
      sku: i.sku,
      price: i.price,
      quantity: i.quantity,
      total: i.total,
    })),
  };
}
