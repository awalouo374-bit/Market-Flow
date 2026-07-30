"use client";

type SpinnerSize = "sm" | "md" | "lg";

interface LoadingSpinnerProps {
  /** Spinner size */
  size?: SpinnerSize;
  /** Optional label below the spinner */
  label?: string;
  /** Additional classes */
  className?: string;
}

const sizeConfig: Record<SpinnerSize, { ring: string; logo: string; label: string }> = {
  sm: { ring: "h-10 w-10", logo: "h-5 w-5", label: "text-xs" },
  md: { ring: "h-16 w-16", logo: "h-8 w-8", label: "text-sm" },
  lg: { ring: "h-24 w-24", logo: "h-12 w-12", label: "text-base" },
};

export function LoadingSpinner({
  size = "md",
  label,
  className = "",
}: LoadingSpinnerProps) {
  const config = sizeConfig[size];

  return (
    <div
      className={`inline-flex flex-col items-center justify-center gap-4 ${className}`}
      role="status"
      aria-label={label || "Loading"}
    >
      {/* Spinner ring + logo */}
      <div className="relative">
        {/* Outer glow pulse */}
        <div
          className={`absolute inset-0 ${config.ring} rounded-full`}
          style={{
            background:
              "radial-gradient(circle, oklch(0.72 0.16 220 / 20%) 0%, transparent 70%)",
            animation: "mf-glow-pulse 2s ease-in-out infinite",
          }}
        />

        {/* Spinning ring */}
        <div
          className={`${config.ring} rounded-full`}
          style={{
            border: "2.5px solid oklch(0.72 0.16 220 / 12%)",
            borderTopColor: "oklch(0.72 0.16 220)",
            animation: "mf-spin 0.9s cubic-bezier(0.4, 0, 0.2, 1) infinite",
          }}
        />

        {/* Center "M" mark */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={`${config.logo} flex items-center justify-center font-extrabold text-flow-gradient`}
            style={{
              background: "linear-gradient(135deg, var(--market-navy) 0%, var(--flow-cyan) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "mf-fade-pulse 2s ease-in-out infinite",
            }}
          >
            M
          </span>
        </div>
      </div>

      {/* Shimmer bar */}
      <div
        className="h-1 w-16 overflow-hidden rounded-full"
        style={{ background: "oklch(0.72 0.16 220 / 12%)" }}
      >
        <div
          className="h-full w-1/3 rounded-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.72 0.16 220), transparent)",
            animation: "mf-shimmer 1.5s ease-in-out infinite",
          }}
        />
      </div>

      {/* Label */}
      {label && (
        <p
          className={`${config.label} font-medium text-muted-foreground`}
          style={{ animation: "mf-fade-pulse 2s ease-in-out infinite" }}
        >
          {label}
        </p>
      )}

      {/* Inline keyframes — avoids external CSS dependency */}
      <style>{`
        @keyframes mf-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes mf-glow-pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        @keyframes mf-fade-pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes mf-shimmer {
          0% { transform: translateX(-200%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </div>
  );
}
