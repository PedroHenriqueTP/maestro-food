"use client";

import React, { useState, useEffect } from "react";
import { CustomerTable, Customer } from "@/components/crm/CustomerTable";
import { exportToCsv } from "@/lib/export-csv";
import { motion, AnimatePresence } from "framer-motion";

export default function CRMDashboard() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [executiveMode, setExecutiveMode] = useState(false);

  // Mocks de clientes para o MVP
  useEffect(() => {
    const fetchCRM = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      setCustomers([
        { id: "c1", name: "Fábio Souza", phone: "(11) 98888-7777", totalOrders: 12, totalSpent: 45000, lastOrderDate: new Date().toISOString() },
        { id: "c2", name: "Mariana Costa", phone: "(11) 97777-6666", totalOrders: 2, totalSpent: 12000, lastOrderDate: new Date(Date.now() - 86400000 * 5).toISOString() },
        { id: "c3", name: "Carlos Eduardo", phone: "(11) 95555-4444", totalOrders: 6, totalSpent: 31000, lastOrderDate: new Date(Date.now() - 86400000 * 12).toISOString() },
        { id: "c4", name: "Ana Beatriz", phone: "(11) 93333-2222", totalOrders: 1, totalSpent: 5500, lastOrderDate: new Date(Date.now() - 86400000 * 20).toISOString() },
      ]);
      
      setIsLoading(false);
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
          
          <div className="flex items-center gap-4">
            {/* Toggle Executive Mode */}
            <label className="flex items-center gap-3 cursor-pointer group">
              <span className={`text-xs font-bold uppercase tracking-widest transition-colors ${executiveMode ? 'text-[#D4AF37]' : 'text-gray-500'}`}>
                Modo Executivo
              </span>
              <div className="relative">
                <input 
                  type="checkbox" 
                  className="sr-only" 
                  checked={executiveMode}
                  onChange={(e) => setExecutiveMode(e.target.checked)}
                />
                <div className={`block w-10 h-6 rounded-full transition-colors ${executiveMode ? 'bg-[#D4AF37]' : 'bg-gray-800'}`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${executiveMode ? 'transform translate-x-4' : ''}`}></div>
              </div>
            </label>

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

        {/* Tabela CRM - AnimatePresence oculta a tabela se Modo Executivo estiver on */}
        <AnimatePresence mode="wait">
          {!executiveMode && (
            <motion.div 
              key="table"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <CustomerTable customers={customers} isLoading={isLoading} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Se o modo executivo estiver On, mostraremos gráficos hypoteticos ou apenas os KPIs */}
        <AnimatePresence mode="wait">
          {executiveMode && (
             <motion.div 
               key="executive-charts"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               className="h-64 flex items-center justify-center border border-dashed border-white/10 rounded-2xl bg-[#0a0a0a]/50 backdrop-blur-sm"
             >
               <p className="text-gray-500 font-mono text-sm">[ Espaço Reservado para o Chart de Retenção do Painel de Águia ]</p>
             </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
