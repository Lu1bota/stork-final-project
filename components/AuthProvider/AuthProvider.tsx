"use client";

import { getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect, useState } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { token, setUser, clearAuth } = useAuthStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    async function fetchUser() {
      if (!token) {
        clearAuth();
        return;
      }
      try {
        const user = await getMe();
        setUser(user);
      } catch {
        clearAuth();
      }
    }

    fetchUser();
  }, [isHydrated, token, setUser, clearAuth]);

  if (!isHydrated) {
    return null;
  }

  return children;
}
