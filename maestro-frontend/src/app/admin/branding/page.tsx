import React from "react";
import BrandingSettingsForm from "@/components/BrandingSettingsForm";

export default function BrandingPage() {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Configurações de Aparência
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Personalize as cores e o tema da plataforma para combinar com a identidade visual da sua marca.
            As alterações são aplicadas a todos os usuários deste tenant.
          </p>
        </div>

        <BrandingSettingsForm />

        {/* Demo Widget to show off the colors */}
        <div className="mt-12 max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
           <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Preview de Componentes</h3>
           <div className="space-y-4">
             <div className="p-4 rounded-md" style={{ backgroundColor: "var(--color-primary)", color: "#fff" }}>
               Card com a Cor Primária
             </div>
             <button className="w-full py-2 px-4 rounded-md font-semibold shadow-sm transition-colors" style={{ backgroundColor: "var(--color-secondary)", color: "#fff" }}>
               Botão de Ação Secundária
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}
