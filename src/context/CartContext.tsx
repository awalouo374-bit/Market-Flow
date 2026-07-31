"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItemState {
  id: string;
  productId: string;
  name: string;
  price: number;
  image?: string;
  variantName?: string;
  quantity: number;
}

interface CartContextType {
  items: CartItemState[];
  itemCount: number;
  subtotal: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItemState, "quantity"> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItemState[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("marketflow_cart");
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem("marketflow_cart", JSON.stringify(items));
      } catch {
        // Ignore storage errors
      }
    }
  }, [items, mounted]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const addItem = (newItem: Omit<CartItemState, "quantity"> & { quantity?: number }) => {
    const qtyToAdd = newItem.quantity || 1;
    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === newItem.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qtyToAdd,
        };
        return updated;
      }
      return [...prev, { ...newItem, quantity: qtyToAdd }];
    });
    setIsCartOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => setItems([]);

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
