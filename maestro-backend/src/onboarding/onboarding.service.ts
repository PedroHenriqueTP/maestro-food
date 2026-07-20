import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { BusinessTemplates } from './templates';

const prisma = new PrismaClient();

@Injectable()
export class OnboardingService {
  async setupTenantConfig(tenantId: string, businessType: keyof typeof BusinessTemplates, operationModel: string) {
    const template = BusinessTemplates[businessType];

    if (!template) {
      throw new Error(`Business template ${businessType} not found.`);
    }

    const config = await prisma.tenantConfig.upsert({
      where: { tenantId },
      update: {
        businessType,
        operationModel,
        hasScale: template.hasScale,
        hasKds: template.hasKds,
        hasTableService: template.hasTableService,
        metadata: {
          defaultModules: template.defaultModules
        }
      },
      create: {
        tenantId,
        businessType,
        operationModel,
        hasScale: template.hasScale,
        hasKds: template.hasKds,
        hasTableService: template.hasTableService,
        metadata: {
          defaultModules: template.defaultModules
        }
      }
    });

    return config;
  }
}
