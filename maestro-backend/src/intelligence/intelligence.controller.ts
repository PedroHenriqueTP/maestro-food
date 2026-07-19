import { Controller, Get } from '@nestjs/common';
import { IntelligenceService } from './intelligence.service';

@Controller('intelligence')
export class IntelligenceController {
  constructor(private readonly intelligenceService: IntelligenceService) {}

  @Get('diffs')
  getPendingDiffs() {
    return this.intelligenceService.getPendingDiffs();
  }

  @Get('insights')
  getMarketInsights() {
    return this.intelligenceService.getMarketInsights();
  }
}
