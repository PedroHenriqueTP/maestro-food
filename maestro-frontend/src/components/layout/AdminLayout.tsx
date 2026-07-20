"use client";

import React, { useState } from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarHeader, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { LayoutDashboard, Users, Flame, Settings, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "../../stores/useAuthStore";
import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [command, setCommand] = useState("");
  const [isOrbitalOpen, setIsOrbitalOpen] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const { user, logout } = useAuthStore();
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
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar className="border-r border-border">
          <SidebarHeader className="p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-bold text-primary-foreground">
                M
              </div>
              <span className="font-semibold text-lg premium-text">Maestro</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/admin/analytics">
                      <LayoutDashboard className="w-4 h-4" />
                      <span>Analytics</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/admin/growth">
                      <Flame className="w-4 h-4" />
                      <span>Growth Engine</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="#">
                      <Users className="w-4 h-4" />
                      <span>CRM</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 flex flex-col h-screen overflow-hidden">
          <header className="h-16 border-b border-border flex items-center px-4 justify-between bg-card shrink-0">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h2 className="text-sm font-medium text-muted-foreground">Admin Workspace</h2>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="border-primary/20 text-primary">
                {user ? user.tenantId : 'Carregando...'}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                      {user ? user.name.charAt(0) : 'U'}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-card border-border">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user ? user.name : 'Usuário'}</p>
                      <p className="text-xs text-muted-foreground">{user ? user.email : ''}</p>
                    </div>
                  </div>
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          
          <div className="flex-1 overflow-auto relative">
            {children}

            {/* ORBITAL COMMAND RELAY */}
            <Dialog open={isOrbitalOpen} onOpenChange={setIsOrbitalOpen}>
              <DialogTrigger asChild>
                <Button 
                  size="icon" 
                  className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl bg-primary hover:bg-primary/90 text-primary-foreground animate-pulse"
                >
                  <Bot className="w-6 h-6" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-card border-border">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-primary">
                    <Bot className="w-5 h-5" />
                    Maestro Relay
                  </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                  <div className="h-48 bg-background border border-border rounded-md p-4 overflow-y-auto font-mono text-xs flex flex-col gap-1">
                    {logs.length === 0 ? (
                      <span className="text-muted-foreground">Aguardando comandos...</span>
                    ) : (
                      logs.map((log, i) => (
                        <span key={i} className={log.startsWith("⚠") ? "text-destructive" : log.startsWith("✓") ? "text-primary" : "text-foreground"}>
                          {log}
                        </span>
                      ))
                    )}
                  </div>
                  <form onSubmit={handleCommandSubmit} className="flex gap-2">
                    <Input 
                      value={command}
                      onChange={(e) => setCommand(e.target.value)}
                      placeholder="Comandar agentes (ex: Analisar churn)" 
                      className="flex-1 bg-background"
                    />
                    <Button type="submit">Enviar</Button>
                  </form>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
