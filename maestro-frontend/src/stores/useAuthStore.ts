import { create } from 'zustand';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  tenantId: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  
  login: (userData) => {
    set({ user: userData, isAuthenticated: true });
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false });
    // O Next.js router lidará com o redirecionamento
  },
}));
