import React from "react";
import { HeaderNavigation } from "@/components/navigation/HeaderNavigation";
import { FooterNavigation } from "@/components/navigation/FooterNavigation";



export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <HeaderNavigation />
      <main className="flex-1">{children}</main>
      <FooterNavigation />
    </div>
  );
}
