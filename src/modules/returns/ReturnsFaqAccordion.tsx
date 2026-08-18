"use client";

import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  HelpCircle,
  ShieldCheck,
  RefreshCw,
  Gift,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const RETURN_FAQ = [
  {
    id: "return-window",
    title: "What is the MarketFlow return window & holiday extension?",
    badge: "30 Days",
    content: (
      <div className="space-y-2 text-slate-300 text-sm leading-relaxed">
        <p>
          We offer a standard <strong className="text-white">30-day money-back guarantee</strong> starting from the date of package delivery.
        </p>
        <p>
          <strong className="text-[#00F0FF]">Holiday Extension:</strong> All purchases made between November 1st and December 31st are eligible for returns through January 31st of the following year.
        </p>
      </div>
    ),
  },
  {
    id: "return-fees",
    title: "Are return shipping labels free?",
    badge: "Free Prepaid Label",
    content: (
      <div className="space-y-2 text-slate-300 text-sm leading-relaxed">
        <p>
          <strong className="text-white">Yes, 100% free!</strong> MarketFlow provides prepaid return labels for all items returned within the 30-day window across the US, Canada, EU, UK, and Australia.
        </p>
        <p>
          Additionally, if you choose <strong className="text-[#00F0FF]">Store Credit Refund</strong>, we automatically add a <strong className="text-emerald-400">+$5.00 bonus credit</strong> to your account balance.
        </p>
      </div>
    ),
  },
  {
    id: "exchanges",
    title: "How do instant size & color exchanges work?",
    badge: "Priority Dispatch",
    content: (
      <div className="space-y-2 text-slate-300 text-sm leading-relaxed">
        <p>
          If you need a different size or color variant, select <strong className="text-white">Instant Exchange</strong> in our portal. We immediately dispatch your new item via Priority Air before waiting for your original package to arrive at our warehouse.
        </p>
      </div>
    ),
  },
  {
    id: "non-returnable",
    title: "Which items are non-returnable?",
    badge: "Exclusions",
    content: (
      <div className="space-y-2 text-slate-300 text-sm leading-relaxed">
        <p>
          For hygiene and safety compliance, the following categories cannot be returned unless defective:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-slate-300">
          <li>Unsealed in-ear audio equipment (ANC earbuds).</li>
          <li>Gift cards & downloadable software licenses.</li>
          <li>Final Sale clearance merchandise marked as non-returnable.</li>
        </ul>
      </div>
    ),
  },
];

export function ReturnsFaqAccordion() {
  return (
    <section className="py-16 sm:py-24 bg-[#0B0F19] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-semibold text-[#00F0FF]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Return Policy FAQ</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>

          <p className="text-slate-400 text-sm leading-relaxed">
            Everything you need to know regarding returns, instant exchanges, and refund processing timelines.
          </p>
        </div>

        {/* Shadcn Accordion */}
        <div className="rounded-2xl p-6 bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-xl">
          <Accordion type="single" collapsible defaultValue="return-window" className="space-y-4">
            {RETURN_FAQ.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border border-slate-800 rounded-xl bg-slate-950/60 px-5 transition-colors data-[state=open]:border-[#00F0FF]/40 data-[state=open]:bg-slate-950"
              >
                <AccordionTrigger className="py-4 hover:no-underline cursor-pointer group text-left">
                  <span className="text-base font-bold text-white group-hover:text-[#00F0FF] transition-colors">
                    {item.title}
                  </span>
                  <Badge className="hidden sm:inline-flex bg-slate-900 text-slate-300 border-slate-700 text-[10px] uppercase font-bold mr-2">
                    {item.badge}
                  </Badge>
                </AccordionTrigger>

                <AccordionContent className="pb-5 pt-1 text-left text-slate-300 border-t border-slate-900 mt-2">
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

      </div>
    </section>
  );
}
