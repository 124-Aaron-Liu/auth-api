import { Module } from '@nestjs/common';
import { TwitterOauth2Controller } from './twitter-oauth2.controller';
import { TwitterOauth2Strategy } from './twitter.oauth2.strategy';

@Module({
  imports: [], // 可以在這裡引入其他模組
  controllers: [TwitterOauth2Controller], // 註冊控制器
  providers: [TwitterOauth2Strategy], // 註冊策略
})
export class TwitterOauth2Module {}
