"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, AlertCircle, Key, ShoppingBag } from "lucide-react";
import { loginWithCredentials } from "@/actions/authActions";
import { toast } from "sonner";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setErrorMsg(null);

    const res = await loginWithCredentials({ email, password });
    setIsLoading(false);

    if (res.success) {
      toast.success("Successfully logged in!", {
        description: "Welcome back to MarketFlow.",
      });
      router.push(email.includes("admin") ? "/admin" : "/");
      router.refresh();
    } else {
      setErrorMsg(res.error || "Authentication failed. Please check your credentials.");
      toast.error("Sign in failed", {
        description: res.error || "Check your credentials and try again.",
      });
    }
  };

  const fillDemoAccount = (demoEmail: string, roleName: string) => {
    setEmail(demoEmail);
    setPassword(demoEmail.includes("admin") ? "Galabdon09" : "demo123456");
    setErrorMsg(null);
    toast.info(`Filled ${roleName} credentials`, {
      description: `Email: ${demoEmail}`,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      {errorMsg && (
        <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-xs flex items-center gap-2 animate-in fade-in duration-200">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Email Input */}
      <div className="space-y-1.5 text-left">
        <label htmlFor="auth-email" className="text-xs font-semibold text-foreground block">
          Email Address
        </label>
        <div className="relative">
          <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            id="auth-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="w-full h-11 pl-10 pr-4 rounded-xl bg-muted/50 border border-border/80 text-sm focus:outline-none focus:ring-2 focus:ring-flow-cyan focus:border-flow-cyan transition-all"
          />
        </div>
      </div>

      {/* Password Input */}
      <div className="space-y-1.5 text-left">
        <div className="flex items-center justify-between">
          <label htmlFor="auth-password" className="text-xs font-semibold text-foreground block">
            Password
          </label>
          <Link href="/forgot-password" className="text-xs font-medium text-flow-cyan hover:underline">
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            id="auth-password"
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full h-11 pl-10 pr-10 rounded-xl bg-muted/50 border border-border/80 text-sm focus:outline-none focus:ring-2 focus:ring-flow-cyan focus:border-flow-cyan transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Remember Me */}
      <div className="flex items-center gap-2">
        <input
          id="remember-me"
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="w-4 h-4 rounded border-border text-flow-cyan focus:ring-flow-cyan"
        />
        <label htmlFor="remember-me" className="text-xs text-muted-foreground cursor-pointer select-none">
          Keep me signed in on this device
        </label>
      </div>

      {/* High-Conversion Coral Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full h-12 rounded-xl bg-[#FF6B6B] hover:bg-[#FF5252] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#FF6B6B]/25 hover:shadow-[#FF6B6B]/40 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin text-white" />
        ) : (
          <>
            <span>Sign In to MarketFlow</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      {/* Quick Demo Login Presets */}
      <div className="pt-2 text-center space-y-2">
        <p className="text-[11px] font-semibold text-muted-foreground/80 uppercase tracking-wider">
          Quick Demo Credentials
        </p>
        <div className="flex items-center justify-center gap-2 text-xs">
          <button
            type="button"
            onClick={() => fillDemoAccount("admin@marketflow.com", "Admin")}
            className="px-2.5 py-1 rounded-lg bg-muted/80 hover:bg-muted font-medium text-foreground transition-colors border border-border/60 flex items-center gap-1.5"
          >
            <Key className="w-3.5 h-3.5 text-accent" />
            <span>Fill Admin Demo</span>
          </button>
          <button
            type="button"
            onClick={() => fillDemoAccount("jane@example.com", "Customer")}
            className="px-2.5 py-1 rounded-lg bg-muted/80 hover:bg-muted font-medium text-foreground transition-colors border border-border/60 flex items-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-primary" />
            <span>Fill Customer Demo</span>
          </button>
        </div>
      </div>
    </form>
  );
}
