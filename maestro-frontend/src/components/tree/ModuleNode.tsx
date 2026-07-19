"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useTreeStore } from '@/lib/store/treeStore';

interface ModuleNodeProps {
  moduleId: string;
}

export function ModuleNode({ moduleId }: ModuleNodeProps) {
  const { modules, toggleModule } = useTreeStore();
  const mod = modules[moduleId];

  if (!mod) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      onClick={() => toggleModule(moduleId)}
      className={`cursor-pointer p-6 rounded-2xl border backdrop-blur-md transition-all ${
        mod.active 
          ? `bg-white/10 shadow-[0_0_30px_rgba(255,255,255,0.1)]` 
          : 'bg-white/5 border-white/10 opacity-50'
      }`}
      style={{ borderColor: mod.active ? mod.color : 'rgba(255,255,255,0.1)' }}
    >
      <div className="flex items-center gap-4">
        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: mod.active ? mod.color : 'gray' }}></div>
        <span className="text-white font-bold text-lg">{mod.name}</span>
      </div>
      <p className="text-xs text-gray-400 mt-2 ml-8 uppercase tracking-widest font-bold">
        {mod.active ? 'Status: Operante' : 'Status: Inativo'}
      </p>
    </motion.div>
  );
}
