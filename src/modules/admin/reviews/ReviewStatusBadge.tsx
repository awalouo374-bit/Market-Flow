import { Clock, CheckCircle2, XCircle } from "lucide-react";
import type { ReviewStatus } from "@/lib/admin-reviews";

const CFG: Record<ReviewStatus, { label: string; cls: string; Icon: typeof Clock }> = {
  pending:  { label: "Pending",  cls: "bg-amber-500/15 text-amber-600",    Icon: Clock        },
  approved: { label: "Approved", cls: "bg-emerald-500/15 text-emerald-600", Icon: CheckCircle2 },
  rejected: { label: "Rejected", cls: "bg-destructive/15 text-destructive", Icon: XCircle      },
};

export function ReviewStatusBadge({ status }: { status: ReviewStatus }) {
  const { label, cls, Icon } = CFG[status];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${cls}`}>
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
}
