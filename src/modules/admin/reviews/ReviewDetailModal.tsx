"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { MessageSquare, BadgeCheck } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { BrandButton } from "@/components/shared/BrandButton";
import { ReviewStatusBadge } from "./ReviewStatusBadge";
import { StarRating } from "./StarRating";
import { updateReviewStatusAction } from "@/actions/reviewActions";
import { toast } from "sonner";
import type { AdminReview } from "@/lib/admin-reviews";

interface Props { review: AdminReview; open: boolean; onOpenChange: (v: boolean) => void; }

export function ReviewDetailModal({ review, open, onOpenChange }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const act = (status: "approved" | "rejected") => {
    startTransition(async () => {
      const result = await updateReviewStatusAction(review.id, status);
      if (result.error) { toast.error(result.error); return; }
      toast.success(`Review ${status}`);
      onOpenChange(false);
      router.refresh();
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-accent/10 text-accent">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <DialogTitle className="text-base font-bold">Review Details</DialogTitle>
              <DialogDescription className="text-xs mt-0.5">
                {review.productName}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-foreground">{review.authorName ?? review.authorEmail}</p>
                {review.isVerifiedPurchase && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
                    <BadgeCheck className="w-3 h-3" /> Verified
                  </span>
                )}
              </div>
              <p className="text-[10px] text-muted-foreground">{review.authorEmail}</p>
              <p className="text-[10px] text-muted-foreground">
                {formatDistanceToNow(review.createdAt, { addSuffix: true })}
              </p>
            </div>
            <ReviewStatusBadge status={review.status} />
          </div>

          <div className="space-y-2">
            <StarRating rating={review.rating} />
            {review.title && (
              <p className="font-semibold text-sm text-foreground">{review.title}</p>
            )}
            {review.comment && (
              <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
            )}
            {!review.comment && !review.title && (
              <p className="text-xs text-muted-foreground italic">No written review provided.</p>
            )}
          </div>

          <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/40 border border-border text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">Product:</span>
            <span>{review.productName}</span>
          </div>
        </div>

        {review.status === "pending" && (
          <DialogFooter>
            <BrandButton
              variant="ghost" size="sm" type="button"
              onClick={() => act("rejected")} disabled={isPending}
              className="text-destructive hover:text-destructive"
            >
              Reject
            </BrandButton>
            <BrandButton
              variant="flow" size="sm" type="button"
              onClick={() => act("approved")} disabled={isPending}
              className="gap-2"
            >
              {isPending ? "Saving…" : "Approve"}
            </BrandButton>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
