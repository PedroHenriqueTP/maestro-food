"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntelligence } from '@/lib/hooks/useIntelligence';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function MaestroIntelligenceHQ() {
  const { diffs, insights, loading, error } = useIntelligence();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-[#D4AF37] font-bold tracking-widest uppercase">
        <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          Sincronizando com a Rede Neural...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="border-b border-[#D4AF37]/20 pb-6 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-extrabold text-[#D4AF37] uppercase tracking-tighter">Intelligence HQ</h1>
            <p className="text-gray-500 text-sm mt-2">Visão de Borda: Mercado & Arquitetura Autônoma</p>
          </div>
          {error && <span className="text-red-500 font-bold bg-red-500/10 px-4 py-2 rounded border border-red-500/20">{error}</span>}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Coluna 1: Insights de Mercado */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-white border-l-4 border-red-500 pl-4">Radar de Mercado (Web Scrapping)</h2>
            <div className="space-y-6">
              <AnimatePresence>
                {insights.map((insight, index) => (
                  <motion.div 
                    key={insight.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card variant="glass" className="border-l-4 border-l-red-500 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-black uppercase px-3 py-1 rounded-bl-lg z-10">
                        {insight.insightType}
                      </div>
                      <div className="mb-4">
                        <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">{insight.competitor}</span>
                        <h3 className="text-lg font-bold text-white mt-1 leading-snug">{insight.description}</h3>
                      </div>
                      
                      <div className="mt-4 p-4 bg-white/5 rounded border border-white/10 opacity-80 group-hover:opacity-100 transition-opacity">
                        <span className="text-[10px] text-[#D4AF37] uppercase font-bold tracking-widest mb-1 block">Ação Autônoma Sugerida</span>
                        <p className="text-sm text-gray-300">{insight.recommendedAction}</p>
                        <div className="mt-4 flex gap-3">
                           <Button variant="primary" size="sm">Aprovar Execução</Button>
                           <Button variant="ghost" size="sm">Ignorar</Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </section>

          {/* Coluna 2: Scout Diffs (Arquitetura) */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-white border-l-4 border-[#D4AF37] pl-4">Auditoria de Código (Grok Reviewer)</h2>
            <div className="space-y-6">
              <AnimatePresence>
                {diffs.map((diff, index) => (
                  <motion.div 
                    key={diff.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card variant="glass" className="border-l-4 border-l-[#D4AF37]">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-[#D4AF37]">{diff.title}</h3>
                        <span className={`text-[10px] font-black uppercase px-2 py-1 rounded ${
                          diff.riskLevel === 'HIGH' ? 'bg-red-500/20 text-red-500' : 
                          diff.riskLevel === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-500' : 
                          'bg-green-500/20 text-green-500'
                        }`}>
                          Risco: {diff.riskLevel}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mb-4">{diff.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 text-xs font-mono mb-4">
                         <div className="bg-red-500/5 border border-red-500/20 p-3 rounded">
                            <span className="text-red-500 font-bold block mb-2">- Código Anterior</span>
                            <pre className="text-gray-400 whitespace-pre-wrap">{diff.codeBefore}</pre>
                         </div>
                         <div className="bg-green-500/5 border border-green-500/20 p-3 rounded">
                            <span className="text-green-500 font-bold block mb-2">+ Código Otimizado</span>
                            <pre className="text-gray-200 whitespace-pre-wrap">{diff.codeAfter}</pre>
                         </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
                        <span className="text-sm font-bold text-gray-300">Impacto: {diff.impact}</span>
                        <Button variant="secondary" size="sm">Fazer Merge</Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
