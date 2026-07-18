"use client";

import React, { useState } from "react";
// Em um ambiente real, poderíamos importar `useRouter` do 'next/navigation' para redirecionar

type OnboardingData = {
  name: string;
  document: string;
  subdomain: string;
  niche: string;
  channels: string[];
};

export function OnboardingWizard() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    name: "",
    document: "",
    subdomain: "",
    niche: "hamburgueria", // Default
    channels: [],
  });
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsProvisioning(true);
    setError("");

    try {
      const response = await fetch("/api/onboarding/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Erro na auto-configuração");
      }

      setSuccess(true);
      
      // Simula o delay para a "Magia" ser vista pelo usuário e depois redireciona
      setTimeout(() => {
        window.location.href = "/admin/financeiro"; 
      }, 3000);

    } catch (err: any) {
      setError(err.message);
      setIsProvisioning(false);
      setStep(2); // Volta pro form em caso de erro
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <div className="w-16 h-16 border-4 border-t-transparent border-[var(--color-primary)] rounded-full animate-spin mb-6"></div>
        <h2 className="text-2xl font-bold text-white mb-2">Restaurante Configurado!</h2>
        <p className="text-gray-400">Criando categorias, painel financeiro e temas...</p>
        <p className="text-sm text-gray-500 mt-4">Redirecionando você para o Centro de Comando...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg bg-[#14151A] border border-gray-800 rounded-2xl shadow-2xl overflow-hidden text-white">
      {/* Stepper Header */}
      <div className="flex items-center px-6 py-4 border-b border-gray-800 bg-[#1A1C23]">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-800 text-gray-500'}`}>1</div>
        <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-[var(--color-primary)]' : 'bg-gray-800'}`}></div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-800 text-gray-500'}`}>2</div>
        <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-[var(--color-primary)]' : 'bg-gray-800'}`}></div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-800 text-gray-500'}`}>3</div>
      </div>

      {error && (
        <div className="mx-6 mt-4 p-3 bg-red-900/30 border border-red-800 text-red-400 rounded-md text-sm">
          {error}
        </div>
      )}

      {/* Step 1: Identidade */}
      {step === 1 && (
        <div className="p-8 space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
          <div>
            <h2 className="text-2xl font-extrabold mb-1">Qual o nome da sua operação?</h2>
            <p className="text-gray-400 text-sm">A primeira etapa para escalar o seu negócio.</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Nome Fantasia</label>
              <input type="text" name="name" value={data.name} onChange={handleChange} placeholder="Ex: Burger King" className="w-full bg-[#1A1C23] border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-[var(--color-primary)] transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Subdomínio (Link Único)</label>
              <div className="flex rounded-lg overflow-hidden border border-gray-700 focus-within:border-[var(--color-primary)] transition-colors">
                <input type="text" name="subdomain" value={data.subdomain} onChange={handleChange} placeholder="seuburger" className="w-full bg-[#1A1C23] px-4 py-3 focus:outline-none" />
                <span className="flex items-center px-4 bg-gray-800 text-gray-400 font-mono text-sm">.maestro.com</span>
              </div>
            </div>
          </div>
          
          <button onClick={handleNext} disabled={!data.name || !data.subdomain} className="w-full py-3 rounded-lg font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50" style={{ backgroundColor: "var(--color-primary)" }}>
            Avançar
          </button>
        </div>
      )}

      {/* Step 2: Operação */}
      {step === 2 && (
        <div className="p-8 space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
          <div>
            <h2 className="text-2xl font-extrabold mb-1">Como você trabalha?</h2>
            <p className="text-gray-400 text-sm">Isso ajuda a configurar seu cardápio automaticamente.</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Nicho Principal</label>
              <select name="niche" value={data.niche} onChange={handleChange} className="w-full bg-[#1A1C23] border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-[var(--color-primary)] appearance-none transition-colors">
                <option value="hamburgueria">Hamburgueria Artesanal</option>
                <option value="pizzaria">Pizzaria Italiana</option>
                <option value="sushi">Restaurante Japonês</option>
                <option value="outro">Outro (Geral)</option>
              </select>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button onClick={handleBack} className="w-1/3 py-3 rounded-lg font-bold text-gray-300 bg-gray-800 hover:bg-gray-700 transition-colors">Voltar</button>
            <button onClick={handleNext} className="w-2/3 py-3 rounded-lg font-bold text-white transition-opacity hover:opacity-90" style={{ backgroundColor: "var(--color-primary)" }}>Revisar Setup</button>
          </div>
        </div>
      )}

      {/* Step 3: Revisão */}
      {step === 3 && (
        <div className="p-8 space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
          <div>
            <h2 className="text-2xl font-extrabold mb-1">Tudo pronto para a mágica.</h2>
            <p className="text-gray-400 text-sm">Confirme os dados antes de criarmos sua base.</p>
          </div>
          
          <div className="bg-[#1A1C23] border border-gray-700 rounded-lg p-5 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">Restaurante</span>
              <span className="font-semibold">{data.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">URL</span>
              <span className="font-semibold text-[var(--color-primary)]">{data.subdomain}.maestro.com</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">Nicho</span>
              <span className="font-semibold capitalize">{data.niche}</span>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button onClick={handleBack} disabled={isProvisioning} className="w-1/3 py-3 rounded-lg font-bold text-gray-300 bg-gray-800 hover:bg-gray-700 transition-colors disabled:opacity-50">Voltar</button>
            <button onClick={handleSubmit} disabled={isProvisioning} className="w-2/3 py-3 rounded-lg font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2" style={{ backgroundColor: "var(--color-primary)" }}>
              {isProvisioning ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : "Finalizar Setup"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
