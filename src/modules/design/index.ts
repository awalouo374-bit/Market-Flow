/**
 * Design Module — Barrel Export
 * ─────────────────────────────
 * Central entry for design tokens and shared components.
 * Import as: import { tokens, BrandLogo } from "@/modules/design"
 */

export { default as tokens } from "./tokens";
export {
  colors,
  gradients,
  shadows,
  typography,
  spacing,
  radii,
  animation,
  breakpoints,
  zIndex,
} from "./tokens";

// Re-export shared components for convenience
export {
  BrandLogo,
  GradientText,
  BrandButton,
  BrandCard,
  MetricCard,
} from "@/components/shared";
