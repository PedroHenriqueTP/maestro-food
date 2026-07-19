"use client";

import React from 'react';
import { useWaiterSocket } from '@/lib/hooks/useWaiterSocket';
import { WaiterOrderCard } from '@/components/waiter/WaiterOrderCard';
import { AnimatePresence } from 'framer-motion';

export default function WaiterMobileView() {
  const { orders, isConnected, claimOrder, completeOrder } = useWaiterSocket();

  // O Garçom só precisa ver o que está PRONTO para retirar, ou o que ELE está entregando
  const readyOrders = orders.filter(o => o.status === 'READY');
  const deliveringOrders = orders.filter(o => o.status === 'DELIVERING');

  return (
    <div className="min-h-screen bg-[#000000] text-white p-4 font-sans pb-24">
      {/* Topbar Simples */}
      <header className="flex justify-between items-center mb-6 pt-2">
        <h1 className="text-2xl font-black font-serif text-[#D4AF37] tracking-widest uppercase">
          Salão
        </h1>
        <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
      </header>

      {/* Meus Pedidos em Transporte */}
      {deliveringOrders.length > 0 && (
        <div className="mb-8">
          <h2 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-4">Em Trânsito</h2>
          <AnimatePresence>
            {deliveringOrders.map(order => (
              <WaiterOrderCard 
                key={order.id} 
                order={order} 
                onClaim={claimOrder} 
                onComplete={completeOrder} 
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Pedidos na Boqueta (Prontos) */}
      <div>
        <h2 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-4">Expedição (Retirar)</h2>
        {readyOrders.length === 0 && deliveringOrders.length === 0 && (
          <div className="text-center text-gray-500 mt-12">
            <span className="text-4xl mb-4 block">🎧</span>
            <p>Nenhum pedido pronto no momento.</p>
          </div>
        )}
        <AnimatePresence>
          {readyOrders.map(order => (
            <WaiterOrderCard 
              key={order.id} 
              order={order} 
              onClaim={claimOrder} 
              onComplete={completeOrder} 
            />
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}
