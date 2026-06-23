import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      isLoggedIn: false,

      login: ({ user, token, refreshToken }) =>
        set({ user, token, refreshToken, isLoggedIn: true }),

      logout: () =>
        set({ user: null, token: null, refreshToken: null, isLoggedIn: false }),

      setUser: (user) => set({ user }),
    }),
    {
      name: 'pricepulse-auth', // persisted in localStorage
    }
  )
)
