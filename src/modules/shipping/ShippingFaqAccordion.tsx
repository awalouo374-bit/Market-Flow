"use client";

import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  ShieldCheck,
  Globe,
  Clock,
  HelpCircle,
  FileText,
  AlertTriangle,
  Leaf,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const POLICY_ITEMS = [
  {
    id: "ddp-customs",
    icon: Globe,
    title: "Global Shipping & Customs Duties (DDP Guarantee)",
    badge: "100% Guaranteed",
    content: (
      <div className="space-y-2 text-slate-300 text-sm leading-relaxed">
        <p>
          All international orders shipped via MarketFlow Global Priority are dispatched under <strong className="text-white">DDP (Delivered Duty Paid)</strong> terms. This means all import taxes, VAT, and local customs clearance fees are calculated and prepaid at checkout.
        </p>

        <ul className="list-disc pl-5 space-y-1 text-slate-300">
          <li>Zero surprise fees or unexpected customs invoices upon delivery.</li>
          <li>Pre-cleared customs documentation for seamless border transit.</li>
          <li>Available in over 180+ countries across North America, Europe, Asia-Pacific, and Latin America.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "address-modifications",
    icon: Clock,
    title: "Address Modifications & Order Cancellation Window",
    badge: "60-Min Window",
    content: (
      <div className="space-y-2 text-slate-300 text-sm leading-relaxed">
        <p>
          To maintain our rapid delivery commitment, orders enter automated robot sorting at our fulfillment hubs within <strong className="text-white">60 minutes of payment confirmation</strong>.
        </p>

        <ul className="list-disc pl-5 space-y-1 text-slate-300">
          <li><strong className="text-[#00F0FF]">Address Changes:</strong> You can modify your shipping address directly from your Account Order Portal within the 60-minute grace window.</li>
          <li><strong className="text-[#00F0FF]">After Dispatch:</strong> Once a tracking number is assigned, address redirects must be requested directly through the carrier (UPS MyChoice, FedEx Delivery Manager, or DHL ExpressOnDemand).</li>
        </ul>
      </div>
    ),
  },
  {
    id: "lost-damaged",
    icon: ShieldCheck,
    title: "Lost, Delayed, or Stolen Package Guarantees",
    badge: "Full Coverage",
    content: (
      <div className="space-y-2 text-slate-300 text-sm leading-relaxed">
        <p>
          Every shipment sent through MarketFlow is <strong className="text-white">100% Transit Insured</strong> against damage, carrier loss, or doorstep theft.
        </p>

        <ul className="list-disc pl-5 space-y-1 text-slate-300">
          <li><strong className="text-[#00F0FF]">Non-Movement Claim:</strong> If a package shows no tracking scans for 5 consecutive business days, we issue an immediate priority reshipment or full refund.</li>
          <li><strong className="text-[#00F0FF]">Damage Claim:</strong> Contact MarketFlow Support with photos within 7 days of arrival for expedited single-day replacements.</li>
          <li><strong className="text-[#00F0FF]">Signature Required Options:</strong> High-value electronics ($500+) require direct signature confirmation by default.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "eco-packaging",
    icon: Leaf,
    title: "Eco-Friendly & Sustainable Packaging Practices",
    badge: "Carbon Neutral",
    content: (
      <div className="space-y-2 text-slate-300 text-sm leading-relaxed">
        <p>
          MarketFlow is committed to zero-waste commerce. 100% of our outbound packaging materials are constructed from certified post-consumer recycled paper and ocean-safe biodegradable mailers.
        </p>

        <ul className="list-disc pl-5 space-y-1 text-slate-300">
          <li>Right-sized box algorithms to eliminate unnecessary plastic air pillows.</li>
          <li>Carbon-offset flight partnerships for all Express Air shipments.</li>
          <li>100% curbside recyclable packaging materials.</li>
        </ul>
      </div>
    ),
  },
];

export function ShippingFaqAccordion() {
  return (
    <section className="py-16 sm:py-24 bg-[#0B0F19] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-semibold text-[#00F0FF]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Clear Policy Transparency</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            International Delivery & Policy Details
          </h2>

          <p className="text-slate-400 text-sm leading-relaxed">
            Everything you need to know regarding customs clearance, address changes, transit guarantees, and eco-friendly fulfillment.
          </p>
        </div>

        {/* Shadcn Accordion */}
        <div className="rounded-2xl p-6 bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-xl">
          <Accordion type="single" collapsible defaultValue="ddp-customs" className="space-y-4">
            {POLICY_ITEMS.map((item) => {
              const Icon = item.icon;

              return (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="border border-slate-800 rounded-xl bg-slate-950/60 px-5 transition-colors data-[state=open]:border-[#00F0FF]/40 data-[state=open]:bg-slate-950"
                >
                  <AccordionTrigger className="py-4 hover:no-underline cursor-pointer group text-left">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-[#00F0FF] group-hover:border-[#00F0FF]/40 transition-colors shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-base font-bold text-white group-hover:text-[#00F0FF] transition-colors">
                        {item.title}
                      </span>
                    </div>

                    <Badge className="hidden sm:inline-flex bg-slate-900 text-slate-300 border-slate-700 text-[10px] uppercase font-bold mr-2">
                      {item.badge}
                    </Badge>
                  </AccordionTrigger>

                  <AccordionContent className="pb-5 pt-1 text-left text-slate-300 border-t border-slate-900 mt-2">
                    {item.content}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>

        {/* Bottom Support Callout Strip */}
        <div className="mt-10 p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF4D4D]/10 border border-[#FF4D4D]/30 flex items-center justify-center text-[#FF4D4D]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Have a specific custom shipping question?</p>
              <p className="text-xs text-slate-400">Our global logistics support team is available 24/7.</p>
            </div>
          </div>

          <a
            href="/support"
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors shrink-0 border border-slate-700"
          >
            Contact Logistics Support
          </a>
        </div>

      </div>
    </section>
  );
}
