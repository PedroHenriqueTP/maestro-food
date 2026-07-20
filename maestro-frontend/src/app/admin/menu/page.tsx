"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Plus, Search, GripVertical, Eye, Image as ImageIcon, CheckCircle2, Edit2, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

const INITIAL_CATEGORIES = [
  { id: '1', name: 'Destaques', active: true },
  { id: '2', name: 'Burgers', active: true },
  { id: '3', name: 'Bebidas', active: true },
  { id: '4', name: 'Sobremesas', active: false },
];

const INITIAL_ITEMS = [
  { id: '1', categoryId: '1', name: 'Wagyu Burger', price: 89.90, desc: 'Pão brioche selado na manteiga, 200g Wagyu, Queijo Trufado e maionese da casa.', active: true },
  { id: '2', categoryId: '1', name: 'Salmão Grelhado', price: 112.50, desc: 'Com purê de batata baroa e aspargos frescos salteados no azeite.', active: true },
  { id: '3', categoryId: '2', name: 'Smash Duplo', price: 45.00, desc: 'Pão de batata, 2x smash 90g, cheddar inglês, bacon caramelizado.', active: true },
];

export default function MenuAdminPage() {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [activeCategory, setActiveCategory] = useState('1');
  const [search, setSearch] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1500);
  };

  const filteredItems = items.filter(
    i => i.categoryId === activeCategory && i.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="flex flex-col h-full bg-[#050505] rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
        
        {/* Header Superior */}
        <header className="p-6 border-b border-white/10 bg-[#0B0C10] flex items-center justify-between z-10">
          <div>
            <h1 className="text-2xl font-black text-[#D4AF37] tracking-widest uppercase font-serif">Gestão de Cardápio</h1>
            <p className="text-sm text-gray-400 mt-1">Configure categorias, pratos e disponibilidade em tempo real.</p>
          </div>
          <div className="flex items-center gap-4">
            <a href="/order" target="_blank" className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl transition-all border border-white/10 text-sm font-bold uppercase tracking-widest active:scale-95">
              <Eye className="w-4 h-4" /> Previsualização
            </a>
            <Button 
              variant="primary" 
              onClick={handlePublish}
              disabled={isPublishing || isSuccess}
              className={`w-48 h-12 text-sm uppercase tracking-widest ${isSuccess ? 'bg-[#25D366] text-black border-[#25D366] shadow-[0_0_20px_rgba(37,211,102,0.4)]' : ''}`}
            >
              {isPublishing ? (
                <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
              ) : isSuccess ? (
                <><CheckCircle2 className="w-5 h-5 mr-2" /> Publicado</>
              ) : (
                'Publicar Alterações'
              )}
            </Button>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          
          {/* Coluna Esquerda: Categorias */}
          <aside className="w-80 border-r border-white/10 bg-[#0a0a0a] flex flex-col">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h2 className="font-bold text-white uppercase tracking-widest text-sm">Categorias</h2>
              <button className="w-8 h-8 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center hover:bg-[#D4AF37]/20 transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
              {categories.map((cat) => (
                <div 
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer border transition-all active:scale-[0.98] ${
                    activeCategory === cat.id 
                      ? 'bg-[#14151A] border-[#D4AF37]/50 shadow-[0_0_20px_rgba(212,175,55,0.05)]' 
                      : 'bg-transparent border-transparent hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <GripVertical className="w-4 h-4 text-gray-600 cursor-grab" />
                    <span className={`font-bold ${activeCategory === cat.id ? 'text-[#D4AF37]' : 'text-gray-300'}`}>
                      {cat.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${cat.active ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-gray-600'}`}></div>
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* Coluna Direita: Itens da Categoria */}
          <main className="flex-1 flex flex-col bg-[#050505] relative overflow-hidden">
            
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#0B0C10]/50 backdrop-blur-sm z-10 sticky top-0">
              <div className="relative w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar pratos na categoria..." 
                  className="bg-[#14151A] border-white/10 pl-10 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                />
              </div>
              <Button variant="primary" className="gap-2 font-bold shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                <Plus className="w-4 h-4" /> Novo Prato
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {filteredItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <ImageIcon className="w-16 h-16 mb-4 opacity-20" />
                  <p className="font-bold text-lg">Nenhum prato encontrado.</p>
                  <p className="text-sm">Clique em "Novo Prato" para começar.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  <AnimatePresence>
                    {filteredItems.map((item) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        key={item.id}
                        className="bg-[#14151A] border border-white/10 rounded-2xl p-4 flex gap-4 hover:border-[#D4AF37]/50 transition-colors group relative"
                      >
                        <div className="w-32 h-32 bg-[#0B0C10] rounded-xl flex items-center justify-center border border-white/5 flex-shrink-0 relative overflow-hidden">
                          <ImageIcon className="w-8 h-8 text-gray-700" />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm cursor-pointer">
                            <span className="text-xs font-bold text-white uppercase tracking-widest">Alterar Foto</span>
                          </div>
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-bold text-lg text-white">{item.name}</h3>
                              <div className="flex gap-2">
                                <button className="p-1.5 text-gray-500 hover:text-white bg-white/5 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                                <button className="p-1.5 text-gray-500 hover:text-red-400 bg-white/5 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                              </div>
                            </div>
                            <p className="text-sm text-gray-400 line-clamp-2">{item.desc}</p>
                          </div>
                          
                          <div className="flex items-center justify-between mt-4">
                            <span className="text-[#D4AF37] font-black text-xl">R$ {item.price.toFixed(2)}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Ativo</span>
                              <div className={`w-10 h-5 rounded-full p-1 cursor-pointer transition-colors ${item.active ? 'bg-[#D4AF37]' : 'bg-gray-700'}`}>
                                <div className={`w-3 h-3 rounded-full bg-black transition-transform ${item.active ? 'translate-x-5' : 'translate-x-0'}`}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

          </main>
        </div>
      </div>
    </AdminLayout>
  );
}
