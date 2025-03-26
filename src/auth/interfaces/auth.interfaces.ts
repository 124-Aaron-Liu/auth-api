// 定義統一的 Token 介面
export interface IAuthToken {
  accessToken: string;
  refreshToken: string;
  provider: 'line' | 'google' | 'twitter' | 'telegram'; // 驗證提供者
  expiresIn?: number; // token 過期時間
  userId: string; // 用戶唯一識別碼
}

// 定義 Token 儲存服務的介面
export interface ITokenStore {
  saveToken(token: IAuthToken): Promise<void>;
  getToken(userId: string, provider: string): Promise<IAuthToken | null>;
  refreshToken(userId: string, provider: string): Promise<IAuthToken | null>;
  removeToken(userId: string, provider: string): Promise<void>;
}

// 定義用戶資訊介面
export interface IUserData {
  userId: string;
  provider: string;
}
