import {
  Controller,
  Get,
  Redirect,
  Param,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import axios from 'axios';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @Get('facebook/business')
  @Redirect()
  async facebookBusinessLogin(): Promise<{ url: string }> {
    const appId = '264273222770430';
    const redirectUri = 'http://localhost:3000/auth/facebook/business/callback';
    const authEndpoint = `https://www.facebook.com/v13.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=pages_show_list`;

    return { url: authEndpoint };
  }
  // @Get('twitter')
  // @Redirect()
  // async loginWithTwitter() {
  //   const appId = 27297527;
  //   const redirectUri = 'https://localhost:3000/auth/twitter/callback';
  //   const authEndpoint = `https://www.facebook.com/v13.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=pages_show_list`;
  //   return { url: authEndpoint };
  // }
  @Get('facebook/business/callback')
  async facebookBusinessLoginCallback(@Req() req, @Res() res) {
    const appId = '264273222770430';
    const appSecret = '69899af7b3ebc39c2da3e77508292642';
    const redirectUri = 'http://localhost:3000/auth/facebook/business/callback';
    const code = req.query.code;

    try {
      // Exchange the authorization code for an access token
      const accessTokenEndpoint = `https://graph.facebook.com/v13.0/oauth/access_token?client_id=${appId}&redirect_uri=${redirectUri}&client_secret=${appSecret}&code=${code}`;
      const accessTokenResponse = await axios.get(accessTokenEndpoint);
      const accessToken = accessTokenResponse.data.access_token;
      console.log(accessToken);
      // Get the list of pages associated with the user/business
      const pagesEndpoint = `https://graph.facebook.com/v13.0/me/accounts?access_token=${accessToken}`;
      const pagesResponse = await axios.get(pagesEndpoint);
      const pages = pagesResponse.data.data;
      // console.log(pagesResponse.data.id);
      // Handle the pages or perform any necessary actions
      console.log(pages);
      //const id = pages.map((page) => page.id);//valid hai

      //console.log(id);
      //console.log(pages.name+"parv");

      // Redirect the user to the desired page after successful authentication
      return res.redirect('http://localhost:3000/success');
    } catch (error) {
      console.error('Error occurred during Facebook Business OAuth:', error);
      // Redirect the user to an error page or display an error message
      return res.redirect('http://localhost:3000/error');
    }
  }
}
