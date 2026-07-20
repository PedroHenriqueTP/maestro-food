import { Controller, Post, Body } from '@nestjs/common';
import { TenantsService, ProvisionTenantDto } from './tenants.service';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Post('onboarding')
  async onboardTenant(@Body() dto: ProvisionTenantDto) {
    const result = await this.tenantsService.provisionTenant(dto);
    return {
      message: 'Restaurante provisionado com sucesso!',
      tenantId: result.tenant.id,
      userId: result.user.id
    };
  }
}
