import { Award, Star, CheckCircle, ShieldCheck } from "lucide-react";

const PROOF_ITEMS = [
  {
    icon: Award,
    title: "TechRadar 2026 Award",
    subtitle: "Voted #1 Best Premium Audio & Phone Ecosystem",
  },
  {
    icon: Star,
    title: "4.9 / 5.0 Star Rating",
    subtitle: "Over 50,000+ verified customer reviews",
  },
  {
    icon: CheckCircle,
    title: "Quality Tested",
    subtitle: "100% authentic products with 2-year warranty",
  },
  {
    icon: ShieldCheck,
    title: "Express Guarantee",
    subtitle: "Dispatched within 24 hours with trackable delivery",
  },
];

export function FeaturedSocialProofStrip() {
  return (
    <section
      aria-label="MarketFlow social proof and accolades"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {PROOF_ITEMS.map(({ icon: Icon, title, subtitle }) => (
        <div
          key={title}
          className="flex items-center gap-3.5 p-4 rounded-2xl border border-border bg-card hover:border-flow-cyan/40 transition-all duration-300 shadow-2xs"
        >
          <div className="p-2.5 rounded-xl bg-flow-cyan/10 text-flow-cyan shrink-0">
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-sm text-foreground leading-tight">{title}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
