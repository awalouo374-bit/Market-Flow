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
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-accent/10 text-accent">
          <Settings className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Paramètres</h1>
          <p className="text-xs text-muted-foreground">
            Profil admin, configuration de la boutique, intégrations et sécurité
          </p>
        </div>
      </div>

      <SettingsShell user={userData} />
    </div>
  );
}
