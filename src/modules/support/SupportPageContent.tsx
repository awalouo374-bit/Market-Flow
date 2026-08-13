"use client";

import { useState } from "react";
import type { CustomerOrder } from "@/lib/user-orders";
import { SupportHero } from "./SupportHero";
import { SupportCategoryGrid } from "./SupportCategoryGrid";
import { SupportFAQAccordion } from "./SupportFAQAccordion";
import { SupportContactForm } from "./SupportContactForm";

interface SupportPageContentProps {
  userOrders?: CustomerOrder[];
  userName?: string | null;
  userEmail?: string | null;
}

export function SupportPageContent({
  userOrders = [],
  userName = "",
  userEmail = "",
}: SupportPageContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const scrollToContactForm = () => {
    const el = document.getElementById("contact-form-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-14">
      {/* 1. Omnichannel Search & Channel Hero */}
      <SupportHero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onScrollToForm={scrollToContactForm}
      />

      {/* 2. Quick-Action Category Grid */}
      <SupportCategoryGrid
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* 3. Searchable FAQ Accordion */}
      <SupportFAQAccordion
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
      />

      {/* 4. Support Request Form */}
      <SupportContactForm
        userOrders={userOrders}
        defaultName={userName ?? ""}
        defaultEmail={userEmail ?? ""}
      />
    </div>
  );
}
