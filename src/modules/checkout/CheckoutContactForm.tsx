"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  Globe,
  Hash,
  AlertCircle,
  ChevronRight,
} from "lucide-react";

const contactSchema = z.object({
  firstName: z.string().min(2, "First name is required."),
  lastName: z.string().min(2, "Last name is required."),
  email: z.string().email("Enter a valid email address."),
  phone: z.string().min(7, "Enter a valid phone number.").optional().or(z.literal("")),
  address1: z.string().min(5, "Street address is required."),
  address2: z.string().optional(),
  city: z.string().min(2, "City is required."),
  state: z.string().min(2, "State / Province is required."),
  postalCode: z.string().min(3, "Postal / ZIP code is required."),
  country: z.string().min(1, "Please select a country."),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

const COUNTRIES = [
  "United States",
  "Canada",
  "United Kingdom",
  "France",
  "Germany",
  "Australia",
  "Japan",
  "Spain",
  "Italy",
  "Netherlands",
  "Belgium",
  "Switzerland",
  "Singapore",
  "New Zealand",
];

const INPUT_CLASS =
  "w-full h-11 px-3.5 rounded-xl bg-slate-950/90 border border-slate-700/80 text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00F0FF] focus:border-[#00F0FF] transition-all";

const LABEL_CLASS = "text-xs font-semibold text-slate-300 block mb-1.5";

const ERROR_CLASS =
  "text-xs text-[#FF4D4D] flex items-center gap-1 mt-1";

interface Props {
  onNext: (data: ContactFormValues) => void;
  defaultValues?: Partial<ContactFormValues>;
}

export function CheckoutContactForm({ onNext, defaultValues }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      country: "United States",
      ...defaultValues,
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <User className="w-5 h-5 text-[#00F0FF]" />
        <span>Contact & Shipping Information</span>
      </h2>

      <form onSubmit={handleSubmit(onNext)} className="space-y-4">
        {/* Name Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={LABEL_CLASS}>First Name</label>
            <input
              {...register("firstName")}
              placeholder="Jane"
              className={INPUT_CLASS}
            />
            {errors.firstName && (
              <p className={ERROR_CLASS}>
                <AlertCircle className="w-3 h-3" />
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div>
            <label className={LABEL_CLASS}>Last Name</label>
            <input
              {...register("lastName")}
              placeholder="Doe"
              className={INPUT_CLASS}
            />
            {errors.lastName && (
              <p className={ERROR_CLASS}>
                <AlertCircle className="w-3 h-3" />
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        {/* Email & Phone Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={LABEL_CLASS}>Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                {...register("email")}
                placeholder="jane@example.com"
                className={`${INPUT_CLASS} pl-10`}
              />
            </div>
            {errors.email && (
              <p className={ERROR_CLASS}>
                <AlertCircle className="w-3 h-3" />
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className={LABEL_CLASS}>Phone Number (Optional)</label>
            <div className="relative">
              <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="tel"
                {...register("phone")}
                placeholder="+1 555 000 0000"
                className={`${INPUT_CLASS} pl-10`}
              />
            </div>
          </div>
        </div>

        {/* Address */}
        <div>
          <label className={LABEL_CLASS}>Street Address</label>
          <div className="relative">
            <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              {...register("address1")}
              placeholder="123 Main Street"
              className={`${INPUT_CLASS} pl-10`}
            />
          </div>
          {errors.address1 && (
            <p className={ERROR_CLASS}>
              <AlertCircle className="w-3 h-3" />
              {errors.address1.message}
            </p>
          )}
        </div>

        <div>
          <label className={LABEL_CLASS}>Apartment, Suite, Floor (Optional)</label>
          <div className="relative">
            <Building2 className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              {...register("address2")}
              placeholder="Apt 4B"
              className={`${INPUT_CLASS} pl-10`}
            />
          </div>
        </div>

        {/* City / State / ZIP */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={LABEL_CLASS}>City</label>
            <input
              {...register("city")}
              placeholder="New York"
              className={INPUT_CLASS}
            />
            {errors.city && (
              <p className={ERROR_CLASS}>
                <AlertCircle className="w-3 h-3" />
                {errors.city.message}
              </p>
            )}
          </div>
          <div>
            <label className={LABEL_CLASS}>State / Province</label>
            <input
              {...register("state")}
              placeholder="NY"
              className={INPUT_CLASS}
            />
            {errors.state && (
              <p className={ERROR_CLASS}>
                <AlertCircle className="w-3 h-3" />
                {errors.state.message}
              </p>
            )}
          </div>
          <div>
            <label className={LABEL_CLASS}>ZIP / Postal Code</label>
            <div className="relative">
              <Hash className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                {...register("postalCode")}
                placeholder="10001"
                className={`${INPUT_CLASS} pl-10 font-mono`}
              />
            </div>
            {errors.postalCode && (
              <p className={ERROR_CLASS}>
                <AlertCircle className="w-3 h-3" />
                {errors.postalCode.message}
              </p>
            )}
          </div>
        </div>

        {/* Country */}
        <div>
          <label className={LABEL_CLASS}>Country / Region</label>
          <div className="relative">
            <Globe className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            <select
              {...register("country")}
              className={`${INPUT_CLASS} pl-10 cursor-pointer`}
            >
              {COUNTRIES.map((c) => (
                <option key={c} value={c} className="bg-slate-900 text-white">
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full h-12 mt-2 rounded-xl bg-[#FF4D4D] hover:bg-[#FF3333] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#FF4D4D]/25 hover:shadow-[#FF4D4D]/40 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Continue to Shipping Method</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </form>
    </motion.div>
  );
}
