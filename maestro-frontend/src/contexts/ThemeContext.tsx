"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeColors = {
  primary: string;
  secondary: string;
  background: string;
  text: string;
};

export type TenantUI = {
  themeMode: "light" | "dark" | "system";
  colors: ThemeColors;
};

type ThemeContextType = {
  tenantUI: TenantUI;
  setTenantUI: (ui: TenantUI) => void;
};

const defaultTenantUI: TenantUI = {
  themeMode: "light",
  colors: {
    primary: "#4F46E5",
    secondary: "#10B981",
    background: "#F3F4F6",
    text: "#111827",
  },
};

const ThemeContext = createContext<ThemeContextType>({
  tenantUI: defaultTenantUI,
  setTenantUI: () => {},
});

export function ThemeProvider({
  children,
  initialTenantUI = defaultTenantUI,
}: {
  children: React.ReactNode;
  initialTenantUI?: TenantUI;
}) {
  const [tenantUI, setTenantUI] = useState<TenantUI>(initialTenantUI);

  // Injetar CSS Variables dinamicamente no root element ou wrapper
  const cssVariables = {
    "--color-primary": tenantUI.colors.primary,
    "--color-secondary": tenantUI.colors.secondary,
    "--color-background": tenantUI.colors.background,
    "--color-text": tenantUI.colors.text,
  } as React.CSSProperties;

  return (
    <ThemeContext.Provider value={{ tenantUI, setTenantUI }}>
      <div style={cssVariables} className={`theme-${tenantUI.themeMode} min-h-screen bg-[var(--color-background)] text-[var(--color-text)] transition-colors duration-300`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
