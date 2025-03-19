import { Module } from '@nestjs/common';
import { TelegramController } from './telegram.controller';
import { TelegramService } from './telegram.service';
import { PassportModule } from '@nestjs/passport';
import { TelegramStrategy } from './telegram.strategy';

@Module({
  imports: [PassportModule],
  controllers: [TelegramController],
  providers: [TelegramService, TelegramStrategy],
})
export class TelegramModule {}
