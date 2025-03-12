import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { TwitterOauth2Guard } from './twitter-oauth2.guard';

@Controller('twitter-oauth2') // 定義路由前綴
export class TwitterOauth2Controller {
  @Get('login') // 定義 GET 請求的路由
  @UseGuards(TwitterOauth2Guard) // 使用 TwitterOauthGuard 來保護路由
  async twitterAuth(@Req() _req: Request) {
    // Guard 會自動處理重定向
  }

  @Get('callback') // 定義 GET 請求的路由，當 Twitter 認證完成後會重定向到此
  @UseGuards(TwitterOauth2Guard) // 使用 TwitterOauthGuard 來保護路由
  async twitterAuthRedirect(@Req() req: Request, @Res() res: Response) {
    // 目前只回傳使用者物件
    console.log('oauth2req.user', req.user);
    // 這邊有成功console.log出來，但是好像沒有重定向到主頁
    res.send('Login successful');
  }
}
