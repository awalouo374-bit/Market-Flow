"use client";

import { signIn } from "next-auth/react";

export async function loginWithCredentials(formData: {
  email: string;
  password?: string;
  redirectTo?: string;
}) {
  try {
    const result = await signIn("credentials", {
      email: formData.email,
      password: formData.password || "demo123456",
      redirect: false,
      redirectTo: formData.redirectTo || "/",
    });

    if (result?.error) {
      return { success: false, error: "Invalid email or password" };
    }

    return { success: true };
  } catch {
    return { success: false, error: "An error occurred during sign in" };
  }
}

export async function loginWithSocial(provider: "google" | "github") {
  await signIn(provider, { callbackUrl: "/" });
}
