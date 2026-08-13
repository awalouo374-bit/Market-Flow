"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getCustomerDetail } from "@/lib/admin-customers";
import type { CustomerRole, CustomerStatus } from "@/lib/admin-customers";

export async function updateCustomerAction(params: {
  userId: string;
  role?: CustomerRole;
  status?: CustomerStatus;
}) {
  const { userId, role, status } = params;
  const update: Record<string, unknown> = { updatedAt: new Date() };
  if (role)   update.role   = role;
  if (status) update.status = status;

  try {
    await db.update(users).set(update).where(eq(users.id, userId));
    revalidatePath("/admin/customers");
    return { success: true };
  } catch {
    return { error: "Failed to update customer." };
  }
}

export async function getCustomerDetailAction(id: string) {
  return getCustomerDetail(id);
}
