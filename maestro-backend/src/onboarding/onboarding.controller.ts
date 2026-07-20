import { Controller, Post, Body, Req } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { BusinessTemplates } from './templates';

@Controller('onboarding')
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  @Post('setup')
  async setupConfig(
    @Body('businessType') businessType: keyof typeof BusinessTemplates,
    @Body('operationModel') operationModel: string,
    @Req() req: any
  ) {
    // Para simplificar, assumimos um mock tenantId = 'TENANT_MOCK_1' se não houver autenticação
    const tenantId = req.user?.tenantId || 'TENANT_MOCK_1';
    
    return this.onboardingService.setupTenantConfig(tenantId, businessType, operationModel);
  }
}
