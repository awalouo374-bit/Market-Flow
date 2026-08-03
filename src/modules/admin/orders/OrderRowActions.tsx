"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal, Eye, Copy, CheckCircle2, XCircle } from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { OrderDetailModal } from "./OrderDetailModal";
import { updateOrderStatusAction } from "@/actions/orderActions";
import { getOrderDetail } from "@/lib/admin-orders";
import { toast } from "sonner";
import type { AdminOrder } from "@/lib/admin-orders";

export function OrderRowActions({ order }: { order: AdminOrder }) {
  const router = useRouter();
  const [detailOpen, setDetailOpen] = useState(false);
  const [detail, setDetail] = useState<Awaited<ReturnType<typeof getOrderDetail>>>(null);
  const [isFetching, startFetch] = useTransition();
  const [isUpdating, startUpdate] = useTransition();

  const openDetail = () => {
    startFetch(async () => {
      const d = await getOrderDetail(order.id);
      setDetail(d);
      setDetailOpen(true);
    });
  };

  const quickUpdate = (status: "delivered" | "cancelled") => {
    startUpdate(async () => {
      const result = await updateOrderStatusAction({ orderId: order.id, status });
      if (result.error) { toast.error(result.error); return; }
      toast.success(`Order marked as ${status}`);
      router.refresh();
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            disabled={isFetching || isUpdating}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label={`Actions for ${order.orderNumber}`}
          >
            <MoreHorizontal className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer" onClick={openDetail}>
            <Eye className="w-3.5 h-3.5" />
            View Details
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => { navigator.clipboard.writeText(order.id); toast.success("Order ID copied"); }}
          >
            <Copy className="w-3.5 h-3.5" />
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex items-center gap-2 cursor-pointer text-emerald-600"
            onClick={() => quickUpdate("delivered")}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Mark Delivered
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2 cursor-pointer text-destructive"
            onClick={() => quickUpdate("cancelled")}
          >
            <XCircle className="w-3.5 h-3.5" />
            Cancel Order
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {detail && (
        <OrderDetailModal order={detail} open={detailOpen} onOpenChange={setDetailOpen} />
      )}
    </>
  );
}
