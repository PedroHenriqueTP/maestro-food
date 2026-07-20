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
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="mb-4"
    >
      <Card variant="glass" className={`p-4 border ${cardStyle} transition-colors`}>
        <div className="flex justify-between items-start mb-4 border-b border-white/10 pb-2">
          <div>
            <h3 className="text-xl font-bold font-serif text-white">#{order.id}</h3>
            <span className={`text-xs font-black uppercase tracking-widest ${isDelayed ? 'text-red-400' : 'text-gray-400'}`}>
              {elapsedMinutes} min atrás
            </span>
          </div>
          {isHighUrgency && (
            <span className="bg-[#D4AF37] text-black text-[10px] font-black uppercase px-2 py-1 rounded shadow-lg animate-pulse">
              Prioridade
            </span>
          )}
        </div>

        <ul className="mb-6 space-y-2">
          {order.items.map((item, idx) => (
            <li key={idx} className="text-gray-200 text-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span>
              {item}
            </li>
          ))}
        </ul>

        <div className="flex gap-2 mt-auto">
          {order.status === 'PENDING' && (
            <Button variant="outline" className="w-full h-12 text-sm font-bold border-white/20 text-gray-300 hover:text-white hover:bg-white/10 transition-colors" onClick={() => onUpdateStatus(order.id, 'PREPARING')}>
              Mandar pra Grelha
            </Button>
          )}
          {order.status === 'PREPARING' && (
            <Button variant="primary" className="w-full h-12 text-sm font-black uppercase tracking-widest" onClick={() => onUpdateStatus(order.id, 'READY')}>
              Avisar Garçom (Pronto)
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
