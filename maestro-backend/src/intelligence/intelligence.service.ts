import { Injectable } from '@nestjs/common';

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

@Injectable()
export class IntelligenceService {
  getPendingDiffs(): ScoutDiff[] {
    return [
      {
        id: 'diff-001',
        title: 'Otimização de Edge Middleware',
        description: 'Substituição de string split por Expressão Regular nativa para reduzir latência de parsing do subdomínio em 12%.',
        riskLevel: 'LOW',
        impact: '-12% CPU usage na Borda',
        codeBefore: `const hostWithoutPort = host.split(':')[0];\nconst subdomain = hostWithoutPort.split('.')[0];`,
        codeAfter: `const subdomain = host.match(/^(?:https?:\\/\\/)?([^:.]+)/i)?.[1] || '';`,
      },
      {
        id: 'diff-002',
        title: 'Connection Pooling Preditivo',
        description: 'Implementação de loteamento de Promises (Promise.all) no serviço preditivo para evitar travamento da Event Loop.',
        riskLevel: 'MEDIUM',
        impact: '+45% throughput em análise batch',
        codeBefore: `for (const record of records) {\n  await this.analyze(record);\n}`,
        codeAfter: `await Promise.all(records.map(record => this.analyze(record)));`,
      }
    ];
  }

  getMarketInsights(): MarketInsight[] {
    return [
      {
        id: 'ins-001',
        competitor: 'Burguer King (Local)',
        insightType: 'PRICE_DROP',
        description: 'Concorrente reduziu o preço do Combo de Casal em 15% nas últimas 2 horas.',
        recommendedAction: 'Ativar cupom de Flash Sale de 10% no Marketplace via n8n.',
        timestamp: new Date().toISOString(),
      },
      {
        id: 'ins-002',
        competitor: 'iFood (Região Central)',
        insightType: 'DELIVERY_SPEED',
        description: 'Tempo médio de entrega da região subiu para 55 minutos devido à chuva.',
        recommendedAction: 'Acionar taxa dinâmica (+R$ 4,00) e notificar clientes sobre possível atraso.',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
      }
    ];
  }

  getPersonalizedRecommendations(): Recommendation[] {
    return [
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
    ];
  }
}
