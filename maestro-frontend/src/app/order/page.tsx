"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const MENU_ITEMS = [
  { id: '1', name: 'Wagyu Burger', price: 89.90, desc: 'Pão brioche, 200g Wagyu, Queijo Trufado' },
  { id: '2', name: 'Salmão Grelhado', price: 112.50, desc: 'Com purê de batata baroa e aspargos' },
  { id: '3', name: 'Fritas Trufadas', price: 45.00, desc: 'Parmesão e azeite de trufas brancas' },
];

export default function OrderFlow() {
  const [cart, setCart] = useState<{id: string, name: string, price: number, qty: number}[]>([]);

  const addToCart = (item: any) => {
    const existing = cart.find(c => c.id === item.id);
    if (existing) {
      setCart(cart.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const total = cart.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col md:flex-row">
      {/* Menu Area (Liquid Flow) */}
      <div className="flex-1 p-6 md:p-12 overflow-y-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold text-[#D4AF37] uppercase tracking-widest font-serif">Maestro Menu</h1>
          <p className="text-gray-400 mt-2">Toque em um item para adicionar ao pedido.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MENU_ITEMS.map((item) => (
            <motion.div 
              key={item.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              layout
              onClick={() => addToCart(item)}
              className="cursor-pointer"
            >
              <Card variant="glass" className="h-full flex flex-col justify-between border-transparent hover:border-[#D4AF37]/50 transition-colors">
                <div>
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <p className="text-sm text-gray-400 mt-2">{item.desc}</p>
                </div>
                <div className="mt-4 text-[#D4AF37] font-bold text-lg">
                  R$ {item.price.toFixed(2)}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Cart/Summary Sidebar */}
      <div className="w-full md:w-96 bg-[#0a0a0a] border-l border-white/10 p-6 flex flex-col min-h-[50vh] md:min-h-screen">
        <h2 className="text-2xl font-bold mb-6">Comanda</h2>
        
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                layout
                className="flex justify-between items-center bg-white/5 p-4 rounded-lg"
              >
                <div>
                  <span className="font-bold block">{item.name}</span>
                  <span className="text-xs text-gray-400">{item.qty}x R$ {item.price.toFixed(2)}</span>
                </div>
                <div className="font-bold text-[#D4AF37]">
                  R$ {(item.price * item.qty).toFixed(2)}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {cart.length === 0 && (
            <div className="text-center text-gray-500 mt-10">Pedido vazio</div>
          )}
        </div>

        <div className="pt-6 border-t border-white/10 mt-6">
          <div className="flex justify-between items-center mb-6 text-xl font-bold">
            <span>Total</span>
            <span className="text-[#D4AF37]">R$ {total.toFixed(2)}</span>
          </div>
          <Button 
            variant="primary" 
            size="lg" 
            className="w-full text-lg uppercase tracking-widest"
            disabled={cart.length === 0}
          >
            Confirmar Pedido
          </Button>
        </div>
      </div>
    </div>
  );
}
