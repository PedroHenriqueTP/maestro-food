import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class PredictiveService {
  private readonly logger = new Logger(PredictiveService.name);

  /**
   * Esta função deve ser orquestrada por um CronJob diário (madrugada).
   * Ela escaneia todos os Tenants e cruza os dados do Ledger com LLMs.
   */
  async runNightlyAIAnalysis() {
    this.logger.log('Iniciando varredura preditiva (Genesis AI) em todos os Tenants...');
    
    // 1. Busca todos os tenants ativos
    const tenants = await prisma.tenant.findMany({ where: { isActive: true } });

    for (const tenant of tenants) {
      try {
        await this.analyzeTenant(tenant.id);
      } catch (error) {
        this.logger.error(`Falha ao analisar Tenant ${tenant.id}`, error);
      }
    }
    
    this.logger.log('Varredura preditiva concluída com sucesso.');
  }

  private async analyzeTenant(tenantId: string) {
    // 2. Extração de Dados Críticos (ETL para IA)
    // No mundo real, faríamos agregações mensais/semanais do ledger
    // Ex: Quais as despesas que mais cresceram? Quais produtos caíram em venda?
    
    // ... lógica de agregação do prisma ...

    // 3. LangChain/OpenAI Integration (Mockado para o MVP)
    // Em vez de chamar a API da OpenAI aqui e gastar tokens à toa,
    // vamos simular que a IA encontrou uma anomalia nos preços de Insumos.
    
    const mockAIResponse = {
      title: "Anomalia de Custo Detectada: Bacon",
      description: "O custo médio de insumos relacionados a Carnes subiu 15% nas últimas 3 semanas. Sugerimos ajustar o preço do 'Combo Supremo' em R$ 3,00 para proteger a sua margem alvo de 20%.",
      actionType: "PRICE_ADJUSTMENT",
      severity: "HIGH",
    };

    // 4. Persistência do Insight
    // A UI não chama a API da OpenAI. Ela lê direto dessa tabela de insights pré-calculados
    await prisma.predictiveInsight.create({
      data: {
        tenantId,
        title: mockAIResponse.title,
        description: mockAIResponse.description,
        actionType: mockAIResponse.actionType,
        severity: mockAIResponse.severity,
        status: "PENDING",
      }
    });

    this.logger.log(`[Insight Gerado] Tenant: ${tenantId} | Ação: ${mockAIResponse.actionType}`);
  }

  /**
   * Método chamado pelo Frontend para ler os insights pendentes
   */
  async getPendingInsights(tenantId: string) {
    return prisma.predictiveInsight.findMany({
      where: {
        tenantId,
        status: 'PENDING'
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 3
    });
  }

  /**
   * Método para o gestor descartar ou aceitar o insight na UI
   */
  async updateInsightStatus(insightId: string, status: 'ACCEPTED' | 'DISMISSED') {
    return prisma.predictiveInsight.update({
      where: { id: insightId },
      data: { status }
    });
  }
}
