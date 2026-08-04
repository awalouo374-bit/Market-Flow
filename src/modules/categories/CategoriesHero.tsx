import Link from "next/link";
import { LayoutGrid, Sparkles, ArrowRight } from "lucide-react";
import { GradientText } from "@/components/shared/GradientText";

interface CategoriesHeroProps {
  totalCategories: number;
  totalProducts: number;
}

export function CategoriesHero({ totalCategories, totalProducts }: CategoriesHeroProps) {
  return (
    <section
      className="relative overflow-hidden rounded-3xl bg-flow-gradient px-6 py-12 sm:px-12 sm:py-16"
      aria-labelledby="categories-hub-heading"
    >
      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-flow-cyan-light/20 blur-3xl" />
        <div className="absolute -bottom-12 -left-12 w-56 h-56 rounded-full bg-white/10 blur-2xl" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">
        {/* Copy */}
        <div className="flex-1 text-center lg:text-left space-y-5">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center justify-center lg:justify-start gap-1.5 text-white/60 text-xs">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-semibold">Categories</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-white text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-flow-cyan-light animate-pulse" />
            <span>{totalCategories} departments · {totalProducts.toLocaleString()} products</span>
          </div>

          <h1
            id="categories-hub-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight"
          >
            Browse by{" "}
            <span className="text-flow-cyan-light">Category</span>
          </h1>

          <p className="text-white/80 text-base sm:text-lg max-w-lg mx-auto lg:mx-0">
            Navigate our complete product taxonomy — from flagship departments down to the most precise sub-categories.
          </p>

          <div className="flex items-center justify-center lg:justify-start gap-3 pt-1">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-white text-market-navy font-bold text-sm hover:bg-flow-cyan-light transition-colors shadow-sm"
            >
              <ArrowRight className="w-4 h-4" />
              Browse All Products
            </Link>
          </div>
        </div>

        {/* Stats panel */}
        <div className="shrink-0 glass-panel rounded-2xl p-6 border-white/20 space-y-4 w-full max-w-xs">
          <div className="flex items-center gap-2 text-white/70 text-xs font-bold uppercase tracking-wider">
            <LayoutGrid className="w-4 h-4 text-flow-cyan-light" />
            Catalog Overview
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: totalCategories, label: "Categories" },
              { value: totalProducts.toLocaleString(), label: "Products" },
              { value: "30-day", label: "Returns" },
              { value: "4.9★", label: "Avg. Rating" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 rounded-xl px-3 py-3 text-center">
                <p className="text-white font-extrabold text-xl leading-none">{stat.value}</p>
                <p className="text-white/60 text-xs mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
