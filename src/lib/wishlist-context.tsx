"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

interface WishlistContextType {
  wishlistIds: string[];
  isWishlisted: (id: string) => boolean;
  toggle: (id: string) => void;
  count: number;
}

const WishlistContext = createContext<WishlistContextType>({
  wishlistIds: [],
  isWishlisted: () => false,
  toggle: () => {},
  count: 0,
});

const STORAGE_KEY = "arthaus_wishlist";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setWishlistIds(JSON.parse(stored) as string[]);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlistIds));
    } catch {
      // ignore
    }
  }, [wishlistIds]);

  const toggle = useCallback((id: string) => {
    setWishlistIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const isWishlisted = useCallback(
    (id: string) => wishlistIds.includes(id),
    [wishlistIds]
  );

  return (
    <WishlistContext.Provider
      value={{ wishlistIds, isWishlisted, toggle, count: wishlistIds.length }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
