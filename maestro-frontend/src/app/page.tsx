import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0B0C10] text-gray-300 font-sans selection:bg-[#D4AF37] selection:text-[#0B0C10] overflow-x-hidden relative">
      
      {/* Background Decorativo (Black Gold Glow) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37] to-transparent blur-[120px] rounded-full mix-blend-screen"></div>
      </div>

      <nav className="w-full flex justify-between items-center px-8 py-6 max-w-7xl mx-auto z-10 relative border-b border-white/5">
        <div className="text-2xl font-black text-white tracking-tighter">
          MAESTRO
        </div>
        <div className="space-x-6 text-sm font-medium">
          <Link href="/onboarding" className="text-gray-400 hover:text-[#D4AF37] transition-colors">Setup</Link>
          <Link href="/admin/financeiro" className="text-gray-400 hover:text-[#D4AF37] transition-colors">Dashboard</Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 py-20 lg:py-32 relative z-10">
        
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto space-y-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-[#D4AF37]/20 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Maestro OS Enterprise</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 tracking-tighter leading-tight">
            O Padrão Ouro do <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB]">FoodService.</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Contabilidade de partida dobrada, inteligência artificial preditiva e roteamento com latência O(1) na Borda. Construído para restaurantes que não brincam em serviço.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-8">
            <Link 
              href="/onboarding" 
              className="group relative flex items-center justify-center px-8 py-4 rounded-lg font-bold text-[#0B0C10] bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] hover:from-[#F3E5AB] hover:to-[#D4AF37] hover:scale-105 transition-all shadow-[0_0_30px_rgba(212,175,55,0.2)] overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
              Configurar Operação
            </Link>
            
            <Link 
              href="/admin/financeiro" 
              className="px-8 py-4 rounded-lg font-bold text-gray-300 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 transition-all backdrop-blur-sm"
            >
              Acessar Painel
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32">
          {/* Feature 1 */}
          <div className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-[#D4AF37]/30 transition-colors group">
            <div className="w-12 h-12 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center mb-6 text-[#D4AF37]">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Latência Zero</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Resolução de Multi-Tenancy em O(1) no Vercel Edge Runtime. Seus clientes nunca esperam pela validação de infraestrutura.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-[#D4AF37]/30 transition-colors group">
            <div className="w-12 h-12 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center mb-6 text-[#D4AF37]">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Double-Entry Ledger</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Motor contábil com auditoria e precisão transacional. Cada centavo debitado é rastreado por partida dobrada.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-[#D4AF37]/30 transition-colors group">
            <div className="w-12 h-12 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center mb-6 text-[#D4AF37]">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Cérebro Preditivo</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              A Inteligência Artificial atua nos bastidores alertando sobre custos e recomendando ações precisas para salvar o seu lucro.
            </p>
          </div>
        </div>
      </main>

    </div>
  );
}
