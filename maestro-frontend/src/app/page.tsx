"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Activity, Cpu, ArrowRight, Server, Zap, LineChart } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function MaestroB2BLanding() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#D4AF37]/30">
      
      {/* Top Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#0B0C10]/80 backdrop-blur-xl border-b border-white/5 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-amber-700 flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)]">
              <span className="font-black text-black text-xl tracking-tighter">M</span>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-wider text-white">MAESTRO</h1>
              <p className="text-[9px] text-[#D4AF37] uppercase tracking-[0.3em] font-black leading-none">Food Service OS</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <a href="#plataforma" className="hover:text-white transition-colors">Plataforma</a>
            <a href="#inteligencia" className="hover:text-white transition-colors">Inteligência AI</a>
            <a href="#seguranca" className="hover:text-white transition-colors">Infraestrutura</a>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => router.push('/login')}
              className="px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-semibold transition-all backdrop-blur-md"
            >
              Portal Executivo
            </button>
            <button 
              className="hidden md:flex px-6 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#c4a030] text-black text-sm font-black tracking-wide transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] items-center gap-2"
            >
              Agendar Demo <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-32 pb-20 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto mt-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              <span className="text-xs font-mono text-gray-300 uppercase tracking-widest">v1.2.0-beta online</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight"
            >
              Controle Operacional <br/>
              <span className="bg-gradient-to-r from-[#D4AF37] via-amber-200 to-[#D4AF37] bg-clip-text text-transparent">
                Movido a Inteligência.
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed"
            >
              Substitua sua colcha de retalhos de sistemas. O Maestro unifica PDV, KDS, Gestão de Clientes e Motor de Vendas em um núcleo de alta performance.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <button onClick={() => router.push('/login')} className="px-8 py-4 rounded-xl bg-[#D4AF37] text-black font-black tracking-widest uppercase hover:bg-[#c4a030] transition-all shadow-[0_0_30px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2">
                Acessar Workspace <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 rounded-xl bg-[#14151A] border border-white/10 text-white font-bold hover:bg-[#1A1C23] transition-all flex items-center justify-center gap-2">
                Explorar Arquitetura <Server className="w-5 h-5 text-gray-400" />
              </button>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Bento Grid - Funcionalidades do Backend Expostas */}
      <section className="py-24 bg-[#0B0C10] relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-4">Engenharia de Ponta.<br/><span className="text-gray-500">Zero atrito na operação.</span></h2>
            <p className="text-gray-400 max-w-xl">Desenhado para suportar desde dark kitchens enxutas até redes de franquias, com isolamento total de dados e real-time nativo.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <motion.div whileHover={{ y: -5 }} className="md:col-span-2 bg-gradient-to-br from-[#14151A] to-[#0a0a0c] p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-[80px] group-hover:bg-[#D4AF37]/10 transition-colors" />
              <Activity className="w-10 h-10 text-[#D4AF37] mb-6" />
              <h3 className="text-2xl font-bold mb-3">Sync em Tempo Real (Websockets)</h3>
              <p className="text-gray-400 mb-8 max-w-md">Do pedido no aplicativo do cliente até a tela da cozinha (KDS) em milissegundos. Sem polling, sem delay. A infraestrutura NestJS garante estado consistente em todas as pontas.</p>
              <div className="w-full h-32 bg-[#050505] rounded-xl border border-white/5 flex items-center justify-center overflow-hidden relative">
                 {/* Pseudo-grafico animado */}
                 <div className="absolute left-0 w-full h-[1px] bg-white/10"></div>
                 <LineChart className="w-full h-24 text-[#D4AF37]/20 absolute opacity-50" />
                 <span className="font-mono text-xs text-gray-500 bg-[#14151A] px-3 py-1 rounded-full border border-white/10 z-10">Conexão Socket.io: Estabelecida (Ping: 12ms)</span>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div whileHover={{ y: -5 }} className="bg-gradient-to-bl from-[#14151A] to-[#0a0a0c] p-8 rounded-3xl border border-white/5 group">
              <ShieldCheck className="w-10 h-10 text-emerald-400 mb-6" />
              <h3 className="text-2xl font-bold mb-3">Segurança Multi-Tenant</h3>
              <p className="text-gray-400 text-sm">Autenticação militar JWT alinhada a Row Level Security (RLS). Os dados de um restaurante nunca se cruzam com outro no banco de dados.</p>
              <div className="mt-8 p-4 bg-[#050505] rounded-xl border border-emerald-500/20">
                <p className="font-mono text-[10px] text-emerald-400">SET LOCAL app.current_tenant_id = 't_123';</p>
                <p className="font-mono text-[10px] text-gray-500 mt-2">-- Executed automatically on every request</p>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div whileHover={{ y: -5 }} className="bg-gradient-to-tr from-[#14151A] to-[#0a0a0c] p-8 rounded-3xl border border-white/5 group">
              <Cpu className="w-10 h-10 text-indigo-400 mb-6" />
              <h3 className="text-2xl font-bold mb-3">Agentes Autônomos</h3>
              <p className="text-gray-400 text-sm mb-6">O Maestro escuta sua operação. Relatórios são gerados sozinhos e ações de CRM são sugeridas automaticamente pela camada de inteligência (N8n Integrado).</p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs font-bold rounded-lg border border-indigo-500/20">N8n Webhooks</span>
                <span className="px-3 py-1 bg-purple-500/10 text-purple-400 text-xs font-bold rounded-lg border border-purple-500/20">Zustand Stores</span>
              </div>
            </motion.div>

            {/* Card 4 */}
            <motion.div whileHover={{ y: -5 }} className="md:col-span-2 bg-gradient-to-tl from-[#14151A] to-[#0a0a0c] p-8 rounded-3xl border border-white/5 flex flex-col md:flex-row items-center gap-8 group">
              <div className="flex-1">
                <Zap className="w-10 h-10 text-amber-400 mb-6" />
                <h3 className="text-2xl font-bold mb-3">Performance Bare Metal</h3>
                <p className="text-gray-400">Esqueça containers lentos na produção. O Maestro foi otimizado para rodar em arquitetura Bare Metal via PM2, extraindo 100% da sua infraestrutura física.</p>
              </div>
              <div className="w-full md:w-64 h-32 bg-[#050505] rounded-xl border border-white/5 p-4 flex flex-col justify-center">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-500 font-mono">CPU Usage</span>
                  <span className="text-xs text-green-400 font-bold">2.4%</span>
                </div>
                <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden mb-4"><div className="w-[2.4%] h-full bg-green-400"></div></div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-500 font-mono">RAM (NestJS)</span>
                  <span className="text-xs text-amber-400 font-bold">114 MB</span>
                </div>
                <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden"><div className="w-[15%] h-full bg-amber-400"></div></div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Footer minimalista */}
      <footer className="border-t border-white/5 py-12 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-50">
            <div className="w-6 h-6 rounded-md bg-[#D4AF37] flex items-center justify-center">
              <span className="font-black text-black text-xs">M</span>
            </div>
            <span className="font-bold text-sm text-white">Maestro OS</span>
          </div>
          <p className="text-xs text-gray-600">© 2026 Maestro Food Service. Arquitetura Privada.</p>
        </div>
      </footer>

    </div>
  );
}
