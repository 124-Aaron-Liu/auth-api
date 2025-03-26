import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LineTokenGuard extends AuthGuard('line-auth') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { code } = request.query;

    if (!code) {
      throw new Error('缺少 authorization code');
    }

    request.authorizationCode = code;

    const result = await super.canActivate(context);

    return result as boolean;
  }
}
