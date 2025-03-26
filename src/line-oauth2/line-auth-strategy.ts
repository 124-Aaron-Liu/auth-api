import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LineAuthStrategy extends PassportStrategy(Strategy, 'line-auth') {
  private profileUrl = 'https://api.line.me/v2/profile';

  constructor(private configService: ConfigService) {
    super({
      authorizationURL: 'https://access.line.me/oauth2/v2.1/authorize',
      tokenURL: 'https://api.line.me/oauth2/v2.1/token',
      clientID: configService.get('LINE_CHANNEL_ID') || '',
      clientSecret: configService.get('LINE_CHANNEL_SECRET') || '',
      callbackURL: configService.get('LINE_CALLBACK_URL') || '',
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const userProfile = await this.getUserProfile(accessToken);
    return {
      accessToken,
      refreshToken,
      userProfile,
    };
  }

  async getUserProfile(accessToken: string) {
    const response = await fetch(this.profileUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
}
