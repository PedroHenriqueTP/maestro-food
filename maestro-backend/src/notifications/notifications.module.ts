import { Module } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { N8nModule } from '../n8n/n8n.module';

@Module({
  imports: [N8nModule],
  providers: [WhatsappService],
  exports: [WhatsappService],
})
export class NotificationsModule {}
