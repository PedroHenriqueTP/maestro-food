"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface TenantConfig {
  businessType: string;
  operationModel: string;
  hasScale: boolean;
  hasKds: boolean;
  hasTableService: boolean;
  isLoading: boolean;
}

const defaultConfig: TenantConfig = {
  businessType: "RESTAURANT",
  operationModel: "TABLE_SERVICE",
  hasScale: false,
  hasKds: true,
  hasTableService: true,
  isLoading: true,
};

const TenantConfigContext = createContext<TenantConfig>(defaultConfig);

export const TenantConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const [config, setConfig] = useState<TenantConfig>(defaultConfig);

  useEffect(() => {
    // Simulando o fetch da configuração do Tenant da nossa API.
    // Em um cenário real, chamaria /api/tenant/config
    const fetchConfig = async () => {
      // Mocked delay for realism
      setTimeout(() => {
        const mockedBackendConfig = {
          businessType: "RESTAURANT",
          operationModel: "TABLE_SERVICE",
          hasScale: false,
          hasKds: true,
          hasTableService: true,
          isLoading: false,
        };
        
        // Check if there is an override in local storage for testing
        const savedConfigStr = localStorage.getItem("maestro_mock_tenant_config");
        if (savedConfigStr) {
          try {
            const saved = JSON.parse(savedConfigStr);
            setConfig({ ...saved, isLoading: false });
            return;
          } catch (e) {}
        }
        
        setConfig(mockedBackendConfig);
      }, 500);
    };

    fetchConfig();
  }, []);

  return (
    <TenantConfigContext.Provider value={config}>
      {children}
    </TenantConfigContext.Provider>
  );
};

export const useTenantConfig = () => useContext(TenantConfigContext);
