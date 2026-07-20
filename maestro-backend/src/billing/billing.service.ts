import { Injectable, Logger } from '@nestjs/common';
import { WhatsappService } from '../notifications/whatsapp.service';

@Injectable()
export class BillingService {
  private readonly logger = new Logger(BillingService.name);

  constructor(private readonly whatsappService: WhatsappService) {}

  async handleStripeEvent(event: any) {
    // Validação básica do tipo do evento
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      this.logger.log(`Pagamento confirmado! Iniciando provisionamento para a sessão: ${session.id}`);
      
      // Extrair informações do cliente e metadados
      const customerEmail = session.customer_details?.email || 'desconhecido@maestro.app';
      const mrrAmount = session.amount_total;
      
      await this.provisionNewTenant(customerEmail, mrrAmount);
    } else {
      this.logger.log(`Evento ignorado: ${event.type}`);
    }
  }

  private async provisionNewTenant(email: string, mrr: number) {
    this.logger.log(`Provisionando ambiente Maestro para [${email}]...`);
    
    // Simulação do Workflow de SRE e RLS:
    // 1. Criar novo schema no Postgres isolado via Row Level Security
    // 2. Acionar Webhook do n8n para enviar o WhatsApp de Onboarding
    // 3. Registrar o MRR no Qdrant/Dashboard de Inteligência
    
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulando latência de banco
    
    this.logger.log(`Provisionamento de [${email}] concluído com sucesso. MRR Adicionado: ${(mrr / 100).toFixed(2)} BRL`);
    
    // Dispara o WhatsApp de Boas Vindas
    const fakeTenantId = email.split('@')[0] || 'tenant';
    await this.whatsappService.sendOnboardingMessage(email, fakeTenantId);
  }
}
