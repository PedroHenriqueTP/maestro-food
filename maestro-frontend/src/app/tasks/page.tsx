"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDevice } from '@/lib/hooks/useDevice';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { CheckCircle2, Circle, Clock, Plus, Filter, User, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

type TaskStatus = 'TODO' | 'DOING' | 'DONE';
type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';

interface Task {
  id: string;
  title: string;
  assignee: string;
  status: TaskStatus;
  priority: TaskPriority;
  time: string;
}

const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'Limpar câmara fria', assignee: 'João (Cozinha)', status: 'TODO', priority: 'HIGH', time: '14:00' },
  { id: '2', title: 'Contagem de Estoque: Bebidas', assignee: 'Maria (Gerência)', status: 'DOING', priority: 'MEDIUM', time: '15:30' },
  { id: '3', title: 'Lustrar talheres', assignee: 'Pedro (Salão)', status: 'DONE', priority: 'LOW', time: '11:00' },
  { id: '4', title: 'Receber fornecedor de carnes', assignee: 'João (Cozinha)', status: 'TODO', priority: 'HIGH', time: '16:00' },
];

export default function TaskManagementPage() {
  const { isMobile, isTablet, isKiosk } = useDevice();
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [filter, setFilter] = useState<'ALL' | 'TODO' | 'DOING' | 'DONE'>('ALL');

  const getPriorityColor = (priority: TaskPriority) => {
    switch(priority) {
      case 'HIGH': return 'text-red-500 bg-red-500/10';
      case 'MEDIUM': return 'text-yellow-500 bg-yellow-500/10';
      case 'LOW': return 'text-green-500 bg-green-500/10';
    }
  };

  const getStatusIcon = (status: TaskStatus) => {
    switch(status) {
      case 'TODO': return <Circle className="w-5 h-5 text-gray-500" />;
      case 'DOING': return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'DONE': return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    }
  };

  const filteredTasks = tasks.filter(t => filter === 'ALL' || t.status === filter);

  const toggleStatus = (id: string) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        const nextStatus = t.status === 'TODO' ? 'DOING' : t.status === 'DOING' ? 'DONE' : 'TODO';
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  const PageContent = () => (
    <div className="flex flex-col h-full relative">
      <header className="p-6 border-b border-white/10 flex items-center justify-between z-10 bg-[#0B0C10]/80 backdrop-blur-md">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-[#D4AF37] uppercase tracking-widest font-serif flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 md:w-8 md:h-8" /> Central de Tarefas
          </h1>
          <p className="text-sm text-gray-400 mt-1">Delegação e acompanhamento operacional em tempo real.</p>
        </div>
        {!isMobile && (
          <Button variant="primary" className="gap-2 font-bold uppercase tracking-widest">
            <Plus className="w-4 h-4" /> Nova Tarefa
          </Button>
        )}
      </header>

      {/* Mobile/Tablet Filters */}
      {(isMobile || isTablet) && (
        <div className="flex overflow-x-auto gap-2 p-4 border-b border-white/5 custom-scrollbar hide-scrollbar bg-[#050505]">
          {['ALL', 'TODO', 'DOING', 'DONE'].map(f => (
            <button 
              key={f} 
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${filter === f ? 'bg-[#D4AF37] text-black' : 'bg-white/5 text-gray-400'}`}
            >
              {f === 'ALL' ? 'Todas' : f === 'TODO' ? 'Pendentes' : f === 'DOING' ? 'Em Progresso' : 'Concluídas'}
            </button>
          ))}
        </div>
      )}

      {/* Content Area based on Device */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#050505]">
        
        {/* MOBILE LAYOUT: List View */}
        {isMobile && (
          <div className="space-y-4 pb-24">
            <AnimatePresence>
              {filteredTasks.map(task => (
                <motion.div 
                  key={task.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-[#14151A] p-4 rounded-2xl border border-white/5 flex gap-4 items-start active:scale-[0.98] transition-transform"
                  onClick={() => toggleStatus(task.id)}
                >
                  <div className="mt-1">{getStatusIcon(task.status)}</div>
                  <div className="flex-1">
                    <h3 className={`font-bold text-lg ${task.status === 'DONE' ? 'text-gray-500 line-through' : 'text-white'}`}>{task.title}</h3>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                      <User className="w-4 h-4" /> {task.assignee}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-xs font-mono text-gray-500">{task.time}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${getPriorityColor(task.priority)}`}>
                      {task.priority === 'HIGH' ? 'Urgente' : task.priority === 'MEDIUM' ? 'Média' : 'Baixa'}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* DESKTOP/TABLET LAYOUT: Kanban Board */}
        {!isMobile && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            {['TODO', 'DOING', 'DONE'].map(colStatus => (
              <div key={colStatus} className="flex flex-col h-full bg-[#0a0a0a] rounded-3xl border border-white/5 overflow-hidden">
                <div className="p-4 border-b border-white/5 bg-[#14151A] flex items-center justify-between">
                  <h2 className="font-bold text-white uppercase tracking-widest flex items-center gap-2">
                    {getStatusIcon(colStatus as TaskStatus)} 
                    {colStatus === 'TODO' ? 'A Fazer' : colStatus === 'DOING' ? 'Em Andamento' : 'Concluídas'}
                  </h2>
                  <span className="bg-white/10 text-xs px-2 py-1 rounded-full text-gray-400 font-mono">
                    {tasks.filter(t => t.status === colStatus).length}
                  </span>
                </div>
                <div className="flex-1 p-4 space-y-4 overflow-y-auto custom-scrollbar">
                  <AnimatePresence>
                    {tasks.filter(t => t.status === colStatus).map(task => (
                      <motion.div 
                        key={task.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#14151A] p-4 rounded-2xl border border-white/10 hover:border-[#D4AF37]/50 transition-colors cursor-pointer"
                        onClick={() => toggleStatus(task.id)}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <span className={`text-xs font-bold uppercase tracking-widest px-2 py-1 rounded-md ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                          <span className="text-xs text-gray-500 font-mono">{task.time}</span>
                        </div>
                        <h3 className={`font-bold text-white mb-3 ${task.status === 'DONE' ? 'line-through text-gray-500' : ''}`}>{task.title}</h3>
                        <div className="flex items-center gap-2 text-xs text-gray-400 bg-white/5 p-2 rounded-xl">
                          <User className="w-4 h-4" /> {task.assignee}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mobile Floating Action Button */}
      {isMobile && (
        <button className="fixed bottom-6 right-6 w-14 h-14 bg-[#D4AF37] text-black rounded-full shadow-[0_10px_30px_rgba(212,175,55,0.4)] flex items-center justify-center active:scale-90 transition-transform z-50">
          <Plus className="w-6 h-6" />
        </button>
      )}
    </div>
  );

  // Se for Kiosk ou Mobile, não queremos o sidebar completo do AdminLayout atrapalhando a tela inteira.
  // Mas para simplificar a demo, vamos renderizar dentro do AdminLayout para CEO e Standalone para Waiter.
  // Vamos assumir que quem acessa `/tasks` tem o header do sistema. Se isMobile for true, removemos padding externo.
  
  return (
    <AdminLayout>
      <div className={`h-full w-full ${isMobile ? 'p-0' : 'p-0'}`}>
        <PageContent />
      </div>
    </AdminLayout>
  );
}
