import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  hasPaid: boolean;
  user: null | {
    id: string;
    email: string;
    name: string;
  };
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setPaymentStatus: (status: boolean) => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      hasPaid: false,
      user: null,
      login: async (email: string, password: string) => {
        // In a real app, this would make an API call
        set({
          isAuthenticated: true,
          user: {
            id: '1',
            email,
            name: email.split('@')[0],
          },
        });
      },
      logout: () => {
        set({ isAuthenticated: false, user: null, hasPaid: false });
      },
      setPaymentStatus: (status: boolean) => {
        set({ hasPaid: status });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);