"use client";

import { useState, useMemo } from "react";
import { ChevronDown, ThumbsUp, ThumbsDown, HelpCircle, Check, Search } from "lucide-react";
import { toast } from "sonner";

export interface FAQItem {
  id: string;
  category: "orders" | "returns" | "account" | "payments";
  question: string;
  answer: string;
}

interface SupportFAQAccordionProps {
  searchQuery: string;
  selectedCategory: string;
}

const FAQ_DATA: FAQItem[] = [
  // Orders & Shipping
  {
    id: "faq-1",
    category: "orders",
    question: "How do I track my MarketFlow order package?",
    answer:
      "You can track your package in real-time by logging into your account and visiting '/account/orders'. Click on 'View Details' or use the direct carrier tracking link (FedEx, DHL) provided in your order confirmation email.",
  },
  {
    id: "faq-2",
    category: "orders",
    question: "What are your shipping rates and estimated delivery times?",
    answer:
      "Standard shipping (2-4 business days) is FREE on all orders over $100. Express next-day delivery is available for $14.99 on orders placed before 3:00 PM EST.",
  },
  {
    id: "faq-3",
    category: "orders",
    question: "Can I modify or cancel my order after placing it?",
    answer:
      "Orders can be cancelled or edited within 30 minutes of placing them directly from your Order Details page. After 30 minutes, orders enter processing and cannot be modified, but you can initiate a hassle-free return once delivered.",
  },

  // Returns & Refunds
  {
    id: "faq-4",
    category: "returns",
    question: "What is MarketFlow's 30-Day Return Policy?",
    answer:
      "We offer a 30-day money-back guarantee on all products in original condition. Return shipping is completely FREE—just request a prepaid shipping label from your '/account/orders' page.",
  },
  {
    id: "faq-5",
    category: "returns",
    question: "How long does it take to process my refund?",
    answer:
      "Once your returned item arrives at our warehouse, inspection takes 24-48 hours. Refunds are credited back to your original payment method within 3-5 business days.",
  },
  {
    id: "faq-6",
    category: "returns",
    question: "What if my product is defective or damaged?",
    answer:
      "All MarketFlow products carry an official 2-Year Manufacturer Warranty. If your product is defective upon arrival, initiate an instant replacement request in your Account dashboard or submit a support ticket below for express replacement.",
  },

  // Account & Security
  {
    id: "faq-7",
    category: "account",
    question: "How do I reset my password or enable 2-Factor Authentication?",
    answer:
      "Go to '/account/settings' to update your password, email address, and security preferences. We strongly recommend enabling 2FA for enhanced account protection.",
  },
  {
    id: "faq-8",
    category: "account",
    question: "How is my personal data and payment information protected?",
    answer:
      "MarketFlow uses 256-bit SSL encryption and tokenized payment processing compliant with PCI-DSS Level 1 security standards. We never store raw credit card numbers.",
  },

  // Payment & Promos
  {
    id: "faq-9",
    category: "payments",
    question: "How do I apply a promo code or gift voucher?",
    answer:
      "Enter your promo code (e.g. FLOWDEALS20) in the 'Promo Code' input box during checkout and click 'Apply'. The discount will be reflected immediately in your order subtotal.",
  },
  {
    id: "faq-10",
    category: "payments",
    question: "Which payment methods do you accept?",
    answer:
      "We accept Visa, Mastercard, American Express, Apple Pay, Google Pay, and Klarna Pay-in-4 flexible financing.",
  },
];

export function SupportFAQAccordion({ searchQuery, selectedCategory }: SupportFAQAccordionProps) {
  const [openFaqId, setOpenFaqId] = useState<string | null>("faq-1");
  const [feedbackGiven, setFeedbackGiven] = useState<Record<string, "yes" | "no">>({});

  // Search & category filter logic
  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((faq) => {
      // Category filter
      if (selectedCategory !== "all" && faq.category !== selectedCategory) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesQ = faq.question.toLowerCase().includes(query);
        const matchesA = faq.answer.toLowerCase().includes(query);
        if (!matchesQ && !matchesA) return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory]);

  const toggleAccordion = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  const handleFeedback = (faqId: string, choice: "yes" | "no") => {
    setFeedbackGiven((prev) => ({ ...prev, [faqId]: choice }));
    toast.success("Thank you for your feedback!", {
      description: choice === "yes" ? "Glad this article helped!" : "We'll work on improving this answer.",
    });
  };

  return (
    <section aria-labelledby="faq-section-heading" className="space-y-6">
      <div className="flex items-center gap-2">
        <HelpCircle className="w-5 h-5 text-flow-cyan" />
        <h2 id="faq-section-heading" className="text-xl font-bold text-foreground">
          Frequently Asked Questions ({filteredFaqs.length})
        </h2>
      </div>

      {filteredFaqs.length > 0 ? (
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            const userRating = feedbackGiven[faq.id];

            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen ? "border-flow-cyan/50 bg-card shadow-sm" : "border-border bg-card/60 hover:border-border"
                }`}
              >
                {/* Accordion Header */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-sm sm:text-base text-foreground gap-4 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flow-cyan"
                >
                  <span className="flex-1">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-flow-cyan" : ""
                    }`}
                  />
                </button>

                {/* Accordion Answer Content */}
                {isOpen && (
                  <div
                    id={`faq-answer-${faq.id}`}
                    className="px-5 pb-5 pt-1 space-y-4 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/60 animate-in fade-in duration-200"
                  >
                    <p>{faq.answer}</p>

                    {/* Article Helpfulness Feedback */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border/40 text-xs">
                      <span className="font-semibold text-foreground/80">Was this answer helpful?</span>

                      {userRating ? (
                        <span className="inline-flex items-center gap-1 text-emerald-500 font-bold">
                          <Check className="w-4 h-4" />
                          Feedback recorded
                        </span>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleFeedback(faq.id, "yes")}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-border bg-background hover:border-emerald-500 hover:text-emerald-500 transition-colors text-xs font-semibold cursor-pointer"
                          >
                            <ThumbsUp className="w-3.5 h-3.5" />
                            <span>Yes</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleFeedback(faq.id, "no")}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-border bg-background hover:border-red-500 hover:text-red-500 transition-colors text-xs font-semibold cursor-pointer"
                          >
                            <ThumbsDown className="w-3.5 h-3.5" />
                            <span>No</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty FAQ State */
        <div className="rounded-3xl border border-border bg-card p-10 text-center space-y-3">
          <p className="font-bold text-foreground">No answers found matching &quot;{searchQuery}&quot;</p>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            Try searching for different keywords or submit a support ticket below to speak with an agent.
          </p>
        </div>
      )}
    </section>
  );
}
