"use client";

import React from "react";

export interface Customer {
  id: string;
  name: string;
  phone: string;
  totalOrders: number;      // Frequência
  totalSpent: number;       // Monetário
  lastOrderDate: string;    // Recência
}

interface CustomerTableProps {
  customers: Customer[];
  isLoading?: boolean;
}

export function CustomerTable({ customers, isLoading }: CustomerTableProps) {
  
  // Função que simula o algoritmo RFM no Front-end 
  const isVip = (customer: Customer) => {
    // Para o MVP: Frequência Alta (> 5 pedidos) OU Ticket Alto (> 300 reais em compras)
    return customer.totalOrders >= 5 || customer.totalSpent >= 30000; 
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value / 100);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  };

  return (
    <div className="w-full overflow-auto bg-[#14151A] border border-gray-800 rounded-xl shadow-2xl">
      <table className="w-full text-sm text-left text-gray-400">
        <thead className="text-xs uppercase bg-[#0B0C10] text-gray-500 border-b border-gray-800">
          <tr>
            <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Cliente</th>
            <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Contato</th>
            <th scope="col" className="px-6 py-4 font-semibold tracking-wider text-center">Pedidos</th>
            <th scope="col" className="px-6 py-4 font-semibold tracking-wider text-right">LTV (Total Gasto)</th>
            <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Última Visita</th>
            <th scope="col" className="px-6 py-4 font-semibold tracking-wider text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={6} className="px-6 py-8 text-center text-gray-600">
                <div className="flex justify-center items-center gap-3">
                  <span className="w-5 h-5 border-2 border-gray-600 border-t-[var(--color-primary)] rounded-full animate-spin"></span>
                  Carregando CRM...
                </div>
              </td>
            </tr>
          ) : customers.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                Nenhum cliente cadastrado.
              </td>
            </tr>
          ) : (
            customers.map((customer) => {
              const vip = isVip(customer);
              return (
                <tr key={customer.id} className="bg-[#14151A] border-b border-gray-800 hover:bg-[#1A1C23] transition-colors group">
                  <td className="px-6 py-4 font-medium text-gray-200">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${vip ? 'bg-[var(--color-primary)] text-white shadow-[0_0_10px_var(--color-primary)] opacity-80' : 'bg-gray-800 text-gray-400'}`}>
                        {customer.name.charAt(0).toUpperCase()}
                      </div>
                      {customer.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-gray-400">
                    {customer.phone}
                  </td>
                  <td className="px-6 py-4 text-center font-bold text-gray-300">
                    {customer.totalOrders}
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-gray-200">
                    {formatCurrency(customer.totalSpent)}
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    {formatDate(customer.lastOrderDate)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {vip ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-[var(--color-primary)]/20 text-[var(--color-primary)] border border-[var(--color-primary)]/30 shadow-[0_0_5px_var(--color-primary)]">
                        ⭐ VIP
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-800 text-gray-400">
                        Regular
                      </span>
                    )}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
