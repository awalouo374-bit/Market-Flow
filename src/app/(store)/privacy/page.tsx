import type { Metadata } from "next";
import { PrivacyHeroSection } from "@/modules/privacy/PrivacyHeroSection";
import { PrivacyDataRightsWidget } from "@/modules/privacy/PrivacyDataRightsWidget";
import { PrivacyPolicySections } from "@/modules/privacy/PrivacyPolicySections";

export const metadata: Metadata = {
  title: "Privacy Policy & Data Rights Control Center — MarketFlow",
  description:
    "Learn how MarketFlow protects your personal data with AES-256 encryption, zero third-party data selling, and GDPR/CCPA compliant self-service data rights controls.",
  keywords: [
    "privacy policy",
    "marketflow data rights",
    "GDPR request",
    "CCPA opt out",
    "data encryption",
    "zero third-party sales",
  ],
  openGraph: {
    title: "MarketFlow Privacy Policy & Data Control Center",
    description: "Exercise your data rights, export your data archive, or request profile deletion with 1-click transparency.",
    type: "website",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white selection:bg-[#00F0FF] selection:text-slate-950 font-sans">
      <PrivacyHeroSection />
      <PrivacyDataRightsWidget />
      <PrivacyPolicySections />
    </div>
  );
}
