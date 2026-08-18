import type { Metadata } from "next";
import { TermsHeroSection } from "@/modules/terms/TermsHeroSection";
import { TermsAcceptanceWidget } from "@/modules/terms/TermsAcceptanceWidget";
import { TermsSectionsAccordion } from "@/modules/terms/TermsSectionsAccordion";

export const metadata: Metadata = {
  title: "Terms of Service & Usage Conditions — MarketFlow",
  description:
    "Review MarketFlow's official Terms of Service, order acceptance conditions, DDP payment guarantees, intellectual property protections, and user agreements.",
  keywords: [
    "terms of service",
    "marketflow terms",
    "user agreement",
    "store terms and conditions",
    "order acceptance policy",
  ],
  openGraph: {
    title: "MarketFlow Terms of Service & User Conditions",
    description: "Official legal terms governing store usage, order fulfillment, and account privileges.",
    type: "website",
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white selection:bg-[#00F0FF] selection:text-slate-950 font-sans">
      <TermsHeroSection />
      <TermsAcceptanceWidget />
      <TermsSectionsAccordion />
    </div>
  );
}
