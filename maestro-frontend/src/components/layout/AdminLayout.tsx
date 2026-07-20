"use client";

import React, { useState } from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarHeader, SidebarProvider, SidebarTrigger, SidebarFooter, SidebarInset } from "@/components/ui/sidebar";
import { LayoutDashboard, Users, Flame, Settings, Bot, ChefHat, MonitorSmartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useTenantConfig } from "@/lib/contexts/TenantConfigContext";
import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [command, setCommand] = useState("");
  const [isOrbitalOpen, setIsOrbitalOpen] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const { user, logout } = useAuth();
  const { hasKds, hasTableService, isLoading } = useTenantConfig();
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "maestro_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    logout();
    router.push('/login');
  };

  const handleCommandSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;

    setLogs(prev => [...prev, `> ${command}`]);
    const currentCommand = command;
    setCommand("");

    // Simulate sending to n8n / Backend
    try {
      const res = await fetch("http://localhost:5678/webhook/maestro-relay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command: currentCommand }),
      });
      if (res.ok) {
        setLogs(prev => [...prev, "✓ Comando recebido pelo N8N"]);
      } else {
        // Fallback or error
        setLogs(prev => [...prev, "⚠ Falha ao contactar o N8N (Relay Offline)"]);
      }
    } catch (err) {
      setLogs(prev => [...prev, "⚠ Falha de rede: Não foi possível contactar o N8N"]);
    }
  };

  return (
    <SidebarProvider>
      <>
        <Sidebar className="border-r border-white/5 bg-[#0B0C10]/95 backdrop-blur-xl">
          <SidebarHeader className="p-6 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-amber-600 flex items-center justify-center font-black text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                M
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-white tracking-wide">Maestro</span>
                <span className="text-[10px] text-[#D4AF37] uppercase tracking-widest font-bold">Food Service OS</span>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="hover:bg-white/5 data-[active=true]:bg-[#D4AF37]/10 data-[active=true]:text-[#D4AF37] text-gray-400 transition-colors">
                    <a href="/admin/analytics">
                      <LayoutDashboard className="w-4 h-4" />
                      <span className="font-medium">Analytics & KPIs</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="hover:bg-white/5 text-gray-400 transition-colors">
                    <a href="/admin/growth">
                      <Flame className="w-4 h-4" />
                      <span className="font-medium">Growth Engine</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="hover:bg-white/5 text-gray-400 transition-colors">
                    <a href="/admin/crm">
                      <Users className="w-4 h-4" />
                      <span className="font-medium">CRM Intelligence</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>

            <SidebarGroup className="mt-8">
              <span className="px-4 text-[10px] font-black tracking-widest text-gray-500 uppercase mb-2 block">Operação Real-time</span>
              <SidebarMenu>
                
                {hasKds && (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] text-gray-400 transition-colors group">
                      <a href="/kitchen">
                        <ChefHat className="w-4 h-4 group-hover:animate-bounce" />
                        <span className="font-medium">KDS Cozinha</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}

                {hasTableService && (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] text-gray-400 transition-colors">
                      <a href="/waiter">
                        <MonitorSmartphone className="w-4 h-4" />
                        <span className="font-medium">PDV Mesas</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}

              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-4 border-t border-white/5">
            <button className="flex items-center gap-3 w-full p-2 rounded-xl hover:bg-white/5 transition-colors text-gray-400 hover:text-white">
              <Settings className="w-4 h-4" />
              <span className="text-sm font-medium">Configurações</span>
            </button>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex-1 flex flex-col h-screen overflow-hidden bg-gradient-to-br from-[#050505] to-[#0a0a0c]">
          <header className="h-20 border-b border-white/5 flex items-center px-8 justify-between bg-[#0B0C10]/80 backdrop-blur-md shrink-0 sticky top-0 z-40">
            <div className="flex items-center gap-6">
              <SidebarTrigger className="text-gray-400 hover:text-white transition-colors" />
              
              <div className="h-6 w-px bg-white/10 hidden md:block"></div>
              
              {/* Top Navigation Bar - Visível apenas em desktop */}
              <nav className="hidden md:flex items-center gap-8 ml-4">
                <a href="/dashboard" className="text-xs font-bold tracking-widest uppercase text-white hover:text-[#D4AF37] transition-colors">Dashboard</a>
                <a href="/admin/crm" className="text-xs font-bold tracking-widest uppercase text-white hover:text-[#D4AF37] transition-colors">CRM</a>
                {hasKds && (
                  <a href="/kitchen" className="text-xs font-bold tracking-widest uppercase text-white hover:text-[#D4AF37] transition-colors">Cozinha</a>
                )}
                {hasTableService && (
                  <a href="/waiter" className="text-xs font-bold tracking-widest uppercase text-white hover:text-[#D4AF37] transition-colors">Salão</a>
                )}
              </nav>
            </div>
            <div className="flex items-center gap-6">
              <div className="px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></div>
                <span className="text-xs font-bold text-[#D4AF37] tracking-widest uppercase">
                  {user ? user.tenantId : 'Conectando...'}
                </span>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-xl hover:bg-white/5 p-0 overflow-hidden border border-white/10 transition-all hover:border-white/20">
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center font-bold text-gray-300 text-lg">
                      {user ? user.name.charAt(0) : 'U'}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 bg-[#14151A] border-white/10 p-2 shadow-2xl">
                  <div className="flex flex-col space-y-1 p-3 border-b border-white/5 mb-2 bg-[#0B0C10] rounded-lg">
                    <p className="font-bold text-white">{user ? user.name : 'Usuário'}</p>
                    <p className="text-xs text-gray-500 font-mono">{user ? user.email : ''}</p>
                  </div>
                  <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-white/5 cursor-pointer rounded-md">
                    Configurações
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer rounded-md mt-1">
                    Encerrar Sessão
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          
          <div className="flex-1 overflow-auto relative p-6 md:p-8 custom-scrollbar">
            {children}
          </div>
        </SidebarInset>

        {/* ORBITAL COMMAND RELAY (Omni) - Movido para o root do layout para evitar corte */}
        <Dialog open={isOrbitalOpen} onOpenChange={setIsOrbitalOpen}>
          <DialogTrigger asChild>
            <Button 
              size="icon" 
              className="fixed bottom-8 left-8 md:bottom-12 md:left-12 h-16 w-16 rounded-full shadow-[0_0_40px_rgba(212,175,55,0.5)] bg-gradient-to-br from-[#D4AF37] to-amber-600 hover:from-[#c4a030] hover:to-amber-700 text-black border-2 border-[#0B0C10] animate-pulse z-[100] transition-transform hover:scale-110 flex items-center justify-center"
            >
              <Bot className="w-8 h-8" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md bg-[#0B0C10]/95 backdrop-blur-3xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] z-[101]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3 text-[#D4AF37] font-black tracking-widest uppercase text-lg">
                <div className="p-2 bg-[#D4AF37]/10 rounded-lg border border-[#D4AF37]/20">
                  <Bot className="w-6 h-6" />
                </div>
                Maestro Oráculo
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 mt-2">
              <div className="h-56 bg-[#050505] border border-white/5 rounded-xl p-4 overflow-y-auto font-mono text-sm flex flex-col gap-2 custom-scrollbar shadow-inner">
                {logs.length === 0 ? (
                  <span className="text-gray-500 flex items-center gap-3">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D4AF37]"></span>
                    </span>
                    Aguardando comandos de inteligência...
                  </span>
                ) : (
                  logs.map((log, i) => (
                    <span key={i} className={log.startsWith("⚠") ? "text-red-400" : log.startsWith("✓") ? "text-[#25D366]" : "text-gray-300"}>
                      {log}
                    </span>
                  ))
                )}
              </div>
              <form onSubmit={handleCommandSubmit} className="flex gap-2">
                <Input 
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  placeholder="Ex: Qual o MRR atual?" 
                  className="flex-1 bg-[#1A1C23] border border-white/10 text-white h-12 focus:ring-[#D4AF37] focus:border-[#D4AF37] rounded-xl text-base"
                />
                <Button type="submit" className="bg-[#D4AF37] hover:bg-[#c4a030] text-black font-black uppercase tracking-widest h-12 rounded-xl px-8 transition-transform hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.3)]">Enviar</Button>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </>
    </SidebarProvider>
  );
}
