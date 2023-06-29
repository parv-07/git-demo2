import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-twitter';
//import { TWITTER_API_KEY, TWITTER_API_SECRET_KEY, TWITTER_CALLBACK_URL } from './constants';

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
  constructor() {
    super({
      consumerKey: 'Gh2zTSe8TblUIGXlMjtLuIA8d',
      consumerSecret: 'MclQdjDF3VNtps8f7PotOqRW7fHmtY665UtZTGj2eCyeE44pp5',
      callbackURL: 'http://localhost:3000/auth/facebook/business/callback',
      passReqToCallback: true,
    });
  }

  async validate(
    request: any,
    token: string,
    tokenSecret: string,
    profile: any,
    done: Function,
  ) {
    const user = {
      userId: profile.id_str,
      username: profile.username,
      displayName: profile.displayName,
      // Add any other required user data
    };
    done(null, user);
  }
}
