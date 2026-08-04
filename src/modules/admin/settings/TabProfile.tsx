"use client";

import { useState } from "react";
import { User, Camera } from "lucide-react";
import { FieldGroup } from "./FieldGroup";

interface ProfileData {
  name: string;
  email: string;
  image: string | null;
}

interface TabProfileProps {
  initial: ProfileData;
  onChange: () => void;
}

export function TabProfile({ initial, onChange }: TabProfileProps) {
  const [name, setName] = useState(initial.name);
  const [email, setEmail] = useState(initial.email);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const initials = (name || initial.email)
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  function validate(field: string, value: string) {
    const next = { ...errors };
    if (field === "name" && !value.trim()) next.name = "Le nom est requis.";
    else if (field === "name") delete next.name;
    if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      next.email = "Adresse e-mail invalide.";
    else if (field === "email") delete next.email;
    setErrors(next);
  }

  const baseInput =
    "w-full h-10 rounded-xl border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors";
  const errorInput = "border-destructive focus:ring-destructive/40";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-5 p-5 rounded-2xl bg-muted/40 border border-border">
        <div className="relative shrink-0">
          <div className="w-16 h-16 rounded-2xl bg-flow-gradient text-white flex items-center justify-center text-xl font-bold shadow-sm">
            {initials}
          </div>
          <button
            type="button"
            aria-label="Changer la photo de profil"
            className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center border-2 border-background hover:bg-accent/80 transition-colors"
          >
            <Camera className="w-3 h-3" />
          </button>
        </div>
        <div>
          <p className="font-semibold text-foreground">{initial.name || "Admin"}</p>
          <p className="text-xs text-muted-foreground">{initial.email}</p>
          <p className="text-[11px] text-accent mt-0.5 font-semibold uppercase tracking-wide">
            Administrateur
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FieldGroup
          label="Nom complet"
          htmlFor="profile-name"
          required
          error={errors.name}
          hint="Affiché dans la sidebar et les e-mails système."
        >
          <input
            id="profile-name"
            type="text"
            value={name}
            autoComplete="name"
            className={`${baseInput} ${errors.name ? errorInput : ""}`}
            onChange={(e) => {
              setName(e.target.value);
              validate("name", e.target.value);
              onChange();
            }}
          />
        </FieldGroup>

        <FieldGroup
          label="Adresse e-mail"
          htmlFor="profile-email"
          required
          error={errors.email}
          tooltip="Sert à la connexion et aux notifications système. Un e-mail de confirmation sera envoyé en cas de modification."
        >
          <input
            id="profile-email"
            type="email"
            value={email}
            autoComplete="email"
            className={`${baseInput} ${errors.email ? errorInput : ""}`}
            onChange={(e) => {
              setEmail(e.target.value);
              validate("email", e.target.value);
              onChange();
            }}
          />
        </FieldGroup>
      </div>

      <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-amber-500/20 bg-amber-500/5 text-xs text-amber-700 dark:text-amber-400">
        <User className="w-4 h-4 shrink-0" />
        La modification de l&apos;e-mail nécessite une re-confirmation — un lien sera envoyé à la nouvelle adresse.
      </div>
    </div>
  );
}
