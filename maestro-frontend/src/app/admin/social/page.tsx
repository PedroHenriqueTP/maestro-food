"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SocialLog {
  id: string;
  type: 'achievement' | 'alert' | 'provisioning';
  content: string;
  timestamp: string;
}

export default function MaestroSocialHQ() {
  const [logs, setLogs] = useState<SocialLog[]>([]);

  // Simula o AgentObserver gerando logs
  useEffect(() => {
    const initialLogs: SocialLog[] = [
      {
        id: '1',
        type: 'provisioning',
        content: '🤖 The Hive: Novo Tenant "Restaurante Central" provisionado com RLS. Latência O(1) confirmada.',
        timestamp: new Date().toISOString()
      },
      {
        id: '2',
        type: 'achievement',
        content: '🏆 Code Janitor: Dívida técnica eliminada. 5 dependências fantasmas removidas do Backend.',
        timestamp: new Date().toISOString()
      }
    ];
    setLogs(initialLogs);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 p-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 border-b border-[#D4AF37]/20 pb-6">
          <h1 className="text-4xl font-extrabold text-[#D4AF37] uppercase tracking-tighter">Maestro Social HQ</h1>
          <p className="text-gray-500 text-sm mt-2">Onde o ecossistema documenta a própria evolução em tempo real.</p>
        </header>

        <div className="space-y-6">
          {logs.map((log, index) => (
            <motion.div 
              key={log.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col md:flex-row gap-6 items-start"
            >
              <div className="flex flex-col items-center justify-center min-w-[80px]">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                  log.type === 'achievement' ? 'border-[#D4AF37] text-[#D4AF37]' :
                  log.type === 'alert' ? 'border-red-500 text-red-500' : 'border-blue-500 text-blue-500'
                }`}>
                  {log.type === 'achievement' ? '★' : log.type === 'alert' ? '!' : '⚙'}
                </div>
                <span className="text-[10px] mt-2 text-gray-500 uppercase tracking-widest">{log.type}</span>
              </div>
              <div className="flex-1">
                <p className="text-lg text-white font-medium">{log.content}</p>
                <div className="mt-4 flex gap-4">
                  <button className="px-4 py-2 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 rounded-lg text-xs font-bold hover:bg-[#D4AF37]/20 transition-colors">
                    Gerar Post LinkedIn
                  </button>
                  <button className="px-4 py-2 bg-white/5 text-gray-300 border border-white/10 rounded-lg text-xs font-bold hover:bg-white/10 transition-colors">
                    Gerar Fio Twitter
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
