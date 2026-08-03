import type { Metadata } from "next";
import { Suspense } from "react";
import { Boxes } from "lucide-react";
import { getInventoryVariants, getInventoryLogs } from "@/lib/admin-inventory";
import { InventoryPageClient } from "@/modules/admin/inventory/InventoryPageClient";
import type { StockFilter } from "@/lib/admin-inventory";

export const metadata: Metadata = { title: "Inventory — MarketFlow Admin" };

interface PageProps {
  searchParams: Promise<{
    tab?: string;
    search?: string;
    filter?: string;
    page?: string;
  }>;
}

export default async function AdminInventoryPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Number(params.page ?? 1);
  const search = params.search;
  const filter = (params.filter ?? "all") as StockFilter;

  const [variantsResult, logsResult] = await Promise.all([
    getInventoryVariants({ search, filter, page, perPage: 25 }),
    getInventoryLogs({ search, page, perPage: 25 }),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-accent/10 text-accent">
          <Boxes className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Inventory Control</h1>
          <p className="text-xs text-muted-foreground">
            Monitor stock levels, adjust quantities and review the full audit trail
          </p>
        </div>
      </div>

      <Suspense fallback={<div className="h-64 rounded-2xl bg-muted animate-pulse" />}>
        <InventoryPageClient
          variants={variantsResult.items}
          logs={logsResult.items}
          variantsTotal={variantsResult.total}
          variantsTotalPages={variantsResult.totalPages}
          logsTotal={logsResult.total}
          logsTotalPages={logsResult.totalPages}
          currentPage={page}
        />
      </Suspense>
    </div>
  );
}
