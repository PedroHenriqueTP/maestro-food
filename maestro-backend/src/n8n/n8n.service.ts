import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class N8nService {
  private readonly logger = new Logger(N8nService.name);
  private readonly n8nWebhookUrl = process.env.N8N_WEBHOOK_URL || 'http://localhost:5678/webhook';

  /**
   * Envia um payload via POST para o n8n no modelo Fire-and-Forget (O(1)).
   * Não bloqueia a thread de execução do NestJS aguardando resposta da automação.
   */
  dispatchToWebhook(workflowEndpoint: string, payload: any): void {
    const targetUrl = `${this.n8nWebhookUrl}/${workflowEndpoint}`;
    
    this.logger.log(`[n8n-Egress] Disparando evento assíncrono para: ${workflowEndpoint}`);
    
    // Fire-and-forget simulado usando fetch assíncrono sem await bloqueante
    fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).catch(err => {
      // O catch previne Unhandled Promise Rejections caso o n8n esteja offline,
      // mas não trava o processamento do cliente que já recebeu HTTP 200.
      this.logger.warn(`[n8n-Egress] Falha silenciosa ao despachar webhook: ${err.message}`);
    });
  }
}
