"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { formatCurrency, formatDate } from "../../../lib/utils/formatters";
import { useAuth } from "@/contexts/AuthContext";
import { Search, ChevronDown, ChevronUp, Star, Gift, MessageCircle, Clock, ShieldAlert, Filter, MoreHorizontal, CheckSquare, Square } from "lucide-react";

export interface Customer {
  id: string;
  name: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
}

interface CustomerTableProps {
  customers: Customer[];
  isLoading?: boolean;
}

// Stagger variants for the container
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

// Item variants
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 }
  }
};

export function CustomerTable({ customers, isLoading }: CustomerTableProps) {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [selectedCustomers, setSelectedCustomers] = useState<Set<string>>(new Set());
  const { user } = useAuth();
  const isAdminOrManager = user?.role === 'ADMIN' || user?.role === 'MANAGER';

  const isVip = (customer: Customer) => {
    return customer.totalOrders >= 5 || customer.totalSpent >= 30000;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value / 100);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  };

  const toggleRow = (id: string) => {
    setExpandedRow(prev => prev === id ? null : id);
  };

  const toggleSelection = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSelection = new Set(selectedCustomers);
    if (newSelection.has(id)) newSelection.delete(id);
    else newSelection.add(id);
    setSelectedCustomers(newSelection);
  };

  const toggleAll = () => {
    if (selectedCustomers.size === customers.length) {
      setSelectedCustomers(new Set());
    } else {
      setSelectedCustomers(new Set(customers.map(c => c.id)));
    }
  };

  return (
    <div className="w-full bg-[#0a0a0c]/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
      
      {/* Header com Busca e Filtros */}
      <div className="p-6 border-b border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 bg-[#0B0C10]/90">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Star className="w-5 h-5 text-[#D4AF37]" /> Base de Clientes
            </h2>
            <p className="text-sm text-gray-400 mt-1">Gerencie e interaja com seus consumidores</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text"
              placeholder="Buscar cliente..."
              className="w-full bg-[#1A1C23] border border-gray-800 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 transition-all placeholder:text-gray-600"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-sm font-medium text-gray-300 transition-colors w-full sm:w-auto">
            <Filter className="w-4 h-4" /> Filtros
          </button>
        </div>
      </div>

      {/* Bulk Actions Bar (Aparece ao selecionar) */}
      <AnimatePresence>
        {selectedCustomers.size > 0 && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: "auto", opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }}
            className="bg-[#D4AF37]/10 border-b border-[#D4AF37]/20 px-6 py-3 flex items-center justify-between overflow-hidden"
          >
            <span className="text-sm font-bold text-[#D4AF37]">{selectedCustomers.size} clientes selecionados</span>
            <div className="flex gap-3">
              <button className="px-4 py-1.5 text-xs font-bold bg-[#D4AF37] text-black hover:bg-[#c4a030] rounded-lg transition-colors">Disparar Campanha</button>
              <button className="px-4 py-1.5 text-xs font-bold bg-white/10 text-white hover:bg-white/20 rounded-lg transition-colors border border-white/10">Exportar (CSV)</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Grid Header */}
      <div className="grid grid-cols-12 gap-4 px-6 py-4 text-xs uppercase bg-[#0B0C10]/90 text-gray-500 border-b border-gray-800 tracking-widest font-semibold sticky top-0 z-10 backdrop-blur-md">
        <div className="col-span-1 flex items-center">
          <button onClick={toggleAll} className="text-gray-500 hover:text-[#D4AF37] transition-colors">
            {selectedCustomers.size === customers.length && customers.length > 0 ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
          </button>
        </div>
        <div className="col-span-4 md:col-span-3">Cliente</div>
        <div className="hidden md:block md:col-span-3">Contato</div>
        <div className="col-span-2 text-center">Pedidos</div>
        <div className="col-span-3 md:col-span-2 text-right">LTV</div>
        <div className="col-span-2 md:col-span-1 text-center">Ações</div>
      </div>

      <div className="max-h-[600px] overflow-y-auto custom-scrollbar relative">
        {isLoading ? (
          <div className="p-12 text-center text-gray-500 flex justify-center items-center gap-3">
            <span className="w-5 h-5 border-2 border-gray-600 border-t-[#D4AF37] rounded-full animate-spin"></span>
            Carregando inteligência de clientes...
          </div>
        ) : customers.length === 0 ? (
          <div className="p-12 text-center text-gray-600 font-mono">
            Nenhum registro encontrado.
          </div>
        ) : (
          <motion.div 
            variants={containerVariants} 
            initial="hidden" 
            animate="show"
            className="flex flex-col"
          >
            {customers.map((customer) => {
              const vip = isVip(customer);
              const isExpanded = expandedRow === customer.id;
              
              return (
                <motion.div 
                  layout
                  key={customer.id} 
                  variants={itemVariants}
                  onClick={() => toggleRow(customer.id)}
                  className={`
                    border-b border-gray-800/50 cursor-pointer overflow-hidden transition-all duration-300
                    ${isExpanded ? 'bg-[#1A1C23]' : 'hover:bg-[#1A1C23]/60 bg-transparent'}
                    ${vip ? 'shadow-[inset_4px_0_0_0_#D4AF37]' : 'shadow-[inset_4px_0_0_0_transparent]'}
                  `}
                >
                  {/* Linha Principal */}
                  <motion.div layout className="grid grid-cols-12 gap-4 px-6 py-4 items-center group">
                    
                    {/* Checkbox */}
                    <div className="col-span-1 flex items-center">
                      <button onClick={(e) => toggleSelection(customer.id, e)} className={`${selectedCustomers.has(customer.id) ? 'text-[#D4AF37]' : 'text-gray-600'} hover:text-[#D4AF37] transition-colors`}>
                        {selectedCustomers.has(customer.id) ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                      </button>
                    </div>

                    <div className="col-span-4 md:col-span-3 flex items-center gap-4">
                      <div className={`w-11 h-11 rounded-xl flex shrink-0 items-center justify-center font-bold text-lg transition-all duration-500 relative
                        ${vip ? 'bg-gradient-to-br from-[#D4AF37] to-amber-700 text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]' : 'bg-gray-800/80 text-gray-400 group-hover:bg-gray-700'}`}>
                        {customer.name.charAt(0).toUpperCase()}
                        {vip && <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border-2 border-[#1A1C23]" />}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className={`font-semibold truncate ${vip ? 'text-white' : 'text-gray-200'}`}>{customer.name}</span>
                        {vip && <span className="text-[10px] text-[#D4AF37] uppercase tracking-wider font-bold">Cliente Elite</span>}
                      </div>
                    </div>

                    <div className="hidden md:flex md:col-span-3 flex-col justify-center">
                      <span className="font-mono text-gray-400 text-sm truncate">{customer.phone}</span>
                    </div>

                    <div className="col-span-2 text-center font-bold text-gray-300">
                      {customer.totalOrders}
                    </div>

                    <div className={`col-span-3 md:col-span-2 text-right font-black ${vip ? 'text-[#D4AF37]' : 'text-gray-200'}`}>
                      {formatCurrency(customer.totalSpent)}
                    </div>

                    <div className="col-span-2 md:col-span-1 flex items-center justify-center gap-3">
                      <button className="p-1.5 text-gray-500 hover:text-white hover:bg-white/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100 hidden md:block">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                      <div className="flex items-center justify-center">
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-600 group-hover:text-[#D4AF37] transition-colors" />
                        )}
                      </div>
                    </div>

                  </motion.div>

                  {/* Painel Expandido (Accordion) */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="bg-[#0B0C10]/50 border-t border-gray-800/50"
                      >
                        <div className="px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="flex items-start gap-4">
                            <div className="p-3 bg-gray-800/50 rounded-xl text-gray-400">
                              <Clock className="w-5 h-5" />
                            </div>
                            <div>
                              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Última Visita</span>
                              <p className="text-lg text-gray-200 mt-0.5 font-medium">{formatDate(customer.lastOrderDate)}</p>
                            </div>
                          </div>
                          <div className="md:col-span-2 border-l border-gray-800/50 pl-6">
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Ações Inteligentes</span>
                            {isAdminOrManager ? (
                              <div className="flex gap-3 mt-3">
                                <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-medium transition-colors border border-white/10">
                                  <Gift className="w-4 h-4 text-[#D4AF37]" /> Emitir Cupom
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 rounded-lg text-sm font-medium transition-colors shadow-[0_0_15px_rgba(37,211,102,0.15)]">
                                  <MessageCircle className="w-4 h-4" /> WhatsApp Direto
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg w-fit">
                                <ShieldAlert className="w-4 h-4 text-red-400" />
                                <p className="text-xs text-red-300 font-medium tracking-wide">Acesso restrito a Gerência</p>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center justify-end">
                            {vip && (
                              <div className="text-right">
                                <span className="text-[10px] text-[#D4AF37] uppercase tracking-[0.2em] font-black animate-pulse">Alta Rentabilidade</span>
                                <p className="text-gray-400 text-sm">Cliente Top 5% do Maestro</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}
