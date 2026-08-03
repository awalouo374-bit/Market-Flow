"use server";

import { db } from "@/db";
import { brands } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import type { BrandFormValues } from "@/lib/admin-brands";

function toSlug(name: string) {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export async function createBrandAction(data: BrandFormValues) {
  if (!data.name.trim()) return { error: "Brand name is required." };
  try {
    await db.insert(brands).values({
      name: data.name.trim(),
      slug: toSlug(data.name),
      logoUrl: data.logoUrl.trim() || null,
      website: data.website.trim() || null,
    });
    revalidatePath("/admin/brands");
    return { success: true };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "";
    if (msg.includes("unique")) return { error: "A brand with this name already exists." };
    return { error: "Failed to create brand." };
  }
}

export async function editBrandAction(id: string, data: BrandFormValues) {
  if (!data.name.trim()) return { error: "Brand name is required." };
  try {
    await db.update(brands).set({
      name: data.name.trim(),
      slug: toSlug(data.name),
      logoUrl: data.logoUrl.trim() || null,
      website: data.website.trim() || null,
    }).where(eq(brands.id, id));
    revalidatePath("/admin/brands");
    return { success: true };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "";
    if (msg.includes("unique")) return { error: "A brand with this name already exists." };
    return { error: "Failed to update brand." };
  }
}

export async function deleteBrandAction(id: string) {
  await db.delete(brands).where(eq(brands.id, id));
  revalidatePath("/admin/brands");
}
