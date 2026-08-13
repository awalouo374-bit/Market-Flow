import type { Metadata } from "next";
import { Suspense } from "react";
import { getConnectedUser } from "@/lib/session";
import { getUserOrders } from "@/lib/user-orders";
import { AccountOrdersDashboard } from "@/modules/account/AccountOrdersDashboard";
import { OrderSkeleton } from "@/modules/account/OrderSkeleton";
import { NewsletterSection } from "@/modules/catalog/NewsletterSection";

// Opt out of static pre-rendering — order data is user-specific and fetched dynamically
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Order History & Live Tracking – MarketFlow",
  description:
    "Track shipment progress, view order status steppers, download PDF invoices, and manage returns with MarketFlow.",
  openGraph: {
    title: "Order History & Live Tracking – MarketFlow",
    description:
      "Manage purchase history, track live shipments, and reorder past tech purchases.",
  },
};

async function OrdersContent() {
  const connectedUser = await getConnectedUser();
  const orders = await getUserOrders(connectedUser?.id);

  return (
    <AccountOrdersDashboard
      orders={orders}
      userName={connectedUser?.name ?? "Customer"}
      userEmail={connectedUser?.email ?? "customer@marketflow.com"}
    />
  );
}

export default function AccountOrdersPage() {
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      <Suspense fallback={<OrderSkeleton count={3} />}>
        <OrdersContent />
      </Suspense>

      {/* Newsletter Section */}
      <NewsletterSection />
    </div>
  );
}
