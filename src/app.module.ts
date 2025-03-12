import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GoogleOauth2Module } from './google-oauth2/google-oauth2.module';
import { TwitterOauth2Module } from './twitter-oauth2/twitter-oauth2.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 設定為全域模組，這樣就不需要在其他模組中再次導入
    }),
    GoogleOauth2Module,
    TwitterOauth2Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
