"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const TEAM = [
  {
    name: "Alex Vance",
    role: "Co-Founder & CEO",
    bio: "Former Principal Systems Architect with 12+ years in global logistics networks and high-throughput commerce software.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Elena Rostova",
    role: "Head of Product & UX",
    bio: "Passionate about minimalist design systems, accessible interfaces, and frictionless conversion psychology.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Marcus Thorne",
    role: "VP of Engineering",
    bio: "Specialist in edge compute runtimes, serverless Postgres caching, and distributed supply chain automation.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Sarah Chen",
    role: "Global Logistics Lead",
    bio: "Oversees cross-border DDP clearance, carrier partnerships, and eco-friendly fulfillment initiatives.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
  },
];

export function AboutTeamSection() {
  return (
    <section className="py-16 sm:py-24 bg-[#0B0F19] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-semibold text-[#00F0FF]">
            <Users className="w-3.5 h-3.5" />
            <span>Leadership & Engineering</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Meet the Builders Behind MarketFlow
          </h2>

          <p className="text-slate-400 text-sm leading-relaxed">
            A distributed team of engineers, designers, and logistics specialists committed to building modern e-commerce.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {TEAM.map((member, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="rounded-2xl p-5 bg-slate-900/90 border border-slate-800 backdrop-blur-xl flex flex-col justify-between group overflow-hidden"
            >
              <div>
                {/* Avatar Image */}
                <div className="w-full h-48 rounded-xl overflow-hidden mb-4 relative bg-slate-950">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                </div>

                <Badge className="bg-[#00F0FF]/15 text-[#00F0FF] border-[#00F0FF]/30 text-[10px] font-bold mb-2">
                  {member.role}
                </Badge>

                <h3 className="text-lg font-bold text-white mb-1.5">{member.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
