"use client";

import { useState } from "react";
import { ShieldCheck, LogOut, Monitor, Smartphone } from "lucide-react";
import { FieldGroup } from "./FieldGroup";

const MOCK_SESSIONS = [
  { id: "s1", device: "Chrome — macOS", location: "Paris, FR", lastSeen: "Actif maintenant", icon: Monitor, isCurrent: true },
  { id: "s2", device: "Safari — iPhone 15", location: "Lyon, FR", lastSeen: "Il y a 3h", icon: Smartphone, isCurrent: false },
  { id: "s3", device: "Firefox — Windows 11", location: "Bordeaux, FR", lastSeen: "Hier, 22:41", icon: Monitor, isCurrent: false },
];

interface TabSecurityProps { onChange: () => void }

export function TabSecurity({ onChange }: TabSecurityProps) {
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [sessions, setSessions] = useState(MOCK_SESSIONS);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const base = "w-full h-10 rounded-xl border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors";
  const errCls = "border-destructive focus:ring-destructive/40";

  function validatePwd(field: string, value: string) {
    const next = { ...errors };
    if (field === "new" && value.length > 0 && value.length < 8)
      next.new = "Minimum 8 caractères.";
    else if (field === "new") delete next.new;
    if (field === "confirm" && value !== newPwd)
      next.confirm = "Les mots de passe ne correspondent pas.";
    else if (field === "confirm") delete next.confirm;
    setErrors(next);
  }

  function revokeSession(id: string) {
    setSessions((s) => s.filter((sess) => sess.id !== id));
  }

  return (
    <div className="space-y-6 sm:space-y-8 min-w-0 w-full">
      {/* Change password */}
      <div className="space-y-5 p-4 sm:p-5 rounded-2xl border border-border bg-card min-w-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2 rounded-xl bg-accent/10 text-accent shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-foreground">Modifier le mot de passe</p>
            <p className="text-xs text-muted-foreground truncate">Utilisez 8 caractères minimum, lettres et chiffres mélangés.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FieldGroup label="Mot de passe actuel" htmlFor="current-pwd" required>
            <input id="current-pwd" type="password" autoComplete="current-password" value={currentPwd}
              className={base} onChange={(e) => { setCurrentPwd(e.target.value); onChange(); }} />
          </FieldGroup>
          <div className="hidden sm:block" />
          <FieldGroup label="Nouveau mot de passe" htmlFor="new-pwd" error={errors.new} required
            tooltip="Minimum 8 caractères. Évitez les mots de passe déjà utilisés.">
            <input id="new-pwd" type="password" autoComplete="new-password" value={newPwd}
              className={`${base} ${errors.new ? errCls : ""}`}
              onChange={(e) => { setNewPwd(e.target.value); validatePwd("new", e.target.value); onChange(); }} />
          </FieldGroup>
          <FieldGroup label="Confirmer le mot de passe" htmlFor="confirm-pwd" error={errors.confirm} required>
            <input id="confirm-pwd" type="password" autoComplete="new-password" value={confirmPwd}
              className={`${base} ${errors.confirm ? errCls : ""}`}
              onChange={(e) => { setConfirmPwd(e.target.value); validatePwd("confirm", e.target.value); onChange(); }} />
          </FieldGroup>
        </div>
      </div>

      {/* Active sessions */}
      <div className="space-y-4 p-4 sm:p-5 rounded-2xl border border-border bg-card min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 min-w-0">
          <div className="min-w-0">
            <p className="text-sm font-bold text-foreground">Sessions actives</p>
            <p className="text-xs text-muted-foreground">Appareils et navigateurs connectés à ce compte.</p>
          </div>
          <button type="button"
            onClick={() => setSessions((s) => s.filter((sess) => sess.isCurrent))}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 h-8 px-3 rounded-xl text-xs font-semibold border border-destructive/30 text-destructive hover:bg-destructive/5 transition-colors shrink-0">
            <LogOut className="w-3 h-3" />
            <span>Révoquer les autres</span>
          </button>
        </div>
        <ul className="divide-y divide-border">
          {sessions.map((sess) => {
            const Icon = sess.icon;
            return (
              <li key={sess.id} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0 min-w-0">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground flex items-center gap-2 flex-wrap">
                      <span className="truncate">{sess.device}</span>
                      {sess.isCurrent && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 shrink-0">Actuelle</span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">{sess.location} · {sess.lastSeen}</p>
                  </div>
                </div>
                {!sess.isCurrent && (
                  <button type="button" onClick={() => revokeSession(sess.id)}
                    className="text-xs font-semibold text-muted-foreground hover:text-destructive transition-colors shrink-0">
                    Révoquer
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
