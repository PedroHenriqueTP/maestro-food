"use client";

import React, { useState, useEffect } from "react";
import { useAnalytics } from "@/lib/useAnalytics";

export default function Onboarding() {
  const { trackEvent } = useAnalytics("Onboarding");
  const [status, setStatus] = useState<'provisioning' | 'ready'>('provisioning');

  useEffect(() => {
    // Simula o tempo que o backend leva rodando o RLS e chamando a API do WhatsApp
    const timer = setTimeout(() => {
      setStatus('ready');
      trackEvent('onboarding_whatsapp_sent', { success: true });
    }, 4000);

    return () => clearTimeout(timer);
  }, [trackEvent]);

  return (
    <div className="min-h-screen bg-[#0B0C10] flex flex-col items-center justify-center p-6 selection:bg-[#D4AF37] selection:text-black">
      <div className="w-full max-w-lg text-center space-y-8 relative z-10">
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4AF37] rounded-full blur-[120px] opacity-10 pointer-events-none"></div>

        {status === 'provisioning' ? (
          <div className="space-y-6 animate-pulse">
            <div className="w-20 h-20 border-4 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin mx-auto"></div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Forjando seu Ecossistema...</h1>
            <p className="text-gray-400">Nossos agentes estão provisionando o seu servidor isolado e configurando as chaves de acesso. Por favor, aguarde.</p>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto border border-[#D4AF37]/50 shadow-[0_0_30px_rgba(212,175,55,0.4)]">
              <span className="text-4xl">📱</span>
            </div>
            
            <div>
              <h1 className="text-4xl font-extrabold text-[#D4AF37] tracking-tighter">A Chave foi Enviada.</h1>
              <p className="text-lg text-gray-300 mt-4 max-w-md mx-auto">
                Sua infraestrutura Black Gold está 100% operacional.
                Verifique o seu <span className="font-bold text-white">WhatsApp</span> agora mesmo para receber o link de acesso exclusivo e as credenciais.
              </p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl text-left space-y-4">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Próximos Passos:</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-[#D4AF37] mt-0.5">✓</span>
                  Acesse o link privado enviado no seu celular.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#D4AF37] mt-0.5">✓</span>
                  Altere a sua senha temporária no primeiro login.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#D4AF37] mt-0.5">✓</span>
                  Comece a orquestrar o seu restaurante com maestria.
                </li>
              </ul>
            </div>

            <button 
              onClick={() => alert("Simulando clique no link do WhatsApp para o ambiente do cliente (ex: cliente.maestro.app)")}
              className="px-8 py-4 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 transition-all border border-white/20"
            >
              Entendido
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
