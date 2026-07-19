"use client";

import React, { useState, useEffect } from "react";
import { apiClient } from "@/lib/api-client";

interface ScoutDiff {
  id: string;
  title: string;
  description: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  impact: string;
  codeBefore: string;
  codeAfter: string;
}

export default function IntelligenceHQ() {
  const [activeTab, setActiveTab] = useState<'architecture' | 'growth' | 'audit' | 'procurement'>('architecture');
  const [diffs, setDiffs] = useState<ScoutDiff[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulando fetch. Como não ligamos a API ainda na porta, mockaremos no catch.
    const fetchDiffs = async () => {
      try {
        const data: any = await apiClient('/intelligence/diffs/pending');
        setDiffs(data);
      } catch (error) {
        // Fallback local caso backend mock não responda (para validar UI)
        setDiffs([
          {
            id: 'diff-001',
            title: 'Otimização de Edge Middleware',
            description: 'Substituição de string split por Expressão Regular nativa para reduzir latência de parsing do subdomínio em 12%.',
            riskLevel: 'LOW',
            impact: '-12% CPU usage na Borda',
            codeBefore: `const hostWithoutPort = host.split(':')[0];\nconst subdomain = hostWithoutPort.split('.')[0];`,
            codeAfter: `const subdomain = host.match(/^(?:https?:\\/\\/)?([^:.]+)/i)?.[1] || '';`,
          },
          {
            id: 'diff-002',
            title: 'Connection Pooling Preditivo',
            description: 'Implementação de loteamento de Promises (Promise.all) no serviço preditivo para evitar travamento da Event Loop.',
            riskLevel: 'MEDIUM',
            impact: '+45% throughput em análise batch',
            codeBefore: `for (const record of records) {\n  await this.analyze(record);\n}`,
            codeAfter: `await Promise.all(records.map(record => this.analyze(record)));`,
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDiffs();
  }, []);

  const handleApprove = (id: string) => {
    setDiffs(prev => prev.filter(d => d.id !== id));
    // Aqui seria disparado um webhook para o n8n fazer o 'git merge'
    alert(`Melhoria ${id} aprovada! Os agentes farão o merge na main.`);
  };

  const handleReject = (id: string) => {
    setDiffs(prev => prev.filter(d => d.id !== id));
  };

  const getRiskColor = (level: string) => {
    if (level === 'LOW') return 'text-green-400 bg-green-400/10 border-green-400/20';
    if (level === 'MEDIUM') return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
    return 'text-red-400 bg-red-400/10 border-red-400/20';
  };

  if (isLoading) return <div className="min-h-screen p-8 text-[#D4AF37]">Carregando Diffs...</div>;

  return (
    <div className="min-h-screen p-6 lg:p-8 bg-[#0B0C10] text-gray-300">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="border-b border-[#D4AF37]/30 pb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-[#D4AF37] tracking-tight flex items-center gap-3">
              <span className="animate-pulse">🧠</span> Intelligence HQ
            </h1>
            <p className="mt-1 text-sm text-gray-400">
              Human-in-the-Loop Gatekeeper: Controle as otimizações autônomas do Maestro.
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex gap-4">
              <button 
                onClick={() => setActiveTab('architecture')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'architecture' ? 'bg-[#D4AF37] text-black' : 'text-gray-400 hover:text-white border border-white/10'}`}
              >
                Arquitetura & Código
              </button>
              <button 
                onClick={() => setActiveTab('growth')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'growth' ? 'bg-[#D4AF37] text-black' : 'text-gray-400 hover:text-white border border-white/10'}`}
              >
                Neuromarketing & Growth
              </button>
              <button 
                onClick={() => setActiveTab('audit')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'audit' ? 'bg-[#D4AF37] text-black' : 'text-gray-400 hover:text-white border border-white/10'}`}
              >
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                Auditoria O(1)
              </button>
              <button 
                onClick={() => setActiveTab('procurement')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'procurement' ? 'bg-[#D4AF37] text-black' : 'text-gray-400 hover:text-white border border-white/10'}`}
              >
                <span className="text-sm">📦</span>
                Gestão 360° (Opex)
              </button>
            </div>
            
            <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2 mt-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              n8n Egress: LIVE
            </div>
          </div>
        </div>

        {activeTab === 'architecture' && (
          diffs.length === 0 ? (
            <div className="p-12 border border-white/10 rounded-2xl bg-white/5 text-center text-gray-500">
              Nenhuma melhoria pendente. A arquitetura está otimizada no estado da arte.
            </div>
          ) : (
            <div className="space-y-6">
            {diffs.map((diff) => (
              <div key={diff.id} className="border border-white/10 rounded-2xl bg-white/5 overflow-hidden shadow-2xl transition-all hover:border-[#D4AF37]/50">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        {diff.title}
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getRiskColor(diff.riskLevel)}`}>
                          RISK: {diff.riskLevel}
                        </span>
                      </h2>
                      <p className="text-sm text-gray-400 mt-1">{diff.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="block text-xs text-gray-500 uppercase tracking-wider">Impacto Estimado</span>
                      <span className="font-bold text-[#D4AF37]">{diff.impact}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-6">
                    <div className="rounded-lg bg-[#050505] border border-red-500/20 p-4 relative">
                      <div className="absolute top-0 right-0 bg-red-500/20 text-red-400 text-[10px] font-bold px-2 py-1 rounded-bl-lg">ANTES</div>
                      <pre className="text-xs font-mono text-red-300 overflow-x-auto mt-2">
                        <code>{diff.codeBefore}</code>
                      </pre>
                    </div>
                    <div className="rounded-lg bg-[#050505] border border-green-500/20 p-4 relative">
                      <div className="absolute top-0 right-0 bg-green-500/20 text-green-400 text-[10px] font-bold px-2 py-1 rounded-bl-lg">DEPOIS</div>
                      <pre className="text-xs font-mono text-green-300 overflow-x-auto mt-2">
                        <code>{diff.codeAfter}</code>
                      </pre>
                    </div>
                  </div>

                  <div className="flex gap-4 justify-end mt-4 pt-4 border-t border-white/5">
                    <button 
                      onClick={() => handleReject(diff.id)}
                      className="px-6 py-2 text-sm font-bold text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                      Rejeitar (Drop)
                    </button>
                    <button 
                      onClick={() => handleApprove(diff.id)}
                      className="px-6 py-2 text-sm font-bold bg-[#D4AF37] text-[#0B0C10] hover:bg-[#F3E5AB] rounded-lg shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all hover:scale-105"
                    >
                      Greenflag (Merge)
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )
        )}
        {activeTab === 'growth' && (
          <div className="space-y-6">
            <div className="border border-[#D4AF37]/30 rounded-2xl bg-[#D4AF37]/5 overflow-hidden shadow-2xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    Atrito de Checkout Detectado
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold border text-red-400 bg-red-400/10 border-red-400/20">
                      RISK: HIGH (PERDA DE MRR)
                    </span>
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">O Agente de Neuromarketing detectou 'Exit Intent' (Intenção de Saída) de 3 usuários na página de Checkout nos últimos 10 minutos. O tempo médio de hesitação antes do abandono foi de 42s.</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-black/40 rounded-lg border border-white/10">
                <h3 className="text-[#D4AF37] text-sm font-bold mb-2">Sugestão de Ação Autônoma:</h3>
                <p className="text-gray-300 text-sm">Aplicar Gatilho de Escassez: Adicionar um contador regressivo (15:00 min) garantindo a reserva do cluster de inteligência do cliente.</p>
              </div>
              <div className="flex gap-4 justify-end mt-6 pt-4 border-t border-white/5">
                <button className="px-6 py-2 text-sm font-bold text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                  Ignorar Tendência
                </button>
                <button className="px-6 py-2 text-sm font-bold bg-[#D4AF37] text-[#0B0C10] hover:bg-[#F3E5AB] rounded-lg shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all hover:scale-105">
                  Greenflag (Aplicar Escassez Automática)
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'audit' && (
          <div className="space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="border border-blue-500/30 rounded-2xl bg-blue-900/5 overflow-hidden shadow-2xl p-8 relative">
              <div className="absolute top-0 right-0 p-4">
                <div className="w-24 h-24 rounded-full border-4 border-blue-500/20 border-t-blue-500 flex items-center justify-center animate-spin-slow">
                  <span className="text-3xl animate-none">🛡️</span>
                </div>
              </div>
              
              <div className="max-w-2xl">
                <h2 className="text-2xl font-extrabold text-blue-400 mb-2">Certificação de Prontidão O(1)</h2>
                <p className="text-gray-400 text-sm mb-8">O Agente de Auditoria varreu a infraestrutura em busca de gargalos (N+1, Overengineering, Vazamento RLS).</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="p-4 bg-[#050505] rounded-xl border border-white/5">
                    <span className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Database (RLS)</span>
                    <span className="text-xl font-extrabold text-green-400">100% ISOLADO</span>
                  </div>
                  <div className="p-4 bg-[#050505] rounded-xl border border-white/5">
                    <span className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Anti N+1 Queries</span>
                    <span className="text-xl font-extrabold text-green-400">PASSOU</span>
                  </div>
                  <div className="p-4 bg-[#050505] rounded-xl border border-white/5">
                    <span className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Edge Latency (P99)</span>
                    <span className="text-xl font-extrabold text-green-400">{'<'}45ms</span>
                  </div>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-200 text-sm font-medium">
                  ✓ Veredito Oficial: A infraestrutura do MVP foi certificada. A arquitetura está aprovada para receber a orquestração massiva de webhooks (n8n) sem risco de colapso estrutural.
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'procurement' && (
          <div className="space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="border border-purple-500/30 rounded-2xl bg-purple-900/5 overflow-hidden shadow-2xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    Insights do Procurement Scout
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold border text-purple-400 bg-purple-400/10 border-purple-400/20">
                      OPORTUNIDADE DE CAPEX
                    </span>
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">O Agente de Negócios encontrou uma discrepância nos orçamentos de Embalagens.</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-black/40 rounded-lg border border-white/10">
                <h3 className="text-[#D4AF37] text-sm font-bold mb-2">Análise de Orçamento:</h3>
                <p className="text-gray-300 text-sm">O Fornecedor atual "Embalagens Gold" custou R$ 4.500 no último mês. Identificamos o fornecedor local "EcoPack" com classificação de 4.8 e cotação para o mesmo volume por R$ 3.800.</p>
                <div className="mt-3 p-3 bg-green-500/10 border border-green-500/20 rounded-md inline-block">
                  <span className="text-green-400 font-bold text-xs uppercase tracking-wider">Economia Estimada: R$ 700 / Mês</span>
                </div>
              </div>
              <div className="flex gap-4 justify-end mt-6 pt-4 border-t border-white/5">
                <button className="px-6 py-2 text-sm font-bold text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                  Manter Fornecedor Atual
                </button>
                <button className="px-6 py-2 text-sm font-bold bg-[#D4AF37] text-[#0B0C10] hover:bg-[#F3E5AB] rounded-lg shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all hover:scale-105">
                  Greenflag (Redirecionar Opex)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
