"use client";

import { authClient } from "@/lib/auth-client";

export async function loginWithCredentials(formData: {
  email: string;
  password?: string;
  redirectTo?: string;
}) {
  try {
    const { error } = await authClient.signIn.email({
      email: formData.email,
      password: formData.password || "demo123456",
    });

    if (error) {
      return { success: false, error: error.message || "Invalid email or password" };
    }

    return { success: true };
  } catch {
    return { success: false, error: "An error occurred during sign in" };
  }
}

export async function loginWithSocial(provider: "google" | "github") {
  await authClient.signIn.social({ provider, callbackURL: "/" });
}
