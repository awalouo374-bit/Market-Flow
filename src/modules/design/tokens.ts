/**
 * MarketFlow Design Tokens
 * ─────────────────────────
 * Single source of truth for the brand graphic chart.
 * Derived from the MarketFlow logo: deep navy M, electric cyan arrow, silver swoosh.
 */

// ── Color Palette ────────────────────────────────────────────────
export const colors = {
  /** Deep structural navy — the "M" letterform & "Market" wordmark */
  marketNavy: {
    DEFAULT: "#0A2540",
    dark: "#061A2E",
    oklch: "oklch(0.24 0.06 250)",
  },
  /** Electric cyan — the upward growth arrow & "Flow" wordmark */
  flowCyan: {
    DEFAULT: "#00B4D8",
    light: "#48D1E8",
    bright: "#00C2FF",
    oklch: "oklch(0.72 0.16 220)",
  },
  /** Metallic silver — transitional swoosh connecting navy to cyan */
  silverMetallic: {
    DEFAULT: "#94A3B8",
    light: "#CBD5E1",
    oklch: "oklch(0.72 0.02 250)",
  },
  /** Semantic statuses */
  success: "#22C55E",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#3B82F6",
} as const;

// ── Gradients ────────────────────────────────────────────────────
export const gradients = {
  /** Primary brand gradient — navy ➜ cyan (135°) */
  flow: "linear-gradient(135deg, #0A2540 0%, #00B4D8 100%)",
  /** Horizontal variant for wide headers / banners */
  flowHorizontal: "linear-gradient(90deg, #0A2540 0%, #00B4D8 100%)",
  /** Vertical variant for sidebar / tall panels */
  flowVertical: "linear-gradient(180deg, #0A2540 0%, #00B4D8 100%)",
  /** Subtle silver wash — the metallic swoosh effect */
  silver: "linear-gradient(135deg, #CBD5E1 0%, #48D1E8 50%, #94A3B8 100%)",
  /** Cyan glow for hovered / active states */
  cyanGlow: "linear-gradient(135deg, #00B4D8 0%, #00C2FF 100%)",
  /** Text gradient — clip with `background-clip: text` */
  textFlow: "linear-gradient(135deg, #0A2540 0%, #00B4D8 100%)",
} as const;

// ── Shadows ──────────────────────────────────────────────────────
export const shadows = {
  sm: "0 1px 2px 0 rgba(10, 37, 64, 0.05)",
  md: "0 4px 6px -1px rgba(10, 37, 64, 0.08), 0 2px 4px -2px rgba(10, 37, 64, 0.05)",
  lg: "0 10px 15px -3px rgba(10, 37, 64, 0.10), 0 4px 6px -4px rgba(10, 37, 64, 0.05)",
  xl: "0 20px 25px -5px rgba(10, 37, 64, 0.12), 0 8px 10px -6px rgba(10, 37, 64, 0.05)",
  /** Neon-like cyan glow for CTAs */
  glowCyan: "0 0 20px rgba(0, 180, 216, 0.25), 0 0 60px rgba(0, 180, 216, 0.10)",
  /** Deep navy glow for elevated cards */
  glowNavy: "0 0 20px rgba(10, 37, 64, 0.30), 0 0 60px rgba(10, 37, 64, 0.12)",
  /** Inner glow for pressed / active states */
  innerCyan: "inset 0 2px 6px rgba(0, 180, 216, 0.20)",
} as const;

// ── Typography ───────────────────────────────────────────────────
export const typography = {
  fontFamily: {
    sans: 'var(--font-sans), "Inter", system-ui, -apple-system, sans-serif',
    mono: 'var(--font-geist-mono), "JetBrains Mono", monospace',
    heading: 'var(--font-sans), "Inter", system-ui, -apple-system, sans-serif',
  },
  fontSize: {
    xs: ["0.75rem", { lineHeight: "1rem" }],
    sm: ["0.875rem", { lineHeight: "1.25rem" }],
    base: ["1rem", { lineHeight: "1.5rem" }],
    lg: ["1.125rem", { lineHeight: "1.75rem" }],
    xl: ["1.25rem", { lineHeight: "1.75rem" }],
    "2xl": ["1.5rem", { lineHeight: "2rem" }],
    "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
    "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
    "5xl": ["3rem", { lineHeight: "1.16" }],
    "6xl": ["3.75rem", { lineHeight: "1.1" }],
  },
  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
  },
  letterSpacing: {
    tight: "-0.025em",
    normal: "0em",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.15em",
  },
} as const;

// ── Spacing ──────────────────────────────────────────────────────
export const spacing = {
  px: "1px",
  0: "0",
  0.5: "0.125rem",
  1: "0.25rem",
  1.5: "0.375rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  32: "8rem",
} as const;

// ── Border Radius ────────────────────────────────────────────────
export const radii = {
  none: "0",
  sm: "0.375rem",
  md: "0.5rem",
  lg: "0.625rem",
  xl: "0.875rem",
  "2xl": "1.125rem",
  "3xl": "1.375rem",
  full: "9999px",
} as const;

// ── Animation ────────────────────────────────────────────────────
export const animation = {
  duration: {
    fast: "150ms",
    normal: "250ms",
    slow: "400ms",
    slower: "600ms",
  },
  easing: {
    default: "cubic-bezier(0.4, 0, 0.2, 1)",
    in: "cubic-bezier(0.4, 0, 1, 1)",
    out: "cubic-bezier(0, 0, 0.2, 1)",
    inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    spring: "cubic-bezier(0.22, 1, 0.36, 1)",
  },
} as const;

// ── Breakpoints ──────────────────────────────────────────────────
export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

// ── Z-Index ──────────────────────────────────────────────────────
export const zIndex = {
  dropdown: 50,
  sticky: 100,
  overlay: 200,
  modal: 300,
  popover: 400,
  tooltip: 500,
  toast: 600,
} as const;

// ── Combined export ──────────────────────────────────────────────
const tokens = {
  colors,
  gradients,
  shadows,
  typography,
  spacing,
  radii,
  animation,
  breakpoints,
  zIndex,
} as const;

export default tokens;
