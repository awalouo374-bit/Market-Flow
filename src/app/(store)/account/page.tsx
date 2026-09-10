import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { Suspense } from "react";
import {
  Package,
  MapPin,
  CreditCard,
  ShieldCheck,
  ArrowRight,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
  Sparkles,
  Star,
  Heart,
  ShoppingBag,
} from "lucide-react";
import { getConnectedUser } from "@/lib/session";
import { getAccountDashboardData } from "@/lib/user-account";
import type { CustomerOrder } from "@/lib/user-orders";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mon Compte – MarketFlow",
  description:
    "Gérez vos commandes, adresses, paiements et préférences depuis votre espace client MarketFlow.",
  openGraph: {
    title: "Mon Compte – MarketFlow",
    description: "Votre tableau de bord client MarketFlow 2026.",
  },
};

/* ─────────────────────────────────────────────
   Status helpers
───────────────────────────────────────────── */
type StatusConfig = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  cls: string;
};

function OrderStatusBadge({ status }: { status: CustomerOrder["status"] }) {
  const map: Record<CustomerOrder["status"], StatusConfig> = {
    processing: {
      icon: Clock,
      label: "En traitement",
      cls: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    },
    shipped: {
      icon: Truck,
      label: "Expédié",
      cls: "bg-[oklch(0.72_0.16_220)]/10 text-[oklch(0.72_0.16_220)] border-[oklch(0.72_0.16_220)]/30",
    },
    delivered: {
      icon: CheckCircle2,
      label: "Livré",
      cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    },
    cancelled: {
      icon: XCircle,
      label: "Annulé",
      cls: "bg-destructive/10 text-destructive border-destructive/30",
    },
    pending: {
      icon: Clock,
      label: "En attente",
      cls: "bg-slate-500/10 text-slate-400 border-slate-500/30",
    },
    refunded: {
      icon: XCircle,
      label: "Remboursé",
      cls: "bg-violet-500/10 text-violet-400 border-violet-500/30",
    },
  };

  const cfg = map[status] ?? map.pending;
  const Icon = cfg.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold ${cfg.cls}`}
    >
      <Icon className="h-3 w-3" />
      {cfg.label}
    </span>
  );
}

/* ─────────────────────────────────────────────
   Latest Order Mini-Card
───────────────────────────────────────────── */
function LatestOrderCard({ order }: { order: CustomerOrder }) {
  const firstItem = order.items[0];
  const extraCount = order.items.length - 1;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0d1528] to-[#090e1b] p-5 shadow-xl transition-all hover:border-[oklch(0.72_0.16_220)]/40 hover:shadow-[0_0_32px_oklch(0.72_0.16_220/8%)]">
      {/* Glow */}
      <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-[oklch(0.72_0.16_220)]/5 blur-3xl" />

      <div className="relative z-10 space-y-4">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-slate-400">
              Dernière commande
            </p>
            <p className="text-sm font-bold text-white">{order.orderNumber}</p>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>

        {/* First item */}
        {firstItem && (
          <div className="flex items-center gap-3.5 rounded-xl border border-white/5 bg-white/[0.02] p-3">
            {firstItem.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={firstItem.image}
                alt={firstItem.productName}
                className="h-12 w-12 rounded-lg object-cover border border-white/10"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
                <Package className="h-5 w-5 text-slate-400" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">
                {firstItem.productName}
              </p>
              {firstItem.variantName && (
                <p className="truncate text-xs text-slate-400">
                  {firstItem.variantName}
                </p>
              )}
            </div>
            {extraCount > 0 && (
              <span className="shrink-0 text-xs font-bold text-slate-400">
                +{extraCount} article{extraCount > 1 ? "s" : ""}
              </span>
            )}
          </div>
        )}

        {/* Footer row */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            {order.estimatedDelivery && (
              <p className="text-xs text-slate-400 flex items-center gap-1.5">
                <Truck className="h-3 w-3 text-[oklch(0.72_0.16_220)]" />
                {order.estimatedDelivery}
              </p>
            )}
            <p className="text-base font-extrabold text-white">
              {parseFloat(order.total).toLocaleString("fr-FR", {
                style: "currency",
                currency: "EUR",
              })}
            </p>
          </div>

          <Link
            href="/account/orders"
            className="inline-flex items-center gap-1.5 rounded-xl border border-[oklch(0.72_0.16_220)]/30 bg-[oklch(0.72_0.16_220)]/10 px-3.5 py-2 text-xs font-bold text-[oklch(0.72_0.16_220)] transition-all hover:bg-[oklch(0.72_0.16_220)]/20 hover:shadow-[0_0_16px_oklch(0.72_0.16_220/20%)]"
          >
            Voir détails
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Quick Action tiles
───────────────────────────────────────────── */
const QUICK_ACTIONS = [
  {
    id: "orders",
    label: "Mes Commandes",
    description: "Suivi, factures & retours",
    href: "/account/orders",
    icon: ShoppingBag,
    accent: "oklch(0.72_0.16_220)",
    glow: "bg-[oklch(0.72_0.16_220)]/8",
    border: "hover:border-[oklch(0.72_0.16_220)]/40",
    iconBg: "bg-[oklch(0.72_0.16_220)]/15 text-[oklch(0.72_0.16_220)]",
  },
  {
    id: "addresses",
    label: "Mes Adresses",
    description: "Livraison & facturation",
    href: "#addresses",
    icon: MapPin,
    accent: "oklch(0.68_0.20_30)",
    glow: "bg-[oklch(0.68_0.20_30)]/8",
    border: "hover:border-[oklch(0.68_0.20_30)]/40",
    iconBg: "bg-[oklch(0.68_0.20_30)]/15 text-[oklch(0.68_0.20_30)]",
  },
  {
    id: "payments",
    label: "Paiements",
    description: "Cartes & méthodes sauvegardées",
    href: "#payments",
    icon: CreditCard,
    accent: "oklch(0.78_0.18_150)",
    glow: "bg-emerald-500/8",
    border: "hover:border-emerald-500/40",
    iconBg: "bg-emerald-500/15 text-emerald-400",
  },
  {
    id: "security",
    label: "Sécurité",
    description: "Mot de passe & 2FA",
    href: "/account/settings",
    icon: ShieldCheck,
    accent: "oklch(0.70_0.14_280)",
    glow: "bg-violet-500/8",
    border: "hover:border-violet-500/40",
    iconBg: "bg-violet-500/15 text-violet-400",
  },
  {
    id: "wishlist",
    label: "Liste de Souhaits",
    description: "Vos produits sauvegardés",
    href: "/wishlist",
    icon: Heart,
    accent: "oklch(0.65_0.22_0)",
    glow: "bg-rose-500/8",
    border: "hover:border-rose-500/40",
    iconBg: "bg-rose-500/15 text-rose-400",
  },
  {
    id: "reviews",
    label: "Mes Avis",
    description: "Évaluations publiées",
    href: "#reviews",
    icon: Star,
    accent: "oklch(0.85_0.18_85)",
    glow: "bg-amber-500/8",
    border: "hover:border-amber-500/40",
    iconBg: "bg-amber-500/15 text-amber-400",
  },
];

/* ─────────────────────────────────────────────
   Product Recommendation Card
───────────────────────────────────────────── */
function RecommendationCard({
  product,
}: {
  product: { id: string; name: string; price: string; image?: string | null; slug: string };
}) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-[#0c1427]/60 transition-all hover:border-[oklch(0.72_0.16_220)]/30 hover:bg-[#0c1427]/90"
    >
      <div className="aspect-square overflow-hidden bg-[#090e1b]">
        {product.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Package className="h-10 w-10 text-slate-600" />
          </div>
        )}
      </div>
      <div className="p-3 space-y-1">
        <p className="text-xs font-semibold text-white line-clamp-2 leading-snug">
          {product.name}
        </p>
        <p className="text-sm font-extrabold text-[oklch(0.72_0.16_220)]">
          {parseFloat(product.price).toLocaleString("fr-FR", {
            style: "currency",
            currency: "EUR",
          })}
        </p>
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────────
   Main async content component
───────────────────────────────────────────── */
async function AccountOverviewContent() {
  const connectedUser = await getConnectedUser();
  const { latestOrder, recommendations } = await getAccountDashboardData(
    connectedUser?.id,
    {
      name: connectedUser?.name,
      email: connectedUser?.email,
      image: connectedUser?.image,
    }
  );

  return (
    <div className="space-y-8">
      {/* ── Section: Latest order ── */}
      <section aria-labelledby="latest-order-title" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2
            id="latest-order-title"
            className="text-base font-bold text-white flex items-center gap-2"
          >
            <Package className="h-4.5 w-4.5 text-[oklch(0.72_0.16_220)]" />
            Commande récente
          </h2>
          <Link
            href="/account/orders"
            className="text-xs font-semibold text-[oklch(0.72_0.16_220)] hover:underline flex items-center gap-1"
          >
            Tout voir
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {latestOrder ? (
          <LatestOrderCard order={latestOrder} />
        ) : (
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-8 text-center space-y-3">
            <Package className="h-10 w-10 text-slate-500 mx-auto" />
            <p className="text-sm font-semibold text-slate-300">
              Aucune commande pour l&apos;instant
            </p>
            <p className="text-xs text-slate-500">
              Vos commandes apparaîtront ici une fois passées.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-[oklch(0.68_0.20_30)] px-4 py-2.5 text-xs font-bold text-white transition-all hover:brightness-110 shadow-lg shadow-[oklch(0.68_0.20_30)/20%]"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              Commencer à magasiner
            </Link>
          </div>
        )}
      </section>

      {/* ── Section: Quick Actions ── */}
      <section aria-labelledby="quick-actions-title" className="space-y-4">
        <h2
          id="quick-actions-title"
          className="text-base font-bold text-white flex items-center gap-2"
        >
          <Sparkles className="h-4.5 w-4.5 text-amber-400" />
          Accès rapide
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.id}
                href={action.href}
                className={`group flex flex-col gap-3 rounded-2xl border border-white/8 ${action.glow} bg-[#0c1427]/50 p-4 transition-all duration-300 ${action.border} hover:shadow-lg backdrop-blur-sm`}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${action.iconBg} transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-bold text-white leading-tight">
                    {action.label}
                  </p>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    {action.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Section: Recommendations ── */}
      {recommendations.length > 0 && (
        <section aria-labelledby="recs-title" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2
              id="recs-title"
              className="text-base font-bold text-white flex items-center gap-2"
            >
              <Star className="h-4.5 w-4.5 text-amber-400 fill-amber-400/30" />
              Sélectionnés pour vous
            </h2>
            <Link
              href="/"
              className="text-xs font-semibold text-[oklch(0.72_0.16_220)] hover:underline flex items-center gap-1"
            >
              Voir tout
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {recommendations.map((product) => (
              <RecommendationCard
                key={product.id}
                product={{
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.primaryImage ?? null,
                  slug: product.slug,
                }}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Skeleton fallback
───────────────────────────────────────────── */
function OverviewSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Latest order skeleton */}
      <div className="h-48 rounded-2xl bg-white/[0.03] border border-white/5" />

      {/* Quick actions skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-28 rounded-2xl bg-white/[0.03] border border-white/5"
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Page export
───────────────────────────────────────────── */
export default function AccountOverviewPage() {
  return (
    <Suspense fallback={<OverviewSkeleton />}>
      <AccountOverviewContent />
    </Suspense>
  );
}
