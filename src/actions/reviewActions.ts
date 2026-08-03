"use server";

import { db } from "@/db";
import { productReviews } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import type { ReviewStatus } from "@/lib/admin-reviews";

export async function updateReviewStatusAction(id: string, status: ReviewStatus) {
  try {
    await db.update(productReviews).set({ status }).where(eq(productReviews.id, id));
    revalidatePath("/admin/reviews");
    return { success: true };
  } catch {
    return { error: "Failed to update review." };
  }
}

export async function bulkUpdateReviewStatusAction(ids: string[], status: ReviewStatus) {
  if (ids.length === 0) return { error: "No reviews selected." };
  try {
    await db.update(productReviews).set({ status }).where(inArray(productReviews.id, ids));
    revalidatePath("/admin/reviews");
    return { success: true };
  } catch {
    return { error: "Failed to update reviews." };
  }
}

export async function deleteReviewAction(id: string) {
  try {
    await db.delete(productReviews).where(eq(productReviews.id, id));
    revalidatePath("/admin/reviews");
    return { success: true };
  } catch {
    return { error: "Failed to delete review." };
  }
}
