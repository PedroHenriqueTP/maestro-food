"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { KitchenOrder } from '@/lib/hooks/useKitchenSocket';

interface OrderTicketProps {
  order: KitchenOrder;
  onUpdateStatus: (id: string, status: 'PREPARING' | 'READY') => void;
}

export function OrderTicket({ order, onUpdateStatus }: OrderTicketProps) {
  const [elapsedMinutes, setElapsedMinutes] = useState(0);

  useEffect(() => {
    const calcElapsed = () => {
      const diff = Math.floor((Date.now() - new Date(order.createdAt).getTime()) / 60000);
      setElapsedMinutes(diff);
    };
    calcElapsed();
    const interval = setInterval(calcElapsed, 60000);
    return () => clearInterval(interval);
  }, [order.createdAt]);

  const isDelayed = elapsedMinutes >= 15;
  const isHighUrgency = order.urgencyLevel !== 'NORMAL';

  let cardStyle = "border-white/5 bg-[#14151A]/80";
  if (isDelayed) cardStyle = "border-red-500/50 bg-red-950/40 shadow-[0_0_20px_rgba(239,68,68,0.15)]";
  if (isHighUrgency) cardStyle = "border-[#D4AF37]/50 bg-[#D4AF37]/10 shadow-[0_0_20px_rgba(212,175,55,0.15)]";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="mb-4"
    >
      <Card variant="glass" className={`p-5 border-2 ${cardStyle} transition-all duration-300 relative overflow-hidden`}>
        {isDelayed && (
          <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-black uppercase px-3 py-1 rounded-bl-lg animate-pulse">
            Atrasado
          </div>
        )}
        <div className="flex justify-between items-start mb-4 border-b border-white/10 pb-3">
          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-3xl font-black text-white uppercase font-mono">#{order.id.toString().padStart(4, '0')}</h3>
              {order.tableNumber && (
                <span className="bg-white/10 border border-white/20 text-white text-lg font-black px-3 py-1 rounded-lg">Mesa {order.tableNumber}</span>
              )}
            </div>
            <span className={`text-sm font-black uppercase tracking-widest mt-1 block ${isDelayed ? 'text-red-400 animate-pulse' : 'text-gray-400'}`}>
              {elapsedMinutes} min de espera
            </span>
          </div>
          {isHighUrgency && !isDelayed && (
            <span className="bg-[#D4AF37] text-black text-xs font-black uppercase tracking-widest px-3 py-1 rounded shadow-lg">
              VIP
            </span>
          )}
        </div>

        <ul className="mb-6 space-y-3">
          {order.items.map((item, idx) => (
            <li key={idx} className="text-gray-100 text-xl font-bold flex items-start gap-3">
              <span className="w-2.5 h-2.5 mt-2 rounded-full bg-[#D4AF37] flex-shrink-0 shadow-[0_0_10px_rgba(212,175,55,0.5)]"></span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="flex gap-3 mt-6">
          {order.status === 'PENDING' && (
            <Button variant="primary" className="w-full h-16 text-lg font-black uppercase tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.2)]" onClick={() => onUpdateStatus(order.id, 'PREPARING')}>
              Iniciar Preparo
            </Button>
          )}
          {order.status === 'PREPARING' && (
            <Button variant="primary" className="w-full h-16 text-lg font-black uppercase tracking-widest bg-green-500 text-white border-green-500 hover:bg-green-600 hover:border-green-600 shadow-[0_0_20px_rgba(34,197,94,0.3)]" onClick={() => onUpdateStatus(order.id, 'READY')}>
              Pronto para Retirada
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
