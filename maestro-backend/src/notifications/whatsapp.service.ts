import { Injectable, Logger } from '@nestjs/common';
import { N8nService } from '../n8n/n8n.service';

@Injectable()
export class WhatsappService {
  private readonly logger = new Logger(WhatsappService.name);

  constructor(private readonly n8nService: N8nService) {}

  async sendOnboardingMessage(email: string, tenantId: string) {
    // Aqui no futuro chamaremos o webhook do n8n para disparar a API oficial do WhatsApp
    this.logger.log(`[Customer Success Agent] Disparando WhatsApp para o lead: ${email}`);
    
    const messagePayload = {
      to: email, // simulando o telefone via email no MVP
      template: 'onboarding_welcome_v1',
      variables: {
        tenant_id: tenantId,
        subdomain_url: \`https://\${tenantId}.maestro.app\`,
        temp_password: Math.random().toString(36).slice(-8)
      }
    };
    // Disparo Fire-and-Forget para o n8n
    this.n8nService.dispatchToWebhook('whatsapp-onboarding', messagePayload);

    this.logger.log(`✅ [Customer Success Agent] Payload despachado para o n8n via barramento. URL gerada: ${messagePayload.variables.subdomain_url}`);
  }
}
