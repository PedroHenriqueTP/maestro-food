"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, Store, Package, Laptop, CheckCircle2, ChevronRight, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { AdminLayout } from '@/components/layout/AdminLayout';

export default function OnboardingWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [config, setConfig] = useState({
    businessType: '',
    operationModel: '',
    integrations: [] as string[]
  });

  const businessTypes = [
    { id: 'RESTAURANT', name: 'Restaurante', icon: <ChefHat className="w-8 h-8" />, desc: 'A La Carte, Self Service, etc.' },
    { id: 'BAKERY', name: 'Padaria / Confeitaria', icon: <Store className="w-8 h-8" />, desc: 'Venda por peso, balcão rápido.' },
    { id: 'DARK_KITCHEN', name: 'Dark Kitchen', icon: <Package className="w-8 h-8" />, desc: 'Foco total em delivery e KDS.' },
    { id: 'FAST_FOOD', name: 'Fast Food / Lanchonete', icon: <Laptop className="w-8 h-8" />, desc: 'Totem, senhas e painel.' }
  ];

  const handleNext = () => setStep(s => s + 1);
  const handlePrev = () => setStep(s => s - 1);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulating API call for tenant config setup
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(4); // Success step
    }, 1500);
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto w-full pt-10 px-4 md:px-0">
        
        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-12 relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/10 -z-10 rounded-full"></div>
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#D4AF37] -z-10 rounded-full transition-all duration-500"
            style={{ width: `${((step - 1) / 3) * 100}%` }}
          ></div>
          
          {[1, 2, 3, 4].map(num => (
            <div key={num} className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border-2 transition-colors duration-500 ${step >= num ? 'bg-[#D4AF37] border-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]' : 'bg-[#14151A] border-white/20 text-gray-500'}`}>
              {step > num ? <CheckCircle2 className="w-5 h-5" /> : num}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
              <div className="text-center">
                <h1 className="text-4xl font-black text-white uppercase tracking-widest font-serif mb-2">Qual o seu tipo de negócio?</h1>
                <p className="text-gray-400">O Maestro ajustará as ferramentas automaticamente para sua operação.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {businessTypes.map(type => (
                  <button 
                    key={type.id}
                    onClick={() => setConfig({ ...config, businessType: type.id })}
                    className={`p-6 rounded-3xl border-2 flex flex-col items-center justify-center text-center gap-4 transition-all active:scale-95 ${config.businessType === type.id ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.2)]' : 'bg-[#14151A] border-white/5 text-gray-400 hover:border-white/20'}`}
                  >
                    {type.icon}
                    <div>
                      <h3 className="font-bold text-lg text-white">{type.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">{type.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
              <div className="text-center">
                <h1 className="text-4xl font-black text-white uppercase tracking-widest font-serif mb-2">Modelo de Operação principal</h1>
                <p className="text-gray-400">Como seus clientes compram de você a maior parte do tempo?</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {['Mesas e Garçons', 'Balcão / Fila', 'Delivery Exclusivo', 'Totem de Autoatendimento'].map(mod => (
                  <button 
                    key={mod}
                    onClick={() => setConfig({ ...config, operationModel: mod })}
                    className={`p-6 rounded-2xl border flex items-center justify-between transition-all active:scale-95 ${config.operationModel === mod ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37]' : 'bg-[#14151A] border-white/5 text-gray-400 hover:border-white/20'}`}
                  >
                    <span className="font-bold text-lg">{mod}</span>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${config.operationModel === mod ? 'border-[#D4AF37]' : 'border-gray-600'}`}>
                      {config.operationModel === mod && <div className="w-3 h-3 rounded-full bg-[#D4AF37]" />}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
              <div className="text-center">
                <h1 className="text-4xl font-black text-white uppercase tracking-widest font-serif mb-2">Quais módulos deseja ativar?</h1>
                <p className="text-gray-400">Selecionamos os ideais para o seu modelo, mas você pode customizar.</p>
              </div>

              <div className="space-y-4 bg-[#14151A] p-6 rounded-3xl border border-white/5">
                {[
                  { id: 'kds', name: 'KDS (Kitchen Display System)', rec: config.businessType !== 'BAKERY' },
                  { id: 'scale', name: 'Integração de Balança', rec: config.businessType === 'BAKERY' },
                  { id: 'waiter', name: 'App do Garçom / Mesas', rec: config.businessType === 'RESTAURANT' },
                  { id: 'qrcode', name: 'Cardápio Digital QR Code', rec: true }
                ].map(mod => (
                  <div key={mod.id} className="flex items-center justify-between p-4 border border-white/5 rounded-xl bg-[#0B0C10]">
                    <div className="flex flex-col">
                      <span className="font-bold text-white text-lg">{mod.name}</span>
                      {mod.rec && <span className="text-[10px] uppercase font-black tracking-widest text-[#D4AF37]">Recomendado para o seu negócio</span>}
                    </div>
                    {/* Toggle mock */}
                    <div className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${mod.rec ? 'bg-[#D4AF37]' : 'bg-gray-700'}`}>
                      <div className={`w-4 h-4 bg-black rounded-full transition-transform ${mod.rec ? 'translate-x-6' : 'translate-x-0'}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center py-20 space-y-6">
              <div className="w-24 h-24 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mb-4 relative">
                <div className="absolute inset-0 bg-[#D4AF37]/20 rounded-full animate-ping"></div>
                <CheckCircle2 className="w-12 h-12 text-[#D4AF37]" />
              </div>
              <h2 className="text-4xl font-black text-white">Setup Concluído!</h2>
              <p className="text-gray-400 font-mono tracking-widest uppercase">O Maestro está configurado para o seu negócio.</p>
              
              <button 
                onClick={() => router.push('/dashboard')}
                className="mt-8 bg-[#D4AF37] text-black px-10 py-4 rounded-xl font-black uppercase tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.3)] active:scale-95 transition-transform"
              >
                Acessar Dashboard Global
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        {step < 4 && (
          <div className="flex justify-between mt-12 pt-8 border-t border-white/10">
            <button 
              onClick={handlePrev}
              disabled={step === 1}
              className="px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-sm disabled:opacity-30 hover:bg-white/5 transition-colors"
            >
              Voltar
            </button>
            
            {step < 3 ? (
              <button 
                onClick={handleNext}
                disabled={(step === 1 && !config.businessType) || (step === 2 && !config.operationModel)}
                className="px-8 py-3 bg-[#D4AF37] text-black rounded-xl font-black uppercase tracking-widest flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:bg-[#c4a030] transition-colors"
              >
                Próximo <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-8 py-3 bg-green-500 text-white rounded-xl font-black uppercase tracking-widest flex items-center gap-2 disabled:opacity-50 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:bg-green-600 transition-colors"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <><Save className="w-4 h-4" /> Finalizar Setup</>
                )}
              </button>
            )}
          </div>
        )}

      </div>
    </AdminLayout>
  );
}
