import type { Metadata } from "next";
import { Suspense } from "react";
import { ShoppingBag } from "lucide-react";
import { getAdminOrders } from "@/lib/admin-orders";
import { OrdersToolbar } from "@/modules/admin/orders/OrdersToolbar";
import { OrdersTable } from "@/modules/admin/orders/OrdersTable";
import { CatalogPagination } from "@/modules/catalog/CatalogPagination";

export const metadata: Metadata = { title: "Orders — MarketFlow Admin" };

interface PageProps {
  searchParams: Promise<{ search?: string; status?: string; page?: string }>;
}

async function OrdersContent({ search, status, page }: { search?: string; status?: string; page: number }) {
  const { items, totalPages } = await getAdminOrders({ search, status, page, perPage: 25 });

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-2">
        <ShoppingBag className="w-10 h-10 text-muted-foreground stroke-1" />
        <p className="font-semibold text-foreground">No orders found</p>
        <p className="text-sm text-muted-foreground">Try adjusting your search or status filter.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <OrdersTable orders={items} />
      <CatalogPagination currentPage={page} totalPages={totalPages} />
    </div>
  );
}

export default async function AdminOrdersPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.search;
  const status = params.status;
  const page = Number(params.page ?? 1);

  const { total } = await getAdminOrders({ search, status, page, perPage: 25 });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-accent/10 text-accent">
          <ShoppingBag className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Orders</h1>
          <p className="text-xs text-muted-foreground">Manage, fulfill and track all customer orders</p>
        </div>
      </div>

      <OrdersToolbar total={total} />

      <Suspense fallback={<div className="h-64 rounded-2xl bg-muted animate-pulse" />}>
        <OrdersContent search={search} status={status} page={page} />
      </Suspense>
    </div>
  );
}
