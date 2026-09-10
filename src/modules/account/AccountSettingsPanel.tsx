"use client";

import { useState, useTransition } from "react";
import {
  User,
  Lock,
  MapPin,
  Check,
  Loader2,
  Plus,
  Trash2,
  Star,
  Eye,
  EyeOff,
  Save,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

/* --- Types ----------------------------------------------- */
export interface AddressData {
  id: string;
  title: string | null;
  recipientName: string;
  phone: string | null;
  streetAddress: string;
  city: string;
  state: string | null;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface SettingsProfile {
  id: string;
  name: string;
  email: string;
  image: string | null;
}

interface Props {
  profile: SettingsProfile;
  addresses: AddressData[];
}

/* --- Feedback Banner ------------------------------------ */
function FeedbackBanner({
  type,
  message,
}: {
  type: "success" | "error";
  message: string;
}) {
  const isSuccess = type === "success";
  return (
    <div
      className={`flex items-center gap-2.5 rounded-xl border px-4 py-3 text-sm font-medium ${
        isSuccess
          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
          : "border-destructive/30 bg-destructive/10 text-destructive"
      }`}
    >
      {isSuccess ? (
        <CheckCircle2 className="h-4 w-4 shrink-0" />
      ) : (
        <AlertCircle className="h-4 w-4 shrink-0" />
      )}
      {message}
    </div>
  );
}

/* --- Input ------------------------------------------------ */
function Field({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  disabled,
  required,
  hint,
  rightSlot,
}: {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  hint?: string;
  rightSlot?: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-xs font-semibold text-slate-300 uppercase tracking-wider"
      >
        {label}
        {required && <span className="text-[oklch(0.68_0.20_30)] ml-1">*</span>}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className="w-full h-11 px-3.5 pr-10 rounded-xl border border-white/10 bg-white/[0.04] text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[oklch(0.72_0.16_220)]/50 focus:border-[oklch(0.72_0.16_220)]/60 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        />
        {rightSlot && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightSlot}</div>
        )}
      </div>
      {hint && <p className="text-[11px] text-slate-500">{hint}</p>}
    </div>
  );
}

