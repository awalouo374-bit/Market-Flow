import type { Metadata } from "next";
import { CheckoutPageClient } from "@/modules/checkout/CheckoutPageClient";

export const metadata: Metadata = {
  title: "Secure Checkout — MarketFlow",
  description:
    "Complete your order securely with MarketFlow. 256-bit TLS encryption, PCI DSS Level 1 compliant payment processing, and instant order confirmation.",
  keywords: [
    "checkout",
    "secure payment",
    "marketflow order",
    "buy online",
  ],
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "MarketFlow Secure Checkout",
    description: "Place your order securely with encrypted payments and instant confirmation.",
    type: "website",
  },
};

export default function CheckoutPage() {
  return <CheckoutPageClient />;
}
