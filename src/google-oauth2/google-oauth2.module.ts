import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './google.strategy';
import { GoogleOauth2Controller } from './google-oauth2.controller';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'google' })],
  controllers: [GoogleOauth2Controller],
  providers: [GoogleStrategy],
  exports: [GoogleStrategy],
})
export class GoogleOauth2Module {}
