import { Controller, Post, Req, Res, Headers, HttpStatus, Logger } from '@nestjs/common';
import { BillingService } from './billing.service';
import { Request, Response } from 'express';

@Controller('billing')
export class BillingController {
  private readonly logger = new Logger(BillingController.name);

  constructor(private readonly billingService: BillingService) {}

  @Post('webhook/stripe')
  async handleStripeWebhook(
    @Req() req: Request,
    @Res() res: Response,
    @Headers('stripe-signature') signature: string,
  ) {
    // Em produção, você precisa ler o body cru (raw body) 
    // e usar stripe.webhooks.constructEvent(rawBody, signature, endpointSecret)
    // para validar se o webhook realmente veio da Stripe.
    
    try {
      const event = req.body;
      
      this.logger.log(`Webhook recebido: ${event.type}`);
      
      // Assíncrono: processa o evento delegando ao service
      // Sem await para responder 200 rápido para a Stripe e não gerar timeout
      this.billingService.handleStripeEvent(event).catch(err => {
        this.logger.error(`Erro ao processar webhook da Stripe: ${err.message}`, err.stack);
      });

      return res.status(HttpStatus.OK).json({ received: true });
    } catch (error: any) {
      this.logger.error(`Webhook validation falhou: ${error.message}`);
      return res.status(HttpStatus.BAD_REQUEST).send(\`Webhook Error: \${error.message}\`);
    }
  }
}
