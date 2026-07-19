"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface ResultNodeProps {
  label: string;
  value: string;
  trend: 'up' | 'down' | 'neutral';
}

export function ResultNode({ label, value, trend }: ResultNodeProps) {
  const getTrendColor = () => {
    switch(trend) {
      case 'up': return 'text-green-400';
      case 'down': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getTrendIcon = () => {
    switch(trend) {
      case 'up': return '↑';
      case 'down': return '↓';
      default: return '-';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      className="bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col items-center justify-center min-w-[120px]"
    >
      <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1 text-center">{label}</span>
      <span className="text-2xl font-extrabold text-white">{value}</span>
      <span className={`text-xs mt-1 font-bold ${getTrendColor()}`}>
        {getTrendIcon()}
      </span>
    </motion.div>
  );
}
