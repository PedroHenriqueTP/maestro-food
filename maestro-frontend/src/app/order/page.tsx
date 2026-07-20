"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { useEffect } from 'react';
import { UtensilsCrossed, Plus, Minus, ShoppingBag, X, Info, Search } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  img: string;
  isActive: boolean;
}

interface Category {
  id: string;
  name: string;
  products: Product[];
}

export default function OrderFlow() {
  const [menu, setMenu] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState<{id: string, name: string, price: number, qty: number, obs?: string}[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch('http://localhost:3001/analytics/public/menu');
        if (res.ok) {
          const json = await res.json();
          setMenu(json.menu || []);
          if (json.menu && json.menu.length > 0) {
            setActiveCategory(json.menu[0].name);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar cardápio:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const addToCart = (item: any) => {
    const existing = cart.find(c => c.id === item.id);
    if (existing) {
      setCart(cart.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const removeFromCart = (id: string) => {
    const existing = cart.find(c => c.id === id);
    if (existing && existing.qty > 1) {
      setCart(cart.map(c => c.id === id ? { ...c, qty: c.qty - 1 } : c));
    } else {
      setCart(cart.filter(c => c.id !== id));
    }
  };

  const total = cart.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col md:flex-row pb-24 md:pb-0 font-sans">
      
      {/* Menu Area (Mobile First) */}
      <div className="flex-1 overflow-y-auto">
        <header className="px-6 py-8 bg-[#0B0C10] border-b border-white/5 sticky top-0 z-30">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-extrabold text-[#D4AF37] uppercase tracking-widest font-serif flex items-center gap-2">
                <UtensilsCrossed className="w-6 h-6" /> Maestro Menu
              </h1>
              <p className="text-gray-400 mt-1 text-sm font-medium tracking-wide">Mesa 12 • Atendimento Premium</p>
            </div>
          </div>
          
          {/* Categories Horizontal Scroll */}
          <div className="flex overflow-x-auto gap-3 pb-2 custom-scrollbar hide-scrollbar snap-x">
            {menu.map(cat => (
              <button 
                key={cat.id}
                onClick={() => setActiveCategory(cat.name)}
                className={`snap-start whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all active:scale-95 border-2 ${
                  activeCategory === cat.name ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.4)]' : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30'
                }`}
              >
                {cat.name}
              </button>
            ))}
            {menu.length === 0 && !isLoading && (
              <span className="text-gray-500 text-sm">Nenhuma categoria disponível</span>
            )}
          </div>
        </header>

        <div className="p-6">
          <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-widest border-b border-white/10 pb-2">{activeCategory || 'Menu'}</h2>
          
          {isLoading ? (
            <div className="flex justify-center p-12">
              <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menu.find(c => c.name === activeCategory)?.products?.map((item) => (
              <motion.div 
                key={item.id}
                layout
                className="bg-[#14151A] border border-white/5 rounded-3xl overflow-hidden flex flex-col active:scale-[0.98] transition-transform"
              >
                {/* Image Placeholder */}
                <div className={`h-48 w-full ${item.img} relative flex items-center justify-center`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14151A] to-transparent"></div>
                  <UtensilsCrossed className="w-12 h-12 text-white/20 relative z-10" />
                </div>
                
                <div className="p-5 flex-1 flex flex-col justify-between -mt-6 relative z-20 bg-[#14151A] rounded-t-3xl">
                  <div>
                    <h3 className="text-xl font-black text-white">{item.name}</h3>
                    <p className="text-sm text-gray-400 mt-2 leading-relaxed line-clamp-2">{item.description}</p>
                  </div>
                  
                  <div className="mt-6 flex items-center justify-between">
                    <div className="text-[#D4AF37] font-black text-xl">
                      R$ {item.price.toFixed(2)}
                    </div>
                    
                    {cart.find(c => c.id === item.id) ? (
                      <div className="flex items-center gap-3 bg-[#0B0C10] rounded-xl p-1 border border-white/10">
                        <button onClick={(e) => { e.stopPropagation(); removeFromCart(item.id); }} className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 active:bg-white/10 text-white">
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-bold w-4 text-center">{cart.find(c => c.id === item.id)?.qty}</span>
                        <button onClick={(e) => { e.stopPropagation(); addToCart(item); }} className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#D4AF37] text-black active:scale-95">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={(e) => { e.stopPropagation(); addToCart(item); }}
                        className="bg-white/5 hover:bg-white/10 border border-white/10 text-[#D4AF37] font-bold py-2.5 px-6 rounded-xl transition-colors active:scale-95 uppercase tracking-wider text-xs flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" /> Adicionar
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
            {menu.find(c => c.name === activeCategory)?.products?.length === 0 && (
              <div className="col-span-full py-12 text-center text-gray-500">
                Esta categoria não possui pratos ativos no momento.
              </div>
            )}
          </div>
          )}
        </div>
      </div>

      {/* Desktop Cart Sidebar / Mobile Modal */}
      <div className={`fixed inset-0 z-50 md:relative md:inset-auto w-full md:w-[400px] bg-[#0a0a0a] border-l border-white/10 flex flex-col transition-transform duration-300 ${isCartOpen ? 'translate-y-0' : 'translate-y-full md:translate-y-0'}`}>
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-[#0B0C10]">
          <h2 className="text-2xl font-black uppercase tracking-widest text-[#D4AF37] flex items-center gap-2">
            <ShoppingBag className="w-6 h-6" /> Sua Comanda
          </h2>
          <button onClick={() => setIsCartOpen(false)} className="md:hidden p-2 bg-white/5 rounded-full text-gray-400">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                layout
                className="bg-[#14151A] p-4 rounded-2xl border border-white/5"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="font-bold text-white text-lg block">{item.name}</span>
                    <span className="text-sm font-black text-[#D4AF37]">R$ {(item.price * item.qty).toFixed(2)}</span>
                  </div>
                  
                  {/* Qty Controls inside Cart */}
                  <div className="flex items-center gap-3 bg-[#0B0C10] rounded-xl p-1 border border-white/10">
                    <button onClick={() => removeFromCart(item.id)} className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 text-white"><Minus className="w-4 h-4" /></button>
                    <span className="font-bold w-4 text-center text-sm">{item.qty}</span>
                    <button onClick={() => addToCart(item)} className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#D4AF37] text-black"><Plus className="w-4 h-4" /></button>
                  </div>
                </div>
                
                {/* Observações */}
                <div className="mt-2 bg-[#050505] rounded-xl px-3 py-2 flex items-center gap-2 border border-white/5">
                  <Info className="w-4 h-4 text-gray-500" />
                  <input type="text" placeholder="Adicionar observação..." className="bg-transparent text-xs text-white w-full outline-none placeholder:text-gray-600" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {cart.length === 0 && (
            <div className="text-center text-gray-600 mt-20 flex flex-col items-center">
              <ShoppingBag className="w-16 h-16 mb-4 opacity-50" />
              <p className="font-bold text-lg uppercase tracking-widest">Sacola Vazia</p>
              <p className="text-sm mt-2">Escolha os pratos no cardápio ao lado.</p>
            </div>
          )}
        </div>

        <div className="p-6 bg-[#0B0C10] border-t border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
          <div className="flex justify-between items-center mb-6 text-xl">
            <span className="font-bold text-gray-400 uppercase tracking-widest text-sm">Total do Pedido</span>
            <span className="text-[#D4AF37] font-black text-3xl">R$ {total.toFixed(2)}</span>
          </div>
          <Button 
            variant="primary" 
            size="lg" 
            className={`w-full py-7 text-lg font-black uppercase tracking-widest rounded-2xl ${cart.length > 0 ? 'shadow-[0_0_20px_rgba(212,175,55,0.4)]' : ''}`}
            disabled={cart.length === 0}
            onClick={() => {
              alert("Pedido enviado para a Cozinha (KDS)!");
              setCart([]);
              setIsCartOpen(false);
            }}
          >
            Fazer Pedido
          </Button>
        </div>
      </div>

      {/* Floating View Cart Button for Mobile */}
      {!isCartOpen && (
        <div className="md:hidden fixed bottom-6 left-0 w-full px-6 z-40">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-[#D4AF37] text-black font-black uppercase tracking-widest text-lg py-5 rounded-2xl shadow-[0_10px_40px_rgba(212,175,55,0.5)] flex items-center justify-between px-6 active:scale-95 transition-transform"
          >
            <div className="flex items-center gap-3">
              <div className="bg-black/20 px-3 py-1 rounded-lg">{cart.reduce((acc, c) => acc + c.qty, 0)}</div>
              <span>Ver Comanda</span>
            </div>
            <span>R$ {total.toFixed(2)}</span>
          </button>
        </div>
      )}
    </div>
  );
}
