import { Module } from '@nestjs/common';
import { appController } from './app.controller';
import { AuthController } from './auth.controller';
import { twitterauth } from './twitter.controller';
import { TwitterStrategy } from './twitter.strategy';

@Module({
  imports: [],
  controllers: [appController, AuthController, twitterauth],
  providers: [TwitterStrategy],
})
export class RootModule {}
