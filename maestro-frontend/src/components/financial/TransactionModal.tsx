"use client";

import React, { useState } from "react";
import { apiClient } from "@/lib/api-client";

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function TransactionModal({ isOpen, onClose, onSuccess }: TransactionModalProps) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const numericAmount = Math.round(parseFloat(amount) * 100); // Converte para centavos
      if (isNaN(numericAmount) || numericAmount <= 0) {
        throw new Error("Valor inválido");
      }

      // Payload que respeita o Double-Entry Engine (Débito e Crédito)
      const payload = {
        description,
        date: new Date().toISOString(),
        entries: [
          {
            accountId: "conta-caixa-uuid", // Mockado no MVP
            type: "DEBIT",
            amount: numericAmount,
          },
          {
            accountId: "conta-receita-uuid", // Mockado no MVP
            type: "CREDIT",
            amount: numericAmount,
          },
        ],
      };

      await apiClient("/ledger/transactions", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      setDescription("");
      setAmount("");
      onSuccess();
    } catch (err: any) {
      setError(err.message || "Erro ao criar transação");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
      <div className="bg-white dark:bg-[#1A1C23] w-full max-w-md rounded-xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden transform transition-all">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Nova Transação</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500 focus:outline-none">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-sm rounded-md border border-red-200 dark:border-red-800">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descrição</label>
            <input
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Venda Mesa 04"
              className="w-full px-3 py-2 bg-transparent border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] dark:text-white sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Valor (R$)</label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0,00"
              className="w-full px-3 py-2 bg-transparent border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] dark:text-white sm:text-sm"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-transparent border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white rounded-md shadow-sm hover:opacity-90 focus:outline-none transition-opacity flex items-center justify-center"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                "Registrar Lançamento"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
