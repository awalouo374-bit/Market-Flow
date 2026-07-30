import Link from "next/link";

interface NotFoundDisplayProps {
  /** Title override */
  title?: string;
  /** Description override */
  description?: string;
  /** Custom home href */
  homeHref?: string;
  /** Additional classes */
  className?: string;
}

export function NotFoundDisplay({
  title = "Page not found",
  description = "The page you're looking for doesn't exist or has been moved. Let's get you back on track.",
  homeHref = "/",
  className = "",
}: NotFoundDisplayProps) {
  return (
    <div
      className={`flex min-h-[60vh] w-full flex-col items-center justify-center px-4 ${className}`}
    >
      {/* Large 404 number */}
      <div className="relative mb-6 select-none">
        {/* Background glow */}
        <div
          className="absolute inset-0 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, oklch(0.72 0.16 220 / 20%) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <h1
          className="relative text-[8rem] font-extrabold leading-none tracking-tighter sm:text-[10rem]"
          style={{
            background:
              "linear-gradient(135deg, var(--market-navy) 0%, var(--flow-cyan) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          404
        </h1>
      </div>

      {/* Glass card */}
      <div className="glass-panel w-full max-w-md rounded-2xl p-8 text-center">
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-foreground">
          {title}
        </h2>
        <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href={homeHref}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-flow-gradient px-6 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-glow-cyan active:scale-[0.98]"
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
            Back to Home
          </Link>

          <Link
            href={homeHref}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border-2 border-silver-metallic px-6 font-semibold text-market-navy transition-all duration-300 hover:scale-[1.02] hover:border-flow-cyan hover:text-flow-cyan active:scale-[0.98] dark:text-silver-light"
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
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            Search
          </Link>
        </div>
      </div>

      {/* Floating particles decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${4 + i * 2}px`,
              height: `${4 + i * 2}px`,
              background: `oklch(0.72 0.16 220 / ${10 + i * 5}%)`,
              left: `${15 + i * 13}%`,
              top: `${20 + (i % 3) * 25}%`,
              animation: `nf-float-${i % 3} ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* Inline keyframes */}
      <style>{`
        @keyframes nf-float-0 {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.5; }
          50% { transform: translateY(-20px) translateX(8px); opacity: 1; }
        }
        @keyframes nf-float-1 {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.4; }
          50% { transform: translateY(-15px) translateX(-10px); opacity: 0.9; }
        }
        @keyframes nf-float-2 {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          50% { transform: translateY(-25px) translateX(5px); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
