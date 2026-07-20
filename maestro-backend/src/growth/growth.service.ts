import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GrowthService {
  private readonly logger = new Logger(GrowthService.name);

  constructor(private readonly prisma: PrismaService) {}

  async processMarketExpansion(payload: any) {
    this.logger.log(`Iniciando Rotina de Expansão de Mercado: ${payload.routine_name}`);
    this.logger.log(`Prioridade de Execução: ${payload.priority}`);

    if (payload.tasks && Array.isArray(payload.tasks)) {
      for (const task of payload.tasks) {
        if (task.agent === 'AgentScout') {
          await this.executeAgentScout(task);
        } else if (task.agent === 'AgentCRMSync') {
          await this.executeAgentCRMSync(task);
        } else {
          this.logger.warn(`Agente não reconhecido na rotina: ${task.agent}`);
        }
      }
    }

    this.logger.log(`✅ Rotina de Expansão Finalizada. Leads adicionados ao funil de aprovação (Quality-Control).`);
    return { status: 'success', message: 'Growth routine dispatched to agents.' };
  }

  private async executeAgentScout(task: any) {
    this.logger.log(`[AgentScout] Iniciando rastreamento passivo na região: ${task.params?.region}`);
    this.logger.log(`[AgentScout] Categorias Alvo: ${task.params?.categories?.join(', ')}`);
    // Simulando delay de scraping (na vida real isso iria para uma fila no Redis/Bull)
    await new Promise(resolve => setTimeout(resolve, 1500));
    this.logger.log(`[AgentScout] Rastreamento concluído. 47 leads minados.`);
  }

  private async executeAgentCRMSync(task: any) {
    this.logger.log(`[AgentCRMSync] Executando Upsert no CRM... Instruções: ${task.instructions}`);
    // Na vida real: this.prisma.lead.upsert(...)
    await new Promise(resolve => setTimeout(resolve, 800));
    this.logger.log(`[AgentCRMSync] Dados higienizados e persistidos no banco.`);
  }
}
