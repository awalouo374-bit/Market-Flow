"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { User, ShoppingBag, CheckCircle2 } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { BrandButton } from "@/components/shared/BrandButton";
import { CustomerRoleBadge, CustomerStatusBadge } from "./CustomerBadge";
import { updateCustomerAction } from "@/actions/customerActions";
import { toast } from "sonner";
import type { AdminCustomerDetail, CustomerRole, CustomerStatus } from "@/lib/admin-customers";

const selectCls = "h-8 px-2 rounded-lg border border-border bg-background text-xs focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all";
const ORDER_STATUS_COLOR: Record<string, string> = {
  delivered: "text-emerald-600", cancelled: "text-destructive",
  shipped: "text-cyan-600", processing: "text-blue-600", pending: "text-amber-600",
};

interface Props { customer: AdminCustomerDetail; open: boolean; onOpenChange: (v: boolean) => void; }

export function CustomerDetailModal({ customer, open, onOpenChange }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [role, setRole]     = useState<CustomerRole>(customer.role);
  const [status, setStatus] = useState<CustomerStatus>(customer.status);

  const handleSave = () => {
    startTransition(async () => {
      const result = await updateCustomerAction({ userId: customer.id, role, status });
      if (result.error) { toast.error(result.error); return; }
      toast.success("Customer updated");
      onOpenChange(false);
      router.refresh();
    });
  };

  const initials = customer.name
    ? customer.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
    : customer.email.slice(0, 2).toUpperCase();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-flow-gradient text-white flex items-center justify-center font-bold text-base shrink-0">
              {initials}
            </div>
            <div>
              <DialogTitle className="text-base font-bold leading-tight">
                {customer.name ?? "Unnamed User"}
              </DialogTitle>
              <DialogDescription className="text-xs mt-0.5">{customer.email}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-3 text-center">
          {[
            ["Orders", customer.orderCount],
            ["Total Spent", `$${parseFloat(customer.totalSpent).toFixed(2)}`],
            ["Joined", format(customer.createdAt, "MMM yyyy")],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl bg-muted/40 border border-border px-3 py-2.5">
              <p className="text-base font-bold text-foreground">{value}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <CustomerRoleBadge role={customer.role} />
          <CustomerStatusBadge status={customer.status} />
          {customer.emailVerified && (
            <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
              <CheckCircle2 className="w-3 h-3" /> Email verified
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 border-t border-border pt-4">
          <div>
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Role</p>
            <select value={role} onChange={(e) => setRole(e.target.value as CustomerRole)} className={selectCls}>
              {(["customer", "manager", "admin"] as CustomerRole[]).map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          <div>
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Status</p>
            <select value={status} onChange={(e) => setStatus(e.target.value as CustomerStatus)} className={selectCls}>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>

        {customer.recentOrders.length > 0 && (
          <div className="space-y-2 border-t border-border pt-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5" /> Recent Orders
            </p>
            <div className="space-y-1.5">
              {customer.recentOrders.map((o) => (
                <div key={o.id} className="flex items-center justify-between rounded-xl border border-border px-3 py-2 text-xs">
                  <span className="font-mono font-semibold text-foreground">{o.orderNumber}</span>
                  <span className={`font-semibold capitalize ${ORDER_STATUS_COLOR[o.status] ?? "text-muted-foreground"}`}>
                    {o.status}
                  </span>
                  <span className="text-muted-foreground">${parseFloat(o.total).toFixed(2)}</span>
                  <span className="text-muted-foreground hidden sm:block">
                    {formatDistanceToNow(o.createdAt, { addSuffix: true })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <DialogFooter>
          <BrandButton variant="ghost" size="sm" type="button" onClick={() => onOpenChange(false)} disabled={isPending}>
            Cancel
          </BrandButton>
          <BrandButton variant="flow" size="sm" type="button" onClick={handleSave} disabled={isPending} className="gap-2">
            {isPending ? "Saving…" : "Save Changes"}
          </BrandButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
