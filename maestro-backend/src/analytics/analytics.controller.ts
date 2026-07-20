import { Controller, Get, UseGuards, HttpStatus, Res } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Response } from 'express';

@Controller('analytics')
// @UseGuards(JwtAuthGuard)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('kpis')
  async getDashboardData(@Res() res: Response) {
    const data = await this.analyticsService.getKpis();
    return res.status(HttpStatus.OK).json({ success: true, data });
  }

  @Get('crm')
  async getCrmData(@Res() res: Response) {
    const data = await this.analyticsService.getCrmCustomers();
    return res.status(HttpStatus.OK).json({ success: true, customers: data });
  }

  @Get('finance')
  async getFinanceData(@Res() res: Response) {
    const data = await this.analyticsService.getFinance();
    return res.status(HttpStatus.OK).json({ success: true, finance: data });
  }
}
