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
import { Activity, TrendingUp, AlertCircle, Filter, Download, LineChart as LineChartIcon } from 'lucide-react';

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
    <div className="min-h-screen p-8 bg-transparent text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header do Painel */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Activity className="w-8 h-8 text-[#D4AF37]" /> Painel Executivo (BI)
            </h1>
            <p className="text-gray-400 text-sm mt-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-gray-500" /> Inteligência Financeira e Projeção de Growth (Sprint 13)
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-sm font-medium transition-colors">
              <Filter className="w-4 h-4" /> Filtros Avançados
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 hover:bg-[#D4AF37]/20 text-[#D4AF37] text-sm font-medium transition-colors shadow-[0_0_15px_rgba(212,175,55,0.1)]">
              <Download className="w-4 h-4" /> Exportar Relatório
            </button>
          </div>
        </div>

        {/* Top KPIs (Scorecards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#14151A]/80 border border-white/5 rounded-3xl p-6 backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[50px] group-hover:bg-white/10 transition-colors" />
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white/20"></span> MRR Atual
            </h3>
            <p className="text-4xl font-bold text-white mt-4">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(currentMRR)}
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-[#1A1814] to-[#14151A]/80 border border-[#D4AF37]/20 rounded-3xl p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(212,175,55,0.05)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-[50px] group-hover:bg-[#D4AF37]/20 transition-colors" />
            <h3 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> MRR Projetado (Pipeline)
            </h3>
            <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-amber-200 mt-4">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(projectedMRR)}
            </p>
            <div className="mt-4 inline-flex items-center px-2.5 py-1 rounded-md bg-[#25D366]/10 border border-[#25D366]/20">
              <p className="text-[10px] font-bold text-[#25D366] uppercase tracking-wider">+{(projectedMRR - currentMRR).toLocaleString('pt-BR')} BRL em Negociação</p>
            </div>
          </div>

          <div className="bg-[#14151A]/80 border border-white/5 rounded-3xl p-6 backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-[50px] group-hover:bg-emerald-500/10 transition-colors" />
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500/50"></span> Conversão Growth
            </h3>
            <p className="text-4xl font-bold text-emerald-400 mt-4">{conversionRate}%</p>
          </div>
        </div>

        {/* Gráficos Principais */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Radar de MRR (Area Chart) */}
          <div className="lg:col-span-2 bg-[#14151A]/80 border border-white/5 rounded-3xl p-8 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                <LineChartIcon className="w-5 h-5 text-gray-300" />
              </div>
              <h3 className="text-lg font-bold text-white tracking-wide">Radar de Receita <span className="text-gray-500 font-normal">(6 Meses)</span></h3>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timeSeries} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorMrr" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis dataKey="month" stroke="#ffffff40" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                  <YAxis stroke="#ffffff40" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `R$ ${val/1000}k`} dx={-10} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0B0C10', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}
                    itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="mrr" stroke="#D4AF37" strokeWidth={4} fillOpacity={1} fill="url(#colorMrr)" />
                  <Area type="monotone" dataKey="projected" stroke="#25D366" strokeWidth={2} strokeDasharray="6 6" fill="none" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Funil de Crescimento (Bar Chart) */}
          <div className="bg-[#14151A]/80 border border-white/5 rounded-3xl p-8 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                <Filter className="w-5 h-5 text-gray-300" />
              </div>
              <h3 className="text-lg font-bold text-white tracking-wide">Funil de Growth</h3>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={funnel} layout="vertical" margin={{ top: 0, right: 30, left: 30, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff03" horizontal={true} vertical={false} />
                  <XAxis type="number" hide />
                  <YAxis dataKey="stage" type="category" stroke="#ffffff60" fontSize={11} tickLine={false} axisLine={false} fontWeight="bold" />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                    contentStyle={{ backgroundColor: '#0B0C10', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  />
                  <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={20}>
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
