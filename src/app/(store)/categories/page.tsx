import type { Metadata } from "next";
import { getCategoriesWithChildren, getCatalogProducts } from "@/lib/catalog";
import { CategoriesHero } from "@/modules/categories/CategoriesHero";
import { CategoriesGrid } from "@/modules/categories/CategoriesGrid";

export const metadata: Metadata = {
  title: "Categories – MarketFlow",
  description:
    "Browse all product categories at MarketFlow — smartphones, audio, laptops, accessories and more.",
  openGraph: {
    title: "Categories – MarketFlow",
    description: "Explore every department and sub-category in the MarketFlow catalog.",
    type: "website",
  },
};

export default async function CategoriesPage() {
  const [categories, { total: totalProducts }] = await Promise.all([
    getCategoriesWithChildren(),
    getCatalogProducts({ perPage: 1 }),
  ]);

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <CategoriesHero
        totalCategories={categories.length}
        totalProducts={totalProducts}
      />
      <CategoriesGrid categories={categories} />
    </div>
  );
}
