"use client";

import React from "react";

interface FinancialSummaryCardProps {
  title: string;
  value: string;
  description?: string;
  trend?: "up" | "down" | "neutral";
}

export function FinancialSummaryCard({ title, value, description, trend }: FinancialSummaryCardProps) {
  return (
    <div className="bg-white dark:bg-[#1A1C23] border border-gray-100 dark:border-gray-800 rounded-xl p-6 shadow-sm flex flex-col justify-between transition-transform hover:-translate-y-1 hover:shadow-md">
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
        {/* Simple icon placeholder */}
        <div className="w-8 h-8 rounded-md flex items-center justify-center bg-gray-50 dark:bg-gray-800 text-[var(--color-primary)]">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
      
      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-3xl font-bold text-gray-900 dark:text-white" style={{ color: "var(--color-primary)" }}>
          {value}
        </span>
      </div>
      
      {description && (
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
          {trend === "up" && <span className="text-green-500">↑</span>}
          {trend === "down" && <span className="text-red-500">↓</span>}
          {trend === "neutral" && <span className="text-gray-400">-</span>}
          {description}
        </div>
      )}
    </div>
  );
}
