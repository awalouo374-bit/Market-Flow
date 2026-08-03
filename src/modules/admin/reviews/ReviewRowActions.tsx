"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal, Eye, CheckCircle2, XCircle, Trash2 } from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConfirmDeleteModal } from "@/components/shared/ConfirmDeleteModal";
import { ReviewDetailModal } from "./ReviewDetailModal";
import { updateReviewStatusAction, deleteReviewAction } from "@/actions/reviewActions";
import { toast } from "sonner";
import type { AdminReview } from "@/lib/admin-reviews";

export function ReviewRowActions({ review }: { review: AdminReview }) {
  const router = useRouter();
  const [detailOpen, setDetailOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isUpdating, startUpdate]   = useTransition();

  const quickStatus = (status: "approved" | "rejected") => {
    startUpdate(async () => {
      const result = await updateReviewStatusAction(review.id, status);
      if (result.error) { toast.error(result.error); return; }
      toast.success(`Review ${status}`);
      router.refresh();
    });
  };

  const handleDelete = async () => {
    const result = await deleteReviewAction(review.id);
    if (result.error) { toast.error(result.error); return; }
    toast.success("Review deleted");
    router.refresh();
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            disabled={isUpdating}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Review actions"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer" onClick={() => setDetailOpen(true)}>
            <Eye className="w-3.5 h-3.5" />
            View Review
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {review.status !== "approved" && (
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-emerald-600" onClick={() => quickStatus("approved")}>
              <CheckCircle2 className="w-3.5 h-3.5" />
              Approve
            </DropdownMenuItem>
          )}
          {review.status !== "rejected" && (
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-amber-600" onClick={() => quickStatus("rejected")}>
              <XCircle className="w-3.5 h-3.5" />
              Reject
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-destructive" onClick={() => setDeleteOpen(true)}>
            <Trash2 className="w-3.5 h-3.5" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ReviewDetailModal review={review} open={detailOpen} onOpenChange={setDetailOpen} />

      <ConfirmDeleteModal
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Review"
        description="This review will be permanently removed and cannot be recovered."
        itemName={review.title ?? `Review by ${review.authorName ?? review.authorEmail}`}
        onConfirm={handleDelete}
      />
    </>
  );
}
