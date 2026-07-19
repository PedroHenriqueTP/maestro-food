"use client";

import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Dados Hipotéticos projetados pela Inteligência
const data = [
  { name: "Seg", opex: 1200, profit: 900, breakEven: 1200 },
  { name: "Ter", opex: 1200, profit: 1300, breakEven: 1200 },
  { name: "Qua", opex: 1250, profit: 1600, breakEven: 1250 },
  { name: "Qui", opex: 1300, profit: 2400, breakEven: 1300 },
  { name: "Sex", opex: 1800, profit: 4500, breakEven: 1800 },
  { name: "Sáb", opex: 2000, profit: 6200, breakEven: 2000 },
  { name: "Dom", opex: 1500, profit: 3800, breakEven: 1500 },
];

export function OpexProfitAreaChart() {
  return (
    <div className="w-full h-full min-h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 0,
          }}
        >
          <defs>
            {/* Gradiente Dourado da Receita Líquida */}
            <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
            </linearGradient>
            {/* Gradiente Vermelho Sangue do OPEX */}
            <linearGradient id="colorOpex" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="#6b7280" 
            tick={{ fill: '#6b7280', fontSize: 12 }} 
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="#6b7280" 
            tick={{ fill: '#6b7280', fontSize: 12 }} 
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `R$${value/1000}k`}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0B0C10', borderColor: 'rgba(212,175,55,0.2)', borderRadius: '12px', color: '#fff' }}
            itemStyle={{ color: '#D4AF37' }}
          />
          <Area 
            type="monotone" 
            dataKey="opex" 
            name="OPEX (Custo Fixo/Variável)"
            stroke="#ef4444" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorOpex)" 
          />
          <Area 
            type="monotone" 
            dataKey="profit" 
            name="Receita Líquida (LTV)"
            stroke="#D4AF37" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorProfit)" 
            activeDot={{ r: 6, fill: '#D4AF37', stroke: '#0B0C10', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
