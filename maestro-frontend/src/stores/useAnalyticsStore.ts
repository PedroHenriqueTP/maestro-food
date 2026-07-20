import { create } from 'zustand';

export interface TimeSeriesData {
  month: string;
  mrr: number;
  projected: number;
}

export interface FunnelData {
  stage: string;
  count: number;
  color: string;
}

interface AnalyticsState {
  currentMRR: number;
  projectedMRR: number;
  conversionRate: string;
  timeSeries: TimeSeriesData[];
  funnel: FunnelData[];
  fetchKPIs: () => Promise<void>;
}

export const useAnalyticsStore = create<AnalyticsState>((set) => ({
  currentMRR: 0,
  projectedMRR: 0,
  conversionRate: '0.0',
  timeSeries: [],
  funnel: [],

  fetchKPIs: async () => {
    try {
      // Faz fetch do backend mockado de Analytics
      const res = await fetch('http://localhost:3001/analytics/kpis');
      const json = await res.json();
      if (json.success) {
        set({
          currentMRR: json.data.currentMRR,
          projectedMRR: json.data.projectedMRR,
          conversionRate: json.data.conversionRate,
          timeSeries: json.data.timeSeries,
          funnel: json.data.funnel,
        });
      }
    } catch (err) {
      console.error('Falha ao buscar KPIs de Analytics', err);
      
      // Fallback estático caso o backend não esteja rodando, mantendo o painel vivo
      set({
        currentMRR: 42500,
        projectedMRR: 51000,
        conversionRate: '7.1',
        timeSeries: [
          { month: 'Jan', mrr: 22000, projected: 22000 },
          { month: 'Fev', mrr: 28000, projected: 28000 },
          { month: 'Mar', mrr: 33000, projected: 33000 },
          { month: 'Abr', mrr: 36500, projected: 36500 },
          { month: 'Mai', mrr: 42500, projected: 42500 },
          { month: 'Jun', mrr: 42500, projected: 51000 },
        ],
        funnel: [
          { stage: 'Minerados', count: 450, color: '#3b82f6' },
          { stage: 'Qualificados', count: 120, color: '#eab308' },
          { stage: 'Fechados', count: 32, color: '#10b981' },
        ],
      });
    }
  },
}));
