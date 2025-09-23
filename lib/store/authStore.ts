// import { create } from 'zustand';
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types/user";

type AuthStore = {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  setUser: (user: User) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,

      setAuth: (user, token) => {
        set(() => ({ user, token, isAuthenticated: true }));
      },

      setUser: (user) => set({ user, isAuthenticated: true }),

      clearAuth: () => {
        set(() => ({ user: null, token: null, isAuthenticated: false }));
      },
    }),
    {
      name: "auth",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
