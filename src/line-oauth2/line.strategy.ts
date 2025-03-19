import { Injectable, Req, Res } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-line-auth';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Request, Response } from 'express';

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

  async lineAuthCallback(@Req() req: Request, @Res() res: Response) {
    const { code, state } = req.query;

    // 驗證 state

    const tokenUrl = 'https://api.line.me/oauth2/v2.1/token';
    const clientId = this.configService.get<string>('LINE_CHANNEL_ID');
    const clientSecret = this.configService.get<string>('LINE_CHANNEL_SECRET');
    const redirectUri = this.configService.get<string>('LINE_CALLBACK_URL');

    try {
      const response = await axios.post(tokenUrl, null, {
        params: {
          grant_type: 'authorization_code',
          code,
          redirect_uri: redirectUri,
          client_id: clientId,
          client_secret: clientSecret,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const { access_token, refresh_token } = response.data;

      // 使用 accessToken 獲取受限資源
      // ...

      res.json({ access_token, refresh_token });
    } catch (error) {
      console.error('Error exchanging code for token:', error);
      res.status(500).send('Error exchanging code for token');
    }
  }
}
