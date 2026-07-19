"use client";

import React from 'react';
import { useKitchenSocket } from '@/lib/hooks/useKitchenSocket';
import { useIntelligence } from '@/lib/hooks/useIntelligence';
import { OrderTicket } from '@/components/kitchen/OrderTicket';
import { motion, AnimatePresence } from 'framer-motion';

export default function KitchenDashboard() {
  const { orders, isConnected, updateOrderStatus } = useKitchenSocket();
  const { insights } = useIntelligence();

  // Filtra as colunas
  const pending = orders.filter(o => o.status === 'PENDING').sort((a,b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  const preparing = orders.filter(o => o.status === 'PREPARING').sort((a,b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  const ready = orders.filter(o => o.status === 'READY').sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Procura se tem algum alerta de Flash Sale do Intelligence
  const flashSaleAlert = insights.find(i => i.insightType === 'PRICE_DROP' || i.description.includes('Flash Sale'));

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 font-sans">
      {/* Header com Status do WebSocket */}
      <header className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-4xl font-black font-serif text-[#D4AF37] tracking-widest uppercase">KDS</h1>
          <p className="text-gray-400 text-sm mt-1">Kitchen Display System</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-mono text-gray-400 uppercase tracking-widest">
            {isConnected ? 'Sync: ON' : 'Sync: OFF'}
          </span>
          <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
        </div>
      </header>

      {/* Intelligence Alert */}
      <AnimatePresence>
        {flashSaleAlert && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 bg-red-900/40 border border-red-500/50 p-4 rounded-xl flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl">🚨</span>
              <div>
                <h3 className="font-bold text-red-400 uppercase tracking-widest text-sm">Alerta de Demanda</h3>
                <p className="text-white text-lg">{flashSaleAlert.description}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Kanban Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        
        {/* Coluna Pendentes */}
        <div className="bg-[#0a0a0a] rounded-2xl border border-white/5 p-4 flex flex-col">
          <h2 className="text-xl font-bold font-serif mb-4 flex justify-between items-center text-gray-300">
            Pendentes
            <span className="bg-white/10 text-white text-xs px-2 py-1 rounded-full">{pending.length}</span>
          </h2>
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <AnimatePresence>
              {pending.map(order => (
                <OrderTicket key={order.id} order={order} onUpdateStatus={updateOrderStatus} />
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Coluna Preparando */}
        <div className="bg-[#0a0a0a] rounded-2xl border border-white/5 p-4 flex flex-col">
          <h2 className="text-xl font-bold font-serif mb-4 flex justify-between items-center text-[#D4AF37]">
            Na Grelha
            <span className="bg-[#D4AF37]/20 text-[#D4AF37] text-xs px-2 py-1 rounded-full">{preparing.length}</span>
          </h2>
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <AnimatePresence>
              {preparing.map(order => (
                <OrderTicket key={order.id} order={order} onUpdateStatus={updateOrderStatus} />
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Coluna Prontos */}
        <div className="bg-[#0a0a0a] rounded-2xl border border-white/5 p-4 flex flex-col opacity-70">
          <h2 className="text-xl font-bold font-serif mb-4 flex justify-between items-center text-green-500">
            Expedição
            <span className="bg-green-500/20 text-green-500 text-xs px-2 py-1 rounded-full">{ready.length}</span>
          </h2>
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <AnimatePresence>
              {ready.slice(0, 10).map(order => ( // Mostra apenas os ultimos 10 na expedição
                <OrderTicket key={order.id} order={order} onUpdateStatus={updateOrderStatus} />
              ))}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
