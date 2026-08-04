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
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between gap-4 border-t border-border bg-card/95 px-6 py-3 backdrop-blur-md shadow-[0_-4px_24px_oklch(0_0_0/8%)] animate-in slide-in-from-bottom duration-300"
    >
      <div className="flex items-center gap-2 text-sm">
        {savedLabel ? (
          <>
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              {savedLabel}
            </span>
          </>
        ) : (
          <>
            <span className="inline-flex h-2 w-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
            <span className="font-medium text-muted-foreground">
              Modifications non enregistrées
            </span>
          </>
        )}
      </div>

      <div className="flex items-center gap-3">
        {isDirty && !isSaving && (
          <button
            type="button"
            onClick={onDiscard}
            className="inline-flex items-center gap-1.5 h-9 px-4 rounded-xl text-sm font-semibold text-muted-foreground border border-border hover:text-foreground hover:border-foreground/30 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Annuler
          </button>
        )}

        <BrandButton
          variant="flow"
          size="sm"
          onClick={onSave}
          disabled={isSaving || !isDirty}
          aria-busy={isSaving}
          className="gap-1.5"
        >
          {isSaving ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Save className="w-3.5 h-3.5" />
          )}
          {isSaving ? "Enregistrement…" : "Enregistrer"}
        </BrandButton>
      </div>
    </div>
  );
}
