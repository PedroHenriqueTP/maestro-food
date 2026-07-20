"use client";

import React, { useState } from 'react';
import { useWaiterSocket } from '@/lib/hooks/useWaiterSocket';
import { WaiterOrderCard } from '@/components/waiter/WaiterOrderCard';
import { AnimatePresence, motion } from 'framer-motion';
import { UtensilsCrossed, BellRing, Wallet, Search, Plus, Coffee, Beer } from 'lucide-react';

export default function WaiterMobileView() {
  const { orders, isConnected, claimOrder, completeOrder } = useWaiterSocket();
  const [activeTab, setActiveTab] = useState<'mesas' | 'expedicao' | 'conta'>('mesas');
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  const readyOrders = orders.filter(o => o.status === 'READY');
  const deliveringOrders = orders.filter(o => o.status === 'DELIVERING');

  // Mocks
  const mesas = Array.from({ length: 12 }, (_, i) => ({ id: `M${i+1}`, status: i % 3 === 0 ? 'ocupada' : 'livre' }));

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans pb-28">
      {/* Topbar Simples */}
      <header className="sticky top-0 z-40 bg-[#0B0C10]/90 backdrop-blur-xl border-b border-white/10 px-4 py-4 flex justify-between items-center shadow-lg">
        <div>
          <h1 className="text-xl font-black font-serif text-[#D4AF37] tracking-widest uppercase flex items-center gap-2">
            <UtensilsCrossed className="w-5 h-5" /> Salão PDV
          </h1>
          <p className="text-[10px] text-gray-400 font-mono tracking-widest uppercase mt-0.5">Operador: João (Garçom)</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sync</span>
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-[#25D366] animate-pulse' : 'bg-red-500'}`} />
        </div>
      </header>

      <main className="p-4">
        {/* TAB: MESAS & LANÇAMENTO */}
        {activeTab === 'mesas' && (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            {!selectedTable ? (
              <>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input type="text" placeholder="Buscar mesa ou comanda..." className="w-full bg-[#14151A] border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all text-lg placeholder:text-gray-600" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {mesas.map(mesa => (
                    <button 
                      key={mesa.id} 
                      onClick={() => setSelectedTable(mesa.id)}
                      className={`relative aspect-square rounded-3xl border-2 flex flex-col items-center justify-center transition-transform active:scale-95 shadow-lg
                        ${mesa.status === 'ocupada' 
                          ? 'bg-[#1A1814] border-[#D4AF37]/50 text-[#D4AF37]' 
                          : 'bg-[#14151A] border-white/5 text-gray-500 hover:border-white/20'}`}
                    >
                      <span className="text-2xl font-black">{mesa.id}</span>
                      {mesa.status === 'ocupada' && <span className="absolute bottom-3 w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse"></span>}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-black text-[#D4AF37]">Mesa {selectedTable}</h2>
                    <p className="text-gray-400 text-sm font-bold tracking-widest uppercase">Lançamento Rápido</p>
                  </div>
                  <button onClick={() => setSelectedTable(null)} className="px-4 py-2 bg-white/10 rounded-xl text-xs font-bold uppercase tracking-widest active:scale-95">Voltar</button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <button className="bg-[#14151A] border border-white/10 p-4 rounded-2xl flex flex-col items-center gap-3 active:scale-95 hover:border-[#D4AF37]/50 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center"><UtensilsCrossed className="text-amber-500 w-6 h-6" /></div>
                    <span className="font-bold text-gray-300">Pratos</span>
                  </button>
                  <button className="bg-[#14151A] border border-white/10 p-4 rounded-2xl flex flex-col items-center gap-3 active:scale-95 hover:border-[#D4AF37]/50 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center"><Beer className="text-blue-500 w-6 h-6" /></div>
                    <span className="font-bold text-gray-300">Bebidas</span>
                  </button>
                </div>

                <div className="bg-[#14151A] border border-white/10 rounded-3xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-[40px]" />
                  <h3 className="font-bold text-white mb-4">Resumo (2 itens)</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-400 text-lg border-b border-white/5 pb-2"><span>1x Smash Burger</span><span>R$ 35,90</span></div>
                    <div className="flex justify-between text-gray-400 text-lg border-b border-white/5 pb-2"><span>1x Coca Zero</span><span>R$ 8,00</span></div>
                  </div>
                  <button className="w-full bg-[#D4AF37] text-black font-black uppercase tracking-widest text-lg py-5 rounded-2xl shadow-[0_0_20px_rgba(212,175,55,0.4)] active:scale-95 transition-transform flex items-center justify-center gap-2">
                    <Plus className="w-6 h-6" /> Enviar Cozinha
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* TAB: EXPEDIÇÃO */}
        {activeTab === 'expedicao' && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="space-y-8">
            {deliveringOrders.length > 0 && (
              <div>
                <h2 className="text-[#D4AF37] text-sm font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></div> Em Trânsito (Mãos)
                </h2>
                <AnimatePresence>
                  {deliveringOrders.map(order => (
                    <WaiterOrderCard key={order.id} order={order} onClaim={claimOrder} onComplete={completeOrder} />
                  ))}
                </AnimatePresence>
              </div>
            )}

            <div>
              <h2 className="text-gray-400 text-sm font-black uppercase tracking-widest mb-4">Boqueta (Retirar Agora)</h2>
              {readyOrders.length === 0 && deliveringOrders.length === 0 && (
                <div className="text-center text-gray-500 mt-20 p-8 border border-white/5 rounded-3xl bg-[#14151A]/50">
                  <BellRing className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="font-bold">Nenhum pedido pronto.</p>
                  <p className="text-sm mt-2">A cozinha está preparando os pedidos ativos.</p>
                </div>
              )}
              <AnimatePresence>
                {readyOrders.map(order => (
                  <WaiterOrderCard key={order.id} order={order} onClaim={claimOrder} onComplete={completeOrder} />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* TAB: CONTA */}
        {activeTab === 'conta' && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center mt-20 opacity-50">
            <Wallet className="w-16 h-16 text-gray-500 mb-4" />
            <p className="text-lg font-bold text-gray-400">Módulo de Pagamento</p>
            <p className="text-sm text-gray-600">Em desenvolvimento pelo Pitbull</p>
          </motion.div>
        )}
      </main>

      {/* Bottom Mobile Nav */}
      <nav className="fixed bottom-0 w-full bg-[#0B0C10]/95 backdrop-blur-2xl border-t border-white/10 pb-safe pt-2 px-6 flex justify-around items-center h-24 z-50 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <button 
          onClick={() => setActiveTab('mesas')}
          className={`flex flex-col items-center gap-1 p-2 transition-all ${activeTab === 'mesas' ? 'text-[#D4AF37] scale-110' : 'text-gray-500'}`}
        >
          <UtensilsCrossed className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Mesas</span>
        </button>
        <button 
          onClick={() => setActiveTab('expedicao')}
          className={`relative flex flex-col items-center gap-1 p-2 transition-all ${activeTab === 'expedicao' ? 'text-[#D4AF37] scale-110' : 'text-gray-500'}`}
        >
          <div className="relative">
            <BellRing className="w-6 h-6" />
            {readyOrders.length > 0 && <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse border-2 border-[#0B0C10]"></span>}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest">Boqueta</span>
        </button>
        <button 
          onClick={() => setActiveTab('conta')}
          className={`flex flex-col items-center gap-1 p-2 transition-all ${activeTab === 'conta' ? 'text-[#D4AF37] scale-110' : 'text-gray-500'}`}
        >
          <Wallet className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Contas</span>
        </button>
      </nav>
    </div>
  );
}
