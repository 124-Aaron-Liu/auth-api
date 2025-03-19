import { Controller, Get, UseGuards } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { AuthGuard } from '@nestjs/passport'; // 這是 Passport 的 AuthGuard，用來處理認證

@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  @Get('login')
  @UseGuards(AuthGuard('telegram')) // 使用 TelegramStrategy 來進行登入驗證
  async login() {
    // 登入成功後，會調用 validate 方法處理 payload
    return this.telegramService.processLogin('success');
  }
}
