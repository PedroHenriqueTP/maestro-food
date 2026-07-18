"use client";

import React, { useState } from "react";

interface AIInsight {
  id: string;
  title: string;
  description: string;
  actionType: string;
  severity: string;
}

interface AIRecommendationCardProps {
  insight: AIInsight;
}

export function AIRecommendationCard({ insight }: AIRecommendationCardProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const handleAction = (action: 'ACCEPTED' | 'DISMISSED') => {
    // Aqui chamaria a rota do NestJS para atualizar o status do insight
    // apiClient(`/api/v1/insights/${insight.id}`, { method: 'PATCH', body: JSON.stringify({ status: action }) })
    setIsVisible(false);
  };

  const getSeverityColor = () => {
    switch (insight.severity) {
      case 'CRITICAL': return 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.3)]';
      case 'HIGH': return 'border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.3)]';
      case 'MEDIUM': return 'border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.2)]';
      default: return 'border-[var(--color-primary)]/50 shadow-[0_0_15px_var(--color-primary)]';
    }
  };

  return (
    <div className={`relative bg-gradient-to-br from-[#1A1C23] to-[#0B0C10] border ${getSeverityColor()} rounded-xl p-6 overflow-hidden transition-all duration-500 hover:scale-[1.02]`}>
      
      {/* Sparkles / Magic Effect */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-[var(--color-primary)] rounded-full blur-3xl opacity-20 pointer-events-none"></div>

      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          {/* Magic Wand Icon */}
          <svg className="w-5 h-5 text-[var(--color-primary)] animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
          <h3 className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 uppercase tracking-widest">
            Maestro AI Insight
          </h3>
        </div>
        
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-800 text-gray-300">
          Automated
        </span>
      </div>
      
      <div className="mt-4">
        <h4 className="text-lg font-bold text-white mb-2">{insight.title}</h4>
        <p className="text-sm text-gray-400 leading-relaxed">
          {insight.description}
        </p>
      </div>
      
      <div className="mt-6 flex gap-3">
        <button 
          onClick={() => handleAction('ACCEPTED')}
          className="flex-1 py-2 px-4 rounded-lg text-sm font-bold text-[#0B0C10] transition-transform active:scale-95"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          Aplicar Sugestão
        </button>
        <button 
          onClick={() => handleAction('DISMISSED')}
          className="flex-1 py-2 px-4 rounded-lg text-sm font-bold text-gray-400 bg-gray-800/50 hover:bg-gray-800 transition-colors"
        >
          Ignorar
        </button>
      </div>
    </div>
  );
}
