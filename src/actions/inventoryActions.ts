"use server";

import { db } from "@/db";
import { productVariants, inventoryLogs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getConnectedUser } from "@/lib/session";
import type { LogType } from "@/lib/admin-inventory";

export async function adjustStockAction(params: {
  variantId: string;
  type: LogType;
  quantity: number;
  notes: string;
}) {
  const { variantId, type, quantity, notes } = params;

  if (!quantity || quantity === 0) return { error: "Quantity cannot be zero." };

  const user = await getConnectedUser();

  const variant = await db.query.productVariants.findFirst({
    where: eq(productVariants.id, variantId),
  });

  if (!variant) return { error: "Variant not found." };

  const delta = ["sale", "damaged"].includes(type) ? -Math.abs(quantity) : Math.abs(quantity);
  const newStock = Math.max(0, variant.stock + delta);

  try {
    await db.update(productVariants)
      .set({ stock: newStock })
      .where(eq(productVariants.id, variantId));

    await db.insert(inventoryLogs).values({
      variantId,
      changeQuantity: delta,
      type,
      notes: notes.trim() || null,
      performedBy: user?.id ?? null,
    });

    revalidatePath("/admin/inventory");
    return { success: true, newStock };
  } catch {
    return { error: "Failed to adjust stock." };
  }
}
