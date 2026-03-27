"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { User } from "@/types";

const MOCK_USER: User = {
  id: "user_01",
  name: "Alex Morgan",
  email: "alex@example.com",
  avatar: "https://picsum.photos/seed/user-avatar/100/100",
  wishlist_ids: ["prod_01", "prod_05"],
  favorite_styles: ["abstract", "minimalist"],
  addresses: [
    {
      first_name: "Alex",
      last_name: "Morgan",
      address1: "42 Park Avenue",
      city: "New York",
      state: "NY",
      zip: "10022",
      country: "United States",
    },
  ],
};

interface UserContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <UserContext.Provider
      value={{
        user: isLoggedIn ? MOCK_USER : null,
        isLoggedIn,
        login: () => setIsLoggedIn(true),
        logout: () => setIsLoggedIn(false),
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
