"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAnalytics } from "@/lib/useAnalytics";

export default function Checkout() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { trackEvent } = useAnalytics("Checkout");
  const [mrr, setMrr] = useState<string>("0");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const total = searchParams.get('mrr');
    if (total) setMrr(total);
  }, [searchParams]);

  const handlePayment = () => {
    trackEvent('payment_submitted', { mrr });
    setIsProcessing(true);
    // Simula o redirecionamento ao Stripe e posterior Webhook para nosso Backend NestJS
    setTimeout(() => {
      trackEvent('payment_success_simulated', { mrr });
      alert("Integração Real Conectada! Um evento simulado de 'checkout.session.completed' foi direcionado para a rota /billing/webhook/stripe no nosso Maestro Core. O Provisionamento via RLS iniciou.");
      setIsProcessing(false);
      router.push("/onboarding");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0B0C10] flex items-center justify-center p-6">
      <div className="w-full max-w-md p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden">
        
        {/* Glow effect */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#D4AF37] rounded-full blur-[100px] opacity-10"></div>
        
        <div className="relative z-10 text-center mb-8">
          <h1 className="text-3xl font-extrabold text-white tracking-tighter">Finalizar Assinatura</h1>
          <p className="text-gray-400 text-sm mt-2">Você está a um passo do seu novo Sistema Nervoso.</p>
        </div>

        <div className="bg-[#050505] rounded-xl p-6 border border-white/5 mb-8 relative z-10">
          <div className="text-center">
            <span className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Total a Pagar Hoje</span>
            <span className="text-4xl font-extrabold text-[#D4AF37]">R$ {mrr}</span>
            <span className="text-gray-500 text-sm">/mês</span>
          </div>
        </div>

        <form className="space-y-4 relative z-10" onSubmit={(e) => { e.preventDefault(); handlePayment(); }}>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Nome no Cartão</label>
            <input type="text" required placeholder="João da Silva" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/50" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Número do Cartão</label>
            <input type="text" required placeholder="0000 0000 0000 0000" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/50 font-mono" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Validade</label>
              <input type="text" required placeholder="MM/AA" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/50 font-mono" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">CVV</label>
              <input type="text" required placeholder="123" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/50 font-mono" />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isProcessing}
            className="w-full mt-6 py-4 rounded-xl bg-[#D4AF37] text-[#0B0C10] font-extrabold hover:bg-[#F3E5AB] transition-all disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {isProcessing ? (
              <><span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span> Processando...</>
            ) : (
              "Confirmar Pagamento Seguro"
            )}
          </button>
        </form>

        <p className="text-center text-xs text-gray-600 mt-6 relative z-10">
          Pagamento processado com segurança via Stripe API.
        </p>

      </div>
    </div>
  );
}
