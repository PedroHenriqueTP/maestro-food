"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export interface FlashSaleBannerProps {
  title: string;
  description: string;
  discount: string;
  timeRemaining?: string;
  onAction?: () => void;
}

export function FlashSaleBanner({ title, description, discount, timeRemaining = '00:59:59', onAction }: FlashSaleBannerProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden bg-gradient-to-r from-red-900 to-[#0a0a0a] rounded-2xl p-6 md:p-10 border border-red-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_50px_rgba(220,38,38,0.15)]"
    >
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-600/20 rounded-full blur-3xl mix-blend-screen" />
      
      <div className="flex-1 z-10">
        <span className="inline-block px-3 py-1 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-4 animate-pulse">
          Flash Sale Ativa
        </span>
        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-2 font-serif">
          {title} <span className="text-[#D4AF37]">{discount} OFF</span>
        </h2>
        <p className="text-gray-300 max-w-xl text-sm md:text-base">
          {description}
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 z-10 w-full md:w-auto">
        <div className="text-center bg-[#050505]/80 backdrop-blur-sm px-6 py-3 rounded-xl border border-red-500/20 w-full md:w-auto">
          <span className="block text-[10px] text-red-400 uppercase tracking-widest mb-1">Termina em</span>
          <span className="text-2xl font-mono font-bold text-white tracking-widest">{timeRemaining}</span>
        </div>
        <Button variant="primary" size="lg" onClick={onAction} className="w-full uppercase tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.4)]">
          Resgatar Oferta
        </Button>
      </div>
    </motion.div>
  );
}
