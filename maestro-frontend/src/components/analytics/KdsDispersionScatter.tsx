"use client";

import React from "react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

// Dados hipotéticos dos tempos de preparo da cozinha (Eixo X = Minuto da hora atual, Y = Tempo de preparo)
const data = [
  { time: 5, prepTime: 12, size: 200, category: 'normal' },
  { time: 10, prepTime: 14, size: 200, category: 'normal' },
  { time: 15, prepTime: 11, size: 200, category: 'normal' },
  { time: 20, prepTime: 25, size: 400, category: 'bottleneck' }, // Gargalo
  { time: 22, prepTime: 28, size: 400, category: 'bottleneck' }, // Gargalo
  { time: 25, prepTime: 18, size: 200, category: 'normal' },
  { time: 30, prepTime: 8, size: 100, category: 'fast' },
  { time: 35, prepTime: 9, size: 100, category: 'fast' },
  { time: 40, prepTime: 35, size: 600, category: 'critical' }, // Gargalo Severo (Outlier)
  { time: 45, prepTime: 15, size: 200, category: 'normal' },
  { time: 50, prepTime: 13, size: 200, category: 'normal' },
  { time: 55, prepTime: 14, size: 200, category: 'normal' },
];

export function KdsDispersionScatter() {
  return (
    <div className="w-full h-full min-h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis 
            type="number" 
            dataKey="time" 
            name="Minuto da Hora" 
            unit="m"
            stroke="#6b7280" 
            tick={{ fill: '#6b7280', fontSize: 12 }} 
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            type="number" 
            dataKey="prepTime" 
            name="Tempo de Preparo" 
            unit="m"
            stroke="#6b7280" 
            tick={{ fill: '#6b7280', fontSize: 12 }} 
            tickLine={false}
            axisLine={false}
          />
          <Tooltip 
            cursor={{ strokeDasharray: '3 3', stroke: 'rgba(212,175,55,0.3)' }}
            contentStyle={{ backgroundColor: '#0B0C10', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
          />
          <Scatter name="Pedidos" data={data}>
            {data.map((entry, index) => {
              // Colorização guiada pela IA baseada na categoria
              let color = "#D4AF37"; // Fast/Normal = Dourado
              if (entry.category === 'bottleneck') color = "#f97316"; // Laranja
              if (entry.category === 'critical') color = "#ef4444"; // Vermelho sangue (Atraso crítico)

              return <Cell key={`cell-${index}`} fill={color} />;
            })}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
