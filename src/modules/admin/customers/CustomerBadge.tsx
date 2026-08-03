import type { CustomerRole, CustomerStatus } from "@/lib/admin-customers";

const ROLE_CFG: Record<CustomerRole, string> = {
  admin:    "bg-flow-gradient text-white",
  manager:  "bg-blue-500/15 text-blue-600",
  customer: "bg-muted text-muted-foreground",
};

const STATUS_CFG: Record<CustomerStatus, string> = {
  active:    "bg-emerald-500/15 text-emerald-600",
  suspended: "bg-destructive/15 text-destructive",
};

const badge = (label: string, cls: string) => (
  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${cls}`}>
    {label}
  </span>
);

export const CustomerRoleBadge   = ({ role }:   { role: CustomerRole })   => badge(role,   ROLE_CFG[role]);
export const CustomerStatusBadge = ({ status }: { status: CustomerStatus }) => badge(status, STATUS_CFG[status]);
