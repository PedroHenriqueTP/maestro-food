import { create } from 'zustand';

export type LeadStatus = 'MINING' | 'QUALIFICATION' | 'ENGAGEMENT';

export interface Lead {
  id: string;
  name: string;
  category: string;
  phone: string;
  score: number;
  status: LeadStatus;
}

interface LeadsState {
  leads: Lead[];
  moveLead: (id: string, newStatus: LeadStatus) => void;
  discardLead: (id: string) => void;
  fetchLeads: () => void;
}

const mockLeads: Lead[] = [
  { id: '1', name: 'Burger King (Franquia Paulista)', category: 'Fast-Food', phone: '+55 11 99999-1111', score: 85, status: 'MINING' },
  { id: '2', name: 'Padaria Bella', category: 'Padaria', phone: '+55 11 99999-2222', score: 60, status: 'MINING' },
  { id: '3', name: 'Pizzaria Napolitana', category: 'Pizza', phone: '+55 11 99999-3333', score: 95, status: 'QUALIFICATION' },
  { id: '4', name: 'Cantina Italiana', category: 'Restaurante', phone: '+55 11 99999-4444', score: 40, status: 'MINING' },
  { id: '5', name: 'Sushi Express', category: 'Asiática', phone: '+55 11 99999-5555', score: 88, status: 'ENGAGEMENT' },
  // 🚀 Leads Injetados pela Rotina de Mineração (Agent Scout)
  { id: '6', name: 'Bacio di Latte (Perdizes)', category: 'Sobremesa', phone: '+55 11 98888-1111', score: 92, status: 'MINING' },
  { id: '7', name: 'Bar do Alemão', category: 'Bar', phone: '+55 11 98888-2222', score: 75, status: 'MINING' },
  { id: '8', name: 'Z-Deli Sandwiches', category: 'Fast-Food', phone: '+55 11 98888-3333', score: 89, status: 'MINING' },
  { id: '9', name: 'Padaria Real (Zona Norte)', category: 'Padaria', phone: '+55 11 98888-4444', score: 96, status: 'MINING' },
  { id: '10', name: 'Patties Burger', category: 'Fast-Food', phone: '+55 11 98888-5555', score: 90, status: 'MINING' },
];

export const useLeadsStore = create<LeadsState>((set) => ({
  leads: [],
  
  // Ação para buscar leads da API (mock inicial)
  fetchLeads: () => {
    // Simulando fetch
    set({ leads: mockLeads });
  },

  // Mover lead entre colunas (Optimistic Update)
  moveLead: (id, newStatus) => set((state) => ({
    leads: state.leads.map(lead => 
      lead.id === id ? { ...lead, status: newStatus } : lead
    )
  })),

  // Descartar lead (Remover da lista)
  discardLead: (id) => set((state) => ({
    leads: state.leads.filter(lead => lead.id !== id)
  }))
}));
