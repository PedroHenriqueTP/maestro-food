import { useState, useEffect } from 'react';
import axios from 'axios';

// Interfaces espelhadas do Backend
export interface ScoutDiff {
  id: string;
  title: string;
  description: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  impact: string;
  codeBefore: string;
  codeAfter: string;
}

export interface MarketInsight {
  id: string;
  competitor: string;
  insightType: 'PRICE_DROP' | 'NEW_FEATURE' | 'DELIVERY_SPEED';
  description: string;
  recommendedAction: string;
  timestamp: string;
}

export interface Recommendation {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  intelligenceReason: string;
  badges: string[];
}

export function useIntelligence() {
  const [diffs, setDiffs] = useState<ScoutDiff[]>([]);
  const [insights, setInsights] = useState<MarketInsight[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIntelligence = async () => {
      try {
        setLoading(true);
        // Assumindo que o backend roda na porta 3001
        // Caso falhe por CORS ou backend offline, fallback para mocks
        const [diffsRes, insightsRes, recsRes] = await Promise.all([
          axios.get<ScoutDiff[]>('http://localhost:3001/intelligence/diffs').catch(() => null),
          axios.get<MarketInsight[]>('http://localhost:3001/intelligence/insights').catch(() => null),
          axios.get<Recommendation[]>('http://localhost:3001/intelligence/recommendations').catch(() => null)
        ]);

        if (diffsRes && insightsRes && recsRes) {
          setDiffs(diffsRes.data);
          setInsights(insightsRes.data);
          setRecommendations(recsRes.data);
        } else {
          // Fallback Mocks para quando o backend não responder
          setInsights([
            {
              id: 'ins-001',
              competitor: 'Burguer King (Local)',
              insightType: 'PRICE_DROP',
              description: 'Concorrente reduziu o preço do Combo de Casal em 15% nas últimas 2 horas.',
              recommendedAction: 'Ativar cupom de Flash Sale de 10% no Marketplace via n8n.',
              timestamp: new Date().toISOString(),
            }
          ]);
          setDiffs([
            {
              id: 'diff-001',
              title: 'Otimização de Edge Middleware',
              description: 'Substituição de string split por Expressão Regular nativa para reduzir latência.',
              riskLevel: 'LOW',
              impact: '-12% CPU usage na Borda',
              codeBefore: 'host.split(":")',
              codeAfter: 'host.match(/.../)',
            }
          ]);
          setRecommendations([
            {
              id: 'rec-001',
              name: 'Wagyu Supreme Trufado',
              price: 129.90,
              imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80',
              intelligenceReason: 'Alta demanda na sua região por ingredientes premium (+42% hoje).',
              badges: ['Mais Vendido', 'Recomendado pela IA']
            },
            {
              id: 'rec-002',
              name: 'Trio Mini-Burgers Artesanais',
              price: 89.90,
              imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80',
              intelligenceReason: 'Excelente opção para casais (ticket médio elevado na última hora).',
              badges: ['Ideal para Dois']
            }
          ]);
        }
      } catch (err) {
        setError('Falha ao conectar com o Cérebro Neural (Backend).');
      } finally {
        setLoading(false);
      }
    };

    fetchIntelligence();
  }, []);

  return { diffs, insights, recommendations, loading, error };
}
