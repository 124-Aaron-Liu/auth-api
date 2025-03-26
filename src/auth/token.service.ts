import { Injectable } from '@nestjs/common';
import { IAuthToken, ITokenStore } from './interfaces/auth.interfaces';

@Injectable()
export class TokenService implements ITokenStore {
  // 這邊使用記憶體儲存作為示例，實際應用建議使用 Redis 或資料庫
  private tokenStore: Map<string, IAuthToken> = new Map();

  private generateKey(userId: string, provider: string): string {
    return `${userId}:${provider}`;
  }

  async saveToken(token: IAuthToken): Promise<void> {
    const key = this.generateKey(token.userId, token.provider);
    this.tokenStore.set(key, token);
  }

  async getToken(userId: string, provider: string): Promise<IAuthToken | null> {
    const key = this.generateKey(userId, provider);
    return this.tokenStore.get(key) || null;
  }

  async refreshToken(
    userId: string,
    provider: string,
  ): Promise<IAuthToken | null> {
    // 這邊需要實作向各個提供者請求更新 token 的邏輯
    // 目前先回傳 null，之後可以根據不同提供者實作對應的更新邏輯
    return null;
  }

  async removeToken(userId: string, provider: string): Promise<void> {
    const key = this.generateKey(userId, provider);
    this.tokenStore.delete(key);
  }
}
