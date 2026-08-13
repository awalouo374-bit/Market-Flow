import type { Metadata } from "next";
import { Suspense } from "react";
import { getConnectedUser } from "@/lib/session";
import { getUserOrders } from "@/lib/user-orders";
import { SupportPageContent } from "@/modules/support/SupportPageContent";
import { SupportSkeleton } from "@/modules/support/SupportSkeleton";
import { NewsletterSection } from "@/modules/catalog/NewsletterSection";

// Opt out of static pre-rendering — support session & recent orders are fetched dynamically
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Help & Customer Support Hub – MarketFlow",
  description:
    "Get instant help with your MarketFlow orders, returns, warranty claims, and technical inquiries. Live chat, FAQs, and ticket support.",
  openGraph: {
    title: "Help & Customer Support Hub – MarketFlow",
    description:
      "Omnichannel support hub with instant FAQ search, live chat, order tracking, and direct email ticket submission.",
  },
};

async function SupportContent() {
  const connectedUser = await getConnectedUser();
  const userOrders = await getUserOrders(connectedUser?.id);

  return (
    <SupportPageContent
      userOrders={userOrders}
      userName={connectedUser?.name}
      userEmail={connectedUser?.email}
    />
  );
}

export default function SupportPage() {
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      <Suspense fallback={<SupportSkeleton />}>
        <SupportContent />
      </Suspense>

      {/* Newsletter Signup */}
      <NewsletterSection />
    </div>
  );
}
