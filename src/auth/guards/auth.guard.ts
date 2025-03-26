import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Reflector } from '@nestjs/core';
import { REQUIRE_AUTH_KEY } from '../decorators/require-auth.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 檢查路由是否需要驗證
    const requireAuth = this.reflector.getAllAndOverride<boolean>(
      REQUIRE_AUTH_KEY,
      [context.getHandler(), context.getClass()],
    );

    // 如果路由沒有標記 @RequireAuth()，直接放行
    if (!requireAuth) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('未提供驗證 token');
    }

    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('無效的 token 格式');
    }

    try {
      // 驗證 token
      const userData = await this.authService.validateToken(token);

      // 將用戶資訊添加到請求中
      request.user = userData;

      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
