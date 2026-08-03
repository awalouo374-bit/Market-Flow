import { formatDistanceToNow } from "date-fns";
import { BadgeCheck } from "lucide-react";
import type { AdminReview } from "@/lib/admin-reviews";
import { StarRating } from "./StarRating";
import { ReviewStatusBadge } from "./ReviewStatusBadge";
import { ReviewRowActions } from "./ReviewRowActions";

export function ReviewsTable({ reviews }: { reviews: AdminReview[] }) {
  return (
    <div className="rounded-2xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 text-left">Review</th>
              <th className="px-4 py-3 text-left hidden md:table-cell">Product</th>
              <th className="px-4 py-3 text-left hidden lg:table-cell">Author</th>
              <th className="px-4 py-3 text-left">Rating</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left hidden sm:table-cell">Date</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60 bg-card">
            {reviews.map((review) => (
              <tr key={review.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 max-w-xs">
                  <div className="space-y-0.5">
                    <p className="font-semibold text-foreground text-xs line-clamp-1">
                      {review.title ?? <span className="italic text-muted-foreground">No title</span>}
                    </p>
                    <p className="text-[10px] text-muted-foreground line-clamp-2">
                      {review.comment ?? "No comment"}
                    </p>
                    {review.isVerifiedPurchase && (
                      <span className="inline-flex items-center gap-0.5 text-[9px] text-emerald-600 font-semibold">
                        <BadgeCheck className="w-2.5 h-2.5" /> Verified Purchase
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <p className="text-xs text-foreground line-clamp-1 font-medium">{review.productName}</p>
                </td>
                <td className="px-4 py-3 hidden lg:table-cell">
                  <p className="text-xs text-foreground line-clamp-1">{review.authorName ?? "—"}</p>
                  <p className="text-[10px] text-muted-foreground line-clamp-1">{review.authorEmail}</p>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <StarRating rating={review.rating} />
                    <span className="text-xs font-bold text-foreground">{review.rating}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <ReviewStatusBadge status={review.status} />
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatDistanceToNow(review.createdAt, { addSuffix: true })}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <ReviewRowActions review={review} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
