import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-telegram-official';
import { TelegramUser } from './telegram-user.interface'; // 定義用戶介面
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TelegramStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      botToken: configService.get<string>('TELEGRAM_API_TOKEN') || '', // 替換為您的 Telegram 機器人 Token
    });
  }

  async validate(payload: TelegramUser) {
    // 在這裡處理用戶的驗證邏輯
    console.log('payload', payload);
    return payload; // 返回用戶資料
  }
}
