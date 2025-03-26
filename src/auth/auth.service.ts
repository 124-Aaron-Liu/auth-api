import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenService } from './token.service';
import { IAuthToken } from './interfaces/auth.interfaces';

@Injectable()
export class AuthService {
  constructor(private readonly tokenService: TokenService) {}

  // 驗證 token
  async validateToken(token: string): Promise<{
    userId: string;
    provider: string;
  }> {
    try {
      // 解析 token 獲取用戶資訊（這裡需要根據實際情況實作）
      // 實際應用中可能需要使用 JWT 解析或其他方式
      const decodedToken = this.decodeToken(token);
      const { userId, provider } = decodedToken;

      // 從儲存中獲取 token
      const storedToken = await this.tokenService.getToken(userId, provider);
      if (!storedToken || storedToken.accessToken !== token) {
        throw new UnauthorizedException('無效的 token');
      }

      // 檢查 token 是否過期
      if (storedToken.expiresIn && Date.now() > storedToken.expiresIn) {
        // 嘗試更新 token
        const newToken = await this.tokenService.refreshToken(userId, provider);
        if (!newToken) {
          throw new UnauthorizedException('Token 已過期，請重新登入');
        }
      }

      return { userId, provider };
    } catch (error) {
      throw new UnauthorizedException('驗證失敗：' + error.message);
    }
  }

  // 儲存新的 token
  async saveProviderToken(tokenData: IAuthToken): Promise<void> {
    await this.tokenService.saveToken(tokenData);
  }

  // 解析 token（示例方法，需要根據實際情況實作）
  private decodeToken(token: string): { userId: string; provider: string } {
    // 這裡需要實作實際的 token 解析邏輯
    // 可以使用 JWT 或其他方式
    return {
      userId: 'user_id_from_token',
      provider: 'provider_from_token',
    };
  }
}
