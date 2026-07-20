import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { N8nModule } from './n8n/n8n.module';
import { NotificationsModule } from './notifications/notifications.module';
import { BillingModule } from './billing/billing.module';
import { LedgerModule } from './ledger/ledger.module';
import { PredictiveModule } from './ai/predictive.module';
import { IntelligenceModule } from './intelligence/intelligence.module';
import { GrowthModule } from './growth/growth.module';
import { AnalyticsModule } from './analytics/analytics.module';

import { KitchenModule } from './kitchen/kitchen.module';
import { TenantsModule } from './tenants/tenants.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    N8nModule,
    NotificationsModule,
    BillingModule,
    LedgerModule,
    PredictiveModule,
    IntelligenceModule,
    GrowthModule,
    AnalyticsModule,
    KitchenModule,
    TenantsModule,
    AuthModule
  ]
})
export class AppModule {}
