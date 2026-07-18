"use client";

import React from "react";

export interface Transaction {
  id: string;
  date: string;
  description: string;
  type: "DEBIT" | "CREDIT";
  amount: number;
  status: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
  isLoading?: boolean;
}

export function TransactionTable({ transactions, isLoading }: TransactionTableProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value / 100);
  };

  return (
    <div className="w-full overflow-auto bg-white dark:bg-[#1A1C23] border border-gray-100 dark:border-gray-800 rounded-xl shadow-sm">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#14151A] dark:text-gray-400 border-b border-gray-100 dark:border-gray-800">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium">Data</th>
            <th scope="col" className="px-6 py-4 font-medium">Descrição</th>
            <th scope="col" className="px-6 py-4 font-medium">Tipo</th>
            <th scope="col" className="px-6 py-4 font-medium text-right">Valor</th>
            <th scope="col" className="px-6 py-4 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                Carregando transações...
              </td>
            </tr>
          ) : transactions.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                Nenhuma transação encontrada no Ledger.
              </td>
            </tr>
          ) : (
            transactions.map((tx) => (
              <tr key={tx.id} className="bg-white dark:bg-[#1A1C23] border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#20232A] transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(tx.date).toLocaleDateString('pt-BR')}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {tx.description}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    tx.type === 'CREDIT' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {tx.type === 'CREDIT' ? 'CRÉDITO' : 'DÉBITO'}
                  </span>
                </td>
                <td className={`px-6 py-4 text-right font-mono font-medium ${tx.type === 'CREDIT' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {tx.type === 'CREDIT' ? '+' : '-'}{formatCurrency(tx.amount)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className={`h-2.5 w-2.5 rounded-full mr-2 ${tx.status === 'POSTED' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                    {tx.status}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
