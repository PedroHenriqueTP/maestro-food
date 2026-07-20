"use client";

import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { motion, AnimatePresence } from "framer-motion";
import { DollarSign, ArrowDownRight, ArrowUpRight, Wallet, Activity, Search, Filter } from "lucide-react";

interface Transaction {
  id: string;
  description: string;
  date: string;
  status: string;
  amount: number;
  type: 'INCOME' | 'EXPENSE' | 'UNKNOWN';
  account: string;
  method: string;
}

interface FinanceData {
  transactions: Transaction[];
  kpis: {
    revenue: number;
    expense: number;
    profit: number;
    pendingPayable: number;
  };
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value / 100);
};

export default function FinanceDashboard() {
  const [activeRole, setActiveRole] = useState<'ADMIN_GLOBAL' | 'TENANT'>('TENANT');
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<FinanceData>({ transactions: [], kpis: { revenue: 0, expense: 0, profit: 0, pendingPayable: 0 } });

  useEffect(() => {
    const fetchFinance = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('http://localhost:3001/analytics/finance');
        if (res.ok) {
          const json = await res.json();
          setData(json.finance || { transactions: [], kpis: { revenue: 0, expense: 0, profit: 0, pendingPayable: 0 } });
        }
      } catch (error) {
        console.error("Erro ao buscar dados financeiros:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFinance();
  }, []);

  return (
    <AdminLayout>
      <div className="min-h-screen p-6 lg:p-8 relative overflow-hidden">
        {/* Glow Background */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-900/5 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto space-y-8 relative z-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/10 pb-6">
            <div>
              <h1 className="text-4xl font-black font-serif text-white tracking-tight flex items-center gap-3">
                <Wallet className="w-8 h-8 text-[#D4AF37]" /> LEDGER CAIXA
              </h1>
              <p className="mt-2 text-sm text-gray-400 tracking-widest uppercase font-semibold">
                Controle Financeiro de Partidas Dobradas
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
                  Caixa Restaurante
                </button>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeRole === 'ADMIN_GLOBAL' && (
              <motion.div 
                key="admin-finance"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="h-96 flex flex-col items-center justify-center border border-dashed border-[#D4AF37]/20 rounded-3xl bg-[#D4AF37]/5 backdrop-blur-sm"
              >
                <Activity className="w-12 h-12 text-[#D4AF37] mb-4 opacity-50" />
                <h2 className="text-[#D4AF37] font-black uppercase tracking-widest text-xl mb-2">Visão Holding (SaaS)</h2>
                <p className="text-gray-400 font-mono text-sm max-w-lg text-center leading-relaxed">
                  Agregação de GMV, Taxas Retidas, Assinaturas e Payouts de todos os tenants conectados à plataforma.
                </p>
              </motion.div>
            )}

            {activeRole === 'TENANT' && (
              <motion.div 
                key="tenant-finance"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* KPIs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Faturamento */}
                  <div className="bg-[#14151A]/80 backdrop-blur-md border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-[#D4AF37]/50 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <p className="text-xs uppercase tracking-widest text-gray-500 font-bold">Receita (Período)</p>
                      <ArrowUpRight className="w-4 h-4 text-green-500" />
                    </div>
                    <p className="text-3xl font-black text-white">{formatCurrency(data.kpis.revenue)}</p>
                  </div>
                  
                  {/* Despesas */}
                  <div className="bg-[#14151A]/80 backdrop-blur-md border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-red-500/50 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <p className="text-xs uppercase tracking-widest text-gray-500 font-bold">Despesas pagas</p>
                      <ArrowDownRight className="w-4 h-4 text-red-500" />
                    </div>
                    <p className="text-3xl font-black text-white">{formatCurrency(data.kpis.expense)}</p>
                  </div>

                  {/* Lucro */}
                  <div className="bg-[#D4AF37]/10 backdrop-blur-md border border-[#D4AF37]/30 rounded-2xl p-6 relative overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.05)]">
                    <div className="absolute -right-8 -top-8 w-24 h-24 bg-[#D4AF37] rounded-full blur-2xl opacity-20"></div>
                    <div className="flex justify-between items-start mb-4">
                      <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">Lucro Líquido</p>
                      <DollarSign className="w-4 h-4 text-[#D4AF37]" />
                    </div>
                    <p className="text-3xl font-black text-white">{formatCurrency(data.kpis.profit)}</p>
                  </div>

                  {/* Contas a Pagar */}
                  <div className="bg-[#14151A]/80 backdrop-blur-md border border-orange-500/20 rounded-2xl p-6 relative overflow-hidden">
                    <div className="flex justify-between items-start mb-4">
                      <p className="text-xs uppercase tracking-widest text-orange-500 font-bold">A Pagar (Pendente)</p>
                      <Activity className="w-4 h-4 text-orange-500" />
                    </div>
                    <p className="text-3xl font-black text-white">{formatCurrency(data.kpis.pendingPayable)}</p>
                  </div>
                </div>

                {/* Tabela de Transações */}
                <div className="bg-[#14151A]/60 backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                  <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0a0a0a]/50">
                    <h2 className="text-lg font-bold text-white uppercase tracking-widest flex items-center gap-2">
                      Histórico do Ledger <span className="bg-white/10 text-xs px-2 py-0.5 rounded-full text-gray-400 font-mono">{data.transactions.length}</span>
                    </h2>
                    
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <div className="relative flex-1 sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input 
                          type="text" 
                          placeholder="Buscar transação..." 
                          className="w-full bg-[#1A1C23] border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37] transition-colors"
                        />
                      </div>
                      <button className="bg-[#1A1C23] border border-white/10 p-2 rounded-xl text-gray-400 hover:text-white hover:border-white/20 transition-colors">
                        <Filter className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {isLoading ? (
                    <div className="p-12 flex justify-center">
                      <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : data.transactions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-16 text-center">
                      <Wallet className="w-12 h-12 text-gray-700 mb-4" />
                      <p className="text-gray-400 font-bold uppercase tracking-widest">Nenhuma transação no Ledger</p>
                      <p className="text-sm text-gray-600 mt-2 max-w-md">O banco de dados não possui lançamentos contábeis. (Conecte o iFood ou faça pedidos no PDV para gerar movimentações).</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto custom-scrollbar">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-[#050505]/50 border-b border-white/5">
                            <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Data</th>
                            <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Descrição</th>
                            <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Conta Contábil</th>
                            <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Método</th>
                            <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap text-right">Valor</th>
                            <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap text-center">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.transactions.map((tx) => (
                            <tr key={tx.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                              <td className="p-4 text-sm text-gray-400 font-mono whitespace-nowrap">
                                {new Date(tx.date).toLocaleDateString('pt-BR')} <span className="text-gray-600 ml-1">{new Date(tx.date).toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'})}</span>
                              </td>
                              <td className="p-4">
                                <p className="text-sm font-bold text-white group-hover:text-[#D4AF37] transition-colors">{tx.description}</p>
                              </td>
                              <td className="p-4">
                                <span className="inline-flex items-center px-2 py-1 rounded bg-white/5 text-xs text-gray-400 font-mono">
                                  {tx.account}
                                </span>
                              </td>
                              <td className="p-4 text-sm text-gray-400 whitespace-nowrap">
                                {tx.method}
                              </td>
                              <td className={`p-4 text-sm font-bold text-right whitespace-nowrap ${tx.type === 'INCOME' ? 'text-green-500' : tx.type === 'EXPENSE' ? 'text-red-500' : 'text-gray-400'}`}>
                                {tx.type === 'INCOME' ? '+' : tx.type === 'EXPENSE' ? '-' : ''} {formatCurrency(tx.amount)}
                              </td>
                              <td className="p-4 text-center">
                                <span className={`inline-block px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full ${
                                  tx.status === 'POSTED' ? 'bg-green-500/10 text-green-500' : 
                                  tx.status === 'PENDING' ? 'bg-orange-500/10 text-orange-500' : 
                                  'bg-gray-500/10 text-gray-500'
                                }`}>
                                  {tx.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </AdminLayout>
  );
}
