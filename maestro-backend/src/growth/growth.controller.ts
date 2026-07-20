import { Controller, Post, Body, HttpStatus, Res, Logger, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Response } from 'express';
import { GrowthService } from './growth.service';

@Controller('growth')
// @UseGuards(JwtAuthGuard) // Comentado para MVP flow
export class GrowthController {
  private readonly logger = new Logger(GrowthController.name);

  constructor(private readonly growthService: GrowthService) {}

  @Post('webhook')
  async handleGrowthWebhook(@Body() payload: any, @Res() res: Response) {
    this.logger.log(`Payload MCP Recebido no Gateway de Growth.`);
    
    try {
      // Fire-and-forget: liberamos a conexão imediatamente e processamos assincronamente.
      this.growthService.processMarketExpansion(payload).catch(err => {
        this.logger.error(`Falha no processamento autônomo do Growth-Bot: ${err.message}`, err.stack);
      });

      return res.status(HttpStatus.ACCEPTED).json({
        status: 'accepted',
        message: 'Payload received. Growth Agents have been deployed.'
      });
    } catch (error: any) {
      this.logger.error(`Erro ao aceitar payload de Growth: ${error.message}`);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Failed to deploy agents.' });
    }
  }

  @Post('trigger-whatsapp')
  async triggerWhatsapp(@Body() payload: any, @Res() res: Response) {
    this.logger.log(`[Sentinel] Recebido comando de Engajamento para o Lead ID: ${payload.leadId}`);
    
    // Simulação do atraso do N8N para visualização de carregamento na UI
    return new Promise((resolve) => {
      setTimeout(() => {
        this.logger.log(`[n8n-Egress] Mensagem de Onboarding disparada para ${payload.phone} via N8N Webhook.`);
        res.status(HttpStatus.OK).json({
          success: true,
          message: 'WhatsApp disparado via N8N com sucesso.'
        });
        resolve(null);
      }, 1500); // 1.5s delay
    });
  }
}
