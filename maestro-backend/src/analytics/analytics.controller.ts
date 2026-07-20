import { Controller, Get, UseGuards, HttpStatus, Res } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Response } from 'express';

@Controller('analytics')
// @UseGuards(JwtAuthGuard) // Comentado para facilitar o dev do painel MVP sem auth header no axios do nextjs
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('kpis')
  async getDashboardData(@Res() res: Response) {
    const data = await this.analyticsService.getKpis();
    return res.status(HttpStatus.OK).json({ success: true, data });
  }
}