/* --- Profile Tab ------------------------------------------ */
function ProfileTab({ profile }: { profile: SettingsProfile }) {
  const [name, setName] = useState(profile.name);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [isPending, startTransition] = useTransition();

  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFeedback(null);
    startTransition(async () => {
      const res = await fetch("/api/account/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (res.ok) {
        setFeedback({ type: "success", message: "Profil mis a jour avec succes !" });
      } else {
        const data = await res.json();
        setFeedback({ type: "error", message: data.error ?? "Une erreur est survenue." });
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Avatar */}
      <div className="flex items-center gap-5">
        <div className="relative shrink-0">
          {profile.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profile.image}
              alt={profile.name}
              className="h-20 w-20 rounded-2xl object-cover ring-2 ring-[oklch(0.72_0.16_220)]/40"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[oklch(0.30_0.08_250)] to-[oklch(0.72_0.16_220)] text-white text-2xl font-extrabold">
              {initials}
            </div>
          )}
        </div>
        <div className="space-y-1">
          <p className="text-sm font-bold text-white">{profile.name}</p>
          <p className="text-xs text-slate-400">{profile.email}</p>
          <p className="text-[11px] text-slate-500">
            La photo de profil est gere par votre provider OAuth.
          </p>
        </div>
      </div>

      <div className="h-px bg-white/5" />

      {/* Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field
          label="Nom complet"
          id="profile-name"
          value={name}
          onChange={setName}
          placeholder="Jean Dupont"
          required
        />
        <Field
          label="Adresse email"
          id="profile-email"
          value={profile.email}
          onChange={() => {}}
          disabled
          hint="L'email est lie a votre compte et ne peut pas etre modifie ici."
        />
      </div>

      {feedback && (
        <FeedbackBanner type={feedback.type} message={feedback.message} />
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending || name.trim() === profile.name}
          className="inline-flex items-center gap-2 rounded-xl bg-[oklch(0.72_0.16_220)] px-5 py-2.5 text-sm font-bold text-[#070a14] transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[oklch(0.72_0.16_220)/20%]"
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {isPending ? "Enregistrement..." : "Sauvegarder"}
        </button>
      </div>
    </form>
  );
}

/* --- Security Tab ----------------------------------------- */
function SecurityTab() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [isPending, startTransition] = useTransition();

  const strength = newPassword.length === 0 ? 0 :
    newPassword.length < 8 ? 1 :
    /[A-Z]/.test(newPassword) && /[0-9]/.test(newPassword) && /[^A-Za-z0-9]/.test(newPassword) ? 3 : 2;

  const strengthLabels = ["", "Faible", "Moyen", "Fort"];
  const strengthColors = ["", "bg-destructive", "bg-amber-400", "bg-emerald-400"];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFeedback(null);
    if (newPassword !== confirmPassword) {
      setFeedback({ type: "error", message: "Les mots de passe ne correspondent pas." });
      return;
    }
    startTransition(async () => {
      const res = await fetch("/api/account/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      if (res.ok) {
        setFeedback({ type: "success", message: "Mot de passe modifie avec succes !" });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        const data = await res.json();
        setFeedback({ type: "error", message: data.error ?? "Erreur lors du changement." });
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 flex items-start gap-3">
        <AlertCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-300 leading-relaxed">
          Si vous vous etes connecte via Google ou un autre provider OAuth, vous n avez pas de mot de passe local. Cette section s applique uniquement aux comptes crees avec un email/mot de passe.
        </p>
      </div>

      <div className="space-y-4">
        <Field
          label="Mot de passe actuel"
          id="current-password"
          type={showCurrent ? "text" : "password"}
          value={currentPassword}
          onChange={setCurrentPassword}
          placeholder="Votre mot de passe actuel"
          required
          rightSlot={
            <button
              type="button"
              onClick={() => setShowCurrent((v) => !v)}
              className="text-slate-400 hover:text-white transition-colors"
              tabIndex={-1}
            >
              {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          }
        />

        <div className="space-y-2">
          <Field
            label="Nouveau mot de passe"
            id="new-password"
            type={showNew ? "text" : "password"}
            value={newPassword}
            onChange={setNewPassword}
            placeholder="Minimum 8 caracteres"
            required
            rightSlot={
              <button
                type="button"
                onClick={() => setShowNew((v) => !v)}
                className="text-slate-400 hover:text-white transition-colors"
                tabIndex={-1}
              >
                {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            }
          />
          {newPassword.length > 0 && (
            <div className="space-y-1">
              <div className="flex gap-1 h-1">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-full transition-all ${
                      strength >= i ? strengthColors[strength] : "bg-white/10"
                    }`}
                  />
                ))}
              </div>
              <p className="text-[11px] text-slate-400">
                Securite : <span className={`font-semibold ${strength === 1 ? "text-destructive" : strength === 2 ? "text-amber-400" : "text-emerald-400"}`}>{strengthLabels[strength]}</span>
              </p>
            </div>
          )}
        </div>

        <Field
          label="Confirmer le nouveau mot de passe"
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          placeholder="Repeter le nouveau mot de passe"
          required
        />
      </div>

      {feedback && (
        <FeedbackBanner type={feedback.type} message={feedback.message} />
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending || !currentPassword || !newPassword || !confirmPassword}
          className="inline-flex items-center gap-2 rounded-xl bg-[oklch(0.72_0.16_220)] px-5 py-2.5 text-sm font-bold text-[#070a14] transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[oklch(0.72_0.16_220)/20%]"
        >
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
          {isPending ? "Modification..." : "Modifier le mot de passe"}
        </button>
      </div>
    </form>
  );
}

/* --- Address Card ----------------------------------------- */
function AddressCard({
  address,
  onDelete,
  onSetDefault,
}: {
  address: AddressData;
  onDelete: (id: string) => void;
  onSetDefault: (id: string) => void;
}) {
  const [deleting, setDeleting] = useState(false);
  const [settingDefault, setSettingDefault] = useState(false);

  async function handleDelete() {
    if (!confirm("Supprimer cette adresse ?")) return;
    setDeleting(true);
    const res = await fetch(`/api/account/addresses/${address.id}`, {
      method: "DELETE",
    });
    if (res.ok) onDelete(address.id);
    setDeleting(false);
  }

  async function handleSetDefault() {
    setSettingDefault(true);
    const res = await fetch(`/api/account/addresses/${address.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isDefault: true }),
    });
    if (res.ok) onSetDefault(address.id);
    setSettingDefault(false);
  }

  return (
    <div
      className={`relative rounded-2xl border p-4 transition-all ${
        address.isDefault
          ? "border-[oklch(0.72_0.16_220)]/40 bg-[oklch(0.72_0.16_220)]/5"
          : "border-white/8 bg-white/[0.02] hover:border-white/15"
      }`}
    >
      {address.isDefault && (
        <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full border border-[oklch(0.72_0.16_220)]/30 bg-[oklch(0.72_0.16_220)]/10 px-2 py-0.5 text-[10px] font-bold text-[oklch(0.72_0.16_220)]">
          <Star className="h-2.5 w-2.5 fill-current" />
          Defaut
        </span>
      )}

      <div className="space-y-1 pr-16">
        {address.title && (
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            {address.title}
          </p>
        )}
        <p className="text-sm font-semibold text-white">{address.recipientName}</p>
        {address.phone && (
          <p className="text-xs text-slate-400">{address.phone}</p>
        )}
        <p className="text-xs text-slate-300 leading-relaxed">
          {address.streetAddress}
          <br />
          {address.postalCode} {address.city}
          {address.state ? `, ${address.state}` : ""} — {address.country}
        </p>
      </div>

      <div className="mt-4 flex items-center gap-2">
        {!address.isDefault && (
          <button
            type="button"
            onClick={handleSetDefault}
            disabled={settingDefault}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold text-slate-300 hover:text-white hover:border-white/20 transition-all disabled:opacity-50"
          >
            {settingDefault ? <Loader2 className="h-3 w-3 animate-spin" /> : <Check className="h-3 w-3" />}
            Definir par defaut
          </button>
        )}
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-1.5 text-[11px] font-semibold text-destructive hover:bg-destructive/15 transition-all disabled:opacity-50"
        >
          {deleting ? <Loader2 className="h-3 w-3 animate-spin" /> : <Trash2 className="h-3 w-3" />}
          Supprimer
        </button>
      </div>
    </div>
  );
}

/* --- New Address Form ------------------------------------- */
function AddressForm({
  onCreated,
  onCancel,
}: {
  onCreated: (a: AddressData) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({
    title: "",
    recipientName: "",
    phone: "",
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    country: "France",
    isDefault: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const update = (key: string) => (v: string) =>
    setForm((prev) => ({ ...prev, [key]: v }));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const res = await fetch("/api/account/addresses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const created = await res.json();
        onCreated(created);
      } else {
        const data = await res.json();
        setError(data.error ?? "Erreur lors de la creation.");
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-[oklch(0.72_0.16_220)]/20 bg-[oklch(0.72_0.16_220)]/5 p-5 space-y-4"
    >
      <h3 className="text-sm font-bold text-white flex items-center gap-2">
        <MapPin className="h-4 w-4 text-[oklch(0.72_0.16_220)]" />
        Nouvelle adresse
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Intitule (ex: Domicile)" id="addr-title" value={form.title} onChange={update("title")} placeholder="Domicile, Bureau..." />
        <Field label="Nom du destinataire" id="addr-recipient" value={form.recipientName} onChange={update("recipientName")} placeholder="Jean Dupont" required />
        <Field label="Telephone" id="addr-phone" value={form.phone} onChange={update("phone")} placeholder="+33 6 12 34 56 78" />
        <Field label="Adresse" id="addr-street" value={form.streetAddress} onChange={update("streetAddress")} placeholder="12 Rue de Rivoli" required />
        <Field label="Ville" id="addr-city" value={form.city} onChange={update("city")} placeholder="Paris" required />
        <Field label="Etat / Region" id="addr-state" value={form.state} onChange={update("state")} placeholder="Ile-de-France" />
        <Field label="Code postal" id="addr-postal" value={form.postalCode} onChange={update("postalCode")} placeholder="75001" required />
        <Field label="Pays" id="addr-country" value={form.country} onChange={update("country")} placeholder="France" required />
      </div>

      <label className="flex items-center gap-2.5 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={form.isDefault}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, isDefault: e.target.checked }))
          }
          className="h-4 w-4 rounded border-white/20 bg-white/[0.04] accent-[oklch(0.72_0.16_220)]"
        />
        <span className="text-xs font-semibold text-slate-300">
          Definir comme adresse par defaut
        </span>
      </label>

      {error && <FeedbackBanner type="error" message={error} />}

      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 rounded-xl bg-[oklch(0.72_0.16_220)] px-4 py-2 text-xs font-bold text-[#070a14] disabled:opacity-50 transition-all hover:brightness-110"
        >
          {isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
          {isPending ? "Enregistrement..." : "Sauvegarder"}
        </button>
      </div>
    </form>
  );
}

/* --- Addresses Tab ---------------------------------------- */
function AddressesTab({
  initialAddresses,
}: {
  initialAddresses: AddressData[];
}) {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [showForm, setShowForm] = useState(false);

  function handleCreated(newAddr: AddressData) {
    setAddresses((prev) => {
      const list = newAddr.isDefault
        ? prev.map((a) => ({ ...a, isDefault: false }))
        : prev;
      return [newAddr, ...list];
    });
    setShowForm(false);
  }

  function handleDelete(id: string) {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  }

  function handleSetDefault(id: string) {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id }))
    );
  }

  return (
    <div className="space-y-4">
      {addresses.length === 0 && !showForm && (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-8 text-center space-y-2">
          <MapPin className="h-9 w-9 text-slate-500 mx-auto" />
          <p className="text-sm font-semibold text-slate-300">Aucune adresse enregistree</p>
          <p className="text-xs text-slate-500">Ajoutez une adresse pour accelerer vos commandes.</p>
        </div>
      )}

      {addresses.map((addr) => (
        <AddressCard
          key={addr.id}
          address={addr}
          onDelete={handleDelete}
          onSetDefault={handleSetDefault}
        />
      ))}

      {showForm && (
        <AddressForm onCreated={handleCreated} onCancel={() => setShowForm(false)} />
      )}

      {!showForm && (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-white/15 py-3.5 text-xs font-semibold text-slate-400 hover:border-[oklch(0.72_0.16_220)]/40 hover:text-[oklch(0.72_0.16_220)] transition-all"
        >
          <Plus className="h-4 w-4" />
          Ajouter une adresse
        </button>
      )}
    </div>
  );
}

/* --- Main Panel ------------------------------------------- */
type TabId = "profile" | "security" | "addresses";

const TABS: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "profile", label: "Profil", icon: User },
  { id: "security", label: "Securite", icon: Lock },
  { id: "addresses", label: "Adresses", icon: MapPin },
];

export function AccountSettingsPanel({ profile, addresses }: Props) {
  const [activeTab, setActiveTab] = useState<TabId>("profile");

  return (
    <div className="rounded-3xl border border-white/10 bg-[#090e1b]/80 backdrop-blur-xl shadow-2xl overflow-hidden">
      {/* Tab bar */}
      <div className="flex border-b border-white/8">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-1 items-center justify-center gap-2 px-4 py-4 text-xs font-bold transition-all border-b-2 cursor-pointer ${
                isActive
                  ? "border-[oklch(0.72_0.16_220)] text-[oklch(0.72_0.16_220)] bg-[oklch(0.72_0.16_220)]/5"
                  : "border-transparent text-slate-400 hover:text-white hover:bg-white/[0.03]"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="p-6">
        {activeTab === "profile" && <ProfileTab profile={profile} />}
        {activeTab === "security" && <SecurityTab />}
        {activeTab === "addresses" && (
          <AddressesTab initialAddresses={addresses} />
        )}
      </div>
    </div>
  );
}
