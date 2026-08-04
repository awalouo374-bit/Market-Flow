"use client";

import { useState } from "react";
import { Store } from "lucide-react";
import { FieldGroup } from "./FieldGroup";

const CURRENCIES = ["EUR", "USD", "GBP", "CAD", "CHF", "JPY"];
const TIMEZONES = [
  "Europe/Paris",
  "Europe/London",
  "America/New_York",
  "America/Los_Angeles",
  "America/Chicago",
  "Asia/Tokyo",
  "Asia/Dubai",
  "Australia/Sydney",
];

interface TabStoreProps {
  onChange: () => void;
}

export function TabStore({ onChange }: TabStoreProps) {
  const [storeName, setStoreName] = useState("MarketFlow Store");
  const [storeUrl, setStoreUrl] = useState("https://marketflow.io");
  const [currency, setCurrency] = useState("EUR");
  const [timezone, setTimezone] = useState("Europe/Paris");
  const [supportEmail, setSupportEmail] = useState("support@marketflow.io");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const base =
    "w-full h-10 rounded-xl border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors";
  const err = "border-destructive focus:ring-destructive/40";

  function validateUrl(val: string) {
    try { new URL(val); return true; } catch { return false; }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/40 border border-border">
        <div className="p-2.5 rounded-xl bg-accent/10 text-accent shrink-0">
          <Store className="w-5 h-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">Paramètres de la boutique</p>
          <p className="text-xs text-muted-foreground">Informations publiques et préférences régionales</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FieldGroup label="Nom de la boutique" htmlFor="store-name" required>
          <input
            id="store-name"
            type="text"
            value={storeName}
            className={base}
            onChange={(e) => { setStoreName(e.target.value); onChange(); }}
          />
        </FieldGroup>

        <FieldGroup
          label="URL publique"
          htmlFor="store-url"
          error={errors.url}
          tooltip="URL canonique de votre vitrine — utilisée dans les e-mails transactionnels et les sitemaps."
        >
          <input
            id="store-url"
            type="url"
            value={storeUrl}
            className={`${base} ${errors.url ? err : ""}`}
            onChange={(e) => {
              setStoreUrl(e.target.value);
              if (!validateUrl(e.target.value)) {
                setErrors((p) => ({ ...p, url: "URL invalide (ex : https://…)" }));
              } else {
                setErrors((p) => { const n = { ...p }; delete n.url; return n; });
              }
              onChange();
            }}
          />
        </FieldGroup>

        <FieldGroup label="E-mail support" htmlFor="support-email">
          <input
            id="support-email"
            type="email"
            value={supportEmail}
            className={base}
            onChange={(e) => { setSupportEmail(e.target.value); onChange(); }}
          />
        </FieldGroup>

        <FieldGroup
          label="Devise"
          htmlFor="store-currency"
          tooltip="Devise affichée sur la vitrine et dans les rapports. Modifiable uniquement hors période fiscale."
        >
          <select
            id="store-currency"
            value={currency}
            className={`${base} cursor-pointer`}
            onChange={(e) => { setCurrency(e.target.value); onChange(); }}
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </FieldGroup>

        <FieldGroup label="Fuseau horaire" htmlFor="store-timezone">
          <select
            id="store-timezone"
            value={timezone}
            className={`${base} cursor-pointer`}
            onChange={(e) => { setTimezone(e.target.value); onChange(); }}
          >
            {TIMEZONES.map((tz) => (
              <option key={tz} value={tz}>{tz}</option>
            ))}
          </select>
        </FieldGroup>
      </div>
    </div>
  );
}
