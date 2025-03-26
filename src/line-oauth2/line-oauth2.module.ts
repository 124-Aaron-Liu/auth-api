import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LineStrategy } from './line.strategy';
import { LineAuthStrategy } from './line-auth-strategy';
import { LineOauth2Controller } from './line-oauth2.controller';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'line' })],
  controllers: [LineOauth2Controller],
  providers: [LineStrategy, LineAuthStrategy],
  exports: [LineStrategy],
})
export class LineOauth2Module {}
