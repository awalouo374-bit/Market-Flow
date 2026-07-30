"use client";

import { useEffect } from "react";

interface ErrorDisplayProps {
  /** The Error object from Next.js error boundary */
  error: Error & { digest?: string };
  /** Retry callback from Next.js */
  onRetry: () => void;
  /** Navigate home callback */
  onGoHome?: () => void;
  /** Title override */
  title?: string;
  /** Description override */
  description?: string;
  /** Additional classes */
  className?: string;
}

export function ErrorDisplay({
  error,
  onRetry,
  onGoHome,
  title = "Something went wrong",
  description = "An unexpected error occurred. Please try again or return to the home page.",
  className = "",
}: ErrorDisplayProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className={`flex min-h-[60vh] w-full flex-col items-center justify-center px-4 ${className}`}
    >
      {/* Animated error icon */}
      <div className="relative mb-8">
        {/* Glow ring */}
        <div
          className="absolute -inset-4 rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.577 0.245 27.325 / 15%) 0%, transparent 70%)",
            animation: "err-glow 2.5s ease-in-out infinite",
          }}
        />
        {/* Icon circle */}
        <div
          className="relative flex h-20 w-20 items-center justify-center rounded-full"
          style={{
            background: "oklch(0.577 0.245 27.325 / 10%)",
            border: "2px solid oklch(0.577 0.245 27.325 / 30%)",
            animation: "err-shake 0.6s ease-in-out",
          }}
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="oklch(0.577 0.245 27.325)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
      </div>

      {/* Glass card */}
      <div className="glass-panel w-full max-w-md rounded-2xl p-8 text-center">
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-foreground">
          {title}
        </h2>
        <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        {/* Error digest */}
        {error.digest && (
          <p className="mb-6 rounded-lg bg-muted px-3 py-2 font-mono text-xs text-muted-foreground">
            Error ID: {error.digest}
          </p>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={onRetry}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-flow-gradient px-6 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-glow-cyan active:scale-[0.98] cursor-pointer"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
            </svg>
            Try Again
          </button>

          {onGoHome && (
            <button
              onClick={onGoHome}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border-2 border-silver-metallic px-6 font-semibold text-market-navy transition-all duration-300 hover:scale-[1.02] hover:border-flow-cyan hover:text-flow-cyan active:scale-[0.98] dark:text-silver-light cursor-pointer"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Go Home
            </button>
          )}
        </div>
      </div>

      {/* Inline keyframes */}
      <style>{`
        @keyframes err-glow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes err-shake {
          0%, 100% { transform: translateX(0); }
          15% { transform: translateX(-6px) rotate(-2deg); }
          30% { transform: translateX(5px) rotate(1.5deg); }
          45% { transform: translateX(-4px) rotate(-1deg); }
          60% { transform: translateX(3px) rotate(0.5deg); }
          75% { transform: translateX(-1px); }
        }
      `}</style>
    </div>
  );
}
