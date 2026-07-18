"use client";

import React, { useState, useEffect } from "react";
import { FinancialSummaryCard } from "@/components/financial/FinancialSummaryCard";
import { TransactionTable, Transaction } from "@/components/financial/TransactionTable";
import { TransactionModal } from "@/components/financial/TransactionModal";
import { apiClient } from "@/lib/api-client";
import { AIRecommendationCard } from "@/components/dashboard/AIRecommendationCard";

export default function FinanceDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [balance, setBalance] = useState<number>(0);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      // Em um MVP real, estas chamadas apontariam para o NestJS 
      // Por agora, mockamos o tempo de resposta se o backend não estiver rodando,
      // mas deixamos a chamada engatilhada.
      try {
        const balanceData: any = await apiClient('/ledger/accounts/caixa/balance');
        setBalance(balanceData.balance);
      } catch (e) {
        console.warn("Backend offline, mockando balance.", e);
        setBalance(1524000); // 15.240,00
      }

      // Simulando fetch de transações (se falhar usa mock)
      const mockTx: Transaction[] = [
        { id: "1", date: new Date().toISOString(), description: "Venda Salão #104", type: "CREDIT", amount: 25000, status: "POSTED" },
        { id: "2", date: new Date(Date.now() - 86400000).toISOString(), description: "Pagamento Fornecedor (Carnes)", type: "DEBIT", amount: 150000, status: "POSTED" },
      ];
      setTransactions(mockTx);
    } catch (error) {
      console.error("Erro ao carregar dados financeiros", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleTransactionSuccess = () => {
    setIsModalOpen(false);
    // Refresh da tabela e saldos
    fetchDashboardData();
  };

  // Formatação em Reais
  const formatValue = (cents: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100);
  };

  return (
    <div className="min-h-screen p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Painel Financeiro</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Visão consolidada do motor contábil (Partida Dobrada)
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-transform hover:scale-105"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Nova Transação
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <FinancialSummaryCard 
            title="Caixa Consolidado" 
            value={formatValue(balance)} 
            description="Saldo real validado por Partida Dobrada"
            trend="up"
          />
          <FinancialSummaryCard 
            title="Receita do Dia" 
            value={formatValue(25000)} 
            description="Até o momento"
            trend="up"
          />
          <FinancialSummaryCard 
            title="Contas a Pagar (Hoje)" 
            value={formatValue(150000)} 
            description="2 boletos vencendo hoje"
            trend="down"
          />
        </div>

        {/* AI Insight Area (Cérebro Preditivo) */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both">
          <AIRecommendationCard 
            insight={{
              id: "insight-001",
              title: "Anomalia de Custo Detectada: Bacon",
              description: "O custo médio de insumos relacionados a Carnes subiu 15% nas últimas 3 semanas. Sugerimos ajustar o preço do 'Combo Supremo' em R$ 3,00 para proteger a sua margem alvo de 20%.",
              actionType: "PRICE_ADJUSTMENT",
              severity: "HIGH"
            }} 
          />
        </div>

        {/* Table Area */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Últimas Movimentações (Ledger)</h2>
          <TransactionTable transactions={transactions} isLoading={isLoading} />
        </div>

      </div>

      <TransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={handleTransactionSuccess} 
      />
    </div>
  );
}
