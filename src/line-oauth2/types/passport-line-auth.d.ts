declare module 'passport-line-auth' {
  import { Strategy as PassportStrategy } from 'passport-strategy';

  export interface StrategyOptions {
    channelID: string;
    channelSecret: string;
    callbackURL: string;
    scope?: string[];
    botPrompt?: string;
  }

  export class Strategy extends PassportStrategy {
    constructor(options: StrategyOptions, verify: Function);
    name: string;
    authenticate(req: any, options?: any): void;
  }
}
