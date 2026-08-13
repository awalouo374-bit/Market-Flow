"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal, Eye, Copy, ShieldOff, ShieldCheck } from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CustomerDetailModal } from "./CustomerDetailModal";
// Server data fetching goes through a Server Action — never import lib/ directly
// into a "use client" file as it would pull db/pg into the browser bundle.
import { updateCustomerAction, getCustomerDetailAction } from "@/actions/customerActions";
import { toast } from "sonner";
import type { AdminCustomer, AdminCustomerDetail } from "@/lib/admin-customers";

export function CustomerRowActions({ customer }: { customer: AdminCustomer }) {
  const router = useRouter();
  const [detailOpen, setDetailOpen] = useState(false);
  const [detail, setDetail] = useState<AdminCustomerDetail | null>(null);
  const [isFetching, startFetch]  = useTransition();
  const [isUpdating, startUpdate] = useTransition();

  const openDetail = () => {
    startFetch(async () => {
      const d = await getCustomerDetailAction(customer.id);
      setDetail(d);
      setDetailOpen(true);
    });
  };

  const toggleStatus = () => {
    const next = customer.status === "active" ? "suspended" : "active";
    startUpdate(async () => {
      const result = await updateCustomerAction({ userId: customer.id, status: next });
      if (result.error) { toast.error(result.error); return; }
      toast.success(`Customer ${next}`);
      router.refresh();
    });
  };

  const isBusy = isFetching || isUpdating;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            disabled={isBusy}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label={`Actions for ${customer.email}`}
          >
            <MoreHorizontal className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer" onClick={openDetail}>
            <Eye className="w-3.5 h-3.5" />
            View Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => { navigator.clipboard.writeText(customer.id); toast.success("Customer ID copied"); }}
          >
            <Copy className="w-3.5 h-3.5" />
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className={`flex items-center gap-2 cursor-pointer ${customer.status === "active" ? "text-destructive" : "text-emerald-600"}`}
            onClick={toggleStatus}
          >
            {customer.status === "active"
              ? <><ShieldOff className="w-3.5 h-3.5" /> Suspend Account</>
              : <><ShieldCheck className="w-3.5 h-3.5" /> Reactivate Account</>
            }
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {detail && (
        <CustomerDetailModal customer={detail} open={detailOpen} onOpenChange={setDetailOpen} />
      )}
    </>
  );
}
