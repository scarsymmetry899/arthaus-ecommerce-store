"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { CartItem, Product, ProductSize, Frame, MatOption, GlassOption } from "@/types";

interface AddItemPayload {
  product: Product;
  selected_size: ProductSize;
  selected_frame?: Frame;
  selected_mat?: MatOption;
  selected_glass?: GlassOption;
  quantity?: number;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (payload: AddItemPayload) => void;
  removeItem: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType>({
  items: [],
  itemCount: 0,
  isOpen: false,
  openCart: () => {},
  closeCart: () => {},
  toggleCart: () => {},
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  getSubtotal: () => 0,
  getItemCount: () => 0,
});

function computeItemPrice(
  size: ProductSize,
  frame?: Frame,
  mat?: MatOption
): number {
  let price = size.price;
  if (frame) {
    price += frame.price_adder_by_size[size.label] ?? 0;
  }
  if (mat && mat !== "none") {
    price += 15;
  }
  return price;
}

const STORAGE_KEY = "arthaus_cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored) as CartItem[]);
      }
    } catch {
      // ignore
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const addItem = useCallback(
    ({
      product,
      selected_size,
      selected_frame,
      selected_mat,
      selected_glass,
      quantity = 1,
    }: AddItemPayload) => {
      setItems((prev) => {
        const existingIndex = prev.findIndex(
          (item) =>
            item.product.id === product.id &&
            item.selected_size.sku === selected_size.sku &&
            item.selected_frame?.id === selected_frame?.id &&
            item.selected_mat === selected_mat
        );
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + quantity,
            total_price:
              computeItemPrice(selected_size, selected_frame, selected_mat) *
              (updated[existingIndex].quantity + quantity),
          };
          return updated;
        }
        const newItem: CartItem = {
          product,
          selected_size,
          selected_frame,
          selected_mat,
          selected_glass,
          quantity,
          total_price:
            computeItemPrice(selected_size, selected_frame, selected_mat) * quantity,
        };
        return [...prev, newItem];
      });
      setIsOpen(true);
    },
    []
  );

  const removeItem = useCallback((index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const updateQuantity = useCallback((index: number, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) => {
      const updated = [...prev];
      const item = updated[index];
      updated[index] = {
        ...item,
        quantity,
        total_price:
          computeItemPrice(item.selected_size, item.selected_frame, item.selected_mat) *
          quantity,
      };
      return updated;
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const getSubtotal = useCallback(() => {
    return items.reduce((sum, item) => sum + item.total_price, 0);
  }, [items]);

  const getItemCount = useCallback(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        toggleCart: () => setIsOpen((v) => !v),
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getSubtotal,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
