"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Recommendation } from '@/lib/hooks/useIntelligence';
import { ProductCard } from './ProductCard';

export interface PersonalizedRecommendationsProps {
  recommendations: Recommendation[];
  onAddToCart?: (id: string) => void;
}

export function PersonalizedRecommendations({ recommendations, onAddToCart }: PersonalizedRecommendationsProps) {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <div className="my-12">
      <div className="mb-6 border-l-4 border-[#D4AF37] pl-4">
        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-widest font-serif">
          Seleção <span className="text-[#D4AF37]">Autônoma</span>
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Com base na demanda do seu bairro neste exato momento.
        </p>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-8 pt-4 px-2 -mx-2 snap-x">
        {recommendations.map((rec, index) => (
          <motion.div 
            key={rec.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, type: 'spring' }}
            className="min-w-[280px] md:min-w-[320px] snap-center"
          >
            <ProductCard 
              id={rec.id}
              name={rec.name}
              price={rec.price}
              imageUrl={rec.imageUrl}
              description={rec.intelligenceReason}
              badges={rec.badges}
              onAdd={onAddToCart}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
