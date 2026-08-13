

import { db } from "@/db";
import { productReviews, users, products } from "@/db/schema";
import { eq, ilike, sql, desc, or, and } from "drizzle-orm";

export type ReviewStatus = "pending" | "approved" | "rejected";

export interface AdminReview {
  id: string;
  productId: string;
  productName: string;
  authorName: string | null;
  authorEmail: string;
  rating: number;
  title: string | null;
  comment: string | null;
  isVerifiedPurchase: boolean;
  status: ReviewStatus;
  createdAt: Date;
}

export async function getAdminReviews(params: {
  search?: string;
  status?: string;
  rating?: string;
  page?: number;
  perPage?: number;
}): Promise<{ items: AdminReview[]; total: number; totalPages: number }> {
  const { search, status, rating, page = 1, perPage = 25 } = params;
  const offset = (page - 1) * perPage;

  const conditions = [];
  if (search) {
    conditions.push(
      or(
        ilike(products.name, `%${search}%`),
        ilike(users.name,    `%${search}%`),
        ilike(users.email,   `%${search}%`)
      )
    );
  }
  if (status && status !== "all") {
    conditions.push(eq(productReviews.status, status as ReviewStatus));
  }
  if (rating && rating !== "all") {
    conditions.push(eq(productReviews.rating, Number(rating)));
  }

  const where = conditions.length > 0 ? and(...conditions) : undefined;

  const rows = await db
    .select({
      id:                 productReviews.id,
      productId:          productReviews.productId,
      productName:        products.name,
      authorName:         users.name,
      authorEmail:        users.email,
      rating:             productReviews.rating,
      title:              productReviews.title,
      comment:            productReviews.comment,
      isVerifiedPurchase: productReviews.isVerifiedPurchase,
      status:             productReviews.status,
      createdAt:          productReviews.createdAt,
    })
    .from(productReviews)
    .innerJoin(products, eq(productReviews.productId, products.id))
    .innerJoin(users,    eq(productReviews.userId,    users.id))
    .where(where)
    .orderBy(desc(productReviews.createdAt))
    .limit(perPage)
    .offset(offset);

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(productReviews)
    .innerJoin(products, eq(productReviews.productId, products.id))
    .innerJoin(users,    eq(productReviews.userId,    users.id))
    .where(where);

  return { items: rows, total: count, totalPages: Math.ceil(count / perPage) };
}

export async function getReviewStats() {
  const [stats] = await db
    .select({
      total:    sql<number>`count(*)::int`,
      pending:  sql<number>`count(*) filter (where status = 'pending')::int`,
      approved: sql<number>`count(*) filter (where status = 'approved')::int`,
      rejected: sql<number>`count(*) filter (where status = 'rejected')::int`,
      avgRating: sql<string>`round(avg(rating)::numeric, 1)::text`,
    })
    .from(productReviews);

  return stats ?? { total: 0, pending: 0, approved: 0, rejected: 0, avgRating: "0.0" };
}
