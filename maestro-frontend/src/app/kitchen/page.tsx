"use client";

import React from 'react';
import { useKitchenSocket } from '@/lib/hooks/useKitchenSocket';
import { useIntelligence } from '@/lib/hooks/useIntelligence';
import { OrderTicket } from '@/components/kitchen/OrderTicket';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle2, Flame, Utensils, AlertTriangle } from 'lucide-react';

export default function KitchenDashboard() {
  const { orders, isConnected, updateOrderStatus } = useKitchenSocket();
  const { insights } = useIntelligence();
  const [activeStation, setActiveStation] = React.useState('TODAS');

  // Filtra as colunas por status e estação
  const filteredOrders = orders.filter(o => activeStation === 'TODAS' || o.station === activeStation || !o.station);
  
  const pending = filteredOrders.filter(o => o.status === 'PENDING').sort((a,b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  const preparing = filteredOrders.filter(o => o.status === 'PREPARING').sort((a,b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  const ready = filteredOrders.filter(o => o.status === 'READY').sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const ready = orders.filter(o => o.status === 'READY').sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Procura se tem algum alerta de Flash Sale do Intelligence
  const flashSaleAlert = insights.find(i => i.insightType === 'PRICE_DROP' || i.description.includes('Flash Sale'));

  return (
    <div className="min-h-screen bg-[#000000] text-white p-6 font-sans">
      {/* Header com Status do WebSocket e Filtros */}
      <header className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
        <div className="flex items-center gap-8">
          <div>
            <h1 className="text-4xl font-black text-[#D4AF37] tracking-widest uppercase flex items-center gap-3">
              <Flame className="w-8 h-8 text-orange-500" /> KDS
            </h1>
            <p className="text-gray-500 text-sm mt-1 font-bold tracking-widest uppercase">Maestro Kitchen Display</p>
          </div>
          
          <div className="flex gap-2 bg-[#14151A] p-1.5 rounded-xl border border-white/10">
            {['TODAS', 'GRELHA', 'FRITADEIRA', 'MONTAGEM'].map(station => (
              <button 
                key={station}
                onClick={() => setActiveStation(station)}
                className={`px-6 py-2 rounded-lg font-black uppercase tracking-widest text-sm transition-colors ${
                  activeStation === station ? 'bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {station}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 bg-[#14151A] px-4 py-2 rounded-xl border border-white/10">
          <Clock className="w-5 h-5 text-gray-400" />
          <span className="text-xl font-bold text-white font-mono">{new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
          <div className="w-px h-6 bg-white/10 mx-2"></div>
          <span className="text-sm font-black text-gray-400 uppercase tracking-widest">
            {isConnected ? 'LIVE' : 'OFFLINE'}
          </span>
          <div className={`w-3 h-3 rounded-full shadow-[0_0_10px_currentColor] ${isConnected ? 'bg-green-500 text-green-500 animate-pulse' : 'bg-red-500 text-red-500'}`} />
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-180px)]">
        
        {/* Coluna Pendentes */}
        <div className="bg-[#0B0C10] rounded-3xl border border-white/5 p-5 flex flex-col shadow-2xl">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
            <h2 className="text-2xl font-black text-white uppercase tracking-widest flex items-center gap-2">
              Pendentes
            </h2>
            <span className="bg-white/10 text-white font-black text-lg px-4 py-1 rounded-xl">{pending.length}</span>
          </div>
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
            <AnimatePresence>
              {pending.map(order => (
                <OrderTicket key={order.id} order={order} onUpdateStatus={updateOrderStatus} />
              ))}
              {pending.length === 0 && (
                <div className="flex flex-col items-center justify-center h-40 text-gray-600">
                  <Utensils className="w-12 h-12 mb-2 opacity-20" />
                  <p className="font-bold uppercase tracking-widest">Nenhum Pedido</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Coluna Preparando */}
        <div className="bg-[#14151A] rounded-3xl border border-[#D4AF37]/30 p-5 flex flex-col shadow-[0_0_40px_rgba(212,175,55,0.05)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50"></div>
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
            <h2 className="text-2xl font-black text-[#D4AF37] uppercase tracking-widest flex items-center gap-2">
              Em Preparo
            </h2>
            <span className="bg-[#D4AF37] text-black font-black text-lg px-4 py-1 rounded-xl shadow-[0_0_15px_rgba(212,175,55,0.4)]">{preparing.length}</span>
          </div>
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
            <AnimatePresence>
              {preparing.map(order => (
                <OrderTicket key={order.id} order={order} onUpdateStatus={updateOrderStatus} />
              ))}
              {preparing.length === 0 && (
                <div className="flex flex-col items-center justify-center h-40 text-gray-600">
                  <Flame className="w-12 h-12 mb-2 opacity-20" />
                  <p className="font-bold uppercase tracking-widest">Grelha Livre</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Coluna Prontos */}
        <div className="bg-[#0B0C10] rounded-3xl border border-white/5 p-5 flex flex-col opacity-80 hover:opacity-100 transition-opacity">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
            <h2 className="text-2xl font-black text-green-500 uppercase tracking-widest flex items-center gap-2">
              Expedição
            </h2>
            <span className="bg-green-500/20 text-green-500 font-black text-lg px-4 py-1 rounded-xl border border-green-500/30">{ready.length}</span>
          </div>
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
            <AnimatePresence>
              {ready.slice(0, 10).map(order => (
                <OrderTicket key={order.id} order={order} onUpdateStatus={updateOrderStatus} />
              ))}
              {ready.length === 0 && (
                <div className="flex flex-col items-center justify-center h-40 text-gray-600">
                  <CheckCircle2 className="w-12 h-12 mb-2 opacity-20" />
                  <p className="font-bold uppercase tracking-widest">Balcão Vazio</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
