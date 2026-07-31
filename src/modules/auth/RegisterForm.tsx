"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, Eye, EyeOff, UserPlus, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { registerCustomerAction } from "@/actions/registerAction";
import { loginWithCredentials } from "@/actions/authActions";
import { toast } from "sonner";

export function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);

    try {
      const res = await registerCustomerAction({ name, email, password });
      if (!res.success) {
        setErrorMsg(res.error || "Failed to register");
        setIsLoading(false);
        return;
      }

      toast.success("Account created successfully! Logging you in...");

      // Auto sign-in after registration
      const loginRes = await loginWithCredentials({ email, password });
      if (loginRes.success) {
        router.push("/");
        router.refresh();
      } else {
        router.push("/login?registered=true");
      }
    } catch {
      setErrorMsg("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMsg && (
        <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-xs font-medium flex items-start gap-2 animate-in fade-in-50">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-foreground">Full Name</label>
        <div className="relative">
          <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="w-full h-11 pl-10 pr-4 rounded-xl bg-muted/50 border border-border/80 text-sm focus:outline-none focus:ring-2 focus:ring-flow-cyan focus:border-flow-cyan transition-all"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-foreground">Email Address</label>
        <div className="relative">
          <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="w-full h-11 pl-10 pr-4 rounded-xl bg-muted/50 border border-border/80 text-sm focus:outline-none focus:ring-2 focus:ring-flow-cyan focus:border-flow-cyan transition-all"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-foreground">Password</label>
        <div className="relative">
          <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimum 6 characters"
            className="w-full h-11 pl-10 pr-10 rounded-xl bg-muted/50 border border-border/80 text-sm focus:outline-none focus:ring-2 focus:ring-flow-cyan focus:border-flow-cyan transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full h-11 rounded-xl bg-flow-gradient hover:opacity-95 text-white text-sm font-bold shadow-lg shadow-flow-cyan/20 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            <UserPlus className="w-4 h-4" />
            <span>Create Customer Account</span>
          </>
        )}
      </button>
    </form>
  );
}
