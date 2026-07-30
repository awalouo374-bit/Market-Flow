"use client";

import { BrandLogo } from "@/components/shared/BrandLogo";
import { GradientText } from "@/components/shared/GradientText";
import { BrandButton } from "@/components/shared/BrandButton";
import { BrandCard } from "@/components/shared/BrandCard";
import { MetricCard } from "@/components/shared/MetricCard";
import { colors } from "./tokens";

/**
 * DesignShowcase
 * ──────────────
 * Interactive visual showcase of the MarketFlow design system.
 * Demonstrates tokens, color palette, typography, buttons, cards, and metrics.
 */
export function DesignShowcase() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-16 px-6 py-16">
      {/* ── Header ──────────────────────────────── */}
      <header className="text-center space-y-4">
        <div className="flex justify-center">
          <BrandLogo size="xl" showTagline />
        </div>
        <GradientText as="h1" variant="flow" className="text-5xl font-extrabold mt-6">
          MarketFlow Design System
        </GradientText>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A complete graphic chart and modular component library derived from the MarketFlow brand identity.
        </p>
      </header>

      {/* ── Color Palette ───────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Color Palette</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {/* Market Navy */}
          <div className="space-y-2">
            <div className="h-24 rounded-xl bg-market-navy shadow-sm" />
            <p className="text-sm font-semibold text-foreground">Market Navy</p>
            <p className="text-xs text-muted-foreground">{colors.marketNavy.DEFAULT}</p>
          </div>
          {/* Navy Dark */}
          <div className="space-y-2">
            <div className="h-24 rounded-xl bg-market-navy-dark shadow-sm" />
            <p className="text-sm font-semibold text-foreground">Navy Dark</p>
            <p className="text-xs text-muted-foreground">{colors.marketNavy.dark}</p>
          </div>
          {/* Flow Cyan */}
          <div className="space-y-2">
            <div className="h-24 rounded-xl bg-flow-cyan shadow-sm" />
            <p className="text-sm font-semibold text-foreground">Flow Cyan</p>
            <p className="text-xs text-muted-foreground">{colors.flowCyan.DEFAULT}</p>
          </div>
          {/* Cyan Light */}
          <div className="space-y-2">
            <div className="h-24 rounded-xl bg-flow-cyan-light shadow-sm" />
            <p className="text-sm font-semibold text-foreground">Cyan Light</p>
            <p className="text-xs text-muted-foreground">{colors.flowCyan.light}</p>
          </div>
          {/* Silver Metallic */}
          <div className="space-y-2">
            <div className="h-24 rounded-xl bg-silver-metallic shadow-sm" />
            <p className="text-sm font-semibold text-foreground">Silver Metallic</p>
            <p className="text-xs text-muted-foreground">{colors.silverMetallic.DEFAULT}</p>
          </div>
        </div>
      </section>

      {/* ── Gradients ───────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Gradients</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <div className="h-32 rounded-2xl bg-flow-gradient shadow-md" />
            <p className="text-sm font-semibold text-foreground">Flow Gradient (135°)</p>
          </div>
          <div className="space-y-2">
            <div className="h-32 rounded-2xl bg-flow-gradient-horizontal shadow-md" />
            <p className="text-sm font-semibold text-foreground">Flow Horizontal (90°)</p>
          </div>
          <div className="space-y-2">
            <div className="h-32 rounded-2xl bg-silver-gradient shadow-md" />
            <p className="text-sm font-semibold text-foreground">Silver Gradient</p>
          </div>
        </div>
      </section>

      {/* ── Typography ──────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Typography</h2>
        <div className="space-y-4">
          <GradientText as="h1" variant="flow" className="text-6xl font-extrabold">
            Heading 1 — Shop. Flow. Grow.
          </GradientText>
          <GradientText as="h2" variant="cyan" className="text-4xl font-bold">
            Heading 2 — Market Momentum
          </GradientText>
          <GradientText as="h3" variant="silver" className="text-2xl font-semibold">
            Heading 3 — Silver Accent
          </GradientText>
          <p className="text-lg text-foreground">
            Body text — The platform that empowers businesses to scale with confidence. Our data-driven approach
            transforms how you understand, engage, and grow your market.
          </p>
          <p className="text-sm text-muted-foreground">
            Caption — Secondary descriptive text in muted tones for supporting information.
          </p>
        </div>
      </section>

      {/* ── Buttons ──────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Buttons</h2>
        <div className="flex flex-wrap items-center gap-4">
          <BrandButton variant="flow">Flow Gradient</BrandButton>
          <BrandButton variant="navy">Navy Solid</BrandButton>
          <BrandButton variant="silver">Silver Outline</BrandButton>
          <BrandButton variant="glow">Glow CTA</BrandButton>
          <BrandButton variant="ghost">Ghost</BrandButton>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <BrandButton variant="flow" size="sm">Small</BrandButton>
          <BrandButton variant="flow" size="md">Medium</BrandButton>
          <BrandButton variant="flow" size="lg">Large</BrandButton>
        </div>
      </section>

      {/* ── Cards ────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Cards</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <BrandCard variant="default">
            <h3 className="font-semibold text-foreground mb-2">Default Card</h3>
            <p className="text-sm text-muted-foreground">Clean, minimal card with subtle border and shadow.</p>
          </BrandCard>
          <BrandCard variant="glass">
            <h3 className="font-semibold text-foreground mb-2">Glass Card</h3>
            <p className="text-sm text-muted-foreground">Glassmorphism blur with translucent background.</p>
          </BrandCard>
          <BrandCard variant="glow">
            <h3 className="font-semibold text-foreground mb-2">Glow Card</h3>
            <p className="text-sm text-muted-foreground">Cyan neon border with ambient glow effect.</p>
          </BrandCard>
          <BrandCard variant="elevated">
            <h3 className="font-semibold text-foreground mb-2">Elevated Card</h3>
            <p className="text-sm text-muted-foreground">Deep shadow with lift animation on hover.</p>
          </BrandCard>
        </div>
      </section>

      {/* ── Metric Cards ─────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Metric Cards</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            label="Total Revenue"
            value="$48,295"
            change="+12.5% from last month"
            trend="up"
            icon={
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2v16M6 6l4-4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
          />
          <MetricCard
            label="Active Users"
            value="2,847"
            change="+8.2% this week"
            trend="up"
          />
          <MetricCard
            label="Bounce Rate"
            value="24.3%"
            change="-3.1% vs last period"
            trend="down"
          />
          <MetricCard
            label="Conversion"
            value="5.67%"
            change="No change"
            trend="neutral"
          />
        </div>
      </section>

      {/* ── Shadows & Utilities ───────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Shadows & Utilities</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="flex items-center justify-center h-32 rounded-2xl bg-card shadow-glow-cyan">
            <span className="text-sm font-semibold text-foreground">shadow-glow-cyan</span>
          </div>
          <div className="flex items-center justify-center h-32 rounded-2xl bg-card shadow-glow-navy">
            <span className="text-sm font-semibold text-foreground">shadow-glow-navy</span>
          </div>
          <div className="flex items-center justify-center h-32 rounded-2xl glass-panel">
            <span className="text-sm font-semibold text-foreground">glass-panel</span>
          </div>
        </div>
      </section>

      {/* ── Logo Sizes ────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Logo Variants</h2>
        <div className="flex flex-wrap items-end gap-8">
          <div className="text-center space-y-2">
            <BrandLogo size="sm" />
            <p className="text-xs text-muted-foreground">sm</p>
          </div>
          <div className="text-center space-y-2">
            <BrandLogo size="md" />
            <p className="text-xs text-muted-foreground">md</p>
          </div>
          <div className="text-center space-y-2">
            <BrandLogo size="lg" showTagline />
            <p className="text-xs text-muted-foreground">lg + tagline</p>
          </div>
          <div className="text-center space-y-2">
            <BrandLogo size="xl" showTagline />
            <p className="text-xs text-muted-foreground">xl + tagline</p>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────── */}
      <footer className="text-center pt-8 border-t border-border">
        <p className="text-sm text-muted-foreground">
          MarketFlow Design System v1.0 — Built with Tailwind CSS + shadcn/ui
        </p>
      </footer>
    </div>
  );
}
