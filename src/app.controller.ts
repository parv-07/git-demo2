import { Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
@Controller('/')
export class appController {
  @Get()
  index(@Res() res: Response) {
    res.sendFile(
      'C:/Users/hp/OneDrive/Desktop/parv 2week training/crudnestjs/views/facebook.html',
    );
  }
  // @Post('/callback')
  // getcallback() {
  //   console.log('Welcome');
  // }
}
