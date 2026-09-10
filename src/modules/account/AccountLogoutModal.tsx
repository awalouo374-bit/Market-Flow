"use client";

import { useState } from "react";
import { LogOut, AlertTriangle, Loader2 } from "lucide-react";
import { signOut } from "@/lib/auth-client";

interface AccountLogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AccountLogoutModal({ isOpen, onClose }: AccountLogoutModalProps) {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  async function handleConfirmLogout() {
    setLoading(true);
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            window.location.href = "/login";
          },
        },
      });
    } catch {
      window.location.href = "/login";
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-title"
        className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-[#0c1222] p-6 shadow-2xl animate-in zoom-in-95 duration-200"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-destructive/15 text-destructive border border-destructive/20">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div className="space-y-1.5 min-w-0 flex-1">
            <h3 id="logout-title" className="text-lg font-bold text-white">
              Déconnexion de votre compte
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Êtes-vous certain de vouloir vous déconnecter ? Vous devrez vous ré-authentifier pour accéder à vos commandes et adresses.
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            disabled={loading}
            onClick={onClose}
            className="h-10 px-4 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/5 border border-white/10 transition-colors cursor-pointer disabled:opacity-50"
          >
            Annuler
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={handleConfirmLogout}
            className="inline-flex items-center gap-2 h-10 px-4 rounded-xl text-sm font-semibold text-white bg-destructive hover:bg-destructive/90 shadow-lg shadow-destructive/20 transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <LogOut className="h-4 w-4" />
            )}
            <span>{loading ? "Déconnexion..." : "Confirmer la déconnexion"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
