"use client";

import type { ReactNode } from "react";
import { Info } from "lucide-react";

interface FieldGroupProps {
  label: string;
  htmlFor?: string;
  tooltip?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}

export function FieldGroup({
  label,
  htmlFor,
  tooltip,
  hint,
  error,
  required,
  children,
}: FieldGroupProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1.5">
        <label
          htmlFor={htmlFor}
          className="text-sm font-semibold text-foreground"
        >
          {label}
          {required && (
            <span className="ml-0.5 text-destructive" aria-hidden="true">
              *
            </span>
          )}
        </label>

        {tooltip && (
          <span className="group relative inline-flex">
            <Info
              className="w-3.5 h-3.5 text-muted-foreground cursor-help"
              aria-label={tooltip}
            />
            <span
              role="tooltip"
              className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-56 rounded-xl border border-border bg-popover px-3 py-2 text-xs text-popover-foreground shadow-lg opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
            >
              {tooltip}
              <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-border" />
            </span>
          </span>
        )}
      </div>

      {children}

      {error ? (
        <p role="alert" className="text-xs font-medium text-destructive">
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}
