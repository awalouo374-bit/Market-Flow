import type { Metadata } from "next";
import { Suspense } from "react";
import { getConnectedUser } from "@/lib/session";
import { getUserOrders } from "@/lib/user-orders";
import { AccountOrdersDashboard } from "@/modules/account/AccountOrdersDashboard";
import { OrderSkeleton } from "@/modules/account/OrderSkeleton";

// Opt out of static pre-rendering — order data is user-specific and fetched dynamically
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mes Commandes – MarketFlow",
  description:
    "Suivez vos livraisons, téléchargez vos factures PDF et gérez vos retours depuis votre espace client MarketFlow.",
  openGraph: {
    title: "Mes Commandes – MarketFlow",
    description:
      "Historique d'achats, suivi en direct et gestion des retours.",
  },
};

async function OrdersContent() {
  const connectedUser = await getConnectedUser();
  const orders = await getUserOrders(connectedUser?.id);

  return (
    <AccountOrdersDashboard
      orders={orders}
      userName={connectedUser?.name ?? "Client"}
      userEmail={connectedUser?.email ?? "client@marketflow.com"}
    />
  );
}

export default function AccountOrdersPage() {
  return (
    <Suspense fallback={<OrderSkeleton count={3} />}>
      <OrdersContent />
    </Suspense>
  );
}
