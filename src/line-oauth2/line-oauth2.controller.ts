import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('line-oauth2')
export class LineOauth2Controller {
  @Get('login')
  @UseGuards(AuthGuard('line'))
  async lineAuth(@Req() req: Request) {
    // LINE OAuth2 登入
    // 這個方法不需要實現任何邏輯，因為 AuthGuard 會自動處理重定向
  }

  @Get('callback')
  @UseGuards(AuthGuard('line'))
  lineAuthRedirect(@Req() req: Request) {
    // LINE OAuth2 登入成功後的回調
    // 這裡可以處理用戶資訊或生成 JWT 令牌
    console.log('LINE 用戶資訊:', req?.user);
    return req.user;
  }
}
