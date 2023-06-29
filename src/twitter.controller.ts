import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import axios from 'axios';

@Controller('twitterAuth')
export class twitterauth {
  @Get('twitter')
  @UseGuards(AuthGuard('twitter'))
  twitterLogin() {}

  @Get('twitter/callback')
  @UseGuards(AuthGuard('twitter'))
  twitterCallback(@Req() request, @Res() response) {
    // Here, you can access the authenticated user from 'request.user'
    // Perform any necessary actions and redirect or return the response as per your application's needs
    response.redirect('/'); // Redirect to the home page
  }
}
