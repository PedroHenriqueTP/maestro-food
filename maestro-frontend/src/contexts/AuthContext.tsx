"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  tenantId: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Carrega dados de autenticação armazenados localmente
    const token = localStorage.getItem("maestro_access_token");
    const storedUser = localStorage.getItem("maestro_user");

    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem("maestro_access_token");
        localStorage.removeItem("maestro_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = (token: string, userData: User) => {
    localStorage.setItem("maestro_access_token", token);
    localStorage.setItem("maestro_user", JSON.stringify(userData));
    // Definimos o cookie para o middleware poder ler
    document.cookie = `maestro_access_token=${token}; path=/; max-age=86400; samesite=lax`;
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("maestro_access_token");
    localStorage.removeItem("maestro_user");
    document.cookie = "maestro_access_token=; path=/; max-age=0";
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
