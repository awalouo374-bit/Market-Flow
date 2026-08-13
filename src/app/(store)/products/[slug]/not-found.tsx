import Link from "next/link";
import { SearchX } from "lucide-react";
import { GradientText } from "@/components/shared/GradientText";
import { BrandButton } from "@/components/shared/BrandButton";

export default function ProductNotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-32 text-center space-y-6">
      <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground mx-auto">
        <SearchX className="w-10 h-10 stroke-1" />
      </div>
      <div className="space-y-2">
        <GradientText as="h1" variant="flow" className="text-3xl font-extrabold">
          Product not found
        </GradientText>
        <p className="text-muted-foreground">
          This product may have been removed or the link is incorrect.
        </p>
      </div>
      <Link href="/products">
        <BrandButton variant="flow" size="md">Browse all products</BrandButton>
      </Link>
    </div>
  );
}
