"use client";

import React from "react";
import { ThemeProvider } from "next-themes";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "@/components/ui/sonner";

export function GlobalProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <CartProvider>
        {children}
        <Toaster position="top-right" richColors closeButton />
      </CartProvider>
    </ThemeProvider>
  );
}
