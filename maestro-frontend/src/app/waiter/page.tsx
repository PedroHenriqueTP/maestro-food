"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWaiterSocket } from '@/lib/hooks/useWaiterSocket';
import { useTenantConfig } from '@/lib/contexts/TenantConfigContext';
import { WaiterOrderCard } from '@/components/waiter/WaiterOrderCard';
import { AnimatePresence, motion } from 'framer-motion';
import { UtensilsCrossed, BellRing, Wallet, Search, Plus, Coffee, Beer, CreditCard, Banknote, QrCode, Printer, CheckCircle2 } from 'lucide-react';

export default function WaiterMobileView() {
  const { orders, isConnected, claimOrder, completeOrder } = useWaiterSocket();
  const { hasTableService, isLoading } = useTenantConfig();
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState<'mesas' | 'expedicao' | 'conta'>('mesas');
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !hasTableService) {
      router.push('/dashboard');
    }
  }, [hasTableService, isLoading, router]);

  // Estados de Checkout
  const [checkoutStep, setCheckoutStep] = useState<'select' | 'payment' | 'split' | 'success'>('select');
  const [checkoutTable, setCheckoutTable] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'debit' | 'pix' | 'cash' | 'split' | null>(null);
  const [splitCount, setSplitCount] = useState<number>(2);
  const [isProcessing, setIsProcessing] = useState(false);

  const readyOrders = orders.filter(o => o.status === 'READY');
  const deliveringOrders = orders.filter(o => o.status === 'DELIVERING');

  // Mocks
  const mesas = Array.from({ length: 12 }, (_, i) => ({ id: `M${i+1}`, status: i % 3 === 0 ? 'ocupada' : 'livre' }));

  if (isLoading || !hasTableService) {
    return <div className="min-h-screen bg-[#050505] flex items-center justify-center"><span className="w-10 h-10 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></span></div>;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans pb-28">
      {/* Topbar Simples */}
      <header className="sticky top-0 z-40 bg-[#0B0C10]/90 backdrop-blur-xl border-b border-white/10 px-4 py-4 flex justify-between items-center shadow-lg">
        <div>
          <h1 className="text-xl font-black font-serif text-[#D4AF37] tracking-widest uppercase flex items-center gap-2">
            <UtensilsCrossed className="w-5 h-5" /> Salão PDV
          </h1>
          <p className="text-[10px] text-gray-400 font-mono tracking-widest uppercase mt-0.5">Operador: João (Garçom)</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sync</span>
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-[#25D366] animate-pulse' : 'bg-red-500'}`} />
        </div>
      </header>

      <main className="p-4">
        {/* TAB: MESAS & LANÇAMENTO */}
        {activeTab === 'mesas' && (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            {!selectedTable ? (
              <>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input type="text" placeholder="Buscar mesa ou comanda..." className="w-full bg-[#14151A] border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all text-lg placeholder:text-gray-600" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {mesas.map(mesa => (
                    <button 
                      key={mesa.id} 
                      onClick={() => setSelectedTable(mesa.id)}
                      className={`relative aspect-square rounded-3xl border-2 flex flex-col items-center justify-center transition-transform active:scale-95 shadow-lg
                        ${mesa.status === 'ocupada' 
                          ? 'bg-[#1A1814] border-[#D4AF37]/50 text-[#D4AF37]' 
                          : 'bg-[#14151A] border-white/5 text-gray-500 hover:border-white/20'}`}
                    >
                      <span className="text-2xl font-black">{mesa.id}</span>
                      {mesa.status === 'ocupada' && <span className="absolute bottom-3 w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse"></span>}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-black text-[#D4AF37]">Mesa {selectedTable}</h2>
                    <p className="text-gray-400 text-sm font-bold tracking-widest uppercase">Lançamento Rápido</p>
                  </div>
                  <button onClick={() => setSelectedTable(null)} className="px-4 py-2 bg-white/10 rounded-xl text-xs font-bold uppercase tracking-widest active:scale-95">Voltar</button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <button className="bg-[#14151A] border border-white/10 p-4 rounded-2xl flex flex-col items-center gap-3 active:scale-95 hover:border-[#D4AF37]/50 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center"><UtensilsCrossed className="text-amber-500 w-6 h-6" /></div>
                    <span className="font-bold text-gray-300">Pratos</span>
                  </button>
                  <button className="bg-[#14151A] border border-white/10 p-4 rounded-2xl flex flex-col items-center gap-3 active:scale-95 hover:border-[#D4AF37]/50 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center"><Beer className="text-blue-500 w-6 h-6" /></div>
                    <span className="font-bold text-gray-300">Bebidas</span>
                  </button>
                </div>

                <div className="bg-[#14151A] border border-white/10 rounded-3xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-[40px]" />
                  <h3 className="font-bold text-white mb-4">Resumo (2 itens)</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-400 text-lg border-b border-white/5 pb-2"><span>1x Smash Burger</span><span>R$ 35,90</span></div>
                    <div className="flex justify-between text-gray-400 text-lg border-b border-white/5 pb-2"><span>1x Coca Zero</span><span>R$ 8,00</span></div>
                  </div>
                  <button className="w-full bg-[#D4AF37] text-black font-black uppercase tracking-widest text-lg py-5 rounded-2xl shadow-[0_0_20px_rgba(212,175,55,0.4)] active:scale-95 transition-transform flex items-center justify-center gap-2">
                    <Plus className="w-6 h-6" /> Enviar Cozinha
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* TAB: EXPEDIÇÃO */}
        {activeTab === 'expedicao' && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="space-y-8">
            {deliveringOrders.length > 0 && (
              <div>
                <h2 className="text-[#D4AF37] text-sm font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></div> Em Trânsito (Mãos)
                </h2>
                <AnimatePresence>
                  {deliveringOrders.map(order => (
                    <WaiterOrderCard key={order.id} order={order} onClaim={claimOrder} onComplete={completeOrder} />
                  ))}
                </AnimatePresence>
              </div>
            )}

            <div>
              <h2 className="text-gray-400 text-sm font-black uppercase tracking-widest mb-4">Boqueta (Retirar Agora)</h2>
              {readyOrders.length === 0 && deliveringOrders.length === 0 && (
                <div className="text-center text-gray-500 mt-20 p-8 border border-white/5 rounded-3xl bg-[#14151A]/50">
                  <BellRing className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="font-bold">Nenhum pedido pronto.</p>
                  <p className="text-sm mt-2">A cozinha está preparando os pedidos ativos.</p>
                </div>
              )}
              <AnimatePresence>
                {readyOrders.map(order => (
                  <WaiterOrderCard key={order.id} order={order} onClaim={claimOrder} onComplete={completeOrder} />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* TAB: CONTA (CHECKOUT) */}
        {activeTab === 'conta' && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="space-y-6 pb-6">
            
            {checkoutStep === 'select' && (
              <>
                <h2 className="text-[#D4AF37] text-sm font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Wallet className="w-5 h-5" /> Contas em Aberto
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {mesas.filter(m => m.status === 'ocupada').map(mesa => (
                    <button 
                      key={mesa.id} 
                      onClick={() => { setCheckoutTable(mesa.id); setCheckoutStep('payment'); setPaymentMethod(null); }}
                      className="aspect-square rounded-3xl bg-[#1A1814] border-2 border-[#D4AF37]/30 text-[#D4AF37] flex flex-col items-center justify-center transition-transform active:scale-95 shadow-lg relative overflow-hidden group"
                    >
                      <span className="text-4xl font-black">{mesa.id}</span>
                      <span className="text-sm font-bold text-gray-300 mt-2">R$ 145,90</span>
                      <div className="absolute top-0 right-0 w-12 h-12 bg-[#D4AF37]/10 rounded-full blur-xl group-hover:bg-[#D4AF37]/20 transition-colors"></div>
                    </button>
                  ))}
                  {mesas.filter(m => m.status === 'ocupada').length === 0 && (
                    <div className="col-span-2 text-center text-gray-500 py-10 border border-white/5 rounded-3xl bg-[#14151A]/50">
                      <CheckCircle2 className="w-12 h-12 mx-auto mb-4 opacity-50 text-green-500" />
                      <p className="font-bold uppercase tracking-widest text-sm">Nenhuma conta pendente</p>
                    </div>
                  )}
                </div>
              </>
            )}

            {checkoutStep === 'payment' && checkoutTable && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-4xl font-black text-[#D4AF37]">Mesa {checkoutTable}</h2>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Resumo e Pagamento</p>
                  </div>
                  <button onClick={() => setCheckoutStep('select')} className="px-4 py-2 bg-white/10 rounded-xl text-xs font-bold uppercase tracking-widest active:scale-95 hover:bg-white/20 transition-colors">Voltar</button>
                </div>

                <div className="bg-[#14151A] border border-[#D4AF37]/20 rounded-3xl p-6 relative overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50"></div>
                  <div className="space-y-3 mb-6 border-b border-white/10 pb-6">
                    <div className="flex justify-between text-gray-400 text-lg"><span>Consumo</span><span>R$ 145,90</span></div>
                    <div className="flex justify-between text-[#D4AF37] text-lg font-bold"><span>Serviço (10%)</span><span>R$ 14,59</span></div>
                    <div className="flex justify-between text-white text-3xl font-black mt-4 pt-4 border-t border-white/5">
                      <span>Total</span><span>R$ 160,49</span>
                    </div>
                  </div>

                  <h3 className="text-gray-400 text-xs font-bold tracking-widest uppercase mb-4 text-center">Selecionar Método</h3>
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {[
                      { id: 'credit', icon: <CreditCard className="w-5 h-5"/>, label: 'Crédito' },
                      { id: 'debit', icon: <CreditCard className="w-5 h-5"/>, label: 'Débito' },
                      { id: 'pix', icon: <QrCode className="w-5 h-5"/>, label: 'PIX' },
                      { id: 'cash', icon: <Banknote className="w-5 h-5"/>, label: 'Dinheiro' }
                    ].map(method => (
                      <button 
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id as any)}
                        className={`flex flex-col items-center justify-center gap-2 py-5 rounded-2xl border-2 transition-all active:scale-95 ${paymentMethod === method.id ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.2)]' : 'bg-[#0B0C10] border-white/5 text-gray-400 hover:border-white/20'}`}
                      >
                        {method.icon}
                        <span className="font-bold text-sm uppercase tracking-widest">{method.label}</span>
                      </button>
                    ))}
                    
                    <button 
                      onClick={() => setCheckoutStep('split')}
                      className="col-span-2 flex items-center justify-center gap-3 p-4 rounded-2xl border-2 border-dashed border-white/20 text-white transition-all active:scale-95 hover:border-[#D4AF37]/50 hover:text-[#D4AF37]"
                    >
                      <UtensilsCrossed className="w-5 h-5" />
                      <span className="font-bold text-sm uppercase tracking-widest">Dividir Conta (Split)</span>
                    </button>
                  </div>

                  <button 
                    disabled={!paymentMethod || isProcessing}
                    onClick={() => {
                      setIsProcessing(true);
                      setTimeout(() => { setIsProcessing(false); setCheckoutStep('success'); }, 1500);
                    }}
                    className={`w-full font-black uppercase tracking-widest text-lg py-5 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-3
                      ${paymentMethod ? 'bg-[#D4AF37] hover:bg-[#c4a030] text-black shadow-[0_0_20px_rgba(212,175,55,0.4)]' : 'bg-gray-800 text-gray-500 shadow-none'}`}
                  >
                    {isProcessing ? (
                      <><span className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin"></span> Fechando...</>
                    ) : (
                      <><Wallet className="w-7 h-7" /> Pagar Conta</>
                    )}
                  </button>
                </div>
              </div>
            )}

            {checkoutStep === 'split' && checkoutTable && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-black text-white">Dividir Conta</h2>
                  <button onClick={() => setCheckoutStep('payment')} className="px-4 py-2 bg-white/10 rounded-xl text-xs font-bold uppercase tracking-widest active:scale-95">Voltar</button>
                </div>

                <div className="bg-[#14151A] border border-white/10 rounded-3xl p-6 shadow-xl text-center space-y-8">
                  <div>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-2">Total da Mesa {checkoutTable}</p>
                    <p className="text-4xl font-black text-[#D4AF37]">R$ 160,49</p>
                  </div>

                  <div className="flex items-center justify-between bg-[#0B0C10] p-4 rounded-2xl border border-white/5">
                    <button onClick={() => setSplitCount(Math.max(2, splitCount - 1))} className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-xl active:scale-95"><Minus className="w-6 h-6" /></button>
                    <div className="flex flex-col items-center">
                      <span className="text-3xl font-black text-white">{splitCount}</span>
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Pessoas</span>
                    </div>
                    <button onClick={() => setSplitCount(splitCount + 1)} className="w-12 h-12 flex items-center justify-center bg-[#D4AF37] text-black rounded-xl active:scale-95"><Plus className="w-6 h-6" /></button>
                  </div>

                  <div>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-2">Valor por Pessoa</p>
                    <p className="text-5xl font-black text-white">R$ {(160.49 / splitCount).toFixed(2)}</p>
                  </div>

                  <button 
                    onClick={() => setCheckoutStep('success')}
                    className="w-full bg-[#D4AF37] text-black font-black uppercase tracking-widest text-lg py-5 rounded-2xl shadow-[0_0_20px_rgba(212,175,55,0.4)] active:scale-95"
                  >
                    Confirmar Pagamento Dividido
                  </button>
                </div>
              </div>
            )}

            {checkoutStep === 'success' && (
              <div className="flex flex-col items-center justify-center text-center py-10 space-y-6">
                <div className="w-24 h-24 bg-[#25D366]/20 rounded-full flex items-center justify-center mb-4 relative">
                  <div className="absolute inset-0 bg-[#25D366]/20 rounded-full animate-ping"></div>
                  <CheckCircle2 className="w-12 h-12 text-[#25D366]" />
                </div>
                <h2 className="text-3xl font-black text-white">Pago com Sucesso!</h2>
                <p className="text-gray-400 font-mono tracking-widest uppercase">Mesa {checkoutTable} foi liberada.</p>
                
                <div className="flex gap-4 w-full mt-8">
                  <button className="flex-1 bg-[#14151A] border border-white/10 p-4 rounded-2xl flex flex-col items-center gap-2 text-gray-300 active:scale-95">
                    <Printer className="w-6 h-6" />
                    <span className="text-xs font-bold uppercase tracking-wider">Imprimir Recibo</span>
                  </button>
                  <button 
                    onClick={() => { setCheckoutStep('select'); setCheckoutTable(null); setPaymentMethod(null); setActiveTab('mesas'); }}
                    className="flex-1 bg-[#D4AF37] text-black p-4 rounded-2xl flex flex-col items-center gap-2 font-black uppercase tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.3)] active:scale-95"
                  >
                    <UtensilsCrossed className="w-6 h-6" />
                    <span className="text-xs">Nova Mesa</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </main>

      {/* Bottom Mobile Nav */}
      <nav className="fixed bottom-0 w-full bg-[#0B0C10]/95 backdrop-blur-2xl border-t border-white/10 pb-safe pt-2 px-6 flex justify-around items-center h-24 z-50 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <button 
          onClick={() => setActiveTab('mesas')}
          className={`flex flex-col items-center gap-1 p-2 transition-all ${activeTab === 'mesas' ? 'text-[#D4AF37] scale-110' : 'text-gray-500'}`}
        >
          <UtensilsCrossed className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Mesas</span>
        </button>
        <button 
          onClick={() => setActiveTab('expedicao')}
          className={`relative flex flex-col items-center gap-1 p-2 transition-all ${activeTab === 'expedicao' ? 'text-[#D4AF37] scale-110' : 'text-gray-500'}`}
        >
          <div className="relative">
            <BellRing className="w-6 h-6" />
            {readyOrders.length > 0 && <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse border-2 border-[#0B0C10]"></span>}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest">Boqueta</span>
        </button>
        <button 
          onClick={() => setActiveTab('conta')}
          className={`flex flex-col items-center gap-1 p-2 transition-all ${activeTab === 'conta' ? 'text-[#D4AF37] scale-110' : 'text-gray-500'}`}
        >
          <Wallet className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Contas</span>
        </button>
      </nav>
    </div>
  );
}
