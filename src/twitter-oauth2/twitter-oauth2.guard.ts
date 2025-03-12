import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class TwitterOauth2Guard extends AuthGuard('twitter-oauth2') {}
