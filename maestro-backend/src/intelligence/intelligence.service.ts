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
}
