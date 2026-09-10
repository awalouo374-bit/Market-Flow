import type { Metadata } from "next";
import { Settings } from "lucide-react";
import { getConnectedUser } from "@/lib/session";
import { SettingsShell } from "@/modules/admin/settings/SettingsShell";

export const metadata: Metadata = { title: "Paramètres — MarketFlow Admin" };

export default async function AdminSettingsPage() {
  const user = await getConnectedUser();

  const userData = {
    name: user?.name ?? "",
    email: user?.email ?? "",
    image: user?.image ?? null,
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 min-w-0 w-full">
      {/* Page header */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="p-2.5 rounded-xl bg-accent/10 text-accent shrink-0">
          <Settings className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <h1 className="text-lg sm:text-xl font-bold text-foreground truncate">Paramètres</h1>
          <p className="text-xs text-muted-foreground line-clamp-1 sm:line-clamp-none">
            Profil admin, configuration de la boutique, intégrations et sécurité
          </p>
        </div>
      </div>

      <SettingsShell user={userData} />
    </div>
  );
}
