"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

// Mock data for wireframe
const MOCK_ORDERS = [
  { id: '1042', time: '12:30', status: 'preparo', items: ['2x Wagyu Burger', '1x Fritas Trufadas'] },
  { id: '1043', time: '12:32', status: 'preparo', items: ['1x Salmão Grelhado', '1x Suco Verde'] },
  { id: '1044', time: '12:35', status: 'fila', items: ['3x Wagyu Burger', '3x Fritas Trufadas', '3x Cola'] },
];

export default function KitchenDisplaySystem() {
  const [orders, setOrders] = useState(MOCK_ORDERS);

  const handleFinish = (id: string) => {
    setOrders(orders.filter(o => o.id !== id));
    // Futuro: Disparar evento para OrderOrchestrator via BullMQ/NestJS
  };

  return (
    <div className="min-h-screen bg-[#050505] p-6 text-white font-sans overflow-x-auto">
      <header className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-3xl font-black text-[#D4AF37] uppercase tracking-tighter">Kitchen Ops</h1>
          <p className="text-gray-400 text-sm">Station: Grelha & Fritura | Status: Operante</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-red-500/20 text-red-500 px-4 py-2 rounded-lg font-bold border border-red-500/50">
            Fila: {orders.length}
          </div>
        </div>
      </header>

      {/* KDS Horizontal Scroll / Kanban Layout */}
      <div className="flex gap-6 items-start h-[calc(100vh-140px)] overflow-x-auto pb-6">
        {orders.map((order) => (
          <Card key={order.id} variant="kitchen-ticket" className="min-w-[320px] flex flex-col h-full max-h-[600px]">
            <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
              <span className="text-2xl font-black">#{order.id}</span>
              <span className="text-lg font-bold text-gray-400">{order.time}</span>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-3 mb-6">
              {order.items.map((item, idx) => (
                <div key={idx} className="text-xl font-bold bg-white/5 p-3 rounded border border-white/5">
                  {item}
                </div>
              ))}
            </div>

            <Button 
              variant="kitchen-alert" 
              size="massive" 
              onClick={() => handleFinish(order.id)}
            >
              PRONTO
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
