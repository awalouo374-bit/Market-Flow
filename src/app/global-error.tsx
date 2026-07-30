"use client";

/**
 * Global Error — catches errors in the root layout itself.
 * Must render its own <html> and <body> tags and import styles/fonts
 * since the root layout is NOT rendered when this file activates.
 */

import "./globals.css";

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="en">
      <body
        className="min-h-screen bg-background text-foreground antialiased"
        style={{ fontFamily: '"Inter", system-ui, -apple-system, sans-serif' }}
      >
        <div className="flex min-h-screen flex-col items-center justify-center px-4">
          {/* Animated error icon */}
          <div className="relative mb-8">
            <div
              className="absolute -inset-4 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, oklch(0.577 0.245 27.325 / 15%) 0%, transparent 70%)",
                animation: "ge-glow 2.5s ease-in-out infinite",
              }}
            />
            <div
              className="relative flex h-20 w-20 items-center justify-center rounded-full"
              style={{
                background: "oklch(0.577 0.245 27.325 / 10%)",
                border: "2px solid oklch(0.577 0.245 27.325 / 30%)",
                animation: "ge-shake 0.6s ease-in-out",
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

          {/* Content card */}
          <div className="glass-panel w-full max-w-md rounded-2xl p-8 text-center">
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-foreground">
              Critical Error
            </h2>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
              A critical application error occurred. Please try refreshing the
              page.
            </p>

            {error.digest && (
              <p className="mb-6 rounded-lg bg-muted px-3 py-2 font-mono text-xs text-muted-foreground">
                Error ID: {error.digest}
              </p>
            )}

            <button
              onClick={() => unstable_retry()}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl px-6 font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.24 0.06 250) 0%, oklch(0.72 0.16 220) 100%)",
                boxShadow:
                  "0 0 20px oklch(0.72 0.16 220 / 25%), 0 0 60px oklch(0.72 0.16 220 / 10%)",
              }}
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
              Reload Application
            </button>
          </div>
        </div>

        <style>{`
          @keyframes ge-glow {
            0%, 100% { opacity: 0.4; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
          }
          @keyframes ge-shake {
            0%, 100% { transform: translateX(0); }
            15% { transform: translateX(-6px) rotate(-2deg); }
            30% { transform: translateX(5px) rotate(1.5deg); }
            45% { transform: translateX(-4px) rotate(-1deg); }
            60% { transform: translateX(3px) rotate(0.5deg); }
            75% { transform: translateX(-1px); }
          }
        `}</style>
      </body>
    </html>
  );
}
