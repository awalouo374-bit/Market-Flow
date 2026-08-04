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
    <>
      <div className="flex gap-6">
        {/* Left vertical tab nav */}
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

        {/* Mobile horizontal tabs */}
        <div className="sm:hidden w-full">
          <div className="flex overflow-x-auto gap-1 border-b border-border pb-0 mb-4 -mx-1 px-1">
            {TABS.map(({ key, label, icon: Icon }) => {
              const isActive = activeTab === key;
              const hasDirty = dirtyTabs.has(key);
              return (
                <button key={key} type="button" onClick={() => setActiveTab(key)}
                  className={`flex items-center gap-1.5 px-3 py-2 whitespace-nowrap text-sm font-semibold border-b-2 transition-colors ${
                    isActive ? "border-accent text-accent" : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}>
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                  {hasDirty && <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
                </button>
              );
            })}
          </div>
        </div>

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
    </>
  );
}
