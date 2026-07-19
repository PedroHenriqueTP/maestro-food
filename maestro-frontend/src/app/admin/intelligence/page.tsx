"use client";

import React from "react";
import { motion } from "framer-motion";
import { OpexProfitAreaChart } from "@/components/analytics/OpexProfitAreaChart";
import { KdsDispersionScatter } from "@/components/analytics/KdsDispersionScatter";

export default function EagleEyeDashboard() {
  return (
    <div className="min-h-screen bg-[#050505] p-6 lg:p-10 relative overflow-hidden font-sans">
      
      {/* Luzes Estáticas HUD (Ambient) */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="relative z-10 w-full h-full flex flex-col gap-8 pb-32">
        
        {/* Top Header */}
        <header className="flex justify-between items-end border-b border-white/10 pb-6">
          <div>
            <h1 className="text-5xl font-black font-serif text-white tracking-tighter uppercase">EagleEye</h1>
            <p className="text-[#D4AF37] font-bold tracking-[0.3em] uppercase text-xs mt-2">Matriz de Decisão Tática</p>
          </div>
          
          <div className="flex gap-4">
            <div className="bg-[#14151A]/80 backdrop-blur-md px-6 py-3 rounded-xl border border-white/10">
              <span className="text-gray-500 text-xs uppercase font-bold tracking-widest block mb-1">Status da Grelha</span>
              <span className="text-green-500 font-mono font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Nominal
              </span>
            </div>
            <div className="bg-[#14151A]/80 backdrop-blur-md px-6 py-3 rounded-xl border border-[#D4AF37]/30 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
              <span className="text-[#D4AF37] text-xs uppercase font-bold tracking-widest block mb-1">IA Autônoma</span>
              <span className="text-white font-mono font-bold">12 Ações Pendentes</span>
            </div>
          </div>
        </header>

        {/* Gráficos em Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Gráfico de OPEX x Receita Líquida */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-[#0B0C10]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-2xl relative overflow-hidden group hover:border-white/10 transition-colors"
          >
            <div className="mb-6 flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-white uppercase tracking-widest">Gradiente de Lucro</h2>
                <p className="text-gray-500 text-sm mt-1">LTV vs Custo Operacional (OPEX)</p>
              </div>
              <span className="text-2xl font-black text-[#D4AF37]">R$ 18.3k</span>
            </div>
            
            <div className="h-[350px]">
              <OpexProfitAreaChart />
            </div>

            {/* Insight Text */}
            <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/5 flex gap-4 items-start">
              <span className="text-xl">🧠</span>
              <p className="text-sm text-gray-300 leading-relaxed">
                A projeção indica que a sexta-feira atingirá o pico de LTV, afastando-se dramaticamente da linha de custo fixo. <strong className="text-white">Sugestão:</strong> Desativar campanhas de tráfego pago na sexta para maximizar lucro orgânico.
              </p>
            </div>
          </motion.div>

          {/* Gráfico de Dispersão KDS */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#0B0C10]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-2xl relative overflow-hidden group hover:border-white/10 transition-colors"
          >
            <div className="mb-6 flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-white uppercase tracking-widest">Dispersão Cinética</h2>
                <p className="text-gray-500 text-sm mt-1">KDS: Análise de Gargalos por Minuto</p>
              </div>
              <span className="text-2xl font-black text-red-500">2 Alertas</span>
            </div>
            
            <div className="h-[350px]">
              <KdsDispersionScatter />
            </div>

            {/* Insight Text */}
            <div className="mt-4 p-4 bg-red-900/10 rounded-xl border border-red-500/20 flex gap-4 items-start">
              <span className="text-xl">⚠️</span>
              <p className="text-sm text-gray-300 leading-relaxed">
                Gargalo crítico detectado por volta do minuto 40. O tempo de preparo saltou para <strong className="text-red-400">35 minutos</strong>. Falha isolada na praça da grelha. <button className="ml-2 text-[#D4AF37] underline font-bold uppercase text-xs tracking-widest">Alocar Chapeiro Extra</button>
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
