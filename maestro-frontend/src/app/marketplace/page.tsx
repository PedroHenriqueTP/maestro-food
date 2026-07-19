"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAnalytics } from "@/lib/useAnalytics";
import { motion } from "framer-motion";
import { HeroWebGL } from "@/components/HeroWebGL";

const modules = [
  { id: 'core', title: 'Motor Contábil (Core)', price: 99.00, description: 'Partida dobrada, gestão de caixa e DRE em tempo real.', required: true },
  { id: 'crm', title: 'CRM Preditivo', price: 149.00, description: 'Inteligência Artificial para prever vendas e engajar clientes via WhatsApp.', required: false },
  { id: 'marketing', title: 'Agente de Social Media', price: 79.00, description: 'Postagens autônomas no Instagram baseadas no estoque.', required: false },
  { id: 'ifood', title: 'Integração iFood / Delivery', price: 49.00, description: 'Webhook direto em O(1) sem delay de sincronização.', required: false },
];

export default function Marketplace() {
  const router = useRouter();
  const { trackEvent } = useAnalytics("Marketplace");
  const [selected, setSelected] = useState<string[]>(['core']);

  const toggleModule = (id: string, required: boolean = false) => {
    if (required) {
      trackEvent('module_selection_blocked', { module: id, reason: 'required' });
      return; 
    }
    const isAdding = !selected.includes(id);
    trackEvent(isAdding ? 'module_added' : 'module_removed', { module: id });
    setSelected(prev => 
      isAdding ? [...prev, id] : prev.filter(m => m !== id)
    );
  };

  const totalMRR = modules
    .filter(m => selected.includes(m.id))
    .reduce((sum, module) => sum + module.price, 0);

  const formatPrice = (val: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <div className="min-h-screen bg-[#0B0C10] text-gray-300 font-sans selection:bg-[#D4AF37] selection:text-black">
      {/* Navbar simplificada */}
      <nav className="border-b border-[#D4AF37]/20 bg-[#050505]/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-[#D4AF37] font-extrabold text-2xl tracking-tighter">MAESTRO</div>
          <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Marketplace</div>
        </div>
      </nav>

      <HeroWebGL />
      <main className="max-w-7xl mx-auto px-6 py-12 lg:py-20 flex flex-col lg:flex-row gap-12 relative z-10">
        
        {/* Lado Esquerdo: Vitrine */}
        <div className="flex-1 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl lg:text-6xl font-extrabold text-white tracking-tighter leading-tight">
              Monte seu <span className="text-[#D4AF37]">Ecossistema.</span>
            </h1>
            <p className="mt-4 text-lg text-gray-400 max-w-xl">
              Selecione os módulos operacionais. Você só paga pelo "Sistema Nervoso" que realmente utiliza na sua operação.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.map((mod, index) => {
              const isSelected = selected.includes(mod.id);
              return (
                <motion.div 
                  key={mod.id}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1, type: "spring", stiffness: 100 }}
                  whileHover={!mod.required ? { scale: 1.02, y: -5, zIndex: 10 } : {}}
                  onClick={() => toggleModule(mod.id, mod.required)}
                  className={`relative p-6 rounded-2xl border transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-[#D4AF37]/5 border-[#D4AF37]/50 shadow-[0_0_20px_rgba(212,175,55,0.1)]' 
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  } ${mod.required ? 'cursor-not-allowed' : ''}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white">{mod.title}</h3>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'border-[#D4AF37] bg-[#D4AF37]' : 'border-gray-600'
                    }`}>
                      {isSelected && <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mb-6 min-h-[40px]">{mod.description}</p>
                  <div className="flex justify-between items-end">
                    <span className="text-[#D4AF37] font-bold text-xl">{formatPrice(mod.price)} <span className="text-xs text-gray-500 font-normal">/mês</span></span>
                    {mod.required && <span className="text-[10px] uppercase font-bold text-gray-500 bg-white/10 px-2 py-1 rounded">Obrigatório</span>}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Lado Direito: Resumo */}
        <motion.div 
          className="w-full lg:w-96"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="sticky top-32 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-6">Resumo da Assinatura</h2>
            
            <div className="space-y-4 mb-8">
              {modules.filter(m => selected.includes(m.id)).map(mod => (
                <div key={mod.id} className="flex justify-between text-sm">
                  <span className="text-gray-300">{mod.title}</span>
                  <span className="text-white font-medium">{formatPrice(mod.price)}</span>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-white/10 mb-8">
              <div className="flex justify-between items-end">
                <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Total MRR</span>
                <span className="text-3xl font-extrabold text-[#D4AF37]">{formatPrice(totalMRR)}</span>
              </div>
            </div>

            <button 
              onClick={() => {
                trackEvent('checkout_initiated', { mrr: totalMRR, modules: selected });
                router.push(`/checkout?mrr=${totalMRR}`);
              }}
              className="w-full py-4 rounded-xl bg-[#D4AF37] text-[#0B0C10] font-extrabold hover:bg-[#F3E5AB] transition-all hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.3)] relative overflow-hidden group"
            >
              <span className="relative z-10">Provisionar Ecossistema</span>
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
            </button>
            <p className="text-center text-xs text-gray-500 mt-4">Liberação imediata pós-pagamento.</p>
          </div>
        </motion.div>

      </main>
    </div>
  );
}
