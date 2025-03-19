import { Injectable } from '@nestjs/common';

@Injectable()
export class TelegramService {
  processLogin(status: string) {
    // 在這裡處理登入成功後的邏輯
    return { message: '登入成功', status };
  }
}
