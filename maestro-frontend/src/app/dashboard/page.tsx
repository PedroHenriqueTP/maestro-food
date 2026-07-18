"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <div className="flex h-screen w-full bg-[#050505] text-[#f1e5ac] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 fineline-border border-y-0 border-l-0 flex flex-col bg-black/40 backdrop-blur-md">
        <div className="p-6 flex items-center gap-4 border-b border-[#d4af37]/30">
          <Image 
            src="/maestro_logo.png" 
            alt="Maestro Logo" 
            width={40} 
            height={40} 
            className="drop-shadow-[0_0_5px_rgba(212,175,55,0.3)]"
          />
          <h2 className="premium-text text-xl font-light tracking-[0.1em] uppercase">MAESTRO</h2>
        </div>
        
        <nav className="flex-1 p-4 flex flex-col gap-2 mt-4">
          <button className="flex items-center gap-3 w-full p-3 text-left bg-[#d4af37]/10 fineline-border text-[#d4af37] tracking-widest text-xs uppercase">
            Visão Geral
          </button>
          <button className="flex items-center gap-3 w-full p-3 text-left text-[#aa8c2c] hover:text-[#d4af37] transition-colors tracking-widest text-xs uppercase hover:bg-[#d4af37]/5">
            Pedidos
          </button>
          <button className="flex items-center gap-3 w-full p-3 text-left text-[#aa8c2c] hover:text-[#d4af37] transition-colors tracking-widest text-xs uppercase hover:bg-[#d4af37]/5">
            Cardápio
          </button>
          <button className="flex items-center gap-3 w-full p-3 text-left text-[#aa8c2c] hover:text-[#d4af37] transition-colors tracking-widest text-xs uppercase hover:bg-[#d4af37]/5">
            Financeiro
          </button>
        </nav>
        
        <div className="p-4 border-t border-[#d4af37]/30">
          <button 
            onClick={handleLogout}
            className="w-full p-3 text-center text-xs tracking-[0.2em] uppercase text-red-500/80 hover:text-red-400 hover:bg-red-900/10 transition-colors"
          >
            Sair do Sistema
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#d4af37] opacity-[0.02] rounded-full blur-[120px] pointer-events-none"></div>
        
        {/* Topbar */}
        <header className="h-20 fineline-border border-x-0 border-t-0 flex items-center justify-between px-10 bg-black/20 backdrop-blur-sm z-10">
          <h1 className="text-xl font-light tracking-[0.2em] text-[#d4af37] uppercase">Dashboard <span className="text-[#aa8c2c]">/ Visão Geral</span></h1>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full border border-[#d4af37]/50 bg-[#d4af37]/10 flex items-center justify-center">
              <span className="text-xs text-[#d4af37]">AD</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-10 overflow-auto z-10">
          
          <div className="grid grid-cols-3 gap-8 mb-8">
            <div className="fineline-border p-6 bg-black/40 premium-glow">
              <h3 className="text-[10px] tracking-widest uppercase text-[#aa8c2c] mb-2">Vendas Hoje</h3>
              <p className="text-3xl font-light text-[#f1e5ac]">R$ 14.590,00</p>
              <div className="mt-4 text-xs text-emerald-500 tracking-wider">+12% vs Ontem</div>
            </div>
            <div className="fineline-border p-6 bg-black/40 premium-glow">
              <h3 className="text-[10px] tracking-widest uppercase text-[#aa8c2c] mb-2">Pedidos Ativos</h3>
              <p className="text-3xl font-light text-[#f1e5ac]">34</p>
              <div className="mt-4 text-xs text-[#d4af37] tracking-wider">Operação Normal</div>
            </div>
            <div className="fineline-border p-6 bg-black/40 premium-glow">
              <h3 className="text-[10px] tracking-widest uppercase text-[#aa8c2c] mb-2">Ticket Médio</h3>
              <p className="text-3xl font-light text-[#f1e5ac]">R$ 185,50</p>
              <div className="mt-4 text-xs text-red-500/80 tracking-wider">-2% vs Ontem</div>
            </div>
          </div>

          <div className="fineline-border p-8 bg-black/40 min-h-[400px]">
            <h3 className="text-sm tracking-[0.2em] uppercase text-[#d4af37] mb-6">Orquestração em Tempo Real</h3>
            <div className="flex flex-col gap-4">
              <div className="p-4 border border-[#d4af37]/20 flex justify-between items-center bg-[#d4af37]/5">
                <span className="text-xs tracking-wider text-[#f1e5ac]">Pedido #4092 - Mesa 12</span>
                <span className="text-xs text-[#aa8c2c] border border-[#aa8c2c] px-3 py-1 uppercase">Preparando</span>
              </div>
              <div className="p-4 border border-[#d4af37]/20 flex justify-between items-center bg-[#d4af37]/5">
                <span className="text-xs tracking-wider text-[#f1e5ac]">Pedido #4093 - Delivery (iFood)</span>
                <span className="text-xs text-emerald-500 border border-emerald-500 px-3 py-1 uppercase">Despachado</span>
              </div>
              <div className="p-4 border border-[#d4af37]/20 flex justify-between items-center bg-[#d4af37]/5">
                <span className="text-xs tracking-wider text-[#f1e5ac]">Pedido #4094 - Balcão</span>
                <span className="text-xs text-[#d4af37] border border-[#d4af37] px-3 py-1 uppercase">Aguardando Pagamento</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
