import React from "react";
import { getConnectedUser } from "@/lib/session";
import { getAccountDashboardData } from "@/lib/user-account";
import { AccountHeader } from "@/modules/account/AccountHeader";
import { AccountSidebarNav } from "@/modules/account/AccountSidebarNav";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const connectedUser = await getConnectedUser();

  const { profile, stats } = await getAccountDashboardData(connectedUser?.id, {
    name: connectedUser?.name,
    email: connectedUser?.email,
    image: connectedUser?.image,
  });

  return (
    <div className="min-h-screen bg-[#070a14]">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Profile Header — full width */}
        <AccountHeader profile={profile} stats={stats} />

        {/* Body: sticky sidebar + page content */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="lg:sticky lg:top-24 w-full lg:w-72 shrink-0">
            <AccountSidebarNav activeOrdersCount={stats.activeOrdersCount} />
          </div>

          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
