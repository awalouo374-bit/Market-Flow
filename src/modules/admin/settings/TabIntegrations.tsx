"use client";

import { useState } from "react";
import { Copy, Eye, EyeOff, CheckCircle2, AlertCircle, Zap } from "lucide-react";
import { FieldGroup } from "./FieldGroup";

interface ApiKeyFieldProps {
  id: string;
  label: string;
  value: string;
  tooltip?: string;
  onChange: (v: string) => void;
}

function ApiKeyField({ id, label, value, tooltip, onChange }: ApiKeyFieldProps) {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <FieldGroup label={label} htmlFor={id} tooltip={tooltip}>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            id={id}
            type={visible ? "text" : "password"}
            value={value}
            autoComplete="off"
            spellCheck={false}
            className="w-full h-10 rounded-xl border border-border bg-background pl-3 pr-20 font-mono text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
            onChange={(e) => onChange(e.target.value)}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <button
              type="button"
              aria-label={visible ? "Masquer la clé" : "Afficher la clé"}
              onClick={() => setVisible((v) => !v)}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              {visible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </button>
            <button
              type="button"
              aria-label="Copier la clé"
              onClick={copy}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              {copied
                ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </FieldGroup>
  );
}

type IntegrationStatus = "connected" | "disconnected" | "error";

function IntegrationBadge({ status, mode }: { status: IntegrationStatus; mode?: "live" | "test" }) {
  const configs = {
    connected: { cls: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", label: "Connecté" },
    disconnected: { cls: "bg-muted text-muted-foreground border-border", label: "Non configuré" },
    error: { cls: "bg-destructive/10 text-destructive border-destructive/20", label: "Erreur" },
  };
  const { cls, label } = configs[status];
  return (
    <div className="flex items-center gap-1.5">
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${cls}`}>
        {status === "connected"
          ? <CheckCircle2 className="w-3 h-3" />
          : <AlertCircle className="w-3 h-3" />}
        {label}
      </span>
      {status === "connected" && mode && (
        <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold border ${mode === "live" ? "bg-emerald-500/10 text-emerald-700 border-emerald-500/20" : "bg-amber-500/10 text-amber-700 border-amber-500/20"}`}>
          {mode === "live" ? "🔴 Live" : "🟡 Test"}
        </span>
      )}
    </div>
  );
}

interface TabIntegrationsProps { onChange: () => void }

export function TabIntegrations({ onChange }: TabIntegrationsProps) {
  const [stripePublic, setStripePublic] = useState("pk_live_••••••••••••••••");
  const [stripeSecret, setStripeSecret] = useState("sk_live_••••••••••••••••");
  const [smtpHost, setSmtpHost] = useState("smtp.mailgun.org");
  const [smtpPort, setSmtpPort] = useState("587");
  const [smtpUser, setSmtpUser] = useState("postmaster@marketflow.io");
  const [smtpPass, setSmtpPass] = useState("••••••••••••••••");

  const base = "w-full h-10 rounded-xl border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors";

  return (
    <div className="space-y-8">
      {/* Stripe */}
      <div className="space-y-4 p-5 rounded-2xl border border-border bg-card">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#635BFF]/10 flex items-center justify-center">
              <Zap className="w-4 h-4 text-[#635BFF]" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">Stripe</p>
              <p className="text-xs text-muted-foreground">Paiements en ligne et gestion des remboursements</p>
            </div>
          </div>
          <IntegrationBadge status="connected" mode="live" />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <ApiKeyField id="stripe-pk" label="Clé publique (Publishable Key)" value={stripePublic}
            tooltip="Clé publique Stripe — sûre d'exposer côté client." onChange={(v) => { setStripePublic(v); onChange(); }} />
          <ApiKeyField id="stripe-sk" label="Clé secrète (Secret Key)" value={stripeSecret}
            tooltip="Clé secrète Stripe — ne jamais exposer côté client ni committer dans le repo." onChange={(v) => { setStripeSecret(v); onChange(); }} />
        </div>
      </div>

      {/* SMTP */}
      <div className="space-y-4 p-5 rounded-2xl border border-border bg-card">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-accent" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">SMTP / E-mail transactionnel</p>
              <p className="text-xs text-muted-foreground">Confirmation de commande, réinitialisation mot de passe</p>
            </div>
          </div>
          <IntegrationBadge status="connected" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FieldGroup label="Serveur SMTP" htmlFor="smtp-host">
            <input id="smtp-host" type="text" value={smtpHost} className={base}
              onChange={(e) => { setSmtpHost(e.target.value); onChange(); }} />
          </FieldGroup>
          <FieldGroup label="Port" htmlFor="smtp-port" tooltip="587 (STARTTLS) ou 465 (SSL) recommandé.">
            <input id="smtp-port" type="number" value={smtpPort} className={base}
              onChange={(e) => { setSmtpPort(e.target.value); onChange(); }} />
          </FieldGroup>
          <FieldGroup label="Utilisateur SMTP" htmlFor="smtp-user">
            <input id="smtp-user" type="text" value={smtpUser} className={base}
              onChange={(e) => { setSmtpUser(e.target.value); onChange(); }} />
          </FieldGroup>
          <ApiKeyField id="smtp-pass" label="Mot de passe SMTP" value={smtpPass}
            tooltip="Identifiant de connexion au serveur mail. Ne jamais partager." onChange={(v) => { setSmtpPass(v); onChange(); }} />
        </div>
      </div>
    </div>
  );
}
