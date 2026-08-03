import type { Metadata } from "next";
import { Suspense } from "react";
import { Users } from "lucide-react";
import { getAdminCustomers } from "@/lib/admin-customers";
import { CustomersPageClient } from "@/modules/admin/customers/CustomersPageClient";

export const metadata: Metadata = { title: "Customers — MarketFlow Admin" };

interface PageProps {
  searchParams: Promise<{ search?: string; role?: string; status?: string; page?: string }>;
}

export default async function AdminCustomersPage({ searchParams }: PageProps) {
  const params  = await searchParams;
  const search  = params.search;
  const role    = params.role;
  const status  = params.status;
  const page    = Number(params.page ?? 1);

  const { items, total, totalPages } = await getAdminCustomers({
    search, role, status, page, perPage: 25,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-accent/10 text-accent">
          <Users className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Customers</h1>
          <p className="text-xs text-muted-foreground">
            Manage accounts, roles, access and order history
          </p>
        </div>
      </div>

      <Suspense fallback={<div className="h-64 rounded-2xl bg-muted animate-pulse" />}>
        <CustomersPageClient
          customers={items}
          total={total}
          totalPages={totalPages}
          currentPage={page}
        />
      </Suspense>
    </div>
  );
}
