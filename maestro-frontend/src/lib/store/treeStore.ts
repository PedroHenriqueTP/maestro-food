import { create } from 'zustand';

interface ModuleConfig {
  id: string;
  name: string;
  active: boolean;
  color: string;
}

interface TreeState {
  tenantId: string | null;
  coreHealth: 'OPTIMAL' | 'DEGRADED';
  modules: Record<string, ModuleConfig>;
  setTenantId: (id: string) => void;
  toggleModule: (id: string) => void;
  updateCoreHealth: (status: 'OPTIMAL' | 'DEGRADED') => void;
}

export const useTreeStore = create<TreeState>((set) => ({
  tenantId: null,
  coreHealth: 'OPTIMAL',
  modules: {
    financeiro: { id: 'financeiro', name: 'Financeiro', active: true, color: '#D4AF37' },
    opex: { id: 'opex', name: 'Fornecedores (Opex)', active: false, color: '#50C878' },
    marketing: { id: 'marketing', name: 'Marketing & CRM', active: false, color: '#00FFFF' },
  },
  
  setTenantId: (id) => set({ tenantId: id }),
  
  toggleModule: (id) => set((state) => ({
    modules: {
      ...state.modules,
      [id]: {
        ...state.modules[id],
        active: !state.modules[id].active
      }
    }
  })),

  updateCoreHealth: (status) => set({ coreHealth: status })
}));
