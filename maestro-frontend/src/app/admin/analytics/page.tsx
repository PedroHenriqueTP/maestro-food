'use client';

import React, { useEffect, useState } from 'react';
import { useAnalyticsStore } from '../../../stores/useAnalyticsStore';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

export default function AnalyticsPage() {
  const { currentMRR, projectedMRR, conversionRate, timeSeries, funnel, fetchKPIs } = useAnalyticsStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchKPIs();
  }, [fetchKPIs]);

  // Evita erro de hidratação com Recharts
  if (!mounted) return null;

  return (
    <div className="min-h-screen p-8 pt-24 bg-[#050505] text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header do Painel */}
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">
            Painel de Águia (BI)
          </h1>
          <p className="text-gray-400 text-sm mt-2">Inteligência Financeira e Projeção de Growth (Sprint 13)</p>
        </div>

        {/* Top KPIs (Scorecards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">MRR Atual</h3>
            <p className="text-4xl font-light text-white">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(currentMRR)}
            </p>
          </div>
          <div className="bg-white/[0.02] border border-amber-500/30 rounded-2xl p-6 backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.1)]">
            <h3 className="text-sm font-semibold text-amber-500/80 uppercase tracking-wider mb-2">MRR Projetado (Pipeline)</h3>
            <p className="text-4xl font-light text-amber-400">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(projectedMRR)}
            </p>
            <p className="text-xs text-amber-500/50 mt-2">+{(projectedMRR - currentMRR).toLocaleString('pt-BR')} BRL em Negociação</p>
          </div>
          <div className="bg-white/[0.02] border border-emerald-500/20 rounded-2xl p-6 backdrop-blur-md">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Taxa de Conversão Growth</h3>
            <p className="text-4xl font-light text-emerald-400">{conversionRate}%</p>
          </div>
        </div>

        {/* Gráficos Principais */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Radar de MRR (Area Chart) */}
          <div className="lg:col-span-2 bg-white/[0.02] border border-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-300 mb-6">Radar de Receita (6 Meses)</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timeSeries} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorMrr" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="month" stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `R$ ${val/1000}k`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="mrr" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorMrr)" />
                  <Area type="monotone" dataKey="projected" stroke="#34d399" strokeWidth={2} strokeDasharray="5 5" fill="none" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Funil de Crescimento (Bar Chart) */}
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-300 mb-6">Funil de Growth</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={funnel} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" horizontal={true} vertical={false} />
                  <XAxis type="number" hide />
                  <YAxis dataKey="stage" type="category" stroke="#ffffff80" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{ fill: '#ffffff05' }}
                    contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
                  />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={24}>
                    {funnel.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
