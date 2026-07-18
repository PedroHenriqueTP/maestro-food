"use client";

import React, { useState, useEffect } from "react";
import { useTheme, TenantUI } from "@/contexts/ThemeContext";

export default function BrandingSettingsForm() {
  const { tenantUI, setTenantUI } = useTheme();
  const [formData, setFormData] = useState<TenantUI>(tenantUI);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Sync internal state if context changes externally
  useEffect(() => {
    setFormData(tenantUI);
  }, [tenantUI]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    let newTenantUI: TenantUI;

    if (name === "themeMode") {
      newTenantUI = { ...formData, themeMode: value as TenantUI["themeMode"] };
    } else {
      newTenantUI = {
        ...formData,
        colors: {
          ...formData.colors,
          [name]: value,
        },
      };
    }

    setFormData(newTenantUI);
    // Preview in real-time
    setTenantUI(newTenantUI);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/branding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Falha ao salvar as configurações.");
      }

      setMessage("Tema atualizado com sucesso!");
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Identidade Visual (White Label)</h2>
      
      {message && (
        <div className={`p-4 mb-6 rounded-md ${message.includes("sucesso") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cor Primária */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Cor Primária
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                name="primary"
                value={formData.colors.primary}
                onChange={handleChange}
                className="h-10 w-10 border-0 rounded cursor-pointer"
              />
              <span className="text-sm font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                {formData.colors.primary}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Usada em botões principais e destaques.</p>
          </div>

          {/* Cor Secundária */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Cor Secundária
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                name="secondary"
                value={formData.colors.secondary}
                onChange={handleChange}
                className="h-10 w-10 border-0 rounded cursor-pointer"
              />
              <span className="text-sm font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                {formData.colors.secondary}
              </span>
            </div>
          </div>

          {/* Fundo Base */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Cor de Fundo Base
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                name="background"
                value={formData.colors.background}
                onChange={handleChange}
                className="h-10 w-10 border-0 rounded cursor-pointer"
              />
              <span className="text-sm font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                {formData.colors.background}
              </span>
            </div>
          </div>

          {/* Modo do Tema */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tema Padrão
            </label>
            <select
              name="themeMode"
              value={formData.themeMode}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="light">Claro</option>
              <option value="dark">Escuro</option>
              <option value="system">Sistema</option>
            </select>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-opacity hover:opacity-90 focus:outline-none"
            style={{ backgroundColor: formData.colors.primary }} // Use custom primary color
          >
            {isSaving ? "Salvando..." : "Salvar Alterações"}
          </button>
        </div>
      </form>
    </div>
  );
}
