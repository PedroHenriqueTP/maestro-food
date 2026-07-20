"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Plus, Search, GripVertical, Eye, Image as ImageIcon, CheckCircle2, Edit2, Trash2, X, Settings2, Clock } from 'lucide-react';
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
  const [editingItem, setEditingItem] = useState<any>(null); // Controls the slide-over editing panel

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
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 pb-20">
                  <AnimatePresence>
                    {filteredItems.map((item) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        key={item.id}
                        className="bg-[#14151A] border border-white/10 rounded-2xl p-4 flex gap-4 hover:border-[#D4AF37]/50 transition-colors group relative cursor-pointer"
                        onClick={() => setEditingItem(item)}
                      >
                        <div className="w-28 h-28 lg:w-32 lg:h-32 bg-[#0B0C10] rounded-xl flex items-center justify-center border border-white/5 flex-shrink-0 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                          <ImageIcon className="w-8 h-8 text-gray-700" />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                            <span className="text-[10px] font-bold text-white uppercase tracking-widest">Editar Foto</span>
                          </div>
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start mb-1">
                              <h3 className="font-bold text-lg text-white leading-tight">{item.name}</h3>
                              <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                                <button className="p-1.5 text-gray-500 hover:text-white hover:bg-white/10 rounded-lg transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                                <button className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                              </div>
                            </div>
                            <p className="text-xs text-gray-400 line-clamp-2 mt-1">{item.desc}</p>
                          </div>
                          
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-[#D4AF37] font-black text-xl tracking-tight">R$ {item.price.toFixed(2)}</span>
                            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{item.active ? 'Ativo' : 'Inativo'}</span>
                              <div className={`w-9 h-5 rounded-full p-1 cursor-pointer transition-colors ${item.active ? 'bg-[#D4AF37]' : 'bg-gray-700'}`}>
                                <div className={`w-3 h-3 rounded-full bg-black transition-transform ${item.active ? 'translate-x-4' : 'translate-x-0'}`}></div>
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

          {/* Slide-over Form for Editing Item (Modifiers & Settings) */}
          <AnimatePresence>
            {editingItem && (
              <motion.aside 
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 450, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="bg-[#0B0C10] border-l border-white/10 flex flex-col overflow-hidden z-20 absolute right-0 top-0 bottom-0 shadow-[-20px_0_50px_rgba(0,0,0,0.5)]"
              >
                <div className="p-6 border-b border-white/5 flex items-center justify-between bg-[#14151A]">
                  <h2 className="font-bold text-white uppercase tracking-widest text-sm flex items-center gap-2">
                    <Settings2 className="w-4 h-4 text-[#D4AF37]" /> Configurar Prato
                  </h2>
                  <button onClick={() => setEditingItem(null)} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-gray-400">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                  {/* Mock Image Upload Area */}
                  <div className="w-full h-40 bg-[#1A1C23] rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-gray-500 hover:border-[#D4AF37]/50 hover:text-[#D4AF37] transition-colors cursor-pointer group">
                    <ImageIcon className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold uppercase tracking-widest">Upload Nova Foto</span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 block">Nome do Prato</label>
                      <Input defaultValue={editingItem.name} className="bg-[#14151A] border-white/10 text-white focus:border-[#D4AF37]" />
                    </div>
                    
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 block">Descrição Aperitivo</label>
                      <textarea defaultValue={editingItem.desc} rows={3} className="w-full bg-[#14151A] border border-white/10 text-white focus:border-[#D4AF37] rounded-xl p-3 text-sm focus:outline-none resize-none"></textarea>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 block">Preço Base (R$)</label>
                        <Input defaultValue={editingItem.price.toFixed(2)} className="bg-[#14151A] border-white/10 text-[#D4AF37] font-black text-lg focus:border-[#D4AF37]" />
                      </div>
                      <div className="flex-1">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 block">Disponibilidade</label>
                        <div className="h-10 bg-[#14151A] border border-white/10 rounded-xl flex items-center justify-between px-3 cursor-pointer">
                          <span className="text-sm font-bold text-white">Ativo</span>
                          <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${editingItem.active ? 'bg-[#D4AF37]' : 'bg-gray-700'}`}>
                            <div className="w-3 h-3 rounded-full bg-black translate-x-4"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/5 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-white uppercase tracking-widest">Grupos de Modificadores</h3>
                      <button className="text-[10px] bg-[#D4AF37]/10 text-[#D4AF37] px-2 py-1 rounded font-bold uppercase tracking-widest hover:bg-[#D4AF37]/20 transition-colors">+ Novo Grupo</button>
                    </div>

                    {/* Modifiers List Mock */}
                    <div className="bg-[#14151A] rounded-xl border border-white/5 p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-bold text-white">Ponto da Carne</p>
                          <p className="text-[10px] text-gray-500 uppercase tracking-widest">Obrigatório • 1 opção</p>
                        </div>
                        <Edit2 className="w-4 h-4 text-gray-600 hover:text-white cursor-pointer" />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 rounded bg-[#0a0a0a] border border-white/10 text-xs text-gray-400">Mal Passado</span>
                        <span className="px-2 py-1 rounded bg-[#0a0a0a] border border-[#D4AF37]/30 text-xs text-[#D4AF37]">Ao Ponto (Padrão)</span>
                        <span className="px-2 py-1 rounded bg-[#0a0a0a] border border-white/10 text-xs text-gray-400">Bem Passado</span>
                      </div>
                    </div>

                    <div className="bg-[#14151A] rounded-xl border border-white/5 p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-bold text-white">Adicionais (+ R$)</p>
                          <p className="text-[10px] text-gray-500 uppercase tracking-widest">Opcional • Até 5 opções</p>
                        </div>
                        <Edit2 className="w-4 h-4 text-gray-600 hover:text-white cursor-pointer" />
                      </div>
                      <div className="flex flex-col gap-2 mt-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-400">Bacon em tiras</span>
                          <span className="text-[#D4AF37] font-bold">+ R$ 5,00</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-400">Queijo Cheddar Extra</span>
                          <span className="text-[#D4AF37] font-bold">+ R$ 4,50</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
                
                <div className="p-6 border-t border-white/5 bg-[#14151A] flex gap-3">
                  <Button variant="outline" className="flex-1 bg-transparent border-white/10 text-white hover:bg-white/5" onClick={() => setEditingItem(null)}>Cancelar</Button>
                  <Button variant="primary" className="flex-1 bg-[#D4AF37] text-black shadow-[0_0_20px_rgba(212,175,55,0.2)]" onClick={() => setEditingItem(null)}>Salvar</Button>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

        </div>
      </div>
    </AdminLayout>
  );
}
