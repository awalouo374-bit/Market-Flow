"use client";

import { CheckCircle2, Loader2, RotateCcw, Save } from "lucide-react";
import { BrandButton } from "@/components/shared/BrandButton";

interface StickyActionBarProps {
  isDirty: boolean;
  isSaving: boolean;
  savedLabel?: string;
  onSave: () => void;
  onDiscard: () => void;
}

export function StickyActionBar({
  isDirty,
  isSaving,
  savedLabel,
  onSave,
  onDiscard,
}: StickyActionBarProps) {
  if (!isDirty && !savedLabel) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between gap-2 sm:gap-4 border-t border-border bg-card/95 px-4 sm:px-6 py-2.5 sm:py-3 backdrop-blur-md shadow-[0_-4px_24px_oklch(0_0_0/8%)] animate-in slide-in-from-bottom duration-300"
    >
      <div className="flex items-center gap-2 text-xs sm:text-sm min-w-0">
        {savedLabel ? (
          <>
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="font-semibold text-emerald-600 dark:text-emerald-400 truncate">
              {savedLabel}
            </span>
          </>
        ) : (
          <>
            <span className="inline-flex h-2 w-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
            <span className="font-medium text-muted-foreground truncate hidden sm:inline">
              Modifications non enregistrées
            </span>
            <span className="font-medium text-muted-foreground truncate sm:hidden">
              Non enregistré
            </span>
          </>
        )}
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {isDirty && !isSaving && (
          <button
            type="button"
            onClick={onDiscard}
            className="inline-flex items-center gap-1.5 h-8 sm:h-9 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold text-muted-foreground border border-border hover:text-foreground hover:border-foreground/30 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Annuler</span>
          </button>
        )}

        <BrandButton
          variant="flow"
          size="sm"
          onClick={onSave}
          disabled={isSaving || !isDirty}
          aria-busy={isSaving}
          className="gap-1.5 h-8 sm:h-9 px-3 sm:px-4 text-xs sm:text-sm"
        >
          {isSaving ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Save className="w-3.5 h-3.5" />
          )}
          <span>{isSaving ? "En cours…" : "Enregistrer"}</span>
        </BrandButton>
      </div>
    </div>
  );
}
