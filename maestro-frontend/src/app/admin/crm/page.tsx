"use client";

import React, { useState, useEffect } from "react";
import { CustomerTable, Customer } from "@/components/crm/CustomerTable";
import { exportToCsv } from "@/lib/export-csv";
import { motion, AnimatePresence } from "framer-motion";

export default function CRMDashboard() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeRole, setActiveRole] = useState<'ADMIN_GLOBAL' | 'TENANT'>('TENANT');

  // Fetch Real CRM Data
  useEffect(() => {
    const fetchCRM = async () => {
      setIsLoading(true);
      try {
        // Fetch dados do DB Prisma via Backend NestJS
        const res = await fetch('http://localhost:3001/analytics/crm');
        if (res.ok) {
          const json = await res.json();
          setCustomers(json.customers || []);
        } else {
          setCustomers([]);
        }
      } catch (error) {
        console.error("Erro ao buscar CRM do DB:", error);
        setCustomers([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCRM();
  }, []);

  const handleExport = () => {
    if (customers.length === 0) return;

    const dataToExport = customers.map(c => ({
      Nome: c.name,
      Telefone: c.phone,
      'Total de Pedidos': c.totalOrders,
      'LTV (Gasto Total R$)': (c.totalSpent / 100).toFixed(2).replace('.', ','),
      'Última Visita': new Date(c.lastOrderDate).toLocaleDateString('pt-BR'),
      'Status VIP': (c.totalOrders >= 5 || c.totalSpent >= 30000) ? 'SIM' : 'NAO'
    }));

    exportToCsv("maestro_clientes_crm.csv", dataToExport);
  };

  const vipCount = customers.filter(c => c.totalOrders >= 5 || c.totalSpent >= 30000).length;

  return (
    <div className="min-h-screen p-6 lg:p-8 bg-[#050505] relative overflow-hidden">
      
      {/* Background Decorativo (Glow effect) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* Header Dashboard CRM */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-4xl font-black font-serif text-white tracking-tight">CRM</h1>
            <p className="mt-2 text-sm text-gray-400 tracking-widest uppercase font-semibold">
              Gestão de Relacionamento e Inteligência
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 bg-[#0a0a0a] border border-white/5 p-2 rounded-2xl">
            {/* Tenant Switcher */}
            <div className="flex bg-[#14151A] rounded-xl p-1 border border-white/5">
              <button 
                onClick={() => setActiveRole('ADMIN_GLOBAL')}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${activeRole === 'ADMIN_GLOBAL' ? 'bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'text-gray-500 hover:text-white'}`}
              >
                Admin Global
              </button>
              <button 
                onClick={() => setActiveRole('TENANT')}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${activeRole === 'TENANT' ? 'bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'text-gray-500 hover:text-white'}`}
              >
                Tenant Workspace
              </button>
            </div>

            <button
              onClick={handleExport}
              disabled={isLoading || customers.length === 0}
              className="inline-flex items-center justify-center px-6 py-2 text-xs font-black uppercase tracking-widest rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all active:scale-95 disabled:opacity-50"
            >
              Exportar CSV
            </button>
          </div>
        </div>

        {/* Mini KPIs CRM (Glassmorphism) */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-[#14151A]/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-white/10 transition-colors">
            <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-2">Base Total</p>
            <p className="text-4xl font-black text-white">{customers.length}</p>
          </div>
          
          <div className="bg-[#D4AF37]/5 backdrop-blur-md border border-[#D4AF37]/20 rounded-2xl p-6 shadow-[0_0_30px_rgba(212,175,55,0.05)] relative overflow-hidden group">
            <div className="absolute -right-8 -top-8 w-24 h-24 bg-[#D4AF37] rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold mb-2">High Value (VIP)</p>
            <p className="text-4xl font-black text-white">{vipCount}</p>
          </div>
          
          <div className="bg-[#14151A]/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-white/10 transition-colors">
            <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-2">Reengajamento</p>
            <p className="text-4xl font-black text-white">{customers.length - vipCount}</p>
          </div>
        </motion.div>

        {/* Tabela CRM - Só renderiza se for Workspace do Tenant */}
        <AnimatePresence mode="wait">
          {activeRole === 'TENANT' && (
            <motion.div 
              key="table"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {customers.length === 0 && !isLoading ? (
                <div className="flex flex-col items-center justify-center p-12 bg-[#14151A] rounded-2xl border border-white/5 mt-8">
                  <p className="text-gray-500 font-bold uppercase tracking-widest">Nenhum cliente real encontrado</p>
                  <p className="text-sm text-gray-600 mt-2">O banco de dados Prisma está limpo/sem mockups.</p>
                </div>
              ) : (
                <CustomerTable customers={customers} isLoading={isLoading} />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Visão de Super Admin (Múltiplos Tenants) */}
        <AnimatePresence mode="wait">
          {activeRole === 'ADMIN_GLOBAL' && (
             <motion.div 
               key="admin-view"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               className="mt-8 flex flex-col gap-6"
             >
               <div className="h-64 flex flex-col items-center justify-center border border-dashed border-[#D4AF37]/20 rounded-3xl bg-[#D4AF37]/5 backdrop-blur-sm shadow-[0_0_50px_rgba(212,175,55,0.05)]">
                 <h2 className="text-[#D4AF37] font-black uppercase tracking-widest text-xl mb-2">Visão Panorâmica (Super Admin)</h2>
                 <p className="text-gray-400 font-mono text-sm max-w-lg text-center leading-relaxed">
                   Aqui o Maestro OS visualiza o Lifetime Value de todos os Tenants (Restaurantes) operando na plataforma SaaS.
                 </p>
               </div>
             </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
