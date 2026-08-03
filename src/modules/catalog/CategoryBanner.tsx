import React from "react";
import Link from "next/link";
import {
  Smartphone,
  Headphones,
  Laptop,
  Watch,
  Camera,
  Gamepad2,
  ChevronRight,
} from "lucide-react";
import type { CatalogCategory } from "@/lib/catalog";

interface CategoryBannerProps {
  categories: CatalogCategory[];
}

// Fallback icon map by category name keyword
const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  smartphone: <Smartphone className="w-5 h-5" />,
  phone: <Smartphone className="w-5 h-5" />,
  audio: <Headphones className="w-5 h-5" />,
  headphone: <Headphones className="w-5 h-5" />,
  laptop: <Laptop className="w-5 h-5" />,
  computer: <Laptop className="w-5 h-5" />,
  watch: <Watch className="w-5 h-5" />,
  camera: <Camera className="w-5 h-5" />,
  gaming: <Gamepad2 className="w-5 h-5" />,
  game: <Gamepad2 className="w-5 h-5" />,
};

function getCategoryIcon(name: string): React.ReactNode {
  const lower = name.toLowerCase();
  for (const [keyword, icon] of Object.entries(CATEGORY_ICONS)) {
    if (lower.includes(keyword)) return icon;
  }
  return <Laptop className="w-5 h-5" />;
}

// Gradient variants cycling through brand colors
const GRADIENT_CYCLES = [
  "from-market-navy to-flow-cyan",
  "from-flow-cyan to-flow-cyan-light",
  "from-market-navy-dark to-market-navy",
  "from-silver-metallic to-flow-cyan",
  "from-flow-cyan to-market-navy",
];

export function CategoryBanner({ categories }: CategoryBannerProps) {
  if (categories.length === 0) return null;

  return (
    <section aria-labelledby="categories-heading" className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2
            id="categories-heading"
            className="text-xl font-bold text-foreground"
          >
            Browse Categories
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Explore our curated product families
          </p>
        </div>
        <Link
          href="/categories"
          className="text-sm font-semibold text-accent hover:underline flex items-center gap-1 group"
        >
          <span>View all</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {categories.slice(0, 5).map((cat, i) => (
          <Link
            key={cat.id}
            href={`/products?category=${cat.slug}`}
            className="group relative flex flex-col items-center gap-3 p-4 rounded-2xl border border-border bg-card hover:border-accent/40 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flow-cyan"
            aria-label={`Browse ${cat.name}`}
          >
            {/* Icon circle */}
            <div
              className={`w-12 h-12 rounded-xl bg-linear-to-br ${GRADIENT_CYCLES[i % GRADIENT_CYCLES.length]} text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}
            >
              {getCategoryIcon(cat.name)}
            </div>

            <div className="text-center">
              <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors leading-tight">
                {cat.name}
              </p>
              {cat.productCount > 0 && (
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  {cat.productCount} items
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
