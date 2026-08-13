import Link from "next/link";
import { Package, ArrowRight, Search } from "lucide-react";
import { BrandButton } from "@/components/shared/BrandButton";

interface OrderEmptyStateProps {
  hasFilter: boolean;
  onReset: () => void;
}

export function OrderEmptyState({ hasFilter, onReset }: OrderEmptyStateProps) {
  if (hasFilter) {
    return (
      <div className="rounded-3xl border border-border bg-card p-12 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-flow-cyan/10 text-flow-cyan flex items-center justify-center mx-auto">
          <Search className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-foreground">No matching orders found</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          We couldn&apos;t find any orders matching your search or active status filter.
        </p>
        <button
          type="button"
          onClick={onReset}
          className="px-4 py-2 rounded-xl bg-market-navy text-white text-xs font-bold hover:bg-flow-cyan transition-colors"
        >
          Reset Search Filters
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-10 sm:p-16 text-center space-y-6 max-w-2xl mx-auto shadow-xs">
      <div className="w-20 h-20 rounded-3xl bg-flow-cyan/10 text-flow-cyan flex items-center justify-center mx-auto">
        <Package className="w-10 h-10 stroke-[1.5]" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-extrabold text-foreground">No Orders Yet</h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          When you place orders on MarketFlow, your purchase history, tracking numbers, and digital invoices will appear right here.
        </p>
      </div>

      <div className="pt-2">
        <Link href="/products">
          <BrandButton variant="flow" size="lg" className="shadow-glow-cyan gap-2">
            <span>Start Shopping Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </BrandButton>
        </Link>
      </div>
    </div>
  );
}
