import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('google-oauth2')
export class GoogleOauth2Controller {
  @Get('login')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: Request) {
    // Google OAuth2 登入
  }

  @Get('callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    // Google OAuth2 登入成功後的回調
    console.log(req.user);
    return req.user;
  }
}
