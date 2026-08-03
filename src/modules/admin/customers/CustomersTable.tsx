import { formatDistanceToNow } from "date-fns";
import type { AdminCustomer } from "@/lib/admin-customers";
import { CustomerRoleBadge, CustomerStatusBadge } from "./CustomerBadge";
import { CustomerRowActions } from "./CustomerRowActions";

export function CustomersTable({ customers }: { customers: AdminCustomer[] }) {
  return (
    <div className="rounded-2xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-left hidden md:table-cell">Role</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left hidden sm:table-cell">Orders</th>
              <th className="px-4 py-3 text-left hidden lg:table-cell">Total Spent</th>
              <th className="px-4 py-3 text-left hidden lg:table-cell">Joined</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60 bg-card">
            {customers.map((c) => {
              const initials = c.name
                ? c.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
                : c.email.slice(0, 2).toUpperCase();

              return (
                <tr key={c.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-flow-gradient text-white flex items-center justify-center font-bold text-xs shrink-0">
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-foreground text-xs line-clamp-1">
                          {c.name ?? "Unnamed User"}
                        </p>
                        <p className="text-[10px] text-muted-foreground line-clamp-1">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <CustomerRoleBadge role={c.role} />
                  </td>
                  <td className="px-4 py-3">
                    <CustomerStatusBadge status={c.status} />
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-accent/10 text-accent">
                      {c.orderCount}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className="font-semibold text-xs">${parseFloat(c.totalSpent).toFixed(2)}</span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(c.createdAt, { addSuffix: true })}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <CustomerRowActions customer={c} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
