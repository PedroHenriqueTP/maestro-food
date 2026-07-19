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

export function useIntelligence() {
  const [diffs, setDiffs] = useState<ScoutDiff[]>([]);
  const [insights, setInsights] = useState<MarketInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIntelligence = async () => {
      try {
        setLoading(true);
        // Assumindo que o backend roda na porta 3001
        // Caso falhe por CORS ou backend offline, fallback para mocks
        const [diffsRes, insightsRes] = await Promise.all([
          axios.get<ScoutDiff[]>('http://localhost:3001/intelligence/diffs').catch(() => null),
          axios.get<MarketInsight[]>('http://localhost:3001/intelligence/insights').catch(() => null)
        ]);

        if (diffsRes && insightsRes) {
          setDiffs(diffsRes.data);
          setInsights(insightsRes.data);
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
        }
      } catch (err) {
        setError('Falha ao conectar com o Cérebro Neural (Backend).');
      } finally {
        setLoading(false);
      }
    };

    fetchIntelligence();
  }, []);

  return { diffs, insights, loading, error };
}
