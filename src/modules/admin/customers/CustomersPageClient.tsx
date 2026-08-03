"use client";

import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { CustomersTable } from "./CustomersTable";
import { CatalogPagination } from "@/modules/catalog/CatalogPagination";
import type { AdminCustomer } from "@/lib/admin-customers";

const ROLE_FILTERS   = [{ value: "all", label: "All Roles" }, { value: "customer", label: "Customers" }, { value: "manager", label: "Managers" }, { value: "admin", label: "Admins" }];
const STATUS_FILTERS = [{ value: "all", label: "All Status" }, { value: "active", label: "Active" }, { value: "suspended", label: "Suspended" }];

interface CustomersPageClientProps {
  customers: AdminCustomer[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export function CustomersPageClient({ customers, total, totalPages, currentPage }: CustomersPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const search = searchParams.get("search") ?? "";
  const role   = searchParams.get("role")   ?? "all";
  const status = searchParams.get("status") ?? "all";

  const push = (updates: Record<string, string | null>) => {
    const p = new URLSearchParams(searchParams.toString());
    for (const [k, v] of Object.entries(updates)) v === null ? p.delete(k) : p.set(k, v);
    p.delete("page");
    startTransition(() => router.push(`/admin/customers?${p.toString()}`, { scroll: false }));
  };

  const hasFilters = !!(search || role !== "all" || status !== "all");

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${isPending ? "text-accent animate-pulse" : "text-muted-foreground"}`} />
            <input
              type="search"
              defaultValue={search}
              onKeyDown={(e) => e.key === "Enter" && push({ search: e.currentTarget.value || null })}
              placeholder="Search name or email…"
              className="h-9 w-56 pl-8 pr-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all"
            />
          </div>

          <select value={role} onChange={(e) => push({ role: e.target.value === "all" ? null : e.target.value })}
            className="h-9 px-3 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/40">
            {ROLE_FILTERS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
          </select>

          <select value={status} onChange={(e) => push({ status: e.target.value === "all" ? null : e.target.value })}
            className="h-9 px-3 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/40">
            {STATUS_FILTERS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
          </select>

          {hasFilters && (
            <button type="button" onClick={() => push({ search: null, role: null, status: null })}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors">
              <X className="w-3.5 h-3.5" /> Clear
            </button>
          )}
          <span className="text-xs text-muted-foreground">{total} customers</span>
        </div>
      </div>

      {customers.length === 0 ? (
        <p className="text-center py-16 text-sm text-muted-foreground">No customers match your filters.</p>
      ) : (
        <>
          <CustomersTable customers={customers} />
          <CatalogPagination currentPage={currentPage} totalPages={totalPages} />
        </>
      )}
    </div>
  );
}
