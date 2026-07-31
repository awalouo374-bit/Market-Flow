"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export async function registerCustomerAction(formData: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const name = formData.name.trim();
    const email = formData.email.toLowerCase().trim();
    const password = formData.password;

    if (!name || name.length < 2) {
      return { success: false, error: "Please enter your full name (minimum 2 characters)." };
    }

    if (!email || !email.includes("@")) {
      return { success: false, error: "Please enter a valid email address." };
    }

    if (!password || password.length < 6) {
      return { success: false, error: "Password must be at least 6 characters long." };
    }

    // Check if user already exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      return { success: false, error: "An account with this email address already exists." };
    }

    // Hash password & insert customer user
    const passwordHash = await bcrypt.hash(password, 10);

    await db.insert(users).values({
      name,
      email,
      passwordHash,
      role: "customer",
      status: "active",
    });

    return { success: true };
  } catch {
    return { success: false, error: "Failed to create account. Please try again." };
  }
}
