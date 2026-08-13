"use client";

import { useState } from "react";
import { Send, Paperclip, CheckCircle2, FileText, X, AlertCircle } from "lucide-react";
import type { CustomerOrder } from "@/lib/user-orders";
import { BrandButton } from "@/components/shared/BrandButton";
import { toast } from "sonner";

interface SupportContactFormProps {
  userOrders?: CustomerOrder[];
  defaultEmail?: string;
  defaultName?: string;
}

export function SupportContactForm({
  userOrders = [],
  defaultEmail = "",
  defaultName = "",
}: SupportContactFormProps) {
  const [fullName, setFullName] = useState(defaultName);
  const [email, setEmail] = useState(defaultEmail);
  const [category, setCategory] = useState("Orders & Shipping");
  const [orderId, setOrderId] = useState(userOrders[0]?.orderNumber ?? "");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size too large", { description: "Maximum allowed file size is 10MB." });
        return;
      }
      setAttachedFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !subject || !message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    const ticketNumber = `SUP-2026-${Math.floor(10000 + Math.random() * 90000)}`;

    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Support Ticket Created!", {
        description: `Ticket #${ticketNumber} — Confirmation sent to ${email}`,
      });

      // Reset form
      setSubject("");
      setMessage("");
      setAttachedFile(null);
    }, 800);
  };

  return (
    <section
      id="contact-form-section"
      aria-labelledby="contact-form-heading"
      className="rounded-3xl border border-border bg-card p-6 sm:p-10 space-y-6 shadow-sm scroll-mt-28"
    >
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-flow-cyan uppercase tracking-wider">
          <Send className="w-3.5 h-3.5" />
          <span>Direct Assistance</span>
        </div>
        <h2 id="contact-form-heading" className="text-2xl font-extrabold text-foreground">
          Submit a Support Ticket
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Can&apos;t find your answer in our FAQ? Send our support team a message and we&apos;ll get back to you within 2 hours.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name & Email Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="support-name" className="text-xs font-bold text-foreground">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="support-name"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Martin Alex"
              className="w-full h-11 px-4 rounded-xl border border-border bg-background text-xs font-medium placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-flow-cyan transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="support-email" className="text-xs font-bold text-foreground">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="support-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. martin@example.com"
              className="w-full h-11 px-4 rounded-xl border border-border bg-background text-xs font-medium placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-flow-cyan transition-all"
            />
          </div>
        </div>

        {/* Category & Recent Order Link Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="support-category" className="text-xs font-bold text-foreground">
              Support Topic <span className="text-red-500">*</span>
            </label>
            <select
              id="support-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl border border-border bg-background text-xs font-semibold text-foreground focus:outline-hidden focus:ring-2 focus:ring-flow-cyan transition-all cursor-pointer"
            >
              <option value="Orders & Shipping">Orders & Shipping</option>
              <option value="Returns & Refunds">Returns & Refunds</option>
              <option value="Technical Support">Technical Support & Warranty</option>
              <option value="Payment & Billing">Payment & Billing</option>
              <option value="General Inquiry">General Inquiry</option>
            </select>
          </div>

          {/* Attach Related Order Dropdown */}
          <div className="space-y-1.5">
            <label htmlFor="support-order" className="text-xs font-bold text-foreground">
              Link Recent Order (Optional)
            </label>
            <select
              id="support-order"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl border border-border bg-background text-xs font-semibold text-foreground focus:outline-hidden focus:ring-2 focus:ring-flow-cyan transition-all cursor-pointer"
            >
              <option value="">-- None / General Question --</option>
              {userOrders.map((o) => (
                <option key={o.id} value={o.orderNumber}>
                  {o.orderNumber} (${parseFloat(o.total).toFixed(2)}) - {o.status.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Subject */}
        <div className="space-y-1.5">
          <label htmlFor="support-subject" className="text-xs font-bold text-foreground">
            Subject Summary <span className="text-red-500">*</span>
          </label>
          <input
            id="support-subject"
            type="text"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Brief description of your issue (e.g. Package tracking update)..."
            className="w-full h-11 px-4 rounded-xl border border-border bg-background text-xs font-medium placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-flow-cyan transition-all"
          />
        </div>

        {/* Message */}
        <div className="space-y-1.5">
          <label htmlFor="support-message" className="text-xs font-bold text-foreground">
            Detailed Explanation <span className="text-red-500">*</span>
          </label>
          <textarea
            id="support-message"
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Please provide details, serial numbers, or specific error messages to help us resolve your ticket faster..."
            className="w-full p-4 rounded-xl border border-border bg-background text-xs font-medium placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-flow-cyan transition-all"
          />
        </div>

        {/* File Attachment Uploader */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-foreground">Attachment (Optional)</span>

          {attachedFile ? (
            <div className="flex items-center justify-between p-3 rounded-xl border border-flow-cyan/40 bg-flow-cyan/5 text-xs">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-flow-cyan" />
                <span className="font-semibold text-foreground">{attachedFile.name}</span>
                <span className="text-muted-foreground text-[10px]">
                  ({(attachedFile.size / 1024).toFixed(0)} KB)
                </span>
              </div>
              <button
                type="button"
                onClick={() => setAttachedFile(null)}
                className="p-1 rounded-md text-muted-foreground hover:text-red-500 transition-colors"
                aria-label="Remove attachment"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label
              htmlFor="support-file-input"
              className="flex items-center justify-center gap-2 p-4 rounded-xl border border-dashed border-border bg-muted/30 hover:border-flow-cyan/40 text-xs font-semibold text-muted-foreground hover:text-foreground transition-all cursor-pointer"
            >
              <Paperclip className="w-4 h-4 text-flow-cyan" />
              <span>Attach photo, screenshot, or invoice PDF (Max 10MB)</span>
              <input
                id="support-file-input"
                type="file"
                accept="image/*,application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* Form Submit Button */}
        <div className="pt-2">
          <BrandButton
            type="submit"
            disabled={isSubmitting}
            variant="flow"
            size="lg"
            className="w-full sm:w-auto shadow-glow-cyan gap-2"
          >
            <Send className={`w-4 h-4 ${isSubmitting ? "animate-bounce" : ""}`} />
            <span>{isSubmitting ? "Submitting Ticket..." : "Submit Ticket"}</span>
          </BrandButton>
        </div>
      </form>
    </section>
  );
}
