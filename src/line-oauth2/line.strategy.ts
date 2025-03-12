import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-line-auth';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LineStrategy extends PassportStrategy(Strategy, 'line') {
  constructor(private configService: ConfigService) {
    super({
      channelID: configService.get<string>('LINE_CHANNEL_ID') || '',
      channelSecret: configService.get<string>('LINE_CHANNEL_SECRET') || '',
      callbackURL: configService.get<string>('LINE_CALLBACK_URL') || '',
      scope: ['profile', 'openid', 'email'],
      botPrompt: 'normal',
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ): Promise<any> {
    // LINE 返回的用戶資料結構
    // profile 包含 userId, displayName, pictureUrl 等資訊
    const user = {
      userId: profile.userId,
      displayName: profile.displayName,
      pictureUrl: profile.pictureUrl,
      statusMessage: profile.statusMessage,
      email: profile.email, // 如果用戶授權了 email 權限
      accessToken,
      refreshToken,
    };

    // 這裡可以添加自己的邏輯，例如在資料庫中查找或創建用戶

    done(null, user);
  }
}
