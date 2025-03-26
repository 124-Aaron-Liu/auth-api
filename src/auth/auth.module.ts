import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { AuthGuard } from './guards/auth.guard';

@Module({
  providers: [AuthService, TokenService, AuthGuard],
  exports: [AuthService, TokenService, AuthGuard], // 匯出服務讓其他模組可以使用
})
export class AuthModule {}
