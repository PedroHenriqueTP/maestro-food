import React from "react";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-[#0B0C10] flex flex-col justify-center items-center p-4 relative overflow-hidden">
      
      {/* Background Decorativo (Black Neon Effect) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary)] to-transparent blur-[100px] rounded-full mix-blend-screen"></div>
      </div>

      <div className="z-10 w-full flex flex-col items-center">
        {/* Logo Maestro Simplificada */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
            MAESTRO
          </h1>
          <p className="text-[var(--color-primary)] font-medium mt-2 tracking-widest text-sm uppercase">
            Global SaaS
          </p>
        </div>

        {/* Wizard Component */}
        <OnboardingWizard />
      </div>

      {/* Footer minimalista */}
      <div className="absolute bottom-6 text-center w-full text-xs text-gray-600">
        <p>Configuração Segura • Criptografia Fim-a-Fim • Multi-tenant</p>
      </div>
    </div>
  );
}
