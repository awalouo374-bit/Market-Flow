import type { Metadata } from "next";
import { ShippingHeroCalculator } from "@/modules/shipping/ShippingHeroCalculator";
import { ShippingTiersGrid } from "@/modules/shipping/ShippingTiersGrid";
import { OrderTrackingLookup } from "@/modules/shipping/OrderTrackingLookup";
import { ShippingFaqAccordion } from "@/modules/shipping/ShippingFaqAccordion";

export const metadata: Metadata = {
  title: "Global Shipping & Live Delivery Tracking — MarketFlow",
  description:
    "Calculate global shipping rates, track your MarketFlow orders in real-time, explore express fulfillment options, and enjoy Free Worldwide Delivery on orders over $75.",
  keywords: [
    "shipping calculator",
    "marketflow shipping",
    "order tracking",
    "free shipping threshold",
    "express air delivery",
    "DDP customs guarantee",
  ],
  openGraph: {
    title: "Global Shipping & Delivery Calculator | MarketFlow",
    description:
      "Calculate real-time shipping rates, track your package live, and explore worldwide priority air options with zero customs surprises.",
    type: "website",
  },
};

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white selection:bg-[#00F0FF] selection:text-slate-950 font-sans">
      {/* Hero Section & Quick Calculator Widget */}
      <ShippingHeroCalculator />

      {/* Shipping Tiers Grid */}
      <ShippingTiersGrid />

      {/* Live Order Tracking Quick-Lookup */}
      <OrderTrackingLookup />

      {/* International Delivery & Accordion Policy Section */}
      <ShippingFaqAccordion />
    </div>
  );
}
