import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GoogleOauth2Module } from './google-oauth2/google-oauth2.module';
import { TwitterOauth2Module } from './twitter-oauth2/twitter-oauth2.module';
import { LineOauth2Module } from './line-oauth2/line-oauth2.module';
import { TelegramModule } from './telegram/telegram.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 設定為全域模組，這樣就不需要在其他模組中再次導入
    }),
    GoogleOauth2Module,
    TwitterOauth2Module,
    LineOauth2Module,
    TelegramModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // 指向您的靜態文件夾
      serveRoot: '/public/', // 可選，設置靜態資源的路由前綴
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
