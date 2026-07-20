"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { formatCurrency, formatDate } from "../../../lib/utils/formatters";

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

  return (
    <div className="w-full bg-[#14151A]/80 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl overflow-hidden">
      
      {/* Grid Header */}
      <div className="grid grid-cols-5 gap-4 px-6 py-4 text-xs uppercase bg-[#0B0C10]/90 text-gray-500 border-b border-gray-800 tracking-widest font-semibold sticky top-0 z-10 backdrop-blur-md">
        <div className="col-span-2 md:col-span-1">Cliente</div>
        <div className="hidden md:block">Contato</div>
        <div className="text-center">Pedidos</div>
        <div className="text-right">LTV</div>
        <div className="text-center">Status</div>
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
                  <motion.div layout className="grid grid-cols-5 gap-4 px-6 py-5 items-center">
                    
                    <div className="col-span-2 md:col-span-1 flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all duration-500
                        ${vip ? 'bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]' : 'bg-gray-800/80 text-gray-400'}`}>
                        {customer.name.charAt(0).toUpperCase()}
                      </div>
                      <span className={`font-medium ${vip ? 'text-white' : 'text-gray-300'}`}>{customer.name}</span>
                    </div>

                    <div className="hidden md:block font-mono text-gray-400 text-sm">
                      {customer.phone}
                    </div>

                    <div className="text-center font-bold text-gray-300">
                      {customer.totalOrders}
                    </div>

                    <div className={`text-right font-black ${vip ? 'text-[#D4AF37]' : 'text-gray-200'}`}>
                      {formatCurrency(customer.totalSpent)}
                    </div>

                    <div className="text-center">
                      <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-black tracking-widest uppercase transition-all
                        ${vip ? 'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 shadow-[0_0_10px_rgba(212,175,55,0.1)]' : 'bg-gray-800/50 text-gray-500 border border-gray-700/50'}`}>
                        {vip ? 'VIP' : 'Reg'}
                      </span>
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
                          <div>
                            <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Última Visita</span>
                            <p className="text-lg text-gray-200 mt-1">{formatDate(customer.lastOrderDate)}</p>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Ações Inteligentes</span>
                            <div className="flex gap-3 mt-2">
                              <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm transition-colors border border-white/10">
                                Emitir Cupom Especial
                              </button>
                              <button className="px-4 py-2 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 rounded-lg text-sm transition-colors shadow-[0_0_10px_rgba(212,175,55,0.1)]">
                                WhatsApp Direto
                              </button>
                            </div>
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
