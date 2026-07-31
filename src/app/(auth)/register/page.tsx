import type { Metadata } from "next";
import { AuthLayoutCard } from "@/modules/auth/AuthLayoutCard";
import { RegisterHeader } from "@/modules/auth/RegisterHeader";
import { RegisterForm } from "@/modules/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Create Account — MarketFlow",
  description: "Join MarketFlow as a customer for fast checkout, order tracking, and exclusive store rewards.",
};

export default function RegisterPage() {
  return (
    <AuthLayoutCard
      footerPrompt="Already have a MarketFlow account?"
      footerLinkHref="/login"
      footerLinkLabel="Sign In"
    >
      <RegisterHeader />
      <RegisterForm />
    </AuthLayoutCard>
  );
}
