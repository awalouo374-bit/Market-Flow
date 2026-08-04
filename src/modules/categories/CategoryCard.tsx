import Link from "next/link";
import Image from "next/image";
import {
  Smartphone, Headphones, Laptop, Watch, Camera,
  Gamepad2, Package, ArrowRight,
} from "lucide-react";
import { CategorySubItem } from "./CategorySubItem";
import type { CategoryWithChildren } from "@/lib/catalog";

interface CategoryCardProps {
  category: CategoryWithChildren;
  index: number;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  smartphone: <Smartphone className="w-7 h-7" />,
  phone:      <Smartphone className="w-7 h-7" />,
  audio:      <Headphones className="w-7 h-7" />,
  headphone:  <Headphones className="w-7 h-7" />,
  laptop:     <Laptop className="w-7 h-7" />,
  computer:   <Laptop className="w-7 h-7" />,
  watch:      <Watch className="w-7 h-7" />,
  camera:     <Camera className="w-7 h-7" />,
  gaming:     <Gamepad2 className="w-7 h-7" />,
  game:       <Gamepad2 className="w-7 h-7" />,
};

const GRADIENT_CYCLES = [
  "from-market-navy to-flow-cyan",
  "from-flow-cyan to-flow-cyan-light",
  "from-market-navy-dark to-market-navy",
  "from-flow-cyan to-market-navy",
  "from-silver-metallic to-flow-cyan",
];

function getCategoryIcon(name: string): React.ReactNode {
  const lower = name.toLowerCase();
  for (const [keyword, icon] of Object.entries(ICON_MAP)) {
    if (lower.includes(keyword)) return icon;
  }
  return <Package className="w-7 h-7" />;
}

/** Returns true only for URLs that serve an actual image binary */
function isImageSrc(url: string | null): url is string {
  if (!url) return false;
  // Unsplash photo-page URLs (unsplash.com/photos/…) serve HTML — skip them.
  // Only trust CDN delivery URLs (images.unsplash.com) and known image hosts.
  try {
    const { hostname, pathname } = new URL(url);
    if (hostname === "unsplash.com") return false; // page URL, not an image
    // Must look like an image file or a known image CDN path
    return (
      /\.(jpe?g|png|webp|avif|gif|svg)(\?|$)/i.test(pathname) ||
      hostname === "images.unsplash.com" ||
      hostname.endsWith(".amazonaws.com") ||
      hostname.endsWith(".cloudinary.com") ||
      hostname === "via.placeholder.com" ||
      hostname === "placehold.co"
    );
  } catch {
    return false;
  }
}

export function CategoryCard({ category, index }: CategoryCardProps) {
  const gradient = GRADIENT_CYCLES[index % GRADIENT_CYCLES.length];
  const showImage = isImageSrc(category.imageUrl);

  return (
    <article className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:border-accent/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Visual header */}
      <div className={`relative h-40 overflow-hidden bg-linear-to-br ${gradient}`}>
        {showImage ? (
          <Image
            src={category.imageUrl as string}
            alt={category.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
          />
        ) : null}

        {/* Overlay gradient for readability */}
        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />

        {/* Icon — bottom-left */}
        <div className="absolute bottom-4 left-4 w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform duration-300">
          {getCategoryIcon(category.name)}
        </div>

        {/* Count badge — top-right */}
        {category.productCount > 0 && (
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white text-[10px] font-bold">
            {category.productCount} products
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-5 space-y-4">
        {/* Title + CTA */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="font-bold text-base text-foreground group-hover:text-accent transition-colors leading-tight">
              {category.name}
            </h2>
            {category.description && (
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {category.description}
              </p>
            )}
          </div>
          <Link
            href={`/products?category=${category.slug}`}
            className="shrink-0 inline-flex items-center gap-1 h-8 px-3 rounded-xl bg-accent/10 text-accent text-xs font-bold hover:bg-accent hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-flow-cyan"
            aria-label={`Shop all ${category.name}`}
          >
            <span>Shop all</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Sub-categories */}
        {category.children.length > 0 && (
          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Sub-categories
            </p>
            <div className="flex flex-col gap-1.5">
              {category.children.slice(0, 4).map((child) => (
                <CategorySubItem key={child.id} category={child} />
              ))}
              {category.children.length > 4 && (
                <Link
                  href={`/products?category=${category.slug}`}
                  className="text-xs font-semibold text-accent hover:underline mt-1"
                >
                  +{category.children.length - 4} more…
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
