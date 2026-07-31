import type { Metadata } from "next";
import { AuthLayoutCard } from "@/modules/auth/AuthLayoutCard";
import { AuthHeader } from "@/modules/auth/AuthHeader";
import { LoginForm } from "@/modules/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign In — MarketFlow",
  description: "Access your MarketFlow account to manage orders, wishlist, and instant checkout.",
};

export default function LoginPage() {
  return (
    <AuthLayoutCard>
      <AuthHeader />

      <div className="space-y-4">
        <LoginForm />
      </div>
    </AuthLayoutCard>
  );
}
