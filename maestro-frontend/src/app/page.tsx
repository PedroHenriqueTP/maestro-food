"use client";

import React from 'react';
import { useIntelligence } from '@/lib/hooks/useIntelligence';
import { FlashSaleBanner } from '@/components/marketplace/FlashSaleBanner';
import { PersonalizedRecommendations } from '@/components/marketplace/PersonalizedRecommendations';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { motion } from 'framer-motion';

// Mock do catálogo principal
const CATALOG = [
  { id: 'cat-1', name: 'Smash Clássico', price: 35.90, desc: 'Pão batata, duplo smash 90g, queijo cheddar.', imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80' },
  { id: 'cat-2', name: 'Batata Rústica', price: 22.00, desc: 'Com alecrim e alho confit.', imageUrl: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&q=80' },
  { id: 'cat-3', name: 'Milkshake de Pistache', price: 28.50, desc: 'Sorvete artesanal, calda de frutas vermelhas.', imageUrl: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80' },
  { id: 'cat-4', name: 'Combo Ouro', price: 85.00, desc: 'Smash Clássico + Rústica + Milkshake.', badges: ['-15% OFF'], imageUrl: 'https://images.unsplash.com/photo-1594212691516-436fec6143b6?auto=format&fit=crop&q=80' },
];

export default function MarketplaceHome() {
  const { recommendations, loading } = useIntelligence();

  const handleAddToCart = (id: string) => {
    // Integração futura com o Store/Cart do Zustand
    console.log('Added to cart:', id);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans pb-24">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-black text-[#D4AF37] uppercase tracking-widest font-serif">Maestro</h1>
        <div className="flex gap-4">
          <button className="relative w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
            <span className="text-xl">🛒</span>
            <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 mt-8">
        {/* Flash Sale Banner */}
        <FlashSaleBanner 
          title="Gold Rush"
          description="Aproveite nossos combos executivos com desconto exclusivo pelas próximas horas."
          discount="20%"
          timeRemaining="02:14:59"
          onAction={() => alert('Scroll to Promos')}
        />

        {/* Personalized Recommendations (Intelligence Inject) */}
        {!loading && <PersonalizedRecommendations recommendations={recommendations} onAddToCart={handleAddToCart} />}

        {/* Catálogo Principal (Masonry/Grid) */}
        <div className="mt-16">
          <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
            <h2 className="text-3xl font-bold font-serif">Catálogo <span className="text-gray-500">Completo</span></h2>
            <div className="flex gap-2">
              {['Burgers', 'Porções', 'Bebidas'].map((cat) => (
                <button key={cat} className="px-4 py-2 rounded-full border border-white/10 text-sm hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors">
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {CATALOG.map((item, i) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <ProductCard 
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  description={item.desc}
                  imageUrl={item.imageUrl}
                  badges={item.badges}
                  onAdd={handleAddToCart}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
