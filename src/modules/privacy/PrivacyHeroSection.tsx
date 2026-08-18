"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Eye, FileText, Database, UserCheck, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const PRINCIPLES = [
  {
    icon: ShieldCheck,
    title: "Zero Third-Party Data Sales",
    description: "We never sell, rent, or monetize your personal information to third-party ad networks or brokers.",
  },
  {
    icon: Lock,
    title: "AES-256 End-to-End Encryption",
    description: "All stored telemetry and payment details are encrypted using military-grade AES-256 and TLS 1.3 standards.",
  },
  {
    icon: UserCheck,
    title: "GDPR & CCPA Compliant",
    description: "Full compliance with global data privacy frameworks giving you absolute control over your digital footprint.",
  },
  {
    icon: Database,
    title: "Minimal Data Retention",
    description: "We only collect data strictly necessary to fulfill orders, process payments, and prevent fraudulent activity.",
  },
];

export function PrivacyHeroSection() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24 border-b border-slate-800/80 bg-[#0B0F19]">
      {/* Background Lights */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#00F0FF]/15 via-cyan-500/5 to-transparent blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-[#00F0FF]/30 text-xs font-semibold text-[#00F0FF] backdrop-blur-md mb-6">
          <ShieldCheck className="w-4 h-4 text-[#00F0FF]" />
          <span>SOC2 Type II & GDPR Certified Trust</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] max-w-4xl mx-auto mb-6">
          Your Privacy, Protected by <br />
          <span className="bg-gradient-to-r from-[#00F0FF] via-cyan-200 to-white bg-clip-text text-transparent">
            Cryptographic Transparency.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed mb-14">
          MarketFlow is engineered from the ground up to respect consumer privacy. Read our transparent policies below and exercise your statutory data rights instantly.
        </p>

        {/* Core Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {PRINCIPLES.map((p, idx) => {
            const Icon = p.icon;

            return (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="rounded-2xl p-6 bg-slate-900/90 border border-slate-800 backdrop-blur-xl flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#00F0FF]/10 border border-[#00F0FF]/30 flex items-center justify-center text-[#00F0FF] mb-4 group-hover:bg-[#00F0FF] group-hover:text-slate-950 transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{p.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
