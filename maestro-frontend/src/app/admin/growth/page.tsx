'use client';

import React, { useEffect, useState } from 'react';
import { useLeadsStore, Lead } from '../../../stores/useLeadsStore';

export default function GrowthKanbanPage() {
  const { leads, fetchLeads, moveLead, discardLead } = useLeadsStore();
  const [isSending, setIsSending] = useState<string[]>([]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const columns = [
    { id: 'MINING', title: 'Agent Scout (Mining)', accent: 'border-white/10' },
    { id: 'QUALIFICATION', title: 'Quality-Control', accent: 'border-yellow-500/30' },
    { id: 'ENGAGEMENT', title: 'Engajamento (WhatsApp)', accent: 'border-emerald-500/50' },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
    if (score >= 50) return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
    return 'text-red-400 bg-red-400/10 border-red-400/20';
  };

  const triggerAutoZap = async (lead: Lead) => {
    setIsSending(prev => [...prev, lead.id]);
    try {
      const res = await fetch('http://localhost:3001/growth/trigger-whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId: lead.id, phone: lead.phone })
      });
      if (res.ok) {
        moveLead(lead.id, 'ENGAGEMENT');
      } else {
        console.error('Falha ao disparar N8N');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSending(prev => prev.filter(id => id !== lead.id));
    }
  };

  const renderLeadCard = (lead: Lead) => {
    const isLeadSending = isSending.includes(lead.id);

    return (
    <div key={lead.id} className="p-4 rounded-xl bg-black/60 border border-white/5 backdrop-blur-md shadow-2xl hover:border-white/20 transition-all duration-300 group relative">
      {isLeadSending && (
        <div className="absolute inset-0 z-10 bg-black/80 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center">
          <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mb-2"></div>
          <span className="text-[10px] text-emerald-400 font-mono">ENVIANDO N8N...</span>
        </div>
      )}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="text-white font-semibold text-sm">{lead.name}</h4>
          <span className="text-xs text-gray-400">{lead.category}</span>
        </div>
        <div className={`px-2 py-1 rounded-md border text-xs font-bold ${getScoreColor(lead.score)}`}>
          {lead.score} pts
        </div>
      </div>
      
      <div className="text-xs text-gray-300 mb-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        {lead.phone}
      </div>

      <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {lead.status === 'MINING' && (
          <button 
            onClick={() => moveLead(lead.id, 'QUALIFICATION')}
            className="flex-1 bg-yellow-500/20 hover:bg-yellow-500/40 text-yellow-400 border border-yellow-500/30 rounded-lg text-xs py-1.5 transition-colors"
          >
            Qualificar
          </button>
        )}
        {lead.status === 'QUALIFICATION' && (
          <button 
            onClick={() => triggerAutoZap(lead)}
            disabled={isLeadSending}
            className="flex-1 bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs py-1.5 transition-colors disabled:opacity-50"
          >
            Aprovar (Auto-ZAP)
          </button>
        )}
        <button 
          onClick={() => discardLead(lead.id)}
          className="flex-1 bg-red-500/10 hover:bg-red-500/30 text-red-400 border border-red-500/20 rounded-lg text-xs py-1.5 transition-colors"
        >
          Descartar
        </button>
      </div>
    </div>
    );
  };

  return (
    <div className="min-h-screen p-8 pt-24 bg-[#050505] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
            Painel Growth & Leads
          </h1>
          <p className="text-gray-400 text-sm mt-2">Cockpit de Caça - Gerencie o fluxo de expansão do seu CRM (Sprint 12-B)</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map(col => (
            <div key={col.id} className={`flex flex-col bg-white/[0.02] border ${col.accent} rounded-2xl p-4 min-h-[70vh]`}>
              <div className="flex justify-between items-center mb-6 px-2">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">{col.title}</h3>
                <span className="bg-white/10 px-2 py-0.5 rounded-full text-xs font-mono">
                  {leads.filter(l => l.status === col.id).length}
                </span>
              </div>
              
              <div className="flex flex-col gap-4 flex-1">
                {leads.filter(l => l.status === col.id).map(renderLeadCard)}
                {leads.filter(l => l.status === col.id).length === 0 && (
                  <div className="flex-1 flex items-center justify-center border-2 border-dashed border-white/5 rounded-xl">
                    <p className="text-xs text-gray-500">Nenhum lead nesta etapa.</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
