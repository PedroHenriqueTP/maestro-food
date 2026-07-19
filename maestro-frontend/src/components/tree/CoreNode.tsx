"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useTreeStore } from '@/lib/store/treeStore';

export function CoreNode() {
  const { coreHealth, tenantId } = useTreeStore();

  return (
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
      className={`relative p-8 rounded-full border-4 flex flex-col items-center justify-center w-48 h-48 mx-auto shadow-[0_0_50px_rgba(212,175,55,0.2)] ${
        coreHealth === 'OPTIMAL' ? 'border-[#D4AF37] bg-white/5' : 'border-red-500 bg-red-500/10'
      }`}
    >
      <span className="text-[#D4AF37] font-extrabold tracking-widest uppercase text-sm mb-2">MAESTRO</span>
      <span className="text-white text-xl font-bold">Intelligence HQ</span>
      <span className="text-gray-400 text-xs mt-2">{tenantId ? `Tenant: ${tenantId}` : 'Aguardando Provisionamento'}</span>
      
      {/* Pulso de Vida */}
      <div className={`absolute -inset-4 rounded-full opacity-30 animate-ping ${coreHealth === 'OPTIMAL' ? 'bg-[#D4AF37]' : 'bg-red-500'}`}></div>
    </motion.div>
  );
}
