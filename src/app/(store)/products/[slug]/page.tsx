import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ChevronRight } from "lucide-react";
import { getProductBySlug, getFeaturedProducts } from "@/lib/catalog";
import { ProductGallery } from "@/modules/catalog/ProductGallery";
import { ProductDetails } from "@/modules/catalog/ProductDetails";
import { ProductCard } from "@/modules/catalog/ProductCard";
import { ProductGridSkeleton } from "@/modules/catalog/ProductCardSkeleton";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product not found – MarketFlow" };
  return {
    title: `${product.name} – MarketFlow`,
    description: product.description ?? `Shop ${product.name} at MarketFlow.`,
    openGraph: {
      title: product.name,
      description: product.description ?? undefined,
      images: product.images[0] ? [{ url: product.images[0].url }] : [],
    },
  };
}

async function RelatedProducts({ categoryId }: { categoryId: string | null }) {
  const related = await getFeaturedProducts(4);
  if (related.length === 0) return null;
  return (
    <section className="space-y-5">
      <h2 className="text-xl font-bold text-foreground">You may also like</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {related.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const productProps = {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    compareAtPrice: product.compareAtPrice ?? null,
    isFeatured: product.isFeatured,
    categoryName: product.category?.name ?? null,
    brandName: product.brand?.name ?? null,
  };

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/products" className="hover:text-foreground transition-colors">Products</Link>
        {product.category && (
          <>
            <ChevronRight className="w-3 h-3" />
            <Link href={`/products?category=${product.category.slug}`} className="hover:text-foreground transition-colors">
              {product.category.name}
            </Link>
          </>
        )}
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground font-medium truncate max-w-40">{product.name}</span>
      </nav>

      {/* Main product section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        <ProductGallery images={product.images} productName={product.name} />
        <ProductDetails product={productProps} variants={product.variants} />
      </div>

      {/* Related products */}
      <Suspense fallback={<ProductGridSkeleton count={4} />}>
        <RelatedProducts categoryId={product.categoryId} />
      </Suspense>
    </div>
  );
}
