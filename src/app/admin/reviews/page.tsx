import type { Metadata } from "next";
import { Suspense } from "react";
import { Star, Clock, CheckCircle2, XCircle, BarChart3 } from "lucide-react";
import { getAdminReviews, getReviewStats } from "@/lib/admin-reviews";
import { ReviewsPageClient } from "@/modules/admin/reviews/ReviewsPageClient";

export const metadata: Metadata = { title: "Reviews — MarketFlow Admin" };

interface PageProps {
  searchParams: Promise<{
    search?: string;
    status?: string;
    rating?: string;
    page?: string;
  }>;
}

const STAT_CARDS = [
  { key: "total",    label: "Total Reviews",    icon: BarChart3,    colorCls: "bg-accent/10 text-accent" },
  { key: "pending",  label: "Awaiting Review",  icon: Clock,        colorCls: "bg-amber-500/10 text-amber-600" },
  { key: "approved", label: "Approved",         icon: CheckCircle2, colorCls: "bg-emerald-500/10 text-emerald-600" },
  { key: "rejected", label: "Rejected",         icon: XCircle,      colorCls: "bg-destructive/10 text-destructive" },
] as const;

async function ReviewsContent({
  search, status, rating, page,
}: { search?: string; status?: string; rating?: string; page: number }) {
  const { items, total, totalPages } = await getAdminReviews({
    search, status, rating, page, perPage: 25,
  });

  return (
    <ReviewsPageClient
      reviews={items}
      total={total}
      totalPages={totalPages}
      currentPage={page}
    />
  );
}

export default async function AdminReviewsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.search;
  const status = params.status;
  const rating = params.rating;
  const page   = Number(params.page ?? 1);

  const stats = await getReviewStats();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-accent/10 text-accent">
          <Star className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Reviews & Ratings</h1>
          <p className="text-xs text-muted-foreground">
            Moderate customer reviews, approve submissions and track satisfaction
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map(({ key, label, icon: Icon, colorCls }) => (
          <div
            key={key}
            className="flex items-center gap-3 p-4 rounded-2xl border border-border bg-card hover:border-accent/30 transition-colors"
          >
            <div className={`p-2.5 rounded-xl shrink-0 ${colorCls}`}>
              <Icon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xl font-extrabold text-foreground leading-none">
                {key === "total" && stats.avgRating !== "0.0"
                  ? stats[key]
                  : stats[key]}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {stats.total > 0 && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-border bg-card">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`w-4 h-4 ${s <= Math.round(parseFloat(stats.avgRating ?? "0")) ? "fill-amber-400 text-amber-400" : "fill-muted text-muted-foreground/40"}`}
              />
            ))}
          </div>
          <span className="font-bold text-foreground">{stats.avgRating}</span>
          <span className="text-xs text-muted-foreground">average across all reviews</span>
        </div>
      )}

      <Suspense fallback={<div className="h-64 rounded-2xl bg-muted animate-pulse" />}>
        <ReviewsContent search={search} status={status} rating={rating} page={page} />
      </Suspense>
    </div>
  );
}
