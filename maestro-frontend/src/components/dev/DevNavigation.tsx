"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function DevNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Se não estiver em desenvolvimento, não renderiza nada
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  const routes = [
    { name: "🏠 Home", path: "/" },
    { name: "🚀 Onboarding", path: "/onboarding" },
    { name: "💰 Dashboard", path: "/admin/financeiro" },
    { name: "👥 CRM", path: "/admin/crm" },
    { name: "🎨 Branding", path: "/admin/branding" },
    { name: "🧠 Intelligence", path: "/admin/intelligence" },
    { name: "🛒 Marketplace", path: "/marketplace" },
    { name: "💳 Checkout", path: "/checkout" },
  ];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-[#D4AF37] text-[#0B0C10] shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:scale-110 transition-transform"
        title="Menu de Validação Dev"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-64 bg-[#0B0C10]/90 backdrop-blur-md border border-[#D4AF37]/30 rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5">
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Dev Mode</span>
        </div>
        <button 
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex flex-col py-2">
        {routes.map((route) => {
          const isActive = pathname === route.path;
          return (
            <Link
              key={route.path}
              href={route.path}
              className={`px-4 py-3 text-sm font-medium transition-colors ${
                isActive 
                  ? "bg-[#D4AF37]/10 text-[#D4AF37] border-l-2 border-[#D4AF37]" 
                  : "text-gray-400 hover:bg-white/5 hover:text-white border-l-2 border-transparent"
              }`}
            >
              {route.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
