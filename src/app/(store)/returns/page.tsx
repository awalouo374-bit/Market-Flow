import type { Metadata } from "next";
import { ReturnsHeroPortal } from "@/modules/returns/ReturnsHeroPortal";
import { ReturnProcessSteps } from "@/modules/returns/ReturnProcessSteps";
import { ReturnsFaqAccordion } from "@/modules/returns/ReturnsFaqAccordion";

export const metadata: Metadata = {
  title: "30-Day Easy Returns & Exchanges Portal — MarketFlow",
  description:
    "Initiate instant returns, download free prepaid shipping labels, and receive immediate refunds or bonus store credit with MarketFlow's 30-day guarantee.",
  keywords: [
    "returns portal",
    "marketflow returns",
    "prepaid shipping label",
    "instant refund",
    "30-day money back guarantee",
  ],
  openGraph: {
    title: "MarketFlow Easy Self-Service Returns & Refunds",
    description: "Generate prepaid return shipping labels in under 60 seconds with instant store credit bonuses.",
    type: "website",
  },
};

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white selection:bg-[#00F0FF] selection:text-slate-950 font-sans">
      <ReturnsHeroPortal />
      <ReturnProcessSteps />
      <ReturnsFaqAccordion />
    </div>
  );
}
