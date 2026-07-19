import { Controller, Get, Post, Body, HttpCode, HttpStatus, Logger, BadRequestException } from '@nestjs/common';
import { IntelligenceService } from './intelligence.service';
import { N8nService } from '../n8n/n8n.service';

@Controller('intelligence')
export class IntelligenceController {
  private readonly logger = new Logger(IntelligenceController.name);

  constructor(
    private readonly intelligenceService: IntelligenceService,
    private readonly n8nService: N8nService
  ) {}

  @Get('diffs')
  getPendingDiffs() {
    return this.intelligenceService.getPendingDiffs();
  }

  @Get('insights')
  getMarketInsights() {
    return this.intelligenceService.getMarketInsights();
  }

  @Get('recommendations')
  getPersonalizedRecommendations() {
    return this.intelligenceService.getPersonalizedRecommendations();
  }

  @Post('trigger-flash-sale')
  @HttpCode(HttpStatus.ACCEPTED)
  triggerFlashSale(@Body() payload: any) {
    // Validação básica do Payload (Security/Grok)
    if (!payload || !payload.productName) {
      this.logger.error('Tentativa de trigger sem productName.');
      throw new BadRequestException('productName é obrigatório.');
    }

    this.logger.log(`[Webhook] Recebido comando de Flash Sale para: ${payload.productName}`);

    // Dispara webhook assíncrono pro n8n O(1) - Fire and Forget
    this.n8nService.dispatchToWebhook('trigger-flash-sale', {
      urgency: true,
      productName: payload.productName,
      managerPhone: payload.managerPhone || '+5511999999999',
      timestamp: new Date().toISOString()
    });

    // Retorna 202 Accepted imediatamente
    return { status: 'accepted', message: 'Trigger processado em background.' };
  }
}
