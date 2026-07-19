"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";

// Definimos as rotas administrativas e as cores de status (Mock da Inteligência)
const orbitalNodes = [
  { id: "intelligence", label: "Intelligence HQ", href: "/admin/intelligence", icon: "🧠", color: "#8B5CF6", angle: 0 },
  { id: "finance", label: "Financeiro", href: "/admin/financeiro", icon: "💰", color: "#10B981", angle: 72 },
  { id: "crm", label: "CRM", href: "/admin/crm", icon: "👥", color: "#3B82F6", angle: 144 },
  { id: "kitchen", label: "KDS (Cozinha)", href: "/kitchen", icon: "🍳", color: "#EF4444", angle: 216 }, // Simulando alerta
  { id: "marketplace", label: "Marketplace", href: "/marketplace", icon: "🍔", color: "#D4AF37", angle: 288 }, // Simulando Flash Sale
];

export function OrbitalMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Se a rota for garçom, podemos esconder o menu (é touch-first)
  if (pathname.includes("/waiter")) return null;

  const radius = 120; // Raio da órbita em pixels

  const handleNavigate = (href: string) => {
    setIsOpen(false);
    // Efeito sonoro mockado
    try {
      const audio = new Audio('/warp.mp3'); // Apenas ilusório
      audio.play().catch(() => {});
    } catch(e) {}
    router.push(href);
  };

  return (
    <div className="fixed bottom-12 right-12 z-50 flex items-center justify-center">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm fixed top-0 left-0 w-screen h-screen z-[-1]"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="relative flex items-center justify-center w-24 h-24">
        
        {/* Nódulos Orbitais */}
        <AnimatePresence>
          {isOpen && orbitalNodes.map((node, index) => {
            // Matemática Polar: converter ângulo para radianos e projetar X, Y
            const angleRad = (node.angle * Math.PI) / 180;
            const x = Math.cos(angleRad) * radius;
            const y = Math.sin(angleRad) * radius;

            const isActive = pathname === node.href;
            
            // Simulação de alertas visuais (Pulse) para KDS e Marketplace
            const isAlerting = node.id === 'kitchen' || node.id === 'marketplace';

            return (
              <motion.button
                key={node.id}
                initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                animate={{ 
                  opacity: 1, 
                  x, 
                  y, 
                  scale: isActive ? 1.1 : 1,
                  transition: { type: "spring", stiffness: 200, damping: 20, delay: index * 0.05 }
                }}
                exit={{ 
                  opacity: 0, 
                  x: 0, 
                  y: 0, 
                  scale: 0,
                  transition: { duration: 0.2 }
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleNavigate(node.href)}
                className={`absolute flex items-center justify-center w-14 h-14 rounded-full shadow-2xl border-2 transition-colors
                  ${isActive ? 'bg-[#1a1a1a] border-white' : 'bg-[#050505] border-white/20 hover:border-white/50'}
                `}
                style={{
                  boxShadow: isAlerting ? `0 0 20px ${node.color}` : 'none'
                }}
                title={node.label}
              >
                {/* Efeito Glow Condicional para Alertas */}
                {isAlerting && (
                  <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: node.color }}></div>
                )}
                
                <span className="text-2xl relative z-10">{node.icon}</span>
              </motion.button>
            );
          })}
        </AnimatePresence>

        {/* Orbe Central (Core Node) */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            boxShadow: isOpen ? "0 0 40px rgba(212,175,55,0.6)" : "0 0 0px rgba(212,175,55,0)",
            rotate: isOpen ? 45 : 0
          }}
          className={`relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-[#050505] border border-[#D4AF37]/50 shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-colors ${isOpen ? 'bg-[#1a1a1a]' : 'hover:bg-[#1a1a1a]'}`}
        >
          {/* Logo Maestro Simplificada no Centro */}
          <span className="text-[#D4AF37] font-serif font-black text-3xl tracking-tighter">M</span>
          
          {/* Anéis orbitais decorativos quando fechado */}
          {!isOpen && (
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-4px] rounded-full border border-dashed border-[#D4AF37]/30 pointer-events-none"
            />
          )}
        </motion.button>

      </div>
    </div>
  );
}
