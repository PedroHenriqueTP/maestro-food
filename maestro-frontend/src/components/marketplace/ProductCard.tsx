"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  description?: string;
  badges?: string[];
  onAdd?: (id: string) => void;
}

export function ProductCard({ id, name, price, imageUrl, description, badges = [], onAdd }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="h-full"
    >
      <Card variant="glass" className="h-full flex flex-col p-0 overflow-hidden group">
        {imageUrl && (
          <div className="relative h-48 w-full overflow-hidden bg-[#0a0a0a]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={imageUrl} 
              alt={name} 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              loading="lazy"
            />
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {badges.map((badge, idx) => (
                <span key={idx} className="bg-[#D4AF37] text-black text-[10px] font-black uppercase px-2 py-1 rounded shadow-lg">
                  {badge}
                </span>
              ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-80" />
          </div>
        )}
        
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-white mb-1 font-serif">{name}</h3>
          {description && <p className="text-sm text-gray-400 mb-4 line-clamp-2">{description}</p>}
          
          <div className="mt-auto flex justify-between items-end pt-4 border-t border-white/10">
            <span className="text-2xl font-black text-[#D4AF37]">
              <span className="text-sm mr-1 opacity-70">R$</span>
              {price.toFixed(2)}
            </span>
            <Button 
              variant="primary" 
              size="sm"
              onClick={() => onAdd?.(id)}
              className="rounded-full w-10 h-10 p-0 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.6)]"
            >
              +
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
