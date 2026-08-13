"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Package, Heart, User, Settings, SlidersHorizontal, RotateCcw } from "lucide-react";
import type { CustomerOrder, OrderStatusType } from "@/lib/user-orders";
import { OrderCard } from "./OrderCard";
import { OrderEmptyState } from "./OrderEmptyState";
import { OrderInvoiceModal } from "./OrderInvoiceModal";
import { OrderReturnModal } from "./OrderReturnModal";

interface AccountOrdersDashboardProps {
  orders: CustomerOrder[];
  userName?: string | null;
  userEmail?: string | null;
}

type TabFilter = "all" | OrderStatusType;

const TABS: { id: TabFilter; label: string }[] = [
  { id: "all", label: "All Orders" },
  { id: "processing", label: "Processing" },
  { id: "shipped", label: "Shipped" },
  { id: "delivered", label: "Delivered" },
  { id: "cancelled", label: "Cancelled" },
];

export function AccountOrdersDashboard({
  orders,
  userName = "Martin Alex",
  userEmail = "martin@example.com",
}: AccountOrdersDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<CustomerOrder | null>(null);
  const [selectedReturnOrder, setSelectedReturnOrder] = useState<CustomerOrder | null>(null);

  // Filter & Search Logic
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Tab filter
      if (activeTab !== "all" && order.status !== activeTab) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesNum = order.orderNumber.toLowerCase().includes(query);
        const matchesItem = order.items.some(
          (i) => i.productName.toLowerCase().includes(query) || i.sku.toLowerCase().includes(query)
        );
        if (!matchesNum && !matchesItem) return false;
      }

      return true;
    });
  }, [orders, activeTab, searchQuery]);

  const resetFilters = () => {
    setActiveTab("all");
    setSearchQuery("");
  };

  const hasFilter = activeTab !== "all" || searchQuery !== "";

  return (
    <div className="space-y-8">
      {/* Account Profile Greeting Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-flow-gradient text-white shadow-lg">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white font-extrabold text-lg border border-white/20">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold">Welcome back, {userName}</h1>
            <p className="text-xs text-white/80">{userEmail} · Customer Account</p>
          </div>
        </div>

        {/* Account Quick Tab Links */}
        <div className="flex items-center gap-2">
          <Link
            href="/account/orders"
            className="px-3.5 py-2 rounded-xl bg-white/20 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
          >
            <Package className="w-3.5 h-3.5" />
            <span>Orders</span>
          </Link>
          <Link
            href="/wishlist"
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Wishlist</span>
          </Link>
        </div>
      </div>

      {/* Control Panel: Search & Filter Tabs */}
      <div className="p-5 rounded-2xl border border-border bg-card space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Order #, product name, or SKU..."
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-background text-xs font-medium placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-flow-cyan transition-all"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? "bg-market-navy text-white shadow-xs dark:bg-flow-cyan dark:text-market-navy"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">
          Purchase History ({filteredOrders.length})
        </h2>

        {hasFilter && (
          <button
            type="button"
            onClick={resetFilters}
            className="text-xs font-semibold text-flow-cyan hover:underline flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset filters
          </button>
        )}
      </div>

      {/* Orders List or Empty State */}
      {filteredOrders.length > 0 ? (
        <div className="space-y-5">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onOpenInvoice={(o) => setSelectedInvoiceOrder(o)}
              onOpenReturn={(o) => setSelectedReturnOrder(o)}
            />
          ))}
        </div>
      ) : (
        <OrderEmptyState hasFilter={hasFilter} onReset={resetFilters} />
      )}

      {/* PDF Invoice Modal */}
      <OrderInvoiceModal
        order={selectedInvoiceOrder}
        onClose={() => setSelectedInvoiceOrder(null)}
      />

      {/* Return Request Modal */}
      <OrderReturnModal
        order={selectedReturnOrder}
        onClose={() => setSelectedReturnOrder(null)}
      />
    </div>
  );
}
