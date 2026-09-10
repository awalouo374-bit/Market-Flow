"use client";

import { useState, useCallback } from "react";
import { User, Store, Plug, ShieldCheck } from "lucide-react";
import { TabProfile } from "./TabProfile";
import { TabStore } from "./TabStore";
import { TabIntegrations } from "./TabIntegrations";
import { TabSecurity } from "./TabSecurity";
import { StickyActionBar } from "./StickyActionBar";

const TABS = [
  { key: "profile",      label: "Profil",        icon: User },
  { key: "store",        label: "Boutique",       icon: Store },
  { key: "integrations", label: "Intégrations",   icon: Plug },
  { key: "security",     label: "Sécurité",       icon: ShieldCheck },
] as const;

type TabKey = typeof TABS[number]["key"];

interface SettingsShellProps {
  user: { name: string; email: string; image: string | null };
}

export function SettingsShell({ user }: SettingsShellProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("profile");
  const [dirtyTabs, setDirtyTabs] = useState<Set<TabKey>>(new Set());
  const [isSaving, setIsSaving] = useState(false);
  const [savedLabel, setSavedLabel] = useState<string | undefined>();

  const isDirty = dirtyTabs.size > 0;

  const markDirty = useCallback(() => {
    setDirtyTabs((prev) => new Set(prev).add(activeTab));
    setSavedLabel(undefined);
  }, [activeTab]);

  async function handleSave() {
    setIsSaving(true);
    // Simulate async save — replace with real server action call
    await new Promise((r) => setTimeout(r, 900));
    setIsSaving(false);
    setDirtyTabs(new Set());
    setSavedLabel("Modifications enregistrées");
    setTimeout(() => setSavedLabel(undefined), 4000);
  }

  function handleDiscard() {
    setDirtyTabs(new Set());
    setSavedLabel(undefined);
  }

  return (
    <div className="w-full min-w-0 space-y-6">
      {/* Mobile horizontal tabs (< sm) */}
      <div className="sm:hidden w-full overflow-hidden">
        <nav
          aria-label="Sections des paramètres (mobile)"
          className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-border no-scrollbar -mx-1 px-1"
        >
          {TABS.map(({ key, label, icon: Icon }) => {
            const isActive = activeTab === key;
            const hasDirty = dirtyTabs.has(key);
            return (
              <button
                key={key}
                type="button"
                aria-current={isActive ? "page" : undefined}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl whitespace-nowrap text-xs font-semibold shrink-0 transition-all ${
                  isActive
                    ? "bg-accent/10 text-accent border border-accent/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-accent" : ""}`} />
                <span>{label}</span>
                {hasDirty && (
                  <span
                    aria-label="Modifications en attente"
                    className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 min-w-0">
        {/* Left vertical tab nav (sm+) */}
        <nav
          aria-label="Sections des paramètres"
          className="hidden sm:flex flex-col gap-1 w-44 shrink-0"
        >
          {TABS.map(({ key, label, icon: Icon }) => {
            const isActive = activeTab === key;
            const hasDirty = dirtyTabs.has(key);
            return (
              <button
                key={key}
                type="button"
                aria-current={isActive ? "page" : undefined}
                onClick={() => setActiveTab(key)}
                className={`group relative flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold text-left transition-all duration-200 ${
                  isActive
                    ? "bg-accent/10 text-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-accent" : ""}`} />
                <span className="flex-1">{label}</span>
                {hasDirty && !isActive && (
                  <span
                    aria-label="Modifications en attente"
                    className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"
                  />
                )}
                {isActive && (
                  <span className="absolute left-0 inset-y-0 w-0.5 rounded-r-full bg-accent" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Tab content */}
        <div className="flex-1 min-w-0 pb-20">
          {activeTab === "profile" && <TabProfile initial={user} onChange={markDirty} />}
          {activeTab === "store" && <TabStore onChange={markDirty} />}
          {activeTab === "integrations" && <TabIntegrations onChange={markDirty} />}
          {activeTab === "security" && <TabSecurity onChange={markDirty} />}
        </div>
      </div>

      <StickyActionBar
        isDirty={isDirty}
        isSaving={isSaving}
        savedLabel={savedLabel}
        onSave={handleSave}
        onDiscard={handleDiscard}
      />
    </div>
  );
}
