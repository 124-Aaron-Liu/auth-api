import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TwitterOauth2Strategy extends PassportStrategy(
  Strategy,
  'twitter-oauth2',
) {
  constructor(private configService: ConfigService) {
    super({
      authorizationURL: configService.get('authorizationURL') || '',
      tokenURL: configService.get('tokenURL') || '',
      clientID: configService.get('clientID') || '',
      clientSecret: configService.get('clientSecret') || '',
      callbackURL: configService.get('oauth2CallbackUrl') || '',
      scope: ['tweet.read', 'tweet.write', 'users.read', 'offline.access'],
      pkce: true,
      state: 'state',
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    // 在這裡可以將用戶資料儲存到資料庫
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    console.log('profile', profile);
    return { accessToken, profile };
  }
}
