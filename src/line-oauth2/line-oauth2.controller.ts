import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { LineTokenGuard } from './line-auth.guard';

@Controller('line-oauth2')
export class LineOauth2Controller {
  constructor(private configService: ConfigService) {}

  @Get('login')
  async lineAuth(@Res() res: Response) {
    const clientId = this.configService.get<string>('LINE_CHANNEL_ID') || '';
    const redirectUri =
      this.configService.get<string>('LINE_CALLBACK_URL') || '';
    const state = 'someRandomState'; // 這裡可以生成一個隨機的 state
    const responseType = 'code';
    const scope = 'profile openid email';

    const authUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=${responseType}&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}&scope=${encodeURIComponent(scope)}`;

    // 返回重定向 URL 給前端
    res.json({ authUrl });
  }

  @Get('callback')
  async lineAuthCallback(@Req() req: any, @Res() res: Response) {
    const { code, state } = req.query;
    // 這是模擬前端callback
    // 這裡可以驗證 state 是否匹配

    // 使用 code 換取 accessToken 和 refreshToken
    // 這部分的實作會在後端進行
    // ...
    console.log(code, state);
    res.send('Callback received');
  }

  @Get('token')
  async getToken(@Req() req: any, @Res() res: Response) {
    const { code } = req.query;
    const clientId = this.configService.get<string>('LINE_CHANNEL_ID') || '';
    const clientSecret =
      this.configService.get<string>('LINE_CHANNEL_SECRET') || '';
    const redirectUri =
      this.configService.get<string>('LINE_CALLBACK_URL') || '';

    const tokenUrl = 'https://api.line.me/oauth2/v2.1/token';
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
    });

    try {
      const response = await fetch(tokenUrl, {
        method: 'POST',
        headers,
        body: body.toString(),
      });
      const data = await response.json();
      // 返回 accessToken 和 refreshToken 給前端
      res.json(data);
    } catch (error) {
      console.error('Error fetching token:', error);
      res.status(500).send('Error fetching token');
    }
  }

  @Get('token2')
  @UseGuards(LineTokenGuard)
  async getToken2(@Req() req: any) {
    // Guard 成功後，token 資訊會在 req.user 中
    console.log('req.user', req.user);
    
    return {
      success: true,
      data: req.user,
    };
  }
}
