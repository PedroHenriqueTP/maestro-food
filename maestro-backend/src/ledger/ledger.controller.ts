import { Controller, Post, Get, Body, Param, UseGuards, Req } from '@nestjs/common';
import { LedgerService } from './ledger.service';
import { TenantGuard } from '../common/guards/tenant.guard';

@Controller('api/v1/ledger')
@UseGuards(TenantGuard)
export class LedgerController {
  constructor(private readonly ledgerService: LedgerService) {}

  /**
   * Registra uma nova transação contábil garantindo Partida Dobrada
   */
  @Post('transactions')
  async createTransaction(@Req() req: any, @Body() body: any) {
    const tenantId = req.tenantId; // Injetado pelo TenantGuard
    return this.ledgerService.createTransaction({
      ...body,
      tenantId,
    });
  }

  /**
   * Estorna uma transação contábil
   */
  @Post('transactions/:id/reverse')
  async reverseTransaction(@Req() req: any, @Param('id') id: string, @Body('reason') reason: string) {
    const tenantId = req.tenantId;
    return this.ledgerService.reverseTransaction(id, tenantId, reason);
  }

  /**
   * Retorna o saldo consolidado de uma conta
   */
  @Get('accounts/:accountId/balance')
  async getAccountBalance(@Req() req: any, @Param('accountId') accountId: string) {
    const tenantId = req.tenantId;
    const balance = await this.ledgerService.getAccountBalance(accountId, tenantId);
    return {
      accountId,
      balance,
      currency: 'BRL', // Pode vir das configurações do tenant no futuro
    };
  }
}
