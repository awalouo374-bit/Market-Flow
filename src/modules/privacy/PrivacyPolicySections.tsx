"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Database,
  Cpu,
  Cookie,
  Server,
  ShieldCheck,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function PrivacyPolicySections() {
  const [cookieEssential, setCookieEssential] = useState(true);
  const [cookiePerformance, setCookiePerformance] = useState(true);
  const [cookieMarketing, setCookieMarketing] = useState(false);

  return (
    <section className="py-16 sm:py-24 bg-[#0B0F19] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-semibold text-[#00F0FF]">
            <Database className="w-3.5 h-3.5" />
            <span>Detailed Disclosures</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Comprehensive Privacy Policy
          </h2>

          <p className="text-slate-400 text-sm leading-relaxed">
            Effective Date: January 1, 2026. Review how we process, store, and safeguard your data across all devices.
          </p>
        </div>

        {/* Policy Accordion */}
        <div className="rounded-2xl p-6 bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-xl text-left space-y-6">
          <Accordion type="single" collapsible defaultValue="info-collected" className="space-y-4">
            
            {/* Section 1 */}
            <AccordionItem
              value="info-collected"
              className="border border-slate-800 rounded-xl bg-slate-950/60 px-5 transition-colors data-[state=open]:border-[#00F0FF]/40 data-[state=open]:bg-slate-950"
            >
              <AccordionTrigger className="py-4 hover:no-underline cursor-pointer group">
                <div className="flex items-center gap-3">
                  <Database className="w-4 h-4 text-[#00F0FF]" />
                  <span className="text-base font-bold text-white group-hover:text-[#00F0FF] transition-colors">
                    1. Information We Collect
                  </span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="pb-5 pt-1 text-slate-300 text-sm leading-relaxed border-t border-slate-900 mt-2 space-y-3">
                <p>
                  We collect personal information when you create an account, place an order, or interact with our storefront:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong className="text-white">Account & Contact Info:</strong> Full Name, Email Address, Shipping/Billing Addresses, Phone Number.</li>
                  <li><strong className="text-white">Transaction History:</strong> Order details, purchased items, payment status tokens (processed via PCI-DSS compliant Stripe/Neon gateway).</li>
                  <li><strong className="text-white">Technical Telemetry:</strong> IP address, browser type, device operating system, and session tokens strictly used for security authentication.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* Section 2 */}
            <AccordionItem
              value="data-usage"
              className="border border-slate-800 rounded-xl bg-slate-950/60 px-5 transition-colors data-[state=open]:border-[#00F0FF]/40 data-[state=open]:bg-slate-950"
            >
              <AccordionTrigger className="py-4 hover:no-underline cursor-pointer group">
                <div className="flex items-center gap-3">
                  <Cpu className="w-4 h-4 text-[#00F0FF]" />
                  <span className="text-base font-bold text-white group-hover:text-[#00F0FF] transition-colors">
                    2. How We Use Your Data & AI Processing
                  </span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="pb-5 pt-1 text-slate-300 text-sm leading-relaxed border-t border-slate-900 mt-2 space-y-3">
                <p>
                  Your information is utilized solely for order dispatch, fraud prevention, and storefront enhancement:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Order fulfillment, real-time logistics tracking, and customer support ticket resolution.</li>
                  <li>Automated anti-fraud screening to protect against stolen credit card attempts.</li>
                  <li>Privacy-preserving AI recommendation models operating on anonymized aggregate telemetry.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* Section 3 */}
            <AccordionItem
              value="cookies-preferences"
              className="border border-slate-800 rounded-xl bg-slate-950/60 px-5 transition-colors data-[state=open]:border-[#00F0FF]/40 data-[state=open]:bg-slate-950"
            >
              <AccordionTrigger className="py-4 hover:no-underline cursor-pointer group">
                <div className="flex items-center gap-3">
                  <Cookie className="w-4 h-4 text-[#00F0FF]" />
                  <span className="text-base font-bold text-white group-hover:text-[#00F0FF] transition-colors">
                    3. Cookies & Live Tracking Preferences
                  </span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="pb-5 pt-1 text-slate-300 text-sm leading-relaxed border-t border-slate-900 mt-2 space-y-4">
                <p>
                  Manage your cookie permissions directly below. Changes take effect immediately across your session.
                </p>

                {/* Live Interactive Cookie Toggles */}
                <div className="space-y-3 p-4 rounded-xl bg-slate-900 border border-slate-800">
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">Essential Cookies (Required)</p>
                      <p className="text-[11px] text-slate-400">Necessary for login sessions, cart items, & security.</p>
                    </div>
                    <Badge className="bg-slate-800 text-slate-300 border-slate-700 text-[10px]">Always Active</Badge>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                    <div>
                      <p className="text-xs font-bold text-white">Performance & Analytics</p>
                      <p className="text-[11px] text-slate-400">Helps us measure page load speeds and navigation UX.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCookiePerformance(!cookiePerformance)}
                      className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-1 cursor-pointer ${
                        cookiePerformance ? "bg-[#00F0FF]" : "bg-slate-700"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                          cookiePerformance ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                    <div>
                      <p className="text-xs font-bold text-white">Marketing & Personalization</p>
                      <p className="text-[11px] text-slate-400">Used for tailored promotional discounts & ads.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCookieMarketing(!cookieMarketing)}
                      className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-1 cursor-pointer ${
                        cookieMarketing ? "bg-[#00F0FF]" : "bg-slate-700"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                          cookieMarketing ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 4 */}
            <AccordionItem
              value="subprocessors"
              className="border border-slate-800 rounded-xl bg-slate-950/60 px-5 transition-colors data-[state=open]:border-[#00F0FF]/40 data-[state=open]:bg-slate-950"
            >
              <AccordionTrigger className="py-4 hover:no-underline cursor-pointer group">
                <div className="flex items-center gap-3">
                  <Server className="w-4 h-4 text-[#00F0FF]" />
                  <span className="text-base font-bold text-white group-hover:text-[#00F0FF] transition-colors">
                    4. Trusted Sub-Processors & Partners
                  </span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="pb-5 pt-1 text-slate-300 text-sm leading-relaxed border-t border-slate-900 mt-2 space-y-3">
                <p>
                  We partner exclusively with SOC2-certified cloud infrastructure and payment providers:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="font-bold text-white block">Neon Database & Drizzle</span>
                    <span className="text-slate-400">Encrypted serverless database storage</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="font-bold text-white block">FedEx, DHL, UPS</span>
                    <span className="text-slate-400">Physical shipment dispatch & tracking</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="font-bold text-white block">Vercel Cloud Edge</span>
                    <span className="text-slate-400">Global edge application hosting</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="font-bold text-white block">Stripe Payments</span>
                    <span className="text-slate-400">PCI-DSS Level 1 payment processing</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </div>

      </div>
    </section>
  );
}
