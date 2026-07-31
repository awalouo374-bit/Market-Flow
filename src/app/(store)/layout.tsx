import React from "react";
import { HeaderNavigation } from "@/components/navigation/HeaderNavigation";
import { FooterNavigation } from "@/components/navigation/FooterNavigation";
import { getConnectedUser } from "@/lib/session"


export default async function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getConnectedUser();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <HeaderNavigation userName={user?.name?.toString()} userEmail={user?.email?.toString()} />
      <main className="flex-1">{children}</main>
      <FooterNavigation />
    </div>
  );
}
