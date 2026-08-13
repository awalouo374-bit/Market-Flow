"use client";

import { Package, RotateCcw, ShieldCheck, CreditCard } from "lucide-react";

interface SupportCategoryGridProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

const CATEGORIES = [
  {
    id: "orders",
    name: "Orders & Shipping",
    icon: Package,
    description: "Track shipments, delivery estimates, carrier info & package updates",
  },
  {
    id: "returns",
    name: "Returns & Refunds",
    icon: RotateCcw,
    description: "Initiate prepaid return labels, 30-day refunds & exchange policies",
  },
  {
    id: "account",
    name: "Account & Security",
    icon: ShieldCheck,
    description: "Manage profile, 2FA security, passwords, saved addresses & privacy",
  },
  {
    id: "payments",
    name: "Payment & Promos",
    icon: CreditCard,
    description: "Redeem promo codes, invoice billing, credit cards & payment methods",
  },
];

export function SupportCategoryGrid({ selectedCategory, onSelectCategory }: SupportCategoryGridProps) {
  return (
    <section aria-labelledby="help-topics-heading" className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 id="help-topics-heading" className="text-xl font-bold text-foreground">
            Explore Help Topics
          </h2>
          <p className="text-xs text-muted-foreground">Select a category to filter answers</p>
        </div>

        {selectedCategory !== "all" && (
          <button
            type="button"
            onClick={() => onSelectCategory("all")}
            className="text-xs font-semibold text-flow-cyan hover:underline cursor-pointer"
          >
            Show All Topics
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(isSelected ? "all" : cat.id)}
              aria-pressed={isSelected}
              className={`flex flex-col text-left p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                isSelected
                  ? "border-flow-cyan bg-flow-cyan/5 shadow-md ring-2 ring-flow-cyan/20"
                  : "border-border bg-card hover:border-flow-cyan/40 hover:shadow-md hover:-translate-y-0.5"
              }`}
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                  isSelected ? "bg-flow-cyan text-white shadow-xs" : "bg-flow-cyan/10 text-flow-cyan"
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-foreground mb-1">{cat.name}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{cat.description}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
