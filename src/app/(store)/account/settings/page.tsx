import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getConnectedUser } from "@/lib/session";
import { db } from "@/db";
import { userAddresses } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import {
  AccountSettingsPanel,
  type AddressData,
  type SettingsProfile,
} from "@/modules/account/AccountSettingsPanel";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Parametres du compte - MarketFlow",
  description:
    "Modifiez votre profil, changez votre mot de passe et gerez vos adresses de livraison.",
};

export default async function AccountSettingsPage() {
  const connected = await getConnectedUser();
  if (!connected) redirect("/login");

  const dbAddresses = await db
    .select()
    .from(userAddresses)
    .where(eq(userAddresses.userId, connected.id))
    .orderBy(desc(userAddresses.isDefault), desc(userAddresses.createdAt));

  const profile: SettingsProfile = {
    id: connected.id,
    name: connected.name ?? "",
    email: connected.email,
    image: connected.image,
  };

  const addresses: AddressData[] = dbAddresses.map((a) => ({
    id: a.id,
    title: a.title ?? null,
    recipientName: a.recipientName,
    phone: a.phone ?? null,
    streetAddress: a.streetAddress,
    city: a.city,
    state: a.state ?? null,
    postalCode: a.postalCode,
    country: a.country,
    isDefault: a.isDefault,
  }));

  return <AccountSettingsPanel profile={profile} addresses={addresses} />;
}
