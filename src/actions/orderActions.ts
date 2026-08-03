"use server";

import { db } from "@/db";
import { orders } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import type { OrderStatus, PaymentStatus, FulfillmentStatus } from "@/lib/admin-orders";

export async function updateOrderStatusAction(params: {
  orderId: string;
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  fulfillmentStatus?: FulfillmentStatus;
  notes?: string;
}) {
  const { orderId, status, paymentStatus, fulfillmentStatus, notes } = params;

  const update: Record<string, unknown> = { updatedAt: new Date() };
  if (status) update.status = status;
  if (paymentStatus) update.paymentStatus = paymentStatus;
  if (fulfillmentStatus) update.fulfillmentStatus = fulfillmentStatus;
  if (notes !== undefined) update.notes = notes.trim() || null;

  try {
    await db.update(orders).set(update).where(eq(orders.id, orderId));
    revalidatePath("/admin/orders");
    return { success: true };
  } catch {
    return { error: "Failed to update order." };
  }
}
