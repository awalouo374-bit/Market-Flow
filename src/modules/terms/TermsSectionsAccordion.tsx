"use client";

import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  FileText,
  UserCheck,
  ShoppingBag,
  CreditCard,
  ShieldAlert,
  Gavel,
  Copyright,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function TermsSectionsAccordion() {
  return (
    <section className="py-16 sm:py-24 bg-[#0B0F19] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-semibold text-[#00F0FF]">
            <FileText className="w-3.5 h-3.5" />
            <span>Full Legal Provisions</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Detailed Terms & Conditions
          </h2>

          <p className="text-slate-400 text-sm leading-relaxed">
            Click on any section below to review the specific legal clauses governing purchases, warranties, and account usage.
          </p>
        </div>

        {/* Policy Accordion */}
        <div className="rounded-2xl p-6 bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-xl text-left space-y-6">
          <Accordion type="single" collapsible defaultValue="eligibility" className="space-y-4">
            
            {/* Section 1 */}
            <AccordionItem
              value="eligibility"
              className="border border-slate-800 rounded-xl bg-slate-950/60 px-5 transition-colors data-[state=open]:border-[#00F0FF]/40 data-[state=open]:bg-slate-950"
            >
              <AccordionTrigger className="py-4 hover:no-underline cursor-pointer group">
                <div className="flex items-center gap-3">
                  <UserCheck className="w-4 h-4 text-[#00F0FF]" />
                  <span className="text-base font-bold text-white group-hover:text-[#00F0FF] transition-colors">
                    1. Account Registration & User Eligibility
                  </span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="pb-5 pt-1 text-slate-300 text-sm leading-relaxed border-t border-slate-900 mt-2 space-y-3">
                <p>
                  By accessing MarketFlow or registering an account, you represent and warrant that you are at least 18 years of age or possess legal parental consent.
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>You are responsible for maintaining the confidentiality of your account credentials and password.</li>
                  <li>MarketFlow reserves the right to suspend or terminate accounts that engage in fraudulent activity, abusive returns, or unauthorized automated scraping.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* Section 2 */}
            <AccordionItem
              value="order-acceptance"
              className="border border-slate-800 rounded-xl bg-slate-950/60 px-5 transition-colors data-[state=open]:border-[#00F0FF]/40 data-[state=open]:bg-slate-950"
            >
              <AccordionTrigger className="py-4 hover:no-underline cursor-pointer group">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-4 h-4 text-[#00F0FF]" />
                  <span className="text-base font-bold text-white group-hover:text-[#00F0FF] transition-colors">
                    2. Order Acceptance, Pricing & Errors
                  </span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="pb-5 pt-1 text-slate-300 text-sm leading-relaxed border-t border-slate-900 mt-2 space-y-3">
                <p>
                  Receipt of an electronic order confirmation does not signify our final acceptance of your order.
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>MarketFlow reserves the right at any time after receipt of your order to accept, decline, or limit quantity for any reason.</li>
                  <li>In the event of a typographical pricing error or inventory stockout, we will notify you immediately and issue a full prompt refund.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* Section 3 */}
            <AccordionItem
              value="payments-customs"
              className="border border-slate-800 rounded-xl bg-slate-950/60 px-5 transition-colors data-[state=open]:border-[#00F0FF]/40 data-[state=open]:bg-slate-950"
            >
              <AccordionTrigger className="py-4 hover:no-underline cursor-pointer group">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-4 h-4 text-[#00F0FF]" />
                  <span className="text-base font-bold text-white group-hover:text-[#00F0FF] transition-colors">
                    3. Payments, Taxes & DDP Shipping
                  </span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="pb-5 pt-1 text-slate-300 text-sm leading-relaxed border-t border-slate-900 mt-2 space-y-3">
                <p>
                  All payments are securely processed via encrypted PCI-DSS Level 1 payment gateways.
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Prices listed on product pages exclude applicable sales tax, which is calculated at checkout based on shipping location.</li>
                  <li>International shipments dispatched via Global Priority DDP (Delivered Duty Paid) include all customs duties and import taxes prepaid.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* Section 4 */}
            <AccordionItem
              value="intellectual-property"
              className="border border-slate-800 rounded-xl bg-slate-950/60 px-5 transition-colors data-[state=open]:border-[#00F0FF]/40 data-[state=open]:bg-slate-950"
            >
              <AccordionTrigger className="py-4 hover:no-underline cursor-pointer group">
                <div className="flex items-center gap-3">
                  <Copyright className="w-4 h-4 text-[#00F0FF]" />
                  <span className="text-base font-bold text-white group-hover:text-[#00F0FF] transition-colors">
                    4. Intellectual Property & Trademarks
                  </span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="pb-5 pt-1 text-slate-300 text-sm leading-relaxed border-t border-slate-900 mt-2 space-y-3">
                <p>
                  All content included on MarketFlow — including brand logos, graphics, product photography, software code, and UI elements — is the exclusive property of MarketFlow Inc. or its content suppliers and is protected by international copyright laws.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* Section 5 */}
            <AccordionItem
              value="limitation-liability"
              className="border border-slate-800 rounded-xl bg-slate-950/60 px-5 transition-colors data-[state=open]:border-[#00F0FF]/40 data-[state=open]:bg-slate-950"
            >
              <AccordionTrigger className="py-4 hover:no-underline cursor-pointer group">
                <div className="flex items-center gap-3">
                  <ShieldAlert className="w-4 h-4 text-[#00F0FF]" />
                  <span className="text-base font-bold text-white group-hover:text-[#00F0FF] transition-colors">
                    5. Limitation of Liability & Warranty Disclaimers
                  </span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="pb-5 pt-1 text-slate-300 text-sm leading-relaxed border-t border-slate-900 mt-2 space-y-3">
                <p>
                  MarketFlow provides its storefront and products &quot;as is&quot; without any express or implied warranties beyond manufacturer defect coverage and our 30-day money-back guarantee.
                </p>
                <p>
                  In no event shall MarketFlow be liable for indirect, incidental, or consequential damages arising from site downtime or delayed shipping carrier events.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* Section 6 */}
            <AccordionItem
              value="governing-law"
              className="border border-slate-800 rounded-xl bg-slate-950/60 px-5 transition-colors data-[state=open]:border-[#00F0FF]/40 data-[state=open]:bg-slate-950"
            >
              <AccordionTrigger className="py-4 hover:no-underline cursor-pointer group">
                <div className="flex items-center gap-3">
                  <Gavel className="w-4 h-4 text-[#00F0FF]" />
                  <span className="text-base font-bold text-white group-hover:text-[#00F0FF] transition-colors">
                    6. Governing Law & Dispute Resolution
                  </span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="pb-5 pt-1 text-slate-300 text-sm leading-relaxed border-t border-slate-900 mt-2 space-y-3">
                <p>
                  These Terms shall be governed by and construed in accordance with standard commercial laws. Any legal dispute shall be resolved through binding individual arbitration rather than court proceedings.
                </p>
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </div>

      </div>
    </section>
  );
}
