"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { KitchenOrder } from '@/lib/hooks/useKitchenSocket';

interface WaiterOrderCardProps {
  order: KitchenOrder;
  onClaim: (id: string) => void;
  onComplete: (id: string) => void;
}

export function WaiterOrderCard({ order, onClaim, onComplete }: WaiterOrderCardProps) {
  // O Garçom interage primordialmente com READY e DELIVERING
  const isReady = order.status === 'READY';
  const isDelivering = order.status === 'DELIVERING';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="mb-4 touch-manipulation" // Prevents double tap zoom on mobile
    >
      <Card variant="glass" className="p-5 border border-white/10 bg-[#0a0a0a]">
        <div className="flex justify-between items-center mb-6">
          <div>
            <span className="text-gray-400 text-sm uppercase tracking-widest block mb-1">Mesa / Destino</span>
            <h3 className="text-4xl font-black font-serif text-white">#{order.id.replace('K-', '')}</h3>
          </div>
          {order.urgencyLevel !== 'NORMAL' && (
             <span className="bg-[#D4AF37] text-black text-xs font-black uppercase px-3 py-2 rounded shadow-lg animate-pulse">
               V.I.P
             </span>
          )}
        </div>

        <ul className="mb-8 space-y-3">
          {order.items.map((item, idx) => (
            <li key={idx} className="text-gray-300 text-lg flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] mt-2 flex-shrink-0"></span>
              <span className="leading-tight">{item}</span>
            </li>
          ))}
        </ul>

        {isReady && (
          <button 
            onClick={() => onClaim(order.id)}
            className="w-full bg-[#D4AF37] text-black font-black uppercase tracking-widest text-xl py-6 rounded-2xl shadow-[0_0_20px_rgba(212,175,55,0.4)] active:scale-95 transition-transform"
          >
            Retirar Pedido
          </button>
        )}

        {isDelivering && (
          <div className="flex gap-4">
            <button 
              onClick={() => onComplete(order.id)}
              className="flex-1 bg-green-600 text-white font-black uppercase tracking-widest text-xl py-6 rounded-2xl shadow-[0_0_20px_rgba(22,163,74,0.4)] active:scale-95 transition-transform"
            >
              Entregue
            </button>
            <button 
              onClick={() => alert('Disparar n8n Webhook: "Problema na mesa!"')}
              className="px-6 bg-red-900/50 border border-red-500/50 text-white font-bold uppercase rounded-2xl active:scale-95 transition-transform"
            >
              ⚠️
            </button>
          </div>
        )}
      </Card>
    </motion.div>
  );
}
