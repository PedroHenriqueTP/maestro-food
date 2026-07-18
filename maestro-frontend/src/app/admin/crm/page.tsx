"use client";

import React, { useState, useEffect } from "react";
import { CustomerTable, Customer } from "@/components/crm/CustomerTable";
import { exportToCsv } from "@/lib/export-csv";

export default function CRMDashboard() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mocks de clientes para o MVP
  useEffect(() => {
    const fetchCRM = async () => {
      setIsLoading(true);
      // Simula uma ida ao backend
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

    // Formata os dados para ficarem bonitos no CSV
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
    <div className="min-h-screen p-6 lg:p-8 bg-[#0B0C10]">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Dashboard CRM */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Gestão de Clientes (CRM)</h1>
            <p className="mt-1 text-sm text-gray-400">
              A memória viva do seu restaurante. Fidelize quem mais compra.
            </p>
          </div>
          <button
            onClick={handleExport}
            disabled={isLoading || customers.length === 0}
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-bold rounded-lg shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0B0C10] transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            style={{ backgroundColor: "var(--color-primary)", boxShadow: "0 0 15px var(--color-primary)" }}
          >
            <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Exportar Lista (CSV)
          </button>
        </div>

        {/* Mini KPIs CRM */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#14151A] border border-gray-800 rounded-xl p-5">
            <p className="text-sm text-gray-500 font-medium">Total de Clientes</p>
            <p className="text-2xl font-bold text-white mt-1">{customers.length}</p>
          </div>
          <div className="bg-[#14151A] border border-[var(--color-primary)]/30 rounded-xl p-5 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-16 h-16 bg-[var(--color-primary)] rounded-full blur-2xl opacity-20"></div>
            <p className="text-sm text-[var(--color-primary)] font-medium">Clientes VIP (Alta Retenção)</p>
            <p className="text-2xl font-bold text-white mt-1">{vipCount}</p>
          </div>
          <div className="bg-[#14151A] border border-gray-800 rounded-xl p-5">
            <p className="text-sm text-gray-500 font-medium">Oportunidades de Reengajamento</p>
            <p className="text-2xl font-bold text-white mt-1">{customers.length - vipCount}</p>
          </div>
        </div>

        {/* Tabela CRM */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <CustomerTable customers={customers} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
