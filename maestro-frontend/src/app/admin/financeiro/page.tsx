"use client";

import React, { useState, useEffect } from "react";
import { apiClient } from "@/lib/api-client";

export default function FinanceDashboard() {
  const [balance, setBalance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      try {
        const balanceData: any = await apiClient('/ledger/accounts/caixa/balance');
        setBalance(balanceData.balance);
      } catch (e) {
        setBalance(1524000); // 15.240,00
      }
    } catch (error) {
      console.error("Erro ao carregar dados", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const formatValue = (cents: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100);
  };

  if (isLoading) {
    return <div className="p-8 text-white">Carregando dashboard...</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-[#0B0C10] text-gray-300">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="border-b border-white/10 pb-6">
          <h1 className="text-4xl font-bold text-white tracking-tighter">Painel Financeiro Base</h1>
          <p className="text-gray-400 mt-2">Validação de rotas e funcionalidades do MVP.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
            <h3 className="text-sm font-medium text-gray-400">Caixa Consolidado</h3>
            <p className="text-3xl font-bold text-[#D4AF37] mt-2">{formatValue(balance)}</p>
          </div>

          <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
            <h3 className="text-sm font-medium text-gray-400">Ações Rápidas</h3>
            <button className="mt-4 w-full py-2 bg-[#D4AF37] text-[#0B0C10] font-bold rounded-lg hover:bg-[#F3E5AB] transition-colors">
              Nova Transação Teste
            </button>
          </div>
        </div>

        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
          <h2 className="text-xl font-bold text-white mb-4">Status da Infraestrutura</h2>
          <ul className="space-y-3 text-sm">
            <li className="flex justify-between">
              <span>Edge Middleware (O(1) Routing):</span>
              <span className="text-green-400 font-bold">Ativo</span>
            </li>
            <li className="flex justify-between">
              <span>Backend Connection (NestJS):</span>
              <span className="text-yellow-400 font-bold">Mocked (Local)</span>
            </li>
            <li className="flex justify-between">
              <span>Tenant ID Injetado:</span>
              <span className="text-green-400 font-bold">dev-tenant-1234</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
