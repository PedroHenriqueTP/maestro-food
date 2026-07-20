"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LineChart, BarChart3, TrendingUp, Clock, AlertTriangle, ChevronRight, Zap, Target, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { AdminLayout } from "@/components/layout/AdminLayout";

export default function Dashboard() {
  const router = useRouter();
  const [kpis, setKpis] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchKpis = async () => {
      try {
        const res = await fetch('http://localhost:3001/analytics/kpis');
        if (res.ok) {
          const data = await res.json();
          setKpis(data);
        }
      } catch (error) {
        console.error("Erro fetch KPIs", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchKpis();
  }, []);

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <AdminLayout>
      {/* Glow Background */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#D4AF37] opacity-[0.03] rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="relative z-10 w-full">

        {/* Content Area */}
        <div className="flex-1 p-10 overflow-auto z-10 custom-scrollbar">
          
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-white uppercase tracking-widest font-serif">Métricas de Hoje</h2>
            <button className="flex items-center gap-2 text-[#D4AF37] text-xs font-bold uppercase tracking-widest hover:text-white transition-colors border border-[#D4AF37]/30 px-4 py-2 rounded-lg bg-[#D4AF37]/5">
              Baixar Relatório <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {isLoading ? (
            <div className="flex justify-center p-20">
              <span className="w-10 h-10 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></span>
            </div>
          ) : (
            <>
              {/* KPIs Primários */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div className="bg-[#14151A] border border-[#D4AF37]/30 p-6 rounded-3xl shadow-[0_0_30px_rgba(212,175,55,0.05)] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-[40px] group-hover:bg-[#D4AF37]/20 transition-colors"></div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-[10px] font-bold tracking-widest uppercase text-gray-400">GMV (Faturamento)</h3>
                    <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <p className="text-4xl font-black text-white tracking-tight">R$ 14.590</p>
                  <div className="mt-4 flex items-center gap-2 text-xs font-bold text-green-500 uppercase tracking-widest bg-green-500/10 w-fit px-2 py-1 rounded">
                    <ArrowUpRight className="w-3 h-3" /> +12% vs Ontem
                  </div>
                </div>

                <div className="bg-[#14151A] border border-white/5 p-6 rounded-3xl relative overflow-hidden">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-[10px] font-bold tracking-widest uppercase text-gray-400">Ticket Médio</h3>
                    <Target className="w-5 h-5 text-gray-500" />
                  </div>
                  <p className="text-4xl font-black text-white tracking-tight">R$ 185,50</p>
                  <div className="mt-4 flex items-center gap-2 text-xs font-bold text-red-400 uppercase tracking-widest bg-red-500/10 w-fit px-2 py-1 rounded">
                    <ArrowDownRight className="w-3 h-3" /> -2% vs Ontem
                  </div>
                </div>

                <div className="bg-[#14151A] border border-white/5 p-6 rounded-3xl relative overflow-hidden">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-[10px] font-bold tracking-widest uppercase text-gray-400">Tempo Médio KDS</h3>
                    <Clock className="w-5 h-5 text-gray-500" />
                  </div>
                  <p className="text-4xl font-black text-white tracking-tight">12m 45s</p>
                  <div className="mt-4 flex items-center gap-2 text-xs font-bold text-green-500 uppercase tracking-widest bg-green-500/10 w-fit px-2 py-1 rounded">
                    <ArrowDownRight className="w-3 h-3" /> 18% mais rápido
                  </div>
                </div>

                <div className="bg-[#14151A] border border-white/5 p-6 rounded-3xl relative overflow-hidden">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-[10px] font-bold tracking-widest uppercase text-gray-400">Taxa de Retenção</h3>
                    <Zap className="w-5 h-5 text-gray-500" />
                  </div>
                  <p className="text-4xl font-black text-white tracking-tight">42.8%</p>
                  <div className="mt-4 flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest bg-white/5 w-fit px-2 py-1 rounded">
                    Estável
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Insights AI */}
                <div className="lg:col-span-1 bg-[#14151A] border border-white/5 rounded-3xl p-6 flex flex-col">
                  <h3 className="text-sm font-bold tracking-widest uppercase text-[#D4AF37] mb-6 flex items-center gap-2">
                    <Zap className="w-5 h-5" /> Insights da Operação
                  </h3>
                  <div className="flex-1 space-y-4">
                    
                    <div className="bg-[#0B0C10] border border-green-500/30 p-4 rounded-2xl relative overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500"></div>
                      <h4 className="text-white font-bold text-sm mb-1">Horário de Pico Identificado</h4>
                      <p className="text-gray-400 text-xs leading-relaxed">Seu maior volume de vendas hoje foi entre 19h e 21h. Recomendamos aumentar a brigada neste horário amanhã.</p>
                    </div>

                    <div className="bg-[#0B0C10] border border-red-500/30 p-4 rounded-2xl relative overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
                      <h4 className="text-white font-bold text-sm mb-1 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-red-500" /> Alerta de Gargalo</h4>
                      <p className="text-gray-400 text-xs leading-relaxed">A estação "Fritadeira" está atrasando pedidos em média 4 minutos acima do padrão.</p>
                    </div>

                    <div className="bg-[#0B0C10] border border-[#D4AF37]/30 p-4 rounded-2xl relative overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#D4AF37]"></div>
                      <h4 className="text-white font-bold text-sm mb-1">Produto em Alta</h4>
                      <p className="text-gray-400 text-xs leading-relaxed">"Wagyu Burger" teve um salto de 30% nas vendas após a promoção de ontem.</p>
                    </div>

                  </div>
                </div>

                {/* Grafico Placeholder / Orquestração */}
                <div className="lg:col-span-2 bg-[#14151A] border border-white/5 rounded-3xl p-6 flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-sm font-bold tracking-widest uppercase text-white flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-gray-500" /> Evolução de Faturamento (Semanal)
                    </h3>
                  </div>
                  
                  {/* Mock Chart Area */}
                  <div className="flex-1 border border-white/5 rounded-2xl bg-[#0B0C10] flex items-end justify-between p-6 gap-2 h-64">
                    {[40, 70, 45, 90, 65, 100, 80].map((h, i) => (
                      <div key={i} className="w-full bg-[#14151A] rounded-t-lg relative group transition-all hover:bg-white/5" style={{ height: '100%' }}>
                        <div 
                          className="absolute bottom-0 w-full bg-gradient-to-t from-[#D4AF37]/20 to-[#D4AF37] rounded-t-lg transition-all duration-1000 group-hover:brightness-125"
                          style={{ height: `${h}%` }}
                        ></div>
                        <div className="absolute -bottom-6 w-full text-center text-[10px] font-bold text-gray-500 uppercase">
                          {['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM'][i]}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                </div>

              </div>
            </>
          )}

      </div>
    </AdminLayout>
  );
}
