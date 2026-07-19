import { Module } from '@nestjs/common';
import { BillingController } from './billing/billing.controller';
import { BillingService } from './billing/billing.service';
import { N8nService } from './n8n/n8n.service';
import { WhatsappService } from './notifications/whatsapp.service';
import { PrismaService } from './prisma/prisma.service';
import { IntelligenceController } from './intelligence/intelligence.controller';
import { IntelligenceService } from './intelligence/intelligence.service';
import { KitchenGateway } from './kitchen/kitchen.gateway';

@Module({
  imports: [],
  controllers: [
    BillingController,
    IntelligenceController,
  ],
  providers: [
    BillingService,
    N8nService,
    WhatsappService,
    PrismaService,
    IntelligenceService,
    KitchenGateway,
  ],
})
export class AppModule {}
